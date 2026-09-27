import { useSyncExternalStore, useCallback } from "react";
import {
  clearCheckpoint,
  getTerminalLedgerProgressSnapshot,
} from "./terminal-ledger-progress";

export const MENTOR_CHECKPOINTS_STORAGE_KEY = "piplearn_mentor_checkpoints_v1";

export type MentorId = "Tirth" | "Darsh" | "Raj";
export const LOCKED_MENTORS: readonly MentorId[] = ["Tirth", "Darsh", "Raj"] as const;

export type CheckpointStatus = "not_due" | "due" | "scheduled" | "completed";

export interface CheckpointCurriculumInfo {
  checkpointNumber: 1 | 2 | 3;
  checkpointId: "tl-cp-1" | "tl-cp-2" | "tl-cp-3";
  title: string;
  stage: string;
  afterPhase: 3 | 6 | 9;
  coveredPhases: string[];
  coveredPhaseRange: string;
  focus: string;
  whyHere: string;
  discussionTopics: string[];
  evidenceRequired: string[];
}

export const CHECKPOINT_CURRICULUM_INFO: Record<1 | 2 | 3, CheckpointCurriculumInfo> = {
  1: {
    checkpointNumber: 1,
    checkpointId: "tl-cp-1",
    title: "Mentor Checkpoint 1: In-Memory & Persistence Defense",
    stage: "End of Phase 3 — Save and Load Data",
    afterPhase: 3,
    coveredPhases: ["phase-01", "phase-02", "phase-03"],
    coveredPhaseRange: "Phases 1–3",
    focus: "Persistence Lifecycle & First-Run Grace",
    whyHere:
      "Persistence is the project's largest conceptual leap and the foundation under every later phase. Misconceptions here compound silently through six phases; twenty minutes now is the cheapest intervention in the project.",
    discussionTopics: [
      "Narrate the complete data flow lifecycle from your own code: startup load -> in-memory mutations -> safe exit save.",
      "Defend your first-run strategy when the storage file does not yet exist on disk.",
      "Explain how in-memory state and on-disk representation remain synchronized.",
      "Demonstrate that no code path mutates data without persisting.",
      "Review manual verification evidence and Problem Journal notes from Phases 1–3.",
    ],
    evidenceRequired: [
      "Local terminal open with main.py ready to execute live.",
      "Your JSON persistence file inspectable on disk before and after execution.",
      "Demonstration of process termination, restart, and state survival.",
      "Problem Journal entries recorded during Phases 1–3 (if any).",
    ],
  },
  2: {
    checkpointNumber: 2,
    checkpointId: "tl-cp-2",
    title: "Mentor Checkpoint 2: Mid-Project Calibration",
    stage: "End of Phase 6 — Dates and Monthly Views",
    afterPhase: 6,
    coveredPhases: ["phase-04", "phase-05", "phase-06"],
    coveredPhaseRange: "Phases 4–6",
    focus: "Record Shape Coherence, Validation Boundaries & Date Handling",
    whyHere:
      "Budgets, reports, and export are all built on top of what exists now. Structural trouble is cheap to correct before three derived features compound it, and expensive after. Also confirms you are struggling productively rather than drifting.",
    discussionTopics: [
      "Walk through your record structure and defend the choice of field names and types.",
      "Review validation boundaries: how user input is sanitized and reprompted without unhandled exceptions.",
      "Demonstrate defensive file loading against empty, missing, or malformed persistence data.",
      "Explain your date handling decisions: ISO format, string slicing/parsing, and chronological comparison across month and year boundaries.",
      "Audit your Problem Journal entries from Phases 4–6 to inspect your 7-Step Debugging process.",
    ],
    evidenceRequired: [
      "Demonstration of bad input handling at multiple prompts (no Python traceback leaks to terminal).",
      "Demonstration of monthly filtering and calculation with cross-month records.",
      "Problem Journal entries recorded during Phases 4–6 (if any).",
    ],
  },
  3: {
    checkpointNumber: 3,
    checkpointId: "tl-cp-3",
    title: "Mentor Checkpoint 3: Architectural Defense & Final Review",
    stage: "End of Phase 9 — Export and Refactor",
    afterPhase: 9,
    coveredPhases: ["phase-07", "phase-08", "phase-09"],
    coveredPhaseRange: "Phases 7–9",
    focus: "Full 10-Capability Walkthrough, Boundary Isolation & Process Defense",
    whyHere:
      "Finishing deserves a witness. The final checkpoint converts the finished project into articulated, reusable understanding — the last step of the core learning loop.",
    discussionTopics: [
      "Conduct a continuous live walkthrough of all 10 observable product capabilities on your local machine.",
      "Demonstrate deliberate edge cases: first-ever run, bad input at multiple prompts, empty month, zero/exceeded budget, description with commas.",
      "Defend architectural separation: where responsibilities live and your decision on single-file versus modular decomposition.",
      "Verify CSV export format and ensure strict boundary isolation from internal JSON persistence.",
      "Walk through your most instructive Problem Journal entry, explain what you learned, and debug one live scenario talking aloud.",
    ],
    evidenceRequired: [
      "Live running Terminal Ledger demonstrating all 10 capabilities.",
      "Exported CSV file opened in spreadsheet software or viewed in raw format.",
      "Problem Journal audit covering the full project arc.",
    ],
  },
};

export interface MentorCheckpointRecord {
  checkpointId: "tl-cp-1" | "tl-cp-2" | "tl-cp-3";
  checkpointNumber: 1 | 2 | 3;
  project: "terminal-ledger";
  afterPhase: 3 | 6 | 9;
  status: CheckpointStatus;
  mentor: MentorId | null;
  scheduledDate: string;
  scheduledTime: string;
  preparationNotes: string;
  mentorNotes: string;
  carryForwardNotes: string;
  completedAt?: string;
  updatedAt: string;
}

export function createDefaultCheckpointRecords(): Record<1 | 2 | 3, MentorCheckpointRecord> {
  const now = new Date(0).toISOString();
  return {
    1: {
      checkpointId: "tl-cp-1",
      checkpointNumber: 1,
      project: "terminal-ledger",
      afterPhase: 3,
      status: "not_due",
      mentor: null,
      scheduledDate: "",
      scheduledTime: "",
      preparationNotes: "",
      mentorNotes: "",
      carryForwardNotes: "",
      updatedAt: now,
    },
    2: {
      checkpointId: "tl-cp-2",
      checkpointNumber: 2,
      project: "terminal-ledger",
      afterPhase: 6,
      status: "not_due",
      mentor: null,
      scheduledDate: "",
      scheduledTime: "",
      preparationNotes: "",
      mentorNotes: "",
      carryForwardNotes: "",
      updatedAt: now,
    },
    3: {
      checkpointId: "tl-cp-3",
      checkpointNumber: 3,
      project: "terminal-ledger",
      afterPhase: 9,
      status: "not_due",
      mentor: null,
      scheduledDate: "",
      scheduledTime: "",
      preparationNotes: "",
      mentorNotes: "",
      carryForwardNotes: "",
      updatedAt: now,
    },
  };
}

let currentRecords: Record<1 | 2 | 3, MentorCheckpointRecord> = createDefaultCheckpointRecords();
let isLoaded = false;
const listeners = new Set<() => void>();

function safeLoadFromStorage(): Record<1 | 2 | 3, MentorCheckpointRecord> {
  const defaults = createDefaultCheckpointRecords();
  if (typeof window === "undefined" || !window.localStorage) {
    return defaults;
  }

  try {
    const raw = window.localStorage.getItem(MENTOR_CHECKPOINTS_STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      for (const num of [1, 2, 3] as const) {
        if (parsed[num] && typeof parsed[num] === "object") {
          const item = parsed[num];
          const mentor = LOCKED_MENTORS.includes(item.mentor) ? item.mentor : null;
          const status: CheckpointStatus = ["not_due", "due", "scheduled", "completed"].includes(
            item.status
          )
            ? item.status
            : "not_due";

          defaults[num] = {
            checkpointId: num === 1 ? "tl-cp-1" : num === 2 ? "tl-cp-2" : "tl-cp-3",
            checkpointNumber: num,
            project: "terminal-ledger",
            afterPhase: num === 1 ? 3 : num === 2 ? 6 : 9,
            status,
            mentor,
            scheduledDate: typeof item.scheduledDate === "string" ? item.scheduledDate : "",
            scheduledTime: typeof item.scheduledTime === "string" ? item.scheduledTime : "",
            preparationNotes:
              typeof item.preparationNotes === "string" ? item.preparationNotes : "",
            mentorNotes: typeof item.mentorNotes === "string" ? item.mentorNotes : "",
            carryForwardNotes:
              typeof item.carryForwardNotes === "string" ? item.carryForwardNotes : "",
            completedAt: typeof item.completedAt === "string" ? item.completedAt : undefined,
            updatedAt:
              typeof item.updatedAt === "string" ? item.updatedAt : new Date().toISOString(),
          };
        }
      }
    }
  } catch (err) {
    console.error("Failed to load mentor checkpoints from localStorage:", err);
  }
  return defaults;
}

function persistRecords(next: Record<1 | 2 | 3, MentorCheckpointRecord>) {
  currentRecords = next;
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(MENTOR_CHECKPOINTS_STORAGE_KEY, JSON.stringify(next));
    } catch (err) {
      console.error("Failed to persist mentor checkpoints to localStorage:", err);
    }
  }
  listeners.forEach((l) => l());
}

export function getCheckpointRecordsSnapshot(): Record<1 | 2 | 3, MentorCheckpointRecord> {
  if (!isLoaded) {
    isLoaded = true;
    const loaded = safeLoadFromStorage();
    // Reconcile checkpoint status against terminal ledger progress ONCE on initial load
    const progress = getTerminalLedgerProgressSnapshot();
    const clearedSet = new Set(progress.clearedCheckpoints);
    const completedPhases = new Set(progress.completedPhases);

    let modified = false;
    const updated = { ...loaded };

    for (const num of [1, 2, 3] as const) {
      const rec = updated[num];
      const isClearedInEngine = clearedSet.has(num);
      const phaseDone =
        num === 1
          ? completedPhases.has("phase-03")
          : num === 2
          ? completedPhases.has("phase-06")
          : completedPhases.has("phase-09");

      if (isClearedInEngine && rec.status !== "completed") {
        updated[num] = {
          ...rec,
          status: "completed",
          completedAt: rec.completedAt || rec.updatedAt,
          updatedAt: rec.updatedAt, // preserve existing timestamp — don't generate new Date() here
        };
        modified = true;
      } else if (!isClearedInEngine && phaseDone && rec.status === "not_due") {
        updated[num] = {
          ...rec,
          status: "due",
          updatedAt: rec.updatedAt, // preserve existing timestamp
        };
        modified = true;
      }
    }

    if (modified) {
      currentRecords = updated;
      // Persist silently without notifying listeners (we're in initial load)
      if (typeof window !== "undefined" && window.localStorage) {
        try {
          window.localStorage.setItem(MENTOR_CHECKPOINTS_STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // silent
        }
      }
    } else {
      currentRecords = loaded;
    }
  }

  // Pure snapshot: always returns the same stable reference until persistRecords() is called
  return currentRecords;
}

// Stable frozen singleton for SSR — must never change reference
const DEFAULT_CHECKPOINT_RECORDS: Record<1 | 2 | 3, MentorCheckpointRecord> =
  Object.freeze(createDefaultCheckpointRecords());

export function getServerCheckpointRecordsSnapshot(): Record<1 | 2 | 3, MentorCheckpointRecord> {
  // Must always return the exact same object reference to satisfy useSyncExternalStore
  return DEFAULT_CHECKPOINT_RECORDS;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function saveCheckpointPlan(input: {
  checkpointNumber: 1 | 2 | 3;
  mentor: MentorId;
  scheduledDate: string;
  scheduledTime: string;
  preparationNotes?: string;
}): MentorCheckpointRecord {
  if (!LOCKED_MENTORS.includes(input.mentor)) {
    throw new Error(`Invalid mentor '${input.mentor}'. Must be one of: ${LOCKED_MENTORS.join(", ")}`);
  }
  if (!input.scheduledDate.trim()) {
    throw new Error("A preferred date is required to save your checkpoint plan.");
  }
  if (!input.scheduledTime.trim()) {
    throw new Error("A preferred time is required to save your checkpoint plan.");
  }

  const snapshot = getCheckpointRecordsSnapshot();
  const existing = snapshot[input.checkpointNumber];

  const updatedRec: MentorCheckpointRecord = {
    ...existing,
    mentor: input.mentor,
    scheduledDate: input.scheduledDate.trim(),
    scheduledTime: input.scheduledTime.trim(),
    preparationNotes:
      input.preparationNotes !== undefined ? input.preparationNotes : existing.preparationNotes,
    status: existing.status === "completed" ? "completed" : "scheduled",
    updatedAt: new Date().toISOString(),
  };

  const next = {
    ...snapshot,
    [input.checkpointNumber]: updatedRec,
  };

  persistRecords(next);
  return updatedRec;
}

export function updatePreparationNotes(
  checkpointNumber: 1 | 2 | 3,
  notes: string
): MentorCheckpointRecord {
  const snapshot = getCheckpointRecordsSnapshot();
  const existing = snapshot[checkpointNumber];

  const updatedRec: MentorCheckpointRecord = {
    ...existing,
    preparationNotes: notes,
    updatedAt: new Date().toISOString(),
  };

  const next = {
    ...snapshot,
    [checkpointNumber]: updatedRec,
  };

  persistRecords(next);
  return updatedRec;
}

export function recordCheckpointOutcome(input: {
  checkpointNumber: 1 | 2 | 3;
  mentor: MentorId;
  mentorNotes: string;
  carryForwardNotes?: string;
}): MentorCheckpointRecord {
  if (!LOCKED_MENTORS.includes(input.mentor)) {
    throw new Error(`Invalid mentor '${input.mentor}'. Must be one of: ${LOCKED_MENTORS.join(", ")}`);
  }
  if (!input.mentorNotes.trim()) {
    throw new Error("Qualitative session notes are required to record checkpoint completion.");
  }

  const snapshot = getCheckpointRecordsSnapshot();
  const existing = snapshot[input.checkpointNumber];
  const now = new Date().toISOString();

  const updatedRec: MentorCheckpointRecord = {
    ...existing,
    mentor: input.mentor,
    mentorNotes: input.mentorNotes.trim(),
    carryForwardNotes: input.carryForwardNotes ? input.carryForwardNotes.trim() : "",
    status: "completed",
    completedAt: existing.completedAt || now,
    updatedAt: now,
  };

  const next = {
    ...snapshot,
    [input.checkpointNumber]: updatedRec,
  };

  persistRecords(next);

  // Synchronize with the core project progression engine
  clearCheckpoint(input.checkpointNumber);

  return updatedRec;
}

export function resetCheckpointRecords(): void {
  persistRecords(createDefaultCheckpointRecords());
}

export function useMentorCheckpoints() {
  const records = useSyncExternalStore(
    subscribe,
    getCheckpointRecordsSnapshot,
    getServerCheckpointRecordsSnapshot
  );

  const getRecord = useCallback(
    (num: 1 | 2 | 3): MentorCheckpointRecord => records[num],
    [records]
  );

  const handleSavePlan = useCallback(
    (input: {
      checkpointNumber: 1 | 2 | 3;
      mentor: MentorId;
      scheduledDate: string;
      scheduledTime: string;
      preparationNotes?: string;
    }) => {
      return saveCheckpointPlan(input);
    },
    []
  );

  const handleUpdateNotes = useCallback(
    (checkpointNumber: 1 | 2 | 3, notes: string) => {
      return updatePreparationNotes(checkpointNumber, notes);
    },
    []
  );

  const handleRecordOutcome = useCallback(
    (input: {
      checkpointNumber: 1 | 2 | 3;
      mentor: MentorId;
      mentorNotes: string;
      carryForwardNotes?: string;
    }) => {
      return recordCheckpointOutcome(input);
    },
    []
  );

  const handleReset = useCallback(() => {
    resetCheckpointRecords();
  }, []);

  return {
    records,
    getRecord,
    savePlan: handleSavePlan,
    updatePreparationNotes: handleUpdateNotes,
    recordOutcome: handleRecordOutcome,
    reset: handleReset,
  };
}
