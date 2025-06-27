const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(process.cwd(), 'src', 'posts');

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const fullPath = path.join(postsDir, 'blog', `${id}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data: metadata, content } = matter(fileContents);

    return Response.json({ metadata, content });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}