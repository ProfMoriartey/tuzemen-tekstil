"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { sendContactEmail } from "~/server/actions/contact";

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleAction(formData: FormData) {
    setStatus("pending");
    const result = await sendContactEmail(formData);

    if (result?.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else {
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-theme-accent/20 text-theme-text border-theme-accent/40 space-y-4 rounded-xl border p-8 text-center">
        <h3 className="text-2xl font-bold tracking-tight uppercase">
          {t("status.successTitle")}
        </h3>
        <p>{t("status.successDescription")}</p>
        <Button
          onClick={() => setStatus("idle")}
          variant="outline"
          className="border-theme-primary text-theme-text hover:bg-theme-bg mt-4"
        >
          {t("status.sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form action={handleAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-theme-text">
            {t("labels.firstName")}
          </Label>
          <Input
            id="firstName"
            name="firstName"
            required
            placeholder={t("placeholders.firstName")}
            className="bg-theme-bg border-theme-primary/30"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-theme-text">
            {t("labels.lastName")}
          </Label>
          <Input
            id="lastName"
            name="lastName"
            required
            placeholder={t("placeholders.lastName")}
            className="bg-theme-bg border-theme-primary/30"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-theme-text">
          {t("labels.email")}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t("placeholders.email")}
          className="bg-theme-bg border-theme-primary/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-theme-text">
          {t("labels.subject")}
        </Label>
        <Input
          id="subject"
          name="subject"
          required
          placeholder={t("placeholders.subject")}
          className="bg-theme-bg border-theme-primary/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-theme-text">
          {t("labels.message")}
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder={t("placeholders.message")}
          className="bg-theme-bg border-theme-primary/30 min-h-37.5"
        />
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-red-500">{errorMessage}</p>
      )}

      <Button
        disabled={status === "pending"}
        className="bg-theme-accent text-theme-secondary w-full py-6 font-bold tracking-wider uppercase transition-opacity hover:opacity-90"
      >
        {status === "pending" ? t("status.sending") : t("status.send")}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}
