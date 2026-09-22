"use client";

import React from "react";
import Link from "next/link";
import { AuthShell } from "@/components/shell/auth-shell";
import { useManualProgress } from "@/learning-state/manual-progress";
import { STARTING_MANUAL_SECTIONS } from "@/lib/docs/manual-structure";
import { ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react";

export default function HomePage() {
  const {
    completedCount,
    totalCount,
    isComplete,
    resumeSection,
    isSectionCompleted,
  } = useManualProgress();

  const progressPercentage = Math.round((completedCount / totalCount) * 100);
  const isBrandNew = completedCount === 0;

  return (
    <AuthShell activeItem="home">
      <main className="flex-1 overflow-y-auto">
        <div className="auth-home-container">
          {/* Header */}
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80 font-medium">
              Python Masterclass · Foundation
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Starting Manual
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">
              Build your mental models through concise terminal experiments before advancing to real software projects.
            </p>
          </div>

          {/* ONE Dominant Action Card */}
          <div className="auth-card-dominant mb-10 shadow-xs">
            {!isComplete ? (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  <span className="size-2 rounded-full bg-primary animate-pulse" />
                  <span>{isBrandNew ? "Start Here" : "Continue Learning"}</span>
                </div>

                <div className="text-xs font-mono text-muted-foreground mb-1">
                  Section {resumeSection.id} of {totalCount}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  {resumeSection.title}
                </h2>

                <p className="text-sm text-muted-foreground/90 mt-2 mb-4 leading-relaxed max-w-2xl">
                  {resumeSection.summary ||
                    "Study mental models, step through small code examples, and verify terminal behavior on your machine."}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
                  {resumeSection.time && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      <span>{resumeSection.time} reading & experiments</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-muted">
                      python3
                    </span>
                    <span>Local terminal execution</span>
                  </div>
                </div>

                <div>
                  <Link
                    href={`/manual/${resumeSection.slug}/`}
                    className="auth-primary-btn"
                  >
                    <span>
                      {isBrandNew
                        ? `Begin Section ${resumeSection.id}`
                        : `Continue Section ${resumeSection.id}`}
                    </span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                  <CheckCircle2 className="size-4" />
                  <span>Foundation Complete</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Starting Manual Finished (11 of 11)
                </h2>

                <p className="text-sm text-muted-foreground/90 mt-2 mb-6 leading-relaxed max-w-2xl">
                  You have understood all 11 foundational sections. You now own variables, types, input, decisions, collections, loops, functions, tracebacks, and documentation literacy.
                </p>

                <div className="p-4 rounded-lg bg-muted/40 border border-border/80 mb-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Next Software Challenge
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    Project 1: Terminal Ledger
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Your first substantial terminal application, built on your local machine.
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/manual/01-what-programming-actually-is/"
                    className="auth-secondary-btn"
                  >
                    <span>Review Starting Manual</span>
                  </Link>
                  <Link
                    href="/projects/"
                    className="auth-primary-btn"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Quiet Progress Bar & Section Roadmap */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground tracking-tight uppercase tracking-wider text-[11px]">
                Manual Curriculum
              </span>
              <span className="font-mono text-muted-foreground">
                {completedCount} of {totalCount} Completed ({progressPercentage}%)
              </span>
            </div>

            {/* Restrained progress line */}
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* List of 11 Sections */}
            <div className="border border-border rounded-lg divide-y divide-border overflow-hidden bg-card mt-3">
              {STARTING_MANUAL_SECTIONS.map((section) => {
                const isCompleted = isSectionCompleted(section.slug);
                const isCurrent = !isComplete && resumeSection.slug === section.slug;

                return (
                  <Link
                    key={section.id}
                    href={`/manual/${section.slug}/`}
                    className="auth-roadmap-row group"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-3">
                      {isCompleted ? (
                        <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : isCurrent ? (
                        <Circle className="size-4 text-primary fill-primary/20 shrink-0" />
                      ) : (
                        <Circle className="size-4 text-muted-foreground/40 shrink-0" />
                      )}

                      <span className="font-mono text-xs text-muted-foreground/80 shrink-0">
                        {section.id}
                      </span>

                      <span
                        className={`text-sm truncate transition-colors ${
                          isCurrent
                            ? "font-semibold text-foreground"
                            : isCompleted
                            ? "text-muted-foreground group-hover:text-foreground"
                            : "text-foreground group-hover:text-primary"
                        }`}
                      >
                        {section.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {section.time && (
                        <span className="text-[11px] font-mono text-muted-foreground/70 hidden sm:inline-block">
                          {section.time}
                        </span>
                      )}

                      {isCurrent ? (
                        <span className="text-[10px] font-medium font-mono uppercase px-2 py-0.5 rounded bg-primary/10 text-primary">
                          Up Next
                        </span>
                      ) : isCompleted ? (
                        <span className="text-[10px] font-medium font-mono uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          Read
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium font-mono uppercase px-2 py-0.5 rounded text-muted-foreground/60">
                          Ready
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </AuthShell>
  );
}
