import { ilike, or, exists, and, eq } from "drizzle-orm"
import { designs, variants } from "../db/schema"
import { db } from "../db"

export async function getFilteredDesigns(query: string, sortBy: string, sortOrder: "asc" | "desc") {
  const searchPattern = `%${query}%`

  const data = await db.query.designs.findMany({
    where: query ? or(
      ilike(designs.name, searchPattern),
      ilike(designs.category, searchPattern),
      ilike(designs.description, searchPattern),
      exists(
        db.select().from(variants).where(
          and(
            eq(variants.designId, designs.id),
            ilike(variants.color, searchPattern)
          )
        )
      )
    ) : undefined,
    with: {
      variants: true,
    },
  })

  return data.sort((a, b) => {
    let valueA: any = a[sortBy as keyof typeof a]
    let valueB: any = b[sortBy as keyof typeof b]

    if (sortBy === "variants") {
      valueA = a.variants.length
      valueB = b.variants.length
    }

    if (valueA === null) valueA = ""
    if (valueB === null) valueB = ""

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1
    return 0
  })
}