const fs = require('fs/promises');
const path = require('path');

const postsDir = path.join(process.cwd(), 'src', 'posts');

export async function GET(req: Request, { params }: { params: { imgPath: string } }) {
  const { imgPath } = await params;
  const fullPath = path.join(postsDir, 'photography', imgPath);

  try {
    const fileContents = await fs.readFile(fullPath);

    return new Response(fileContents, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Failed to fetch img' }, { status: 500 });
  }
}