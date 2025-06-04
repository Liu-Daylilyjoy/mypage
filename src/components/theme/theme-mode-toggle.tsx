"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/shadcn/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const lightShadowRef = React.useRef<HTMLDivElement>(null)
  const curtainRefs = React.useRef<(HTMLDivElement | null)[]>([])

  const toggleTheme = () => {
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
  }

  return (
    <>
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        <Sun className="scale-200 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-200 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <div
        ref={lightShadowRef}
        className="light-shadow fixed inset-0 transition-opacity duration-300 opacity-0 pointer-events-none"
      >
      </div>
      <div ref={el => { curtainRefs.current[0] = el }} className="curtain curtain-left"></div>
      <div ref={el => { curtainRefs.current[1] = el }} className="curtain curtain-right"></div>
    </>
  )
}
