---
title: "Ordering 01 — Sorting and Selecting Top Results"
pack: "Ordering 01"
phase: "08"
estimated_time: "15–20 minutes"
prerequisites: "Starting Manual Section 03 (functions), Section 06 (lists, dictionaries), and Aggregation 01 (summary dictionaries)"
outcomes:
  - "Explain why sorted() creates a new list without mutating the original collection"
  - "Extract key-value pairs from summary dictionaries using the .items() method"
  - "Order complex items using sorted() with a named key function"
  - "Control sort direction using reverse=True for descending ranks"
  - "Extract top-ranked results safely using list slicing"
---

## 1. The Need to Order Summaries

In Aggregation 01, you learned how to transform detailed records into a summary dictionary of grouped totals. But an unordered summary dictionary only answers half the user's question. If a facility tracks fifty departments or a library tracks thirty genres, an unsorted listing forces the reader to scan every row to find the highest or lowest figures.

Users frequently ask ranking questions:
- What are the top three most heavily visited museum galleries?
- Which five authors had the highest circulation this month?
- Which project milestones experienced the least delay?

Answering these questions requires **ordering** the summary data and, when requested, **selecting the top N results**.

## 2. The Behavior of `sorted()`

Python provides a built-in function named `sorted()`. When passed an iterable (such as a list), `sorted()` constructs and returns a **brand new list** containing the elements in sorted order.

Crucially, **`sorted()` never modifies the original collection:**

```python
numbers = [42, 11, 89, 23]
ordered_numbers = sorted(numbers)

print("Original:", numbers)
print("Sorted:  ", ordered_numbers)
```

Output:
```text
Original: [42, 11, 89, 23]
Sorted:   [11, 23, 42, 89]
```

The original `numbers` list retains its original sequence. This non-destructive property is essential when displaying reports: viewing a sorted summary must never scramble your stored data or mutate active working collections.

## 3. Extracting Sortable Pairs with `.items()`

Summary dictionaries store keys and values (such as `{"History": 45, "Fiction": 120}`). Dictionaries themselves are mappings, not sequences with positional indices. To sort a dictionary's entries, you first extract its contents as a sequence of pairs using the `.items()` method:

```python
checkout_totals = {
    "History": 45,
    "Fiction": 120,
    "Science": 88,
    "Poetry": 12
}

pairs = list(checkout_totals.items())
print("Pairs:", pairs)
```

Output:
```text
Pairs: [('History', 45), ('Fiction', 120), ('Science', 88), ('Poetry', 12)]
```

Notice the structure of each pair: `('History', 45)`. In Python, this two-element container is called a **tuple**. For our purposes, a tuple functions just like a fixed, read-only list with positional index access:
- Index `0` holds the key: `pair[0]` (e.g. `'History'`).
- Index `1` holds the value: `pair[1]` (e.g. `45`).

You do not need to master complex tuple features. All you need to know is that `pair[0]` gives you the name, and `pair[1]` gives you the number.

## 4. Custom Ordering with a Named Key Function

If you call `sorted(pairs)` directly on a list of pairs, Python sorts them by their first element: alphabetical order by genre name (`Fiction`, `History`, `Poetry`, `Science`).

To sort by the **numeric total** instead of the name, you tell `sorted()` which value to use for comparison using its `key=` parameter.

The `key=` parameter expects a **function**. For every element in the list, Python calls this function behind the scenes, takes the returned value, and compares that returned value to decide relative order.

We define a clear, named helper function:

```python
def get_checkout_count(pair):
    # pair is ('Genre', count); index 1 is the count
    return pair[1]
```

Now we pass `get_checkout_count` to `sorted()`:

```python
ranked_pairs = sorted(pairs, key=get_checkout_count)
print("Ascending:", ranked_pairs)
```

Output:
```text
Ascending: [('Poetry', 12), ('History', 45), ('Science', 88), ('Fiction', 120)]
```

Notice how we passed the function name: `key=get_checkout_count`. We did **not** write parentheses after the name (`get_checkout_count()`). We are handing the function itself to `sorted()` as an argument, so `sorted()` can call it repeatedly for each item in the list.

## 5. Descending Order with `reverse=True`

By default, `sorted()` arranges values in ascending order (smallest to largest). In reports, however, users almost always want **descending order** (largest to smallest) to see the highest activity first.

To reverse the order, supply `reverse=True`:

```python
highest_first = sorted(pairs, key=get_checkout_count, reverse=True)
print("Descending:", highest_first)
```

Output:
```text
Descending: [('Fiction', 120), ('Science', 88), ('History', 45), ('Poetry', 12)]
```

The genre with the highest circulation now appears at index `0`.

## 6. Selecting the Top N with List Slicing

Once a list is ordered from most to least, selecting the "top 3" or "top 5" results is achieved with Python's slice syntax:

```text
sequence[:n]
```

A slice from the start (`:`) up to index `n` extracts a new list containing the first `n` items:

```python
top_three = highest_first[:3]
print("Top 3 Genres:")
for genre, count in top_three:
    print(f"  {genre:10}: {count} checkouts")
```

Output:
```text
Top 3 Genres:
  Fiction   : 120 checkouts
  Science   : 88 checkouts
  History   : 45 checkouts
```

### The Rule of Ranking: Sort First, Slice Second

Always ensure you **sort first, then slice second**:

```python
# CORRECT: Sort the entire collection, then take the top 3
sorted_all = sorted(pairs, key=get_checkout_count, reverse=True)
top_three = sorted_all[:3]

# FATAL BUG: Slicing before sorting
slice_first = pairs[:3]  # Takes whatever arbitrary 3 items came first!
wrong_top = sorted(slice_first, key=get_checkout_count, reverse=True)
```

If you slice before sorting, you only find the largest of an arbitrary initial slice, missing the true leaders in the rest of the dataset.

## 7. Safety Under Boundary Conditions

List slicing and `sorted()` handle boundary cases gracefully:

### Case 1: Fewer Items Than Requested Top N
If a library has only 2 genres recorded, but the report asks for the top 5 (`pairs[:5]`), Python does **not** raise an `IndexError`. It cleanly returns all available items without error:
```python
short_list = [("Art", 10), ("Drama", 5)]
print(short_list[:5])
# Output: [('Art', 10), ('Drama', 5)]
```

### Case 2: Empty Collections
If the collection is completely empty, `sorted([])` returns `[]`, and `[][:3]` returns `[]`. No crash occurs.

### Case 3: Tied Values and Sort Stability
What happens if two genres have the exact same count?
```python
tied_data = [("Drama", 40), ("Music", 40), ("Poetry", 15)]
```
Python's sorting algorithm is guaranteed to be **stable**. When two items produce identical comparison values from the key function, Python preserves their original relative order from the input list. It does not randomly shuffle them or raise a comparison error.

## 8. Controlled Experiments in Scratch Code

Run this scratch script to verify the complete pipeline from pairs to sorted ranking:

```python
catalog = [
    ("Reference", 14),
    ("Biography", 62),
    ("Novels", 185),
    ("Periodicals", 31),
    ("Audiobooks", 94),
    ("Comics", 62)
]

def extract_count(entry):
    return entry[1]

# 1. Full descending sort
descending = sorted(catalog, key=extract_count, reverse=True)

# 2. Extract top 4
top_four = descending[:4]

# 3. Verify original catalog is intact
print("Original unchanged:", catalog[0] == ("Reference", 14))

# 4. Print ranking
print("\nLibrary Circulation Leaderboard:")
for rank, (name, count) in enumerate(top_four, start=1):
    print(f"{rank}. {name:12} - {count} loans")
```

Inspect the output. Confirm that `Novels` (185) leads, followed by `Audiobooks` (94), and that tied items (`Biography` and `Comics` at 62) are handled safely in their original relative sequence.

## 9. Common Sorting Mistakes

- **Writing `key=func()` instead of `key=func`:** Adding parentheses executes the function immediately, passing its return value instead of the function itself to `sorted()`.
- **Assuming `.sort()` returns a list:** The `.sort()` list method sorts a list in place and returns `None`. Using `my_list = my_list.sort()` destroys your list with `None`. Use the built-in `sorted(my_list)` function instead.
- **Slicing before sorting:** Always sort the entire collection before taking the top N slice.
- **Trying to index a dictionary directly:** A dictionary cannot be sliced with `[:3]`. Convert it to a list of pairs with `.items()` first.
- **Modifying source data inside the key function:** The key function should be a pure reader that extracts a value without altering the record.

## 10. Reading the Documentation

When consulting Python's sorting documentation:

```text
sorted(iterable, /, *, key=None, reverse=False) -> list
```

- `iterable`: Any collection (list, tuple, dictionary items).
- `key`: A function of one argument that extracts a comparison key from each element.
- `reverse`: A boolean flag. If `True`, the list elements are sorted as if each comparison were reversed.
- Return value: A fresh list containing all items in sorted order.

## 11. Debugging Checklist

- Does the named key function accept exactly one argument (the item being inspected)?
- Does the named key function return the numeric field you intend to compare?
- Is the function name passed to `key=` without parentheses?
- Did you specify `reverse=True` if you need descending order?
- Is list slicing applied after the sort operation completes?
- Did you test with an empty list and a list with fewer items than N?

## 12. What This Pack Does Not Cover

- Lambda functions or anonymous expressions.
- The `operator.itemgetter` utility.
- Multi-key sorting tuples (such as secondary sorting by name on tie).
- In-place sorting with `list.sort()`.
- Financial transactions, accounts, money balances, or expense categories.

## 13. Where This Fits Your Project

You already know how to accumulate grouped totals into a summary dictionary. This pack gives you the exact mechanism to transform those summary dictionaries into ordered lists and highlight the most significant categories. You decide what counts as top activity in your reports and how many results to display.
