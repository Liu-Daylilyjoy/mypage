import fs from 'fs/promises';
import path from 'path';
import prismadb from '@/lib/prismadb';
import { adminAuth } from '@/lib/serverAuth';

const postsDir = path.join(process.cwd(), 'src', 'posts');

export async function POST(req: Request, { params }: { params: Promise<{ imgPath: string, id: string }> }) {
  if (!await adminAuth()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, imgPath: cover } = await params;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileName = file.name;
    const ext = path.extname(fileName);
    const imgPath = `${id}${ext}`;

    const fullPath = path.join(postsDir, 'thinking', imgPath);

    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(fullPath, Buffer.from(arrayBuffer));

    if (cover && cover !== imgPath) {
      await prismadb.thinking.update({
        where: { id },
        data: { cover: imgPath }
      });

      // 删掉原图片
      const oldPath = path.join(postsDir, 'thinking', cover);
      try {
        await fs.access(oldPath);
        await fs.unlink(oldPath);
      } catch { }
    }

    return Response.json({ success: true, status: 200 });
  } catch (error) {
    return Response.json({ error: `Failed to upload img: ${error}` }, { status: 500 });
  }
}