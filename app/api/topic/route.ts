import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getTopics } from "@/db/topic";
import { findOrCreateUser } from "@/db/user";

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
