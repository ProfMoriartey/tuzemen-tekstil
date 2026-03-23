"use server"

import { db } from "~/server/db"
import { sampleRequests } from "~/server/db/schema"
import { eq } from "drizzle-orm"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function updateRequestStatus(id: number, status: string) {
  const user = await currentUser()
  if (user?.publicMetadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required")
  }

  await db.update(sampleRequests)
    .set({ status })
    .where(eq(sampleRequests.id, id))

  // Refresh the page data automatically
  revalidatePath("/admin/requests")
}