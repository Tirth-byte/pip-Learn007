---
title: "Phase 7: Budgets"
phase: "07"
estimated_time: "1–1.5 hours"
prerequisites: "Phase 6 complete — date parsing, formatting, chronological comparison, and monthly views work across restarts"
---

## 1. Beyond Passive Bookkeeping

Through Phase 6, your application has acted as a historical recorder: accepting records, validating them at the boundary, grouping them, and extracting monthly views. So far, the program answers "what happened?"

In Phase 7, your program evaluates observed data against configured limits. The user can set a budget limit, inspect usage with a visual indicator, and observe warnings when spending approaches or crosses the threshold.

This introduces a new architectural pressure: **persisting more than one kind of application state**. Your program must coordinate two distinct categories of durable state—records and budget limits—without allowing either one to overwrite or corrupt the other.

## 2. What You Will Demonstrate

By the end of this phase, you can show:

- A budget limit can be set and updated according to your design.
- The program evaluates observed spending against the relevant limit.
- A bounded visual indicator illustrates the proportion used without overflow at 0%, 100%, or beyond.
- A warning or distinct status appears when spending crosses your designated threshold.
- Quitting and relaunching restores both records and budget limits intact.
- Edge conditions (zero limit, unbudgeted category, zero spending) display sensible feedback without crashing.
- Spending usage and budget limits remain accurate and consistent across operations.
- You can explain how your persistence approach stores multiple kinds of state and restores each safely.
- Phase 4 validation, Phase 5 filtering, and Phase 6 date views continue to function.

Budget scope, thresholds, characters, names, data file layout, prompts, and control flow remain learner-owned.

## 3. Decide What a Budget Means in Your Design

Before modifying code or persistence, make concrete design choices:

1. **Scope:** Does a budget apply to a specific category, a whole month, or another scope?
2. **Computation:** How is "amount used" determined from your records?
3. **Absence:** What appears when no budget has been set for a category or month?
4. **Zero Limit:** How does your program handle a limit entered as `0.0`?
5. **Warnings:** At what threshold does a warning appear (e.g., approaching, at, or exceeding the limit)?
6. **Storage:** How will budget state be stored persistently alongside existing records?

Write down your answers first to keep budget rules decoupled from transaction handling.

## 4. Read State 02

Read **State 02 — Persisting More Than One Kind of State**. Experiment with its greenhouse monitoring examples in a scratch script before editing your save or load routines.

The pack covers:
- Separating working in-memory state from on-disk storage layout.
- Preserving multiple kinds of state across durable saves.
- Defensive loading that handles missing, empty, or unexpected file structures without crashing.
- Preventing the overwrite trap where saving settings erases records.

## 5. Evolve Your Persistent State Without Data Loss

Your save file already contains valuable records from earlier phases. Your first invariant is: **do not destroy existing data**.

Apply State 02 to your persistence layer:

1. **Storage organization:** Your saved representation must preserve the kinds of state your program needs. How you organize that representation (e.g. within a unified structured file or across separate stores) remains your design decision.
2. **Defensive loading:** If your stored representation evolves, decide how your program will recognize and handle the forms it expects. Do not add migration complexity unless your design actually needs it. Provide safe fallback defaults if data is missing or empty.
3. **Data safety:** Confirm existing records load cleanly before any budget is configured.
4. **Preserving state:** Ensure your saving mechanism preserves both kinds of state so that updating one does not destroy or overwrite the other.

Verify by setting a budget, quitting, inspecting your saved data in an editor, and confirming both records and budget state are preserved.

## 6. Reason About Threshold Arithmetic

Comparing numbers against a limit involves boundary decisions:

- **Remaining amount:** Typically `limit - used`. State clearly when the budget is exceeded rather than displaying confusing negative space.
- **Usage ratio:** Typically `used / limit`. For example, `50.0 / 100.0` yields `0.50` (50%).
- **Zero denominator:** If `limit` is `0.0`, dividing raises `ZeroDivisionError`. Inspect `limit` before dividing.
- **Derived versus stored state:** When tracking how much of a budget is spent, consider whether "amount used" is computed dynamically from your records or stored as a separate total. Storing a separate running total introduces synchronization risk: whenever records are added or filtered, duplicate totals can drift out of agreement. Deciding what is stored versus derived is your design choice, but the resulting numbers must stay accurate.

## 7. Read Display 02

Read **Display 02 — Showing Progress Toward a Threshold**. Test its storage capacity examples in a scratch file.

The pack covers:
- String multiplication (`"=" * count`) for building text bars.
- Scaling a numeric usage ratio to a fixed bar width.
- Clamping indicators between `0.0` and `1.0` so over-budget values do not distort terminal layout.
- Distinguishing honest numeric reporting from visual bar presentation.

## 8. Communicate Budget State and Limits Clearly

Integrate the visual indicator and status reporting into your budget view:

1. **Calculate first:** Determine spending from records, find remaining funds, and check threshold state.
2. **Build the indicator:** Render a bar of fixed character width using string repetition, clamped so exceeding the budget never overflows the line.
3. **Display full status:** Show current spending, limit, percentage, and a clear status message (under budget, approaching, or exceeded).
4. **Handle special cases:** An unspent category shows an empty bar (0.0%); a category without a limit indicates no limit applies.

## 9. Read Verification 01

Read **Verification 01 — Writing Small Checks for Your Logic**.

As calculations expand, manual terminal testing becomes tedious. Verification 01 shows how to write lightweight, plain-Python check scripts:
- Why logic errors run silently without raising exceptions.
- The Arrange-Compute-Compare verification pattern.
- Isolating pure calculation functions from interactive `input()` and `print()` calls.
- Printing diagnostic evidence when an actual result disagrees with an expected result.

## 10. Write Small Repeatable Checks for Your Logic

In a scratch script (e.g. `check_budget_math.py`), test your core calculation function in isolation:

```text
Case 1: Zero spending with normal limit (0.0 used, 100.0 limit)
Case 2: Partial spending below limit (40.0 used, 100.0 limit)
Case 3: Exact spending at limit (100.0 used, 100.0 limit)
Case 4: Spending exceeding limit (135.0 used, 100.0 limit)
Case 5: Zero limit (50.0 used, 0.0 limit)
```

Compare actual results against hand-calculated expected values to catch arithmetic mistakes before wiring the function into your menus.

## 11. Controlled Experiments and Edge Cases

Run targeted experiments against your running program:

1. **Under budget:** Set a limit of 100.00 on a category with 40.00 spent. Confirm 40% bar fill, 60.00 remaining, and normal status.
2. **Exact boundary:** Add an entry bringing spending to exactly 100.00. Confirm full bar and correct status classification.
3. **Over budget:** Add an entry pushing spending to 150.00. Confirm the bar stays bounded, status reports the 50.00 excess, and percentage displays 150.0%.
4. **Zero limit:** Configure a limit of 0.00. Confirm the view handles it without a `ZeroDivisionError`.
5. **Zero spending:** View a budget for a category with no recorded entries. Confirm 0.00 spent and 0.0% display safely.
6. **Persistence round-trip:** Quit and relaunch. Confirm all records and budget limits restore, adding entries updates usage, and updating limits preserves records.

## 12. Structured Manual Verification

Extend your written transcript with setup, action, prediction, observation, and result:

**Budget boundary:**
1. Set a valid budget limit.
2. Set a limit of 0.00 and verify safe handling.
3. Enter invalid non-numeric text and verify defensive re-prompting.

**Budget behavior:**
1. View a category below limit; check remaining amount and bar fill.
2. View a category at exact limit.
3. View a category exceeding limit; check clamping and excess reporting.
4. View a category with no configured limit.

**Persistence round-trip:**
1. Inspect saved data on disk before restart.
2. Quit and relaunch; confirm all limits and spending amounts restore.
3. Add an entry; confirm neither state overwrites the other.

**Regression checks:**
1. Confirm Phase 6 monthly date views still work.
2. Confirm Phase 5 category filtering still works.
3. Confirm Phase 4 input validation on entry creation still works.

## 13. Debugging With Evidence

When behavior diverges from expectation, inspect evidence in order:

1. **Saved storage:** Open your data file(s) in an editor to confirm keys, structure, and values on disk.
2. **Loaded state:** Print `type()` and contents of working variables right after loading.
3. **Computed sums:** Print each entry evaluated during calculation to verify matching criteria.
4. **Threshold values:** Print `used`, `limit`, and `remaining` before formatting the display string.
5. **First divergence:** Compare printed outputs against manual calculations to isolate the flaw.

## 14. Problem Journal

Log unexpected bugs using the six standard fields:

- expectation
- observation
- cause
- evidence used
- fix
- lesson for next time

Good Phase 7 topics: overwriting records when saving limits, zero-division crashes, unconstrained progress bars on exceeded budgets, or desynchronized stored totals.

## 15. Help When You Are Stuck

- **L0 — Think / inspect.** Quit completely. What does your save file contain right now? At what line does execution diverge?
- **L1 — Exact pack.** State 02 for persistence; Display 02 for indicators and zero limits; Verification 01 for threshold math.
- **L2 — Directional hint.** "Opening a file in 'w' mode truncates it. Ensure your save process preserves all necessary application state."
- **L3 — Structural hint.** "Separate calculating budget state from formatting it. One step computes numbers; another builds display text."
- **L4 — Guided diagnosis.** Write a short scratch script loading your save file and printing types and counts.
- **L5 — Protected solution.** Study the greenhouse monitoring code in State 02 or storage quota in Display 02.

No level prescribes field names, JSON keys, menu text, function names, or file paths.

## 16. Completion Gate

Phase 7 is complete when:

- Both records and budget limits persist across complete restarts.
- Saving a budget limit never destroys or truncates records; saving a record preserves limits.
- Spending usage and budget limits remain accurate and consistent across operations.
- The budget view shows current value, limit, remaining amount, and a bounded visual indicator.
- Exceeding a budget displays honest status without breaking terminal layout.
- A zero limit or zero spending never raises `ZeroDivisionError` or crashes.
- Earlier validation, filtering, and monthly view behaviors continue to work.
- Your structured transcript records expected and observed verification results.
- Debugging insights are documented in your Problem Journal.

There is no formal mentor checkpoint in Phase 7. Review your transcript against these criteria before proceeding.

## 17. Reflection and Transition

Write briefly in your notes:

- How does your persistence model organize multiple kinds of state, and why?
- What tradeoffs exist between computing values dynamically from records versus storing separate totals?
- What boundary condition in your threshold math required the most care?
- How did writing small repeatable checks in Verification 01 compare to manual menu testing?

In Phase 8, your application will expand from evaluating individual categories to summarizing your entire dataset simultaneously with multi-category aggregations and reports.
