import { config } from "dotenv"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { designs, variants } from "./schema"
import data from "./data.json"

config({ path: ".env" })

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function main() {
  console.log("Seeding started")

  for (const item of data) {
    const [insertedDesign] = await db
      .insert(designs)
      .values({ name: item.name })
      .returning({ id: designs.id })

    if (insertedDesign) {
      const variantRecords = item.colors.map((color) => ({
        designId: insertedDesign.id,
        color: color,
      }))

      await db.insert(variants).values(variantRecords)
    }
  }

  console.log("Seeding finished")
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})