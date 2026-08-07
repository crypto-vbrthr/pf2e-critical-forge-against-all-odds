import test from "node:test";
import assert from "node:assert/strict";
import { createAgainstAllOddsContextProvider } from "../scripts/context/provider.js";
import { createConditionProvider, createDiagnosticProvider } from "../scripts/providers.js";
import { coreReport } from "./fixtures.js";

test("the context provider explicitly delegates to core-pf2e before enrichment", () => {
  const calls = [];
  const forge = {
    cards: {
      contexts: {
        resolve(input, options) {
          calls.push({ input, options });
          return coreReport();
        }
      }
    }
  };
  const provider = createAgainstAllOddsContextProvider(forge, {
    settingsReader: () => ({ bloodiedThreshold: 0.5, surroundedThreshold: 2, giantSlayerThreshold: 3, narrowEscapeThreshold: 3 })
  });
  const report = provider.createContext({ message: { id: "m1" } }, { trace: true });
  assert.equal(provider.priority, 100);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].options.providerId, "core-pf2e");
  assert.equal(calls[0].options.trace, true);
  assert.equal(report.snapshot.extensions.againstAllOdds.rollKind, "reflex");
});

test("the condition provider publishes unique typed editor fields", () => {
  const provider = createConditionProvider();
  const paths = provider.fields.map((field) => field.path);
  assert.equal(new Set(paths).size, paths.length);
  assert.equal(paths.every((path) => path.startsWith("extensions.againstAllOdds.")), true);
  assert.equal(provider.fields.find((field) => field.path.endsWith("rollKind")).type, "enum");
  assert.deepEqual(provider.fields.find((field) => field.path.endsWith("rollKind")).values, ["attack", "fortitude", "reflex", "will", "unknown"]);
  assert.equal(provider.fields.find((field) => field.path.endsWith("surrounded.opponentIsThreatening")).type, "boolean");
  assert.equal(provider.fields.find((field) => field.path.endsWith("surrounded.opponentThreatEvaluation")).type, "string");
  assert.equal(provider.fields.find((field) => field.path.endsWith("giantSlayer.opponentIsThreatening")).type, "boolean");
  assert.equal(provider.fields.find((field) => field.path.endsWith("giantSlayer.opponentSize")).type, "enum");
  assert.deepEqual(provider.fields.find((field) => field.path.endsWith("giantSlayer.opponentSize")).values, ["tiny", "sm", "med", "lg", "huge", "grg"]);
  assert.equal(provider.fields.find((field) => field.path.endsWith("giantSlayer.sizeGap")).type, "number");
  assert.equal(provider.fields.find((field) => field.path.endsWith("giantSlayer.opponentIsLarger")).type, "boolean");
  assert.equal(provider.version, "1.2.0");
});

test("the diagnostic provider returns metrics or an explicit unavailable state", () => {
  const provider = createDiagnosticProvider();
  const absent = provider.inspect({ snapshot: {} });
  assert.deepEqual(absent, { available: false, reason: "context-not-resolved" });
  const present = provider.inspect({ snapshot: { extensions: { againstAllOdds: { bloodied: { matched: true } } } } });
  assert.equal(present.available, true);
  assert.equal(present.metrics.bloodied.matched, true);
  assert.doesNotThrow(() => JSON.stringify(present));
});
