import React from 'react';
import Link from 'next/link';

export interface NavbarItemProps {
  title?: string;
  href?: string;
  icon?: React.ReactNode;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ title, href, icon }) => {
  return (
    <>
      {icon ? (
        <div className="text-lg mr-8 opacity-70 hover:opacity-100 hover:scale-120 hover:text-theme-color transition-all duration-300">
          {icon}
        </div>
      ) : (
          <Link href={href || '/'} className="text-lg mr-8 opacity-70 hover:opacity-100 hover:scale-120 hover:text-theme-color transition-all duration-300 origin-left">
          {title}
        </Link>
      )}
    </>
  )
}

export default NavbarItem;
