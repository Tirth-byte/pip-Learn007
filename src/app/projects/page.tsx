"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthShell } from "@/components/shell/auth-shell";
import { useManualProgress } from "@/learning-state/manual-progress";
import { useTerminalLedgerProgress } from "@/learning-state/terminal-ledger-progress";
import { useProblemJournal } from "@/learning-state/problem-journal";
import { TERMINAL_LEDGER_PROJECT, TERMINAL_LEDGER_PHASES } from "@/lib/projects/terminal-ledger/structure";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Terminal,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  NotebookPen,
  Users,
} from "lucide-react";
import "@/styles/authenticated.css";
import "./projects-hero.css";

export default function ProjectsPage() {
  const { isComplete: isManualComplete } = useManualProgress();
  const {
    isStarted,
    isCompleted,
    isReadyForRetrospective,
    activeBlocker,
    currentPhase,
    startProject,
    isPhaseCompleted,
  } = useTerminalLedgerProgress();
  const journalEntries = useProblemJournal();

  const handleStartProject = () => {
    startProject();
  };

  const completedPhasesCount = TERMINAL_LEDGER_PHASES.filter((p) =>
    isPhaseCompleted(p.slug)
  ).length;

  return (
    <AuthShell activeItem="projects" environment="projects">
      <main className="projects-cinematic-page flex-1 overflow-y-auto">
        <section className="projects-cinematic-hero" aria-labelledby="terminal-ledger-title">
          <Image
            src="/images/projects/terminal-ledger-hero-4k.png"
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="projects-cinematic-hero-art"
          />

          <div className="projects-cinematic-content">
            <span className="projects-cinematic-eyebrow">Projects</span>
            <h1 id="terminal-ledger-title" className="projects-cinematic-title">
              Terminal<br />Ledger
            </h1>
            <p className="projects-cinematic-description">
              A single-user, terminal-first personal finance application that records
              transactions, persists data between runs, enforces category budgets,
              generates monthly summary reports, and exports clean CSVs.
            </p>

            <div className="projects-cinematic-actions">
              {isCompleted ? (
                <Link
                  href="/projects/terminal-ledger/review/"
                  className="projects-hero-btn projects-hero-btn-primary"
                >
                  <span>Review Retrospective</span>
                  <ArrowRight className="size-4" />
                </Link>
              ) : activeBlocker?.type === "CHECKPOINT_REQUIRED" ? (
                <Link
                  href={`/mentors/checkpoints/tl-cp-${activeBlocker.checkpointNumber}/`}
                  className="projects-hero-btn projects-hero-btn-primary"
                >
                  <span>Defend Checkpoint {activeBlocker.checkpointNumber}</span>
                  <ArrowRight className="size-4" />
                </Link>
              ) : isReadyForRetrospective ? (
                <Link
                  href="/projects/terminal-ledger/review/"
                  className="projects-hero-btn projects-hero-btn-primary"
                >
                  <span>Open Final Retrospective</span>
                  <ArrowRight className="size-4" />
                </Link>
              ) : isStarted ? (
                <Link
                  href={`/projects/terminal-ledger/phases/${currentPhase.slug}/`}
                  className="projects-hero-btn projects-hero-btn-primary"
                >
                  <span>Continue Phase {currentPhase.number}: {currentPhase.title}</span>
                  <ArrowRight className="size-4" />
                </Link>
              ) : (
                <Link
                  href="/projects/terminal-ledger/phases/phase-01/"
                  onClick={handleStartProject}
                  className="projects-hero-btn projects-hero-btn-primary"
                >
                  <span>Initialize Terminal Ledger</span>
                  <ArrowRight className="size-4" />
                </Link>
              )}

              <a
                href="#roadmap"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="projects-hero-btn projects-hero-btn-glass"
              >
                <span>Detailed Specification</span>
              </a>

              <Link
                href="/journal/"
                className="projects-hero-btn projects-hero-btn-glass"
              >
                <span>Problem Journal</span>
              </Link>
            </div>

            <div className="projects-cinematic-meta">
              <div className="flex items-center gap-1.5 shrink-0">
                <Clock className="size-3.5" />
                <span>{TERMINAL_LEDGER_PROJECT.estimatedTime} Effort</span>
              </div>
              <span className="projects-cinematic-meta-divider">·</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <Terminal className="size-3.5" />
                <span>Python 3 Standard Library</span>
              </div>
              <span className="projects-cinematic-meta-divider">·</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="size-3.5" />
                <span>9 Sequential Phases</span>
              </div>
              <span className="projects-cinematic-meta-divider">·</span>
              <span className="shrink-0">3 Defense Gates</span>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full auth-animate-in projects-milestones-existing">

          {/* ============================================================== */}
          {/* 2. ONE GRAND COMPOSED ENGINEERING MILESTONE SURFACE           */}
          {/* ============================================================== */}
          <section id="roadmap" className="auth-surface-composed p-6 sm:p-10 lg:p-14 mb-20">
            {/* Architectural Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-foreground/10 mb-8">
              <div>
                <div className="auth-eyebrow text-muted-foreground mb-2">
                  System Architecture
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  Nine Engineering Milestones
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                  Progression advances sequentially. From volatile console entry to a validated, persistent, and calibrated financial system.
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                <span className="px-3 py-1.5 rounded-full bg-foreground/5 text-foreground border border-foreground/10">
                  {completedPhasesCount} of 9 Phases Complete
                </span>
                <Link
                  href="/projects/#roadmap"
                  className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-flex items-center gap-1"
                >
                  <span>Specs</span>
                  <ChevronRight className="size-3.5" />
                </Link>
              </div>
            </div>

            {/* Architectural Milestone List with Intentional Checkpoint Interruptions */}
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
                        {/* Left: Phase Number, Title, Scope */}
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

                        {/* Right: Deliverables count & Action indicator */}
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

                    {/* INTENTIONAL CHECKPOINT INTERRUPTION GATE */}
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

            {/* Bottom Integrated Context Strip */}
            <div className="mt-10 pt-8 border-t border-foreground/10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Foundation Verification */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5">
                <BookOpen className="size-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-semibold text-foreground">
                    Python Starting Manual Foundation
                  </div>
                  <p className="text-muted-foreground mt-0.5 leading-relaxed">
                    11 chapters covering values, collections, functions, and debugging principles used throughout Terminal Ledger.
                  </p>
                  <Link
                    href="/manual/01-what-programming-actually-is/"
                    className="inline-flex items-center gap-1 text-foreground hover:underline mt-2 font-mono"
                  >
                    <span>{isManualComplete ? "Review Starting Manual" : "Open Starting Manual"}</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>

              {/* Problem Journal Integration */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5">
                <NotebookPen className="size-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-semibold text-foreground">
                    Problem Journal Technical Ledger
                  </div>
                  <p className="text-muted-foreground mt-0.5 leading-relaxed">
                    {journalEntries.length > 0
                      ? `${journalEntries.length} engineering problem entries logged during your development process.`
                      : "Document bugs, dead-ends, and breakthroughs as you work through each phase."}
                  </p>
                  <Link
                    href="/journal/"
                    className="inline-flex items-center gap-1 text-foreground hover:underline mt-2 font-mono"
                  >
                    <span>Open Problem Journal</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </AuthShell>
  );
}
