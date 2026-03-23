import { getRequestConfig } from "next-intl/server"

const locales = ["en", "tr"]

export default getRequestConfig(async ({ requestLocale }) => {
  // Await the locale from the incoming request
  let locale = await requestLocale

  // Validate the locale or fallback to English
  if (!locale || !locales.includes(locale)) {
    locale = "en"
  }

  return {
    locale,
    // Load the correct dictionary dynamically
    messages: (await import(`../../messages/${locale}.json`)).default
  }
})