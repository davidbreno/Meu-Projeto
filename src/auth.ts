import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (credentials.email === "admin@manuaisraros.com" && credentials.password === "admin123") {
          return { id: "1", email: credentials.email as string, name: "Admin" };
        }

        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
});
