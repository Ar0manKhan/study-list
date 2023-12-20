import { post, topic } from "./schema";
import db from "./db";
import { and, eq } from "drizzle-orm";

export async function getPostsByTopicAndUser(topicTitle: string, user: number) {
  try {
    return await db
      .select({
        id: post.id,
        title: post.title,
        url: post.url,
        description: post.description,
      })
      .from(post)
      .innerJoin(topic, eq(post.topic, topic.id))
      .where(and(eq(topic.title, topicTitle), eq(topic.user, user)))
      .limit(10);
  } catch (e) {
    throw e;
  }
}

export async function createPost(data: {
  url: string;
  title: string;
  description: string;
  topic: number;
}) {
  try {
    return await db.insert(post).values(data).returning({ id: post.id });
  } catch (e: any) {
    if (e?.code === "23505") throw new Error("Post already exists");
    throw e;
  }
}

export async function updatePost(
  user: number,
  id: number,
  url: string,
  title: string,
  description?: string,
) {
  const resSelect = await db
    .select({ user: topic.user })
    .from(post)
    .innerJoin(topic, eq(post.topic, topic.id))
    .where(eq(post.id, id));
  if (resSelect.length === 0 || resSelect[0]?.user !== user)
    throw new Error("Post not found");
  try {
    await db
      .update(post)
      .set({ url, title, description })
      .where(eq(post.id, id));
  } catch (e: any) {
    if (e?.code === "22001") throw new Error("Data too long");
  }
  return true;
}

export interface Post {
  title: string;
  url: string;
  description: string;
  topic: number;
}

export interface PostPg extends Post {
  id: number;
}
