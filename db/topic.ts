import { topic } from "./schema";
import db from "./db";
import { and, desc, eq } from "drizzle-orm";

export function getTopics(userId: number) {
  return db
    .select({ title: topic.title })
    .from(topic)
    .where(eq(topic.user, userId))
    .orderBy(desc(topic.id));
}

export async function createTopic(user: number, title: string) {
  try {
    return await db.insert(topic).values({ title, user });
  } catch (e: any) {
    if (e?.code === "23505") throw new Error("Topic already exists");
    throw e;
  }
}

export async function getTopicByTitleAndUserId(title: string, userId: number) {
  const res = await db
    .select()
    .from(topic)
    .where(and(eq(topic.title, title), eq(topic.user, userId)))
    .limit(1);
  if (res.length === 0) return null;
  return res?.[0];
}
