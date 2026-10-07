import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it, after } from "node:test";
import { parseReleaseTag, resolvePackageDir } from "./parse-release-tag.mjs";
import { existsSync, readdirSync, readFileSync } from "node:fs";

describe("parseReleaseTag", () => {
  it("parses package tag", () => {
    assert.deepEqual(parseReleaseTag("@magnusp/pi-quiet@0.4.1"), {
      packageName: "@magnusp/pi-quiet",
      version: "0.4.1",
    });
  });

  it("parses prerelease", () => {
    assert.deepEqual(parseReleaseTag("@magnusp/pi-pstack@0.6.0-rc.1"), {
      packageName: "@magnusp/pi-pstack",
      version: "0.6.0-rc.1",
    });
  });

  it("strips refs/tags/", () => {
    assert.deepEqual(parseReleaseTag("refs/tags/@magnusp/pi-quiet@1.2.3"), {
      packageName: "@magnusp/pi-quiet",
      version: "1.2.3",
    });
  });

  it("rejects bad tags", () => {
    assert.throws(() => parseReleaseTag("v0.1.0"), /invalid release tag/);
    assert.throws(() => parseReleaseTag("@magnusp/pi-quiet"), /invalid release tag/);
    assert.throws(() => parseReleaseTag(""), /non-empty/);
  });
});

describe("resolvePackageDir", () => {
  const root = mkdtempSync(join(tmpdir(), "pi-ext-"));
  const packagesDir = join(root, "packages");
  mkdirSync(join(packagesDir, "pi-quiet"), { recursive: true });
  writeFileSync(
    join(packagesDir, "pi-quiet", "package.json"),
    JSON.stringify({ name: "@magnusp/pi-quiet", version: "0.4.1" }),
  );

  after(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it("finds package by name", () => {
    const found = resolvePackageDir(packagesDir, "@magnusp/pi-quiet", {
      readdirSync,
      readFileSync,
      existsSync,
      join,
    });
    assert.equal(found.folderName, "pi-quiet");
    assert.equal(found.packageJson.version, "0.4.1");
  });

  it("throws when missing", () => {
    assert.throws(
      () =>
        resolvePackageDir(packagesDir, "@magnusp/nope", {
          readdirSync,
          readFileSync,
          existsSync,
          join,
        }),
      /no workspace package/,
    );
  });
});
