"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { variants, designs } from "~/server/db/schema"
import { UTApi } from "uploadthing/server"

const utapi = new UTApi()

export async function updateDisplayImage(designId: number, imageUrl: string) {
  await db.update(designs)
    .set({ displayImageUrl: imageUrl })
    .where(eq(designs.id, designId))
  
  revalidatePath(`/admin/products/${designId}`)
}

export async function createVariant(designId: number, color: string, imageUrl?: string) {
  await db.insert(variants).values({
    designId,
    color,
    imageUrl: imageUrl ?? null,
  })
  
  revalidatePath(`/admin/products/${designId}`)
}

export async function deleteVariant(variantId: number, designId: number, imageUrl: string | null) {
  if (imageUrl) {
    const fileKey = imageUrl.split("/f/")[1]
    
    if (fileKey) {
      await utapi.deleteFiles(fileKey)
    }
  }

  await db.delete(variants).where(eq(variants.id, variantId))
  revalidatePath(`/admin/products/${designId}`)
}

export async function updateVariantImage(variantId: number, designId: number, imageUrl: string, oldImageUrl: string | null) {
  if (oldImageUrl) {
    const fileKey = oldImageUrl.split("/f/")[1]
    
    if (fileKey) {
      await utapi.deleteFiles(fileKey)
    }
  }

  await db.update(variants)
    .set({ imageUrl })
    .where(eq(variants.id, variantId))
  
  revalidatePath(`/admin/products/${designId}`)
}

export async function deleteDisplayImage(designId: number, imageUrl: string) {
  const fileKey = imageUrl.split("/f/")[1]
  
  if (fileKey) {
    await utapi.deleteFiles(fileKey)
  }

  await db.update(designs)
    .set({ displayImageUrl: null })
    .where(eq(designs.id, designId))
  
  revalidatePath(`/admin/products/${designId}`)
}