import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface NavbarItemProps {
  title?: string;
  href?: string;
  icon?: React.ReactNode;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ title, href, icon }) => {
  const router = useRouter()
  const toggleSwitch = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const transition = document.startViewTransition(() => {
      router.push(href || '/')
    })
    transition.ready.then(() => {
      document.documentElement.animate({
        clipPath: [`inset(0% 0% 0% 100%)`, `inset(0% 0% 0% 0%)`],
      }, {
        duration: 200,
        pseudoElement: '::view-transition-new(root)',
      })
    })
  }, [href, router])

  return (
    <>
      {icon ? (
        <div className="text-lg mr-8 opacity-70 hover:opacity-100 hover:scale-120 hover:text-theme-color transition-all duration-300">
          {icon}
        </div>
      ) : (
          <Link onClick={toggleSwitch} href={href || '/'} className="md:text-lg text-4xl mr-8 opacity-70 hover:opacity-100 hover:scale-120 hover:text-theme-color transition-all duration-300 origin-left">
          {title}
        </Link>
      )}
    </>
  )
}

export default NavbarItem;
