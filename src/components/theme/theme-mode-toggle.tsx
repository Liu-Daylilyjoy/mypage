"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/shadcn/button"
import { useCallback } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const lightShadowRef = React.useRef<HTMLDivElement>(null)
  const curtainRefs = React.useRef<(HTMLDivElement | null)[]>([])

  // 阻止滚轮事件
  const preventWheel = useCallback((e: any) => {
    e.preventDefault()
  }, [])

  const toggleTheme = useCallback((theme: string | undefined) => {
    lightShadowRef.current!.style.opacity = '1'

    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }, 500)

    curtainRefs.current[0]!.style.animation = 'open-curtain 2000ms ease-out 0s';
    curtainRefs.current[1]!.style.animation = 'open-curtain 2000ms ease-out 0s';

    setTimeout(() => {
      lightShadowRef.current!.style.opacity = '0'
      curtainRefs.current[0]!.style.animation = '';
      curtainRefs.current[1]!.style.animation = '';
    }, 2200)
  }, [])

  return (
    <>
      <Button className="opacity-70 hover:opacity-100 hover:scale-120 hover:text-theme-color transition-all duration-300" variant="link" size="icon" onClick={(e) => toggleTheme(theme)}>
        <Sun className="absolute scale-210 dark:scale-0" />
        <Moon className="absolute scale-0 dark:scale-210" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <div
        ref={lightShadowRef}
        className="light-shadow fixed inset-0 h-[120vh] w-full transition-all duration-500 opacity-0 pointer-events-none z-999"
      ></div>
      <div ref={el => { curtainRefs.current[0] = el }} className="curtain curtain-left z-999"></div>
      <div ref={el => { curtainRefs.current[1] = el }} className="curtain curtain-right z-999"></div>
    </>
  )
}
