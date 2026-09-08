---
title: "Modules, Packages & Reading Documentation"
section: "10"
estimated_time: "25–30 minutes"
prerequisites: "Section 09 — Errors & Debugging"
outcomes:
  - "Import built-in modules to access existing functionality"
  - "Distinguish between the standard library and third-party packages"
  - "Understand the difference between importing a module and calling a function"
  - "Choose between `import module` and `from module import function` based on clarity"
  - "Read basic function signatures to identify expected parameters and return values"
  - "Use `help()` to view documentation directly in Python"
  - "Test unfamiliar functions in isolation using the smallest working example"
---

## 1. You Do Not Need to Write Everything

Imagine you need to calculate the square root of a number. You could try to build the complex mathematical calculation manually. However, Python already provides a tested, reliable implementation.

```python
import math
result = math.sqrt(81)
print(result)
```

**Output:**
```terminal
9.0
```

You do not need to write every capability yourself. A significant part of programming is learning how to discover, import, and use functionality that is already available.

---

## 2. What a Module Is

A **module** is a Python file or built-in module that groups related names, such as functions and values.

Consider the `math` module:

```python
import math
math.sqrt(81)
```

* `math` identifies the imported module.
* `sqrt` is a function available from that module.
* `.` (the dot) accesses that name from the module.

By using the dot, you tell Python exactly where to look for the function.

---

## 3. Import Does Not Call the Function

A common point of confusion is what importing actually does. 

```python
import math
print("Ready")
```

Importing makes the module available to your program. It does not automatically execute functions like `math.sqrt()`. 

For the purpose of using `math`, the import makes its functions available to this program. Calling `math.sqrt(16)` is the separate step that asks for the calculation. This is the difference between having a tool available in your workspace and actually using it.

---

## 4. Calling Functions from a Module

To use a function from an imported module, you use the dotted call syntax: `module.function(arguments)`.

```python
import math

# Calculate square root
print(math.sqrt(81))

# Round up to the nearest integer
print(math.ceil(4.2))

# Round down to the nearest integer
print(math.floor(4.8))
```

**Output:**
```terminal
9.0
5
4
```

The goal is not to memorize every function in the `math` module. The goal is to understand how to read and use unfamiliar functionality when you need it.

---

## 5. `from ... import ...`

There is a second way to import functionality. You can import specific names directly.

```python
from math import sqrt

result = sqrt(81)
print(result)
```

Compare the two styles:

```python
# Style 1: Import the module
import math
math.sqrt(81)
```

```python
# Style 2: Import specific names
from math import sqrt
sqrt(81)
```

The practical difference is readability and clarity. `import math` keeps the source of the function visible at the call site (you see `math.sqrt` and know exactly where it came from). `from math import sqrt` gives direct access to that name, allowing you to just write `sqrt(81)`.

For beginners, `import math` is often clearer because the module name remains visible where the function is called.

---

## 6. The Standard Library

Python includes many useful modules with a normal Python installation. This collection is called the **standard library**. Many standard-library modules are available without installing a separate third-party package.

Examples by category:
* `math` — mathematical operations
* `random` — pseudo-random values
* `datetime` — dates and times
* `json` — working with JSON data format

When you need common functionality, check the standard library documentation first.

---

## 7. Third-Party Packages

Not everything useful ships with Python itself. Code distributed separately that can be installed into a Python environment is called a **third-party package**.

For example, `requests` is a third-party package distributed separately from Python. 

The conceptual workflow for using third-party packages is:
1. Discover the package.
2. Read the official package documentation.
3. Install the package into your environment.
4. Import it in your Python code.
5. Use its documented functionality.

---

## 8. What `pip` Is

`pip` is a tool commonly used to install Python packages into a Python environment.

```terminal
$ python3 -m pip install requests
```

Installing a package modifies your environment. Once installed, it remains available for Python scripts running in that environment to import.

---

## 9. Terminal Command vs. Python Code

You must explicitly separate terminal actions from Python code.

This is a **terminal command** used to modify your environment:
```terminal
$ python3 -m pip install requests
```

This is **Python code** written inside a `.py` file to use what is already installed:
```python
import requests
```

Do not type `pip` commands inside your `.py` files.

---

## 10. Reading Documentation

When you discover a new function, you need to extract answers from its documentation rather than guessing how it works.

To learn this, we will use a simplified documentation example that models how standard documentation is written.

**Simplified Notation:** `calculate_total(price, quantity=1)`

* `calculate_total` is the function name.
* `price` is a required parameter. The caller must provide this.
* `quantity=1` is a parameter with a default value. The caller may omit it, and the function will default to `1`.

Now look at the actual standard-library signature for square root:

`math.sqrt(x)`

* `math.sqrt` is the function.
* `x` is the single, required parameter.

---

## 11. How to Read a Signature

A signature is the compact function-call shape shown in documentation. When reading a signature like `sqrt(x)`, ask these questions systematically:

1. **What is the function called?** `sqrt`
2. **What input does it expect?** A number `x`.
3. **Which parameters are required?** `x` is required.
4. **Are any parameters optional/defaulted?** No.
5. **What does it return?** The square root of the input.
6. **What failure cases are mentioned?** The compact signature alone does not list every failure case. The surrounding documentation or an experiment can provide that information.

---

## 12. Parameters vs. Arguments

When reading documentation, remember the distinction between a parameter and an argument.

**Documentation shows the parameter:**
`sqrt(x)`
`x` is the parameter name chosen by the author of the module.

**Your code supplies the argument:**
`math.sqrt(81)`
`81` is the argument supplied by you, the caller.

---

## 13. Return Values

Documentation tells you what comes back from the function. 

If you look up `math.sqrt`, the documentation specifies that it returns the square root of the number as a float.

Prove this with evidence:
```python
import math

result = math.sqrt(81)
print(result)
print(type(result))
```

**Output:**
```terminal
9.0
<class 'float'>
```

The function executes, performs its internal calculation, and returns a float back to your variable `result`.

---

## 14. Smallest Working Example

When using unfamiliar code, do not immediately place it inside a large, complex program. This makes it harder to tell whether a failure comes from the unfamiliar functionality or from the surrounding program.

Instead, build a smallest working example:
1. Import the module in a blank file.
2. Call one function with simple, hardcoded input.
3. Print the result.
4. Inspect the type if it is useful evidence.
5. Confirm it behaves as the documentation stated.
6. Only then integrate it into your main program.

```python
import math

value = math.sqrt(25)
print(value)
print(type(value))
```

This gives you a smaller, clearer place to investigate unexpected behavior.

---

## 15. Documentation + Debugging Loop

When unfamiliar code raises an exception, combine the debugging protocol with the documentation.

Create `test_sqrt.py`:
```python
import math
math.sqrt("81")
```

If you run this, it raises a `TypeError`. The traceback points to the failing call, ending with the specific exception:

```terminal
TypeError: must be real number, not str
```

1. Read the exception: `TypeError: must be real number, not str`.
2. Locate the failing call: `math.sqrt("81")`.
3. Inspect arguments: `"81"` is a string.
4. Compare with documentation: `sqrt(x)` expects a number.
5. Make one change: pass the integer `81` instead of the string `"81"`.
6. Rerun.

Documentation provides the evidence for what input was actually expected.

---

## 16. Using help()

You can view documentation directly inside Python using the built-in `help()` function.

```python
import math
help(math.sqrt)
```

When you run this script, Python prints documentation available through `help()`:

```terminal
Help on built-in function sqrt in module math:

sqrt(x, /)
    Return the square root of x.
```

`help()` displays documentation available from Python itself. This is useful for quickly checking a function without opening separate documentation.

---

## 17. Experiments

Reinforce your understanding by predicting outcomes before executing each script.

### Experiment 1 — Import vs Call

Create `exp1_import.py`:
```python
import math
print("Before")
result = math.sqrt(36)
print(result)
```

1. **Predict:** What will this script print? Which line actually requests the calculation?
2. **Run:** Execute the script.
3. **Observe:** Verify the exact output.
4. **Explain:** Explain why importing `math` on line 1 does not execute a calculation immediately.

---

### Experiment 2 — Two Import Styles

Create `exp2_styles.py`:
```python
import math
print(math.sqrt(49))

from math import sqrt
print(sqrt(49))
```

1. **Predict:** Will the two `print` statements output the same value?
2. **Run:** Execute the script.
3. **Observe:** Compare the outputs.
4. **Explain:** Explain how the call syntax differs, and which version makes the source module more visible.

---

### Experiment 3 — Documentation Before Fixing

Create `exp3_fix.py`:
```python
import math
math.sqrt("64")
```

1. **Predict:** This will raise an exception.
2. **Run:** Execute the script and inspect the exact error.
3. **Observe:** Read the exception message and inspect the argument type.
4. **Explain:** Read the output of `help(math.sqrt)`, change one thing to satisfy the documented requirements, rerun the script, and explain why your fix worked.

---

## 18. Independent Application: Documentation Investigation

**Your Task:**
Investigate an unfamiliar standard-library function without being given the solution code.

1. Create a blank script.
2. Import the `math` module.
3. Use Python docs or `help(math.ceil)` to investigate the `ceil` function.
4. Write down its required input and return behavior.
5. Create the smallest possible test using a decimal value (e.g., `4.2`).
6. Print the returned value.
7. Print its type.
8. Change the input and predict the result before rerunning.
9. Explain in one or two sentences what `math.ceil` does based on your evidence.

When you finish, perform the exact same investigation for `math.floor`.

---

## 19. Common Mental Traps

Review these frequent beginner mistakes:

* **Guessing function usage instead of reading docs:** Trial-and-error with unfamiliar code causes unnecessary frustration.
* **Confusing terminal commands with Python code:** Package-installation commands such as `python3 -m pip install requests` run in the terminal. `import requests` is Python code.
* **Assuming import automatically calls a function:** Importing simply makes the tool available. You must still call it.
* **Confusing the module name with the function name:** `math` is the module; `sqrt` is the function inside it.
* **Forgetting the module prefix:** After `import math`, you must call `math.sqrt()`. Calling `sqrt()` directly will fail.
* **Assuming shorter import style is always better:** `from math import sqrt` is shorter, but `import math` is often clearer because it preserves context.
* **Installing a package before checking the standard library:** Python already includes many tools (like `math` and `json`) out of the box.
* **Copying documentation examples blindly:** Do not copy code without understanding the required inputs and what value will be returned.
* **Skipping the smallest working example:** Putting unfamiliar code directly into a large program makes it difficult to isolate failures.
* **Changing several arguments at once when debugging:** Always isolate your fixes based on documented evidence.

---

## 20. Next Steps

You now know enough Python to:
* Run programs
* Store and transform data
* Make decisions
* Work with collections
* Repeat work
* Define functions
* Debug failures
* Discover and test unfamiliar functionality through documentation

The next question is: "How do I turn all of this into a real piece of software?"

Next: **Section 11 — How to Start Building Software**
