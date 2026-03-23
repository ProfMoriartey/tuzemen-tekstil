import { getRequestConfig } from "next-intl/server"

const locales = ["en", "tr", "ru"]

// Define a generic type for your nested JSON dictionaries
type Messages = Record<string, Record<string, string>>

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !locales.includes(locale)) {
    locale = "en"
  }

  // Cast the dynamic import to satisfy strict TypeScript rules
  const messageModule = (await import(`../../messages/${locale}.json`)) as {
    default: Messages
  }

  return {
    locale,
    messages: messageModule.default
  }
})