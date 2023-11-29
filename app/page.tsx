import { getServerSession } from "next-auth";
import { TopicSidebar } from "./components/topic/sidebar";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main>
      <div className="flex">
        <div className="flex-1">
          <h1>Home</h1>
        </div>
      </div>
    </main>
  );
}
