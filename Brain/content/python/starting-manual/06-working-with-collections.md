---
title: "Working With Collections"
section: "06"
estimated_time: "20–25 minutes"
prerequisites: "Section 05 — Making Decisions"
outcomes:
  - "Explain why collections are necessary to organize related values"
  - "Create and inspect a Python list"
  - "Access list elements using zero-based indexing"
  - "Update an existing list element at a specific index"
  - "Add new elements to the end of a list using append()"
  - "Inspect collection size using len() and calculate valid index ranges"
  - "Read and diagnose an IndexError traceback"
  - "Create a dictionary to represent key-to-value relationships"
  - "Access, update, and add dictionary entries using keys"
  - "Choose appropriately between a list and a dictionary based on data role"
---

## 1. The Limitation of Individual Variables

In Section 05, you used conditions to govern program flow. Up to this point, every program stored each fact in its own independent variable.

Consider a program that tracks student scores:

```python
score1 = 88
score2 = 92
score3 = 79
score4 = 95
```

These values are related, but the program represents each one independently. As the amount of data grows, this approach breaks down:

* **More values require more separately managed names:** Managing thirty scores requires thirty distinct variable names written out in your code.
* **Accessing a particular value requires knowing which variable contains it:** To inspect a specific score, the code must hardcode that exact variable name. With separate variables, there is no single collection you can access by position.
* **The related values are not represented as one group:** `score1` and `score2` are separate variables; nothing in that representation groups the scores together as one collection.

A program needs a way to refer to a group of related values through a single name:

* **Single value** $\rightarrow$ variable
* **Many related values** $\rightarrow$ collection

A **collection** is a data structure that groups multiple values under one variable. In this section, you will learn two useful Python collection types: lists and dictionaries.

---

## 2. Your First List

A **list** is an ordered sequence of values. You create a list by enclosing values in square brackets (`[` and `]`), separated by commas:

```python
scores = [88, 92, 79, 95]
```

In this statement:
* `scores` is a single variable.
* Square brackets define the list.
* Commas separate the items.
* Each stored value is called an **element**.

Create `scores_list.py`:

```python
scores = [88, 92, 79, 95]

print(scores)
print(type(scores))
```

Run the script:

```terminal
$ python3 scores_list.py
[88, 92, 79, 95]
<class 'list'>
```

Python displays the full list and confirms its type: `<class 'list'>`.

In a list, **order matters**. The value `88` is first, followed by `92`, `79`, and `95`. Python preserves this exact sequence.

---

## 3. Lists Can Contain Different Types

Python permits lists with mixed types:

```python
example = ["Maya", 3, True]
```

While syntactically valid, arbitrary mixed collections are rarely useful. In real software, a list typically groups values that play a **similar role**:

* Temperatures: `[18.5, 20.1, 19.4]`
* Names: `["Alice", "Bob", "Charlie"]`
* Test scores: `[88, 92, 79, 95]`
* Sensor readings: `[102, 105, 99, 101]`

When items share a role, your program can process them with uniform expectations. A dictionary can be clearer when values represent distinct named attributes (such as a person with a name, an age, and an enrollment status).

---

## 4. Zero-Based Indexing

Because a list is ordered, Python identifies each element by its position. This position is called an **index**.

Python list indexes begin at 0:
* First element $\rightarrow$ index `0`
* Second element $\rightarrow$ index `1`
* Third element $\rightarrow$ index `2`

Consider:

```python
languages = ["Python", "JavaScript", "Go"]
```

The mapping between indexes and elements is:

| Index | Element |
| :--- | :--- |
| `0` | `"Python"` |
| `1` | `"JavaScript"` |
| `2` | `"Go"` |

An **index** is the position Python uses to locate an element.

To retrieve an element, place the index inside square brackets after the list name:

```python
languages = ["Python", "JavaScript", "Go"]

print(languages[0])
print(languages[2])
```

Predict the output before running:
* `languages[0]` locates the element at index `0`: `"Python"`.
* `languages[2]` locates the element at index `2`: `"Go"`.

Run `indexing.py`:

```terminal
$ python3 indexing.py
Python
Go
```

---

## 5. Updating a List Element

A list can be changed after it is created. You can replace an element at an existing index using the assignment operator (`=`):

```python
scores = [88, 92, 79]
scores[2] = 84
```

This instruction replaces the value stored at index `2` with `84`.

Create `update_list.py`:

```python
scores = [88, 92, 79]
print("Before:", scores)

scores[2] = 84
print("After:", scores)
```

Run the script:

```terminal
$ python3 update_list.py
Before: [88, 92, 79]
After: [88, 92, 84]
```

After the assignment, `scores` contains `[88, 92, 84]`. Only the element at index `2` changed, while indexes `0` and `1` remained untouched.

---

## 6. Adding Elements With append()

Assignment updates an index that already exists. To add a new element to the end of a list, use `append()`:

```python
tasks = ["Read docs", "Run program"]
tasks.append("Inspect output")
```

The `append()` method adds one element to the end of the existing list. The syntax `tasks.append(...)` means: call the `append` operation provided by this list.

Create `append_item.py`:

```python
tasks = ["Read docs", "Run program"]
print("Initial:", tasks)

tasks.append("Inspect output")
print("Updated:", tasks)
```

Run the script:

```terminal
$ python3 append_item.py
Initial: ['Read docs', 'Run program']
Updated: ['Read docs', 'Run program', 'Inspect output']
```

The list grew from two elements to three. The new element was placed at the end, occupying index `2`.

---

## 7. Inspecting List Length With len()

The built-in `len()` function returns the number of elements in a list:

```python
scores = [88, 92, 79, 95]
print(len(scores))
```

Run `list_length.py`:

```terminal
$ python3 list_length.py
4
```

### Length Versus Valid Indexes

Do not confuse a list's **length** with its **last valid index**.

Because counting starts at `0`, a list of length 4 contains elements at indexes:

```text
0, 1, 2, 3
```

There is no index `4`. The last valid index is always:

$$\text{last valid index} = \text{len} - 1$$

For a list of 4 items, the valid indexes are `0` through `3`.

---

## 8. Controlled Failure: IndexError

What happens when code requests an index that does not exist?

Create `index_error_demo.py`:

```python
languages = ["Python", "JavaScript", "Go"]
print(languages[3])
```

Run the script:

```terminal
$ python3 index_error_demo.py
Traceback (most recent call last):
  File "index_error_demo.py", line 2, in <module>
    print(languages[3])
          ~~~~~~~~~^^^
IndexError: list index out of range
```

### Diagnosing the Traceback

Inspect the error components:
1. **Failing line:** Line 2 attempted `print(languages[3])`.
2. **Exception name:** `IndexError`.
3. **Diagnostic message:** `list index out of range`.

The list `languages` contains 3 elements. Its valid indexes are `0`, `1`, and `2`. When line 2 requested index `3`, Python found no element at that position and halted execution.

The list exists, but the requested position does not.

---

## 9. Why a List Is Not Always Enough

Lists organize sequences where position is the primary identifier. But consider representing a single learner:
* Name: Maya
* Language: Python
* Completed projects: 2

You could store this in a list:

```python
learner = ["Maya", "Python", 2]
```

This creates several issues:
* **Unclear positions:** What does `learner[1]` represent? A reader must remember the positional convention.
* **Fragile ordering:** If you insert Maya's email at index `1`, every later index shifts, breaking existing code.
* **Mismatched semantics:** Maya's name does not precede her completed projects in an ordered sequence. They are distinct attributes of one entity.

When values represent different properties with distinct roles, meaningful labels are clearer than numeric positions.

This is the purpose of a **dictionary**.

---

## 10. Your First Dictionary

A **dictionary** stores values organized by **keys**.

Instead of locating values by numeric position (`0`, `1`, `2`), you locate values by descriptive labels.

You create a dictionary using curly braces (`{` and `}`). Inside, you write key-value pairs separated by a colon (`:`). Pairs are separated by commas:

```python
learner = {
    "name": "Maya",
    "language": "Python",
    "completed_projects": 2
}
```

In `"name": "Maya"`:
* `"name"` is the **key**.
* `"Maya"` is the **value**.

Create `learner_dict.py`:

```python
learner = {
    "name": "Maya",
    "language": "Python",
    "completed_projects": 2
}

print(learner)
print(type(learner))
```

Run the script:

```terminal
$ python3 learner_dict.py
{'name': 'Maya', 'language': 'Python', 'completed_projects': 2}
<class 'dict'>
```

Python displays the dictionary and confirms its type: `<class 'dict'>`.

---

## 11. Accessing Values by Key

To retrieve a value, provide its key inside square brackets:

```python
learner = {
    "name": "Maya",
    "language": "Python",
    "completed_projects": 2
}

print(learner["name"])
print(learner["completed_projects"])
```

Run `access_dict.py`:

```terminal
$ python3 access_dict.py
Maya
2
```

### The Central Distinction

Compare list access with dictionary access:

* **List:** Position $\rightarrow$ value (`scores[0]`)
* **Dictionary:** Key $\rightarrow$ value (`learner["name"]`)

Both use square brackets `[...]`, but a list accesses an element by an integer index, whereas this dictionary accesses an entry by its key.

---

## 12. Updating and Adding Dictionary Entries

Like lists, dictionaries can be modified during execution.

Using square-bracket assignment:
* If the key **already exists**, its value is updated.
* If the key **does not exist**, a new key-value pair is added.

Create `modify_dict.py`:

```python
learner = {
    "name": "Maya",
    "language": "Python",
    "completed_projects": 2
}

# Update an existing key
learner["completed_projects"] = 3

# Add a new key-value pair
learner["active"] = True

print(learner)
```

Run the script:

```terminal
$ python3 modify_dict.py
{'name': 'Maya', 'language': 'Python', 'completed_projects': 3, 'active': True}
```

The value associated with `"completed_projects"` changed from `2` to `3`. The new entry `"active": True` was added to the collection.

---

## 13. List or Dictionary?

Use these heuristics to decide which collection fits your data based on its access model:

### Use a List When:
* A sequence of related values is naturally accessed by position.
* Order matters (first, second, third).
* Elements represent multiple instances of the same kind of data (scores, names, temperatures).

### Use a Dictionary When:
* Values are more clearly identified by meaningful keys.
* Values represent distinct properties of a single entity (name, age, status).
* Lookup by label is clearer than counting positions.

Neither structure is universally better. Real programs use lists to organize sequences and dictionaries to organize labeled properties.

---

## 14. Experiments

Reinforce collection behavior by predicting, running, and explaining these three experiments.

### Experiment 1 — List Indexing and Length

Create `exp1_indexing.py`:

```python
languages = ["Python", "JavaScript", "Go"]

print(languages[0])
print(languages[2])
print(len(languages))
```

1. **Predict:** What exact values will each `print()` produce?
2. **Run:** Execute `python3 exp1_indexing.py`.
3. **Observe:**
   ```text
   Python
   Go
   3
   ```
4. **Explain:**
   * `languages[0]` outputs `"Python"`, the element at index `0`.
   * `languages[2]` outputs `"Go"`, the element at index `2`.
   * `len(languages)` reports `3`. The length is `3`, and the valid indexes are `0`, `1`, and `2`.

---

### Experiment 2 — Changing a List

Create `exp2_list_change.py`:

```python
scores = [10, 20, 30]

scores[1] = 25
scores.append(40)

print(scores)
print(len(scores))
```

1. **Predict:** What will `scores` contain when printed? What will `len(scores)` report?
2. **Run:** Execute `python3 exp2_list_change.py`.
3. **Observe:**
   ```text
   [10, 25, 30, 40]
   4
   ```
4. **Explain:**
   * `scores[1] = 25` replaced the value at index `1` (`20`) with `25`.
   * `scores.append(40)` placed `40` at the end.
   * `len(scores)` printed `4` because the list grew by one element.

---

### Experiment 3 — Dictionary State

Create `exp3_dict_state.py`:

```python
profile = {
    "name": "Maya",
    "level": 1
}

profile["level"] = 2
profile["active"] = True

print(profile["name"])
print(profile["level"])
print(profile["active"])
```

1. **Predict:** What will each `print()` statement output?
2. **Run:** Execute `python3 exp3_dict_state.py`.
3. **Observe:**
   ```text
   Maya
   2
   True
   ```
4. **Explain:**
   * `profile["name"]` was never reassigned; it remains `"Maya"`.
   * `profile["level"]` was updated from `1` to `2`.
   * `profile["active"]` was added with the value `True`.

---

## 15. Independent Application: Study Session Snapshot

Build a script that models a study session using both a list and a dictionary.

Create `study_session.py`. Write a program from scratch that meets these requirements:

### Requirements

1. **Create a topic list:**
   * Define a list named `topics` containing three study topics as strings (for example: `"Variables"`, `"Input"`, `"Decisions"`).

2. **Modify the list:**
   * Print the first topic using index `0`.
   * Update the second topic to a different topic name.
   * Use `append()` to add a fourth topic to the end of the list.
   * Print the total number of topics using `len()`.

3. **Create a session dictionary:**
   * Define a dictionary named `session` describing the study session with three keys:
     * `"learner"`: student name (string)
     * `"minutes"`: study duration (integer)
     * `"completed"`: session completion status (boolean)

4. **Modify the dictionary:**
   * Print the learner name by accessing the `"learner"` key.
   * Update `"minutes"` to a new integer value.
   * Add a new key named `"notes_taken"` with a boolean value of `True`.

5. **Display results:**
   * Print a readable summary using `print()` and values retrieved from your dictionary and list.
   * Print the final contents of both `topics` and `session`.

Do not use pre-written solutions or language features not yet covered. Construct each statement directly.

---

## 16. Common Mental Traps

Review these frequent beginner errors:

1. **The first index is `0`, not `1`:** Writing `items[1]` accesses the *second* element. Access the first element with `items[0]`.
2. **Length is not the last valid index:** In a list of length 4, the valid indexes are `0`, `1`, `2`, and `3`. Requesting `items[4]` causes an `IndexError`.
3. **Confusing dictionary keys with list indexes:** Dictionaries do not automatically number their entries. Accessing `profile[0]` looks for a literal key named `0`, not "the first entry."
4. **Forgetting quotes on dictionary keys:** In `learner["name"]`, `"name"` is a string. Writing `learner[name]` causes Python to look for a variable named `name`, producing a `NameError` if undefined.
5. **Updating an element changes the collection you inspect afterward:** After `scores[2] = 84`, printing `scores` shows the new value at index `2`.

---

## 17. What You Understand Now and What Is Missing

You have expanded how your programs organize data:

* **Lists preserve sequence:** You can group ordered elements, retrieve them by zero-based index, update existing positions, and add elements with `append()`.
* **Dictionaries preserve relationships:** You can store key-value pairs, accessing and updating data by meaningful labels rather than numeric offsets.
* **Collections scale storage:** A single variable can now manage an entire collection of related values.

### The Next Limitation: Repeating Instructions

Consider what you must write to display every element in a list:

```python
scores = [88, 92, 79, 95]

print(scores[0])
print(scores[1])
print(scores[2])
print(scores[3])
```

With four scores, writing four statements is tedious. If the list held one thousand scores, writing one thousand individual `print()` statements would be extremely repetitive and impractical.

Your program needs a way to execute an instruction repeatedly across every element of a collection without writing manual statements for each position.

That mechanism is **repetition**.

Next: **Section 07 — Repeating Work (`for`, `while`)**
