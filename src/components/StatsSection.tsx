"use client"

import { Globe, Users, Package } from "lucide-react"
import AnimatedStat from "./AnimatedStat"

export default function StatsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-theme-bg py-10 sm:py-12 border-y border-border">
      <div className="container relative z-10 mx-auto px-4">
        
        {/* Header */}
        {/* <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-wide uppercase text-slate-900">
            Global Reach
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Delivering quality textiles worldwide.
          </p>
        </div> */}

        {/* Stats Grid - Updated to 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto "> 
            {/* divide-y sm:divide-y-0 sm:divide-x divide-border */}
          
          <AnimatedStat 
            end={56} 
            suffix="+" 
            title="Countries Exported To" 
            icon={Globe} 
          />

          <AnimatedStat 
            end={500} 
            suffix="+" 
            title="Satisfied Customers" 
            icon={Users} 
            duration={2500} 
          />

          {/* New Metric Tons Sold Stat */}
          <AnimatedStat
            end={10000} 
            suffix="+" 
            title="Meters Sold" 
            icon={Package} 
            duration={3000} // Slightly longer duration for the high number
          />

        </div>
      </div>
    </section>
  )
}