---
title: "Phase 6: Dates and Monthly Views"
phase: "06"
estimated_time: "1–1.5 hours"
prerequisites: "Phase 5 complete — normalized grouping and filtered subsets work across restarts"
---

## 1. Records Need a Place in Time

Your program can group records and retrieve a chosen subset, but it cannot yet answer a time-based question unless its records carry dates with an intentional meaning. Text that merely looks like a date is not enough when the program must reject impossible dates, compare earlier with later, or select one month without confusing different years.

Phase 6 adds the smallest useful date model. You will decide what a date means in your existing design, learn how Python represents and parses dates, and derive a monthly view without changing the full collection.

## 2. What You Will Demonstrate

By the end of this phase, you can show:

- A new record can be associated with a valid date according to your design.
- Your program can use today's date where that behavior is useful.
- User-supplied date text is parsed according to a stated format and invalid text does not cause an unexpected crash.
- A date can be displayed in a deliberate form without confusing display text with the date value used for logic.
- Earlier and later date values compare chronologically.
- A monthly view selects only records from the intended year and month.
- Zero, one, and several monthly matches behave sensibly.
- The original full collection remains intact after a monthly view.
- Stored date information survives a complete exit and restart and becomes usable for date logic again.
- Phase 4 validation and Phase 5 grouping/filter behavior still work.

Your representation, accepted format, default behavior, monthly question, names, schema, persistence shape, and control flow remain learner-owned.

## 3. Decide What a Date Means

Before writing code, answer these questions:

1. What event in your program does a record's date describe?
2. Does the person normally use today's date, provide a date, or choose between those behaviors?
3. What exact text format, if any, will the program accept?
4. What should a person see when the text cannot be parsed?
5. How should a date appear when displayed?
6. What information must be stored so a later run can reconstruct a usable date?
7. Which month-based question is worth adding now?

Choose one coherent behavior that makes the monthly question answerable. Show the accepted input format rather than expecting the person to guess.

## 4. Read Dates 01

Read **Dates 01 — Working With Dates in Python**. Run its appointment experiments in a scratch file before changing your project.

The pack introduces two related types from the standard-library `datetime` module:

- `date.today()` returns a `date` representing the local current date.
- `datetime.strptime(text, format)` parses matching text and returns a `datetime`.

If your logic needs only a calendar date, `.date()` returns the date part of that parsed `datetime`. `strftime(format)` travels in the other direction: it returns a string representation for display or another text boundary.

Keep the directions clear:

```text
date text → parse → date value → compare or inspect → format → display text
```

The text and date value have different jobs. A formatted string is not automatically suitable for chronological logic.

## 5. Prove the Date Operations in Isolation

In a scratch file, perform these checks before integration:

1. Print `date.today()` and its type.
2. Parse one known-valid date string with a matching format.
3. Convert the parsed `datetime` to a `date` if your experiment needs date-only logic.
4. Print its year and month.
5. Format the same date in two display forms.
6. Compare two dates whose chronological order you already know.
7. Parse an impossible or mismatched date and inspect the `ValueError` traceback.

Predict each result. For the failure, read the traceback bottom-up and connect the message to the input text and format string. Only after the mechanism is clear should you decide how your program handles that expected boundary failure.

## 6. Integrate Dates Without Losing Ownership

Return to the meaning you wrote down in Section 3. Extend your record-creation behavior so each relevant record has the date information your design needs. This brief does not choose a field, key, variable, function, or storage form.

Apply Phase 4's boundary discipline if a person supplies text: show the expected form, parse narrowly, handle the expected `ValueError`, and provide another chance or another deliberate response. Do not catch unrelated programming errors as date mistakes.

If you offer today's date, use the actual date value from `date.today()` rather than constructing today's date by hand. If you accept a supplied date, prove that impossible calendar dates are rejected by the parsing operation.

Verify display separately. Confirm `strftime()` returns a string while comparisons use compatible date objects.

## 7. Choose a Persistence Representation

JSON stores strings, numbers, booleans, lists, dictionaries, and null values; it does not directly serialize Python date objects with the basic Phase 3 mechanism. Your program therefore needs a deliberate boundary between the in-memory date used for logic and whatever JSON-compatible representation you choose to store.

Your representation must retain the needed calendar parts unambiguously and become the value your logic expects after loading.

Prove the round trip with evidence:

1. Inspect the in-memory date value and its type.
2. Save a record and inspect the raw JSON.
3. Exit the process completely.
4. Reload and inspect the stored representation.
5. Reconstruct the value used for date logic.
6. Print its type, year, and month.

Make the smallest coherent extension that preserves existing behavior.

## 8. Read Dates 02

Read **Dates 02 — Building Monthly Views**. It extends the Phase 5 filtered-subset pattern in a maintenance-record domain.

A monthly view is a derived result. Each candidate date must agree with both the target year and target month. Month number alone is insufficient because the same month occurs every year.

The pattern remains visible:

```text
full collection → inspect each usable date → compare year and month → append matches to a new list
```

The subset answers one question without replacing or mutating the source collection.

## 9. Build One Monthly View

Decide whether the useful first view is for the current month or for a month requested through your existing interaction design. Either is valid. If a person supplies the target, define and validate the accepted input without adding unnecessary date interfaces.

State the rule first: a record matches only when its usable date has the intended year and month. Build a fresh subset with the established pattern.

Keep these responsibilities distinct:

- obtaining or choosing the target month;
- making stored date information usable for logic;
- selecting records;
- displaying the selected records;
- handling no matches.

These are responsibilities, not prescribed functions or sequence. Fit them to your program and retain your established display choices.

## 10. Structured Manual Verification

Extend your written transcript with setup, action, prediction, observation, and result.

**Date boundary:**

1. Use a valid date in the accepted form.
2. Use text with the wrong form.
3. Use a correctly shaped but impossible calendar date.
4. Confirm expected invalid input does not end the program unexpectedly.
5. Show the parsed value and type for a valid case.

**Date behavior:**

1. Display today's date if your design uses it.
2. Format one date in two forms in a scratch experiment.
3. Compare a known earlier and later date.
4. Show the year and month extracted from one date value.

**Monthly view:**

1. Prepare known records across at least two months and two years.
2. Predict a target with zero matches.
3. Predict a target with one match.
4. Predict a target with several matches.
5. Compare the observed contents and counts with your predictions.
6. Display the full collection afterward and confirm it is unchanged.

**Regression and persistence:**

1. Run one established group filter.
2. Run one Phase 4 invalid-input case.
3. Save, exit completely, and restart.
4. Inspect raw JSON and the loaded values.
5. Repeat a known monthly view and confirm the result survives the round trip.

The transcript is your regression evidence.

## 11. Debug Date Logic With Evidence

When the monthly result is wrong, inspect in this order:

1. The raw date text or stored JSON representation.
2. The parsed or reconstructed value.
3. Its `type()`.
4. Its year and month values.
5. The target year and target month.
6. The comparison result for each candidate.
7. The resulting subset and expected contents.

If parsing fails, preserve the exact input, exact format, and bottom traceback line. If logic works before restart but fails afterward, the first divergence is probably at the storage-to-date boundary rather than in the monthly condition. Let the evidence locate it.

## 12. Problem Journal

Continue with exactly six fields:

- expectation
- observation
- cause
- evidence used
- fix
- lesson for next time

Useful entries include a format mismatch, a parsing failure that challenged your expectation, text compared instead of date objects, a condition that checks month but not year, loaded text never converted for logic, or display format confused with storage representation. Skip trivial typos.

## 13. Help When You Are Stuck

- **L0 — Think / inspect.** What is the raw value, what type is it now, and what type does the next operation expect?
- **L1 — Exact pack.** Use Dates 01 for parsing, formatting, or comparison; use Dates 02 for monthly selection.
- **L2 — Directional hint.** “Does the candidate agree with both parts of the target month?”
- **L3 — Structural hint.** “Trace text, parsed value, stored representation, loaded value, reconstructed date, and monthly comparison. Where is the first disagreement?”
- **L4 — Guided diagnosis.** Reduce to three known records, print each year/month comparison, and inspect the source before and after selection.
- **L5 — Protected solution.** Study a complete date pattern in an unrelated domain, then return to your own program.

No level supplies a project field, format, prompt, helper, filename, menu, or control flow.

## 14. Mentor Checkpoint 2

At the end of Phase 6, complete a 20–30 minute conversational review. This is evidence-based calibration, not a score or grade.

Be ready to:

- Explain how data moves from input through validation, persistence, grouping, filtering, and date logic in your program.
- Demonstrate one normal save, complete exit, reload, and display cycle.
- Demonstrate one category or group filter.
- Demonstrate one monthly view, including records that should and should not match.
- Reproduce or describe one date parsing failure and the evidence used to diagnose it.
- Explain why your chosen in-memory and stored date representations fit your design.
- Show a meaningful Problem Journal entry if this phase produced one.
- Identify one area of the program that is becoming structurally awkward, without redesigning it during the checkpoint.

The mentor should ask for observable evidence and the learner's reasoning. The checkpoint introduces no new feature or concept.

## 15. Completion Gate

Phase 6 is complete when:

- Valid dates enter and display according to your stated policy.
- Invalid or impossible date text follows a deliberate narrow-handling path.
- Today's date is available where your design uses it.
- Compatible date values compare chronologically.
- Stored date information survives restart and becomes usable for logic again.
- Monthly selection checks both year and month.
- Zero, one, and several results behave sensibly.
- The source collection remains unchanged.
- Earlier validation, persistence, grouping, and filter behaviors still work.
- Your structured transcript records expected and observed results.
- Mentor Checkpoint 2 is complete.

Not required: time-of-day behavior, date arithmetic, recurring dates, several monthly interfaces, a reporting layer, or a new program architecture.

## 16. Reflection and Transition

Write briefly:

- What does a date mean in your design?
- Which representation does logic use, which representation crosses storage, and why?
- What evidence proves a monthly view checks the year as well as the month?
- Which parsing failure taught you the most about the input-format contract?
- Which part of the program now feels structurally awkward, and what evidence supports that observation?

Keep the checkpoint notes, transcript, and reflection with the earlier phase work. Stop after this verified state; the next phase begins from it.
