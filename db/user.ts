import { eq, sql } from 'drizzle-orm';
import db from './db';
import { User } from './schema';

export async function findOrCreateUser(name: string, email: string) {
  // Not adding limit 1 because user email is unique
  const res = await db.select().from(User).where(eq(User.email, email));
  console.log(res);
}
