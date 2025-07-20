'use client'

import { useEffect, useState } from "react";
import { FileText, Lightbulb, Camera, RefreshCcw } from "lucide-react";
import Link from "next/link";
import DashboardStats from "@/components/common/Stats/DashboardStats";

interface Stats {
  blogs: number;
  thinkings: number;
  photos: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({ blogs: 0, thinkings: 0, photos: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();

        setStats({
          blogs: data.blogs || 0,
          thinkings: data.thinkings || 0,
          photos: data.photos || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: "Write Blog",
      href: "/admin/blogs/new",
      icon: <FileText size={24} className="text-blue-500" />,
    },
    {
      title: "Create Thinking",
      href: "/admin/thinkings/new",
      icon: <Lightbulb size={24} className="text-yellow-500" />,
    },
    {
      title: "Update Photo",
      href: "/admin/photos/new",
      icon: <Camera size={24} className="text-green-500" />,
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="rotate-3d"><img src="/image/loading/loading.svg" alt="loading" className="w-10 h-10" /></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin</h1>
        <p className="text-muted-foreground mt-2">Welcome back, this is your personal website admin backend</p>
        <div className="mt-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <RefreshCcw size={16} />
            Refresh
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-border">
        <div className="bg-gray-100 md:bg-transparent p-6 flex items-center">
          <p className="text-lg font-medium text-muted-foreground md:w-32 w-64">Blogs:</p>
          <p className="text-5xl font-bold">{stats.blogs}</p>
        </div>

        <div className="bg-transparent px-6 flex items-center">
          <p className="text-lg font-medium text-muted-foreground md:w-32 w-64">Thinkings:</p>
          <p className="text-5xl font-bold">{stats.thinkings}</p>
        </div>

        <div className="bg-gray-100 md:bg-transparent p-6 flex items-center">
          <p className="text-lg font-medium text-muted-foreground md:w-32 w-64">Photos:</p>
          <p className="text-5xl font-bold">{stats.photos}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="bg-card p-6 border border-border hover:border-primary/50 hover:bg-primary/5 hover:-translate-y-1 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className='p-3 rounded-lg text-white'>
                  {action.icon}
                </div>
                <p className="font-medium group-hover:text-primary transition-colors">
                  {action.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dashboard Statistics */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Statistics</h2>
        <DashboardStats period="30d" />
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">最近活动</h2>
        <div className="bg-card p-6 rounded-lg border border-border">
          <p className="text-muted-foreground">
            暂无最近活动记录
          </p>
        </div>
      </div>
    </div>
  );
} 