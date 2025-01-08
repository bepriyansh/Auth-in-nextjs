import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import { loginUtil, registerUtil } from "./actions/auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Google,
        Credentials({
            name: 'Credentials',
            credentials: {
                name: { label: "Name", type: "text" },
                password: { label: "Password", type: "password" },
                email: { label: "Email", type: "email" },
            },
            authorize: async (credentials) => {
                let user = null;
                if (!credentials.name) {
                    console.log("Login creds : ", credentials)
                    user = await loginUtil(credentials.email as string, credentials.password as string)
                } else {
                    console.log("Sign Up creds : ", credentials)
                    user = await registerUtil(credentials.name as string, credentials.email as string, credentials.password as string)
                }
                return user;
            }
        })
    ],
})