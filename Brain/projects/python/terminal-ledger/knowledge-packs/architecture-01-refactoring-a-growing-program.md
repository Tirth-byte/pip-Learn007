---
title: "Architecture 01 — Refactoring a Growing Program"
pack: "Architecture 01"
phase: "09"
estimated_time: "20–25 minutes"
prerequisites: "Starting Manual Section 03 (functions), Section 10 (modules, imports), and Phase 7/8 verification habits"
outcomes:
  - "Identify signs of structural friction in a working codebase"
  - "Apply disciplined, behavior-preserving refactoring with verification checkpoints"
  - "Understand the tradeoffs between a clean single file and a multi-file split"
  - "Import functions across learner-created Python files cleanly"
  - "Explain how if __name__ == '__main__': protects imported modules from running startup code"
---

## 1. The Weight of a Working Program

When you first begin a software project, your entire program fits on a single screen. You can hold all its variables, loops, and functions in your head simultaneously.

As the program acquires capabilities—saving to disk, validating bad input, filtering categories, tracking dates, monitoring thresholds, and generating reports—the codebase expands to several hundred lines. The program still works, but a new kind of friction appears:

- You spend noticeable time scrolling up and down looking for a specific function.
- A single function has accumulated several responsibilities (prompting the user, performing arithmetic, and formatting output).
- Changing one calculation requires scrolling past hundreds of lines of unrelated menu loops.
- You feel hesitant to touch working code for fear of accidentally breaking something elsewhere.

This is **structural friction**. The code is not broken, but it has become heavy to navigate and change.

## 2. What Refactoring Is (and What It Is Not)

**Refactoring** means restructuring existing code to make it cleaner, more readable, and easier to maintain **without changing its external observable behavior**.

Refactoring is governed by three strict principles:

1. **Refactoring is not feature work:** You do not add new user capabilities, change prompts, or alter data formats while refactoring. If you change behavior while moving code, you will not know whether a bug was caused by the new feature or the structural change.
2. **Behavior must be frozen first:** Before touching any code, run your verification checks and record known baseline outputs.
3. **One move at a time:** Move or clean up one function at a time. After every single move, rerun your checks to confirm that the program still behaves identically.

## 3. An Unrelated Example: The Growing Astronomy Log

Consider an astronomy logging script that has grown to 350 lines in a single file (`sky_tracker.py`). It tracks telescope observations, calculates planetary elevation angles, and prints observing summaries.

Currently, `sky_tracker.py` contains:
- Terminal input prompts and menus.
- Mathematical angle calculations.
- File loading and saving logic.
- Summary formatting routines.

Everything works, but calculations are tangled with `input()` prompts, making the math difficult to read and verify.

### Step 1: Extracting Pure Calculations

The first refactoring step does not require multiple files. Inside `sky_tracker.py`, we identify a function that mixes math with user input:

```python
# BEFORE: Mixed responsibilities
def record_observation():
    target = input("Target name: ")
    alt = float(input("Altitude degrees: "))
    # 15 lines of angle conversions and coordinate math mixed with prints...
    print(f"Recorded {target} at {corrected_alt}")
```

We refactor by separating the pure calculation from the terminal interaction:

```python
# AFTER: Separated responsibilities
def compute_corrected_altitude(altitude_deg, refraction_factor):
    # Pure calculation: inputs in, result out. No input(), no print().
    return altitude_deg - (0.017 / refraction_factor)

def record_observation():
    target = input("Target name: ")
    alt = float(input("Altitude degrees: "))
    corrected = compute_corrected_altitude(alt, 1.0)
    print(f"Recorded {target} at {corrected}")
```

Now `compute_corrected_altitude` can be read, understood, and checked in complete isolation. We run our existing checks to verify that the program behaves exactly as before.

## 4. Single-File Organization Versus Multi-File Splitting

Once functions have clear, single responsibilities, you face an architectural choice: **should the program remain a single file, or split across several files?**

**A well-organized single-file program is completely valid.** If your codebase is under 400–600 lines, keeping everything in one file with clear section banners (e.g. storage functions, calculation functions, user interface functions) avoids the overhead of managing multiple files.

Splitting into multiple files is justified **only when structural pain warrants it**:
- When distinct domains have grown large enough to stand on their own.
- When you want to import your calculation routines into a check script without running your terminal menus.
- When scrolling through unrelated code actively impedes your ability to think.

Never split code merely because you think "professional software has many files." A messy multi-file program is much harder to debug than a clean single-file program.

## 5. Splitting Code Across Your Own Files

Suppose the astronomy log calculations have grown substantial, and we decide to move pure calculation functions into an auxiliary file named `astronomy_math.py`.

In the same folder, we create `astronomy_math.py` containing only the math functions:

```python
# astronomy_math.py

def compute_corrected_altitude(altitude_deg, refraction_factor):
    return altitude_deg - (0.017 / refraction_factor)

def compute_airmass(zenith_angle):
    return 1.0 / (zenith_angle + 0.05)
```

Now, in our main application file `sky_tracker.py`, we import those functions:

```python
# sky_tracker.py
from astronomy_math import compute_corrected_altitude, compute_airmass

def record_observation():
    target = input("Target name: ")
    alt = float(input("Altitude degrees: "))
    corrected = compute_corrected_altitude(alt, 1.0)
    print(f"Recorded {target} at {corrected}")
```

When Python executes `from astronomy_math import ...`, it looks in the current working directory, finds `astronomy_math.py`, and brings those function names into `sky_tracker.py`.

## 6. The Import Trap: Module Execution

Here is a critical fact about Python imports: **importing a file executes all statements at the top level of that file.**

Consider what happens if `astronomy_math.py` contains startup code at the bottom of its file:

```python
# astronomy_math.py

def compute_corrected_altitude(altitude_deg, refraction_factor):
    return altitude_deg - (0.017 / refraction_factor)

# UNGUARDED STARTUP CODE:
print("Welcome to the Astronomy Math Tool!")
user_input = input("Enter an angle to test: ")
```

Now, when `sky_tracker.py` imports `compute_corrected_altitude`:

```python
# sky_tracker.py
from astronomy_math import compute_corrected_altitude
```

The moment Python reaches the `import` line, `astronomy_math.py` runs top to bottom. The terminal immediately prints `"Welcome to the Astronomy Math Tool!"` and pauses for input! The main application's startup is hijacked by the imported file.

## 7. The `if __name__ == "__main__":` Guard

To prevent imported files from running startup code upon import, Python provides the `__name__` variable.

Python sets the special variable `__name__` automatically for every module:

1. **Direct execution:** When you run a file directly from the terminal (`python sky_tracker.py`), Python sets `__name__` to the string `"__main__"`.
2. **Imported module:** When a file is imported by another file (`from astronomy_math import ...`), Python sets `__name__` to the module's actual name (`"astronomy_math"`).

We use this difference to guard startup code:

```python
# astronomy_math.py

def compute_corrected_altitude(altitude_deg, refraction_factor):
    return altitude_deg - (0.017 / refraction_factor)

if __name__ == "__main__":
    # This block runs ONLY when astronomy_math.py is executed directly:
    # python astronomy_math.py
    # It does NOT run when astronomy_math.py is imported!
    print("Testing astronomy math...")
    print("Result:", compute_corrected_altitude(45.0, 1.0))
```

Now:
- If a developer runs `python astronomy_math.py`, it executes the test block.
- If `sky_tracker.py` imports `astronomy_math`, `__name__` is `"astronomy_math"`, the condition evaluates to `False`, and the test code is quietly skipped.

The main entry point of your application should use this same guard:

```python
# sky_tracker.py
from astronomy_math import compute_corrected_altitude

def main():
    print("Starting Sky Tracker...")
    # main menu loop ...

if __name__ == "__main__":
    main()
```

## 8. Dependency Direction: Keeping Seams Clean

If you choose to split your program across files, observe a strict rule of **dependency direction**:

- **Helper modules** (such as calculation functions or storage utilities) must be independent. They should never import the main menu or user interface file.
- **The main entry point** imports the helper modules it needs to coordinate the program.

If File A imports File B, and File B imports File A, you create a **circular import**. Python will fail with an `ImportError` or `AttributeError` because neither file can finish initializing. Keep dependencies flowing in one direction: the main runner imports helpers; helpers never import the runner.

## 9. Controlled Experiments with Imports and `__name__`

Verify import mechanics in two tiny scratch files:

### File 1: `helper_demo.py`
```python
print(f"DEBUG: helper_demo loaded. __name__ is '{__name__}'")

def add_two(x):
    return x + 2

if __name__ == "__main__":
    print("DEBUG: helper_demo running directly!")
```

### File 2: `runner_demo.py`
```python
print(f"DEBUG: runner_demo starting. __name__ is '{__name__}'")
from helper_demo import add_two

print("Result of add_two(5):", add_two(5))
```

### Observation 1: Run helper directly
```bash
python helper_demo.py
```
*Output:*
```text
DEBUG: helper_demo loaded. __name__ is '__main__'
DEBUG: helper_demo running directly!
```

### Observation 2: Run runner
```bash
python runner_demo.py
```
*Output:*
```text
DEBUG: runner_demo starting. __name__ is '__main__'
DEBUG: helper_demo loaded. __name__ is 'helper_demo'
Result of add_two(5): 7
```
Notice that when `runner_demo.py` runs, `helper_demo`'s guarded block does **not** execute because its `__name__` is `'helper_demo'`, not `'__main__'`.

## 10. Common Architecture and Refactoring Mistakes

- **Refactoring without a verification baseline:** Changing code before verifying how it currently runs, making it impossible to know when a bug was introduced.
- **Adding features while refactoring:** Combining "cleaning up functions" with "adding a new report," creating tangled debugging sessions.
- **Over-splitting files:** Creating six tiny files for a 300-line program, making navigation more difficult rather than simpler.
- **Naming conflicts:** Naming your helper file the same as a Python standard library module (such as naming a file `csv.py` or `json.py`), which shadows the standard module and breaks all imports.
- **Circular imports:** Having helpers import the main program file.

## 11. Debugging Checklist

- Did you run all existing checks before beginning your refactor?
- Did you move one single function or section at a time?
- Are calculation functions pure (arguments in, values returned, no `input()` or `print()`)?
- Does every file with startup or test code protect it with `if __name__ == "__main__":`?
- Are helper module names distinct from Python standard library modules?
- Does the main entry point start cleanly from the terminal?

## 12. What This Pack Does Not Cover

- Object-oriented programming, class hierarchies, or inheritance.
- Design patterns (MVC, Factory, Observer).
- Complex Python package architecture with `__init__.py` sub-packages.
- Dependency injection frameworks or service locators.
- Terminal Ledger specific module layouts or file naming schemes.

## 13. Where This Fits Your Project

Your application has reached its complete functional scope. This pack provides the discipline to clean and organize that codebase without risking breakage. Whether your program remains an impeccably organized single file or splits into a clean multi-file structure, you have the tools to ensure its architecture is understandable and durable.
