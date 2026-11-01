import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { test } from "node:test";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "../src/consts.ts";

/**
 * `Default.astro` derives the OpenGraph image from the page path
 * (`/projects/keepac` -> `/og/projects/keepac.png`), so a page added without a
 * matching card in `src/pages/og/[...slug].png.ts` would silently ship a broken
 * `og:image`. These tests run against the build output and catch exactly that.
 */

const DIST = join(process.cwd(), "dist");
const SITE = "https://niclasve.me";
const CARD_SIZE = { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT };

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? walk(join(directory, entry.name))
        : Promise.resolve([join(directory, entry.name)]),
    ),
  );
  return paths.flat();
}

function pngSize(png: Buffer): { width: number; height: number } {
  assert.equal(png.subarray(1, 4).toString("ascii"), "PNG", "not a PNG file");
  return { width: png.readUInt32BE(16), height: png.readUInt32BE(20) };
}

async function pages(): Promise<string[]> {
  const html = (await walk(DIST)).filter((path) => path.endsWith(".html"));
  assert.ok(html.length > 0, `no HTML found in ${DIST}, run a build first`);

  return html.map((path) => relative(DIST, path)).sort();
}

function ogImageOf(html: string): string | undefined {
  return html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
}

test("every page has an existing OpenGraph card", async () => {
  const failures: string[] = [];
  let checked = 0;

  for (const page of await pages()) {
    const html = await readFile(join(DIST, page), "utf8");
    const image = ogImageOf(html);

    if (!image) {
      failures.push(`${page}: no og:image meta tag`);
      continue;
    }

    const url = URL.parse(image);
    if (!url) {
      failures.push(`${page}: og:image is not an absolute URL (${image})`);
      continue;
    }

    if (url.origin !== SITE) {
      failures.push(`${page}: og:image is not on ${SITE} (${image})`);
      continue;
    }

    try {
      const png = await readFile(join(DIST, decodeURIComponent(url.pathname)));
      const size = pngSize(png);
      assert.deepEqual(
        size,
        CARD_SIZE,
        `expected ${CARD_SIZE.width}x${CARD_SIZE.height}`,
      );
      checked++;
    } catch (error) {
      const { code, message } = error as NodeJS.ErrnoException;
      failures.push(
        `${page}: ${url.pathname} (${
          code === "ENOENT" ? "file does not exist" : message.split("\n")[0]
        })`,
      );
    }
  }

  assert.deepEqual(
    failures,
    [],
    `broken OpenGraph images:\n  ${failures.join("\n  ")}`,
  );
  assert.ok(checked > 0, "no OpenGraph images were checked");
});

test("every generated card is referenced by a page", async () => {
  const referenced = new Set(
    await Promise.all(
      (await pages()).map(async (page) => {
        const image = ogImageOf(await readFile(join(DIST, page), "utf8"));
        return image ? new URL(image).pathname : "";
      }),
    ),
  );

  const cards = (await walk(join(DIST, "og"))).filter((path) =>
    path.endsWith(".png"),
  );
  const orphans = cards
    .map((card) => `/${relative(DIST, card).split("\\").join("/")}`)
    .filter((card) => !referenced.has(card));

  assert.deepEqual(
    orphans,
    [],
    `cards without a page:\n  ${orphans.join("\n  ")}`,
  );
});
