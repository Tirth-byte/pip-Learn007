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
import "@/styles/authenticated.css";
import "@/app/learn/doc-reader.css";

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
    startProject();
    completePhase(phase.slug);
  };

  const handleAdvanceToNext = () => {
    if (nextPhase) {
      router.push(`/projects/terminal-ledger/phases/${nextPhase.slug}/`);
    }
  };

  return (
    <div className="doc-reader-root min-h-screen flex flex-col text-foreground selection:bg-foreground selection:text-background">
      {/* ============================================================== */}
      {/* 1. QUIET TOP WORKSPACE STEPPER SUB-HEADER                      */}
      {/* ============================================================== */}
      <header className="sticky top-15 z-30 border-b border-foreground/8 bg-background/80 backdrop-blur-xl px-4 sm:px-8 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Breadcrumb Trail */}
          <nav className="flex items-center gap-2 text-xs font-mono text-muted-foreground" aria-label="Breadcrumb">
            <Link
              href="/projects/"
              className="hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <span className="text-foreground/20">/</span>
            <Link
              href="/projects/#roadmap"
              className="hover:text-foreground transition-colors"
            >
              Terminal Ledger
            </Link>
            <span className="text-foreground/20">/</span>
            <span className="text-foreground font-semibold">
              Phase {phase.number} of 9
            </span>
            {phase.number > currentPhase.number && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-foreground/5 text-muted-foreground ml-1">
                Browsing
              </span>
            )}
          </nav>

          {/* Quiet Phase Navigation Stepper */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {TERMINAL_LEDGER_PHASES.map((p) => {
              const isPCompleted = isPhaseCompleted(p.slug);
              const isPViewing = p.slug === phase.slug;
              const isPActiveProgress = progress.currentPhaseSlug === p.slug;

              return (
                <Link
                  key={p.slug}
                  href={`/projects/terminal-ledger/phases/${p.slug}/`}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 ${
                    isPViewing
                      ? "bg-foreground text-background font-medium shadow-xs"
                      : isPCompleted
                      ? "bg-foreground/5 text-foreground hover:bg-foreground/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  }`}
                  title={`${p.number}. ${p.title}${isPActiveProgress ? " (Active Progress)" : ""}`}
                  aria-current={isPViewing ? "page" : undefined}
                >
                  {isPCompleted && !isPViewing ? (
                    <CheckCircle2 className="size-3 text-emerald-500" />
                  ) : null}
                  <span>P{p.number < 10 ? `0${p.number}` : p.number}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. MAIN WORKSPACE CONTAINER                                    */}
      {/* ============================================================== */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-10 py-8 lg:py-10 flex flex-col lg:flex-row gap-10">

        {/* Center: Dominant Milestone Brief & Verification Canvas */}
        <main id="main-content" tabIndex={-1} className="flex-1 min-w-0 max-w-4xl outline-none">
          {/* Phase Orientation Hero Header */}
          <div className="mb-8 pb-8 border-b border-foreground/10">
            {/* Eyebrow */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-3 font-mono">
              <span className="font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Terminal Ledger · Milestone Brief
              </span>
              <span className="text-foreground/20">•</span>
              <span className="text-foreground font-semibold">
                Phase {phase.number} of 9
              </span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20">
                  <CheckCircle2 className="size-3" />
                  <span>Verified & Complete</span>
                </span>
              )}
            </div>

            {/* Editorial Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-semibold tracking-[-0.035em] text-foreground leading-[1.12] mb-4 text-balance">
              {phase.title}
            </h1>

            {/* Concise Functional Orientation Summary: "What am I building right now?" */}
            <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-6 max-w-3xl">
              {phase.summary}
            </p>

            {/* Contextual Action & Metadata Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-foreground/10">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-muted-foreground/70" />
                  <span>{phase.estimatedTime} Expected</span>
                </div>
                <span className="text-foreground/20">·</span>
                <div>
                  <span>Prerequisites: {phase.prerequisites}</span>
                </div>
              </div>

              {/* Integrated Contextual Tools: "Where do I look when stuck?" */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenJournal}
                  className="auth-btn-secondary py-1.5 px-3 text-xs inline-flex items-center gap-1.5 h-8.5"
                  title="Document technical reflections and debugging history"
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
                  className="auth-btn-secondary py-1.5 px-3 text-xs inline-flex items-center gap-1.5 h-8.5 font-medium"
                  title="Access evidence-gated debugging assistance"
                >
                  <Compass className="size-3.5" />
                  <span>Get Unstuck</span>
                </button>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* PRIMARY WORK SURFACE: MONOLITHIC READING CANVAS                */}
          {/* ============================================================== */}
          <article className="doc-reader-surface p-6 sm:p-12 lg:p-14 mb-14">
            {/* Real Markdown Content */}
            <div className="doc-article-wrapper">
              <DocArticleClient htmlContent={htmlContent} />
            </div>

            {/* ============================================================== */}
            {/* BEHAVIORAL VERIFICATION & COMPLETION GATE                      */}
            {/* ============================================================== */}
            <section
              aria-labelledby="verification-heading"
              className="mt-16 pt-10 border-t border-foreground/10"
            >
              <div className="auth-surface-composed p-6 sm:p-10 rounded-2xl space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2">
                    <Terminal className="size-3.5 text-foreground/70" />
                    <span>Local Terminal Execution Verification</span>
                  </div>
                  <h2
                    id="verification-heading"
                    className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight"
                  >
                    Phase {phase.number} Behavioral Checklist
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-2xl">
                    Demonstrate these behaviors locally in your terminal. Check each criterion once verified in your running code.
                  </p>
                </div>

                {/* Behavioral criteria list */}
                <div className="space-y-2.5 pt-1">
                  {phase.criteria.map((criterion, idx) => {
                    const isChecked = checkedItems[idx] === true || isCompleted;
                    return (
                      <label
                        key={idx}
                        className={`flex items-start gap-3.5 p-4 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer select-none ${
                          isChecked
                            ? "bg-foreground/5 border-foreground/20 text-foreground"
                            : "bg-foreground/[0.015] border-foreground/8 text-muted-foreground hover:border-foreground/15 hover:bg-foreground/[0.03]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isCompleted || isPrerequisiteCheckpointDue}
                          onChange={() => toggleCheck(idx)}
                          className="mt-0.5 size-4 rounded border-foreground/30 text-foreground focus:ring-foreground accent-foreground cursor-pointer"
                        />
                        <span className="leading-relaxed">{criterion}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Completion Action / Status */}
                <div className="pt-4 border-t border-foreground/10 flex flex-wrap items-center justify-between gap-4">
                  {isCompleted ? (
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-500 font-mono">
                      <CheckCircle2 className="size-4.5" />
                      <span>Phase {phase.number} Verified & Completed</span>
                    </div>
                  ) : isPrerequisiteCheckpointDue ? (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-800 dark:text-amber-200 w-full space-y-1">
                      <div className="font-semibold text-xs font-mono">
                        Prerequisite: Mentor Checkpoint {duePrerequisiteCheckpointNumber} Defense Required
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        You can plan this milestone in advance, but verification unlocks after Mentor Checkpoint {duePrerequisiteCheckpointNumber} defense sign-off.
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleVerifyAndComplete}
                      disabled={!allChecked}
                      className={`auth-btn-primary text-xs sm:text-sm ${
                        !allChecked ? "opacity-40 cursor-not-allowed" : ""
                      }`}
                    >
                      <CheckCircle2 className="size-4" />
                      <span>Verify & Complete Phase {phase.number}</span>
                      <ArrowRight className="size-4" />
                    </button>
                  )}

                  {isCompleted && !isCheckpointDue && nextPhase && (
                    <button
                      type="button"
                      onClick={handleAdvanceToNext}
                      className="auth-btn-secondary text-xs sm:text-sm"
                    >
                      <span>Advance to Phase {nextPhase.number}: {nextPhase.title}</span>
                      <ChevronRight className="size-4" />
                    </button>
                  )}
                </div>

                {/* Checkpoint Banners */}
                {isCheckpointDue && (
                  <MentorCheckpointBanner
                    checkpointNumber={phase.checkpointNumber!}
                    isCleared={isCheckpointClearedForThisPhase}
                  />
                )}

                {isCompleted && isCheckpointFollowed && isCheckpointClearedForThisPhase && (
                  <MentorCheckpointBanner
                    checkpointNumber={phase.checkpointNumber!}
                    isCleared={true}
                    onContinue={handleAdvanceToNext}
                  />
                )}
              </div>
            </section>

            {/* Bottom Phase Navigation Pager */}
            <nav
              aria-label="Phase navigation"
              className="mt-14 pt-8 border-t border-foreground/10 flex items-center justify-between text-xs font-mono"
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

              {nextPhase ? (
                <Link
                  href={`/projects/terminal-ledger/phases/${nextPhase.slug}/`}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  <span>Phase {nextPhase.number}: {nextPhase.title}</span>
                  <ChevronRight className="size-4" />
                </Link>
              ) : isCompleted && isCheckpointClearedForThisPhase ? (
                <Link
                  href="/projects/terminal-ledger/review/"
                  className="flex items-center gap-1.5 text-foreground hover:underline transition-colors font-medium"
                >
                  <span>Project Retrospective</span>
                  <ChevronRight className="size-4" />
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </article>
        </main>

        {/* ============================================================== */}
        {/* 3. CONTEXTUAL TOOLS COMPANION (RIGHT RAIL)                     */}
        {/* ============================================================== */}
        <aside className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="sticky top-28 space-y-6">
            {/* Knowledge Packs Surface */}
            <div className="auth-surface-composed p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-foreground/10">
                <div className="flex items-center gap-2">
                  <BookOpen className="size-4 text-foreground/80" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-foreground">
                    Knowledge Packs
                  </span>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {knowledgePacks.length} {knowledgePacks.length === 1 ? "pack" : "packs"}
                </span>
              </div>

              {phase.number === 1 ? (
                <div className="p-3.5 rounded-xl bg-foreground/[0.02] border border-foreground/8 text-xs text-muted-foreground space-y-1">
                  <div className="font-semibold text-foreground">
                    Planning 01 Integrated
                  </div>
                  <p className="leading-relaxed text-[12px]">
                    Phase 1 architectural curriculum is integrated directly into this milestone brief.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {knowledgePacks.map((pack) => (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => setActivePack(pack)}
                      className="w-full text-left p-3.5 rounded-xl border border-foreground/8 bg-foreground/[0.015] hover:bg-foreground/[0.04] hover:border-foreground/15 transition-all group"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-1">
                        <span>{pack.estimatedTime}</span>
                        <ChevronRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <div className="font-medium text-xs text-foreground group-hover:text-foreground transition-colors leading-snug">
                        {pack.title}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Struggle & Debugging Companion */}
            <div className="auth-surface-composed p-6 rounded-2xl space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-foreground/10">
                <div className="flex items-center gap-2">
                  <Compass className="size-4 text-foreground/80" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-foreground">
                    Struggle Support
                  </span>
                </div>
                {currentPhaseDraft && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium border border-amber-500/20">
                    Draft Active
                  </span>
                )}
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Struggle is where understanding forms. Observe concrete runtime evidence before escalating.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleOpenJournal}
                  className="auth-btn-secondary py-2 px-2 text-xs justify-center flex items-center gap-1.5 h-9"
                >
                  <NotebookPen className="size-3.5" />
                  <span>Journal</span>
                </button>
                <button
                  type="button"
                  onClick={handleOpenHelpLadder}
                  className="auth-btn-secondary py-2 px-2 text-xs justify-center flex items-center gap-1.5 h-9 font-medium"
                >
                  <Compass className="size-3.5" />
                  <span>Get Unstuck</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ============================================================== */}
      {/* 4. CONTEXTUAL DRAWERS (Knowledge Pack, Journal, Help Ladder)   */}
      {/* ============================================================== */}
      <KnowledgePackDrawer
        isOpen={activePack !== null}
        onClose={() => setActivePack(null)}
        pack={activePack}
      />

      <ProblemJournalDrawer
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        projectSlug="terminal-ledger"
        phaseSlug={phase.slug}
        phaseTitle={phase.title}
        phaseNumber={phase.number}
      />

      <HelpLadderDrawer
        isOpen={isHelpLadderOpen}
        onClose={() => setIsHelpLadderOpen(false)}
        projectSlug="terminal-ledger"
        phaseSlug={phase.slug}
        phaseTitle={phase.title}
        phaseNumber={phase.number}
        onOpenKnowledgePack={handleOpenKnowledgePackFromHelp}
        onOpenJournal={handleOpenJournalFromHelp}
      />
    </div>
  );
}
