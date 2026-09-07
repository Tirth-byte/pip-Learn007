import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isInternalUrl, isExternalUrl } from "../navigation";

describe("PipLearn Internal Navigation & Routing Engine", () => {
  it("should classify all internal app routes as internal", () => {
    const internalRoutes = [
      "/",
      "/dashboard",
      "/courses",
      "/courses/python",
      "/courses/python/basics",
      "/practice",
      "/projects",
      "/projects/1",
      "/portfolio",
      "/leaderboard",
      "/community",
      "/profile",
      "/settings",
      "/admin",
      "/sandbox",
      "/ai-mentor",
      "/quiz/1",
      "/onboarding",
      "/product",
      "/pricing",
      "/enterprise",
      "/developers",
      "/resources",
      "/demo",
      "/login",
      "/signup",
      "#section-1",
      "?filter=python",
      "./basics",
      "../python",
      "https://piplearn.dev/courses",
      "https://www.piplearn.dev/dashboard",
      "http://localhost:3000/practice",
    ];

    for (const route of internalRoutes) {
      assert.strictEqual(
        isInternalUrl(route),
        true,
        `Expected ${route} to be classified as internal`
      );
      assert.strictEqual(
        isExternalUrl(route),
        false,
        `Expected ${route} NOT to be classified as external`
      );
    }
  });

  it("should classify third-party and external resources as external", () => {
    const externalRoutes = [
      "https://github.com/piplearn",
      "https://docs.python.org/3/",
      "https://developer.mozilla.org",
      "https://cdn.jsdelivr.net/pyodide",
      "mailto:support@piplearn.dev",
      "tel:+1234567890",
    ];

    for (const route of externalRoutes) {
      assert.strictEqual(
        isExternalUrl(route),
        true,
        `Expected ${route} to be classified as external`
      );
      assert.strictEqual(
        isInternalUrl(route),
        false,
        `Expected ${route} NOT to be classified as internal`
      );
    }
  });

  it("should handle edge cases like empty string and relative fragments", () => {
    assert.strictEqual(isInternalUrl(""), true);
    assert.strictEqual(isInternalUrl("#"), true);
    assert.strictEqual(isInternalUrl("/"), true);
  });
});
