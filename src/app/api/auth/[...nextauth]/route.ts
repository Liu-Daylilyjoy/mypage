import NextAuth from "next-auth";
import { authOptions } from "@/config/AuthConfig";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 