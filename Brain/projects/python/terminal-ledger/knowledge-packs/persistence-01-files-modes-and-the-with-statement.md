---
title: "Persistence 01 — Files, Modes, and the `with` Statement"
pack: "Persistence 01"
phase: "03"
estimated_time: "12–18 minutes"
prerequisites: "Starting Manual Sections 03, 09, 10 (types, tracebacks, basic try/except, imports and signature reading)"
outcomes:
  - "Explain why values in program memory disappear when the process ends, and why a file does not"
  - "Open a text file for reading, read its contents with read(), and close it"
  - "Open a text file for writing, write strings into it, and close it"
  - "Predict and verify what write mode does to a file that already has content"
  - "Use the with statement so the file is closed deterministically when the block ends"
  - "Read a FileNotFoundError traceback and identify the file the program was looking for"
---

## 1. Memory Disappears, Files Do Not

Every value your programs use—variables, lists, dictionaries—lives in memory. Memory is temporary: when the process ends, it is released. Your program forgets everything.

A file is different. A file is text on disk, belonging to no single process, surviving until you delete it by hand. If your program can write values into a file and read them back later, its state can outlive the process that created it.

## 2. The Model: Open, Use, Close

Your program cannot touch the disk directly. It asks the operating system, through Python, to **open** a file—to connect your process to a file on disk. Opening produces a **file object**, a value your program holds. Reading and writing move **text** through that connection. When done, the file is **closed**, and the connection is released.

The three steps—open, use, close—are the lifecycle of every file operation.

## 3. Reading Text

Create `reading_list.txt` with two book titles on separate lines. This program opens and reads it:

```python
book_file = open("reading_list.txt", "r")
contents = book_file.read()
book_file.close()
print(contents)
```

The file's contents print. `read()` returns one string, with `\n` where lines break. Print `type(contents)` and you see `<class 'str'>`.

- `"r"` means read mode.
- `read()` gives you everything as a single string.
- `close()` ends the connection.

## 4. Writing Text

Write mode `"w"` opens a file for writing:

```python
book_file = open("reading_list.txt", "w")
book_file.write("Dune\n")
book_file.write("Foundation\n")
book_file.close()
```

Two things to notice:

- `write()` adds no newline. You must include `\n` yourself.
- Write mode **replaces** the file's contents. If the file already exists, `"w"` empties it before you write anything new.

## 5. Write Mode Replaces

If a file contains text and you open it in write mode, the old text is gone before you write anything:

```python
book_file = open("reading_list.txt", "w")
book_file.write("Dune")
book_file.close()
```

Result: the file contains only "Dune". The previous lines vanished when `"w"` opened the file. This is the behavior that causes data-loss bugs—a save replaced everything instead of preserving the old content alongside the new.

## 6. The `with` Statement

Closing files by hand is error-prone. If you forget `close()`, the file stays open in a state that is hard to predict. The `with` statement manages this for you:

```python
with open("reading_list.txt", "r") as book_file:
    contents = book_file.read()

print(contents)
```

When the `with` block ends—whether normally or because an exception occurred—the file is closed automatically. No manual `close()` needed. Prefer `with` for all file operations.

## 7. Missing Files: FileNotFoundError

Attempt to read a file that does not exist:

```python
book_file = open("unknown_file.txt", "r")
```

```terminal
Traceback (most recent call last):
  File "missing.py", line 1, in <module>
    book_file = open("unknown_file.txt", "r")
FileNotFoundError: [Errno 2] No such file or directory: 'unknown_file.txt'
```

Read the traceback from the bottom up. The exception type names the problem: `FileNotFoundError`. The message names the exact file the program looked for. Read mode does not create files; `"r"` opens what exists, and `"w"` creates what does not.

This exception is natural evidence: the file is absent, the program tells you which one, and you can decide what to do about it.

## 8. Experiments

### Experiment 1 — Persist Across Processes

Create `save_titles.py` that writes two book titles to a file, each ending with `\n`. Create a separate `load_titles.py` that opens the same file, prints its contents, and prints `type()` of what `read()` returned.

1. **Predict:** What will the second program print, and what type will the result show?
2. **Run** the saver, then the loader.
3. **Explain:** Which program wrote the data, which read it, and what carried the information between two separate processes?

### Experiment 2 — Write Mode Replaces, Verified

Start with a file containing multiple lines of text. Write a program that opens it in write mode and writes one new line.

1. **Predict:** What will the file contain after the write?
2. **Run** the program and open the file in your editor.
3. **Explain:** When did the old content disappear—after the write, or when the file was opened?

### Experiment 3 — With Closes the File

Inside a `with` block, open a file and read its contents, then print them. After the block ends, attempt to call `read()` again on the same file object.

1. **Predict:** What will the second `read()` do?
2. **Run** and read the traceback from the bottom up.
3. **Explain:** What does this prove about when `with` closes the file?

### Experiment 4 — Missing File Evidence

Write a program that attempts to open a file you never create.

1. **Predict:** What exception type will be raised, and what will the message name?
2. **Run** and verify against your prediction.
3. **Explain:** How would you confirm the file is genuinely absent rather than just misnamed?

## 9. Common Mistakes

* **Forgetting the mode:** `open()` defaults to read mode, so `open("notes.txt")` reads and fails with `FileNotFoundError` if the file is absent.
* **Expecting `write()` to add newlines:** `print()` does; `write()` does not. Without `\n`, everything lands on one line.
* **Using a file against its mode:** calling `write()` on a file opened in read mode raises `io.UnsupportedOperation`.
* **Confusing file name with file object:** `"reading_list.txt"` names the file; `book_file` is the connection to it.
* **Expecting write mode to add:** it replaces. To keep old content, you must write everything you want the file to contain.
* **Forgetting `close()`:** prefer `with`—the block makes the file's lifetime visible and closing cannot be forgotten.

## 10. What This Pack Does Not Cover

* **JSON and structured values.** This pack works with plain text only. The next pack handles structured data.
* **Handling the missing-file failure.** The exception is evidence. What your program does about it is a design decision made in your project brief.
* **Damaged or empty files.** Outside this pack's scope.
* **Append mode, pathlib, or the os module.** Not needed for this capability.
* **Binary files or encodings beyond the default.**

## 11. Reading the Documentation

The official documentation shows `open()` with a signature. Simplified to what you need:

```text
open(file, mode='r', ...) -> file object
```

- `file` — required: the name of the file as a string.
- `mode='r'` — optional with a default: supply no mode and you get read mode.
- The return: a file object, a value your program holds, connected to the file on disk.

Ask the three standard questions: What does it expect (a string for the file name, a mode character)? What does it return (a file object)? What can go wrong (`FileNotFoundError` when reading a missing file, `io.UnsupportedOperation` when mode and operation disagree)? The documentation's table of mode characters is worth one read—it shows what `"r"`, `"w"`, and other modes do.

## 12. Debugging Checklist

* Open the file in your editor—the raw text is ground truth.
* Unsure what `read()` returned? Print it and its `type()`.
* `FileNotFoundError`? The message names the exact file the program looked for.
* `io.UnsupportedOperation`? The mode and the operation disagree.
* File looks unchanged after a write? Did the write run, is the name correct, and did the file close?

## 13. Where This Fits Your Project

Files store text. Your program's state is structured—collections, named fields, mixed types. Plain text is not enough to carry it faithfully. The next pack teaches the translation between structured values and file text. This pack gives you the mechanism: open, read, write, close—and the evidence trail when any of it misbehaves.
