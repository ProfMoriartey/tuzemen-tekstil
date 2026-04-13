"use client"

import { useEffect, useState, useRef } from "react"
import { DivideIcon as LucideIcon } from "lucide-react"

interface AnimatedStatProps {
  end: number
  suffix?: string
  title: string
  icon: typeof LucideIcon
  duration?: number
}

export default function AnimatedStat({ 
  end, 
  suffix = "", 
  title, 
  icon: Icon,
  duration = 2000 // Default 2 second animation
}: AnimatedStatProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  // 1. Detect when the component scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true)
          // Disconnect after triggering once so it doesn't restart every scroll
          if (elementRef.current) observer.unobserve(elementRef.current)
        }
      },
      { threshold: 0.3 } // Triggers when 30% of the element is visible
    )

    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [])

  // 2. Animate the numbers
  useEffect(() => {
    if (!isVisible) return

    let startTimestamp: number | null = null
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      
      // Easing function (easeOutExpo) makes it spin fast and slow down at the end
      const easeOutProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      setCount(Math.floor(easeOutProgress * end))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrameId)
  }, [isVisible, end, duration])

  return (
    <div ref={elementRef} className="flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-theme-accent text-theme-bg">
        <Icon className="h-6 w-6" />
      </div>
      <div className="mb-2 flex items-baseline justify-center font-bold text-theme-text">
        <span className="text-4xl sm:text-5xl">{count}</span>
        <span className="text-3xl sm:text-4xl text-theme-accent">{suffix}</span>
      </div>
      <p className="text-sm sm:text-base font-medium text-theme-text/70 uppercase tracking-wider">
        {title}
      </p>
    </div>
  )
}