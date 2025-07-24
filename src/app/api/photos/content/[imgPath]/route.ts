import fs from 'fs/promises';
import path from 'path';

const postsDir = path.join(process.cwd(), 'src', 'posts');

export async function GET(req: Request, { params }: { params: Promise<{ imgPath: string }> }) {
  const { imgPath } = await params;
  const fullPath = path.join(postsDir, 'photography', imgPath);

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