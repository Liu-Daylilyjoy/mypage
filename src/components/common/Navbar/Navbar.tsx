'use client'

import { ModeToggle } from "@/components/theme/theme-mode-toggle";
import { useState, useEffect, memo } from "react";
import NavbarItem from "./NavbarItem";
import { LuGithub } from "react-icons/lu";
import { BsWechat } from "react-icons/bs";

const navbarItems = [
  {
    title: "Home",
    href: "/"
  },
  {
    title: "About",
    href: "/about"
  },
  {
    title: "Contact",
    href: "/contact"
  },
  {
    href: "/wechat",
    icon: <BsWechat size={30} />
  },
  {
    href: "/github",
    icon: <LuGithub size={30} />
  }
]

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMouseAtTop, setIsMouseAtTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // 如果滚动超过屏幕高度的一半，且鼠标不在顶部，则隐藏导航栏
      if (scrollPosition > windowHeight / 2 && !isMouseAtTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // 如果鼠标在屏幕顶部 100px 范围内
      if (e.clientY <= 100) {
        setIsMouseAtTop(true);
        setIsVisible(true);
      } else {
        setIsMouseAtTop(false);
        // 如果鼠标离开顶部，且滚动超过一半，则隐藏导航栏
        if (window.scrollY > window.innerHeight / 2) {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMouseAtTop]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 flex justify-end items-center p-4 bg-transparent transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
      <div className="absolute left-4">
        <svg className="signature" width="90" height="60" viewBox="0 0 334 186" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path strokeWidth="5" d="M1 1V114H80V40M80 40L61 26L80 7L100 26L80 40ZM125 61V114H169V61L229 114V61H200V114L254 61V1L269 114H304L328 61H311L333 185H169" />
        </svg>
      </div>

      {navbarItems.map((item, index) => (
        <NavbarItem key={index} title={item.title} href={item.href} icon={item.icon} />
      ))}
      <ModeToggle />
    </div>
  )
}

export default memo(Navbar);
