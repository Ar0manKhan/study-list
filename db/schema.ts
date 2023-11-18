import { pgTable, serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export var user = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).unique().notNull(),
})
