---
title: "Phase 3: Save and Load Data"
phase: "03"
estimated_time: "2–2.5 hours"
prerequisites: "Phase 2 complete — a running in-memory Terminal Ledger"
---

## 1. The Disappearing Data Problem

At the end of Phase 2, you observed the core limitation: everything disappears when you quit. Every entry your program knows vanishes. The program seems to have amnesia the moment the terminal closes. This is not a defect. It is how program memory works. Python values live in memory while the process runs. When the process ends, memory is released. Nothing persists unless something else carries it beyond that moment.

Phase 3 solves this directly. Your program will store its state on disk as JSON text and read it back on the next startup. The observable state after restart will match the intended state before exit: everything your program knew is still there, and nothing silently vanishes anymore.

The mental model is a cycle:

```
in-memory Python state
  → serialized JSON text on disk
    → loaded Python state in a new run
```

Everything your program knows about its data will survive a complete exit and restart. That is the only thing Phase 3 changes—the records you designed, the display you built, the menu or commands you chose stay exactly as they were.

## 2. What You Will Demonstrate

By the end of this phase, you can show:

- Quit the program completely and relaunch: the observable state after restart matches the intended state before exit.
- Delete or rename your data file and start the program: no crash; the program begins from an appropriate empty or default state.
- Open your data file in a text editor and read its contents as JSON text.
- Explain, in plain language, the persistence lifecycle: what happens on startup, what happens after a change to the data, and why the program never silently loses entries.

## 3. Keep Your Phase 2 Program

You are extending Phase 2, not rewriting it. Your program already records what the user enters, holds it in the representation you designed, and displays it. Phase 3 adds one capability: what it holds survives when the process ends. The behaviors work. The records are shaped the way you designed them. The display is readable. You are not starting over; you are making what you have durable.

## 4. Read the Two Knowledge Packs

Read **Persistence 01 — Files, Modes, and the `with` Statement** first. It teaches file operations with a reading list as its example. Do the experiments in a scratch file before touching your project.

Then read **Persistence 02 — JSON: Serializing Values to Text and Back**, which uses a book catalog. Experiment with both the file-based and string-based JSON APIs and inspect the values that come back.

The packs teach capabilities, not your project's solution. Study the capability there, then return and decide how it applies to your own design.

## 5. Design Your Persistence

Before writing code, make four design decisions. Write each down in one sentence:

1. **What gets saved:** Your entire Phase 2 state, or something narrower? What does the file need to contain so the program can reconstruct its working state on restart?
2. **When to save:** After every change, at exit, or on some other trigger? Both designs can seem to work at first—only one survives the situations you did not anticipate.
3. **How saved state becomes working state:** When the program loads data from the file, what variable or state does it go into? Is that the same variable the rest of your program reads from? This is subtle and worth thinking about now.
4. **First-run strategy:** On the very first run, the data file does not exist yet. Your program must not crash. Two strategies are legitimate and both are used by real programs:

   **Strategy A — Check before opening:** Before opening the file, determine whether it exists. If it does, load from it. If it does not, start with an appropriate empty or default state.

   **Strategy B — Attempt and catch:** Try to open and load the file. If it does not exist, Python raises `FileNotFoundError`. Catch that specific exception and start with an appropriate empty or default state. You already know `try`/`except` from the Starting Manual, Section 09, and Persistence 01 teaches the exact exception this failure produces.

Both strategies are defensible. Neither is prescribed. Pick the one that makes sense to you, implement it consistently everywhere the file might be absent, and be ready to explain your choice. The non-negotiable requirement: no traceback to the user on first run, and the program begins from a sensible default state.

## 6. Build the Smallest Round Trip

Before adding persistence to your full program, prove the round trip works in isolation. Create a scratch file:

1. Define a small test value in the shape your program actually uses.
2. Save it to a file with `json.dump()`.
3. End the process and start a new one, so nothing survives except the file.
4. Load it back with `json.load()`.
5. Print `type()` of the loaded value and verify it matches what you saved.

When this works in isolation, you know the mechanism is sound. The integration into your program is a separate question—read on.

## 7. Connect Stored State to Working State

After loading, the loaded data must become the state your program actually uses. This is a subtle and common failure point: the load runs, the file is read, the value comes back—and the program behaves exactly as if nothing was loaded, because the loaded value was never connected to the variable the rest of the program reads.

Test this integration explicitly:

1. On startup, load data from the file into a variable.
2. Immediately print that variable and its `type()`.
3. Then display your program's normal view.
4. Verify that the display reflects the loaded data, not an empty state.

If the loaded value exists but the program shows nothing, the connection between "loaded state" and "working state" is broken. This is evidence, not a mystery—trace the variable from load to display and find where the link is missing.

## 8. Handle the First Run

The first time your program runs on any machine, the data file does not exist. Your program must not crash.

This was addressed in your design decision in Section 5. Implement whichever strategy you chose. The two approaches are:

- Determine whether the file exists before attempting to read it, and start with an empty or default state when it does not.
- Attempt to read the file and handle `FileNotFoundError` specifically, starting with an empty or default state when it is raised.

Whichever you chose, implement it consistently. The only requirement: no traceback to the user on first run, and the program begins from a sensible state.

## 9. Verify the Round Trip

Create a structured manual verification. This is not a test framework—it is a written transcript you execute by hand, recording what you did, what you typed, what you saw, and whether it matched your expectation.

**Normal round trip:**

1. Start the program.
2. Perform a fixed set of known actions; write down exactly what you did.
3. Verify the observable result matches what you expect.
4. Quit the program completely (not just a loop restart—actually exit the process).
5. Open your data file in a text editor. Write down what you see.
6. Restart the program.
7. Verify the observable state matches the intended state before exit.
8. Write down whether expected and observed match. If they differ, note the first point of disagreement.

**First-run behavior:**

1. Delete or rename your data file.
2. Start the program.
3. Write down what happens. Does it start cleanly? What does it show?
4. Confirm there is no missing-file crash and the behavior matches your design.

You supply your commands, your data, your filenames, and your control flow. The brief does not prescribe those. What it prescribes is the discipline: write down what you did, what you saw, and whether it matched.

## 10. Debug Persistence With Evidence

When something goes wrong, inspect in this order:

1. **The raw file in an editor.** What is actually on disk? Is it valid JSON? Is it the data you expected?
2. **The loaded value's type.** Print `type()` of the loaded value immediately after loading. Is it a list? A dict? A string?
3. **What the program displays.** Right after startup, show what your program shows. Does it reflect the loaded data, or an empty state?
4. **The exact traceback, read bottom-up.** `FileNotFoundError` names the file. `JSONDecodeError` names where parsing failed.
5. **The first point where expected and observed diverge.** Where did the match break?

Common symptom classes: only the most recent entry survives (saves replace instead of preserving); the program loads but displays an empty state (loaded value not connected to working state); crash on first run (missing file unhandled); the file has data but the program does not show it (load ran; the display never used it).

## 11. Problem Journal

The Problem Journal continues with the same six fields: expectation, observation, cause, evidence used, fix, and lesson for next time.

Good Phase 3 entries include:

- The observable state after restart does not match the state before exit.
- A loaded value whose type surprised you.
- A first-run crash.
- The file has the data but the program shows an empty state.

Zero to three entries is a normal range for this phase.

## 12. Help When You Are Stuck

The help ladder is unchanged:

- **L0 — Think / inspect.** Print the file's raw contents. Print `type()` of the loaded value. Compare what the file holds with what the program displays.
- **L1 — Re-read the Knowledge Packs.** Run their experiments in a fresh scratch file.
- **L2 — Directional hint.** "Does saving happen after every change to your data, or only in some code paths?"
- **L3 — Structural hint.** "Trace the path: load on startup → state variable → display. Is the loaded data passed to the display?"
- **L4 — Guided diagnosis.** Create a test file by hand with known JSON content. Load it. Print what comes back. Compare with your program's load.
- **L5 — Protected solution.** A complete working example in an unrelated domain for you to study and wire into your own design yourself.

Persistence debugging prioritizes evidence: the raw file contents, the loaded value and its type, the program-visible state, the traceback, and the first point where expected and observed diverge.

## 13. Mentor Checkpoint 1

At the end of Phase 3, a short mentor review is recommended. It catches misconceptions before the next six phases compound on top of them.

Be ready to:

- **Narrate your persistence lifecycle:** what happens when the program starts, what happens after a change to data, and where loaded state becomes working state.
- **Demonstrate live:** save, quit completely, restart, and show that the observable state survived.
- **Show first-run behavior:** delete the data file, start the program, show it begins cleanly.
- **Explain your design decisions:** what you save, when you save, how loaded state connects to working state, and which first-run strategy you chose and why.
- **Inspect the data file:** open it in a text editor and explain what the JSON text represents.
- **Discuss Problem Journal evidence** if you have entries from this phase.

No score. No rubric. The conversation is about your reasoning and your evidence.

## 14. Completion Gate

Phase 3 is complete when:

- The observable state after restart matches the intended state before exit.
- The first run (no data file) produces no crash and begins from a sensible default state.
- The data file is JSON text you can read in a text editor.
- You can narrate the persistence lifecycle from memory.
- You have verified the round trip with a structured manual transcript.
- You can explain your first-run strategy and defend the choice.

Not required: handling damaged or empty files, a specific file name, a specific code structure, or a specific save mechanism.

## 15. Reflection

Write briefly on each:

- **Where does saving happen in your program?** Can a change to your data occur without a save? How would you know?
- **Your first-run strategy.** Why did you choose checking before opening or catching `FileNotFoundError`? What is the other strategy's weakness?
- **One surprise.** What behaved differently than you expected during this phase? What did your Problem Journal entry teach you?
- **The lifecycle in words.** In three sentences, describe what happens on startup, when an entry is recorded, and when the program quits.

Keep your answers with your Launch Sheet and Phase 2 reflection.

## 16. Next

Phase 4 — Validate Bad Input
