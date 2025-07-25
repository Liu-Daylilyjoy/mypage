import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/serverAuth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!await adminAuth()) {
    redirect("/login");
  }
  return <>{children}</>;
} 