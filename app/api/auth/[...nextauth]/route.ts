import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
})

export { handler as GET, handler as POST }
