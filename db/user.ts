import { eq, sql } from 'drizzle-orm';
import db from './db';
import { user } from './schema';

export async function findOrCreateUser(name: string, email: string) {
  // Not adding limit 1 because user email is unique
  const res = await db.select().from(user).where(eq(user.email, email));
  console.log(res);
}
