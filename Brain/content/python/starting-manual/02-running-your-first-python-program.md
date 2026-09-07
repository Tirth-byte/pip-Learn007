---
title: "Running Your First Python Program"
section: "02"
estimated_time: "15–20 minutes"
prerequisites: "Section 01 — What Programming Actually Is"
outcomes:
  - "Distinguish between Python source code and the terminal commands used to run it"
  - "Understand what a .py file represents as a saved plain text document"
  - "Run a Python file from the terminal and inspect its output"
  - "Understand the importance of the terminal's current directory when referencing files"
  - "Apply the write → save → run → observe development loop to modify code"
  - "Interpret an initial SyntaxError traceback to locate and fix broken code"
---

## 1. The Four Pieces of the Puzzle

In Section 01, you learned that a program is an ordered sequence of instructions operating on data. To make that model real, you need to understand how four separate pieces interact when you build software:

1. **The Source File:** A plain text document saved on your computer, conventionally ending in `.py`, containing the instructions you wrote.
2. **Python:** The program installed on your computer that reads your source file, translates its written statements, and carries them out.
3. **The Terminal:** The text-based window where you type commands to interact with your system and launch programs.
4. **The Program Output:** The text or results produced by your running instructions, printed back into your terminal window.

The relationship flows in one direction:

```text
source file (.py)
      ↓
Python executes it
      ↓
program behavior / output
```

Beginners often imagine that writing code in an editor is the same as running it. It is not. Writing source code simply creates a saved script of instructions. Nothing happens until you explicitly tell Python to execute that script.

---

## 2. Source Code vs. Terminal Commands

The single most common source of confusion for beginners is mixing up source code with terminal commands.

* **Source code** is written *inside* your Python file. It is written in Python syntax.
* **Terminal commands** are typed *into* your terminal prompt. The terminal is where you type commands to interact with your system and launch programs.

Consider this instruction:

```python
print("Hello")
```

This is **Python source code**. It belongs inside a file saved on your hard drive (such as `hello.py`). If you type `print("Hello")` directly into a standard terminal prompt, your system will not understand it.

Now consider this command:

```bash
python3 hello.py
```

This is a **terminal command**. It tells your system: *"Find the Python program, and tell it to run the file named `hello.py`."* This command is typed into your terminal, never written inside your Python source file.

### A Note on Terminal Prompts and Python Commands

In technical documentation, terminal examples often start with a dollar sign:

```terminal
$ python3 hello.py
```

The `$` symbol represents the **terminal prompt**—the marker printed by your terminal showing that it is waiting for your input. **Do not type the `$` symbol.** You only type what follows it: `python3 hello.py`.

Depending on how Python was installed on your computer, the command used to launch Python may be `python3` or `python`:

* On macOS and Linux, the command is usually `python3`.
* On Windows, the command is frequently `python` (or `py`).

Throughout this manual, examples use `python3`. If your system uses `python`, substitute that command. The underlying behavior is identical.

---

## 3. Creating and Saving the File: hello.py

A Python program is not a proprietary file format. It is plain text, identical to a simple note, saved with the file extension `.py`. The extension tells you, your text editor, and your operating system that the file contains Python instructions.

Create a new file in your text editor and name it:

`hello.py`

Inside that file, write this single line:

```python
print("Hello")
```

Now, **save the file**.

Saving is not an optional detail. Python cannot see what is unsaved in your editor's memory. When you tell Python to run `hello.py`, it opens the file stored on your disk. If you type code in your editor but do not save it, Python will execute whatever was last written to the disk, ignoring your unsaved changes.

---

## 4. Where the Terminal Stands: The Current Directory

Before running your file, there is one critical concept to understand about the terminal: **the current working directory**.

Whenever your terminal window is open, it is "standing" inside a specific folder on your computer.

When you enter:

```terminal
$ python3 hello.py
```

Python resolves `hello.py` relative to the terminal's current working directory. For now, the simplest workflow is to run the command from the folder that contains `hello.py`.

If `hello.py` was saved in your `projects` folder, but your terminal is standing in your `Downloads` folder, Python will report an error:

```text
python3: can't open file 'hello.py': [Errno 2] No such file or directory
```

That error does not mean your code is broken. It means Python looked in the folder where the terminal was standing and could not find a file with that name.

To verify where your terminal is currently standing:

* On macOS and Linux, type `pwd` (print working directory) and press <kbd>Enter</kbd>. To see the files in that folder, type `ls`.
* On Windows, type `cd` and press <kbd>Enter</kbd>. To see the files in that folder, type `dir`.

For this chapter, make sure your terminal is opened in the folder where you saved `hello.py` before running the command.

---

## 5. Your First Execution

With `hello.py` saved and your terminal open in that folder, execute the program.

Type this command into your terminal and press <kbd>Enter</kbd>:

```terminal
$ python3 hello.py
```

Your screen will display:

```terminal
$ python3 hello.py
Hello
```

Examine the two lines closely:

* `python3 hello.py` is the **command** you typed.
* `Hello` is the **output** produced by your program.

When you pressed <kbd>Enter</kbd>, several events occurred in sequence:

1. The terminal received your command and located the Python program.
2. Python opened `hello.py` from disk and read line 1.
3. Python encountered `print("Hello")`, which instructed it to display the text `Hello`.
4. Python printed `Hello` into your terminal window.
5. Having reached the end of the file, Python exited, and the terminal returned its prompt, ready for your next command.

You have written, saved, and executed a program.

---

## 6. The Edit-Save-Run Loop

Software development is not a single act of writing code; it is an iterative cycle.

Open `hello.py` again in your editor. Modify the file so it contains two lines:

```python
print("Hello")
print("I changed the program.")
```

Before saving, switch to your terminal and run `python3 hello.py` again.

Notice what happens: the terminal prints only `Hello`. The second line did not run because it exists only in your editor's temporary buffer, not on disk.

Now, return to your editor and **save the file**.

Switch back to the terminal and run the command again:

```terminal
$ python3 hello.py
Hello
I changed the program.
```

The output changed immediately. Both instructions executed in order, from top to bottom.

This establishes the foundational loop of programming:

```text
WRITE / CHANGE
      ↓
    SAVE
      ↓
    RUN
      ↓
  OBSERVE
      ↓
 CHANGE AGAIN
```

Editing source code does nothing to a program that has already finished running. To see the effect of your changes, you must save the file and run it again.

When you encounter unexpected behavior while building software, this loop becomes your primary tool: **change one thing, save, run again, and observe what changed.**

---

## 7. A First Encounter with Errors: SyntaxError

Programming is not about avoiding mistakes; it is about learning how Python communicates when it cannot proceed.

To run code, Python requires that instructions follow its grammatical rules, called **syntax**. When source code violates those rules, Python stops before running anything and reports a `SyntaxError`.

Make a deliberate mistake to see how this looks. Modify `hello.py` by removing the closing quotation mark on line 1:

```python
print("Hello)
print("I changed the program.")
```

Save the file and run it from your terminal:

```terminal
$ python3 hello.py
```

Python halts immediately and displays a message:

```text
  File "hello.py", line 1
    print("Hello)
          ^
SyntaxError: unterminated string literal (detected at line 1)
```

This output is called a **traceback**. It is Python explaining why it refused to run your program.

Read it carefully from top to bottom:

1. **`File "hello.py", line 1`:** Python identifies the file and the line number where the breakdown occurred.
2. **`print("Hello)`:** Python displays the exact line of code it was trying to parse.
3. **`^` (The Caret):** Python places a pointer beneath the location where it noticed something was wrong.
4. **`SyntaxError: unterminated string literal (detected at line 1)`:** This is the specific error. In Python terminology, a piece of text wrapped in quotes is called a *string literal*. Python is saying: *"You opened a text literal with a quote, but reached the end of the line without closing it."*

Because this script contains invalid Python syntax, Python cannot begin executing it. Neither line 1 nor line 2 ran; execution never began.

Fix the mistake by restoring the closing quotation mark: `print("Hello")`. Save the file and run it again. The program runs cleanly once more.

---

## 8. Hands-on Experiments

Reinforce the connection between your source file, execution order, and terminal output by completing three short experiments.

### Experiment 1: Change the Message

Modify `hello.py` so line 1 displays your own custom phrase:

```python
print("System initialized.")
print("I changed the program.")
```

Before running: predict what the terminal will print.

Save the file, run `python3 hello.py`, and verify your prediction.

### Experiment 2: Add a Third Step

Add a third line to `hello.py`:

```python
print("System initialized.")
print("I changed the program.")
print("Execution complete.")
```

Before running: predict the exact order in which the three lines will appear.

Save the file, run the program, and observe the terminal. Notice that Python executes each instruction in order, printing line by line.

### Experiment 3: Reorder the Instructions

Swap line 1 and line 3:

```python
print("Execution complete.")
print("I changed the program.")
print("System initialized.")
```

Before running: predict the exact order in which the three messages will appear.

Save the file, run the program, and compare your prediction with the output. The instructions executed in their new order without hesitation. Python does not judge whether the sequence makes logical sense to a human; it follows the order written in the file.

---

## 9. Independent Application: Terminal Introduction

Put the complete workflow into practice by building a standalone script from scratch.

### The Objective

Create a new Python file named `intro.py` that displays a brief three-line introduction about yourself in the terminal.

### Requirements

1. Create a new file named `intro.py` in your working directory.
2. The program must print three distinct pieces of information, each on its own line:
   * Line 1: Your name or an alias.
   * Line 2: One thing you would like to build with software (for example: a small game, a music organizer, or a study timer).
   * Line 3: One practical reason you are learning to program.
3. Save the file.
4. Open your terminal, navigate to your working directory, and run `intro.py`.
5. Verify that all three lines print in the expected order without syntax errors.

### Socratic Self-Check

Once your program runs, verify your understanding:

* If you swap line 1 and line 2 in your editor, what must you do before the terminal reflects that change?
* If you deliberately remove the opening parenthesis `(` from line 3, what error does Python produce, and on what line does it report the issue?
* If someone asks you where `intro.py` runs, can you clearly explain the difference between the text editor, the terminal, and the Python runtime?

---

## 10. What You Understand Now

You have crossed the threshold from thinking about programming to physically executing code:

* **Source files are plain text:** Files ending in `.py` store your instructions on disk.
* **Source code and terminal commands are distinct:** Python code lives inside `.py` files; execution commands are typed into the terminal.
* **Saving bridges editor and execution:** Python executes the saved file on disk, not unsaved editor text.
* **Relative file references depend on the working directory:** When you run `python3 hello.py`, Python resolves `hello.py` relative to where your terminal is currently standing.
* **The core developer loop:** Write $\to$ Save $\to$ Run $\to$ Observe.
* **SyntaxErrors are diagnostic aids:** When code violates Python grammar, the traceback reports the file, line number, and exact reason execution could not begin.

In Section 01, you learned that programs manage data and remember values while running. In the next section, you will begin working with actual data: text, whole numbers, and decimals, and learn how programs store and label information using variables.

Next: **Section 03 — Values, Variables & Types**
