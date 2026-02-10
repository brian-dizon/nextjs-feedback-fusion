"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function SignUpPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
            elements: {
              card: "shadow-2xl border border-slate-200 dark:border-slate-800",
              headerTitle: "text-2xl font-bold tracking-tight",
              headerSubtitle: "text-slate-500 dark:text-slate-400",
              socialButtonsBlockButton: 
                "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all",
              formButtonPrimary: 
                "bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold py-2 px-4 rounded-lg transition-all",
              footerActionLink: "text-blue-600 dark:text-blue-400 hover:text-blue-500 font-semibold",
            },
          }}
        />
      </div>
    </div>
  );
}
