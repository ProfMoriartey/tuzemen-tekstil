import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

export const routing = defineRouting({
  locales: ["en", "tr", "ru"],
  defaultLocale: "en"
})

// Export these specialized navigation tools to use throughout your app
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)