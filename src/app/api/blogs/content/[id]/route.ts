import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { authOptions } from '@/config/AuthConfig';
import { getServerSession } from 'next-auth';

const postsDir = path.join(process.cwd(), 'src', 'posts');

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fullPath = path.join(postsDir, 'blog', `${id}.md`);
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data: metadata, content } = matter(fileContents);
    return NextResponse.json({ metadata, content });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { content } = await request.json();
  if (!id || typeof content !== 'string') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const filePath = path.join(process.cwd(), 'src', 'posts', 'blog', `${id}.md`);
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
  }
}