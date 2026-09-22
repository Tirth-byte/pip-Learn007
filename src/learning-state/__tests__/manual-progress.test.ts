import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  deriveResumeSection,
  markSectionComplete,
  unmarkSectionComplete,
  resetManualProgress,
  getManualProgressSnapshot,
  setLastReadSection,
} from "../manual-progress";
import { STARTING_MANUAL_SECTIONS } from "../../lib/docs/manual-structure";

describe("Starting Manual Progress State Integration", () => {
  beforeEach(() => {
    resetManualProgress();
  });

  it("initializes with zero completed sections and resumes Section 01", () => {
    const initial = getManualProgressSnapshot();
    assert.deepEqual(initial.completedSections, []);
    const { section, isAllComplete } = deriveResumeSection(initial);
    assert.equal(section.slug, "01-what-programming-actually-is");
    assert.equal(isAllComplete, false);
  });

  it("marking Section 01 complete updates completedSections and advances resume target to Section 02", () => {
    const after01 = markSectionComplete("01-what-programming-actually-is");
    assert.equal(after01.completedSections.length, 1);
    assert.ok(after01.completedSections.includes("01-what-programming-actually-is"));

    const { section, isAllComplete } = deriveResumeSection(after01);
    assert.equal(section.slug, "02-running-your-first-python-program");
    assert.equal(isAllComplete, false);
  });

  it("marking intermediate sections preserves sequential resume logic", () => {
    markSectionComplete("01-what-programming-actually-is");
    markSectionComplete("02-running-your-first-python-program");
    const after03 = markSectionComplete("03-values-variables-types");

    assert.equal(after03.completedSections.length, 3);
    const { section, isAllComplete } = deriveResumeSection(after03);
    assert.equal(section.slug, "04-input-output");
    assert.equal(isAllComplete, false);
  });

  it("handles non-linear completions gracefully (finds first incomplete)", () => {
    // Suppose learner read Section 01 and Section 04 directly
    markSectionComplete("01-what-programming-actually-is");
    const nonLinear = markSectionComplete("04-input-output");

    const { section, isAllComplete } = deriveResumeSection(nonLinear);
    // Should resume at Section 02, the first incomplete
    assert.equal(section.slug, "02-running-your-first-python-program");
    assert.equal(isAllComplete, false);
  });

  it("completing all 11 sections marks isAllComplete = true", () => {
    STARTING_MANUAL_SECTIONS.forEach((s) => {
      markSectionComplete(s.slug);
    });

    const allDone = getManualProgressSnapshot();
    assert.equal(allDone.completedSections.length, 11);

    const { section, isAllComplete } = deriveResumeSection(allDone);
    assert.equal(isAllComplete, true);
    assert.equal(section.slug, "11-how-to-start-building-software");
  });

  it("unmarking a section removes it from completed list", () => {
    markSectionComplete("01-what-programming-actually-is");
    markSectionComplete("02-running-your-first-python-program");
    const afterUnmark = unmarkSectionComplete("01-what-programming-actually-is");

    assert.equal(afterUnmark.completedSections.length, 1);
    assert.equal(afterUnmark.completedSections[0], "02-running-your-first-python-program");

    const { section } = deriveResumeSection(afterUnmark);
    assert.equal(section.slug, "01-what-programming-actually-is");
  });

  it("setLastReadSection updates lastReadSectionSlug", () => {
    const updated = setLastReadSection("05-making-decisions");
    assert.equal(updated.lastReadSectionSlug, "05-making-decisions");
  });
});
