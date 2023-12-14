// TODO: Add auth middlewares
import scrape from "@/utils/scrape";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let url = "";
  // const { url } = (await req.json()) ?? {};
  try {
    url = (await req.json()).url;
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      return new Response("url is required", { status: 400 });
    }
    return new Response("Something went wrong", { status: 500 });
  }
  // fetch url and extract title from the html
  const title = await scrape(url);
  // TODO: Cache the title in the db
  return NextResponse.json({ title });
}
