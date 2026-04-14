"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "~/i18n/routing";
import { Trash2, ArrowRight, PackageOpen, Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCart } from "~/store/useCart";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { sendSampleRequest } from "~/server/actions/cart";

export default function CartPage() {
  const t = useTranslations("CartPage");
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const cartItems = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const clearCart = useCart((state) => state.clearCart);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function handleAction(formData: FormData) {
    setStatus("pending");

    const formattedCart = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.quantity}x ${item.name} (Full Color Hanger)`,
      )
      .join("\n");

    formData.append("cartData", formattedCart);
    formData.append("cartJson", JSON.stringify(cartItems));

    const result = await sendSampleRequest(formData);

    if (result?.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else {
      setStatus("success");
      clearCart();
    }
  }

  if (!isMounted) return <div className="bg-theme-bg min-h-screen" />;

  if (status === "success") {
    return (
      <div className="bg-theme-bg flex min-h-screen items-center justify-center px-4 py-24">
        <div className="border-theme-primary/20 bg-theme-bg w-full max-w-md rounded-2xl border p-10 text-center shadow-sm">
          <div className="bg-theme-accent/20 text-theme-accent mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <PackageOpen className="h-8 w-8" />
          </div>
          <h2 className="text-theme-text mb-4 text-2xl font-bold tracking-tight uppercase">
            {t("success.title")}
          </h2>
          <p className="text-theme-text/70 mb-8 leading-relaxed">
            {t("success.description")}
          </p>
          <Link
            href="/products"
            className="bg-theme-secondary text-theme-bg inline-flex w-full items-center justify-center rounded-md py-4 font-bold tracking-wide uppercase transition-opacity hover:opacity-90"
          >
            {t("success.link")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-theme-bg min-h-screen px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-theme-text border-theme-primary/30 mb-10 border-b pb-6 text-3xl font-bold tracking-tight uppercase md:text-4xl">
          {t("title")}
        </h1>

        {cartItems.length === 0 ? (
          <div className="border-theme-primary/20 bg-theme-bg rounded-xl border py-20 text-center">
            <h2 className="text-theme-text mb-4 text-xl font-bold">
              {t("empty.title")}
            </h2>
            <p className="text-theme-text/60 mb-8">{t("empty.description")}</p>
            <Link
              href="/products"
              className="text-theme-accent hover:text-theme-secondary inline-flex items-center font-bold tracking-wide uppercase transition-colors"
            >
              {t("empty.link")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-6 lg:col-span-7">
              <div className="border-theme-primary/20 bg-theme-bg overflow-hidden rounded-xl border">
                <ul className="divide-theme-primary/20 divide-y">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-6 p-4 md:p-6"
                    >
                      <div className="bg-theme-secondary/10 relative h-24 w-24 shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.imageUrl ?? "/placeholder.jpg"}
                          alt={t("item.imageAlt", { name: item.name })}
                          
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-theme-text text-lg font-bold uppercase">
                          {item.name}
                        </h3>
                        <p className="bg-theme-primary/20 text-theme-text/80 mt-2 inline-block rounded px-2 py-1 text-xs font-bold uppercase">
                          {t("item.tag")}
                        </p>
                      </div>
                      <div className="border-theme-primary/10 mt-4 flex items-center justify-between gap-6 border-t pt-4 sm:mt-0 sm:w-auto sm:justify-end sm:border-0 sm:pt-0">
                        <div className="border-theme-primary/30 bg-theme-bg flex items-center rounded-md border">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="text-theme-text/60 hover:text-theme-text hover:bg-theme-primary/10 p-2 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-theme-text w-10 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="text-theme-text/60 hover:text-theme-text hover:bg-theme-primary/10 p-2 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-theme-text/40 hover:bg-theme-secondary/20 hover:text-theme-text rounded-md p-2 transition-colors"
                          title={t("item.remove")}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border-theme-primary/20 bg-theme-bg sticky top-24 rounded-xl border p-6 shadow-sm md:p-8">
                <h2 className="text-theme-text mb-6 text-xl font-bold tracking-tight uppercase">
                  {t("form.title")}
                </h2>

                <form action={handleAction} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-theme-text text-xs font-bold tracking-wider uppercase"
                      >
                        {t("form.fields.name")}
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
                        {t("form.fields.company")}
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
                      {t("form.fields.email")}
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
                      {t("form.fields.phone")}
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
                      {t("form.fields.address")}
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      required
                      placeholder={t("form.fields.addressPlaceholder")}
                      className="bg-theme-bg border-theme-primary/30 min-h-25"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="notes"
                      className="text-theme-text text-xs font-bold tracking-wider uppercase"
                    >
                      {t("form.fields.notes")}
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder={t("form.fields.notesPlaceholder")}
                      className="bg-theme-bg border-theme-primary/30 min-h-20"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm font-medium text-destructive">
                      {errorMessage}
                    </p>
                  )}

                  <Button
                    disabled={status === "pending"}
                    className="bg-theme-accent text-theme-secondary mt-4 w-full py-6 font-bold tracking-wider uppercase transition-opacity hover:opacity-90"
                  >
                    {status === "pending"
                      ? t("form.status.pending")
                      : t("form.status.submit")}
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
