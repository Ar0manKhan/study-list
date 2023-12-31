import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { findOrCreateUser } from "@/db/user";
import { TopicSidebar } from "./topic/sidebar";

export async function Navbar() {
  const session = await getServerSession();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {session?.user?.email && <TopicSidebar />}
        <Link className="btn btn-ghost text-xl" href="/">
          Study List
        </Link>
      </div>
      <div className="navbar-end">
        <AuthButtons />
      </div>
    </div>
  );
}

async function AuthButtons() {
  const session = await getServerSession();
  if (session?.user) {
    LoadUserToDb(session.user?.email!);
    return (
      <div className="dropdown dropdown-end">
        <label tabIndex={0}>
          <Image
            src={session.user.image || ""}
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
        >
          <li>
            <Link href="/api/auth/signout">Sign Out</Link>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <Link className="btn" href="/api/auth/signin">
      Sign In
    </Link>
  );
}

async function LoadUserToDb(email: string) {
  findOrCreateUser(email);
}
