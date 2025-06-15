import React, { memo } from 'react';

export interface BlogItemProps {
  title: string;
  description: string;
  date: string;
}

const BlogItem: React.FC<BlogItemProps> = (blog) => {
  return (
    <div className="mb-4 w-full bg-secondary/70">
      <h3 className="text-primary/80 w-32">{blog.title}</h3>
      <p className="text-primary/80 w-32">{blog.description}</p>
      <p className="text-primary/80 w-32">{blog.date}</p>
    </div>
  )
}

export default memo(BlogItem);