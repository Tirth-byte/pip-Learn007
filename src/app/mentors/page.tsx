"use client";

import React from "react";
import Link from "next/link";
import { AuthShell } from "@/components/shell/auth-shell";
import {
  LOCKED_MENTORS,
  CHECKPOINT_CURRICULUM_INFO,
  useMentorCheckpoints,
} from "@/learning-state/mentor-checkpoints";
import { useTerminalLedgerProgress } from "@/learning-state/terminal-ledger-progress";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldAlert,
  User,
} from "lucide-react";

export default function MentorsPage() {
  const { records } = useMentorCheckpoints();
  const { activeBlocker, isCheckpointDue, isCheckpointCleared } = useTerminalLedgerProgress();

  return (
    <AuthShell activeItem="mentors">
      <main className="flex-1 overflow-y-auto">
        <div className="auth-home-container">
          {/* Header */}
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80 font-medium">
              Human Calibration · Evidence-Based Defenses
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Mentors & Checkpoints
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
              PipLearn checkpoints are conversational defenses with human mentors at three pivotal inflection points. Mentors review your technical reasoning, data flow, and Problem Journal evidence—never numerical grades.
            </p>
          </div>

          {/* Active Blocker Alert if Checkpoint is Due */}
          {activeBlocker?.type === "CHECKPOINT_REQUIRED" && (
            <div className="p-5 rounded-lg border-2 border-primary/40 bg-card mb-8 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                  <ShieldAlert className="size-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-primary">
                      Action Required
                    </span>
                    <span className="text-muted-foreground/60 text-xs">·</span>
                    <span className="text-xs text-muted-foreground">
                      Progression Paused
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground tracking-tight">
                    Mentor Checkpoint {activeBlocker.checkpointNumber} is Due
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    Phase {activeBlocker.phaseNumber} is completed. Before advancing to the next phase, prepare your evidence, schedule a conversational review, and record the session outcome.
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/mentors/checkpoints/tl-cp-${activeBlocker.checkpointNumber}/`}
                      className="auth-primary-btn text-xs py-2 px-4"
                    >
                      <span>Prepare Checkpoint {activeBlocker.checkpointNumber}</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mentors Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  PipLearn Mentors
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Available to conduct conversational reviews for Terminal Ledger checkpoints.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {LOCKED_MENTORS.map((name) => (
                <div
                  key={name}
                  className="p-5 rounded-xl border border-border bg-card shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                        {name[0]}
                      </div>
                      <div>
                        <div className="text-base font-bold text-foreground tracking-tight">
                          {name}
                        </div>
                        <div className="text-[11px] font-mono text-muted-foreground">
                          PipLearn Mentor
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Conducts conversational reviews and evidence-based code walkthroughs for Terminal Ledger checkpoints.
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border/70 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-mono">Checkpoints 1, 2 & 3</span>
                    <span className="text-foreground/80 font-medium">
                      PipLearn Mentor
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Checkpoint Registry Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  Terminal Ledger Checkpoint Gates
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Three designated human reviews across the 9-phase project arc.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {([1, 2, 3] as const).map((num) => {
                const info = CHECKPOINT_CURRICULUM_INFO[num];
                const rec = records[num];
                const isCleared = isCheckpointCleared(num);
                const isDue = isCheckpointDue(num);
                const isScheduled = rec.status === "scheduled" && !isCleared;

                return (
                  <div
                    key={num}
                    className={`p-5 rounded-xl border transition-all ${
                      isDue
                        ? "border-primary/50 bg-card shadow-xs"
                        : isCleared
                        ? "border-emerald-500/25 bg-emerald-500/[0.02]"
                        : "border-border bg-card/60"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                            Checkpoint {num} of 3
                          </span>
                          <span className="text-muted-foreground/60 text-xs">·</span>
                          <span className="text-xs text-muted-foreground">
                            {info.stage} ({info.coveredPhaseRange})
                          </span>

                          {/* Status Badge */}
                          {isCleared ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 font-mono">
                              <CheckCircle2 className="size-3" />
                              <span>Recorded Locally · Cleared</span>
                            </span>
                          ) : isScheduled ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400 font-mono">
                              <Calendar className="size-3" />
                              <span>Session Planned ({rec.mentor || "Mentor"})</span>
                            </span>
                          ) : isDue ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary font-mono animate-pulse">
                              <ShieldAlert className="size-3" />
                              <span>Due Now</span>
                            </span>
                          ) : (
                            <span className="text-[11px] text-muted-foreground/70 font-mono">
                              Locked (after Phase {info.afterPhase})
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-foreground tracking-tight">
                          {info.title}
                        </h3>

                        <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
                          {info.whyHere}
                        </p>

                        {/* Scheduled Detail if session is planned */}
                        {isScheduled && rec.scheduledDate && rec.scheduledTime && (
                          <div className="pt-1 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <User className="size-3 text-primary" />
                              <span>Mentor: <strong>{rec.mentor}</strong></span>
                            </span>
                            <span>·</span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="size-3 text-primary" />
                              <span>{rec.scheduledDate}</span>
                            </span>
                            <span>·</span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="size-3 text-primary" />
                              <span>{rec.scheduledTime}</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right Action */}
                      <div className="shrink-0 sm:pt-1">
                        <Link
                          href={`/mentors/checkpoints/${info.checkpointId}/`}
                          className={
                            isDue
                              ? "auth-primary-btn text-xs py-2 px-4"
                              : "auth-secondary-btn text-xs py-2 px-3.5"
                          }
                        >
                          <span>
                            {isCleared
                              ? "View Recorded Outcome"
                              : isScheduled
                              ? "Manage Plan & Record"
                              : isDue
                              ? "Prepare & Plan"
                              : "View Checkpoint Agenda"}
                          </span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>
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
