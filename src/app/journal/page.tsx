"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  NotebookPen,
  Calendar,
  ArrowRight,
  ChevronRight,
  FolderKanban,
} from "lucide-react";
import { AuthShell } from "@/components/shell/auth-shell";
import {
  useProblemJournal,
  ProblemJournalEntry,
} from "@/learning-state/problem-journal";
import { ProblemJournalDrawer } from "@/components/projects/problem-journal-drawer";
import { getPhaseBySlug } from "@/lib/projects/terminal-ledger/structure";

export default function JournalPage() {
  const entries = useProblemJournal();
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const selectedEntry = entries.find((e) => e.id === selectedEntryId);
  const selectedPhase = selectedEntry
    ? getPhaseBySlug(selectedEntry.phase)
    : undefined;

  const handleOpenEntry = (entry: ProblemJournalEntry) => {
    setSelectedEntryId(entry.id);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedEntryId(null);
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <AuthShell>
      <div className="flex-1 flex flex-col min-h-screen bg-background text-foreground">
        {/* Top Header */}
        <header className="border-b border-border/80 bg-background/95 backdrop-blur-xs px-4 sm:px-8 py-6">
          <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
                <NotebookPen className="size-3.5 text-primary" />
                <span>Engineering Notebook</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Problem Journal
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
                A quiet log of runtime surprises, diagnosed causes, and durable lessons discovered while building your projects.
              </p>
            </div>

            <Link
              href="/projects/terminal-ledger/"
              className="auth-secondary-btn text-xs py-2 px-3.5 inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <FolderKanban className="size-3.5" />
              <span>Back to Terminal Ledger</span>
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-[1000px] w-full mx-auto px-4 sm:px-8 py-8">
          {entries.length === 0 ? (
            /* Restrained Empty State: Directs learner back to building */
            <div className="p-8 sm:p-12 rounded-2xl border border-dashed border-border bg-card/40 text-center max-w-xl mx-auto space-y-4 my-8">
              <div className="size-12 rounded-full bg-muted/60 text-muted-foreground flex items-center justify-center mx-auto">
                <NotebookPen className="size-5" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-foreground">
                  No Journal Entries Yet
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The Problem Journal is for recording genuine discrepancies when code behaves unexpectedly. As you build Terminal Ledger phases, record your surprises here.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/projects/terminal-ledger/"
                  className="auth-primary-btn py-2 px-4 text-xs inline-flex items-center gap-1.5"
                >
                  <span>Continue Building Terminal Ledger</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            /* Chronological / Index View of Entries */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/60 pb-3">
                <span>{entries.length} {entries.length === 1 ? "entry" : "entries"} recorded</span>
                <span className="font-mono text-[11px]">Ordered by latest activity</span>
              </div>

              <div className="divide-y divide-border/60 rounded-xl border border-border bg-card overflow-hidden">
                {entries.map((entry) => {
                  const phaseObj = getPhaseBySlug(entry.phase);
                  const phaseLabel = phaseObj
                    ? `Phase ${phaseObj.number}: ${phaseObj.title}`
                    : entry.phase;

                  return (
                    <div
                      key={entry.id}
                      onClick={() => handleOpenEntry(entry)}
                      className="p-4 sm:p-5 hover:bg-muted/40 transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-2 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded ${
                              entry.status === "completed"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                            }`}
                          >
                            {entry.status === "completed" ? "Resolved" : "Investigating (Draft)"}
                          </span>
                          <span className="text-xs font-mono text-muted-foreground">
                            {phaseLabel}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {entry.expectation.trim() || "Untitled discrepancy"}
                          </div>
                          {entry.observation && (
                            <p className="text-xs text-muted-foreground font-mono line-clamp-2 bg-muted/30 p-2 rounded border border-border/40">
                              {entry.observation}
                            </p>
                          )}
                        </div>

                        {entry.lesson && (
                          <p className="text-[11px] text-muted-foreground italic line-clamp-1">
                            Lesson: {entry.lesson}
                          </p>
                        )}
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 text-xs text-muted-foreground border-t sm:border-t-0 border-border/40 pt-2 sm:pt-0">
                        <div className="flex items-center gap-1 text-[11px] font-mono">
                          <Calendar className="size-3" />
                          <span>{formatDate(entry.updatedAt)}</span>
                        </div>
                        <span className="text-[11px] text-primary font-medium flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                          <span>{entry.status === "completed" ? "Review" : "Continue draft"}</span>
                          <ChevronRight className="size-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>

        {/* Problem Journal Drawer for viewing / editing / continuing drafts */}
        {selectedEntry && (
          <ProblemJournalDrawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            projectSlug={selectedEntry.project}
            phaseSlug={selectedEntry.phase}
            phaseTitle={selectedPhase?.title || selectedEntry.phase}
            phaseNumber={selectedPhase?.number || 1}
            initialEntryId={selectedEntry.id}
          />
        )}
      </div>
    </AuthShell>
  );
}
