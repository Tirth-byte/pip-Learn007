---
title: "Repeating Work"
section: "07"
estimated_time: "20–25 minutes"
prerequisites: "Section 06 — Working With Collections"
outcomes:
  - "Explain why loops are necessary to scale repeated operations"
  - "Construct a for loop to process each element of a list"
  - "Trace how a loop variable receives values sequentially"
  - "Use range(stop) for counted repetitions"
  - "Construct a while loop governed by a dynamic boolean condition"
  - "Maintain loop state so a while loop reaches its termination condition"
  - "Identify, explain, and safely interrupt an unintended infinite loop"
  - "Apply break to exit a loop early upon finding a target"
  - "Apply continue to skip the remainder of an iteration"
  - "Choose appropriately between for and while loops based on problem structure"
---

## 1. The Limitation of Manual Repetition

In Section 06, you learned how to organize related values into collections:

```python
scores = [88, 92, 79, 95]
```

A list stores many items under a single variable name, but displaying or processing each score manually requires duplicated statements:

```python
print(scores[0])
print(scores[1])
print(scores[2])
print(scores[3])
```

This manual approach breaks down as programs grow:

* **It does not scale:** Five hundred scores would require five hundred manual statements.
* **It cannot adapt:** If the list changes length, hardcoded index statements either miss items or cause an `IndexError`.
* **It obscures intent:** The goal is one operation applied across every item, not four separate commands.

A program needs a way to execute an instruction repeatedly:

* **One instruction once** $\rightarrow$ normal statement
* **Same instruction repeatedly** $\rightarrow$ loop

A **loop** is a control structure that executes a block of code multiple times. Python provides two primary loop constructs:

1. **`for` loop:** Repeats across a sequence of values (such as elements in a list or numbers from `range()`).
2. **`while` loop:** Repeats as long as a condition remains `True`.

---

## 2. Your First for Loop

A `for` loop can take values from a sequence such as a list, executing an indented block once for each value:

```python
scores = [88, 92, 79, 95]

for score in scores:
    print(score)
```

In this construct:
* `scores` is the collection.
* `for` and `in` are Python keywords establishing the loop.
* `score` is the loop variable name chosen by the programmer.
* The indented statement `print(score)` is the loop body.

Create `scores_loop.py`:

```python
scores = [88, 92, 79, 95]

for score in scores:
    print(score)
```

Run the script:

```terminal
$ python3 scores_loop.py
88
92
79
95
```

### The Value Mental Model

The loop variable receives the **value** of each element, not its numeric index:

* Iteration 1: `score` is `88` $\rightarrow$ `print(88)` runs.
* Iteration 2: `score` is `92` $\rightarrow$ `print(92)` runs.
* Iteration 3: `score` is `79` $\rightarrow$ `print(79)` runs.
* Iteration 4: `score` is `95` $\rightarrow$ `print(95)` runs.

When no elements remain, the loop terminates automatically.

---

## 3. Tracing Execution Explicitly

Each pass through the loop body is called an **iteration**.

Consider this loop greeting attendees:

```python
names = ["Maya", "Noah", "Iris"]

for name in names:
    print("Hello", name)
```

Trace Python's execution step by step:

1. `name` is `"Maya"` $\rightarrow$ executes `print("Hello", "Maya")` $\rightarrow$ prints `Hello Maya`.
2. `name` is `"Noah"` $\rightarrow$ executes `print("Hello", "Noah")` $\rightarrow$ prints `Hello Noah`.
3. `name` is `"Iris"` $\rightarrow$ executes `print("Hello", "Iris")` $\rightarrow$ prints `Hello Iris`.
4. No elements remain $\rightarrow$ loop terminates.

Run `greet_names.py`:

```terminal
$ python3 greet_names.py
Hello Maya
Hello Noah
Hello Iris
```

Python retrieves one item per iteration until the collection is exhausted.

---

## 4. Indentation in Loops

Indentation defines which instructions belong to the loop body:

```python
items = ["alpha", "beta"]

for item in items:
    print("Item:", item)
    print("Processing...")

print("Finished all items.")
```

* Indented statements run on **every iteration**.
* Unindented statements run **once**, after the loop finishes.

Run `loop_scope.py`:

```terminal
$ python3 loop_scope.py
Item: alpha
Processing...
Item: beta
Processing...
Finished all items.
```

---

## 5. Using Decisions Inside a Loop

Because the loop body can contain any valid statement, an `if` decision inside a loop can evaluate each item individually:

```python
temperatures = [12, 31, 18, 5]

for temperature in temperatures:
    if temperature >= 30:
        print("Hot")
    else:
        print("Not hot")
```

On each repetition:
1. `temperature` receives the next number.
2. The `if` / `else` block evaluates that value and prints the corresponding message.

Run `temp_check.py`:

```terminal
$ python3 temp_check.py
Not hot
Hot
Not hot
Not hot
```

This pattern brings three foundational concepts together:
* **Collection:** Groups related data.
* **Loop:** Visits each item in sequence.
* **Condition:** Evaluates each item and branches.

---

## 6. Counted Repetition With range()

When you want to repeat an action a specific number of times without an existing list, use `range()`.

When given an integer `stop`, `range(stop)` provides a sequence of integers starting at `0` and stopping before `stop`:

```python
for number in range(5):
    print(number)
```

Run `range_demo.py`:

```terminal
$ python3 range_demo.py
0
1
2
3
4
```

### The Rule of range(stop)

`range(stop)` follows two rules:
1. It starts at **`0`**.
2. It stops **before** the argument: it includes `4`, but **not `5`**.

`range(5)` provides five values: `0, 1, 2, 3, 4`. For the positive `stop` values used in this section, the final value produced is `stop - 1`.

---

## 7. Understanding What range() Provides

`for count in range(3):` provides concrete numbers to the loop variable:

```python
for count in range(3):
    print("Run", count)
```

Run `counted_runs.py`:

```terminal
$ python3 counted_runs.py
Run 0
Run 1
Run 2
```

The loop executes three times because `range(3)` supplies three values: `0`, `1`, and `2`. On each pass, `count` holds the current value from that sequence.

---

## 8. Your First while Loop

A `for` loop works when repetition follows a known sequence. But some repetition must continue **as long as a condition remains true**, regardless of how many cycles that takes.

For this, Python provides the `while` loop:

```python
count = 1

while count <= 3:
    print(count)
    count = count + 1
```

A `while` loop has three core parts:
1. **Initial state:** `count = 1` sets up the variable tested by the condition.
2. **Condition:** `count <= 3` is checked before each repetition.
3. **State update:** `count = count + 1` modifies the variable so the condition can eventually change.

Create `while_count.py`:

```python
count = 1

while count <= 3:
    print(count)
    count = count + 1

print("Loop finished.")
```

Run the script:

```terminal
$ python3 while_count.py
1
2
3
Loop finished.
```

### Tracing the while Loop

Trace the execution:
1. `count` is `1` (`True`): prints `1`, updates `count` to `2`.
2. `count` is `2` (`True`): prints `2`, updates `count` to `3`.
3. `count` is `3` (`True`): prints `3`, updates `count` to `4`.
4. `count` is `4` (`False`): loop terminates.
5. Prints `"Loop finished."`.

Before every iteration, Python evaluates the condition. When `True`, the body executes. When `False`, Python skips the body.

---

## 9. The Exit Condition

In the counter-style `while` loops used here, the state tested by the condition must change if you expect that condition eventually to become `False`.

Consider what happens if the update line is omitted:

```python
count = 1

while count <= 3:
    print(count)
```

Because `count` never changes, `count <= 3` remains `True` on every check. The loop runs forever.

This is an **infinite loop**.

---

## 10. Controlled Failure: The Infinite Loop

An infinite loop is syntactically valid; Python simply executes the instructions repeatedly.

Create `infinite_demo.py`:

```python
count = 1

while count <= 3:
    print("Current count:", count)
```

> **Important — How to interrupt a running program:**  
> Press **`Ctrl+C`** in your terminal window to send an interrupt signal and halt Python immediately.

Run the script, observe several lines of output, and press **`Ctrl+C`**:

```terminal
$ python3 infinite_demo.py
Current count: 1
Current count: 1
Current count: 1
^CTraceback (most recent call last):
  File "infinite_demo.py", line 4, in <module>
    print("Current count:", count)
KeyboardInterrupt
```

### Diagnosing the Problem

When interrupted, Python raises `KeyboardInterrupt`.

The bug is not that `while` is broken. The bug is that **the state required to reach the exit condition was never updated**.

Whenever a `while` loop fails to stop, locate the statement that should move variables toward the exit condition.

---

## 11. Early Exit With break

Normally, a loop runs until its collection is exhausted or its condition becomes `False`. When an iteration discovers that the goal is met and further looping is unnecessary, `break` exits the loop immediately:

```python
numbers = [4, 7, 12, 3]

for number in numbers:
    if number == 12:
        print("Found target.")
        break
```

In this loop:
* The loop inspects `4`, then `7`.
* On the third iteration, `number` is `12`.
* `number == 12` is `True` $\rightarrow$ prints `"Found target."` and executes `break`.
* The loop terminates immediately. The remaining element (`3`) is never processed.

Run `find_target.py`:

```terminal
$ python3 find_target.py
Found target.
```

Use `break` when finding a target value makes further repetition unnecessary.

---

## 12. Skipping Iterations With continue

While `break` stops the entire loop, `continue` skips only the rest of the **current iteration** and advances directly to the next one:

```python
numbers = [3, -1, 5, -2, 8]

for number in numbers:
    if number < 0:
        continue

    print(number)
```

Trace the behavior:
* `3`: `3 < 0` is `False` $\rightarrow$ prints `3`.
* `-1`: `-1 < 0` is `True` $\rightarrow$ `continue` skips `print(number)`.
* `5`: `5 < 0` is `False` $\rightarrow$ prints `5`.
* `-2`: `-2 < 0` is `True` $\rightarrow$ `continue` skips `print(number)`.
* `8`: `8 < 0` is `False` $\rightarrow$ prints `8`.

Run `filter_demo.py`:

```terminal
$ python3 filter_demo.py
3
5
8
```

### The Central Distinction

Keep the behavior of these two control statements clear:
* **`break`:** Terminates the loop entirely.
* **`continue`:** Skips the rest of the current iteration and begins the next.

---

## 13. for or while?

Use these heuristics to choose between loop types:

| Consideration | `for` Loop | `while` Loop |
| :--- | :--- | :--- |
| **Guiding question** | *"Do this for each value in a sequence."* | *"Keep doing this while a condition is true."* |
| **Repetition count** | Determined by collection or `range()`. | Determined dynamically at runtime. |
| **State management** | Advances automatically to each value. | Often requires explicit updates to the state used by the condition. |
| **Typical scenarios** | Inspecting list items, counted runs. | Waiting for a threshold or state change. |

### Rules of Thumb

* **Use a `for` loop when:**
  * You have a collection (such as scores or names) and want to inspect each item.
  * You need to repeat an action a fixed number of times using `range()`.

* **Use a `while` loop when:**
  * You do not know how many repetitions will be required in advance.
  * Repetition depends on a changing condition.

When repetition naturally follows a collection or fixed count, a `for` loop is often clearer and avoids the exit-condition management required by the `while` examples in this section.

---

## 14. Experiments

Reinforce your understanding by predicting outcomes before executing each script.

### Experiment 1 — for Over a List

Create `exp1_for_list.py`:

```python
values = [2, 4, 6]

for value in values:
    print(value)
```

1. **Predict:** Exactly how many times will the loop body execute? What values will be printed?
2. **Run:** Execute `python3 exp1_for_list.py`.
3. **Observe:**
   ```text
   2
   4
   6
   ```
4. **Explain:**
   * `values` contains three elements, so the loop executes three times.
   * On each iteration, `value` holds the element itself (`2`, `4`, `6`), not an index.

---

### Experiment 2 — Counting With range()

Create `exp2_range.py`:

```python
for number in range(4):
    print(number)
```

1. **Predict:** What numbers will appear in the output? Will `4` be printed?
2. **Run:** Execute `python3 exp2_range.py`.
3. **Observe:**
   ```text
   0
   1
   2
   3
   ```
4. **Explain:**
   * `range(4)` generates integer values starting at `0` and stopping before `4`.
   * The value `4` is never printed because `range(stop)` stops before reaching `stop`.

---

### Experiment 3 — while State Change

Create `exp3_while_state.py`:

```python
count = 0

while count < 3:
    print(count)
    count = count + 1
```

1. **Predict:** What values will be printed? What will `count` equal when the loop terminates?
2. **Run:** Execute `python3 exp3_while_state.py`.
3. **Observe:**
   ```text
   0
   1
   2
   ```
4. **Explain:**
   * Passes: `count` is `0` (prints `0`), `1` (prints `1`), `2` (prints `2`).
   * When `count` reaches `3`, `3 < 3` evaluates to `False`. The loop stops.
   * The final value of `count` is `3`, though `3` was not printed inside the loop.

---

## 15. Independent Application: Reading Analyzer

Build a script that inspects a list of readings and performs counted operations.

Create `reading_analyzer.py`. Write a program from scratch that meets these requirements:

### Requirements

1. **Store readings in a list:**
   * Define a list named `readings` containing: `[12, 28, 35, 7, 31]`.

2. **Process readings with a `for` loop:**
   * Use a `for` loop to inspect each reading in `readings`.
   * Print the current reading value.
   * Include an `if` / `else` decision inside the loop:
     * If the reading is greater than or equal to `30`, print `"Status: High"`.
     * Otherwise, print `"Status: Normal"`.

3. **Counted repetition with `range()`:**
   * After the readings loop finishes, write a separate `for` loop using `range(3)`.
   * Inside this loop, print a message indicating a diagnostic check (such as `"Running check..."`).

4. **Construct a controlled `while` loop:**
   * Initialize a variable named `counter` with `1`.
   * Write a `while` loop that runs as long as `counter <= 3`.
   * Inside the loop, print the value of `counter`.
   * Update `counter` so the loop terminates after three repetitions.

### Optional Extension

Choose one modification to enhance your script:
* **Option A (`continue`):** In the readings loop, if a reading is below `10`, use `continue` to skip the status check and advance to the next reading.
* **Option B (`break`):** In the readings loop, if a reading exceeds `34`, print `"Threshold reached"` and use `break` to stop inspecting further readings.

Construct each statement directly using only the concepts learned so far.

---

## 16. Common Mental Traps

Review these frequent beginner mistakes:

1. **Confusing loop variables with indexes:** In `for score in scores:`, `score` is the value stored in the list, not an integer index (`0, 1, 2`).
2. **Forgetting indentation:** Code intended to repeat must be indented under the loop header. Unindented code runs once after the loop finishes.
3. **Expecting `range(stop)` to include `stop`:** `range(5)` generates `0, 1, 2, 3, 4`. It never reaches `5`.
4. **Omitting the update in a `while` loop:** In the counter-style `while` loops used here, forgetting to update the value used by the condition can leave that condition `True` indefinitely.
5. **Confusing `break` and `continue`:** `break` halts the entire loop immediately; `continue` skips only the rest of the current iteration.
6. **Thinking of loops as unbounded:** A loop is a controlled repetition governed by a collection, range, or condition.

---

## 17. What You Understand Now and What Is Missing

You have expanded how your programs execute instructions:

* **`for` loops process sequences:** You can iterate over lists item by item and perform counted repetitions using `range(stop)`.
* **`while` loops repeat conditionally:** You can repeat a block while a condition remains `True` and update the relevant state so the loop can reach its exit condition.
* **Flow control statements refine execution:** `break` exits a loop early upon finding a target, while `continue` skips irrelevant passes.

### The Next Limitation: Reusable Logic

Now consider what happens when a program needs the same multi-step routine (such as inspecting a reading, evaluating a threshold, and printing a summary) at several different points in code.

Currently, you would have to duplicate that block of code each time. Copying logic creates maintenance problems: fixing a bug requires editing every copy, and the program becomes difficult to navigate.

Programs need a way to package a reusable block of instructions under a single name and execute it whenever needed.

That mechanism is the **function**.

Next: **Section 08 — Functions (Reusability & Flow)**
