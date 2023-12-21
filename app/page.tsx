import { getTopics } from "@/db/topic";
import getUserId from "@/utils/users/getUserId";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main>
      <div className="flex">
        <div className="flex-1">
          {session ? (
            <TopicGrid />
          ) : (
            <h1 className="text-2xl">
              Please login{" "}
              <Link href="/api/auth/signin" className="underline">
                Here
              </Link>
            </h1>
          )}
        </div>
      </div>
    </main>
  );
}

async function TopicGrid() {
  const userId = await getUserId();
  if (userId === null) return redirect("/api/auth/signin");
  const topics = (await getTopics(userId)).map((e) => e.title);
  if (topics.length === 0)
    return <h1 className="text-2xl text-center">No topics found</h1>;
  return (
    <>
      <h1 className="text-2xl text-center">Topics</h1>
      <div className="p-4 flex flex-wrap justify-center gap-4">
        {topics.map((title) => (
          <TopicCard title={title} key={title} />
        ))}
      </div>
    </>
  );
}

async function TopicCard({ title }: { title: string }) {
  return (
    <Link href={`/topics/${title}`}>
      <div className="card w-72 bg-base-300 dark:bg-neutral text-base-content">
        <div className="card-body">
          <h2 className="card-title underline">{title}</h2>
        </div>
      </div>
    </Link>
  );
}
