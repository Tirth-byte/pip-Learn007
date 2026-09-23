import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  getTerminalLedgerProgressSnapshot,
  startTerminalLedgerProject,
  completePhase,
  clearCheckpoint,
  completeTerminalLedgerProject,
  setCurrentPhase,
  resetTerminalLedgerProgress,
  deriveActiveBlocker,
} from "../terminal-ledger-progress";

describe("Terminal Ledger Progress State Integration", () => {
  beforeEach(() => {
    resetTerminalLedgerProgress();
  });

  it("initializes with unstarted status and 0 completed phases", () => {
    const initial = getTerminalLedgerProgressSnapshot();
    assert.equal(initial.status, "not_started");
    assert.equal(initial.currentPhaseSlug, "phase-01");
    assert.deepEqual(initial.completedPhases, []);
    assert.deepEqual(initial.clearedCheckpoints, []);
    assert.equal(deriveActiveBlocker(initial), null);
  });

  it("startTerminalLedgerProject transitions status to in_progress", () => {
    const started = startTerminalLedgerProject();
    assert.equal(started.status, "in_progress");
    assert.equal(started.currentPhaseSlug, "phase-01");
    assert.ok(started.startedAt);
  });

  it("completing Phase 1 advances current phase to Phase 2", () => {
    startTerminalLedgerProject();
    const afterP1 = completePhase("phase-01");
    assert.equal(afterP1.completedPhases.length, 1);
    assert.ok(afterP1.completedPhases.includes("phase-01"));
    assert.equal(afterP1.currentPhaseSlug, "phase-02");
    assert.equal(deriveActiveBlocker(afterP1), null);
  });

  it("completing Phase 2 advances to Phase 3", () => {
    startTerminalLedgerProject();
    completePhase("phase-01");
    const afterP2 = completePhase("phase-02");
    assert.equal(afterP2.completedPhases.length, 2);
    assert.equal(afterP2.currentPhaseSlug, "phase-03");
    assert.equal(deriveActiveBlocker(afterP2), null);
  });

  it("completing Phase 3 triggers Checkpoint 1 due gate and blocks automatic advance to Phase 4", () => {
    startTerminalLedgerProject();
    completePhase("phase-01");
    completePhase("phase-02");
    const afterP3 = completePhase("phase-03");

    assert.equal(afterP3.completedPhases.length, 3);
    assert.equal(afterP3.currentPhaseSlug, "phase-03"); // Stays on phase-03 until checkpoint cleared
    const blocker = deriveActiveBlocker(afterP3);
    assert.ok(blocker);
    assert.equal(blocker.type, "CHECKPOINT_REQUIRED");
    assert.equal(blocker.checkpointNumber, 1);
    assert.equal(blocker.phaseNumber, 3);
  });

  it("clearing Checkpoint 1 unblocks progress and advances to Phase 4", () => {
    startTerminalLedgerProject();
    completePhase("phase-01");
    completePhase("phase-02");
    completePhase("phase-03");

    const afterCP1 = clearCheckpoint(1);
    assert.deepEqual(afterCP1.clearedCheckpoints, [1]);
    assert.equal(afterCP1.currentPhaseSlug, "phase-04");
    assert.equal(deriveActiveBlocker(afterCP1), null);
  });

  it("advances through Phases 4 and 5 smoothly", () => {
    startTerminalLedgerProject();
    completePhase("phase-01");
    completePhase("phase-02");
    completePhase("phase-03");
    clearCheckpoint(1);

    const afterP4 = completePhase("phase-04");
    assert.equal(afterP4.currentPhaseSlug, "phase-05");

    const afterP5 = completePhase("phase-05");
    assert.equal(afterP5.currentPhaseSlug, "phase-06");
    assert.equal(deriveActiveBlocker(afterP5), null);
  });

  it("completing Phase 6 triggers Checkpoint 2 due gate and blocks advance to Phase 7", () => {
    startTerminalLedgerProject();
    completePhase("phase-01");
    completePhase("phase-02");
    completePhase("phase-03");
    clearCheckpoint(1);
    completePhase("phase-04");
    completePhase("phase-05");
    const afterP6 = completePhase("phase-06");

    assert.equal(afterP6.currentPhaseSlug, "phase-06");
    const blocker = deriveActiveBlocker(afterP6);
    assert.ok(blocker);
    assert.equal(blocker.checkpointNumber, 2);
    assert.equal(blocker.phaseNumber, 6);

    const afterCP2 = clearCheckpoint(2);
    assert.equal(afterCP2.currentPhaseSlug, "phase-07");
    assert.equal(deriveActiveBlocker(afterCP2), null);
  });

  it("completing Phase 7 and Phase 8 advances to Phase 9 without intermediate checkpoints", () => {
    startTerminalLedgerProject();
    completePhase("phase-01");
    completePhase("phase-02");
    completePhase("phase-03");
    clearCheckpoint(1);
    completePhase("phase-04");
    completePhase("phase-05");
    completePhase("phase-06");
    clearCheckpoint(2);

    const afterP7 = completePhase("phase-07");
    assert.equal(afterP7.currentPhaseSlug, "phase-08");
    assert.equal(deriveActiveBlocker(afterP7), null);

    const afterP8 = completePhase("phase-08");
    assert.equal(afterP8.currentPhaseSlug, "phase-09");
    assert.equal(deriveActiveBlocker(afterP8), null);
  });

  it("completing Phase 9 triggers Checkpoint 3; CP3 clearance unblocks but requires retrospective for full completion", () => {
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
    const afterP9 = completePhase("phase-09");

    assert.equal(afterP9.completedPhases.length, 9);
    assert.equal(afterP9.currentPhaseSlug, "phase-09");
    assert.equal(afterP9.status, "in_progress"); // Phase 9 alone does NOT complete project
    const blocker = deriveActiveBlocker(afterP9);
    assert.ok(blocker);
    assert.equal(blocker.checkpointNumber, 3);

    const afterCP3 = clearCheckpoint(3);
    assert.deepEqual(afterCP3.clearedCheckpoints, [1, 2, 3]);
    assert.equal(afterCP3.status, "in_progress"); // Checkpoint 3 alone without retrospective does NOT complete project
    assert.equal(deriveActiveBlocker(afterCP3), null);

    // Explicit completion gate requires all 9 phases + 3 checkpoints + retrospective
    const completed = completeTerminalLedgerProject();
    assert.equal(completed.status, "completed");
    assert.ok(completed.completedAt);
  });

  it("completeTerminalLedgerProject strictly rejects premature completion", () => {
    startTerminalLedgerProject();
    completePhase("phase-01");

    assert.throws(() => {
      completeTerminalLedgerProject();
    }, /Cannot complete project before finishing all 9 phases/);
  });

  it("setCurrentPhase updates the active phase view safely", () => {
    startTerminalLedgerProject();
    const updated = setCurrentPhase("phase-05");
    assert.equal(updated.currentPhaseSlug, "phase-05");
  });

  it("strictly enforces that Checkpoint 1 pauses progression at Phase 3 and does not advance to Phase 4", () => {
    startTerminalLedgerProject();
    completePhase("phase-01");
    completePhase("phase-02");
    const p3Result = completePhase("phase-03");

    // Must NOT advance to Phase 4
    assert.equal(p3Result.currentPhaseSlug, "phase-03");
    assert.equal(p3Result.completedPhases.includes("phase-03"), true);
    assert.equal(p3Result.completedPhases.includes("phase-04"), false);

    const blocker = deriveActiveBlocker(p3Result);
    assert.ok(blocker);
    assert.equal(blocker.type, "CHECKPOINT_REQUIRED");
    assert.equal(blocker.checkpointNumber, 1);
    assert.equal(blocker.phaseNumber, 3);
  });

  it("QA STATE MATRIX: deriveActiveBlocker returns null when project is completed", () => {
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
    const completed = completeTerminalLedgerProject();

    assert.equal(completed.status, "completed");
    assert.equal(deriveActiveBlocker(completed), null);
  });
});

