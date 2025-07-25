'use client'

import { useState } from "react";
import { Plus, Edit, Trash2, Search, Image as ImageIcon, Upload } from "lucide-react";
import Link from "next/link";
import CompressedImage from "@/components/common/CompressedImage/CompressedImage";
import { adminImageConfig } from "@/config/ImageConfig";
import useThinkingList from "@/hook/useThinkingList";
import { mutate } from "swr";
import Maple3D from "@/components/common/Loading/Maple3D";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/shadcn/dialog";
import { toast } from "sonner";
import { useRef } from "react";

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
  const [editThinking, setEditThinking] = useState<Thinking | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDetail, setEditDetail] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const fileInputRefs = useRef<{ [id: string]: HTMLInputElement | null }>({});
  const [imgRefreshMap, setImgRefreshMap] = useState<{ [id: string]: number }>({});

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    const toastId = toast.loading('Deleting...');
    try {
      const response = await fetch(`/api/thinkings/${deleteId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        mutate('/api/thinkings');
        toast.success('Delete success', { id: toastId });
        setDeleteId(null);
      } else {
        toast.error('Delete failed', { id: toastId });
      }
    } catch {
      toast.error('Delete failed', { id: toastId });
    } finally {
      setDeleteLoading(false);
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
      <Maple3D />
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
            <div key={thinking.id} className="bg-card border border-border overflow-hidden shadow-secondary hover:shadow-lg hover:-translate-y-1.5 transition-all break-inside-avoid mb-6">
              {/* Cover Image with upload on hover */}
              <div className="relative group bg-muted flex items-center justify-center overflow-hidden">
                {thinking.cover ? (
                  <CompressedImage
                    key={imgRefreshMap[thinking.id]}
                    src={thinking.cover.startsWith('http') ? thinking.cover : `/api/thinkings/content/${thinking.cover}`}
                    alt={thinking.title}
                    className="w-full h-full object-cover"
                    targetWidth={adminImageConfig.thinking.targetWidth}
                    quality={adminImageConfig.thinking.quality}
                    fallbackIcon={<ImageIcon size={48} />}
                  />
                ) : (
                  <div className="flex items-center justify-center text-muted-foreground w-full h-40">
                    <ImageIcon size={48} />
                  </div>
                )}
                {/* 上传按钮，仅 hover 时显示 */}
                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => fileInputRefs.current[thinking.id]?.click()}
                  style={{ pointerEvents: 'auto' }}
                >
                  <Upload size={32} className="text-white" />
                </button>
                <input
                  ref={el => { fileInputRefs.current[thinking.id] = el; }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    if (!e.target.files || !e.target.files[0]) return;
                    const file = e.target.files[0];
                    const formData = new FormData();
                    formData.append('file', file);
                    try {
                      const imgPath = thinking.cover.startsWith('http') ? file.name : thinking.cover;
                      const res = await fetch(`/api/thinkings/content/${imgPath}/${thinking.id}`, {
                        method: 'POST',
                        body: formData,
                      });
                      if (res.ok) {
                        await mutate('/api/thinkings');
                        setImgRefreshMap(prev => ({
                          ...prev,
                          [thinking.id]: Date.now()
                        }));
                        toast.success('Uploaded successfully');
                      } else {
                        const text = await res.json();
                        toast.error(`Upload failed: ${text.error}`);
                      }
                    } catch {
                      toast.error('Upload failed');
                    }
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  {thinking.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {thinking.detail}
                </p>

                <div className="flex flex-col items-end justify-between text-xs text-muted-foreground mb-4">
                  <span>Created at {formatDate(thinking.createdAt)}</span>
                  <span>Updated at {formatDate(thinking.updatedAt)}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="p-2 hover:bg-accent rounded-md transition-colors"
                    title="Edit"
                    onClick={() => {
                      setEditThinking(thinking);
                      setEditTitle(thinking.title);
                      setEditDetail(thinking.detail);
                    }}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteId(thinking.id)}
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

      {/* 编辑 Dialog */}
      <Dialog open={!!editThinking} onOpenChange={open => { if (!open) setEditThinking(null); }}>
        <DialogContent className="max-w-md rounded-sm" showCloseButton={false} >
          <DialogHeader>
            <DialogTitle>Edit Thinking</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={async e => {
              e.preventDefault();
              if (!editThinking) return;
              setEditLoading(true);
              try {
                const response = await fetch(`/api/thinkings/${editThinking.id}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ title: editTitle, detail: editDetail }),
                });
                if (response.ok) {
                  mutate('/api/thinkings');
                  setEditThinking(null);
                  toast.success('Updated successfully');
                } else {
                  const text = await response.json();
                  toast.error(`Failed to update: ${text.error}`);
                }
              } catch {
                toast.error('Failed to update');
              } finally {
                setEditLoading(false);
              }
            }}
            className="flex flex-col gap-4 mt-4"
          >
            <input
              type="text"
              value={editTitle}
              tabIndex={-1}
              onChange={e => setEditTitle(e.target.value)}
              className="border border-border rounded-md px-3 py-2 bg-background text-base focus:outline-none focus:ring-2 focus:ring-theme-color"
              placeholder="Title"
              required
            />
            <textarea
              tabIndex={-1}
              value={editDetail}
              onChange={e => setEditDetail(e.target.value)}
              className="border border-border rounded-md px-3 py-2 bg-background text-base focus:outline-none focus:ring-2 focus:ring-theme-color resize-none"
              placeholder="Detail"
              rows={5}
              required
            />
            <DialogFooter className="flex justify-end gap-9 mt-2">
              <button
                type="button"
                onClick={() => setEditThinking(null)}
                className="px-4 py-2 rounded-md box-content border border-border bg-background hover:bg-accent transition-colors"
                disabled={editLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                disabled={editLoading || !editTitle || !editDetail}
              >
                {editLoading ? 'Saving...' : 'Save'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 删除 Dialog */}
      <Dialog open={!!deleteId} onOpenChange={open => { if (!open) setDeleteId(null); }}>
        <DialogContent className="max-w-xs rounded-sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete Thinking</DialogTitle>
          </DialogHeader>
          <div className="py-4">Are you sure you want to delete this thinking?</div>
          <DialogFooter>
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-border bg-background hover:bg-accent transition-colors"
              onClick={() => setDeleteId(null)}
              disabled={deleteLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-destructive text-white hover:bg-destructive/60 transition-colors disabled:opacity-50"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 