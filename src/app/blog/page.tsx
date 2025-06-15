import BlogItem, { BlogItemProps } from "@/components/common/Blog/BlogItem"
import ScrollProgress from "@/components/common/ScrollProgress/ScrollProgress"

const bloglist: BlogItemProps[] = [
  {
    title: "Blog 1",
    description: "Blog 1 content",
    date: "2022-01-01",
  },
  {
    title: "Blog 2",
    description: "Blog 2 content",
    date: "2022-01-02",
  },
  {
    title: "Blog 3",
    description: "Blog 3 content",
    date: "2023-01-03",
  },
  {
    title: "Blog 4",
    description: "Blog 4 content",
    date: "2025-01-04",
  },
  {
    title: "Blog 5",
    description: "Blog 5 content",
    date: "2025-01-05",
  }
]

export default function Blog() {
  // 根据年份分组
  const blogsByYear = bloglist.reduce((acc, blog) => {
    const year = blog.date.split('-')[0];
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(blog);
    return acc;
  }, {} as Record<string, BlogItemProps[]>);

  const sortedYears = Object.keys(blogsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <ScrollProgress />
      <div className="px-20 pt-40">
        <div className="max-w-3xl flex flex-col items-center mx-auto">
          {sortedYears.map((year) => (
            <div key={year} className="mb-12 w-full">
              <h2 className="text-3xl font-bold mb-6 border-b-2 border-primary/40">{year}</h2>
              {blogsByYear[year].map((blog: BlogItemProps) => (
                <BlogItem key={blog.title} {...blog} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}