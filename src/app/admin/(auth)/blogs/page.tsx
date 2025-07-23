'use client'

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import Link from "next/link";
import useBlogList from "@/hook/useBlogList";
import { mutate } from "swr";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/shadcn/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data: blogs = [], isLoading: loading } = useBlogList();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 重新获取数据以更新列表
        mutate('/api/blogs');
        setDeleteId(null);
      } else {
        alert('Delete failed');
      }
    } catch (error) {
      alert('Delete failed');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        const data = await response.json();
        setShowModal(false);
        setTitle("");
        setDescription("");
        toast.success('Blog created successfully!');
        mutate('/api/blogs'); // 列表自动刷新
        router.push(`/admin/blogs/edit/${data.id}`);
      } else {
        toast.error('Failed to create blog');
      }
    } catch (error) {
      toast.error('Failed to create blog');
    } finally {
      setCreating(false);
    }
  };

  const filteredBlogs = blogs.filter((blog: Blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground mt-2">Manage your blog articles</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus size={16} />
                New Blog
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-sm" showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>New Blog</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="flex flex-col gap-4 mt-4">
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="border border-border rounded-md px-3 py-2 bg-background text-base focus:outline-none focus:ring-2 focus:ring-theme-color"
                  placeholder="title"
                  required
                />
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="border border-border rounded-md px-3 py-2 bg-background text-base focus:outline-none focus:ring-2 focus:ring-theme-color resize-none"
                  placeholder="description"
                  rows={3}
                  required
                />
                <DialogFooter className="flex justify-end gap-9 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-md box-content border border-border bg-background hover:bg-accent transition-colors"
                    disabled={creating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                    disabled={creating || !title || !description}
                  >
                    {creating ? 'Creating...' : 'Create'}
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Search blog..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Blogs List */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? 'No matching blog found' : 'No blog articles'}
            </p>
            {!searchTerm && (
              <Link
                href="/admin/blogs/new"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus size={16} />
                Create your first blog
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Created At</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Updated At</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredBlogs.map((blog: Blog) => (
                  <tr key={blog.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="font-medium truncate">{blog.title}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm text-muted-foreground truncate">
                          {blog.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-muted-foreground">
                        {formatDate(blog.createdAt)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-muted-foreground">
                        {formatDate(blog.updatedAt)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${blog.id}`}
                          target="_blank"
                          className="p-2 hover:bg-accent rounded-md transition-colors"
                          title="View"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/admin/blogs/edit/${blog.id}`}
                          className="p-2 hover:bg-accent rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 hover:bg-accent rounded-md transition-colors text-destructive"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="text-sm text-muted-foreground">
        Total <span className="font-bold text-primary">{filteredBlogs.length}</span> blog articles
      </div>
    </div>
  );
} 