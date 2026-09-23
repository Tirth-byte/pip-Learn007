"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DocHeader } from "./doc-header";
import { DocSidebar } from "./doc-sidebar";
import { DocToc } from "./doc-toc";
import { DocMetadataBanner } from "./doc-metadata-banner";
import { DocArticleClient } from "./doc-article-client";
import { DocChapterData } from "@/lib/docs/types";
import { useManualProgress } from "@/learning-state/manual-progress";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";

interface DocReaderLayoutProps {
  chapter: DocChapterData;
  routePrefix?: string; // Default is "/manual"
  currentSlug?: string;
}

export function DocReaderLayout({
  chapter,
  routePrefix = "/manual",
  currentSlug,
}: DocReaderLayoutProps) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    isSectionCompleted,
    markComplete,
    setLastRead,
    completedCount,
    totalCount,
  } = useManualProgress();

  // Resolve current section slug from prop or fallback to section id match
  const slug =
    currentSlug ||
    (chapter.metadata.section === "04"
      ? "04-input-output"
      : `section-${chapter.metadata.section}`);

  const isCompleted = isSectionCompleted(slug);
  const isLastSection = chapter.metadata.section === "11";

  // When reading, record that this section was visited
  useEffect(() => {
    if (slug) {
      setLastRead(slug);
    }
  }, [slug, setLastRead]);

  const handleCompleteAndContinue = () => {
    markComplete(slug);
    if (chapter.nextSection) {
      router.push(`${routePrefix}/${chapter.nextSection.slug}/`);
    }
  };

  return (
    <div className="doc-reader-root min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
      {/* Top Header */}
      <DocHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Container */}
      <div className="flex-1 flex max-w-[1400px] w-full mx-auto justify-between">
        {/* Desktop Left Sidebar: 11-section curriculum navigation */}
        <div className="hidden lg:block w-[230px] shrink-0 border-r border-border/70">
          <div className="sticky top-13 h-[calc(100vh-3.25rem)] overflow-y-auto">
            <DocSidebar
              currentSectionId={chapter.metadata.section}
              routePrefix={routePrefix}
            />
          </div>
        </div>

        {/* Mobile Sidebar Overlay Drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-background border-r border-border shadow-xl z-10 flex flex-col">
              <DocSidebar
                currentSectionId={chapter.metadata.section}
                onNavigate={() => setIsSidebarOpen(false)}
                routePrefix={routePrefix}
              />
            </div>
          </div>
        )}

        {/* Center: Dominant Reading Surface */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 min-w-0 px-5 sm:px-10 md:px-14 lg:px-16 py-7 lg:py-9 max-w-[820px] mx-auto outline-none"
        >
          <article className="prose-container">
            {/* Metadata Header */}
            <DocMetadataBanner metadata={chapter.metadata} />

            {/* Rendered Markdown Prose */}
            <DocArticleClient htmlContent={chapter.htmlContent} />

            {/* Section Completion Action Bar */}
            <div className="auth-section-completion-bar mt-16">
              {!isLastSection ? (
                <>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Section Checkpoint
                    </div>
                    <div className="text-sm font-medium text-foreground mt-0.5">
                      {isCompleted
                        ? "Section understood and marked complete"
                        : "Verified the examples in your terminal?"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Progress: {completedCount} of {totalCount} sections completed.
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {!isCompleted ? (
                      <button
                        type="button"
                        onClick={handleCompleteAndContinue}
                        className="auth-primary-btn"
                      >
                        <CheckCircle2 className="size-4" />
                        <span>Mark Complete & Next</span>
                        <ArrowRight className="size-4" />
                      </button>
                    ) : chapter.nextSection ? (
                      <Link
                        href={`${routePrefix}/${chapter.nextSection.slug}/`}
                        className="auth-primary-btn"
                      >
                        <span>Next Section</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    ) : null}
                  </div>
                </>
              ) : (
                /* Section 11 Final Handoff to Terminal Ledger */
                <div className="w-full">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                    <CheckCircle2 className="size-4" />
                    <span>Final Foundation Section</span>
                  </div>
                  <div className="text-base font-bold text-foreground">
                    You have completed the Starting Manual curriculum.
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xl leading-relaxed">
                    You have built foundational mental models for Python variables, loops, data structures, functions, tracebacks, and documentation literacy. You are ready to start Project 1: Terminal Ledger.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {!isCompleted ? (
                      <button
                        type="button"
                        onClick={() => markComplete(slug)}
                        className="auth-primary-btn"
                      >
                        <CheckCircle2 className="size-4" />
                        <span>Mark Foundation Complete</span>
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                        ✓ All 11 Sections Complete
                      </span>
                    )}

                    {isCompleted && (
                      <Link
                        href="/projects/terminal-ledger/"
                        className="auth-primary-btn"
                      >
                        <span>Start Project: Terminal Ledger</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    )}

                    <Link href="/home/" className="auth-secondary-btn">
                      <span>Return to Home Workspace</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Section Navigation */}
            <nav
              aria-label="Previous and next section navigation"
              className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
            >
              {chapter.prevSection ? (
                <Link
                  href={`${routePrefix}/${chapter.prevSection.slug}/`}
                  className="w-full sm:w-auto flex flex-col text-left group transition-colors"
                >
                  <span className="text-xs text-muted-foreground/80 mb-1">Previous</span>
                  <div className="text-foreground group-hover:text-primary flex items-center gap-1.5 transition-colors">
                    <ChevronLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
                    <span className="truncate">{chapter.prevSection.title}</span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {chapter.nextSection ? (
                <Link
                  href={`${routePrefix}/${chapter.nextSection.slug}/`}
                  className="w-full sm:w-auto flex flex-col text-right ml-auto group transition-colors"
                >
                  <span className="text-xs text-muted-foreground/80 mb-1">Next Section</span>
                  <div className="text-foreground group-hover:text-primary flex items-center gap-1.5 justify-end transition-colors">
                    <span className="truncate">{chapter.nextSection.title}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ) : (
                <Link
                  href="/home/"
                  className="w-full sm:w-auto flex flex-col text-right ml-auto group transition-colors"
                >
                  <span className="text-xs text-muted-foreground/80 mb-1">Curriculum Complete</span>
                  <div className="text-foreground group-hover:text-primary flex items-center gap-1.5 justify-end transition-colors font-medium">
                    <span>Return to Home Workspace</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </div>
                </Link>
              )}
            </nav>
          </article>
        </main>

        {/* Desktop Right Rail: Quiet Orientation Aid (Table of Contents) */}
        <div className="hidden xl:block w-[220px] shrink-0 border-l border-border/50">
          <div className="sticky top-13 h-[calc(100vh-3.25rem)] overflow-y-auto py-7 px-4">
            <DocToc items={chapter.toc} />
          </div>
        </div>
      </div>
    </div>
  );
}
