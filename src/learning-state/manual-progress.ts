import { useSyncExternalStore, useCallback } from "react";
import {
  STARTING_MANUAL_SECTIONS,
  ManualSectionItem,
  getNextSection,
} from "../lib/docs/manual-structure";

export const MANUAL_PROGRESS_STORAGE_KEY = "piplearn_manual_progress_v1";

export interface LearnerManualProgress {
  completedSections: string[]; // List of completed section slugs
  lastReadSectionSlug: string;
  updatedAt: string;
}

export const INITIAL_MANUAL_PROGRESS: LearnerManualProgress = {
  completedSections: [],
  lastReadSectionSlug: STARTING_MANUAL_SECTIONS[0]?.slug || "01-what-programming-actually-is",
  updatedAt: new Date(0).toISOString(),
};

let currentProgress: LearnerManualProgress = INITIAL_MANUAL_PROGRESS;
let isLoaded = false;
const listeners = new Set<() => void>();

function safeLoadFromStorage(): LearnerManualProgress {
  if (typeof window === "undefined" || !window.localStorage) {
    return INITIAL_MANUAL_PROGRESS;
  }
  try {
    const raw = window.localStorage.getItem(MANUAL_PROGRESS_STORAGE_KEY);
    if (!raw) return INITIAL_MANUAL_PROGRESS;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.completedSections)) {
      return {
        completedSections: parsed.completedSections.filter((s: unknown): s is string => typeof s === "string"),
        lastReadSectionSlug: typeof parsed.lastReadSectionSlug === "string" ? parsed.lastReadSectionSlug : INITIAL_MANUAL_PROGRESS.lastReadSectionSlug,
        updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error("Failed to load manual progress from localStorage:", err);
  }
  return INITIAL_MANUAL_PROGRESS;
}

function persistProgress(next: LearnerManualProgress) {
  currentProgress = next;
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(MANUAL_PROGRESS_STORAGE_KEY, JSON.stringify(next));
    } catch (err) {
      console.error("Failed to persist manual progress to localStorage:", err);
    }
  }
  listeners.forEach((listener) => listener());
}

export function getManualProgressSnapshot(): LearnerManualProgress {
  if (!isLoaded) {
    isLoaded = true;
    currentProgress = safeLoadFromStorage();
  }
  return currentProgress;
}

export function getServerManualProgressSnapshot(): LearnerManualProgress {
  return INITIAL_MANUAL_PROGRESS;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

/**
 * Derives the next meaningful section to resume.
 * Finds the first section in sequential order that has not yet been marked complete.
 * If all 11 are completed, returns the final section (Section 11).
 */
export function deriveResumeSection(progress: LearnerManualProgress): {
  section: ManualSectionItem;
  isAllComplete: boolean;
} {
  const completedSet = new Set(progress.completedSections);
  const firstIncomplete = STARTING_MANUAL_SECTIONS.find((s) => !completedSet.has(s.slug));

  if (!firstIncomplete) {
    // All 11 sections are complete
    return {
      section: STARTING_MANUAL_SECTIONS[STARTING_MANUAL_SECTIONS.length - 1],
      isAllComplete: true,
    };
  }

  return {
    section: firstIncomplete,
    isAllComplete: false,
  };
}

export function markSectionComplete(slug: string): LearnerManualProgress {
  const snapshot = getManualProgressSnapshot();
  const completedSet = new Set(snapshot.completedSections);
  completedSet.add(slug);

  const nextSection = getNextSection(slug);
  const nextLastRead = nextSection ? nextSection.slug : slug;

  const next: LearnerManualProgress = {
    completedSections: Array.from(completedSet),
    lastReadSectionSlug: nextLastRead,
    updatedAt: new Date().toISOString(),
  };

  persistProgress(next);
  return next;
}

export function unmarkSectionComplete(slug: string): LearnerManualProgress {
  const snapshot = getManualProgressSnapshot();
  const next: LearnerManualProgress = {
    ...snapshot,
    completedSections: snapshot.completedSections.filter((s) => s !== slug),
    updatedAt: new Date().toISOString(),
  };
  persistProgress(next);
  return next;
}

export function setLastReadSection(slug: string): LearnerManualProgress {
  const snapshot = getManualProgressSnapshot();
  if (snapshot.lastReadSectionSlug === slug) {
    return snapshot;
  }
  const next: LearnerManualProgress = {
    ...snapshot,
    lastReadSectionSlug: slug,
    updatedAt: new Date().toISOString(),
  };
  persistProgress(next);
  return next;
}

export function resetManualProgress(): void {
  persistProgress(INITIAL_MANUAL_PROGRESS);
}

/**
 * React hook for consuming and updating Starting Manual progress.
 * Backed by useSyncExternalStore to prevent SSR hydration mismatches.
 */
export function useManualProgress() {
  const progress = useSyncExternalStore(
    subscribe,
    getManualProgressSnapshot,
    getServerManualProgressSnapshot
  );

  const { section: resumeSection, isAllComplete } = deriveResumeSection(progress);
  const completedCount = progress.completedSections.length;
  const totalCount = STARTING_MANUAL_SECTIONS.length;

  const isSectionCompleted = useCallback(
    (slug: string) => progress.completedSections.includes(slug),
    [progress.completedSections]
  );

  const handleMarkComplete = useCallback((slug: string) => {
    markSectionComplete(slug);
  }, []);

  const handleUnmarkComplete = useCallback((slug: string) => {
    unmarkSectionComplete(slug);
  }, []);

  const handleSetLastRead = useCallback((slug: string) => {
    setLastReadSection(slug);
  }, []);

  const handleReset = useCallback(() => {
    resetManualProgress();
  }, []);

  return {
    progress,
    completedSections: progress.completedSections,
    completedCount,
    totalCount,
    isComplete: isAllComplete,
    resumeSection,
    isSectionCompleted,
    markComplete: handleMarkComplete,
    unmarkComplete: handleUnmarkComplete,
    setLastRead: handleSetLastRead,
    reset: handleReset,
  };
}
