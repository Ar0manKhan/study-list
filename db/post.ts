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

export async function getPostByIdAndUser(id: number, user: number) {
  const resSelect = await db
    .select({
      user: topic.user,
      id: post.id,
      url: post.url,
      title: post.title,
      description: post.description,
    })
    .from(post)
    .innerJoin(topic, eq(post.topic, topic.id))
    .where(eq(post.id, id));
  if (resSelect.length === 0 || resSelect[0]?.user !== user)
    throw new Error("Post not found");
  return resSelect[0];
}

export async function updatePost(
  user: number,
  id: number,
  url: string,
  title: string,
  description?: string,
) {
  await getPostByIdAndUser(id, user);
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

export async function deletePostByIdAndUser(user: number, id: number) {
  await getPostByIdAndUser(id, user);
  return await db
    .delete(post)
    .where(eq(post.id, id))
    .returning({ id: post.id });
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
