import { CreateNewPost } from "./components/NewPost";

export default async function Topic({ params }: { params: { topic: string } }) {
  return (
    <main>
      <CreateNewPost />
    </main>
  );
}
