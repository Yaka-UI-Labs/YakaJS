#!/usr/bin/env node

/**
 * Basic test suite for YakaJS advanced features
 * Tests features that don't require a browser environment
 */

console.log('🧪 YakaJS Advanced Features Test Suite\n');

// Simulate browser globals
global.window = global;

// Mock localStorage
const localStorageMock = {
    _data: {},
    getItem(key) { return this._data[key] || null; },
    setItem(key, value) { this._data[key] = String(value); },
    removeItem(key) { delete this._data[key]; },
    clear() { this._data = {}; }
};

global.localStorage = localStorageMock;
global.document = {
    readyState: 'complete',
    createElement: () => ({ 
        style: {},
        setAttribute: () => {},
        appendChild: () => {} 
    }),
    documentElement: {
        style: {
            setProperty: () => {}
        },
        setAttribute: () => {}
    },
    head: { appendChild: () => {} },
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {}
};
global.navigator = {
    userAgent: 'Node.js Test Environment'
};
global.matchMedia = () => ({
    matches: false,
    addEventListener: () => {}
});

// Load YakaJS
const fs = require('fs');
const vm = require('vm');

try {
    const code = fs.readFileSync('./yaka.js', 'utf8');
    vm.runInThisContext(code);
    
    console.log('✅ YakaJS loaded successfully\n');
} catch (error) {
    console.error('❌ Failed to load YakaJS:', error.message);
    process.exit(1);
}

// Test counter
let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`✅ ${name}`);
        passed++;
    } catch (error) {
        console.log(`❌ ${name}`);
        console.log(`   Error: ${error.message}`);
        failed++;
    }
}

console.log('📋 Phase 1: Error Handling & Safety\n');

test('Debug mode can be enabled', () => {
    _.debug = true;
    if (_.debug !== true) throw new Error('Debug mode not set');
});

test('Feature detection exists', () => {
    if (typeof _.supports !== 'function') throw new Error('_.supports() not found');
    const result = _.supports('webworker');
    if (typeof result !== 'boolean') throw new Error('_.supports() should return boolean');
});

test('Safe mode exists', () => {
    const instance = _('#non-existent');
    if (typeof instance.safe !== 'function') throw new Error('.safe() not found');
});

test('Logger utility exists', () => {
    if (typeof _._log !== 'function') throw new Error('_._log() not found');
});

console.log('\n⚡ Phase 2: Reactivity & Performance\n');

test('Signal creation', () => {
    if (typeof _.signal !== 'function') throw new Error('_.signal() not found');
    const [value, setValue] = _.signal(0);
    if (typeof value !== 'function') throw new Error('Signal getter should be a function');
    if (typeof setValue !== 'function') throw new Error('Signal setter should be a function');
});

test('Signal reactivity', () => {
    const [count, setCount] = _.signal(0);
    if (count() !== 0) throw new Error('Initial value incorrect');
    setCount(5);
    if (count() !== 5) throw new Error('Signal value not updated');
});

test('Effect creation', () => {
    if (typeof _.effect !== 'function') throw new Error('_.effect() not found');
    let called = false;
    _.effect(() => { called = true; });
    if (!called) throw new Error('Effect not executed');
});

test('Computed values', () => {
    if (typeof _.computed !== 'function') throw new Error('_.computed() not found');
    const [a] = _.signal(2);
    const double = _.computed(() => a() * 2);
    if (typeof double !== 'function') throw new Error('Computed should return a function');
});

test('Memory leak detector exists', () => {
    if (typeof _.detectLeaks !== 'function') throw new Error('_.detectLeaks() not found');
});

console.log('\n🎨 Phase 3: UI Interactions\n');

test('Hotkey registration', () => {
    if (typeof _.hotkey !== 'function') throw new Error('_.hotkey() not found');
});

test('Hotkey removal', () => {
    if (typeof _.removeHotkey !== 'function') throw new Error('_.removeHotkey() not found');
});

test('Page transition exists', () => {
    if (typeof _.pageTransition !== 'function') throw new Error('_.pageTransition() not found');
});

console.log('\n🔮 Phase 4: Modern Browser Features\n');

test('Web Worker wrapper', () => {
    if (typeof _.worker !== 'function') throw new Error('_.worker() not found');
});

test('AI integration object', () => {
    if (typeof _.ai !== 'object') throw new Error('_.ai not found');
    if (typeof _.ai.isAvailable !== 'function') throw new Error('_.ai.isAvailable() not found');
    if (typeof _.ai.summarize !== 'function') throw new Error('_.ai.summarize() not found');
    if (typeof _.ai.analyzeSentiment !== 'function') throw new Error('_.ai.analyzeSentiment() not found');
});

test('Bluetooth wrapper', () => {
    if (typeof _.bluetooth !== 'object') throw new Error('_.bluetooth not found');
    if (typeof _.bluetooth.isAvailable !== 'function') throw new Error('_.bluetooth.isAvailable() not found');
    if (typeof _.bluetooth.connect !== 'function') throw new Error('_.bluetooth.connect() not found');
});

console.log('\n💎 Phase 5: Developer Experience\n');

test('Theme engine', () => {
    if (typeof _.theme !== 'object') throw new Error('_.theme not found');
    if (typeof _.theme.dark !== 'function') throw new Error('_.theme.dark() not found');
    if (typeof _.theme.light !== 'function') throw new Error('_.theme.light() not found');
    if (typeof _.theme.toggle !== 'function') throw new Error('_.theme.toggle() not found');
});

test('Plugin system', () => {
    if (typeof _.use !== 'function') throw new Error('_.use() not found');
    if (typeof _.createPlugin !== 'function') throw new Error('_.createPlugin() not found');
    if (typeof _.plugins !== 'object') throw new Error('_.plugins not found');
});

test('Memoization', () => {
    if (typeof _.memoize !== 'function') throw new Error('_.memoize() not found');
    
    let callCount = 0;
    const fn = _.memoize((x) => {
        callCount++;
        return x * 2;
    });
    
    fn(5);
    fn(5);
    
    if (callCount !== 1) throw new Error('Memoization not working (should cache result)');
});

test('Dev tools', () => {
    if (typeof _.dev !== 'object') throw new Error('_.dev not found');
    if (typeof _.dev.profile !== 'function') throw new Error('_.dev.profile() not found');
    if (typeof _.dev.memory !== 'function') throw new Error('_.dev.memory() not found');
    if (typeof _.dev.inspect !== 'function') throw new Error('_.dev.inspect() not found');
});

console.log('\n📊 Test Results\n');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%\n`);

if (failed > 0) {
    console.log('⚠️  Some tests failed. Please review the errors above.');
    process.exit(1);
} else {
    console.log('🎉 All tests passed! YakaJS is ready to use.');
    process.exit(0);
}
