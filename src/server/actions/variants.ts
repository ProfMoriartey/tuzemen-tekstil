"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { variants, designs } from "~/server/db/schema"
import { UTApi } from "uploadthing/server"
import { currentUser } from "@clerk/nextjs/server"

const utapi = new UTApi()

export async function updateDisplayImage(designId: number, imageUrl: string) {

  const user = await currentUser()
  
  if (user?.publicMetadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required")
  }

  await db.update(designs)
    .set({ displayImageUrl: imageUrl })
    .where(eq(designs.id, designId))
  
  revalidatePath(`/admin/products/${designId}`)
}

export async function createVariant(designId: number, color: string, imageUrl?: string) {

  const user = await currentUser()
  
  if (user?.publicMetadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required")
  }

  await db.insert(variants).values({
    designId,
    color,
    imageUrl: imageUrl ?? null,
  })
  
  revalidatePath(`/admin/products/${designId}`)
}

export async function deleteVariant(variantId: number, designId: number, imageUrl: string | null) {

  const user = await currentUser()
  
  if (user?.publicMetadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required")
  }

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

  const user = await currentUser()
  
  if (user?.publicMetadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required")
  }

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

  const user = await currentUser()
  
  if (user?.publicMetadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required")
  }
  
  const fileKey = imageUrl.split("/f/")[1]
  
  if (fileKey) {
    await utapi.deleteFiles(fileKey)
  }

  await db.update(designs)
    .set({ displayImageUrl: null })
    .where(eq(designs.id, designId))
  
  revalidatePath(`/admin/products/${designId}`)
}