"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  if (!email || !message) {
    return { error: "Email and message are required." }
  }

  try {
    await resend.emails.send({
      from: "Winbrella Contact Form <onboarding@resend.dev>",
      to: "tzm5315293985@gmail.com", // Update this
      subject: `New Website Inquiry: ${subject}`,
      replyTo: email,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`
    })

    return { success: true }
  } catch {
    return { error: "Failed to send email. Please try again later." }
  }
}