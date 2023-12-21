import { getTopicByTitleAndUserId } from "@/db/topic";
import { CreateNewPost } from "./components/PostDialog";
import { redirect } from "next/navigation";
import getUserId from "@/utils/users/getUserId";
import PostList from "./components/PostList";

export default async function Topic({ params }: { params: { topic: string } }) {
  const user = await getUserId();
  if (user === null) return redirect("/login");

  const topic = await getTopicByTitleAndUserId(decodeURI(params.topic), user);
  if (topic === null) {
    redirect("/404");
  }
  return (
    <main>
      <PostList topic={params.topic} />
      <CreateNewPost topic={params.topic} />
    </main>
  );
}
