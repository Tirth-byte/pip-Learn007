# PipLearn — Python Starting Manual: Content & Curriculum Plan

> **Design Philosophy & Purpose**  
> PipLearn is not a video lecture platform, an automated quiz machine, a LeetCode clone, or an AI code-generator that solves projects for students.  
> 
> **The PipLearn Model:**  
> Learn the minimum fundamentals → Choose a serious project → Plan it → Build it yourself → Encounter real problems → Use PipLearn documentation → Research when necessary → Debug → Understand the solution → Continue building → Finish a substantial project.  
> 
> The Starting Manual exists **ONLY** to give a complete beginner enough mental scaffolding and syntax fluency to begin their first serious Python project on Day 1. It intentionally avoids exhaustive reference lists.

---

## High-Level Overview & Pacing

* **Target Audience:** Total beginner (zero or negligible programming experience).
* **Target Time to Complete:** ~75–85 minutes total reading & interactive experimentation (well within the 60–90 minute design budget).
* **Guiding Pedagogy:** Productive struggle, early documentation literacy, systematic debugging methodology, and just-in-time discovery.

### Section Duration Summary

| Section | Title | Est. Time |
|---|---|---|
| **01** | What Programming Actually Is | 5 mins |
| **02** | Running Your First Python Program | 5 mins |
| **03** | Values, Variables & Types | 7 mins |
| **04** | Input and Output | 6 mins |
| **05** | Making Decisions (`if`, `elif`, `else`) | 8 mins |
| **06** | Repeating Work (`for`, `while`) | 8 mins |
| **07** | Working With Collections (`list`, `dict`) | 10 mins |
| **08** | Functions (Reusability & Flow) | 10 mins |
| **09** | Errors & Debugging (The Diagnostic Protocol) | 8 mins |
| **10** | Modules, Packages & Reading Documentation | 8 mins |
| **11** | How to Start Building Software (You're Ready to Build) | 5 mins |
| **Total** | **End-to-End Foundation** | **~80 mins** |

---

## Core Operational Policies

### The AI Assistance Rule
To prevent passive learning and cognitive atrophy:
* **What AI is allowed to do:**
  * Explain underlying concepts, mental models, and analogies.
  * Clarify cryptic terminal error messages and tracebacks.
  * Explain unfamiliar Python syntax or language keywords.
  * Explain official library documentation and function signatures.
* **What AI is strictly forbidden from doing:**
  * Writing complete project solutions or boilerplate for the student.
  * Solving project bugs directly by handing over copy-paste fixes.
  * Replacing the learner's productive struggle. The learner must type, test, fail, inspect, and fix their own code.

### The Debugging Mentality (7-Step Diagnostic Protocol)
Embedded into the manual and reinforced at every stage:
1. **Read the error message:** Don't panic or close the terminal; read the error type and summary line at the bottom.
2. **Identify the failing line:** Look at the traceback line number and pinpoint the exact offending statement.
3. **Understand what Python expected:** Contrast what the operation requires (e.g., an integer) with what was provided (e.g., a string).
4. **Inspect values and types:** Use temporary `print(type(x), x)` statements to verify assumptions at runtime.
5. **Consult documentation:** Look up the function signature or operator rules.
6. **Change ONE thing:** Make a single hypothesis-driven fix, not five random edits.
7. **Run again:** Verify the result and observe whether the error transformed or resolved.

---

## Section-by-Section Detailed Curriculum Plan

---

### Section 01 — What Programming Actually Is

#### 1. Why the Learner Needs This
Beginners frequently perceive programming as math wizardry, cryptic code memorization, or talking to a sentient computer. Grounding them in reality relieves imposter syndrome: code is simply a sequential recipe executed literally and mercilessly by an interpreter that has zero intuition.

#### 2. Concepts Taught
* The computer as an instruction follower: strict sequence, no guesswork, executes top-to-bottom.
* The role of an interpreter: translating human-readable text (`.py`) into machine instructions.
* How code manages two things: **State** (memory/data) and **Logic** (transformations/decisions).
* Comments (`#`): communicating intent to human readers, ignored by Python.

#### 3. Concepts Deliberately NOT Taught Yet
* Compiled vs. interpreted language nuances, bytecode (`.pyc`), GIL, CPU registers, memory addresses.
* Multiline string docstrings as comments (`"""..."""` syntax) — prevents syntax overload.
* History of Guido van Rossum or Python release timelines.

#### 4. Tiny Code Examples
```python
# A program is a sequence of plain instructions executed top-to-bottom
print("Step 1: Gather ingredients")
print("Step 2: Mix batter")
print("Step 3: Bake cake")
```

#### 5. Common Beginner Mistakes
* Believing Python reads their "mind" or will automatically infer what they meant when they omit a step.
* Thinking code runs all at once in parallel rather than sequentially line-by-line.
* Typing instructions in arbitrary order expecting the computer to sort it out.

#### 6. What the Learner Should Understand Before Continuing
* Code is text stored in a file executed sequentially by Python.
* If an instruction is missing or misplaced, Python will strictly follow the broken recipe without warning.

#### 7. Estimated Reading Time
**5 minutes**

---

### Section 02 — Running Your First Python Program

#### 1. Why the Learner Needs This
Learners need immediate tactile verification that they can control the computer. Bridging the text editor and the execution environment builds fundamental developer confidence.

#### 2. Concepts Taught
* Writing code in a plain text file (`app.py`).
* The Terminal / Command Line interface as the command bridge.
* Invoking Python: running `python3 app.py` (or `python app.py`).
* The interactive REPL (`python` prompt `>>>`): a quick scratchpad for testing single lines.
* The `print()` function: the primary window into the program's inner state.

#### 3. Concepts Deliberately NOT Taught Yet
* Complex IDE plugins, debuggers, virtual environment activation, command-line arguments (`sys.argv`).
* Terminal configuration, bash scripting, shell aliases, PATH environment variable management.

#### 4. Tiny Code Examples
```python
# app.py
print("PipLearn system online.")
```
```bash
# Executed in terminal
$ python3 app.py
PipLearn system online.
```

#### 5. Common Beginner Mistakes
* Running terminal shell commands (like `ls`, `cd`, `python app.py`) inside the Python REPL (`>>>`).
* Running Python commands (like `print("hi")`) directly in bash without starting Python.
* Forgetting to save the file in the editor before running the terminal command.

#### 6. What the Learner Should Understand Before Continuing
* How to open a file, write a `print` statement, save it, and run it from the terminal.
* The difference between the system terminal prompt (`$`) and the Python interactive prompt (`>>>`).

#### 7. Estimated Reading Time
**5 minutes**

---

### Section 03 — Values, Variables & Types

#### 1. Why the Learner Needs This
Programs must remember facts to do useful work. Beginners must understand that data has distinct kinds (types) and that Python treats a number fundamentally differently from text containing a digit.

#### 2. Concepts Taught
* Variables as labeled memory boxes: assignment operator `=` (storing, not mathematical equality).
* The 4 essential primitive types:
  * `str` (text enclosed in quotes: `"hello"`, `'world'`)
  * `int` (whole numbers: `42`, `-7`)
  * `float` (decimal numbers: `3.14`, `0.5`)
  * `bool` (`True`, `False` — notice the capitalization)
* Inspecting types using `type()`.
* Basic arithmetic operators: `+`, `-`, `*`, `/` (float division), `//` (integer division).
* Type conversion: converting between types explicitly (`str(42)`, `int("10")`, `float("3.5")`).

#### 3. Concepts Deliberately NOT Taught Yet
* Complex numbers (`complex`), byte arrays (`bytes`), memory allocation, mutability/immutability internals.
* Bitwise operators (`&`, `|`, `^`, `<<`), modulo nuances with negative numbers, walrus operator (`:=`).
* Exhaustive string methods (e.g., `endswith`, `zfill`, `partition`).

#### 4. Tiny Code Examples
```python
player_name = "Alex"      # str
level = 1                  # int
health = 98.5              # float
is_alive = True            # bool

# Arithmetic and inspection
next_level = level + 1
print(player_name, "level:", next_level)
print(type(health))        # Output: <class 'float'>

# Explicit conversion
raw_score = "150"
total_score = int(raw_score) + 50
print(total_score)         # Output: 200
```

#### 5. Common Beginner Mistakes
* Confusing assignment `=` with comparison `==` (e.g., thinking `x = 5` tests if `x` equals 5).
* Adding text and numbers directly: `"Score: " + 10` (triggers `TypeError`).
* Forgetting quotes around strings (`name = Alex` produces `NameError: name 'Alex' is not defined`).

#### 6. What the Learner Should Understand Before Continuing
* Variables store values; the right-hand side of `=` is evaluated before being assigned to the left.
* Every value has a type, and combining incompatible types without conversion causes Python to halt with an error.

#### 7. Estimated Reading Time
**7 minutes**

---

### Section 04 — Input and Output

#### 1. Why the Learner Needs This
Software is uninteresting without user interaction. Programs must ingest external input from human users and produce clear, formatted feedback on screen.

#### 2. Concepts Taught
* Receiving user input via `input(prompt)`.
* **The Golden Rule of `input()`:** It ALWAYS returns a `str`, regardless of what the user typed.
* Converting user inputs immediately when numeric calculation is required (`int(input(...))`).
* Modern string formatting using f-strings (`f"Hello, {name}! You scored {points}."`).
* Multi-item printing and newline control (`print(..., end=" ")`).

#### 3. Concepts Deliberately NOT Taught Yet
* Old-style formatting (`%s` and `str.format()`), advanced format specifiers (e.g., `{val:0>4.2f}`).
* Command line flags (`argparse`), GUI inputs, standard input streams (`sys.stdin.read`).
* Input validation loops or regex sanitization.

#### 4. Tiny Code Examples
```python
user_name = input("Enter your username: ")
birth_year = input("Enter your birth year: ")

# Must convert string input to int for arithmetic
age = 2026 - int(birth_year)

print(f"Welcome {user_name}! You are approximately {age} years old.")
```

#### 5. Common Beginner Mistakes
* Expecting `input()` to return a number automatically:
  ```python
  age = input("Age: ")
  next_year = age + 1  # Crashes with TypeError: can only concatenate str to str
  ```
* Leaving out the `f` prefix before an f-string: `"{name} is here"` prints the literal text `{name} is here`.

#### 6. What the Learner Should Understand Before Continuing
* `input()` pauses program execution until Enter is pressed and always yields a string.
* F-strings are the standard, modern way to embed variables and expressions inside strings.

#### 7. Estimated Reading Time
**6 minutes**

---

### Section 05 — Making Decisions (`if`, `elif`, `else`)

#### 1. Why the Learner Needs This
Without branching, code can only execute rigid straight-line scripts. Decisions allow programs to handle edge cases, enforce rules, validate states, and adapt dynamically.

#### 2. Concepts Taught
* Comparison operators: `==` (equal to), `!=` (not equal to), `<`, `>`, `<=`, `>=`.
* Boolean logic operators: `and`, `or`, `not`.
* Branching blocks: `if`, `elif` (else-if), and `else`.
* **Python's significant whitespace:** The 4-space indentation rule that defines code blocks.
* Nested conditions (conceptual introduction without deep nesting).

#### 3. Concepts Deliberately NOT Taught Yet
* Python 3.10+ Pattern Matching (`match ... case`).
* Ternary conditional expressions (`x if condition else y`).
* Truthy / Falsy edge cases (custom `__bool__` methods, empty iterables in boolean context).
* Chained comparisons in depth (e.g., `1 < x < 10`).

#### 4. Tiny Code Examples
```python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "Needs Improvement"

print(f"Your grade is: {grade}")

# Boolean logic
has_key = True
door_locked = True

if has_key and door_locked:
    print("Unlocking door...")
```

#### 5. Common Beginner Mistakes
* Using single `=` instead of `==` inside conditions (`if score = 100:` triggers a `SyntaxError`).
* Forgetting the trailing colon `:` at the end of `if`, `elif`, or `else` lines.
* Mixing tabs and spaces or inconsistent indentation, leading to `IndentationError`.
* Writing redundant comparisons like `if is_alive == True:` instead of `if is_alive:`.

#### 6. What the Learner Should Understand Before Continuing
* Indentation tells Python which lines belong to which branch.
* Branches are evaluated in order; the first condition that evaluates to `True` runs, and the rest are skipped.

#### 7. Estimated Reading Time
**8 minutes**

---

### Section 06 — Repeating Work (`for`, `while`)

#### 1. Why the Learner Needs This
Computers excel at doing repetitive tasks millions of times without fatigue. Loops allow developers to process datasets, retry operations, and keep interactive programs running.

#### 2. Concepts Taught
* The `for` loop: iterating through sequences (numbers using `range()`, characters in strings).
* `range(start, stop)` and `range(count)` behavior (remembering zero-indexing: `range(5)` gives 0 to 4).
* The `while` loop: repeating code as long as a condition remains `True`.
* Loop control statements:
  * `break`: exit the loop immediately.
  * `continue`: skip the rest of the current iteration and jump to the next.
* Preventing and identifying infinite loops.

#### 3. Concepts Deliberately NOT Taught Yet
* `for ... else` and `while ... else` constructs (confusing for beginners and rarely used in early projects).
* Iterators, generators (`yield`), `enumerate()`, `zip()`, `reversed()`.
* List comprehensions (`[x for x in list]`).

#### 4. Tiny Code Examples
```python
# for loop with range
for countdown in range(3, 0, -1):
    print(countdown)
print("Blastoff!")

# while loop with break
attempts = 0
while True:
    code = input("Enter secret passcode: ")
    if code == "pip123":
        print("Access granted.")
        break
    attempts = attempts + 1
    if attempts >= 3:
        print("Locked out.")
        break
```

#### 5. Common Beginner Mistakes
* Off-by-one errors with `range(5)` (expecting it to reach 5, when it stops at 4).
* Creating accidental infinite loops in `while` loops by forgetting to update the loop counter or condition variable.
* Putting loop control variables inside the loop initialization block, resetting it every iteration.

#### 6. What the Learner Should Understand Before Continuing
* Use `for` when you know how many times or over what collection you are iterating.
* Use `while` when you need to run until a condition changes.
* Every `while` loop must have a reachable termination condition or `break`.

#### 7. Estimated Reading Time
**8 minutes**

---

### Section 07 — Working With Collections (`list`, `dict`)

#### 1. Why the Learner Needs This
Real applications don't store individual values in isolated variables; they store lists of items (inventory, tasks, usernames) and key-value records (user profile, config settings, game stats).

#### 2. Concepts Taught
* **Lists (`list`):** Ordered, mutable sequences `[item1, item2]`.
  * Indexing (zero-based: `items[0]`), negative indexing (`items[-1]` for the last item).
  * Essential operations: `.append(val)`, `len(items)`, `item in items`.
  * Basic slicing: `items[0:2]` (start inclusive, end exclusive).
* **Dictionaries (`dict`):** Key-value lookup pairs `{"key": value}`.
  * Accessing: `data["key"]` and `.get("key", default)`.
  * Modifying and adding: `data["new_key"] = new_value`.
  * Iterating keys and values: `for key in data:` and `data.items()`.
* **The "Look It Up" Mentality:** You do NOT memorize 30 collection methods. You learn that collections hold data, and when you need to sort, pop, or reverse, you consult the documentation.

#### 3. Concepts Deliberately NOT Taught Yet
* Sets (`set`), Tuples (`tuple`), FrozenSets, DefaultDict, Counter, OrderedDict, Deque.
* Slice stepping syntax (`list[::2]`, `list[::-1]`), list mutability in memory, shallow vs. deep copy.
* Dictionary comprehension, dictionary merge operator (`|`).
* Complex nested collection transformations.

#### 4. Tiny Code Examples
```python
# Working with a list
inventory = ["sword", "shield", "potion"]
inventory.append("map")
print(f"Total items: {len(inventory)}")
print(f"First item: {inventory[0]}, Last item: {inventory[-1]}")

# Working with a dictionary
player = {
    "name": "Jordan",
    "gold": 50,
    "alive": True
}
player["gold"] = player["gold"] + 25  # Add gold
player["guild"] = "Explorers"         # Add new key

print(f"{player['name']} has {player['gold']} gold.")
```

#### 5. Common Beginner Mistakes
* `IndexError: list index out of range` by accessing `list[len(list)]` instead of `list[len(list)-1]`.
* `KeyError` when accessing a dictionary key that doesn't exist using bracket notation (explain `.get()` as a safer alternative).
* Modifying a list while looping over it directly with `for item in inventory: inventory.remove(item)`.

#### 6. What the Learner Should Understand Before Continuing
* A `list` is an ordered list indexed by position (0, 1, 2...).
* A `dict` is an association map indexed by custom keys.
* When they need an operation (like removing an item or sorting), they should look up the collection method rather than trying to invent it from scratch.

#### 7. Estimated Reading Time
**10 minutes**

---

### Section 08 — Functions (Reusability & Flow)

#### 1. Why the Learner Needs This
Without functions, code becomes a repetitive, unmaintainable, 500-line script. Functions break problems into isolated, testable, named sub-tasks that can be called repeatedly with different inputs.

#### 2. Concepts Taught
* Defining a function: `def function_name(parameter):`.
* Parameters (inputs) vs. Arguments (actual values passed).
* Returning data: the `return` statement vs. `print()`.
  * Critical mental model: `print` puts ink on the screen; `return` hands data back to the program.
* Scope basics: variables created inside a function are private to that function (local scope).
* Default parameter values (`def greet(name="adventurer"):`).

#### 3. Concepts Deliberately NOT Taught Yet
* `*args` and `**kwargs` variable-length arguments.
* Anonymous `lambda` functions, closures, decorators (`@decorator`), recursion.
* Global keyword mutation (`global x`), generator functions (`yield`), type annotations/type hinting.

#### 4. Tiny Code Examples
```python
def calculate_tax(subtotal, tax_rate=0.08):
    tax_amount = subtotal * tax_rate
    return tax_amount  # Passes value back to caller

# Calling the function and capturing output
order_subtotal = 100
tax = calculate_tax(order_subtotal)
grand_total = order_subtotal + tax
print(f"Grand Total: ${grand_total}")
```

#### 5. Common Beginner Mistakes
* Confusing `return` with `print`:
  ```python
  def add(a, b):
      print(a + b)
  result = add(2, 3) # result is None! Can't do result * 2
  ```
* Defining a function but forgetting to call it (`add` instead of `add(2, 3)`).
* Trying to access a local variable outside the function where it was created (`NameError`).

#### 6. What the Learner Should Understand Before Continuing
* Functions are reusable machines: they take inputs (parameters), do work, and hand back an answer (`return`).
* A function does nothing until it is called with parentheses `()`.

#### 7. Estimated Reading Time
**10 minutes**

---

### Section 09 — Errors & Debugging (The Diagnostic Protocol)

#### 1. Why the Learner Needs This
Errors are not signs of failure or lack of intelligence; **errors are the primary conversation mechanism between Python and the developer**. Professional developers see errors constantly. The difference between quitting and succeeding is having a repeatable diagnostic protocol.

#### 2. Concepts Taught
* Anatomy of a Traceback: reading from the bottom up.
  * The error type and error message (at the very bottom).
  * The file path and line number where the failure occurred.
* The 5 most common beginner errors:
  * `SyntaxError`: broken grammar (missing colon, mismatched quote/parenthesis).
  * `NameError`: using a variable or function name that was never defined or misspelled.
  * `TypeError`: applying an operation to the wrong kind of data (e.g., `"5" + 2`).
  * `IndexError`: trying to grab an item from a list at a slot that does not exist.
  * `KeyError`: looking for a dictionary key that isn't present.
* The 7-Step PipLearn Diagnostic Protocol (detailed above).
* Strategic print debugging: printing variable values and `type(val)` right before the failing line.
* Basic `try ... except` block: catching an expected runtime error gracefully without crashing.

#### 3. Concepts Deliberately NOT Taught Yet
* Advanced exception hierarchies, custom exception classes (`class CustomError(Exception):`).
* `try ... except ... else ... finally` complete blocks, raising exceptions manually (`raise`).
* Interactive debuggers (`pdb`, IDE breakpoints).

#### 4. Tiny Code Examples
```python
# Safe numeric input using try/except
user_input = input("Enter your age: ")

try:
    age = int(user_input)
    if age >= 18:
        print("Adult ticket.")
    else:
        print("Youth ticket.")
except ValueError:
    print(f"Error: '{user_input}' is not a valid number. Please enter digits.")
```

#### 5. Common Beginner Mistakes
* Blindingly wrapping the entire script in a blanket `except Exception: pass`, silencing all bugs and making debugging impossible.
* Staring at the terminal in panic instead of reading the bottom line of the traceback.
* Changing multiple lines of code randomly hoping the error magically disappears.

#### 6. What the Learner Should Understand Before Continuing
* When code crashes, Python gives the exact line and reason at the bottom of the traceback.
* Debugging is a science of eliminating possibilities one variable and one line at a time.

#### 7. Estimated Reading Time
**8 minutes**

---

### Section 10 — Modules, Packages & Reading Documentation

#### 1. Why the Learner Needs This
No developer builds everything from scratch. Python's power lies in its standard library and open-source ecosystem. More importantly, self-reliant developers know how to read documentation rather than relying on an AI or tutorial to write their code.

#### 2. Concepts Taught
* What a module is: a Python file with pre-written functions you can bring into your program.
* Importing standard modules: `import random`, `import math`, `from datetime import date`.
* What `pip` is: Python's package installer for third-party packages from PyPI (`pip install ...`).
* **Documentation Literacy (The Core Skill):**
  * How to locate the official Python documentation (`docs.python.org`).
  * Reading a function signature: `random.randint(a, b)` → accepts two integers, returns an integer between `a` and `b` inclusive.
  * Identifying parameters: required vs. optional (default values).
  * Checking return types: what data comes back?
  * Examining code examples in docs.
* Using `help()` inside the REPL for instant offline documentation.

#### 3. Concepts Deliberately NOT Taught Yet
* Creating complex nested packages, `__init__.py` deep details, wheel builds, PyPI publishing.
* Virtual environment details (`venv`, `poetry`, `conda`, `pip freeze > requirements.txt`) — introduced in Project setup.
* `if __name__ == "__main__":` idiom (deferred to project multi-file architecture).

#### 4. Tiny Code Examples
```python
import random

# Looking at docs: random.randint(a, b) returns a random int where a <= N <= b
secret_number = random.randint(1, 100)
print(f"Dice roll: {secret_number}")

# Inspecting documentation directly in Python
import math
# help(math.sqrt)  <-- Learner can run this in REPL to see the signature
print(math.sqrt(16))  # Output: 4.0
```

#### 5. Common Beginner Mistakes
* Naming their own script `random.py` or `math.py`, which accidentally shadows the standard library module and breaks imports (`Circular import` or `AttributeError`).
* Running `pip install <package>` inside Python code or REPL instead of the operating system terminal.
* Giving up when documentation looks technical instead of looking for the signature and examples section.

#### 6. What the Learner Should Understand Before Continuing
* You import modules to access capabilities Python provides out of the box.
* You do not need to memorize how every function works; you need to know how to find its signature and return value in the documentation.

#### 7. Estimated Reading Time
**8 minutes**

---

### Section 11 — How to Start Building Software ("You're Ready to Build")

#### 1. Why the Learner Needs This
This section provides the psychological and practical bridge between reading syntax and starting their first serious project. It dismantles tutorial hell by resetting expectations: you do NOT know everything, and that is completely by design.

#### 2. Concepts Taught
* **The Software Construction Mindset:**
  * Step 1: Clarify the requirements (What does this program do in plain English?).
  * Step 2: Break into tiny milestones (Get 1 input working before writing 50 lines).
  * Step 3: Write code, run frequently, verify output after every 3–5 lines.
  * Step 4: When stuck, consult documentation or run targeted experiments.
* **The "Just-in-Time" Learning Contract:**
  * You intentionally do NOT know: Object-Oriented Programming (OOP), file handling, APIs, database persistence, automated unit testing, or complex GUI frameworks.
  * *You will learn each of these precisely when your project needs them.*
* Transition to Project 1: choosing a real CLI application (e.g., Expense Tracker, Text RPG, Flashcard Engine, or Task Management System).

#### 3. Concepts Deliberately NOT Taught Yet
* UML diagrams, Agile/Scrum methodologies, design patterns (Singleton, Factory), enterprise architecture.

#### 4. Tiny Code Examples (The Scaffold Pattern)
```python
# Milestone 1: Verify data structures and main loop skeleton
tasks = []

print("=== PIPLEARN TASK MANAGER ===")
while True:
    command = input("Choose (add / list / quit): ").strip().lower()
    
    if command == "quit":
        print("Goodbye!")
        break
    elif command == "add":
        new_task = input("Task description: ")
        tasks.append(new_task)
        print(f"Added: '{new_task}'")
    elif command == "list":
        print("Your Tasks:")
        for idx, item in enumerate(tasks, 1):
            print(f"{idx}. {item}")
    else:
        print("Unknown command. Try again.")
```

#### 5. Common Beginner Mistakes
* Trying to write the entire program in one sitting before running it once.
* Panicking because they forgot syntax and assuming they aren't cut out for coding (normalizing searching documentation).
* Asking AI to write the whole project code instead of asking for targeted conceptual explanations.

#### 6. What the Learner Should Understand Before Continuing
* You are ready to build right now with variables, conditionals, loops, collections, and functions.
* Real programmers spend half their time reading documentation and debugging — struggle is part of the process.

#### 7. Estimated Reading Time
**5 minutes**

---

## Pedagogical Validation Checklist
* [x] **Zero Fluff:** No historical retrospectives, installation trivia, or theoretical digressions.
* [x] **No Textbook Paralysis:** Method lists are strictly bounded; documentation literacy is prioritized over memorization.
* [x] **Hands-on from Minute 10:** Learner executes their first code in Section 02.
* [x] **Debugging First-Class Citizen:** Section 09 gives a structured 7-step protocol so errors become actionable feedback rather than brick walls.
* [x] **Clear Boundary with Project Phase:** Explicitly lists what is deferred so learners feel confident with the minimum viable toolset.
