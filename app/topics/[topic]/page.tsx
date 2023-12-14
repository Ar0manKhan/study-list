import { getTopicByTitleAndUserId } from "@/db/topic";
import { CreateNewPost } from "./components/NewPost";
import { redirect } from "next/navigation";
import getUserId from "@/utils/users/getUserId";

export default async function Topic({ params }: { params: { topic: string } }) {
  const user = await getUserId();
  if (user === null) return redirect("/login");
  const topic = await getTopicByTitleAndUserId(params.topic, user);
  if (topic === null) {
    redirect("/404");
  }
  return (
    <main>
      <CreateNewPost topic={params.topic} />
    </main>
  );
}
