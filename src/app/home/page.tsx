"use client";

import "@/styles/authenticated.css";
import "./home-hero.css";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthShell } from "@/components/shell/auth-shell";
import { useManualProgress } from "@/learning-state/manual-progress";
import { useTerminalLedgerProgress } from "@/learning-state/terminal-ledger-progress";
import { STARTING_MANUAL_SECTIONS } from "@/lib/docs/manual-structure";
import { TERMINAL_LEDGER_PHASES } from "@/lib/projects/terminal-ledger/structure";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  NotebookPen,
  BookOpen,
} from "lucide-react";

/* ── CTA block based on learner state ── */
function HeroCTA() {
  const {
    isComplete: isManualComplete,
    resumeSection,
    completedCount: manualCompletedCount,
    totalCount: manualTotalCount,
  } = useManualProgress();

  const {
    isStarted,
    isCompleted,
    isReadyForRetrospective,
    activeBlocker,
    currentPhase,
    completedPhasesCount,
    startProject,
  } = useTerminalLedgerProgress();

  const isBrandNew = manualCompletedCount === 0;

  if (isStarted) {
    if (isCompleted) {
      return (
        <div className="home-hero-cta-group">
          <p className="home-hero-eyebrow">
            <span className="home-hero-dot bg-emerald-400" />
            Project 1 — Complete
          </p>
          <div className="home-hero-actions">
            <Link href="/projects/terminal-ledger/review/" className="home-hero-btn-primary">
              Review Retrospective <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      );
    }
    if (activeBlocker?.type === "CHECKPOINT_REQUIRED") {
      return (
        <div className="home-hero-cta-group">
          <p className="home-hero-eyebrow">
            <span className="home-hero-dot bg-amber-400 animate-pulse" />
            Checkpoint {activeBlocker.checkpointNumber} Due
          </p>
          <div className="home-hero-actions">
            <Link href={`/mentors/checkpoints/tl-cp-${activeBlocker.checkpointNumber}/`} className="home-hero-btn-primary">
              Prepare Checkpoint <ArrowRight className="size-4" />
            </Link>
            <Link href="/journal/" className="home-hero-btn-ghost">Journal Evidence</Link>
          </div>
        </div>
      );
    }
    if (isReadyForRetrospective) {
      return (
        <div className="home-hero-cta-group">
          <p className="home-hero-eyebrow">
            <span className="home-hero-dot bg-sky-300 animate-pulse" />
            All 9 Phases Complete
          </p>
          <div className="home-hero-actions">
            <Link href="/projects/terminal-ledger/review/" className="home-hero-btn-primary">
              Open Retrospective <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className="home-hero-cta-group">
        <p className="home-hero-eyebrow">
          <span className="home-hero-dot bg-sky-300 animate-pulse" />
          Phase {currentPhase.number} of 9
        </p>
        <div className="home-hero-actions">
          <Link href={`/projects/terminal-ledger/phases/${currentPhase.slug}/`} className="home-hero-btn-primary">
            Continue Phase {currentPhase.number} <ArrowRight className="size-4" />
          </Link>
          <Link href="/projects/" className="home-hero-btn-ghost">Project Overview</Link>
        </div>
        <p className="home-hero-meta">{completedPhasesCount} / 9 phases cleared</p>
      </div>
    );
  }

  if (isManualComplete) {
    return (
      <div className="home-hero-cta-group">
        <p className="home-hero-eyebrow">
          <span className="home-hero-dot bg-emerald-400" />
          Starting Manual complete — ready for Project 1
        </p>
        <div className="home-hero-actions">
          <button
            type="button"
            onClick={() => startProject()}
            className="home-hero-btn-primary"
          >
            <Link href="/projects/terminal-ledger/phases/phase-01/" className="flex items-center gap-2 text-inherit no-underline">
              Launch Terminal Ledger <ArrowRight className="size-4" />
            </Link>
          </button>
        </div>
      </div>
    );
  }

  if (isBrandNew) {
    return (
      <div className="home-hero-cta-group">
        <div className="home-hero-actions">
          <Link href="/manual/01-what-programming-actually-is/" className="home-hero-btn-primary">
            Begin Section 1 <ArrowRight className="size-4" />
          </Link>
          <Link href="/projects/" className="home-hero-btn-ghost">Preview Projects</Link>
        </div>
        <p className="home-hero-meta">11 modules · no rote syntax drills</p>
      </div>
    );
  }

  return (
    <div className="home-hero-cta-group">
      <p className="home-hero-eyebrow">
        <span className="home-hero-dot bg-sky-300 animate-pulse" />
        Module {resumeSection.id} of 11
      </p>
      <div className="home-hero-actions">
        <Link href={`/manual/${resumeSection.slug}/`} className="home-hero-btn-primary">
          Resume Section {resumeSection.id} <ArrowRight className="size-4" />
        </Link>
        <Link href="/projects/" className="home-hero-btn-ghost">Preview Projects</Link>
      </div>
      <p className="home-hero-meta">{manualCompletedCount} / {manualTotalCount} modules read</p>
    </div>
  );
}

/* ── Curriculum surface below the hero ── */
function CurriculumSurface() {
  const {
    isComplete: isManualComplete,
    resumeSection,
    completedCount: manualCompletedCount,
    totalCount: manualTotalCount,
    isSectionCompleted,
  } = useManualProgress();

  const {
    isStarted,
    isCompleted: isProjectCompleted,
    currentPhase,
    completedPhasesCount,
    isPhaseCompleted,
    activeBlocker,
  } = useTerminalLedgerProgress();

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full auth-animate-in py-20">
      <div className="flex items-center justify-between gap-6 border-t border-foreground/10 pt-8 mb-14">
        <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground/80 font-semibold">
          {isStarted ? "Architecture Roadmap · 9 Progressive Milestones" : "Foundation Curriculum · 11 Modules"}
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          {isStarted ? `${completedPhasesCount}/9 Complete` : `${manualCompletedCount}/11 Complete`}
        </span>
      </div>

      <section className="auth-surface-composed p-8 sm:p-14 mb-24">
        {isStarted ? (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10 pb-6 border-b border-foreground/10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">Sequential Architecture</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">Terminal Ledger Milestones</h2>
                <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl leading-relaxed">
                  Each milestone introduces authentic engineering constraints. Progress verified locally against behavioral specifications.
                </p>
              </div>
              <Link href="/projects/#roadmap" className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors self-start sm:self-auto inline-flex items-center gap-1.5 shrink-0">
                <span>Full Specifications</span><ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Active phase feature card */}
            <div className="mb-10 p-6 sm:p-8 rounded-24 bg-foreground/[0.03] border border-foreground/[0.08]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-primary">
                    <span className="size-2 rounded-full bg-primary animate-pulse" />
                    <span>ACTIVE MILESTONE · PHASE 0{currentPhase.number} OF 09</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{currentPhase.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{currentPhase.summary}</p>
                </div>
                <Link href={`/projects/terminal-ledger/phases/${currentPhase.slug}/`} className="auth-primary-btn shrink-0">
                  <span>Open Phase Workspace</span><ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TERMINAL_LEDGER_PHASES.map((phase) => {
                const done = isPhaseCompleted(phase.slug);
                const isCurrent = currentPhase.slug === phase.slug && !isProjectCompleted;
                const hasCheckpoint = phase.isCheckpointFollowed && phase.checkpointNumber;
                return (
                  <Link key={phase.slug} href={`/projects/terminal-ledger/phases/${phase.slug}/`}
                    className={`group p-4 sm:p-5 rounded-16 transition-all ${isCurrent ? "bg-foreground/[0.06] ring-1 ring-primary/30" : "hover:bg-foreground/[0.03] bg-foreground/[0.015]"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-muted-foreground">Phase 0{phase.number}</span>
                          {done ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="size-3" /><span>Cleared</span>
                            </span>
                          ) : isCurrent ? (
                            <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">Active</span>
                          ) : null}
                        </div>
                        <h4 className="text-sm font-semibold text-foreground/90 group-hover:text-primary transition-colors truncate">{phase.title}</h4>
                      </div>
                      <div className="shrink-0 pt-0.5">
                        {hasCheckpoint ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">CP{phase.checkpointNumber}</span>
                        ) : (
                          <ArrowRight className="size-3.5 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-foreground/10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="size-9 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <NotebookPen className="size-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-foreground">Engineering Problem Journal</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Log runtime surprises, diagnosed bugs, and durable solutions.</p>
                  <Link href="/journal/" className="inline-flex items-center gap-1 text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline pt-1">
                    <span>Open Problem Journal</span><ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-9 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="size-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-foreground">Conversational Calibrations</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">1-on-1 code walkthroughs at phases 3, 6, and 9.</p>
                  <Link href="/mentors/" className="inline-flex items-center gap-1 text-xs font-mono text-violet-600 dark:text-violet-400 hover:underline pt-1">
                    <span>View Mentors & Checkpoints</span><ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8 pb-6 border-b border-foreground/10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">Foundational Principles</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">Python Starting Manual</h2>
                <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl leading-relaxed">
                  11 modules teaching computation, memory, types, flow control, and debugging from first principles.
                </p>
              </div>
              <Link href={`/manual/${resumeSection.slug}/`} className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors self-start inline-flex items-center gap-1.5 shrink-0">
                <span>Resume Module {resumeSection.id}</span><ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="mb-10 p-6 sm:p-8 rounded-24 bg-foreground/[0.03] border border-foreground/[0.08]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2.5 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-primary">
                    <span className="size-2 rounded-full bg-primary animate-pulse" />
                    <span>ACTIVE READING TARGET · MODULE {resumeSection.id} OF 11</span>
                  </div>
                  <h3 className="auth-editorial-title text-2xl sm:text-3xl text-foreground font-normal">{resumeSection.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Master the mental model and internal mechanics before applying it in your local terminal.
                  </p>
                </div>
                <Link href={`/manual/${resumeSection.slug}/`} className="auth-primary-btn shrink-0">
                  <BookOpen className="size-4" /><span>Continue Reading</span><ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80 font-semibold mb-4">
              All Curriculum Modules ({manualCompletedCount}/{manualTotalCount} Completed)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {STARTING_MANUAL_SECTIONS.map((sec) => {
                const done = isSectionCompleted(sec.slug);
                const isResume = resumeSection.slug === sec.slug && !isManualComplete;
                return (
                  <Link key={sec.slug} href={`/manual/${sec.slug}/`}
                    className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-14 transition-all ${isResume ? "bg-foreground/[0.06] ring-1 ring-primary/25" : "hover:bg-foreground/[0.03] bg-foreground/[0.015]"}`}>
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="font-mono text-xs font-semibold text-muted-foreground w-7 shrink-0">{String(sec.id).padStart(2, "0")}</span>
                      <span className={`text-sm transition-colors truncate ${isResume ? "font-semibold text-foreground" : "text-foreground/90 group-hover:text-primary"}`}>{sec.title}</span>
                    </div>
                    <div className="shrink-0 ml-3">
                      {done ? (
                        <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                      ) : isResume ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">Current</span>
                      ) : (
                        <ArrowRight className="size-3.5 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
              <span>Prerequisite for Terminal Ledger (Project 1)</span>
              <Link href="/projects/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                <span>Preview Terminal Ledger Project</span><ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <AuthShell activeItem="home" environment="home">

      {/* ================================================================ */}
      {/* CINEMATIC HERO                                                     */}
      {/* ================================================================ */}
      <section className="home-hero" aria-label="PipLearn hero">

        {/* 1. SKY BACKGROUND IMAGE */}
        <div className="home-hero-bg" aria-hidden="true">
          <Image
            src="/images/home/home-hero-crystal-sky-v2.png"
            alt=""
            fill
            priority
            quality={100}
            className="home-hero-bg-img"
            sizes="100vw"
          />
          {/* Left atmospheric veil for text legibility */}
          <div className="home-hero-text-veil" />
        </div>

        {/* 2. HERO GRID */}
        <div className="home-hero-grid">

          {/* LEFT: typography + CTAs */}
          <div className="home-hero-left">
            <div className="home-hero-label" aria-hidden="true">HOME</div>
            <h1 className="home-hero-headline">
              <span className="home-hero-headline-line">Learn by building</span>
              <span className="home-hero-headline-line">software.</span>
            </h1>
            <p className="home-hero-copy">
              PipLearn teaches software engineering<br className="hidden sm:inline" />
              through execution, persistence, and<br className="hidden sm:inline" />
              human calibration.
            </p>
            <HeroCTA />
          </div>

          {/* RIGHT: sculpture is integrated into the hero artwork */}
          <div className="home-hero-right" aria-hidden="true" />

        </div>
      </section>

      {/* ================================================================ */}
      {/* CURRICULUM SURFACE                                                */}
      {/* ================================================================ */}
      <main className="flex-1 overflow-y-auto bg-[#f5f9fd] dark:bg-[#040711]">
        <CurriculumSurface />
      </main>

    </AuthShell>
  );
}
