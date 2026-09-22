import { TerminalLedgerPhase } from "./types";

export const TERMINAL_LEDGER_PROJECT = {
  id: "terminal-ledger",
  slug: "terminal-ledger",
  title: "Terminal Ledger",
  language: "Python",
  level: "Project 1",
  estimatedTime: "13–18 hours",
  totalPhases: 9,
  checkpoints: [
    { number: 1, afterPhase: 3, name: "Mentor Checkpoint 1: In-Memory & Persistence Defense" },
    { number: 2, afterPhase: 6, name: "Mentor Checkpoint 2: Validation & Dates Review" },
    { number: 3, afterPhase: 9, name: "Mentor Checkpoint 3: Architectural Defense & Final Review" },
  ],
  purpose:
    "A single-user, terminal-first personal finance application that records transactions, persists data between runs, enforces category budgets, generates monthly summary reports, and exports clean CSVs.",
  tagline:
    "Your first substantial software application, built locally in your own terminal and text editor.",
  learningContract:
    "You are NOT expected to know how to build Phase 7 today. Every capability is unlocked just-in-time when a genuine product requirement demands it.",
  prerequisites: "Python Starting Manual (all 11 foundational sections)",
};

export const TERMINAL_LEDGER_PHASES: TerminalLedgerPhase[] = [
  {
    id: "phase-01",
    number: 1,
    slug: "phase-01",
    title: "Plan the Finance System",
    fullTitle: "Phase 1: Plan the Finance System",
    estimatedTime: "1–1.5 hours",
    prerequisites: "Starting Manual complete",
    briefFileName: "phase-01-milestone-brief.md",
    standalonePacks: [], // Planning 01 is integrated in the brief
    isCheckpointFollowed: false,
    summary:
      "Define product behavior, information requirements, observable results, and your Project Launch Sheet before writing code.",
    criteria: [
      "Project Launch Sheet contains clear, non-code answers for Purpose, User, and Observable Results.",
      "List 5 to 8 concrete behaviors Terminal Ledger must eventually perform.",
      "Smallest first milestone identified: describe what the user enters and what the program displays.",
      "Explicitly list at least three features deliberately deferred from your first milestone.",
      "Evidence-based debugging plan and 10-step help plan established.",
    ],
  },
  {
    id: "phase-02",
    number: 2,
    slug: "phase-02",
    title: "Transactions in Memory",
    fullTitle: "Phase 2: Transactions in Memory",
    estimatedTime: "1.5–2 hours",
    prerequisites: "Phase 1 complete — your Project Launch Sheet",
    briefFileName: "phase-02-milestone-brief.md",
    standalonePacks: [
      {
        id: "records-01",
        title: "Records 01 — Modeling One Thing with Several Fields",
        shortTitle: "Records 01",
        slug: "records-01-modeling-one-thing-with-several-fields",
        filename: "records-01-modeling-one-thing-with-several-fields.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Starting Manual Sections 06–08 (dictionaries, loops, functions)",
      },
      {
        id: "display-01",
        title: "Display 01 — Aligned, Readable Terminal Output",
        shortTitle: "Display 01",
        slug: "display-01-aligned-readable-terminal-output",
        filename: "display-01-aligned-readable-terminal-output.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Starting Manual Section 04 (f-strings)",
      },
    ],
    isCheckpointFollowed: false,
    summary:
      "Turn your Phase 1 plan into a runnable in-memory program that records, stores, and displays transaction records.",
    criteria: [
      "Program runs from your terminal using python3.",
      "Chosen first-milestone behavior can be performed end-to-end.",
      "Information entered remains available in memory during the program run.",
      "Observable output matches what was entered and executed.",
      "You can defend your chosen data representation (why you chose your fields and dictionary structure).",
      "One debugging issue diagnosed using concrete evidence rather than guessing.",
    ],
  },
  {
    id: "phase-03",
    number: 3,
    slug: "phase-03",
    title: "Save and Load Data",
    fullTitle: "Phase 3: Save and Load Data",
    estimatedTime: "2–2.5 hours",
    prerequisites: "Phase 2 complete — a running in-memory Terminal Ledger",
    briefFileName: "phase-03-milestone-brief.md",
    standalonePacks: [
      {
        id: "persistence-01",
        title: "Persistence 01 — Files, Modes, and the `with` Statement",
        shortTitle: "Persistence 01",
        slug: "persistence-01-files-modes-and-the-with-statement",
        filename: "persistence-01-files-modes-and-the-with-statement.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Starting Manual Sections 01–08",
      },
      {
        id: "persistence-02",
        title: "Persistence 02 — JSON: Serializing Values to Text and Back",
        shortTitle: "Persistence 02",
        slug: "persistence-02-json-serializing-values-to-text-and-back",
        filename: "persistence-02-json-serializing-values-to-text-and-back.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Persistence 01, Starting Manual Section 06 (dictionaries)",
      },
    ],
    isCheckpointFollowed: true,
    checkpointNumber: 1,
    summary:
      "Make transactions survive program termination by serializing ledger state to disk in human-readable JSON.",
    criteria: [
      "Observable state after restart matches the intended state before exit.",
      "First run (with no data file existing) produces no crash and starts with a sensible default state.",
      "Data file on disk is valid JSON text that can be viewed and verified in a text editor.",
      "You can narrate the persistence lifecycle (startup load -> in-memory work -> save before exit) from memory.",
      "Verified the persistence round-trip with a structured manual test transcript.",
      "Ready for Mentor Checkpoint 1 (conversation on persistence lifecycle and data structures).",
    ],
  },
  {
    id: "phase-04",
    number: 4,
    slug: "phase-04",
    title: "Validate Bad Input",
    fullTitle: "Phase 4: Validate Bad Input",
    estimatedTime: "1.5–2 hours",
    prerequisites: "Phase 3 complete — persistent state survives a restart",
    briefFileName: "phase-04-milestone-brief.md",
    standalonePacks: [
      {
        id: "robust-input-01",
        title: "Robust Input 01 — Validating and Re-Prompting User Input",
        shortTitle: "Robust Input 01",
        slug: "robust-input-01-validating-and-re-prompting-user-input",
        filename: "robust-input-01-validating-and-re-prompting-user-input.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Starting Manual Sections 04, 05, 07 (input, conditionals, while loops)",
      },
      {
        id: "numbers-01",
        title: "Numbers 01 — Float Precision and Displaying Decimal Values",
        shortTitle: "Numbers 01",
        slug: "numbers-01-float-precision-and-displaying-decimal-values",
        filename: "numbers-01-float-precision-and-displaying-decimal-values.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Starting Manual Sections 02, 04 (numeric types, f-string formatting)",
      },
      {
        id: "persistence-03",
        title: "Persistence 03 — Defensive Loading",
        shortTitle: "Persistence 03",
        slug: "persistence-03-defensive-loading",
        filename: "persistence-03-defensive-loading.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Persistence 01, Persistence 02, Starting Manual Section 09 (try/except)",
      },
    ],
    isCheckpointFollowed: false,
    summary:
      "Protect your program from crashes using bounded validation re-prompt loops and defensive file loading.",
    criteria: [
      "Valid user input still produces the intended behavior cleanly.",
      "Each interactive input boundary re-prompts calmly without crashing on non-convertible text.",
      "Exception handling is narrow and specific to expected operations.",
      "Missing, empty, and malformed data files are handled defensively without silent data destruction.",
      "Normal persistence round-trip continues to succeed reliably.",
      "Decimal amounts are displayed with intentional formatting (e.g. 2 decimal places).",
    ],
  },
  {
    id: "phase-05",
    number: 5,
    slug: "phase-05",
    title: "Categories and Filtering",
    fullTitle: "Phase 5: Categories and Filtering",
    estimatedTime: "1.5–2 hours",
    prerequisites: "Phase 4 complete — boundaries reject bad input and stored state loads defensively",
    briefFileName: "phase-05-milestone-brief.md",
    standalonePacks: [
      {
        id: "strings-01",
        title: "Strings 01 — Normalizing Text for Reliable Comparison",
        shortTitle: "Strings 01",
        slug: "strings-01-normalizing-text-for-reliable-comparison",
        filename: "strings-01-normalizing-text-for-reliable-comparison.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Starting Manual Sections 02, 05 (strings, comparisons)",
      },
      {
        id: "querying-01",
        title: "Querying 01 — Building Filtered Subsets",
        shortTitle: "Querying 01",
        slug: "querying-01-building-filtered-subsets",
        filename: "querying-01-building-filtered-subsets.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Starting Manual Sections 06–08 (lists, loops, functions)",
      },
    ],
    isCheckpointFollowed: false,
    summary:
      "Tag records with normalized categories and derive filtered subsets without altering source records.",
    criteria: [
      "Text differences at edges and letter casing are normalized by an explicit policy (e.g. strip and lower).",
      "Category filtered view contains only records matching the query.",
      "Filtering correctly handles zero matches, one match, and multiple matches.",
      "Original master ledger collection remains unmutated after filtering.",
      "Category information survives program exit and restart via JSON.",
      "You can explain why filtered subsets are derived dynamically rather than stored as duplicate truth.",
    ],
  },
  {
    id: "phase-06",
    number: 6,
    slug: "phase-06",
    title: "Dates and Monthly Views",
    fullTitle: "Phase 6: Dates and Monthly Views",
    estimatedTime: "1–1.5 hours",
    prerequisites: "Phase 5 complete — normalized grouping and filtered subsets work across restarts",
    briefFileName: "phase-06-milestone-brief.md",
    standalonePacks: [
      {
        id: "dates-01",
        title: "Dates 01 — Working With Dates in Python",
        shortTitle: "Dates 01",
        slug: "dates-01-working-with-dates-in-python",
        filename: "dates-01-working-with-dates-in-python.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Starting Manual Sections 02, 09 (types, modules, try/except)",
      },
      {
        id: "dates-02",
        title: "Dates 02 — Building Monthly Views",
        shortTitle: "Dates 02",
        slug: "dates-02-building-monthly-views",
        filename: "dates-02-building-monthly-views.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Dates 01, Querying 01",
      },
    ],
    isCheckpointFollowed: true,
    checkpointNumber: 2,
    summary:
      "Parse and validate ISO dates, store chronological timestamps, and construct monthly financial views.",
    criteria: [
      "Valid date input parses reliably; invalid or impossible dates are rejected gracefully.",
      "Stored date values survive restart and compare chronologically.",
      "Monthly selection accurately inspects both year and month (e.g. 2026-03).",
      "Zero, single, and multiple monthly records all render correctly.",
      "Earlier validation, persistence, and categorization continue to function.",
      "Ready for Mentor Checkpoint 2 (reviewing date logic, edge cases, and query abstractions).",
    ],
  },
  {
    id: "phase-07",
    number: 7,
    slug: "phase-07",
    title: "Budgets",
    fullTitle: "Phase 7: Budgets",
    estimatedTime: "1–1.5 hours",
    prerequisites: "Phase 6 complete — date parsing, formatting, chronological comparison, and monthly views work across restarts",
    briefFileName: "phase-07-milestone-brief.md",
    standalonePacks: [
      {
        id: "state-02",
        title: "State 02 — Persisting More Than One Kind of State",
        shortTitle: "State 02",
        slug: "state-02-persisting-more-than-one-kind-of-state.md",
        filename: "state-02-persisting-more-than-one-kind-of-state.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Persistence 02, Starting Manual Section 06 (nested dictionaries)",
      },
      {
        id: "display-02",
        title: "Display 02 — Showing Progress Toward a Threshold",
        shortTitle: "Display 02",
        slug: "display-02-showing-progress-toward-a-threshold",
        filename: "display-02-showing-progress-toward-a-threshold.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Display 01, Starting Manual Section 04",
      },
      {
        id: "verification-01",
        title: "Verification 01 — Writing Small Checks for Your Logic",
        shortTitle: "Verification 01",
        slug: "verification-01-writing-small-checks-for-your-logic",
        filename: "verification-01-writing-small-checks-for-your-logic.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Starting Manual Section 08 (functions, assert)",
      },
    ],
    isCheckpointFollowed: false,
    summary:
      "Persist category budget limits alongside transactions, track spending thresholds, and show bounded visual progress bars.",
    criteria: [
      "Both transaction records and category budget limits persist safely in storage without overwriting each other.",
      "Saving a new budget preserves all transactions; saving a transaction preserves budget limits.",
      "Budget view shows current spending, limit, remaining amount, and a visual bar indicator.",
      "Zero budget limits or zero spending never trigger ZeroDivisionError.",
      "Exceeding a budget displays clear, honest warning status without corrupting terminal layout.",
      "Written at least one small verification check script to confirm budget calculations.",
    ],
  },
  {
    id: "phase-08",
    number: 8,
    slug: "phase-08",
    title: "Reports and Summaries",
    fullTitle: "Phase 8: Reports and Summaries",
    estimatedTime: "1.5–2 hours",
    prerequisites: "Phase 7 complete — compound state persistence, threshold calculations, and visual indicators work across restarts",
    briefFileName: "phase-08-milestone-brief.md",
    standalonePacks: [
      {
        id: "aggregation-01",
        title: "Aggregation 01 — Accumulating Values by Group",
        shortTitle: "Aggregation 01",
        slug: "aggregation-01-accumulating-values-by-group",
        filename: "aggregation-01-accumulating-values-by-group.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Starting Manual Sections 06–08 (dictionaries, accumulator pattern)",
      },
      {
        id: "ordering-01",
        title: "Ordering 01 — Sorting and Selecting Top Results",
        shortTitle: "Ordering 01",
        slug: "ordering-01-sorting-and-selecting-top-results",
        filename: "ordering-01-sorting-and-selecting-top-results.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Starting Manual Section 06 (lists, functions, sorted)",
      },
    ],
    isCheckpointFollowed: false,
    summary:
      "Aggregate transaction data by category into sorted summary reports and highlight top spending categories.",
    criteria: [
      "Application generates a summary report aggregating entries into grouped category totals.",
      "Report displays groups in sorted order (e.g. descending by total spend).",
      "Edge cases (empty dataset, single record, tied totals, top N exceeding count) handled robustly.",
      "Running reports leaves underlying transaction records completely unmutated.",
      "Report numbers verified against manual arithmetic calculations.",
    ],
  },
  {
    id: "phase-09",
    number: 9,
    slug: "phase-09",
    title: "Export and Refactor",
    fullTitle: "Phase 9: Export and Refactor",
    estimatedTime: "2–3 hours",
    prerequisites: "Phase 8 complete — grouped aggregation, sorted rankings, and summary reports work across restarts",
    briefFileName: "phase-09-milestone-brief.md",
    standalonePacks: [
      {
        id: "interoperability-01",
        title: "Interoperability 01 — Writing Data to CSV",
        shortTitle: "Interoperability 01",
        slug: "interoperability-01-writing-data-to-csv",
        filename: "interoperability-01-writing-data-to-csv.md",
        estimatedTime: "15–20 minutes",
        prerequisites: "Persistence 01, Starting Manual Section 06",
      },
      {
        id: "architecture-01",
        title: "Architecture 01 — Refactoring a Growing Program",
        shortTitle: "Architecture 01",
        slug: "architecture-01-refactoring-a-growing-program",
        filename: "architecture-01-refactoring-a-growing-program.md",
        estimatedTime: "20–25 minutes",
        prerequisites: "Starting Manual Sections 07–08 (functions, modular organization)",
      },
    ],
    isCheckpointFollowed: true,
    checkpointNumber: 3,
    summary:
      "Export ledger records to standards-compliant CSV files and refactor the codebase for long-term clarity and separation of concerns.",
    criteria: [
      "Application exports ledger records to a clean CSV file that spreadsheet software opens cleanly.",
      "Special characters (commas, quotes) in transaction notes are escaped according to CSV standards.",
      "Storage boundary remains isolated: CSV export is an output operation and never replaces JSON persistence.",
      "Codebase refactored into cohesive functions and clear modules (single-file or multi-file).",
      "Full regression manual test confirms all capabilities from Phases 1–8 still work.",
      "Ready for Mentor Checkpoint 3 (final comprehensive code defense and project review).",
    ],
  },
];

export function getPhaseBySlug(slug: string): TerminalLedgerPhase | undefined {
  // Support both "phase-01" and numeric alias "1" or "01"
  const normalized = slug.startsWith("phase-")
    ? slug
    : `phase-${slug.padStart(2, "0")}`;
  return TERMINAL_LEDGER_PHASES.find((p) => p.slug === normalized || p.id === normalized);
}

export function getPhaseByNumber(num: number): TerminalLedgerPhase | undefined {
  return TERMINAL_LEDGER_PHASES.find((p) => p.number === num);
}

export function getNextPhase(slug: string): TerminalLedgerPhase | undefined {
  const current = getPhaseBySlug(slug);
  if (!current) return undefined;
  return getPhaseByNumber(current.number + 1);
}

export function getPrevPhase(slug: string): TerminalLedgerPhase | undefined {
  const current = getPhaseBySlug(slug);
  if (!current) return undefined;
  return getPhaseByNumber(current.number - 1);
}
