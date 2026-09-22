---
title: "Verification 01 — Writing Small Checks for Your Logic"
pack: "Verification 01"
phase: "07"
estimated_time: "12–18 minutes"
prerequisites: "Starting Manual Section 03 (arithmetic, functions), Section 05 (branching, equality), and Section 09 (debugging and evidence)"
outcomes:
  - "Identify why logic errors can run silently without crashing Python"
  - "Structure repeatable checks using the Arrange-Compute-Compare pattern"
  - "Compare expected versus actual outcomes using plain Python comparisons"
  - "Print informative diagnostic evidence when a check uncovers a discrepancy"
  - "Isolate calculation logic from interactive menus and input prompts"
---

## 1. Silent Logic Errors

In the early stages of learning programming, most errors announce themselves loudly. A misspelled variable name raises a `NameError`; dividing by zero raises a `ZeroDivisionError`; trying to open a missing file in read mode raises a `FileNotFoundError`. The program halts immediately and Python prints a traceback pinpointing the line that failed.

As programs grow to include business rules, thresholds, and multi-step arithmetic, a much more dangerous kind of defect appears: the **logic error**.

A logic error occurs when the code is syntactically valid and runs to completion without raising an exception, but produces an incorrect result. Python cannot know what your program was *supposed* to calculate. If you inadvertently subtract a discount instead of adding a fee, or write `<` where you meant `<=`, Python executes the instruction faithfully and silently outputs the wrong number.

Relying solely on manually typing input into an interactive terminal to spot logic bugs is slow, error-prone, and tiring. When you change one calculation, manually re-testing every combination of inputs is easily skipped. Repeatable check scripts solve this problem.

## 2. The Anatomy of a Repeatable Check

A repeatable check is a short, plain Python script that validates a piece of calculation logic against known answers. It does not require special testing libraries or complex configurations. It relies entirely on standard Python statements you already know: variables, function calls, `if` statements, and `print()`.

Every effective check follows a simple three-step rhythm:

1. **Arrange:** Set up known, predictable input values and state.
2. **Compute:** Pass those inputs to your calculation logic to get the actual result.
3. **Compare:** Evaluate the actual result against the known expected value. If they differ, print clear evidence showing where they diverged.

## 3. An Unrelated Example: Shipping Fee Calculation

Consider an order processing system that computes shipping fees based on parcel weight and delivery speed. The rules are:

- A standard package under 5.0 kilograms costs $5.00 base shipping.
- Each additional kilogram over 5.0 kg costs an extra $1.50 per kg.
- Selecting express delivery adds a flat $8.00 rush fee.
- If the calculated fee ever evaluates to less than $5.00, it defaults to the minimum fee of $5.00.

Here is an implementation of this calculation isolated inside a clean, standalone function:

```python
def calculate_shipping_fee(weight_kg, is_express):
    if weight_kg <= 0:
        return 0.0

    base_fee = 5.00
    extra_weight = weight_kg - 5.0
    
    if extra_weight > 0:
        weight_surcharge = extra_weight * 1.50
    else:
        weight_surcharge = 0.0

    total_fee = base_fee + weight_surcharge

    if is_express:
        total_fee = total_fee + 8.00

    return round(total_fee, 2)
```

Notice what makes this function checkable: it takes plain numbers and booleans as arguments, performs pure calculations, and returns a numeric result. It does not call `input()` and it does not call `print()`.

## 4. Writing the Check Script

To verify that `calculate_shipping_fee` actually obeys the rules, we write a separate, lightweight check script in a scratch file:

```python
def check_fee(description, weight, is_express, expected):
    actual = calculate_shipping_fee(weight, is_express)
    
    if actual == expected:
        print(f"PASS: {description}")
        return True
    else:
        print(f"FAIL: {description}")
        print(f"  Input:    weight={weight}, express={is_express}")
        print(f"  Expected: {expected}")
        print(f"  Actual:   {actual}")
        return False
```

Now we run several targeted scenarios covering the boundaries of the rules:

```python
print("Running shipping fee verification...")

cases = [
    ("Zero weight returns zero", 0.0, False, 0.0),
    ("Standard light parcel under 5kg", 3.0, False, 5.00),
    ("Standard exact boundary at 5kg", 5.0, False, 5.00),
    ("Standard overweight parcel (7kg -> 5 + 2*1.5)", 7.0, False, 8.00),
    ("Express light parcel under 5kg (5 + 8)", 2.0, True, 13.00),
    ("Express overweight parcel (6kg -> 5 + 1.5 + 8)", 6.0, True, 14.50),
]

passed = 0
failed = 0

for desc, weight, express, exp in cases:
    if check_fee(desc, weight, express, exp):
        passed += 1
    else:
        failed += 1

print(f"\nResults: {passed} passed, {failed} failed.")
```

When you run this script, it executes in a fraction of a second. If every rule holds, it prints a clean list of passes. If any calculation is off by even one cent, it displays the exact discrepancy immediately.

## 5. What a Failing Check Tells You

Suppose someone introduced a subtle bug into `calculate_shipping_fee`:

```python
# Subtle bug: using >= instead of >
if extra_weight >= 0:
    weight_surcharge = extra_weight * 1.50
```

At `weight_kg = 5.0`, `extra_weight` is `0.0`. `0.0 * 1.50` is `0.0`, so the fee at 5.0 kg happens to still pass.

Now suppose another change accidentally used `weight_kg` instead of `extra_weight`:

```python
# Bug: charging surcharge on total weight instead of extra weight
if extra_weight > 0:
    weight_surcharge = weight_kg * 1.50
```

When we run the check script, the terminal immediately exposes the defect:

```text
PASS: Zero weight returns zero
PASS: Standard light parcel under 5kg
PASS: Standard exact boundary at 5kg
FAIL: Standard overweight parcel (7kg -> 5 + 2*1.5)
  Input:    weight=7.0, express=False
  Expected: 8.00
  Actual:   15.50
...
Results: 5 passed, 1 failed.
```

The failure output provides instant diagnostic evidence:
- We know the exact test case that failed (`Standard overweight parcel`).
- We know the inputs (`weight=7.0, express=False`).
- We see the divergence: we expected `8.00`, but got `15.50`.

You do not have to guess what went wrong. You examine the math between input `7.0` and output `15.50` to locate the faulty line in seconds.

## 6. Separating Logic from User Interaction

A primary reason beginners struggle to write repeatable checks is that their calculation code is tangled up with `input()` calls:

```python
# Hard to check automatically:
def handle_shipping():
    w = float(input("Enter weight: "))
    e = input("Express? (y/n): ") == "y"
    # ... calculation mixed with input ...
    print(f"Fee: {fee}")
```

You cannot easily run automated checks against `handle_shipping()` because running the function pauses the terminal waiting for a human to type keystrokes.

The solution is simple: **separate the calculation from the interaction**:

1. A **pure calculation function** takes parameters, calculates, and returns a value.
2. An **interactive user-interface function** prompts the user, parses input, calls the pure calculation function, and prints the result.

By separating the two, your interactive program works exactly as before, but your calculation function becomes completely checkable by small verification scripts.

## 7. Plain Python Checks Are Not a Test Framework

You do not need to install or learn testing frameworks like `pytest` or `unittest` to benefit from repeatable checks. Plain Python scripts using basic comparison statements are completely sufficient for verifying logic in your programs.

Keep these check scripts focused and modest:
- Write checks for logic that involves boundaries, arithmetic, or conditional rules.
- Run them whenever you modify your calculation formulas.
- Store them in scratch files or auxiliary scripts so they do not clutter your main application code.
- They are recommended tools to give you confidence in your logic, not mandatory project architecture.

## 8. Debugging Checklist

- Does the calculation function run without calling `input()`?
- Are expected values calculated by hand using pencil and paper, rather than copying whatever the code currently outputs?
- Does the check print both the expected and actual values when they disagree?
- Did you check boundary values (such as zero, exact limit, and slightly above limit)?
- Are float comparisons handled with appropriate rounding (e.g. `round(val, 2)`) to prevent float drift mismatches?
- When a check fails, did you verify whether the bug is in the calculation logic or in the check's expected value?

## 9. What This Pack Does Not Cover

- Test runners, test discovery, or command-line test suites.
- Testing frameworks like `pytest` or `unittest`.
- Mocks, stubs, fixtures, spies, or test doubles.
- Code coverage metrics, assertions libraries, or CI/CD pipelines.
- Prescribed test file names, directory layouts, or test architectures.
- Ledger, transactions, account balances, or financial budget calculations.

## 10. Where This Fits Your Project

In this phase, your application introduces threshold arithmetic, ratios, and limit evaluations. These calculations introduce edge cases where code can quietly calculate the wrong remaining value without crashing. Writing a few small plain-Python checks for your calculation functions will give you immediate, repeatable proof that your rules hold true.
