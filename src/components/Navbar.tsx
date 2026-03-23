"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag } from "lucide-react";
import { useCart } from "~/store/useCart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cartItems = useCart((state) => state.items);

  // Ensure hydration matches between server and client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-widest text-slate-900 uppercase"
        >
          Tuzemen Group
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-slate-900 ${
                  isActive ? "text-slate-900" : "text-slate-500"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions (Cart & Mobile Menu) */}
        <div className="flex items-center gap-2">
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-100"
          >
            <ShoppingBag className="h-5 w-5" />
            {isMounted && cartItems.length > 0 && (
              <span className="bg-theme-accent text-theme-secondary absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
                {cartItems.length}
              </span>
            )}
            <span className="sr-only">View Cart</span>
          </Link>

          {/* Mobile Navigation (Dialog) */}
          <div className="md:hidden">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger className="flex h-10 w-10 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-100 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:outline-none">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </DialogTrigger>

              <DialogContent className="w-[90vw] max-w-100 rounded-2xl p-6">
                <DialogHeader className="mb-4 border-b pb-4">
                  <DialogTitle className="text-left text-xl font-bold tracking-widest text-slate-900 uppercase">
                    Navigation
                  </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-6">
                  {links.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== "/" && pathname.startsWith(link.href));
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-medium transition-colors hover:text-slate-900 ${
                          isActive ? "text-slate-900" : "text-slate-500"
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
    </nav>
  );
}
