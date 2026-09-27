"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  NotebookPen,
  Save,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import {
  ProblemJournalEntry,
  getJournalDraftForPhase,
  saveOrUpdateDraft,
  completeJournalEntry,
  deleteJournalEntry,
  useProblemJournal,
} from "@/learning-state/problem-journal";

interface ProblemJournalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  projectSlug: string;
  phaseSlug: string;
  phaseTitle: string;
  phaseNumber: number;
  initialEntryId?: string;
  onEntrySaved?: (entry: ProblemJournalEntry) => void;
}

export function ProblemJournalDrawer({
  isOpen,
  onClose,
  projectSlug,
  phaseSlug,
  phaseTitle,
  phaseNumber,
  initialEntryId,
  onEntrySaved,
}: ProblemJournalDrawerProps) {
  const allEntries = useProblemJournal();

  // Find target entry: either by initialEntryId or current draft for phase
  const targetEntry = initialEntryId
    ? allEntries.find((e) => e.id === initialEntryId)
    : getJournalDraftForPhase(projectSlug, phaseSlug);

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // ESC key to close
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="journal-drawer-title"
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
          className="w-screen max-w-2xl bg-background border-l border-border shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-200"
        >
          <ProblemJournalForm
            key={targetEntry?.id || `${phaseSlug}-new-draft`}
            targetEntry={targetEntry}
            projectSlug={projectSlug}
            phaseSlug={phaseSlug}
            phaseTitle={phaseTitle}
            phaseNumber={phaseNumber}
            closeBtnRef={closeBtnRef}
            onClose={onClose}
            onEntrySaved={onEntrySaved}
          />
        </div>
      </div>
    </div>
  );
}

interface ProblemJournalFormProps {
  targetEntry?: ProblemJournalEntry;
  projectSlug: string;
  phaseSlug: string;
  phaseTitle: string;
  phaseNumber: number;
  closeBtnRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onEntrySaved?: (entry: ProblemJournalEntry) => void;
}

function ProblemJournalForm({
  targetEntry,
  projectSlug,
  phaseSlug,
  phaseTitle,
  phaseNumber,
  closeBtnRef,
  onClose,
  onEntrySaved,
}: ProblemJournalFormProps) {
  const [expectation, setExpectation] = useState(targetEntry?.expectation || "");
  const [observation, setObservation] = useState(targetEntry?.observation || "");
  const [cause, setCause] = useState(targetEntry?.cause || "");
  const [evidence, setEvidence] = useState(targetEntry?.evidence || "");
  const [fix, setFix] = useState(targetEntry?.fix || "");
  const [lesson, setLesson] = useState(targetEntry?.lesson || "");
  const [status, setStatus] = useState<"draft" | "completed">(targetEntry?.status || "draft");
  const [activeEntryId, setActiveEntryId] = useState<string | undefined>(targetEntry?.id);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const showSavedMessage = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleSaveDraft = () => {
    const saved = saveOrUpdateDraft(
      projectSlug,
      phaseSlug,
      {
        expectation,
        observation,
        cause,
        evidence,
        fix,
        lesson,
        status: "draft",
      },
      activeEntryId
    );
    setActiveEntryId(saved.id);
    setStatus("draft");
    showSavedMessage("Draft saved locally");
    if (onEntrySaved) onEntrySaved(saved);
  };

  const handleMarkResolved = () => {
    if (!expectation.trim() || !observation.trim()) {
      alert("Expectation and Observation are required to complete a journal entry.");
      return;
    }

    let entryId = activeEntryId;
    if (!entryId) {
      const draft = saveOrUpdateDraft(projectSlug, phaseSlug, {
        expectation,
        observation,
        cause,
        evidence,
        fix,
        lesson,
      });
      entryId = draft.id;
    }

    const completed = completeJournalEntry(entryId, {
      expectation,
      observation,
      cause,
      evidence,
      fix,
      lesson,
    });

    if (completed) {
      setActiveEntryId(completed.id);
      setStatus("completed");
      showSavedMessage("Issue recorded as resolved");
      if (onEntrySaved) onEntrySaved(completed);
    }
  };

  const handleDelete = () => {
    if (!activeEntryId) return;
    if (confirm("Delete this problem journal entry?")) {
      deleteJournalEntry(activeEntryId);
      onClose();
    }
  };

  return (
    <>
      {/* Drawer Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/10 bg-background/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2.5 min-w-0 pr-4">
          <span className="p-1.5 rounded-md bg-primary/10 text-primary shrink-0">
            <NotebookPen className="size-4" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block truncate">
                Problem Journal · Engineering Notebook
              </span>
              <span
                className={`text-[10px] font-mono font-medium px-1.5 py-0.2 rounded ${
                  status === "completed"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                }`}
              >
                {status === "completed" ? "Resolved" : "Investigating"}
              </span>
            </div>
            <span className="text-xs font-semibold text-foreground truncate block">
              Phase {phaseNumber}: {phaseTitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {savedNotice && (
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 animate-in fade-in duration-150">
              {savedNotice}
            </span>
          )}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close problem journal"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Drawer Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
        {/* Header intro */}
        <div className="space-y-1 text-xs">
          <h1 id="journal-drawer-title" className="text-lg font-bold text-foreground">
            Document Runtime Discrepancies
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Transform surprises and debugging obstacles into permanent mental models. Fill in what you observe right now; return to complete the cause and fix once resolved.
          </p>
        </div>

        {/* Form Fields: 6 Distinct Locked Fields */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveDraft();
          }}
          className="space-y-5"
        >
          {/* Field 1: Expectation */}
          <div className="space-y-1.5">
            <label
              htmlFor="journal-expectation"
              className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono flex items-center justify-between"
            >
              <span>1. Expectation</span>
              <span className="text-[10px] font-normal text-muted-foreground font-sans lowercase">
                required for diagnosis
              </span>
            </label>
            <p className="text-[11px] text-muted-foreground">
              What specific behavior or observable result were you trying to produce?
            </p>
            <textarea
              id="journal-expectation"
              value={expectation}
              onChange={(e) => setExpectation(e.target.value)}
              placeholder="e.g. Entering '12.50' should append a record with a float amount to in-memory list..."
              rows={2}
              className="w-full text-xs font-sans rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 leading-relaxed resize-y"
            />
          </div>

          {/* Field 2: Observation */}
          <div className="space-y-1.5">
            <label
              htmlFor="journal-observation"
              className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono flex items-center justify-between"
            >
              <span>2. Observation</span>
              <span className="text-[10px] font-normal text-muted-foreground font-sans lowercase">
                required for diagnosis
              </span>
            </label>
            <p className="text-[11px] text-muted-foreground">
              What actually happened? (Include exact error messages, unexpected output, or file states)
            </p>
            <textarea
              id="journal-observation"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="e.g. TypeError: can only concatenate str (not 'float') to str on line 24..."
              rows={3}
              className="w-full text-xs font-mono rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 leading-relaxed resize-y"
            />
          </div>

          {/* Field 3: Cause */}
          <div className="space-y-1.5">
            <label
              htmlFor="journal-cause"
              className="block text-xs font-semibold text-foreground uppercase tracking-wider font-mono"
            >
              3. Cause
            </label>
            <p className="text-[11px] text-muted-foreground">
              What was really happening under the hood? What did you misunderstand initially?
            </p>
            <textarea
              id="journal-cause"
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              placeholder="e.g. input() returns a string; the value was never converted before passing into the calculation function..."
              rows={2}
              className="w-full text-xs font-sans rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 leading-relaxed resize-y"
            />
          </div>

          {/* Field 4: Evidence Used */}
          <div className="space-y-1.5">
            <label
              htmlFor="journal-evidence"
              className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono flex items-center justify-between"
            >
              <span>4. Evidence Used</span>
              <span className="text-[10px] font-normal text-muted-foreground font-sans lowercase">
                required for L4/L5 help
              </span>
            </label>
            <p className="text-[11px] text-muted-foreground">
              What print statements, type checks, experiments, or doc references proved this cause?
            </p>
            <textarea
              id="journal-evidence"
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              placeholder="e.g. Added print(type(amount), repr(amount)) before line 24. Observed: <class 'str'> '12.50'..."
              rows={2}
              className="w-full text-xs font-sans rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 leading-relaxed resize-y"
            />
          </div>

          {/* Field 5: Fix */}
          <div className="space-y-1.5">
            <label
              htmlFor="journal-fix"
              className="block text-xs font-semibold text-foreground uppercase tracking-wider font-mono"
            >
              5. Fix
            </label>
            <p className="text-[11px] text-muted-foreground">
              What single change resolved the problem?
            </p>
            <textarea
              id="journal-fix"
              value={fix}
              onChange={(e) => setFix(e.target.value)}
              placeholder="e.g. Wrapped the raw input in a validation helper that converts to float() with try/except..."
              rows={2}
              className="w-full text-xs font-sans rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 leading-relaxed resize-y"
            />
          </div>

          {/* Field 6: Lesson for Next Time */}
          <div className="space-y-1.5">
            <label
              htmlFor="journal-lesson"
              className="block text-xs font-semibold text-foreground uppercase tracking-wider font-mono"
            >
              6. Lesson for Next Time
            </label>
            <p className="text-[11px] text-muted-foreground">
              What check will you perform earlier next time this failure pattern appears?
            </p>
            <textarea
              id="journal-lesson"
              value={lesson}
              onChange={(e) => setLesson(e.target.value)}
              placeholder="e.g. Always check the runtime type of boundary inputs before writing arithmetic..."
              rows={2}
              className="w-full text-xs font-sans rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 leading-relaxed resize-y"
            />
          </div>
        </form>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-4 sm:px-8 border-t border-border bg-card/60 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {activeEntryId && (
            <button
              type="button"
              onClick={handleDelete}
              className="p-2 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors text-xs flex items-center gap-1.5"
              title="Delete entry"
            >
              <Trash2 className="size-3.5" />
              <span className="sm:hidden">Delete</span>
            </button>
          )}
          <span className="text-[11px] text-muted-foreground hidden sm:inline">
            Auto-associates with {phaseTitle}
          </span>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="auth-secondary-btn py-1.5 px-3 text-xs flex items-center gap-1.5 w-full sm:w-auto justify-center"
          >
            <Save className="size-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={handleMarkResolved}
            className="auth-primary-btn py-1.5 px-3.5 text-xs flex items-center gap-1.5 w-full sm:w-auto justify-center"
          >
            <CheckCircle2 className="size-3.5" />
            <span>{status === "completed" ? "Update Resolved" : "Mark Resolved"}</span>
          </button>
        </div>
      </div>
    </>
  );
}
