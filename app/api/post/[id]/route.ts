import { deletePostByIdAndUser, updatePost } from "@/db/post";
import getUserId from "@/utils/users/getUserId";
import { NextResponse } from "next/server";

export async function PUT(req: Request, params: { params: { id: string } }) {
  const id = parseInt(params.params.id);
  if (isNaN(id)) return new Response("Invalid ID", { status: 400 });
  const userId = await getUserId();
  if (userId === null) return new Response("Unauthorized", { status: 401 });
  const body = await req.json();
  const { url, title, description } = body;
  if (url === undefined || title === undefined)
    return new Response("Missing required fields", { status: 400 });
  try {
    await updatePost(userId, id, url, title, description);
  } catch (e: any) {
    if (e?.message === "Post not found")
      return new Response(e.message, { status: 404 });
    else if (e?.message === "Data too long")
      return new Response(e.message, { status: 400 });
    return new Response("Something went wrong", { status: 500 });
  }
  return NextResponse.json({ success: true }, { status: 200 });
}

export async function DELETE(req: Request, params: { params: { id: string } }) {
  const id = parseInt(params.params.id);
  if (isNaN(id)) return new Response("Invalid ID", { status: 400 });
  const userId = await getUserId();
  if (userId === null) return new Response("Unauthorized", { status: 401 });
  try {
    await deletePostByIdAndUser(userId, id);
    return new Response("OK", { status: 200 });
  } catch (e: any) {
    if (e?.message === "Post not found")
      return new Response(e.message, { status: 404 });
    return new Response("Something went wrong", { status: 500 });
  }
}
