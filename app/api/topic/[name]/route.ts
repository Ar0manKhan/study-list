import { deleteTopicByTitleAndUser } from "@/db/topic";
import getUserId from "@/utils/users/getUserId";

export async function DELETE(
  _req: Request,
  params: { params: { name: string } },
) {
  const userId = await getUserId();
  if (userId === null) return new Response("Unauthorized", { status: 401 });
  const { name } = params.params;
  const deleteIds = await deleteTopicByTitleAndUser(name, userId);
  if (deleteIds.length === 0) return new Response("Not Found", { status: 404 });
  return new Response("OK", { status: 200 });
}
