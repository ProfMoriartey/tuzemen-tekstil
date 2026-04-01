"use server"

import { ilike, or, exists, and, eq, inArray, asc, desc, sql } from "drizzle-orm"
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
  const uniqueWidths = Array.from(
    new Set(allDesigns.map(d => d.width).filter((w): w is number => w !== null))
  )
  return uniqueWidths.sort((a, b) => a - b)
}

export async function getStorefrontDesigns(
  query: string, 
  colors: string[], 
  categories: string[],
  widths: number[],
  leadbandParam: boolean | undefined,
  sortBy = "name",
  sortOrder: "asc" | "desc" = "asc",
  page: number = 1,
  limit: number = 24
) {
  const searchPattern = `%${query}%`
  const orderDirection = sortOrder === "desc" ? desc(designs.name) : asc(designs.name)
  const offset = (page - 1) * limit

  // 1. Extract the filter logic into a reusable variable
  const filterLogic = and(
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
  )

  // 2. Query the total count of filtered designs
  const totalCountResult = await db
    .select({ count: sql`count(*)` })
    .from(designs)
    .where(filterLogic)

 const totalCount = Number(totalCountResult[0]?.count ?? 0)

  // 3. Query the specific page data using limit and offset
  const data = await db.query.designs.findMany({
    where: filterLogic,
    with: {
      variants: true,
    },
    orderBy: [orderDirection],
    limit: limit,
    offset: offset
  })

  // 4. Return both the data and the total count
  return {
    designs: data,
    totalCount: totalCount
  }
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

export async function getFeaturedDesigns(limitCount = 4) {
  const data = await db.query.designs.findMany({
    with: {
      variants: true,
    },
    orderBy: [desc(designs.createdAt)],
    limit: limitCount
  })

  return data
}