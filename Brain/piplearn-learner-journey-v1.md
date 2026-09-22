# PipLearn — Learner Journey & Product Architecture V1

> **Document Identifier:** PROD-ARCH-001  
> **Status:** Proposed for Lock — Authoritative Product Architecture & Information Architecture Blueprint  
> **Target HEAD:** `60125b4e1422cd95ab62c260dce7960859a93ecc`  
> **Reads against:**  
> - `Brain/piplearn_documentation_standard.md` (DOC-STD-001)  
> - `Brain/python_starting_manual_plan.md`  
> - `Brain/python_knowledge_map.md`  
> - `Brain/projects/python/terminal-ledger/learning-architecture-v1.md`  
> - `Brain/projects/python/terminal-ledger/phase-01-milestone-brief.md` through `phase-09-milestone-brief.md`  
> - Locked Starting Manual (`Brain/content/python/starting-manual/01` through `11`)  
> **Audience:** Product Engineering, Frontend/Backend Architecture, Pedagogical Leads  
> **Scope:** Defines the complete authenticated learner journey from login to project completion and next-project readiness for PipLearn V1.

---

## 1. Purpose

PipLearn has authored and locked a rigorous curriculum: an 11-section Starting Manual and a complete 9-phase architecture for its first substantial project, Terminal Ledger.

The purpose of this document is to define how a learner actually experiences, navigates, and progresses through PipLearn as a **software product**.

This is not a marketing overview, a visual mockup specification, or a database schema. It is the **authoritative product blueprint** defining:
1. The exact product states a learner transitions through.
2. The authenticated information architecture and navigation hierarchy.
3. The behavioral interactions for studying, building locally, getting stuck, using documentation, escalating help, recording problem journal entries, completing phases, attending mentor checkpoints, and reviewing finished projects.
4. The product state persistence boundaries (durable vs. derived vs. transient).
5. The strict boundary between V1 core requirements and later extensions.

---

## 2. Locked Learning Philosophy

PipLearn is built on a single, uncompromising premise: **people learn to program by building real software on their own machines.**

### 2.1 The Core Learning Loop

The software interface must support and reinforce this cyclical journey:

```
┌─────────────────────────────────────────────────────────┐
│                      UNDERSTAND                         │
│         Read milestone brief & behavioral goals         │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                        BUILD                            │
│           Write code in local editor & terminal         │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                      GET STUCK                          │
│        Encounter runtime error or logic gap             │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                        THINK                            │
│           Isolate, inspect types & tracebacks           │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    USE RESOURCES                        │
│           Consult phase-linked Knowledge Packs          │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                      TRY AGAIN                          │
│            Change ONE thing based on evidence           │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   CONTEXTUAL HELP                       │
│        Calm 6-level help ladder (L0 → L5)               │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                        DEBUG                            │
│          7-Step Diagnostic Protocol in terminal         │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                  COMPLETE MILESTONE                     │
│          Demonstrate behavior & verify checklist        │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                       REFLECT                           │
│        Answer reflection prompt & log journal           │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                      CONTINUE                           │
│            Advance to next phase milestone              │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    FINISH PROJECT                       │
│            Export, refactor & final review              │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                        REVIEW                           │
│        Mentor Checkpoint 3 & final defense              │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                     NEXT PROJECT                        │
│          Transition to next software challenge          │
└─────────────────────────────────────────────────────────┘
```

### 2.2 What PipLearn Is NOT

PipLearn explicitly rejects the dominant tropes of consumer ed-tech and AI tutoring:

* **NOT a video course:** No passive watching, talking heads, or follow-along transcription.
* **NOT a quiz platform:** No multiple-choice questions, flashcards, or synthetic drag-and-drop puzzles.
* **NOT a gamified Skinner box:** No streaks, XP points, coins, badges, leaderboards, or confetti animations.
* **NOT an IDE replacement:** The learner does NOT code inside a browser iframe. They use their own operating system, text editor (VS Code, Cursor, Neovim, etc.), and local Python runtime.
* **NOT an AI chatbot wrapper:** AI is never a floating chat bubble waiting to generate solutions. AI is strictly constrained behind a structured, evidence-gated help ladder.
* **NOT an auto-solver:** PipLearn will never output copy-pasteable project code solutions.

---

## 3. Learner Journey Overview

The complete learner progression spans six major operational phases:

```
[1. AUTH & ORIENTATION]
       │
       ▼
[2. STARTING MANUAL] (Sections 01–11)
       │
       ▼
[3. PROJECT ONBOARDING] (Terminal Ledger Orientation & Local Setup)
       │
       ▼
[4. ACTIVE PROJECT WORKSPACE] (Phases 01–09 Loop)
       │  ├─ Phase Brief & Acceptance Criteria
       │  ├─ Contextual Knowledge Packs
       │  ├─ Help Ladder (L0–L5)
       │  ├─ Problem Journal
       │  └─ Behavioral Verification Checklist
       │
       ▼
[5. MENTOR CHECKPOINTS]
       │  ├─ Checkpoint 1 (End of Phase 3 — Persistence Lifecycle)
       │  ├─ Checkpoint 2 (End of Phase 6 — Mid-Project Calibration)
       │  └─ Checkpoint 3 (End of Phase 9 — Final Review & Defense)
       │
       ▼
[6. PROJECT COMPLETION & RETROSPECTIVE]
       │
       ▼
[7. READINESS FOR PROJECT 2]
```

### 3.1 Stage 1: Authentication & Calm Orientation
The learner logs in via email/magic link or password. There is no splashy onboarding questionnaire, no skill assessment quiz, and no personalized algorithm setup. The product immediately welcomes the learner into a calm workspace and presents a single, clear next step.

### 3.2 Stage 2: The Starting Manual (Sections 01–11)
The learner reads and experiments through the 11 foundational sections. Every section teaches core mental models with short, unencumbered examples (maximum 5 lines) and terminal experiments. The learner writes code in a scratch file on their machine. As they complete sections, progress is recorded quietly. Section 11 bridges them directly to building software, establishing the 5 planning questions, the 10-step escalation protocol, and the Problem Journal.

### 3.3 Stage 3: Project Selection & Local Orientation
The learner enters Terminal Ledger. PipLearn presents a transparent project overview: what they will build (a terminal personal finance manager), time commitment (10–18 hours), what they already know from the manual, what they will learn just-in-time, and reassurance that they are not expected to know everything upfront. The learner creates a directory on their machine (`terminal_ledger/`) and initializes their workspace.

### 3.4 Stage 4: Phase Execution Loop (Phases 1–9)
For each phase, the learner works through a structured milestone brief. The brief outlines:
- The user-facing capability to add.
- What must be observably true in the terminal.
- Links to unlocked Knowledge Packs.
- Potential pitfalls and diagnostic questions.
- A behavioral verification checklist.

When stuck, the learner engages the Help Ladder or logs a Problem Journal entry.

### 3.5 Stage 5: Structured Mentor Checkpoints
At three designated milestones (End of Phase 3, End of Phase 6, End of Phase 9), progress gates until a human conversation occurs. Checkpoints are conversational defenses with mentors (Tirth, Darsh, Raj) focused on reasoning, data flow, and debugging evidence—never numerical grades.

### 3.6 Stage 6: Project Completion & Synthesis
After completing Phase 9 and passing Mentor Checkpoint 3, the learner conducts a comprehensive retrospective. They inventory their new capabilities, review their Problem Journal patterns, and articulate what they can now build and explain.

### 3.7 Stage 7: Transition to Next Project
The learner transitions forward with realistic confidence, recognizing what they have mastered and what remains unfamiliar, prepared for the next project's distinct pressures.

---

## 4. Product State Model

To avoid brittle UI logic and bloated schemas, PipLearn classifies all learner state into three rigorous categories: **Durable State**, **Derived State**, and **Transient UI State**.

```
┌─────────────────────────────────────────────────────────────┐
│                       DURABLE STATE                         │
│             (Persisted to Database / Backend)               │
│                                                             │
│  • User identity & profile                                  │
│  • Completed manual sections: Set<section_id>               │
│  • Active project ID: string                                │
│  • Active phase ID: string                                  │
│  • Completed phases: Map<phase_id, CompletionRecord>        │
│  • Problem Journal entries: Array<JournalEntry>             │
│  • Mentor Checkpoints: Map<checkpoint_id, CheckpointRecord> │
│  • Project status: "not_started"|"in_progress"|"completed"  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                       DERIVED STATE                         │
│            (Computed on-the-fly at runtime)                 │
│                                                             │
│  • Current dominant next action                             │
│  • Active blocker (e.g. Checkpoint Due)                     │
│  • Project progress (e.g. "Phase 4 of 9", "1 of 3 reviews") │
│  • Unlocked Knowledge Packs list                            │
│  • Journal entries linked to active phase                   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     TRANSIENT UI STATE                      │
│                (Client memory / session only)               │
│                                                             │
│  • Open/closed drawer state (Help, Packs, Journal)          │
│  • Help Ladder active escalation level (L0–L5)              │
│  • Unsaved inputs in journal draft                          │
│  • Active tab / scroll position                             │
│  • Verification checklist checkbox toggles during session   │
└─────────────────────────────────────────────────────────────┘
```

### 4.1 Durable State (Must Persist)

This represents the permanent, unforgeable history of the learner's journey:

```typescript
interface DurableLearnerState {
  userId: string;
  createdAt: string;
  updatedAt: string;

  // Starting Manual Progression
  manualProgress: {
    completedSections: string[]; // e.g. ["01-what-programming-actually-is", ...]
    lastReadSectionId: string;
    completedAt?: string;
  };

  // Active Project Progression
  activeProjectId: string; // e.g. "terminal-ledger"
  projectProgress: Record<string, {
    status: "not_started" | "in_progress" | "completed";
    currentPhaseId: string; // e.g. "phase-04"
    completedPhases: Record<string, {
      completedAt: string;
      checklistConfirmed: boolean;
      reflectionResponse: string;
      verificationNotes?: string;
    }>;
    startedAt: string;
    completedAt?: string;
  }>;

  // Problem Journal Records
  problemJournal: Array<{
    id: string;
    projectId: string;
    phaseId: string;
    createdAt: string;
    updatedAt: string;
    status: "investigating" | "resolved";
    expectation: string;
    observation: string;
    cause: string;
    evidenceUsed: string;
    fix: string;
    lessonNextTime: string;
  }>;

  // Mentor Checkpoint Records
  mentorCheckpoints: Record<string, { // checkpointId: "tl-cp-1" | "tl-cp-2" | "tl-cp-3"
    projectId: string;
    phaseId: string; // e.g. "phase-03"
    status: "not_due" | "due" | "scheduled" | "completed";
    scheduledTime?: string;
    mentorId?: "tirth" | "darsh" | "raj";
    completedAt?: string;
    mentorNotes?: string; // Summary of discussion recorded by mentor
  }>;
}
```

### 4.2 Derived State (Computed at Runtime)

Derived state is never written to disk; it is deterministically calculated from durable records:

1. **Dominant Next Action:**
   - If `manualProgress.completedSections.length < 11`:  
     `{ action: "RESUME_MANUAL", sectionId: nextUncompletedSection }`
   - If manual complete and project not started:  
     `{ action: "START_PROJECT", projectId: "terminal-ledger" }`
   - If active phase has an uncompleted checkpoint due:  
     `{ action: "SCHEDULE_CHECKPOINT", checkpointId: dueCheckpointId }`
   - If active phase in progress:  
     `{ action: "RESUME_PHASE", projectId: "terminal-ledger", phaseId: currentPhaseId }`
   - If all 9 phases complete and Checkpoint 3 done:  
     `{ action: "VIEW_PROJECT_REVIEW", projectId: "terminal-ledger" }`

2. **Project Progress Summary:**
   - `completedPhasesCount`: number (0–9)
   - `completedCheckpointsCount`: number (0–3)
   - `totalJournalEntries`: count of entries for project

3. **Active Blocker:**
   - Returns null if the learner can proceed freely.
   - Returns `{ type: "CHECKPOINT_REQUIRED", checkpointId, mentorList }` when reaching end of Phase 3, 6, or 9 before mentor sign-off.

### 4.3 Transient UI State (In-Memory Only)

Exists only in React component state or local storage during an active browser session:
- Active sidebar/drawer open states (`isHelpOpen`, `isDocsOpen`, `isJournalOpen`).
- Active Help Ladder step (`currentHelpLevel`: 0 | 1 | 2 | 3 | 4 | 5).
- Text in an unsubmitted Problem Journal input form.
- Session-specific checkbox clicks in the verification checklist before final submission.
- Search filter query in the Knowledge Pack drawer.

---

## 5. Authenticated Information Architecture

PipLearn avoids the common SaaS mistake of building dozens of disconnected pages and nested menus. The application uses a **compact, high-density information architecture** centered on the learner's active task.

```
                     AUTHENTICATED APP SHELL
                               │
     ┌─────────────────────────┼─────────────────────────┐
     ▼                         ▼                         ▼
[/home]                   [/manual/[slug]]          [/projects/[slug]]
Learner Home              Linear Reader             Overview & Setup
(Single Next Action)      (Sections 01–11)               │
                                                         ▼
                                             [/projects/[slug]/phases/[phaseId]]
                                             ACTIVE PHASE WORKSPACE
                                             (The Primary Product Surface)
                                             │
                       ┌─────────────────────┼─────────────────────┐
                       ▼                     ▼                     ▼
                 [PACK DRAWER]         [HELP DRAWER]        [JOURNAL DRAWER]
                 Contextual Docs       L0–L5 Escalation     6-Field Problem
                 (No project code)     (Evidence-gated)     Notebook
```

### Surface Hierarchy & Principles

| Surface | Nature | Primary Role | Secondary Access |
|---|---|---|---|
| **Learner Home (`/home`)** | Dedicated Route | Orientation, dominant resume action, blocker resolution | Quiet links to Manual, Roadmap, Journal |
| **Manual Reader (`/manual/[slug]`)** | Dedicated Route | Distraction-free reading and experimentation for Sections 01–11 | Section sidebar, "Mark Complete & Continue" |
| **Project Overview (`/projects/[slug]`)** | Dedicated Route | Project scope, expectations, prerequisites, local setup | Milestone roadmap summary |
| **Active Phase Workspace (`/projects/[slug]/phases/[phaseId]`)** | Dedicated Route | Primary daily work surface: brief, criteria, verification | Docked drawers for Packs, Help, Journal |
| **Knowledge Pack Viewer** | Slide-over Drawer (or Split) | Reading just-in-time concept packs without losing phase context | Standalone doc reader fallback |
| **Help Ladder Panel** | Slide-over Drawer | 6-level step-by-step diagnostic escalation | Direct links to Journal |
| **Problem Journal** | Drawer & Standalone (`/journal`) | Fast in-situ recording during debugging or full review | Filter by project/phase |
| **Mentor Checkpoint Modal/Card** | Contextual Overlay / Route (`/mentors`) | Booking, prep review, and completed notes | Cal.com scheduling embed |
| **Project Retrospective (`/projects/[slug]/review`)** | Dedicated Route | Final capability synthesis and self-assessment | Read-only summary of project milestones |

---

## 6. Home / Continue Experience (`/home`)

The home surface is the first thing a learner sees after login. It is intentionally **anti-dashboard**.

### 6.1 The Four Essential Questions

Every visit to `/home` immediately answers:
1. **What am I currently doing?** (e.g., *Terminal Ledger — Phase 4: Robust Input and Defensive Loading*)
2. **What is the next meaningful action?** (e.g., *Resume Milestone Brief* or *Schedule Mentor Checkpoint 1*)
3. **Where can I resume?** (One prominent, primary button)
4. **Is anything blocking me?** (Clear, calm indicator if a mentor checkpoint is due)

### 6.2 Visual Layout & Hierarchy

```
┌──────────────────────────────────────────────────────────────────────────┐
│  PipLearn                         Terminal Ledger     Docs     Journal   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  CURRENT WORKSPACE                                                       │
│  Terminal Ledger · Python Project 1                                      │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  Phase 04 — Robust Input & Defensive Loading                       │  │
│  │                                                                    │  │
│  │  Objective: Protect the ledger against bad user input and missing  │  │
│  │  files so the terminal never crashes with an unhandled exception.  │  │
│  │                                                                    │  │
│  │  [ RESUME PHASE 04 ──> ]                                          │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ROADMAP & STATUS                                                        │
│  Phase 1: In-Memory Ledger          ✓ Completed                          │
│  Phase 2: Structured Records        ✓ Completed                          │
│  Phase 3: Persistent Storage        ✓ Completed (Checkpoint 1 Cleared)   │
│  Phase 4: Robust Input              ● Active                             │
│  Phase 5: Filtering & Categories    ○ Next                               │
│  Phase 6: Dates & Monthly Views     ○ Scheduled Checkpoint 2             │
│  Phase 7: Budgets                   ○                                    │
│  Phase 8: Reports & Aggregation     ○                                    │
│  Phase 9: Export & Refactoring      ○ Scheduled Checkpoint 3             │
│                                                                          │
│  QUIET SHORTCUTS                                                         │
│  [ Starting Manual ]   [ Problem Journal (4 entries) ]   [ Knowledge Map]│
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Prohibited Elements
- ❌ No flame icons, streak counters, or daily goals.
- ❌ No experience points (XP), learner levels, or rank badges.
- ❌ No motivational quotes or cheerleading banners.
- ❌ No fake "community activity feeds" or leaderboards.
- ❌ No unsolicited floating AI chat widgets.

---

## 7. Starting Manual Experience (`/manual/[slug]`)

The Starting Manual is the 11-section foundational curriculum taught in `Brain/content/python/starting-manual/`.

### 7.1 Reading & Experimentation Flow
1. **Clean Typography:** Built directly on PipLearn's locked `DocumentationReader` standard with serif body text, monospaced code blocks, syntax highlighting, and restrained line length (68–75ch).
2. **Code Snippets:** Strict 5-line concept ceiling. Code blocks have a quick-copy button for pasting into the learner's local scratchpad (`scratch.py`).
3. **No Synthetic Quizzes:** Concept checks are structured as prediction-before-execution terminal experiments that the learner runs on their own machine.
4. **Navigation:** A calm left sidebar lists sections 01 through 11 with subtle checkmark status.
5. **Section Completion:** At the bottom of each section, an unhurried button:  
   `[ Mark Section as Understood & Continue → ]`  
   This updates the durable `manualProgress.completedSections` set and navigates to the next section.
6. **Resumption:** If a learner returns to `/manual`, they are automatically routed to their highest uncompleted section.

### 7.2 The Section 11 Handoff
Section 11 (`how-to-start-building-software.md`) introduces:
- The 5 Planning Questions.
- The 10-Step Escalation Protocol.
- The Problem Journal habit.
- The Project Launch Sheet exercise.

When the learner marks Section 11 complete, the manual concludes. The interface does not show a cartoon diploma; it presents a calm, adult bridge:

```
┌────────────────────────────────────────────────────────────────────┐
│  Starting Manual Complete                                          │
│                                                                    │
│  You have completed the foundational Python manual. You now own    │
│  variables, types, input, decisions, collections, loops,           │
│  functions, tracebacks, and documentation literacy.                │
│                                                                    │
│  You are ready to build software.                                  │
│                                                                    │
│  Next: Enter Project 1 — Terminal Ledger.                          │
│                                                                    │
│  [ ENTER TERMINAL LEDGER ──> ]                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## 8. Project Entry: Transition to Terminal Ledger (`/projects/terminal-ledger`)

Before throwing the learner into Phase 1, PipLearn provides an orientation surface that sets honest psychological and technical expectations.

### 8.1 Required Project Orientation Content

1. **What You Are Building:**
   - A single-user, terminal-first personal finance application that records transactions, persists data between runs, enforces category budgets, generates monthly summary reports, and exports clean CSVs.
2. **Estimated Time Commitment:**
   - 10 to 18 hours across 9 sequential phases.
3. **Why This Project Exists:**
   - Real software is not an isolated exercise. Terminal Ledger creates the authentic engineering pressures that make persistence, validation, dates, aggregation, and refactoring necessary.
4. **What You Already Know (Your Foundation):**
   - Explicit inventory of Starting Manual skills: variables, loops, dictionary collections, basic `try/except ValueError`, functions, and the 7-Step Diagnostic Protocol.
5. **What You Will Learn Just-in-Time:**
   - Text file persistence, JSON serialization, defensive file loading, string normalization, `datetime` parsing, grouped accumulation, `sorted()` with key functions, `csv` export, and modular file organization.
6. **The Just-in-Time Learning Contract:**
   - Reassurance: *"You are NOT expected to know how to build Phase 7 today. Every capability will be unlocked by a genuine product need right when you need it."*

### 8.2 Local Machine Setup Guide

The page provides clean, OS-specific terminal commands to prepare their local workstation:
```bash
# Create project folder on your machine
mkdir terminal_ledger
cd terminal_ledger

# Create main entry point and journal
touch main.py
touch problem_journal.md

# Verify Python version (3.10+ recommended)
python3 --version
```

Once the directory is created, clicking `[ Start Phase 01: In-Memory Ledger → ]` initializes durable state for `terminal-ledger` and routes to Phase 1.

---

## 9. Active Project Experience: The Phase Workspace (`/projects/[slug]/phases/[phaseId]`)

This is the **primary operational surface** where learners spend 90% of their authenticated time.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  PipLearn  /  Terminal Ledger  /  Phase 04              [ Docs ]  [ Help ]  [ Journal ]│
├─────────────────────────────────────────────────────────────┬──────────────────────────┤
│                                                             │                          │
│  PHASE 04: ROBUST INPUT & DEFENSIVE LOADING                 │  CONTEXT DRAWER          │
│                                                             │  (Opens Docs, Help, or   │
│  Learner-Facing Objective                                   │   Journal beside brief)  │
│  Protect your program against user typos and missing files. │                          │
│  No bad input or missing file should ever crash the ledger. │  [ Persistence 03:       │
│                                                             │    Defensive Loading ]   │
│  Requirements: What Must Be Observably True                 │                          │
│  1. Entering letters for amounts re-prompts calmly.         │  Mental Model:           │
│  2. Missing data file creates a clean file on first save.   │  A file can be in three  │
│  3. Damaged data file reports an error without crash.       │  states: missing, empty, │
│                                                             │  or damaged...           │
│  Key Capabilities & Unlocked Packs                          │                          │
│  • Robust Input 01 — The Re-Prompt Loop                     │  Smallest Example:       │
│  • Numbers 01 — Float Precision & Display                   │  ```python               │
│  • Persistence 03 — Defensive Loading                       │  try:                    │
│                                                             │      with open("f") as f:│
│  Verification Checklist & Demonstration                     │          data = f.read() │
│  [ ] 1. Type "abc" at amount prompt -> re-prompt displayed  │  except FileNotFoundError│
│  [ ] 2. Delete data file -> start program -> no crash       │      data = ""           │
│  [ ] 3. Restart program -> previous entries intact          │  ```                     │
│                                                             │                          │
│  [ COMPLETE PHASE 04 ──> ]                                  │                          │
└─────────────────────────────────────────────────────────────┴──────────────────────────┘
```

### 9.1 Essential Work Surface Elements

1. **Header Breadcrumbs & Utilities:**
   - Clean context trail: `PipLearn / Terminal Ledger / Phase 04`.
   - Quick action toggles: `[ Knowledge Packs ]`, `[ Help Ladder ]`, `[ Problem Journal ]`.
2. **Phase Milestone Brief (Center Reading Pane):**
   - Exact text from the locked milestone brief (`phase-0X-milestone-brief.md`).
   - Clearly separated into: Objective, Observable Behaviors, Required Capabilities, and Potential Pitfalls.
3. **Behavioral Acceptance Checklist:**
   - Interactive verification checks matching the phase brief.
   - Learner ticks them off as they run live tests in their terminal.
4. **Action Dock:**
   - Primary button: `[ Verify & Complete Phase → ]`.
   - Secondary button: `[ Log Problem in Journal ]`.

---

## 10. Knowledge Pack Discovery & Reader Experience

Knowledge Packs are the modular, capability-specific reference documents locked in `Brain/projects/python/terminal-ledger/knowledge-packs/`.

### 10.1 Discovery Model: Just-in-Time, Not Library Dump
- Knowledge Packs are **phase-linked**. When viewing Phase 4, the interface highlights `Robust Input 01`, `Numbers 01`, and `Persistence 03`.
- The learner never faces an overwhelming library of 20 uncontextualized articles.
- Past packs remain accessible via a quiet "Previously Unlocked" index in the drawer.
- Future packs remain hidden until their motivating phase is reached.

### 10.2 The Drawer Experience
- Clicking a Knowledge Pack slides open a side drawer (or splits the viewport on large screens).
- **The learner never loses their place in the milestone brief.**
- Full DOC-STD-001 typography and rhythm:
  - 5-line concept ceiling.
  - Predict-before-run experiments.
  - Diagnostic checklists.
- **Anti-Solution Invariant Maintained:** All examples use unrelated domains (plant logs, high scores, inventory). No finance or ledger code is ever displayed.
- Hitting `Esc` or clicking the close handle slides the drawer away instantly.

---

## 11. Help Ladder UX: Operationalizing L0–L5

The Help Ladder is PipLearn's mechanism for supporting learners without robbing them of the cognitive work of debugging. It is accessed via the `[ Help ]` drawer in the active phase workspace.

```
┌────────────────────────────────────────────────────────┐
│  HELP LADDER — ESCALATION STACK                        │
├────────────────────────────────────────────────────────┤
│  ● L0 — Think / Inspect                                │
│    "Before looking at code: what does your data file   │
│     contain right now, and what does the listing show? │
│     Where do those two observations first disagree?"   │
│                                                        │
│  ○ L1 — Relevant Knowledge Pack                        │
│    [ Open: Persistence 03 — Defensive Loading ]        │
│                                                        │
│  ○ L2 — Directional Hint                               │
│    (Locked — click to reveal after trying L0/L1)       │
│                                                        │
│  🔒 L3 — Structural Hint                               │
│    Requires: State Expectation vs Observation          │
│                                                        │
│  🔒 L4 — Guided Diagnosis                              │
│    Requires: Active Problem Journal Entry              │
│                                                        │
│  🔒 L5 — Protected Solution (Unrelated Domain)         │
│    Requires: Journal Evidence + 45m Struggle Time      │
└────────────────────────────────────────────────────────┘
```

### 11.1 The Six Escalation Levels

| Level | Name | Experience & Requirement | Behavior / Content |
|---|---|---|---|
| **L0** | **Think / Inspect** | Default open state. Zero friction. | Socratic diagnostic question challenging runtime assumptions. Asks learner to observe files, types, or tracebacks before editing code. |
| **L1** | **Relevant Resource** | Always available. One click. | Direct link to the exact Knowledge Pack and section addressing the underlying Python capability. |
| **L2** | **Directional Hint** | Click to reveal. | Names the abstract mechanism without project code (e.g. *"input() returns strings; conversion must happen before comparison"*). |
| **L3** | **Structural Hint** | Gated on learner input. | Plain-language description of data flow and component responsibilities. **Gated:** Learner must type two sentences: (1) what they expected, (2) what they observed. |
| **L4** | **Guided Diagnosis** | Gated on Problem Journal. | Step-by-step isolation protocol (what prints to add, what types to check, what file lines to inspect). **Gated:** Must link an active Problem Journal draft. |
| **L5** | **Protected Solution** | Strict last resort. | Complete, working 5–10 line solution in an **unrelated domain** (e.g. saving high scores for a game). **Gated:** Journal evidence recorded + confirmed 45+ minutes of struggle after L4. |

### 11.2 Escalation Guardrails
- **No Skipping:** The learner cannot jump straight to L4 or L5.
- **Walk-Back Protocol:** If a learner attempts to request L5 without journal evidence, the UI gently directs them to L0: *"Before seeing an example pattern, record your expectation and observation in the Problem Journal."*
- **Unrelated-Domain Guarantee:** Even at L5, code is NEVER written in the finance/ledger domain. The cognitive leap of mapping the pattern into their project remains 100% the learner's responsibility.

---

## 12. Problem Journal UX

The Problem Journal is the learner's engineering notebook. It transforms painful bugs into durable mental models.

### 12.1 The Six Locked Fields

Every journal entry requires six concise fields:

```
1. EXPECTATION: What specific behavior was I trying to produce?
2. OBSERVATION: What actually happened? (Exact error message, output, or file state)
3. CAUSE:       What was really happening under the hood?
4. EVIDENCE:    What print statements, types, or experiments proved this cause?
5. FIX:         What single change resolved the problem?
6. LESSON:      What will I check first when this failure pattern appears again?
```

### 12.2 Product Surfaces & Integration
- **In-Phase Drawer:** Can be opened in seconds during an active phase without leaving the milestone brief.
- **Dedicated Archive (`/journal`):** A clean, searchable record of all entries across the learner's history.
- **Auto-Save:** Draft entries are saved continuously to local browser state and persisted to durable storage on submission.
- **Status Lifecycle:** `Investigating` (fields 1–2 filled while diagnosing) → `Resolved` (all 6 fields completed).
- **Volume Expectation:** Approximately 3 to 6 high-quality entries across the entire 9 phases of Terminal Ledger. Quality over quantity.

---

## 13. Phase Completion Mechanism

PipLearn rejects the passive *"I scrolled to the bottom of the page, so mark it complete"* anti-pattern. Completion represents **verified behavioral evidence on the learner's machine**.

### 13.1 The V1 Completion Workflow

When the learner clicks `[ Verify & Complete Phase ]`, a focused modal opens:

```
┌────────────────────────────────────────────────────────────────────────┐
│  Complete Phase 04: Robust Input & Defensive Loading                   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  1. BEHAVIORAL VERIFICATION CHECKLIST                                  │
│  Demonstrate each item live in your terminal before checking:          │
│  [✓] Entering letters or symbols for an amount re-prompts cleanly.     │
│  [✓] Deleting the data file does not crash the program on next launch. │
│  [✓] Recorded entries survive quitting and restarting the program.     │
│  [✓] A damaged data file alerts the user without dumping a traceback.  │
│                                                                        │
│  2. TERMINAL TRANSCRIPT (RECOMMENDED EVIDENCE)                         │
│  Paste a short snippet of your terminal session demonstrating a        │
│  re-prompt or successful restart:                                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ > python3 main.py                                                │  │
│  │ Enter amount: abc                                                │  │
│  │ Invalid amount. Please enter a positive number.                  │  │
│  │ Enter amount: 42.50                                              │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  3. PEDAGOGICAL REFLECTION                                             │
│  Answer in 1–2 sentences:                                              │
│  "What is the difference between an expected input failure and a       │
│   bug in your program's logic?"                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ An input failure is expected user error that must be handled...  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  [ CANCEL ]                                 [ CONFIRM & ADVANCE ──> ]  │
└────────────────────────────────────────────────────────────────────────┘
```

### 13.2 Technical Engine Behind Completion
1. **Checklist Validation:** All mandatory checklist items must be confirmed.
2. **Reflection Capture:** Reflection response is stored in `DurableLearnerState.projectProgress[projectId].completedPhases[phaseId]`.
3. **State Transition:**
   - If Phase 3 is completed: State transitions to `checkpoint_due` (Checkpoint 1). Phase 4 remains locked until checkpoint clearance.
   - If Phase 6 is completed: State transitions to `checkpoint_due` (Checkpoint 2). Phase 7 remains locked.
   - If Phase 9 is completed: State transitions to `checkpoint_due` (Checkpoint 3 — Final Completion Review).
   - For all other phases (1, 2, 4, 5, 7, 8): Current phase increments immediately (`currentPhaseId = nextPhaseId`).

---

## 14. Mentor Checkpoints

Human mentor involvement is high-leverage and reserved for critical inflection points.

### 14.1 The Three Locked Checkpoints

```
PHASE 1 ──> PHASE 2 ──> PHASE 3 ──► [ MENTOR CHECKPOINT 1 ]
                                            │ (Persistence Lifecycle)
                                            ▼
PHASE 4 ──> PHASE 5 ──> PHASE 6 ──► [ MENTOR CHECKPOINT 2 ]
                                            │ (Mid-Project Calibration)
                                            ▼
PHASE 7 ──> PHASE 8 ──> PHASE 9 ──► [ MENTOR CHECKPOINT 3 ]
                                              (Final Completion Review & Defense)
```

| Checkpoint | Position | Mentors | Focus Area & Questions |
|---|---|---|---|
| **Checkpoint 1** | End of Phase 3 | Tirth, Darsh, Raj | **Persistence Lifecycle:** The learner runs code live, narrates load-on-start and save-on-change, explains in-memory vs on-disk synchronization, and demonstrates first-run grace. |
| **Checkpoint 2** | End of Phase 6 | Tirth, Darsh, Raj | **Mid-Project Calibration:** Review of record structure, date handling decisions, validation boundary discipline, and audit of the Problem Journal so far. |
| **Checkpoint 3** | End of Phase 9 | Tirth, Darsh, Raj | **Final Completion Review:** Live walkthrough of all 10 capabilities with deliberate edge cases, structural architecture review, journal audit, and diagnostic challenge. |

### 14.2 Checkpoint Product Flow

1. **Trigger:** Completing Phase 3, 6, or 9 automatically sets the checkpoint status to `due`.
2. **Blocker Banner on Home & Workspace:**  
   *"Checkpoint 1 is due before Phase 4. Persistence is the foundation of the rest of the project. Schedule a 25-minute calibration with a mentor."*
3. **Scheduling Flow (Cal.com Ergonomics):**
   - Embedded booking interface on `/mentors` or in-modal.
   - Learner selects mentor (Tirth, Darsh, or Raj) and an available time slot.
   - Status updates to `scheduled`.
4. **Preparation View:** Learner sees prep notes:
   - "Have your terminal open and your `main.py` ready to share."
   - "Be ready to demonstrate your persistence file and explain your loading logic."
   - "Have your Problem Journal open."
5. **Session Execution:** 20–45 minute conversational review (Google Meet / Zoom).
6. **Sign-Off:**
   - Mentor logs into PipLearn mentor portal or submits sign-off token.
   - Mentor writes a brief 2–3 sentence qualitative summary (no grades, no numbers).
   - Checkpoint transitions to `completed`.
   - Next phase is immediately unlocked.

---

## 15. Progress Model

Progress in PipLearn is quiet, truthful, and milestone-grounded.

### 15.1 Approved Progress Indicators
- **Starting Manual:** `7 of 11 Sections Understood` (clean, quiet text).
- **Project Phases:** `Phase 4 of 9: Robust Input` (subtle step indicator).
- **Checkpoints:** `1 of 3 Mentor Checkpoints Cleared`.
- **Problem Journal:** `4 Patterns Documented`.

### 15.2 Explicitly Prohibited Gamification
- ❌ No XP, levels, or rank tiers.
- ❌ No streaks or penalty algorithms for taking days off.
- ❌ No progress rings, pie charts, or percentage dials.
- ❌ No badges, trophies, or confetti animations.
- ❌ No learner comparisons or public leaderboards.

---

## 16. Project Completion & Retrospective (`/projects/[slug]/review`)

Finishing a 10–18 hour project is a major engineering milestone. PipLearn marks it with an authoritative retrospective rather than a generic celebration.

### 16.1 The Four Retrospective Pillars

1. **Capability Synthesis:**
   - The learner reviews the 10 observable product capabilities they built from scratch.
2. **Technical Knowledge Inventory:**
   - Clear inventory comparing their starting knowledge (manual) against what they built under pressure (JSON, dates, aggregation, CSV, modular refactoring).
3. **Problem Journal Retrospective:**
   - Highlights the 3–6 critical failure patterns they diagnosed and resolved, demonstrating how their debugging methodology evolved.
4. **Honest Self-Assessment:**
   - Learner answers three final synthesis questions:
     - *"What architectural decision would you make differently if building this from scratch today?"*
     - *"What concepts still feel unfamiliar or fragile?"*
     - *"What can you now explain fluently to another engineer?"*

### 16.2 Readiness for Project 2
- Explicit statement of readiness for new engineering pressures (e.g. filesystem operations, CLI arguments, multi-file programs).
- Zero false claims of "total Python mastery." PipLearn treats learners as serious apprentices who have completed their first solid build.

---

## 17. Proposed Route Architecture

PipLearn maintains a lean route footprint. Every proposed route serves a distinct cognitive task:

```
ROUTE MAP
├── /                                   [Public] Landing Page (Locked)
├── /login                              [Public] Authentication (Locked)
├── /home                               [Auth]   Learner Home / Next Action
├── /manual                             [Auth]   Manual Redirect to highest uncompleted section
├── /manual/[slug]                      [Auth]   Starting Manual Linear Reader
├── /projects/terminal-ledger           [Auth]   Project Overview & Setup
├── /projects/terminal-ledger/phases/[phaseId]   [Auth] Active Phase Workspace (Phases 01–09)
├── /journal                            [Auth]   Problem Journal Archive
├── /mentors                            [Auth]   Mentor Checkpoint Booking & History
└── /projects/terminal-ledger/review    [Auth]   Project Completion & Retrospective
```

### Route Specifications

| Route Path | Primary Content & Purpose | Why It Deserves a Route | What Should NOT Live Here |
|---|---|---|---|
| `/home` | Dominant next action, roadmap status, active blocker indicator. | Immediate post-login destination; answers "what do I do right now?" | No long curriculum prose, no code editors, no dense tables. |
| `/manual/[slug]` | Full text of Starting Manual sections (01 to 11). | Focused reading and experiment environment with table of contents. | No project briefs, no help ladder, no mentor booking. |
| `/projects/[slug]` | Project overview, time commitment, learning contract, local setup. | Necessary onboarding bridge before Phase 1. | No phase briefs, no daily verification tasks. |
| `/projects/[slug]/phases/[phaseId]` | Active phase milestone brief, acceptance checklist, dock drawers (Help, Packs, Journal). | The primary building surface where the learner spends 90% of time. | No disconnected dashboard cards, no unrelated global feeds. |
| `/journal` | Chronological archive of all Problem Journal entries. | Deep reflection, searchable error catalog, mentor audit review. | No live milestone briefs or curriculum lessons. |
| `/mentors` | Checkpoint status, Cal.com scheduling embed, mentor notes archive. | Dedicated surface for human connection and checkpoint management. | No automated code evaluators or grading matrices. |
| `/projects/[slug]/review` | Final project capability synthesis and self-assessment. | Culmination of finished project; reference point for next project. | No active phase checklists or editing interfaces. |

---

## 18. Product State & Persistence Requirements

To maintain architectural clarity, the persistence model is partitioned into strict tiers:

### 18.1 MUST Persist (Durable Database Storage)
1. **User Identity & Auth State:** User ID, email, account creation date.
2. **Manual Section Completion:** List of completed section slugs and timestamps.
3. **Active Project & Phase:** Current active project slug and active phase ID.
4. **Phase Completion Records:** Timestamp, checklist confirmation boolean, learner reflection text, optional verification terminal snippet.
5. **Problem Journal Records:** Entry ID, project ID, phase ID, status (`investigating` | `resolved`), timestamps, and all 6 locked fields.
6. **Mentor Checkpoint Records:** Checkpoint ID, status (`not_due` | `due` | `scheduled` | `completed`), scheduled timestamp, mentor ID, mentor sign-off timestamp, mentor notes.

### 18.2 NICE to Persist (Supplementary Telemetry / Convenience)
1. **Help Ladder Level Usage:** Highest help ladder level viewed per phase (useful for pedagogical calibration and identifying stuckness hotspots).
2. **Scroll Position in Long Knowledge Packs:** Seamless reading resumption in drawers.
3. **Workspace Theme / Font Preferences:** Dark/light mode, monospace font selection.

### 18.3 TRANSIENT Only (Client Session State / In-Memory)
1. **Open/Closed State of Drawers:** Whether the Help, Docs, or Journal drawer is currently open.
2. **Active Help Level in Session:** Resets to L0 when closing/reopening drawer.
3. **Search / Filter Query in Docs Drawer:** Ephemeral query string.
4. **Unsubmitted Checkbox Toggles:** Reset on page reload until formally submitted.

---

## 19. V1 vs. Later Scope Boundaries

PipLearn enforces aggressive scoping to ensure the core learning loop ships with uncompromising quality.

| Feature Area | V1 (Must Ship for Terminal Ledger) | Later (Explicitly Deferred) |
|---|---|---|
| **Learner Shell** | Minimalist home, single dominant action, quiet status. | Analytics dashboards, multi-project switcher, personalized feeds. |
| **Manual Reader** | Linear reader, 11 sections, mark complete & continue, scratchpad copy. | Interactive code playgrounds, inline audio recordings, annotations. |
| **Phase Workspace** | Milestone briefs, behavioral checklist, terminal snippet paste, reflection. | In-browser virtual terminals, automatic git repo sync, test suite runner. |
| **Knowledge Packs** | Contextual drawer, phase-linked recommendations, search index. | Community highlights, learner-submitted code notes, bookmarks. |
| **Help Experience** | 6-level structured ladder (L0–L5), gated reveals, journal linkage. | Real-time AI voice tutor, live code diff analyzer, screen sharing. |
| **Problem Journal** | 6-field markdown form, drawer + archive view, auto-save, status toggle. | Semantic search across journal entries, AI error pattern clustering. |
| **Mentor Checkpoints** | Cal.com scheduling embed, 3 fixed gates (P3, P6, P9), mentor sign-off note. | In-app video calling, recorded review archive, automated transcript analysis. |
| **Community & Social** | Strictly single-player building experience. | Forums, peer reviews, Discord integrations, public portfolio showcases. |
| **Curriculum Scope** | Python Starting Manual + Terminal Ledger (Phases 1–9). | Project 2 (DevToolbox), Project 3 (CoreTrack), Tier C paths. |

---

## 20. Visual & UX Principles

The PipLearn user experience draws aesthetic and interaction inspiration from **tools for professional engineers** (Linear, Raycast, VS Code, Vercel) rather than consumer learning apps.

### 20.1 Core Aesthetic Pillars
1. **Typography-First:** High-contrast, clean sans-serif typography for UI structure; human-tailored serif or crisp grotesque for long-form reading; rock-solid monospace for code blocks.
2. **Calm, Restrained Palette:** Dark/light system themes built on slate and zinc neutrals. Subtle 1px borders (`border-neutral-800`). No bright rainbow status badges or primary color overload.
3. **Code-Centric Identity:** Syntax highlighting tuned for readability. Monospaced identifiers (`main.py`, `dict.get()`, `ValueError`) visually distinct from UI prose.
4. **Zero Fluff & High Density:** Generous vertical rhythm and padding, but zero empty decorative illustrations, cartoon mascots, or floating marketing badges.
5. **Micro-Interactions with Purpose:** Smooth, hardware-accelerated drawer transitions (200–250ms ease-out). No bouncy spring animations or confetti.

---

## 21. Critical Invariants

The following 13 invariants must be preserved across all future frontend and backend implementations:

1. **Learner Writes 100% of the Code:** PipLearn never provides starter code templates that fill in the logic or completed project solutions.
2. **Anti-Solution Rule:** No documentation, Knowledge Pack, or Help hint may ever use project domain code (finance, ledgers, transactions).
3. **Productive Struggle is Protected:** The system must never bypass struggle to "speed up" completion.
4. **Documentation Precedes Help:** The learner is always pointed to official documentation and Knowledge Packs before receiving AI hints.
5. **Strict Help Escalation:** Levels L0 through L5 must be accessed sequentially and obey all gating conditions (journal required for L4/L5).
6. **Local Execution Only:** The learner builds on their local machine, in their local editor, running code in their local terminal.
7. **Behavioral Completion:** Completion is grounded in demonstrable terminal behavior and reflection, not page scrolling or multiple-choice questions.
8. **Mentors Calibrate, Not Grade:** Mentor checkpoints are conversational defenses of reasoning and debugging evidence; no numerical scores or letter grades.
9. **Single Dominant Next Action:** The learner home surface must always make the immediate next step unambiguous.
10. **Zero Gamification:** Streaks, XP, badges, leaderboards, and confetti are permanently banned.
11. **Zero Dashboard Clutter:** No card soup, vanity analytics, or synthetic progress graphs.
12. **No In-Browser IDE Replacement:** PipLearn will not embed Monaco or WebContainers as an editor replacement for project builds.
13. **Architectural Freedom:** PipLearn specifies behavioral requirements; the learner owns their program's file structure, function boundaries, and data representations.

---

## 22. Recommended Implementation Order

To deliver the authenticated learner journey efficiently, engineering should implement features in **tight, testable vertical slices**:

```
┌─────────────────────────────────────────────────────────────┐
│  SLICE 1: AUTHENTICATED SHELL & ROUTE SKELETON              │
│  • Next.js layout, auth context, navigation shell           │
│  • Route stubs: /home, /manual, /projects, /journal         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  SLICE 2: LEARNER STATE PERSISTENCE ENGINE                  │
│  • Durable state store (manual progress, project progress)  │
│  • Derived state calculator (dominant next action, blockers)│
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  SLICE 3: LEARNER HOME / CONTINUE SURFACE                   │
│  • Dominant next action card, quiet roadmap, blocker alerts │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  SLICE 4: STARTING MANUAL READER INTEGRATION                │
│  • Wire DocumentationReader V1 to Starting Manual markdown  │
│  • Section completion transition & Section 11 handoff       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  SLICE 5: PROJECT OVERVIEW & LOCAL SETUP SURFACE            │
│  • Terminal Ledger entry page, prerequisites, terminal guide│
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  SLICE 6: ACTIVE PHASE WORKSPACE & MILESTONE BRIEF          │
│  • Phase brief renderer, acceptance checklist, layout docks │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  SLICE 7: CONTEXTUAL KNOWLEDGE PACK DRAWER                  │
│  • Slide-over pack viewer, phase recommendations, search    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  SLICE 8: PROBLEM JOURNAL ENGINE & DRAWER                   │
│  • 6-field entry editor, auto-save, status toggle, archive  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  SLICE 9: HELP LADDER COMPONENT (L0–L5)                     │
│  • Gated escalation UI, evidence checks, struggle timer     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  SLICE 10: PHASE VERIFICATION & ADVANCEMENT FLOW            │
│  • Completion modal, terminal snippet paste, reflections    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  SLICE 11: MENTOR CHECKPOINT ENGINE                         │
│  • Cal.com embed integration, blocker gating, sign-off card │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  SLICE 12: PROJECT COMPLETION RETROSPECTIVE                 │
│  • Final review surface, capability synthesis, self-audit   │
└─────────────────────────────────────────────────────────────┘
```

---

## 23. Authoritative Document Sign-Off

This document constitutes the locked product architecture for the PipLearn authenticated experience V1. All subsequent frontend components, state stores, and backend endpoints must implement the behaviors specified herein.
