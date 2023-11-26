import { findUserByEmail } from "@/db/user";
import { getServerSession } from "next-auth";

export default async function getUserId() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;
  return (await findUserByEmail(session.user.email))?.id ?? null;
}
