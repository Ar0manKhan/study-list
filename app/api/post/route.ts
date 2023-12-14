import { createPost } from "@/db/post";
import { getTopicByTitleAndUserId } from "@/db/topic";
import getUserId from "@/utils/users/getUserId";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userId = await getUserId();
  if (userId === null) {
    return NextResponse.redirect("/api/auth/signin");
  }
  const body = await req.json();
  const { url, title, description, topic } = body as {
    url: string;
    title: string;
    description: string;
    topic: string;
  };
  if (!(topic && url && title)) {
    return NextResponse.json(
      { error: "topic, url and title are required" },
      { status: 400 },
    );
  }
  const dbTopic = await getTopicByTitleAndUserId(topic, userId);
  if (topic === null || dbTopic?.user !== userId)
    return NextResponse.json({ error: "Topic not found" }, { status: 400 });
  try {
    await createPost({ url, title, description, topic: dbTopic.id });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (e)
      return NextResponse.json(
        { error: "Post already exists" },
        { status: 400 },
      );
    return NextResponse.json({ error: "Unknown error" }, { status: 400 });
  }
}
