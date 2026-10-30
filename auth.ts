import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter";

export const {handlers,auth,signIn,signOut} = NextAuth({
    providers: [Google],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'database'
    }
})