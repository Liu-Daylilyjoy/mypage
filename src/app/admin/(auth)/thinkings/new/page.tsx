'use client'

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Upload } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NewThinkingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    detail: "",
    cover: ""
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 预览图片
  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setFormData(prev => ({
      ...prev,
      cover: URL.createObjectURL(file)
    }));
  };

  // 表单提交：先提交文本，再上传图片
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. 提交文本，获取id
      const res = await fetch('/api/thinkings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: formData.title, detail: formData.detail, cover: formData.cover }),
      });
      if (res.status === 401) {
        router.push('/login');
      } else if (!res.ok) {
        throw new Error('Create thinking failed');
      }
      const { id } = await res.json();

      // 2. 上传图片（如果有）
      if (coverFile) {
        const formDataObj = new FormData();
        formDataObj.append('file', coverFile);
        const imgRes = await fetch(`/api/thinkings/content/${coverFile.name}/${id}`, {
          method: 'POST',
          body: formDataObj,
        });
        if (!imgRes.ok) throw new Error('Upload image failed');
      }

      toast.success('Create thinking success');
      router.push('/admin/thinkings');
    } catch (error) {
      toast.error(`Create thinking failed: ${error}`);
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

  // 校验图片链接是否合法
  function isValidImageUrl(url: string) {
    if (!url) return false;
    // 本地 object URL
    if (url.startsWith('blob:')) return true;
    // http(s) 图片链接
    try {
      const u = new URL(url);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">New Thinking</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/thinkings"
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <X size={16} />
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            disabled={loading || !formData.title || !formData.detail}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card p-6">
            <div className="space-y-12">
              <div>
                <label className="block text-lg font-medium mb-2">Title<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-theme-color"
                  placeholder="Enter the title"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium mb-2">Detail<span className="text-red-500">*</span></label>
                <textarea
                  value={formData.detail}
                  onChange={(e) => handleChange('detail', e.target.value)}
                  className="w-full h-100 px-3 py-2 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-theme-color resize-none"
                  placeholder="Enter your thinking"
                  rows={12}
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-l bg-card p-6 flex flex-col gap-6">
            <h2 className="text-lg font-semibold mb-4">Cover Image</h2>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={formData.cover}
                onChange={e => {
                  setFormData(prev => ({
                    ...prev,
                    cover: e.target.value
                  }));
                  setCoverFile(null); // 清空本地文件
                }}
                className="flex-1 px-3 py-2 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-theme-color"
                placeholder="Select image file or type a url"
              />
              <button
                type="button"
                className="px-3 py-3 border border-border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                title="Upload image"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={16} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverSelect}
              />
            </div>
            <h3 className="font-medium my-4">Cover Preview</h3>
            <div className="h-full flex items-center justify-center">
              {isValidImageUrl(formData.cover) ? (
                <div className="relative h-90">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.cover}
                    alt="error"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : formData.cover ? (
                <span className="text-red-500">Invalid image url</span>
              ) : (
                <span className="text-muted-foreground">No image selected</span>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 