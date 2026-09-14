---
title: "Dates 02 — Building Monthly Views"
pack: "Dates 02"
phase: "06"
estimated_time: "10–15 minutes"
prerequisites: "Querying 01 and Dates 01 (derived subsets, date values, parsing, and year/month attributes)"
outcomes:
  - "Describe a monthly view as a derived subset of a complete collection"
  - "Match records by both target year and target month"
  - "Build a monthly subset with a loop, condition, and append"
  - "Handle zero, one, and several monthly matches"
  - "Keep date selection, presentation, and source data separate"
---

## 1. Month Number Alone Is Ambiguous

A maintenance log can contain service visits from April 2025 and April 2026. Selecting every record whose month is `4` combines different years and answers a broader question than “show April 2026.”

A monthly view needs two parts: target year and target month. A record matches only when both parts of its usable date agree with the target.

## 2. Reuse the Derived-Subset Model

Phase 5 established a visible selection pattern:

```text
source collection → examine record → test condition → append match to new list
```

Monthly selection uses the same pattern. The condition changes; the ownership model does not. The full maintenance history remains the source, and the monthly list is a temporary answer to one question.

Do not remove records from the source to create the view. Do not store the subset as another source of truth merely because it is convenient to display.

## 3. Compare Year and Month Explicitly

Suppose each maintenance record in this unrelated example already carries a `date` value under its own field. The selection core can remain plain:

```python
matches = []
for record in maintenance_records:
    if record["service_date"].year == 2026 and record["service_date"].month == 4:
        matches.append(record)
```

The condition has two comparisons joined by `and`. Both must be true. A record from April 2025 fails the year comparison; a record from May 2026 fails the month comparison.

The example's field and fixed target belong only to the maintenance domain. A program can obtain the target year and month in several ways, including using today's date or validated user input.

## 4. Current Month or Chosen Month

For a current-month view, `date.today()` supplies the target year and month:

```python
today = date.today()
target_year = today.year
target_month = today.month
```

For a chosen month, a program needs a clear input contract. It may parse a complete date and use its year and month, or validate year and month input according to its design. The important result is a usable numeric target pair, not one prescribed prompt.

Keep the target visible during debugging. Print target year and target month before the loop when results disagree with prediction.

## 5. Stored Text Must Become Usable Again

JSON-compatible date information often loads as text or another basic value. A string has no `.year` or `.month` date attributes. If the working records contain stored text after loading, reconstruct compatible date values before applying date logic, or parse each candidate at a deliberate boundary chosen by the program.

Do not assume that text which prints like a date is a date object. Use `type()` as evidence. If monthly selection works before saving but fails after restart, compare the value and type on both sides of the persistence boundary.

This pack does not prescribe where conversion happens. It requires that the condition receive values whose meaning and type support the comparison.

## 6. Keep Selection and Display Separate

The monthly subset answers which records match. Display decides how those records appear. Mixing formatting into the matching rule can turn a simple calendar comparison into fragile text logic.

First inspect the subset itself. Confirm its count and contents. Then pass or loop over that result using established display behavior. A display defect should not require changing which records belong to the month.

Similarly, a zero-result response belongs to presentation. An empty list is a valid selection result; it is not a parsing failure.

## 7. Zero, One, and Several Results

Create a small maintenance collection whose expected monthly distribution you can count by hand.

- **Zero matches:** confirms the program handles an empty derived result without assuming a first item exists.
- **One match:** confirms the condition can select narrowly.
- **Several matches:** confirms the loop continues after finding one matching record.

Check contents as well as length. Two wrong records can still produce the expected count. Include the same month number in different years so the test proves that year participates in the rule.

## 8. Preserve the Full History

Record evidence before and after selection:

```python
print(len(maintenance_records))
print(len(matches))
print(len(maintenance_records))
```

The source length should remain equal. Also inspect source contents and order, since length alone cannot detect every unintended change.

The subset and source are separate lists, but selected dictionaries may still be shared values. Monthly viewing requires no mutation through the result. Treat the subset as a view and leave the underlying records unchanged.

## 9. Controlled Experiments

### Experiment 1 — Same Month, Different Year

1. Create maintenance records for the same month number in two years.
2. Predict the result for one target year and month.
3. First test month alone and observe the overly broad result.
4. Add the explicit year comparison.
5. Explain which record is now excluded and why.

### Experiment 2 — Current Month

1. Print today's date, year, and month.
2. Create scratch records where one matches that year/month and one does not.
3. Predict the subset.
4. Run the selection and inspect count and contents.

### Experiment 3 — Zero, One, Several

1. Prepare a known collection spanning several months.
2. Choose targets that should produce zero, one, and several records.
3. Predict every result before running.
4. Compare actual contents and counts with the predictions.

### Experiment 4 — Persistence Boundary

1. Begin with one JSON-compatible date representation from a scratch maintenance file.
2. Load and print the raw value and type.
3. Reconstruct a date using the chosen input contract.
4. Print its type, year, and month.
5. Use it in one monthly comparison.

### Experiment 5 — Source Preservation

1. Print the source collection before selection.
2. Build and display one monthly subset.
3. Print the source afterward.
4. Verify contents, order, and length remain unchanged.

## 10. Common Mistakes

- **Checking month but not year:** records from several years become mixed.
- **Comparing raw display text:** the condition depends on presentation rather than date meaning.
- **Assuming loaded text is a date:** `.year` and `.month` are unavailable on strings.
- **Stopping at the first match:** later records in the same month are missed.
- **Reusing an old result list:** records from an earlier request remain present.
- **Mutating the source:** a temporary view changes the complete history.
- **Treating no matches as a parsing error:** an empty subset can be a correct answer.
- **Checking only result length:** wrong records can hide behind a correct count.

## 11. Reading the Documentation

This pack reuses attributes and collection tools:

```text
date_value.year -> int
date_value.month -> int
list.append(value) -> None
```

`year` and `month` are attributes, not methods. `.append()` changes the result list on which it is called. Review boolean `and`: the combined condition is true only when both comparisons are true.

For any parsing used at the persistence or input boundary, return to the `datetime.strptime()` signature and format-code table in Dates 01.

## 12. Debugging Checklist

- Print the raw stored or entered date representation.
- Print the reconstructed value and `type()`.
- Print candidate year and month.
- Print target year and month.
- Print each combined condition result.
- Compare expected and observed contents, not only counts.
- Print the full source before and after the view.
- Test the same month number across two years.

## 13. What This Pack Does Not Cover

- Totals, grouped summaries, sorting, or reporting.
- Time of day, time zones, date arithmetic, or calendar utilities.
- Compact collection syntax, anonymous functions, or slicing.
- A prescribed date field, representation, target-month interface, helper, or control flow.
- Finance, ledger, transaction, income, expense, budget, or monthly-spending examples.

## 14. Where This Fits Your Project

Your program can already derive subsets. This pack changes the selection question to a calendar month: both year and month must agree, the source remains complete, and display remains a separate concern. You decide how the target is chosen and how stored date information becomes usable for comparison.

