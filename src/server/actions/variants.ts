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

export async function createVariant(designId: number, color: string, imageUrl: string) {
  await db.insert(variants).values({
    designId,
    color,
    imageUrl,
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