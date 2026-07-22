import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const allowDev = process.argv.includes("--allow-dev");
const errors = [];
const warnings = [];

const manifest = readJson("module.json");
const pkg = readJson("package.json");
const constants = fs.readFileSync(path.join(root, "scripts/constants.js"), "utf8");
const runtimeVersion = constants.match(/MODULE_VERSION\s*=\s*"([^"]+)"/u)?.[1] ?? null;

check(manifest.id === "pf2e-critical-forge-against-all-odds", "Unexpected module id.");
check(manifest.title === "PF2E Critical Forge: Against All Odds", "Unexpected module title.");
check(manifest.version === pkg.version, "module.json and package.json versions differ.");
check(manifest.version === runtimeVersion, "Manifest and runtime versions differ.");
check(Boolean(manifest.relationships?.requires?.some((entry) => entry.id === "pf2e-critical-forge")), "Critical Forge dependency is missing.");
check(manifest.relationships?.requires?.find((entry) => entry.id === "pf2e-critical-forge")?.compatibility?.minimum === "1.0.0-rc", "Critical Forge RC minimum is missing.");
check(Boolean(manifest.relationships?.systems?.some((entry) => entry.id === "pf2e")), "PF2e system relationship is missing.");
check(Array.isArray(manifest.esmodules) && manifest.esmodules.includes("scripts/main.js"), "scripts/main.js is not declared.");

if (!allowDev && /(?:dev|alpha|beta|rc)/iu.test(manifest.version)) {
  errors.push(`Development version ${manifest.version} cannot pass a final release check.`);
}

for (const required of [
  "README.md",
  "CHANGELOG.md",
  "RELEASE_CHECKLIST.md",
  "LICENSE",
  "docs/ARCHITECTURE.md",
  "docs/CONTEXT_FIELDS.md",
  "docs/CARD_ROADMAP.md",
  "docs/TESTING.md",
  "lang/de.json",
  "lang/en.json"
]) {
  check(fs.existsSync(path.join(root, required)), `Missing required file: ${required}`);
}

const de = readJson("lang/de.json");
const en = readJson("lang/en.json");
const deKeys = flatten(de).sort();
const enKeys = flatten(en).sort();
check(JSON.stringify(deKeys) === JSON.stringify(enKeys), "German and English localization keys differ.");

const files = walk(root);
for (const file of files.filter((entry) => entry.endsWith(".js") || entry.endsWith(".mjs"))) {
  try {
    execFileSync(process.execPath, ["--check", file], { stdio: "pipe" });
  } catch (error) {
    errors.push(`JavaScript syntax check failed: ${path.relative(root, file)}\n${error.stderr?.toString?.() ?? error.message}`);
  }
}

for (const file of files) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  if (relative.endsWith(".zip") || relative.includes("__MACOSX") || relative.endsWith(".DS_Store")) {
    errors.push(`Archive hygiene violation: ${relative}`);
  }
}

const packsSource = fs.readFileSync(path.join(root, "scripts/data/packs.js"), "utf8");
for (const deckType of ["attack", "fortitude", "reflex", "will"]) {
  check(constants.includes(`"${deckType}"`), `Missing specialized deck constant: ${deckType}`);
}
check(packsSource.includes("plannedCardsPerDeck: 10"), "Card roadmap metadata is missing.");

if (warnings.length) console.warn(warnings.join("\n"));
if (errors.length) {
  console.error(errors.map((entry) => `- ${entry}`).join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({
  module: manifest.id,
  version: manifest.version,
  localizationKeys: deKeys.length,
  javascriptFiles: files.filter((entry) => entry.endsWith(".js") || entry.endsWith(".mjs")).length,
  status: "ok"
}));

function readJson(relative) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
  } catch (error) {
    errors.push(`Cannot read ${relative}: ${error.message}`);
    return {};
  }
}

function check(condition, message) {
  if (!condition) errors.push(message);
}

function flatten(value, prefix = "") {
  const result = [];
  for (const [key, nested] of Object.entries(value ?? {})) {
    const current = prefix ? `${prefix}.${key}` : key;
    if (nested && typeof nested === "object" && !Array.isArray(nested)) result.push(...flatten(nested, current));
    else result.push(current);
  }
  return result;
}

function walk(directory) {
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (["node_modules", ".git"].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...walk(absolute));
    else result.push(absolute);
  }
  return result;
}
