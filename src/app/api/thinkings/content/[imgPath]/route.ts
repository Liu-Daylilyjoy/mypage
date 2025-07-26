import path from "path";
import fs from 'fs/promises';
import { adminAuth } from "@/lib/serverAuth";

const postsDir = path.join(process.cwd(), 'src', 'posts');

export async function GET(req: Request, { params }: { params: Promise<{ imgPath: string }> }) {
  const { imgPath } = await params;
  const fullPath = path.join(postsDir, 'thinking', imgPath);

  try {
    const fileContents = await fs.readFile(fullPath);

    // Determine content type based on file extension
    const ext = path.extname(imgPath).toLowerCase();
    let contentType = 'image/jpeg';

    if (ext === '.png') {
      contentType = 'image/png';
    } else if (ext === '.gif') {
      contentType = 'image/gif';
    } else if (ext === '.webp') {
      contentType = 'image/webp';
    }

    return new Response(fileContents, {
      headers: {
        'Content-Type': contentType,
      },
    });
  } catch {
    return Response.json({ error: 'Failed to fetch img' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ imgPath: string }> }) {
  if (!await adminAuth()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { imgPath } = await params;
  const fullPath = path.join(postsDir, 'thinking', imgPath);
  try {
    await fs.unlink(fullPath);
  } catch { }
  return Response.json({ success: true });
}