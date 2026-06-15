import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildFooterResourceRegistry,
  getFooterResources,
  resolveFooterResourceCategory,
} from "./footerResources";
import { IMAGE_ANNOTATOR_LANDINGS } from "./imageAnnotatorLandings";
import { IMAGE_ANNOTATOR_LANDINGS_HE } from "./imageAnnotatorLandings.he";

const ANNOTATOR_TOOL_PATH = "/tools/editor-studio/image-annotator";
const ANNOTATE_LANDING_PATH =
  IMAGE_ANNOTATOR_LANDINGS["annotate-images-online-free"].path;
const DEV_LANDING_PATH =
  IMAGE_ANNOTATOR_LANDINGS["image-annotator-for-web-developers"].path;
const COMPRESSOR_TOOL_PATH = "/tools/optimization/compressor";

describe("resolveFooterResourceCategory", () => {
  it("returns annotator for Image Annotator tool URL", () => {
    assert.equal(resolveFooterResourceCategory(ANNOTATOR_TOOL_PATH), "annotator");
  });

  it("returns annotator for annotator landing page URLs", () => {
    assert.equal(resolveFooterResourceCategory(ANNOTATE_LANDING_PATH), "annotator");
    assert.equal(resolveFooterResourceCategory(DEV_LANDING_PATH), "annotator");
  });

  it("normalizes trailing slashes before resolving", () => {
    assert.equal(
      resolveFooterResourceCategory(`${ANNOTATE_LANDING_PATH}/`),
      "annotator",
    );
  });

  it("returns compressor for compressor tool URL", () => {
    assert.equal(resolveFooterResourceCategory(COMPRESSOR_TOOL_PATH), "compressor");
  });

  it("returns null for unknown URLs", () => {
    assert.equal(resolveFooterResourceCategory("/"), null);
    assert.equal(resolveFooterResourceCategory("/blog"), null);
    assert.equal(resolveFooterResourceCategory("/not-a-real-page"), null);
  });

  it("returns annotator for documentation landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["annotate-images-for-documentation"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for remote teams landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["image-markup-for-remote-teams"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for designers landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["screenshot-annotation-tool-for-designers"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for marketing teams landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["fast-image-editor-for-marketing-teams"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for browser-based landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["browser-based-image-annotator"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for client-side editor landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["client-side-image-editor"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for privacy-focused editor landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["privacy-focused-image-editor"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for no-install annotation landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["no-install-image-annotation-tool"].path,
      ),
      "annotator",
    );
  });

  it("returns annotator for lightweight markup landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        IMAGE_ANNOTATOR_LANDINGS["lightweight-image-markup-tool"].path,
      ),
      "annotator",
    );
  });
});

describe("getFooterResources", () => {
  const annotatorEntries = buildFooterResourceRegistry("en").filter(
    (entry) => entry.category === "annotator",
  );

  it("returns annotator links sorted by priority ascending", () => {
    const links = getFooterResources("annotator", { limit: 20 });
    const priorities = links.map(
      (link) =>
        buildFooterResourceRegistry("en").find((entry) => entry.href === link.href)!
          .priority,
    );

    for (let index = 1; index < priorities.length; index += 1) {
      assert.ok(
        priorities[index] >= priorities[index - 1],
        "expected non-decreasing priority order",
      );
    }
  });

  it("returns all annotator links by default (no cap)", () => {
    const links = getFooterResources("annotator");
    assert.equal(links.length, annotatorEntries.length);
  });

  it("respects a custom limit", () => {
    const links = getFooterResources("annotator", { limit: 3 });
    assert.equal(links.length, 3);
  });

  it("excludes the current page path from results", () => {
    const links = getFooterResources("annotator", {
      currentPath: ANNOTATE_LANDING_PATH,
      limit: 20,
    });

    assert.ok(
      links.every((link) => link.href !== ANNOTATE_LANDING_PATH),
      "current landing page should be excluded",
    );
    assert.equal(links.length, annotatorEntries.length - 1);
  });

  it("excludes current path when it has a trailing slash", () => {
    const links = getFooterResources("annotator", {
      currentPath: `${DEV_LANDING_PATH}/`,
      limit: 20,
    });

    assert.ok(links.every((link) => link.href !== DEV_LANDING_PATH));
  });

  it("returns highest-priority links first when limited", () => {
    const links = getFooterResources("annotator", { limit: 2 });
    assert.deepEqual(links.map((link) => link.href), [
      IMAGE_ANNOTATOR_LANDINGS["annotate-images-online-free"].path,
      IMAGE_ANNOTATOR_LANDINGS["image-annotator-for-web-developers"].path,
    ]);
  });

  it("returns an empty array for categories with no registry entries", () => {
    assert.deepEqual(getFooterResources("compressor"), []);
  });

  it("returns Hebrew labels when locale is he", () => {
    const links = getFooterResources("annotator", { locale: "he", limit: 1 });
    assert.equal(links[0]?.label, IMAGE_ANNOTATOR_LANDINGS_HE["annotate-images-online-free"].linkTitle);
  });

  it("does not duplicate hrefs in annotator registry", () => {
    const hrefs = buildFooterResourceRegistry("en")
      .filter((entry) => entry.category === "annotator")
      .map((entry) => entry.href);
    assert.equal(hrefs.length, new Set(hrefs).size);
  });
});
