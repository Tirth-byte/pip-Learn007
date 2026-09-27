"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthShell } from "@/components/shell/auth-shell";
import { useTerminalLedgerProgress } from "@/learning-state/terminal-ledger-progress";
import {
  ProjectRetrospectiveResponses,
  useProjectRetrospective,
} from "@/learning-state/project-retrospective";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers,
  Save,
  ShieldAlert,
  Terminal,
} from "lucide-react";

const CAPABILITY_SYNTHESIS = [
  { id: 1, label: "Record entries", desc: "Structured records capturing direction, amount, and metadata." },
  { id: 2, label: "Readable running display", desc: "Tabular formatted console output with clear alignment." },
  { id: 3, label: "JSON persistence", desc: "First-run grace, load-on-start, and state synchronization across process restarts." },
  { id: 4, label: "Defensive input validation", desc: "Interactive re-prompting; zero raw tracebacks reach the learner." },
  { id: 5, label: "Category normalization", desc: "Sanitized casing and consistent categorical grouping without splitting." },
  { id: 6, label: "Filtered views & subtotals", desc: "Single-category filtering with mathematically verified subtotal calculation." },
  { id: 7, label: "ISO date querying", desc: "Date parsing, chronological comparison, and multi-year month selection." },
  { id: 8, label: "Limit thresholds & state", desc: "Budget limits, utilization tracking, and warning indicators." },
  { id: 9, label: "Summary report breakdown", desc: "Monthly totals, net flow, and sorted category breakdown matching hand calculation." },
  { id: 10, label: "Spreadsheet CSV export", desc: "Escaped CSV generation cleanly isolated from internal JSON representation." },
];

export default function TerminalLedgerReviewPage() {
  const {
    progress,
    isCompleted: isProjectCompleted,
    completedPhasesCount,
    isCheckpointCleared,
  } = useTerminalLedgerProgress();

  const {
    retrospective,
    isCompleted: isRetrospectiveCompleted,
    responses,
    saveDraft,
    completeRetrospective,
  } = useProjectRetrospective();

  // Form states
  const [formData, setFormData] = useState<ProjectRetrospectiveResponses>({
    easierByEnd: responses.easierByEnd || "",
    instructiveBug: responses.instructiveBug || "",
    debuggingHabit: responses.debuggingHabit || "",
    structuralChange: responses.structuralChange || "",
    newCapabilities: responses.newCapabilities || "",
  });

  const [draftSaved, setDraftSaved] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const allPhasesDone = completedPhasesCount >= 9;
  const allCheckpointsDone =
    isCheckpointCleared(1) && isCheckpointCleared(2) && isCheckpointCleared(3);
  const canComplete = allPhasesDone && allCheckpointsDone;

  const handleChange = (field: keyof ProjectRetrospectiveResponses, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    saveDraft(formData);
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!canComplete) {
      setSubmitError(
        "You must complete all 9 phases and clear all 3 mentor checkpoints before submitting your project retrospective."
      );
      return;
    }

    try {
      completeRetrospective(formData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError("Failed to complete retrospective.");
      }
    }
  };

  return (
    <AuthShell activeItem="projects" environment="checkpoint">
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-14 w-full auth-animate-in">

          {/* Back Nav */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <Link
              href="/projects/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>Terminal Ledger Overview</span>
            </Link>
          </nav>

          {/* Header */}
          <section className="mb-14 pb-8 border-b border-foreground/10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="auth-eyebrow text-violet-600 dark:text-violet-400">
                Project Conclusion · Terminal Ledger
              </span>

              {isProjectCompleted && isRetrospectiveCompleted && (
                <span className="sm:ml-auto inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3.5" />
                  <span>Project Retrospective Complete</span>
                </span>
              )}
            </div>

            <h1 className="auth-hero-headline text-foreground mb-4">
              Terminal Ledger Retrospective
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground/90 max-w-2xl leading-relaxed">
              Closing a 13–18 hour software build is an exercise in reflection, not celebration. Articulate what you built, what failed, and what engineering concepts you can now reason about.
            </p>
          </section>

          {/* Completion Requirements Status Bar */}
          <div className="p-6 rounded-20 border border-foreground/10 bg-foreground/[0.02] mb-10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                Requirements:
              </span>
              <span className="text-muted-foreground">All milestones must be verified before final submission.</span>
            </div>

            <div className="flex items-center gap-5">
              <span className={allPhasesDone ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-muted-foreground"}>
                {allPhasesDone ? "✓" : "○"} 9/9 Phases
              </span>
              <span className={allCheckpointsDone ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-muted-foreground"}>
                {allCheckpointsDone ? "✓" : "○"} 3/3 Checkpoints
              </span>
              <span className={isRetrospectiveCompleted ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-muted-foreground"}>
                {isRetrospectiveCompleted ? "✓" : "○"} Retrospective
              </span>
            </div>
          </div>

          {!canComplete && (
            <div className="p-5 rounded-16 bg-amber-500/10 border border-amber-500/25 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3 mb-10">
              <ShieldAlert className="size-4 shrink-0 mt-0.5" />
              <div>
                <strong>Prerequisites incomplete:</strong> You have {completedPhasesCount} of 9 phases completed and {progress.clearedCheckpoints.length} of 3 mentor checkpoints cleared. You may draft your thoughts below, but project completion will unlock once all milestones are met.
              </div>
            </div>
          )}

          {/* Composed Surface: Observable Capabilities Built */}
          <section className="auth-surface-composed p-8 sm:p-12 mb-10">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <Terminal className="size-4 text-violet-500" />
              <span>10 Observable Capabilities Built From First Principles</span>
            </div>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              Every capability was implemented directly in Python standard library without external dependencies:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {CAPABILITY_SYNTHESIS.map((cap) => (
                <div
                  key={cap.id}
                  className="p-4 rounded-14 border border-foreground/10 bg-foreground/[0.015] flex items-start gap-3"
                >
                  <span className="size-5 rounded-full bg-foreground/5 text-foreground flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                    {cap.id}
                  </span>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{cap.label}</div>
                    <div className="text-muted-foreground mt-0.5 leading-relaxed">{cap.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Composed Surface: Technical Knowledge Inventory */}
          <section className="auth-surface-composed p-8 sm:p-12 mb-10">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <Layers className="size-4 text-violet-500" />
              <span>Technical Knowledge Expansion</span>
            </div>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              Evolution of your mental models from introductory syntax to resilient system primitives:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-6 rounded-16 bg-foreground/[0.02] border border-foreground/10 space-y-3">
                <div className="font-semibold uppercase tracking-wider text-xs text-muted-foreground font-mono">
                  Starting Foundation (Manual)
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Basic variable assignment and primitive types</li>
                  <li>• Terminal print and standard input</li>
                  <li>• Branching conditions (if / elif / else)</li>
                  <li>• Basic loops and collections (lists, dictionaries)</li>
                  <li>• Function definition and single module imports</li>
                </ul>
              </div>

              <div className="p-6 rounded-16 bg-violet-500/[0.04] border border-violet-500/20 space-y-3">
                <div className="font-semibold uppercase tracking-wider text-xs text-violet-600 dark:text-violet-400 font-mono">
                  Mastered Under Pressure (Terminal Ledger)
                </div>
                <ul className="space-y-2 text-foreground/90">
                  <li>• Load/save persistence lifecycle with JSON synchronization</li>
                  <li>• Defensive input validation loops without exception leaks</li>
                  <li>• ISO 8601 date parsing, comparison, and monthly filtering</li>
                  <li>• Mathematical threshold tracking and aggregation algorithms</li>
                  <li>• CSV format isolation and multi-responsibility refactoring</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Composed Surface: Honest Learner Synthesis & Self-Assessment */}
          <section className="auth-surface-composed p-8 sm:p-12 mb-20 border-2 border-foreground/15">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
                Honest Learner Synthesis & Self-Assessment
              </div>
              {draftSaved && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                  Draft saved locally!
                </span>
              )}
            </div>

            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              Answer honestly. These reflections serve as your personal engineering closing notes.
            </p>

            {submitError && (
              <div className="p-3.5 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs mb-6">
                {submitError}
              </div>
            )}

            {isRetrospectiveCompleted ? (
              <div className="space-y-6">
                <div className="p-5 rounded-16 bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm">
                  <div className="flex items-center justify-between font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    <span>Retrospective Submitted & Project Completed</span>
                    <span className="font-mono text-xs">
                      {retrospective.completedAt
                        ? new Date(retrospective.completedAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mt-1">
                    Your Terminal Ledger build is complete. Your reflections are saved locally.
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-5 rounded-16 border border-foreground/10 bg-foreground/[0.015] space-y-1.5">
                    <span className="font-semibold text-foreground">What became noticeably easier by the end?</span>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{formData.easierByEnd}</p>
                  </div>

                  <div className="p-5 rounded-16 border border-foreground/10 bg-foreground/[0.015] space-y-1.5">
                    <span className="font-semibold text-foreground">Which bug or misunderstanding taught you the most?</span>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{formData.instructiveBug}</p>
                  </div>

                  <div className="p-5 rounded-16 border border-foreground/10 bg-foreground/[0.015] space-y-1.5">
                    <span className="font-semibold text-foreground">Which debugging habit will you keep?</span>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{formData.debuggingHabit}</p>
                  </div>

                  <div className="p-5 rounded-16 border border-foreground/10 bg-foreground/[0.015] space-y-1.5">
                    <span className="font-semibold text-foreground">What would you structure differently if starting again?</span>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{formData.structuralChange}</p>
                  </div>

                  <div className="p-5 rounded-16 border border-foreground/10 bg-foreground/[0.015] space-y-1.5">
                    <span className="font-semibold text-foreground">What can you now build or reason about that you could not before?</span>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{formData.newCapabilities}</p>
                  </div>
                </div>

                <div className="pt-6 flex flex-wrap items-center gap-4 border-t border-foreground/10">
                  <Link href="/home/" className="auth-primary-btn">
                    <span>Return to Home</span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link href="/projects/" className="auth-secondary-btn">
                    <span>Projects Overview</span>
                  </Link>
                  <Link href="/journal/" className="auth-secondary-btn">
                    <span>Problem Journal</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="easier-by-end" className="block text-xs font-semibold text-foreground mb-2">
                    1. What became noticeably easier by the end of the project? <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="easier-by-end"
                    value={formData.easierByEnd}
                    onChange={(e) => handleChange("easierByEnd", e.target.value)}
                    required
                    placeholder="e.g. Navigating data structures, writing defensive input checks without second-guessing..."
                    rows={3}
                    className="w-full text-xs sm:text-sm p-3.5 rounded-12 border border-foreground/15 bg-background text-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="instructive-bug" className="block text-xs font-semibold text-foreground mb-2">
                    2. Which bug or misunderstanding taught you the most? <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="instructive-bug"
                    value={formData.instructiveBug}
                    onChange={(e) => handleChange("instructiveBug", e.target.value)}
                    required
                    placeholder="e.g. The first-run JSON file trap: discovering that an empty file causes JSONDecodeError instead of evaluating to empty dictionary..."
                    rows={3}
                    className="w-full text-xs sm:text-sm p-3.5 rounded-12 border border-foreground/15 bg-background text-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="debugging-habit" className="block text-xs font-semibold text-foreground mb-2">
                    3. Which debugging habit from the 7-Step Protocol will you keep? <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="debugging-habit"
                    value={formData.debuggingHabit}
                    onChange={(e) => handleChange("debuggingHabit", e.target.value)}
                    required
                    placeholder="e.g. Printing runtime types and values right before the failing line instead of guessing..."
                    rows={3}
                    className="w-full text-xs sm:text-sm p-3.5 rounded-12 border border-foreground/15 bg-background text-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="structural-change" className="block text-xs font-semibold text-foreground mb-2">
                    4. What architectural or organizational decision would you structure differently if starting again? <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="structural-change"
                    value={formData.structuralChange}
                    onChange={(e) => handleChange("structuralChange", e.target.value)}
                    required
                    placeholder="e.g. Isolating record formatting functions earlier so reports didn't need to manipulate raw dictionary keys..."
                    rows={3}
                    className="w-full text-xs sm:text-sm p-3.5 rounded-12 border border-foreground/15 bg-background text-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="new-capabilities" className="block text-xs font-semibold text-foreground mb-2">
                    5. What can you now build or explain fluently that you could not before? <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="new-capabilities"
                    value={formData.newCapabilities}
                    onChange={(e) => handleChange("newCapabilities", e.target.value)}
                    required
                    placeholder="e.g. I can now build a command-line application that persists state across reboots, validates untrusted input, and exports reports..."
                    rows={3}
                    className="w-full text-xs sm:text-sm p-3.5 rounded-12 border border-foreground/15 bg-background text-foreground"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-foreground/10">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="auth-secondary-btn text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <Save className="size-3.5" />
                    <span>Save Draft Reflection</span>
                  </button>

                  <button
                    type="submit"
                    disabled={!canComplete}
                    className={`auth-primary-btn text-xs py-2 px-5 ${
                      !canComplete ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span>Complete Terminal Ledger Project</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </form>
            )}
          </section>

        </div>
      </main>
    </AuthShell>
  );
}
