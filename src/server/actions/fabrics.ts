"use server"

import { db } from "~/server/db"

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