import { getPostsByTopicAndUser } from "@/db/post";
import getUserId from "@/utils/users/getUserId";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import PostModal from "./PostModal";
import axios, { AxiosError } from "axios";
import DeletePostButton from "./DeletePostBtn";

export default async function PostList({ topic }: { topic: string }) {
  const user = await getUserId();
  if (user === null) return redirect("/login");
  const posts = await getPostsByTopicAndUser(topic, user);
  if (posts.length === 0) return <p>No posts yet!</p>;
  return (
    <div className="p-4 flex gap-4 flex-wrap">
      {posts.map((e) => (
        <PostCard key={e.id} {...e} />
      ))}
    </div>
  );
}

function PostCard({
  id,
  title,
  url,
  description,
}: {
  id: number;
  title: string;
  url: string;
  description: string | null;
}) {
  return (
    <div className="card w-96 bg-neutral text-base-content">
      <div className="card-body gap-4">
        <Link href={url} target="_blank">
          <h2 className="card-title underline">{title}</h2>
        </Link>
        <p className="text-sm max-h-28 overflow-auto">{description}</p>
        <div className="card-actions justify-end">
          <PostModal
            id={id}
            title={title}
            url={url}
            description={description}
          />
          <DeletePostButton id={id} />
        </div>
      </div>
    </div>
  );
}
