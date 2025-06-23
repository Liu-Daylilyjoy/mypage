"use client"

import BlogItem, { BlogItemProps } from "@/components/common/Blog/BlogItem"
import ScrollProgress from "@/components/common/ScrollProgress/ScrollProgress"
import useBlogList from "@/hook/useBlogList"
import { useMemo, useState } from "react"
import { parseISO, format } from 'date-fns'
import { useRouter } from "next/navigation"

export default function Blog() {
  const { data: blogList = [], isLoading } = useBlogList();

  const { blogsByYear, sortedYears } = useMemo(() => {
    // Group blogs by year
    const blogsByYear = blogList.reduce((acc: any, blog: any) => {
      let date = parseISO(blog.createdAt);
      let year = date.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push({ ...blog, createdAt: format(date, 'yyyy-MM-dd') });
      return acc;
    }, {} as Record<string, BlogItemProps[]>);

    const sortedYears = Object.keys(blogsByYear).sort((a, b) => Number(b) - Number(a));

    return { blogsByYear, sortedYears };
  }, [blogList]);

  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();
  const handleCardClick = (id: string) => {
    router.push(`/blog/${id}`)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ScrollProgress />
      <div className="px-20 pt-30">
        <div className="max-w-5xl flex flex-col items-center mx-auto">
          {sortedYears.map((year) => (
            <div key={year} className="mb-12 w-full">
              <h2 className="text-3xl font-bold mb-6 border-b-2 border-primary/40">{year}</h2>
              {blogsByYear[year].map((blog: BlogItemProps) => (
                <BlogItem key={blog.id} blog={blog} onClick={() => handleCardClick(blog.id)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} />
              ))}
            </div>
          ))}
        </div>
      </div>
    
      <div id="mainContent" className={
        `fixed 
        top-0
        left-0
        bottom-0
        right-0
        z-10
        pointer-events-none
        backdrop-blur-sm
        opacity-0
        transition-opacity
        duration-300
        delay-100
        ${isHovered ? 'opacity-100' : 'opacity-0'}`} >
      </div>
    </>
  )
}