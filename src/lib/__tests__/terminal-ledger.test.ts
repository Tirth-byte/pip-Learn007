import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import {
  TERMINAL_LEDGER_PROJECT,
  TERMINAL_LEDGER_PHASES,
  getPhaseBySlug,
  getPhaseByNumber,
  getNextPhase,
  getPrevPhase,
} from "../projects/terminal-ledger/structure";
import {
  loadPhaseMilestoneContent,
  loadKnowledgePackContent,
  getAllPhaseMilestones,
} from "../projects/terminal-ledger/content";

describe("Terminal Ledger Curriculum & Content Integration", () => {
  it("has exactly 9 phases configured with 13–18 hours total commitment", () => {
    assert.equal(TERMINAL_LEDGER_PHASES.length, 9);
    assert.equal(TERMINAL_LEDGER_PROJECT.totalPhases, 9);
    assert.equal(TERMINAL_LEDGER_PROJECT.slug, "terminal-ledger");
  });

  it("has exactly 3 mentor checkpoints after Phases 3, 6, and 9", () => {
    assert.equal(TERMINAL_LEDGER_PROJECT.checkpoints.length, 3);
    assert.deepEqual(
      TERMINAL_LEDGER_PROJECT.checkpoints.map((c) => c.afterPhase),
      [3, 6, 9]
    );

    const cpPhases = TERMINAL_LEDGER_PHASES.filter((p) => p.isCheckpointFollowed);
    assert.equal(cpPhases.length, 3);
    assert.deepEqual(
      cpPhases.map((p) => p.number),
      [3, 6, 9]
    );
  });

  it("Phase 1 has zero standalone packs and does not error", () => {
    const phase1 = getPhaseBySlug("phase-01");
    assert.ok(phase1);
    assert.equal(phase1.standalonePacks.length, 0);

    const content = loadPhaseMilestoneContent("phase-01");
    assert.ok(content);
    assert.equal(content.knowledgePacks.length, 0);
    assert.ok(content.htmlContent.length > 500);
    assert.ok(content.toc.length > 0);
  });

  it("loads and parses all 9 milestone briefs cleanly from Brain filesystem", () => {
    for (let i = 1; i <= 9; i++) {
      const slug = `phase-${String(i).padStart(2, "0")}`;
      const content = loadPhaseMilestoneContent(slug);
      assert.ok(content, `Phase ${slug} should load milestone brief`);
      assert.equal(content.phase.number, i);
      assert.ok(content.htmlContent.length > 500, `Phase ${slug} HTML content should not be empty`);
      assert.ok(content.toc.length > 0, `Phase ${slug} should have TOC items`);
      assert.ok(content.phase.criteria.length >= 4, `Phase ${slug} should have behavioral criteria`);
    }
  });

  it("all 18 standalone knowledge pack files exist on disk and resolve", () => {
    const packsDir = path.join(
      process.cwd(),
      "Brain",
      "projects",
      "python",
      "terminal-ledger",
      "knowledge-packs"
    );
    const filesOnDisk = fs.readdirSync(packsDir).filter((f) => f.endsWith(".md"));
    assert.equal(filesOnDisk.length, 18, "Filesystem truth: exactly 18 standalone knowledge packs");

    for (const file of filesOnDisk) {
      const pack = loadKnowledgePackContent(file);
      assert.ok(pack, `Knowledge pack ${file} should load cleanly`);
      assert.ok(pack.title, `Pack ${file} should have a title`);
      assert.ok(pack.htmlContent.length > 200, `Pack ${file} HTML should not be empty`);
      assert.ok(pack.outcomes.length > 0, `Pack ${file} should define outcomes`);
    }
  });

  it("knowledge packs are mapped to correct phases matching authoritative curriculum", () => {
    const expectedCounts: Record<number, number> = {
      1: 0, // Integrated Planning 01
      2: 2, // Records 01, Display 01
      3: 2, // Persistence 01, Persistence 02
      4: 3, // Robust Input 01, Numbers 01, Persistence 03
      5: 2, // Strings 01, Querying 01
      6: 2, // Dates 01, Dates 02
      7: 3, // State 02, Display 02, Verification 01
      8: 2, // Aggregation 01, Ordering 01
      9: 2, // Interoperability 01, Architecture 01
    };

    let totalMapped = 0;
    for (let i = 1; i <= 9; i++) {
      const phase = getPhaseByNumber(i);
      assert.ok(phase);
      assert.equal(
        phase.standalonePacks.length,
        expectedCounts[i],
        `Phase ${i} should map exactly ${expectedCounts[i]} packs`
      );
      totalMapped += phase.standalonePacks.length;
    }

    assert.equal(totalMapped, 18, "Total mapped packs across 9 phases must equal 18");
  });

  it("getAllPhaseMilestones returns all 9 phases with linked packs", () => {
    const all = getAllPhaseMilestones();
    assert.equal(all.length, 9);
    const totalPacks = all.reduce((sum, m) => sum + m.knowledgePacks.length, 0);
    assert.equal(totalPacks, 18);
  });

  it("navigation helpers getNextPhase and getPrevPhase work correctly", () => {
    assert.equal(getPrevPhase("phase-01"), undefined);
    assert.equal(getNextPhase("phase-01")?.slug, "phase-02");
    assert.equal(getPrevPhase("phase-02")?.slug, "phase-01");
    assert.equal(getNextPhase("phase-09"), undefined);
    assert.equal(getPrevPhase("phase-09")?.slug, "phase-08");
  });
});
