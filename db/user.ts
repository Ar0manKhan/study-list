import { eq, sql } from 'drizzle-orm';
import db from './db';
import { user } from './schema';

export async function findOrCreateUser(email: string) {
  // Not adding limit 1 because user email is unique
  const res = await db.select().from(user).where(eq(user.email, email));
  if (res.length === 0)
    await db.insert(user).values({ email });
}
