"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useManualProgress } from "@/learning-state/manual-progress";

export default function ManualRootPage() {
  const router = useRouter();
  const { resumeSection } = useManualProgress();

  useEffect(() => {
    router.replace(`/manual/${resumeSection.slug}/`);
  }, [router, resumeSection.slug]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-xs font-mono text-muted-foreground animate-pulse">
        Loading Starting Manual...
      </div>
    </div>
  );
}
