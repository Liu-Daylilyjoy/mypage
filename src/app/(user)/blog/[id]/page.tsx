"use client"

import ScrollProgress from '@/components/common/ScrollProgress/ScrollProgress'
import { md } from '@/lib/markdownUtil';
import gsap from 'gsap';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useMemo, useState } from 'react';

export default function ArticleDetail() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const markdownRef = useRef<HTMLDivElement>(null)

  const htmlConverter = useMemo(() => md.render(content || ''), [content]);

  useEffect(() => {
    const getBlogContent = async () => {
      const blog = await fetch(`/api/blogs/content/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const blogData = await blog.json();
      setContent(blogData.content);
    }
    getBlogContent();
  }, [id]);

  useEffect(() => {
    if (!markdownRef.current || !htmlConverter) return;

    const children = markdownRef.current.children;
    for (let i = 0; i < children.length; i++) {
      (children[i] as HTMLElement).classList.toggle('slide');
    }

    const slideAnimation = gsap.fromTo(".slide", {
      opacity: 0,
    }, {
      opacity: 1,
      stagger: 0.1
    })

    const expandAnimation = gsap.fromTo(".expand", {
      width: "0%",
    }, {
      width: "100%",
      duration: 1,
    })

    return () => {
      slideAnimation.kill();
      expandAnimation.kill();
    }
  }, [htmlConverter])

  return (
    <>
      <ScrollProgress />
      <div className="px-20 pt-30 bg-background/60">
        <div className='max-w-3xl mx-auto px-4 flex flex-col'>
          <div className="expand border-t-2 border-theme-color/40 pt-10 self-center"></div>
          <div className='markdown-body' ref={markdownRef} dangerouslySetInnerHTML={{ __html: htmlConverter }} />
        </div>
      </div>
    </>
  )
}
