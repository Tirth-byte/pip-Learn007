---
title: "Numbers 01 — Float Precision and Displaying Decimal Values"
pack: "Numbers 01"
phase: "04"
estimated_time: "10–15 minutes"
prerequisites: "Starting Manual Sections 03 and 04 (numeric values, arithmetic, conversion, and f-strings)"
outcomes:
  - "Explain why many decimal fractions cannot be represented exactly in binary floating-point"
  - "Observe surprising decimal arithmetic with print() and type()"
  - "Use round() as a deliberate numeric operation without claiming it creates exact decimal values"
  - "Use the :.2f format specifier for a two-decimal display"
  - "Distinguish a calculation value from its displayed text representation"
---

## 1. A Familiar Calculation Can Print Strangely

Run this small experiment:

```python
result = 0.1 + 0.2
print(result)
print(type(result))
```

Python commonly displays:

```terminal
0.30000000000000004
<class 'float'>
```

The mathematical sum is three tenths. The long tail is evidence about how the float value is represented, not evidence that Python forgot arithmetic.

## 2. Floats Use Binary Fractions

Computers store Python floats using a finite binary floating-point representation. Just as one third cannot be written exactly with a finite number of decimal digits, many decimal fractions cannot be written exactly with a finite number of binary digits.

Python therefore stores the closest available binary approximation for values such as `0.1`. Arithmetic operates on those approximations. Sometimes the small difference becomes visible when Python converts a result back into decimal text for printing.

“Floats are inaccurate” is too broad. Many values are represented exactly, and floating-point arithmetic follows precise rules. The practical limitation is that many decimal fractions are approximations, so code must choose how much precision matters for calculation and display.

## 3. Calculation Value and Display Are Different

A running program holds a numeric value. A person sees text. Formatting decides how the value is represented as text without changing the value itself.

```python
distance = 0.1 + 0.2
print(f"{distance:.2f}")
print(distance)
```

Output:

```terminal
0.30
0.30000000000000004
```

`:.2f` means display this numeric value in fixed-point form with two digits after the decimal point. The first line is formatted text for a reader. The second proves the underlying float remains unchanged.

Formatting is appropriate when the requirement concerns what a person should see. It does not repair, replace, or mutate the stored number.

## 4. `round()` Returns a Numeric Value

`round()` performs a rounding operation and returns a number:

```python
measurement = 2.675
rounded = round(measurement, 2)
print(rounded)
print(type(rounded))
```

Do not infer a universal tie rule from one decimal example. The input float may already be slightly above or below the exact decimal value you had in mind. Inspect actual behavior for representative values and consult the documentation before making a policy claim.

`round(value, 2)` does not turn a float into an exact two-decimal decimal quantity. Its result is still represented as a float. It is useful when the program deliberately needs a rounded numeric result for subsequent work.

## 5. Choose the Tool by the Requirement

Ask what must change:

- If a reader should see a consistent number of decimal places, formatting controls the display.
- If later calculations should use a deliberately rounded numeric result, `round()` returns such a result.
- If neither requirement exists, preserve the calculation and inspect it rather than rounding automatically.

These choices can coexist, but they are not interchangeable. A rounded numeric result may still display with one decimal digit, such as `3.5`. A `:.2f` display may show `3.50`, but that output is text and the original float has not changed.

## 6. Formatting Rounds the Display

Fixed-point formatting rounds the displayed representation to the requested number of places:

```python
temperature = 18.376
print(f"Observed: {temperature:.2f}")
print(temperature)
```

The display reads `Observed: 18.38`; printing the value normally still reads `18.376`. This makes a measurement report stable and readable while preserving the calculation value.

Do not convert the formatted text back to a number merely to make it “stay” at two visible places. Visible trailing zeroes are a property of text representation. Numeric values do not remember a display width.

## 7. Equality Can Expose the Approximation

This comparison may surprise you:

```python
total = 0.1 + 0.2
print(total == 0.3)
```

It prints `False` because the stored approximations are not identical. This pack does not introduce a general strategy for approximate equality. Its purpose is to make the limitation visible so you do not confuse a display policy with a change to numeric representation.

For this phase, use small known calculations, inspect actual values, and apply only the numeric or display policy your program can justify.

## 8. Experiments

### Experiment 1 — Reveal the Representation

1. Predict the output of `0.1 + 0.2`.
2. Run it and print both the result and its type.
3. Display the result with `:.2f`.
4. Print the original result again.
5. Explain what changed and what did not.

### Experiment 2 — Measurement Accumulation

Start a sensor total at `0.0`. Add `0.1` to it ten times with a loop.

1. Predict the final printed value.
2. Run the loop and inspect the raw result.
3. Display it with two decimal places.
4. Compare the raw value, display text, and mathematical expectation.

### Experiment 3 — `round()` Is Still Numeric

Choose several measurements with more than two decimal places.

1. Predict `round(value, 2)` for each.
2. Run each case and inspect the returned type.
3. Format the original and rounded values with `:.2f`.
4. Explain why matching displays do not prove identical underlying values.

### Experiment 4 — Representation Policy

Imagine a package label that must show length with exactly two decimal places while later calculations still need the measured value.

1. State whether the requirement concerns calculation, display, or both.
2. Choose the tool that matches the requirement.
3. Run a small example and preserve both the raw and displayed observations.

## 9. Common Mistakes

- **Saying floats are random or simply inaccurate:** their behavior follows a defined binary floating-point system.
- **Assuming decimal source text is stored exactly:** many decimal fractions have no finite binary representation.
- **Claiming `round()` creates exact decimal values:** its float result remains a binary floating-point value.
- **Claiming `:.2f` changes the number:** it controls only the displayed text.
- **Rounding at every step without a requirement:** repeated policy choices can change later results.
- **Expecting a numeric value to retain trailing zeroes:** trailing zeroes belong to formatting.
- **Deriving a tie-breaking rule from one experiment:** the stored input approximation affects observed cases.

## 10. Reading the Documentation

Read the built-in signature conceptually:

```text
round(number, ndigits=None) -> number
```

`number` is required. `ndigits` is optional and selects the rounding position. Ask what comes back and test its type for the kind of number you supplied.

For f-strings, consult the format-specification documentation. In `:.2f`, `.2` requests two digits after the decimal point and `f` requests fixed-point presentation. This is representation for display, not mutation of the source value.

## 11. Debugging Checklist

- Print the raw calculation value before formatting it.
- Print `type()` to distinguish numeric calculation from display text.
- Reproduce the issue with the smallest decimal expression possible.
- Compare raw output, `round()` output, and `:.2f` output separately.
- Recompute a small case by hand.
- State whether the requirement concerns later arithmetic or human-readable display.
- Change one policy decision at a time and rerun the same values.

## 12. What This Pack Does Not Cover

- The `Decimal` module or other exact-decimal models.
- A prescribed storage or rounding policy for any project.
- Approximate-equality algorithms or numerical analysis.
- Currency, ledger, transaction, income, expense, budget, or balance examples.

## 13. Where This Fits Your Project

Your project contains numeric calculations and user-facing output chosen in earlier phases. This pack gives you evidence for deciding where a stable two-decimal display matters and whether any numeric rounding policy is justified. It does not choose where you store, calculate, round, or format values.

