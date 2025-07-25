import { getServerSession } from "next-auth";
import { authOptions } from "@/config/AuthConfig";

export async function adminAuth(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return session !== null;
}