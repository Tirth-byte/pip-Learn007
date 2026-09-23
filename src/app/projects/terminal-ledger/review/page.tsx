"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthShell } from "@/components/shell/auth-shell";
import { useTerminalLedgerProgress } from "@/learning-state/terminal-ledger-progress";
import {
  ProjectRetrospectiveResponses,
  useProjectRetrospective,
} from "@/learning-state/project-retrospective";
import { useProblemJournal } from "@/learning-state/problem-journal";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers,
  NotebookPen,
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

  const journalEntries = useProblemJournal();

  const terminalLedgerJournalEntries = journalEntries.filter(
    (e) => e.project === "terminal-ledger"
  );

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
    <AuthShell activeItem="projects">
      <main className="flex-1 overflow-y-auto">
        <div className="auth-home-container max-w-4xl">
          {/* Back Nav */}
          <div className="mb-6">
            <Link
              href="/projects/terminal-ledger/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Terminal Ledger Overview</span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                Project Conclusion
              </span>
              <span className="text-muted-foreground/60 text-xs">·</span>
              <span className="text-xs text-muted-foreground">Terminal Ledger</span>

              {isProjectCompleted && isRetrospectiveCompleted && (
                <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 font-mono">
                  <CheckCircle2 className="size-3.5" />
                  <span>Terminal Ledger Complete</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Terminal Ledger Retrospective
            </h1>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">
              Closing a 13–18 hour software build is an exercise in reflection, not celebration. Articulate what you built, what failed, and what you can now reason about.
            </p>
          </div>

          {/* Completion Milestone Status Card */}
          <div className="p-6 rounded-xl border border-border bg-card shadow-xs mb-10">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-border/70 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                  Project Requirements Checklist
                </span>
                <p className="text-muted-foreground">
                  Completion requires all 9 phases verified, all 3 mentor checkpoints cleared, and this retrospective.
                </p>
              </div>

              <div className="flex items-center gap-4 font-mono text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className={allPhasesDone ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}>
                    {allPhasesDone ? "✓" : "○"} 9/9 Phases
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={allCheckpointsDone ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}>
                    {allCheckpointsDone ? "✓" : "○"} 3/3 Checkpoints
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={isRetrospectiveCompleted ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}>
                    {isRetrospectiveCompleted ? "✓" : "○"} Retrospective
                  </span>
                </div>
              </div>
            </div>

            {/* Prerequisites Alert if not yet met */}
            {!canComplete && (
              <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                <ShieldAlert className="size-4 shrink-0 mt-0.5" />
                <div>
                  <strong>Prerequisites incomplete:</strong> You currently have {completedPhasesCount} of 9 phases completed and {progress.clearedCheckpoints.length} of 3 mentor checkpoints cleared. You may draft your thoughts below, but project completion will only unlock when all phases and checkpoints are cleared.
                </div>
              </div>
            )}
          </div>

          {/* Pillar 1: Capability Synthesis */}
          <section className="mb-10 p-6 rounded-xl border border-border bg-card shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <Terminal className="size-4 text-primary" />
              <span>Pillar 1: Observable Capabilities Built</span>
            </div>
            <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
              You built 10 distinct, integrated capabilities on your local machine from scratch without a framework:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              {CAPABILITY_SYNTHESIS.map((cap) => (
                <div
                  key={cap.id}
                  className="p-3 rounded-lg border border-border bg-background flex items-start gap-2.5"
                >
                  <span className="size-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                    {cap.id}
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">{cap.label}</div>
                    <div className="text-muted-foreground mt-0.5 leading-relaxed">{cap.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pillar 2: Technical Knowledge Inventory */}
          <section className="mb-10 p-6 rounded-xl border border-border bg-card shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <Layers className="size-4 text-primary" />
              <span>Pillar 2: Technical Knowledge Inventory</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Comparison between your starting mental models and the engineering primitives applied under real project pressure:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-lg bg-muted/40 border border-border/80 space-y-2">
                <div className="font-semibold uppercase tracking-wider text-[11px] text-muted-foreground">
                  Starting Foundation (Manual)
                </div>
                <ul className="space-y-1.5 text-muted-foreground">
                  <li>• Basic variable assignment and primitive types</li>
                  <li>• Terminal print and standard input</li>
                  <li>• Branching conditions (if / elif / else)</li>
                  <li>• Basic loops and collections (lists, dictionaries)</li>
                  <li>• Function definition and single module imports</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
                <div className="font-semibold uppercase tracking-wider text-[11px] text-primary">
                  Mastered Under Pressure (Terminal Ledger)
                </div>
                <ul className="space-y-1.5 text-foreground/90">
                  <li>• Load/save persistence lifecycle with JSON synchronization</li>
                  <li>• Defensive input validation loops without exception leaks</li>
                  <li>• ISO 8601 date parsing, comparison, and monthly filtering</li>
                  <li>• Mathematical threshold tracking and aggregation algorithms</li>
                  <li>• CSV format isolation and multi-responsibility refactoring</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pillar 3: Problem Journal Retrospective */}
          <section className="mb-10 p-6 rounded-xl border border-border bg-card shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                <NotebookPen className="size-4 text-primary" />
                <span>Pillar 3: Problem Journal Debugging Arc</span>
              </div>
              <Link
                href="/journal/"
                className="text-[11px] text-primary hover:underline"
              >
                Browse Full Journal
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              You recorded {terminalLedgerJournalEntries.length} failure patterns and debugging investigations during the build. Debugging systematically using the 7-Step Protocol is the hallmark of real engineering.
            </p>

            {terminalLedgerJournalEntries.length === 0 ? (
              <div className="p-4 rounded-lg bg-muted/40 border border-border/80 text-xs text-muted-foreground">
                No Problem Journal entries recorded for Terminal Ledger. If you documented debugging observations on paper or in local notes, use them to inform your reflections below.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {terminalLedgerJournalEntries.slice(0, 5).map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3 rounded-lg border border-border bg-background text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="font-semibold text-primary">{entry.phase}</span>
                      <span className="text-muted-foreground text-[10px]">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-muted-foreground line-clamp-1">
                      <strong>Observed:</strong> {entry.observation}
                    </div>
                    {entry.lesson && (
                      <div className="text-foreground/90 line-clamp-1">
                        <strong>Lesson:</strong> {entry.lesson}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Pillar 4: Honest Self-Assessment (Forms & Reflection) */}
          <section className="mb-12 p-6 rounded-xl border-2 border-border bg-card shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
                Pillar 4: Honest Learner Synthesis & Self-Assessment
              </div>
              {draftSaved && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  Draft saved locally!
                </span>
              )}
            </div>

            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              Answer honestly. There are no right answers or rubric scores. These reflections serve as your personal engineering closing notes.
            </p>

            {submitError && (
              <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs mb-6">
                {submitError}
              </div>
            )}

            {isRetrospectiveCompleted ? (
              /* Completed View: Read-Only */
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs">
                  <div className="flex items-center justify-between font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    <span>Retrospective Submitted & Project Completed</span>
                    <span className="font-mono text-[11px]">
                      {retrospective.completedAt
                        ? new Date(retrospective.completedAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Your Terminal Ledger build is complete. Your reflection is saved locally below.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-lg border border-border bg-background space-y-1">
                    <span className="font-semibold text-foreground">What became easier by the end?</span>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{formData.easierByEnd}</p>
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-background space-y-1">
                    <span className="font-semibold text-foreground">Which bug or misunderstanding taught you the most?</span>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{formData.instructiveBug}</p>
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-background space-y-1">
                    <span className="font-semibold text-foreground">Which debugging habit will you keep?</span>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{formData.debuggingHabit}</p>
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-background space-y-1">
                    <span className="font-semibold text-foreground">What would you structure differently if starting again?</span>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{formData.structuralChange}</p>
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-background space-y-1">
                    <span className="font-semibold text-foreground">What can you now build or reason about that you could not before?</span>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{formData.newCapabilities}</p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-border/70">
                  <Link href="/home/" className="auth-primary-btn text-xs py-2 px-4">
                    <span>Return to Home</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <Link href="/projects/" className="auth-secondary-btn text-xs py-2 px-4">
                    <span>Projects Overview</span>
                  </Link>
                  <Link href="/journal/" className="auth-secondary-btn text-xs py-2 px-4">
                    <span>Problem Journal</span>
                  </Link>
                </div>
              </div>
            ) : (
              /* Editable Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="easier-by-end"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    1. What became noticeably easier by the end of the project? <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="easier-by-end"
                    value={formData.easierByEnd}
                    onChange={(e) => handleChange("easierByEnd", e.target.value)}
                    required
                    placeholder="e.g. Navigating data structures, writing defensive input checks without second-guessing..."
                    rows={3}
                    className="w-full text-xs p-3 rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring font-sans"
                  />
                </div>

                <div>
                  <label
                    htmlFor="instructive-bug"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    2. Which bug or misunderstanding taught you the most? <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="instructive-bug"
                    value={formData.instructiveBug}
                    onChange={(e) => handleChange("instructiveBug", e.target.value)}
                    required
                    placeholder="e.g. The first-run JSON file trap: discovering that an empty file causes JSONDecodeError instead of evaluating to empty dictionary..."
                    rows={3}
                    className="w-full text-xs p-3 rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring font-sans"
                  />
                </div>

                <div>
                  <label
                    htmlFor="debugging-habit"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    3. Which debugging habit from the 7-Step Protocol will you keep? <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="debugging-habit"
                    value={formData.debuggingHabit}
                    onChange={(e) => handleChange("debuggingHabit", e.target.value)}
                    required
                    placeholder="e.g. Printing runtime types and values right before the failing line instead of guessing..."
                    rows={3}
                    className="w-full text-xs p-3 rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring font-sans"
                  />
                </div>

                <div>
                  <label
                    htmlFor="structural-change"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    4. What architectural or organizational decision would you structure differently if starting again? <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="structural-change"
                    value={formData.structuralChange}
                    onChange={(e) => handleChange("structuralChange", e.target.value)}
                    required
                    placeholder="e.g. Isolating record formatting functions earlier so reports didn't need to manipulate raw dictionary keys..."
                    rows={3}
                    className="w-full text-xs p-3 rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring font-sans"
                  />
                </div>

                <div>
                  <label
                    htmlFor="new-capabilities"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    5. What can you now build or explain fluently that you could not before? <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="new-capabilities"
                    value={formData.newCapabilities}
                    onChange={(e) => handleChange("newCapabilities", e.target.value)}
                    required
                    placeholder="e.g. I can now build a command-line application that persists state across reboots, validates untrusted input, and exports reports..."
                    rows={3}
                    className="w-full text-xs p-3 rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring font-sans"
                  />
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-border/70">
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
