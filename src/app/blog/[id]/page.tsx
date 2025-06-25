"use client"

import ScrollProgress from '@/components/common/ScrollProgress/ScrollProgress'
import useBlog from '@/hook/useBlog';
import { md } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function ArticleDetail() {
  const { id } = useParams();
  const { data } = useBlog(id as string);
  const markdownRef = useRef<HTMLDivElement>(null)

  const htmlConverter = md.render(data?.content || '');

  useGSAP(() => {
    if (!markdownRef.current) return;

    const markdown = markdownRef.current;
    const children = markdown.children;
    for (let i = 0; i < children.length; i++) {
      (children[i] as HTMLElement).classList.add('slide');
    }

    gsap.fromTo(".slide", {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.1
    })
  }, [htmlConverter])

  return (
    <>
      <ScrollProgress />
      <div className="px-20 pt-30 bg-background/60">
        <div className='max-w-3xl mx-auto px-4'>
          <div className="slide border-t-2 border-theme-color/40 pt-10"></div>
          <div className='markdown-body' ref={markdownRef} dangerouslySetInnerHTML={{ __html: htmlConverter }} />
        </div>
      </div>
    </>
  )
}
