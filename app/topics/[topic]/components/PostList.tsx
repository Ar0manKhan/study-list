import { getPostsByTopicAndUser } from "@/db/post";
import getUserId from "@/utils/users/getUserId";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

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
      <div className="card-body">
        <Link href={url} target="_blank">
          <h2 className="card-title underline">{title}</h2>
        </Link>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">
            <Image
              src="/resize-arrows-14939.svg"
              width={20}
              height={20}
              alt="expand"
            />
          </button>
          <button className="btn btn-error">
            <Image
              src="/trash-can-10416.svg"
              width={20}
              height={20}
              alt="expand"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
