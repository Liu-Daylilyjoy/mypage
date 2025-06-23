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
      <div className="px-20 pt-30 bg-background/60">
        <div className='max-w-3xl mx-auto px-4 pt-10 border-t-2 border-theme-color/40'>
          <div className='markdown-body' dangerouslySetInnerHTML={{ __html: htmlConverter }} />
        </div>
      </div>
    </>
  )
}
