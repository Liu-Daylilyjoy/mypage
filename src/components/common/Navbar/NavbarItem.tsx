import React from 'react';
import Link from 'next/link';

interface NavbarItemProps {
  title?: string;
  href?: string;
  icon?: React.ReactNode;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ title, href, icon }) => {
  return (
    <>
      {icon ? (
        <div className="text-lg mr-8 opacity-70 hover:opacity-100 transition-opacity duration-300">
          {icon}
        </div>
      ) : (
        <Link href={href || '/'} className="text-lg mr-8 opacity-70 hover:opacity-100 transition-opacity duration-300">
          {title}
        </Link>
      )}
    </>
  )
}

export default NavbarItem;
