"use server";

import prisma from "@/lib/prisma";
import { syncCurrentUser } from "@/lib/sync-user";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import z from "zod";

const FeedbackSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Please provide more detail in your description (min 10 chars)"),
  updatedAt: z.date(),
  authorId: z.number().int(),
});

// the controller
export async function submitFeedbackAction(formData: FormData) {
  await syncCurrentUser();

  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized. Log in to create a post." };

  const userFromDB = await prisma.users.findUnique({
    where: { clerkUserId: userId },
  });

  if (!userFromDB) return { error: "Unauthorized." };

  try {
    const rawData = {
      title: formData.get("title"),
      category: formData.get("category"),
      description: formData.get("description"),
      authorId: userFromDB?.id,
      updatedAt: new Date(),
    };

    const validated = FeedbackSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.flatten().fieldErrors,
      };
    }
    await prisma.posts.create({
      data: validated.data,
    });

    revalidatePath("/feedback");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Server error occurred" };
  }
}
