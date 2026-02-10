import AdminFeedbackTable from "@/components/admin-feedback-table";
import { GradientHeader } from "@/components/gradient-header";
import prisma from "@/lib/prisma";
import { syncCurrentUser } from "@/lib/sync-user";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AdminTableSkeleton } from "@/components/skeletons";

async function AdminContent() {
  // Use our sync helper to get the database user inside the streaming component
  const dbUser = await syncCurrentUser();

  // 1. If no user is logged in, syncCurrentUser returns null
  if (!dbUser) {
    redirect("/sign-in");
  }

  // 2. Strict Admin Check: Only users with the 'admin' role in our DB can proceed
  if (dbUser.role !== "admin") {
    console.warn(`Unauthorized access attempt to /admin by user: ${dbUser.email}`);
    redirect("/");
  }

  // 3. Fetch all posts with their author and votes
  const posts = await prisma.posts.findMany({
    include: {
      users: true,
      votes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <AdminFeedbackTable initialPosts={posts} />;
}

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      {/* Static Header: This will now load INSTANTLY because there are no awaits in this function */}
      <GradientHeader
        title="Admin Dashboard"
        subtitle="Manage community feedback and update progress statuses"
      />
      
      {/* Dynamic Content: Handles security AND data fetching while showing the skeleton */}
      <Suspense fallback={<AdminTableSkeleton />}>
        <AdminContent />
      </Suspense>
    </div>
  );
}
