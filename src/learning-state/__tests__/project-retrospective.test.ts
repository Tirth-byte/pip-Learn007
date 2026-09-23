import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  getRetrospectiveSnapshot,
  saveRetrospectiveDraft,
  completeRetrospective,
  resetRetrospective,
} from "../project-retrospective";
import {
  startTerminalLedgerProject,
  completePhase,
  clearCheckpoint,
  resetTerminalLedgerProgress,
  getTerminalLedgerProgressSnapshot,
} from "../terminal-ledger-progress";

describe("Project Retrospective State & Completion Gate", () => {
  beforeEach(() => {
    resetRetrospective();
    resetTerminalLedgerProgress();
  });

  it("initializes with uncompleted retrospective record", () => {
    const initial = getRetrospectiveSnapshot();
    assert.equal(initial.isCompleted, false);
    assert.equal(initial.project, "terminal-ledger");
    assert.equal(initial.responses.easierByEnd, "");
    assert.equal(initial.responses.instructiveBug, "");
  });

  it("saves and updates draft responses", () => {
    const updated = saveRetrospectiveDraft({
      easierByEnd: "Handling input validation became intuitive.",
    });

    assert.equal(updated.responses.easierByEnd, "Handling input validation became intuitive.");
    assert.equal(updated.isCompleted, false);

    const reloaded = getRetrospectiveSnapshot();
    assert.equal(reloaded.responses.easierByEnd, "Handling input validation became intuitive.");
  });

  it("strictly rejects completion if any reflection prompt is missing", () => {
    assert.throws(() => {
      completeRetrospective({
        easierByEnd: "Some reflection",
        instructiveBug: "",
        debuggingHabit: "Some habit",
        structuralChange: "Some architecture",
        newCapabilities: "Some capability",
      });
    }, /Missing: 'instructiveBug'/);
  });

  it("strictly rejects completion if 9 phases are not yet complete", () => {
    startTerminalLedgerProject();
    completePhase("phase-01");

    assert.throws(() => {
      completeRetrospective({
        easierByEnd: "Answer 1",
        instructiveBug: "Answer 2",
        debuggingHabit: "Answer 3",
        structuralChange: "Answer 4",
        newCapabilities: "Answer 5",
      });
    }, /Cannot complete retrospective before finishing all 9 phases/);
  });

  it("strictly rejects completion if all 3 checkpoints are not yet cleared", () => {
    startTerminalLedgerProject();
    completePhase("phase-01");
    completePhase("phase-02");
    completePhase("phase-03");
    clearCheckpoint(1);
    completePhase("phase-04");
    completePhase("phase-05");
    completePhase("phase-06");
    clearCheckpoint(2);
    completePhase("phase-07");
    completePhase("phase-08");
    completePhase("phase-09");
    // Checkpoint 3 NOT cleared yet

    assert.throws(() => {
      completeRetrospective({
        easierByEnd: "Answer 1",
        instructiveBug: "Answer 2",
        debuggingHabit: "Answer 3",
        structuralChange: "Answer 4",
        newCapabilities: "Answer 5",
      });
    }, /Cannot complete retrospective before clearing all 3 mentor checkpoints/);
  });

  it("completing retrospective when prerequisites are met triggers project completion", () => {
    startTerminalLedgerProject();
    completePhase("phase-01");
    completePhase("phase-02");
    completePhase("phase-03");
    clearCheckpoint(1);
    completePhase("phase-04");
    completePhase("phase-05");
    completePhase("phase-06");
    clearCheckpoint(2);
    completePhase("phase-07");
    completePhase("phase-08");
    completePhase("phase-09");
    clearCheckpoint(3);

    const retro = completeRetrospective({
      easierByEnd: "Navigating dictionary records became second nature.",
      instructiveBug: "The empty file trap taught me defensive loading.",
      debuggingHabit: "I will always print types and values before guessing.",
      structuralChange: "I would separate presentation from data calculation earlier.",
      newCapabilities: "I can build and persist command-line applications from scratch.",
    });

    assert.equal(retro.isCompleted, true);
    assert.ok(retro.completedAt);

    // Terminal Ledger progress engine is now formally completed
    const progress = getTerminalLedgerProgressSnapshot();
    assert.equal(progress.status, "completed");
    assert.ok(progress.completedAt);
  });
});
