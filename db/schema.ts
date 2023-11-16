import { pgTable, serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const User = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).unique(),
}, users => {
  return {
    uniqueEmailIndex: uniqueIndex("email_idx").on(users.email),
  }
})
