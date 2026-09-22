import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { STARTING_MANUAL_SECTIONS } from "../../lib/docs/manual-structure";
import { loadSectionContent, loadSection04Content } from "../../lib/docs/content";

describe("Starting Manual Content Loading Integration", () => {
  it("has exactly 11 sections in STARTING_MANUAL_SECTIONS", () => {
    assert.equal(STARTING_MANUAL_SECTIONS.length, 11);
    STARTING_MANUAL_SECTIONS.forEach((section, index) => {
      const expectedId = String(index + 1).padStart(2, "0");
      assert.equal(section.id, expectedId);
      assert.equal(section.status, "available");
      assert.ok(section.slug.startsWith(expectedId));
      assert.ok(section.title.length > 0);
    });
  });

  it("loadSection04Content returns valid section 04 data", () => {
    const s04 = loadSection04Content();
    assert.ok(s04);
    assert.equal(s04.metadata.section, "04");
    assert.equal(s04.metadata.title, "Input & Output");
    assert.ok(s04.htmlContent.length > 500);
    assert.ok(s04.toc.length > 0);
    assert.equal(s04.prevSection?.slug, "03-values-variables-types");
    assert.equal(s04.nextSection?.slug, "05-making-decisions");
  });

  it("loads and parses all 11 markdown sections cleanly", () => {
    STARTING_MANUAL_SECTIONS.forEach((section) => {
      const data = loadSectionContent(section.slug);
      assert.ok(data, `Failed to load section: ${section.slug}`);
      assert.equal(data.metadata.section, section.id);
      assert.ok(data.htmlContent.length > 200, `Empty HTML content in: ${section.slug}`);
      assert.ok(data.toc.length > 0, `No TOC headings found in: ${section.slug}`);
      assert.ok(Array.isArray(data.metadata.outcomes), `Outcomes not an array in: ${section.slug}`);
      assert.ok(data.metadata.outcomes.length > 0, `Zero outcomes in: ${section.slug}`);

      if (section.id === "01") {
        assert.equal(data.prevSection, undefined);
        assert.equal(data.nextSection?.slug, "02-running-your-first-python-program");
      } else if (section.id === "11") {
        assert.equal(data.prevSection?.slug, "10-modules-packages-documentation");
        assert.equal(data.nextSection, undefined);
      } else {
        assert.ok(data.prevSection, `Missing prevSection for ${section.slug}`);
        assert.ok(data.nextSection, `Missing nextSection for ${section.slug}`);
      }
    });
  });
});
