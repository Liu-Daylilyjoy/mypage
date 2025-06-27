'use client'

import { useEffect, useState } from 'react'
import { LuArrowUp } from "react-icons/lu";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalHeight) * 100
      setProgress(currentProgress)

      const scrollPosition = window.scrollY;
      // 当滚动超过屏幕高度的三分之一时显示按钮
      if (scrollPosition > window.innerHeight / 3) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-9">
      <div
        className="h-full bg-theme-color transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
      <button
        onClick={scrollToTop}
        className={`
        fixed
        bottom-8
        right-8
        z-50
        p-3
        rounded-full
        bg-theme-color/80
        text-primary-foreground
        shadow-lg
        hover:bg-theme-color
        hover:scale-120
        transition-all
        duration-300
        cursor-pointer
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      `}
      >
        <LuArrowUp size={24} />
      </button>
    </div>
  )
}

export default ScrollProgress 