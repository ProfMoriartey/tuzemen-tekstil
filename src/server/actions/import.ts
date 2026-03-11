"use server"

import { db } from "~/server/db"
import { designs, variants } from "~/server/db/schema"
import { ilike, and, eq } from "drizzle-orm"
import { currentUser } from "@clerk/nextjs/server"

interface VariantData {
  color: string
  imageUrl?: string
}

interface FabricData {
  "MaIn DesIgn": string
  COMPOSITION?: string
  WIDTH?: number
  "GR/M2"?: number
  LEADBAND?: string
  TYPE?: string
  displayImageUrl?: string
  variants?: VariantData[]
}

export async function processFabricJson(jsonString: string) {
  const user = await currentUser()
  if (user?.publicMetadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required")
  }

  let parsedData: FabricData[]
  try {
    parsedData = JSON.parse(jsonString) as FabricData[]
  } catch {
    throw new Error("Invalid JSON format. Please ensure it is a valid array.")
  }

  let updatedCount = 0

  for (const item of parsedData) {
    const designName = item["MaIn DesIgn"]
    if (!designName) continue

    // Find the existing fabric
    const existingDesign = await db.query.designs.findFirst({
      where: ilike(designs.name, designName)
    })

    if (!existingDesign) continue

    // Prepare main details update
    const hasLeadband = item.LEADBAND ? item.LEADBAND === "YES" : undefined
    
    await db.update(designs)
      .set({
        composition: item.COMPOSITION ?? existingDesign.composition,
        width: item.WIDTH ?? existingDesign.width,
        weight: item["GR/M2"] ?? existingDesign.weight,
        hasLeadband: hasLeadband ?? existingDesign.hasLeadband,
        fabricType: item.TYPE ?? existingDesign.fabricType,
        displayImageUrl: item.displayImageUrl ?? existingDesign.displayImageUrl
      })
      .where(eq(designs.id, existingDesign.id))

    // Process variants if they exist in the JSON
    if (item.variants && Array.isArray(item.variants)) {
      for (const v of item.variants) {
        if (!v.color) continue

        const existingVariant = await db.query.variants.findFirst({
          where: and(
            eq(variants.designId, existingDesign.id),
            ilike(variants.color, v.color)
          )
        })

        if (existingVariant) {
          if (v.imageUrl) {
            await db.update(variants)
              .set({ imageUrl: v.imageUrl })
              .where(eq(variants.id, existingVariant.id))
          }
        } else {
          await db.insert(variants).values({
            designId: existingDesign.id,
            color: v.color.toUpperCase(),
            imageUrl: v.imageUrl || null
          })
        }
      }
    }

    updatedCount++
  }

  return updatedCount
}