"use client"

import { Globe, Users, Package } from "lucide-react"
import { useTranslations } from "next-intl"
import AnimatedStat from "./AnimatedStat"

export default function StatsSection() {
  const t = useTranslations("StatsSection");

  return (
    <section className="relative w-full overflow-hidden bg-theme-bg py-10 sm:py-12 border-y border-border">
      <div className="container relative z-10 mx-auto px-4">

        {/* Stats Grid - Updated to 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto "> 
            {/* divide-y sm:divide-y-0 sm:divide-x divide-border */}
          
          <AnimatedStat 
            end={56} 
            suffix="+" 
            title={t("countriesExported")} 
            icon={Globe} 
          />

          <AnimatedStat 
            end={3000} 
            suffix="+" 
            title={t("satisfiedCustomers")} 
            icon={Users} 
            duration={2500} 
          />

          {/* New Metric Tons / Meters Sold Stat */}
          <AnimatedStat
            end={100000} 
            suffix="+" 
            title={t("metersSold")} 
            icon={Package} 
            duration={3000} // Slightly longer duration for the high number
          />

        </div>
      </div>
    </section>
  )
}