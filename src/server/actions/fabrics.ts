"use server"

import { db } from "~/server/db"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { designs, variants } from "~/server/db/schema"
import { UTApi } from "uploadthing/server"

import { currentUser } from "@clerk/nextjs/server"

const utapi = new UTApi()

export async function getDesignsWithVariants() {

  try {
    const data = await db.query.designs.findMany({
      with: {
        variants: true,
      },
    })
    
    return data
  } catch (error) {
    throw new Error("Failed to fetch designs")
  }
}

export async function getDesignById(id: number) {

  try {
    const data = await db.query.designs.findFirst({
      where: eq(designs.id, id),
      with: {
        variants: true
      }
    })
    
    return data
  } catch (error) {
    throw new Error("Failed to fetch design details")
  }
}

export async function createFabric(formData: FormData) {

  const user = await currentUser()
  
  if (user?.publicMetadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required")
  }
  const name = formData.get("name") as string
  const category = formData.get("category") as string
  const description = formData.get("description") as string

  const [newFabric] = await db.insert(designs).values({
    name,
    category,
    description,
  }).returning()

if (!newFabric) {
    throw new Error("Failed to create fabric design")
  }

  revalidatePath("/admin/products")
  redirect(`/admin/products/${newFabric.id}`)
}

export async function updateFabricDetails(formData: FormData) {
  const user = await currentUser()
  
  if (user?.publicMetadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required")
  }

  const id = Number(formData.get("id"))
  const name = formData.get("name") as string
  const category = formData.get("category") as string
  const description = formData.get("description") as string
  
  // Extract new fields
  const fabricType = formData.get("fabricType") as string
  const composition = formData.get("composition") as string
  const width = formData.get("width")
  const weight = formData.get("weight")
  const hasLeadband = formData.get("hasLeadband") === "on"

  await db.update(designs)
    .set({
      name,
      category: category || null,
      description: description || null,
      fabricType: fabricType || null,
      composition: composition || null,
      width: width ? Number(width) : null,
      weight: weight ? Number(weight) : null,
      hasLeadband,
    })
    .where(eq(designs.id, id))

  redirect(`/admin/products`)
}

export async function deleteFabricComplete(designId: number) {

  const user = await currentUser()
  
  if (user?.publicMetadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required")
  }
  
  const design = await db.query.designs.findFirst({
    where: eq(designs.id, designId),
    with: { variants: true }
  })

  if (!design) {
    throw new Error("Fabric not found")
  }

  const fileKeys: string[] = []

  if (design.displayImageUrl) {
    const key = design.displayImageUrl.split("/f/")[1]
    if (key) fileKeys.push(key)
  }

  design.variants.forEach((variant) => {
    if (variant.imageUrl) {
      const key = variant.imageUrl.split("/f/")[1]
      if (key) fileKeys.push(key)
    }
  })

  if (fileKeys.length > 0) {
    await utapi.deleteFiles(fileKeys)
  }

  await db.delete(variants).where(eq(variants.designId, designId))
  
  await db.delete(designs).where(eq(designs.id, designId))

  revalidatePath("/admin/products")
  redirect("/admin/products")
}