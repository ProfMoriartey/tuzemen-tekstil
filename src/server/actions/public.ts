"use server"

import { ilike, or, exists, and, eq, inArray, asc, desc } from "drizzle-orm"
import { db } from "~/server/db"
import { designs, variants } from "~/server/db/schema"

export async function getAvailableColors() {
  const allVariants = await db.select({ color: variants.color }).from(variants)
  const uniqueColors = Array.from(new Set(allVariants.map(v => v.color).filter(Boolean)))
  return uniqueColors.sort()
}

export async function getAvailableCategories() {
  const allDesigns = await db.select({ category: designs.category }).from(designs)
  const uniqueCategories = Array.from(
    new Set(allDesigns.map(d => d.category).filter(Boolean) as string[])
  )
  return uniqueCategories.sort()
}

export async function getAvailableWidths() {
  const allDesigns = await db.select({ width: designs.width }).from(designs)
  // Filter out nulls and ensure TypeScript knows these are strictly numbers
  const uniqueWidths = Array.from(
    new Set(allDesigns.map(d => d.width).filter((w): w is number => w !== null))
  )
  // Sort numerically
  return uniqueWidths.sort((a, b) => a - b)
}

export async function getStorefrontDesigns(
  query: string, 
  colors: string[], 
  categories: string[],
  widths: number[],
  leadbandParam: boolean | undefined,
  sortBy = "name",
  sortOrder: "asc" | "desc" = "asc"
) {
  const searchPattern = `%${query}%`
  const orderDirection = sortOrder === "desc" ? desc(designs.name) : asc(designs.name)

  const data = await db.query.designs.findMany({
    where: and(
      query ? or(
        ilike(designs.name, searchPattern),
        ilike(designs.category, searchPattern),
        ilike(designs.description, searchPattern)
      ) : undefined,
      colors.length > 0 ? exists(
        db.select().from(variants).where(
          and(
            eq(variants.designId, designs.id),
            inArray(variants.color, colors)
          )
        )
      ) : undefined,
      categories.length > 0 ? inArray(designs.category, categories) : undefined,
      widths.length > 0 ? inArray(designs.width, widths) : undefined,
      leadbandParam !== undefined ? eq(designs.hasLeadband, leadbandParam) : undefined
    ),
    with: {
      variants: true,
    },
    orderBy: [orderDirection]
  })

  return data
}

export async function getFabricById(id: number) {
  const data = await db.query.designs.findFirst({
    where: eq(designs.id, id),
    with: {
      variants: true,
    }
  })
  
  return data
}