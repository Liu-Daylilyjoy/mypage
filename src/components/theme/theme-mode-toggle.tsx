"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/shadcn/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const lightShadowRef = React.useRef<HTMLDivElement>(null)
  const lightRef = React.useRef<HTMLDivElement>(null)
  const leftCurtainRef = React.useRef<HTMLDivElement>(null)
  const rightCurtainRef = React.useRef<HTMLDivElement>(null)

  const toggleTheme = () => {
    if (!lightShadowRef.current || !lightRef.current || !leftCurtainRef.current || !rightCurtainRef.current) return

    // 显示遮罩
    lightShadowRef.current.classList.remove('hidden')
    lightShadowRef.current.style.opacity = '1'

    // 2秒后显示光效
    setTimeout(() => {
      lightRef.current?.classList.remove('hidden')
    }, 2000)

    // 3秒后切换主题
    setTimeout(() => {
      const isDark = theme === 'dark'
      setTheme(isDark ? 'light' : 'dark')

      // 更新幕布颜色
      const curtainColor = isDark ? '#ffffff9f' : '#5252529f'
      leftCurtainRef.current!.style.backgroundColor = curtainColor
      rightCurtainRef.current!.style.backgroundColor = curtainColor

      // 更新幕布动画
      const curtains = [leftCurtainRef.current, rightCurtainRef.current]
      curtains.forEach(curtain => {
        if (curtain) {
          if (curtain.classList.contains('open-curtains')) {
            curtain.classList.remove('open-curtains')
            setTimeout(() => {
              curtain.classList.add('open-curtains')
            }, 3000)
          } else {
            curtain.classList.add('open-curtains')
            setTimeout(() => {
              curtain.classList.remove('open-curtains')
            }, 3000)
          }
        }
      })

      // 隐藏光效和遮罩
      lightRef.current?.classList.add('hidden')
      lightShadowRef.current!.style.opacity = '0'
      setTimeout(() => {
        lightShadowRef.current?.classList.add('hidden')
      }, 300)
    }, 3000)
  }

  return (
    <>
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <div
        ref={lightShadowRef}
        className="fixed inset-0 bg-black/80 transition-opacity duration-300 opacity-0 hidden"
      >
        <div ref={lightRef} className="lantern hidden"></div>
      </div>
      <div ref={leftCurtainRef} className="curtain curtain-left"></div>
      <div ref={rightCurtainRef} className="curtain curtain-right"></div>
    </>
  )
}
