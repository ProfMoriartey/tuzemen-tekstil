import { pgTable, serial, text, varchar, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const designs = pgTable("designs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 255 }),
  displayImageUrl: text("display_image_url"),
  composition: varchar("composition", { length: 255 }),
  width: integer("width"),
  weight: integer("weight"), // Stores GR/M2
  hasLeadband: boolean("has_leadband").default(false),
  fabricType: varchar("fabric_type", { length: 255 }),
 createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const variants = pgTable("variants", {
  id: serial("id").primaryKey(),
  designId: integer("design_id").references(() => designs.id).notNull(),
  color: varchar("color", { length: 255 }).notNull(),
  sku: varchar("sku", { length: 255 }),
  imageUrl: text("image_url"),
})

export const designsRelations = relations(designs, ({ many }) => ({
  variants: many(variants),
}))

export const variantsRelations = relations(variants, ({ one }) => ({
  design: one(designs, {
    fields: [variants.designId],
    references: [designs.id],
  }),
}))

export const sampleRequests = pgTable("sample_requests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }),
  address: text("address").notNull(),
  notes: text("notes"),
  items: jsonb("items").notNull(), // Stores the cart array
  status: varchar("status", { length: 50 }).default("pending").notNull(), // pending, contacted, shipped
  createdAt: timestamp("created_at").defaultNow().notNull(),
})