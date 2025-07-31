"use client"

import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { md } from "@/lib/markdownUtil";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import Maple3D from "@/components/common/Loading/Maple3D";

export default function BlogEditPage() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const html = document.documentElement;
    const originalOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    const getBlog = async () => {
      const blog = await fetch(`/api/blogs/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const blogData = await blog.json();
      setTitle(blogData.title);
      setDescription(blogData.description);
    }
    getBlog();

    const getBlogContent = async () => {
      const blog = await fetch(`/api/blogs/content/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const blogData = await blog.json();
      if (blogData.content) setContent(blogData.content);
      setIsLoading(false);
    }
    getBlogContent();

    return () => {
      html.style.overflow = originalOverflow;
    };
  }, [id]);

  const html = useMemo(() => md.render(content), [content]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!previewRef.current) return;
    const anchor = previewRef.current.querySelectorAll('a');
    const eventListeners: Array<{ element: Element; handler: (e: Event) => void }> = [];

    anchor.forEach(item => {
      const href = item.href.split('#').pop();
      if (href) {
        const handler = (e: Event) => {
          e.preventDefault();
          const target = document.querySelector(`#${href}`) as HTMLElement;
          if (target) {
            previewRef.current!.scrollTo({
              top: target.offsetTop - 100,
              behavior: 'instant'
            });
          }
        };

        item.addEventListener('click', handler);
        eventListeners.push({ element: item, handler });
      }
    });

    return () => {
      eventListeners.forEach(({ element, handler }) => {
        element.removeEventListener('click', handler);
      });
    };
  }, [content]);

  if (isLoading) {
    return (
      <Maple3D />
    );
  }

  const handleSave = async () => {
    try {
      setSaving(true);
      const [metaRes, contentRes] = await Promise.all([
        fetch(`/api/blogs/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description }),
        }),
        fetch(`/api/blogs/content/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        }),
      ]);
      if (metaRes.ok && contentRes.ok) {
        toast.success('Success!');
        router.push('/admin/blogs');
      } else {
        if (metaRes.status === 401 || contentRes.status === 401) {
          router.push('/login');
        } else {
          toast.warning('Title or Description is empty!');
        }
      }
    } catch {
      toast.error('Failed to save!');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-screen bg-background -mt-6 relative">
      {/* 工具栏 */}
      <div className="flex items-center gap-8 absolute left-[50%] -translate-x-[50%] md:-translate-y-11 -translate-y-13 z-100">
        <Link href="/admin/blogs" className={`whitespace-nowrap flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors`}
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save'}
          <Save size={16} />
        </button>
      </div>
      <div className="flex h-[95vh] ">
        {/* 左侧编辑器 */}
        <div className="w-1/2 p-6 border-r border-border flex flex-col">
          <div className="mb-2 text-lg font-bold">Source</div>
          <div className="mb-4 flex flex-col gap-3">
            <input
              type="text"
              className="border border-border rounded-md px-3 py-2 bg-background text-base focus:outline-none focus:ring-2 focus:ring-theme-color"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="border border-border rounded-md px-3 py-2 bg-background text-base focus:outline-none focus:ring-2 focus:ring-theme-color"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <textarea
            ref={textareaRef}
            className="scrollbar flex-1 w-full resize-none bg-background p-3 font-mono text-base focus:outline-none focus:ring-2 focus:ring-theme-color"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write something here..."
            onScroll={() => {
              const textarea = textareaRef.current;
              const preview = previewRef.current;
              if (!textarea || !preview) return;
              const percent = textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight);
              preview.scrollTop = percent * (preview.scrollHeight - preview.clientHeight);
            }}
          />
        </div>
        {/* 右侧预览 */}
        <div className="w-1/2 p-6 flex flex-col">
          <div className="mb-2 text-lg font-bold">Markdown</div>
          <div ref={previewRef}
            className="markdown-body overflow-auto scrollbar flex-1 relative"
            onScroll={() => {
              const textarea = textareaRef.current;
              const preview = previewRef.current;
              if (!textarea || !preview) return;
              const percent = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
              textarea.scrollTop = percent * (textarea.scrollHeight - textarea.clientHeight);
            }}
            dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
} 