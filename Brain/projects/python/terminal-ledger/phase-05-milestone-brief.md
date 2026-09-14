---
title: "Phase 5: Categories and Filtering"
phase: "05"
estimated_time: "1.5–2 hours"
prerequisites: "Phase 4 complete — boundaries reject bad input and stored state loads defensively"
---

## 1. A Full Collection Is No Longer Enough

Your program can preserve records and protect its boundaries, but a growing collection creates a new problem: showing everything does not answer a narrower question. A person may want to identify records that belong to one meaningful group without losing access to the complete history.

Human-entered labels also vary. Two inputs can carry the same intended meaning while differing in capitalization or spaces at their edges. Exact comparison treats those strings as different unless the program makes a deliberate comparison policy.

Phase 5 adds grouping and retrieval. You will decide what group labels mean in your design, normalize text where comparison requires it, and derive a matching subset while preserving the original collection.

## 2. What You Will Demonstrate

By the end of this phase, you can show:

- Your records carry enough learner-designed information to identify a meaningful group.
- The program treats leading or trailing whitespace and letter-case variation according to a policy you can explain.
- A person can request a group and see only the records intended to match it.
- A request with no matches produces sensible behavior rather than a crash or misleading result.
- Filtering does not remove, rewrite, or reorder the original collection.
- The full collection remains available after viewing a subset.
- Any new information that belongs in persistent state survives a complete exit and restart.
- Phase 4 input validation and defensive loading still behave correctly.

These are observable requirements, not an implementation design. You own the labels, the way they enter and appear, the trigger for a filtered view, the matching rule, and every code-level choice.

## 3. Define Grouping in Your Design

Before changing code, answer these questions in writing:

1. What question should a grouped view answer for the person using your program?
2. What information must each relevant record carry for that question to be answerable?
3. Are labels chosen freely, selected from choices you define, or handled another way?
4. Which differences in typed text should count as the same label?
5. What should happen when the requested group has no records?
6. Which information, if any, must survive a restart?

Do not choose a design because a familiar application uses it. Choose the smallest design that supports a useful question in your existing program. The architecture does not require a particular set of labels, field, record shape, or interaction.

## 4. Read Strings 01

Read **Strings 01 — Normalizing Text for Reliable Comparison**. Run its music-library experiments in a scratch file before applying the methods to your project.

The pack introduces two string methods:

- `.strip()` returns a new string without leading or trailing whitespace by default.
- `.lower()` returns a new string with cased characters converted to lowercase.

Neither method changes the original string. Combining them can produce a stable comparison value, but that does not mean every displayed label should be replaced with lowercase text. Decide separately what the program compares and what a person sees.

The pack also introduces `in` for membership. Its meaning depends on the value on the right: membership in a list asks whether an equal item is present; membership in a string asks whether a substring occurs. Use the form that matches the question you are actually asking.

## 5. Inspect Text Before Choosing a Policy

In a scratch file, begin with several strings that differ only by capitalization or spaces at the edges. Print the raw values, then print the results of `.strip()`, `.lower()`, and the two methods combined.

Predict each result first. Confirm that the original strings are unchanged afterward. Then compare the normalized results and explain which distinctions were intentionally removed.

Return to your grouping design and decide:

- where comparison values are normalized;
- whether original text is retained for display;
- whether both the stored label and the requested label are normalized before comparison;
- which differences must remain meaningful.

Consistency matters more than choosing one universal placement. A policy applied on only one side of a comparison can still produce surprising mismatches.

## 6. Add Group Information Without Prescribing Its Shape

Extend the behavior by which your program records information so the grouping question can be answered. Use the Phase 4 boundary discipline: state what acceptable label input means, explain rejection when necessary, and do not let new input weaken existing validation.

You decide whether the information changes an existing record representation or fits your design another way. You also decide whether old persisted records need modest handling in your current working data. Do not build a migration system or redesign persistence generally. Make only the change your Phase 5 behavior requires, then inspect the saved JSON and loaded value as evidence.

Test at least two inputs that should be treated alike after normalization and one that should remain different. Confirm the displayed form follows your chosen policy rather than occurring accidentally.

## 7. Read Querying 01

Read **Querying 01 — Building Filtered Subsets**. Its book examples teach a plain pattern:

```text
source collection → examine each record → test a condition → append matches to a new list
```

The source collection remains intact. The new list is a derived result: it contains references to the matching records, selected for the current question. Building a new list does not automatically copy or isolate the records inside it, so changing a record through either list would still affect that shared record. Viewing and selecting do not require such mutation.

Do not introduce a more compact construct. A loop, a condition, and `.append()` make every decision visible and use tools you already understand.

## 8. Produce a Filtered Subset

Choose one grouping question from your design. State its matching rule in one sentence before writing code. Then produce a new collection containing only matching records.

Keep these responsibilities distinct in your reasoning:

1. Obtain the requested label through your existing interaction design.
2. Normalize the text required for reliable comparison.
3. Examine the source records without changing them.
4. Add only matching records to a new subset.
5. Present that subset using your established display behavior.
6. Handle an empty result deliberately.

These are responsibilities, not required functions, names, or control-flow order. Fit them into your own program. Do not add premature abstraction merely to make the code look generalized; first make one useful matching rule observable and correct.

## 9. Prove the Original Collection Survives

Filtering is retrieval, not deletion. Record evidence before and after a filtered view:

- the length of the full collection;
- the full collection's contents or normal full display;
- the length and contents of the subset;
- the full collection again after the subset is displayed.

Use known small data so you can predict zero, one, and several matches by hand. If the full collection changes, locate the first operation that writes to it or to one of its records. A subset should be created from the source, not created by removing nonmatches from the source.

Remember the subtle point from Querying 01: the lists are separate, but mutable record values can still be shared between them. This phase requires selection and display, not modification through the subset.

## 10. Structured Manual Verification

Extend your written verification transcript. Record the setup, exact action, expected observation, actual observation, and whether they match.

**Existing behavior:**

1. Run the normal workflow that worked at the end of Phase 4.
2. Enter one deliberately invalid value and confirm validation still responds correctly.
3. Complete a normal save, exit, and restart.
4. Confirm defensive-loading behavior has not been weakened.

**Text matching:**

1. Use leading and trailing spaces around a known label.
2. Use the same intended label with different capitalization.
3. Request a label that should match after normalization.
4. Request a distinct label that should not match.
5. Confirm both comparison and display follow the policy you wrote down.

**Subset behavior:**

1. Run a request with zero expected matches.
2. Run one with exactly one expected match.
3. Run one with several expected matches.
4. Compare each result with a hand-written expectation.
5. Show the complete collection afterward and verify it is unchanged.

**Persistence:**

1. Save state containing the new grouping information if your design persists it.
2. Exit the process completely.
3. Inspect the raw stored JSON.
4. Restart and repeat one known filtered request.
5. Confirm the result matches the one before exit.

No testing framework is needed. The transcript is evidence that new retrieval behavior did not damage earlier behavior.

## 11. Debug With Comparison Evidence

When a record fails to match, inspect the data in stages:

1. Print the raw requested text.
2. Print the normalized requested text.
3. Print the raw candidate label.
4. Print the normalized candidate label.
5. Print the comparison result.
6. Print the complete collection and resulting subset.
7. Compare expected and observed counts and contents.

If behavior changes after restart, inspect the raw stored JSON and the loaded value before changing the matching logic. A persistence omission and a comparison error can look similar from the screen but leave different evidence.

Change one thing, rerun the same known case, and record the first point where expected and observed behavior become equal again.

## 12. Problem Journal

Continue using exactly these six fields:

- expectation
- observation
- cause
- evidence used
- fix
- lesson for next time

Useful Phase 5 entries include a mismatch caused by whitespace or capitalization, a condition that selects too much or too little, an accidental change to the full collection, normalization applied inconsistently, or new information that disappears after restart. Do not record trivial typing mistakes.

## 13. Help When You Are Stuck

- **L0 — Think / inspect.** What are the two exact values being compared, before and after normalization?
- **L1 — Exact pack.** Use Strings 01 for text mismatch and Querying 01 for subset construction.
- **L2 — Directional hint.** “Are both sides of the comparison prepared by the same policy?”
- **L3 — Structural hint.** “Trace the source collection, condition, new subset, and display. Where does the observed record first diverge from your expected path?”
- **L4 — Guided diagnosis.** Use a three-record case, print each comparison result, then inspect the full collection before and after.
- **L5 — Protected solution.** Study a complete selection pattern in an unrelated domain, then return to your own design.

No level supplies project labels, record fields, helper names, prompts, or menu structure.

## 14. Completion Gate

Phase 5 is complete when:

- You can explain what grouping means in your program and why it is useful.
- Text differences at the edges and in letter case behave according to an explicit policy.
- You can distinguish the comparison value from the displayed value.
- The requested grouping view contains only intended records.
- Zero, one, and several matching records all produce sensible results.
- The original collection remains available and unchanged after filtering.
- Any required grouping information survives save, complete exit, and restart.
- The normal persistence round trip, defensive loading, and Phase 4 validation still work.
- Your transcript records expected and observed results for the controlled cases.
- You can explain why the subset is derived rather than stored as a second source of truth.

Not required: a universal label system, several filtering modes, compact syntax, sorting, reporting, or a new application architecture.

## 15. Reflection and Transition

Write briefly on each:

- Which variations does your normalization policy erase, and which does it preserve?
- Where does your program keep display text distinct from comparison text, if at all?
- What evidence proves the original collection did not change?
- Which matching case surprised you, and what revealed the cause?
- If you add another grouping question later, which part of your current reasoning can be reused without forcing one universal mechanism?

Keep the answers and updated verification transcript with your earlier phase work. Stop after this phase is complete; the next phase begins from this verified state.

