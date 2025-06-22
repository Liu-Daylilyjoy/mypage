import ScrollProgress from '@/components/common/ScrollProgress/ScrollProgress'
import { getPost } from '@/lib/posts';
import { md } from '@/lib/utils';

export default async function ArticleDetail({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data, content } = getPost('blog', id);

  const htmlConverter = md.render(content);

  return (
    <>
      <ScrollProgress />
      <div className='max-w-3xl mx-auto px-4'>
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: htmlConverter }} />
      </div>
    </>
  )
}
