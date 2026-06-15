import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildFooterResourceRegistry,
  getFooterResources,
  resolveFooterResourceCategory,
} from "./footerResources";
import { IMAGE_ANNOTATOR_LANDINGS } from "./imageAnnotatorLandings";
import { IMAGE_ANNOTATOR_LANDINGS_HE } from "./imageAnnotatorLandings.he";
import { BACKGROUND_REMOVER_LANDINGS } from "./backgroundRemoverLandings";
import { RESIZER_LANDINGS } from "./resizerLandings";

const ANNOTATOR_TOOL_PATH = "/tools/editor-studio/image-annotator";
const BG_REMOVER_TOOL_PATH = "/tools/optimization/bg-remover";
const RESIZER_TOOL_PATH = "/tools/editor-studio/resizer";
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

  it("returns remover for Background Remover tool URL", () => {
    assert.equal(resolveFooterResourceCategory(BG_REMOVER_TOOL_PATH), "remover");
  });

  it("returns resizer for Resizer tool URL", () => {
    assert.equal(resolveFooterResourceCategory(RESIZER_TOOL_PATH), "resizer");
  });

  it("returns resizer for resize image online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["resize-image-online"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for change image dimensions landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["change-image-dimensions"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for image resizer free landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["image-resizer-free"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for batch image resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["batch-image-resizer"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for resize image for Instagram landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["resize-image-for-instagram"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for LinkedIn profile image resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["image-resizer-for-linkedin-profile"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for Facebook cover resize landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["resize-photos-for-facebook-covers"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for social media image dimensions landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["image-dimensions-for-social-media"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for resize image to pixels landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["resize-image-to-pixels"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for maintain aspect ratio image resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["maintain-aspect-ratio-image-resizer"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for resize image without quality loss landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["resize-image-without-quality-loss"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for web developers image resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["image-resizer-for-web-developers"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for client-side image resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["client-side-image-resizer"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for privacy-focused photo resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["privacy-focused-photo-resizer"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for no-upload image resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["no-upload-image-resizer"].path,
      ),
      "resizer",
    );
  });

  it("returns resizer for browser-based photo resizer landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        RESIZER_LANDINGS["browser-based-photo-resizer"].path,
      ),
      "resizer",
    );
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

  it("returns remover for remove background online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["remove-background-from-image-online"].path,
      ),
      "remover",
    );
  });

  it("returns remover for transparent background maker landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["transparent-background-maker"].path,
      ),
      "remover",
    );
  });

  it("returns remover for remove image background free landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["remove-image-background-free"].path,
      ),
      "remover",
    );
  });

  it("returns remover for erase background online landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["erase-background-online"].path,
      ),
      "remover",
    );
  });

  it("returns remover for e-commerce background remover landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["background-remover-for-ecommerce"].path,
      ),
      "remover",
    );
  });

  it("returns remover for marketing graphics landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["remove-background-for-marketing-graphics"].path,
      ),
      "remover",
    );
  });

  it("returns remover for social media photos landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["background-eraser-for-social-media-photos"].path,
      ),
      "remover",
    );
  });

  it("returns remover for photographers landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["professional-background-removal-for-photographers"].path,
      ),
      "remover",
    );
  });

  it("returns remover for client-side background remover landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["client-side-background-remover"].path,
      ),
      "remover",
    );
  });

  it("returns remover for browser-based background eraser landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["browser-based-background-eraser"].path,
      ),
      "remover",
    );
  });

  it("returns remover for no-upload image background remover landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["no-upload-image-background-remover"].path,
      ),
      "remover",
    );
  });

  it("returns remover for privacy-first background removal tool landing URL", () => {
    assert.equal(
      resolveFooterResourceCategory(
        BACKGROUND_REMOVER_LANDINGS["privacy-first-background-removal-tool"].path,
      ),
      "remover",
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

  it("returns resizer landing and guide links", () => {
    const links = getFooterResources("resizer");
    assert.equal(links.length, 17);
    assert.equal(
      links[0]?.href,
      RESIZER_LANDINGS["resize-image-online"].path,
    );
    assert.equal(
      links[1]?.href,
      RESIZER_LANDINGS["change-image-dimensions"].path,
    );
    assert.equal(
      links[2]?.href,
      RESIZER_LANDINGS["image-resizer-free"].path,
    );
    assert.equal(
      links[3]?.href,
      RESIZER_LANDINGS["batch-image-resizer"].path,
    );
    assert.equal(
      links[4]?.href,
      RESIZER_LANDINGS["resize-image-for-instagram"].path,
    );
    assert.equal(
      links[5]?.href,
      RESIZER_LANDINGS["image-resizer-for-linkedin-profile"].path,
    );
    assert.equal(
      links[6]?.href,
      RESIZER_LANDINGS["resize-photos-for-facebook-covers"].path,
    );
    assert.equal(
      links[7]?.href,
      RESIZER_LANDINGS["image-dimensions-for-social-media"].path,
    );
    assert.equal(
      links[8]?.href,
      RESIZER_LANDINGS["resize-image-to-pixels"].path,
    );
    assert.equal(
      links[9]?.href,
      RESIZER_LANDINGS["maintain-aspect-ratio-image-resizer"].path,
    );
    assert.equal(
      links[10]?.href,
      RESIZER_LANDINGS["resize-image-without-quality-loss"].path,
    );
    assert.equal(
      links[11]?.href,
      RESIZER_LANDINGS["image-resizer-for-web-developers"].path,
    );
    assert.equal(
      links[12]?.href,
      RESIZER_LANDINGS["client-side-image-resizer"].path,
    );
    assert.equal(
      links[13]?.href,
      RESIZER_LANDINGS["privacy-focused-photo-resizer"].path,
    );
    assert.equal(
      links[14]?.href,
      RESIZER_LANDINGS["no-upload-image-resizer"].path,
    );
    assert.equal(
      links[15]?.href,
      RESIZER_LANDINGS["browser-based-photo-resizer"].path,
    );
    assert.equal(links[16]?.href, "/articles/privacy-and-speed-local-resizing");
  });

  it("returns remover landing and guide links", () => {
    const links = getFooterResources("remover");
    assert.equal(links.length, 13);
    assert.equal(
      links[0]?.href,
      BACKGROUND_REMOVER_LANDINGS["remove-background-from-image-online"].path,
    );
    assert.equal(
      links[1]?.href,
      BACKGROUND_REMOVER_LANDINGS["transparent-background-maker"].path,
    );
    assert.equal(
      links[2]?.href,
      BACKGROUND_REMOVER_LANDINGS["remove-image-background-free"].path,
    );
    assert.equal(
      links[3]?.href,
      BACKGROUND_REMOVER_LANDINGS["erase-background-online"].path,
    );
    assert.equal(
      links[4]?.href,
      BACKGROUND_REMOVER_LANDINGS["background-remover-for-ecommerce"].path,
    );
    assert.equal(
      links[5]?.href,
      BACKGROUND_REMOVER_LANDINGS["remove-background-for-marketing-graphics"].path,
    );
    assert.equal(
      links[6]?.href,
      BACKGROUND_REMOVER_LANDINGS["background-eraser-for-social-media-photos"].path,
    );
    assert.equal(
      links[7]?.href,
      BACKGROUND_REMOVER_LANDINGS["professional-background-removal-for-photographers"].path,
    );
    assert.equal(
      links[8]?.href,
      BACKGROUND_REMOVER_LANDINGS["client-side-background-remover"].path,
    );
    assert.equal(
      links[9]?.href,
      BACKGROUND_REMOVER_LANDINGS["browser-based-background-eraser"].path,
    );
    assert.equal(links[10]?.href, "/articles/privacy-first-background-removal");
    assert.equal(
      links[11]?.href,
      BACKGROUND_REMOVER_LANDINGS["no-upload-image-background-remover"].path,
    );
    assert.equal(
      links[12]?.href,
      BACKGROUND_REMOVER_LANDINGS["privacy-first-background-removal-tool"].path,
    );
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
