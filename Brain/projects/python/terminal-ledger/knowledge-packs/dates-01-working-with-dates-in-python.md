---
title: "Dates 01 — Working With Dates in Python"
pack: "Dates 01"
phase: "06"
estimated_time: "12–18 minutes"
prerequisites: "Starting Manual Sections 05, 09, and 10 (comparisons, narrow error handling, imports, and documentation)"
outcomes:
  - "Explain why date logic needs date values rather than arbitrary display text"
  - "Import date and datetime from Python's datetime module"
  - "Use date.today() and inspect its return type"
  - "Parse date text with datetime.strptime() and obtain a date with .date()"
  - "Format dates with strftime() and compare date values chronologically"
---

## 1. Text That Looks Like a Date Is Still Text

An appointment system can store `"2/3/2026"`, but the text alone does not state whether that means February 3 or March 2. Arbitrary strings can also contain impossible dates. If logic must compare dates or select a month, the program needs an explicit input format and a real date value.

Python's standard-library `datetime` module provides types that understand calendar rules. This pack uses only calendar dates—no time of day or date arithmetic.

## 2. Import the Two Date Types

Use a focused import:

```python
from datetime import date, datetime
```

`date` represents a calendar date with year, month, and day. `datetime` can also represent time-of-day information, but here it is used only because `strptime()` is the parsing tool. After parsing, `.date()` can produce a date-only value.

The module and one of its types share the name `datetime`. Read the import aloud: from the `datetime` module, import the `date` and `datetime` names.

## 3. Ask Python for Today's Date

`date.today()` returns the current local date:

```python
today = date.today()
print(today)
print(type(today))
```

The type is `<class 'datetime.date'>`. The printed form commonly looks year-first, such as `2026-09-14`, but the important fact is that `today` is a date value, not merely display text.

Its parts are available as attributes:

```python
print(today.year)
print(today.month)
print(today.day)
```

These are integer values. Parentheses are not used because `year`, `month`, and `day` are attributes, not function calls.

## 4. Parse Text With an Explicit Format

Parsing turns text that follows a stated pattern into a value Python can reason about:

```python
text = "2026-04-09"
parsed = datetime.strptime(text, "%Y-%m-%d")
print(parsed)
print(type(parsed))
```

The format string describes the text:

- `%Y` — four-digit year
- `%m` — two-digit month number
- `%d` — two-digit day of month

`datetime.strptime()` returns a `datetime`, even though the text contains only a date. The result's type is `<class 'datetime.datetime'>`.

The format is a contract. Separators, ordering, and numeric pieces must match. A different input convention needs a matching format string; Python does not guess which convention a person intended.

## 5. Convert Parsed Results to a Date

When only calendar dates matter, call `.date()` on the parsed result:

```python
parsed = datetime.strptime("2026-04-09", "%Y-%m-%d")
appointment_date = parsed.date()
print(type(appointment_date))
```

The output is `<class 'datetime.date'>`. `.date()` returns a new date value containing the year, month, and day from the `datetime`.

Keeping compatible types makes comparisons clear. Compare a date with another date. Do not assume a date object and a string that looks similar are interchangeable.

## 6. Controlled Failure: Invalid Dates

Parsing can fail for two common reasons:

- the text does not match the format;
- the pieces match the format but do not form a real calendar date.

Run:

```python
text = "2026-02-30"
parsed = datetime.strptime(text, "%Y-%m-%d")
```

The traceback ends with:

```terminal
ValueError: day 30 must be in range 1..28 for month 2 in year 2026
```

Python recognized the pieces, then rejected an impossible day. Exact message wording can vary by Python version. Other mismatches also raise `ValueError` with different messages.

This is a natural Phase 4 boundary. Handle `ValueError` narrowly around the expected parse operation. Do not catch every exception or label unrelated bugs as invalid date input.

## 7. Format a Date for Display

`strftime()` returns a string based on a format:

```python
visit = date(2026, 4, 9)
display = visit.strftime("%d/%m/%Y")
print(display)
print(type(display))
```

The output is `09/04/2026`, and its type is `str`. The original `visit` remains a date.

Formatting controls representation for a person or text boundary. It does not change the date object and does not make the returned string behave like a date. Preserve or reconstruct date values when logic depends on chronology.

## 8. Compare Dates Chronologically

Compatible date objects support ordinary comparisons:

```python
earlier = date(2026, 3, 20)
later = date(2026, 4, 2)
print(earlier < later)
```

This prints `True`. Python compares the calendar values chronologically.

Do not generalize that result to arbitrary strings. Text comparison follows character ordering, which may disagree with chronology depending on the representation. Parse first when the input is date text and the program needs date logic.

Equality also compares calendar values. Two date objects representing the same year, month, and day compare equal even if they were created through different paths.

## 9. Storage Is a Boundary

Basic JSON serialization does not directly store Python date objects. A program must choose a JSON-compatible representation and later reconstruct a date for logic. This pack does not prescribe that stored form.

A useful representation must retain the parts the program needs and avoid ambiguity. Inspect both sides of the boundary: the raw stored value and the reconstructed value with its type. Display format, storage representation, and in-memory logic can have different requirements.

## 10. Experiments

### Experiment 1 — Today and Its Parts

1. Predict the type returned by `date.today()`.
2. Print the value, type, year, month, and day.
3. Compare the printed parts with your calendar.
4. Explain why the attributes are numbers rather than calls.

### Experiment 2 — Parse and Convert

1. Choose one valid appointment date and an explicit input format.
2. Predict the types before and after `.date()`.
3. Run and print both values and types.
4. Inspect their year and month attributes.

### Experiment 3 — Controlled Failure

1. Predict what happens for text with the wrong separator.
2. Run it and record the final traceback line.
3. Try an impossible calendar date.
4. Compare the two `ValueError` messages.
5. Explain what each is evidence of.

### Experiment 4 — Format Without Mutation

1. Create one date for a maintenance appointment.
2. Format it in two different ways using only the codes taught here.
3. Print the original date and its type afterward.
4. Explain what changed and what did not.

### Experiment 5 — Chronological Comparison

1. Create an earlier and later appointment date that cross a month boundary.
2. Predict `<`, `>`, and `==` results.
3. Run each comparison.
4. Repeat with two dates that cross a year boundary.

## 11. Common Mistakes

- **Comparing arbitrary date strings:** character order is not a general calendar rule.
- **Using the wrong format code order:** parsing follows the stated format exactly.
- **Expecting `strptime()` to return a date:** it returns a `datetime`; `.date()` produces a date-only value.
- **Expecting `strftime()` to return a date:** it returns a string.
- **Calling `.year` or `.month`:** they are attributes, so no parentheses are needed.
- **Accepting impossible dates manually:** parsing already applies calendar rules.
- **Catching every exception:** programming bugs become misleading input messages.

## 12. Reading the Documentation

Read the central tools as:

```text
date.today() -> date
datetime.strptime(text, format) -> datetime
datetime_value.date() -> date
date_value.strftime(format) -> str
```

Ask what each expects, what it returns, and what can fail. Read the format-code table only for the codes your program uses. The same codes describe parsing input and formatting output, but the direction and return type differ.

## 13. Debugging Checklist

- Print the raw input text and exact format string.
- Print the parsed value and `type()`.
- Read a parsing traceback from the bottom up.
- Inspect year, month, and day separately.
- Compare compatible date types.
- Print formatted output separately from the logic value.
- After loading stored data, verify reconstruction before date comparison.
- Rerun the same known input after changing one thing.

## 14. What This Pack Does Not Cover

- Time of day, time zones, date arithmetic, or recurrence.
- Calendar utilities or third-party date libraries.
- A prescribed date format, storage representation, field, or prompt for any project.
- Finance, ledger, transaction, income, expense, budget, or monthly-spending examples.

## 15. Where This Fits Your Project

Your program now needs calendar logic. This pack gives you date values, today's date, explicit parsing, formatting, and chronological comparison. You decide what a date means, which input and display forms fit, and how a JSON-compatible stored representation becomes a date value again.
