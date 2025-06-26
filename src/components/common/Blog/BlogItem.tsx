import React, { memo } from 'react';

export interface BlogItemProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

const BlogItem: React.FC<{ blog: BlogItemProps, onClick: () => void }> =
  ({ blog, onClick }) => {
    return (
      <div onClick={onClick} className="cursor-pointer group relative mb-4 w-full bg-secondary/70 p-4 transition-transform duration-300 hover:scale-120">
        <div className="flex flex-col group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-primary/80 truncate">{blog.title}</h3>
          <p className="text-primary/80">{blog.createdAt}</p>
        </div>

        <div className="absolute top-0 right-0 h-full w-full overflow-hidden">
          <div className="absolute h-full w-full bg-theme-color translate-x-full transition-all delay-300 duration-200 ease-in-out group-hover:translate-x-0" />
          <div className="absolute h-full w-full bg-primary translate-x-full transition-all delay-300 duration-500 ease-in-out group-hover:translate-x-0">
            <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-background line-clamp-2">{blog.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default memo(BlogItem);