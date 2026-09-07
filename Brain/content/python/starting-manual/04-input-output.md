---
title: "Input & Output"
section: "04"
estimated_time: "15–20 minutes"
prerequisites: "Sections 01–03 (Instruction sequence, print, variables, primitive types: str, int, float, bool, type(), basic type conversion)"
outcomes:
  - "Understand that software interacts with the outside world by receiving dynamic input at runtime"
  - "Know that input() pauses execution, waits for Enter, and gives you a string containing what the user typed"
  - "Distinguish between string representations of numbers (\"10\") and numeric values (10)"
  - "Convert string input using int() and float() before performing arithmetic"
  - "Format dynamic text output clearly using modern f-strings"
  - "Interpret a ValueError traceback when text conversion fails"
---

# Section 04 — Input & Output

So far, every value in your programs has been decided by you before the program even started.

```python
player_name = "Alex"
score = 50
```

This works for tiny script demonstrations, but it is not how real software works.

A calculator does not have the numbers hardcoded by the programmer. A banking app does not know how much money you want to transfer until you tell it. A search engine cannot hardcode the word you want to look up.

Useful software needs information it did not possess when it was written.

To build interactive programs, you need two capabilities:
1. A way to accept information from the outside world while the program is running (**Input**).
2. A way to present formatted results back to the outside world (**Output**).

---

## 1. Asking for Information: `input()`

Python provides a built-in function called `input()` to receive text from someone typing in the terminal.

Create a file named `greeter.py` and write this:

```python
name = input("What is your name? ")
print("Hello")
print(name)
```

Run it in your terminal:

```bash
python3 greeter.py
```

### What Happens, Step by Step

Notice what happened when you ran that file. Pay close attention to the exact order of events:

1. Python reads the file line by line, starting at line 1.
2. It encounters `input("What is your name? ")`.
3. It displays the prompt text `What is your name? ` on your screen.
4. **The program pauses.** It completely stops moving forward. The cursor blinks. Python is waiting for you.
5. You type your name on the keyboard.
6. You press the <kbd>Enter</kbd> key.
7. Pressing <kbd>Enter</kbd> signals to Python that input is finished.
8. The `input()` function captures whatever characters you typed and produces that text as a value.
9. That value is assigned to the variable `name`.
10. Python finally proceeds to line 2 and line 3, printing `"Hello"` and the value stored inside `name`.

If you never press <kbd>Enter</kbd>, Python will wait indefinitely. It will not time out, guess, or move on to line 2.

---

## 2. The Trap: A Small Mystery

Let's write a small program that adds two numbers together.

Create a new file named `add_numbers.py`. Write this exact code:

```python
first = input("First number: ")
second = input("Second number: ")

total = first + second
print(total)
```

**Before you run this program, pause and make a prediction.**

If you type `10` for the first number and `20` for the second number, what do you expect the screen to display?

Most beginners predict `30`.

Now run the program and enter `10` and `20`:

```bash
$ python3 add_numbers.py
First number: 10
Second number: 20
1020
```

The screen displays `1020`.

Why did Python do that?

Did the computer make a math error? Did Python calculate `10 + 20` incorrectly?

---

## 3. Investigating What Python Actually Knows

When code produces unexpected output, beginners often guess. They change random characters, add extra parentheses, or delete lines hoping the problem disappears.

Programmers do not guess. Programmers **inspect**.

When a result makes no sense, ask: *What data did Python actually have at the moment of calculation?*

Modify `add_numbers.py` to inspect the types of `first` and `second` before adding them:

```python
first = input("First number: ")
second = input("Second number: ")

print(type(first))
print(type(second))

total = first + second
print(total)
```

Run it again with `10` and `20`:

```bash
$ python3 add_numbers.py
First number: 10
Second number: 20
<class 'str'>
<class 'str'>
1020
```

Look at the output of `type()`.

Neither `first` nor `second` is an integer (`int`). Both are strings (`str`).

### The Rule

**`input()` gives you a string containing what the user typed.**

It does not matter if you typed digits. Whether you enter `10`, `0`, `-5`, or `3.14159`, Python captures the characters as text:

```python
first = "10"
second = "20"
```

In Section 03, you learned what the plus operator (`+`) does when placed between two strings:

```python
"super" + "man"   # produces "superman"
"10" + "20"       # produces "1020"
```

The plus operator does not do arithmetic on text. It glues the characters together end-to-end (concatenation).

Python did not make a mistake. Python followed your instructions with ruthless precision: you gave it two pieces of text and told it to glue them together.

---

## 4. Solving the Problem: Explicit Conversion

If you want Python to treat incoming input as numbers, you must explicitly convert the text into a number before performing arithmetic.

In Section 03, you learned about `int()` and `float()`. You can use them directly on the values returned by `input()`.

Here is the corrected program:

```python
first_text = input("First number: ")
second_text = input("Second number: ")

# Convert the text strings into real integers
first_number = int(first_text)
second_number = int(second_text)

total = first_number + second_number
print(total)
```

Run it now:

```bash
$ python3 add_numbers.py
First number: 10
Second number: 20
30
```

Now Python performs genuine mathematical addition.

### Combining Steps

Because `input()` produces a value, you can wrap `input()` directly inside `int()`. This is common in Python:

```python
first = int(input("First number: "))
second = int(input("Second number: "))

total = first + second
print(total)
```

Look at how Python evaluates the first line from the inside out:
1. It runs `input("First number: ")`.
2. The user types `"10"` and hits <kbd>Enter</kbd>.
3. That string `"10"` is immediately handed to `int("10")`.
4. `int("10")` converts the string into the integer `10`.
5. The integer `10` is assigned to `first`.

### What About Decimals?

If your program needs to accept decimal numbers (like weights, distances, or measurements), use `float()` instead of `int()`:

```python
price = float(input("Item price: "))
tax = float(input("Tax rate (e.g. 0.08): "))

total = price + (price * tax)
print(total)
```

`int()` can convert text that represents an integer, such as `"19"` or `"-5"`. Text such as `"19.99"` is not a valid integer representation, so `int("19.99")` raises a `ValueError`. When your program needs to accept decimal values, use `float()`.

---

## 5. Better Output: Formatted Strings (f-strings)

Right now, our output looks bare:

```python
print(total)
# prints: 30
```

Printing a naked number is rarely helpful. The user needs context: What is 30? Is it 30 dollars? 30 miles? 30 errors?

In older versions of Python, combining text and numbers was awkward. You had to convert every number back into a string or string together commas:

```python
# Awkward, easy to make mistakes with spacing
print("The grand total is", total, "dollars.")
```

Modern Python provides a much cleaner solution: **f-strings** (formatted string literals).

Here is how an f-string looks:

```python
name = "Maya"
score = 42

print(f"{name} scored {score} points.")
```

Run this in your head first, then look at the rules:

1. **The letter `f`:** Put a lowercase `f` immediately before the opening quotation mark. No space between `f` and `"`.
2. **The curly braces `{}`:** Inside the string, place any variable name inside curly braces `{}`.
3. **Evaluation:** When Python runs this line, it replaces each `{variable}` with the actual value stored inside that variable.

The output will be:
```text
Maya scored 42 points.
```

### Expressions Inside f-strings

You can put calculations and expressions directly inside the curly braces:

```python
item = "Notebook"
price = 5
quantity = 3

print(f"Purchased {quantity} {item}s for a total of ${price * quantity}.")
```

Output:
```text
Purchased 3 Notebooks for a total of $15.
```

Whenever you want to present data to a human user, reach for an f-string.

---

## 6. Hands-on Experiments

Do not just read code; run code. Type these experiments into a scratch file named `experiments.py`.

### Experiment 1: The Prompt Spacing
Look closely at the string inside `input()`:
```python
name = input("Enter your name: ")
```
Notice the space after the colon: `: `.  
Delete that space so it reads:
```python
name = input("Enter your name:")
```
Run the program. What happens to the cursor when you type your name?

**Observation:** Without the trailing space, what you type touches the colon directly (`Enter your name:Alex`). Adding a trailing space inside your prompt string makes terminal applications significantly easier to read.

---

### Experiment 2: The Bio Generator
**Objective:** Write a small script that asks the user for three separate pieces of information:
1. Their city
2. Their favorite food
3. Their current age

Then, use a single `print()` statement with an f-string to display a clean summary sentence like:
`"You live in Chicago, you love pizza, and you are 24 years old."`

*(Try writing this yourself before reading the hint.)*

> **Hint:** Do you need `int()` for all three inputs? Ask yourself: does your program do math on the city or the food? If a value is only ever displayed as text, you do not need to convert it.

---

### Experiment 3: Decimal Calculator
**Objective:** Write a program that asks for the base price of a meal and the tip percentage (e.g. enter `0.15` for 15%). Calculate the total amount and display:
`"The total bill including tip is $X."`

Verify it with:
* Base price: `40.0`
* Tip: `0.2` (which is 20%)
* Expected result: `48.0`

---

### Experiment 4: The Concatenation Check
Take your `add_numbers.py` program from earlier and compare what happens when you remove `int()`:

```python
first = input("First number: ")
second = input("Second number: ")

combined = first + second
print(f"Combined: {combined}")
```

Run it and enter `5` for both numbers.

**Observation:** It prints `55`, not `10`. Because `first` and `second` are strings, the `+` operator glues the two text pieces together into `"55"`. This reinforces the core rule: if you want numeric addition, you must explicitly convert your inputs with `int()` or `float()`.

---

## 7. An Intentional Failure: The Broken Conversion

Programming is not about avoiding errors; it is about knowing how to read them when they happen.

Create a file named `crash_test.py` and write this line:

```python
age = int(input("Please enter your age: "))
print(f"Next year you will be {age + 1}.")
```

Now, run the program. When it asks for your age, deliberately do not type a number.

Type: `hello`

Press <kbd>Enter</kbd>.

The program crashes immediately. Python produces a **traceback**:

```text
Traceback (most recent call last):
  File "crash_test.py", line 1, in <module>
    age = int(input("Please enter your age: "))
ValueError: invalid literal for int() with base 10: 'hello'
```

### Reading the Error

Do not feel intimidated by tracebacks. Look at the very last line:

```text
ValueError: invalid literal for int() with base 10: 'hello'
```

Break that sentence down:
* **`ValueError`:** The kind of error that occurred. You passed a value with the right type (a string), but the contents of that value made no sense for the requested operation.
* **`invalid literal for int()`:** Python is telling you: *"I was asked to create an integer, but the text given to me does not look like an integer."*
* **`'hello'`:** Python shows you the exact text that caused the breakdown.

Python cannot guess that `"hello"` has no numeric meaning. It cannot turn letters into a whole number. So it halts.

In Section 09, you will learn how programs intercept and handle invalid inputs gracefully so they don't crash.

For now, remember this lesson: **when you use `int()` or `float()`, the text must represent a value that function can convert. If it does not, Python will stop with a `ValueError`.**

---

## 8. Common Beginner Mistakes

### 1. Forgetting Conversion Before Math
```python
# BROKEN
age = input("Enter your age: ")
years_left = 65 - age
```
**What happens:** Python halts with:  
`TypeError: unsupported operand type(s) for -: 'int' and 'str'`  
You cannot subtract a string (`age`) from a number (`65`).  
**The fix:** `age = int(input("Enter your age: "))`.

---

### 2. Forgetting the `f` in an f-string
```python
# BROKEN
name = "Sam"
print("Welcome back, {name}!")
```
**What happens:** The screen literally prints:  
`Welcome back, {name}!`  
Without the leading `f`, Python treats `{name}` as plain characters, not a placeholder for a variable.  
**The fix:** `print(f"Welcome back, {name}!")`.

---

### 3. Confusing `print()` with Storing Data
```python
# BROKEN
name = print(input("What is your name? "))
```
**What happens:** `print()` displays text on the screen, but it does not produce a value you can save. If you assign the result of `print()` to a variable, `name` ends up holding `None` (an empty value).  
**The mental model:** `input()` *gathers* data. `print()` *displays* data. Keep them on separate lines.

---

### 4. Assuming User Input is Clean and Correct
Beginners assume that if their program asks for an integer, the user will always type an integer. Users make typos, press Enter accidentally, type words instead of digits, and add extra spaces.

Good software is built with the awareness that human input is unpredictable.

---

## 9. Mini Build: Recipe Portion Calculator

Now put these concepts together. You will build a real, small utility from scratch.

### The Objective
Write a standalone Python script in a file named `scale_recipe.py` that calculates the ingredient weight needed per portion when preparing food.

### Requirements
Your program must:
1. Ask the user for the name of the recipe (e.g., `"Artisan Sourdough"`).
2. Ask for the total flour weight in kilograms (e.g., `1.5`).
3. Ask for the number of loaves being baked (e.g., `3`).
4. Calculate the amount of flour needed for each loaf.
5. Print a clear, formatted summary sentence using an f-string.

### Example Run
Your terminal interaction should look similar to this:

```text
--- Recipe Portion Calculator ---
What recipe are you making? Artisan Sourdough
Enter total flour needed (in kilograms): 1.5
How many loaves are you baking? 3

For 'Artisan Sourdough', each loaf requires: 0.5 kg of flour.
```

### Need a Hint?
If you get stuck, don't search for a completed solution. Think through these design questions:
* Which of the three inputs needs to be text, which needs decimals, and which must be a whole count of items?
* What arithmetic operator divides a total amount into equal shares?
* How can you assemble the final sentence using an f-string with `{recipe_name}` and `{per_loaf}`?

Write your code in `scale_recipe.py`, run it in your terminal, and test it with different numbers.

---

## 10. How Real Software Uses Input and Output

`input()` and `print()` are your first tools for communicating with a program, but they are not the only ones.

In real-world software, programs receive input from many different sources:
* **Files:** Reading a spreadsheet or text document saved on your hard drive.
* **Web APIs:** Fetching live weather data from a remote server over the internet.
* **Databases:** Pulling customer records from a structured database.
* **Command-Line Flags:** Passing options when launching a program (like `python3 app.py --fast`).
* **Graphical Windows:** Clicking a button or typing into a web form.

And programs produce output in many forms:
* Writing a report to a PDF or CSV file.
* Sending an automated email.
* Updating a database record.
* Rendering a graphic on a screen.

The specific tool changes, but the universal architecture of computer programming remains identical:

```text
┌─────────────────┐       ┌──────────────────────┐       ┌─────────────────┐
│      INPUT      │  ──▶  │    TRANSFORMATION    │  ──▶  │     OUTPUT      │
│  (Data Enters)  │       │ (Logic & Arithmetic) │       │ (Result Leaves) │
└─────────────────┘       └──────────────────────┘       └─────────────────┘
```

Today, your input was the terminal keyboard and your output was the terminal screen.

---

## 11. Reading Documentation: `input()`

A major part of becoming a programmer is learning to read official documentation instead of relying on tutorials.

In Python's official documentation, the signature for `input` looks conceptually like this:

```text
input([prompt]) -> str
```

Here is how a programmer reads that line:

1. **`input`**: The name of the function.
2. **`[prompt]`**: The parameter inside square brackets means it is *optional*. You can supply a prompt string like `input("Name: ")`, or you can call `input()` with nothing inside the parentheses.
3. **`-> str`**: The arrow indicates the return type. It means: **this function returns a string (`str`)**.

Whenever you encounter a new function in Python, develop the habit of asking three questions:
1. **What does it expect?** (What arguments does it take?)
2. **What does it return?** (What type of data does it hand back?)
3. **What can go wrong?** (What inputs make it fail?)

If you can answer those three questions, you understand how to use that part of the language.

---

## What You Understand Now

You now know how information enters a simple Python program and how results leave it.

More importantly: you saw an unexpected result (`10 + 20 = 1020`), inspected the program's actual data types instead of guessing, and resolved the discrepancy.

That habit of inspecting evidence is the core of debugging. It will serve you far more than memorizing function names.

---

**Next Section:** [05 — Making Decisions](05-making-decisions.md) *(Teaching programs how to choose different paths using conditions).*
