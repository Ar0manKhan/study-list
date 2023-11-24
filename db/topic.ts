import { topic } from "./schema";
import db from "./db";
import { eq } from "drizzle-orm";

export function getTopics(userId: number) {
  return db.select().from(topic).where(eq(topic.user, userId));
}
