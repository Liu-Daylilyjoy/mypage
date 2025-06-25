"use client"

import BlogItem, { BlogItemProps } from "@/components/common/Blog/BlogItem"
import ScrollProgress from "@/components/common/ScrollProgress/ScrollProgress"
import useBlogList from "@/hook/useBlogList"
import { useMemo, useState } from "react"
import { parseISO, format } from 'date-fns'
import { useRouter } from "next/navigation"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

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

  const router = useRouter();
  const handleCardClick = (id: string) => {
    router.push(`/blog/${id}`)
  }

  useGSAP(() => {
    gsap.fromTo(".slide", {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.2
    })
  }, [sortedYears])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ScrollProgress />
      <div className="px-20 pt-30">
        <div className="max-w-5xl flex flex-col items-center mx-auto">
          {sortedYears.map((year) => (
            <div key={year} className="mb-12 w-full slide opacity-100">
              <h2 className="text-3xl font-bold mb-6 border-b-2 border-primary/40">{year}</h2>
              {blogsByYear[year].map((blog: BlogItemProps) => (
                <BlogItem key={blog.id} blog={blog} onClick={() => handleCardClick(blog.id)} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}