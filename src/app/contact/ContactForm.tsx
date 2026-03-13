"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { sendContactEmail } from "~/server/actions/contact";

export default function ContactForm() {
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
          Message Sent
        </h3>
        <p>Thank you for reaching out. We will get back to you shortly.</p>
        <Button
          onClick={() => setStatus("idle")}
          variant="outline"
          className="border-theme-primary text-theme-text hover:bg-theme-bg mt-4"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form action={handleAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-theme-text">
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            required
            placeholder="John"
            className="bg-theme-bg border-theme-primary/30"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-theme-text">
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            required
            placeholder="Doe"
            className="bg-theme-bg border-theme-primary/30"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-theme-text">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="john@company.com"
          className="bg-theme-bg border-theme-primary/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-theme-text">
          Subject
        </Label>
        <Input
          id="subject"
          name="subject"
          required
          placeholder="Bulk Order Inquiry"
          className="bg-theme-bg border-theme-primary/30"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-theme-text">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell us about your project requirements..."
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
        {status === "pending" ? "Sending..." : "Send Message"}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}
