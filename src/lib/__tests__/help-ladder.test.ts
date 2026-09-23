import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  PHASE_HELP_PATHWAYS,
  getHelpPathwayForPhase,
  canAccessHelpLevel,
} from "../projects/terminal-ledger/help-ladder";
import {
  TERMINAL_LEDGER_PHASES,
  getPhaseBySlug,
} from "../projects/terminal-ledger/structure";
import { ProblemJournalEntry } from "@/learning-state/problem-journal";

describe("Help Ladder Architecture & Gating Logic", () => {
  it("should have complete help pathways defined for all 9 Terminal Ledger phases", () => {
    for (let i = 1; i <= 9; i++) {
      const slug = `phase-${String(i).padStart(2, "0")}`;
      const pathway = getHelpPathwayForPhase(slug);
      assert.ok(pathway, `Phase pathway for ${slug} must be defined`);
      assert.equal(pathway.phaseNumber, i);

      // Verify all 6 levels (L0 to L5) exist
      assert.ok(pathway.l0.question, `Phase ${slug} L0 question must exist`);
      assert.ok(pathway.l0.inspectionPoints.length >= 2, `Phase ${slug} L0 must have inspection points`);
      assert.ok(pathway.l1.resources.length >= 1, `Phase ${slug} L1 must have at least one resource`);
      assert.ok(pathway.l2.directionalHint, `Phase ${slug} L2 hint must exist`);
      assert.ok(pathway.l3.structuralHint, `Phase ${slug} L3 hint must exist`);
      assert.ok(pathway.l3.dataFlowDescription, `Phase ${slug} L3 data flow must exist`);
      assert.ok(pathway.l4.protocolSteps.length >= 3, `Phase ${slug} L4 protocol must have steps`);
      assert.ok(pathway.l5.unrelatedDomain, `Phase ${slug} L5 must specify an unrelated domain`);
      assert.ok(pathway.l5.codeExample, `Phase ${slug} L5 must contain code`);
      assert.ok(pathway.l5.explanation, `Phase ${slug} L5 must have explanation`);
    }
  });

  it("should enforce sequential access and evidence gates (L0 -> L5)", () => {
    // L0 and L1: always allowed with zero friction
    assert.equal(canAccessHelpLevel(0, {}).allowed, true);
    assert.equal(canAccessHelpLevel(1, {}).allowed, true);

    // L2: requires viewedL0L1
    assert.equal(canAccessHelpLevel(2, { viewedL0L1: false }).allowed, false);
    assert.equal(canAccessHelpLevel(2, { viewedL0L1: true }).allowed, true);

    // L3: requires Expectation + Observation
    assert.equal(canAccessHelpLevel(3, { viewedL0L1: true }).allowed, false);
    assert.equal(
      canAccessHelpLevel(3, {
        viewedL0L1: true,
        currentDraft: { expectation: "Some expectation" } as ProblemJournalEntry,
      }).allowed,
      false
    );
    assert.equal(
      canAccessHelpLevel(3, {
        viewedL0L1: true,
        currentDraft: {
          expectation: "Some expectation",
          observation: "Some observation",
        } as ProblemJournalEntry,
      }).allowed,
      true
    );

    // L4: requires Expectation + Observation + Evidence
    assert.equal(
      canAccessHelpLevel(4, {
        viewedL0L1: true,
        currentDraft: {
          expectation: "Some expectation",
          observation: "Some observation",
        } as ProblemJournalEntry,
      }).allowed,
      false
    );
    assert.equal(
      canAccessHelpLevel(4, {
        viewedL0L1: true,
        currentDraft: {
          expectation: "Some expectation",
          observation: "Some observation",
          evidence: "Printed type and inspected traceback",
        } as ProblemJournalEntry,
      }).allowed,
      true
    );

    // L5: requires Expectation + Observation + Evidence + L4 viewed
    assert.equal(
      canAccessHelpLevel(5, {
        viewedL0L1: true,
        l4Viewed: false,
        currentDraft: {
          expectation: "Some expectation",
          observation: "Some observation",
          evidence: "Printed type and inspected traceback",
        } as ProblemJournalEntry,
      }).allowed,
      false
    );
    assert.equal(
      canAccessHelpLevel(5, {
        viewedL0L1: true,
        l4Viewed: true,
        currentDraft: {
          expectation: "Some expectation",
          observation: "Some observation",
          evidence: "Printed type and inspected traceback",
        } as ProblemJournalEntry,
      }).allowed,
      true
    );
  });

  it("CONTENT SAFETY AUDIT: L5 code and context must NEVER leak Terminal Ledger domain terms", () => {
    const FORBIDDEN_L5_TERMS = [
      /\btransaction\b/i,
      /\btransactions\b/i,
      /\bexpense\b/i,
      /\bexpenses\b/i,
      /\bbudget\b/i,
      /\bbudgets\b/i,
      /\bfinance\b/i,
      /\bfinances\b/i,
      /\bledger\b/i,
      /\bledgers\b/i,
      /\bmonthly\s+report\b/i,
      /\bcategory\b/i,
      /\bcategories\b/i,
    ];

    for (const [phaseKey, pathway] of Object.entries(PHASE_HELP_PATHWAYS)) {
      const l5Text = `${pathway.l5.unrelatedDomain} ${pathway.l5.context} ${pathway.l5.codeExample} ${pathway.l5.explanation}`;

      for (const pattern of FORBIDDEN_L5_TERMS) {
        const match = l5Text.match(pattern);
        assert.equal(
          match,
          null,
          `Phase ${phaseKey} L5 violates content safety by containing forbidden term '${match?.[0]}'`
        );
      }
    }
  });

  it("CONTENT SAFETY AUDIT: L2-L4 must NOT contain copy-paste project solutions or fixed schema names", () => {
    const FORBIDDEN_CODE_PATTERNS = [
      /def\s+add_transaction/i,
      /def\s+record_transaction/i,
      /def\s+save_ledger/i,
      /transactions\.json/i,
      /ledger\.json/i,
      /data\.json/i,
    ];

    for (const [phaseKey, pathway] of Object.entries(PHASE_HELP_PATHWAYS)) {
      const guidanceText = `${pathway.l2.directionalHint} ${pathway.l3.structuralHint} ${pathway.l4.protocolSteps.join(" ")}`;

      for (const pattern of FORBIDDEN_CODE_PATTERNS) {
        const match = guidanceText.match(pattern);
        assert.equal(
          match,
          null,
          `Phase ${phaseKey} L2-L4 violates content safety with prescriptive code pattern '${match?.[0]}'`
        );
      }
    }
  });

  it("should resolve all L1 resources to valid Knowledge Packs or Starting Manual sections", () => {
    for (const [phaseKey, pathway] of Object.entries(PHASE_HELP_PATHWAYS)) {
      for (const res of pathway.l1.resources) {
        if (res.kind === "knowledge-pack" && res.packSlug) {
          // Verify that this pack exists across the project structure
          const phase = getPhaseBySlug(phaseKey);
          assert.ok(phase, `Phase ${phaseKey} must exist`);
          // Check that the pack slug exists in the project definition
          const packExists = TERMINAL_LEDGER_PHASES.some((p) =>
            p.standalonePacks.some(
              (pk) => pk.slug === res.packSlug || pk.id === res.refId
            )
          );
          assert.ok(
            packExists,
            `Knowledge pack ${res.packSlug} in ${phaseKey} L1 must exist in TERMINAL_LEDGER_PHASES`
          );
        } else if (res.kind === "manual" && res.manualSlug) {
          assert.ok(
            res.manualSlug.length > 0,
            `Manual slug in ${phaseKey} L1 must be defined`
          );
        }
      }
    }
  });

  it("CONTENT SAFETY AUDIT: Phase 1 Help Ladder must remain ZERO-NEW-PYTHON", () => {
    const p1 = PHASE_HELP_PATHWAYS["phase-01"];
    assert.ok(p1, "Phase 1 pathway must exist");

    // All text across Phase 1
    const p1FullText = [
      p1.focus,
      p1.l0.question,
      ...p1.l0.inspectionPoints,
      p1.l2.directionalHint,
      p1.l3.structuralHint,
      p1.l3.dataFlowDescription,
      ...p1.l4.protocolSteps,
      p1.l5.unrelatedDomain,
      p1.l5.context,
      p1.l5.codeExample,
      p1.l5.explanation,
    ].join(" ");

    // Check for implementation mechanics and Python syntax in Phase 1
    const FORBIDDEN_P1_SYNTAX = [
      /\bdef\s+[a-zA-Z_]/i,
      /\bwhile\b/i,
      /\bfor\s+[a-zA-Z_]+\s+in\b/i,
      /\bimport\s+[a-zA-Z_]/i,
      /\bclass\s+[a-zA-Z_]/i,
      /\binput\s*\(/i,
      /\bprint\s*\(/i,
      /\bcommand\s+dispatch/i,
      /\bdispatching\b/i,
      /\bmenu\s+loop\b/i,
      /\bcontrol-flow\s+architecture\b/i,
      /\bfunction\s+decomposition\b/i,
    ];

    for (const pattern of FORBIDDEN_P1_SYNTAX) {
      const match = p1FullText.match(pattern);
      assert.equal(
        match,
        null,
        `Phase 1 Help Ladder violates Zero-New-Python policy by containing '${match?.[0]}'`
      );
    }

    // Phase 1 L5 must be pure behavior specification / acceptance criteria (no Python code)
    assert.equal(p1.l5.unrelatedDomain, "Parcel Pickup Kiosk");
    assert.ok(
      !p1.l5.codeExample.includes("def "),
      "Phase 1 L5 must not contain Python function definitions"
    );
    assert.ok(
      !p1.l5.codeExample.includes("while "),
      "Phase 1 L5 must not contain loops"
    );
  });
});
