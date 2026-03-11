import { ilike, or, exists, and, eq, inArray } from "drizzle-orm"
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

export async function getStorefrontDesigns(query: string, colors: string[], categories: string[]) {
  const searchPattern = `%${query}%`

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
      categories.length > 0 ? inArray(designs.category, categories) : undefined
    ),
    with: {
      variants: true,
    },
  })

  return data
}