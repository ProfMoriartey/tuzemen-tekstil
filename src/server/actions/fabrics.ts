"use server"

import { db } from "~/server/db"
import { designs } from "../db/schema"
import { eq } from "drizzle-orm"

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