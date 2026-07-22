import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MODULE_ID, MODULE_VERSION } from "../scripts/constants.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("manifest and package metadata use the runtime version", () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "module.json"), "utf8"));
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  assert.equal(manifest.id, MODULE_ID);
  assert.equal(manifest.version, MODULE_VERSION);
  assert.equal(pkg.version, MODULE_VERSION);
  assert.equal(manifest.relationships.requires[0].id, "pf2e-critical-forge");
  assert.equal(manifest.relationships.requires[0].type, "module");
  assert.equal(manifest.title, "PF2E Critical Forge: Against All Odds");
  assert.equal(manifest.relationships.requires[0].compatibility.minimum, "1.0.0-rc");
  assert.equal(manifest.url.endsWith("/pf2e-critical-forge-against-all-odds"), true);
});

test("German and English localization trees contain identical keys", () => {
  const de = JSON.parse(fs.readFileSync(path.join(root, "lang/de.json"), "utf8"));
  const en = JSON.parse(fs.readFileSync(path.join(root, "lang/en.json"), "utf8"));
  assert.deepEqual(flatten(de).sort(), flatten(en).sort());
});


test("canonical Critical Forge add-on name is used throughout runtime metadata", () => {
  assert.equal(MODULE_ID, "pf2e-critical-forge-against-all-odds");
  const constants = fs.readFileSync(path.join(root, "scripts/constants.js"), "utf8");
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "module.json"), "utf8"));
  assert.equal(manifest.title, "PF2E Critical Forge: Against All Odds");
  assert.equal(constants.includes("pf2e-against-all-odds"), false);
});

function flatten(value, prefix = "") {
  const keys = [];
  for (const [key, nested] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (nested && typeof nested === "object" && !Array.isArray(nested)) keys.push(...flatten(nested, path));
    else keys.push(path);
  }
  return keys;
}
