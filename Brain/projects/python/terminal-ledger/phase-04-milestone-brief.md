---
title: "Phase 4: Validate Bad Input"
phase: "04"
estimated_time: "1.5–2 hours"
prerequisites: "Phase 3 complete — persistent state survives a restart"
---

## 1. A Working Program Still Meets Hostile Conditions

Your Phase 3 program works when the person using it enters suitable values and the stored JSON remains readable. Those conditions will not always hold. Someone can type text where your program needs a number, enter a value that converts successfully but makes no sense for your design, or leave stored data empty or malformed. Decimal calculations can also produce a value whose displayed form looks surprising.

Phase 4 makes these boundaries deliberate. The goal is not to anticipate every possible failure. It is to identify where outside data enters your program, decide what your program expects there, and handle the small set of expected failures without hiding genuine bugs.

Two ideas remain distinct throughout this work:

- **Validation** asks whether incoming data satisfies the program's expectations.
- **Error handling** decides what should happen when an operation fails.

A value can convert without being valid for your program. An operation can fail for an expected reason without making every exception safe to ignore.

## 2. What You Will Demonstrate

By the end of this phase, you can show:

- Every interactive boundary in your current program has an explicit definition of acceptable input.
- Non-convertible input and convertible-but-unacceptable input produce a clear response and another chance where another chance is appropriate.
- Expected bad input does not unnecessarily end the program or expose a Python traceback to the user.
- A missing persistence file still follows your Phase 3 first-run policy.
- An empty file and malformed JSON follow a deliberate policy that you can explain.
- A normal save, complete exit, and restart still preserves the intended state.
- Decimal calculations have been inspected, and decimal output is displayed intentionally.

These are behavioral requirements. Your prompts, names, functions, data shape, files, control flow, and save timing remain yours.

## 3. Map the Boundaries Before Editing

List every place data enters your program from outside its current working state. At this phase, the likely sources are keyboard input and the persistence file, but use your program rather than this sentence as the authority.

For each boundary, write down:

1. What kind of value the next operation expects.
2. What can fail during conversion or loading.
3. What values can pass conversion but still violate your program's rules.
4. What the user should observe when the input is rejected.
5. What evidence will prove the accepted value is usable.

Do not begin by creating one universal validation mechanism. Different boundaries can have different rules and different appropriate responses. First make the expectations visible.

## 4. Read Robust Input 01

Read **Robust Input 01 — Validating and Re-Prompting User Input**. Run its event-registration experiments in a scratch file. Pay attention to the difference between conversion failure and a value that converts but fails a rule.

The pack also distinguishes expected failures from programming bugs. A narrow `try`/`except` belongs around the operation expected to fail. Catching every exception can make a program appear calm while concealing a defect.

Return to your boundary list after the experiments. For each interactive input, decide what “valid” means in your design. A rule should have a reason tied to program behavior, not merely because another program might use it.

## 5. Protect Interactive Input

Work through one boundary at a time. Start with a case that currently produces a predictable conversion failure. Make the program explain the problem and provide another chance. Then test a value that converts successfully but is unacceptable according to the rule you wrote down.

After one boundary behaves correctly, repeat the process for the other interactive boundaries in your program. Do not assume that protecting one numeric prompt protects all paths through which a numeric value can enter.

For every case, predict before running:

- whether conversion will succeed;
- whether the converted value satisfies your rule;
- what the user will see;
- whether the program will ask again, continue, or take another deliberate action.

Then run it and compare the observation with the prediction. If they differ, preserve the exact input and output as evidence.

## 6. Keep Exception Handling Narrow

Expected bad input is not permission to suppress every failure. Handle the specific exception produced by the specific operation you are protecting. Keep the protected region small enough that you know which operation caused the expected failure.

If an unrelated line contains a bug, its traceback is useful. A broad handler can mislabel that bug as bad user input, repeat forever, or continue with damaged state. The program should be forgiving toward expected external failures and honest about defects in its own instructions.

Inspect the bottom line of each controlled traceback in a scratch experiment. Name the exception and connect it to the operation that raised it before deciding what to handle.

## 7. Read Numbers 01

Read **Numbers 01 — Float Precision and Displaying Decimal Values**. Run the decimal experiments exactly as written before applying anything to your project.

Many decimal fractions cannot be represented exactly by binary floating-point. This does not make every calculation wrong. It means the stored approximation may reveal more digits than are useful when printed without an intentional display rule.

The pack introduces two tools with different jobs:

- `round()` returns a rounded numeric value, still represented as a float.
- `:.2f` produces a two-decimal text representation for display.

Neither tool turns a float into an exact decimal quantity. Formatting does not alter the underlying value at all.

## 8. Inspect Decimal Behavior

Choose a small decimal calculation in a scratch file that exposes ordinary floating-point representation behavior. Predict the mathematical result, print Python's value, inspect its type, then display it to two decimal places. Explain why the two printed forms differ.

Next, inspect your own program's decimal outputs. Decide where a person needs a stable two-decimal display. Also decide whether your program has any reason to round a calculation value, rather than only its display. The pack provides evidence and vocabulary; it does not choose your numeric policy.

Apply one consistent policy that you can defend. Afterward, recompute a small known case by hand and compare it with both the program's calculation and its displayed text.

## 9. Read Persistence 03

Phase 3 handled the absent-file case. Read **Persistence 03 — Defensive Loading** to study two different cases:

- the file exists but contains no JSON text;
- the file exists but contains malformed JSON text.

Both cause JSON decoding to fail, which is different from `FileNotFoundError`. Run the pack's game-settings experiments and read the exception evidence before adding recovery behavior.

The pack discusses possible policies without selecting one for your project. Your choice must preserve two invariants: the program does not crash unexpectedly on the controlled case, and it does not silently destroy stored evidence that might matter.

## 10. Choose a Defensive-Loading Policy

Write down what your program should do for each of these conditions before implementing anything:

1. The persistence file is absent.
2. The persistence file exists but is empty.
3. The persistence file contains malformed JSON.
4. The persistence file contains the normal data your program saved.

The absent-file decision should preserve your Phase 3 first-run behavior. Empty and malformed content require a deliberate Phase 4 choice. Starting from a safe default, refusing to continue, or another modest response can be defensible depending on the design. What is not defensible is silently overwriting questionable content before the user can understand what happened.

Implement only the expected cases you have learned to distinguish. A full schema-validation, migration, backup, or repair system is outside this phase.

## 11. Exercise Failures Deliberately

Create a written verification transcript. For every case, record the setup, exact action, prediction, observation, and whether the two matched.

**Interactive boundaries:**

1. Enter a known valid value and confirm the existing behavior still works.
2. Enter text where numeric conversion is expected.
3. Enter a value that converts but violates one of your stated rules.
4. Confirm each rejected value produces the response and next action you designed.

**Persistence boundary:**

1. Preserve any useful current data before a destructive experiment.
2. Test the missing-file case and confirm Phase 3 behavior remains intact.
3. Create an empty persistence file and observe your chosen response.
4. Put malformed JSON in the file and observe your chosen response.
5. Restore or create normal saved data, restart completely, and verify the round trip.

**Numeric behavior:**

1. Run a scratch calculation that exposes a long float representation.
2. Print the underlying value and a two-decimal display.
3. Check one project calculation by hand.
4. Confirm every user-facing decimal display follows the policy you chose.

Do not use a testing framework. The value here is a reproducible sequence and an honest comparison of expected with observed behavior.

## 12. Debug With Boundary Evidence

When a case behaves unexpectedly, inspect the boundary before changing code:

1. Record the exact input or raw stored text.
2. Record the expected behavior.
3. Record what actually happened.
4. Read the exception from the bottom up if one occurred.
5. Inspect the value and `type()` immediately after conversion or loading.
6. Find the first point where expected and observed diverge.
7. Change one thing and repeat the same case.

Useful evidence in this phase includes the literal keystrokes, the raw file in an editor, the exception type, the loaded value, the loaded type, and the difference between a calculation value and its displayed representation.

## 13. Problem Journal

Continue using exactly these six fields:

- expectation
- observation
- cause
- evidence used
- fix
- lesson for next time

A meaningful entry might come from a re-prompt loop that never reaches its exit, a handler that catches more than intended, a decoding failure mistaken for a missing file, or a decimal display that concealed your assumption about the underlying value. Ordinary quick typing mistakes do not need an entry.

## 14. Help When You Are Stuck

- **L0 — Think / inspect.** What entered the program, what did the next operation expect, and what exact evidence shows the mismatch?
- **L1 — Re-read the relevant pack.** Choose Robust Input 01, Numbers 01, or Persistence 03 based on the boundary involved.
- **L2 — Directional hint.** “Does this value fail during conversion, or after conversion when your rule examines it?”
- **L3 — Structural hint.** “Describe the boundary as accept, explain, and repeat. At which part does observed behavior diverge?”
- **L4 — Guided diagnosis.** Reproduce one exact case, inspect the incoming value and type, and isolate the smallest operation that disagrees with your prediction.
- **L5 — Protected solution.** Study a complete pattern in an unrelated domain, then design the connection to your program yourself.

No level supplies your program's prompts, fields, names, schema, or control flow.

## 15. Completion Gate

Phase 4 is complete when:

- Valid input still produces the intended behavior.
- Each interactive boundary has a reasoned validity rule.
- Expected non-convertible and unacceptable values are handled without an unnecessary program exit.
- Exception handling is specific to the expected operation and failure.
- Missing, empty, malformed, and normal persistence cases follow the policies you wrote down.
- No recovery path silently destroys questionable stored data.
- A normal persistence round trip still succeeds after the changes.
- Decimal calculations have been inspected and user-facing decimal output is intentional.
- Your structured verification transcript records expected and observed behavior for the controlled cases.
- You can explain the difference between validation and error handling.

Not required: accepting every imaginable input, repairing damaged data, validating a future schema, building backups, changing your storage architecture, or adopting a testing framework.

## 16. Reflection

Write briefly on each question:

- Which boundaries does your program have, and what does each one trust after validation?
- Which failure does your program handle deliberately, and which bugs does it still allow to produce useful tracebacks?
- What policy did you choose for empty or malformed stored data, and what evidence remains available before recovery?
- Where do you control decimal display, and how is that different from changing a calculation value?
- Which controlled failure most changed your understanding of the program?

Keep the answers with your earlier phase reflections and verification transcript.

