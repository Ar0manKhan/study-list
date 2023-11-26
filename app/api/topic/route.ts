import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { createTopic, getTopics } from "@/db/topic";
import { findOrCreateUser } from "@/db/user";
import { isAuthenticated } from "@/utils/isAuthenticated";
import getUserId from "@/utils/users/getUserId";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.redirect("/api/auth/signin");
  }
  const userId = await findOrCreateUser(session.user.email);
  // if(!userId) {
  //   return NextResponse.redirect("/api/auth/signin");
  // }
  // const topics = await getTopics(userId);
  // console.log(topics);
  return NextResponse.json({ name: "hello" });
}

export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.redirect("/api/auth/signin");
  }
  const { title } = await req.json();
  if (!title)
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  if (typeof title !== "string")
    return NextResponse.json(
      { error: "title must be a string" },
      { status: 400 },
    );
  try {
    await createTopic(userId, title);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    if (error?.message === "Topic already exists") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
