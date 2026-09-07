---
title: "Values, Variables & Types"
section: "03"
estimated_time: "15–20 minutes"
prerequisites: "Section 02 — Running Your First Python Program"
outcomes:
  - "Recognize literal values (str, int, float, bool) in Python source code"
  - "Distinguish between a value and the variable name associated with it"
  - "Use the assignment operator (=) to bind names to values and reassign them as program state evolves"
  - "Inspect data types using the built-in type() function"
  - "Perform basic arithmetic and understand how data types govern available operations"
  - "Explicitly convert between compatible types using str(), int(), and float()"
---

## 1. Starting with Values

To do meaningful work, software must handle concrete pieces of information: counts, measurements, names, and switches.

In programming, each concrete piece of information is called a **value**.

When you write a value directly into source code, it is called a **literal**:

```python
42
3.5
"Python"
True
```

These values represent fundamentally different kinds of data: a whole number behaves differently from a decimal, which behaves differently from a word or a true-or-false flag.

Python categorizes every value into a **type**. Four basic built-in types you will use immediately are:

| Everyday Description | Python Type Name | Examples | Notes |
| :--- | :--- | :--- | :--- |
| **Text** | `str` (string) | `"Python"`, `'hello'` | Characters enclosed in matching single or double quotes. |
| **Whole number** | `int` (integer) | `42`, `0`, `-15` | Positive, zero, or negative integers without a decimal point. |
| **Floating-point number** | `float` | `3.5`, `0.0`, `-12.8` | Floating-point numbers, often written with a decimal point. |
| **True or False** | `bool` (boolean) | `True`, `False` | Exactly two possible states. Capitalized in Python. |

A value written alone on a line accomplishes nothing. To calculate, compare, and display values across multiple steps, your program needs a way to refer to them.

---

## 2. Names and Assignment: Variables

To work with values, programs give them names. In Python, a name associated with a value is called a **variable**.

Consider this statement:

```python
age = 18
```

This statement has three distinct parts:

1. **`18`** is the **value**.
2. **`age`** is the **name** (variable identifier).
3. **`=`** is the **assignment operator**.

```text
  age    =    18
 [NAME]      [VALUE]
       \    /
     ASSIGNMENT
```

A common beginner metaphor describes a variable as a "box" holding a value. A more accurate beginner mental model is: **assignment associates a name with a value.**

After `age = 18` runs, the name `age` refers to `18`. Whenever your program uses `age` in a subsequent instruction, Python looks up what value that name currently refers to:

```python
age = 18
print(age)
```

Output:

```terminal
$ python3 age.py
18
```

Notice that Python printed `18`, not the word `"age"`. It evaluated the variable `age` and retrieved its value. If you wrap the word in quotes—`print("age")`—Python treats `"age"` as a string literal and prints the letters `age`.

---

## 3. Assignment is Not an Equation

The equals sign (`=`) in Python does **not** mean mathematical equality. It means **assignment**: *"evaluate whatever is on the right, and associate that value with the name on the left."*

This distinction is essential when a variable is reassigned based on its current value:

```python
score = 10
score = score + 5
print(score)
```

In algebra, the equation $score = score + 5$ has no solution. In Python, line 2 is not an equation; it executes from right to left:

1. Python evaluates the right-hand side first: `score + 5`.
2. It looks up the current value of `score`, which is `10`.
3. It computes `10 + 5`, producing `15`.
4. It assigns that result (`15`) to the name on the left-hand side (`score`).

Output:

```terminal
$ python3 score.py
15
```

After the reassignment, `score` refers to `15` rather than `10`.

This is **program state** in action. As instructions execute sequentially, the associations between names and values update step by step.

---

## 4. Rules for Variable Names

For now, use letters, digits, and underscores in variable names. Follow these practical rules:

1. **Do not start with a digit:** `score1` is valid; `1score` produces a `SyntaxError`.
2. **Underscores are allowed:** Use underscores to separate words (`user_name`, `total_score`).
3. **Names are case-sensitive:** `score`, `Score`, and `SCORE` are three distinct variables.
4. **Keywords cannot be variable names:** Python reserves specific words for its own syntax (such as `if`, `for`, `while`, `class`, `True`, and `False`). You cannot name a variable after a reserved keyword.

```python
# Valid variable names
user_name = "Alex"
total_score = 100
temperature_celsius = 22.4
is_active = True

# Invalid variable names
2nd_player = "Sam"       # SyntaxError: cannot start with a digit
user-name = "Alex"        # SyntaxError: hyphen interpreted as minus (-)
class = "Math"            # SyntaxError: 'class' is a reserved keyword
```

### Why `user-name` Fails

In Python, the hyphen (`-`) is the subtraction operator. When Python encounters `user-name`, it interprets it as an expression subtracting `name` from `user`, not as a single identifier. Use underscores instead: `user_name`.

Choose names that describe what the value represents. While `x = 42` runs cleanly, `days_remaining = 42` communicates intent to anyone reading your code.

---

## 5. Inspecting Types with `type()`

Python provides a built-in function named `type()` that reveals what kind of value a variable currently refers to.

Create a file named `types_demo.py`:

```python
player_name = "Maya"
attempts = 3
temperature = 21.5
is_ready = True

print(type(player_name))
print(type(attempts))
print(type(temperature))
print(type(is_ready))
```

Output:

```terminal
$ python3 types_demo.py
<class 'str'>
<class 'int'>
<class 'float'>
<class 'bool'>
```

For now, focus on the word inside the quotes: `str`, `int`, `float`, or `bool`. The `<class '...'>` notation belongs to Python's object system, which you will study in later chapters.

Notice that the type belongs to the **value**, not to the variable name itself. If you assign a value of another type to `attempts`:

```python
attempts = "three"
print(type(attempts))
```

The output changes to `<class 'str'>`. The same name can refer to values of different types at different points in the program.

---

## 6. Types Govern Operations

A value's type determines which operations are valid and how those operations behave.

Consider the plus sign (`+`):

```python
# Adding two integers
print(10 + 5)

# Adding two floats
print(2.5 + 1.5)

# Joining two strings
print("Py" + "thon")
```

Output:

```terminal
$ python3 operations.py
15
4.0
Python
```

Notice what happened:

* Between two numbers (`10 + 5`), `+` performs **arithmetic addition** (`15`).
* Between two floats (`2.5 + 1.5`), `+` performs **floating-point addition** (`4.0`).
* Between two strings (`"Py" + "thon"`), `+` performs **concatenation**—it joins text into `"Python"`.

The same operator performs fundamentally different operations depending on the types given to it.

---

## 7. Controlled Failure: `TypeError`

What happens if you place `+` between a string and an integer?

Create `type_mismatch.py`:

```python
label = "Score: "
points = 100

message = label + points
print(message)
```

Run it from your terminal:

```terminal
$ python3 type_mismatch.py
```

Python halts immediately with a traceback:

```text
Traceback (most recent call last):
  File "type_mismatch.py", line 4, in <module>
    message = label + points
              ~~~~~~^~~~~~~~
TypeError: can only concatenate str (not "int") to str
```

### Reading the Error

Look directly at the last line:

```text
TypeError: can only concatenate str (not "int") to str
```

- **`TypeError`:** An operation was attempted on values of incompatible types.
- **`can only concatenate str (not "int") to str`:** Python found a string on the left side of `+`, so it expected another string on the right to concatenate. Instead, it encountered an integer (`100`).

Python does not guess whether you intended to work with text or numbers. The expression `label + points` attempts an operation that Python does not support between a `str` and an `int`, so execution stops with a `TypeError`.

### Resolving the Incompatibility

To concatenate a string and a number with `+`, explicitly convert the integer to a string using `str()`:

```python
label = "Score: "
points = 100

message = label + str(points)
print(message)
```

Output:

```terminal
Score: 100
```

`str(points)` produces the text `"100"`, allowing Python to concatenate the two strings cleanly.

---

## 8. Basic Arithmetic

Python provides built-in operators for mathematics with `int` and `float` values:

| Operator | Operation | Example | Result | Result Type |
| :---: | :--- | :--- | :---: | :---: |
| `+` | Addition | `14 + 6` | `20` | `int` |
| `-` | Subtraction | `20 - 7` | `13` | `int` |
| `*` | Multiplication | `4 * 5` | `20` | `int` |
| `/` | Division | `15 / 3` | `5.0` | `float` |

### Two Crucial Arithmetic Rules

#### 1. Division Always Produces a `float`

Whenever you use `/`, Python always produces a floating-point number, even when numbers divide evenly:

```python
print(10 / 2)
# Output: 5.0
```

#### 2. Precedence and Parentheses

Python evaluates multiplication and division before addition and subtraction:

```python
result = 5 + 3 * 2
print(result)
# Output: 11
```

Use parentheses `()` whenever you want addition to happen first, or to make your calculation order explicit:

```python
result = (5 + 3) * 2
print(result)
# Output: 16
```

---

## 9. Explicit Type Conversion

When you have a value of one type but an instruction requires another, Python provides explicit conversion functions: `int()`, `float()`, and `str()`.

Conversion evaluates the original value and produces a **new value** of the requested type. It does not alter the original variable.

### Converting to an Integer: `int()`

`int()` converts compatible values into integers:

```python
truncated = int(9.8)
print(truncated)
# Output: 9
```

> [!IMPORTANT]
> `int()` does **not** round numbers. It truncates the decimal portion toward zero. `int(9.8)` produces `9`. `int(-4.9)` produces `-4`.

`int()` can also convert text consisting of digits:

```python
numeric_value = int("25")
print(numeric_value + 5)
# Output: 30
```

### Converting to a Decimal: `float()`

`float()` converts integers or valid numeric strings into floating-point numbers:

```python
base = float(7)
print(base)
# Output: 7.0

measurement = float("14.25")
print(measurement * 2)
# Output: 28.5
```

### Converting to Text: `str()`

`str()` converts any value into its text representation:

```python
text_count = str(42)
text_rate = str(3.14)
text_flag = str(True)

print(text_count)
# Output: 42

print(text_rate)
# Output: 3.14

print(text_flag)
# Output: True
```

Notice that `print()` displays the characters of a string without surrounding quote marks. The variable `text_count` refers to a string value (`"42"`), not an integer. You can verify this at any time using `type(text_count)`.

Once converted to a string, you can concatenate it with other strings using `+`.

---

## 10. Hands-on Experiments

Reinforce the concepts of values, assignment, and types with three empirical experiments.

For each experiment:
1. Read the code.
2. **Predict** the exact output.
3. Save the file and **run** it in your terminal.
4. **Observe** whether your prediction matched Python's output.

### Experiment 1: Tracking Reassignment

Create `exp1.py`:

```python
points = 10
print(points)

points = points + 5
print(points)

points = points * 2
print(points)
```

* **Predict:** What three numbers will print, and in what order?
* **Run:** Execute `python3 exp1.py`.
* **Explain:** Each assignment line updates what `points` refers to. Line 4 uses the value from line 1, and line 7 uses the value from line 4.

### Experiment 2: Reassigning Different Types

Create `exp2.py`:

```python
sample = 50
print(sample, type(sample))

sample = 50.0
print(sample, type(sample))

sample = "50"
print(sample, type(sample))
```

* **Predict:** How will the printed value and type change across each print statement?
* **Run:** Execute `python3 exp2.py`.
* **Explain:** The variable name `sample` was reassigned from an `int` value to a `float` value, and then to a `str` value. The name points to whatever value was most recently assigned to it, and `type()` reports the type of that current value.

### Experiment 3: Explicit Conversion and Types

Create `exp3.py`:

```python
value = 8
as_float = float(value)
as_text = str(value)

print(value, type(value))
print(as_float, type(as_float))
print(as_text, type(as_text))
```

* **Predict:** What value and type will display on each line?
* **Run:** Execute `python3 exp3.py`.
* **Explain:** The integer `8` was converted into a float (`8.0`) and into a text string (`"8"`). While `print(value)` and `print(as_text)` look identical on screen, `type()` proves they are distinct kinds of data.

---

## 11. Independent Application: Event Countdown Snapshot

Put your understanding of variables, types, and arithmetic into practice by writing a script from scratch.

### The Scenario

You are writing a script that calculates the total remaining hours before a scheduled event (such as a workshop, an exhibition, or a launch).

### Requirements

1. Create a new file named `countdown.py` in your working directory.
2. Define the following variables using appropriate types:
   * `event_name`: a string containing the name of the event.
   * `days_remaining`: an integer representing the whole number of days left.
   * `hours_per_day`: an integer set to `24`.
3. Calculate the total hours remaining by multiplying `days_remaining` by `hours_per_day`, and assign that calculation to a variable named `total_hours`.
4. Print a readable summary displaying the event name, the days remaining, and the calculated total hours.
5. Save the file and run it from your terminal.
6. Modify `days_remaining` to a new number, save, run the script again, and observe how the calculated total hours update automatically.

### Socratic Self-Check

Once your program runs successfully:

* What type is `days_remaining`? What type is `total_hours`?
* If you changed `days_remaining` to `2.5` (a float), what type would `total_hours` become?
* What happens if you try to join `event_name` and `total_hours` using `event_name + total_hours`? How would you use `str()` to resolve that?

---

## 12. What You Understand Now and What is Missing

In this chapter, you made program state concrete:

* **Values have types:** Text (`str`), whole numbers (`int`), floating-point numbers (`float`), and booleans (`bool`) are handled differently by Python.
* **Variables associate names with values:** The assignment operator (`=`) binds a name to a value, evaluating the right-hand side before assigning.
* **Reassignment updates state:** A variable name can refer to new values as instructions execute step by step.
* **Types govern operations:** The `+` operator adds numbers but joins strings; combining incompatible types without conversion causes a `TypeError`.
* **Explicit conversion:** `int()`, `float()`, and `str()` produce new values of a different type when compatible.

### The Missing Piece: Where Do Values Come From?

Look closely at `countdown.py`, `age.py`, and every script you have written so far.

Where did every single value come from?

**You typed them directly into the source code.**

If the event date changes, or if a different person runs the program with their own name, someone has to open `countdown.py` in an editor, edit the code, save the file, and rerun it.

Real software does not work this way. A calculator does not require you to rewrite its code to add two numbers; a website does not require an engineer to edit source files every time someone creates an account.

Programs need a way to receive live information from the outside world while they are running.

Next: **Section 04 — Input & Output**
