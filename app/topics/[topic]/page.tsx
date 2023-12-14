import { getTopicByTitle } from "@/db/topic";
import { CreateNewPost } from "./components/NewPost";
import { redirect } from "next/navigation";

export default async function Topic({ params }: { params: { topic: string } }) {
  const topic = await getTopicByTitle(params.topic);
  if (topic === null) {
    redirect("/404");
  }
  return (
    <main>
      <CreateNewPost topic={params.topic} />
    </main>
  );
}
