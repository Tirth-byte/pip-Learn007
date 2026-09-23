"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/shell/auth-shell";
import {
  CHECKPOINT_CURRICULUM_INFO,
  LOCKED_MENTORS,
  MentorId,
  useMentorCheckpoints,
} from "@/learning-state/mentor-checkpoints";
import { useProblemJournal } from "@/learning-state/problem-journal";
import { useTerminalLedgerProgress } from "@/learning-state/terminal-ledger-progress";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  NotebookPen,
  Save,
  ShieldAlert,
  Terminal,
} from "lucide-react";

interface CheckpointPreparationViewProps {
  checkpointId: string;
}

export function CheckpointPreparationView({ checkpointId }: CheckpointPreparationViewProps) {
  const router = useRouter();

  const num: 1 | 2 | 3 =
    checkpointId === "tl-cp-1" ? 1 : checkpointId === "tl-cp-2" ? 2 : 3;

  const info = CHECKPOINT_CURRICULUM_INFO[num];
  const { records, savePlan, updatePreparationNotes, recordOutcome } = useMentorCheckpoints();
  const { isCheckpointCleared, isCheckpointDue } = useTerminalLedgerProgress();
  const allJournalEntries = useProblemJournal();

  const record = records[num];
  const isCleared = isCheckpointCleared(num);
  const isDue = isCheckpointDue(num);

  // Form states for local scheduling plan
  const [selectedMentor, setSelectedMentor] = useState<MentorId>(
    record.mentor || "Tirth"
  );
  const [scheduledDate, setScheduledDate] = useState(record.scheduledDate || "");
  const [scheduledTime, setScheduledTime] = useState(record.scheduledTime || "");
  const [prepNotes, setPrepNotes] = useState(record.preparationNotes || "");
  const [notesSaveFeedback, setNotesSaveFeedback] = useState(false);
  const [planSaveFeedback, setPlanSaveFeedback] = useState(false);
  const [planError, setPlanError] = useState("");

  // Form states for session outcome recording
  const [outcomeMentor, setOutcomeMentor] = useState<MentorId>(
    record.mentor || "Tirth"
  );
  const [mentorNotes, setMentorNotes] = useState(record.mentorNotes || "");
  const [carryForwardNotes, setCarryForwardNotes] = useState(record.carryForwardNotes || "");
  const [sessionAcknowledged, setSessionAcknowledged] = useState(false);
  const [outcomeError, setOutcomeError] = useState("");

  // Relevant journal entries for this checkpoint's covered phases
  const relevantJournalEntries = allJournalEntries.filter(
    (e) => e.project === "terminal-ledger" && info.coveredPhases.includes(e.phase)
  );

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreparationNotes(num, prepNotes);
    setNotesSaveFeedback(true);
    setTimeout(() => setNotesSaveFeedback(false), 2500);
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setPlanError("");
    try {
      savePlan({
        checkpointNumber: num,
        mentor: selectedMentor,
        scheduledDate,
        scheduledTime,
        preparationNotes: prepNotes,
      });
      setPlanSaveFeedback(true);
      setTimeout(() => setPlanSaveFeedback(false), 2500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setPlanError(err.message);
      } else {
        setPlanError("Failed to save checkpoint plan.");
      }
    }
  };

  const handleRecordOutcome = (e: React.FormEvent) => {
    e.preventDefault();
    setOutcomeError("");

    if (!sessionAcknowledged) {
      setOutcomeError("Please acknowledge that the conversational review with the mentor occurred.");
      return;
    }

    try {
      recordOutcome({
        checkpointNumber: num,
        mentor: outcomeMentor,
        mentorNotes,
        carryForwardNotes,
      });

      // Navigate to next step
      if (num === 1) {
        router.push("/projects/terminal-ledger/phases/phase-04/");
      } else if (num === 2) {
        router.push("/projects/terminal-ledger/phases/phase-07/");
      } else {
        router.push("/projects/terminal-ledger/review/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setOutcomeError(err.message);
      } else {
        setOutcomeError("Failed to record session outcome.");
      }
    }
  };

  return (
    <AuthShell activeItem="mentors">
      <main className="flex-1 overflow-y-auto">
        <div className="auth-home-container max-w-4xl">
          {/* Back Nav */}
          <div className="mb-6">
            <Link
              href="/mentors/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Mentors & Checkpoints</span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                Checkpoint {info.checkpointNumber} of 3
              </span>
              <span className="text-muted-foreground/60 text-xs">·</span>
              <span className="text-xs text-muted-foreground">{info.stage}</span>
              <span className="text-muted-foreground/60 text-xs">·</span>
              <span className="text-xs font-mono text-muted-foreground">
                {info.coveredPhaseRange}
              </span>

              {/* Status Badge */}
              {isCleared ? (
                <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 font-mono">
                  <CheckCircle2 className="size-3.5" />
                  <span>Recorded Locally · Cleared</span>
                </span>
              ) : record.status === "scheduled" ? (
                <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 font-mono">
                  <Calendar className="size-3.5" />
                  <span>Session Planned Locally</span>
                </span>
              ) : isDue ? (
                <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-primary font-mono animate-pulse">
                  <ShieldAlert className="size-3.5" />
                  <span>Due Now</span>
                </span>
              ) : (
                <span className="ml-auto text-xs text-muted-foreground font-mono">
                  Unlocks after Phase {info.afterPhase}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {info.title}
            </h1>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {info.whyHere}
            </p>
          </div>

          {/* Section 1: Discussion Agenda */}
          <section className="mb-8 p-6 rounded-xl border border-border bg-card shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <Terminal className="size-4 text-primary" />
              <span>Discussion Agenda & Focus Areas</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Your mentor will ask you to explain your reasoning, walk through your code live, and discuss your decisions on these topics:
            </p>
            <ul className="space-y-2.5 text-xs text-foreground/90">
              {info.discussionTopics.map((topic, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="size-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{topic}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2: Evidence to Have Ready */}
          <section className="mb-8 p-6 rounded-xl border border-border bg-card shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <ShieldAlert className="size-4 text-primary" />
              <span>Evidence to Have Ready</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Checkpoints are grounded in authentic evidence from your machine rather than recitation:
            </p>
            <ul className="space-y-2 text-xs text-foreground/90">
              {info.evidenceRequired.map((ev, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-primary font-mono text-sm leading-none">•</span>
                  <span className="leading-relaxed">{ev}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: Relevant Problem Journal Entries */}
          <section className="mb-8 p-6 rounded-xl border border-border bg-card shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                <NotebookPen className="size-4 text-primary" />
                <span>Relevant Problem Journal Entries ({info.coveredPhaseRange})</span>
              </div>
              <Link
                href="/journal/"
                className="text-[11px] text-primary hover:underline flex items-center gap-1"
              >
                <span>View All Journal Entries</span>
                <ExternalLink className="size-3" />
              </Link>
            </div>

            {relevantJournalEntries.length === 0 ? (
              <div className="p-4 rounded-lg bg-muted/40 border border-border/80 text-xs text-muted-foreground leading-relaxed">
                No Problem Journal entries recorded for {info.coveredPhaseRange}. Journal entries are not mandatory for progression, but having evidence of your debugging investigations ready to discuss with your mentor is encouraged.
              </div>
            ) : (
              <div className="space-y-3">
                {relevantJournalEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 rounded-lg border border-border bg-background text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-semibold text-primary">
                        {entry.phase}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                        Observation
                      </div>
                      <div className="text-foreground/90 font-mono text-[11px] bg-muted/30 p-2 rounded">
                        {entry.observation || "(No observation captured)"}
                      </div>
                    </div>
                    {entry.evidence && (
                      <div>
                        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                          Evidence Used
                        </div>
                        <div className="text-muted-foreground">{entry.evidence}</div>
                      </div>
                    )}
                    {entry.fix && (
                      <div>
                        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                          Single Fix Applied
                        </div>
                        <div className="text-foreground/90">{entry.fix}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section 4: Learner Preparation Notes */}
          <section className="mb-8 p-6 rounded-xl border border-border bg-card shadow-xs">
            <form onSubmit={handleSaveNotes}>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="preparation-notes"
                  className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Personal Preparation Notes (Saved Locally)
                </label>
                {notesSaveFeedback && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    Notes saved locally!
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Jot down points you want to ask your mentor, trade-offs you considered, or parts of your code you want them to review.
              </p>
              <textarea
                id="preparation-notes"
                value={prepNotes}
                onChange={(e) => setPrepNotes(e.target.value)}
                placeholder="e.g. Discuss my decision to use a dictionary lookup for categories vs list comprehension..."
                rows={3}
                className="w-full text-xs p-3 rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring resize-y font-sans"
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  className="auth-secondary-btn text-xs py-1.5 px-3 flex items-center gap-1.5"
                >
                  <Save className="size-3.5" />
                  <span>Save Notes</span>
                </button>
              </div>
            </form>
          </section>

          {/* Section 5: Local Scheduling Plan (Honest Model) */}
          <section className="mb-8 p-6 rounded-xl border border-border bg-card shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              <Calendar className="size-4 text-primary" />
              <span>Plan Checkpoint Session (Local Scheduling Request)</span>
            </div>

            {/* Truthful Model Notice */}
            <div className="p-3.5 rounded-md bg-muted/40 border border-border/80 text-xs text-muted-foreground mb-5 leading-relaxed">
              <strong>Honest Scheduling Notice:</strong> PipLearn V1 records your checkpoint plan locally on this device. We do not integrate third-party calendar sync or pretend to have automatic calendar booking. Choose your preferred mentor, date, and time below to save your plan, then coordinate directly with your mentor.
            </div>

            {planError && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs mb-4">
                {planError}
              </div>
            )}

            <form onSubmit={handleSavePlan} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Mentor Selector */}
                <div>
                  <label
                    htmlFor="select-mentor"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    Select Mentor
                  </label>
                  <select
                    id="select-mentor"
                    value={selectedMentor}
                    onChange={(e) => setSelectedMentor(e.target.value as MentorId)}
                    className="w-full text-xs p-2.5 rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring"
                  >
                    {LOCKED_MENTORS.map((m) => (
                      <option key={m} value={m}>
                        {m} (PipLearn Mentor)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label
                    htmlFor="preferred-date"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="preferred-date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    required
                    className="w-full text-xs p-2 rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring"
                  />
                </div>

                {/* Preferred Time */}
                <div>
                  <label
                    htmlFor="preferred-time"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    id="preferred-time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    required
                    className="w-full text-xs p-2 rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  {planSaveFeedback && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      Checkpoint plan saved locally!
                    </span>
                  )}
                  {record.status === "scheduled" && !planSaveFeedback && (
                    <span className="text-xs text-muted-foreground">
                      Planned with <strong>{record.mentor}</strong> on {record.scheduledDate} at {record.scheduledTime}.
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="auth-secondary-btn text-xs py-2 px-4"
                >
                  <span>{record.status === "scheduled" ? "Update Checkpoint Plan" : "Save Checkpoint Plan"}</span>
                </button>
              </div>
            </form>
          </section>

          {/* Section 6: Record Real Session Outcome */}
          <section className="mb-12 p-6 rounded-xl border-2 border-border bg-card shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-foreground mb-2">
              <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span>Record Session Outcome</span>
            </div>

            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              After you complete your real conversation with the mentor, record the qualitative outcome below. This marks Checkpoint {num} completed on your local machine and unlocks progression to the next phase.
            </p>

            {isCleared ? (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2">
                <div className="flex items-center justify-between font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>Recorded Locally · Session Completed</span>
                  <span className="font-mono text-[11px]">
                    {record.completedAt ? new Date(record.completedAt).toLocaleDateString() : ""}
                  </span>
                </div>
                <div className="text-foreground/90">
                  <strong>Mentor:</strong> {record.mentor}
                </div>
                {record.mentorNotes && (
                  <div>
                    <strong className="text-foreground">Discussion & Challenges:</strong>
                    <p className="text-muted-foreground mt-0.5">{record.mentorNotes}</p>
                  </div>
                )}
                {record.carryForwardNotes && (
                  <div>
                    <strong className="text-foreground">To Carry Forward:</strong>
                    <p className="text-muted-foreground mt-0.5">{record.carryForwardNotes}</p>
                  </div>
                )}

                <div className="pt-3 flex justify-end">
                  {num === 1 ? (
                    <Link
                      href="/projects/terminal-ledger/phases/phase-04/"
                      className="auth-primary-btn text-xs py-2 px-4"
                    >
                      <span>Continue to Phase 4: Validate Bad Input</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  ) : num === 2 ? (
                    <Link
                      href="/projects/terminal-ledger/phases/phase-07/"
                      className="auth-primary-btn text-xs py-2 px-4"
                    >
                      <span>Continue to Phase 7: Budgets</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  ) : (
                    <Link
                      href="/projects/terminal-ledger/review/"
                      className="auth-primary-btn text-xs py-2 px-4"
                    >
                      <span>Proceed to Project Retrospective</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleRecordOutcome} className="space-y-4">
                {outcomeError && (
                  <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                    {outcomeError}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="outcome-mentor"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    Mentor who conducted this checkpoint
                  </label>
                  <select
                    id="outcome-mentor"
                    value={outcomeMentor}
                    onChange={(e) => setOutcomeMentor(e.target.value as MentorId)}
                    className="w-full sm:w-64 text-xs p-2.5 rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring"
                  >
                    {LOCKED_MENTORS.map((m) => (
                      <option key={m} value={m}>
                        {m} (PipLearn Mentor)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="mentor-notes"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    What did your mentor challenge or clarify? <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="mentor-notes"
                    value={mentorNotes}
                    onChange={(e) => setMentorNotes(e.target.value)}
                    required
                    placeholder="e.g. Challenged my assumption that saving only on exit is safe; verified my load-on-start exception handling for empty JSON files..."
                    rows={3}
                    className="w-full text-xs p-3 rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring font-sans"
                  />
                </div>

                <div>
                  <label
                    htmlFor="carry-forward-notes"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    What will you carry forward into subsequent phases?
                  </label>
                  <textarea
                    id="carry-forward-notes"
                    value={carryForwardNotes}
                    onChange={(e) => setCarryForwardNotes(e.target.value)}
                    placeholder="e.g. Always write defensive recovery for external files before writing business logic..."
                    rows={2}
                    className="w-full text-xs p-3 rounded-md border border-input bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring font-sans"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={sessionAcknowledged}
                      onChange={(e) => setSessionAcknowledged(e.target.checked)}
                      className="mt-0.5 rounded border-border"
                    />
                    <span>
                      I acknowledge that I conducted this conversational review with <strong>{outcomeMentor}</strong> and demonstrated my local code and evidence.
                    </span>
                  </label>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="auth-primary-btn text-xs py-2 px-5"
                  >
                    <span>Record Session as Completed (Local Record)</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      </main>
    </AuthShell>
  );
}
