# PipLearn — Step 2: The Three Foundational Project Paths
## Content Architecture, Roadmaps, and Knowledge Distribution

> **Pedagogical Mandate**  
> The project is the classroom. PipLearn does not deliver pre-chewed tutorials, step-by-step code-along videos, or LeetCode drill loops.  
> 
> **The PipLearn Model:**  
> Understand the problem → Plan → Build → Encounter a real roadblock → Productive struggle → Consult PipLearn Knowledge Packs & official documentation → Form a hypothesis → Debug & inspect → Solve → Continue building → Achieve independent completion.  
> 
> PipLearn specifies **the problem, requirements, constraints, roadmaps, documentation, and a multi-level help ladder**. The learner writes 100% of the code.

---

# PART 1: SYSTEM-WIDE FRAMEWORKS

## 1. The Planning Phase Blueprint
Every project starts with an explicit, unskippable Software Planning Phase before writing application code. The student answers six architectural questions in an engineering notebook:
1. **User Scope:** What tangible task does this software accomplish for the user?
2. **Data Model:** What entities exist, what are their fields/types, and how are they identified?
3. **Core Operations:** What specific transformations, calculations, and queries must happen?
4. **Failure Modes:** Where will inputs be invalid, files be missing, or calculations fail?
5. **Phase 1 Milestone:** What is the absolute smallest working skeleton I can run on Day 1?
6. **Deferred Complexity:** What features should wait until the core foundation is rock solid?

PipLearn compares the learner's answers against the project requirements via diagnostic prompts, validating their reasoning without enforcing a single "rigid" code design.

## 2. The Problem Journal (Engineering Notebook)
When an unexpected bug or architectural collision occurs, the learner documents the resolution in their `problem_journal.md`. This builds metacognition and diagnostic independence:
* **Target:** What behavior was I attempting to produce?
* **Symptom:** What went wrong (error message, crash, or unexpected output)?
* **Initial Hypothesis:** What did I initially assume was broken?
* **Actual Root Cause:** What was truly happening under the hood (verified via inspection)?
* **Discovery Method:** How did I find the root cause (print inspection, type check, docs, traceback)?
* **Fix Applied:** What specific single change resolved the problem?
* **Lesson Learned:** What rule of thumb or mental model will prevent this in the future?

## 3. The 6-Level Help Ladder
When a learner gets stuck, they can request help. Scaffolding is unlocked progressively; direct solutions are never handed out:
* **L0 — Think:** Socratic question challenging the learner's runtime assumptions.
* **L1 — Documentation:** Direct pointer to the relevant PipLearn Knowledge Pack article or Python official doc.
* **L2 — Directional Hint:** Conceptual overview of the pattern or technique suited for this problem.
* **L3 — Structural Hint:** Architectural breakdown or pseudo-algorithm without actual Python syntax.
* **L4 — Guided Diagnosis:** Step-by-step diagnostic test to isolate the bug in their own code.
* **L5 — Protected Solution:** Isolated, minimal code pattern demonstrating the concept in an **unrelated domain** (last resort only; never the project code).

## 4. Documentation Standard (Knowledge Packs)
Knowledge Packs teach language fundamentals through an invariant pedagogical structure:
`Why it exists` → `Mental model` → `Core syntax` → `Small unrelated example` → `Hands-on experiment` → `Common mistakes` → `Debugging checklist` → `Official Docs link`.  
*Rule:* Knowledge Packs **never** show code matching the project domain. If Project A is a Finance Manager, persistence is taught using a library book catalog or game save state.

---

# PART 2: THE THREE PROJECT PATHS

---

# PROJECT A: Personal Finance Manager
*Ledger Systems, Numerical Integrity, Persistence & Analytic Reporting*

### 1. Project Identity
* **Name:** Terminal Ledger (Personal Finance & Expense Intelligence)
* **One-Sentence Description:** A CLI financial tracking and analytics tool that records income/expenses, enforces budgets, categorizes cashflow, persists structured ledger data, and generates monthly analytical health reports.
* **What the Finished Software Does:** Allows users to log categorized transactions with timestamps, view running balances, validate numeric data, persist transaction history across sessions via JSON, query history by date/category, set and monitor category budgets with visual alerts, and export summary reports to CSV.
* **Why Build It:** Anyone managing personal cashflow needs a reliable, private, lightweight financial ledger that doesn't sell their data or lock them into proprietary apps.
* **Difficulty:** Medium Beginner (Focus on data integrity, state serialization, and math correctness).
* **Completion Time:** ~10–18 hours (1–2 weeks at motivated pace).

### 2. Final Capabilities
* Interactive CLI command loop with friendly prompts and robust input parsing.
* Double-entry style categorization (Income vs. Expense, nested categories).
* Transaction records with unique IDs, ISO timestamps, descriptions, amounts, and tags.
* Persistent file storage (auto-loads on startup, auto-saves on mutation, handles missing/corrupt files).
* Strict numeric validation preventing negative balances or float precision drift.
* Query engine: filter transactions by date range, category, minimum amount, or keyword.
* Budget tracker: define category thresholds and trigger warnings when spending exceeds 80% and 100%.
* Analytical summaries: total income, total expense, net savings rate, highest spending categories.
* Formatted CSV export for external spreadsheet analysis.

### 3. Starting Requirements (From Starting Manual)
* Variables, arithmetic operators, and basic primitive types (`int`, `float`, `str`, `bool`).
* Control flow (`if/elif/else`), basic loops (`while`, `for`, `range`).
* In-memory lists and dictionaries.
* Function definitions, arguments, and returns.
* Basic traceback literacy and print debugging.

---

### Project A Roadmap (9 Phases)

#### Phase A-01: Software Planning & The Ledger Schema
* **Objective:** Design the ledger architecture and define what a single transaction looks like before writing code.
* **Why It Exists:** Beginners dive into coding without knowing what data they need, causing endless rewrites.
* **Requirements:** Written `design_spec.md` with transaction fields, supported commands, sample interaction transcript, and empty skeleton program with greeting.
* **Knowledge Needed:** None (mental organization, requirements decomposition).
* **Knowledge Pack Required:**
  * *Knowledge Pack: Software Planning 01 — Decomposing CLI Systems*
  * *Knowledge Pack: Software Planning 02 — Designing Data Schemas with Dicts*
* **What Docs Must NOT Reveal:** The exact transaction dictionary keys or menu layout.
* **Likely Learner Problems:** Over-complicating fields before building (e.g., trying to support 15 currencies on day 1).
* **Help Ladder:**
  * *L0:* What are the 4 pieces of information on every paper receipt you receive?
  * *L1:* Consult *Software Planning 02*.
  * *L2:* A transaction needs an identifier, a date, a label, an amount, and a category.
  * *L3:* Represent one transaction as a Python `dict` with keys: `"id"`, `"date"`, `"amount"`, `"category"`.
  * *L4:* Print your proposed transaction dictionary in the REPL and verify you can access each field.
  * *L5:* (Unrelated domain) Show dictionary structure for a student grade record.
* **Completion Evidence:** Learner presents a written plan detailing transaction data structures and the first 3 commands to build.

#### Phase A-02: The In-Memory Ledger (Create & View)
* **Objective:** Allow the user to record transactions in a running session and view the formatted transaction table.
* **Why It Exists:** Establishes the core CRUD feedback loop in volatile RAM.
* **Requirements:** Commands `add` and `list`. `add` prompts for description, amount, category. `list` prints a clean ASCII table with running total balance.
* **Knowledge Needed:** Lists of dictionaries, loops, string formatting (f-strings with alignment), `enumerate()`.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Formatting & Tables 01 — Clean Terminal Alignment with F-Strings*
  * *Knowledge Pack: List Operations 01 — Managing Collections of Records*
* **What Docs Must NOT Reveal:** How to format currency or accumulate financial ledger totals.
* **Likely Learner Problems:** Storing amount as string instead of float; table column misalignment with long strings.
* **Help Ladder:**
  * *L0:* If you add $25 and $15, does your balance display 40.0 or "2515"?
  * *L1:* Consult *Formatting & Tables 01*.
  * *L2:* Remember: `input()` always returns a string. Numbers require explicit conversion.
  * *L3:* Use `{val:<15}` inside f-strings to force columns into fixed-width slots.
  * *L4:* Inspect `type(transaction["amount"])` right after user input.
  * *L5:* (Unrelated) Show a formatted high-score table for an arcade game.
* **Completion Evidence:** Adding 3 transactions in sequence displays a neatly aligned table and correct balance.

#### Phase A-03: The Disappearing Data Problem (JSON Persistence)
* **Objective:** Automatically save transactions to disk when added and reload them when the program starts.
* **Why It Exists:** When the terminal closes, volatile RAM wipes out all data. Real software must persist state.
* **Requirements:** Transactions auto-save to `ledger.json`. Program checks for `ledger.json` on startup: if present, loads records; if missing, creates an empty ledger without crashing.
* **Knowledge Needed:** File I/O (`open()`, modes `'r'`, `'w'`), Context managers (`with`), JSON serialization (`json.dump()`, `json.load()`), checking file existence or handling `FileNotFoundError`.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Persistence 01 — File Streams & The `with` Statement*
  * *Knowledge Pack: Persistence 02 — JSON Mental Model & Data Serialization*
  * *Knowledge Pack: Persistence 03 — Defensive Loading & Missing File Traps*
* **What Docs Must NOT Reveal:** `save_transactions(ledger)` or `load_ledger()` code.
* **Likely Learner Problems:** Overwriting the file with only the latest single transaction (`'w'` without serializing full list); attempting to serialize non-JSON data; `json.decoder.JSONDecodeError` on empty files.
* **Help Ladder:**
  * *L0:* When you reopen the program, did you reload the file into your list before accepting new inputs?
  * *L1:* Consult *Persistence 02 & 03*.
  * *L2:* You must save the *entire list* of transactions, not just the single new item.
  * *L3:* Structure your app into two dedicated functions: `load_data()` and `save_data()`. Call `load_data()` once at the top of your program.
  * *L4:* Inspect the raw content of `ledger.json` in your text editor after running `add`.
  * *L5:* (Unrelated) Show saving and loading a student inventory list from `inventory.json`.
* **Completion Evidence:** Adding transactions, killing the terminal completely, and relaunching restores the exact ledger state.

#### Phase A-04: Robust Validation & The Floating-Point Drift
* **Objective:** Prevent invalid user inputs (letters for amounts, negative expenses) and solve floating-point rounding bugs (e.g., `$0.10 + $0.20 = 0.30000000000000004`).
* **Why It Exists:** Financial software cannot tolerate precision drift or crash on bad user input.
* **Requirements:** User entering `"abc"` for amount receives a friendly error and re-prompt, not a Python crash. All currency values display strictly formatted to 2 decimal places (`$XX.XX`).
* **Knowledge Needed:** `try ... except ValueError`, `while` input validation loops, float rounding / `round()` or `decimal.Decimal` intro.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Robust Input 01 — The Re-prompt Validation Loop Pattern*
  * *Knowledge Pack: Numerical Precision 01 — Floats vs. Fixed-Point Decimals*
* **What Docs Must NOT Reveal:** The exact `get_valid_amount()` function.
* **Likely Learner Problems:** Crashing on empty string; infinite loop on invalid input; negative amounts breaking math.
* **Help Ladder:**
  * *L0:* What happens if you press Enter without typing anything for the amount?
  * *L1:* Consult *Robust Input 01*.
  * *L2:* Wrap `float(input())` in a `try...except ValueError` block nested inside `while True`.
  * *L3:* Only `break` the loop once the number has been successfully parsed and is greater than 0.
  * *L4:* Trace the flow of your loop when an exception is triggered.
  * *L5:* (Unrelated) Show a function validating user age between 1 and 120.
* **Completion Evidence:** Entering letters, negative numbers, and symbols prompts for re-entry without crashing; balances remain clean at 2 decimal places.

#### Phase A-05: Categorization & Filtering Engine
* **Objective:** Allow users to tag transactions with standardized categories and filter the ledger (e.g., show only `"Food"` or only `"Income"`).
* **Why It Exists:** A 200-item flat list is unusable without querying and subsetting data.
* **Requirements:** Support standard categories (`Food`, `Rent`, `Utilities`, `Entertainment`, `Income`, `Other`). Command `filter --category <name>` prints only matching transactions and the subtotal for that category.
* **Knowledge Needed:** String methods (`.strip()`, `.lower()`, `.title()`), list filtering with loops or list comprehensions, conditional accumulation.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Querying Data 01 — Subsetting & Filtering Collections*
  * *Knowledge Pack: String Processing 01 — Sanitizing & Normalizing Text*
* **What Docs Must NOT Reveal:** Code filtering the finance ledger.
* **Likely Learner Problems:** Case-sensitivity bugs (`"food"` not matching `"Food"`); failing to reset subtotals between queries.
* **Help Ladder:**
  * *L0:* Did you normalize both the stored category and the user query to lowercase before comparing?
  * *L1:* Consult *String Processing 01*.
  * *L2:* Build a helper function that takes the full ledger and a filter criteria, returning a new filtered list.
  * *L3:* Loop through transactions: if criteria matches, append to a `filtered_results` list.
  * *L4:* Print `query.strip().lower() == transaction["category"].strip().lower()` for a failing match.
  * *L5:* (Unrelated) Show filtering a list of books by genre.
* **Completion Evidence:** Running a category filter produces only matching items and correctly calculates the category subtotal.

#### Phase A-06: Date Filtering & Temporal Queries
* **Objective:** Enable filtering transactions by month and year (e.g., `filter --month 2026-03`).
* **Why It Exists:** Cashflow is inherently temporal; users need to know how much they spent *this month*.
* **Requirements:** Auto-stamp transactions with current date (`YYYY-MM-DD`). Allow manual date override. Filter ledger by exact date or month prefix.
* **Knowledge Needed:** Standard library `datetime` module (`datetime.date.today()`, `datetime.strptime()`, ISO-8601 string formatting).
* **Knowledge Pack Required:**
  * *Knowledge Pack: Dates & Times 01 — ISO Timestamps with `datetime`*
  * *Knowledge Pack: Dates & Times 02 — Date Comparisons & Month Extraction*
* **What Docs Must NOT Reveal:** Date filtering logic for transaction dictionaries.
* **Likely Learner Problems:** Formatting dates with manual string concatenations instead of `datetime`; string comparison failures with single-digit months (`"2026-3"` vs `"2026-03"`).
* **Help Ladder:**
  * *L0:* Why is `"2026-03-01"` easier to sort and filter than `"March 1st, 2026"`?
  * *L1:* Consult *Dates & Times 01*.
  * *L2:* Store dates in standard ISO format `YYYY-MM-DD`. This makes month checking as simple as `date_str.startswith("2026-03")`.
  * *L3:* Parse user date inputs using `datetime.strptime(user_date, "%Y-%m-%d")` to validate valid calendar dates.
  * *L4:* Print the exact date string stored in your JSON file.
  * *L5:* (Unrelated) Show tracking membership expiration dates with `datetime`.
* **Completion Evidence:** Adding transactions with past dates and filtering by `YYYY-MM` returns the correct month's ledger.

#### Phase A-07: Budget Limits & Threshold Warnings
* **Objective:** Allow setting monthly category spending caps (e.g., `Food: $400`) and trigger visual warnings when spending reaches 80% and 100%.
* **Why It Exists:** Tracking past spending is passive; budgeting actively prevents overspending.
* **Requirements:** Command `budget set <category> <limit>`. Command `budget status` shows a visual progress bar (`[██████░░░░] 60%`) and remaining spending headroom.
* **Knowledge Needed:** Secondary dictionary for budget thresholds, mathematical percentages, string repetition for progress bars (`"█" * filled`), dictionary lookups with fallback defaults.
* **Knowledge Pack Required:**
  * *Knowledge Pack: CLI Graphics 01 — Rendering Terminal Progress Bars*
  * *Knowledge Pack: Nested State 01 — Managing Multiple Data Stores in JSON*
* **What Docs Must NOT Reveal:** Budget calculation or warning logic.
* **Likely Learner Problems:** Division by zero when budget is $0; negative percentages; budget state not saved to JSON.
* **Help Ladder:**
  * *L0:* What happens if a user sets a budget of $0 and you divide total spend by budget?
  * *L1:* Consult *CLI Graphics 01*.
  * *L2:* Calculate `spent / limit`. Cap the visual bar at 100% even if spending exceeds budget.
  * *L3:* Structure the saved JSON to hold both `"transactions": [...]` and `"budgets": {...}`.
  * *L4:* Print `spent`, `limit`, and `percentage` before rendering the string.
  * *L5:* (Unrelated) Show rendering a health bar for a video game hero.
* **Completion Evidence:** Setting a budget of $100 and spending $85 renders an 85% progress bar with an amber warning; spending $110 flags a red over-budget warning.

#### Phase A-08: Analytical Summaries & Monthly Health Reports
* **Objective:** Generate a holistic financial report: Net Savings Rate, Top 3 Expense Categories, and Average Daily Spend.
* **Why It Exists:** Raw tables don't reveal macro trends. Analytical computation converts data into actionable insights.
* **Requirements:** Command `report --month <YYYY-MM>` displays a comprehensive dashboard with Total Income, Total Expenses, Net Savings (`Income - Expenses`), Savings Percentage, and an ordered ranking of highest spending categories.
* **Knowledge Needed:** Dictionary aggregation, sorting dictionaries/lists by value (`sorted(..., key=...)`), calculating statistical ratios.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Data Aggregation 01 — Grouping & Summing by Category*
  * *Knowledge Pack: Advanced Collections 01 — Sorting with Custom Keys*
* **What Docs Must NOT Reveal:** The exact aggregation loop for finance categories.
* **Likely Learner Problems:** Incorrect sorting syntax with `lambda` or `itemgetter`; negative savings rate breaking percentage calculation.
* **Help Ladder:**
  * *L0:* How do you turn a list of 50 transactions into a dictionary where each key is a category and the value is the sum?
  * *L1:* Consult *Data Aggregation 01*.
  * *L2:* Use an accumulator dictionary: `category_totals[cat] = category_totals.get(cat, 0.0) + amount`.
  * *L3:* Sort the dictionary items by the second element: `sorted(totals.items(), key=lambda item: item[1], reverse=True)`.
  * *L4:* Inspect the intermediate `category_totals` dictionary before attempting to sort.
  * *L5:* (Unrelated) Show aggregating total points scored by sports teams in a tournament.
* **Completion Evidence:** A generated report accurately displays the top expense categories and correct savings percentage.

#### Phase A-09: Data Export (CSV) & Final Polish
* **Objective:** Export filtered or full ledger data into standard CSV format for external spreadsheets, and modularize the codebase.
* **Why It Exists:** Software interoperability: users need their data in Excel/Google Sheets. Monolithic 500-line scripts become unmaintainable.
* **Requirements:** Command `export --csv <filename>`. Refactor code into clean functional modules (`storage.py`, `analytics.py`, `ui.py`, `main.py`).
* **Knowledge Needed:** The standard `csv` module (`csv.DictWriter`), multi-file imports, `if __name__ == "__main__":`.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Interoperability 01 — Writing Tabular Data with the `csv` Module*
  * *Knowledge Pack: Architecture 01 — Structuring Python Multi-File Projects*
* **What Docs Must NOT Reveal:** The ledger export function or exact file organization.
* **Likely Learner Problems:** Extra blank lines in CSV on Windows (`newline=""` parameter in `open`); circular import errors when splitting files.
* **Help Ladder:**
  * *L0:* Why did Python open an empty file or complain about a circular import when you moved functions?
  * *L1:* Consult *Interoperability 01* and *Architecture 01*.
  * *L2:* Pass `newline=""` into `open()` when working with the `csv` module.
  * *L3:* Keep data storage functions in `storage.py` and import them into `main.py`; don't import `main.py` back into `storage.py`.
  * *L4:* Run each module independently in the terminal to verify clean imports.
  * *L5:* (Unrelated) Show exporting an employee phone directory to CSV.
* **Completion Evidence:** Exported `.csv` opens seamlessly in Microsoft Excel or Google Sheets; codebase is divided into modular files with clean separation of concerns.

---

# PROJECT B: Developer Automation Toolkit
*Filesystem Operations, Hashing, Pattern Matching & CLI Automation*

### 1. Project Identity
* **Name:** DevToolbox (Workplace & Filesystem Automation Engine)
* **One-Sentence Description:** A command-line utility suite that organizes chaotic directories, identifies duplicate files using cryptographic hashing, batch-renames files using pattern rules, and analyzes disk usage.
* **What the Finished Software Does:** Scans user-specified directories, categorizes files into clean directory structures, finds true binary duplicate files (even with different names) using SHA-256 hashes, performs safe batch-renaming with dry-run previews, and generates storage audit summaries.
* **Why Build It:** Developers and digital workers accumulate gigabytes of disorganized downloads, duplicate assets, and messy log folders that waste disk space and manual time.
* **Difficulty:** Medium (Focus on OS filesystem interaction, data integrity, hashing, and batch safety).
* **Completion Time:** ~12–20 hours (1.5–2.5 weeks at motivated pace).

### 2. Final Capabilities
* Target directory inspection with recursive and non-recursive scan modes.
* Safe batch organization: sorting files into extension-based or date-based subfolders.
* Non-destructive Dry-Run preview mode for all filesystem modifications.
* Duplicate file detection engine using file size filtering and SHA-256 chunked hashing.
* Batch renaming utility supporting prefixes, suffixes, numbering sequences, and text substitution.
* Storage disk usage auditor: identifying the top 10 largest files and folder breakdowns.
* Command-line argument parsing supporting flags and options (e.g., `--dry-run`, `--target`, `--recursive`).
* Action log recording all file operations to an undoable audit trail file.

### 3. Starting Requirements (From Starting Manual)
* Starting manual fundamentals: variables, loops, conditionals, functions, lists, dicts.
* Basic understanding of file paths and terminal commands.
* Debugging methodology and traceback interpretation.

---

### Project B Roadmap (10 Phases)

#### Phase B-01: Architecture & Safe Filesystem Inspection
* **Objective:** Build a tool that inspects a specified folder and outputs a structured inventory of files without altering anything.
* **Why It Exists:** Modifying the filesystem is dangerous. You must first master safe read-only inspection.
* **Requirements:** Command `inspect <path>`. Prints total file count, total byte size, and a breakdown of discovered file extensions. Handles non-existent directory paths gracefully.
* **Knowledge Needed:** Modern filesystem navigation using `pathlib.Path`, checking `.exists()` and `.is_dir()`, iterating directory contents (`.iterdir()`).
* **Knowledge Pack Required:**
  * *Knowledge Pack: Pathlib 01 — Modern Object-Oriented Paths in Python*
  * *Knowledge Pack: Filesystem Inspection 01 — Safe Traversal & Metadata Inspection*
* **What Docs Must NOT Reveal:** The exact directory scanning code for dev tools.
* **Likely Learner Problems:** Crashing on `PermissionError` when encountering restricted system folders; treating `Path` objects like raw strings.
* **Help Ladder:**
  * *L0:* What happens if the user types `/nonexistent/path`? Does your script crash with an unhandled exception?
  * *L1:* Consult *Pathlib 01*.
  * *L2:* Use `Path(user_path).expanduser().resolve()` to handle relative paths and `~` shortcuts.
  * *L3:* Check `if not target_path.exists():` and exit with a clean message before looping.
  * *L4:* Print `type(p)` inside your loop to see what `iterdir()` yields.
  * *L5:* (Unrelated) Show scanning a directory of user avatars and counting `.png` files.
* **Completion Evidence:** Pointing the tool at a messy folder accurately reports file counts and total size in megabytes without crashing on missing paths.

#### Phase B-02: Recursive Traversal & Size Formatter
* **Objective:** Allow scanning subdirectories recursively and format raw byte counts into human-readable strings (`KB`, `MB`, `GB`).
* **Why It Exists:** Real folders have deep subtrees; raw byte numbers like `382918392 bytes` are unreadable to humans.
* **Requirements:** Add `--recursive` flag to `inspect`. Convert raw bytes into dynamic units (`1.45 MB`, `3.20 GB`). Skip symlink loops.
* **Knowledge Needed:** `pathlib.Path.rglob()`, numeric division loops, unit conversion algorithms.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Pathlib 02 — Recursive Search with `rglob` and Patterns*
  * *Knowledge Pack: Numerical Formatting 01 — Converting Bytes to Human-Readable Units*
* **What Docs Must NOT Reveal:** The exact recursive file aggregator function.
* **Likely Learner Problems:** Recursion getting stuck in infinite loops on symlinks; divide-by-zero on 0-byte empty files.
* **Help Ladder:**
  * *L0:* How many times do you divide by 1024 until a number is less than 1024?
  * *L1:* Consult *Numerical Formatting 01*.
  * *L2:* Loop through units `["B", "KB", "MB", "GB", "TB"]`, dividing by 1024.0 at each step.
  * *L3:* Use `path.is_file() and not path.is_symlink()` to ensure you only measure real files.
  * *L4:* Test your byte formatter on `0`, `500`, `1048576`, and `1073741824`.
  * *L5:* (Unrelated) Show converting seconds into human-readable hours, minutes, and seconds.
* **Completion Evidence:** Scanning a nested project folder recursively displays human-readable sizes (`42.1 MB`) across all subdirectories.

#### Phase B-03: The Destructive Move Problem (Dry-Run Architecture)
* **Objective:** Design a safety architecture that previews every file move before any disk mutation occurs.
* **Why It Exists:** A single bug in a file mover can accidentally delete or scatter 1,000 important user files. Professional automation always provides a dry-run preview.
* **Requirements:** Any destructive command accepts `--dry-run`. In dry-run mode, the program prints every planned action: `[PREVIEW] Move report.pdf -> Documents/PDFs/report.pdf` without modifying the disk.
* **Knowledge Needed:** Action planning pattern (generate plan list → inspect → execute only if confirmed), boolean flags.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Safe Automation 01 — The Two-Phase Execution Pattern (Plan vs. Apply)*
* **What Docs Must NOT Reveal:** The file organizing script.
* **Likely Learner Problems:** Executing the file move *during* the loop while also printing the preview; hardcoding execution without a gate check.
* **Help Ladder:**
  * *L0:* Did your program touch the disk when `--dry-run` was passed? How can you prove it?
  * *L1:* Consult *Safe Automation 01*.
  * *L2:* Separate your logic into: 1. `create_action_plan()`, 2. `display_plan()`, 3. `execute_plan()`.
  * *L3:* Only call `execute_plan()` if `dry_run is False` AND the user types `yes` to confirm.
  * *L4:* Check the timestamps of your files after running with `--dry-run`.
  * *L5:* (Unrelated) Show a preview mechanism for a database account cleanup script.
* **Completion Evidence:** Running with `--dry-run` outputs the complete list of planned movements; directory contents remain 100% unchanged.

#### Phase B-04: The Extension-Based Auto-Sorter
* **Objective:** Automatically sort loose files in a messy directory into categorized folders (`Images/`, `Docs/`, `Archives/`, `Code/`).
* **Why It Exists:** Desktop and Downloads folders quickly devolve into chaos; manual sorting is tedious.
* **Requirements:** Command `organize <target>`. Maps extensions (e.g. `.jpg`, `.png` → `Images/`). Automatically creates destination directories if missing. Avoids moving existing folders into themselves.
* **Knowledge Needed:** `pathlib.Path.mkdir(parents=True, exist_ok=True)`, `shutil.move()`, dictionary lookup with fallback (`"Other/"`).
* **Knowledge Pack Required:**
  * *Knowledge Pack: Filesystem Operations 01 — Moving & Creating Folders with `shutil` & `pathlib`*
  * *Knowledge Pack: Data Structures 01 — Inverted Mapping (Extension to Category)*
* **What Docs Must NOT Reveal:** The exact dictionary mapping extensions to directories.
* **Likely Learner Problems:** Overwriting files with identical names in the destination; moving the script itself; trying to move folders as if they were files.
* **Help Ladder:**
  * *L0:* What happens if `Images/photo.jpg` already exists and you move another `photo.jpg` there?
  * *L1:* Consult *Filesystem Operations 01*.
  * *L2:* Check `if destination_file.exists():` before moving. If it exists, append a counter: `photo_1.jpg`.
  * *L3:* Use `.is_file()` to skip subdirectories so you don't nest folders infinitely.
  * *L4:* Print source path and target destination before calling `shutil.move`.
  * *L5:* (Unrelated) Show organizing music tracks by genre into subdirectories.
* **Completion Evidence:** Running `organize` on a messy test folder cleanly sorts 20 mixed files into appropriate subfolders without data loss.

#### Phase B-05: Duplicate File Detection (Size Pre-Filter)
* **Objective:** Find duplicate files by first grouping files that have the exact same size in bytes.
* **Why It Exists:** Hashing every file on a 500GB drive is painfully slow. Smart tools use size pre-filtering to eliminate 95% of unique files instantly.
* **Requirements:** Command `find-dupes <target>`. Scans target directory, groups files by byte size, and outputs candidates that share identical sizes.
* **Knowledge Needed:** Dictionary of lists (`{byte_size: [path1, path2]}`), `path.stat().st_size`.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Data Grouping 01 — Grouping Collections with Dictionaries of Lists*
  * *Knowledge Pack: Performance Thinking 01 — Multi-Stage Filtering Pipelines*
* **What Docs Must NOT Reveal:** The duplicate grouping code for file paths.
* **Likely Learner Problems:** Storing file paths as strings and losing `Path` methods; ignoring 0-byte empty files (which all match size 0).
* **Help Ladder:**
  * *L0:* Can two different files have the exact same byte size? (Yes! That's why this is only Step 1).
  * *L1:* Consult *Data Grouping 01*.
  * *L2:* Build a dictionary where key is `size` and value is a `list` of paths. Only keep entries where `len(paths) > 1`.
  * *L3:* Filter out 0-byte files unless specifically requested.
  * *L4:* Inspect `len(size_map)` vs total files scanned.
  * *L5:* (Unrelated) Show grouping students by birth year to find potential twins.
* **Completion Evidence:** Correctly flags files that share identical byte sizes as candidates for hash verification.

#### Phase B-06: Cryptographic Hash Fingerprinting (SHA-256)
* **Objective:** Determine true binary duplicates by generating and comparing SHA-256 hashes of size-matched candidate files.
* **Why It Exists:** Files with different names can have identical content; files with identical sizes can have different content. Only cryptographic hashing proves identity.
* **Requirements:** For all size candidates, compute SHA-256 hash. Files with matching hashes are confirmed true duplicates. Read files in chunks (e.g. 64KB) to avoid memory crashes on multi-gigabyte files.
* **Knowledge Needed:** Standard library `hashlib` (`hashlib.sha256()`), binary file streaming (`with open(p, "rb") as f:`), chunked buffering (`f.read(65536)`).
* **Knowledge Pack Required:**
  * *Knowledge Pack: Cryptographic Hashing 01 — Content Fingerprinting with `hashlib`*
  * *Knowledge Pack: Memory Efficiency 01 — Chunked Binary Streaming*
* **What Docs Must NOT Reveal:** The duplicate file hashing function.
* **Likely Learner Problems:** Reading entire 4GB video files into RAM with `f.read()` causing `MemoryError`; opening in text mode (`"r"`) instead of binary mode (`"rb"`).
* **Help Ladder:**
  * *L0:* What happens to your computer's RAM if you call `f.read()` on a 10GB file?
  * *L1:* Consult *Memory Efficiency 01*.
  * *L2:* Read files in chunks inside a `while chunk := f.read(65536): hasher.update(chunk)`.
  * *L3:* Map each hash to the list of file paths that produced it. If `len(paths) > 1`, they are exact duplicates.
  * *L4:* Print the first 8 characters of the calculated hex digest for two known identical files.
  * *L5:* (Unrelated) Show verifying the integrity of a downloaded firmware file using checksums.
* **Completion Evidence:** Accurately identifies identical files even when renamed to completely different names (e.g., `invoice.pdf` and `copy_of_thing.pdf`).

#### Phase B-07: Interactive Duplicate Cleanup
* **Objective:** Provide a safe, interactive prompt allowing the user to delete or archive confirmed duplicates while keeping the original.
* **Why It Exists:** Detecting duplicates is only half the job; freeing disk space requires safe resolution.
* **Requirements:** For each duplicate cluster, display file paths and modification dates. Prompt user: `[K]eep newest, [K]eep oldest, [D]elete specific, [S]kip`. Never delete all copies.
* **Knowledge Needed:** Path sorting by modification time (`path.stat().st_mtime`), `path.unlink()` for safe deletion, interactive prompt loop.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Safe Deletion 01 — Trash vs. Unlink & Safe Prompting*
  * *Knowledge Pack: File Metadata 01 — Working with Timestamps & Sizes*
* **What Docs Must NOT Reveal:** The cleanup interactive menu.
* **Likely Learner Problems:** Accidental off-by-one errors deleting the original along with the duplicate; crashing if a file was deleted externally.
* **Help Ladder:**
  * *L0:* How do you guarantee that at least one original copy of the file survives?
  * *L1:* Consult *Safe Deletion 01*.
  * *L2:* Sort duplicate paths by `st_mtime`. The first element is the original; only allow deletion of elements at index 1 and beyond.
  * *L3:* Always ask for explicit confirmation before calling `unlink()`.
  * *L4:* Test cleanup on a dummy directory of copied test files first.
  * *L5:* (Unrelated) Show an interactive selector to remove duplicate emails from a contact list.
* **Completion Evidence:** Running duplicate cleanup on a test directory removes redundant copies, preserves the primary file, and reports exact megabytes recovered.

#### Phase B-08: Batch Pattern Renamer (Search & Replace, Sequencing)
* **Objective:** Batch-rename files according to structured rules (prefix, suffix, date-stamp, sequential numbering, text replacement).
* **Why It Exists:** Photographers, researchers, and developers frequently inherit files like `IMG_00291.jpg` that need structured renaming to `2026-03-Vacation_01.jpg`.
* **Requirements:** Command `rename <target> --pattern "prefix_{seq}_{name}"`. Supports sequence numbers (`01`, `02`), replacing spaces with underscores, and casing changes (`lower`, `upper`). Includes full dry-run preview.
* **Knowledge Needed:** String transformations (`.replace()`, `.zfill()`), sequence indexing, `path.rename()`.
* **Knowledge Pack Required:**
  * *Knowledge Pack: String Templating 01 — Dynamic String Construction & Number Padding*
  * *Knowledge Pack: Safe Renaming 01 — Collision Detection Before Moving*
* **What Docs Must NOT Reveal:** The batch renaming engine.
* **Likely Learner Problems:** Name collisions causing file overwrites (e.g. two files resolving to `renamed_01.txt`); modifying filenames while iterating, causing files to be renamed twice.
* **Help Ladder:**
  * *L0:* If you rename `file1` to `file2`, what happens if `file2` already exists?
  * *L1:* Consult *Safe Renaming 01*.
  * *L2:* Check if the calculated new target name exists on disk *or* in your planned new names set.
  * *L3:* Use `.zfill(2)` or f-string format `f"{idx:02d}"` to format numbers with leading zeroes.
  * *L4:* Print `old_path.name -> new_path.name` in preview mode.
  * *L5:* (Unrelated) Show formatting invoice numbers `INV-0001` from raw integers.
* **Completion Evidence:** Batch renames 20 messy filenames into clean, sequentially numbered patterns without collisions.

#### Phase B-09: Storage Usage Auditor & Largest File Reporter
* **Objective:** Scan a directory tree and report the top 10 largest space hogs and a breakdown of storage by extension.
* **Why It Exists:** When hard drives run out of space, users need to immediately identify what is consuming storage.
* **Requirements:** Command `audit <target>`. Outputs: 1. Top 10 largest files with paths and sizes, 2. Percentage of storage consumed per file category (`Video: 62%`, `Code: 1%`), 3. Number of empty 0-byte files.
* **Knowledge Needed:** Sorting with `key=lambda x: x.stat().st_size`, data accumulation, percentage calculations.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Analytics 01 — Top-N Queries and Ranked Lists*
* **What Docs Must NOT Reveal:** The disk audit report code.
* **Likely Learner Problems:** Sorting all files in memory on massive directory trees; handling permission denied errors mid-scan.
* **Help Ladder:**
  * *L0:* How do you find the 10 biggest items in a list of 1,000 files without scanning 10 times?
  * *L1:* Consult *Analytics 01*.
  * *L2:* Collect `(path, size)` tuples during traversal, then sort descending by size: `sorted(files, key=lambda x: x[1], reverse=True)[:10]`.
  * *L3:* Accumulate sizes into an `extension_totals` dictionary.
  * *L4:* Inspect the first 3 items of your sorted list.
  * *L5:* (Unrelated) Show finding the top 5 highest-paid employees from a company dataset.
* **Completion Evidence:** Running `audit` prints an actionable disk consumption report highlighting the largest files and extension breakdown.

#### Phase B-10: Professional CLI Interface (`argparse`) & Architecture
* **Objective:** Unify all tools under a single professional CLI command structure using Python's standard `argparse` module, split across clean modules.
* **Why It Exists:** Prompting with `input()` is slow for automation. Professional CLI tools use terminal flags (e.g. `devtool organize ~/Downloads --dry-run`).
* **Requirements:** Commands callable directly from the shell with subcommands: `devtool inspect`, `devtool organize`, `devtool find-dupes`, `devtool rename`, `devtool audit`. `--help` automatically documents all commands and arguments.
* **Knowledge Needed:** Standard library `argparse` (subparsers, flags, default values, type conversion), modular packaging.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Professional CLI 01 — Building Subcommand CLI Tools with `argparse`*
  * *Knowledge Pack: Tool Architecture 01 — Packaging Scripts for Terminal Invocation*
* **What Docs Must NOT Reveal:** The devtool CLI argument parser definition.
* **Likely Learner Problems:** Confusing positional arguments with optional flags; forgetting to handle default values.
* **Help Ladder:**
  * *L0:* Why is `git commit -m "msg"` faster to use than an interactive program that asks you 5 questions?
  * *L1:* Consult *Professional CLI 01*.
  * *L2:* Create an `ArgumentParser`, add subparsers with `.add_subparsers(dest="command")`, and bind specific arguments to each subcommand.
  * *L3:* Route to your existing tool functions based on `args.command`.
  * *L4:* Test running `python main.py --help` and verify the output.
  * *L5:* (Unrelated) Show creating a CLI tool to convert currency from command-line flags.
* **Completion Evidence:** Running `python main.py organize ~/TestFolder --dry-run` executes the complete pipeline without interactive prompts, and `--help` displays clean documentation.

---

# PROJECT C: Helpdesk / Issue Tracking System
*State Machines, Relational Modeling, Encapsulation & Role-Based Workflows*

### 1. Project Identity
* **Name:** CoreTrack (Helpdesk & Incident Response System)
* **One-Sentence Description:** A multi-role ticket management engine that models issues through rigorous lifecycle state transitions, maintains immutable audit trails, enforces role permissions, and tracks SLA deadlines.
* **What the Finished Software Does:** Manages tickets with unique keys, priorities, tags, and lifecycle states (`New` → `Triage` → `In-Progress` → `Blocked` → `Resolved` → `Closed`). Enforces permission rules between Customers, Agents, and Admins. Automatically tracks SLA response timers, records chronological activity history, filters tickets across multi-field queries, and persists relational data to disk.
* **Why Build It:** Modern enterprise operations depend on issue trackers (like Jira, Linear, or Zendesk). Building an issue tracker teaches how to model real-world business constraints, relational entities, and state machines.
* **Difficulty:** High Beginner / Intermediate (Focus on Object-Oriented Modeling, lifecycle validation, and relational integrity).
* **Completion Time:** ~14–22 hours (2–3 weeks at motivated pace).

### 2. Final Capabilities
* Robust ticket domain entity with validation (title, description, priority, category, reporter, assignee).
* Explicit state machine preventing illegal status jumps (e.g. cannot jump from `Closed` to `In-Progress`).
* Multi-role authorization (Customers can submit/view own; Agents can assign/work; Admins can override).
* Immutable audit trail logging who changed what, the previous value, new value, and timestamp.
* Comment and internal notes system attached to tickets.
* SLA & urgency tracker: calculates time elapsed since creation, flagging tickets breaching resolution SLAs.
* Multi-criteria query engine: filter by status, assignee, priority, overdue status, or keyword search.
* Persistent relational storage: saving and linking tickets, users, and activity logs in structured JSON.
* Command-line interface with distinct session contexts (logging in as Customer vs. Agent vs. Admin).

### 3. Starting Requirements (From Starting Manual)
* Starting manual fundamentals: variables, loops, conditionals, functions, lists, dicts.
* Basic understanding of tracebacks and debugging.
* Willingness to learn Object-Oriented Programming (Classes) just-in-time.

---

### Project C Roadmap (10 Phases)

#### Phase C-01: System Specification & State Machine Design
* **Objective:** Formulate the ticket lifecycle states, valid transitions, and user permission matrix before writing code.
* **Why It Exists:** Issue trackers fail when business logic is fuzzy. Modeling the lifecycle graph on paper prevents illegal states later.
* **Requirements:** Documented state transition diagram (`New` → `Triage` → `In-Progress` → `Resolved` → `Closed`, with valid return loops). Documented permission table (Customer, Agent, Admin). Skeleton CLI entry.
* **Knowledge Needed:** None (mental modeling, state machine concepts).
* **Knowledge Pack Required:**
  * *Knowledge Pack: State Machines 01 — Modeling Valid States & Transition Rules*
  * *Knowledge Pack: Authorization 01 — Role-Based Permission Matrices*
* **What Docs Must NOT Reveal:** The ticket status dictionary or validation code.
* **Likely Learner Problems:** Allowing any state to transition to any other state (defeating the purpose of an issue tracker).
* **Help Ladder:**
  * *L0:* Should a regular customer be able to mark a ticket as "Resolved" before an agent has looked at it?
  * *L1:* Consult *State Machines 01*.
  * *L2:* Draw a flowchart of states with arrows. An arrow only exists if the transition makes business sense.
  * *L3:* Represent valid transitions as a dictionary: `VALID_TRANSITIONS = {"New": ["Triage", "Closed"], ...}`.
  * *L4:* Verify every state has at least one path to `Closed`.
  * *L5:* (Unrelated) Show a state machine for an e-commerce order (`Pending` → `Paid` → `Shipped` → `Delivered`).
* **Completion Evidence:** Learner presents a complete state transition table and role permission matrix.

#### Phase C-02: Ticket Data Modeling (Why Dicts Break & Moving to Classes)
* **Objective:** Experience the limits of raw dictionaries for complex entities, and build a dedicated `Ticket` class.
* **Why It Exists:** When an entity has 10 fields and requires validation on every change, raw dictionaries lead to repetitive, error-prone code. Classes bundle state and behavior together.
* **Requirements:** Create a `Ticket` class. Instances have auto-incrementing ID (`TICK-101`), title, description, priority (`Low`, `Medium`, `High`, `Critical`), status (defaults to `New`), created_at timestamp.
* **Knowledge Needed:** Object-Oriented Programming basics (`class Ticket:`, `def __init__(self, ...):`, instance attributes).
* **Knowledge Pack Required:**
  * *Knowledge Pack: OOP Fundamentals 01 — Why Classes? The Limits of Dictionaries*
  * *Knowledge Pack: OOP Fundamentals 02 — Defining Classes, `__init__`, and `self`*
* **What Docs Must NOT Reveal:** The exact `Ticket` class implementation.
* **Likely Learner Problems:** Forgetting `self` as the first parameter; modifying class attributes instead of instance attributes.
* **Help Ladder:**
  * *L0:* If you have 3 tickets and change the status on one, did all 3 change? If so, did you assign to `self.status` or `Ticket.status`?
  * *L1:* Consult *OOP Fundamentals 02*.
  * *L2:* `self` refers to the specific instance of the ticket you are currently creating or updating.
  * *L3:* In `__init__`, assign incoming arguments to `self.title = title`, `self.priority = priority`, etc.
  * *L4:* Instantiate two tickets in the REPL and print `ticket1.title` vs `ticket2.title`.
  * *L5:* (Unrelated) Show creating a `PatientRecord` class for a clinic management system.
* **Completion Evidence:** Instantiating multiple `Ticket` objects assigns unique IDs and default attributes cleanly.

#### Phase C-03: The State Machine Transition Method
* **Objective:** Implement a `.transition_to(new_status, user)` method on `Ticket` that strictly enforces the lifecycle rules.
* **Why It Exists:** State mutations must be guarded by business logic. If invalid state changes are allowed, ticket data becomes corrupted.
* **Requirements:** Calling `ticket.transition_to("Resolved")` on a `New` ticket raises a custom `InvalidStateTransitionError` explaining the illegal leap. Only allows transitions defined in the state matrix.
* **Knowledge Needed:** Instance methods, dictionary lookup of allowed states, raising custom exceptions (`class InvalidStateTransitionError(Exception):`).
* **Knowledge Pack Required:**
  * *Knowledge Pack: OOP Methods 01 — Instance Methods as State Guards*
  * *Knowledge Pack: Exceptions 01 — Defining and Raising Domain-Specific Exceptions*
* **What Docs Must NOT Reveal:** The ticket transition method code.
* **Likely Learner Problems:** Mutating `self.status` before validating whether the transition is legal.
* **Help Ladder:**
  * *L0:* Are you checking if `new_status in ALLOWED_TRANSITIONS[self.status]` before or after changing `self.status`?
  * *L1:* Consult *OOP Methods 01* and *Exceptions 01*.
  * *L2:* Define a dictionary mapping current status to a list of allowed next statuses.
  * *L3:* If `new_status` is not in the allowed list, `raise InvalidStateTransitionError(f"Cannot move from {self.status} to {new_status}")`.
  * *L4:* Test triggering an illegal transition in a test script to see the custom error.
  * *L5:* (Unrelated) Show a `BankAccount` method preventing withdrawal when balance is insufficient.
* **Completion Evidence:** Attempting illegal status jumps raises clean, informative errors; legal transitions update the ticket status smoothly.

#### Phase C-04: The Immutable Audit Trail
* **Objective:** Record every state change and attribute modification into a chronological, uneditable history log on the ticket.
* **Why It Exists:** Accountability: in incident response, teams need to know exactly who changed a priority or status and when.
* **Requirements:** Every ticket has an `audit_log` list. Whenever status, priority, or assignee changes, a new entry is appended: `{"timestamp": ..., "user": ..., "action": "STATUS_CHANGE", "from": "New", "to": "Triage"}`.
* **Knowledge Needed:** Datetime stamping, appending dictionaries to object lists, defensive copying.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Auditing 01 — Designing Event-Sourced History Logs*
  * *Knowledge Pack: OOP Methods 02 — Encapsulating Mutations Behind Methods*
* **What Docs Must NOT Reveal:** The audit logging code for tickets.
* **Likely Learner Problems:** Re-binding the audit log across all instances if initialized as a class attribute instead of inside `__init__`.
* **Help Ladder:**
  * *L0:* When you add an audit entry to Ticket A, does it mysteriously show up in Ticket B? Check where `audit_log = []` was defined!
  * *L1:* Consult *OOP Fundamentals 02* (Default mutable arguments trap).
  * *L2:* Always initialize lists inside `def __init__(self): self.audit_log = []`.
  * *L3:* Create a helper method `self._record_audit(user, action, old_val, new_val)`.
  * *L4:* Inspect `id(ticket1.audit_log) == id(ticket2.audit_log)`. It must be `False`.
  * *L5:* (Unrelated) Show recording package delivery status milestones in a shipping parcel object.
* **Completion Evidence:** Moving a ticket through 3 states results in an exact 3-event audit trail detailing timestamps and actors.

#### Phase C-05: Relational User Entities & Role Permissions
* **Objective:** Create a `User` entity with roles (`Customer`, `Agent`, `Admin`) and enforce authorization checks on ticket operations.
* **Why It Exists:** Real software has multiple actors. A customer should not be able to assign tickets or change priorities; only agents and admins can.
* **Requirements:** Class `User(username, role)`. Add authorization check: `ticket.assign_to(agent, acting_user)` fails if `acting_user.role == "Customer"`.
* **Knowledge Needed:** Multi-class relations (passing object instances into methods of other objects), role validation checks.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Relational Modeling 01 — Objects Interacting with Objects*
  * *Knowledge Pack: Security 01 — Role-Based Access Control (RBAC) in Code*
* **What Docs Must NOT Reveal:** The role verification logic for the helpdesk.
* **Likely Learner Problems:** Comparing role strings with inconsistent casing; passing string usernames instead of `User` objects.
* **Help Ladder:**
  * *L0:* Who is performing the action? Did you pass the `acting_user` into the method?
  * *L1:* Consult *Security 01*.
  * *L2:* Check `if acting_user.role not in ["Agent", "Admin"]:` and raise a `PermissionDeniedError`.
  * *L3:* Store references: `self.assignee = agent` and `self.reporter = customer`.
  * *L4:* Test calling the method with a Customer instance and assert that an exception is raised.
  * *L5:* (Unrelated) Show a document editing system where only "Editors" can publish.
* **Completion Evidence:** Agents can assign and triage; Customers attempting privileged actions receive a `PermissionDeniedError`.

#### Phase C-06: Comments & Discussion Threads
* **Objective:** Allow users and agents to post comments and internal private notes on tickets.
* **Why It Exists:** Tickets are collaborative workspaces; teams must communicate context, repro steps, and customer responses.
* **Requirements:** Command to add comment. Comments have author, timestamp, body, and a `is_internal` flag. Customers can only view public comments; Agents can view all comments.
* **Knowledge Needed:** Aggregated sub-entities, filtering lists of dictionaries/objects based on caller permissions.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Composition 01 — One-to-Many Relationships in Python*
* **What Docs Must NOT Reveal:** The comment thread implementation.
* **Likely Learner Problems:** Leaking internal notes to customer views; mutable default arguments in comment lists.
* **Help Ladder:**
  * *L0:* When displaying comments to a customer, did you filter out items where `is_internal is True`?
  * *L1:* Consult *Composition 01*.
  * *L2:* Create a method `get_visible_comments(acting_user)` that filters the comment list based on `acting_user.role`.
  * *L3:* If `acting_user.role == "Customer"`, return `[c for c in self.comments if not c.is_internal]`.
  * *L4:* Run a test viewing comments logged in as a Customer vs. as an Agent.
  * *L5:* (Unrelated) Show filtering medical notes so patients don't see raw administrative billing codes.
* **Completion Evidence:** Adding public and internal notes cleanly separates visibility: customers never see internal agent discussion.

#### Phase C-07: Relational JSON Serialization & Deserialization
* **Objective:** Persist all tickets, users, audit trails, and comments to disk in structured JSON, and cleanly reconstruct real Python objects on reload.
* **Why It Exists:** `json.dump()` cannot serialize custom Python objects directly (`TypeError: Object of type Ticket is not JSON serializable`). Learners must bridge OOP and JSON.
* **Requirements:** Implement `.to_dict()` and classmethod `.from_dict()` on all domain models. System cleanly saves all tickets and reloads them as fully functional `Ticket` instances.
* **Knowledge Needed:** Object serialization, dictionary conversion, `@classmethod` factory pattern, nested JSON handling.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Serialization 01 — Turning Python Objects into Dictionaries (`to_dict`)*
  * *Knowledge Pack: Deserialization 01 — Factory Constructors with `@classmethod` (`from_dict`)*
* **What Docs Must NOT Reveal:** The `Ticket.to_dict()` and `Ticket.from_dict()` methods.
* **Likely Learner Problems:** Trying to dump `ticket.__dict__` directly, which crashes on nested datetime objects; losing object methods upon reload because data loaded as raw dicts.
* **Help Ladder:**
  * *L0:* When you reload your data from JSON, is it a `dict` or a `Ticket`? Can you still call `.transition_to()` on it?
  * *L1:* Consult *Serialization 01* and *Deserialization 01*.
  * *L2:* Convert dates to strings using `.isoformat()` when saving; parse them back with `datetime.fromisoformat()` when loading.
  * *L3:* Build `@classmethod def from_dict(cls, data):` that extracts keys and returns a new instance of the class.
  * *L4:* Print `isinstance(loaded_ticket, Ticket)` after loading.
  * *L5:* (Unrelated) Show serializing and deserializing a `GameCharacter` with weapon inventory.
* **Completion Evidence:** Relaunching the app loads existing tickets as full `Ticket` instances that can execute state transitions and audit logging.

#### Phase C-08: Multi-Criteria Query & Search Engine
* **Objective:** Allow users to filter tickets across multiple simultaneous criteria (e.g., all `High` priority tickets assigned to `Agent Alex` that are in `In-Progress` status).
* **Why It Exists:** When an issue tracker contains hundreds of tickets, finding specific work items requires flexible querying.
* **Requirements:** Command `query --status <status> --priority <pri> --assignee <user> --search <keyword>`. Multiple criteria act as an `AND` query. Empty criteria are ignored.
* **Knowledge Needed:** Dynamic filtering, predicate functions, string matching (`in` / `.lower()`).
* **Knowledge Pack Required:**
  * *Knowledge Pack: Query Engines 01 — Composable Filter Predicates*
* **What Docs Must NOT Reveal:** The ticket query filtering function.
* **Likely Learner Problems:** Chained `if/else` ladders that become exponentially messy; failing when a ticket has no assignee (`None`).
* **Help Ladder:**
  * *L0:* What happens when you check `.lower()` on a ticket's assignee if the ticket is currently unassigned (`None`)?
  * *L1:* Consult *Query Engines 01*.
  * *L2:* Check each condition sequentially: if a condition is provided and does NOT match, reject the ticket. If all pass, keep it.
  * *L3:* Safeguard against `None` values before doing string comparisons.
  * *L4:* Test querying with only 1 parameter, then 2 parameters, then all parameters.
  * *L5:* (Unrelated) Show filtering a product catalog by price, brand, and in-stock status.
* **Completion Evidence:** Querying with multiple simultaneous flags accurately narrows down the ticket list without crashes on unassigned fields.

#### Phase C-09: SLA Deadline & Aging Engine
* **Objective:** Calculate elapsed time since creation and alert agents when a ticket breaches Service Level Agreement (SLA) response thresholds.
* **Why It Exists:** In customer support, failing to respond within agreed hours (e.g. Critical = 4 hrs, High = 24 hrs) violates client contracts.
* **Requirements:** System calculates age using `datetime.now() - created_at`. Command `sla status` categorizes tickets into `Within SLA`, `At Risk` (>75% elapsed), and `Breached`.
* **Knowledge Needed:** `datetime.timedelta`, calculating differences between timestamps, threshold branching.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Temporal Math 01 — Working with `timedelta` & Durations*
  * *Knowledge Pack: Business Logic 01 — Modeling SLAs & Deadlines*
* **What Docs Must NOT Reveal:** The SLA calculation loop.
* **Likely Learner Problems:** Comparing naive and timezone-aware datetimes; negative durations if system clock drifts.
* **Help Ladder:**
  * *L0:* What is the result of subtracting two `datetime` objects? (It's a `timedelta`!).
  * *L1:* Consult *Temporal Math 01*.
  * *L2:* Define a dictionary of SLA limits: `SLA_LIMITS = {"Critical": timedelta(hours=4), ...}`.
  * *L3:* Check `if elapsed_time > SLA_LIMITS[self.priority]: mark_breached()`.
  * *L4:* Test by creating a ticket with a mock creation timestamp from 2 days ago.
  * *L5:* (Unrelated) Show calculating library book overdue fines based on checkout duration.
* **Completion Evidence:** Tickets older than their SLA threshold are flagged as `BREACHED` with hours overdue clearly calculated.

#### Phase C-10: Multi-User Session Shell & Final Polish
* **Objective:** Wrap the system in a session-aware CLI shell where users can switch accounts (`login <user>`) and experience the system through their role's perspective.
* **Why It Exists:** Demonstrates the end-to-end multi-user experience of a secured enterprise application.
* **Requirements:** Command `login <username>`. Shell header displays active user and role (`[Logged in as: Sarah (Agent)]`). Available menu actions adapt dynamically to the logged-in role.
* **Knowledge Needed:** Session state management, CLI loop architecture, modular organization.
* **Knowledge Pack Required:**
  * *Knowledge Pack: Session Architecture 01 — Managing Current User Context in CLI Tools*
* **What Docs Must NOT Reveal:** The main app session loop.
* **Likely Learner Problems:** Global state leaks; allowing actions after logging out.
* **Help Ladder:**
  * *L0:* How does your command loop know who is typing commands?
  * *L1:* Consult *Session Architecture 01*.
  * *L2:* Maintain a `current_user` variable in your main application state. Pass it to every ticket operation.
  * *L3:* If `current_user is None`, only permit `login` or `exit`.
  * *L4:* Verify that switching from Admin to Customer immediately restricts admin commands.
  * *L5:* (Unrelated) Show a banking terminal session where user must authenticate before seeing balance.
* **Completion Evidence:** Logging in as Customer hides agent controls; logging in as Agent unlocks assignment and triage; state persists across session restarts.

---

# PART 3: HUMAN MENTOR TOUCHPOINTS

Mentor sessions are high-leverage calibration checkpoints designed to unblock mental models, not debug syntax typos.

### Project A (Personal Finance Manager) Mentor Moments
1. **Touchpoint 1: Persistence & JSON Data Model (After Phase A-03)**  
   *Focus:* Reviewing the student's `ledger.json` structure and load/save lifecycle. Ensuring they aren't reading/writing files haphazardly inside calculation loops.
2. **Touchpoint 2: Final Architectural Review & Interoperability (After Phase A-09)**  
   *Focus:* Reviewing modular code separation (`storage.py` vs `analytics.py`), numerical precision practices, and verifying clean CSV export.

### Project B (Developer Automation Toolkit) Mentor Moments
1. **Touchpoint 1: Filesystem Safety & Dry-Run Architecture (After Phase B-03)**  
   *Focus:* Inspecting the separation between planning file moves and executing them. Verifying safety guards against accidental path destruction.
2. **Touchpoint 2: Chunked Hashing & Stream Buffering (After Phase B-06)**  
   *Focus:* Deep dive into how cryptographic hashing works in memory chunks vs. whole-file reads. Mentoring on memory-efficient systems programming.
3. **Touchpoint 3: CLI Polish & Argparse Architecture (After Phase B-10)**  
   *Focus:* Reviewing how the tool suite is unified under standard Unix CLI idioms and error handling.

### Project C (Helpdesk / Issue Tracking System) Mentor Moments
1. **Touchpoint 1: Domain Modeling & Transition to Classes (After Phase C-02)**  
   *Focus:* The paradigm shift from dictionaries to classes. Solidifying `self`, instance attributes, and encapsulation.
2. **Touchpoint 2: Object Serialization Factory Patterns (After Phase C-07)**  
   *Focus:* Reviewing `.to_dict()` and `@classmethod from_dict()`. Untangling relational links between users, tickets, and audit events in JSON.
3. **Touchpoint 3: Final System Capstone Review (After Phase C-10)**  
   *Focus:* Student walks the mentor through a live demonstration, explaining the state machine, role security, SLA tracking, and showing their Problem Journal entries.

---

# PART 4: FINAL PROJECT COMPLETION CRITERIA

Completion in PipLearn is based on **observable behavioral capabilities and architectural understanding**, never on checking exact code matches or quiz multiple-choice questions.

### The 5 Completion Standards
1. **Working Software Verification:** The program executes end-to-end, fulfills all phase requirements, handles bad inputs gracefully, and persists data correctly.
2. **Design Decision Articulation:** The learner can explain *why* they chose their data structures (e.g., *"Why did you use a dictionary of lists for duplicate sizes instead of a flat list?"*).
3. **Problem Journal Audit:** The learner presents their `problem_journal.md` containing at least 3–5 thoroughly analyzed bugs/roadblocks they personally diagnosed and solved.
4. **Knowledge Concept Fluency:** The learner can explain the core Python mechanisms used in their project without referencing AI (e.g., context managers, `pathlib`, classes, or `datetime`).
5. **Live Walkthrough Demonstration:** The learner demonstrates the running tool, deliberately triggering edge cases (e.g., missing files, bad inputs, unauthorized actions) to prove system resilience.
