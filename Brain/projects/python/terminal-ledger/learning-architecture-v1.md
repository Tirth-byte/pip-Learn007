# Terminal Ledger — Learning Architecture V1

> **Status:** Proposed for lock — planning document, no learner-facing content authored yet.
> **Date:** 2026-09-08
> **Supersedes:** The Project A roadmap in `Brain/python_projects_v1.md` becomes historical input; this document is the authoritative architecture for Project 1.
> **Reads against:** `Brain/python_projects_v1.md`, `Brain/python_project_knowledge_matrix.md`, `Brain/python_knowledge_map.md`, `Brain/piplearn_documentation_standard.md`, `Brain/python_starting_manual_plan.md`, and the **LOCKED** Starting Manual in `Brain/content/python/starting-manual/`.
> **Scope of this document:** It defines what Terminal Ledger must teach, in what order, under what pressure, and with what guardrails. Later workstreams author the learner-facing milestone briefs and Knowledge Packs from it. It deliberately does **not** design the learner's solution.

---

## 1. Project Purpose

Terminal Ledger is a terminal-based personal finance manager and the learner's **first substantial Python project**, taken immediately after the locked Starting Manual (Sections 01–11).

Its job is to bridge the learner from:

> "I understand Python fundamentals — variables, input, decisions, loops, collections, functions, debugging, and reading documentation."

to:

> "I can plan, build, debug, and finish a multi-feature terminal program, and I can explain the decisions inside it."

The project is the classroom. Terminal Ledger must make the learner **build software**, not follow a disguised tutorial. Every new Python capability in the project is unlocked by a genuine product pressure: data vanishes when the terminal closes, users type nonsense, categories are spelled inconsistently, months matter, budgets need math, reports need aggregation, and a growing single file becomes painful to hold in one's head.

The learner writes 100% of the code. PipLearn specifies the problem, the milestones, the behavioral requirements, the Knowledge Packs, the help ladder, and the completion standard.

### 1.1 What Terminal Ledger is

- A single-user, terminal-first program the learner runs with `python3` from the command line, as taught in Starting Manual Section 02.
- An interactive application that records income and expense entries, keeps them between runs, answers questions about them, warns about budgets, and produces a report and an export.
- A vehicle for introducing the Tier B capabilities assigned to this project by the Knowledge Matrix: file persistence, `with`, reading/writing data, JSON, validation at boundaries, structured data evolution, filtering, dates, aggregation, basic reporting, and modular judgment.

### 1.2 What Terminal Ledger is not

- Not a web app, GUI, or database project.
- Not an authentication, API, or networking project.
- Not a framework or enterprise-architecture exercise.
- Not a pytest course, a design-pattern course, or an OOP course.

### 1.3 Success definition

The project succeeds when a learner who finishes it can:

1. Demonstrate the finished product's behaviors live in a terminal.
2. Explain every design decision in their own implementation in plain language.
3. Diagnose a deliberately introduced bug in their own program using the 7-Step Diagnostic Protocol.
4. Point to their Problem Journal and describe what it changed about how they debug.
5. Say which concepts they learned during the project that they did not know after the Starting Manual, and what pressure forced each one.

---

## 2. Learner Starting Point

This section is an exact inventory of what the **locked** Starting Manual does and does not give the learner. Phase authoring must treat this list as ground truth. Where an older planning document (e.g., `python_projects_v1.md`) assumes knowledge the locked manual does not teach, this architecture prevails.

### 2.1 What the learner can already do

| Area | Capability (from the locked manual) |
|---|---|
| Execution | Run a `.py` file from the terminal; use the REPL as a scratchpad; use `print()` |
| Values & types | `str`, `int`, `float`, `bool`; `type()` inspection; arithmetic `+ - * / //`; explicit conversion with `int()`, `float()`, `str()` |
| Input & output | `input()` always returns a `str`; convert before arithmetic; basic f-strings for embedding values in text |
| Decisions | `==`, `!=`, `<`, `>`, `<=`, `>=`; `and`, `or`, `not`; `if`/`elif`/`else`; indentation rules |
| Collections | Lists: create, index (zero-based), update at an index, `.append()`, `len()`, diagnose `IndexError`. Dictionaries: create, access by key with brackets, update, add a key; choose list vs dict by data role |
| Repetition | `for` over sequences; `range()`; `while` with a boolean condition; `break`; `continue`; recognize and interrupt infinite loops |
| Functions | `def`, define vs call, parameters vs arguments, multiple parameters, `return` vs `print()`, `return` ends the call, local scope, default parameters |
| Debugging | Read a traceback bottom-up (exception type, message, failing line); syntax vs runtime vs logic errors; the 7-Step Diagnostic Protocol; inspect with `print()`/`type()`; change ONE thing; reproduce failures; a basic `try/except ValueError` for one deliberately expected failure |
| Modules & docs | `import module` and `from module import function`; the standard library concept (`datetime` and `json` have been *named* as examples only); reading a signature; parameters vs arguments; `help()`; the smallest-working-example habit |
| Building habits | Turn an idea into observable behaviors; thin first version; milestones; the 5 planning questions; use-what-you-know-first; just-in-time learning contract; the 10-step escalation process; how to ask for help; the Problem Journal habit; refactor after behavior works; the Project Launch Sheet exercise (Section 11) |

### 2.2 What the learner has seen but not been taught

- The words `json` and `datetime` as standard-library examples (Section 10, Section 11's milestone list). They have imported neither.
- A `ValueError` traceback from converting bad text with `int()` (Section 04) and deliberate handling with `try/except ValueError` (Section 09).
- A `KeyError` mention (Section 09 names it among common errors).

### 2.3 What the learner does NOT know yet (locked-manual verified)

`dict.get()`, any string methods (`.strip()`, `.lower()`, `.title()`, …), membership testing with `in` on collections, slicing, `enumerate()`, `zip()`, `sorted()`/`min()`/`max()` usage, format specifiers (`:<15`, `:.2f`), file I/O (`open`, modes, `with`), JSON APIs, `datetime` APIs, the `csv` module, multi-file programs and the `__main__` guard, `raise`, custom exception classes, classes/OOP, comprehensions, `lambda`, `argparse`, `pathlib`, third-party packages beyond the `pip` concept.

This list is not a deficiency to apologize for; Section 11 states the just-in-time contract explicitly. Terminal Ledger's knowledge sequencing in Section 5 is built directly on this list: **every item above that the project needs has a designated phase where project pressure forces it out into the open.**

### 2.4 Psychological starting point

The learner has just been told (Section 11): you are ready now; you will get stuck; getting stuck is the method; escalate calmly; keep a Problem Journal; finish matters. Terminal Ledger's briefs must preserve that tone — calm, adult, empirical — and must never re-teach Section 11's content, only apply it.

---

## 3. Finished Product Capabilities

These are **product behaviors** the finished learner-built program must plausibly support. They are requirements on behavior, not on structure. Every one of them can be implemented many correct ways, and the learner chooses the way.

1. **Record entries.** The user can record money coming in and money going out, each with enough information to be useful later (at minimum: how much, and something that says what it was for).
2. **View entries.** The user can see the recorded entries in a readable listing while the program runs.
3. **Preserve data.** Recorded entries survive closing the program completely and starting it again. A first run on a fresh machine does not crash.
4. **Reject bad input gracefully.** Nonsense typed at any prompt produces a clear message and another chance, never a Python traceback dump.
5. **Categorize.** The user can assign each entry to a category, and the program treats spelling variations as the same category rather than silently splitting them.
6. **Filter.** The user can narrow the view to a chosen category and see a subtotal for that slice.
7. **Work with months.** Entries are dated (sensibly defaulted, user-overridable), and the user can view the entries and money-in/money-out totals for a chosen month.
8. **Budgets.** The user can set a spending limit for a category, see how much of it has been used with a visual indicator, and be warned when spending approaches or passes the limit.
9. **Report.** For a chosen month, the user can see a summary: total in, total out, the net position, and a per-category breakdown ordered from most to least spending.
10. **Export.** The user can write the entries (a month's, or everything) to a file that a spreadsheet application opens correctly, one row per entry.

Non-capabilities by design: multi-user, login, remote sync, charts, colors beyond plain text, installer, performance at scale. "Finished" is defined in Section 12.

---

## 4. Learning Principles

These principles govern every brief, pack, hint, and checkpoint in the project.

1. **The project is the classroom.** No pre-chewed code-alongs. The learner's hands type every line of their program.
2. **Requirements are behavioral; implementation is learner-owned.** Briefs say what must be observably true. They never say what the code must look like: no prescribed names, schemas, file layouts, or structures. (See the Leakage Audit, Section 15.)
3. **Just-in-time gates.** A capability enters the project only in the phase where its absence is the learner's actual problem. Nothing is front-loaded. Phase 1 teaches no new Python.
4. **Knowledge Packs teach capabilities, never the assignment.** Per DOC-STD-001's anti-solution rule, every example in every pack lives in an unrelated domain (library catalog, quiz game, plant watering log, sports scores — never finance, never ledgers).
5. **Evidence before fixes.** The 7-Step Diagnostic Protocol is the default response to every bug. Briefs and hints always ask for evidence (types, values, file contents, exact messages) before proposing change.
6. **Productive struggle is protected, never trapping.** The help ladder escalates; it does not hand out. L5 is a last resort behind journal evidence. (Section 9.)
7. **One new idea at a time.** Each phase introduces the smallest set of new capabilities that the phase's behavior genuinely requires. Deepening of existing knowledge is preferred over new machinery.
8. **Correct behavior first, structure second.** Refactoring happens after behavior works (Section 11 §15) and is scheduled where the code's size makes it painful — Phase 9.
9. **Finishing matters.** The project ends with working, reviewable software and a reflection, not with polished commercial product.
10. **No gamification, no quizzes.** Progress is measured by demonstrable behavior and the learner's ability to explain their work.
11. **The core learning loop** governs every phase:
    understand milestone → plan behavior → attempt implementation → encounter a knowledge gap or problem → inspect evidence → consult the phase's Knowledge Pack(s) → experiment separately in a scratch file → return to the project → solve → reflect → continue.

---

## 5. Knowledge Sequencing Overview

The table shows where each Tier B capability is unlocked and what pressure unlocks it. "Deepens" means an existing concept is exercised in a demanding new combination without new syntax.

| Phase | Immediate pressure on the learner | New knowledge unlocked | Deliberately deferred to a later phase |
|---|---|---|---|
| 1 — Plan the Finance System | "I must know what I'm building before I type" | None. Planning only, using Section 11's tools | Everything technical |
| 2 — Transactions in Memory | "My program must hold several related facts per entry and show them readably" | Format specifiers for alignment (f-strings deepened); records-as-dicts composition (deepens Tier A) | Persistence vocabulary entirely |
| 3 — Save and Load Data | "Everything disappears when I quit" | File I/O, open modes, `with`, text read/write; JSON serialization; handling the first-run (no file) case | Corrupt-file recovery (→ P4); dates (→ P6) |
| 4 — Validate Bad Input | "My program crashes or misbehaves on nonsense, and money math drifts" | The re-prompt validation loop; validation at boundaries; defensive file loading (empty/damaged); float precision and 2-decimal display | Category text normalization (→ P5) |
| 5 — Categories and Filtering | "Entries pile up and spelling differences lie to me" | String normalization methods; membership testing with `in`; extracting a filtered subset; organization-of-data decisions | Dates (→ P6); comprehensions (deferred beyond P1) |
| 6 — Dates and Monthly Views | "Users think in months, not in entry order" | `datetime` essentials: today, parsing from text, formatting to text, comparing dates | Timedeltas, timezones (→ Project C / Tier C) |
| 7 — Budgets | "Tracking is passive; I need rules and warnings" | Persistent multi-kind state (deepens JSON); text repetition for indicators; threshold math and edge rules | — |
| 8 — Reports and Summaries | "A flat listing can't answer 'where did the money go'" | Group-and-sum accumulation with lookup-with-default; `sorted()` with a key function; taking the top N of an ordered sequence | `lambda`, `itemgetter`, `map`/`filter` (Tier C) |
| 9 — Export and Refactor | "My data must reach a spreadsheet, and my file has grown heavy" | `csv` writing (incl. the newline gotcha); multi-file split with imports and the `__main__` guard (conditional on pain); disciplined refactor verification | Packaging, publishing, venv (Tier C / later projects) |

### 5.1 Sequencing guardrails

- **Phase 1 teaches no Python.** The words "JSON", "file", "datetime", "csv" must not appear in the Phase 1 brief as things to learn. (The learner may write "save data later" as a deferred behavior — Section 11 models exactly this.)
- **A capability is taught in the phase where its pressure lives, never earlier.** Packs may not be pulled forward; a learner who asks early is told which phase will need it and is redirected to the current milestone.
- **The locked manual is the floor.** Packs offered at phase N may not use syntax from a later phase's list (e.g., the Phase 3 packs may not use `dict.get()`; the Phase 5 pack is the sanctioned first appearance of string methods; the Phase 8 pack is the sanctioned first appearance of `sorted()` and `dict.get()`).
- **Deepening before machinery.** Where a behavior can plausibly be achieved by composing Tier A knowledge (loops + conditionals + collections + functions), the pack deepens that path first and mentions alternatives only as "you will meet these later."
- **No phase asks for architecture.** Single-file is acceptable through Phase 8. Multi-file structure appears only in Phase 9 and only if the learner's own complexity demands it (Section 6, Phase 9).

---

## 6. Phase Roadmap

Each phase below is the architecture for a learner-facing **milestone brief**. The brief itself (authored later) will contain: the objective in plain language, the behavioral requirements, the evidence of completion, pointers to the phase's Knowledge Packs, and the help ladder. Phase names are kept from the approved baseline; no renames were needed. Time estimates appear in Section 14.

Nothing in any phase prescribes: function names, variable names, a record schema, a JSON shape, file names or locations, folder structure, module boundaries, or the shape of the command loop (menu vs typed commands vs numbered prompts are all acceptable everywhere). The two curriculum-designated constraints — JSON as the persistence format and CSV as the export format — are called out explicitly where they occur and audited in Section 15.

---

### Phase 1 — Plan the Finance System

**Learner-facing objective.** Turn "a personal finance manager" into a concrete, ordered plan of behaviors and a first milestone, before writing application logic. This phase applies Section 11; it teaches no new Python.

**Observable completion behavior.** The learner can present, in their own notes:

- A purpose statement of one sentence.
- 5–8 observable behaviors the eventual program should support (the brief provides the product picture from Section 3; the learner translates it into their own behavior list).
- The single behavior they will build first, with its inputs and the observable result that proves it works.
- At least three features deliberately deferred, with a one-line reason each.
- A debugging plan: what evidence they will inspect if the first milestone fails.
- A runnable skeleton program: it starts, prints a line that says what it is, and exits without crashing. This proves the toolchain (Section 02) before any logic exists.

**Existing knowledge reused.** Section 11 in full (behaviors, thin first version, milestones, Launch Sheet format); Section 02 (running a file); Section 01 (what a program is).

**New knowledge introduced.** None. This is a hard gate.

**Why this knowledge appears now.** It doesn't — that is the point. Beginners who skip planning rewrite endlessly; beginners who over-plan never start. Phase 1 calibrates the middle path with the exact five planning questions from Section 11 §8.

**Knowledge Pack(s).**

- *Planning 01 — From Idea to Behavior: Decomposing a Terminal Program*
  - **Purpose:** Walk the learner from a vague product idea to an ordered behavior list and a first milestone, using the Launch Sheet discipline at project scale.
  - **Concepts covered:** observable vs vague requirements; sequencing behaviors so each builds on the last; defining "done" for one milestone; choosing what to defer.
  - **Concepts explicitly NOT covered:** files, persistence, JSON, data schemas, validation, any Python syntax. No code at all.
  - **Project question it answers:** "What, exactly, is the smallest version of my ledger that proves the core works — and what am I explicitly not building yet?"
  - **Leakage guard:** must not list transaction fields, commands, or a menu; must not hint at storage design; examples from unrelated domains (e.g., planning a plant-watering log).

**Likely learner difficulties.** Over-scoping the first milestone ("I'll build everything, just small"); planning forever as procrastination; designing storage on day 1 because they have seen ledger apps before (the brief must explicitly authorize NOT solving persistence now); choosing record fields they cannot justify when asked "what will you use this for?"

**Evidence to inspect.** Their written plan; whether each behavior is observable ("program shows X" vs "program is nice"); whether the first milestone is thinner than they think they need; that the skeleton actually runs.

**Mentor checkpoint.** Not required. The plan is reviewed against the brief by the system or in the next session's opening minutes. A mentor may glance at over-scoping, but the designed intervention is the brief's own "defer at least three features" requirement.

**Reflection prompt.** "Which behavior did you want to build first before reducing scope — and what evidence convinced you it wasn't the right first milestone?" / "Name one feature you deferred that you were tempted to keep."

---

### Phase 2 — Transactions in Memory

**Learner-facing objective.** During one running session, the user can record money coming in and money going out, see the entries listed readably, and see correct totals. All state lives and dies with the process — which is exactly what makes Phase 3 hurt.

**Observable completion behavior.** The learner can demonstrate in one session:

- Recording at least one incoming and one outgoing entry, each capturing how much and what it was for (the learner decides what else a record needs and can justify each field).
- Viewing a listing of the recorded entries that is readable — columns line up even when one description is much longer than another.
- Totals that reflect the entries correctly: money in, money out, and/or a net figure (presentation is the learner's choice).
- The program distinguishes money-in from money-out in a way the learner can explain (sign convention, explicit direction, or another defensible scheme).
- Quitting the program and losing everything — observed and written down as the problem Phase 3 will solve.

**Existing knowledge reused.** Dictionaries as multi-field records (composition of Section 06); lists of records; `for` over the list; `input()` + conversion (Section 04); comparisons and branching; functions with parameters and returns (Section 08); f-strings; the while-command-loop shape from Section 11.

**New knowledge introduced.**

- **Format specifiers in f-strings** for fixed-width columns and numeric display (deepens Section 04's f-strings; first appearance of alignment syntax).
- Composition skill: a record is one dict holding several related values; the ledger is a list of such records. No new syntax — a new *shape of thinking* over known syntax.

**Why this knowledge appears now.** Printing several records side by side is the first time raw f-string interpolation produces visibly broken output (columns drift). The learner needs aligned output *now*, and a formatted listing is the honest pressure. Records-as-dicts is reachable with Section 06 knowledge; the pack deepens it rather than introducing machinery.

**Knowledge Pack(s).**

- *Records 01 — Modeling One Thing with Several Fields*
  - **Purpose:** Deepen dicts from "a player profile" to "one record in a collection of records": when a record needs another field, where it gets added, and how to read one field of one record inside a loop.
  - **Concepts covered:** records as dicts; lists of records; accessing and updating fields; choosing a list vs a dict for a whole ledger (a genuine design decision the learner owns).
  - **Concepts explicitly NOT covered:** persistence, uniqueness/IDs (the learner may invent them; not required), sorting, any date handling.
  - **Project question it answers:** "What does one entry need to contain so the later features (totals, filtering, months) remain possible — no more, no less?"
  - **Leakage guard:** examples use unrelated records (e.g., a collection of houseplants with species, purchase date-free notes, watering interval); must not name ledger fields, must not show a "transaction record" example, must not prescribe a list-of-dicts as *the* answer over any other organization.
- *Display 01 — Aligned, Readable Terminal Output*
  - **Purpose:** Teach f-string format specifiers for width and alignment so tabular text stops drifting.
  - **Concepts covered:** minimum-width and alignment specifiers for text and numbers; combining with loops over records.
  - **Concepts explicitly NOT covered:** precision specifiers (`:.2f` — reserved for Phase 4), colors, external libraries, string methods.
  - **Project question it answers:** "Why do my columns wobble when one description is long, and how do I make the listing hold still?"
  - **Leakage guard:** examples format unrelated tables (quiz scores, shelf inventory); must not show a ledger listing, currency formatting, or totals accumulation.

**Likely learner difficulties.** Amounts captured as text because `input()` returns a string (Section 04's golden rule bites again, now with money); totals that silently concatenate or mis-add; sign/direction confusion producing a net figure that is wrong in an way they can't explain; one giant block of code where "where does listing happen?" is unanswerable (the moment functions start earning their keep); columns that still wobble because the width was applied to the wrong value.

**Evidence to inspect.** `type()` of every value just after input; the printed listing next to the raw collection (print the list itself, then the formatted version, and compare); totals recomputed by hand against 3–5 entries; whether each entry's fields are what was intended at record time.

**Mentor checkpoint.** Not required. L0–L5 and the packs cover this phase; the knowledge is Tier A deepening.

**Reflection prompt.** "If a user records 200 entries, what in your current program will become unpleasant first?" / "What does one of your records contain, and what feature of Sections 3–9 will each field serve?"

---

### Phase 3 — Save and Load Data

**Learner-facing objective.** Kill the disappearing-data problem: recorded entries survive a full quit and relaunch, and a first run on a machine with no data file starts cleanly instead of crashing. This is the project's biggest Tier B unlock and the moment the just-in-time contract pays off visibly.

**Observable completion behavior.** The learner can demonstrate:

- Record entries, quit the program completely, relaunch, and see every previously recorded entry still listed with correct totals.
- Delete/rename their data file (or run on a "fresh machine") and start the program: no crash; the program behaves like an empty ledger and says so or plainly proceeds.
- Open the data file in a text editor and find their data in it, readable as text — the file format is JSON (curriculum-designated: see Section 15, item A1).
- Explain, in plain language, the lifecycle: what happens on start, what happens after every change to the data, and why the program never silently loses or duplicates entries.

**Existing knowledge reused.** Everything from Phase 2; `try/except` for one deliberately expected failure (Section 09) now extended by the packs to the file/JSON failure cases; import discipline (Section 10) for the standard-library modules involved; the smallest-working-example habit (Section 10 §14) — every persistence mechanic is learned in a scratch file first.

**New knowledge introduced.**

- Files as text on disk: opening, modes for reading and writing, and the `with` statement and why it exists.
- JSON serialization: turning Python values into storable text and back; what JSON can and cannot represent.
- The first-run situation: how a program finds out whether its data file exists yet, and two legitimate strategies (checking, or catching the specific failure) — the learner picks one and can defend it.
- JSON-aware debugging: reading the file, expecting the loaded value to be one thing and discovering it is another.

**Why this knowledge appears now.** The Phase 2 closing observation ("everything is gone") is the pressure. Persistence cannot be pulled earlier without front-loading, and cannot be postponed because every later phase builds on durable data. This is the manual's own example made real (Section 11 §10: "when data must survive program restarts, you will learn file persistence").

**Knowledge Pack(s).**

- *Persistence 01 — Files, Modes, and the `with` Statement*
  - **Purpose:** Teach text files as a capability: open for reading vs writing, what the mode means, why `with` closes the door behind you, and what a zero-byte or half-written file looks like when a program dies mid-write.
  - **Concepts covered:** `open()` and read/write modes; reading text; writing text; `with`; existence checking as one strategy for the missing-file case.
  - **Concepts explicitly NOT covered:** JSON (next pack), binary modes, appending strategies for records, `pathlib`, encodings beyond the default.
  - **Project question it answers:** "How does a program put text on disk and get it back — and what happens the very first time, when there is no file yet?"
  - **Leakage guard:** all examples save/read unrelated text (a reading list, a settings note); must not show saving a collection of records, must not name the learner's data file, must not pick the existence-check vs exception strategy for them.
- *Persistence 02 — JSON: Serializing Values to Text and Back*
  - **Purpose:** Teach the JSON mental model: a language-independent text format; which Python values round-trip cleanly; what happens to the data on the way out and on the way back in.
  - **Concepts covered:** the standard `json` module's dump/load directions; what JSON preserves (collections, text, numbers, booleans) and what it flattens; the type of the value that comes back from loading; JSON's own syntax errors as a distinct exception when text is not valid JSON.
  - **Concepts explicitly NOT covered:** datetime objects in JSON (dates are strings in this project — Phase 6's business), custom classes, nested schemas, minify/pretty-print tradeoffs beyond a mention, alternative formats (YAML/TOML/CSV-as-storage).
  - **Project question it answers:** "How do my entries become text that survives the program, and what exact value do I get back when I load it?"
  - **Leakage guard:** examples serialize unrelated collections (a book catalog, a quiz's high scores); must never show a ledger being saved, must not prescribe storing the whole collection vs appending, must not show any "save my records / load my records" function.

**Likely learner difficulties.** After implementing saving, earlier entries vanish and only the most recent one survives (a symptom to diagnose from the file contents, not a fix to be told); the program crashes on its very first run because the file does not exist yet; the loaded value is the right data but never gets connected to the running state, so the program behaves as if the load never happened; trying to persist a value JSON cannot represent and meeting the serialization error for the first time; writing the file but reading it with the wrong assumption about what comes back (text vs structured value), discovered by `type()` inspection; the in-memory state and the on-disk state drifting out of sync because saving happens in one code path but not another.

**Evidence to inspect.** The data file's raw contents in an editor after each change; `type()` of the loaded value immediately after loading; the exact exception name and message when the file is missing or empty; whether the loaded value is actually handed to the same state the rest of the program reads; totals after a restart vs before.

**Mentor checkpoint.** **Checkpoint 1 of 3 (recommended).** Persistence is the largest conceptual leap in the project and the foundation under every later phase. A short human review at the end of this phase verifies the learner can narrate the load/save lifecycle, that their program's first run is graceful, and that they are not accumulating misconceptions (e.g., saving in some code paths only). Twenty minutes of mentor time here prevents compounding damage across six phases. See Section 11.

**Reflection prompt.** "Where in your program does saving happen, and can a change to your data occur without a save? How do you know?" / "Your program met a missing file for the first time — what did it do, and is that the behavior you would defend in six months?"

---

### Phase 4 — Validate Bad Input

**Learner-facing objective.** The program stops trusting its inputs. Nonsense typed by a human at any prompt produces a clear message and another chance; nonsense found in the data file produces a warning, not a crash and not silent data destruction; money math stops drifting at the penny level.

**Observable completion behavior.** The learner can demonstrate:

- Entering letters, symbols, empty text, and absurd numbers at numeric prompts: each produces a friendly message and a re-prompt; the program never dumps a traceback at the user.
- The same for any other prompt the program asks (the learner enumerates their own prompts and states what "bad" means for each — this enumeration is part of the demonstration).
- A damaged data-file scenario: with the file emptied or corrupted deliberately, the program starts without crashing, warns plainly, and the learner can explain what happens to the (unusable) data and why no good data is silently destroyed.
- All money values display consistently with two decimal places everywhere.
- The learner can show the float-precision phenomenon in a scratch file (`0.1 + 0.2` style) and explain in one sentence why it happens and what their program does about it (rounding for display, rounding on entry, or another defensible policy — their choice, articulable).

**Existing knowledge reused.** `while` loops with reachable exits (Section 07); `try/except ValueError` for a single expected failure (Section 09) — now used as a *pattern*; the 7-Step Protocol; Phase 3's file-reading capability extended to hostile content; f-strings for messages.

**New knowledge introduced.**

- The **re-prompt validation loop** as a reusable pattern at every system boundary: convert, check rules, and either accept or explain-and-repeat. "Validation at the boundary" as a concept: data is checked where it enters (keyboard, file), and the interior of the program can then trust it.
- **Defensive loading:** the empty-file and damaged-file cases distinguished from the missing-file case of Phase 3; deciding (learner's choice) whether to warn-and-start-empty, refuse to start, or another policy — with the invariant that nothing silently destroys recoverable data.
- **Float precision:** why binary floats drift; formatting to a fixed number of decimals; `round()` as a capability; the display-vs-storage tradeoff at awareness level.
- String emptiness and whitespace as input hazards (formally unpacked; full normalization methods arrive in Phase 5).

**Why this knowledge appears now.** Phase 2–3 produced a program that works when the human cooperates and the file is clean. Real users type "abc" for an amount and files get truncated. The project's own demonstrations keep crashing, and financial data is exactly where silent numeric drift is least acceptable. This is the brief's designated phase for "validation, conversion boundaries, exceptions where appropriate, recovering from invalid input/data."

**Knowledge Pack(s).**

- *Robust Input 01 — The Re-Prompt Loop: Validation at the Boundary*
  - **Purpose:** Teach the accept-or-explain-and-repeat pattern for converting and checking input, the correct scope for `try/except`, and why blanket exception-swallowing hides real bugs (Section 09's trap, now with stakes).
  - **Concepts covered:** the re-prompt loop shape; which failures are "expected" and handled vs which are bugs; rule checks beyond type (ranges, emptiness); applying the pattern at every boundary of a program.
  - **Concepts explicitly NOT covered:** custom exception classes, `raise`, `else`/`finally` blocks, regex, validation libraries.
  - **Project question it answers:** "Where does my program touch the outside world, and what is my program's response when the outside world hands it garbage?"
  - **Leakage guard:** examples validate unrelated inputs (an age for a bouncy-castle booking, a username); must not show any ledger/money prompt, must not provide a "get a valid number" ready-made helper for finance.
- *Numbers 01 — Float Precision and Two-Decimal Display*
  - **Purpose:** Make the drift phenomenon visible and teach the two safe tools: formatting for display and rounding as a deliberate policy.
  - **Concepts covered:** why `0.1`-style values are approximations; precision format specifiers; `round()`; the difference between fixing display and fixing stored values; a decision framework (not a mandate) for which to use where.
  - **Concepts explicitly NOT covered:** `decimal.Decimal` (named as a later-tier tool only), currency libraries, integer-cents modeling as a mandate (the learner may discover it; not prescribed).
  - **Project question it answers:** "Why does my total sometimes look like it can't be right at the penny level, and what is my program's policy?"
  - **Leakage guard:** examples total unrelated prices (a café receipt, sports timing); must not prescribe a storage policy for ledger amounts, must not show ledger totals code.
- *Persistence 03 — Defensive Loading: Missing, Empty, and Damaged Files*
  - **Purpose:** Extend Phase 3's loading to the hostile cases: file exists but is empty; file exists but is not valid JSON; file is valid JSON but not the shape the program expects.
  - **Concepts covered:** distinguishing the three failure cases by evidence; JSON's parse error vs Python's file errors; policies for recovery and the no-silent-destruction invariant.
  - **Concepts explicitly NOT covered:** backups/atomic writes (mentioned as "later"), schema validation tooling, migrations (the project's structured-evolution pressure is handled by learner judgment, not machinery).
  - **Project question it answers:** "My data file is not what my program expects — what are the possible situations, and what will my program do in each?"
  - **Leakage guard:** examples load unrelated saved state (a game save, a config note); must not prescribe a recovery policy for the ledger, must not show ledger-file inspection code.

**Likely learner difficulties.** Re-prompt loops that never terminate or that swallow the good input along with the bad; a broad exception handler that silences a genuine bug and makes the program "work" while being wrong; validation applied in some paths but not others (the same bad value enters via two doors); discovering that the file can be *valid JSON* and still be the wrong shape; drift discovered in totals that individually looked fine; choosing a rounding policy twice (inconsistently) without noticing.

**Evidence to inspect.** The full input-failure matrix (each prompt × each kind of garbage) run live; the exact exception type and message from the damaged-file scenarios; `type()` and value of everything loaded from the file; totals recomputed by hand with penny-level care; the program's behavior diff between "empty file" and "missing file".

**Mentor checkpoint.** Not required. This phase is well-served by packs and the ladder. (Checkpoint 1 has just happened; the next designed intervention is Phase 6.)

**Reflection prompt.** "List every place your program accepts data from outside itself. For each one: what bad input is possible, and what does your program do?" / "What is your program's policy when its saved data is damaged — and did you choose it, or did it happen to you?"

---

### Phase 5 — Categories and Filtering

**Learner-facing objective.** Entries become queryable. The user can assign each entry to a category, and can narrow the view to one category with a correct subtotal — including when the same category was typed with different casing or padding at different times.

**Observable completion behavior.** The learner can demonstrate:

- Assigning categories to new entries, and the program's rule for what categories exist (a fixed set, free text, or a hybrid — the learner's design, articulable).
- Viewing only the entries of one chosen category, with a subtotal for that slice that matches a hand count.
- Recording the same category with different casing and surrounding spaces on different entries and showing that the program treats them as one category (the behavior; the mechanism is the learner's).
- Explaining what happens when a filter matches nothing, and when a category name is typed that the program doesn't recognize.
- The learner can articulate at least one consequence of their data-organization choice (e.g., "my records stay in one list and filtering produces a temporary view" vs any other organization) and why it doesn't fight the earlier phases.

**Existing knowledge reused.** Records and collections (Phases 1–3); loops and conditionals for selection; functions (Section 08) — the filter is the first naturally reusable, nameable computation; Phase 4's boundary mindset (the category prompt is a boundary); Phase 2's display work for the narrowed view.

**New knowledge introduced.**

- **String normalization methods** (`.strip()`, `.lower()`, and friends as a family to look up) — the sanctioned first appearance of string methods, motivated by the spelling problem.
- **Membership testing with `in`** on collections (e.g., is a proposed category a recognized one?) — a small but genuinely new capability.
- **Extracting a filtered subset** as a deliberate pattern: walk the collection, test each record against criteria, collect matches — producing a new list rather than mutating the ledger. (Loop-based; comprehensions remain deferred.)
- Aggregation-of-a-slice (summing the matches) as a preview of Phase 8, using only arithmetic and loops.

**Why this knowledge appears now.** A ledger with more than a dozen entries is unusable as one flat listing, and the case-sensitivity bug is a *discovery*: the program reports two different categories that the user knows are one. That discovery is the honest pressure for text normalization; the flat-list pain is the pressure for subsetting.

**Knowledge Pack(s).**

- *Strings 01 — Normalizing Text for Reliable Comparison*
  - **Purpose:** Teach that text equality is unreliable when humans type it, and give the normalization toolkit: trimming surrounding whitespace, case-folding, and the general habit of normalizing both sides before comparing.
  - **Concepts covered:** `.strip()`, `.lower()`/`.upper()`, applying normalization at the boundary (Phase 4's concept, now with text); why "normalize once at entry" vs "normalize at every comparison" is a real tradeoff.
  - **Concepts explicitly NOT covered:** `.title()` semantics beyond a mention, regex, Unicode complexities, fuzzy matching.
  - **Project question it answers:** "Why do 'Food' and 'food ' act like two categories, and where in my program should that difference be erased?"
  - **Leakage guard:** examples normalize unrelated text (city names in a travel log, usernames); must not show category matching for the ledger, must not prescribe where the learner normalizes.
- *Querying 01 — Extracting a Matching Subset from a Collection*
  - **Purpose:** Teach subsetting as a pattern that produces a new collection: criteria in, matching records out, original untouched; plus summing over the result.
  - **Concepts covered:** the walk-test-collect pattern with plain loops; keeping the source collection intact; composing criteria (match category); subtotal accumulation with `+=`.
  - **Concepts explicitly NOT covered:** list comprehensions (named as "a later, more compact idiom"), `filter()`/`map()`, sorting the subset (Phase 8), dict-of-buckets reorganization (a learner option, not taught as the answer).
  - **Project question it answers:** "How do I answer 'show me only X' without disturbing the records themselves — and where does the answer live?"
  - **Leakage guard:** examples filter unrelated collections (books by genre, tasks by priority); must not show ledger filtering, must not prescribe a helper-function signature for it.

**Likely learner difficulties.** The subtotal that is wrong because an accumulator was not reset between repeated queries in one session; matching that works for the comparison the learner tested and fails for another casing combination; mutating the main collection while "filtering" it and losing records; categories that differ invisibly (trailing space) and corrupt every later aggregate — usually discovered in Phase 7 or 8 and traced back here; reaching for a nested-collection reorganization that fights the persistence shape from Phase 3.

**Evidence to inspect.** The raw category values as stored (print them with visible delimiters) vs the query string; the filtered subset printed before any subtotal is computed; accumulator values at the start and end of a query; a hand count against the program's subtotal; the main collection before and after a filter (length unchanged).

**Mentor checkpoint.** Not required. Ladder plus packs suffice. (If the learner invented categories-as-different-organizations here, the Phase 6 checkpoint will catch structural trouble before it compounds.)

**Reflection prompt.** "Where does normalization happen in your program — once at entry, or at every comparison? What made you choose that?" / "After a filter runs, what does your program still know, and what did it only borrow?"

---

### Phase 6 — Dates and Monthly Views

**Learner-facing objective.** Entries acquire dates (sensibly defaulted, user-overridable), and the user can ask the program about a specific month: which entries, and how much money came in and went out.

**Observable completion behavior.** The learner can demonstrate:

- Recording an entry that is automatically associated with today's date without the user typing it.
- Recording an entry with a date the user supplies (a past date), including demonstrating what happens when the supplied date is nonsense (a date that doesn't exist, or text that isn't a date) — the Phase 4 pattern reused at a new boundary.
- Viewing the entries and the money-in/money-out totals for a chosen month, verified against a hand count.
- Explaining how dates are stored in their data file (as what kind of value) and why their choice makes the month question answerable — the learner can open the file and show the stored date values.
- The learner can state what happens when entries from different years share a month number, and show their program gets it right.

**Existing knowledge reused.** Everything through Phase 5; the re-prompt validation pattern (Phase 4) applied to dates; the standard-library import discipline and signature-reading from Section 10 (the `datetime` module was *named* there; now it is actually used); smallest-working-example habit for all date experiments.

**New knowledge introduced.**

- The **`datetime` module essentials**: getting today's date; constructing a date from text the user typed (parsing) and turning a date back into text (formatting); comparing dates. These are the only date capabilities this project needs.
- ISO-style date representation as a taught capability inside the pack (human-sortable, unambiguous) — the pack teaches it; adopting it for storage remains the learner's informed choice.
- Date validation: text that parses vs text that doesn't, and nonexistent calendar dates.

**Why this knowledge appears now.** Cashflow is inherently temporal and the user's questions are ("what happened in March?"). Before this phase, the program cannot even ask that question — there is nothing in a record to answer it with. This is the first standard-library module the project *requires*, exercising Section 10's documentation-reading skill on real API signatures.

**Knowledge Pack(s).**

- *Dates 01 — Representing Dates with the `datetime` Module*
  - **Purpose:** Teach dates as values (not text): today's date, a date type with parts, and why a real date value beats hand-built strings.
  - **Concepts covered:** importing and exploring the module; today's date; the parts of a date value; formatting a date to a string for display.
  - **Concepts explicitly NOT covered:** times of day beyond a mention, timezones, timedeltas and date arithmetic (Project C), the `calendar` module, locale-aware formatting.
  - **Project question it answers:** "What is a date, in my program — text I typed, or something smarter? And what does 'today' look like as a value?"
  - **Leakage guard:** examples track unrelated dated things (a plant's watering days, a reading log); must not show entries gaining a date, must not prescribe an ISO-storage decision.
- *Dates 02 — Parsing, Formatting, and Comparing Dates*
  - **Purpose:** Teach the round-trip with user text: parse text into a date (and meet the failure when text isn't a date), format back for display and storage, compare dates, and the unambiguous sortable representation.
  - **Concepts covered:** parsing with format codes; the exception when parsing fails (the Phase 4 pattern applied); formatting back out; date comparisons (`<`, `>`, `==`); why a zero-padded, year-first representation sorts and filters honestly as text — taught as capability, adopted or not by the learner.
  - **Concepts explicitly NOT covered:** timedeltas, recurrence, business-day logic, timezone-aware parsing.
  - **Project question it answers:** "How does 'March 2026' in the user's mind become a question my records can answer — and what happens to '2026-02-30'?"
  - **Leakage guard:** examples parse unrelated dated input (membership expiry, delivery windows); must not show month filtering of ledger records, must not prescribe the string-prefix technique or any specific filter mechanism.

**Likely learner difficulties.** Treating the stored date as display text and then being unable to answer month questions with it; format codes that round-trip on one machine's habits and not the user's input style; the parse failure that isn't handled at the new boundary (regression against Phase 4's lesson); month matching that ignores the year or breaks on single- vs two-digit representations; dates that display fine but were never validated, letting February 30 into the data and poisoning later views.

**Evidence to inspect.** The stored date values in the data file (what type/shape are they really?); the parsed date value printed after parsing user text; the exact exception on a nonsense date; a month's filtered result beside a hand count; comparisons of two dates the learner knows the order of.

**Mentor checkpoint.** **Checkpoint 2 of 3 (recommended).** This is the half-way calibration. Three phases of derived features (budgets, reports, export) will all consume the record shape and date handling the learner now has. A short human review verifies the data organization is still coherent (not fighting itself), the validation discipline survived contact with a new boundary, and the learner can narrate their storage lifecycle end-to-end. Cheaper to correct now than after budgets and reports are built on top. See Section 11.

**Reflection prompt.** "What question can your program answer now that it couldn't after Phase 5 — and what single capability made the difference?" / "If you had known in Phase 2 what a record would need to contain by now, what would you have changed — and is that a real regret or hindsight bias?"

---

### Phase 7 — Budgets

**Learner-facing objective.** The program stops being passive bookkeeping: the user can set a spending limit per category, see how much of it is used with a visual indicator, and be warned when spending approaches or passes the limit. Budget state persists like the entries do.

**Observable completion behavior.** The learner can demonstrate:

- Setting a limit for a category and seeing, on demand, a per-category budget view: limit, amount used this month, and a visual indicator (e.g., a bar of characters) whose length tracks the fraction used — and which does not break when spending is 0%, 100%, or far past 100%.
- A warning that appears when spending crosses the warning threshold(s) the learner designed (e.g., near and over) — demonstrated live by recording an entry that crosses it.
- Quitting and relaunching: the limits survive, exactly like entries do; the data file now carries both kinds of information and the learner can explain how their file organizes them.
- The edge cases: a limit of zero, spending on a category with no limit set, and a month with no spending — none crash, all say something sensible.
- The learner can explain where "amount used" comes from: it is computed from the entries, not stored separately (state derived from data, not duplicated) — or, if they duplicated it, they can defend that choice and its sync risk. The former is strongly preferred and the review probes for it.

**Existing knowledge reused.** Everything through Phase 6; Phase 3's persistence lifecycle now covering a second kind of data (the structured-evolution pressure in miniature); Phase 5's normalization (limits attach to categories — same spelling problem); Phase 4's validation (a limit is a numeric boundary input); arithmetic and comparisons (Section 03/05).

**New knowledge introduced.**

- **Persistent multi-kind state:** organizing a data file that holds more than one kind of thing (entries and limits), and evolving the loading/saving and the defensive-loading thinking (Phase 4) to match. This is the project's "structured data evolution" pressure in its safest possible setting.
- **Text repetition** (a string multiplied by a count) for building visual indicators — a small, satisfying discovery inside arithmetic the learner already owns.
- **Threshold and percentage math with edge rules:** ratios, capping at 100% for display, and deciding what "used" means (this month vs all time) as an explicit product decision.

**Why this knowledge appears now.** Tracking answers "what happened?"; budgeting answers "am I about to overshoot?" — a rule over the data. The rule needs: a second kind of persistent state (just-in-time deepening of Phase 3), arithmetic over a filtered slice (Phase 5's pattern), and a visual that reads at a glance. Nothing here requires new collections or modules — it requires judgment plus two small capabilities, which is exactly the right weight after the `datetime` unlock.

**Knowledge Pack(s).**

- *State 02 — Organizing Multiple Kinds of Persistent Data*
  - **Purpose:** Teach the structured-evolution step: a saved store that holds several kinds of information, how loading/saving changes, how defensive loading extends, and how to evolve without losing the data already on disk.
  - **Concepts covered:** one store, several kinds of data; loading with sensible behavior when a kind is absent (older files); the no-silent-loss invariant extended; evolving a file the learner already has data in.
  - **Concepts explicitly NOT covered:** versioning schemes/migration frameworks, schemas or key names for the learner's store, one-store-vs-many-stores as a mandate (a learner choice).
  - **Project question it answers:** "My program now remembers two different kinds of things — how does my file, my loading, and my saving change without breaking what's already saved?"
  - **Leakage guard:** examples evolve unrelated saved state (a game save gaining a settings section, a plant log gaining care rules); must not prescribe the learner's store shape or key names, must not show entries-plus-limits storage.
- *Display 02 — Text Progress Indicators and Status Warnings*
  - **Purpose:** Teach the string-repetition capability and the composition of a readable indicator: a bar whose filled fraction means something, plus threshold-driven status text.
  - **Concepts covered:** building a repeated-character bar from a fraction; keeping bars bounded; choosing thresholds and wording; testing an indicator at 0, half, full, and over.
  - **Concepts explicitly NOT covered:** colors/terminal escape codes, third-party UI libraries, animation.
  - **Project question it answers:** "How do I show 'how full is this category's budget' so a user grasps it in one glance — and stays truthful past 100%?"
  - **Leakage guard:** examples render unrelated indicators (a download progress bar, a tank level, a quiz timer); must not compute or display budget usage itself.
- *Verification 01 — Small Repeatable Checks Without a Framework*
  - **Purpose:** Teach the learner to write their own tiny check script: run the computation with known inputs, print expected vs actual, count mismatches. Introduces repeatable-check thinking with zero tooling. (See Section 8 — this is where lightweight automated checks begin.)
  - **Concepts covered:** expected-vs-actual comparison; making a check repeatable (same inputs every run); why hand-recalculating every time stops scaling; keeping checks out of the program itself.
  - **Concepts explicitly NOT covered:** test frameworks, assertion tooling, fixtures, mocking, coverage, CI — all explicitly out of scope for Project 1.
  - **Project question it answers:** "I keep re-testing my math by hand after every change — what is the smallest habit that makes that stop hurting?"
  - **Leakage guard:** examples check unrelated logic (a unit converter, a quiz scorer); must not provide a test suite for the ledger, must not prescribe what the learner checks.

**Likely learner difficulties.** Division by zero when a limit is zero and a ratio is computed; indicators that claim 400% or render nonsense past 100%; limits that vanish on restart (the second kind of data never joined the save/load lifecycle — Phase 3's lesson re-learned at a deeper level); "used" computed over all history when the product means this month (or vice versa), producing warnings that feel wrong; old data files from earlier phases that now load in a way that silently drops the new kind of state; duplicating the used-amount into storage and watching it disagree with the entries.

**Evidence to inspect.** The ratio values printed before rendering (number, not bar); the indicator at 0/50/100/>100%; the data file before and after adding a limit; the loaded value of each kind after a restart; a warning crossing demonstrated live; the derived "used" number recomputed by hand for one category-month.

**Mentor checkpoint.** Not required. The Phase 6 checkpoint already calibrated the foundation this phase stands on; the ladder handles the rest.

**Reflection prompt.** "Which of your program's numbers are stored, and which are computed? How would you notice if a stored one and a computed one disagreed?" / "Your data file now holds two kinds of information. What did you have to change in loading and saving — and what would a third kind cost?"

---

### Phase 8 — Reports and Summaries

**Learner-facing objective.** The program answers the question a flat listing never could: for a chosen month — total in, total out, the net position, and a per-category breakdown ordered from most to least spending.

**Observable completion behavior.** The learner can demonstrate:

- Requesting a report for a chosen month and receiving: total in, total out, net position, and a category breakdown where the ordering is visibly most-to-least spending and the numbers match a hand calculation.
- A month with a single entry, and an empty month: both produce a sensible report rather than a crash or a nonsense number.
- Correctness under mixed data: entries from other months, other categories, and entries with identical amounts — none of them disturb the report.
- The learner can explain how the breakdown is built: from what, into what shape, in what order — narrating the transformation without reading the code aloud.
- (Recommended, see Section 8) A small repeatable check the learner wrote that verifies the report math on fixed inputs they can verify by hand.

**Existing knowledge reused.** Everything through Phase 7; Phase 5's filtering for slicing a month; Phase 6's dates for the slice boundary; Phase 4's display discipline; Phase 7's derived-state thinking (the report is pure derivation — nothing new is stored).

**New knowledge introduced.**

- **Group-and-sum accumulation:** walking a collection and building an accumulation dict keyed by category — with the **lookup-with-default** pattern (`dict.get(key, default)`) as its sanctioned first appearance.
- **`sorted()` with a key function:** ordering records/pairs by a field of interest, using a *named* function as the key — the sanctioned first appearance of `sorted()` and of functions-as-values, deliberately without `lambda` (Tier C).
- **Taking the top N of an ordered sequence** (basic slicing) for "biggest categories first" presentation.
- Ratio/average derivations (e.g., net as a percentage of income) as optional report enrichments from plain arithmetic.

**Why this knowledge appears now.** Aggregation is the payoff capability of the whole project and the Knowledge Matrix assigns it here ("Data Aggregation & Grouped Accumulation — Project A"). The pressure is honest: the user's real question ("where did the money go?") is unanswerable by listing, filtering alone, or budgets. It also sets up Phase 9: the report is the first output worth exporting.

**Knowledge Pack(s).**

- *Aggregation 01 — Grouping and Summing Records*
  - **Purpose:** Teach the walk-and-accumulate transformation: many records in, one summary structure out; keyed accumulation with lookup-with-default; verifying the result against a hand count.
  - **Concepts covered:** accumulator dictionaries; `.get(key, default)`; grouping by one field; summing a second; the empty-collection case; the one-pass vs two-pass tradeoff at awareness level.
  - **Concepts explicitly NOT covered:** `collections.Counter`/`defaultdict` (named as later conveniences), comprehensions, multi-level grouping.
  - **Project question it answers:** "How do I turn 40 scattered entries into one honest picture of spending per category — and how do I prove the picture is right?"
  - **Leakage guard:** examples aggregate unrelated records (points per team in a tournament, pages read per book); must not aggregate ledger categories, must not connect aggregation to the report layout.
- *Ordering 01 — Sorting with a Key Function*
  - **Purpose:** Teach `sorted()`: basic ordering, then ordering by a field via a named key function, descending order, and taking the first few of an ordered sequence.
  - **Concepts covered:** `sorted()` on simple values; the `key=` parameter with a named function; `reverse`; basic slicing for "top N"; stability intuition ("ties keep their relative order — is that okay for my report?").
  - **Concepts explicitly NOT covered:** `lambda` (Tier C), `operator.itemgetter`, `.sort()` in place vs `sorted()` beyond a mention, multi-key sorts.
  - **Project question it answers:** "My summary exists — how do I present it from most significant to least, and what decides 'significant'?"
  - **Leakage guard:** examples rank unrelated things (players by score, books by page count); must not sort ledger data, must not show a report being assembled.

**Likely learner difficulties.** Aggregates that silently start from the wrong initial value or miss one branch of the data; accumulation keyed by un-normalized categories (the Phase 5 ghost returning as a report that shows the same category twice); ordering that comes out ascending by accident, or sorting the wrong collection and reporting the right numbers in the wrong order; mixing months because the slice boundary was fuzzy; a report that contradicts the on-screen listing for the same data — the trust-destroying bug; the empty-month case producing a crash or a division error in an optional ratio.

**Evidence to inspect.** The accumulation structure printed in full before ordering; the ordered result before display; a hand-built expected report for one small month next to the program's output; the empty month's behavior; per-category sums against a hand count for a deliberately tricky dataset (mixed casing, mixed months, tied amounts).

**Mentor checkpoint.** Not required. Packs plus the (recommended) repeatable checks cover the math; the final checkpoint reviews everything at Phase 9.

**Reflection prompt.** "Your report is computed, never stored. What would make you consider storing it — and what would that cost you?" / "Where did a number in your report first disagree with your hand calculation, and what evidence found the truth?"

---

### Phase 9 — Export and Refactor

**Learner-facing objective.** Move the program's value out into the world and the program's structure into shape: export entries to a file a spreadsheet opens correctly, and — now that the code has grown — reorganize responsibilities with the pain as the justification, proving behavior never changed.

**Observable completion behavior.** The learner can demonstrate:

- Exporting (a chosen month's entries, or all of them — the learner's scope decision) to a file; opening that file in a spreadsheet application; one row per entry, columns meaningfully labeled, and a description containing a comma surviving intact (the learner tests this deliberately).
- The export respects the program's own boundaries: the exported file is written once per export and never corrupts or replaces the ledger's own data file (the learner can explain the difference between the two files and their jobs).
- A structural review in the learner's own words: what responsibilities their program has (talking to the user, keeping records, computing, persisting, presenting) and where each lives now. If the code is still one file, the learner can explain that choice and where the seams would be; if they split it into multiple files, the program runs cleanly and the learner can explain what imports what and why nothing imports what runs it (the `__main__` guard's purpose, in their own words).
- A refactor-verification pass: before-and-after runs of the same command sequence produce identical observable behavior (this is where the Phase 3+ verification checklist and any Phase 7/8 checks pay off — Section 8).
- The final Problem Journal review: the learner identifies the entry that changed their debugging most and can explain why.

**Existing knowledge reused.** Everything through Phase 8; Section 11's refactor-after-behavior-works principle, now with a real codebase; Section 10's import discipline, now applied to the learner's *own* files; Section 10's naming trap (don't shadow a standard module) with real stakes; Phase 4's boundary thinking (export is a boundary too).

**New knowledge introduced.**

- **The `csv` module** for writing spreadsheet-compatible files: rows, the comma/quote problem it solves, and the newline-behavior gotcha on some platforms (curriculum-designated format; see Section 15, item A2).
- **Multi-file structure, conditionally:** splitting code across the learner's own files; imports between them; the `if __name__ == "__main__":` guard's meaning. Introduced *only if* the learner's project complexity justifies it — the brief presents the pain symptoms, the learner diagnoses whether they have them. A well-organized single file with a defended reasoning is a pass.
- **Disciplined refactoring as a process:** behavior frozen, structure moved, verified at each step — not a rewrite.

**Why this knowledge appears now.** Two honest pressures arrive together at project's end. First, a report the user cannot take into a spreadsheet is data trapped in the terminal — the same "trapped value" feeling as Phase 3, one level up. Second, the file really is heavy now: this is the first moment "I can't hold this program in my head" is true, which is the only honest teacher of modularity. Teaching either earlier would be front-loading (Section 5's guardrails).

**Knowledge Pack(s).**

- *Interoperability 01 — Writing Spreadsheet-Friendly Files with `csv`*
  - **Purpose:** Teach CSV as a format and the standard module that writes it correctly: why hand-building comma text breaks on commas inside values, what quoting does, and the newline parameter gotcha.
  - **Concepts covered:** CSV structure; the standard module's writer interface; rows from records; quoting behavior; the blank-line/newline gotcha; verifying output in a real spreadsheet.
  - **Concepts explicitly NOT covered:** reading CSV, dialects, Excel-specific formats, pandas, exporting the ledger itself.
  - **Project question it answers:** "How does my data leave my program in a form a spreadsheet respects — commas, quotes, and line endings included?"
  - **Leakage guard:** examples export unrelated tables (a contact list, a plant-care schedule); must not write the ledger export, must not choose the export scope for the learner.
- *Architecture 01 — Splitting a Program Across Files*
  - **Purpose:** Teach the mechanics and judgment of multi-file structure: what a module of one's own is, importing between one's own files, the `__main__` guard, and the diagnostic symptoms that justify a split (vs the fashion of splitting).
  - **Concepts covered:** imports across the learner's own files; the run-vs-imported distinction and the guard; the standard-module shadowing trap (Section 10's warning, now load-bearing); dependency direction ("things that compute don't run the program"); a split procedure that keeps behavior verifiable at each step.
  - **Concepts explicitly NOT covered:** packages/`__init__.py` design, folder trees, class-based architecture, design patterns, configuration frameworks.
  - **Project question it answers:** "Is my program actually painful as one file — and if yes, what are the seams along which it splits honestly?"
  - **Leakage guard:** examples split unrelated growing programs (a quiz game, a log tool); must not prescribe module names, count, or boundaries for the ledger, must not declare a split mandatory.

**Likely learner difficulties.** Exported rows garbled by commas or quotes inside values (the discovery that motivates the capability); blank rows appearing in the spreadsheet on some platforms; export accidentally overwriting or entangling the ledger's data file; after a split: import errors, circular tangles, code that runs on import, or a file named after a standard module shadowing it (Section 10's trap made real); a refactor that quietly changed behavior and wasn't noticed until later (the verification checklist is the antidote — Section 8); half-moved logic where two copies drift.

**Evidence to inspect.** The exported file's raw text (commas, quotes, line endings) before opening it anywhere; the spreadsheet view row-for-row against the program's listing; the data file's contents before and after an export (untouched); import errors' full tracebacks during a split; before/after transcripts of the verification sequence, diffed by eye; the program still starting correctly from a different working directory if the learner split files (a classic late discovery).

**Mentor checkpoint.** **Checkpoint 3 of 3 (required — the final review).** Doubles as the completion review described in Section 12: live walkthrough with edge cases, structural review, journal audit, and reflection. See Section 11.

**Reflection prompt.** "What responsibility in your program was the last one you could point to instantly — and what does that tell you?" / "If you started this project again from Phase 1 with what you know now, what two decisions would you make differently — and were those decisions available to you then?"

---

## 7. Knowledge Pack Inventory

All packs follow DOC-STD-001: the pedagogical rhythm, the 5-line concept-example ceiling, unrelated-domain examples only (the anti-solution rule), experiments over quizzes, documentation-literacy sections, and tone compliance. Additional project-specific constraints:

- **No syntactic prematurity across phases.** A pack offered at phase N uses only what the learner holds after phase N−1 plus the phase N unlocks listed in Section 6. (E.g., the Phase 3 packs may not use string methods or `dict.get()`; string methods first appear in Phase 5's pack; `sorted()` and `dict.get()` first appear in Phase 8's packs.)
- **Every pack ends with:** official-docs linkage (Section 10's literacy skill), a debugging checklist, and "what this pack deliberately does not cover."
- **Every pack's experiments** are prediction-before-execution, run in a scratch file, in the pack's own domain.

| # | Pack (working title) | Phase | One-line purpose | Leakage guard in one line |
|---|---|---|---|---|
| 1 | Planning 01 — From Idea to Behavior | 1 | Vague idea → ordered behaviors → first milestone | No fields, commands, menu, or storage hints; no code |
| 2 | Records 01 — Modeling One Thing with Several Fields | 2 | Deepen dicts to records-in-collections | No ledger fields; no prescribed organization |
| 3 | Display 01 — Aligned, Readable Terminal Output | 2 | F-string width/alignment specifiers | No ledger listing, no currency, no totals |
| 4 | Persistence 01 — Files, Modes, and `with` | 3 | Text files read/write + `with` | No record-saving; no file naming; no strategy mandate |
| 5 | Persistence 02 — JSON: Serializing Values to Text and Back | 3 | JSON round-trip of Python values | No ledger serialization; no whole-collection-vs-append mandate |
| 6 | Robust Input 01 — The Re-Prompt Loop | 4 | Validate at the boundary; expected vs bug failures | No money prompts; no ready-made finance validator |
| 7 | Numbers 01 — Float Precision and Two-Decimal Display | 4 | Drift phenomenon; `:.2f`; `round()` as policy | No ledger storage policy; no totals code |
| 8 | Persistence 03 — Defensive Loading | 4 | Missing vs empty vs damaged files; recovery policies | No prescribed recovery policy; no ledger-file code |
| 9 | Strings 01 — Normalizing Text for Reliable Comparison | 5 | `.strip()`, `.lower()`, normalize-both-sides | No category matching shown; no placement mandate |
| 10 | Querying 01 — Extracting a Matching Subset | 5 | Walk-test-collect; subtotal a slice | No ledger filter; no helper signature |
| 11 | Dates 01 — Representing Dates with `datetime` | 6 | Dates as values; today; formatting out | No entries-gaining-dates; no ISO-storage mandate |
| 12 | Dates 02 — Parsing, Formatting, and Comparing Dates | 6 | Parse user text; comparisons; failure handling | No month filtering shown; no prefix technique |
| 13 | State 02 — Organizing Multiple Kinds of Persistent Data | 7 | Evolve a store to hold several kinds | No store shape or key names; no entries-plus-limits example |
| 14 | Display 02 — Text Progress Indicators | 7 | String repetition; bounded bars; thresholds | No budget computation; no budget bar |
| 15 | Verification 01 — Small Repeatable Checks Without a Framework | 7 | Expected-vs-actual check scripts, zero tooling | No test suite for the ledger; no framework names beyond "exists later" |
| 16 | Aggregation 01 — Grouping and Summing Records | 8 | Accumulator dicts; `.get(key, default)` | No ledger aggregation; no report assembly |
| 17 | Ordering 01 — Sorting with a Key Function | 8 | `sorted()`, named key functions, top-N slicing | No `lambda`; no ledger sorting; no report code |
| 18 | Interoperability 01 — Writing Spreadsheet-Friendly Files with `csv` | 9 | CSV writer; quoting; newline gotcha | No ledger export; no scope decision made for learner |
| 19 | Architecture 01 — Splitting a Program Across Files | 9 | Own modules; `__main__` guard; split judgment | No prescribed module names/boundaries; split not mandatory |

Pack authoring (text, examples, experiments) is a later workstream and is out of scope here; this inventory is the contract those authors build against.

---

## 8. Testing Strategy

**Decision.**

1. **Structured manual verification begins at Phase 3.** From the first persistence round-trip on, each phase's completion evidence is a short, written **verification transcript**: a fixed sequence of actions with the expected observable results, which the learner re-runs after changes. It costs nothing, uses no tooling, and quietly teaches regression thinking. By Phase 9 the transcript has grown into the refactor-verification pass.
2. **Lightweight learner-written checks are justified, beginning at Phase 7 and paying off in Phase 8–9.** From Phase 7 onward, arithmetic correctness (budget ratios, then report aggregation) dominates the bug landscape, and these are *logic* errors — silent, no traceback (Section 09 §4). Re-entering test data by hand after every change stops scaling right there. The appropriate level: a small, self-written check script in plain Python — fixed known inputs, print expected vs actual, count mismatches — using only Tier A knowledge, kept out of the program itself. *Verification 01* (Section 7, pack 15) teaches it. The checks are **recommended, not required**: the completion standard stays behavior-based, and the mentor reviews probe whether the learner's confidence in their math is evidence-based.
3. **No test framework in Project 1.** `pytest`, assertion tooling, fixtures, mocking, coverage targets, and CI/CD are all Tier C in the Knowledge Map and stay there. Rationale: the reasoning skill worth building here (expected vs actual, evidence over guessing) is already trained by the 7-Step Protocol and is fully served by a self-written script; framework ceremony at a 10–18-hour project scale would displace building with ceremony. Automated testing is introduced in a later phase of the curriculum when the learner has modular code worth testing.

**What testing must never become here:** a separate course, a gate, a coverage ritual, or a reason to restructure the learner's code for testability.

---

## 9. Help Escalation Model

The ladder below is Terminal Ledger's concrete instance of the PipLearn 6-level help ladder. Escalation discipline: each level presumes honest engagement with the level above; L3+ asks for the learner's written expectation/observation; L4 requires a Problem Journal entry in progress; L5 requires the journal entry plus evidence of a genuine time-box (roughly 45–60 minutes stuck after L4). L5 is a last resort and is always an unrelated-domain pattern — never project code, never a partial project answer.

| Level | Meaning in Terminal Ledger | Example (guarded) |
|---|---|---|
| **L0 — Think / inspect** | A Socratic question plus an evidence request that challenges the learner's runtime assumption. No concepts, no pointers. | "Quit the program completely and relaunch it. Before looking at code: what does the data file contain right now, and what does the listing show? Where do those two observations first disagree?" |
| **L1 — Relevant Knowledge Pack** | Point to the exact pack (and section) for the capability in play. | "This is a loading problem, not a math problem. Read *Persistence 03 — Defensive Loading*, then come back and tell me which of its three cases yours is." |
| **L2 — Directional hint** | Name the concept or mechanism that applies — in the abstract, with no project wiring. | "`input()` hands your program text. Somewhere between the keystroke and the arithmetic, a deliberate conversion has to happen — and that conversion is precisely where 'abc' becomes a problem worth handling." |
| **L3 — Structural hint** | Describe the shape of a solution approach in plain language: responsibilities, steps, data flow. No identifiers, no schema, no code. | "Think of your program as three conversations: one with the keyboard, one with the data file, one with the arithmetic. For the wrong result you are seeing, write down — in words — the steps each conversation performs, then find the first step where the words and the behavior diverge." |
| **L4 — Guided diagnosis** | A step-by-step diagnostic protocol run against the learner's own code: what to print, what to inspect, what to isolate. Never the fix. | "Run your program, record exactly one entry, and quit. Open the data file in your editor and write down everything in it. Relaunch and list. Put the two observations side by side and mark the first place they disagree — then print the loaded value and its type immediately after loading." |
| **L5 — Protected solution** | A minimal, complete code pattern demonstrating the concept in an unrelated domain, for the learner to study and then wire into their own design themselves. | For a persistence struggle: a tiny, complete save/load of a quiz game's high-score list — never ledger data, never their function names, never their schema. |

**Additional rules specific to this project.**

- L2/L3 hints never name the learner's structures ("your records", "your file" — never `transactions`, `ledger.json`, `save_data()`, or any schema key).
- The ladder is re-anchored at each phase: the phase brief lists which packs (L1) are in play, so L1 is always a short hop.
- A learner who requests L5 without journal evidence is walked back down: the response to "just give me the code" is a L0 question plus the journal template.
- Help received at L3+ is itself Problem Journal material ("how I discovered the cause" gains a source).

---

## 10. Problem Journal

The Problem Journal is Terminal Ledger's engineering notebook, exactly as introduced in Starting Manual Section 11 §14 — same habit, now with project-specific entry criteria and a review at completion. It is a plain markdown file kept beside the learner's project code (a default name such as `problem-journal.md` may be suggested; it is a default, not a requirement).

**Entry format** (six fields, in the learner's own words):

1. **Expectation** — the behavior I was trying to produce.
2. **Observation** — what actually happened (exact message, output, or file state).
3. **Cause** — what was really going on, verified.
4. **Evidence used** — the prints, types, file contents, exceptions, or experiments that established the cause.
5. **Fix** — the single change that resolved it.
6. **Lesson for next time** — the check I will run first when this pattern appears again.

**When an entry is required** (any one of):

- The root cause contradicted the learner's mental model (they were surprised).
- Diagnosis took more than one hypothesis (more than one "change ONE thing" cycle).
- The same *class* of problem appears a second time (e.g., a second unvalidated boundary).
- Help was used at L3 or above.
- Any data-loss or data-corruption scare, however small.

**When an entry is explicitly not required:** typos, a forgotten colon, a file not saved before running, an off-by-one fixed in seconds — the ordinary friction of programming. The journal is for patterns, not noise.

**Volume expectation:** roughly 3–6 entries across the whole project is typical and sufficient. More is not better.

**Non-negotiables:** no counts, no badges, no streaks, no scoring, no comparison against other learners, no required format beyond the six fields. The journal is a memory tool for the learner's own future debugging, and its only consumers are the learner and (with their consent) the mentor reviews.

**Where it connects:** the final debugging review (Section 12) is conducted from the journal, and L4/L5 eligibility (Section 9) is gated on it.

---

## 11. Mentor Checkpoints

Human mentor involvement is scarce and high-leverage. Terminal Ledger designates **three** checkpoints — not one per phase. Everything else is served by briefs, packs, and the ladder.

| # | Timing | Focus | Why here |
|---|---|---|---|
| 1 | End of Phase 3 — Save and Load Data | The persistence lifecycle: the learner narrates load-on-start and save-on-change from their own code; first-run grace; the in-memory and on-disk states agree; no path mutates data without persisting. | Persistence is the project's biggest conceptual leap and the foundation under every later phase. Misconceptions here compound silently through six phases; twenty minutes now is the cheapest intervention in the project. |
| 2 | End of Phase 6 — Dates and Monthly Views | Mid-project calibration: coherence of the record shape and data organization; the validation discipline surviving a new boundary; the learner's date/storage decisions; a look at the Problem Journal so far. | Budgets, reports, and export are all built on top of what exists now. Structural trouble is cheap to correct before three derived features compound it, and expensive after. Also the natural moment to confirm the learner is still struggling productively rather than drifting. |
| 3 | End of Phase 9 — Export and Refactor (required) | The completion review proper (Section 12): live walkthrough with deliberate edge cases, structural review, journal audit, and final reflection. | Finishing deserves a witness. The final checkpoint converts the finished project into articulated, reusable understanding — the last step of the core learning loop. |

Mentors at these checkpoints review reasoning, not style. The question bank for each checkpoint is derived from the phase reflection prompts and completion behaviors in Section 6. All other phases explicitly state: "no mentor checkpoint; the ladder and packs serve this phase."

---

## 12. Completion Standard

Terminal Ledger is **finished when its scope behaves coherently and the learner can review, explain, and defend it** — never when it matches a reference implementation, and never at commercial polish.

### 12.1 Required capabilities (behavioral, demonstrated live)

All ten Section 3 capabilities, demonstrated in one continuous session on the learner's machine:

1. Record incoming and outgoing entries; entries carry enough information to serve every other capability.
2. View entries readably while running.
3. Persist: quit, relaunch, everything still there; first-ever run is graceful.
4. Reject nonsense at every prompt with a clear message and a re-prompt; no traceback ever reaches the user.
5. Categorize; spelling variations do not split a category.
6. Filter to one category with a correct subtotal.
7. Date entries (sensible default, overridable, validated); view a chosen month's entries and in/out totals.
8. Set category limits; see usage with a truthful visual indicator; receive warnings at the designed thresholds; limits persist.
9. Produce a month report: total in, total out, net, ordered per-category breakdown — numbers matching a hand calculation.
10. Export to a file a spreadsheet opens correctly, one row per entry, awkward values intact.

Demonstration must include the deliberate edge cases: first-ever run, bad inputs at several prompts, a damaged data file, an empty month, a zero and an exceeded budget, a description containing a comma, and a restart after every mutation kind.

### 12.2 Acceptable implementation variation (explicitly fine)

Menu vs typed commands vs numbered prompts; any record field set the learner can justify; any sign/direction convention; JSON structure and file naming entirely the learner's; single file or learner-chosen multi-file; fixed or free-text categories; any sensible report layout and wording; any defensible rounding policy; export scope by month or whole-ledger; any defensible recovery policy for damaged data that never silently destroys it.

### 12.3 Final manual review (Checkpoint 3)

The walkthrough of 12.1, plus a structural conversation: the learner names their program's responsibilities and where each lives, and defends their single-file-or-split decision. No style critique beyond readability the learner themselves cannot defend.

### 12.4 Final debugging review

Conducted from the Problem Journal: the learner walks through their most instructive entry, shows the evidence-gathering they recorded, and then debugs one freshly introduced bug in their own program using the 7-Step Protocol, talking aloud. The goal is to verify the *process* transferred, not to re-verify any fix.

### 12.5 Final learner reflection

Written or spoken, using Section 11 §17's questions: what did I know before starting; what became necessary and why; which bugs took longest; which mistakes repeated; what could I rebuild without help; what do I still only partially understand; what would I design differently. There is no passing threshold on the reflection; it is the project's last exercise, not its last exam.

### 12.6 Explicitly not required

No installer, no colors or TUI polish, no handling of every conceivable input, no performance work, no documentation for end users beyond the program's own prompts, no repository hygiene, no tests-as-gate.

---

## 13. Explicitly Deferred Concepts

The following are **out of scope for Project 1**. Briefs, packs, hints, and mentors must not teach them, and learner questions are answered with "that arrives later — here is what it will be for" plus redirection to the current milestone.

| Deferred | Destination | Reason |
|---|---|---|
| Databases / SQL | Tier C (after the three projects) | Flat JSON first demystifies serialization; SQL would obscure data-structure reasoning |
| Web frameworks, GUIs | Tier C / later paths | Terminal-first is the curriculum spine |
| APIs / networking, authentication | Tier C / later projects | No honest pressure exists in a single-user terminal ledger |
| Async, concurrency, threading | Tier C | Deterministic sequential reasoning must be mastered first |
| **Advanced OOP** — inheritance, `super()`, `@property`, dunder methods | Tier C (dunders) / Project C (inheritance as needed) | See the OOP decision below |
| Decorators, metaprogramming | Tier C | Framework-author tooling |
| `lambda`, `map`/`filter`/`reduce`, `itemgetter` | Tier C | Named functions serve every project need; functional idioms obscure control flow for novices |
| List/dict comprehensions | Later Tier B (Project 2+) | The walk-test-collect pattern teaches the transformation explicitly; comprehensions are compression, taught after the shape is understood |
| Static typing, type hints, linters (mypy/ruff) | Tier C | Dynamic runtime behavior first |
| Custom exception classes, `raise`, `try/except/else/finally` | Project C | Phase 4's pattern covers every Project 1 need |
| `timedelta`, timezones, the `calendar` module | Project C / Tier C | Month math here needs only parse/format/compare |
| `argparse`, `pathlib`, `shutil`, hashing, dry-run patterns | Project B (DevToolbox) | Belong to the filesystem project's pressures |
| Sets, tuples, `Counter`, `defaultdict`, advanced collection methods | Later Tier B | Not needed by any Phase 1–9 behavior; named as "later conveniences" at most |
| Virtual environments, third-party packages, `requirements.txt` | Tier C / later projects | Standard library only, per the Knowledge Matrix — zero install friction |
| Packaging, publishing, deployment, CI/CD | Tier C | Nothing here is distributed |
| Design-pattern instruction, enterprise architecture | Tier C | Structure is taught as judgment under pain, not as pattern vocabulary |
| Test frameworks (pytest), mocking, fixtures, coverage | Tier C | Section 8 |

### 13.1 The OOP decision

**Classes do not belong in Terminal Ledger — including "basic" ones.**

Rationale:

1. **No honest pressure exists.** The project's records are flat, small, and few-fielded; dicts plus functions keep every phase's code clear. The Knowledge Map's own trigger for OOP is "when managing several separate dictionaries for related entities becomes unwieldy" and "when related data and behavior become difficult to manage with simple lists" — that moment does not arrive in this project, and inventing it would be exactly the "reach for unknown concepts prematurely" anti-pattern Section 11 §9 warns against.
2. **The curriculum already owns the moment.** CoreTrack (Project C) is where dict-based entities grow to many fields with guarded mutations — the designed home of OOP (`class`, `self`, `__init__`), per the Knowledge Matrix. Introducing classes here would steal CoreTrack's discovery and blunt its motivation.
3. **Phase 9's refactor is functional, not class-based.** Separation of responsibilities at this scale means naming and (optionally) placing computations — not encapsulating state behind objects. The Architecture pack teaches exactly that and no more.
4. **Learner-initiated classes are not forbidden outright** — a learner who arrives with outside knowledge may use them — but briefs, packs, hints, and mentors never introduce, suggest, or validate them as *needed*, and a dict-based solution can never be marked down for lacking classes.

---

## 14. Estimated Learning Time

Guidance, not a promise. Estimates assume a motivated beginner working in the PipLearn loop (including pack reading, scratch experiments, and debugging), per phase:

| Phase | Estimate | Comment |
|---|---|---|
| 1 — Plan the Finance System | 1–1.5 h | Planning + skeleton; short by design |
| 2 — Transactions in Memory | 1.5–2 h | Tier A composition; first real build |
| 3 — Save and Load Data | 2–2.5 h | Biggest Tier B unlock; includes scratch experimentation |
| 4 — Validate Bad Input | 1.5–2 h | Pattern + precision; three packs but one idea |
| 5 — Categories and Filtering | 1.5–2 h | Two capabilities; loops the learner owns |
| 6 — Dates and Monthly Views | 1–1.5 h | One module, narrow surface; checkpoint included |
| 7 — Budgets | 1–1.5 h | Small capabilities, judgment-heavy |
| 8 — Reports and Summaries | 1.5–2 h | The aggregation payoff |
| 9 — Export and Refactor | 2–3 h | Two pressures; final review |
| **Total** | **13–18 h** | Within the 10–18 h target; midpoint ≈ 15 h |

Pacing guidance: 2–3 weeks at 3–5 sessions per week. The range is honest — Phase 3 and Phase 9 have the widest variance, and a learner who writes their Phase 7/8 checks may spend *less* total time than one who does not.

---

## 15. Leakage Audit

A phase-by-phase and document-wide audit against the mandated checklist. Verdicts: **CLEAN** (no leakage), **DISCLOSED CONSTRAINT** (a curriculum-designated decision, justified, not accidental leakage), or an item to fix (none remain).

| Check | Verdict | Notes |
|---|---|---|
| Prescribed function names | **CLEAN** | No function or method names appear as requirements anywhere. Ladder examples and pack guards explicitly forbid named helpers. Phase 8's "named key function" is a capability (functions-as-values), not a name. |
| Prescribed variable names | **CLEAN** | No identifier is ever mandated. L2/L3 rule: "your records", "your file" only. |
| Prescribed transaction schema | **CLEAN** | Sections 3 and 6 state minimum informational content ("how much", "what it was for") and leave all fields, types, and conventions to the learner, with justification required. Difficulty predictions name symptom classes, not schemas. |
| Prescribed JSON structure | **DISCLOSED CONSTRAINT** | JSON as the *format* is curriculum-designated (Knowledge Matrix pins JSON to this project; the brief lists it as a primary capability; it is operationally necessary for the Documentation Reader's persistence narrative). The *structure* — shape, keys, nesting, one store vs several — is explicitly the learner's, including in Phase 7's pack guard. |
| Prescribed file names / locations | **CLEAN** | No data-file, export-file, or module names anywhere. The Problem Journal's default filename is marked as a default. |
| Prescribed folder / module architecture | **CLEAN** | Phase 9's split is explicitly conditional on the learner's own pain; a defended single file passes. The Architecture pack's guard forbids prescribing names, count, or boundaries. |
| Complete algorithms | **CLEAN** | No phase text or pack description contains a step-by-step algorithm for any milestone behavior. The nearest approaches — "walk-test-collect" and "group-and-sum" — are named *patterns* the learner must still design, parameterize, and verify; packs teach them in unrelated domains and their guards forbid ledger application. |
| Project-ready pseudocode | **CLEAN** | This document contains no pseudocode. The only code-adjacent tokens are standard-library capability names (`with`, JSON, `datetime`, `csv`, `sorted()`, `.get(key, default)`, `round()`, `:.2f`) — capabilities whose teaching is sanctioned by the brief ("Knowledge Packs may teach Python capabilities independently"). |
| Exact implementation sequences masquerading as requirements | **CLEAN** | Every "Observable completion behavior" is phrased as something the learner can demonstrate to a user or explain about their design. The two sequencing-flavored requirements — "first-ever run does not crash" and "no silent destruction of data" — are product invariants, not implementation orders. |
| Hint-channel leakage (L2–L5) | **CLEAN** | All ladder examples in Section 9 were written under the same rules and reviewed: L3 describes conversations/responsibilities, L4 describes diagnostic actions on the learner's own artifacts, L5 is unrelated-domain by definition. |
| Difficulty descriptions as covert fixes | **CLEAN** | Section 6 difficulties describe observable failure classes (what the learner will *see*), never the corrective line of code. |

**Residual watch-items for future workstreams** (not defects in this document, but the places leakage would most easily creep in during authoring):

1. **Pack authoring is the high-risk surface.** The anti-solution rule (DOC-STD-001 §3) must hold per-example, not per-document: a pack on JSON serialization may never slide from "a book catalog" toward "something like records with dates and amounts." Pack reviewers should diff every example's domain against Section 3's capability list.
2. **The verification transcripts** (Section 8) must state expected *observations*, never expected *file shapes* ("the listing shows the entry again" — not "the file contains an array of objects with keys …").
3. **The milestone briefs** authored from Section 6 must not inherit the older `python_projects_v1.md` roadmap's L3 hints, which prescribe schemas, function names, module files, and store shapes. That roadmap is hereby marked as historical input only (see header); its help-ladder examples must not be reused.

**Audit conclusion:** the roadmap specifies observable behavior and just-in-time capabilities; Knowledge Packs are specified as independent capability teaching in unrelated domains. Neither assembles the learner's project. The architecture is leakage-clean as written, with three named watch-items for the authoring workstreams.

---

*End of document. Planning only — no learner-facing content, no implementation, no solution code exists or is implied by anything above.*
