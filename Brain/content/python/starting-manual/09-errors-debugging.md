---
title: "Errors & Debugging"
section: "09"
estimated_time: "25–30 minutes"
prerequisites: "Section 08 — Functions"
outcomes:
  - "Read a Python traceback from the bottom upward"
  - "Identify the exception type, error message, and failing line in a crash report"
  - "Distinguish between syntax, runtime, and logic errors"
  - "Apply a systematic 7-step debugging protocol to diagnose and fix failures"
  - "Use `print()` and `type()` to gather empirical evidence about variables"
  - "Isolate fixes by changing only one thing at a time"
  - "Handle expected input failures deliberately using `try` and `except`"
---

## 1. The Reality of Failure

As programs gain more moving parts—variables, inputs, decisions, loops, and functions—mistakes become harder to locate by guessing. Debugging is the process of using evidence to find where actual behavior differs from expected behavior.

Create `checkout.py` and run it:

```python
price = input("Price: ")
quantity = 3
total = price + quantity
print(total)
```

If you enter `12` at the prompt, the program raises an exception:

```terminal
$ python3 checkout.py
Price: 12
Traceback (most recent call last):
  File "checkout.py", line 3, in <module>
    total = price + quantity
            ~~~~~~^~~~~~~~~~
TypeError: can only concatenate str (not "int") to str
```

The error message is evidence produced when Python could not continue that operation. 

---

## 2. What a Traceback Gives You

When Python encounters a problem, it prints a **traceback**. A traceback reports where an exception occurred and provides information about the failure.

For the simple tracebacks in this manual, begin with the final line. It usually gives you the exception type and message. Then move upward to the line in your code associated with the failure.

### The Anatomy of the Error

Look at the final lines of the crash report:

1. **Exception Type:** The very last line starts with a word like `TypeError`, `ValueError`, `NameError`, or `SyntaxError`. This tells you the broad category of the problem. Here, it is a `TypeError`.
2. **Error Message:** Following the colon on that same line is the specific complaint: `can only concatenate str (not "int") to str`. This gives you more specific information about the failure.
3. **Failing Line:** Moving upward, Python shows you the exact file (`checkout.py`), the line number (`line 3`), and the actual code that triggered the halt (`total = price + quantity`).

Python is stating clearly: on line 3, you attempted an operation that mixes incompatible types (strings and integers) in a way it does not understand.

---

## 3. The 7-Step Debugging Protocol

Guessing a fix and hoping it works is frustrating and creates new bugs. Instead, apply this exact 7-step protocol every time a program fails.

Let's apply it to our `checkout.py` failure:

**1. Read the error.**
We see `TypeError: can only concatenate str (not "int") to str`.

**2. Identify the failing line.**
The traceback points to line 3: `total = price + quantity`.

**3. Understand what Python expected versus what it received.**
The `+` operation was attempted with a string and an integer. Those operand types do not support this `+` operation together. The message reveals it received one string (`str`) and one integer (`int`).

**4. Inspect the relevant values and types.**
Before changing anything, prove your assumptions. Insert inspection code just before the crash:

```python
price = input("Price: ")
quantity = 3

print("EVIDENCE - price type:", type(price))
print("EVIDENCE - quantity type:", type(quantity))

total = price + quantity
```

Running this proves that `price` is a string. `input()` always returns a string, even if the user types digits.

**5. Consult documentation when needed.**
If you were unsure how to convert a string to an integer, you would consult Python documentation or your previous manual sections. We know the `int()` function does this.

**6. Change ONE thing.**
Do not rewrite the whole program. Apply the single necessary fix:

```python
price = int(input("Price: "))
quantity = 3
total = price + quantity
print(total)
```

**7. Rerun.**
Run the script again. Entering `12` now cleanly outputs `15`. 

By following this protocol, debugging becomes empirical. You make changes based on evidence, not random guesses.

---

## 4. Syntax vs. Runtime vs. Logic

Not all problems behave the same way. When investigating a bug, recognize which of these three categories you are facing.

### Syntax Problems
Python cannot even interpret the code structure to begin execution.

```python
print("Hello"
```
The program will immediately fail with a `SyntaxError: '(' was never closed` because it is missing a closing parenthesis. Python cannot successfully interpret the program's written structure before that code can execute normally.

### Runtime Problems
The program starts successfully, but fails while executing a specific instruction.

```python
scores = [10, 20]
print(scores[5])
```
The program runs, creates the list, but fails when it tries to access an index that is outside the list.

### Logic Problems
The program runs completely from top to bottom without crashing, but it produces the wrong result. No exception is raised.

Suppose the intended calculation is `(width + padding) * 2`, but the program contains:

```python
width = 5
padding = 5
result = width + padding * 2
```
Python silently calculates `15` based on mathematical order of operations, but the expected result was `20`.

---

## 5. Inspect Values, Not Guesses

Logic problems can be harder to debug because there may be no traceback pointing to the problem. You must find it yourself by inspecting intermediate values.

Create `logic.py`:

```python
score = 80
bonus = 10
final_score = score - bonus
print("Final Score:", final_score)
```

You run the program expecting a final score of `90`, but it prints `70`.

Errors do not always produce tracebacks. When behavior is confusing, you must inspect the values at different points to find where reality diverges from your expectations.

Insert `print()` statements to track the data:

```python
score = 80
bonus = 10
print("CHECK - score:", score)
print("CHECK - bonus:", bonus)

final_score = score - bonus
print("CHECK - calculated:", final_score)
```

By comparing expected vs actual values step by step, you find the first point where the result becomes wrong. Here, the math operation was accidentally written as subtraction instead of addition.

---

## 6. Type Inspection

Sometimes a value looks correct when printed to the screen, but behaves incorrectly because its data type is wrong.

```python
user_age = input("Age: ")
print(user_age)
```

If the user enters `25`, `print(user_age)` outputs `25`. It looks exactly like an integer. However, if you attempt to add to it, it fails. 

When behavior is confusing, inspect the value AND its type:

```python
print("Value:", user_age)
print("Type:", type(user_age))
```

This reveals that the type is `<class 'str'>`. `type()` is useful debugging evidence when you are unsure what kind of value a variable currently holds.

---

## 7. Change ONE Thing

A frequent beginner trap is changing multiple lines of code simultaneously when something breaks.

If you change five things at once, you hide which change actually fixed the issue. You might even accidentally introduce two new bugs while trying to fix the first one.

Form one hypothesis from evidence. Change one relevant thing. Rerun. Observe whether the result changed as expected.

**Before:**
```python
price = 10
quantity = 3
total = price + quantity
print(total)
```

Suppose the expected total is 30, but the program prints 13.

Inspect the values:
* `price` = 10
* `quantity` = 3

The evidence shows those inputs are correct, so form one hypothesis: the operation on the total line is wrong. 

Change ONLY:
`total = price + quantity`
to:
`total = price * quantity`

Rerun and observe whether it now produces 30.

Form one hypothesis → change one relevant thing → rerun → observe.

---

## 8. Reproduce the Failure

If a bug happens under a particular input, try to make it happen again.

If a program crashes when the user enters `0` for a quantity, do not test your fix by entering `5`. Test it by entering `0` again.

Same input → same failure → easier diagnosis. 

Do not rely on random testing. Pin down exactly what causes the failure, and use that specific condition repeatedly while working through the 7-step protocol.

---

## 9. Documentation as Part of Debugging

When you encounter an unfamiliar function, or when a familiar function behaves strangely, the documentation provides the ground truth.

When debugging, ask three questions:
* What does this function expect?
* What does it return?
* What can go wrong?

Consider the `int()` function.
```python
int("42")
```
It returns the integer `42`.

But what happens if you pass letters?
```python
int("hello")
```
It raises a `ValueError: invalid literal for int() with base 10: 'hello'`.

Documentation can confirm what input a function accepts and what failure behavior to expect when that input is invalid.

---

## 10. Deliberate Handling: try and except

Sometimes a failure is entirely expected. If a program asks a human to type a number, the human might type letters instead. You cannot prevent the user from typing letters, but you can prevent the program from abruptly crashing.

You can handle expected failures deliberately using a `try/except` block.

```python
raw = input("Enter a number: ")

try:
    number = int(raw)
    print("You entered:", number)
except ValueError:
    print("Please enter digits.")
```

If `int(raw)` succeeds, execution continues normally and prints the number.
If `int(raw)` raises a `ValueError`, the matching `except ValueError` block handles that exception. Python skips the rest of the `try` block and executes the `except` block instead.

**Important:** `try/except` does NOT replace debugging. In this manual, use `try/except` only when you deliberately expect and know how to handle a particular failure.

---

## 11. Controlled Failure Exercise

Diagnose this multi-step problem using the 7-step protocol.

Create `process_data.py`:

```python
values = ["10", "20", "30"]
index_choice = input("Pick an item (0, 1, or 2): ")

selected_value = values[index_choice]
print("You picked:", selected_value)
```

Run it and enter `1`.

```terminal
Traceback (most recent call last):
  File "process_data.py", line 4, in <module>
    selected_value = values[index_choice]
                     ~~~~~~^^^^^^^^^^^^^^
TypeError: list indices must be integers or slices, not str
```

**Step 1:** Read the error. `TypeError: list indices must be integers... not str`.
**Step 2:** Identify failing line. `selected_value = values[index_choice]`.
**Step 3:** Understand expectations. For the indexing used here, the list index needs to be an integer. The program supplied a string.
**Step 4:** Inspect values and types.
Insert `print(type(index_choice))` before the crash. It confirms `<class 'str'>`.
**Step 5:** Consult docs. If the requirement for list indexes is unclear, consult the relevant documentation. Your inspection has already shown that `index_choice` is a string.
**Step 6:** Change ONE thing.
Convert the input to an integer: `index_choice = int(input("Pick an item: "))`.
**Step 7:** Rerun. Entering `1` successfully prints `"20"`.

---

## 12. Experiments

Reinforce your understanding by predicting outcomes before executing each script.

### Experiment 1 — Traceback Reading

Create `exp1_traceback.py`:

```python
word = "Python"
length = len(word)
result = word / length
print(result)
```

1. **Predict:** This code will fail.
2. **Run:** Execute `python3 exp1_traceback.py`.
3. **Observe:** Read the traceback from the bottom up.
4. **Explain:** Identify the error type, the specific error message, and the exact failing line. What operation was Python complaining about?

---

### Experiment 2 — Inspect Before Fixing

Create `exp2_inspect.py`:

```python
first = "30"
second = "50"
total = first + second
```

1. **Predict:** If you added `print(total)` to the end, what would it output? 
2. **Run:** Insert `print(total)` and execute the script.
3. **Observe:** The output is `"3050"`, a logic error, not a crash.
4. **Explain:** Insert `print(type(first))` and `print(type(second))`. Explain what this evidence reveals about why the addition behaved like concatenation.

---

### Experiment 3 — One Change at a Time

Create `exp3_isolate.py`:

```python
colors = ["red", "blue"]
count = 2
print(colors[count])
```

1. **Predict:** This will crash with an `IndexError`.
2. **Run:** Execute the script and verify the crash.
3. **Observe:** There are two suspicious lines: the list definition (maybe it needs a third item) and the `count` assignment (maybe it should be `1`).
4. **Explain:** Change ONLY the `count` variable to `1`. Rerun. Observe the successful output. Decide whether the second change (adding to the list) is still needed to fix the crash.

---

## 13. Independent Application: Debugging Clinic

Create `clinic.py`. Type this exact broken script into the file:

```python
name = input("Name: ")
age = input("Age: ")

next_age = age + 1
print("Next year:", next_age)

numbers = [4, 8, 12]
print("Last number:", numbers[3])

total = 20
discount = 5
final = total + discount
print("Final price:", final)
```

**Your Task:**
This script contains three independent issues. Do NOT rewrite the script from scratch.

1. Run the script.
2. Read the very first failure traceback.
3. Identify the failing line.
4. Inspect the relevant values and types using `print()` and `type()`.
5. Change ONE thing to fix that specific failure.
6. Rerun the script.
7. Repeat the protocol as the script progresses to the next failure.
8. When the script runs cleanly without crashing, find the logic error (the final price is mathematically incorrect for a discount). Fix it.

Write down on paper:
* What failed in each instance.
* What evidence revealed the problem.
* What single change fixed it.

---

## 14. Common Mental Traps

Review these frequent beginner mistakes:

1. **Reading only the first traceback line:** For the simple tracebacks in this section, the final line is the best place to begin because it gives the exception type and message.
2. **Changing code before reading the error:** Guessing blindly wastes time and creates new bugs.
3. **Changing many things at once:** If you make three changes, you do not know which one fixed the problem.
4. **Assuming every bug produces an exception:** Logic errors execute silently and produce incorrect results.
5. **Guessing a type instead of inspecting it:** A displayed value like `25` may still have type `str`. Inspect it with `type()`.
6. **Ignoring the exact failing line:** For the simple failures in this section, the traceback points you to the line associated with the exception. Look precisely at that line.
7. **Treating try/except as a way to hide bugs:** `try/except` can handle a specific failure that the program deliberately expects and knows how to respond to. It should never be used to mask broken programming logic.
8. **Stopping after a program stops crashing:** Just because a script reaches the end without a traceback does not mean the output is mathematically or logically correct.

---

## 15. What You Understand Now and What Is Missing

You now have a repeatable process for investigating failure. You know how to read evidence, locate the halt, inspect variables, and test isolated fixes.

Next, you need a better way to answer:
* "What does this unfamiliar function expect?"
* "What does it return?"
* "How do I know how to use unfamiliar code without guessing?"

That leads into:

Next: **Section 10 — Modules, Packages & Reading Documentation**
