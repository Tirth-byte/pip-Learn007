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
import "@/styles/authenticated.css";
import "@/app/learn/doc-reader.css";

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
    <div className="doc-reader-root auth-env-manual min-h-screen flex flex-col text-foreground selection:bg-foreground selection:text-background">
      {/* Top Contextual Header & Mobile Drawer Button */}
      <DocHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Reader Canvas */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto justify-between px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Desktop Left Sidebar: 11-section curriculum navigation */}
        <div className="hidden lg:block w-[240px] shrink-0 border-r border-foreground/10 py-2 pr-5">
          <div className="sticky top-28 h-[calc(100vh-8.5rem)] overflow-y-auto pr-2">
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
              className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-background/95 backdrop-blur-2xl border-r border-foreground/10 shadow-2xl z-10 flex flex-col p-6">
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
          className="flex-1 min-w-0 px-2 sm:px-6 lg:px-10 max-w-[840px] mx-auto outline-none"
        >
          <article className="doc-reader-surface p-6 sm:p-12 lg:p-14">
            {/* Metadata Header */}
            <DocMetadataBanner metadata={chapter.metadata} />

            {/* Rendered Markdown Prose */}
            <DocArticleClient htmlContent={chapter.htmlContent} />

            {/* Section Completion Action Bar */}
            <div className="auth-surface-composed p-6 sm:p-8 mt-16 rounded-2xl">
              {!isLastSection ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <div className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Section Checkpoint
                    </div>
                    <div className="text-base font-semibold text-foreground mt-1 tracking-tight">
                      {isCompleted
                        ? "Section marked complete"
                        : "Verified the examples in your terminal?"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 font-mono">
                      Progress: {completedCount} of {totalCount} sections completed.
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {!isCompleted ? (
                      <button
                        type="button"
                        onClick={handleCompleteAndContinue}
                        className="auth-btn-primary"
                      >
                        <CheckCircle2 className="size-4" />
                        <span>Mark Complete & Next</span>
                        <ArrowRight className="size-4" />
                      </button>
                    ) : chapter.nextSection ? (
                      <Link
                        href={`${routePrefix}/${chapter.nextSection.slug}/`}
                        className="auth-btn-primary"
                      >
                        <span>Next Section</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              ) : (
                /* Section 11 Final Handoff to Terminal Ledger */
                <div className="w-full">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-500 uppercase tracking-wider mb-2">
                    <CheckCircle2 className="size-4" />
                    <span>Final Foundation Section</span>
                  </div>
                  <div className="text-xl font-bold text-foreground tracking-tight">
                    You have completed the Starting Manual curriculum.
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl leading-relaxed">
                    You have built foundational mental models for Python variables, loops, data structures, functions, tracebacks, and documentation literacy. You are ready to start Project 1: Terminal Ledger.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    {!isCompleted ? (
                      <button
                        type="button"
                        onClick={() => markComplete(slug)}
                        className="auth-btn-primary"
                      >
                        <CheckCircle2 className="size-4" />
                        <span>Mark Foundation Complete</span>
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-emerald-500 font-medium px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        ✓ All 11 Sections Complete
                      </span>
                    )}

                    <Link
                      href="/projects/"
                      className="auth-btn-primary"
                    >
                      <span>Proceed to Terminal Ledger</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Section Pager */}
            <div className="flex items-center justify-between border-t border-foreground/10 pt-8 mt-12 text-xs font-mono">
              {chapter.prevSection ? (
                <Link
                  href={`${routePrefix}/${chapter.prevSection.slug}/`}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
                  <span>{chapter.prevSection.title}</span>
                </Link>
              ) : (
                <div />
              )}

              {chapter.nextSection ? (
                <Link
                  href={`${routePrefix}/${chapter.nextSection.slug}/`}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group font-semibold text-right"
                >
                  <span>{chapter.nextSection.title}</span>
                  <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </article>
        </main>

        {/* Desktop Right TOC Sidebar */}
        <div className="hidden xl:block w-[220px] shrink-0 py-6 pl-4">
          <div className="sticky top-20">
            <DocToc items={chapter.toc} />
          </div>
        </div>
      </div>
    </div>
  );
}
