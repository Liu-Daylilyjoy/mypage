"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/shadcn/button"
import { useCallback } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = useCallback((theme: string | undefined) => {
    const transition = document.startViewTransition(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    })
    transition.ready.then(() => {
      document.documentElement.animate({
        clipPath: [`inset(0% 0% 0% 100%)`, `inset(0% 0% 0% 0%)`],
      }, {
        duration: 200,
        pseudoElement: '::view-transition-new(root)',
      })
    })
  }, [])

  return (
    <>
      <Button className="-z-1 opacity-70 hover:opacity-100 hover:scale-120 hover:text-theme-color transition-all duration-300" variant="link" size="icon" onClick={(e) => toggleTheme(theme)}>
        <Sun className="absolute scale-210 dark:scale-0" />
        <Moon className="absolute scale-0 dark:scale-210" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  )
}
