"use server"

import { db } from "~/server/db"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { designs, variants } from "~/server/db/schema"
import { UTApi } from "uploadthing/server"

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

export async function updateFabricDetails(designId: number, category: string, description: string) {
  await db.update(designs)
    .set({ category, description })
    .where(eq(designs.id, designId))

  revalidatePath(`/admin/products/${designId}`)
  revalidatePath("/admin/products")
}

export async function deleteFabricComplete(designId: number) {
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