---
title: "Aggregation 01 — Accumulating Values by Group"
pack: "Aggregation 01"
phase: "08"
estimated_time: "15–20 minutes"
prerequisites: "Starting Manual Section 06 (dictionaries, iteration) and Section 07 (loops and accumulators)"
outcomes:
  - "Understand the transformation from detailed individual records to grouped summary values"
  - "Construct accumulator dictionaries that accumulate totals across categories"
  - "Use dict.get(key, default) safely to handle unseen grouping keys without KeyError"
  - "Differentiate strictly between source data and derived summary dictionaries"
  - "Verify grouped calculations against small, hand-calculated datasets"
---

## 1. The Need to Summarize

When an application tracks events over time, its collection of records grows steadily. A user can inspect individual entries, filter subsets, or check whether a single entry crossed a boundary. But a flat list of entries cannot easily answer higher-level questions:

- Which department received the most shipments this quarter?
- How many total hours were logged across each project phase?
- What was the combined score for each team across the entire tournament?

Answering these questions requires **aggregation**: transforming a large collection of detailed records into a smaller, derived collection of grouped totals. The source records preserve the granular history; the aggregated result provides a high-level summary.

## 2. The Mental Model of an Accumulator Dictionary

In earlier programming work, you likely accumulated a single total by initializing a numeric variable to zero and adding to it inside a loop:

```python
total_weight = 0.0
for record in records:
    total_weight += record["weight"]
```

When accumulating by group, you do not know in advance how many groups exist, what their names are, or in what order they appear in the data. You cannot create a separate named variable for each possible group.

Instead, you use an **accumulator dictionary**:

- The dictionary keys represent the **grouping identifiers** (such as department name or team code).
- The dictionary values represent the **running totals** accumulated for each group so far.

Before the loop begins, the accumulator starts completely empty (`{}`). As your loop iterates through each source record, it extracts the group and the numeric value, checks whether that group has been seen before, adds the new contribution to the running subtotal, and writes the updated sum back into the dictionary.

## 3. An Unrelated Example: Warehouse Shipment Weight

Consider a logistics facility that logs parcel dispatches. Each dispatch record notes the origin department and the parcel weight in kilograms:

```python
shipments = [
    {"dept": "Hardware", "weight": 14.5},
    {"dept": "Garden", "weight": 6.2},
    {"dept": "Hardware", "weight": 8.0},
    {"dept": "Electronics", "weight": 12.1},
    {"dept": "Garden", "weight": 11.3},
    {"dept": "Hardware", "weight": 5.5}
]
```

We want to calculate the total shipping weight attributable to each department.

If we attempted to look up each department directly with `totals[dept] += weight`, the program would crash on the first record of every new department with a `KeyError`, because a key cannot be looked up before it exists in the dictionary.

## 4. The Role of `.get(key, default)`

Python dictionaries provide the `.get()` method to handle lookups where a key might not yet exist:

```text
mapping.get(key, default) -> value
```

- If `key` is present in `mapping`, `.get()` returns the associated value.
- If `key` is missing from `mapping`, `.get()` returns the `default` argument provided.

Crucially, **`.get()` does not insert the key into the dictionary.** It only retrieves a value or fallback. To store the new accumulated total, you must explicitly assign the result back to `mapping[key]`:

```python
totals = {}

for item in shipments:
    dept = item["dept"]
    weight = item["weight"]
    
    # 1. Fetch current total if present, or start at 0.0
    current_total = totals.get(dept, 0.0)
    
    # 2. Add the record's contribution
    updated_total = current_total + weight
    
    # 3. Store the updated sum
    totals[dept] = updated_total
```

Let us trace what happens on each iteration:

1. **Item 1 (`Hardware`, `14.5`):** `totals.get("Hardware", 0.0)` finds no key and returns `0.0`. `0.0 + 14.5 = 14.5`. `totals["Hardware"] = 14.5`.
2. **Item 2 (`Garden`, `6.2`):** `totals.get("Garden", 0.0)` returns `0.0`. `totals["Garden"] = 6.2`.
3. **Item 3 (`Hardware`, `8.0`):** `totals.get("Hardware", 0.0)` finds `"Hardware"` already present and returns `14.5`. `14.5 + 8.0 = 22.5`. `totals["Hardware"] = 22.5`.

When the loop concludes, `totals` contains:

```python
{
    "Hardware": 28.0,
    "Garden": 17.5,
    "Electronics": 12.1
}
```

The resulting dictionary is derived entirely from the input list. The original `shipments` list remains completely unchanged.

## 5. Concise Idiomatic Accumulation

Once the three-step sequence (fetch, add, store) is clear, it is often written concisely on a single line:

```python
totals = {}

for item in shipments:
    group = item["dept"]
    amount = item["weight"]
    totals[group] = totals.get(group, 0.0) + amount
```

Read this assignment from right to left:
1. `totals.get(group, 0.0)` evaluates to the current sum, or `0.0` if this is the group's first appearance.
2. `+ amount` adds the incoming number to that base.
3. `totals[group] = ...` creates or updates the entry in `totals`.

This single line safely handles both initial insertion and subsequent additions without requiring special conditional branches for the first entry.

## 6. Single-Pass Efficiency Versus Repeated Filtering

Before learning accumulator dictionaries, a developer might attempt to calculate group totals by first discovering all unique category names, and then running a separate filter loop over the entire list for every single category:

- Pass 1: Scan all records to find category names (`Hardware`, `Garden`, `Electronics`).
- Pass 2: Loop over all records to sum `Hardware`.
- Pass 3: Loop over all records to sum `Garden`.
- Pass 4: Loop over all records to sum `Electronics`.

As datasets grow to hundreds or thousands of records, repeated filtering does redundant work: scanning the entire collection over and over again. In contrast, the accumulator dictionary processes every record exactly once in a single pass. Each item is examined, routed to its appropriate group key, and combined immediately.

## 7. Controlled Experiments with Edge Cases

Before integrating grouped accumulation into your main software, verify how the logic behaves under unusual or boundary conditions in a scratch script:

### Case 1: Empty Input
```python
empty_data = []
totals = {}
for item in empty_data:
    totals[item["dept"]] = totals.get(item["dept"], 0.0) + item["weight"]

print("Empty result:", totals)
# Output: Empty result: {}
```
An empty dataset does not raise an exception; it yields an empty summary dictionary.

### Case 2: A Single Group
```python
single_data = [{"dept": "Garden", "weight": 5.0}, {"dept": "Garden", "weight": 3.0}]
totals = {}
for item in single_data:
    totals[item["dept"]] = totals.get(item["dept"], 0.0) + item["weight"]

print("Single group result:", totals)
# Output: Single group result: {'Garden': 8.0}
```
Repeated entries accumulate into one key without creating duplicate keys.

### Case 3: Zero or Neutral Contributions
```python
zero_data = [{"dept": "Hardware", "weight": 0.0}]
totals = {}
for item in zero_data:
    totals[item["dept"]] = totals.get(item["dept"], 0.0) + item["weight"]

print("Zero contribution:", totals)
# Output: Zero contribution: {'Hardware': 0.0}
```
The group is recorded with a total of `0.0`. It is not omitted or converted into an empty value.

## 8. Common Accumulation Mistakes

When building accumulator loops, watch for these common failure patterns:

1. **Re-initializing inside the loop:**
   ```python
   # BUG: Placing the dictionary initialization inside the loop
   for item in shipments:
       totals = {}  # Overwrites all previous accumulation every iteration!
       totals[item["dept"]] = totals.get(item["dept"], 0.0) + item["weight"]
   ```
   *Symptom:* The final dictionary contains only one key: the very last item processed.
   *Fix:* Initialize the accumulator dictionary once, strictly before the loop begins.

2. **Forgetting to reassign the updated value:**
   ```python
   # BUG: Calling .get() without assigning back to the dictionary
   for item in shipments:
       totals.get(item["dept"], 0.0) + item["weight"]
   ```
   *Symptom:* `totals` remains completely empty (`{}`).
   *Fix:* Remember that `.get()` only computes a temporary value; you must store it with `totals[group] = ...`.

3. **Mutating the source records:**
   ```python
   # BUG: Overwriting raw record fields during summary calculation
   for item in shipments:
       item["weight"] = item["weight"] * 1.10  # Accidental permanent change!
   ```
   *Symptom:* Historical records become corrupted after running a summary report.
   *Fix:* Treat source records as read-only inputs during aggregation.

## 9. Counting Occurrences Versus Summing Values

The accumulator pattern works identically whether you are summing numeric amounts or counting how many times an event occurred:

- **Summing amounts:** Add the numeric field:
  ```python
  weights[dept] = weights.get(dept, 0.0) + item["weight"]
  ```
- **Counting occurrences:** Add `1` each time:
  ```python
  counts[dept] = counts.get(dept, 0) + 1
  ```

Both operations use the same structure, differing only in the contribution added on each step.

## 10. Reading the Documentation

When using dictionary retrieval methods:

```text
dict.get(key[, default=None]) -> value
```

Notice that if you omit the `default` argument, `.get(key)` returns `None`. In numeric accumulation, always provide an explicit numeric default (`0` or `0.0`). Forgetting the default will cause Python to attempt `None + amount`, raising a `TypeError: unsupported operand type(s) for +: 'NoneType' and 'float'`.

## 11. Debugging Checklist

- Is the accumulator dictionary initialized before the loop starts?
- Does `.get()` specify an explicit numeric default of `0` or `0.0`?
- Is the computed sum assigned back to `totals[group]`?
- Are the grouping key and numeric value extracted from the correct record fields?
- Does the source list contain the exact same number of elements before and after the loop?
- Did you verify the result against a small, three-item dataset calculated by hand?

## 12. What This Pack Does Not Cover

- The `collections.Counter` and `collections.defaultdict` utility classes (convenience abstractions taught in later courses).
- Dictionary comprehensions or generator expressions.
- Sorting or ordering aggregated results (covered in Ordering 01).
- Multi-level nested group hierarchies (such as department within region).
- Financial ledgers, monetary balances, expenses, or income categories.

## 13. Where This Fits Your Project

Your application can record entries, filter subsets, and track dates. This pack gives you the tool to answer category-wide questions by aggregating scattered entries into clean, grouped totals. You decide which fields to group by, what values to sum, and how the resulting summaries serve your users.
