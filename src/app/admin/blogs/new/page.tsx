'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/blogs');
      } else {
        alert('创建失败');
      }
    } catch (error) {
      console.error('Failed to create blog:', error);
      alert('创建失败');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blogs"
            className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-md transition-colors"
          >
            <ArrowLeft size={16} />
            返回
          </Link>
          <div>
            <h1 className="text-3xl font-bold">新建博客</h1>
            <p className="text-muted-foreground mt-2">创建新的博客文章</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/blogs"
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
          >
                          <X size={16} />
              取消
          </Link>
          <button
            onClick={handleSubmit}
            disabled={loading || !formData.title || !formData.description}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            {loading ? '保存中...' : '保存'}
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-4">基本信息</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    标题 *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="输入博客标题"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    描述 *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="输入博客描述"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-4">预览</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">标题</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.title || '未设置'}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">描述</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.description || '未设置'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold mb-4">内容</h2>
            <div>
              <label className="block text-sm font-medium mb-2">
                博客内容
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono text-sm"
                placeholder="输入博客内容（支持 Markdown 格式）"
                rows={20}
              />
              <p className="text-xs text-muted-foreground mt-2">
                支持 Markdown 格式，可以使用 **粗体**、*斜体*、[链接](url) 等语法
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 