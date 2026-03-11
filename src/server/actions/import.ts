"use server"

import { db } from "~/server/db"
import { designs } from "~/server/db/schema"
import { ilike } from "drizzle-orm"
import { currentUser } from "@clerk/nextjs/server"

interface FabricData {
  "MaIn DesIgn": string
  "COMPOSITION": string
  "WIDTH": number
  "GR/M2": number
  "LEADBAND": string
  "TYPE": string
}

export async function processFabricJson(jsonString: string) {
  const user = await currentUser()
  if (user?.publicMetadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required")
  }

  let parsedData: FabricData[]
  try {
    parsedData = JSON.parse(jsonString)
  } catch (error) {
    throw new Error("Invalid JSON format. Please ensure it is a valid array.")
  }

  let updatedCount = 0

  for (const item of parsedData) {
    const designName = item["MaIn DesIgn"]
    if (!designName) continue

    const hasLeadband = item["LEADBAND"] === "YES"

    await db.update(designs)
      .set({
        composition: item["COMPOSITION"] || null,
        width: item["WIDTH"] || null,
        weight: item["GR/M2"] || null,
        hasLeadband: hasLeadband,
        fabricType: item["TYPE"] || null
      })
      .where(ilike(designs.name, designName))

    updatedCount++
  }

  return updatedCount
}