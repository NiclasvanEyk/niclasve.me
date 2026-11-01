import assert from "node:assert/strict";
import { glob, readFile } from "node:fs/promises";
import { join } from "node:path";
import { test } from "node:test";

const DIST = join(process.cwd(), "dist");

// These assets used to live in public/. Check their generated replacements and
// the links in built HTML, including nested detail pages and the /uses alias.
test("every page links to an existing section favicon and theme stylesheet", async () => {
  let checked = 0;
  for await (const page of glob("**/*.html", { cwd: DIST })) {
    const html = await readFile(join(DIST, page), "utf8");
    const section = page.split("/")[0];
    const expected = ["projects", "blog", "uses"].includes(section)
      ? `/favicon-${section}.svg`
      : "/favicon.svg";
    const favicon = html.match(/<link rel="icon"[^>]*href="([^"]+)"/)?.[1];
    assert.equal(favicon, expected, `${page}: wrong favicon`);
    assert.match(html, /<link rel="stylesheet" href="\/theme\.css"/);

    const svg = await readFile(join(DIST, expected), "utf8");
    assert.match(svg, /<svg[^>]+viewBox="0 0 32 32"/);
    assert.match(svg, /@media \(prefers-color-scheme: dark\)/);
    checked++;
  }
  assert.ok(checked > 0, "run a build first");
  const css = await readFile(join(DIST, "theme.css"), "utf8");
  assert.match(css, /\[data-section="uses"\]/);
  assert.match(css, /@media \(prefers-color-scheme: dark\)/);
});
