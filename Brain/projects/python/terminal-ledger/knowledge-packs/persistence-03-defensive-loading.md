---
title: "Persistence 03 — Defensive Loading"
pack: "Persistence 03"
phase: "04"
estimated_time: "12–18 minutes"
prerequisites: "Persistence 01 and 02 (files, with, JSON loading, and the missing-file case)"
outcomes:
  - "Distinguish an absent file from an existing file that cannot be decoded as JSON"
  - "Observe that an empty file is not valid JSON"
  - "Handle FileNotFoundError and json.JSONDecodeError as separate expected failures"
  - "Treat loading as a boundary where stored data must earn trust"
  - "Choose safe fallback behavior without silently destroying evidence"
---

## 1. Existing Does Not Mean Usable

Phase 3 addressed a narrow first-run condition: the file does not exist. A stored file can also exist while containing no text or text that is not valid JSON. In those cases, opening succeeds and decoding fails.

Loading is a program boundary. The file is outside the running program, even if an earlier run created it. A person may edit it, a write may be interrupted, or its contents may otherwise stop matching the decoder's expectations.

Defensive loading means distinguishing expected conditions with evidence and choosing an explicit response. It does not mean hiding every failure or building a complete repair system.

## 2. Three Different Conditions

Consider a game that stores settings in `game_settings.json`.

1. **Absent:** no file has that name. Opening for reading raises `FileNotFoundError`.
2. **Empty:** the file exists but has zero characters. Opening succeeds; `json.load()` raises `json.JSONDecodeError` because empty text is not valid JSON.
3. **Malformed:** the file contains text that violates JSON syntax. Opening succeeds; `json.load()` raises `json.JSONDecodeError` at the point decoding fails.

The visible outcome may be “settings did not load,” but the causes are not interchangeable. The exception type and raw file contents tell you which condition occurred.

## 3. Verify the Empty-File Behavior

Create an empty `game_settings.json`, then run:

```python
import json

with open("game_settings.json", "r") as settings_file:
    settings = json.load(settings_file)
```

The traceback ends with a line like:

```terminal
json.decoder.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
```

Opening did not fail. Decoding found no JSON value at the first character position. An empty file is not an empty JSON collection and not a missing file. If a program wants an empty collection as stored state, the file must contain valid JSON representing that value.

## 4. Verify Malformed JSON

Put this text in the settings file:

```text
{"sound": true,
```

The file contains characters and begins like a JSON object, but it never closes. `json.load()` raises `json.JSONDecodeError`. The message points to where the decoder could no longer satisfy JSON's rules.

Inspect the raw file before adding recovery. The traceback and text together establish that the file exists, reading began, and decoding—not opening—failed.

## 5. Narrow Exceptions Describe Known Failures

The two expected failures can be handled separately:

```python
try:
    with open("game_settings.json", "r") as settings_file:
        settings = json.load(settings_file)
except FileNotFoundError:
    print("No saved settings were found.")
except json.JSONDecodeError:
    print("Saved settings could not be decoded.")
```

This example distinguishes causes; it does not define a complete recovery policy. After either message, the program still needs a deliberate decision about whether to use defaults, stop, or take another modest action.

Catching every exception would erase useful distinctions. A misspelled variable or another defect should not be presented as damaged stored data. Handle only failures you expect and understand.

## 6. Evidence Before Recovery

Recovery changes what happens next; it should follow observation rather than erase it.

Before replacing, rewriting, or ignoring questionable content, preserve enough evidence to answer:

- Does the file exist?
- What exact text does it contain?
- Which exception was raised?
- At what line and character did decoding fail?
- What did the program expect `json.load()` to return?

A safe fallback is a design decision. One program may warn and use default settings. Another may stop because continuing would be misleading. The decision depends on the value of the data and the surrounding behavior.

The invariant is narrower: do not silently overwrite questionable stored content merely because loading failed. Automatic replacement can destroy the best evidence available and may destroy recoverable information.

## 7. Successful Decoding Is One Check

When `json.load()` succeeds, it returns a Python value. Inspect it and its type:

```python
print(settings)
print(type(settings))
```

Valid JSON does not guarantee that the returned value matches every assumption the rest of a program makes. The text `42` is valid JSON and loads as an integer, even if a game expected a collection of settings.

At this phase, recognize that distinction and inspect the loaded value before trusting it. Do not build a schema framework, migration system, or elaborate wrong-shape architecture. Protect only the modest expectations your current program genuinely needs.

## 8. Loading as a Boundary

A useful mental model is:

```text
raw file → open succeeds? → JSON decode succeeds? → inspect loaded value → working state
```

Each arrow is a claim that evidence can verify. `FileNotFoundError` answers the opening question. `JSONDecodeError` answers the decoding question. Printing the loaded value and `type()` helps answer what entered working memory.

Do not connect a fallback to working state accidentally. Decide it. The program's behavior for missing, empty, malformed, and normal content should be explainable in separate sentences.

## 9. Controlled Experiments

Use a game-settings scratch file. Preserve each raw file state long enough to inspect it.

### Experiment 1 — Missing

1. Ensure the settings file is absent.
2. Predict the exception type.
3. Run the loader without a handler.
4. Read the traceback bottom-up and record the named file.
5. Add only the narrow response required for this experiment and rerun.

### Experiment 2 — Empty

1. Create the file with no content.
2. Predict whether opening or decoding fails.
3. Run and record the exact exception type and message.
4. Explain why an empty file differs from a file containing valid JSON for an empty value.

### Experiment 3 — Malformed

1. Put incomplete JSON in the file.
2. Predict the exception type.
3. Run and compare the location in the message with the raw text.
4. Correct one syntax defect, rerun, and observe whether another defect remains.

### Experiment 4 — Valid but Unexpected

1. Put one valid JSON number in the file.
2. Predict what `json.load()` returns.
3. Print the loaded value and its type.
4. Explain why successful decoding does not prove suitability for every program.

### Experiment 5 — Policy Table

For the game settings, write one intended response for absent, empty, malformed, and normal content. State which responses preserve the questionable raw text and which change it. Do not implement automatic rewriting merely to finish the table.

## 10. Common Mistakes

- **Treating empty as missing:** the empty file opens; JSON decoding is what fails.
- **Handling only `FileNotFoundError`:** an existing damaged file reaches a different failure.
- **Catching every exception:** internal programming bugs are mislabeled as storage trouble.
- **Overwriting immediately after decode failure:** evidence and possibly recoverable content disappear.
- **Assuming valid JSON has the expected shape:** JSON syntax validity and program suitability are different checks.
- **Connecting fallback state silently:** the user cannot tell that stored content was not used.
- **Building a repair architecture too early:** the current need is to distinguish, explain, and respond to known cases.

## 11. Reading the Documentation

The central signature remains:

```text
json.load(file_object) -> Python value
```

Ask what it expects, what it returns, and what can go wrong. The `json` documentation identifies `JSONDecodeError` for invalid JSON documents. Python's built-in exception documentation describes `FileNotFoundError` as an operating-system-related failure when the requested file or directory does not exist.

Notice the module-qualified name used in code: `json.JSONDecodeError`. It becomes available after `import json`, just like `json.load()`.

## 12. Debugging Checklist

- Open the stored file in an editor and inspect the raw text first.
- Confirm whether the file is absent or merely empty.
- Read the final traceback line and name the exception.
- For `JSONDecodeError`, compare the reported location with the text.
- After successful loading, print the returned value and its `type()`.
- Record the chosen fallback before allowing it to become working state.
- Confirm that a recovery path does not immediately overwrite the evidence.
- Restore valid content and rerun the normal round trip after changes.

## 13. What This Pack Does Not Cover

- Schema migration or versioning systems.
- Backup files, atomic writes, or automated repair.
- A comprehensive wrong-shape validation architecture.
- `pathlib`, operating-system path utilities, databases, or multiple-file storage designs.
- Any prescribed filename, fallback, schema, or control flow for the learner's project.

## 14. Where This Fits Your Project

Phase 3 gave your program a missing-file policy and a normal JSON round trip. This pack adds evidence for the cases where a file exists but cannot be decoded. You decide how your program warns, whether it uses a safe fallback or stops, and how it avoids silently destroying questionable stored data.

