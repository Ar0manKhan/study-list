import { getServerSession } from "next-auth"
import { TopicSidebar } from "./components/topic/sidebar"

export default async function Home() {
  const session = await getServerSession();
  return (
    <main>
      { session?.user?.email && <TopicSidebar /> }
      <h1>Hello Next</h1>
      <button className="btn btn-primary">Click me</button>
    </main>
  )
}
