"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CATEGORIES_TYPES } from "@/app/data/category-data";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { submitFeedbackAction } from "@/app/actions/feedback-actions";

// the model (Client-side validation)
export const FeedbackFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Please provide more detail in your description (min 10 chars)"),
});

type FeedbackFormValues = z.infer<typeof FeedbackFormSchema>;

export default function NewFeedbackPage() {
  const router = useRouter();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(FeedbackFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: CATEGORIES_TYPES[0],
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: FeedbackFormValues) {
    const loadingToast = toast.loading("Submitting your feedback...");

    try {
      // Create FormData to match the Server Action signature
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("description", values.description);

      const result = await submitFeedbackAction(formData);

      toast.dismiss(loadingToast);

      if (result.success) {
        toast.success("Your feedback has been submitted successfully");
        form.reset();

        // Short delay to let the toast be seen
        setTimeout(() => {
          router.push("/feedback");
          router.refresh();
        }, 1000);
      } else {
        toast.error(typeof result.error === "string" ? result.error : "Failed to submit feedback. Please check your inputs.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-10 px-4">
      {/* Back Button and Title */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/feedback">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Share Feedback</h1>
      </div>

      <Card className="shadow-lg border-muted">
        <CardHeader className="bg-muted/30 pb-8">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <MessageSquare className="h-5 w-5" />
            <span className="font-semibold uppercase tracking-wider text-xs">New Post</span>
          </div>
          <CardTitle className="text-2xl">Create New Feedback</CardTitle>
          <CardDescription>Share your thoughts, suggestions, or report a bug. We value your input!</CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Feedback Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Add a short, descriptive title" className="h-12 text-base focus-visible:ring-primary" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Field */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES_TYPES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Feedback Detail</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Include any specific comments on what should be improved, added, etc." className="min-h-[150px] text-base focus-visible:ring-primary resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1 h-12 text-base font-bold transition-all active:scale-[0.98]">
                  {isSubmitting ? "Submitting..." : "Add Feedback"}
                </Button>
                <Button type="button" variant="outline" asChild className="flex-1 h-12 text-base font-semibold">
                  <Link href="/feedback">Cancel</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
