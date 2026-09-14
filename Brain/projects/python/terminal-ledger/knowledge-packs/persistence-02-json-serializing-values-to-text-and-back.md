---
title: "Persistence 02 — JSON: Serializing Values to Text and Back"
pack: "Persistence 02"
phase: "03"
estimated_time: "15–20 minutes"
prerequisites: "Persistence 01 (files, modes, with); Starting Manual Sections 06, 07, 09, 10 (dictionaries, loops, tracebacks, imports and signature reading)"
outcomes:
  - "Explain why structured program state needs a text representation before it can be stored in a file"
  - "Describe serialization and deserialization as the two directions of one translation"
  - "Store Python values in a file with json.dump() and load them back with json.load()"
  - "Inspect raw stored JSON text and identify its correspondence with the Python value"
  - "Inspect the loaded Python value and its type with type() as evidence"
  - "Distinguish the file-based APIs (dump/load) from the string-based APIs (dumps/loads) by reading their signatures"
  - "Observe a JSONDecodeError as evidence that stored text is not valid JSON"
---

## 1. Structured State Needs a Stored Representation

Plain text files work when data *is* lines of text. But program state is usually structured: records with named fields, mixing text and numbers. Store that as bare lines and your program must invent private conventions for telling fields apart—and obey those conventions perfectly on the way back in. Every invented rule is one more thing to get wrong.

The general problem has a name: **serialization**—turning program values into text to store—and **deserialization**, turning that text back into values. You could invent your own format. You do not need to.

## 2. JSON Is Text With Rules

**JSON** (JavaScript Object Notation) is a small, language-independent text format for structured values: lists, dictionaries with string keys, text, numbers, true/false values, each with a fixed written form. The rules are fixed and documented. Any program that follows them can write JSON and read it back—including yours, months from now.

Python ships a standard library module for this:

* `import json` makes it available.
* **`json.dump(value, file_object)`** writes JSON text for a value into an open file—serialization.
* **`json.load(file_object)`** reads that text and returns the Python value it describes—deserialization.

## 3. Saving a Structured Value

A book catalog is structured state: a list of records, each with named fields mixing text and numbers.

```python
import json

catalog = [
    {"title": "The Hobbit", "author": "Tolkien", "pages": 310},
    {"title": "Dune", "author": "Herbert", "pages": 412}
]

with open("book_catalog.json", "w") as catalog_file:
    json.dump(catalog, catalog_file)
```

Nothing prints. The evidence is on disk. Open `book_catalog.json` in your editor:

```text
[{"title": "The Hobbit", "author": "Tolkien", "pages": 310}, {"title": "Dune", "author": "Herbert", "pages": 412}]
```

**JSON is text.** Your structured value now exists as characters on disk—readable by you, decodable by `json` next run. Compare the raw text with the Python value: the list's brackets, the dictionary's braces, the quoted keys, the bare numbers—each corresponds to part of the value.

## 4. Loading It Back

A new process—or a separate program—can deserialize:

```python
import json

with open("book_catalog.json", "r") as catalog_file:
    loaded = json.load(catalog_file)

print(type(loaded))
print(loaded[0]["title"])
```

```terminal
<class 'list'>
The Hobbit
```

The loaded value is a list of dictionaries. Inspect both the raw text on disk (read it with your own eyes) and `type(loaded)` to confirm what came back. It is fresh values of the same shape—proven by evidence.

## 5. What Survives the Round Trip

For basic values, the round trip is faithful:

* **Lists** come back as lists.
* **Dictionaries** come back as dictionaries, with keys as strings (JSON writes every key as text).
* **Strings, integers, floats, booleans** come back with the same values.

Do not over-generalize: some Python values have no JSON form, and attempting to serialize one raises an error. Every value in these examples—ordinary records of text and numbers—round-trips cleanly. JSON spells booleans and nulls lowercase (`true`, `false`, `null`); Python's module translates both directions.

## 6. File APIs Versus String APIs

Read the four functions side by side:

```text
json.dump(value, file_object)      writes JSON text for value into the file
json.dumps(value) -> str           returns the JSON text as a Python string
json.load(file_object) -> value    reads the file's text and returns the value
json.loads(text) -> value          parses a string of JSON text into a value
```

The trailing `s` stands for **string**. The file pair (`dump`/`load`) connects to open files—the direct route for saving and loading. The string pair (`dumps`/`loads`) performs the same translation on text you hold in memory, which is useful as an inspection tool:

```python
text = json.dumps(catalog)
print(text)
print(type(text))
```

```terminal
[{"title": "The Hobbit", ...}, ...]
<class 'str'>
```

Seeing your structured value printed as one string, with `type()` confirming it is a `str`, makes the model physical: JSON *is* text. For your project's save-and-load, the file-based pair is the natural mechanism. The string pair is a lens for understanding what happens inside it.

## 7. Controlled Failure: Text That Is Not JSON

What does `json.load()` do with a file of plain text? Your `reading_list.txt` from Persistence 01 is a useful specimen:

```python
import json

with open("reading_list.txt", "r") as book_file:
    loaded = json.load(book_file)
```

```terminal
Traceback (most recent call last):
  File "decode_fail.py", line 4, in <module>
    loaded = json.load(book_file)
json.decoder.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
```

*(Traceback excerpt — the full output also traces through the `json` module's internal frames. The evidence this lesson needs is on the final line.)*

Read it bottom-up:

* **`json.decoder.JSONDecodeError`** — the text could not be interpreted as JSON.
* **The message** — it names where in the text the interpretation failed.

This is evidence, not a mystery: the file existed, the reading succeeded, and the *format* of the contents is not JSON. This pack stops here. Recovery from damaged or wrong-shaped stored data is outside this pack's scope.

## 8. Experiments

### Experiment 1 — The Full Round Trip, in Two Processes

Create `save_catalog.py` that defines a catalog of at least three books and writes it with `json.dump()`. Create `load_catalog.py` that opens the same file, prints `type()` of the loaded value, then accesses one field of one record.

1. **Predict:** what `type()` prints and which title the field access shows.
2. **Run** the saver, then the loader.
3. **Explain:** which process serialized, which deserialized, and what carried the data between them.

### Experiment 2 — Read the Text, Then Edit by Hand

Open your stored catalog file in a text editor.

1. **Identify** in the raw text: the list's brackets, a record's braces, a quoted key, a bare number.
2. Change one value by hand—a page count, a title—and save.
3. **Run** the loader again. Explain what changed and which version is ground truth.

### Experiment 3 — The String Pair

1. Print `json.dumps(catalog)` and the `type()` of what it returned.
2. Pass that same text to `json.loads()` and compare the result with the original catalog using `==`.
3. **Predict before running:** `True` or `False`? Explain what equality means here.

### Experiment 4 — Evidence, Not Mystery

Point `json.load()` at the plain-text file from Persistence 01.

1. **Predict** the exception type and roughly what the message names.
2. **Run** and read the traceback bottom-up.
3. **Explain** what the exception is evidence of.

## 9. Common Mistakes

* **Forgetting `import json`** — the module is standard library, not automatic.
* **Swapping the arguments of `dump`** — value comes first, open file second. Read the signature.
* **Using a file against its mode** — `json.load()` on a file opened for writing fails with `io.UnsupportedOperation`.
* **Expecting the file-object variable to hold the data** — it holds the connection; the loaded *return value* holds the data. Capture it.
* **Assuming the loaded value is "the same objects"** — it is fresh values of the same shape. `type()` and printing prove the round trip.
* **Treating `JSONDecodeError` as something to silence** — it is information. Recovery from damaged storage is outside this pack's scope.

## 10. What This Pack Does Not Cover

* **Recovery from damaged, empty, or wrong-shaped stored files** — outside this pack's scope.
* **Dates, custom classes, or values without a JSON form** — this pack's claims are scoped to the basic values shown.
* **Dictionary methods beyond bracket access** — what your data looks like is your design.
* **Pretty-printing, CSV, databases, or formats other than JSON.**
* **Appending to stored data** — how saving and updating work together is your design decision.

## 11. Reading the Documentation

The `json` documentation lists four functions in one table. Read them as you learned in the Starting Manual:

1. What does each expect — a value, a file object, or a string?
2. What does each return — nothing useful, text, or a Python value?
3. What can go wrong — which exceptions appear?

The conversion table—which Python types become which JSON spellings—is the ground truth behind Section 5's claims about what survives the round trip.

## 12. Debugging Checklist

* Look at the raw stored text in an editor first — that is ground truth.
* After `json.load()`, print the loaded value and its `type()`.
* Right after startup, show the program's working state. If the screen disagrees with the file, loaded data and working state are not connected.
* `JSONDecodeError`? The text is not valid JSON; the message names where interpretation failed. Evidence of the stored text's format — recovery is outside this pack's scope.
* `io.UnsupportedOperation`? File mode and operation disagree.
* `TypeError` while dumping? The value has no JSON form.

## 13. Where This Fits Your Project

JSON is your project's designated storage format: human-readable, standard-library-backed, the honest next step from plain text. What the format does not decide is your program's design — what your data looks like inside the JSON, what the file is called, when saving happens, and how the first run is handled. Those are the design decisions your milestone brief walks through.
