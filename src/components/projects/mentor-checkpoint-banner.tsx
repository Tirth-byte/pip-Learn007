"use client";

import React from "react";
import { ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";

interface MentorCheckpointBannerProps {
  checkpointNumber: 1 | 2 | 3;
  isCleared: boolean;
  onContinue?: () => void;
}

const CHECKPOINT_DETAILS: Record<
  1 | 2 | 3,
  {
    title: string;
    stage: string;
    description: string;
    mentors: string[];
    topics: string[];
    nextPhaseName: string;
  }
> = {
  1: {
    title: "Mentor Checkpoint 1: In-Memory & Persistence Defense",
    stage: "Completed Phase 3 (End of Foundations)",
    description:
      "You have completed Phase 3: Save and Load Data. Before advancing to input validation and defensive loading in Phase 4, you conduct a conversational defense with a mentor.",
    mentors: ["Tirth", "Darsh", "Raj"],
    topics: [
      "Explain the data flow lifecycle: startup load -> in-memory mutations -> safe exit save.",
      "Defend your first-run strategy (when no JSON file exists yet).",
      "Demonstrate that data survives a complete process termination and restart.",
      "Review your manual verification transcript and evidence.",
    ],
    nextPhaseName: "Phase 4: Validate Bad Input",
  },
  2: {
    title: "Mentor Checkpoint 2: Validation & Dates Review",
    stage: "Completed Phase 6 (Mid-Project Architecture)",
    description:
      "You have completed Phase 6: Dates and Monthly Views. Checkpoint 2 reviews how your program enforces data integrity and query abstractions.",
    mentors: ["Tirth", "Darsh", "Raj"],
    topics: [
      "Review interactive re-prompt loops and narrow try/except exception handling.",
      "Inspect defensive file loading (missing, empty, and malformed files).",
      "Demonstrate ISO date parsing, formatting, and chronological comparison.",
      "Walk through monthly selection logic across year/month boundaries.",
    ],
    nextPhaseName: "Phase 7: Budgets",
  },
  3: {
    title: "Mentor Checkpoint 3: Architectural Defense & Final Review",
    stage: "Completed Phase 9 (Project Conclusion)",
    description:
      "You have built the entire Terminal Ledger application. Checkpoint 3 is your comprehensive code defense and architectural review.",
    mentors: ["Tirth", "Darsh", "Raj"],
    topics: [
      "Defend the architectural split and separation of concerns across functions/modules.",
      "Verify CSV export standards and strict boundary isolation from JSON persistence.",
      "Audit summary reporting aggregation and sorting algorithms.",
      "Reflect on recurring patterns documented in your Problem Journal.",
    ],
    nextPhaseName: "Project Complete",
  },
};

export function MentorCheckpointBanner({
  checkpointNumber,
  isCleared,
  onContinue,
}: MentorCheckpointBannerProps) {
  const details = CHECKPOINT_DETAILS[checkpointNumber];

  if (isCleared) {
    return (
      <div className="p-6 rounded-lg border border-emerald-500/30 bg-emerald-500/5 mt-8">
        <div className="flex items-start gap-3.5">
          <div className="p-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
            <CheckCircle2 className="size-5" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                Gate Cleared
              </span>
              <span className="text-muted-foreground/60 text-xs">·</span>
              <span className="text-xs text-muted-foreground">Mentor Checkpoint {checkpointNumber}</span>
            </div>
            <h3 className="text-base font-semibold text-foreground tracking-tight">
              {details.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              You have completed this conversational review. Your technical reasoning, persistence architecture, and verification evidence were defended.
            </p>

            {onContinue && checkpointNumber < 3 && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onContinue}
                  className="auth-primary-btn text-xs py-2 px-4"
                >
                  <span>Advance to {details.nextPhaseName}</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg border-2 border-primary/40 bg-card shadow-sm mt-8 relative overflow-hidden">
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
          <ShieldAlert className="size-5" />
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-primary">
                Checkpoint Gate Required
              </span>
              <span className="text-muted-foreground/60 text-xs">·</span>
              <span className="text-xs text-muted-foreground">{details.stage}</span>
            </div>
            <h3 className="text-lg font-bold text-foreground tracking-tight">
              {details.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-2xl">
              {details.description}
            </p>
          </div>

          {/* Defense Agenda Box */}
          <div className="p-4 rounded-md bg-muted/40 border border-border/80 text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                Defense Agenda & Topics
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                Mentors: {details.mentors.join(", ")}
              </span>
            </div>
            <ul className="space-y-1.5 text-muted-foreground">
              {details.topics.map((t, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary font-mono">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Truthful Mentor Sign-Off Notice (No self-clear) */}
          <div className="p-3.5 rounded-md bg-primary/5 border border-primary/20 text-xs text-muted-foreground space-y-1">
            <div className="font-semibold text-foreground text-[11.5px] flex items-center gap-1.5">
              <span>Human Mentor Sign-Off Required</span>
            </div>
            <p className="text-[11.5px] leading-relaxed">
              Checkpoint defenses are conducted directly with mentors. Project progression pauses here until your mentor review is completed and signed off. Learner self-certification is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
