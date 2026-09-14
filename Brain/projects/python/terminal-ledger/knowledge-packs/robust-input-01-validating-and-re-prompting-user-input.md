---
title: "Robust Input 01 — Validating and Re-Prompting User Input"
pack: "Robust Input 01"
phase: "04"
estimated_time: "12–18 minutes"
prerequisites: "Starting Manual Sections 04, 05, 07, and 09 (input, decisions, loops, and basic try/except)"
outcomes:
  - "Identify user input as a boundary where outside text enters a program"
  - "Distinguish conversion failure from a converted value that violates a program rule"
  - "Use an accept-or-explain-and-repeat loop for expected bad input"
  - "Handle ValueError narrowly around numeric conversion"
  - "Explain why broad exception handling can hide programming bugs"
---

## 1. Input Is Outside Data

`input()` returns text supplied by a person. Your program does not control what that text contains. If the next operation expects a number, or expects a value within a useful range, trusting the text immediately makes the rest of the program fragile.

The point where outside data enters is a **boundary**. Validation at that boundary asks whether the value satisfies the program's expectations before the program relies on it.

Validation is not one universal rule. An event tool might require a whole-number group size within its venue policy. A package tool may require positive dimensions. “Valid” belongs to the behavior being built.

## 2. Two Ways Input Can Be Unusable

Suppose an event tool asks for an attendee count:

```python
text = input("Number attending: ")
count = int(text)
print(count)
```

Entering `six` raises `ValueError`. Conversion failed because the text does not describe an integer.

Entering `-6` is different. `int("-6")` succeeds and returns an integer, but a negative attendee count may violate the event's rules. Conversion answers, “Can Python produce this type?” Validation also asks, “Can this program use this value?”

Keep those questions separate:

1. Attempt the required conversion.
2. If conversion succeeds, check the program's rule.
3. Accept the value only when both conditions hold.

## 3. The Re-Prompt Pattern

A re-prompt loop follows a simple conversation:

```text
ask → attempt conversion → check rule
              bad ↙          ↘ good
         explain and repeat    accept and leave
```

The loop exists because one rejected attempt should not necessarily end the program. It keeps asking until a usable value arrives or until the surrounding design chooses another explicit exit.

Here is the conversion part in an unrelated event-registration example:

```python
while True:
    try:
        attendees = int(input("Number attending: "))
        break
    except ValueError:
        print("Enter a whole number.")
```

Read it in execution order. The loop asks. `int()` attempts conversion. A successful conversion reaches `break`, which ends the loop. `ValueError` skips to the matching handler, explains the expectation, and then the loop repeats.

This example proves the conversion pattern only. A real rule check, such as an acceptable range, still belongs to the program's requirements.

## 4. Check Rules After Conversion

Once conversion succeeds, conditions can examine the resulting number:

```python
if attendees > 0:
    print("Registration can continue.")
else:
    print("The group size must be positive.")
```

The condition is not a universal attendee rule. It is an example of connecting a rule to a reason. Another event may have a maximum capacity; a package may have a maximum dimension. State the rule in plain language before writing its condition.

If a rejected value should lead to another attempt, place the check in the same repeated conversation. Make every path understandable: an accepted path leaves the loop, while each rejected path explains and returns to the prompt. Trace each path on paper if the loop repeats unexpectedly.

## 5. Narrow Handling Preserves Evidence

`try` marks an operation expected to fail in a known way. `except ValueError` states which failure the program understands.

Keep the protected region small:

```python
try:
    length = float(input("Package length: "))
except ValueError:
    print("Enter a numeric length.")
```

The smaller the region, the clearer the evidence. If conversion raises `ValueError`, the handler has an honest interpretation. Unrelated operations do not get mislabeled as input trouble.

Avoid recommending a handler that catches every exception. It can conceal a misspelled name, a broken calculation, or another bug that should produce a traceback. A program that continues after hiding its own defect is not robust; it is harder to diagnose.

## 6. Validation and Error Handling

These ideas cooperate but are not identical.

- **Validation** checks whether incoming data satisfies expectations. A range condition is validation.
- **Error handling** defines the response when an operation fails. Handling `ValueError` from conversion is error handling.

Some validation needs no exception because Python can evaluate the rule normally. Some expected operations fail by raising an exception. Use the mechanism that matches the evidence rather than wrapping every check in `try`.

Do not silently accept an unusable value merely because conversion succeeded. Do not silently discard an invalid attempt either. A concise message should tell the person what kind of value the program can use, without exposing an internal traceback for an expected mistake.

## 7. Empty Text Is a Design Question

Pressing Enter without typing produces the empty string `""`. Numeric conversion of that text raises `ValueError`, so the numeric pattern already exposes it as non-convertible.

For a text prompt, empty text requires a rule. The condition can compare directly with `""` using knowledge you already have. Whitespace that looks empty but contains space characters is a related hazard, but text-normalization methods arrive in a later phase. Do not introduce those methods here. Define only the rule this phase can support honestly.

## 8. Controlled Failure: Read the Traceback

Run this in a scratch file and enter `many`:

```python
text = input("Number of seats: ")
seats = int(text)
```

The final line resembles:

```terminal
ValueError: invalid literal for int() with base 10: 'many'
```

Read it bottom-up. The exception type is `ValueError`. The message includes the text that `int()` could not interpret. The failing line identifies the conversion boundary. This is the specific expected failure a numeric re-prompt may handle.

Run the actual input and preserve the traceback as evidence.

## 9. Experiments

### Experiment 1 — Conversion and Rule Are Different

Use an event-registration scratch program that converts a requested seat count.

1. Predict what happens for `four`, `0`, `4`, and `400`.
2. Run each value separately.
3. Record whether conversion succeeded.
4. Write an event rule and record whether each converted value satisfies it.
5. Explain why one “invalid” label is not precise enough for every case.

### Experiment 2 — Re-Prompt Paths

Build a small loop for a package dimension.

1. Predict the path for nonnumeric text, a rule-breaking number, then an acceptable number.
2. Run those three attempts in that order.
3. Confirm rejected paths explain and repeat.
4. Confirm the accepted path leaves the loop exactly once.

### Experiment 3 — Handler Scope

Start with numeric conversion as the only statement protected by `try`.

1. Predict which exception bad numeric text raises.
2. Run it and confirm the matching handler responds.
3. Put a separate deliberate programming error after the protected region.
4. Confirm that the unrelated error still produces its own traceback.
5. Explain why that traceback is useful rather than unfriendly.

### Experiment 4 — Enumerate Boundaries

Choose a tiny program you have already written. List every call to `input()` and, for each, state the expected type, an unacceptable example, and the observable response you would design. Do not implement the changes until the rules are written clearly.

## 10. Common Mistakes

- **Converting outside the protected operation:** the expected `ValueError` occurs before the handler can respond.
- **Breaking after a failed rule check:** the loop accepts a value the program just rejected.
- **Never reaching `break`:** every path repeats, including the successful one.
- **Checking a numeric rule before conversion:** the program compares text with a number and may raise `TypeError`.
- **Treating every convertible value as usable:** type conversion proves type, not suitability.
- **Catching every exception:** a genuine bug is reported as if the person merely typed badly.
- **Giving no explanation:** the prompt repeats, but the person cannot tell what the program expects.

## 11. Reading the Documentation

The relevant built-in signatures can be read conceptually as:

```text
int(text) -> int
float(text) -> float
input(prompt) -> str
```

Ask the standard questions. What does each expect? What does it return? What can go wrong? The documentation for `int()` and `float()` explains accepted forms; experiments reveal the exact behavior for the text your boundary receives.

`try` and `except` are statements rather than functions, so they do not have call signatures. Read Python's tutorial section on handling exceptions and identify the part that matches a named exception type.

## 12. Debugging Checklist

- Print the exact incoming value and its `type()` before assuming what arrived.
- Identify whether failure occurs during conversion or during a later rule check.
- Read the exception from the bottom up.
- Trace every loop path: reject-and-repeat, accept-and-leave, and any explicit exit.
- Check that the handler names the expected exception rather than every exception.
- Repeat the same known input after changing one thing.

## 13. What This Pack Does Not Cover

- Text normalization methods or category systems.
- Regular expressions or validation libraries.
- Custom exceptions, `raise`, or advanced exception clauses.
- A universal validation helper or ready-made project function.
- Any finance, ledger, transaction, budget, or account design.

## 14. Where This Fits Your Project

Your program already has its own prompts and decisions. This pack gives you a way to reason about each prompt as a boundary: define what is usable, distinguish conversion from rule checking, explain rejection, and repeat when appropriate. You decide the rules and how the pattern fits your control flow.
