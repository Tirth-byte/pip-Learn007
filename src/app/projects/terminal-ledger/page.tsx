"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/shell/auth-shell";
import {
  TERMINAL_LEDGER_PROJECT,
  TERMINAL_LEDGER_PHASES,
} from "@/lib/projects/terminal-ledger/structure";
import { useTerminalLedgerProgress } from "@/learning-state/terminal-ledger-progress";
import { GlassArchitectureWorld } from "@/components/ui/glass-architecture-world";
import {
  ArrowRight,
  Clock,
  Terminal,
  CheckCircle2,
  ChevronRight,
  Users,
} from "lucide-react";
import "@/styles/authenticated.css";

export default function TerminalLedgerOverviewPage() {
  const router = useRouter();
  const {
    isStarted,
    isCompleted,
    isReadyForRetrospective,
    activeBlocker,
    currentPhase,
    isPhaseCompleted,
    startProject,
  } = useTerminalLedgerProgress();

  const handleStartOrResume = () => {
    if (isCompleted) {
      router.push("/projects/terminal-ledger/review/");
    } else if (activeBlocker?.type === "CHECKPOINT_REQUIRED") {
      router.push(`/mentors/checkpoints/tl-cp-${activeBlocker.checkpointNumber}/`);
    } else if (isReadyForRetrospective) {
      router.push("/projects/terminal-ledger/review/");
    } else if (!isStarted) {
      startProject();
      router.push("/projects/terminal-ledger/phases/phase-01/");
    } else {
      router.push(`/projects/terminal-ledger/phases/${currentPhase.slug}/`);
    }
  };

  const completedCount = TERMINAL_LEDGER_PHASES.filter((p) =>
    isPhaseCompleted(p.slug)
  ).length;

  return (
    <AuthShell activeItem="projects" environment="build">
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full auth-animate-in">

          {/* ============================================================== */}
          {/* 1. HERO / SPECIFICATION SCENE                                  */}
          {/* ============================================================== */}
          <section className="min-h-[75vh] flex flex-col justify-center py-12 lg:py-16">
            {/* Breadcrumb Navigation */}
            <nav
              className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-6"
              aria-label="Breadcrumb"
            >
              <Link href="/projects/" className="hover:text-foreground transition-colors">
                Projects
              </Link>
              <span className="text-foreground/20">/</span>
              <span className="text-foreground font-semibold">Terminal Ledger</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
              {/* Left Column: Editorial Spec Headline */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="auth-eyebrow text-muted-foreground mb-4">
                  <span className="size-2 rounded-full bg-foreground/60" />
                  <span>Project Specification · 9 Phases · 3 Defense Gates</span>
                </div>

                <h1 className="auth-hero-headline text-foreground mb-6">
                  {TERMINAL_LEDGER_PROJECT.title}
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground/90 font-light max-w-2xl leading-relaxed mb-8 text-balance">
                  {TERMINAL_LEDGER_PROJECT.purpose}
                </p>

                {/* Metadata Badges */}
                <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground font-mono mb-10">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-muted-foreground/70" />
                    <span>{TERMINAL_LEDGER_PROJECT.estimatedTime} Expected Effort</span>
                  </div>
                  <span className="text-foreground/20 hidden sm:inline">·</span>
                  <div className="flex items-center gap-1.5">
                    <Terminal className="size-3.5 text-muted-foreground/70" />
                    <span>Python 3 Standard Library</span>
                  </div>
                  <span className="text-foreground/20 hidden sm:inline">·</span>
                  <div className="flex items-center gap-1.5">
                    <Users className="size-3.5 text-muted-foreground/70" />
                    <span>3 Human Mentor Defenses</span>
                  </div>
                </div>

                {/* Dominant Primary Action */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleStartOrResume}
                    className="auth-btn-primary"
                  >
                    {isCompleted ? (
                      <>
                        <span>Review Project Retrospective</span>
                        <ArrowRight className="size-4" />
                      </>
                    ) : activeBlocker?.type === "CHECKPOINT_REQUIRED" ? (
                      <>
                        <span>Defend Checkpoint {activeBlocker.checkpointNumber}</span>
                        <ArrowRight className="size-4" />
                      </>
                    ) : isReadyForRetrospective ? (
                      <>
                        <span>Complete Final Retrospective</span>
                        <ArrowRight className="size-4" />
                      </>
                    ) : !isStarted ? (
                      <>
                        <span>Begin Phase 1: In-Memory Recording</span>
                        <ArrowRight className="size-4" />
                      </>
                    ) : (
                      <>
                        <span>Continue Phase {currentPhase.number}: {currentPhase.title}</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>

                  <Link
                    href="/journal/"
                    className="auth-btn-secondary"
                  >
                    <span>Problem Journal</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Substantial Dimensional Glass Architecture World */}
              <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center w-full">
                <GlassArchitectureWorld />
              </div>
            </div>
          </section>

          {/* Generous Whitespace Divider */}
          <div className="w-full my-8 sm:my-14" aria-hidden="true" />

          {/* ============================================================== */}
          {/* 2. GRAND COMPOSED SPECIFICATION ROADMAP SURFACE                */}
          {/* ============================================================== */}
          <section className="auth-surface-composed p-6 sm:p-10 lg:p-14 mb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-foreground/10 mb-8">
              <div>
                <div className="auth-eyebrow text-muted-foreground mb-2">
                  Engineering Roadmap
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  Sequential Progression & Defense Gates
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                  Progression is gated sequentially. Each phase builds directly on the verified codebase of the previous milestone.
                </p>
              </div>

              <div className="font-mono text-xs px-3 py-1.5 rounded-full bg-foreground/5 text-foreground border border-foreground/10 shrink-0">
                {completedCount} of 9 Phases Complete
              </div>
            </div>

            {/* List of 9 Phases with Intentional Checkpoint Interruptions */}
            <div className="space-y-3">
              {TERMINAL_LEDGER_PHASES.map((phase) => {
                const done = isPhaseCompleted(phase.slug);
                const isCurrent = currentPhase.slug === phase.slug && isStarted && !isCompleted;
                const hasCheckpoint = phase.isCheckpointFollowed && phase.checkpointNumber;

                return (
                  <React.Fragment key={phase.slug}>
                    <Link
                      href={`/projects/terminal-ledger/phases/${phase.slug}/`}
                      className={`group block p-4 sm:p-5 rounded-2xl transition-all ${
                        isCurrent
                          ? "bg-foreground/5 border border-foreground/15 shadow-xs"
                          : "hover:bg-foreground/[0.03] border border-transparent"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Left: Phase Status, Title, Description */}
                        <div className="flex items-start sm:items-center gap-4 min-w-0">
                          <div className="mt-0.5 sm:mt-0 shrink-0">
                            {done ? (
                              <CheckCircle2 className="size-5 text-emerald-500" />
                            ) : isCurrent ? (
                              <span className="size-2.5 rounded-full bg-foreground block ring-4 ring-foreground/20 animate-pulse" />
                            ) : (
                              <span className="size-2 rounded-full bg-foreground/20 block" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-mono text-xs font-semibold text-muted-foreground">
                                PHASE {phase.number < 10 ? `0${phase.number}` : phase.number}
                              </span>
                            </div>

                            <h3 className="font-medium text-base text-foreground group-hover:text-foreground transition-colors truncate">
                              {phase.title}
                            </h3>

                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1 max-w-2xl leading-relaxed">
                              {phase.summary}
                            </p>
                          </div>
                        </div>

                        {/* Right: Deliverables and action indicator */}
                        <div className="flex items-center gap-4 shrink-0 font-mono text-xs self-end sm:self-center pl-9 sm:pl-0">
                          <span className="text-muted-foreground/70 hidden sm:inline">
                            {phase.criteria.length} Criteria
                          </span>

                          {isCurrent ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground text-background text-xs font-medium">
                              <span>Continue</span>
                              <ArrowRight className="size-3" />
                            </span>
                          ) : (
                            <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-transform" />
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* Checkpoint Interruption Banner */}
                    {hasCheckpoint && (
                      <div className="my-3 p-4 sm:p-5 rounded-20 bg-amber-500/[0.07] border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                            <Users className="size-4" />
                          </div>
                          <div>
                            <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400">
                              Human Calibration Gate · Checkpoint {phase.checkpointNumber}
                            </div>
                            <div className="text-xs text-foreground/80 font-medium">
                              1-on-1 code walkthrough &amp; mental model defense with Tirth, Darsh, or Raj
                            </div>
                          </div>
                        </div>

                        <Link
                          href={`/mentors/checkpoints/tl-cp-${phase.checkpointNumber}/`}
                          className="self-start sm:self-center text-xs font-mono text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1 shrink-0"
                        >
                          <span>Review Calibration Rubric</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Stage Architecture Callout Footer */}
            <div className="mt-10 pt-8 border-t border-foreground/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
              <div className="p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5">
                <div className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-1">
                  Act I · In-Memory Core
                </div>
                <p className="text-muted-foreground font-sans leading-relaxed text-[12px]">
                  Phases 1–3 establish transaction data structures and console formatting before disk I/O. Defended at Checkpoint 1.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5">
                <div className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-1">
                  Act II · Storage & Commands
                </div>
                <p className="text-muted-foreground font-sans leading-relaxed text-[12px]">
                  Phases 4–6 build the interactive REPL and JSON disk persistence engine. Defended at Checkpoint 2.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5">
                <div className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-1">
                  Act III · Robustness & Release
                </div>
                <p className="text-muted-foreground font-sans leading-relaxed text-[12px]">
                  Phases 7–9 add error recovery, analytics, and final calibration before human mentor defense at Checkpoint 3.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </AuthShell>
  );
}
