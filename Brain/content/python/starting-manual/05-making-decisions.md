---
title: "Making Decisions"
section: "05"
estimated_time: "20–25 minutes"
prerequisites: "Section 04 — Input & Output"
outcomes:
  - "Understand how a condition evaluates to True or False to govern execution"
  - "Use comparison operators (==, !=, >, <, >=, <=) to test values"
  - "Distinguish assignment (=) from equality comparison (==)"
  - "Construct single-branch (if), two-branch (if/else), and multi-branch (if/elif/else) decision chains"
  - "Apply Python's indentation rules to define conditional code blocks"
  - "Combine conditions using boolean operators: and, or, not"
  - "Predict execution paths through sequential if/elif/else chains"
---

## 1. The Limitation of Straight-Line Code

So far, the successful programs you have written have mostly followed one straight-line path. They execute statements in sequence, but they have not intentionally chosen different paths based on a condition.

Using what you learned in Section 04, you can write a script that accepts input and displays a message:

```python
reading = int(input("Enter reading: "))
print("Reading processed.")
```

Whether the user enters `25` or `0`, this program prints `"Reading processed."` every time. It can accept data, store it in variables, and print results, but it cannot make a decision based on what it received.

To build useful software, a program must be able to inspect its current state and choose which instructions should execute:

* Is a temperature above a limit?
* Did two values match?
* Has a threshold been reached?
* Which of several categories applies?

This chapter introduces the first major departure from straight-line execution: **conditional branching**.

---

## 2. Conditions Produce Boolean Values

In Section 03, you learned about Python's four basic built-in types: `str`, `int`, `float`, and `bool`.

A `bool` represents one of exactly two states: `True` or `False`.

A **condition** is an expression that Python evaluates to produce a boolean value. Comparing values against one another creates conditions:

```python
print(18 >= 18)
print(5 > 10)
print("python" == "python")
print(7 != 3)
```

Run this file in your terminal:

```terminal
$ python3 comparisons.py
True
False
True
True
```

Notice what happened:

* `18 >= 18`: 18 is greater than or equal to 18, producing `True`.
* `5 > 10`: 5 is not greater than 10, producing `False`.
* `"python" == "python"`: The two text strings contain identical characters, producing `True`.
* `7 != 3`: 7 is not equal to 3, producing `True`.

A comparison evaluates the relationship between values and produces a boolean result (`True` or `False`). That result allows your code to make a decision.

---

## 3. Comparison Operators

Python provides six standard operators for comparing values:

| Operator | Meaning | Example | Evaluates To |
| :---: | :--- | :---: | :---: |
| `==` | Equal to | `10 == 10` | `True` |
| `!=` | Not equal to | `10 != 5` | `True` |
| `>` | Greater than | `15 > 20` | `False` |
| `<` | Less than | `8 < 12` | `True` |
| `>=` | Greater than or equal to | `18 >= 18` | `True` |
| `<=` | Less than or equal to | `9 <= 4` | `False` |

### Critical Distinction: `=` vs. `==`

One of the most frequent errors beginners make is confusing single equals (`=`) with double equals (`==`):

* **`=` is assignment:** It associates a name with a value (`score = 10`). It sets state.
* **`==` is equality comparison:** It checks whether two values are equal (`score == 10`). It checks state and produces `True` or `False`.

```python
score = 10            # Assignment: associates the name score with 10
print(score == 10)    # Comparison: checks if score equals 10 (prints True)
print(score == 25)    # Comparison: checks if score equals 25 (prints False)
```

Remember: **single equals sets, double equals checks.**

---

## 4. The First Decision: `if`

The most fundamental decision statement in Python is the `if` statement. It tells Python: *"Evaluate this condition. If `True`, run the indented instructions; if `False`, skip them."*

Here is a minimal example:

```python
threshold = 20
reading = 25

if reading >= threshold:
    print("Threshold reached.")

print("Check complete.")
```

Look closely at line 4:

1. **`if`:** The keyword beginning a conditional decision.
2. **`reading >= threshold`:** The **condition**, which evaluates to `True` or `False`.
3. **`:` (colon):** Marks the end of the condition and signals that an indented block follows.
4. **`    print("Threshold reached.")`:** The **indented block**, which runs *only* if the condition evaluates to `True`.

Run the program:

```terminal
$ python3 threshold.py
Threshold reached.
Check complete.
```

Change line 2 so that `reading = 15`. Save and run it again:

```terminal
$ python3 threshold.py
Check complete.
```

Because `15 >= 20` evaluates to `False`, Python skipped the indented statement. Execution resumed at line 7 with `print("Check complete.")`.

---

## 5. Indentation is Syntax

In many languages, code blocks are wrapped in curly braces (`{}`). In Python, **indentation defines block membership**.

Indentation is part of Python's formal grammar:

```python
temperature = 8

if temperature < 10:
    print("It is cold outside.")
    print("Wear a jacket.")

print("Have a nice day.")
```

Notice the structure:

* Lines 4 and 5 are indented by four spaces. They belong to the `if` block. Both execute if `temperature < 10` is `True`, and both are skipped if it is `False`.
* Line 7 is not indented. It sits outside the `if` block and runs on every execution.

The standard Python convention is to indent blocks using **four spaces**. Many code editors can insert this indentation automatically after a colon or when you press <kbd>Tab</kbd>, depending on the editor's settings.

---

## 6. Providing an Alternative: `else`

Frequently, a program needs to choose between two mutually exclusive actions: do one thing if a condition is `True`, and an alternative if it is `False`.

You provide that alternative using `else`:

```python
temperature = int(input("Enter temperature: "))

if temperature < 10:
    print("Advisory: Cold")
else:
    print("Advisory: Not cold")

print("Check complete.")
```

Notice three characteristics of `else`:

1. `else` is followed immediately by a colon (`:`). It has **no condition of its own**.
2. In a simple `if`/`else` pair, the `else` block executes only when the preceding `if` condition evaluates to `False`.
3. Exactly one of the two indented blocks will execute. They cannot both run, and they cannot both be skipped.

Run the file with `temperature = 8`:

```terminal
$ python3 advisory.py
Enter temperature: 8
Advisory: Cold
Check complete.
```

Run it again with `temperature = 15`:

```terminal
$ python3 advisory.py
Enter temperature: 15
Advisory: Not cold
Check complete.
```

---

## 7. Multiple Paths: `elif`

A single `if`/`else` gives you two branches. When you want to express additional alternatives directly, Python provides `elif` (short for *else if*).

Consider classifying a temperature reading into three categories:

```python
temperature = 24

if temperature >= 30:
    print("Hot")
elif temperature >= 20:
    print("Mild")
else:
    print("Cool")
```

Output:

```terminal
$ python3 climate.py
Mild
```

### The Top-to-Bottom Evaluation Rule

Understanding how Python evaluates an `if`/`elif`/`else` chain is critical:

1. Python evaluates the first condition (`temperature >= 30`).
2. If `True`, its block runs, and Python **skips the rest of the entire chain**.
3. If `False`, Python moves to the next branch (`elif temperature >= 20`) and evaluates it.
4. If `True`, its block runs, and the rest of the chain is skipped.
5. If none of the preceding conditions matched, the `else` block runs as the default fallback.

Because Python stops at the first matching branch, **the order of conditions matters**.

Consider this broken grading script:

```python
score = 95

if score >= 50:
    print("Pass")
elif score >= 90:
    print("Excellent")
```

When `score = 95`, `95 >= 50` is `True`. Python prints `"Pass"` and exits the chain. The `elif score >= 90` branch is **never reached**.

When arranging an `elif` chain that tests numeric ranges, order conditions from most restrictive to least restrictive:

```python
score = 95

if score >= 90:
    print("Excellent")
elif score >= 50:
    print("Pass")
else:
    print("Needs Improvement")
```

---

## 8. Combining Conditions: `and`, `or`, `not`

Often, a decision depends on multiple factors. Python provides three boolean operators to combine or invert comparisons: `and`, `or`, and `not`.

When combining the boolean conditions used in this chapter:

* **`and`:** Both conditions must be `True` for the combined condition to be `True`.
* **`or`:** At least one condition must be `True` for the combined condition to be `True`.
* **`not`:** Reverses `True` and `False`.

### 1. The `and` Operator

Both conditions must be `True`:

```python
level = 5
has_key = True

if level >= 3 and has_key:
    print("Access permitted.")
else:
    print("Access denied.")
```

### 2. The `or` Operator

At least one condition must be `True`:

```python
is_weekend = False
is_holiday = True

if is_weekend or is_holiday:
    print("The office is closed.")
else:
    print("The office is open.")
```

### 3. The `not` Operator

`not` inverts a boolean value:

```python
is_raining = False

if not is_raining:
    print("No umbrella needed.")
```

### Grouping with Parentheses

When combining comparisons with boolean operators, use parentheses `()` to make the grouping of a compound condition explicit:

```python
level = 5
has_key = True
has_backup_key = False

if (level >= 3) and (has_key or has_backup_key):
    print("Access permitted.")
```

Parentheses make the grouping of conditions unambiguous, improving readability.

---

## 9. Controlled Failure: Assigning Inside a Condition

The most common mistake when learning decisions is typing a single equals sign (`=`) inside an `if` statement when an equality comparison (`==`) was intended.

Create `assign_error.py`:

```python
score = 10

if score = 10:
    print("Target reached.")
```

Run this file from your terminal:

```terminal
$ python3 assign_error.py
```

Python halts before executing line 1 with a `SyntaxError`:

```text
  File "assign_error.py", line 3
    if score = 10:
       ^^^^^^^^^^
SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?
```

### Reading the Error

Look directly at the message:

* **`SyntaxError: invalid syntax`:** Python refused to run the code because it violates the grammar of the language.
* **`Maybe you meant '==' or ':=' instead of '='?`:** The error message mentions `:=`, an operator you do not need yet. The useful part here is the suggestion to use `==` when you intend to compare values.

In Python:

* `=` performs assignment. It is not valid in this position for the comparison you are trying to write.
* `==` compares values and evaluates to `True` or `False`.

Fix the error by replacing `=` with `==`:

```python
score = 10

if score == 10:
    print("Target reached.")
```

Run the file again. Python evaluates `score == 10` to `True` and displays `"Target reached."` cleanly.

---

## 10. Hands-on Experiments

Reinforce conditional execution with these three empirical experiments.

For each experiment: predict the exact output, save and run the file, and observe whether your prediction matches.

### Experiment 1: Inspecting Comparison Results

Create `exp1.py`:

```python
target = 15

print(target == 15)
print(target != 15)
print(target > 10)
print(target <= 12)
```

* **Predict:** What boolean value (`True` or `False`) will print on each line?
* **Run:** Execute `python3 exp1.py`.
* **Explain:** Each comparison evaluates independently to a boolean. The first and third comparisons evaluate to `True`; the second and fourth evaluate to `False`.

### Experiment 2: Tracing the `if`/`else` Boundary

Create `exp2.py`:

```python
temperature = 10

if temperature < 10:
    print("Cold")
else:
    print("Not cold")
```

* **Predict:** Look at the comparison `temperature < 10`. Because `10 < 10` is `False`, which branch executes?
* **Run:** Execute `python3 exp2.py`.
* **Explain:** `10` is not strictly less than `10`. The condition evaluates to `False`, triggering the `else` block to print `"Not cold"`. Boundary conditions require precision: `<` and `<=` behave differently at exact threshold values.

### Experiment 3: Reordering `elif` Conditions

Create `exp3.py`:

```python
points = 85

if points >= 90:
    print("Tier 1")
elif points >= 75:
    print("Tier 2")
elif points >= 60:
    print("Tier 3")
else:
    print("Standard")
```

* **Predict:** Which branch will run when `points = 85`?
* **Run:** Execute `python3 exp3.py`.
* **Explain:** Line 3 (`85 >= 90`) is `False`. Line 5 (`85 >= 75`) is `True`. Python prints `"Tier 2"` and skips the rest of the chain without evaluating subsequent branches.

---

## 11. Independent Application: Temperature Advisory

Put your understanding of input, conversion, comparison operators, and branching logic into practice by writing a decision-making script from scratch.

### The Objective

Create a script named `advisory.py` that asks the user for the current temperature in degrees Celsius and prints a clear weather advisory based on that reading.

### Requirements

1. Create a new file named `advisory.py` in your working directory.
2. Prompt the user for the current temperature using `input("Enter current temperature in Celsius: ")`.
3. Convert the input value to a number (`float` or `int`).
4. Using an `if`/`elif`/`else` chain, classify the temperature into four distinct categories:
   * **30 or higher:** Print `"Advisory: Hot. Stay hydrated."`
   * **18 or higher, but below 30:** Print `"Advisory: Comfortable. Ideal conditions."`
   * **5 or higher, but below 18:** Print `"Advisory: Cool. A light jacket is recommended."`
   * **Below 5:** Print `"Advisory: Cold. Heavy coat recommended."`
5. Save the file and run it several times with different temperatures (e.g., `32.5`, `22`, `10.5`, `-2`) to verify that each branch executes as expected.

### Socratic Self-Check

Once your program runs:

* What happens if you enter `18` or `18.0`? Which branch executes?
* Why is it unnecessary to check `temperature < 30` inside the second branch if `temperature >= 30` was already checked on the first line?
* What happens if the user enters the text `"warm"` instead of a number? What error occurs, and on which line?

---

## 12. Common Mental Traps

Before moving forward, review common beginner mistakes when writing conditional logic:

1. **Confusing `=` and `==`:** Using `=` inside an `if` statement attempts an assignment, causing a `SyntaxError`. Use `==` to check equality.
2. **Forgetting Indentation:** Python requires instructions inside conditional blocks to be indented. Omitting indentation produces an `IndentationError`.
3. **Expecting Multiple Branches to Run:** In an `if`/`elif`/`else` chain, only **one** branch ever executes. Once a condition evaluates to `True`, Python runs that block and exits the chain.
4. **Incorrect Branch Ordering:** Placing a general condition before a specific condition (e.g., `score >= 50` before `score >= 90`) prevents the specific condition from ever being reached.
5. **Comparing Unconverted Strings:** Comparing text input directly to numbers (e.g., `"18" >= 18`) produces a `TypeError`. When the input represents a number and you intend to perform a numeric comparison, convert the text using an appropriate numeric conversion first.

---

## 13. What You Understand Now and What is Missing

You have now broken free from straight-line execution:

* **Conditions produce booleans:** Comparisons (`==`, `!=`, `<`, `>`, `<=`, `>=`) evaluate to `True` or `False`.
* **Branching directs execution:** `if` executes code conditionally; `else` provides an alternative; `elif` tests additional conditions in order.
* **Indentation defines blocks:** Indented code belongs to the preceding statement.
* **Boolean logic combines rules:** `and`, `or`, and `not` allow you to evaluate compound conditions.

### The Next Limitation: Managing Many Values

Consider writing a program that registers attendees for an event, tracks temperatures across seven days of the week, or manages test scores for thirty students.

Using what you know right now, you would need thirty separate variables:

```python
score1 = 88
score2 = 92
score3 = 79
# ... up to score30
```

Writing a separate variable for every related value becomes tedious, fragile, and impractical.

Programs need a way to store multiple related items together in a single collection.

Next: **Section 06 — Working with Collections**
