import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export var user = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).unique().notNull(),
})

export var category = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
  user: integer("user_id").references(() => user.id),
})
