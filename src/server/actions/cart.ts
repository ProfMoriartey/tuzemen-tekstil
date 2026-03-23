"use server"

import { Resend } from "resend"
import { db } from "~/server/db"
import { sampleRequests } from "~/server/db/schema"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendSampleRequest(formData: FormData) {
  const name = formData.get("name") as string
  const company = formData.get("company") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const address = formData.get("address") as string
  const notes = formData.get("notes") as string
  
  // Get the raw cart data string and the parsed JSON
  const cartDataString = formData.get("cartData") as string
  const cartJsonString = formData.get("cartJson") as string 

  if (!email || !cartDataString || !cartJsonString) {
    return { error: "Missing required information." }
  }

  try {
    // 1. Save to Database
    const parsedItems = JSON.parse(cartJsonString)
    await db.insert(sampleRequests).values({
      name,
      company,
      email,
      phone,
      address,
      notes,
      items: parsedItems,
      status: "pending"
    })

    // 2. Send Email
    await resend.emails.send({
      from: "Tuzemen Sample Requests <onboarding@resend.dev>",
      to: "your-email@example.com", // Replace with your email
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
${cartDataString}
      `
    })

    return { success: true }
  } catch (error) {
    console.error("Submission error:", error)
    return { error: "Failed to submit request. Please try again." }
  }
}