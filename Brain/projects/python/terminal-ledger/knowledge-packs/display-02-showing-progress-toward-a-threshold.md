---
title: "Display 02 — Showing Progress Toward a Threshold"
pack: "Display 02"
phase: "07"
estimated_time: "12–18 minutes"
prerequisites: "Starting Manual Section 03 (numeric types, operators), Section 05 (conditionals, comparisons), and Display 01 (terminal formatting)"
outcomes:
  - "Deconstruct threshold reasoning into observed value, limit, remaining amount, and ratio"
  - "Handle edge cases safely, including a limit of zero"
  - "Differentiate strictly between numeric calculation and visual presentation"
  - "Use string repetition to generate text-based visual bars of variable width"
  - "Apply clamping so visual indicators remain bounded when limits are exceeded"
---

## 1. Comparing Numbers at a Glance

When an application tracks a quantity against a limit, showing numbers alone is not always enough for quick human comprehension. Telling a user that they have used `78.4` out of `80.0` units conveys information, but understanding how close they are to the ceiling requires mental arithmetic.

A threshold indicator provides immediate context by answering three questions simultaneously:

1. What is the current value?
2. What is the limit or target?
3. How much room remains before the limit is crossed?

Communicating this state effectively requires two separate stages: first, computing the underlying mathematical relationship truthfully; second, rendering a clear, bounded visual presentation for the terminal.

## 2. The Arithmetic of Thresholds: An Unrelated Example

Consider an automated backup system that tracks storage drive usage in gigabytes. The system knows the number of gigabytes used and the maximum storage capacity allocated to the archive:

```python
used_gb = 45.0
capacity_gb = 60.0
```

From these two values, the application can derive two essential figures:

- **Remaining capacity:** `remaining = capacity_gb - used_gb` (here, `15.0` GB).
- **Utilization ratio:** `ratio = used_gb / capacity_gb` (here, `0.75`, or 75%).

Each figure answers a distinct operational question. The remaining capacity tells the user how much data can still be added before failure. The ratio expresses the proportion consumed regardless of the absolute scale.

## 3. The Zero Limit Edge Case: Guarding Against Division by Zero

In real applications, limits are often user-configurable or may temporarily be set to zero. If your program naively calculates the ratio with `used / limit`, a zero limit will immediately crash the runtime with a `ZeroDivisionError`:

```python
limit = 0.0
used = 12.0
# ratio = used / limit  <-- CRASH: ZeroDivisionError
```

Before dividing, your code must inspect the limit explicitly:

```python
if capacity_gb <= 0.0:
    # A zero or negative capacity has no valid ratio
    ratio = 0.0
    remaining = 0.0
else:
    remaining = capacity_gb - used_gb
    ratio = used_gb / capacity_gb
```

Deciding what a zero limit means is a product decision: Does a zero limit mean no capacity is available, or that no threshold has been set? Whatever the interpretation, the calculation must be guarded so arithmetic never halts the program.

## 4. Categorizing the State: Below, Equal, and Exceeded

A threshold separates possible states into three distinct mathematical regions:

```python
def describe_threshold_state(used, limit):
    if limit <= 0.0:
        return "NO_LIMIT"
    
    if used < limit:
        return "BELOW_LIMIT"
    elif used == limit:
        return "AT_LIMIT"
    else:
        return "OVER_LIMIT"
```

Notice the explicit use of numeric comparisons (`<`, `==`, `>`). Avoid relying on boolean truthiness when evaluating numbers, because `0.0` evaluates to `False` in Python truthiness checks despite being a legitimate numeric value.

## 5. String Repetition for Text Indicators

Python provides a built-in mechanism for repeating a sequence of characters using the multiplication operator (`*`):

```python
print("=" * 5)
# Output: =====

print("-" * 10)
# Output: ----------
```

Multiplying a string by an integer produces a new string containing that exact number of repetitions. Multiplying a string by zero or a negative integer produces an empty string (`""`):

```python
print("*" * 0)
# Output: (empty string)

print("*" * -3)
# Output: (empty string)
```

String repetition does not know anything about percentages, fractions, or terminal widths. It simply creates characters according to the integer count you supply.

## 6. Scaling a Ratio to a Fixed Bar Width

To construct a horizontal progress bar of a fixed visual width—say, 20 characters wide—your code converts the fractional ratio into an integer character count:

```python
bar_width = 20
fill_count = int(ratio * bar_width)
empty_count = bar_width - fill_count

bar = "#" * fill_count + "-" * empty_count
print(f"[{bar}]")
```

For `ratio = 0.75` and `bar_width = 20`:
- `int(0.75 * 20)` evaluates to `15`.
- `fill_count` is `15`, producing `15` hashes.
- `empty_count` is `5`, producing `5` dashes.
- The output displays: `[###############-----]`.

## 7. Clamping to Prevent Visual Distortion

What happens when usage exceeds the limit? For instance, if `used_gb = 90.0` and `capacity_gb = 60.0`, the ratio is `1.50` (150%).

If you compute `fill_count = int(1.50 * 20)`, `fill_count` becomes `30`. Not only does `empty_count` become negative (`20 - 30 = -10`, producing `""`), but the rendered bar becomes 30 characters wide, breaking column alignment and visually overflowing the user's interface.

To keep the visual bar honest and bounded, you **clamp** the visual ratio between a minimum of `0.0` and a maximum of `1.0`:

```python
# The underlying math preserves the true value
true_ratio = used_gb / capacity_gb  # 1.50

# The visual indicator is clamped for bounded display
clamped_ratio = true_ratio
if clamped_ratio < 0.0:
    clamped_ratio = 0.0
elif clamped_ratio > 1.0:
    clamped_ratio = 1.0

visual_fill = int(clamped_ratio * bar_width)
visual_empty = bar_width - visual_fill
bar_display = "#" * visual_fill + "-" * visual_empty
```

By clamping the visual fill while preserving the true calculation, the visual bar fills completely to indicate 100% capacity reached, while accompanying text displays the honest figures:

```text
[####################] 150.0% (90.0 / 60.0 GB) -- EXCEEDED BY 30.0 GB
```

## 8. Calculation Versus Presentation

Always maintain a strict separation between calculation and presentation:

- **Calculation:** Compute with full floating-point precision. Keep numbers as numbers (`45.0`, `60.0`, `15.0`). Do not round intermediate values until you are finished calculating.
- **Presentation:** Format the numbers for the reader. Convert ratios to percentage strings (such as `f"{true_ratio * 100:.1f}%"`), build text bars, and attach status messages.

When calculation is tangled with presentation, subtle errors creep in: a string with a `%` sign accidentally gets passed to arithmetic, or a visual clamp accidentally overwrites the true exceeded amount.

## 9. Boundary Experiments in Scratch Code

Before integrating progress displays into your project, verify how your logic behaves under extreme conditions in a scratch script:

```python
test_cases = [
    {"label": "Zero Usage", "used": 0.0, "limit": 100.0},
    {"label": "Halfway", "used": 50.0, "limit": 100.0},
    {"label": "Exact Limit", "used": 100.0, "limit": 100.0},
    {"label": "Over Limit", "used": 140.0, "limit": 100.0},
    {"label": "Zero Capacity", "used": 25.0, "limit": 0.0},
]

BAR_LENGTH = 15

for case in test_cases:
    used = case["used"]
    limit = case["limit"]
    
    if limit > 0:
        ratio = used / limit
        pct = ratio * 100.0
        # Clamp for visual bar only
        display_ratio = min(max(ratio, 0.0), 1.0)
        filled = int(display_ratio * BAR_LENGTH)
        empty = BAR_LENGTH - filled
        bar = "=" * filled + " " * empty
        status = f"[{bar}] {pct:5.1f}% ({used:.1f}/{limit:.1f})"
    else:
        bar = " " * BAR_LENGTH
        status = f"[{bar}]  N/A  ({used:.1f}/0.0 - No Limit)"
    
    print(f"{case['label']:14}: {status}")
```

Inspect the output carefully. Check that the bar does not stretch or break on any row, and that each boundary prints clear, non-crashing information.

## 10. Debugging Checklist

- Does your code explicitly check for zero or negative limits before dividing?
- Are intermediate calculations using raw numbers rather than formatted strings?
- Is visual fill count clamped so the bar cannot exceed its designated maximum length?
- Is string repetition given an integer count (`int(...)`) rather than a float?
- When the limit is exceeded, does the text report the actual excess rather than capping the numeric report?
- Are comparisons using explicit operators (`<`, `==`, `>`) instead of truthiness?

## 11. What This Pack Does Not Cover

- Graphical user interfaces, web widgets, or canvas drawing.
- ANSI terminal color codes, curses, or interactive terminal styling libraries.
- Gamified progress badges, rewards, or leveling systems.
- A mandated bar character, exact layout, or prescribed width for your application.
- Financial transactions, accounts, money balances, or expense tracking.

## 12. Where This Fits Your Project

Your program is learning to evaluate records against established boundaries. This pack gives you the arithmetic foundation to calculate remaining amounts, detect crossed thresholds, and display bounded visual indicators in plain text. You decide how your application presents its limits to the user.
