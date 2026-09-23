"use client";

import React from "react";
import Link from "next/link";
import { AuthShell } from "@/components/shell/auth-shell";
import { useManualProgress } from "@/learning-state/manual-progress";
import { useTerminalLedgerProgress } from "@/learning-state/terminal-ledger-progress";
import { TERMINAL_LEDGER_PROJECT } from "@/lib/projects/terminal-ledger/structure";
import { ArrowRight, BookOpen, Clock, Layers, Terminal, CheckCircle2 } from "lucide-react";

export default function ProjectsPage() {
  const { isComplete: isManualComplete } = useManualProgress();
  const {
    isStarted,
    isCompleted,
    currentPhase,
    startProject,
  } = useTerminalLedgerProgress();

  const handleStartProject = () => {
    startProject();
  };

  return (
    <AuthShell activeItem="projects">
      <main className="flex-1 overflow-y-auto">
        <div className="auth-home-container">
          {/* Header */}
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80 font-medium">
              Curriculum Progression
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Projects
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl leading-relaxed">
              Projects are where real software is built on your local machine. Every project creates authentic engineering pressures that make persistence, validation, dates, and refactoring necessary.
            </p>
          </div>

          {/* Single Focused Project Card: Terminal Ledger */}
          <div className="auth-card-dominant mb-8 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase font-semibold bg-primary/10 text-primary">
                  {TERMINAL_LEDGER_PROJECT.language} · {TERMINAL_LEDGER_PROJECT.level}
                </span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground font-mono">
                  {TERMINAL_LEDGER_PROJECT.totalPhases} Phases
                </span>
              </div>

              {/* Status Badge */}
              {isCompleted ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3.5" />
                  <span>Completed</span>
                </span>
              ) : isStarted ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                  <span className="size-2 rounded-full bg-primary animate-pulse" />
                  <span>In Progress · Phase {currentPhase.number} of 9</span>
                </span>
              ) : (
                <span className="text-xs text-muted-foreground font-medium">
                  Not Started
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              {TERMINAL_LEDGER_PROJECT.title}
            </h2>

            <p className="text-sm text-muted-foreground/90 mt-2 mb-4 leading-relaxed max-w-2xl">
              {TERMINAL_LEDGER_PROJECT.purpose}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                <span>{TERMINAL_LEDGER_PROJECT.estimatedTime} expected total effort</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="size-3.5" />
                <span>9 structured phases with 3 mentor checkpoints</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Terminal className="size-3.5" />
                <span>Local terminal build</span>
              </div>
            </div>

            {/* Action Area */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/70">
              {isCompleted ? (
                <Link
                  href="/projects/terminal-ledger/review/"
                  className="auth-primary-btn"
                >
                  <span>Review Project</span>
                  <ArrowRight className="size-4" />
                </Link>
              ) : isStarted ? (
                <Link
                  href={`/projects/terminal-ledger/phases/${currentPhase.slug}/`}
                  className="auth-primary-btn"
                >
                  <span>Continue Phase {currentPhase.number}: {currentPhase.title}</span>
                  <ArrowRight className="size-4" />
                </Link>
              ) : (
                <Link
                  href="/projects/terminal-ledger/"
                  onClick={handleStartProject}
                  className="auth-primary-btn"
                >
                  <span>Start Project (Phase 1)</span>
                  <ArrowRight className="size-4" />
                </Link>
              )}

              <Link
                href="/projects/terminal-ledger/"
                className="auth-secondary-btn"
              >
                <span>Project Overview</span>
              </Link>
            </div>
          </div>

          {/* Starting Manual Foundation Status */}
          <div className="p-5 rounded-lg border border-border/70 bg-card/60 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold uppercase tracking-wider text-muted-foreground text-[11px]">
                Prerequisite Foundation
              </span>
              {isManualComplete && (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="size-3" />
                  <span>Ready for Projects</span>
                </span>
              )}
            </div>
            <div className="text-sm font-medium text-foreground">
              Python Starting Manual (Sections 01–11)
            </div>
            <p className="text-xs text-muted-foreground mt-1 max-w-xl leading-relaxed">
              Provides foundational mental models for variables, loops, collections, functions, tracebacks, and terminal experiments before beginning Terminal Ledger.
            </p>
            <div className="mt-3">
              <Link
                href="/manual/01-what-programming-actually-is/"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
              >
                <BookOpen className="size-3.5" />
                <span>Review Starting Manual</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </AuthShell>
  );
}
