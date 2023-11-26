import { topic } from "./schema";
import db from "./db";
import { desc, eq } from "drizzle-orm";

export function getTopics(userId: number) {
  return db
    .select({ title: topic.title })
    .from(topic)
    .where(eq(topic.user, userId))
    .orderBy(desc(topic.id));
}

export async function createTopic(user: number, title: string) {
  try {
    const res = await db.insert(topic).values({ title, user });
    return res;
  } catch (e: any) {
    if (e?.code === "23505") throw new Error("Topic already exists");
    throw e;
  }
}
