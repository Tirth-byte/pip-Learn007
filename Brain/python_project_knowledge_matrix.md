# PipLearn — Python Project Knowledge Distribution Matrix

> **Purpose & Architecture**  
> This matrix maps the progression of Python concepts from the **Starting Manual** through the **Three Foundational Projects** and into **Later Advanced Engineering**.  
> It guarantees that every Tier B concept from `Brain/python_knowledge_map.md` is unlocked naturally through genuine software challenges, while ensuring that the three projects teach distinct domains rather than redundant CRUD exercises.

---

## Notation Legend
* **★ Intro:** Concept is introduced for the first time as a core requirement to solve a project problem.
* **✔ Reinf:** Concept is actively reinforced, integrated, and practiced in this project.
* **—:** Not covered or required in this scope (intentionally deferred).

---

## Master Knowledge Matrix

| Python Knowledge Area | Starting Manual (Tier A) | Project A: Finance Manager | Project B: Automation Toolkit | Project C: Helpdesk System | Later / Advanced (Tier C) |
|---|:---:|:---:|:---:|:---:|:---:|
| **Variables, State & Primitive Types** | ★ Intro | ✔ Reinf | ✔ Reinf | ✔ Reinf | — |
| **Arithmetic Operators & Logic** | ★ Intro | ✔ Reinf | ✔ Reinf | ✔ Reinf | — |
| **Control Flow (`if`, `elif`, `else`)** | ★ Intro | ✔ Reinf | ✔ Reinf | ✔ Reinf | — |
| **Repetition (`for`, `while`, `break`)** | ★ Intro | ✔ Reinf | ✔ Reinf | ✔ Reinf | — |
| **Basic Functions & Parameters** | ★ Intro | ✔ Reinf | ✔ Reinf | ✔ Reinf | — |
| **Basic Traceback & Diagnostic Protocol** | ★ Intro | ✔ Reinf | ✔ Reinf | ✔ Reinf | — |
| **Lists (Indexing, `.append()`, `len()`)** | ★ Intro | ✔ Reinf | ✔ Reinf | ✔ Reinf | — |
| **Dictionaries (Key-Value, `.get()`)** | ★ Intro | ✔ Reinf | ✔ Reinf | ✔ Reinf | — |
| **String Formatting (F-Strings & Alignment)**| ★ Intro | ✔ Reinf | ✔ Reinf | ✔ Reinf | — |
| **Standard Library Modules (`math`, `random`)** | ★ Intro | — | — | — | — |
| **Basic File I/O (`open()`, `with` statement)** | — | ★ Intro | ✔ Reinf | ✔ Reinf | — |
| **JSON Data Serialization (`json.dump/load`)** | — | ★ Intro | — | ✔ Reinf | — |
| **Robust Validation (`try/except ValueError`)** | ★ Intro (basic) | ✔ Reinf (loops) | ✔ Reinf | ✔ Reinf | — |
| **Numerical Integrity & Float Formatting** | — | ★ Intro | — | — | — |
| **Data Aggregation & Grouped Accumulation** | — | ★ Intro | ✔ Reinf (sizes) | — | — |
| **Sorting with Custom Keys (`lambda`/itemgetter)** | — | ★ Intro | ✔ Reinf (top-N) | ✔ Reinf | — |
| **Date & Time Handling (`datetime.date/now`)** | — | ★ Intro | — | ✔ Reinf | — |
| **Tabular File Export (`csv` module)** | — | ★ Intro | — | — | — |
| **Modern Paths (`pathlib.Path`)** | — | — | ★ Intro | — | — |
| **Recursive Directory Traversal (`rglob`)** | — | — | ★ Intro | — | — |
| **OS Filesystem Mutations (`shutil.move/copy`)** | — | — | ★ Intro | — | — |
| **Safe Deletion & File Unlinking (`unlink`)** | — | — | ★ Intro | — | — |
| **Cryptographic Hashing (`hashlib.sha256`)** | — | — | ★ Intro | — | — |
| **Chunked Binary File Streaming (`rb`, buffers)** | — | — | ★ Intro | — | — |
| **String Templating & Padding (`.zfill`, regex)**| — | — | ★ Intro | — | — |
| **Professional CLI Flags (`argparse` subparsers)** | — | — | ★ Intro | — | — |
| **Object-Oriented Programming (`class`, `self`)** | — | — | — | ★ Intro | — |
| **Instance Attributes vs Class Attributes** | — | — | — | ★ Intro | — |
| **Encapsulated State Mutation Methods** | — | — | — | ★ Intro | — |
| **State Machine Modeling & Lifecycle Guards** | — | — | — | ★ Intro | — |
| **Custom Exception Classes (`raise MyError`)** | — | — | — | ★ Intro | — |
| **Event Sourcing & Immutable Audit Logs** | — | — | — | ★ Intro | — |
| **Relational Entity References (User ↔ Ticket)**| — | — | — | ★ Intro | — |
| **Role-Based Access Control (RBAC)** | — | — | — | ★ Intro | — |
| **Factory Constructors (`@classmethod from_dict`)** | — | — | — | ★ Intro | — |
| **Time Deltas & SLA Math (`datetime.timedelta`)** | — | — | — | ★ Intro | — |
| **Modular Multi-File Packaging (`__main__`)** | — | ★ Intro | ★ Intro | ★ Intro | — |
| **Virtual Environments (`venv`, `requirements`)** | — | — | — | — | ★ Intro |
| **Third-Party HTTP APIs (`requests`)** | — | — | — | — | ★ Intro |
| **Relational Databases (SQLite / ORMs)** | — | — | — | — | ★ Intro |
| **Metaprogramming & Custom Decorators** | — | — | — | — | ★ Intro |
| **Dunder Operator Overloading (`__add__`, etc.)** | — | — | — | — | ★ Intro |
| **Concurrency & Async/Await (`asyncio`)** | — | — | — | — | ★ Intro |
| **Automated Unit Testing (`pytest`)** | — | — | — | — | ★ Intro |

---

## Pedagogical Breakdown

### 1. Concepts Common to All 3 Projects
Every student, regardless of which project path they select, will master:
1. **Interactive CLI Loops:** Building responsive command loops that process user input and maintain runtime state.
2. **Defensive Validation:** Wrapping risky operations in `try/except` to prevent unhandled crashes.
3. **Data Collection Management:** Indexing, updating, and querying complex nested lists and dictionaries.
4. **Architectural Modularity:** Transitioning from a single flat script to a multi-file project with separated concerns (`storage`, `models`, `ui`, `main`).
5. **The 7-Step Diagnostic Protocol:** Using Python's error messages and tracebacks as navigational beacons rather than points of despair.
6. **Self-Reliant Documentation Reading:** Consulting Knowledge Packs and official Python docs to discover syntax and function signatures independently.

---

### 2. Concepts Unique to Each Project

#### Project A (Personal Finance Manager) Uniques:
* **Float Precision & Currency Modeling:** Discovering float rounding errors (`0.1 + 0.2 != 0.3`) and enforcing 2-decimal formatting.
* **Double-Entry Style Ledger Aggregation:** Grouping financial records by category and calculating net cashflow ratios.
* **Interoperable Data Export (`csv`):** Serializing memory models into industry-standard comma-separated files for Excel/Sheets.
* **Visual Headroom & CLI Progress Bars:** Generating dynamic ASCII progress indicators to visualize budget limits.

#### Project B (Developer Automation Toolkit) Uniques:
* **Object-Oriented Path Traversal (`pathlib.Path`):** Navigating complex filesystem trees, handling relative paths, and resolving symlinks.
* **Binary File I/O & Memory Buffering:** Reading multi-gigabyte files in 64KB chunks to prevent RAM starvation.
* **Cryptographic Content Fingerprinting (`hashlib`):** Using SHA-256 digests to detect binary identity independent of filenames.
* **Batch Safety Patterns (Dry-Run Preview):** Decomposing destructive filesystem mutations into a two-phase plan-and-apply architecture.
* **Production Command-Line Flags (`argparse`):** Creating subcommands, positional arguments, and boolean flags matching standard Unix tools.

#### Project C (Helpdesk / Issue Tracking System) Uniques:
* **Object-Oriented Domain Modeling (`class`, `__init__`, `self`):** Grouping state and validation logic into cohesive domain entities.
* **State Machine Lifecycle Validation:** Enforcing strict, unidirectional status transitions (`New` → `Triage` → `In-Progress` → `Resolved`).
* **Domain Exceptions (`raise CustomError`):** Creating dedicated exception hierarchies to model business logic violations.
* **Relational Object Links & Multi-Role Authorization:** Managing interactions between different entity types (`User` vs `Ticket`) and enforcing Role-Based Access Control.
* **Factory Pattern Deserialization (`@classmethod from_dict`):** Transforming serialized JSON dictionaries back into live object instances.
* **Duration Calculations (`datetime.timedelta`):** Performing temporal arithmetic to detect SLA breaches and response lags.

---

### 3. Concepts Intentionally Deferred After These 3 Projects (Tier C)

Even after completing one of these substantial projects, the learner is **still not expected to know**:
* **Virtual Environments & Third-Party Packages (`venv`, `requests`, `rich`, `pydantic`):**  
  * *Why Deferred:* All three foundational projects rely exclusively on the **Python Standard Library** (`json`, `pathlib`, `hashlib`, `datetime`, `csv`, `argparse`). This eliminates installation issues, platform discrepancies, and dependency conflicts for beginners. Third-party packages are introduced in **Phase 3 (Web APIs & Microservices)**.
* **Relational Databases & SQL (SQLite, PostgreSQL, SQLAlchemy):**  
  * *Why Deferred:* Flat JSON and CSV files demystify data serialization. Introducing SQL schemas, migrations, and ORMs prematurely obscures fundamental data structure manipulation.
* **Concurrency & Asynchronous I/O (`asyncio`, `threads`, `multiprocessing`):**  
  * *Why Deferred:* Beginners must master deterministic, sequential execution order before grappling with event loops, race conditions, or parallel thread safety.
* **Metaprogramming & Dunder Operator Overloading (`__new__`, `@decorator`, `__add__`):**  
  * *Why Deferred:* These are specialized tools for framework authors, not application developers.
* **Automated Test Suites (`pytest`, mocking, fixtures):**  
  * *Why Deferred:* Writing good automated tests requires deep understanding of modular software design. The learner first learns how to construct working software; formal testing is introduced in Phase 3.
