---
title: "Phase 2: Transactions in Memory"
phase: "02"
estimated_time: "1.5–2 hours"
prerequisites: "Phase 1 complete — your Project Launch Sheet"
---

## 1. What You Are Building

Phase 1 produced a plan. Phase 2 turns one slice of that plan into a program that runs.

By the end of this phase, you will have a Terminal Ledger program that:

* performs the first meaningful behavior you chose in Phase 1,
* keeps the information that behavior requires during the current run,
* produces the observable result you defined in your Launch Sheet,
* and can be explained and demonstrated by you.

Everything the program knows lives in memory and disappears when the program ends. That is not a defect to fix today; it is the deliberate shape of this phase, and you will observe that limitation directly at the end.

This phase introduces almost no new Python. It deepens what you already know, with exactly two small additions in scope, each taught in a Knowledge Pack:

* **Records 01 — Modeling One Thing with Several Fields:** holding several named facts about one thing in a single value.
* **Display 01 — Aligned, Readable Terminal Output:** controlling column alignment in f-string output.

Everything else in this phase is Starting Manual knowledge applied with intent. The code is yours. This brief contains no starter code, no scaffold, and no reference implementation, because assembling the program for you would remove the exact skill this phase exists to build.

## 2. Bring Forward Your Phase 1 Plan

Keep your Project Launch Sheet open while you work. Phase 2 begins from your decisions, not from a new specification:

* your **First Milestone** — the smallest meaningful behavior you chose,
* your **Core Behaviors** — the context that milestone fits into,
* your **Information Needed** — the facts your program must collect,
* your **Observable Results** — what proves the behavior works,
* your **Known Tools** — the Python you already intend to use,
* your **Debugging Plan** — the evidence you planned to inspect when something fails.

This brief will not replace any of those decisions. If your Launch Sheet chose a first milestone, that milestone is your target for this phase.

One check before you write code: if your chosen milestone is larger than one or two core behaviors, reduce it now, before coding. Useful questions: Can a user complete the milestone in under a minute of typing? Does it secretly depend on a behavior you marked "Useful Later"? Could you demonstrate it to another person in one sitting? If any answer is no, cut the milestone down and note what you removed.

## 3. Choose the Smallest Working Slice

Even a small milestone usually contains a thinner one. The thinnest version of any record-keeping behavior has three moments:

1. Information enters the program.
2. The program keeps it.
3. The program shows it.

Write down, in one sentence, the behavior your first runnable version will demonstrate. Under the sentence, note three things: what information enters, what must be visible on screen when the behavior completes, and what you will compare the output against to know it is right.

That sentence is your working definition for this phase. Revise it if implementation teaches you something; never silently grow it. If you find yourself adding a second behavior before the first one works, stop and finish the first.

## 4. Representing One Record

Your Launch Sheet lists the information a financial event needs. That was your decision in Phase 1, and Phase 2 does not replace it. What this phase offers is a general Python capability for keeping several named facts about one thing inside a single value.

Read **Knowledge Pack: Records 01 — Modeling One Thing with Several Fields** before deciding. It teaches the capability with examples from an unrelated domain, including where the pattern helps and where it does not. Experiment with its examples in a scratch file, then decide how one record should be represented in your program.

Whatever you decide, you must be able to explain it: which facts belong in one record, why those and no others, and how your program reaches one fact of one record when it needs to. If your record currently needs only one fact, you may not need this pattern yet.

## 5. Keeping Multiple Records

Section 4 covered one record. If your milestone needs more than one record, you now have a second design question: how should several records be kept together?

**Knowledge Pack: Records 01** teaches one general capability here — keeping several records in a collection and reading one field of each in a loop — and presents a genuine design decision between collection shapes, both buildable with Python you already know. Nobody can make that decision for you, because it depends on how your program asks and answers questions about its data.

If your milestone works with a single record, you can set this question aside entirely. If you do keep a collection, choose a shape, write one sentence of reasoning in your notes, and be ready to explain it at the end of the phase.

## 6. Make the First Run Early

Before the program is useful, make it exist. Create your program file, put the smallest possible behavior in it, and run it from the terminal.

The first run does not need to be useful yet. It needs to establish four facts:

* the file runs,
* input and output work,
* you know where execution begins and in what order statements execute,
* you can print or otherwise inspect the values the program currently holds.

There is no starter code in this brief and no scaffold is coming. Type every line yourself. Run the program after every few lines you add, as you learned in the Starting Manual, and compare what appears against what you expected.

## 7. Build One Capability at a Time

Use this rhythm for every capability in the milestone. It is process guidance, not project code:

1. Restate the milestone behavior in one sentence.
2. Identify the information it requires.
3. Decide the smallest runnable version of it.
4. Implement one small piece.
5. Run it.
6. Compare expected and observed behavior.
7. When they differ, inspect values and types before changing anything.
8. Change one thing.
9. Rerun.
10. Add the next capability only after the current one works.

Two warnings earn their keep in this phase specifically.

First: `input()` always returns a string. If your program does arithmetic on something a user typed, a deliberate conversion must happen first. The evidence that it happened is `type(...)`, not hope.

Second: build the path before the polish. A capability that works but prints plainly is further along than a beautiful display of incorrect data. Correctness first, presentation second — and only if presentation is still needed.

## 8. Displaying What the Program Knows

Your program must show what it knows in a way a human can use. What that means is set by your own milestone: the observable result you defined in Phase 1 tells you what the display must prove. Readable plain output is fully valid completion behavior for this phase.

Treat display as presentation, not core logic. A displayed result is correct or incorrect regardless of how it looks.

If you place values side by side in columns, you will meet a small, honest annoyance: values of different lengths make columns drift out of alignment. **Knowledge Pack: Display 01 — Aligned, Readable Terminal Output** teaches the f-string mechanism that fixes this, in an unrelated domain, with experiments. Using it is your choice. Formatting specifiers are not required to complete this phase; they are one available tool for one presentation problem.

## 9. Debugging the In-Memory Version

Everything in this phase is inspectable, which makes it the cheapest debugging you will ever do. When behavior differs from expectation, inspect:

* the actual values your program holds — print them,
* their types — `type(...)` on anything that misbehaves,
* the contents of your whole collection — print it,
* the contents of one record,
* what the loop actually visits on each pass,
* which branches execute,
* and the printed output next to the raw data.

That last comparison deserves emphasis: when the screen disagrees with your expectation, print the raw values and the formatted display and compare them. The difference between what the program *knows* and what it *shows* is a common hiding place for bugs.

Then apply the locked protocol from the Starting Manual: read the evidence, identify the mismatch, inspect values and types, change one thing, rerun. Reproduce the failure with the same input.

## 10. When to Use Functions

You already know how to define and call functions, pass arguments, and return values. Use them when a reason appears, not on principle.

A reason looks like one of these: the same logic is now written twice and must stay in sync; a block of code has become hard to name in one short sentence; or you need to compute a value in one place and use it in another.

Do not restructure working code into functions in the middle of fixing a bug — finish the fix, then decide. A single-file program is completely acceptable in this phase.

## 11. Problem Journal

The Problem Journal continues exactly as established in Phase 1, with the same six fields: expectation, observation, cause, evidence used, fix, and lesson for next time.

Write an entry when:

* your mental model of the code turned out to be wrong,
* a fix took more than one hypothesis to find,
* a hint moved you forward after you were genuinely stuck,
* or you notice a failure pattern that will likely return.

Do not write entries for typos, a forgotten save, or an error you understood in seconds. Phase 2 is short; zero to two entries is a normal range. The journal is a memory tool for your own debugging, not a scorecard.

## 12. Help When You Are Stuck

Getting stuck is a normal part of learning to build software. The path through it:

1. **Reason:** state what you expected and what happened.
2. **Inspect:** print values, check types, read the traceback from the bottom.
3. **Consult this phase's material:** Records 01 and Display 01, plus your Starting Manual sections.
4. **Experiment:** test the assumption in a small scratch file, away from your project.
5. **Ask for direction:** request a hint, not a solution, and describe what you have already inspected.
6. **Escalate:** only after the above, study a worked pattern in an unrelated domain — never a completed version of your own program.

The packs teach capabilities with unrelated examples on purpose. Study the capability there, experiment with it separately, then return and wire in your own design. When you ask for help, a request like "my loop should stop when the user types X, it keeps going, here is what I printed" preserves your diagnosis work; "write this feature for me" hands it away.

## 13. Demonstration Checklist

Phase 2 is demonstrated, not submitted. Run your program and show each of the following:

* [ ] the program runs from the terminal,
* [ ] your chosen first-milestone behavior can be performed end to end,
* [ ] the information the behavior requires remains available during the run — demonstrated with more than one record only if your chosen milestone genuinely needs several,
* [ ] the observable output matches what you entered and did — including a calculation's result only if your chosen milestone includes a calculation,
* [ ] you can explain the representation you chose and why,
* [ ] you can describe one problem you diagnosed during the phase and the evidence that found it — or explain why no meaningful debugging issue occurred.

Explicitly not required for this demonstration: persistence of any kind, a specific set of record fields, functions, or formatting specifiers.

## 14. Reflection

Answer briefly, in writing:

* What decision about representing information worked well?
* What became awkward as you added more information or behavior?
* Which part of your program would become painful first if the project grew?
* What did you inspect when behavior differed from expectation?
* What information disappears when the program ends — and why is that now a meaningful limitation rather than a footnote?

Keep your answers with your Launch Sheet. The last question is not rhetorical.

## 15. Completion Gate

Phase 2 is complete when all of the following are true:

* you have a runnable Terminal Ledger program,
* your chosen first milestone works in memory, end to end,
* the behavior is observable, and you have demonstrated it,
* you can explain how you represented the information and defend the choice,
* you have tested the behavior manually,
* you have debugged discrepancies using evidence rather than guessing,
* and no persistence and no future-phase concept were needed to get there.

When the gate is passed, stop. Do not add the next capability yet.

**Next:** Phase 3 — Save and Load Data
