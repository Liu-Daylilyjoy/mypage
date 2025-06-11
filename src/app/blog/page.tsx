import BlogItem, { BlogItemProps } from "@/components/common/BlogItem/BlogItem"
import ScrollProgress from "@/components/common/ScrollProgress/ScrollProgress"

const bloglist: BlogItemProps[]  = [
  {
    title: "Blog 1",
    description: "Blog 1 content",
    date: "2025-01-01",
  },
  {
    title: "Blog 2",
    description: "Blog 2 content",
    date: "2025-01-02",
  },
  {
    title: "Blog 3",
    description: "Blog 3 content",
    date: "2025-01-03",
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
  return (
    <>
      <ScrollProgress />
      <div className="px-10 pt-25">
        <div className="max-w-3xl">
          {bloglist.map((blog: BlogItemProps) => (
            <BlogItem key={blog.title} {...blog} />
          ))}
        </div>
      </div>
    </>
  )
}