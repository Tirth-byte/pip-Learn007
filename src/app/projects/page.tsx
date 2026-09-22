"use client";

import React from "react";
import Link from "next/link";
import { AuthShell } from "@/components/shell/auth-shell";
import { useManualProgress } from "@/learning-state/manual-progress";
import { ArrowRight, BookOpen } from "lucide-react";

export default function ProjectsPage() {
  const { resumeSection, isComplete, completedCount, totalCount } = useManualProgress();

  return (
    <AuthShell activeItem="projects">
      <main className="flex-1 overflow-y-auto">
        <div className="auth-home-container">
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80 font-medium">
              Curriculum Progression
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Projects
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl leading-relaxed">
              Projects are where real software is built on your local machine.
              You will reach the first project once you complete the foundational Starting Manual.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Prerequisite
            </div>
            <div className="text-base font-semibold text-foreground">
              Python Starting Manual
            </div>
            <p className="text-xs text-muted-foreground mt-1 max-w-md leading-relaxed">
              {isComplete
                ? "You have completed all 11 foundational sections. Project workspace onboarding will be introduced in the next vertical slice."
                : `Currently in progress: ${completedCount} of ${totalCount} sections completed. Continue through the manual to prepare for your first build.`}
            </p>

            <div className="mt-5">
              <Link
                href={`/manual/${resumeSection.slug}/`}
                className="auth-primary-btn"
              >
                <BookOpen className="size-4" />
                <span>
                  {isComplete ? "Review Starting Manual" : `Continue Section ${resumeSection.id}`}
                </span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </AuthShell>
  );
}
