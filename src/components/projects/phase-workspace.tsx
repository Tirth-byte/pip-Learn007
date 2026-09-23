"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Terminal,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  NotebookPen,
  Compass,
} from "lucide-react";
import { PhaseMilestoneData, KnowledgePackData } from "@/lib/projects/terminal-ledger/types";
import { TERMINAL_LEDGER_PHASES } from "@/lib/projects/terminal-ledger/structure";
import { DocArticleClient } from "@/components/docs/doc-article-client";
import { KnowledgePackDrawer } from "./knowledge-pack-drawer";
import { MentorCheckpointBanner } from "./mentor-checkpoint-banner";
import { ProblemJournalDrawer } from "./problem-journal-drawer";
import { HelpLadderDrawer } from "./help-ladder-drawer";
import { useTerminalLedgerProgress } from "@/learning-state/terminal-ledger-progress";
import { useProblemJournal } from "@/learning-state/problem-journal";

interface PhaseWorkspaceProps {
  milestoneData: PhaseMilestoneData;
}

export function PhaseWorkspace({ milestoneData }: PhaseWorkspaceProps) {
  const router = useRouter();
  const { phase, htmlContent, knowledgePacks, prevPhase, nextPhase } = milestoneData;

  const {
    progress,
    currentPhase,
    isPhaseCompleted,
    isCheckpointCleared,
    isCheckpointDue: checkIsCheckpointDue,
    completePhase,
    startProject,
  } = useTerminalLedgerProgress();

  const isCompleted = isPhaseCompleted(phase.slug);
  const isCheckpointFollowed = phase.isCheckpointFollowed && phase.checkpointNumber;
  const isCheckpointClearedForThisPhase = isCheckpointFollowed
    ? isCheckpointCleared(phase.checkpointNumber!)
    : true;
  const isCheckpointDue = isCompleted && isCheckpointFollowed && !isCheckpointClearedForThisPhase;

  // Prerequisite checkpoint gating
  const isPrerequisiteCheckpointDue =
    (phase.number >= 4 && checkIsCheckpointDue(1)) ||
    (phase.number >= 7 && checkIsCheckpointDue(2));
  const duePrerequisiteCheckpointNumber =
    phase.number >= 4 && checkIsCheckpointDue(1) ? 1 : 2;

  // Selected knowledge pack to display in drawer
  const [activePack, setActivePack] = useState<KnowledgePackData | null>(null);

  // Struggle support drawers state
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isHelpLadderOpen, setIsHelpLadderOpen] = useState(false);

  const journalEntries = useProblemJournal();
  const currentPhaseDraft = journalEntries.find(
    (e) => e.project === "terminal-ledger" && e.phase === phase.slug && e.status === "draft"
  );

  const handleOpenHelpLadder = () => {
    setActivePack(null);
    setIsJournalOpen(false);
    setIsHelpLadderOpen(true);
  };

  const handleOpenJournal = () => {
    setActivePack(null);
    setIsHelpLadderOpen(false);
    setIsJournalOpen(true);
  };

  const handleOpenKnowledgePackFromHelp = (packSlug: string) => {
    setIsHelpLadderOpen(false);
    const found = knowledgePacks.find((p) => p.slug === packSlug || p.id === packSlug);
    if (found) {
      setActivePack(found);
    }
  };

  const handleOpenJournalFromHelp = () => {
    setIsHelpLadderOpen(false);
    setIsJournalOpen(true);
  };

  // Verification checklist state (session/interactive)
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const allChecked =
    phase.criteria.length > 0 &&
    phase.criteria.every((_, idx) => checkedItems[idx] === true);

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleVerifyAndComplete = () => {
    // Ensure project is marked started if not already
    startProject();
    completePhase(phase.slug);
  };

  const handleAdvanceToNext = () => {
    if (nextPhase) {
      router.push(`/projects/terminal-ledger/phases/${nextPhase.slug}/`);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background text-foreground">
      {/* Top Workspace Header & Context */}
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur-xs px-4 sm:px-8 py-3">
        <div className="max-w-[1340px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Breadcrumb Trail */}
          <nav className="flex items-center gap-2 text-xs font-mono" aria-label="Breadcrumb">
            <Link
              href="/projects/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <Link
              href="/projects/terminal-ledger/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terminal Ledger
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <span className="text-foreground font-semibold">
              Phase {phase.number} of 9
            </span>
            {phase.number > currentPhase.number && (
              <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground ml-1">
                Browsing
              </span>
            )}
          </nav>

          {/* Quiet Phase Navigation Stepper */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {TERMINAL_LEDGER_PHASES.map((p) => {
              const isPCompleted = isPhaseCompleted(p.slug);
              const isPViewing = p.slug === phase.slug;
              const isPActiveProgress = progress.currentPhaseSlug === p.slug;

              return (
                <Link
                  key={p.slug}
                  href={`/projects/terminal-ledger/phases/${p.slug}/`}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 ${
                    isPViewing
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : isPCompleted
                      ? "bg-muted/70 text-foreground hover:bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                  title={`${p.number}. ${p.title}${isPActiveProgress ? " (Active Progress)" : ""}`}
                  aria-current={isPViewing ? "page" : undefined}
                >
                  {isPCompleted && !isPViewing ? (
                    <CheckCircle2 className="size-3 text-emerald-600 dark:text-emerald-400" />
                  ) : null}
                  <span>P{p.number}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-[1340px] w-full mx-auto px-4 sm:px-8 py-8 flex flex-col lg:flex-row gap-10">
        {/* Center: Milestone Brief Reader */}
        <main className="flex-1 min-w-0 max-w-3xl">
          {/* Brief Meta Header */}
          <div className="mb-8 pb-6 border-b border-border/70">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
              <span>Terminal Ledger · Milestone Brief</span>
              <span>·</span>
              <span>Phase {phase.number}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              {phase.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-border/40">
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span>Estimated: {phase.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground/60">·</span>
                  <span>Prerequisites: {phase.prerequisites}</span>
                </div>
              </div>

              {/* Quiet Struggle Support Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenJournal}
                  className="auth-secondary-btn py-1 px-2.5 text-xs inline-flex items-center gap-1.5"
                  title="Open Problem Journal"
                >
                  <NotebookPen className="size-3.5" />
                  <span>Problem Journal</span>
                  {currentPhaseDraft && (
                    <span className="size-1.5 rounded-full bg-amber-500" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleOpenHelpLadder}
                  className="auth-secondary-btn py-1 px-2.5 text-xs inline-flex items-center gap-1.5 text-primary border-primary/30 hover:border-primary/60"
                  title="Get Unstuck via evidence-gated Help Ladder"
                >
                  <Compass className="size-3.5" />
                  <span>Get Unstuck</span>
                </button>
              </div>
            </div>
          </div>

          {/* Real Markdown Content */}
          <div className="doc-article-wrapper">
            <DocArticleClient htmlContent={htmlContent} />
          </div>

          {/* Phase Verification & Behavioral Gate */}
          <section
            aria-labelledby="verification-heading"
            className="mt-14 pt-8 border-t border-border/80"
          >
            <div className="p-6 sm:p-8 rounded-xl border border-border bg-card shadow-xs space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-1">
                  <Terminal className="size-3.5" />
                  <span>Local Execution Verification</span>
                </div>
                <h2
                  id="verification-heading"
                  className="text-xl font-bold text-foreground tracking-tight"
                >
                  Phase {phase.number} Behavioral Checklist
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                  Demonstrate these behaviors locally in your own terminal. Check each criterion as you verify that your program meets the specification.
                </p>
              </div>

              {/* Behavioral criteria list */}
              <div className="space-y-2.5 pt-2">
                {phase.criteria.map((criterion, idx) => {
                  const isChecked = checkedItems[idx] === true || isCompleted;
                  return (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 p-3 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer select-none ${
                        isChecked
                          ? "bg-primary/5 border-primary/30 text-foreground"
                          : "bg-muted/20 border-border/70 text-muted-foreground hover:border-border hover:bg-muted/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isCompleted || isPrerequisiteCheckpointDue}
                        onChange={() => toggleCheck(idx)}
                        className="mt-0.5 size-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-background"
                      />
                      <span className="leading-relaxed">{criterion}</span>
                    </label>
                  );
                })}
              </div>

              {/* Completion Action / Status */}
              <div className="pt-4 border-t border-border/70 flex flex-wrap items-center justify-between gap-4">
                {isCompleted ? (
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-4.5" />
                    <span>Phase {phase.number} Verified & Completed</span>
                  </div>
                ) : isPrerequisiteCheckpointDue ? (
                  <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200 w-full space-y-1">
                    <div className="font-semibold text-[11.5px]">
                      Prerequisite: Mentor Checkpoint {duePrerequisiteCheckpointNumber} Required
                    </div>
                    <p className="text-[11.5px] leading-relaxed text-muted-foreground">
                      You can read and plan this milestone in advance, but behavioral verification unlocks only after Mentor Checkpoint {duePrerequisiteCheckpointNumber} sign-off.
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleVerifyAndComplete}
                    disabled={!allChecked}
                    className={`auth-primary-btn text-xs sm:text-sm py-2.5 px-5 ${
                      !allChecked ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span>Verify & Complete Phase {phase.number}</span>
                    <ArrowRight className="size-4" />
                  </button>
                )}

                {/* Quiet next phase shortcut if completed and no active checkpoint block */}
                {isCompleted && !isCheckpointDue && nextPhase && (
                  <button
                    type="button"
                    onClick={handleAdvanceToNext}
                    className="auth-secondary-btn text-xs sm:text-sm py-2 px-4"
                  >
                    <span>Advance to Phase {nextPhase.number} ({nextPhase.title})</span>
                    <ChevronRight className="size-4" />
                  </button>
                )}
              </div>

              {/* If Checkpoint is due after completing Phase 3, 6, or 9 */}
              {isCheckpointDue && (
                <MentorCheckpointBanner
                  checkpointNumber={phase.checkpointNumber!}
                  isCleared={isCheckpointClearedForThisPhase}
                />
              )}

              {/* If Checkpoint was already cleared */}
              {isCompleted && isCheckpointFollowed && isCheckpointClearedForThisPhase && (
                <MentorCheckpointBanner
                  checkpointNumber={phase.checkpointNumber!}
                  isCleared={true}
                  onContinue={handleAdvanceToNext}
                />
              )}
            </div>
          </section>

          {/* Bottom Phase Navigation Footer */}
          <nav
            aria-label="Phase navigation"
            className="mt-12 pt-6 border-t border-border/70 flex items-center justify-between text-xs"
          >
            {prevPhase ? (
              <Link
                href={`/projects/terminal-ledger/phases/${prevPhase.slug}/`}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="size-4" />
                <span>Phase {prevPhase.number}: {prevPhase.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextPhase && (
              <Link
                href={`/projects/terminal-ledger/phases/${nextPhase.slug}/`}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                <span>Phase {nextPhase.number}: {nextPhase.title}</span>
                <ChevronRight className="size-4" />
              </Link>
            )}
          </nav>
        </main>

        {/* Right Aside: Struggle Support, Contextual Knowledge Packs & Local Workstation */}
        <aside className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="sticky top-20 space-y-6">
            {/* Struggle & Debugging Support Card */}
            <div className="p-5 rounded-xl border border-border bg-card shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Compass className="size-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Struggle Support
                  </span>
                </div>
                {currentPhaseDraft && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    Draft Active
                  </span>
                )}
              </div>
              <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                Struggle is where durable understanding forms. Observe concrete evidence before escalating.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleOpenJournal}
                  className="auth-secondary-btn py-2 px-2 text-xs justify-center flex items-center gap-1.5"
                >
                  <NotebookPen className="size-3.5" />
                  <span>Problem Journal</span>
                </button>
                <button
                  type="button"
                  onClick={handleOpenHelpLadder}
                  className="auth-secondary-btn py-2 px-2 text-xs justify-center flex items-center gap-1.5 text-primary border-primary/30 hover:border-primary/60"
                >
                  <Compass className="size-3.5" />
                  <span>Get Unstuck</span>
                </button>
              </div>
            </div>

            {/* Knowledge Packs Card */}
            <div className="p-5 rounded-xl border border-border bg-card shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="size-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Knowledge Packs
                  </span>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {knowledgePacks.length} {knowledgePacks.length === 1 ? "pack" : "packs"}
                </span>
              </div>

              {/* Phase 1 Special Case: Planning 01 integrated in brief */}
              {phase.number === 1 ? (
                <div className="p-3.5 rounded-lg bg-muted/40 border border-border/70 text-xs text-muted-foreground space-y-2">
                  <div className="font-medium text-foreground">
                    Planning 01 Integrated
                  </div>
                  <p className="text-[11.5px] leading-relaxed">
                    Planning 01 curriculum is integrated directly into this milestone brief. No standalone knowledge packs are required for Phase 1.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                    Contextual reference material for new capabilities introduced in this phase. Read when needed.
                  </p>

                  <div className="space-y-2 pt-1">
                    {knowledgePacks.map((pack) => (
                      <button
                        key={pack.id}
                        type="button"
                        onClick={() => setActivePack(pack)}
                        className="w-full text-left p-3 rounded-lg border border-border/80 bg-background hover:bg-muted/50 hover:border-primary/40 transition-all text-xs group"
                      >
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                          <span>{pack.packName}</span>
                          <span className="text-[10px] font-mono font-normal text-muted-foreground">
                            {pack.estimatedTime}
                          </span>
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                          {pack.title}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Local Workstation Reminder */}
            <div className="p-5 rounded-xl border border-border bg-muted/20 text-xs space-y-3">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                <Terminal className="size-4 text-muted-foreground" />
                <span>Local Workstation</span>
              </div>
              <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                All code is written locally in your text editor and executed in your terminal with <code className="font-mono text-[11px] px-1 py-0.5 rounded bg-muted">python3</code>.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Slide-over Knowledge Pack Reader Drawer */}
      <KnowledgePackDrawer
        pack={activePack}
        isOpen={Boolean(activePack)}
        onClose={() => setActivePack(null)}
      />

      {/* Slide-over Problem Journal Drawer */}
      <ProblemJournalDrawer
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        projectSlug="terminal-ledger"
        phaseSlug={phase.slug}
        phaseTitle={phase.title}
        phaseNumber={phase.number}
      />

      {/* Slide-over Help Ladder Drawer */}
      <HelpLadderDrawer
        isOpen={isHelpLadderOpen}
        onClose={() => setIsHelpLadderOpen(false)}
        projectSlug="terminal-ledger"
        phaseSlug={phase.slug}
        phaseTitle={phase.title}
        phaseNumber={phase.number}
        onOpenJournal={handleOpenJournalFromHelp}
        onOpenKnowledgePack={handleOpenKnowledgePackFromHelp}
      />
    </div>
  );
}
