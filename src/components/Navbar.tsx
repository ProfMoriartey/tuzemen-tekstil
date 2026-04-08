"use client";

import { useState, useEffect } from "react";
import { Link } from "~/i18n/routing";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCart } from "~/store/useCart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cartItems = useCart((state) => state.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const links = [
    { name: t("links.home"), href: "/" },
    { name: t("links.products"), href: "/products" },
    { name: t("links.about"), href: "/about" },
    { name: t("links.contact"), href: "/contact" },
  ];

  return (
    <nav className="bg-theme-bg/95 border-theme-primary/30 sticky top-0 z-50 w-full border-b backdrop-blur supports-backdrop-filter:bg-theme-bg/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Left Side: Logo */}
        <Link
          href="/"
          className="relative h-12 w-48 transition-opacity hover:opacity-90"
        >
          <Image
            src="/logo.svg" // Replace with your actual path (e.g., /logo.png)
            alt="Tuzemen Group Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Right Side: Links + Separator + Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Desktop Links */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-theme-text ${
                    isActive ? "text-theme-text" : "text-theme-text/70"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Separator */}
          <div className="bg-theme-primary/30 hidden h-6 w-px md:block"></div>

          {/* Action Icons & Mobile Menu */}
          <div className="flex items-center gap-1">
            <Link
              href="/cart"
              className="text-theme-text hover:bg-theme-secondary/20 relative flex h-10 w-10 items-center justify-center rounded-md transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {isMounted && cartItems.length > 0 && (
                <span className="bg-theme-accent text-theme-secondary absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
                  {cartItems.length}
                </span>
              )}
              <span className="sr-only">{t("actions.viewCart")}</span>
            </Link>

            <LanguageSwitcher />

            <div className="md:hidden">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className="text-theme-text hover:bg-theme-secondary/20 focus:ring-theme-accent flex h-10 w-10 items-center justify-center rounded-md transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t("actions.toggleMenu")}</span>
                </DialogTrigger>

                <DialogContent className="w-[90vw] max-w-100 rounded-2xl p-6">
                  <DialogHeader className="mb-4 border-b pb-4">
                    <DialogTitle className="text-theme-text text-left text-xl font-bold tracking-widest uppercase">
                      {t("actions.navTitle")}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex flex-col gap-6">
                    {links.map((link) => {
                      const isActive =
                        pathname === link.href ||
                        (link.href !== "/" && pathname.startsWith(link.href));
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-lg font-medium transition-colors hover:text-theme-text ${
                            isActive ? "text-theme-text" : "text-theme-text/70"
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
