import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  LOCKED_MENTORS,
  MentorId,
  CHECKPOINT_CURRICULUM_INFO,
  getCheckpointRecordsSnapshot,
  saveCheckpointPlan,
  recordCheckpointOutcome,
  resetCheckpointRecords,
} from "../mentor-checkpoints";
import {
  startTerminalLedgerProject,
  completePhase,
  resetTerminalLedgerProgress,
  getTerminalLedgerProgressSnapshot,
  deriveActiveBlocker,
} from "../terminal-ledger-progress";

describe("Mentor Checkpoints State & Gating", () => {
  beforeEach(() => {
    resetCheckpointRecords();
    resetTerminalLedgerProgress();
  });

  it("strictly enforces exactly three locked mentors: Tirth, Darsh, Raj", () => {
    assert.deepEqual(LOCKED_MENTORS, ["Tirth", "Darsh", "Raj"]);
    assert.equal(LOCKED_MENTORS.length, 3);
  });

  it("defines exactly three checkpoints aligned to Phases 3, 6, and 9", () => {
    assert.equal(CHECKPOINT_CURRICULUM_INFO[1].afterPhase, 3);
    assert.equal(CHECKPOINT_CURRICULUM_INFO[2].afterPhase, 6);
    assert.equal(CHECKPOINT_CURRICULUM_INFO[3].afterPhase, 9);
    assert.deepEqual(CHECKPOINT_CURRICULUM_INFO[1].coveredPhases, ["phase-01", "phase-02", "phase-03"]);
    assert.deepEqual(CHECKPOINT_CURRICULUM_INFO[2].coveredPhases, ["phase-04", "phase-05", "phase-06"]);
    assert.deepEqual(CHECKPOINT_CURRICULUM_INFO[3].coveredPhases, ["phase-07", "phase-08", "phase-09"]);
  });

  it("Checkpoint 1 becomes due after completing Phase 3 and progression pauses", () => {
    startTerminalLedgerProject();
    completePhase("phase-01");
    completePhase("phase-02");
    const p3 = completePhase("phase-03");

    // Progression stays on Phase 3
    assert.equal(p3.currentPhaseSlug, "phase-03");
    const blocker = deriveActiveBlocker(p3);
    assert.ok(blocker);
    assert.equal(blocker.type, "CHECKPOINT_REQUIRED");
    assert.equal(blocker.checkpointNumber, 1);

    // Checkpoint records snapshot reflects due status
    const cpRecords = getCheckpointRecordsSnapshot();
    assert.equal(cpRecords[1].status, "due");
  });

  it("saves and updates a truthful local scheduling plan", () => {
    const planned = saveCheckpointPlan({
      checkpointNumber: 1,
      mentor: "Tirth",
      scheduledDate: "2026-10-15",
      scheduledTime: "14:00",
      preparationNotes: "Ask about in-memory dictionary synchronization",
    });

    assert.equal(planned.status, "scheduled");
    assert.equal(planned.mentor, "Tirth");
    assert.equal(planned.scheduledDate, "2026-10-15");
    assert.equal(planned.scheduledTime, "14:00");
    assert.equal(planned.preparationNotes, "Ask about in-memory dictionary synchronization");

    // Edit plan
    const updated = saveCheckpointPlan({
      checkpointNumber: 1,
      mentor: "Darsh",
      scheduledDate: "2026-10-16",
      scheduledTime: "15:30",
    });

    assert.equal(updated.mentor, "Darsh");
    assert.equal(updated.scheduledDate, "2026-10-16");
    assert.equal(updated.scheduledTime, "15:30");
  });

  it("rejects invalid mentors or missing date/time", () => {
    assert.throws(() => {
      saveCheckpointPlan({
        checkpointNumber: 1,
        mentor: "UnknownPerson" as unknown as MentorId,
        scheduledDate: "2026-10-15",
        scheduledTime: "14:00",
      });
    }, /Invalid mentor/);

    assert.throws(() => {
      saveCheckpointPlan({
        checkpointNumber: 1,
        mentor: "Raj",
        scheduledDate: "",
        scheduledTime: "14:00",
      });
    }, /A preferred date is required/);

    assert.throws(() => {
      saveCheckpointPlan({
        checkpointNumber: 1,
        mentor: "Raj",
        scheduledDate: "2026-10-15",
        scheduledTime: "",
      });
    }, /A preferred time is required/);
  });

  it("recording session outcome marks checkpoint completed and unblocks Phase 4", () => {
    startTerminalLedgerProject();
    completePhase("phase-01");
    completePhase("phase-02");
    completePhase("phase-03");

    const completed = recordCheckpointOutcome({
      checkpointNumber: 1,
      mentor: "Tirth",
      mentorNotes: "Reviewed startup loading sequence; verified graceful first-run handling.",
      carryForwardNotes: "Always handle empty files defensively.",
    });

    assert.equal(completed.status, "completed");
    assert.equal(completed.mentor, "Tirth");
    assert.ok(completed.completedAt);
    assert.equal(completed.mentorNotes, "Reviewed startup loading sequence; verified graceful first-run handling.");

    // Progress engine should now have cleared checkpoint 1 and unlocked Phase 4
    const progress = getTerminalLedgerProgressSnapshot();
    assert.deepEqual(progress.clearedCheckpoints, [1]);
    assert.equal(progress.currentPhaseSlug, "phase-04");
    assert.equal(deriveActiveBlocker(progress), null);
  });

  it("TRUTH AUDIT: Checkpoint curriculum info must not claim false verification or external calendar sync", () => {
    const FORBIDDEN_CLAIMS = [
      /confirmed booking/i,
      /mentor confirmed/i,
      /verified attendance/i,
      /calendar invite sent/i,
      /email sent/i,
      /session booked/i,
      /verified by piplearn/i,
    ];

    for (const info of Object.values(CHECKPOINT_CURRICULUM_INFO)) {
      const combined = `${info.title} ${info.stage} ${info.focus} ${info.whyHere} ${info.discussionTopics.join(" ")} ${info.evidenceRequired.join(" ")}`;
      for (const pattern of FORBIDDEN_CLAIMS) {
        const match = combined.match(pattern);
        assert.equal(match, null, `Found misleading claim '${match?.[0]}' in Checkpoint ${info.checkpointNumber}`);
      }
    }
  });

  it("LEARNER OWNERSHIP AUDIT: Checkpoint discussion topics must not prescribe exact code solutions", () => {
    const PRESCRIPTIVE_TERMS = [
      /def add_transaction/i,
      /def save_ledger/i,
      /transactions\.json/i,
      /columns = /i,
    ];

    for (const info of Object.values(CHECKPOINT_CURRICULUM_INFO)) {
      const combined = `${info.discussionTopics.join(" ")} ${info.evidenceRequired.join(" ")}`;
      for (const pattern of PRESCRIPTIVE_TERMS) {
        const match = combined.match(pattern);
        assert.equal(match, null, `Prescriptive term '${match?.[0]}' found in Checkpoint ${info.checkpointNumber}`);
      }
    }
  });
});
