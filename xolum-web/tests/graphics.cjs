const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../lib/graphics/capabilities.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
let probes = 0;
const sandbox = { exports: {}, window: { innerWidth: 1280, innerHeight: 800, devicePixelRatio: 2, matchMedia: () => ({ matches: false }) }, navigator: { hardwareConcurrency: 8, deviceMemory: 8 }, document: { createElement: () => ({ getContext: () => { probes++; return { getExtension: () => ({ loseContext() {} }) }; } }) } };
vm.runInNewContext(compiled, sandbox);
const { determineInitialTier, evaluateDeviceSignals, TIER_CONFIGS } = sandbox.exports;
const base = evaluateDeviceSignals();
for (let i = 0; i < 20; i++) evaluateDeviceSignals();
assert.equal(probes, 1, 'WebGL capability is cached across consumers and resizes');
for (const patch of [{ width: 375 }, { reducedMotion: true }, { saveData: true }, { slowNet: true }, { webglVersion: 1 }, { webglVersion: 0 }]) {
  assert.equal(determineInitialTier({ ...base, ...patch }), 'STATIC');
}
assert.equal(determineInitialTier({ ...base, width: 768 }), 'LOW');
assert.equal(determineInitialTier({ ...base, memory: 4 }), 'MEDIUM');
assert.equal(determineInitialTier(base), 'ULTRA');
for (const c of Object.values(TIER_CONFIGS)) assert.ok(c.minDpr <= c.maxDpr);
console.log('Graphics: cached probe, device matrix, reduced motion and DPR bounds passed.');
