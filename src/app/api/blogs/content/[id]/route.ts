import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'src', 'posts');

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const fullPath = path.join(postsDir, 'blog', `${id}.md`);
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');

    const { data: metadata, content } = matter(fileContents);

    return Response.json({ metadata, content });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  const { content } = await req.json();

  if (!id || typeof content !== 'string') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'src', 'posts', 'blog', `${id}.md`);
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
  }
}