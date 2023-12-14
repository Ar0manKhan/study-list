export default async function scrape(url: string) {
  try {
    if (url === "") {
      throw new Error("url is required");
    }
    const res = await fetch(url);
    const html = await res.text();
    const title = html.match(/<title[^>]*>([^<]+)<\/title>/)?.[1];
    if (!title) {
      throw new Error("Title not found");
    }
    return title;
  } catch (error: any) {
    console.error(error);
    return "Something went wrong";
  }
}
