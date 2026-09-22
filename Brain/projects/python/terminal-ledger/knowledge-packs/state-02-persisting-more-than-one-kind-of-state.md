---
title: "State 02 — Persisting More Than One Kind of State"
pack: "State 02"
phase: "07"
estimated_time: "12–18 minutes"
prerequisites: "Starting Manual Section 06 (dictionaries and collections), Persistence 02 (JSON serialization), and Persistence 03 (defensive loading)"
outcomes:
  - "Recognize when application state contains more than one conceptual kind of information"
  - "Design working memory state separately from storage representation"
  - "Save multiple kinds of data into a durable file without destroying existing records"
  - "Load and reconstruct mixed state defensively when a section is absent or empty"
  - "Perform round-trip verification across complete program restarts"
---

## 1. When One Collection Is No Longer Enough

In earlier persistence milestones, an application could manage its entire saved history with a single collection—such as a single list of recorded event dictionaries written to a JSON file. Loading meant reading that list back into memory; saving meant dumping that list back to disk.

As software expands, it must remember more than just a historical log. A program might need to remember operational targets, user preferences, alert limits, or system configurations alongside the primary event history. These two kinds of information serve different purposes, follow different lifecycles, and have different shapes:

- The event log grows continuously as new events are appended.
- Configuration settings or targets change rarely, are often updated in place, or map keys to specific values.

If an application attempts to shoehorn settings into the event log or blindly overwrites the save file whenever one setting changes, saved data becomes corrupted or lost. Persisting multi-kind state requires deliberate choices about how data lives in memory, how it is serialized together, and how it is restored upon startup.

## 2. In-Memory Working State Versus Serialized Storage

A common beginner misconception is that the variables in your running Python program must match the exact layout of the JSON file on disk. They do not. Serialization and runtime state are two separate concerns:

1. **Working State (In-Memory):** In your active program, you choose data structures that make ongoing operations straightforward. You might hold historical entries in a list so you can iterate over them easily, while holding operational targets in a dictionary so you can look up specific limits by name.
2. **Stored Representation (On Disk):** A single JSON file can store a top-level container—typically a dictionary—that groups multiple named sections together under separate keys. Alternatively, each section can hold its own native structure.

When saving, your code gathers its in-memory working structures and packages them into a format suitable for the serializer. When loading, your code unpacks the stored representation, validates its contents, and reconstructs the working variables your program expects.

## 3. An Unrelated Example: Greenhouse Environmental Monitoring

Consider a monitoring script for an automated greenhouse. The script tracks:

1. A historical log of sensor measurements taken throughout the day.
2. A set of target thresholds (ideal temperature, maximum humidity) that the ventilation system monitors.

The sensor log is an ordered sequence of readings. The targets are a set of named values. In memory, the program might maintain two separate variables:

```python
# In-memory working state
readings = [
    {"timestamp": "2026-03-24 08:00", "celsius": 21.5, "humidity": 62},
    {"timestamp": "2026-03-24 09:00", "celsius": 22.8, "humidity": 59}
]

targets = {
    "temperature_target": 22.0,
    "max_humidity": 70.0
}
```

Both pieces of state need to survive a program restart.

## 4. Packaging State for Serialization

To save both `readings` and `targets` into one durable JSON file, the program packages them together into a combined dictionary at the moment of saving:

```python
import json

def build_snapshot(readings_data, targets_data):
    return {
        "readings": readings_data,
        "targets": targets_data
    }

snapshot = build_snapshot(readings, targets)

with open("greenhouse_state.json", "w", encoding="utf-8") as file:
    json.dump(snapshot, file, indent=2)
```

Notice what happens on disk:

```json
{
  "readings": [
    {
      "timestamp": "2026-03-24 08:00",
      "celsius": 21.5,
      "humidity": 62
    },
    {
      "timestamp": "2026-03-24 09:00",
      "celsius": 22.8,
      "humidity": 59
    }
  ],
  "targets": {
    "temperature_target": 22.0,
    "max_humidity": 70.0
  }
}
```

Neither kind of state interferes with the other. The log remains a list under `"readings"`, and the limits remain a dictionary under `"targets"`.

## 5. Defensive Loading and Reconstruction

When the program starts up tomorrow, `greenhouse_state.json` might be in several possible conditions:

1. **Brand new:** The file does not exist yet.
2. **Legacy format:** The file exists from an older version of the program that stored only the readings list `[...]`, before targets were introduced.
3. **Partial state:** The file exists and has a `"readings"` key, but `"targets"` is missing or empty because no limits were ever configured.
4. **Complete state:** Both `"readings"` and `"targets"` are present.

Defensive loading means the program inspects the loaded structure before assuming its shape, providing fallback empty states when sections are absent:

```python
import json
import os

def load_greenhouse_state(filepath):
    default_readings = []
    default_targets = {}

    if not os.path.exists(filepath):
        return default_readings, default_targets

    try:
        with open(filepath, "r", encoding="utf-8") as file:
            data = json.load(file)
    except (json.JSONDecodeError, OSError):
        # File is corrupt or unreadable; preserve safe fallbacks
        return default_readings, default_targets

    # Check whether the loaded data is an older legacy list or a multi-section dict
    if isinstance(data, list):
        # An older save file that only stored the readings list
        return data, default_targets

    if isinstance(data, dict):
        loaded_readings = default_readings
        loaded_targets = default_targets

        if "readings" in data and isinstance(data["readings"], list):
            loaded_readings = data["readings"]

        if "targets" in data and isinstance(data["targets"], dict):
            loaded_targets = data["targets"]

        return loaded_readings, loaded_targets

    return default_readings, default_targets
```

Notice that we do not crash if `"targets"` is not yet in the file. Existing readings recorded in previous phases remain completely safe and accessible.

## 6. The Overwrite Trap: Preserving One Kind While Updating Another

A frequent bug when introducing a second kind of state occurs when updating a setting:

1. The user enters a new temperature target.
2. The code opens the save file in write mode (`"w"`).
3. The code dumps *only* the new targets dictionary.
4. All previously recorded sensor readings are erased from disk.

The rule of whole-file serialization: **opening a file in `"w"` mode wipes its contents.** If your program saves by dumping a snapshot, that snapshot must contain all kinds of active state, not just the one that was recently updated.

```python
# Safe update flow:
# 1. Mutate the target in memory
targets["temperature_target"] = 24.5

# 2. Package ALL state together (readings AND targets)
current_snapshot = {
    "readings": readings,
    "targets": targets
}

# 3. Write the complete package
with open("greenhouse_state.json", "w", encoding="utf-8") as file:
    json.dump(current_snapshot, file, indent=2)
```

## 7. Tradeoffs in Representation Choices

You have options when organizing multi-kind state. The approach chosen should match your program's complexity:

- **Single Combined Container:** Storing all sections under top-level keys in one JSON file guarantees that state updates stay in a single location. However, loading and saving require packaging and unpackaging steps.
- **Multiple Independent Files:** Storing readings in `readings.json` and targets in `settings.json`. This keeps files decoupled, but requires managing multiple file paths, separate error handlers, and coordinated file operations.

Neither strategy is universally mandatory. What is required is that your code does not silently destroy one category of data when updating another.

## 8. Round-Trip Verification Protocol

Never declare multi-kind state functional based on a single program run. Verify it across complete lifecycle restarts using this protocol:

1. **Initial Baseline:** Start with a file containing known records. Check that the program starts and displays those records.
2. **Add Second State:** Add or update a target threshold. Confirm it appears in memory.
3. **Save and Terminate:** Save state and completely quit the Python process.
4. **Inspect Raw Storage:** Open the raw JSON file in an editor. Confirm both sections exist and neither section is empty or mangled.
5. **Cold Restart:** Launch the program afresh. Confirm that both the previous records and the new target threshold are loaded.
6. **Mutate and Re-verify:** Add a new record. Save and quit. Inspect the file again to ensure the target threshold was not wiped out by the new record.

## 9. Reading the Documentation

When working with compound structures in Python's standard library:

```text
json.dump(obj, fp, *, indent=None) -> None
json.load(fp) -> Any (returns dict, list, str, int, float, bool, or None)
isinstance(object, classinfo) -> bool
```

Note that `json.load()` returns whatever top-level type was serialized. If you serialized a dictionary, it returns a dictionary. If you serialized a list, it returns a list. Use `isinstance(data, dict)` and `key in data` to verify what you received before accessing nested keys.

## 10. Debugging Checklist

- Open the raw file on disk. Do you see all expected top-level sections?
- Print `type(data)` immediately after `json.load()` to confirm the root container type.
- Verify that every save routine packages all active state, not just the recently modified variable.
- Check default fallbacks: what happens if the file exists but has `{}` inside?
- Trace variable names: ensure loading assigns to the actual working collections rather than local discarded variables.
- Check for unintended mutations: does modifying a setting alter any collection references?

## 11. What This Pack Does Not Cover

- Database engines, SQLite, or ORM frameworks.
- Complex migration frameworks or schema evolution libraries.
- Classes, custom object encoders, or `__dict__` serialization.
- A mandated schema, key names, or file naming scheme for your project.
- Finance, transactions, ledgers, accounts, expenses, or financial budgets.

## 12. Where This Fits Your Project

Your application already manages persistent records across sessions. Now it needs to manage limits or operational thresholds alongside those records. This pack shows how to organize, save, and defensively restore multiple kinds of state in memory and on disk. You decide what shapes and keys best serve your application's architecture.
