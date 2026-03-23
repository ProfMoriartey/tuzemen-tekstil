"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, PackageOpen } from "lucide-react";
import { useCart } from "~/store/useCart";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { sendSampleRequest } from "~/server/actions/cart";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const cartItems = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const clearCart = useCart((state) => state.clearCart);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function handleAction(formData: FormData) {
    setStatus("pending");

    // Now formats as: "1. ACCENT (Full Color Hanger)"
    const formattedCart = cartItems
      .map((item, index) => `${index + 1}. ${item.name} (Full Color Hanger)`)
      .join("\n");

    formData.append("cartData", formattedCart);

    const result = await sendSampleRequest(formData);

    if (result?.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else {
      setStatus("success");
      clearCart();
    }
  }

  // Prevent hydration mismatch by showing a blank screen for a split second
  if (!isMounted) return <div className="bg-theme-bg min-h-screen" />;

  if (status === "success") {
    return (
      <div className="bg-theme-bg flex min-h-screen items-center justify-center px-4 py-24">
        <div className="border-theme-primary/20 w-full max-w-md rounded-2xl border bg-white p-10 text-center shadow-sm">
          <div className="bg-theme-accent/20 text-theme-accent mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <PackageOpen className="h-8 w-8" />
          </div>
          <h2 className="text-theme-text mb-4 text-2xl font-bold tracking-tight uppercase">
            Request Received
          </h2>
          <p className="text-theme-text/70 mb-8 leading-relaxed">
            Thank you for your interest. Our team will prepare your sample
            hangers and contact you shortly with shipping details.
          </p>
          <Link
            href="/products"
            className="bg-theme-secondary inline-flex w-full items-center justify-center rounded-md py-4 font-bold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-theme-bg min-h-screen px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-theme-text border-theme-primary/30 mb-10 border-b pb-6 text-3xl font-bold tracking-tight uppercase md:text-4xl">
          Sample Request Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="border-theme-primary/20 rounded-xl border bg-white py-20 text-center">
            <h2 className="text-theme-text mb-4 text-xl font-bold">
              Your cart is empty
            </h2>
            <p className="text-theme-text/60 mb-8">
              Browse our collection to add fabric samples to your inquiry list.
            </p>
            <Link
              href="/products"
              className="text-theme-accent hover:text-theme-secondary inline-flex items-center font-bold tracking-wide uppercase transition-colors"
            >
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Selected Items */}
            <div className="space-y-6 lg:col-span-7">
              <div className="border-theme-primary/20 overflow-hidden rounded-xl border bg-white">
                <ul className="divide-theme-primary/20 divide-y">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-6 p-4 md:p-6"
                    >
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border bg-slate-100">
                        <Image
                          src={item.imageUrl ?? "/placeholder.jpg"}
                          alt={`${item.name} sample hanger`}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-theme-text text-lg font-bold uppercase">
                          {item.name}
                        </h3>
                        {/* Replaced the specific color text with this tag */}
                        <p className="bg-theme-primary/20 text-theme-text/80 mt-2 inline-block rounded px-2 py-1 text-xs font-bold uppercase">
                          Full Color Palette Hanger
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-theme-text/40 rounded-md p-2 transition-colors hover:bg-red-50 hover:text-red-500"
                        title="Remove sample"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Checkout Form */}
            <div className="lg:col-span-5">
              <div className="border-theme-primary/20 sticky top-24 rounded-xl border bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-theme-text mb-6 text-xl font-bold tracking-tight uppercase">
                  Shipping Details
                </h2>

                <form action={handleAction} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-theme-text text-xs font-bold tracking-wider uppercase"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        className="bg-theme-bg border-theme-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="company"
                        className="text-theme-text text-xs font-bold tracking-wider uppercase"
                      >
                        Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        className="bg-theme-bg border-theme-primary/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-theme-text text-xs font-bold tracking-wider uppercase"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-theme-bg border-theme-primary/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-theme-text text-xs font-bold tracking-wider uppercase"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="bg-theme-bg border-theme-primary/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="text-theme-text text-xs font-bold tracking-wider uppercase"
                    >
                      Full Shipping Address *
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      required
                      placeholder="Street, City, State, ZIP, Country"
                      className="bg-theme-bg border-theme-primary/30 min-h-25"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="notes"
                      className="text-theme-text text-xs font-bold tracking-wider uppercase"
                    >
                      Additional Notes
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Project details or specific requirements..."
                      className="bg-theme-bg border-theme-primary/30 min-h-20"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm font-medium text-red-500">
                      {errorMessage}
                    </p>
                  )}

                  <Button
                    disabled={status === "pending"}
                    className="bg-theme-accent text-theme-secondary mt-4 w-full py-6 font-bold tracking-wider uppercase transition-opacity hover:opacity-90"
                  >
                    {status === "pending"
                      ? "Submitting Request..."
                      : "Submit Inquiry"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
