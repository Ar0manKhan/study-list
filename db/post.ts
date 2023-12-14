import { post } from "./schema";
import db from "./db";

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
