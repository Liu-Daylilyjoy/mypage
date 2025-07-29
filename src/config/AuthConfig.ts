import { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password", placeholder: "admin" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === process.env.ADMIN_USER &&
          credentials?.password === process.env.ADMIN_PASS
        ) {
          return { id: "admin", name: "Admin" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 10,
    updateAge: 60,
  },
  jwt: {
    maxAge: 60 * 10,
    // 密钥自动从 .env 读取 NEXTAUTH_SECRET
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }: { session: Session, token: JWT }) {
      session.user = { name: (token.user as { name?: string })?.name ?? null };

      // 将 token 的过期时间同步到 session
      if (token.exp) {
        session.expires = new Date(token.exp as number * 1000).toISOString();
      }

      return session;
    },
    async jwt({ token, user }: { token: JWT, user: User }) {
      if (user) {
        token.user = user;
        token.iat = Math.floor(Date.now() / 1000);
        token.exp = Math.floor(Date.now() / 1000) + (60 * 10); 
      }

      if (token) {
        const now = Math.floor(Date.now() / 1000);
        const currentExp = token.exp as number;

        // 如果 token 即将过期，则延长过期时间
        if (currentExp && (currentExp - now) < 60 * 5) {
          token.iat = now;
          token.exp = now + (60 * 10); 
        }
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};