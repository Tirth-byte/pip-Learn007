"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  FolderKanban,
  AlertCircle,
  CheckCircle2,
  Check,
  ChevronDown,
  Sparkles,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { AuthShell } from "@/components/shell/auth-shell";
import {
  useProblemJournal,
  ProblemJournalEntry,
  saveOrUpdateDraft,
  completeJournalEntry,
  getJournalDraftForPhase,
} from "@/learning-state/problem-journal";
import { ProblemJournalDrawer } from "@/components/projects/problem-journal-drawer";
import {
  TERMINAL_LEDGER_PHASES,
  getPhaseBySlug,
} from "@/lib/projects/terminal-ledger/structure";
import "@/styles/authenticated.css";
import "./journal-hero.css";

export default function JournalPage() {
  const entries = useProblemJournal();
  const [selectedPhaseSlug, setSelectedPhaseSlug] = useState<string>("phase-01");
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);
  const [formData, setFormData] = useState(() => {
    const draft = getJournalDraftForPhase("terminal-ledger", "phase-01");
    return {
      expectation: draft?.expectation || "",
      observation: draft?.observation || "",
      cause: draft?.cause || "",
      evidence: draft?.evidence || "",
      fix: draft?.fix || "",
      lesson: draft?.lesson || "",
    };
  });
  const [entryStatus, setEntryStatus] = useState<"draft" | "completed">(() => {
    const draft = getJournalDraftForPhase("terminal-ledger", "phase-01");
    return draft?.status || "draft";
  });
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerEntryId, setDrawerEntryId] = useState<string | null>(null);

  // Subtle interactive pointer reflection for the crystal cube
  const [cubeMouse, setCubeMouse] = useState<{ x: number; y: number } | null>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  const handlePhaseChange = (phaseSlug: string) => {
    setSelectedPhaseSlug(phaseSlug);
    const draft = getJournalDraftForPhase("terminal-ledger", phaseSlug);
    if (draft) {
      setActiveEntryId(draft.id);
      setFormData({
        expectation: draft.expectation || "",
        observation: draft.observation || "",
        cause: draft.cause || "",
        evidence: draft.evidence || "",
        fix: draft.fix || "",
        lesson: draft.lesson || "",
      });
      setEntryStatus(draft.status);
    } else {
      setActiveEntryId(null);
      setFormData({
        expectation: "",
        observation: "",
        cause: "",
        evidence: "",
        fix: "",
        lesson: "",
      });
      setEntryStatus("draft");
    }
  };

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEntry = () => {
    const saved = saveOrUpdateDraft(
      "terminal-ledger",
      selectedPhaseSlug,
      formData,
      activeEntryId || undefined
    );
    setActiveEntryId(saved.id);
    setSaveStatus("Saved to journal");
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const handleMarkResolved = () => {
    // If not saved yet, save first
    const current = saveOrUpdateDraft(
      "terminal-ledger",
      selectedPhaseSlug,
      formData,
      activeEntryId || undefined
    );
    const resolved = completeJournalEntry(current.id, formData);
    if (resolved) {
      setActiveEntryId(resolved.id);
      setEntryStatus("completed");
      setSaveStatus("Marked as resolved");
      setTimeout(() => setSaveStatus(null), 2500);
    }
  };

  const handleNewEntry = () => {
    setActiveEntryId(null);
    setFormData({
      expectation: "",
      observation: "",
      cause: "",
      evidence: "",
      fix: "",
      lesson: "",
    });
    setEntryStatus("draft");
  };

  const handleSelectEntryFromList = (entry: ProblemJournalEntry) => {
    setActiveEntryId(entry.id);
    setSelectedPhaseSlug(entry.phase);
    setFormData({
      expectation: entry.expectation || "",
      observation: entry.observation || "",
      cause: entry.cause || "",
      evidence: entry.evidence || "",
      fix: entry.fix || "",
      lesson: entry.lesson || "",
    });
    setEntryStatus(entry.status);

    // Smooth scroll up to crystal cube
    if (cubeRef.current) {
      cubeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleOpenDrawerForEntry = (e: React.MouseEvent, entryId: string) => {
    e.stopPropagation();
    setDrawerEntryId(entryId);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerEntryId(null);
  };

  const handleCubePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCubeMouse({ x, y });
  };

  const handleCubePointerLeave = () => {
    setCubeMouse(null);
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  const activePhaseObj = getPhaseBySlug(selectedPhaseSlug);
  const tiltX = cubeMouse ? ((cubeMouse.y - 50) * -0.025).toFixed(2) : "0";
  const tiltY = cubeMouse ? ((cubeMouse.x - 50) * 0.025).toFixed(2) : "0";

  return (
    <AuthShell activeItem="journal" environment="journal">
      <main className="journal-cinematic-page flex-1 overflow-y-auto">
        {/* ================================================================ */}
        {/* 1. CINEMATIC PROBLEM JOURNAL HERO (PRESERVED AT THE TOP)          */}
        {/* ================================================================ */}
        <section className="journal-cinematic-hero" aria-labelledby="problem-journal-title">
          <Image
            src="/images/journal/problem-journal-hero-4k.png"
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="journal-cinematic-hero-art"
          />

          <div className="journal-cinematic-content">
            <span className="journal-cinematic-eyebrow">Journal</span>
            <h1 id="problem-journal-title" className="journal-cinematic-title">
              Problem<br />Journal
            </h1>
            <p className="journal-cinematic-description">
              A quiet log of runtime surprises, diagnosed causes, and durable lessons discovered while building your projects.
            </p>

            <div className="journal-cinematic-actions">
              <Link
                href="/projects/"
                className="journal-hero-back-link"
              >
                <FolderKanban className="size-3.5" />
                <span>Back to Terminal Ledger</span>
              </Link>
            </div>
          </div>

          {/* Subtle smooth fade seam between image hero and content */}
          <div className="journal-hero-fade-seam" aria-hidden="true" />
        </section>

        {/* ================================================================ */}
        {/* 2. RECORDED ENTRIES SECTION (BLACK BACKGROUND)                    */}
        {/* ================================================================ */}
        <section className="journal-workspace-section" aria-label="Problem Journal Workspace">
          <div className="journal-workspace-container">
            {/* Section Lead-in */}
            <div className="journal-section-intro">
              <span className="journal-intro-eyebrow">Mental Model Shifts · Defensive Documentation</span>
              <h2 className="journal-intro-title">Record discrepancies as they occur.</h2>
              <p className="journal-intro-body">
                When runtime behavior diverges from expectation, resist the urge to immediately guess a patch.
                Anchor the exact symptom, articulate the verified cause, and commit the lesson to memory.
              </p>
            </div>

            {/* ============================================================ */}
            {/* JOURNAL ENTRY CUBE / CRYSTAL CARD INSIDE WORKSPACE            */}
            {/* ============================================================ */}
            <div
              ref={cubeRef}
              className="crystal-journal-cube-wrapper"
              onPointerMove={handleCubePointerMove}
              onPointerLeave={handleCubePointerLeave}
              style={
                {
                  "--glare-x": `${cubeMouse?.x ?? 50}%`,
                  "--glare-y": `${cubeMouse?.y ?? 30}%`,
                } as React.CSSProperties
              }
            >
              {/* Soft physical shadow beneath crystal slab */}
              <div className="crystal-cube-shadow" aria-hidden="true" />

              <div
                className="crystal-journal-cube"
                style={{
                  transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0)`,
                }}
              >
                <div className="crystal-cube-content">
                  {/* Top Context & Status Row */}
                  <div className="crystal-cube-header">
                    <div className="crystal-header-left">
                      <div className="crystal-project-pill">
                        <FolderKanban className="size-3.5 text-stone-300" />
                        <span className="text-xs font-semibold text-stone-200">
                          Terminal Ledger
                        </span>
                      </div>

                      {/* Phase Context Selector */}
                      <div className="crystal-phase-select-wrap">
                        <select
                          id="crystal-phase-selector"
                          value={selectedPhaseSlug}
                          onChange={(e) => handlePhaseChange(e.target.value)}
                          className="crystal-phase-select"
                          aria-label="Select Project Phase"
                        >
                          {TERMINAL_LEDGER_PHASES.map((p) => (
                            <option key={p.slug} value={p.slug}>
                              Phase {p.number}: {p.title}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="size-3.5 pointer-events-none text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="crystal-header-right">
                      {/* Status Indicator */}
                      {entryStatus === "completed" ? (
                        <div className="crystal-status-badge crystal-status-resolved">
                          <CheckCircle2 className="size-3.5" />
                          <span>Resolved</span>
                        </div>
                      ) : (
                        <div className="crystal-status-badge crystal-status-draft">
                          <AlertCircle className="size-3.5" />
                          <span>Draft Entry</span>
                        </div>
                      )}

                      {/* New Entry Reset */}
                      {activeEntryId && (
                        <button
                          type="button"
                          onClick={handleNewEntry}
                          className="crystal-btn-ghost"
                          title="Start a fresh draft for this phase"
                        >
                          <RotateCcw className="size-3" />
                          <span>New Entry</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Form Grid: 6 Authoritative PipLearn Journal Prompts */}
                  <div className="crystal-form-grid">
                    {/* 1. EXPECTATION */}
                    <div className="crystal-field-group">
                      <div className="crystal-field-header">
                        <label htmlFor="journal-field-expectation" className="crystal-field-label">
                          EXPECTATION
                        </label>
                      </div>
                      <p className="crystal-field-prompt">What did you expect to happen?</p>
                      <textarea
                        id="journal-field-expectation"
                        value={formData.expectation}
                        onChange={(e) => handleFieldChange("expectation", e.target.value)}
                        placeholder="e.g. Expected prompt_user() to return a float balance after parsing stdin..."
                        className="crystal-field-textarea"
                        rows={3}
                      />
                    </div>

                    {/* 2. OBSERVATION */}
                    <div className="crystal-field-group">
                      <div className="crystal-field-header">
                        <label htmlFor="journal-field-observation" className="crystal-field-label">
                          OBSERVATION
                        </label>
                      </div>
                      <p className="crystal-field-prompt">What actually happened?</p>
                      <textarea
                        id="journal-field-observation"
                        value={formData.observation}
                        onChange={(e) => handleFieldChange("observation", e.target.value)}
                        placeholder="e.g. TypeError: can only concatenate str (not 'int') to str on line 24..."
                        className="crystal-field-textarea"
                        rows={3}
                      />
                    </div>

                    {/* 3. CAUSE */}
                    <div className="crystal-field-group">
                      <div className="crystal-field-header">
                        <label htmlFor="journal-field-cause" className="crystal-field-label">
                          CAUSE
                        </label>
                      </div>
                      <p className="crystal-field-prompt">What caused the discrepancy?</p>
                      <textarea
                        id="journal-field-cause"
                        value={formData.cause}
                        onChange={(e) => handleFieldChange("cause", e.target.value)}
                        placeholder="e.g. input() returns string values; without float() casting, arithmetic evaluates as string concatenation..."
                        className="crystal-field-textarea"
                        rows={3}
                      />
                    </div>

                    {/* 4. EVIDENCE USED */}
                    <div className="crystal-field-group">
                      <div className="crystal-field-header">
                        <label htmlFor="journal-field-evidence" className="crystal-field-label">
                          EVIDENCE USED
                        </label>
                      </div>
                      <p className="crystal-field-prompt">What evidence helped you identify it?</p>
                      <textarea
                        id="journal-field-evidence"
                        value={formData.evidence}
                        onChange={(e) => handleFieldChange("evidence", e.target.value)}
                        placeholder="e.g. Added print(type(amount)) before the calculation, which printed <class 'str'>..."
                        className="crystal-field-textarea"
                        rows={3}
                      />
                    </div>

                    {/* 5. FIX */}
                    <div className="crystal-field-group">
                      <div className="crystal-field-header">
                        <label htmlFor="journal-field-fix" className="crystal-field-label">
                          FIX
                        </label>
                      </div>
                      <p className="crystal-field-prompt">What did you change?</p>
                      <textarea
                        id="journal-field-fix"
                        value={formData.fix}
                        onChange={(e) => handleFieldChange("fix", e.target.value)}
                        placeholder="e.g. Wrapped input() with float(input(...)) during data extraction..."
                        className="crystal-field-textarea"
                        rows={3}
                      />
                    </div>

                    {/* 6. LESSON FOR NEXT TIME */}
                    <div className="crystal-field-group">
                      <div className="crystal-field-header">
                        <label htmlFor="journal-field-lesson" className="crystal-field-label">
                          LESSON FOR NEXT TIME
                        </label>
                      </div>
                      <p className="crystal-field-prompt">What will you remember next time?</p>
                      <textarea
                        id="journal-field-lesson"
                        value={formData.lesson}
                        onChange={(e) => handleFieldChange("lesson", e.target.value)}
                        placeholder="e.g. Always verify variable types at domain boundaries before performing mathematical operations..."
                        className="crystal-field-textarea"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Crystal Controls Footer */}
                  <div className="crystal-cube-footer">
                    <div className="crystal-footer-info">
                      {saveStatus ? (
                        <div className="crystal-save-indicator">
                          <Check className="size-3.5 text-emerald-400" />
                          <span>{saveStatus}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-stone-400 font-mono">
                          {activePhaseObj ? `Context: Phase ${activePhaseObj.number}` : "Terminal Ledger"}
                        </span>
                      )}
                    </div>

                    <div className="crystal-footer-actions">
                      <button
                        type="button"
                        onClick={handleSaveEntry}
                        className="crystal-btn-secondary"
                      >
                        <span>Save Entry</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleMarkResolved}
                        className="crystal-btn-primary"
                      >
                        <CheckCircle2 className="size-4" />
                        <span>Mark Resolved</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* RECORDED / RESOLVED ENTRIES (CLEAN WHITE BACKGROUND)        */}
            {/* ============================================================ */}
            <div className="journal-entries-section">
              <div className="journal-entries-header">
                <div>
                  <h3 className="journal-entries-title">
                    Recorded Entries ({entries.length})
                  </h3>
                  <p className="journal-entries-subtitle">
                    A quiet archive of runtime surprises, diagnosed root causes, and durable lessons.
                  </p>
                </div>

                <div className="journal-entries-header-actions">
                  <Link
                    href="/manual/09-errors-debugging/"
                    className="journal-text-link"
                  >
                    <BookOpen className="size-3.5" />
                    <span>Module 09: Errors &amp; Debugging</span>
                  </Link>
                </div>
              </div>

              {entries.length === 0 ? (
                <div className="journal-empty-ledger">
                  <div className="journal-empty-ledger-inner">
                    <Sparkles className="size-5 text-stone-400 mb-2" />
                    <h4 className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                      No discrepancies recorded yet
                    </h4>
                    <p className="text-xs text-stone-500 max-w-md mx-auto mt-1 leading-relaxed">
                      As you build Terminal Ledger and runtime behavior surprises you, log the observation and verified cause in the crystal card above before applying a fix.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="journal-ledger-list">
                  {entries.map((entry) => {
                    const phaseObj = getPhaseBySlug(entry.phase);
                    const isActive = entry.id === activeEntryId;

                    return (
                      <div
                        key={entry.id}
                        onClick={() => handleSelectEntryFromList(entry)}
                        className={`journal-entry-card ${isActive ? "journal-entry-card-active" : ""}`}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleSelectEntryFromList(entry);
                          }
                        }}
                      >
                        <div className="journal-card-top-row">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                              {phaseObj ? `Phase ${phaseObj.number}` : entry.phase}
                            </span>
                            <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                              <Calendar className="size-3" />
                              {formatDate(entry.createdAt)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {entry.status === "completed" ? (
                              <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                                <CheckCircle2 className="size-3" />
                                <span>Resolved</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
                                <AlertCircle className="size-3" />
                                <span>Draft</span>
                              </span>
                            )}

                            <button
                              type="button"
                              onClick={(e) => handleOpenDrawerForEntry(e, entry.id)}
                              className="journal-btn-inspect"
                              title="Open full drawer view"
                            >
                              <span>Drawer</span>
                            </button>
                          </div>
                        </div>

                        <h4 className="journal-card-headline">
                          {entry.observation || entry.expectation || "(No description recorded)"}
                        </h4>

                        {entry.cause && (
                          <p className="journal-card-detail">
                            <strong className="text-stone-700 dark:text-stone-300 font-medium">Cause:</strong> {entry.cause}
                          </p>
                        )}

                        {entry.lesson && (
                          <div className="journal-card-lesson-quote">
                            <span className="text-stone-400 select-none">“</span>
                            <span>{entry.lesson}</span>
                            <span className="text-stone-400 select-none">”</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Problem Journal Detail Drawer (Preserved for in-depth drawer inspections) */}
      <ProblemJournalDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        projectSlug="terminal-ledger"
        phaseSlug={selectedPhaseSlug}
        phaseTitle={activePhaseObj?.title || "Terminal Ledger"}
        phaseNumber={activePhaseObj?.number || 1}
        initialEntryId={drawerEntryId || undefined}
      />
    </AuthShell>
  );
}
