'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, ArrowLeft, Upload, Image as ImageIcon, Home } from "lucide-react";
import Link from "next/link";
import CompressedImage from "@/components/common/CompressedImage/CompressedImage";
import { adminImageConfig } from "@/config/ImageConfig";

export default function NewPhotoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    path: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/photos');
      } else {
        alert('创建失败');
      }
    } catch (error) {
      console.error('Failed to create photo:', error);
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
            href="/admin/photos"
            className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-md transition-colors"
          >
            <ArrowLeft size={16} />
            返回
          </Link>
          <div>
            <h1 className="text-3xl font-bold">上传照片</h1>
            <p className="text-muted-foreground mt-2">添加新的摄影作品</p>
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
            href="/admin/photos"
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
                    placeholder="输入照片标题"
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
                    placeholder="输入照片描述"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    图片URL *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.path}
                      onChange={(e) => handleChange('path', e.target.value)}
                      className="flex-1 px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="输入图片URL"
                      required
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
                <div>
                  <h3 className="font-medium">描述</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.description || '未设置'}
                  </p>
                </div>
                {formData.path && (
                  <div>
                    <h3 className="font-medium">照片预览</h3>
                    <div className="aspect-square bg-muted rounded-lg mt-2 overflow-hidden relative">
                      <CompressedImage
                        src={formData.path}
                        alt="照片预览"
                        className="w-full h-full object-cover"
                        targetWidth={adminImageConfig.photo.targetWidth}
                        quality={adminImageConfig.photo.quality}
                        fallbackIcon={<ImageIcon size={48} className="text-muted-foreground" />}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Upload Area */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold mb-4">图片上传</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <ImageIcon size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">
                  拖拽图片到此处或点击上传
                </p>
                <button
                  type="button"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  选择图片
                </button>
              </div>

              <div className="text-xs text-muted-foreground">
                <p>支持的格式：JPG, PNG, GIF, WebP</p>
                <p>最大文件大小：10MB</p>
                <p>建议尺寸：1920x1080 或更高</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 