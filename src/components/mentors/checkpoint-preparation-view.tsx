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
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  NotebookPen,
  ShieldCheck,
  SearchCode,
  MessageSquareCode,
  Terminal,
  Braces,
  FileCheck,
} from "lucide-react";
import "./checkpoint-details.css";

const getMentorAvatar = (name: string) => {
  const n = name.toLowerCase();
  if (n === "tirth") return "/images/mentors/tirth-avatar.png";
  if (n === "darsh") return "/images/mentors/darsh-avatar.png";
  if (n === "raj") return "/images/mentors/raj-avatar.jpg";
  return null;
};

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
    <AuthShell activeItem="mentors" environment="checkpoint">
      <main className="flex-1 overflow-y-auto bg-foreground/[0.02]">
        
        {/* HERO REMAINS UNTOUCHED - atmospheric purple cloud environment */}
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-14 w-full auth-animate-in relative z-10">
          {/* Back Nav */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <Link
              href="/mentors/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>Mentors & Checkpoints</span>
            </Link>
          </nav>

          <section className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="auth-eyebrow text-violet-600 dark:text-violet-400">
                Checkpoint {info.checkpointNumber} of 3 · {info.stage}
              </span>
              <span className="text-muted-foreground/40 font-mono text-xs">·</span>
              <span className="text-xs font-mono text-muted-foreground">
                {info.coveredPhaseRange}
              </span>
            </div>

            <h1 className="auth-hero-headline text-foreground mb-4">
              {info.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground/90 max-w-2xl leading-relaxed">
              {info.whyHere}
            </p>
          </section>
        </div>

        {/* TRANSITION INTO CLEAN WARM-WHITE WORKSPACE */}
        <div className="cp-workspace">
          <div className="cp-container">
            
            {/* PROTOCOL RAIL */}
            <div className="cp-protocol-rail">
              <div className="cp-protocol-node"><div className="cp-protocol-num">1</div> PREPARE</div>
              <div className="cp-protocol-line" />
              <div className="cp-protocol-node"><div className="cp-protocol-num">2</div> EVIDENCE</div>
              <div className="cp-protocol-line" />
              <div className="cp-protocol-node"><div className="cp-protocol-num">3</div> SESSION</div>
              <div className="cp-protocol-line" />
              <div className="cp-protocol-node"><div className="cp-protocol-num">4</div> OUTCOME</div>
            </div>

            {/* CHECKPOINT BRIEF */}
            <section className="cp-section-spacing">
              <div className="auth-eyebrow text-muted-foreground mb-2">CHECKPOINT BRIEF</div>
              <h2 className="font-serif text-3xl text-foreground mb-8">What you should be ready to defend.</h2>
              
              <div className="cp-surface">
                <div className="cp-brief-grid">
                  {/* Left: Agenda */}
                  <div className="cp-brief-left">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                      <MessageSquareCode className="size-4 text-violet-500" />
                      <span>Discussion Agenda</span>
                    </div>
                    <ul className="space-y-4 text-sm text-foreground/90">
                      {info.discussionTopics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="cp-agenda-num">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="leading-relaxed">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Evidence */}
                  <div className="cp-brief-right">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                      <Terminal className="size-4 text-violet-500" />
                      <span>Evidence to Have Ready</span>
                    </div>
                    <ul className="space-y-4 text-sm text-foreground/90">
                      {info.evidenceRequired.map((ev, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="cp-diamond-bullet" />
                          <span className="leading-relaxed">{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* PROBLEM JOURNAL EVIDENCE */}
            <section className="cp-section-spacing">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  <NotebookPen className="size-4 text-amber-500" />
                  <span>Problem Journal Evidence ({info.coveredPhaseRange})</span>
                </div>
                <Link
                  href="/journal/"
                  className="text-xs text-muted-foreground hover:text-foreground font-mono flex items-center gap-1"
                >
                  <span>View Full Journal</span>
                  <ExternalLink className="size-3" />
                </Link>
              </div>

              {relevantJournalEntries.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No entries recorded yet. Journal entries aren't required for progression, but they can give you concrete debugging evidence to discuss with your mentor.
                </div>
              ) : (
                <div className="cp-journal-strip">
                  {relevantJournalEntries.slice(0, 3).map((entry) => (
                    <div key={entry.id} className="cp-journal-entry">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-xs font-semibold text-foreground">{entry.phase}</span>
                        <span className="text-xs text-muted-foreground font-mono">{new Date(entry.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="text-xs font-mono bg-foreground/5 p-2 rounded-md mb-2 text-foreground/80">
                        {entry.observation || "(No observation captured)"}
                      </div>
                      {entry.fix && (
                        <div className="text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">Fix:</span> {entry.fix}
                        </div>
                      )}
                    </div>
                  ))}
                  {relevantJournalEntries.length > 3 && (
                    <div className="text-xs text-muted-foreground font-mono mt-2 pl-2">
                      + {relevantJournalEntries.length - 3} more entries in journal
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* BEFORE THE SESSION */}
            <section className="cp-section-spacing">
              <div className="auth-eyebrow text-muted-foreground mb-2">BEFORE THE SESSION</div>
              <h2 className="font-serif text-3xl text-foreground mb-8">Prepare what you want to discuss.</h2>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left: 55% */}
                <div className="lg:col-span-7">
                  <form onSubmit={handleSaveNotes}>
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                      <NotebookPen className="size-4 text-violet-500" />
                      <span>Personal Preparation</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Jot down points you want to ask your mentor, trade-offs you considered, or lines of code you want them to inspect.
                    </p>
                    <textarea
                      id="preparation-notes"
                      value={prepNotes}
                      onChange={(e) => setPrepNotes(e.target.value)}
                      placeholder="e.g. Discuss my decision to use a dictionary lookup for categories vs list comprehension..."
                      className="cp-textarea"
                    />
                    <div className="mt-3 flex items-center justify-between">
                      {notesSaveFeedback ? (
                        <span className="text-xs text-emerald-600 font-mono">Saved locally.</span>
                      ) : <span />}
                      <button type="submit" className="cp-btn-secondary">
                        Save Notes
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right: 45% */}
                <div className="lg:col-span-5">
                  <form onSubmit={handleSavePlan} className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                      <CalendarDays className="size-4 text-violet-500" />
                      <span>Session Plan</span>
                    </div>

                    {planError && (
                      <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                        {planError}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-2">Mentor</label>
                      <div className="cp-mentor-select-wrapper">
                        <div className="cp-mentor-select-crystal">
                          {getMentorAvatar(selectedMentor) ? (
                            <img src={getMentorAvatar(selectedMentor)!} alt={selectedMentor} className="cp-mentor-avatar-img" />
                          ) : (
                            selectedMentor.charAt(0)
                          )}
                        </div>
                        <div className="text-sm font-medium">
                          {selectedMentor}
                          <span className="block text-xs text-muted-foreground font-normal">PipLearn Mentor</span>
                        </div>
                        <div className="ml-auto text-xs font-mono text-muted-foreground pr-2">Change ▼</div>
                        <select
                          value={selectedMentor}
                          onChange={(e) => setSelectedMentor(e.target.value as MentorId)}
                          className="cp-mentor-select"
                        >
                          {LOCKED_MENTORS.map((m) => (
                            <option key={m} value={m}>{m} (PipLearn Mentor)</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-2">Date</label>
                        <input
                          type="date"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          required
                          className="cp-input"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-2">Time</label>
                        <input
                          type="time"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          required
                          className="cp-input"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      {planSaveFeedback ? (
                         <span className="text-xs text-emerald-600 font-mono">Plan saved locally.</span>
                      ) : <span />}
                      <button type="submit" className="cp-btn-primary py-2 px-5 text-sm">
                        {record.status === "scheduled" ? "Update Plan →" : "Save Plan →"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>

            {/* AFTER THE CONVERSATION (Outcome) */}
            <section className="cp-section-spacing cp-reading-width">
              {isCleared ? (
                <div className="cp-completed-band">
                  <CheckCircle2 className="size-5" />
                  <span>CALIBRATION COMPLETE</span>
                </div>
              ) : null}

              <div className="auth-eyebrow text-muted-foreground mb-2">AFTER THE CONVERSATION</div>
              <h2 className="font-serif text-3xl text-foreground mb-2">Record your defense outcome.</h2>
              <p className="text-sm text-muted-foreground mb-12">
                After completing your conversational defense with your mentor, capture what changed in your understanding before advancing.
              </p>

              {outcomeError && (
                <div className="p-3.5 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs mb-8">
                  {outcomeError}
                </div>
              )}

              <form onSubmit={handleRecordOutcome}>
                {/* 01 MENTOR */}
                <div className="cp-form-row">
                  <div className="cp-form-num">01</div>
                  <div className="cp-form-content">
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Mentor Who Conducted Session
                    </label>
                    <div className="cp-mentor-select-wrapper max-w-sm">
                      <div className="cp-mentor-select-crystal">
                        {getMentorAvatar(outcomeMentor) ? (
                          <img src={getMentorAvatar(outcomeMentor)!} alt={outcomeMentor} className="cp-mentor-avatar-img" />
                        ) : (
                          outcomeMentor.charAt(0)
                        )}
                      </div>
                      <div className="text-sm font-medium">
                        {outcomeMentor}
                        <span className="block text-xs text-muted-foreground font-normal">PipLearn Mentor</span>
                      </div>
                      <div className="ml-auto text-xs font-mono text-muted-foreground pr-2">Change ▼</div>
                      <select
                        value={outcomeMentor}
                        onChange={(e) => setOutcomeMentor(e.target.value as MentorId)}
                        className="cp-mentor-select"
                      >
                        {LOCKED_MENTORS.map((m) => (
                          <option key={m} value={m}>{m} (PipLearn Mentor)</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 02 FEEDBACK */}
                <div className="cp-form-row">
                  <div className="cp-form-num">02</div>
                  <div className="cp-form-content">
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      Mentor Feedback & Key Takeaways
                    </label>
                    <p className="text-xs text-muted-foreground mb-3">Key observations made by the mentor during your code walkthrough.</p>
                    <textarea
                      value={mentorNotes}
                      onChange={(e) => setMentorNotes(e.target.value)}
                      className="cp-textarea min-h-[120px]"
                    />
                  </div>
                </div>

                {/* 03 CARRY FORWARD */}
                <div className="cp-form-row">
                  <div className="cp-form-num">03</div>
                  <div className="cp-form-content">
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      Concepts to Carry Forward Into Next Phases
                    </label>
                    <p className="text-xs text-muted-foreground mb-3">Specific architectural habits to maintain in upcoming milestones.</p>
                    <textarea
                      value={carryForwardNotes}
                      onChange={(e) => setCarryForwardNotes(e.target.value)}
                      className="cp-textarea min-h-[100px]"
                    />
                  </div>
                </div>

                {/* CONFIRMATION */}
                <div className="cp-confirmation-band">
                  <input
                    type="checkbox"
                    id="acknowledge-session"
                    checked={sessionAcknowledged}
                    onChange={(e) => setSessionAcknowledged(e.target.checked)}
                    className="cp-checkbox"
                  />
                  <label htmlFor="acknowledge-session" className="text-sm text-foreground/90 leading-relaxed cursor-pointer select-none pt-0.5 flex-grow">
                    I confirm that I conducted a conversational technical defense with {outcomeMentor} reviewing my Terminal Ledger code, data flow, and problem journal evidence.
                  </label>
                  <ShieldCheck className="size-5 text-violet-500 flex-shrink-0 mt-0.5" />
                </div>

                {/* ADVANCE */}
                <div className="mt-10 flex flex-col items-start">
                  <button type="submit" className="cp-btn-primary">
                    <span>Record Outcome & Advance</span>
                    <ArrowRight className="size-4 btn-arrow" />
                  </button>
                  <p className="text-xs text-muted-foreground mt-4 max-w-sm leading-relaxed">
                    Completing this records the checkpoint outcome locally and unlocks the next eligible phase according to existing progression rules.
                  </p>
                </div>

              </form>
            </section>

          </div>
        </div>
      </main>
    </AuthShell>
  );
}
