---
title: "Functions"
section: "08"
estimated_time: "20–25 minutes"
prerequisites: "Section 07 — Repeating Work"
outcomes:
  - "Explain how functions can reduce duplicated logic"
  - "Define a function to organize related instructions"
  - "Distinguish between defining a function and executing a function call"
  - "Trace the sequence of execution when a function is called"
  - "Differentiate between a parameter and an argument"
  - "Pass multiple arguments into a function"
  - "Distinguish between printing data to the screen and returning a value"
  - "Trace how a returned value is passed back to the caller"
  - "Identify basic local scope boundaries for variables assigned inside a function"
  - "Define and use a function with a default parameter"
---

## 1. The Limitation of Duplicated Logic

In Section 07, you used loops to execute the same instructions repeatedly. A loop answers the need to "repeat this operation across values or while a condition holds."

However, some tasks require identical logic at completely different points in a program. In these situations, you are not repeating instructions immediately one after another; you are needing the same behavior in different places.

Consider a script that calculates sales tax for different purchases at different times:

```python
order_one = 50
tax_one = order_one * 0.08
total_one = order_one + tax_one
print("Total:", total_one)

# Later in the program...
order_two = 120
tax_two = order_two * 0.08
total_two = order_two + tax_two
print("Total:", total_two)
```

This manual repetition introduces several problems:

* **Maintenance burden:** If the tax formula changed, how many duplicated places would you need to inspect and update? If a program has fifty calculations, finding them all is tedious.
* **Risk of error:** Duplicating code often leads to missed updates, where one calculation uses the old rate and another uses the new rate.
* **Visual clutter:** The core logic of the program is obscured by identical calculation blocks.

Programs need a way to organize related instructions once, give them a name, and allow reusable behavior whenever needed. A function answers the need to "give this behavior a name so it can be called when needed."

That mechanism is the **function**.

---

## 2. Defining Your First Function

A function is a named block of code that organizes related instructions. Creating one involves the `def` keyword.

Create `first_function.py`:

```python
def show_welcome():
    print("Welcome to the system.")
    print("Please log in.")

print("Starting program...")
show_welcome()
print("Program complete.")
```

Look closely at the definition syntax:
* `def` tells Python you are defining a function.
* `show_welcome` is the function name chosen by the programmer.
* The empty parentheses `()` mean this function currently accepts no parameters.
* The colon `:` begins the body.
* The indentation marks statements belonging to the function.

Run the script:

```terminal
$ python3 first_function.py
Starting program...
Welcome to the system.
Please log in.
Program complete.
```

### Definition vs. Execution

When Python executes a function definition, the function becomes available for later calls. Its body is not executed merely because the definition was encountered. 

Consider this sequence:

```python
print("Before")

def show_message():
    print("Inside function")

print("After definition")
show_message()
print("Finished")
```

The output reveals the exact execution sequence:

```text
Before
After definition
Inside function
Finished
```

Predict what happens if you remove the line `show_message()` from the script. Because the call is removed, the text `"Inside function"` does not appear in the output. Defining a function makes it available; a call requests the execution of its body. 

Defining a function is not the same as executing its body. The instructions execute only when you **call** the function by writing its name followed by parentheses. 

---

## 3. Explicit Function Call Trace

To understand how execution enters the function body and then continues after the call, trace this sequence:

```python
def announce():
    print("Starting task")
    print("Task ready")

print("A")
announce()
print("B")
```

The trace:

1. Python executes the function definition.
2. Python prints `A`.
3. `announce()` is called.
4. The function body executes (`Starting task` and `Task ready`).
5. The function finishes.
6. Execution continues after the call.
7. Python prints `B`.

When a function call is encountered, execution enters that function body. The statements there run in order. When the function finishes, execution continues directly after the call.

---

## 4. Passing Data In: Parameters and Arguments

A function that does the exact same thing every time is limited. One way to make a function adaptable is to let it accept input values.

```python
def calculate_tax(subtotal):
    tax_amount = subtotal * 0.08
    print("Tax:", tax_amount)

calculate_tax(100)
calculate_tax(250)
```

It is vital to distinguish between two concepts:

* **Parameter**: A name written in the function definition. It acts as a placeholder variable waiting to receive a value. In `def greet(student):`, `student` is the parameter.
* **Argument**: A value or expression supplied in a function call. In `greet("Iris")`, `"Iris"` is the argument.

When `calculate_tax(100)` is called, the parameter `subtotal` receives the value `100` for that call. Python runs the indented block using that value.

An argument does not need to be a literal string or number. It can also be the value of a variable:

```python
def greet(student):
    print("Hello", student)

target_person = "Iris"
greet(target_person)
```

The value of `target_person` (`"Iris"`) is supplied to the function as the argument. The parameter `student` receives `"Iris"` for that call. 

If you change the variable value (e.g., `target_person = "Noah"`) and rerun the script, you can observe that the function logic stays the exact same while the supplied value changes.

---

## 5. Multiple Parameters

Functions can accept more than one parameter by separating them with commas.

```python
def describe_item(name, price):
    print("Item:", name)
    print("Price:", price)

describe_item("Keyboard", 45)
```

Python maps arguments by position:
* The first argument (`"Keyboard"`) is supplied to the first parameter (`name`).
* The second argument (`45`) is supplied to the second parameter (`price`).

Predict the two outputs before running this script:

```python
def show_pair(first, second):
    print(first, second)

show_pair("A", "B")
show_pair("B", "A")
```

The position of the arguments strictly determines which parameter receives which value.

---

## 6. The Central Trap: print() vs. return

Beginners frequently confuse displaying a value on the screen with handing a value back to the program. 

Consider this function:

```python
# Example A
def show_total(a, b):
    print(a + b)

show_total(4, 6)
```

The purpose here is that a human sees the output. This displays `10`, but the function does not provide that computed value back to the caller. The calculation is trapped on the screen.

Now consider this alternative:

```python
# Example B
def calculate_total(a, b):
    return a + b

total = calculate_total(4, 6)
```

The purpose here is that the program receives the value. This functions differently:
* `print()` displays information to a human reader.
* `return` sends a value back to the caller so other code can use it.

Because `total` received the returned value, you can use that value in multiple ways:

```python
print(total)

if total >= 10:
    print("Large enough")
```

If the caller needs the computed value for later work, `return` provides that value directly. `return` does not mean "display"; it makes the value available to the caller.

---

## 7. Return Value Trace

To see exactly how a value moves from the function back to the main program, trace this example:

```python
def double(number):
    return number * 2

result = double(5)
print(result)
```

The trace:

1. `double(5)` calls the function.
2. `number` receives `5`.
3. `number * 2` produces `10`.
4. `return` sends `10` back to the call site.
5. `result` receives `10`.
6. `print(result)` displays `10`.

Now predict what happens in this variation:

```python
result = double(7)
```

* The parameter value becomes `7`.
* The returned value becomes `14`.
* The final value stored in `result` becomes `14`.

---

## 8. Return Ends the Current Function Call

When Python executes a `return` statement, that function call ends at that point. Instructions later in that function body are not executed during that call.

```python
def classify(score):
    if score >= 50:
        return "Pass"
    
    return "Review"

print(classify(72))
print(classify(40))
```

If `classify(72)` runs:
* `score >= 50` is `True`. 
* The function executes `return "Pass"`. 
* That function call ends at that point, sending back `"Pass"`.
* The line `return "Review"` is never reached during this call.

If `classify(40)` runs:
* `score >= 50` is `False`. 
* The function skips the `if` block.
* The function executes `return "Review"`, which ends the call and sends back `"Review"`.

---

## 9. Controlled Failure: Local Scope Boundaries

A variable assigned inside a function normally belongs to that function's local scope. Code outside the function should use a returned value rather than relying on that local name.

Create `scope_demo.py`:

```python
def calculate_total(price, quantity):
    total = price * quantity
    return total

calculate_total(12, 3)
print(total)
```

Run the script:

```terminal
$ python3 scope_demo.py
Traceback (most recent call last):
  File "scope_demo.py", line 6, in <module>
    print(total)
NameError: name 'total' is not defined
```

### Diagnosing the Problem

1. The failing line is `print(total)`.
2. The error is a `NameError`.
3. The missing name is `'total'`.
4. The variable `total` was assigned inside the function. `total` is valid while used inside `calculate_total`.
5. Outside the function, that local name is not available.

To fix this, outside code should receive the value through the `return` statement. The caller may store that returned value under a completely different name:

```python
def calculate_total(price, quantity):
    total = price * quantity
    return total

final_amount = calculate_total(12, 3)
print(final_amount)
```

The inside name is `total`. The outside name is `final_amount`. These names do not need to match. The `return` statement provides the needed value to the caller, allowing the caller to name the result whatever makes sense for its own logic.

---

## 10. Adding Flexibility With Default Parameters

A parameter can have a default value. When it does, the caller can omit the corresponding argument. The default belongs to the parameter definition.

```python
def greet(name, greeting="Hello"):
    print(greeting, name)
```

Before showing the output, predict which call uses the default and which call supplies the second argument:

```python
greet("Maya")
greet("Noah", "Welcome")
```

In this function:
* The default is used when the second argument is omitted (`greet("Maya")` prints `Hello Maya`).
* The supplied second argument replaces the default for that call (`greet("Noah", "Welcome")` prints `Welcome Noah`).

Defaults allow functions to be flexible while remaining easy to use for standard cases.

---

## 11. Combining Functions With Existing Concepts

Functions can work together with lists, loops, and conditions to organize complex behavior cleanly.

```python
def reading_status(reading):
    if reading >= 30:
        return "High"
    return "Normal"

readings = [12, 35, 18]

for reading in readings:
    status = reading_status(reading)
    print(reading, status)
```

This sequence combines your previous chapters into one execution model. Step-by-step trace for the item `35`:

1. The loop supplies `35` to the loop variable.
2. `reading_status(35)` is called.
3. The parameter `reading` receives `35`.
4. The condition `reading >= 30` is `True`.
5. `"High"` is returned to the caller.
6. The variable `status` receives `"High"`.
7. `print` displays the reading and its status.

---

## 12. Experiments

Reinforce your understanding by predicting outcomes before executing each script.

### Experiment 1 — Definition vs. Call

Create `exp1_definition.py`:

```python
def announce():
    print("Running")

print("Before")
announce()
print("After")
```

1. **Predict:** At what point does the function body execute? What is the exact sequence of output?
2. **Run:** Execute `python3 exp1_definition.py`.
3. **Observe:** Verify your output matches your prediction.
4. **Explain:** Explain why `"Running"` appears between `"Before"` and `"After"`, rather than at the top of the output where the function is defined.

---

### Experiment 2 — Parameters and Return

Create `exp2_return.py`:

```python
def multiply(a, b):
    return a * b

result = multiply(3, 4)

print(result)
print(result + 2)
```

1. **Predict:** What values will be printed? 
2. **Run:** Execute `python3 exp2_return.py`.
3. **Observe:** Verify the results are `12` and `14`.
4. **Explain:**
   * Explain the arguments supplied to the function.
   * Explain the parameter values received by the function.
   * Explain the returned value.
   * Explain why `result` can be reused in a subsequent calculation, whereas a `print(a * b)` inside the function would prevent that reuse.

---

### Experiment 3 — Local Variable

Create `exp3_scope.py`:

```python
def build_label(name):
    label = "User: " + name
    return label

output = build_label("Maya")
print(output)
```

1. **Predict:** What will the script output?
2. **Run:** Execute `python3 exp3_scope.py`.
3. **Observe:** Verify the output is `User: Maya`.
4. **Explain:** Why does outside code use the variable name `output` rather than `label` to print the result? What would happen if the outside code attempted to run `print(label)`?

---

## 13. Independent Application: Reading Toolkit

Create `reading_toolkit.py`. Write a program from scratch that meets these requirements:

1. Create a function named `classify_reading`.
2. It accepts one parameter named `reading`.
3. If `reading >= 30`, return `"High"`.
4. Otherwise return `"Normal"`.
5. Create a list containing at least four numeric readings.
6. Use a `for` loop to process every reading.
7. Call `classify_reading()` for each value.
8. Store the returned status.
9. Print the reading and its returned status.

Next, build a second utility:

10. Create a function named `calculate_total` that accepts two parameters.
11. Return their sum.
12. Call it with two numeric arguments.
13. Store and print the returned result.

Finally, build a third utility:

14. Create a function named `show_message` that accepts two parameters: `name` and `prefix`. Give `prefix` a default value of `"User"`.
15. Print the prefix and the name.
16. Call it once using only the required argument.
17. Call it again with both arguments.

Construct each statement directly using only the concepts learned so far. 

**Before you run it:** Review your code. You should be able to point to each function definition, each function call, each parameter, each argument, each returned value, and where the returned value is stored in the main program.

---

## 14. Common Mental Traps

Review these frequent beginner mistakes:

1. **Defining a function does not execute its body:** Python reads the `def` block to know the instructions, but execution waits for a call. Definition != Call.
2. **Forgetting `()` when intending to call a function:** Writing `show_message` without parentheses refers to the function but does not call it.
3. **Confusing parameter with argument:** A parameter is the placeholder name in the definition. An argument is the real value supplied during the call. Parameter != Argument.
4. **Passing the wrong number of arguments:** For the positional calls used in this section, each required parameter needs a corresponding argument. A parameter with a default can be omitted.
5. **Confusing `print()` with `return`:** `print()` displays information to a human. `return` sends data back to the program. Print != Return.
6. **Forgetting to store or use a returned value:** A function may return a value, but the caller still needs to use that returned value if it matters to the program.
7. **Trying to access a local variable outside its function:** Variables assigned inside a function belong to local scope and cannot be accessed directly by outside code. Local name != Caller's variable name.
8. **Assuming every function must return a useful value:** A function can perform an action without explicitly returning a useful value.

---

## 15. What You Understand Now and What Is Missing

You now combine a robust set of tools:

* Variables
* Input and output
* Decisions
* Collections
* Loops
* Functions

As programs gain more moving parts, guessing becomes a poor debugging strategy. Guessing random changes when an error appears is frustrating and rarely successful.

The next section introduces a systematic process for:
* Reading errors
* Locating the failing line
* Inspecting values and types
* Checking assumptions
* Changing one thing
* Rerunning

Next: **Section 09 — Errors & Debugging**
