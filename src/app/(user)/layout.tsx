"use client";

import Navbar from "@/components/common/Navbar/Navbar";
import VisitTracker from "@/components/common/Stats/VisitTracker";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      document.documentElement.style.overflow = "auto";
    }
  }, [pathname]);

  return (
    <>
      <Navbar />
      <VisitTracker />
      {children}
    </>
  );
}