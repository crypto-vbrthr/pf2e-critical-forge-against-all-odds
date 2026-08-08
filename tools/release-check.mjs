import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

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
const { BLOODIED_ATTACK_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/bloodied-attack.js")).href);
const { BLOODIED_FORTITUDE_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/bloodied-fortitude.js")).href);
const { BLOODIED_REFLEX_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/bloodied-reflex.js")).href);
const { BLOODIED_WILL_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/bloodied-will.js")).href);
const { SURROUNDED_ATTACK_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/surrounded-attack.js")).href);
const { SURROUNDED_FORTITUDE_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/surrounded-fortitude.js")).href);
const { SURROUNDED_REFLEX_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/surrounded-reflex.js")).href);
const { SURROUNDED_WILL_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/surrounded-will.js")).href);
const { GIANT_SLAYER_ATTACK_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/giant-slayer-attack.js")).href);
const { GIANT_SLAYER_FORTITUDE_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/giant-slayer-fortitude.js")).href);
const { GIANT_SLAYER_REFLEX_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/giant-slayer-reflex.js")).href);
const { GIANT_SLAYER_WILL_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/giant-slayer-will.js")).href);
const { NARROW_ESCAPE_ATTACK_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/narrow-escape-attack.js")).href);
const { NARROW_ESCAPE_FORTITUDE_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/narrow-escape-fortitude.js")).href);
const { NARROW_ESCAPE_REFLEX_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/narrow-escape-reflex.js")).href);
const { NARROW_ESCAPE_WILL_CARDS } = await import(pathToFileURL(path.join(root, "scripts/data/cards/narrow-escape-will.js")).href);
for (const deckType of ["attack", "fortitude", "reflex", "will"]) {
  check(constants.includes(`"${deckType}"`), `Missing specialized deck constant: ${deckType}`);
}
check(packsSource.includes("plannedCardsPerDeck: 30"), "Card roadmap metadata is missing.");
check(BLOODIED_ATTACK_CARDS.length === 30, "Bloodied Triumphs Attack deck must contain thirty cards.");
check(new Set(BLOODIED_ATTACK_CARDS.map((card) => card.id)).size === 30, "Bloodied Triumphs Attack card IDs must be unique.");
check(BLOODIED_ATTACK_CARDS.every((card) => card.deckType === "attack"), "Bloodied Triumphs cards must remain in the Attack deck.");
check(BLOODIED_ATTACK_CARDS.filter((card) => card.category === "criticalHit").length === 15, "Bloodied Triumphs Attack deck must contain fifteen ordinary critical-hit cards.");
check(BLOODIED_ATTACK_CARDS.filter((card) => card.category === "spellCriticalHit").length === 15, "Bloodied Triumphs Attack deck must contain fifteen spell critical-hit cards.");
check(BLOODIED_ATTACK_CARDS.every((card) => hasBloodiedGate(card.conditions)), "Bloodied Triumphs Attack cards must use the dynamic Bloodied condition.");
check(BLOODIED_FORTITUDE_CARDS.length === 30, "Bloodied Triumphs Fortitude deck must contain thirty cards.");
check(new Set(BLOODIED_FORTITUDE_CARDS.map((card) => card.id)).size === 30, "Bloodied Triumphs Fortitude card IDs must be unique.");
check(BLOODIED_FORTITUDE_CARDS.every((card) => card.deckType === "fortitude"), "Bloodied Triumphs Fortitude cards must remain in the Fortitude deck.");
check(BLOODIED_FORTITUDE_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), "Bloodied Triumphs Fortitude cards require critical save success.");
check(BLOODIED_FORTITUDE_CARDS.every((card) => card.filters?.saveTypes?.length === 1 && card.filters.saveTypes[0] === "fortitude"), "Bloodied Triumphs Fortitude cards must require Fortitude.");
check(BLOODIED_FORTITUDE_CARDS.every((card) => hasBloodiedGate(card.conditions)), "Bloodied Triumphs Fortitude cards must use the dynamic Bloodied condition.");

check(BLOODIED_REFLEX_CARDS.length === 30, "Bloodied Triumphs Reflex deck must contain thirty cards.");
check(new Set(BLOODIED_REFLEX_CARDS.map((card) => card.id)).size === 30, "Bloodied Triumphs Reflex card IDs must be unique.");
check(BLOODIED_REFLEX_CARDS.every((card) => card.deckType === "reflex"), "Bloodied Triumphs Reflex cards must remain in the Reflex deck.");
check(BLOODIED_REFLEX_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), "Bloodied Triumphs Reflex cards require critical save success.");
check(BLOODIED_REFLEX_CARDS.every((card) => card.filters?.saveTypes?.length === 1 && card.filters.saveTypes[0] === "reflex"), "Bloodied Triumphs Reflex cards must require Reflex.");
check(BLOODIED_REFLEX_CARDS.every((card) => hasBloodiedGate(card.conditions)), "Bloodied Triumphs Reflex cards must use the dynamic Bloodied condition.");

check(BLOODIED_WILL_CARDS.length === 30, "Bloodied Triumphs Will deck must contain thirty cards.");
check(new Set(BLOODIED_WILL_CARDS.map((card) => card.id)).size === 30, "Bloodied Triumphs Will card IDs must be unique.");
check(BLOODIED_WILL_CARDS.every((card) => card.deckType === "will"), "Bloodied Triumphs Will cards must remain in the Will deck.");
check(BLOODIED_WILL_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), "Bloodied Triumphs Will cards require critical save success.");
check(BLOODIED_WILL_CARDS.every((card) => card.filters?.saveTypes?.length === 1 && card.filters.saveTypes[0] === "will"), "Bloodied Triumphs Will cards must require Will.");
check(BLOODIED_WILL_CARDS.every((card) => hasBloodiedGate(card.conditions)), "Bloodied Triumphs Will cards must use the dynamic Bloodied condition.");

check(SURROUNDED_ATTACK_CARDS.length === 30, "Surrounded, Still Standing Attack deck must contain thirty cards after three passes.");
check(new Set(SURROUNDED_ATTACK_CARDS.map((card) => card.id)).size === 30, "Surrounded Attack card IDs must be unique.");
check(SURROUNDED_ATTACK_CARDS.every((card) => card.deckType === "attack"), "Surrounded cards must remain in the Attack deck.");
check(SURROUNDED_ATTACK_CARDS.filter((card) => card.category === "criticalHit").length === 15, "Surrounded Attack deck must contain fifteen ordinary critical-hit cards.");
check(SURROUNDED_ATTACK_CARDS.filter((card) => card.category === "spellCriticalHit").length === 15, "Surrounded Attack deck must contain fifteen spell critical-hit cards.");
check(SURROUNDED_ATTACK_CARDS.every((card) => hasSurroundedGate(card.conditions)), "Surrounded Attack cards must use the dynamic Surrounded condition.");

check(SURROUNDED_FORTITUDE_CARDS.length === 30, "Surrounded, Still Standing Fortitude deck must contain thirty cards after three passes.");
check(new Set(SURROUNDED_FORTITUDE_CARDS.map((card) => card.id)).size === 30, "Surrounded Fortitude card IDs must be unique.");
check(SURROUNDED_FORTITUDE_CARDS.every((card) => card.deckType === "fortitude"), "Surrounded Fortitude cards must remain in the Fortitude deck.");
check(SURROUNDED_FORTITUDE_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), "Surrounded Fortitude cards require critical save success.");
check(SURROUNDED_FORTITUDE_CARDS.every((card) => card.filters?.saveTypes?.length === 1 && card.filters.saveTypes[0] === "fortitude"), "Surrounded Fortitude cards must require Fortitude.");
check(SURROUNDED_FORTITUDE_CARDS.every((card) => hasSurroundedGate(card.conditions)), "Surrounded Fortitude cards must use the dynamic Surrounded condition.");

check(SURROUNDED_REFLEX_CARDS.length === 30, "Surrounded, Still Standing Reflex deck must contain thirty cards after three passes.");
check(new Set(SURROUNDED_REFLEX_CARDS.map((card) => card.id)).size === 30, "Surrounded Reflex card IDs must be unique.");
check(SURROUNDED_REFLEX_CARDS.every((card) => card.deckType === "reflex"), "Surrounded Reflex cards must remain in the Reflex deck.");
check(SURROUNDED_REFLEX_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), "Surrounded Reflex cards require critical save success.");
check(SURROUNDED_REFLEX_CARDS.every((card) => card.filters?.saveTypes?.length === 1 && card.filters.saveTypes[0] === "reflex"), "Surrounded Reflex cards must require Reflex.");
check(SURROUNDED_REFLEX_CARDS.every((card) => hasSurroundedGate(card.conditions)), "Surrounded Reflex cards must use the dynamic Surrounded condition.");

check(SURROUNDED_WILL_CARDS.length === 30, "Surrounded, Still Standing Will deck must contain thirty cards after three passes.");
check(new Set(SURROUNDED_WILL_CARDS.map((card) => card.id)).size === 30, "Surrounded Will card IDs must be unique.");
check(SURROUNDED_WILL_CARDS.every((card) => card.deckType === "will"), "Surrounded Will cards must remain in the Will deck.");
check(SURROUNDED_WILL_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), "Surrounded Will cards require critical save success.");
check(SURROUNDED_WILL_CARDS.every((card) => card.filters?.saveTypes?.length === 1 && card.filters.saveTypes[0] === "will"), "Surrounded Will cards must require Will.");
check(SURROUNDED_WILL_CARDS.every((card) => hasSurroundedGate(card.conditions)), "Surrounded Will cards must use the dynamic Surrounded condition.");

check(GIANT_SLAYER_ATTACK_CARDS.length === 30, "Giant-Slayer Moments Attack must contain thirty cards after the final pass.");
check(new Set(GIANT_SLAYER_ATTACK_CARDS.map((card) => card.id)).size === 30, "Giant-Slayer Attack card IDs must be unique.");
check(GIANT_SLAYER_ATTACK_CARDS.every((card) => card.deckType === "attack"), "Giant-Slayer cards must remain in the Attack deck.");
check(GIANT_SLAYER_ATTACK_CARDS.filter((card) => card.category === "criticalHit").length === 15, "Giant-Slayer Attack must contain fifteen ordinary critical-hit cards after the final pass.");
check(GIANT_SLAYER_ATTACK_CARDS.filter((card) => card.category === "spellCriticalHit").length === 15, "Giant-Slayer Attack must contain fifteen spell critical-hit cards after the final pass.");
check(GIANT_SLAYER_ATTACK_CARDS.every((card) => hasGiantSlayerGate(card.conditions)), "Giant-Slayer Attack cards must use the dynamic Giant-Slayer condition.");
check(GIANT_SLAYER_FORTITUDE_CARDS.length === 30, "Giant-Slayer Moments Fortitude must contain thirty cards after the final pass.");
check(new Set(GIANT_SLAYER_FORTITUDE_CARDS.map((card) => card.id)).size === 30, "Giant-Slayer Fortitude card IDs must be unique.");
check(GIANT_SLAYER_FORTITUDE_CARDS.every((card) => card.deckType === "fortitude"), "Giant-Slayer Fortitude cards must remain in the Fortitude deck.");
check(GIANT_SLAYER_FORTITUDE_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), "Giant-Slayer Fortitude cards require critical save success.");
check(GIANT_SLAYER_FORTITUDE_CARDS.every((card) => card.filters?.saveTypes?.length === 1 && card.filters.saveTypes[0] === "fortitude"), "Giant-Slayer Fortitude cards must require Fortitude.");
check(GIANT_SLAYER_FORTITUDE_CARDS.every((card) => hasGiantSlayerGate(card.conditions)), "Giant-Slayer Fortitude cards must use the dynamic Giant-Slayer condition.");
check(GIANT_SLAYER_REFLEX_CARDS.length === 30, "Giant-Slayer Moments Reflex must contain thirty cards after the final pass.");
check(new Set(GIANT_SLAYER_REFLEX_CARDS.map((card) => card.id)).size === 30, "Giant-Slayer Reflex card IDs must be unique.");
check(GIANT_SLAYER_REFLEX_CARDS.every((card) => card.deckType === "reflex"), "Giant-Slayer Reflex cards must remain in the Reflex deck.");
check(GIANT_SLAYER_REFLEX_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), "Giant-Slayer Reflex cards require critical save success.");
check(GIANT_SLAYER_REFLEX_CARDS.every((card) => card.filters?.saveTypes?.length === 1 && card.filters.saveTypes[0] === "reflex"), "Giant-Slayer Reflex cards must require Reflex.");
check(GIANT_SLAYER_REFLEX_CARDS.every((card) => hasGiantSlayerGate(card.conditions)), "Giant-Slayer Reflex cards must use the dynamic Giant-Slayer condition.");
check(GIANT_SLAYER_WILL_CARDS.length === 30, "Giant-Slayer Moments Will must contain thirty cards after the final pass.");
check(new Set(GIANT_SLAYER_WILL_CARDS.map((card) => card.id)).size === 30, "Giant-Slayer Will card IDs must be unique.");
check(GIANT_SLAYER_WILL_CARDS.every((card) => card.deckType === "will"), "Giant-Slayer Will cards must remain in the Will deck.");
check(GIANT_SLAYER_WILL_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), "Giant-Slayer Will cards require critical save success.");
check(GIANT_SLAYER_WILL_CARDS.every((card) => card.filters?.saveTypes?.length === 1 && card.filters.saveTypes[0] === "will"), "Giant-Slayer Will cards must require Will.");
check(GIANT_SLAYER_WILL_CARDS.every((card) => hasGiantSlayerGate(card.conditions)), "Giant-Slayer Will cards must use the dynamic Giant-Slayer condition.");
const giantFinalDecks = [GIANT_SLAYER_ATTACK_CARDS, GIANT_SLAYER_FORTITUDE_CARDS, GIANT_SLAYER_REFLEX_CARDS, GIANT_SLAYER_WILL_CARDS];
check(giantFinalDecks.every((cards) => cards.slice(20, 30).every((card) => card.metadata?.contentBatch === 29)), "Every Giant-Slayer final-pass card must use content batch 29.");
check(giantFinalDecks.every((cards) => cards.slice(20, 30).filter((card) => card.effect).length === 8), "Every Giant-Slayer final deck must contain eight automated results.");
check(giantFinalDecks.every((cards) => cards.slice(20, 30).filter((card) => !card.effect).length === 2), "Every Giant-Slayer final deck must contain two manual results.");
check(packsSource.includes('theme.id === THEME_IDS.GIANT_SLAYER) ? "complete"'), "Giant-Slayer package metadata must be marked complete.");

check(NARROW_ESCAPE_ATTACK_CARDS.length === 10, "Narrow Escapes Attack must contain ten first-pass cards.");
check(new Set(NARROW_ESCAPE_ATTACK_CARDS.map((card) => card.id)).size === 10, "Narrow Escapes Attack card IDs must be unique.");
check(NARROW_ESCAPE_ATTACK_CARDS.every((card) => card.deckType === "attack"), "Narrow Escapes first-pass cards must remain in the Attack deck.");
check(NARROW_ESCAPE_ATTACK_CARDS.filter((card) => card.category === "criticalHit").length === 5, "Narrow Escapes Attack must contain five ordinary critical-hit cards.");
check(NARROW_ESCAPE_ATTACK_CARDS.filter((card) => card.category === "spellCriticalHit").length === 5, "Narrow Escapes Attack must contain five spell critical-hit cards.");
check(NARROW_ESCAPE_ATTACK_CARDS.every((card) => hasNarrowEscapeGate(card.conditions)), "Narrow Escapes Attack cards must use the dynamic Narrow Escape condition.");
check(NARROW_ESCAPE_ATTACK_CARDS.every((card) => card.metadata?.contentBatch === 30), "Narrow Escapes Attack first pass must use content batch 30.");
check(NARROW_ESCAPE_ATTACK_CARDS.filter((card) => card.effect).length === 9, "Narrow Escapes Attack first pass must contain nine automated results.");
check(NARROW_ESCAPE_ATTACK_CARDS.filter((card) => !card.effect).length === 1, "Narrow Escapes Attack first pass must contain one manual result.");
check(packsSource.includes('theme.id === THEME_IDS.NARROW_ESCAPE && deckType === "attack"'), "Narrow Escapes Attack cards are not wired into the pack registry.");
check(NARROW_ESCAPE_FORTITUDE_CARDS.length === 10, "Narrow Escapes Fortitude must contain ten first-pass cards.");
check(new Set(NARROW_ESCAPE_FORTITUDE_CARDS.map((card) => card.id)).size === 10, "Narrow Escapes Fortitude card IDs must be unique.");
check(NARROW_ESCAPE_FORTITUDE_CARDS.every((card) => card.deckType === "fortitude"), "Narrow Escapes Fortitude cards must remain in the Fortitude deck.");
check(NARROW_ESCAPE_FORTITUDE_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), "Narrow Escapes Fortitude cards require critical save success.");
check(NARROW_ESCAPE_FORTITUDE_CARDS.every((card) => card.filters?.saveTypes?.length === 1 && card.filters.saveTypes[0] === "fortitude"), "Narrow Escapes Fortitude cards must require Fortitude.");
check(NARROW_ESCAPE_FORTITUDE_CARDS.every((card) => hasNarrowEscapeGate(card.conditions)), "Narrow Escapes Fortitude cards must use the dynamic Narrow Escape condition.");
check(NARROW_ESCAPE_FORTITUDE_CARDS.every((card) => card.metadata?.contentBatch === 31), "Narrow Escapes Fortitude first pass must use content batch 31.");
check(NARROW_ESCAPE_FORTITUDE_CARDS.filter((card) => card.effect).length === 9, "Narrow Escapes Fortitude first pass must contain nine automated results.");
check(NARROW_ESCAPE_FORTITUDE_CARDS.filter((card) => !card.effect).length === 1, "Narrow Escapes Fortitude first pass must contain one manual result.");
check(packsSource.includes('theme.id === THEME_IDS.NARROW_ESCAPE && deckType === "fortitude"'), "Narrow Escapes Fortitude cards are not wired into the pack registry.");
check(NARROW_ESCAPE_REFLEX_CARDS.length === 10, "Narrow Escapes Reflex must contain ten first-pass cards.");
check(new Set(NARROW_ESCAPE_REFLEX_CARDS.map((card) => card.id)).size === 10, "Narrow Escapes Reflex card IDs must be unique.");
check(NARROW_ESCAPE_REFLEX_CARDS.every((card) => card.deckType === "reflex"), "Narrow Escapes Reflex cards must remain in the Reflex deck.");
check(NARROW_ESCAPE_REFLEX_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), "Narrow Escapes Reflex cards require critical save success.");
check(NARROW_ESCAPE_REFLEX_CARDS.every((card) => card.filters?.saveTypes?.length === 1 && card.filters.saveTypes[0] === "reflex"), "Narrow Escapes Reflex cards must require Reflex.");
check(NARROW_ESCAPE_REFLEX_CARDS.every((card) => hasNarrowEscapeGate(card.conditions)), "Narrow Escapes Reflex cards must use the dynamic Narrow Escape condition.");
check(NARROW_ESCAPE_REFLEX_CARDS.every((card) => card.metadata?.contentBatch === 32), "Narrow Escapes Reflex first pass must use content batch 32.");
check(NARROW_ESCAPE_REFLEX_CARDS.filter((card) => card.effect).length === 9, "Narrow Escapes Reflex first pass must contain nine automated results.");
check(NARROW_ESCAPE_REFLEX_CARDS.filter((card) => !card.effect).length === 1, "Narrow Escapes Reflex first pass must contain one manual result.");
check(packsSource.includes('theme.id === THEME_IDS.NARROW_ESCAPE && deckType === "reflex"'), "Narrow Escapes Reflex cards are not wired into the pack registry.");
check(NARROW_ESCAPE_WILL_CARDS.length === 10, "Narrow Escapes Will must contain ten first-pass cards.");
check(new Set(NARROW_ESCAPE_WILL_CARDS.map((card) => card.id)).size === 10, "Narrow Escapes Will card IDs must be unique.");
check(NARROW_ESCAPE_WILL_CARDS.every((card) => card.deckType === "will"), "Narrow Escapes Will cards must remain in the Will deck.");
check(NARROW_ESCAPE_WILL_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), "Narrow Escapes Will cards require critical save success.");
check(NARROW_ESCAPE_WILL_CARDS.every((card) => card.filters?.saveTypes?.length === 1 && card.filters.saveTypes[0] === "will"), "Narrow Escapes Will cards must require Will.");
check(NARROW_ESCAPE_WILL_CARDS.every((card) => hasNarrowEscapeGate(card.conditions)), "Narrow Escapes Will cards must use the dynamic Narrow Escape condition.");
check(NARROW_ESCAPE_WILL_CARDS.every((card) => card.metadata?.contentBatch === 33), "Narrow Escapes Will first pass must use content batch 33.");
check(NARROW_ESCAPE_WILL_CARDS.filter((card) => card.effect).length === 9, "Narrow Escapes Will first pass must contain nine automated results.");
check(NARROW_ESCAPE_WILL_CARDS.filter((card) => !card.effect).length === 1, "Narrow Escapes Will first pass must contain one manual result.");
check(packsSource.includes('theme.id === THEME_IDS.NARROW_ESCAPE && deckType === "will"'), "Narrow Escapes Will cards are not wired into the pack registry.");

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

function hasSurroundedGate(tree) {
  if (!tree || typeof tree !== "object") return false;
  if ((tree.type === "condition" || tree.field) && tree.field === "extensions.againstAllOdds.surrounded.matched") {
    return tree.operator === "eq" && tree.value === true;
  }
  return (tree.conditions ?? []).some((child) => hasSurroundedGate(child));
}


function hasGiantSlayerGate(tree) {
  if (!tree || typeof tree !== "object") return false;
  if ((tree.type === "condition" || tree.field) && tree.field === "extensions.againstAllOdds.giantSlayer.matched") {
    return tree.operator === "eq" && tree.value === true;
  }
  return (tree.conditions ?? []).some((child) => hasGiantSlayerGate(child));
}

function hasNarrowEscapeGate(tree) {
  if (!tree || typeof tree !== "object") return false;
  if ((tree.type === "condition" || tree.field) && tree.field === "extensions.againstAllOdds.narrowEscape.matched") {
    return tree.operator === "eq" && tree.value === true;
  }
  return (tree.conditions ?? []).some((child) => hasNarrowEscapeGate(child));
}

function hasBloodiedGate(tree) {
  if (!tree || typeof tree !== "object") return false;
  if ((tree.type === "condition" || tree.field) && tree.field === "extensions.againstAllOdds.bloodied.matched") {
    return tree.operator === "eq" && tree.value === true;
  }
  return (tree.conditions ?? []).some((child) => hasBloodiedGate(child));
}

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
