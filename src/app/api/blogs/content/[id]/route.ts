import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { adminAuth } from '@/lib/serverAuth';

const postsDir = path.join(process.cwd(), 'src', 'posts');

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fullPath = path.join(postsDir, 'blog', `${id}.md`);
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data: metadata, content } = matter(fileContents);
    return Response.json({ metadata, content });
  } catch {
    return Response.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await adminAuth()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { content } = await request.json();
  if (!id || typeof content !== 'string') {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
  const filePath = path.join(postsDir, 'blog', `${id}.md`);
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to save file' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await adminAuth()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const filePath = path.join(postsDir, 'blog', `${id}.md`);

    try {
      await fs.unlink(filePath);
      return Response.json({ message: "Blog file deleted successfully" });
    } catch {
      // 如果文件不存在，返回成功（因为目标就是删除文件）
      return Response.json({ message: "Blog file not found or already deleted" });
    }
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}