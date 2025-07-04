'use client'

import { ModeToggle } from "@/components/theme/theme-mode-toggle";
import { useState, useEffect, memo, useRef, useCallback } from "react";
import NavbarItem, { NavbarItemProps } from "./NavbarItem";
import { LuGithub } from "react-icons/lu";
import { BsWechat } from "react-icons/bs";
import { FullScreenMenu } from "./FullScreenMenu";

const navbarItems: NavbarItemProps[] = [
  {
    title: "Home",
    href: "/"
  },
  {
    title: "Blog",
    href: "/blog"
  },
  {
    title: "Thinking",
    href: "/thinking"
  },
  {
    title: "Photography",
    href: "/photography"
  },
  {
    icon: <a href="https://github.com/Liu-Daylilyjoy" target="_blank"><LuGithub size={30} /></a>
  },
  {
    icon: <span className="wechat"><BsWechat size={30} /></span>
  }
]

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMouseAtTop, setIsMouseAtTop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // 如果滚动，且鼠标不在顶部，且菜单未展开，则隐藏导航栏
      if (scrollPosition > 1 && !isMouseAtTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      // 如果鼠标在屏幕顶部 100px 范围内
      if (e.clientY <= 100) {
        setIsMouseAtTop(true);
        setIsVisible(true);
      } else {
        setIsMouseAtTop(false);
        // 如果鼠标离开顶部，且菜单未展开，则隐藏导航栏
        if (window.scrollY > 1) {
          setIsVisible(isOpen);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen, isMouseAtTop]);

  let containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    // 鼠标悬停在navbar上时禁止滚动
    const container = containerRef.current;

    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
    };

    container.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', preventScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`
        z-50
        fixed
        top-0
        left-0
        right-0
        h-25
        flex
        justify-end
        items-center
        px-8
        bg-transparent
        transition-all
        duration-300
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        navbar-blur
        `}>
      <div className="absolute left-4">
        <svg className="signature max-md:hidden" width="90" height="60" viewBox="0 0 334 186" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path strokeWidth="5" d="M1 1V114H80V40M80 40L61 26L80 7L100 26L80 40ZM125 61V114H169V61L229 114V61H200V114L254 61V1L269 114H304L328 61H311L333 185H169" />
        </svg>
        <div className="md:hidden">
          <FullScreenMenu menuItems={navbarItems} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <div className="max-md:hidden flex items-center">
        {navbarItems.map((item: NavbarItemProps, index: number) => (
          <NavbarItem key={index} title={item.title} href={item.href} icon={item.icon} />
        ))}
      </div>
      <ModeToggle />
    </div>
  )
}

export default Navbar;
