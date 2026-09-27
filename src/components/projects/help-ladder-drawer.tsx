"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
  Compass,
  Lock,
  Unlock,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  NotebookPen,
  ArrowRight,
  ExternalLink,
  Terminal,
  Save,
} from "lucide-react";
import {
  getHelpPathwayForPhase,
  canAccessHelpLevel,
  DEBUGGING_LOOP_STEPS,
} from "@/lib/projects/terminal-ledger/help-ladder";
import {
  ProblemJournalEntry,
  getJournalDraftForPhase,
  saveOrUpdateDraft,
  recordHelpLevelForJournal,
} from "@/learning-state/problem-journal";

interface HelpLadderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  projectSlug: string;
  phaseSlug: string;
  phaseTitle: string;
  phaseNumber: number;
  onOpenJournal: () => void;
  onOpenKnowledgePack: (packSlug: string) => void;
}

export function HelpLadderDrawer({
  isOpen,
  onClose,
  projectSlug,
  phaseSlug,
  phaseTitle,
  phaseNumber,
  onOpenJournal,
  onOpenKnowledgePack,
}: HelpLadderDrawerProps) {
  const pathway = getHelpPathwayForPhase(phaseSlug);
  const currentDraft = getJournalDraftForPhase(projectSlug, phaseSlug);

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Keyboard navigation & ESC close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus close button on open
  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen || !pathway) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-12">
        <div
          ref={drawerRef}
          className="w-screen max-w-3xl bg-background border-l border-border shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-200"
        >
          <HelpLadderContent
            key={`${phaseSlug}-${currentDraft?.id || "draft"}`}
            pathway={pathway}
            currentDraft={currentDraft}
            projectSlug={projectSlug}
            phaseSlug={phaseSlug}
            phaseTitle={phaseTitle}
            phaseNumber={phaseNumber}
            closeBtnRef={closeBtnRef}
            onClose={onClose}
            onOpenJournal={onOpenJournal}
            onOpenKnowledgePack={onOpenKnowledgePack}
          />
        </div>
      </div>
    </div>
  );
}

interface HelpLadderContentProps {
  pathway: ReturnType<typeof getHelpPathwayForPhase> & object;
  currentDraft?: ProblemJournalEntry;
  projectSlug: string;
  phaseSlug: string;
  phaseTitle: string;
  phaseNumber: number;
  closeBtnRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onOpenJournal: () => void;
  onOpenKnowledgePack: (packSlug: string) => void;
}

function HelpLadderContent({
  pathway,
  currentDraft,
  projectSlug,
  phaseSlug,
  phaseTitle,
  phaseNumber,
  closeBtnRef,
  onClose,
  onOpenJournal,
  onOpenKnowledgePack,
}: HelpLadderContentProps) {
  // Help escalation state
  const [activeLevel, setActiveLevel] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [viewedL0L1] = useState(true);
  const [l4Viewed, setL4Viewed] = useState(false);

  // In-line entry inputs for L3 gate if not already filled
  const [inlineExpectation, setInlineExpectation] = useState(currentDraft?.expectation || "");
  const [inlineObservation, setInlineObservation] = useState(currentDraft?.observation || "");
  const [inlineEvidence, setInlineEvidence] = useState(currentDraft?.evidence || "");
  const [gateNotice, setGateNotice] = useState<string | null>(null);

  // Sync highest help level to journal
  useEffect(() => {
    if (activeLevel > 0) {
      recordHelpLevelForJournal(projectSlug, phaseSlug, activeLevel);
    }
  }, [activeLevel, projectSlug, phaseSlug]);

  const accessContext = {
    viewedL0L1,
    currentDraft,
    l4Viewed,
  };

  const handleSelectLevel = (lvl: 0 | 1 | 2 | 3 | 4 | 5) => {
    const access = canAccessHelpLevel(lvl, accessContext);
    if (!access.allowed) {
      setGateNotice(access.reason || "This level is currently locked.");
      return;
    }
    setGateNotice(null);
    setActiveLevel(lvl);
    if (lvl === 4) {
      setL4Viewed(true);
    }
  };

  const handleInlineSaveForL3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineExpectation.trim() || !inlineObservation.trim()) {
      setGateNotice("Please enter both your Expectation and Observation to proceed.");
      return;
    }
    saveOrUpdateDraft(projectSlug, phaseSlug, {
      expectation: inlineExpectation,
      observation: inlineObservation,
      evidence: inlineEvidence,
    });
    setGateNotice(null);
    setActiveLevel(3);
  };

  const handleInlineSaveForL4 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineEvidence.trim()) {
      setGateNotice("Please document what print statements, types, or tests you ran.");
      return;
    }
    saveOrUpdateDraft(projectSlug, phaseSlug, {
      expectation: inlineExpectation,
      observation: inlineObservation,
      evidence: inlineEvidence,
    });
    setGateNotice(null);
    setActiveLevel(4);
    setL4Viewed(true);
  };

  const levelTabs: Array<{
    level: 0 | 1 | 2 | 3 | 4 | 5;
    title: string;
    tag: string;
  }> = [
    { level: 0, title: "Think / Inspect", tag: "Observe first" },
    { level: 1, title: "Relevant Resource", tag: "Knowledge Pack & Manual" },
    { level: 2, title: "Directional Hint", tag: "Concept to inspect" },
    { level: 3, title: "Structural Hint", tag: "Requires Expectation & Observation" },
    { level: 4, title: "Guided Diagnosis", tag: "Requires Journal Evidence" },
    { level: 5, title: "Example in Another Domain", tag: "Unrelated domain pattern" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/10 bg-background/80 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-2.5 min-w-0 pr-4">
              <span className="p-1.5 rounded-md bg-primary/10 text-primary shrink-0">
                <Compass className="size-4" />
              </span>
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block truncate">
                  Help Ladder · Evidence-Gated Escalation
                </span>
                <span className="text-xs font-semibold text-foreground truncate block">
                  Phase {phaseNumber}: {phaseTitle}
                </span>
              </div>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close help ladder"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Calm Framing Notice */}
          <div className="px-6 sm:px-8 py-3 bg-muted/30 border-b border-border/70 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
            <p className="text-[11.5px] leading-relaxed">
              Productive struggle builds mental models. PipLearn reveals only as much help as needed. Return to your editor between levels.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenJournal();
              }}
              className="text-[11px] font-medium text-primary hover:underline shrink-0 flex items-center gap-1"
            >
              <NotebookPen className="size-3" />
              <span>Open Journal</span>
            </button>
          </div>

          {/* Stepper Navigation: 6 Levels */}
          <div className="px-6 sm:px-8 pt-4 pb-2 border-b border-border/60 shrink-0 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 min-w-max pb-2">
              {levelTabs.map((tab) => {
                const access = canAccessHelpLevel(tab.level, accessContext);
                const isSelected = activeLevel === tab.level;

                return (
                  <button
                    key={tab.level}
                    type="button"
                    onClick={() => handleSelectLevel(tab.level)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : access.allowed
                        ? "bg-muted/60 text-foreground hover:bg-muted"
                        : "text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/30"
                    }`}
                  >
                    {!access.allowed ? (
                      <Lock className="size-3 text-muted-foreground/60" />
                    ) : isSelected ? (
                      <CheckCircle2 className="size-3" />
                    ) : (
                      <Unlock className="size-3 text-muted-foreground" />
                    )}
                    <span>L{tab.level}</span>
                    <span className="hidden sm:inline font-sans text-[11px]">
                      {tab.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
            {/* Gate Error Alert if clicked locked level */}
            {gateNotice && (
              <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-400 space-y-1 animate-in fade-in duration-150">
                <div className="font-semibold flex items-center gap-1.5">
                  <Lock className="size-3.5" />
                  <span>Prerequisite Required</span>
                </div>
                <p className="text-[11.5px] leading-relaxed">{gateNotice}</p>
              </div>
            )}

            {/* LEVEL 0: Think / Inspect */}
            {activeLevel === 0 && (
              <div className="space-y-6">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-primary font-medium">
                    Level 0 · Think / Inspect
                  </div>
                  <h2 className="text-xl font-bold text-foreground mt-1 mb-2">
                    Observe Concrete Evidence First
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Do not edit code or plans yet. Calm inspection pinpoints the exact boundary where reality diverges from expectation.
                  </p>
                </div>

                {/* Socratic Question */}
                <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
                  <div className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono">
                    Observation Prompt
                  </div>
                  <p className="text-sm font-medium text-foreground leading-relaxed italic">
                    &ldquo;{pathway.l0.question}&rdquo;
                  </p>
                </div>

                {/* Inspection Points */}
                <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                  <div className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono">
                    Things to Check
                  </div>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {pathway.l0.inspectionPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="size-4 rounded-full bg-muted text-foreground flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 7-Step Debugging Loop Checklist */}
                <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
                  <div className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono">
                    The 7-Step Debugging Loop
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {DEBUGGING_LOOP_STEPS.map((step) => (
                      <div
                        key={step.step}
                        className="p-2.5 rounded-lg border border-border/70 bg-background/70 space-y-0.5"
                      >
                        <div className="font-semibold text-foreground flex items-center gap-1.5">
                          <span className="font-mono text-[10px] text-primary">#{step.step}</span>
                          <span>{step.label}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Level Action */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">
                    Ready to consult the exact documentation?
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSelectLevel(1)}
                    className="auth-primary-btn py-1.5 px-3 text-xs flex items-center gap-1.5"
                  >
                    <span>Proceed to L1: Relevant Resources</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* LEVEL 1: Exact Resources */}
            {activeLevel === 1 && (
              <div className="space-y-6">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-primary font-medium">
                    Level 1 · Relevant Resource
                  </div>
                  <h2 className="text-xl font-bold text-foreground mt-1 mb-2">
                    Consult Authoritative Resources
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The capability you need is already taught in the curriculum. Read the specific section before escalating.
                  </p>
                </div>

                <div className="space-y-3">
                  {pathway.l1.resources.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="size-4 text-primary" />
                          <span className="text-xs font-semibold text-foreground">
                            {res.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase">
                          {res.kind === "knowledge-pack" ? "Knowledge Pack" : "Starting Manual"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {res.description}
                      </p>
                      <div className="pt-1">
                        {res.kind === "knowledge-pack" && res.packSlug ? (
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onOpenKnowledgePack(res.packSlug!);
                            }}
                            className="auth-secondary-btn py-1 px-2.5 text-xs inline-flex items-center gap-1.5"
                          >
                            <span>Open Knowledge Pack</span>
                            <ChevronRight className="size-3.5" />
                          </button>
                        ) : res.manualSlug ? (
                          <Link
                            href={`/manual/${res.manualSlug}/`}
                            onClick={onClose}
                            className="auth-secondary-btn py-1 px-2.5 text-xs inline-flex items-center gap-1.5"
                          >
                            <span>Read Manual Section</span>
                            <ExternalLink className="size-3.5" />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next Level Action */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleSelectLevel(0)}
                    className="auth-secondary-btn py-1.5 px-3 text-xs"
                  >
                    Back to L0
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectLevel(2)}
                    className="auth-primary-btn py-1.5 px-3 text-xs flex items-center gap-1.5"
                  >
                    <span>Proceed to L2: Directional Hint</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* LEVEL 2: Directional Hint */}
            {activeLevel === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-primary font-medium">
                    Level 2 · Directional Hint
                  </div>
                  <h2 className="text-xl font-bold text-foreground mt-1 mb-2">
                    Identify the Conceptual Mechanism
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This explains which mechanism is at play in the abstract. It contains no project-specific code or finished wiring.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-primary/20 bg-muted/20 space-y-3">
                  <div className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Compass className="size-4 text-primary" />
                    <span>Directional Hint</span>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                    {pathway.l2.directionalHint}
                  </p>
                </div>

                {/* Next Level Gate Notice */}
                <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                  <div className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Lock className="size-3.5 text-muted-foreground" />
                    <span>L3 Structural Hint</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    L3 describes the shape of data flow and boundary control. It requires you to state your Expectation and Observation before unlocking.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSelectLevel(3)}
                    className="auth-primary-btn py-1.5 px-3.5 text-xs flex items-center gap-1.5"
                  >
                    <span>Request L3: Structural Hint</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* LEVEL 3: Structural Hint */}
            {activeLevel === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-primary font-medium">
                    Level 3 · Structural Hint
                  </div>
                  <h2 className="text-xl font-bold text-foreground mt-1 mb-2">
                    Data Flow and Component Boundaries
                  </h2>
                </div>

                {/* Gate: If expectation & observation are missing, prompt inline */}
                {(!currentDraft?.expectation?.trim() || !currentDraft?.observation?.trim()) &&
                (!inlineExpectation.trim() || !inlineObservation.trim()) ? (
                  <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-4">
                    <div className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Lock className="size-4 text-amber-600 dark:text-amber-400" />
                      <span>Evidence Gate: Expectation & Observation</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Before inspecting structural flow, formulate what you were attempting to do and what concrete result you observed. This automatically saves to your Problem Journal draft.
                    </p>

                    <form onSubmit={handleInlineSaveForL3} className="space-y-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-mono font-medium text-foreground mb-1">
                          1. Expectation (What was the program supposed to do?)
                        </label>
                        <textarea
                          value={inlineExpectation}
                          onChange={(e) => setInlineExpectation(e.target.value)}
                          rows={2}
                          placeholder="e.g. Entering '15.00' should record the entry and show it in the list..."
                          className="w-full text-xs rounded-md border border-input bg-background px-3 py-2 text-foreground"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-medium text-foreground mb-1">
                          2. Observation (What actually occurred in your terminal?)
                        </label>
                        <textarea
                          value={inlineObservation}
                          onChange={(e) => setInlineObservation(e.target.value)}
                          rows={2}
                          placeholder="e.g. Program crashed with ValueError: could not convert string to float..."
                          className="w-full text-xs font-mono rounded-md border border-input bg-background px-3 py-2 text-foreground"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="auth-primary-btn py-1.5 px-3.5 text-xs flex items-center gap-1.5"
                      >
                        <Save className="size-3.5" />
                        <span>Save to Journal Draft & Reveal L3</span>
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Unlocked L3 Content */}
                    <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                      <div className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono">
                        Structure & Approach
                      </div>
                      <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                        {pathway.l3.structuralHint}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-primary/20 bg-muted/20 space-y-2">
                      <div className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono">
                        Data Flow
                      </div>
                      <div className="text-xs font-mono text-foreground p-3 rounded-lg bg-background border border-border">
                        {pathway.l3.dataFlowDescription}
                      </div>
                    </div>

                    {/* Next Level Action */}
                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleSelectLevel(2)}
                        className="auth-secondary-btn py-1.5 px-3 text-xs"
                      >
                        Back to L2
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectLevel(4)}
                        className="auth-primary-btn py-1.5 px-3 text-xs flex items-center gap-1.5"
                      >
                        <span>Proceed to L4: Guided Diagnosis</span>
                        <ArrowRight className="size-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* LEVEL 4: Guided Diagnosis */}
            {activeLevel === 4 && (
              <div className="space-y-6">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-primary font-medium">
                    Level 4 · Guided Diagnosis
                  </div>
                  <h2 className="text-xl font-bold text-foreground mt-1 mb-2">
                    Guided Diagnostic Steps
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Run these exact isolation steps against your own code. Do not guess; observe variables and runtime types.
                  </p>
                </div>

                {/* Gate: If evidence is missing, prompt inline */}
                {!currentDraft?.evidence?.trim() && !inlineEvidence.trim() ? (
                  <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-4">
                    <div className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Lock className="size-4 text-amber-600 dark:text-amber-400" />
                      <span>Evidence Gate: Record Investigation Steps</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      L4 requires active evidence of investigation. Enter the print statements, types, or experiments you have inspected so far.
                    </p>

                    <form onSubmit={handleInlineSaveForL4} className="space-y-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-mono font-medium text-foreground mb-1">
                          Evidence Used (What print statements or checks did you run?)
                        </label>
                        <textarea
                          value={inlineEvidence}
                          onChange={(e) => setInlineEvidence(e.target.value)}
                          rows={3}
                          placeholder="e.g. Printed type(value) before line 30, verified file exists with os.path.exists..."
                          className="w-full text-xs rounded-md border border-input bg-background px-3 py-2 text-foreground"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="auth-primary-btn py-1.5 px-3.5 text-xs flex items-center gap-1.5"
                      >
                        <Save className="size-3.5" />
                        <span>Save Evidence & Unlock L4 Steps</span>
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Unlocked L4 Protocol */}
                    <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                      <div className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono">
                        Diagnostic Steps
                      </div>
                      <ul className="space-y-3 text-xs">
                        {pathway.l4.protocolSteps.map((step, idx) => (
                          <li
                            key={idx}
                            className="p-3 rounded-lg border border-border/80 bg-background/80 flex items-start gap-2.5"
                          >
                            <span className="size-5 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed text-foreground">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Next Level Gate Notice */}
                    <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
                      <div className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <Lock className="size-3.5 text-muted-foreground" />
                        <span>L5 Example in Another Domain</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        L5 displays a minimal working solution to this capability in an <strong>unrelated domain</strong> (e.g. plants, weather readings, high scores).
                      </p>
                      <button
                        type="button"
                        onClick={() => handleSelectLevel(5)}
                        className="auth-secondary-btn py-1.5 px-3.5 text-xs flex items-center gap-1.5"
                      >
                        <span>View L5 Example in Another Domain</span>
                        <ArrowRight className="size-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* LEVEL 5: Protected Solution in Unrelated Domain */}
            {activeLevel === 5 && (
              <div className="space-y-6">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-primary font-medium">
                    Level 5 · Example in Another Domain
                  </div>
                  <h2 className="text-xl font-bold text-foreground mt-1 mb-2">
                    Pattern in Another Domain
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This example illustrates the pattern using <strong>{pathway.l5.unrelatedDomain}</strong>. The mental work of translating it into your own design remains yours.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Context Callout */}
                  <div className="p-3.5 rounded-lg bg-muted/30 border border-border/70 text-xs text-muted-foreground space-y-1">
                    <div className="font-semibold text-foreground font-mono uppercase text-[11px]">
                      Another Domain: {pathway.l5.unrelatedDomain}
                    </div>
                    <p className="text-[11.5px] leading-relaxed">{pathway.l5.context}</p>
                  </div>

                  {/* Code Snippet */}
                  <div className="rounded-xl border border-border bg-zinc-950 text-zinc-100 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-[11px] text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Terminal className="size-3.5 text-emerald-400" />
                        <span>{pathway.phaseNumber === 1 ? "behavior-spec.txt" : "python3 example.py"}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                        {pathway.phaseNumber === 1 ? "Behavior Specification" : "Example Pattern"}
                      </span>
                    </div>
                    <pre className="leading-relaxed whitespace-pre font-mono">
                      <code>{pathway.l5.codeExample}</code>
                    </pre>
                  </div>

                  {/* Pedagogical Explanation */}
                  <div className="p-4 rounded-xl border border-border bg-card space-y-1.5">
                    <div className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono">
                      Applying This Pattern
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pathway.l5.explanation}
                    </p>
                  </div>
                </div>

                {/* Return to Work CTA */}
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleSelectLevel(4)}
                    className="auth-secondary-btn py-1.5 px-3 text-xs"
                  >
                    Back to L4
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="auth-primary-btn py-1.5 px-3.5 text-xs flex items-center gap-1.5"
                  >
                    <span>Return to Terminal & Build</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
    </>
  );
}
