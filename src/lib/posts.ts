import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'src', 'posts');

export function getPost(type: string, id: string) {
  const fullPath = path.join(postsDir, type, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  return {
    data,
    content,
  };
}