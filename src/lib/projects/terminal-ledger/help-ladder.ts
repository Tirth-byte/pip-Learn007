import { ProblemJournalEntry } from "@/learning-state/problem-journal";

export interface HelpLevel0 {
  question: string;
  inspectionPoints: string[];
}

export interface HelpResourceLink {
  title: string;
  kind: "knowledge-pack" | "manual";
  refId: string;
  packSlug?: string;
  manualSlug?: string;
  description: string;
}

export interface HelpLevel1 {
  resources: HelpResourceLink[];
}

export interface HelpLevel2 {
  directionalHint: string;
}

export interface HelpLevel3 {
  structuralHint: string;
  dataFlowDescription: string;
}

export interface HelpLevel4 {
  protocolSteps: string[];
}

export interface HelpLevel5 {
  unrelatedDomain: string;
  context: string;
  codeExample: string;
  explanation: string;
}

export interface PhaseHelpPathway {
  phaseSlug: string;
  phaseNumber: number;
  focus: string;
  l0: HelpLevel0;
  l1: HelpLevel1;
  l2: HelpLevel2;
  l3: HelpLevel3;
  l4: HelpLevel4;
  l5: HelpLevel5;
}

export const DEBUGGING_LOOP_STEPS = [
  { step: 1, label: "Read the error", detail: "Examine the exact traceback and exception type without panic." },
  { step: 2, label: "Locate the failing line", detail: "Find the bottom-most line in your code mentioned in the traceback." },
  { step: 3, label: "Compare expected vs provided", detail: "State what value or argument was expected versus what was passed." },
  { step: 4, label: "Inspect values and types", detail: "Print the runtime types and values immediately before the failing line." },
  { step: 5, label: "Consult documentation", detail: "Review the relevant Knowledge Pack or manual section for the mechanism in play." },
  { step: 6, label: "Change ONE thing", detail: "Formulate one single hypothesis and make one precise adjustment." },
  { step: 7, label: "Rerun and observe", detail: "Run the program again and check whether the observation matches your expectation." },
];

export const PHASE_HELP_PATHWAYS: Record<string, PhaseHelpPathway> = {
  "phase-01": {
    phaseSlug: "phase-01",
    phaseNumber: 1,
    focus: "Product planning, behavior definition, and smallest working milestone",
    l0: {
      question:
        "Before writing any code: can you describe what your program does strictly from the user's perspective? What specific problem does your first milestone solve, and what exact observable output proves it succeeded?",
      inspectionPoints: [
        "What specific information does the user provide at the prompt?",
        "What observable result appears on the screen in response?",
        "Which three features have you deliberately deferred to keep this first milestone small?",
      ],
    },
    l1: {
      resources: [
        {
          title: "Starting Manual: Section 11 — How to Start Building Software",
          kind: "manual",
          refId: "manual-11",
          manualSlug: "11-how-to-start-building-software",
          description: "The 10-step Launch Sheet and the smallest working milestone technique.",
        },
        {
          title: "Starting Manual: Section 01 — What Programming Actually Is",
          kind: "manual",
          refId: "manual-01",
          manualSlug: "01-what-programming-actually-is",
          description: "Translating human expectations into precise, unambiguous computer instructions.",
        },
      ],
    },
    l2: {
      directionalHint:
        "Focus strictly on behavioral requirements rather than code architecture. State what the user enters and what the program displays in response. If a requirement feels confusing or overwhelming, break it down: determine whether you are describing an external observable outcome or prematurely trying to design internal program mechanics.",
    },
    l3: {
      structuralHint:
        "Structure your plan around three essential behavioral boundaries: Input, Intended Behavior, and Observable Result. For your chosen first milestone, write down: (1) what exact prompt appears, (2) what input the user enters, and (3) what output appears on screen immediately afterward. Keep the scope limited to a single end-to-end user action.",
      dataFlowDescription:
        "User input provided -> intended behavioral rule applied -> observable result displayed on screen.",
    },
    l4: {
      protocolSteps: [
        "Identify any assumption in your plan that requires a guess (e.g. 'the program records an entry' without stating what fields are entered).",
        "Separate user-facing behavior from internal decisions: replace any mention of functions or code with what the user observes.",
        "Formulate an exact manual test scenario: write down the exact keystrokes the user enters and the exact lines of text that must appear.",
        "Verify that at least three advanced features (such as persistent storage, complex summaries, or multiple views) are explicitly deferred.",
      ],
    },
    l5: {
      unrelatedDomain: "Parcel Pickup Kiosk",
      context:
        "A behavior specification defining the smallest first milestone for an automated package pickup station.",
      codeExample: `BEHAVIOR SPECIFICATION — FIRST MILESTONE:

User Action:
1. System displays: "PARCEL KIOSK: Enter 4-digit pickup code:"
2. User enters: "4821"

Intended Behavior:
- If code matches a known parcel: display "Locker #14 unlocked. Please retrieve your parcel."
- If code is unrecognized: display "Unrecognized code. Please re-enter."

Observable Result:
- Clear text confirmation and locker assignment displayed on screen.

Explicitly Deferred:
- Barcode scanning, multi-package orders, payment collection, SMS notifications.`,
      explanation:
        "Notice how this specification describes 100% observable user behavior without mentioning classes, files, loops, or implementation choices.",
    },
  },

  "phase-02": {
    phaseSlug: "phase-02",
    phaseNumber: 2,
    focus: "In-memory record structures and aligned terminal display",
    l0: {
      question:
        "Quit and restart your program. Where are your entered records stored right now? While the program is running, what is the exact Python type of the container holding your records?",
      inspectionPoints: [
        "Print type(records) in your terminal. Is it a list?",
        "Print records immediately after adding an entry. Does it contain a dictionary with the expected keys?",
        "Inspect each value: are numerical values stored as numbers or as raw strings?",
      ],
    },
    l1: {
      resources: [
        {
          title: "Records 01 — Modeling One Thing with Several Fields",
          kind: "knowledge-pack",
          refId: "records-01",
          packSlug: "records-01-modeling-one-thing-with-several-fields",
          description: "Representing entity records as dictionaries with named string keys.",
        },
        {
          title: "Display 01 — Aligned, Readable Terminal Output",
          kind: "knowledge-pack",
          refId: "display-01",
          packSlug: "display-01-aligned-readable-terminal-output",
          description: "Formatting tabular data using f-string field-width specifiers (<, >).",
        },
        {
          title: "Starting Manual: Section 06 — Working with Collections",
          kind: "manual",
          refId: "manual-06",
          manualSlug: "06-working-with-collections",
          description: "Lists of dictionaries, indexing, and iterating with for loops.",
        },
      ],
    },
    l2: {
      directionalHint:
        "A single entry is best modeled as a dictionary where each key names an attribute. An in-memory collection is a list of these dictionaries. When displaying them, format specifiers like :<20 and :>8 align columns into readable tables regardless of text length.",
    },
    l3: {
      structuralHint:
        "Keep record creation separate from record display. When collecting user inputs, build a dictionary containing the validated values, then append it to your master list. For display, write a dedicated function that prints a header row, iterates through the list, and formats each record into fixed-width columns.",
      dataFlowDescription:
        "Raw user inputs -> typed dictionary -> append to master list -> loop over list -> formatted table rows.",
    },
    l4: {
      protocolSteps: [
        "Before your display loop, add: print('DEBUG collection length:', len(my_records)).",
        "Add: for idx, r in enumerate(my_records): print(f'DEBUG [{idx}]:', type(r), r).",
        "If a KeyError appears during formatting, print list(r.keys()) to verify key spelling matches your f-string template.",
        "Print type(r['numeric_field']) to verify whether the value is a float or string before applying number formatting.",
      ],
    },
    l5: {
      unrelatedDomain: "Library Book Registry",
      context:
        "Storing book records in a list of dictionaries and displaying them in aligned tabular columns.",
      codeExample: `catalog = []
catalog.append({"title": "Dune", "author": "Herbert", "pages": 412})
catalog.append({"title": "1984", "author": "Orwell", "pages": 328})

print(f"{'TITLE':<15} {'AUTHOR':<12} {'PAGES':>6}")
print("-" * 35)
for book in catalog:
    print(f"{book['title']:<15} {book['author']:<12} {book['pages']:>6}")`,
      explanation:
        "Format specifiers '<' (left-align) and '>' (right-align) ensure consistent column boundaries without manual space counting.",
    },
  },

  "phase-03": {
    phaseSlug: "phase-03",
    phaseNumber: 3,
    focus: "Persistence lifecycle using JSON serialization and first-run grace",
    l0: {
      question:
        "Quit your program completely and open your data file in your editor. What exact text does it contain? Now relaunch your program: what does the display show? Where do disk contents and program output first disagree?",
      inspectionPoints: [
        "Does the data file exist before running for the very first time?",
        "What happens if the file does not exist when your program starts? Does it crash with FileNotFoundError?",
        "When during program execution is your file-writing function actually invoked?",
      ],
    },
    l1: {
      resources: [
        {
          title: "Persistence 01 — Files, Modes, and the with Statement",
          kind: "knowledge-pack",
          refId: "persistence-01",
          packSlug: "persistence-01-files-modes-and-the-with-statement",
          description: "Opening files safely with the with statement in read ('r') and write ('w') modes.",
        },
        {
          title: "Persistence 02 — JSON: Serializing Values to Text and Back",
          kind: "knowledge-pack",
          refId: "persistence-02",
          packSlug: "persistence-02-json-serializing-values-to-text-and-back",
          description: "Using json.dump() and json.load() to convert between Python data and JSON text.",
        },
        {
          title: "Starting Manual: Section 09 — Errors and Debugging",
          kind: "manual",
          refId: "manual-09",
          manualSlug: "09-errors-debugging",
          description: "Handling FileNotFoundError gracefully with try and except.",
        },
      ],
    },
    l2: {
      directionalHint:
        "Files on disk only store text. The json module serializes in-memory Python structures (lists, dicts, strings, numbers) into text, and deserializes that text back into Python objects. The persistence lifecycle is: load once at startup, mutate in memory during execution, and serialize to disk upon every mutation or cleanly before exit.",
    },
    l3: {
      structuralHint:
        "Isolate storage operations into two pure functions: load_records(filename) and save_records(filename, records). The loader checks if the file exists (or catches FileNotFoundError) and returns an empty list if missing. The saver opens the file with mode 'w' and calls json.dump(records, f, indent=2).",
      dataFlowDescription:
        "Disk file -> json.load -> in-memory list -> user mutations -> json.dump -> disk file.",
    },
    l4: {
      protocolSteps: [
        "In a small isolated test script, import json and define a sample list with one item.",
        "Save it using: with open('test_store.json', 'w') as f: json.dump(sample_list, f, indent=2).",
        "Open test_store.json in your editor to verify that valid JSON was produced.",
        "Load it back: with open('test_store.json', 'r') as f: loaded = json.load(f).",
        "Assert sample_list == loaded. Then delete test_store.json and test how your loader handles the missing file.",
      ],
    },
    l5: {
      unrelatedDomain: "Arcade Game High Scores",
      context:
        "Persisting a leaderboard of player scores to a JSON file and loading it defensively on startup.",
      codeExample: `import json, os

score_file = "high_scores.json"
if os.path.exists(score_file):
    with open(score_file, "r") as f:
        leaderboard = json.load(f)
else:
    leaderboard = []

leaderboard.append({"player": "Nova", "score": 9450})
with open(score_file, "w") as f:
    json.dump(leaderboard, f, indent=2)`,
      explanation:
        "Checking file existence or catching FileNotFoundError provides first-run grace, while json.dump preserves structured records.",
    },
  },

  "phase-04": {
    phaseSlug: "phase-04",
    phaseNumber: 4,
    focus: "Bounded validation loops, defensive loading, and decimal precision",
    l0: {
      question:
        "Enter 'abc' or '$50' when prompted for a number. Does your program crash with a ValueError traceback? Where is the exact boundary where raw user text attempts to become a number?",
      inspectionPoints: [
        "Locate the exact line where float() or int() is called.",
        "Is that conversion call guarded by a try/except ValueError block?",
        "If conversion fails, does the program re-prompt the user or crash?",
      ],
    },
    l1: {
      resources: [
        {
          title: "Robust Input 01 — Validating and Re-Prompting User Input",
          kind: "knowledge-pack",
          refId: "robust-input-01",
          packSlug: "robust-input-01-validating-and-re-prompting-user-input",
          description: "Constructing while-loop validation boundaries that re-prompt until input is valid.",
        },
        {
          title: "Numbers 01 — Float Precision and Displaying Decimal Values",
          kind: "knowledge-pack",
          refId: "numbers-01",
          packSlug: "numbers-01-float-precision-and-displaying-decimal-values",
          description: "Understanding floating-point behavior and formatting numbers with :.2f.",
        },
        {
          title: "Persistence 03 — Defensive Loading",
          kind: "knowledge-pack",
          refId: "persistence-03",
          packSlug: "persistence-03-defensive-loading",
          description: "Handling missing, empty, and malformed files without crashing or destroying data.",
        },
      ],
    },
    l2: {
      directionalHint:
        "Never trust text from input(). Wrap conversions in a while True loop: read text, strip whitespace, attempt conversion inside a narrow try/except ValueError block, verify business rules (e.g. value > 0), and return only when valid, printing an explanatory message otherwise.",
    },
    l3: {
      structuralHint:
        "Encapsulate each input boundary in a dedicated prompt function. The function runs an infinite loop: read text, attempt float conversion, check domain constraints. If valid, return the number. If invalid or if conversion raises ValueError, print a calm notice and let the loop repeat. The caller receives only clean, validated values.",
      dataFlowDescription:
        "Raw string -> try float conversion -> check > 0 -> return float OR alert & loop.",
    },
    l4: {
      protocolSteps: [
        "Isolate your input prompt into a standalone test function in a scratch script.",
        "Wrap the float(...) conversion in a try...except ValueError: block.",
        "Feed the function test inputs: '', 'abc', '-5', '0', '12.50'.",
        "Verify that non-numeric and non-positive inputs trigger clear re-prompts and only valid floats return.",
      ],
    },
    l5: {
      unrelatedDomain: "Weather Station Temperature Readings",
      context:
        "A robust prompt loop that prompts for a temperature reading and rejects non-numeric input.",
      codeExample: `def prompt_temperature():
    while True:
        raw = input("Enter reading (deg C): ").strip()
        try:
            val = float(raw)
            if -50.0 <= val <= 60.0:
                return val
            print("Out of sensor range (-50 to 60 C). Try again.")
        except ValueError:
            print("Invalid reading. Please enter a valid decimal number.")`,
      explanation:
        "The while loop guarantees that the caller receives a verified float within valid bounds without tracebacks.",
    },
  },

  "phase-05": {
    phaseSlug: "phase-05",
    phaseNumber: 5,
    focus: "Text normalization and deriving filtered views without mutating source data",
    l0: {
      question:
        "Enter 'Groceries' for one entry and ' groceries ' for another. Does your query treat them as different? Print both strings with brackets: f'[{entry_val}]'. Do whitespace or casing differ?",
      inspectionPoints: [
        "What is your program's normalization policy? (e.g. .strip().lower())",
        "When filtering, are you modifying the original collection in place, or creating a new filtered list?",
        "What happens when zero records match the requested filter?",
      ],
    },
    l1: {
      resources: [
        {
          title: "Strings 01 — Normalizing Text for Reliable Comparison",
          kind: "knowledge-pack",
          refId: "strings-01",
          packSlug: "strings-01-normalizing-text-for-reliable-comparison",
          description: "Removing leading/trailing whitespace and matching case-insensitively.",
        },
        {
          title: "Querying 01 — Building Filtered Subsets",
          kind: "knowledge-pack",
          refId: "querying-01",
          packSlug: "querying-01-building-filtered-subsets",
          description: "Deriving new filtered lists using loops or comprehensions without mutating source data.",
        },
        {
          title: "Starting Manual: Section 05 — Making Decisions",
          kind: "manual",
          refId: "manual-05",
          manualSlug: "05-making-decisions",
          description: "Conditional logic, string equality, and case transformations.",
        },
      ],
    },
    l2: {
      directionalHint:
        "User text varies in casing and whitespace. Normalize query terms and stored tags with .strip().lower() before comparing. When filtering, construct a new list containing only matching records—never delete non-matching items from your primary collection.",
    },
    l3: {
      structuralHint:
        "Define a query function that accepts the master collection and a filter string. Normalize the query. Iterate through the collection, normalize the target attribute on each record, and if it matches, append the record to a new result list. Return the new list. The master collection remains intact and untouched.",
      dataFlowDescription:
        "Master collection -> query function with filter -> compare normalized values -> accumulate matches -> return new subset.",
    },
    l4: {
      protocolSteps: [
        "Print repr(query) and repr(record_tag) to reveal hidden whitespace differences.",
        "Apply .strip().lower() to both sides of the comparison.",
        "Verify that filtered = [r for r in records if r['tag'].strip().lower() == query.strip().lower()] produces a new list with id(filtered) != id(records).",
        "Confirm that your master collection still has its original length after running the filter.",
      ],
    },
    l5: {
      unrelatedDomain: "Botanical Garden Plant Catalog",
      context:
        "Filtering an inventory of plants by habitat zone with normalized string matching.",
      codeExample: `garden = [
    {"species": "Fern", "zone": "Shade"},
    {"species": "Cactus", "zone": "Arid"},
    {"species": "Moss", "zone": " shade "}
]
query = "  SHADE ".strip().lower()
matches = [p for p in garden if p["zone"].strip().lower() == query]
print(f"Found {len(matches)} matching plants:")
for plant in matches:
    print(f" - {plant['species']}")`,
      explanation:
        "Normalizing both sides before comparison handles varied casing and whitespace without altering source data.",
    },
  },

  "phase-06": {
    phaseSlug: "phase-06",
    phaseNumber: 6,
    focus: "Parsing ISO dates, chronological comparison, and monthly views",
    l0: {
      question:
        "Enter a date like '2026-03-15'. How does your program store it? What happens if the user enters '2026-02-31' or 'yesterday'?",
      inspectionPoints: [
        "What date format does your application specify? (ISO 8601: YYYY-MM-DD)",
        "How do you extract the year and month to determine which records belong to a given month?",
        "Does string comparison date_a <= date_b work correctly for ISO-formatted dates?",
      ],
    },
    l1: {
      resources: [
        {
          title: "Dates 01 — Working With Dates in Python",
          kind: "knowledge-pack",
          refId: "dates-01",
          packSlug: "dates-01-working-with-dates-in-python",
          description: "Parsing, formatting, and comparing dates using Python's datetime module.",
        },
        {
          title: "Dates 02 — Building Monthly Views",
          kind: "knowledge-pack",
          refId: "dates-02",
          packSlug: "dates-02-building-monthly-views",
          description: "Filtering records by calendar month and deriving period subtotals.",
        },
        {
          title: "Starting Manual: Section 10 — Modules, Packages, and Documentation",
          kind: "manual",
          refId: "manual-10",
          manualSlug: "10-modules-packages-documentation",
          description: "Importing standard library modules like datetime.",
        },
      ],
    },
    l2: {
      directionalHint:
        "ISO 8601 dates (YYYY-MM-DD) sort chronologically even as plain strings. Use datetime.strptime to validate that a date actually exists on the calendar. To filter for a specific month, you can compare the YYYY-MM prefix or inspect the date components.",
    },
    l3: {
      structuralHint:
        "For date inputs, default to today's date if blank, or validate user strings against %Y-%m-%d. For a monthly view, accept a year and month (e.g. '2026-03'). Derive matching records by checking if each record's date string starts with that prefix, calculate the subtotal for that slice, and render.",
      dataFlowDescription:
        "Date input -> validate YYYY-MM-DD -> store with record -> query by 'YYYY-MM' -> filter subset -> display month total.",
    },
    l4: {
      protocolSteps: [
        "Test your date validator against edge cases: '2026-02-29' (leap year check), '2026-13-01', '2026-00-10'.",
        "In an isolated test, verify that '2026-01-15' < '2026-02-01' evaluates to True.",
        "Print record['date'][:7] for several sample records to confirm consistent year-month prefix extraction.",
        "Verify how an empty month displays: does it render a clear message without division or index errors?",
      ],
    },
    l5: {
      unrelatedDomain: "Astronomical Event Tracker",
      context:
        "Filtering celestial observation records by calendar month using ISO date prefixes.",
      codeExample: `from datetime import datetime

observations = [
    {"event": "Lunar Eclipse", "date": "2026-03-03"},
    {"event": "Meteor Shower", "date": "2026-03-14"},
    {"event": "Comet Flyby", "date": "2026-04-22"}
]
target_month = "2026-03"
month_events = [o for o in observations if o["date"].startswith(target_month)]
print(f"Observations for {target_month}: {len(month_events)}")
for obs in month_events:
    print(f"  {obs['date']}: {obs['event']}")`,
      explanation:
        "Strict YYYY-MM-DD formatting makes month filtering as straightforward as checking the 7-character prefix.",
    },
  },

  "phase-07": {
    phaseSlug: "phase-07",
    phaseNumber: 7,
    focus: "Compound state persistence, threshold calculations, and visual progress indicators",
    l0: {
      question:
        "Where are your limits stored? If you save a new limit, do your records survive? If you save a new record, do your limits survive? Quit and inspect the raw JSON file.",
      inspectionPoints: [
        "What is the top-level structure of your JSON file? (A dictionary with multiple keys?)",
        "When calculating progress toward a limit, what happens if the limit is set to zero?",
        "Does exceeding a threshold cause an unhandled exception or a clear visual warning?",
      ],
    },
    l1: {
      resources: [
        {
          title: "State 02 — Persisting More Than One Kind of State",
          kind: "knowledge-pack",
          refId: "state-02",
          packSlug: "state-02-persisting-more-than-one-kind-of-state.md",
          description: "Structuring JSON data to hold multiple entity types in a dictionary container.",
        },
        {
          title: "Display 02 — Showing Progress Toward a Threshold",
          kind: "knowledge-pack",
          refId: "display-02",
          packSlug: "display-02-showing-progress-toward-a-threshold",
          description: "Rendering bounded ASCII progress bars and threshold warning indicators.",
        },
        {
          title: "Verification 01 — Writing Small Checks for Your Logic",
          kind: "knowledge-pack",
          refId: "verification-01",
          packSlug: "verification-01-writing-small-checks-for-your-logic",
          description: "Writing assert statements to test calculation logic independently.",
        },
      ],
    },
    l2: {
      directionalHint:
        "When an application tracks more than one kind of data, the top-level persistent state should be a dictionary holding distinct collections. Protect calculations against division by zero. Use clamped ratios (between 0.0 and 1.0) when rendering progress bar characters.",
    },
    l3: {
      structuralHint:
        "Upgrade your storage schema from a plain list to a container dictionary with distinct keys for your collections. When calculating threshold usage, check if limit > 0 before dividing. Clamp the percentage to 100% for the visual bar (e.g. 10 filled characters) and print a distinct warning status indicator if the current total exceeds the limit.",
      dataFlowDescription:
        "Container dict -> load collections -> compute sum / limit -> clamp ratio -> render bar + warning.",
    },
    l4: {
      protocolSteps: [
        "Write a test function that computes progress bar characters given current and maximum values.",
        "Test with maximum = 0 to verify zero-division protection.",
        "Test with current = 150 and maximum = 100 to verify that the bar does not overflow terminal width and triggers a warning.",
        "Inspect your JSON save function: ensure both collections are written together on every save.",
      ],
    },
    l5: {
      unrelatedDomain: "Warehouse Shelf Weight Capacity",
      context:
        "Tracking current weight on storage shelves against maximum weight thresholds with a progress bar.",
      codeExample: `shelves = {"A1": {"max_kg": 500, "current_kg": 420}}

for shelf_id, data in shelves.items():
    limit = data["max_kg"]
    used = data["current_kg"]
    pct = (used / limit) if limit > 0 else 0.0
    bar_len = min(10, int(pct * 10))
    bar = "#" * bar_len + "-" * (10 - bar_len)
    status = "ALERT: OVERWEIGHT" if used > limit else "NORMAL"
    print(f"Shelf {shelf_id}: [{bar}] {used}/{limit} kg ({status})")`,
      explanation:
        "Guarding against zero limit and clamping bar width prevents graphical distortion and runtime crashes.",
    },
  },

  "phase-08": {
    phaseSlug: "phase-08",
    phaseNumber: 8,
    focus: "Grouped accumulation, dictionary aggregation, and sorted rankings",
    l0: {
      question:
        "Compare your report's totals against a manual calculation on paper. Do the numbers match to the penny? Are groups with zero entries handled properly? What order do the rows appear in?",
      inspectionPoints: [
        "How are you accumulating totals by group? (e.g. an accumulator dictionary mapping group name to sum)",
        "Does running a report modify the order or contents of the underlying records?",
        "How are you sorting the summary? (sorted(dict.items(), key=lambda x: x[1], reverse=True))",
      ],
    },
    l1: {
      resources: [
        {
          title: "Aggregation 01 — Accumulating Values by Group",
          kind: "knowledge-pack",
          refId: "aggregation-01",
          packSlug: "aggregation-01-accumulating-values-by-group",
          description: "Using accumulator dictionaries to group and sum values in a single pass.",
        },
        {
          title: "Ordering 01 — Sorting and Selecting Top Results",
          kind: "knowledge-pack",
          refId: "ordering-01",
          packSlug: "ordering-01-sorting-and-selecting-top-results",
          description: "Sorting dictionary items by custom keys using sorted() and lambda.",
        },
        {
          title: "Starting Manual: Section 06 — Working with Collections",
          kind: "manual",
          refId: "manual-06",
          manualSlug: "06-working-with-collections",
          description: "The accumulator loop pattern and dictionary lookup techniques.",
        },
      ],
    },
    l2: {
      directionalHint:
        "Use the accumulator pattern: initialize an empty dictionary, iterate through records, and add each value to the corresponding key (using dict.get(key, 0.0) + amount). To display rankings, sort the dictionary's items by value in descending order.",
    },
    l3: {
      structuralHint:
        "Group entries into an aggregation dictionary in a single pass. For each record, retrieve the group tag and accumulate the amount. Once all records are processed, convert the dictionary to a list of pairs (tag, total) and use sorted() with a key function to order them descending. Compute grand totals by summing the accumulated values.",
      dataFlowDescription:
        "Records list -> loop -> accumulation dictionary -> sorted items list -> formatted summary table.",
    },
    l4: {
      protocolSteps: [
        "In an isolated test, run your accumulation logic on a list with three items in two groups.",
        "Assert the dictionary contains exactly the expected sums.",
        "Test with an empty list: confirm the report displays 'No records found' rather than crashing.",
        "Verify that the original records list has the same length and order before and after generating the report.",
      ],
    },
    l5: {
      unrelatedDomain: "Wildlife Reserve Bird Sighting Counts",
      context:
        "Aggregating animal sightings by habitat sector and sorting by most observed.",
      codeExample: `sightings = [
    {"species": "Falcon", "zone": "North Ridge", "count": 2},
    {"species": "Sparrow", "zone": "Wetlands", "count": 14},
    {"species": "Hawk", "zone": "North Ridge", "count": 3}
]
totals = {}
for s in sightings:
    totals[s["zone"]] = totals.get(s["zone"], 0) + s["count"]

ranked = sorted(totals.items(), key=lambda item: item[1], reverse=True)
for zone, total in ranked:
    print(f"{zone:<15}: {total} sightings")`,
      explanation:
        "Accumulating into a dictionary and sorting items by value provides clean grouped reporting.",
    },
  },

  "phase-09": {
    phaseSlug: "phase-09",
    phaseNumber: 9,
    focus: "CSV interoperability, special character escaping, and modular refactoring",
    l0: {
      question:
        "Open your exported CSV file in a spreadsheet program or inspect it in your editor. What happens if a note or description contains a comma like 'apples, oranges'? Does it break into extra columns?",
      inspectionPoints: [
        "Are you manually formatting strings with commas, or using Python's standard csv module?",
        "Does your CSV export replace or overwrite your JSON persistence? (Storage and export must remain completely separate!)",
        "When refactoring functions into modules, can your program still run end-to-end?",
      ],
    },
    l1: {
      resources: [
        {
          title: "Interoperability 01 — Writing Data to CSV",
          kind: "knowledge-pack",
          refId: "interoperability-01",
          packSlug: "interoperability-01-writing-data-to-csv",
          description: "Using Python's standard csv module to write clean, escaped spreadsheet-compatible files.",
        },
        {
          title: "Architecture 01 — Refactoring a Growing Program",
          kind: "knowledge-pack",
          refId: "architecture-01",
          packSlug: "architecture-01-refactoring-a-growing-program",
          description: "Extracting cohesive functions and organizing code into modules without breaking behavior.",
        },
        {
          title: "Starting Manual: Section 10 — Modules, Packages, and Documentation",
          kind: "manual",
          refId: "manual-10",
          manualSlug: "10-modules-packages-documentation",
          description: "Importing helper functions across Python script files.",
        },
      ],
    },
    l2: {
      directionalHint:
        "Never build CSV rows with manual string concatenation because commas and quotation marks inside data will corrupt columns. Use Python's standard csv.writer or csv.DictWriter with newline=''. Refactor incrementally: extract one cohesive group of functions at a time and test after each change.",
    },
    l3: {
      structuralHint:
        "Keep CSV export strictly as an output adapter. Read your existing in-memory records and write them using csv.writer(f). For refactoring, separate your code into logical areas of responsibility: data storage/persistence, user prompts/validation, and calculation/reporting. If splitting into multiple files, maintain clean imports and a single clear entry point.",
      dataFlowDescription:
        "In-memory records -> csv.writer -> formatted CSV rows on disk (JSON persistence untouched).",
    },
    l4: {
      protocolSteps: [
        "Create a test record containing a comma: {'notes': 'apples, oranges', 'value': 10}.",
        "Export it using csv.writer and open the CSV in a text editor to verify quotes: '\"apples, oranges\",10'.",
        "Run a full regression test of your application: create, persist, filter, and summarize records.",
        "Verify that your JSON file remains intact and independent of your CSV file.",
      ],
    },
    l5: {
      unrelatedDomain: "Laboratory Experiment Measurements",
      context:
        "Exporting scientific sensor samples with notes containing commas to a standard CSV file.",
      codeExample: `import csv

samples = [
    {"id": "S101", "voltage": 3.42, "notes": "normal baseline"},
    {"id": "S102", "voltage": 3.88, "notes": "spike observed, re-checked"}
]
with open("sensor_export.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Sample ID", "Voltage", "Observations"])
    for s in samples:
        writer.writerow([s["id"], s["voltage"], s["notes"]])`,
      explanation:
        "The csv module automatically wraps values containing commas in quotes so spreadsheets parse columns accurately.",
    },
  },
};

export function getHelpPathwayForPhase(phaseSlug: string): PhaseHelpPathway | undefined {
  const normalized = phaseSlug.startsWith("phase-")
    ? phaseSlug
    : `phase-${phaseSlug.padStart(2, "0")}`;
  return PHASE_HELP_PATHWAYS[normalized];
}

export interface HelpAccessContext {
  viewedL0L1?: boolean;
  currentDraft?: ProblemJournalEntry;
  l4Viewed?: boolean;
}

export interface HelpAccessResult {
  allowed: boolean;
  reason?: string;
}

export function canAccessHelpLevel(
  targetLevel: 0 | 1 | 2 | 3 | 4 | 5,
  context: HelpAccessContext
): HelpAccessResult {
  if (targetLevel === 0 || targetLevel === 1) {
    return { allowed: true };
  }

  if (targetLevel === 2) {
    if (!context.viewedL0L1) {
      return {
        allowed: false,
        reason: "Review L0 Think / Inspect and relevant resources before requesting a directional hint.",
      };
    }
    return { allowed: true };
  }

  const hasExpectation = Boolean(context.currentDraft?.expectation?.trim());
  const hasObservation = Boolean(context.currentDraft?.observation?.trim());

  if (targetLevel === 3) {
    if (!hasExpectation || !hasObservation) {
      return {
        allowed: false,
        reason: "Requires stating your Expectation and Observation in the Problem Journal first.",
      };
    }
    return { allowed: true };
  }

  const hasEvidence = Boolean(context.currentDraft?.evidence?.trim());

  if (targetLevel === 4) {
    if (!hasExpectation || !hasObservation) {
      return {
        allowed: false,
        reason: "Requires stating your Expectation and Observation in the Problem Journal first.",
      };
    }
    if (!hasEvidence) {
      return {
        allowed: false,
        reason: "Requires recording investigation evidence in your Problem Journal draft.",
      };
    }
    return { allowed: true };
  }

  if (targetLevel === 5) {
    if (!hasExpectation || !hasObservation || !hasEvidence) {
      return {
        allowed: false,
        reason: "Requires an active Problem Journal draft with Expectation, Observation, and Evidence.",
      };
    }
    if (!context.l4Viewed) {
      return {
        allowed: false,
        reason: "Requires working through L4 Guided Diagnosis before viewing an unrelated example.",
      };
    }
    return { allowed: true };
  }

  return { allowed: false, reason: "Invalid help level." };
}
