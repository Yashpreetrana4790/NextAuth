import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { GetUserById } from "./data/user"
import NextAuth, { type DefaultSession } from "next-auth"

declare module "next-auth" {

  interface Session {
    user: {
      role: string
    } & DefaultSession["user"]
  }
}



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  pages: {
    signIn: "/auth/login",
    error: " /auth/error"
  },
  callbacks: {
    async signIn({ user }) {
      console.log(user, "user")
      return true
    },
    async session({
      token, session
    }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as string
      }
      return session
    },

    async jwt({
      token
    }) {
      if (!token.sub) return token;
      const existingUser = await GetUserById(token.sub)
      if (!existingUser) return token
      token.role = existingUser.role
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})  