---
title: "Display 01 — Aligned, Readable Terminal Output"
pack: "Display 01"
phase: "02"
estimated_time: "10–15 minutes"
prerequisites: "Starting Manual Sections 04 and 07 (f-strings, loops)"
outcomes:
  - "Recognize why side-by-side output drifts when values have different lengths"
  - "Use a minimum-width slot inside an f-string to hold output columns steady"
  - "Choose an alignment direction: left, right, or centered"
  - "Explain that width and alignment change presentation only, never the value"
  - "Locate alignment options in the official format-specification documentation"
---

## 1. When Columns Drift

An f-string places a value inside text. That is exactly what you learned in Section 04, and for one value per line it is all you need.

Problems appear when you print several values side by side, line after line:

```python
players = [
    {"name": "Ana", "score": 940},
    {"name": "Katherine", "score": 75},
    {"name": "Bo", "score": 1200}
]

for p in players:
    print(f"{p['name']} {p['score']}")
```

```terminal
Ana 940
Katherine 75
Bo 1200
```

Every value is correct, and the output is still unpleasant to read: the scores start at a different position on every line, because the names above them have different lengths. The information is fine. The *presentation* wobbles.

## 2. The Mental Model: Reserved Slots

A **format specifier** reserves a slot of a chosen minimum width inside the line. The value is placed into the slot, and padding fills whatever room is left. Every line that uses the same slot width places its values at the same position, which is what makes columns hold still.

Two things to keep in mind about slots:

* The width is a **minimum**, not a maximum. A value longer than the slot pushes the column outward; nothing is ever cut off.
* Slots change **presentation only**. The value itself — its type, its contents — is untouched.

## 3. The Smallest Example

```python
print(f"{'Ana':<10}|")
print(f"{'Katherine':<10}|")
```

```terminal
Ana       |
Katherine |
```

Inside the braces, `:<10` is the format specifier: the `<` chooses alignment and the `10` chooses the slot width. Both names are placed at the left edge of a ten-character slot, so the `|` — a ruler you can print to see the column edge — lands in the same place on both lines.

## 4. Choosing Direction

Three alignment symbols cover everything you need:

* `:<10` — place the value at the **left** edge of a 10-character slot,
* `:>10` — place it at the **right** edge,
* `:^10` — **center** it in the slot.

One built-in habit is worth knowing: without a direction, text is left-aligned and numbers are right-aligned within a width. Numbers look natural right-aligned, because digits of the same magnitude line up.

Here is the scoreboard from Section 1 with a slot per column:

```python
for p in players:
    print(f"{p['name']:<12}{p['score']:>6}")
```

```terminal
Ana            940
Katherine       75
Bo            1200
```

Read one line of the f-string carefully: the name goes into a 12-character slot at the left edge, then the score goes into a 6-character slot at the right edge. Every column needs its own slot; one specifier aligns one column.

## 5. Inspect the Behavior

Widths are minimums. Predict the output of this line before running it:

```python
print(f"{'Katherine':<3}|")
```

The name is longer than three characters, so the slot silently expands and nothing is truncated. Alignment is only as good as the width you chose for the longest value you expect to print. This is also why a column that "holds still" in testing can drift later: the data grew past the width you picked.

## 6. Experiments

### Experiment 1 — Predict the Padding

Create `exp1_slots.py`:

```python
print(f"{'cat':<6}|")
print(f"{'cat':>6}|")
print(f"{'cat':^6}|")
```

1. **Predict** the exact output, character by character, including spaces.
2. **Run** and compare.
3. **Explain** where the padding went in each of the three lines.

### Experiment 2 — Hold a Table Still

Create `exp2_table.py` with the three-player list from Section 1.

1. Rebuild the loop so both columns hold still.
2. Add a fourth player whose name is the longest you can think of.
3. **Predict:** do the columns survive? **Run** and check.
4. **Explain:** under what condition does a well-aligned table start to drift again, and what would you change?

### Experiment 3 — Swap the Directions

Using your table from Experiment 2, swap `<` and `>` on both specifiers.

1. **Predict** what moves.
2. **Run** and verify.
3. **Explain** which direction suits text and which suits numbers, and why the default behavior of f-strings matches that instinct.

## 7. Common Mistakes

* **A width smaller than the longest value:** the slot expands instead of aligning, and the column drifts again. Widths are chosen for the longest value, not the average one.
* **Mixing up `<` and `>`:** `<` places the value at the left edge of the slot; `>` places it at the right edge. If a column hugs the wrong side, this is why.
* **Formatting one column and expecting the rest to follow:** every column needs its own slot. One specifier affects one value.
* **Expecting formatting to repair wrong data:** if a score is wrong, a straight column displays the wrong score neatly. Check correctness before styling.
* **Confusing the displayed text with the value:** `f"{p['score']:>6}"` produces text to show a human. It does not change the score stored in the record.

## 8. What This Pack Does Not Cover

* Controlling how many decimal places a number shows — that is a separate capability, introduced in a later phase of your project.
* Colors, cursor movement, or any terminal escape codes.
* Third-party formatting libraries.
* The older `.format()` method — f-strings are the modern form you already know.
* String methods of any kind.
* Aligning multi-line text or building full text tables beyond columns.

## 9. Reading the Documentation

The format specifier syntax is documented by Python as a tiny language of its own — the "format specification mini-language" in the official f-string documentation. It is laid out as a table: each option is one or two characters with a stated meaning, followed by examples.

This is the same documentation-reading skill as Section 10 of the Starting Manual, applied to a new page: find the option you need, read its exact stated meaning, and test it with a one-line example before using it in your program. The table is the authority on what `>`, `^`, and the width digits do — this pack is your starting map, and the documentation is the ground truth.

## 10. Debugging Checklist

* Print the values **without** any widths first. Confirm the data is right before styling it.
* Add width specifiers one value at a time, running after each change.
* A column still drifts? Find the longest value printed so far and compare its length with your chosen width.
* Not sure what a specifier does? Run it alone on a short string in the REPL before touching the program.
* Numbers line up oddly? Check which alignment direction each specifier is using — and remember the text-left, numbers-right default.

## 11. Presentation Is Not Logic

Everything in this pack changes only what the user sees. Correctness is a property of the data and the calculations; formatting is the last, optional step before showing them.

Keep that boundary sharp in your program: when output looks wrong, first ask whether the program *knows* something wrong or only *shows* something wrong. Print the raw values without widths to find out. A straight column of correct numbers is a finished feature; a straight column of wrong numbers is a bug wearing a neat outfit.
