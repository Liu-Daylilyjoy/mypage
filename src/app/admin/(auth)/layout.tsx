'use client'

import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/theme/theme-mode-toggle";
import {
  FileText,
  Lightbulb,
  Camera,
  LogOut,
  Menu,
  X,
  Home,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { useSession } from "next-auth/react";

const adminNavItems = [
  {
    title: "Home",
    href: "/admin",
    icon: <Home size={20} />
  },
  {
    title: "Blog Management",
    href: "/admin/blogs",
    icon: <FileText size={20} />
  },
  {
    title: "Thinking Management",
    href: "/admin/thinkings",
    icon: <Lightbulb size={20} />
  },
  {
    title: "Photo Management",
    href: "/admin/photos",
    icon: <Camera size={20} />
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  let pathname = usePathname();

  const pathnameArray = pathname.split('/');
  if (pathnameArray.length > 3) {
    pathname = pathnameArray.slice(0, 3).join('/');
  }

  const { data: session, status, update } = useSession();
  if (status === "unauthenticated") {
    redirect("/login");
  }

  useEffect(() => {
    if (!session) return;

    // 每5分钟刷新一次 session
    const interval = setInterval(async () => {
      try {
        await update();
        console.log('Session refreshed at:', new Date().toLocaleString());
      } catch (error) {
        console.error('Failed to refresh session:', error);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [session, update]);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-card border-r border-border transform transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'md:w-16 w-64' : 'w-64'}
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className='flex items-center justify-between border-b border-border p-2'>
            <h1 className={`text-xl font-bold ${sidebarCollapsed ? 'md:hidden' : ''}`}>Admin</h1>
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-end w-full pr-1.5' : ''}`}>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden md:block p-2 hover:bg-accent rounded-md transition-colors"
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-2 hover:bg-accent rounded-md"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className='flex-1'>
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 p-3 transition-colors h-12
                  ${pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                  }
                  md:px-5
                `}
                onClick={() => setSidebarOpen(false)}
                title={sidebarCollapsed ? item.title : undefined}
              >
                <span>{item.icon}</span>
                <span className={`whitespace-nowrap ${sidebarCollapsed ? 'md:hidden' : ''}`}>{item.title}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className='border-t border-border p-4 overflow-hidden'>
            <div className={`flex items-center ${sidebarCollapsed ? 'md:justify-start justify-between' : 'justify-between'}`}>
              <ModeToggle />
              <Link
                href="/"
                className={`whitespace-nowrap flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors ${sidebarCollapsed ? 'md:hidden' : ''}`}
              >
                <LogOut size={16} />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'md:ml-16 ml-0' : 'md:ml-64 ml-0'}`}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-accent rounded-md"
            >
              <Menu size={20} />
            </button>
            <div className="flex-1" />
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">Admin</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 