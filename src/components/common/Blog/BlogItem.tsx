import React, { memo } from 'react';

export interface BlogItemProps {
  title: string;
  description: string;
  date: string;
}

const BlogItem: React.FC<BlogItemProps> = (blog) => {
  return (
    <div className="group relative mb-4 w-full bg-secondary/70 p-4 overflow-hidden">
      <div className="flex flex-col">
        <h3 className="text-primary/80 truncate">{blog.title}</h3>
        <p className="text-primary/80">{blog.date}</p>
      </div>

      <div className="absolute top-0 right-0 h-full w-full bg-theme-color translate-x-full transition-all duration-400 ease-in-out group-hover:translate-x-0" />

      <div className="absolute top-0 right-0 h-full w-full bg-primary translate-x-full transition-all duration-600 ease-in-out group-hover:translate-x-0">
        <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-background line-clamp-2">{blog.description}</p>
        </div>
      </div>
    </div>
  )
}

export default memo(BlogItem);