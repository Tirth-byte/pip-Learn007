---
title: "Querying 01 — Building Filtered Subsets"
pack: "Querying 01"
phase: "05"
estimated_time: "12–18 minutes"
prerequisites: "Starting Manual Sections 05–08 and Strings 01 (conditions, collections, loops, functions, and normalized comparison)"
outcomes:
  - "Describe a filtered subset as a derived result rather than a replacement source collection"
  - "Build a new list by examining records, testing a condition, and appending matches"
  - "Verify that the source list remains intact after selection"
  - "Reason about zero, one, and several matching records"
  - "Distinguish separate lists from shared mutable record values"
---

## 1. A Collection Can Answer a Narrower Question

A reading tracker may hold many books. Printing the whole collection answers “What is recorded?” but not “Which books belong to this genre?”

A **filtered subset** is a new collection derived by testing each source record against a condition. It is useful for the current question without becoming a second source of truth.

The source remains the complete collection. The subset may contain zero, one, or several records. Those are all normal results, not special failures.

## 2. The Walk-Test-Collect Pattern

The beginner-visible pattern has three actions:

```text
walk through the source
test the current record
collect it when the condition is true
```

Here is a book example:

```python
matches = []
for book in books:
    if book["genre"] == "history":
        matches.append(book)
```

`matches` begins as a new empty list. The loop examines every record in `books`. The condition decides whether the current book belongs in the result. `.append()` changes only the new list's membership; it does not remove anything from `books`.

The example's field and rule belong only to its reading-tracker domain. Any real program must choose the information and matching rule that answer its own question.

## 3. Trace One Record at a Time

Use a three-book source where two records match. Trace the loop on paper:

1. Before the loop, the new list is empty.
2. The first record is tested. If true, it is appended.
3. The second record is tested independently.
4. The third record is tested independently.
5. After the loop, the result contains exactly the records whose tests were true.

The loop does not stop after the first match because there is no `break`. It does not add nonmatches because `.append()` runs only inside the true branch.

Print the record and comparison result when the path is unclear.

## 4. Preserve the Source

Selection should not be implemented by deleting nonmatching records from the source. Deletion would answer the current question by destroying information needed for later questions.

Check preservation with observable evidence:

```python
print(len(books))
print(len(matches))
print(len(books))
```

The first and final source lengths should agree. Also compare the source records and order before and after.

## 5. Separate Lists Can Share Records

The subset contains the same dictionaries selected from the source; it does not automatically create new dictionaries.

If code changes a selected dictionary through the subset, the source view will show that changed dictionary too. Both lists refer to the same mutable record value.

Filtering for display does not require changing records. Treat the subset as a derived view. This phase does not teach copying strategies.

## 6. Normalize at Comparison Time When Required

Human-entered group labels may differ in case or edge spaces. Apply the policy from Strings 01 consistently to the requested label and candidate label before equality testing.

Keep normalization and selection conceptually separate:

- normalization decides which text differences are ignored;
- the condition decides whether the current record matches;
- the loop constructs the result from true conditions.

If the result is wrong, inspect each stage rather than rewriting the whole loop. A zero-result bug may come from inconsistent normalization, the wrong record value, or a condition that does not express the intended rule.

## 7. Conditions Define the Result

There is no single universal selection rule. A book tool might select by exact normalized genre. A plant log might select plants in one room. A support tool might select records with one chosen priority.

Begin with one condition that answers one useful question. State it in a sentence and test it with known records. Combining many optional criteria too early makes it harder to determine which comparison excluded a record.

Multiple rules can be correct for different questions. This pack demonstrates construction without choosing the learner's rule.

## 8. Zero, One, and Several Matches

An empty subset is valid evidence: no source record satisfied the condition. Code that assumes at least one result may try to access the first item and raise `IndexError`.

Handle the empty result as an ordinary branch in presentation. Explain that no records matched rather than displaying nothing ambiguously.

One match proves the selection can be narrow. Several matches prove the loop continues through the source rather than stopping early. Use a small fixed collection where you know each expected count before running.

Inspect contents too; an overly broad condition can produce the right count with the wrong records.

## 9. Experiments

### Experiment 1 — Predict Membership

Create four book records with a known distribution across two genres.

1. Predict which records a chosen genre should select.
2. Predict the result count and contents.
3. Run the loop and print both.
4. Compare each selected record with the written expectation.

### Experiment 2 — Zero, One, Several

Use the same source and choose three conditions: one with no matches, one with one match, and one with several.

1. Predict every result before running.
2. Build a fresh result list for each request.
3. Verify both count and content.
4. Give the zero-result case an unambiguous displayed response.

### Experiment 3 — Source Preservation

1. Print the full source and its length.
2. Build and display one subset.
3. Print the full source and its length again.
4. Confirm record contents and order are unchanged.
5. Explain why the new list did not replace the source.

### Experiment 4 — Shared Record Evidence

In a disposable scratch example, change one dictionary through the subset after selection.

1. Predict what the source collection will show.
2. Print both collections.
3. Explain how separate list membership and shared record values can both be true.
4. Restore the scratch data rather than treating mutation as part of selection.

### Experiment 5 — Normalized Match

Choose two genre labels that differ only by case and edge whitespace.

1. Predict direct equality.
2. Apply the same normalization policy to both.
3. Build the subset using normalized equality.
4. Confirm a genuinely different label remains excluded.

## 10. Common Mistakes

- **Appending every record:** `.append()` is outside the condition, so the result mirrors the source.
- **Stopping at the first match:** an unnecessary `break` prevents later matches from being examined.
- **Reusing an old result unintentionally:** matches from an earlier request remain in the list.
- **Deleting nonmatches from the source:** retrieval destroys the complete collection.
- **Assuming separate lists contain copied dictionaries:** changing a shared record appears through both lists.
- **Checking only the count:** the result may contain the wrong records.
- **Applying inconsistent normalization:** intended matches remain unequal.
- **Over-generalizing immediately:** several criteria obscure which condition caused an exclusion.

## 11. Reading the Documentation

The tools in this pattern are already familiar:

```text
list.append(value) -> None
len(collection) -> int
```

`.append()` changes the list on which it is called and returns no useful result. Verify that it is called on the new subset, not the source. `len()` provides count evidence but does not inspect correctness of contents.

The `for` statement and `if` statement do not have function signatures. Review their execution rules in the language tutorial, then trace one record per iteration.

## 12. Debugging Checklist

- Print the complete source before selection.
- Start with a fresh empty result list.
- Print each record and its condition result.
- Confirm `.append()` executes only for a true condition.
- Compare expected and observed result counts and contents.
- Inspect raw and normalized comparison values separately.
- Print the source after selection and confirm it is unchanged.
- Check for an unintended `break` when later matches are missing.

## 13. What This Pack Does Not Cover

- Compact collection syntax or functional selection tools.
- Anonymous functions, set-based selection, sorting, or slicing.
- Copying nested mutable data.
- A universal query engine or premature abstraction.
- Any project-specific field, label, helper, schema, interface, or control flow.
- Finance, ledger, transaction, income, expense, or budget examples.

## 14. Where This Fits Your Project

Your project now needs to answer narrower questions about a complete collection. This pack gives you the visible loop-condition-append pattern for deriving a subset and the checks that prove the source remains intact. You choose which question matters, which condition answers it, and how the result is presented.
