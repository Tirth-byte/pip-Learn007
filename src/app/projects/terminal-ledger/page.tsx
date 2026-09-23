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
import {
  ArrowRight,
  Clock,
  Terminal,
  Layers,
  CheckCircle2,
  ShieldAlert,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function TerminalLedgerOverviewPage() {
  const router = useRouter();
  const {
    isStarted,
    isCompleted,
    currentPhase,
    isPhaseCompleted,
    startProject,
  } = useTerminalLedgerProgress();

  const handleStartOrResume = () => {
    if (isCompleted) {
      router.push("/projects/terminal-ledger/review/");
    } else if (!isStarted) {
      startProject();
      router.push("/projects/terminal-ledger/phases/phase-01/");
    } else {
      router.push(`/projects/terminal-ledger/phases/${currentPhase.slug}/`);
    }
  };

  return (
    <AuthShell activeItem="projects">
      <main className="flex-1 overflow-y-auto">
        <div className="auth-home-container max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/projects/" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Terminal Ledger</span>
          </nav>

          {/* Project Header */}
          <div className="mb-10 pb-8 border-b border-border/80">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase font-semibold bg-primary/10 text-primary">
                Python Masterclass · Project 1
              </span>
              <span className="text-muted-foreground text-xs">·</span>
              <span className="text-xs text-muted-foreground font-mono">
                {TERMINAL_LEDGER_PROJECT.totalPhases} Phases
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {TERMINAL_LEDGER_PROJECT.title}
            </h1>

            <p className="text-base text-muted-foreground/95 mt-3 max-w-2xl leading-relaxed">
              {TERMINAL_LEDGER_PROJECT.purpose}
            </p>

            <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground mt-5">
              <div className="flex items-center gap-1.5">
                <Clock className="size-4 text-primary" />
                <span>{TERMINAL_LEDGER_PROJECT.estimatedTime} total expected effort</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Terminal className="size-4 text-primary" />
                <span>Local terminal build (<code className="font-mono text-[11px] px-1 bg-muted rounded">python3</code>)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="size-4 text-primary" />
                <span>3 human mentor checkpoints</span>
              </div>
            </div>

            {/* Dominant Start / Resume CTA */}
            <div className="mt-8">
              <button
                type="button"
                onClick={handleStartOrResume}
                className="auth-primary-btn text-sm py-3 px-6 shadow-sm"
              >
                <span>
                  {isCompleted
                    ? "Review Project"
                    : isStarted
                    ? `Continue Building: Phase ${currentPhase.number} (${currentPhase.title})`
                    : "Start Project — Enter Phase 1"}
                </span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Section 1: The Learning Contract */}
          <section className="mb-12">
            <div className="p-6 rounded-xl border border-border bg-card shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-1.5">
                <Sparkles className="size-4" />
                <span>The Just-in-Time Learning Contract</span>
              </div>
              <h2 className="text-lg font-bold text-foreground tracking-tight mb-2">
                You are not expected to know everything upfront.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {TERMINAL_LEDGER_PROJECT.learningContract} Real software is not an isolated quiz. Terminal Ledger creates the authentic engineering pressures that make persistence, validation, dates, aggregation, and refactoring necessary.
              </p>
            </div>
          </section>

          {/* Section 2: What You Know vs What You Unlock */}
          <section className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-4">
              Capability Progression
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* What You Already Know */}
              <div className="p-5 rounded-xl border border-border bg-card">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Your Foundation
                </div>
                <div className="text-base font-bold text-foreground tracking-tight mb-3">
                  Starting Manual Skills
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>Running standalone scripts via <code className="font-mono text-[11px] px-1 bg-muted rounded">python3</code> from the terminal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>Variables, data types (int, float, str, bool), and f-string formatting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>Conditional logic, while loops, and for loops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>Organizing structured records using lists and dictionaries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>Decomposing logic into pure functions with parameters and return values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>Reading Python tracebacks from the bottom up and debugging with evidence</span>
                  </li>
                </ul>
              </div>

              {/* What You Will Learn Just-in-Time */}
              <div className="p-5 rounded-xl border border-border bg-card">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Unlocked Just-in-Time
                </div>
                <div className="text-base font-bold text-foreground tracking-tight mb-3">
                  Capabilities Introduced
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>Text file persistence with context managers and modes (<code className="font-mono text-[11px] px-1 bg-muted rounded">with open(...)</code>)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>JSON serialization and deserialization (<code className="font-mono text-[11px] px-1 bg-muted rounded">json.dump</code>, <code className="font-mono text-[11px] px-1 bg-muted rounded">json.load</code>)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>Defensive file loading: handling missing, empty, and corrupted data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>Bounded re-prompt validation loops preventing unexpected terminal crashes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>ISO date parsing, chronological comparison, and monthly filtering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>Category budget threshold calculation and progress bar rendering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>Aggregating grouped totals and sorting rankings with key functions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>Standards-compliant CSV export and modular architectural refactoring</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Local Workstation Setup Guide */}
          <section className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-3">
              Local Workstation Setup
            </h2>
            <div className="p-5 rounded-xl border border-border bg-muted/20 text-xs space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Create a local folder for your project and work from your own editor and terminal:
              </p>
              <div className="p-3.5 rounded-lg bg-background border border-border/80 font-mono text-[11.5px] text-foreground space-y-1">
                <div>python3 --version  <span className="text-muted-foreground"># Python 3.10+ recommended</span></div>
              </div>
              <p className="text-[11.5px] text-muted-foreground">
                Phase 1 does not require code. It defines your behavioral specification and Project Launch Sheet.
              </p>
            </div>
          </section>

          {/* Section 4: Phase Sequence Roadmap */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Project Roadmap (9 Phases)
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                3 Checkpoints
              </span>
            </div>

            <div className="space-y-3">
              {TERMINAL_LEDGER_PHASES.map((p) => {
                const isPCompleted = isPhaseCompleted(p.slug);
                const isPCurrent = isStarted && currentPhase.slug === p.slug;

                return (
                  <div key={p.slug}>
                    <Link
                      href={`/projects/terminal-ledger/phases/${p.slug}/`}
                      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 block ${
                        isPCurrent
                          ? "border-primary bg-primary/5 shadow-xs"
                          : isPCompleted
                          ? "border-border/80 bg-card hover:bg-muted/30"
                          : "border-border/60 bg-card/60 hover:bg-muted/20 text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div
                          className={`size-7 rounded-full flex items-center justify-center font-mono text-xs font-semibold shrink-0 mt-0.5 ${
                            isPCompleted
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : isPCurrent
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isPCompleted ? (
                            <CheckCircle2 className="size-4" />
                          ) : (
                            <span>{p.number}</span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-foreground truncate">
                              {p.title}
                            </h3>
                            {isPCurrent && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-primary text-primary-foreground">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {p.summary}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center text-xs text-muted-foreground">
                        <span className="font-mono">{p.estimatedTime}</span>
                        <ChevronRight className="size-4 text-muted-foreground/60" />
                      </div>
                    </Link>

                    {/* Mentor Checkpoint Marker */}
                    {p.isCheckpointFollowed && (
                      <div className="my-2 ml-4 pl-4 border-l-2 border-dashed border-primary/40 py-1.5 flex items-center gap-2 text-xs">
                        <ShieldAlert className="size-3.5 text-primary" />
                        <span className="font-mono font-semibold text-primary uppercase text-[11px]">
                          Mentor Checkpoint {p.checkpointNumber}
                        </span>
                        <span className="text-muted-foreground/70 text-[11.5px]">
                          — Conversational code & architecture defense
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </AuthShell>
  );
}
