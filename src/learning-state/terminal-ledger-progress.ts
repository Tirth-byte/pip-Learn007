import { useSyncExternalStore, useCallback } from "react";
import { TerminalLedgerPhase } from "@/lib/projects/terminal-ledger/types";
import {
  TERMINAL_LEDGER_PHASES,
  getPhaseBySlug,
  getNextPhase,
} from "@/lib/projects/terminal-ledger/structure";

export const TERMINAL_LEDGER_STORAGE_KEY = "piplearn_terminal_ledger_progress_v1";

export interface LearnerTerminalLedgerProgress {
  status: "not_started" | "in_progress" | "completed";
  currentPhaseSlug: string;
  completedPhases: string[]; // List of completed phase slugs, e.g. ["phase-01"]
  clearedCheckpoints: number[]; // e.g. [1, 2]
  startedAt?: string;
  completedAt?: string;
  updatedAt: string;
}

export const INITIAL_TERMINAL_LEDGER_PROGRESS: LearnerTerminalLedgerProgress = {
  status: "not_started",
  currentPhaseSlug: "phase-01",
  completedPhases: [],
  clearedCheckpoints: [],
  updatedAt: new Date(0).toISOString(),
};

let currentProgress: LearnerTerminalLedgerProgress = INITIAL_TERMINAL_LEDGER_PROGRESS;
let isLoaded = false;
const listeners = new Set<() => void>();

function safeLoadFromStorage(): LearnerTerminalLedgerProgress {
  if (typeof window === "undefined" || !window.localStorage) {
    return INITIAL_TERMINAL_LEDGER_PROGRESS;
  }
  try {
    const raw = window.localStorage.getItem(TERMINAL_LEDGER_STORAGE_KEY);
    if (!raw) return INITIAL_TERMINAL_LEDGER_PROGRESS;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      const status: "not_started" | "in_progress" | "completed" =
        parsed.status === "completed"
          ? "completed"
          : parsed.status === "in_progress"
          ? "in_progress"
          : "not_started";

      const completedPhases = Array.isArray(parsed.completedPhases)
        ? parsed.completedPhases.filter((s: unknown): s is string => typeof s === "string")
        : [];

      const clearedCheckpoints = Array.isArray(parsed.clearedCheckpoints)
        ? parsed.clearedCheckpoints.filter((c: unknown): c is number => typeof c === "number")
        : [];

      return {
        status,
        currentPhaseSlug:
          typeof parsed.currentPhaseSlug === "string" ? parsed.currentPhaseSlug : "phase-01",
        completedPhases,
        clearedCheckpoints,
        startedAt: typeof parsed.startedAt === "string" ? parsed.startedAt : undefined,
        completedAt: typeof parsed.completedAt === "string" ? parsed.completedAt : undefined,
        updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error("Failed to load terminal ledger progress from localStorage:", err);
  }
  return INITIAL_TERMINAL_LEDGER_PROGRESS;
}

function persistProgress(next: LearnerTerminalLedgerProgress) {
  currentProgress = next;
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(TERMINAL_LEDGER_STORAGE_KEY, JSON.stringify(next));
    } catch (err) {
      console.error("Failed to persist terminal ledger progress to localStorage:", err);
    }
  }
  listeners.forEach((listener) => listener());
}

export function getTerminalLedgerProgressSnapshot(): LearnerTerminalLedgerProgress {
  if (!isLoaded) {
    isLoaded = true;
    currentProgress = safeLoadFromStorage();
  }
  return currentProgress;
}

export function getServerTerminalLedgerProgressSnapshot(): LearnerTerminalLedgerProgress {
  return INITIAL_TERMINAL_LEDGER_PROGRESS;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

/**
 * Derives active checkpoint blocker if a phase checkpoint is due and has not been cleared.
 */
export function deriveActiveBlocker(progress: LearnerTerminalLedgerProgress): {
  type: "CHECKPOINT_REQUIRED";
  checkpointNumber: 1 | 2 | 3;
  phaseNumber: number;
} | null {
  if (progress.status === "completed") return null;

  const completed = new Set(progress.completedPhases);
  const cleared = new Set(progress.clearedCheckpoints);

  // Checkpoint 1 after Phase 3
  if (completed.has("phase-03") && !cleared.has(1)) {
    return { type: "CHECKPOINT_REQUIRED", checkpointNumber: 1, phaseNumber: 3 };
  }
  // Checkpoint 2 after Phase 6
  if (completed.has("phase-06") && !cleared.has(2)) {
    return { type: "CHECKPOINT_REQUIRED", checkpointNumber: 2, phaseNumber: 6 };
  }
  // Checkpoint 3 after Phase 9
  if (completed.has("phase-09") && !cleared.has(3)) {
    return { type: "CHECKPOINT_REQUIRED", checkpointNumber: 3, phaseNumber: 9 };
  }

  return null;
}

export function startTerminalLedgerProject(): LearnerTerminalLedgerProgress {
  const snapshot = getTerminalLedgerProgressSnapshot();
  const next: LearnerTerminalLedgerProgress = {
    ...snapshot,
    status: "in_progress",
    currentPhaseSlug: snapshot.currentPhaseSlug || "phase-01",
    startedAt: snapshot.startedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  persistProgress(next);
  return next;
}

export function completePhase(slug: string): LearnerTerminalLedgerProgress {
  const snapshot = getTerminalLedgerProgressSnapshot();
  const completedSet = new Set(snapshot.completedPhases);
  completedSet.add(slug);

  const cleared = new Set(snapshot.clearedCheckpoints);
  let nextPhaseSlug = snapshot.currentPhaseSlug;
  const status = snapshot.status === "not_started" ? "in_progress" : snapshot.status;
  const completedAt = snapshot.completedAt;

  const nextPhase = getNextPhase(slug);

  // Checkpoint gating logic
  if (slug === "phase-03" && !cleared.has(1)) {
    // Checkpoint 1 due; stay on phase-03 until checkpoint 1 cleared
    nextPhaseSlug = "phase-03";
  } else if (slug === "phase-06" && !cleared.has(2)) {
    // Checkpoint 2 due; stay on phase-06 until checkpoint 2 cleared
    nextPhaseSlug = "phase-06";
  } else if (slug === "phase-09" && !cleared.has(3)) {
    // Checkpoint 3 due; stay on phase-09 until checkpoint 3 cleared
    nextPhaseSlug = "phase-09";
  } else if (nextPhase) {
    nextPhaseSlug = nextPhase.slug;
  }

  const next: LearnerTerminalLedgerProgress = {
    ...snapshot,
    status,
    completedPhases: Array.from(completedSet),
    currentPhaseSlug: nextPhaseSlug,
    completedAt,
    updatedAt: new Date().toISOString(),
  };

  persistProgress(next);
  return next;
}

export function clearCheckpoint(checkpointNumber: 1 | 2 | 3): LearnerTerminalLedgerProgress {
  const snapshot = getTerminalLedgerProgressSnapshot();
  const clearedSet = new Set(snapshot.clearedCheckpoints);
  clearedSet.add(checkpointNumber);

  let nextPhaseSlug = snapshot.currentPhaseSlug;
  const status = snapshot.status;
  const completedAt = snapshot.completedAt;

  if (checkpointNumber === 1 && snapshot.completedPhases.includes("phase-03")) {
    nextPhaseSlug = "phase-04";
  } else if (checkpointNumber === 2 && snapshot.completedPhases.includes("phase-06")) {
    nextPhaseSlug = "phase-07";
  } else if (checkpointNumber === 3 && snapshot.completedPhases.includes("phase-09")) {
    nextPhaseSlug = "phase-09";
  }

  const next: LearnerTerminalLedgerProgress = {
    ...snapshot,
    status,
    clearedCheckpoints: Array.from(clearedSet),
    currentPhaseSlug: nextPhaseSlug,
    completedAt,
    updatedAt: new Date().toISOString(),
  };

  persistProgress(next);
  return next;
}

export function completeTerminalLedgerProject(): LearnerTerminalLedgerProgress {
  const snapshot = getTerminalLedgerProgressSnapshot();
  const cleared = new Set(snapshot.clearedCheckpoints);

  if (snapshot.completedPhases.length < 9) {
    throw new Error(
      `Cannot complete project before finishing all 9 phases. Currently: ${snapshot.completedPhases.length} of 9.`
    );
  }
  if (!cleared.has(1) || !cleared.has(2) || !cleared.has(3)) {
    throw new Error("Cannot complete project before clearing all 3 mentor checkpoints.");
  }

  const next: LearnerTerminalLedgerProgress = {
    ...snapshot,
    status: "completed",
    completedAt: snapshot.completedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  persistProgress(next);
  return next;
}

export function setCurrentPhase(slug: string): LearnerTerminalLedgerProgress {
  const snapshot = getTerminalLedgerProgressSnapshot();
  const phase = getPhaseBySlug(slug);
  if (!phase) return snapshot;

  const next: LearnerTerminalLedgerProgress = {
    ...snapshot,
    currentPhaseSlug: phase.slug,
    updatedAt: new Date().toISOString(),
  };
  persistProgress(next);
  return next;
}

export function resetTerminalLedgerProgress(): void {
  persistProgress(INITIAL_TERMINAL_LEDGER_PROGRESS);
}

/**
 * React hook for consuming and updating Terminal Ledger progress.
 * Backed by useSyncExternalStore for hydration-safe external synchronization.
 */
export function useTerminalLedgerProgress() {
  const progress = useSyncExternalStore(
    subscribe,
    getTerminalLedgerProgressSnapshot,
    getServerTerminalLedgerProgressSnapshot
  );

  const isStarted = progress.status === "in_progress" || progress.status === "completed";
  const isInProgress = progress.status === "in_progress";
  const isCompleted = progress.status === "completed";
  const activeBlocker = deriveActiveBlocker(progress);

  const currentPhase: TerminalLedgerPhase =
    getPhaseBySlug(progress.currentPhaseSlug) || TERMINAL_LEDGER_PHASES[0];

  const completedPhasesCount = progress.completedPhases.length;
  const totalPhasesCount = TERMINAL_LEDGER_PHASES.length;

  const isPhaseCompleted = useCallback(
    (slug: string) => progress.completedPhases.includes(slug),
    [progress.completedPhases]
  );

  const isCheckpointCleared = useCallback(
    (cpNum: number) => progress.clearedCheckpoints.includes(cpNum),
    [progress.clearedCheckpoints]
  );

  const isCheckpointDue = useCallback(
    (cpNum: 1 | 2 | 3) => {
      if (cpNum === 1) return progress.completedPhases.includes("phase-03") && !progress.clearedCheckpoints.includes(1);
      if (cpNum === 2) return progress.completedPhases.includes("phase-06") && !progress.clearedCheckpoints.includes(2);
      if (cpNum === 3) return progress.completedPhases.includes("phase-09") && !progress.clearedCheckpoints.includes(3);
      return false;
    },
    [progress.completedPhases, progress.clearedCheckpoints]
  );

  const handleStartProject = useCallback(() => {
    return startTerminalLedgerProject();
  }, []);

  const handleCompletePhase = useCallback((slug: string) => {
    return completePhase(slug);
  }, []);

  const handleClearCheckpoint = useCallback((num: 1 | 2 | 3) => {
    return clearCheckpoint(num);
  }, []);

  const handleSetCurrentPhase = useCallback((slug: string) => {
    return setCurrentPhase(slug);
  }, []);

  const handleReset = useCallback(() => {
    resetTerminalLedgerProgress();
  }, []);

  const isReadyForRetrospective =
    progress.completedPhases.length === 9 &&
    progress.clearedCheckpoints.includes(1) &&
    progress.clearedCheckpoints.includes(2) &&
    progress.clearedCheckpoints.includes(3) &&
    progress.status !== "completed";

  return {
    progress,
    isStarted,
    isInProgress,
    isCompleted,
    isReadyForRetrospective,
    currentPhase,
    completedPhasesCount,
    totalPhasesCount,
    activeBlocker,
    isPhaseCompleted,
    isCheckpointCleared,
    isCheckpointDue,
    startProject: handleStartProject,
    completePhase: handleCompletePhase,
    clearCheckpoint: handleClearCheckpoint,
    completeProject: completeTerminalLedgerProject,
    setCurrentPhase: handleSetCurrentPhase,
    reset: handleReset,
  };
}
