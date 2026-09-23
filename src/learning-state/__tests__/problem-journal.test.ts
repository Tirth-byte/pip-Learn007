import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  getProblemJournalSnapshot,
  getJournalDraftForPhase,
  saveOrUpdateDraft,
  completeJournalEntry,
  deleteJournalEntry,
  recordHelpLevelForJournal,
  __resetProblemJournalForTests,
} from "../problem-journal";

describe("Problem Journal State Engine", () => {
  beforeEach(() => {
    __resetProblemJournalForTests();
  });

  it("should start with empty entries list", () => {
    const entries = getProblemJournalSnapshot();
    assert.deepEqual(entries, []);
  });

  it("should create a new draft entry with locked fields", () => {
    const draft = saveOrUpdateDraft("terminal-ledger", "phase-03", {
      expectation: "Expected data file to be created on program exit",
      observation: "Program crashed with FileNotFoundError on line 12",
    });

    assert.ok(draft.id.startsWith("journal-"));
    assert.equal(draft.project, "terminal-ledger");
    assert.equal(draft.phase, "phase-03");
    assert.equal(draft.status, "draft");
    assert.equal(draft.expectation, "Expected data file to be created on program exit");
    assert.equal(draft.observation, "Program crashed with FileNotFoundError on line 12");
    assert.equal(draft.cause, "");
    assert.equal(draft.evidence, "");
    assert.equal(draft.fix, "");
    assert.equal(draft.lesson, "");

    const queried = getJournalDraftForPhase("terminal-ledger", "phase-03");
    assert.ok(queried);
    assert.equal(queried?.id, draft.id);
  });

  it("should update an existing draft for the same project and phase without creating duplicate", () => {
    const first = saveOrUpdateDraft("terminal-ledger", "phase-04", {
      expectation: "Convert input string to float",
      observation: "ValueError: could not convert string to float: 'abc'",
    });

    const second = saveOrUpdateDraft("terminal-ledger", "phase-04", {
      cause: "Raw input was passed directly into float() without validation",
      evidence: "Printed type(input_val) before conversion",
    });

    assert.equal(second.id, first.id);
    assert.equal(second.expectation, "Convert input string to float");
    assert.equal(second.observation, "ValueError: could not convert string to float: 'abc'");
    assert.equal(second.cause, "Raw input was passed directly into float() without validation");
    assert.equal(second.evidence, "Printed type(input_val) before conversion");

    const all = getProblemJournalSnapshot();
    assert.equal(all.length, 1);
  });

  it("should complete a journal entry with all required fields", () => {
    const draft = saveOrUpdateDraft("terminal-ledger", "phase-02", {
      expectation: "Align columns cleanly in terminal",
      observation: "Columns were staggered because of varying string lengths",
    });

    const completed = completeJournalEntry(draft.id, {
      cause: "Manual tab characters don't account for text length",
      evidence: "Tested with titles of length 4, 12, and 28 characters",
      fix: "Used f-string alignment specifiers :<20 and :>6",
      lesson: "Always use format specifiers for tabular terminal output",
    });

    assert.ok(completed);
    assert.equal(completed?.status, "completed");
    assert.equal(completed?.fix, "Used f-string alignment specifiers :<20 and :>6");

    // Draft query for this phase should now return undefined because status is "completed"
    const activeDraft = getJournalDraftForPhase("terminal-ledger", "phase-02");
    assert.equal(activeDraft, undefined);

    const snapshot = getProblemJournalSnapshot();
    assert.equal(snapshot.length, 1);
    assert.equal(snapshot[0].status, "completed");
  });

  it("should record the highest help level on an active draft", () => {
    saveOrUpdateDraft("terminal-ledger", "phase-05", {
      expectation: "Filter tags case-insensitively",
      observation: "'Food' and 'food' treated as separate categories",
    });

    recordHelpLevelForJournal("terminal-ledger", "phase-05", 2);
    let draft = getJournalDraftForPhase("terminal-ledger", "phase-05");
    assert.equal(draft?.highestHelpLevel, 2);

    recordHelpLevelForJournal("terminal-ledger", "phase-05", 4);
    draft = getJournalDraftForPhase("terminal-ledger", "phase-05");
    assert.equal(draft?.highestHelpLevel, 4);

    // Lower level should not overwrite higher level
    recordHelpLevelForJournal("terminal-ledger", "phase-05", 1);
    draft = getJournalDraftForPhase("terminal-ledger", "phase-05");
    assert.equal(draft?.highestHelpLevel, 4);
  });

  it("should delete an entry by id", () => {
    const entry = saveOrUpdateDraft("terminal-ledger", "phase-01", {
      expectation: "Clean exit",
      observation: "Infinite loop",
    });

    assert.equal(getProblemJournalSnapshot().length, 1);
    const deleted = deleteJournalEntry(entry.id);
    assert.equal(deleted, true);
    assert.equal(getProblemJournalSnapshot().length, 0);
  });
});
