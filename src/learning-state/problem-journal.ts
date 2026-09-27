import { useSyncExternalStore } from "react";

export const PROBLEM_JOURNAL_STORAGE_KEY = "piplearn_problem_journal_v1";

export interface ProblemJournalEntry {
  id: string;
  project: string; // e.g. "terminal-ledger"
  phase: string; // e.g. "phase-03"
  expectation: string; // What did you expect the program to do?
  observation: string; // What actually happened? (Exact error message, output, or file state)
  cause: string; // What do you currently think caused the difference?
  evidence: string; // What print statements, types, or experiments proved this cause?
  fix: string; // What single change resolved the problem?
  lesson: string; // What will you check earlier next time?
  status: "draft" | "completed";
  createdAt: string;
  updatedAt: string;
  highestHelpLevel?: 0 | 1 | 2 | 3 | 4 | 5;
}

export type ProblemJournalDraftInput = Partial<
  Omit<ProblemJournalEntry, "id" | "createdAt" | "updatedAt">
>;

let currentEntries: ProblemJournalEntry[] = [];
let isLoaded = false;
const listeners = new Set<() => void>();

function safeLoadFromStorage(): ProblemJournalEntry[] {
  if (typeof window === "undefined" || !window.localStorage) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(PROBLEM_JOURNAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => ({
        id: String(item.id || `journal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
        project: String(item.project || "terminal-ledger"),
        phase: String(item.phase || "phase-01"),
        expectation: String(item.expectation || ""),
        observation: String(item.observation || ""),
        cause: String(item.cause || ""),
        evidence: String(item.evidence || ""),
        fix: String(item.fix || ""),
        lesson: String(item.lesson || ""),
        status: item.status === "completed" ? "completed" : "draft",
        createdAt: String(item.createdAt || new Date().toISOString()),
        updatedAt: String(item.updatedAt || new Date().toISOString()),
        highestHelpLevel:
          typeof item.highestHelpLevel === "number" &&
          item.highestHelpLevel >= 0 &&
          item.highestHelpLevel <= 5
            ? (item.highestHelpLevel as 0 | 1 | 2 | 3 | 4 | 5)
            : undefined,
      }));
    }
  } catch (err) {
    console.error("Failed to load problem journal entries from localStorage:", err);
  }
  return [];
}

function persistEntries(next: ProblemJournalEntry[]) {
  currentEntries = next;
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(PROBLEM_JOURNAL_STORAGE_KEY, JSON.stringify(next));
    } catch (err) {
      console.error("Failed to persist problem journal to localStorage:", err);
    }
  }
  listeners.forEach((listener) => listener());
}

export function getProblemJournalSnapshot(): ProblemJournalEntry[] {
  if (!isLoaded) {
    isLoaded = true;
    currentEntries = safeLoadFromStorage();
  }
  return currentEntries;
}

const EMPTY_PROBLEM_JOURNAL_ENTRIES: ProblemJournalEntry[] = [];

export function getServerProblemJournalSnapshot(): ProblemJournalEntry[] {
  return EMPTY_PROBLEM_JOURNAL_ENTRIES;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function useProblemJournal(): ProblemJournalEntry[] {
  return useSyncExternalStore(
    subscribe,
    getProblemJournalSnapshot,
    getServerProblemJournalSnapshot
  );
}

/**
 * Get the latest draft entry for a specific project and phase, if one exists.
 */
export function getJournalDraftForPhase(
  project: string,
  phase: string
): ProblemJournalEntry | undefined {
  const entries = getProblemJournalSnapshot();
  return entries.find(
    (e) => e.project === project && e.phase === phase && e.status === "draft"
  );
}

/**
 * Get an entry by its ID.
 */
export function getJournalEntryById(id: string): ProblemJournalEntry | undefined {
  const entries = getProblemJournalSnapshot();
  return entries.find((e) => e.id === id);
}

/**
 * Create or update a draft journal entry for an active phase.
 * If an active draft already exists for this phase, it updates that draft.
 * Otherwise, it creates a new draft.
 */
export function saveOrUpdateDraft(
  project: string,
  phase: string,
  fields: ProblemJournalDraftInput,
  entryId?: string
): ProblemJournalEntry {
  const entries = [...getProblemJournalSnapshot()];
  const now = new Date().toISOString();

  let targetIndex = -1;
  if (entryId) {
    targetIndex = entries.findIndex((e) => e.id === entryId);
  } else {
    targetIndex = entries.findIndex(
      (e) => e.project === project && e.phase === phase && e.status === "draft"
    );
  }

  if (targetIndex >= 0) {
    const existing = entries[targetIndex];
    const updated: ProblemJournalEntry = {
      ...existing,
      ...fields,
      id: existing.id,
      project: existing.project,
      phase: existing.phase,
      status: "draft",
      updatedAt: now,
      highestHelpLevel:
        fields.highestHelpLevel !== undefined
          ? Math.max(existing.highestHelpLevel ?? 0, fields.highestHelpLevel) as 0 | 1 | 2 | 3 | 4 | 5
          : existing.highestHelpLevel,
    };
    entries[targetIndex] = updated;
    persistEntries(entries);
    return updated;
  }

  // Create new draft
  const newEntry: ProblemJournalEntry = {
    id: entryId || `journal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    project,
    phase,
    expectation: fields.expectation || "",
    observation: fields.observation || "",
    cause: fields.cause || "",
    evidence: fields.evidence || "",
    fix: fields.fix || "",
    lesson: fields.lesson || "",
    status: "draft",
    createdAt: now,
    updatedAt: now,
    highestHelpLevel: fields.highestHelpLevel,
  };
  entries.unshift(newEntry);
  persistEntries(entries);
  return newEntry;
}

/**
 * Mark a journal entry as completed.
 */
export function completeJournalEntry(
  id: string,
  finalFields?: ProblemJournalDraftInput
): ProblemJournalEntry | null {
  const entries = [...getProblemJournalSnapshot()];
  const index = entries.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const existing = entries[index];
  const now = new Date().toISOString();
  const completed: ProblemJournalEntry = {
    ...existing,
    ...finalFields,
    id: existing.id,
    project: existing.project,
    phase: existing.phase,
    status: "completed",
    updatedAt: now,
  };

  entries[index] = completed;
  persistEntries(entries);
  return completed;
}

/**
 * Delete a journal entry.
 */
export function deleteJournalEntry(id: string): boolean {
  const entries = getProblemJournalSnapshot();
  const next = entries.filter((e) => e.id !== id);
  if (next.length === entries.length) return false;
  persistEntries(next);
  return true;
}

/**
 * Update the highest help level accessed for an entry.
 */
export function recordHelpLevelForJournal(
  project: string,
  phase: string,
  level: 0 | 1 | 2 | 3 | 4 | 5
) {
  const draft = getJournalDraftForPhase(project, phase);
  if (draft) {
    const currentMax = draft.highestHelpLevel ?? 0;
    if (level > currentMax) {
      saveOrUpdateDraft(project, phase, { highestHelpLevel: level }, draft.id);
    }
  }
}

/**
 * Reset all journal entries (used for tests).
 */
export function __resetProblemJournalForTests() {
  currentEntries = [];
  isLoaded = true;
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.removeItem(PROBLEM_JOURNAL_STORAGE_KEY);
  }
  listeners.forEach((listener) => listener());
}
