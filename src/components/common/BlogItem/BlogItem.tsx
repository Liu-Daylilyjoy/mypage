import React from 'react';

export interface BlogItemProps {
  title: string;
  description: string;
  date: string;
}

const BlogItem: React.FC<BlogItemProps> = (blog) => {
  return (
    <div className="flex justify-center mb-4 h-10">
      <h3 className="text-primary/80 w-32">{blog.title}</h3>
      <p className="text-primary/80 w-32">{blog.description}</p>
      <p className="text-primary/80 w-32">{blog.date}</p>
    </div>
  )
}

export default BlogItem;