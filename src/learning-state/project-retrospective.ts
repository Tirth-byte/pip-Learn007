import { useSyncExternalStore, useCallback } from "react";
import {
  completeTerminalLedgerProject,
  getTerminalLedgerProgressSnapshot,
} from "./terminal-ledger-progress";

export const RETROSPECTIVE_STORAGE_KEY = "piplearn_terminal_ledger_retrospective_v1";

export interface ProjectRetrospectiveResponses {
  easierByEnd: string; // What became easier by the end?
  instructiveBug: string; // Which bug or misunderstanding taught you the most?
  debuggingHabit: string; // Which debugging habit will you keep?
  structuralChange: string; // What would you structure differently if starting again?
  newCapabilities: string; // What can you now build or reason about that you could not before?
}

export interface ProjectRetrospectiveRecord {
  project: "terminal-ledger";
  responses: ProjectRetrospectiveResponses;
  isCompleted: boolean;
  completedAt?: string;
  updatedAt: string;
}

export const INITIAL_RETROSPECTIVE_RESPONSES: ProjectRetrospectiveResponses = {
  easierByEnd: "",
  instructiveBug: "",
  debuggingHabit: "",
  structuralChange: "",
  newCapabilities: "",
};

export const INITIAL_RETROSPECTIVE_RECORD: ProjectRetrospectiveRecord = {
  project: "terminal-ledger",
  responses: INITIAL_RETROSPECTIVE_RESPONSES,
  isCompleted: false,
  updatedAt: new Date(0).toISOString(),
};

let currentRecord: ProjectRetrospectiveRecord = INITIAL_RETROSPECTIVE_RECORD;
let isLoaded = false;
const listeners = new Set<() => void>();

function safeLoadFromStorage(): ProjectRetrospectiveRecord {
  if (typeof window === "undefined" || !window.localStorage) {
    return INITIAL_RETROSPECTIVE_RECORD;
  }
  try {
    const raw = window.localStorage.getItem(RETROSPECTIVE_STORAGE_KEY);
    if (!raw) return INITIAL_RETROSPECTIVE_RECORD;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      const resp = parsed.responses || {};
      return {
        project: "terminal-ledger",
        responses: {
          easierByEnd: typeof resp.easierByEnd === "string" ? resp.easierByEnd : "",
          instructiveBug: typeof resp.instructiveBug === "string" ? resp.instructiveBug : "",
          debuggingHabit: typeof resp.debuggingHabit === "string" ? resp.debuggingHabit : "",
          structuralChange:
            typeof resp.structuralChange === "string" ? resp.structuralChange : "",
          newCapabilities:
            typeof resp.newCapabilities === "string" ? resp.newCapabilities : "",
        },
        isCompleted: Boolean(parsed.isCompleted),
        completedAt: typeof parsed.completedAt === "string" ? parsed.completedAt : undefined,
        updatedAt:
          typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error("Failed to load retrospective from localStorage:", err);
  }
  return INITIAL_RETROSPECTIVE_RECORD;
}

function persistRecord(next: ProjectRetrospectiveRecord) {
  currentRecord = next;
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(RETROSPECTIVE_STORAGE_KEY, JSON.stringify(next));
    } catch (err) {
      console.error("Failed to persist retrospective to localStorage:", err);
    }
  }
  listeners.forEach((l) => l());
}

export function getRetrospectiveSnapshot(): ProjectRetrospectiveRecord {
  if (!isLoaded) {
    isLoaded = true;
    currentRecord = safeLoadFromStorage();
  }
  return currentRecord;
}

export function getServerRetrospectiveSnapshot(): ProjectRetrospectiveRecord {
  return INITIAL_RETROSPECTIVE_RECORD;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function saveRetrospectiveDraft(
  partialResponses: Partial<ProjectRetrospectiveResponses>
): ProjectRetrospectiveRecord {
  const snapshot = getRetrospectiveSnapshot();
  const next: ProjectRetrospectiveRecord = {
    ...snapshot,
    responses: {
      ...snapshot.responses,
      ...partialResponses,
    },
    updatedAt: new Date().toISOString(),
  };
  persistRecord(next);
  return next;
}

export function completeRetrospective(
  responses: ProjectRetrospectiveResponses
): ProjectRetrospectiveRecord {
  // 1. Validate required prompts are answered
  const keys: (keyof ProjectRetrospectiveResponses)[] = [
    "easierByEnd",
    "instructiveBug",
    "debuggingHabit",
    "structuralChange",
    "newCapabilities",
  ];

  for (const k of keys) {
    if (!responses[k] || !responses[k].trim()) {
      throw new Error(`All reflection prompts must be answered. Missing: '${k}'`);
    }
  }

  // 2. Validate prerequisites: all 9 phases and all 3 checkpoints completed
  const progress = getTerminalLedgerProgressSnapshot();
  if (progress.completedPhases.length < 9) {
    throw new Error(
      `Cannot complete retrospective before finishing all 9 phases. Currently: ${progress.completedPhases.length} of 9.`
    );
  }
  const clearedSet = new Set(progress.clearedCheckpoints);
  if (!clearedSet.has(1) || !clearedSet.has(2) || !clearedSet.has(3)) {
    throw new Error(
      "Cannot complete retrospective before clearing all 3 mentor checkpoints."
    );
  }

  const now = new Date().toISOString();
  const next: ProjectRetrospectiveRecord = {
    project: "terminal-ledger",
    responses: { ...responses },
    isCompleted: true,
    completedAt: now,
    updatedAt: now,
  };

  persistRecord(next);

  // Trigger project completion in progress engine
  completeTerminalLedgerProject();

  return next;
}

export function resetRetrospective(): void {
  persistRecord(INITIAL_RETROSPECTIVE_RECORD);
}

export function useProjectRetrospective() {
  const record = useSyncExternalStore(
    subscribe,
    getRetrospectiveSnapshot,
    getServerRetrospectiveSnapshot
  );

  const handleSaveDraft = useCallback(
    (draft: Partial<ProjectRetrospectiveResponses>) => {
      return saveRetrospectiveDraft(draft);
    },
    []
  );

  const handleComplete = useCallback(
    (responses: ProjectRetrospectiveResponses) => {
      return completeRetrospective(responses);
    },
    []
  );

  const handleReset = useCallback(() => {
    resetRetrospective();
  }, []);

  return {
    retrospective: record,
    isCompleted: record.isCompleted,
    responses: record.responses,
    saveDraft: handleSaveDraft,
    completeRetrospective: handleComplete,
    reset: handleReset,
  };
}
