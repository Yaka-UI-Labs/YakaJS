# YakaJS 🚀

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/Yaka-UI-Labs/YakaJS)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> Next-Gen JavaScript Library - More powerful than jQuery, simpler to write

YakaJS is a modern, lightweight JavaScript library that combines the simplicity of jQuery with cutting-edge browser features. It's designed to be error-free, performant, and developer-friendly.

## ✨ Features

### 🛡️ Smart "Auto-Fix" & Error Handling
- **Safe-Mode Chaining**: Never crash on empty selectors with `_.safe()`
- **Debug Mode**: Global `_.debug = true` flag for helpful console hints
- **Feature Detection**: Automatic polyfilling with `_.supports()`
- **Graceful Degradation**: Clean error messages instead of browser crashes

### ⚡ Performance & Lifecycle
- **Signals-Based Reactivity**: SolidJS-inspired reactivity with `_.signal()`, `_.effect()`, `_.computed()`
- **Intersection Observer**: Lazy loading and visibility detection
- **Auto-Cleanup**: Prevent memory leaks with automatic cleanup methods
- **Memory Leak Detection**: `_.detectLeaks()` to find potential issues

### 🎨 Advanced UI Interaction
- **View Transitions API**: Smooth page transitions with `_.pageTransition()`
- **Smart Forms**: 
  - Input masking (`_.mask('phone')`, `_.mask('creditCard')`, etc.)
  - Honeypot spam prevention (`_.honeypot()`)
- **Keyboard Shortcuts**: Global hotkey manager with `_.hotkey('ctrl+s', handler)`

### 🔮 Modern Browser "Superpowers"
- **Web Worker Wrapper**: Run heavy computations without freezing UI
- **Enhanced IndexedDB**: Batch operations, queries, and counting
- **AI Integration**: WebNN/Browser AI support for summarization and sentiment analysis
- **Bluetooth API**: Connect to smart devices like heart rate monitors

### 💎 Developer Experience
- **Theme Engine**: Built-in dark/light mode with `_.theme.dark()`, `_.theme.light()`, `_.theme.toggle()`
- **Plugin API**: Standardized plugin system with `_.use()` and `_.createPlugin()`
- **Dev Tools**: Performance profiling, memory monitoring, element inspection
- **Memoization**: Cache expensive function results with `_.memoize()`

## 📦 Installation

```html
<!-- Include from CDN (coming soon) -->
<script src="yaka.js"></script>

<!-- Or download and include locally -->
<script src="path/to/yaka.js"></script>
```

## 🚀 Quick Start

```javascript
// Enable debug mode for helpful hints
_.debug = true;

// Safe mode prevents crashes on empty selectors
_('#non-existent').safe().hide().fadeIn();

// Signals-based reactivity
const [count, setCount] = _.signal(0);
_.effect(() => {
    console.log('Count is:', count());
});
setCount(5); // Logs: "Count is: 5"

// Input masking
_('#phone').mask('phone'); // Auto-formats phone numbers

// Keyboard shortcuts
_.hotkey('ctrl+s', (e) => {
    // Handle save action
});

// Web Worker for heavy computation
_.worker((data) => {
    // Heavy computation here
    return data.map(x => x * 2);
}, [1, 2, 3, 4, 5]).then(result => {
    console.log(result); // [2, 4, 6, 8, 10]
});

// Theme switching
_.theme.toggle(); // Toggle between dark and light
_.theme.onChange((theme) => {
    console.log('Theme changed to:', theme);
});
```

## 📚 Documentation

### Phase 1: Error Handling & Safety

#### Safe Mode
```javascript
// Prevents crashes on empty selectors
_('#maybe-exists').safe().hide().css('color', 'red').fadeIn();
```

#### Debug Mode
```javascript
_.debug = true; // Enable debug logging
_._log('info', 'Custom message', { data: 'value' });
```

#### Feature Detection
```javascript
if (_.supports('webworker')) {
    // Use Web Workers
}

if (_.supports('bluetooth')) {
    // Use Bluetooth API
}
```

### Phase 2: Reactivity & Performance

#### Signals
```javascript
const [count, setCount] = _.signal(0);

// Auto-updates when count changes
_.effect(() => {
    document.title = `Count: ${count()}`;
});

setCount(count() + 1);
```

#### Computed Values
```javascript
const [first, setFirst] = _.signal('John');
const [last, setLast] = _.signal('Doe');

const fullName = _.computed(() => `${first()} ${last()}`);

console.log(fullName()); // "John Doe"
```

#### Memory Leak Detection
```javascript
const leaks = _.detectLeaks();
console.log(`Found ${leaks.length} potential leaks`);
```

### Phase 3: UI Interactions

#### Input Masking
```javascript
// Phone: (123) 456-7890
_('#phone').mask('phone');

// Credit Card: 1234 5678 9012 3456
_('#card').mask('creditCard');

// Date: 12/31/2024
_('#date').mask('date');

// SSN: 123-45-6789
_('#ssn').mask('ssn');

// Custom mask
_('#custom').mask({
    pattern: '##-##-##',
    placeholder: '_',
    filter: /[0-9]/
});
```

#### Honeypot Spam Prevention
```javascript
_('#my-form').honeypot({
    name: 'website', // Honeypot field name
    onSpam: (e) => {
        console.log('Spam detected!');
    }
});
```

#### Keyboard Shortcuts
```javascript
// Register a hotkey
const hotkey = _.hotkey('ctrl+s', (e) => {
    console.log('Save triggered!');
}, { preventDefault: true });

// Remove hotkey
hotkey.remove();

// Or by combo
_.removeHotkey('ctrl+s');
```

#### Page Transitions
```javascript
_.pageTransition('/next-page.html', {
    target: '#content',
    beforeTransition: async () => {
        // Run before transition
    },
    afterTransition: async () => {
        // Run after transition
    }
});
```

### Phase 4: Modern Browser Features

#### Web Workers
```javascript
// Run heavy computation in background thread
_.worker((data) => {
    // Expensive operation
    return data.map(x => x * x);
}, [1, 2, 3, 4, 5]).then(result => {
    console.log(result); // [1, 4, 9, 16, 25]
});
```

#### Enhanced IndexedDB
```javascript
// Batch save
await _.db.saveMany('users', [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 }
]);

// Query with filter
const adults = await _.db.query('users', user => user.age >= 18);

// Count records
const total = await _.db.count('users');
```

#### AI Integration
```javascript
// Check availability
if (_.ai.isAvailable()) {
    // Summarize text
    const summary = await _.ai.summarize(longText);
    
    // Analyze sentiment
    const sentiment = await _.ai.analyzeSentiment('I love this!');
    console.log(sentiment); // "positive"
    
    // Translate
    const translated = await _.ai.translate('Hello', 'es');
}
```

#### Bluetooth
```javascript
// Connect to heart rate monitor
const connection = await _.bluetooth.heartRateMonitor((bpm) => {
    console.log(`Heart rate: ${bpm} BPM`);
});

// Generic Bluetooth connection
const device = await _.bluetooth.connect({
    filters: [{ services: ['battery_service'] }]
});
```

### Phase 5: Developer Experience

#### Theme Engine
```javascript
// Toggle theme
_.theme.toggle();

// Set specific theme
_.theme.dark();
_.theme.light();

// Listen for theme changes
_.theme.onChange((theme) => {
    console.log(`Theme is now: ${theme}`);
});

// Current theme
console.log(_.theme.current); // 'dark' or 'light'
```

#### Plugin System
```javascript
// Create a plugin
const myPlugin = _.createPlugin('myFeature', {
    methods: {
        highlight: function() {
            return this.each((i, elem) => {
                elem.style.background = 'yellow';
            });
        }
    },
    statics: {
        greet: (name) => `Hello, ${name}!`
    },
    init: (Yaka) => {
        console.log('Plugin initialized!');
    }
});

// Register plugin
_.use('myFeature', myPlugin);

// Use plugin
_('#element').highlight();
console.log(_.greet('World'));
```

#### Memoization
```javascript
const expensiveFn = _.memoize((n) => {
    // Expensive computation
    return n * n;
});

expensiveFn(5); // Computed
expensiveFn(5); // Cached, instant
```

#### Dev Tools
```javascript
// Profile function execution
_.dev.profile('my-operation', () => {
    // Code to profile
});

// Check memory usage
_.dev.memory();

// Inspect element
_.dev.inspect('#my-element');

// List plugins
_.dev.plugins();

// List hotkeys
_.dev.hotkeys();
```

## 🎯 Browser Support

YakaJS works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

Advanced features (AI, Bluetooth, View Transitions) require newer browsers and may need experimental flags enabled.

## 📝 Examples

See `test-advanced-features.html` for a comprehensive interactive demo of all features.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🌟 What's New in v2.0.0

- ✅ Safe-mode chaining to prevent crashes
- ✅ Signals-based reactivity system
- ✅ Smart form features (masking, honeypot)
- ✅ Keyboard shortcuts manager
- ✅ Web Worker wrapper
- ✅ AI integration (WebNN/Browser AI)
- ✅ Enhanced IndexedDB API
- ✅ Theme engine with dark/light modes
- ✅ Improved plugin system
- ✅ Developer tools and utilities
- ✅ Bluetooth API support
- ✅ Memory leak detection
- ✅ And much more!

## 🔥 Coming Soon

- Server-side rendering support
- React/Vue integration
- TypeScript definitions
- CLI tool for scaffolding
- Component library
- More plugins and extensions

---

Made with ❤️ by Yaka UI Labs