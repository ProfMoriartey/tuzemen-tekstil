import "~/styles/globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "~/i18n/routing";
import { type Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Tuzemen Group",
  description: "Sustainable fabrics for a better tomorrow.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await the dynamic route parameters
  const { locale } = await params;

  // Verify the URL locale matches your supported languages
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Fetch the dictionaries from your server configuration
  const messages = await getMessages();
  return (
    <html lang="en" className={cn(geist.variable, "font-sans", inter.variable)}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ClerkProvider>
            <Navbar />
            {children}
            <Footer />
          </ClerkProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
