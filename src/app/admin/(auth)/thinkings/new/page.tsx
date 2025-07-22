'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, ArrowLeft, Upload, Home } from "lucide-react";
import Link from "next/link";
import CompressedImage from "@/components/common/CompressedImage/CompressedImage";
import { adminImageConfig } from "@/config/ImageConfig";

export default function NewThinkingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    detail: "",
    cover: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/thinkings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/thinkings');
      } else {
        alert('创建失败');
      }
    } catch (error) {
      console.error('Failed to create thinking:', error);
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
            href="/admin/thinkings"
            className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-md transition-colors"
          >
            <ArrowLeft size={16} />
            返回
          </Link>
          <div>
            <h1 className="text-3xl font-bold">新建思考</h1>
            <p className="text-muted-foreground mt-2">创建新的思考记录</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent transition-colors"
          >
            <Home size={16} />
            首页
          </Link>
          <Link
            href="/admin/thinkings"
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <X size={16} />
            取消
          </Link>
          <button
            onClick={handleSubmit}
            disabled={loading || !formData.title || !formData.detail}
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
                    placeholder="输入思考标题"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    封面图片URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.cover}
                      onChange={(e) => handleChange('cover', e.target.value)}
                      className="flex-1 px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="输入图片URL"
                    />
                    <button
                      type="button"
                      className="px-3 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                      title="上传图片"
                    >
                      <Upload size={16} />
                    </button>
                  </div>
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
                {formData.cover && (
                  <div>
                    <h3 className="font-medium">封面</h3>
                    <div className="relative">
                      <CompressedImage
                        src={formData.cover}
                        alt="封面预览"
                        className="w-full h-32 object-cover rounded-lg mt-2"
                        targetWidth={adminImageConfig.preview.targetWidth}
                        quality={adminImageConfig.preview.quality}
                        fallbackIcon={<Image size={32} className="text-muted-foreground" />}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold mb-4">思考内容</h2>
            <div>
              <label className="block text-sm font-medium mb-2">
                详细内容 *
              </label>
              <textarea
                value={formData.detail}
                onChange={(e) => handleChange('detail', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                placeholder="输入您的思考内容"
                rows={20}
                required
              />
              <p className="text-xs text-muted-foreground mt-2">
                记录您的想法、感悟或灵感
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 