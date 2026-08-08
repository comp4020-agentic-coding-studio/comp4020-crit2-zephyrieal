import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// This week's spec (https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/crits/02-unsolicited-redesign/)
// asks for a real organisation, linked from the page, whose current site this
// redesign is honest about superseding. Everything else in the spec — "yours
// is better in some way you can articulate", the calls made building it — is
// judged at the crit, not asserted here.
const DIST = resolve("dist");
const REAL_SITE = "https://melonds.kuribo64.net/";

function htmlFiles(dir: string = DIST): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

const pages = htmlFiles().map((path) => ({
  name: relative(DIST, path),
  doc: new JSDOM(readFileSync(path, "utf8")).window.document,
}));

describe("crit 2: unsolicited redesign", () => {
  it("links to the real melonDS site from the home page", () => {
    const home = pages.find(({ name }) => name === "index.html");
    expect(home, "dist/index.html not found").toBeTruthy();

    const links = Array.from(home!.doc.querySelectorAll("a")).map((a) => a.href);
    expect(
      links.some((href) => href.startsWith(REAL_SITE)),
      `expected a link to ${REAL_SITE} somewhere on the home page`,
    ).toBe(true);
  });

  it("discloses that this is an unofficial redesign, not the real project", () => {
    const home = pages.find(({ name }) => name === "index.html");
    const bodyText = home!.doc.body.textContent ?? "";
    expect(
      /unofficial|unsolicited/i.test(bodyText),
      "the page should say plainly that it's an unofficial redesign, not the real melonDS site",
    ).toBe(true);
  });
});
