import { currentUser } from "@clerk/nextjs/server"
import { ilike, or, exists, and, eq } from "drizzle-orm"
import { db } from "~/server/db"
import { designs, variants } from "~/server/db/schema"

export async function getFilteredDesigns(query: string, sortBy: string, sortOrder: "asc" | "desc") {

  const user = await currentUser()
  
  if (user?.publicMetadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required")
  }
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
    let valueA: string | number | Date = ""
    let valueB: string | number | Date = ""

    if (sortBy === "variants") {
      valueA = a.variants.length
      valueB = b.variants.length
    } else {
      const propA = (a as Record<string, unknown>)[sortBy]
      const propB = (b as Record<string, unknown>)[sortBy]

      valueA = typeof propA === "string" || typeof propA === "number" || propA instanceof Date ? propA : ""
      valueB = typeof propB === "string" || typeof propB === "number" || propB instanceof Date ? propB : ""
    }

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1
    return 0
  })
}