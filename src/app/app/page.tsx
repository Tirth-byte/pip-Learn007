"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AppRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-xs font-mono text-muted-foreground animate-pulse">
        Loading PipLearn workspace...
      </div>
    </div>
  );
}
