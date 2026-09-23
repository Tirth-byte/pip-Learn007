"use client";

import React from "react";
import Link from "next/link";
import { AuthShell } from "@/components/shell/auth-shell";
import { useManualProgress } from "@/learning-state/manual-progress";
import { useTerminalLedgerProgress } from "@/learning-state/terminal-ledger-progress";
import { STARTING_MANUAL_SECTIONS } from "@/lib/docs/manual-structure";
import { TERMINAL_LEDGER_PROJECT, TERMINAL_LEDGER_PHASES } from "@/lib/projects/terminal-ledger/structure";
import { ArrowRight, CheckCircle2, Circle, Clock, Terminal, Users } from "lucide-react";

export default function HomePage() {
  const {
    completedCount: manualCompletedCount,
    totalCount: manualTotalCount,
    isComplete: isManualComplete,
    resumeSection,
    isSectionCompleted: isManualSectionCompleted,
  } = useManualProgress();

  const {
    isStarted: isProjectStarted,
    isCompleted: isProjectCompleted,
    isReadyForRetrospective,
    currentPhase,
    completedPhasesCount,
    totalPhasesCount,
    isPhaseCompleted,
    activeBlocker,
    startProject,
  } = useTerminalLedgerProgress();

  const manualProgressPercentage = Math.round(
    (manualCompletedCount / manualTotalCount) * 100
  );
  const isBrandNewManual = manualCompletedCount === 0;

  return (
    <AuthShell activeItem="home">
      <main className="flex-1 overflow-y-auto">
        <div className="auth-home-container">
          {/* Header */}
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80 font-medium">
              Python Masterclass · {isProjectStarted ? "Active Workspace" : "Foundations"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              {isProjectStarted ? "Terminal Ledger" : "Starting Manual"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">
              {isProjectStarted
                ? "Your active local software project. Write code in your own editor and terminal."
                : "Build your mental models through concise terminal experiments before advancing to real software projects."}
            </p>
          </div>

          {/* ONE Dominant Action Card */}
          <div className="auth-card-dominant mb-10 shadow-xs">
            {isProjectStarted ? (
              /* State 3: Project Started -> Terminal Ledger Phase Continuation Dominates */
              <div>
                {activeBlocker?.type === "CHECKPOINT_REQUIRED" ? (
                  /* Checkpoint Due State: progression paused pending human review */
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
                      <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                      <span>Mentor Checkpoint {activeBlocker.checkpointNumber} Due</span>
                    </div>

                    <div className="text-xs font-mono text-muted-foreground mb-1">
                      Terminal Ledger · Progression Paused
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                      Phase {activeBlocker.phaseNumber} Defense Required
                    </h2>

                    <p className="text-sm text-muted-foreground/90 mt-2 mb-4 leading-relaxed max-w-2xl">
                      Phase {activeBlocker.phaseNumber} is verified and complete. Review your evidence and schedule a conversation with a mentor (Tirth, Darsh, or Raj) before continuing.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        <span>~25–30 min conversational review</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Terminal className="size-3.5" />
                        <span>Evidence & architecture review</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/mentors/checkpoints/tl-cp-${activeBlocker.checkpointNumber}/`}
                        className="auth-primary-btn"
                      >
                        <span>Prepare Checkpoint {activeBlocker.checkpointNumber}</span>
                        <ArrowRight className="size-4" />
                      </Link>

                      <Link
                        href={`/projects/terminal-ledger/phases/phase-0${activeBlocker.phaseNumber}/`}
                        className="auth-secondary-btn"
                      >
                        <span>View Phase {activeBlocker.phaseNumber} Workspace</span>
                      </Link>
                    </div>
                  </div>
                ) : isProjectCompleted ? (
                  /* State 4: Terminal Ledger Complete */
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                      <CheckCircle2 className="size-4" />
                      <span>Terminal Ledger Complete</span>
                    </div>

                    <div className="text-xs font-mono text-muted-foreground mb-1">
                      Python Project 1 · Finished
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                      10 Project Capabilities Practiced
                    </h2>

                    <p className="text-sm text-muted-foreground/90 mt-2 mb-4 leading-relaxed max-w-2xl">
                      You built, persisted, validated, and completed the Terminal Ledger project across all 9 phases and 3 mentor checkpoints. Your project retrospective is saved locally.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>9/9 Phases Completed</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>3/3 Checkpoints Cleared</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Terminal className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Retrospective Saved Locally</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href="/projects/terminal-ledger/review/"
                        className="auth-primary-btn"
                      >
                        <span>Review Project Retrospective</span>
                        <ArrowRight className="size-4" />
                      </Link>

                      <Link
                        href="/journal/"
                        className="auth-secondary-btn"
                      >
                        <span>Review Journal</span>
                      </Link>

                      <Link
                        href="/manual/01-what-programming-actually-is/"
                        className="auth-secondary-btn"
                      >
                        <span>Revisit Documentation</span>
                      </Link>
                    </div>
                  </div>
                ) : isReadyForRetrospective ? (
                  /* State 5: All phases & checkpoints done -> Retrospective Due */
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      <span className="size-2 rounded-full bg-primary animate-pulse" />
                      <span>Project Conclusion · Retrospective Due</span>
                    </div>

                    <div className="text-xs font-mono text-muted-foreground mb-1">
                      Terminal Ledger · Ready for Final Reflection
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                      Final Project Retrospective
                    </h2>

                    <p className="text-sm text-muted-foreground/90 mt-2 mb-4 leading-relaxed max-w-2xl">
                      All 9 phases and 3 mentor checkpoints are complete. Complete your project retrospective to record what you built, what failed, and what you learned before closing the project.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href="/projects/terminal-ledger/review/"
                        className="auth-primary-btn"
                      >
                        <span>Complete Project Retrospective</span>
                        <ArrowRight className="size-4" />
                      </Link>

                      <Link
                        href="/projects/terminal-ledger/"
                        className="auth-secondary-btn"
                      >
                        <span>Project Overview</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Normal Phase Continuation State */
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      <span className="size-2 rounded-full bg-primary animate-pulse" />
                      <span>
                        Active Project · Phase {currentPhase.number} of {totalPhasesCount}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-muted-foreground mb-1">
                      Terminal Ledger · {TERMINAL_LEDGER_PROJECT.language}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                      {currentPhase.title}
                    </h2>

                    <p className="text-sm text-muted-foreground/90 mt-2 mb-4 leading-relaxed max-w-2xl">
                      {currentPhase.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        <span>{currentPhase.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Terminal className="size-3.5" />
                        <span>Local terminal execution</span>
                      </div>
                      {currentPhase.standalonePacks.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground/60">·</span>
                          <span>{currentPhase.standalonePacks.length} Knowledge Packs unlocked</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/projects/terminal-ledger/phases/${currentPhase.slug}/`}
                        className="auth-primary-btn"
                      >
                        <span>Continue Building Phase {currentPhase.number}</span>
                        <ArrowRight className="size-4" />
                      </Link>

                      <Link
                        href="/projects/terminal-ledger/"
                        className="auth-secondary-btn"
                      >
                        <span>Project Overview</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : !isManualComplete ? (
              /* State 1: Manual in Progress -> Next Section Dominates */
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  <span className="size-2 rounded-full bg-primary animate-pulse" />
                  <span>{isBrandNewManual ? "Start Here" : "Continue Learning"}</span>
                </div>

                <div className="text-xs font-mono text-muted-foreground mb-1">
                  Section {resumeSection.id} of {manualTotalCount}
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
                      {isBrandNewManual
                        ? `Begin Section ${resumeSection.id}`
                        : `Continue Section ${resumeSection.id}`}
                    </span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            ) : (
              /* State 2: Manual Complete, Project Not Started -> Start Terminal Ledger Dominates */
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
                    href="/projects/terminal-ledger/"
                    onClick={() => startProject()}
                    className="auth-primary-btn"
                  >
                    <span>Start Project: Terminal Ledger</span>
                    <ArrowRight className="size-4" />
                  </Link>

                  <Link
                    href="/manual/01-what-programming-actually-is/"
                    className="auth-secondary-btn"
                  >
                    <span>Review Starting Manual</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Quiet Progress Bar & Roadmap */}
          {isProjectStarted ? (
            /* Quiet Terminal Ledger Roadmap */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground tracking-tight uppercase tracking-wider text-[11px]">
                  Terminal Ledger Roadmap
                </span>
                <span className="font-mono text-muted-foreground">
                  {completedPhasesCount} of {totalPhasesCount} Phases Complete
                </span>
              </div>

              {/* Restrained progress line */}
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                  style={{
                    width: `${Math.max(
                      (completedPhasesCount / totalPhasesCount) * 100,
                      isProjectStarted ? 11 : 0
                    )}%`,
                  }}
                />
              </div>

              {/* Quiet Phase List */}
              <div className="pt-2 divide-y divide-border/60 rounded-lg border border-border/70 bg-card/50 overflow-hidden">
                {TERMINAL_LEDGER_PHASES.map((p) => {
                  const isDone = isPhaseCompleted(p.slug);
                  const isCur = currentPhase.slug === p.slug;

                  return (
                    <Link
                      key={p.slug}
                      href={`/projects/terminal-ledger/phases/${p.slug}/`}
                      className={`flex items-center justify-between p-3.5 text-xs transition-colors hover:bg-muted/40 ${
                        isCur ? "bg-muted/30 font-medium text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isDone ? (
                          <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : isCur ? (
                          <div className="size-4 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
                            <div className="size-1.5 rounded-full bg-primary" />
                          </div>
                        ) : (
                          <Circle className="size-4 text-muted-foreground/40 shrink-0" />
                        )}
                        <span className={isDone ? "text-foreground font-medium" : isCur ? "text-primary font-medium" : ""}>
                          Phase {p.number}: {p.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
                        {p.isCheckpointFollowed && (
                          <span
                            className={
                              activeBlocker?.checkpointNumber === p.checkpointNumber
                                ? "text-amber-600 dark:text-amber-400 font-semibold"
                                : "text-primary/90 font-medium"
                            }
                          >
                            Checkpoint {p.checkpointNumber}
                            {activeBlocker?.checkpointNumber === p.checkpointNumber ? " Due" : ""}
                          </span>
                        )}
                        <span>{p.estimatedTime}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Secondary link back to Starting Manual */}
              <div className="pt-4 text-xs text-muted-foreground flex items-center justify-between border-t border-border/60">
                <span>Foundational Starting Manual (11/11 complete)</span>
                <Link
                  href="/manual/01-what-programming-actually-is/"
                  className="text-primary hover:underline"
                >
                  Review Manual
                </Link>
              </div>
            </div>
          ) : (
            /* Starting Manual Curriculum List */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground tracking-tight uppercase tracking-wider text-[11px]">
                  Manual Curriculum
                </span>
                <span className="font-mono text-muted-foreground">
                  {manualCompletedCount} of {manualTotalCount} Completed ({manualProgressPercentage}%)
                </span>
              </div>

              {/* Restrained progress line */}
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${manualProgressPercentage}%` }}
                />
              </div>

              {/* Quiet section list */}
              <div className="pt-2 divide-y divide-border/60 rounded-lg border border-border/70 bg-card/50 overflow-hidden">
                {STARTING_MANUAL_SECTIONS.map((section) => {
                  const isDone = isManualSectionCompleted(section.slug);
                  const isCurrent = resumeSection.slug === section.slug && !isManualComplete;

                  return (
                    <Link
                      key={section.slug}
                      href={`/manual/${section.slug}/`}
                      className={`flex items-center justify-between p-3.5 text-xs transition-colors hover:bg-muted/40 ${
                        isCurrent
                          ? "bg-muted/30 font-medium text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isDone ? (
                          <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : isCurrent ? (
                          <div className="size-4 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
                            <div className="size-1.5 rounded-full bg-primary" />
                          </div>
                        ) : (
                          <Circle className="size-4 text-muted-foreground/40 shrink-0" />
                        )}
                        <span className={isDone ? "text-foreground font-medium" : isCurrent ? "text-primary font-medium" : ""}>
                          {section.id} — {section.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                        {section.time && <span>{section.time}</span>}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </AuthShell>
  );
}
