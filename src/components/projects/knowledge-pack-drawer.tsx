"use client";

import React, { useEffect, useRef } from "react";
import { X, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import { KnowledgePackData } from "@/lib/projects/terminal-ledger/types";
import { DocArticleClient } from "@/components/docs/doc-article-client";

interface KnowledgePackDrawerProps {
  pack: KnowledgePackData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function KnowledgePackDrawer({ pack, isOpen, onClose }: KnowledgePackDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus close button on open
  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen || !pack) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pack-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-12">
        <div
          ref={drawerRef}
          className="w-screen max-w-3xl bg-background border-l border-border shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-200"
        >
          {/* Drawer Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/10 bg-background/80 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-2.5 min-w-0 pr-4">
              <span className="p-1 rounded bg-primary/10 text-primary shrink-0">
                <BookOpen className="size-4" />
              </span>
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block truncate">
                  Knowledge Pack · Contextual Reference
                </span>
                <span className="text-xs font-semibold text-foreground truncate block">
                  {pack.packName}
                </span>
              </div>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close knowledge pack"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Header */}
              <div>
                <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider">
                  Phase {pack.phaseNumber} Concept Reference
                </span>
                <h1
                  id="pack-drawer-title"
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1 mb-3"
                >
                  {pack.title}
                </h1>

                {/* Metadata tags */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1 border-b border-border/60 pb-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    <span>{pack.estimatedTime}</span>
                  </div>
                  {pack.prerequisites && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-muted-foreground/60">·</span>
                      <span>Prerequisites: {pack.prerequisites}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Outcomes callout if available */}
              {pack.outcomes && pack.outcomes.length > 0 && (
                <div className="p-4 rounded-lg bg-muted/40 border border-border/70 text-xs">
                  <div className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-primary" />
                    <span>Capabilities Introduced</span>
                  </div>
                  <ul className="space-y-1 text-muted-foreground">
                    {pack.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-primary font-mono">•</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Anti-solution banner */}
              <div className="px-3.5 py-2.5 rounded-md bg-muted/30 border border-border/60 text-[11.5px] text-muted-foreground flex items-center gap-2">
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-muted text-foreground">
                  NOTE
                </span>
                <span>
                  Examples use unrelated domains (plants, scores, books) to teach the capability without spoiling your ledger design.
                </span>
              </div>

              {/* Markdown Content */}
              <div className="mt-6">
                <DocArticleClient htmlContent={pack.htmlContent} />
              </div>

              {/* Return to workspace CTA at bottom */}
              <div className="pt-8 border-t border-border mt-10">
                <button
                  type="button"
                  onClick={onClose}
                  className="auth-secondary-btn w-full justify-center"
                >
                  <span>Return to Milestone Brief</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
