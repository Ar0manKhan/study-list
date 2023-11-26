import { getServerSession } from "next-auth";

export async function isAuthenticated(): Promise<false | string> {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return false;
  }
  return session.user.email;
}
