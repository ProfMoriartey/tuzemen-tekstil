"use server"

import { db } from "~/server/db"
import { designs } from "../db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

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