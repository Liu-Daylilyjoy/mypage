import React, { memo } from 'react';
import { useRouter } from 'next/navigation';

export interface BlogItemProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

const BlogItem: React.FC<{ blog: BlogItemProps, onClick: () => void, onMouseEnter: () => void, onMouseLeave: () => void }> =
  ({ blog, onClick, onMouseEnter, onMouseLeave }) => {
    return (
      <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="cursor-pointer group relative mb-4 w-full bg-secondary/70 p-4 transition-transform duration-300 hover:scale-120 hover:z-11">
        <div className="flex flex-col group-hover:-translate-y-[150%] pointer-events-none transition-transform duration-800">
          <h3 className="text-primary/80 group-hover:text-theme-color transition-colors duration-800 delay-200 truncate">{blog.title}</h3>
          <p className="text-primary/80">{blog.createdAt}</p>
        </div>

        <div className="absolute top-0 right-0 h-full w-full overflow-hidden">
          <div className="absolute  h-full w-full bg-theme-color translate-x-full transition-all delay-300 duration-200 ease-in-out group-hover:translate-x-0" />
          <div className="absolute  h-full w-full bg-primary translate-x-full transition-all delay-300 duration-500 ease-in-out group-hover:translate-x-0">
            <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-background line-clamp-2">{blog.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default memo(BlogItem);