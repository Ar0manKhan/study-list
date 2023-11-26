import { eq, sql } from "drizzle-orm";
import db from "./db";
import { user } from "./schema";

export async function findOrCreateUser(email: string): Promise<number> {
  // Not adding limit 1 because user email is unique
  const res = await db.select().from(user).where(eq(user.email, email));
  if (res.length > 0) {
    return res[0].id;
  }
  return (await db.insert(user).values({ email }).returning({ id: user.id }))[0]
    .id;
}

export async function findUserByEmail(email: string) {
  const res = await db.select().from(user).where(eq(user.email, email));
  if (res.length > 0) {
    return res[0];
  }
  return null;
}

export type User = typeof user.$inferSelect;
