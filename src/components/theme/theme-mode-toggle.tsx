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

  const toggleTheme = useCallback(() => {
    if (!lightShadowRef.current || !curtainRefs.current[0] || !curtainRefs.current[1]) return

    lightShadowRef.current.style.opacity = '1'

    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }, 2000)

    curtainRefs.current[0]!.style.animation = 'open-curtain 5s ease-out 0s';
    curtainRefs.current[1]!.style.animation = 'open-curtain 5s ease-out 0s';

    setTimeout(() => {
      lightShadowRef.current!.style.opacity = '0'
      curtainRefs.current[0]!.style.animation = '';
      curtainRefs.current[1]!.style.animation = '';
    }, 5000)
  }, [theme, setTheme])

  return (
    <>
      <Button className="opacity-70 hover:opacity-100 transition-opacity duration-300" variant="link" size="icon" onClick={toggleTheme}>
        <Sun className="scale-210 transition-all dark:scale-0" />
        <Moon className="absolute scale-0 transition-all dark:scale-210" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <div
        ref={lightShadowRef}
        className="light-shadow fixed inset-0 h-[100vh] w-full transition-all duration-500 opacity-0 pointer-events-none"
      >
      </div>
      <div ref={el => { curtainRefs.current[0] = el }} className="curtain curtain-left"></div>
      <div ref={el => { curtainRefs.current[1] = el }} className="curtain curtain-right"></div>
    </>
  )
}
