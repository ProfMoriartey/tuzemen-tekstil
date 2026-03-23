
"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendSampleRequest(formData: FormData) {
  const name = formData.get("name") as string
  const company = formData.get("company") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const address = formData.get("address") as string
  const notes = formData.get("notes") as string
  const cartData = formData.get("cartData") as string

  if (!email || !cartData) {
    return { error: "Missing required information." }
  }

  try {
    await resend.emails.send({
      from: "Tuzemen Sample Requests <onboarding@resend.dev>",
      to: "your-email@example.com", // Replace with your actual receiving email
      subject: `New Sample Request from ${company || name}`,
      replyTo: email,
      text: `
New Sample Request Details:
---------------------------
Name: ${name}
Company: ${company || "N/A"}
Email: ${email}
Phone: ${phone || "N/A"}

Shipping Address:
${address}

Additional Notes:
${notes || "None"}

Requested Fabrics:
---------------------------
${cartData}
      `
    })

    return { success: true }
  } catch {
    return { error: "Failed to submit request. Please try again." }
  }
}