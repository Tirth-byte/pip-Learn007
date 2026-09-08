---
title: "Records 01 — Modeling One Thing with Several Fields"
pack: "Records 01"
phase: "02"
estimated_time: "15–20 minutes"
prerequisites: "Starting Manual Sections 06–08 (dictionaries, loops, functions)"
outcomes:
  - "Explain why several related facts belong in one value instead of separate variables"
  - "Create a dictionary that models one record with several named fields"
  - "Read and update a single field of a record by its key"
  - "Keep multiple records in a list and read one field of each record in a loop"
  - "Recognize the design decision between a collection keyed by name and a list of records"
  - "Diagnose a KeyError by printing the record and comparing its keys with the access attempt"
---

## 1. Several Facts, One Thing

Suppose you are keeping track of the houseplants in your home. For each plant you care about the same facts: its name, the room it lives in, and how many days it can go between waterings.

Using what you know so far, that information could live in separate variables:

```python
plant_one_name = "Boston fern"
plant_one_room = "living room"
plant_one_days = 3

plant_two_name = "Snake plant"
plant_two_room = "bedroom"
plant_two_days = 14
```

This works, and it fails at the same time. Nothing in the program states that these three values belong together — that connection lives only in your naming convention. Adding a third plant means writing three more variables and spelling the convention correctly a third time. Adding a fourth fact about every plant means finding and changing every group of three.

The underlying problem is structural: the program has facts, but no representation of *a plant*.

## 2. The Mental Model: One Card, Labeled Fields

A dictionary can act as a record card. One card represents one plant, and each fact on the card has a label. The card is a single value that can be stored, passed to a function, and handed around as one thing. The labels — the keys — are how the program reads or replaces any individual fact.

This is the same dictionary you met in the Starting Manual, now used for **one record among many**.

## 3. The Smallest Example

```python
plant = {
    "name": "Boston fern",
    "room": "living room",
    "watering_days": 3
}

print(plant["room"])
```

The dictionary literal creates the card. `"name"`, `"room"`, and `"watering_days"` are keys you chose; the values after each colon are the facts. `plant["room"]` reaches one field by its label and prints `living room`.

## 4. Records Change

Bracket assignment updates an existing field or adds a new one, exactly as you learned in Section 06:

```python
plant["watering_days"] = 4   # update an existing field
plant["note"] = "drops leaves near winter"   # add a new field

print(plant)
```

A record can grow after it is created — and two records can grow differently, which matters in Section 7.

## 5. The Trap: One Dictionary Trying to Hold Many Things

A tempting shortcut is to use one dictionary for *all* plants, keyed by name:

```python
watering = {"fern": 3, "cactus": 14}
```

This works while every plant has exactly one fact. It stops working the moment a second fact appears. Where does the fern's room go? The key `"fern"` is already taken, and its value is the number `3` — not a record that can hold more fields:

```python
watering["fern"]["room"] = "living room"
```

```terminal
Traceback (most recent call last):
  File "trap.py", line 1, in <module>
    watering["fern"]["room"] = "living room"
    ~~~~~~~~~~~~~~~~^^^^^^^^
TypeError: 'int' object does not support item assignment
```

The traceback is the evidence: `watering["fern"]` is the integer `3`, and an integer has no fields to assign into. One dictionary keyed by name cannot hold a second fact about the same thing.

A pattern worth carrying forward:

* A **dictionary** can be useful when one thing has several named facts.
* A **list** can be useful when you need an ordered collection of several similar things.

Combining the two gives you one common pattern: a list of records. It is a pattern, not a law — whether it fits the data you are keeping is a decision, and Section 13 returns to it.

## 6. Many Records: The Shelf of Cards

```python
plants = [
    {"name": "Boston fern", "room": "living room", "watering_days": 3},
    {"name": "Snake plant", "room": "bedroom", "watering_days": 14}
]

for plant in plants:
    print(plant["name"], "-", plant["room"])
```

```terminal
Boston fern - living room
Snake plant - bedroom
```

Read the loop the way Section 07 taught you. On each pass, the loop variable `plant` receives one record from the list — one whole card — and the body reads two of its fields by key. When the loop ends, `plant` holds the last record.

Adding a record is one `append` of one new card:

```python
plants.append({"name": "Aloe", "room": "kitchen", "watering_days": 21})
```

## 7. When Records Do Not Share a Shape

Records are independent values, and nothing forces two records built in the same run to hold the same fields. Suppose one plant record carries a `note` field and another does not:

```python
plants = [
    {"name": "Boston fern", "room": "living room", "watering_days": 3, "note": "drops leaves near winter"},
    {"name": "Snake plant", "room": "bedroom", "watering_days": 14}
]

for plant in plants:
    print(plant["name"], "-", plant["note"])
```

```terminal
Boston fern - drops leaves near winter
Traceback (most recent call last):
  File "shapes.py", line 7, in <module>
    print(plant["name"], "-", plant["note"])
                              ~~~~~^^^^^^^^
KeyError: 'note'
```

The loop succeeded for the first record and failed on the second, because the second record has no `"note"` key. `KeyError` means the key you asked for does not exist in that record. The reliable response is evidence, not guessing: print the whole record and compare the keys it actually has with the key your code requested.

The lesson worth stating plainly: **if your loop expects the same key on every record, inconsistent record shapes can cause failures.** Whether every record should share one shape — and what to do when one does not — is a decision for the program's designer, made with evidence like the printout above.

## 8. Experiments

### Experiment 1 — One Field of Each Record

Create `exp1_shelf.py` with a list of at least three plant records.

1. **Predict:** what exact output will a loop print if it reads only the `"name"` field of each record?
2. **Run** and compare with your prediction.
3. **Explain:** what does the loop variable hold on the first pass? On the last?

### Experiment 2 — Build a Record from Input

Create `exp2_input.py`.

1. Ask the user for a plant name and a watering interval.
2. Convert the interval to a number before storing it.
3. Append a new record containing both facts to an existing list.
4. Print `type()` of the converted interval, then print the whole new record.
5. **Predict before running:** what does the printed record look like if the user types `10` at the interval prompt — and what would it look like without the conversion?

### Experiment 3 — Controlled Failure

Create `exp3_missing.py`.

1. Print a field name no record has, such as `"species"`.
2. Read the traceback from the bottom up and name the exception type.
3. Print the whole record and identify which keys it actually has.
4. **Explain:** what does the error message name, and how does printing the record confirm it?

## 9. Common Mistakes

* **Forgetting the quotes on a key:** `plant[name]` makes Python look up a *variable* called `name` and raises `NameError` when none exists. Keys are strings; quote them.
* **KeyError on a field the record never had:** the key exists in your head, not in the record. Print the record and look.
* **Treating a dictionary like a list:** `plant[0]` raises `KeyError: 0`, because dictionaries use keys, not positions.
* **Confusing displaying with storing:** printing a record changes nothing; if a field should be updated, an assignment must happen (Section 08's print-versus-return lesson, re-applied).
* **Inconsistent labels across records:** if your code expects records to share the same shape, inconsistent labels such as `"days"` in one record and `"watering_days"` in another will cause friction — a loop that reads one key will miss the other.

## 10. What This Pack Does Not Cover

* Saving records anywhere — everything here evaporates when the program ends.
* Unique identifiers or automatically generated IDs.
* Sorting, searching, or filtering a collection of records.
* Dates in any form.
* Dictionary methods beyond bracket access and `append` on the surrounding list.
* Comprehensions or any compact collection syntax.
* Records nested inside records. You may eventually feel that need; it is not needed for this pack's capability.

## 11. Reading the Documentation

You did not memorize list methods in the Starting Manual; you learned that collections hold data and that specific operations can be looked up. Dictionaries work the same way. The official Python documentation has a dictionary page, and `help(dict)` in the REPL shows what is available.

When you look up a dictionary operation, ask the three standard questions: what does it expect, what does it return, and what can go wrong. Test the answer on a one-line example before using it in your project.

## 12. Debugging Checklist

* Print the whole record before deciding it is wrong.
* `KeyError`? Print the record and compare its actual keys with the key your code requested.
* Loop printing the same thing repeatedly? Print the loop variable once, at the top of the loop body, and watch what it receives.
* A value looks right but behaves wrong? Check its `type()`.
* The whole collection suspicious? Print it in full — raw, before any formatting — and read it.

## 13. Where This Fits Your Project

Everything in this pack used houseplants. Your program keeps different records, and this pack teaches **one available representation pattern** — nothing more. It does not determine your program's record fields, and it does not determine your collection shape unless your own chosen behavior makes the pattern useful. Whether the pattern fits is a decision only you can make.

It tends to fit when one thing in your program has several facts that travel together and are meaningless apart. It tends not to fit when each thing has exactly one fact — then plain values or a simple keyed dictionary can serve, as Section 5 showed.

If you adopt it, the pack's one design question becomes your project's question: **what does one of your records need to contain so the behaviors in your plan remain possible — no more, no less?** Decide it, note your reasoning, and be ready to explain both the decision and the collection shape you chose around it.
