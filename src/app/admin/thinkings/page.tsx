'use client'

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Search, Image } from "lucide-react";
import Link from "next/link";
import CompressedImage from "@/components/common/CompressedImage/CompressedImage";
import { adminImageConfig } from "@/config/ImageConfig";
import useThinkingList from "@/hook/useThinkingList";
import { mutate } from "swr";

interface Thinking {
  id: string;
  title: string;
  detail: string;
  cover: string;
  createdAt: string;
  updatedAt: string;
}

export default function ThinkingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: thinkings = [], isLoading: loading } = useThinkingList();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this thinking?')) return;

    try {
      const response = await fetch(`/api/thinkings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 重新获取数据以更新列表
        mutate('/api/thinkings');
      } else {
        alert('Failed to delete');
      }
    } catch (error) {
      console.error('Failed to delete thinking:', error);
      alert('Failed to delete');
    }
  };

  const filteredThinkings = thinkings.filter((thinking: Thinking) =>
    thinking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thinking.detail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Thinking Management</h1>
          <p className="text-muted-foreground mt-2">Manage your thinking records</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/thinkings/new"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus size={16} />
            New Thinking
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Search thinking records..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Thinkings Columns */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {filteredThinkings.length === 0 ? (
          <div className="w-full p-8 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? 'No matching thinking records found' : 'No thinking records'}
            </p>
            {!searchTerm && (
              <Link
                href="/admin/thinkings/new"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus size={16} />
                Create your first thinking record
              </Link>
            )}
          </div>
        ) : (
          filteredThinkings.map((thinking: Thinking) => (
            <div key={thinking.id} className="bg-card border border-border overflow-hidden shadow-secondary hover:shadow-lg transition-shadow break-inside-avoid mb-6">
              {/* Cover Image */}
              <div className="bg-muted flex items-center justify-center overflow-hidden">
                {thinking.cover ? (
                  <CompressedImage
                    src={`/api/thinkings/content/${thinking.cover}`}
                    alt={thinking.title}
                    className="w-full h-full object-cover"
                    targetWidth={adminImageConfig.thinking.targetWidth}
                    quality={adminImageConfig.thinking.quality}
                    fallbackIcon={<Image size={48} />}
                  />
                ) : (
                  <div className="flex items-center justify-center text-muted-foreground">
                    <Image size={48} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {thinking.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {thinking.detail}
                </p>

                <div className="flex flex-col items-end justify-between text-xs text-muted-foreground mb-4">
                  <span>Created at {formatDate(thinking.createdAt)}</span>
                  <span>Updated at {formatDate(thinking.updatedAt)}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/thinking/${thinking.id}`}
                    target="_blank"
                    className="p-2 hover:bg-accent rounded-md transition-colors"
                    title="View"
                  >
                    <Eye size={16} />
                  </Link>
                  <Link
                    href={`/admin/thinkings/edit/${thinking.id}`}
                    className="p-2 hover:bg-accent rounded-md transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(thinking.id)}
                    className="p-2 hover:bg-accent rounded-md transition-colors text-destructive"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="text-sm text-muted-foreground">
        Total {filteredThinkings.length} thinking records
      </div>
    </div>
  );
} 