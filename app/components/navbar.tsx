import { DefaultSession, getServerSession } from "next-auth"
import Link from "next/link"
import Image from "next/image"
import { findOrCreateUser } from "@/db/user"

export function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl" href="/">Study List</Link>
      </div>
      <AuthButtons />
    </div >
  )
}

async function AuthButtons() {
  const session = await getServerSession()
  if (session?.user) {
    LoadUserToDb(session.user?.email!);
    return (
      <div className="navbar-end">
        {/* <Link className="btn" href="/api/auth/signout">Sign Out</Link> */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0}>
            <Image src={session.user.image || ""} alt="Profile" width={32} height={32} className="rounded-full" />
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
            <li><Link href="/api/auth/signout">Sign Out</Link></li>
          </ul>
        </div>
      </div>
    )
  }
  return (
    <div className="navbar-end">
      <Link className="btn" href="/api/auth/signin">Sign In</Link>
    </div>
  )
}

async function LoadUserToDb(email: string) {
findOrCreateUser( email );
}






















