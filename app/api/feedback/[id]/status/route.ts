import prisma from "@/lib/prisma";
import { syncCurrentUser } from "@/lib/sync-user";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1. Double-Check Auth
    const { userId } = await auth();
    if (!userId) {
      console.error("[API_PATCH_STATUS] No userId found in auth()");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await syncCurrentUser();
    if (!dbUser || dbUser.role !== "admin") {
      console.error(`[API_PATCH_STATUS] User ${dbUser?.email} is not an admin`);
      return NextResponse.json({ error: "Unauthorized - Admin only" }, { status: 401 });
    }

    // 2. Parse and Validate
    const { status } = await request.json();
    const postId = parseInt(id);

    console.log(`[API_PATCH_STATUS] Updating post ${postId} to status: ${status}`);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid Post ID" }, { status: 400 });
    }

    // 3. Update with explicit typing for the Enum
    const updatedPost = await prisma.posts.update({
      where: { id: postId },
      data: { status: status },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("[API_PATCH_STATUS_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}