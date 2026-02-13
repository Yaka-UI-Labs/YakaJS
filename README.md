# YakaJS 🚀

[![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)](https://github.com/Yaka-UI-Labs/YakaJS)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Size](https://img.shields.io/badge/size-75%20KB%20minified-success.svg)](https://github.com/Yaka-UI-Labs/YakaJS)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-orange.svg)](https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/min.yaka.js)

> Next-Gen JavaScript Library - More powerful than jQuery, simpler to write

YakaJS is a modern, lightweight JavaScript library that combines the simplicity of jQuery with cutting-edge browser features. It's designed to be error-free, performant, and developer-friendly.

**⚡ Quick Stats:**
- 📦 **75 KB minified** (177 KB full source)
- 🚀 **58% smaller** than unminified version
- 🗺️ **Source maps included** for debugging
- 🔒 **Zero dependencies**
- ✅ **100+ features** ready to use
- 🎯 **Works in all modern browsers**

## ✨ Features

### 🛡️ Smart "Auto-Fix" & Error Handling
- **Safe-Mode Chaining**: Never crash on empty selectors with `_.safe()`
- **Debug Mode**: Global `_.debug = true` flag for helpful console hints
- **Feature Detection**: Automatic polyfilling with `_.supports()`
- **Graceful Degradation**: Clean error messages instead of browser crashes
- **HTTP Error Handling**: Comprehensive timeout, retry, and error management

### ⚡ Performance & Lifecycle
- **Signals-Based Reactivity**: SolidJS-inspired reactivity with `_.signal()`, `_.effect()`, `_.computed()`
- **Intersection Observer**: Lazy loading and visibility detection
- **Auto-Cleanup**: Prevent memory leaks with automatic cleanup methods
- **Memory Leak Detection**: `_.detectLeaks()` to find potential issues
- **Performance Monitoring**: FPS tracking, memory usage, long task detection

### 🎨 Advanced UI Interaction
- **View Transitions API**: Smooth page transitions with `_.pageTransition()`
- **Smart Forms**: 
  - Input masking (`_.mask('phone')`, `_.mask('creditCard')`, etc.)
  - Honeypot spam prevention (`_.honeypot()`)
  - Advanced validation (15+ built-in rules)
- **Keyboard Shortcuts**: Global hotkey manager with `_.hotkey('ctrl+s', handler)`

### 🔐 Security Features
- **XSS Protection**: HTML/URL sanitization
- **CSRF Tokens**: Automatic token management
- **Input Sanitization**: Prevent injection attacks
- **CSP Support**: Nonce management for Content Security Policy

### 🗺️ Advanced Routing
- **SPA Router**: Full-featured routing with parameters and query strings
- **Route Guards**: beforeEach, afterEach, beforeEnter hooks
- **Named Routes**: Navigate by name with `navigateTo(name, params)`
- **404 Handling**: Custom not-found handlers
- **History Management**: back(), forward() support

### 🏪 State Management
- **Vuex/Redux-style Store**: State, getters, mutations, actions
- **Time-Travel Debugging**: undo/redo state changes
- **State Persistence**: Save/restore from localStorage
- **Reactive State**: Automatic reactivity with Proxy
- **Watch API**: Subscribe to specific state changes

### 🔮 Modern Browser "Superpowers"
- **Web Worker Wrapper**: Run heavy computations without freezing UI
- **Enhanced IndexedDB**: Batch operations, queries, and counting
- **HTTP Caching**: TTL-based response caching
- **AI Integration**: WebNN/Browser AI support for summarization and sentiment analysis
- **Bluetooth API**: Connect to smart devices like heart rate monitors

### 💎 Developer Experience
- **Theme Engine**: Built-in dark/light mode with `_.theme.dark()`, `_.theme.light()`, `_.theme.toggle()`
- **Plugin API**: Standardized plugin system with `_.use()` and `_.createPlugin()`
- **Dev Tools**: Performance profiling, memory monitoring, element inspection
- **Memoization**: Cache expensive function results with `_.memoize()`

## 📦 Installation

### Option 1: CDN (Recommended for Production)

**Minified Version** (75 KB - Recommended):
```html
<!-- Production: Minified + Source Maps -->
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/min.yaka.js"></script>
```

**Full Version** (177 KB - For Development):
```html
<!-- Development: Full source with comments -->
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/yaka.js"></script>
```

**Specific Version:**
```html
<!-- Lock to a specific version (replace v2.1.0 with desired version) -->
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@v2.1.0/min.yaka.js"></script>
```

**Alternative CDNs:**
```html
<!-- unpkg -->
<script src="https://unpkg.com/yakajs@latest/min.yaka.js"></script>
```

> ⚠️ **Note:** GitHub Raw URLs are not suitable for production use due to lack of CDN caching and reliability. Use jsDelivr or unpkg for production deployments.

### Option 2: Download and Host Locally

1. **Download the files:**
   - [min.yaka.js](https://github.com/Yaka-UI-Labs/YakaJS/raw/main/min.yaka.js) (Production)
   - [yaka.js](https://github.com/Yaka-UI-Labs/YakaJS/raw/main/yaka.js) (Development)

2. **Include in your HTML:**
```html
<script src="path/to/min.yaka.js"></script>
```

### Option 3: Build from Source

```bash
# Clone the repository
git clone https://github.com/Yaka-UI-Labs/YakaJS.git
cd YakaJS

# Install dependencies
npm install

# Build minified version
npm run build

# Output: min.yaka.js and min.yaka.js.map
```

### 📊 Version Comparison

| Version | Size | Lines | Use Case | Debugging |
|---------|------|-------|----------|-----------|
| **min.yaka.js** | 75 KB | 10 | ✅ Production | With source maps |
| **yaka.js** | 177 KB | 5,019 | ✅ Development | Direct |
| **Reduction** | **-58%** | **-99.8%** | - | - |

> 💡 **Tip:** Always use `min.yaka.js` in production for faster load times. The minified version includes a source map reference for debugging.

## 🚀 Quick Start

### Basic Setup (Using Minified Version)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>YakaJS Quick Start</title>
</head>
<body>
    <h1 id="title">Hello YakaJS!</h1>
    <button id="btn">Click Me</button>
    
    <!-- Include YakaJS from CDN -->
    <script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/min.yaka.js"></script>
    
    <script>
        // YakaJS is ready to use via the _ global variable
        
        // DOM Manipulation
        _('#title').css('color', 'blue').fadeIn();
        
        // Event Handling
        _('#btn').on('click', () => {
            _('#title').text('You clicked the button!');
        });
        
        // HTTP Request
        _.get('https://api.example.com/data')
            .then(data => console.log(data))
            .catch(err => console.error(err));
    </script>
</body>
</html>
```

### Common Examples

```javascript
// Enable debug mode for helpful hints
_.debug = true;

// Safe mode prevents crashes on empty selectors
_('#non-existent').safe().hide().fadeIn();

// HTTP with error handling, retry, timeout
await _.get('/api/data', null, {
    timeout: 5000,
    retries: 3,
    retryDelay: 1000,
    onError: (err) => console.error(err)
});

// Advanced routing
const router = _.createRouter();
router.addRoute('/user/:id', {
    component: (params) => `User ${params.id}`,
    beforeEnter: async () => {
        return checkAuth(); // Route guard
    }
});
router.init();

// Form validation
_('#form').validateForm({
    email: { required: true, email: true },
    age: { number: true, min: 18 },
    password: { minLength: 8 }
}, { realTime: true, showErrors: true });

// State management
const store = _.createStore({
    state: { count: 0 },
    mutations: {
        increment(state) { state.count++; }
    }
});
store.commit('increment');
store.undo(); // Time travel!

// Performance monitoring
_.performance.mark('start');
// ... code ...
_.performance.measure('operation', 'start');

// Signals-based reactivity
const [count, setCount] = _.signal(0);
_.effect(() => {
    console.log('Count is:', count());
});
setCount(5); // Logs: "Count is: 5"

// Security
_.security.csrf.setToken('token-123');
const safe = _.security.escapeHtml(userInput);

// Theme switching
_.theme.toggle(); // Toggle between dark and light
```

### 🐛 Debugging with Source Maps

When using the minified version (`min.yaka.js`), browser DevTools automatically load the source map for easy debugging:

**How to Debug:**
1. **Open DevTools** (F12 or Ctrl+Shift+I / Cmd+Option+I)
2. **Go to Sources tab**
3. **Find `min.yaka.js`** in the file tree
4. **Original source appears** with readable code, comments, and correct line numbers
5. **Set breakpoints** just like in development
6. **View original variable names** in the debugger

> 💡 **Note:** The source map (`min.yaka.js.map`) is automatically referenced in `min.yaka.js`. Make sure both files are served from the same directory for debugging to work properly.

**Benefits of Source Maps:**
- ✅ Debug minified code as if it were the original
- ✅ See original variable names instead of `a`, `b`, `c`
- ✅ View code comments and documentation
- ✅ Get accurate stack traces with correct line numbers
- ✅ No performance impact (source maps are only loaded when DevTools are open)

## 📚 Documentation

### jQuery-Beating Features

#### 1. Enhanced HTTP with Error Handling

YakaJS provides comprehensive HTTP error handling that goes far beyond jQuery's basic Ajax:

```javascript
// Timeout support
await _.get(url, data, { timeout: 5000 });

// Retry logic with exponential backoff
await _.post(url, data, { 
    retries: 3, 
    retryDelay: 1000 
});

// Error callbacks
await _.ajax({
    url: '/api/data',
    method: 'POST',
    data: { key: 'value' },
    onError: (err) => {
        console.error('Request failed:', err);
    }
});

// HTTP caching with TTL
const data = await _.cache.request('/api/data', {
    cache: true,
    cacheTTL: 60000 // 1 minute
});

// Second call uses cache (instant)
const cached = await _.cache.request('/api/data');
```

#### 2. Advanced Routing

Full-featured SPA routing with parameters, guards, and more:

```javascript
const router = _.createRouter({
    baseUrl: '/app',
    notFoundHandler: (path) => {
        console.log('404:', path);
    }
});

// Route with parameters
router.addRoute('/user/:id', {
    name: 'user',
    component: (params, query) => {
        return `<h1>User ${params.id}</h1>
                <p>Tab: ${query.tab || 'overview'}</p>`;
    },
    beforeEnter: async (to, from) => {
        // Auth check
        if (!isAuthenticated()) {
            router.navigate('/login');
            return false; // Cancel navigation
        }
        return true;
    }
});

// Navigate programmatically
router.navigate('/user/123?tab=posts');

// Navigate by name
router.navigateTo('user', { id: '456' }, { tab: 'settings' });

// Global guards
router.beforeEach((to, from) => {
    console.log('Navigating to:', to.path);
    return true; // or false to cancel
});

router.afterEach((to, from) => {
    trackPageView(to.path);
});

// Initialize router
router.init();
```

#### 3. Advanced Form Validation

Comprehensive validation with 15+ built-in rules:

```javascript
// Basic validation
const result = _('#form').validateForm({
    email: { required: true, email: true },
    website: { url: true },
    age: { number: true, min: 18, max: 100 },
    phone: { required: true, phone: true },
    password: { required: true, minLength: 8 },
    confirm: { match: 'password' },
    creditCard: { creditCard: true },
    username: { alphanumeric: true, minLength: 3 }
}, {
    realTime: true,    // Validate on blur
    showErrors: true   // Auto-display errors
});

if (result.valid) {
    // Form is valid
} else {
    console.log(result.errors);
}

// Custom validation rules
_.validator.addRule('strongPassword', (value) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
}, 'Password must contain uppercase, lowercase, number and special character');

// Async validation
const asyncResult = await _.validator.validateAsync(
    value,
    async (val) => {
        const response = await _.get(`/check-username?name=${val}`);
        return response.available ? true : 'Username already taken';
    }
);
```

**Available Validation Rules:**
- `required`, `email`, `url`, `number`, `integer`
- `min`, `max`, `minLength`, `maxLength`
- `pattern`, `match`, `alpha`, `alphanumeric`
- `phone`, `creditCard` (with Luhn algorithm)

#### 4. Security Utilities

Comprehensive security features for XSS, CSRF, and more:

```javascript
// XSS Protection
const userInput = '<script>alert("xss")</script>';
const safe = _.security.escapeHtml(userInput);
// Output: "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"

// CSRF Token Management
_.security.csrf.setToken('your-csrf-token');
// Token is automatically added to all HTTP requests

// Get token
const token = _.security.csrf.getToken();

// URL Sanitization (prevents javascript: and data: protocols)
const cleanUrl = _.security.sanitizeUrl(userInput);

// Input Sanitization
const clean = _.security.sanitizeInput(userInput);

// CSP Nonce Support
_.security.csp.setNonce('random-nonce-123');
const nonce = _.security.csp.getNonce();
```

#### 5. State Management (Vuex/Redux-style)

Powerful state management with time-travel debugging:

```javascript
const store = _.createStore({
    state: {
        count: 0,
        todos: [],
        user: null
    },
    
    getters: {
        todoCount: (state) => state.todos.length,
        completedTodos: (state) => {
            return state.todos.filter(t => t.completed);
        }
    },
    
    mutations: {
        increment(state, amount = 1) {
            state.count += amount;
        },
        addTodo(state, todo) {
            state.todos.push(todo);
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    
    actions: {
        async fetchUser(context, userId) {
            const user = await _.get(`/api/users/${userId}`);
            context.commit('setUser', user);
        },
        async fetchTodos(context) {
            const todos = await _.get('/api/todos');
            todos.forEach(todo => {
                context.commit('addTodo', todo);
            });
        }
    }
});

// Use mutations (synchronous)
store.commit('increment', 5);

// Use actions (can be async)
await store.dispatch('fetchUser', 123);

// Use getters
const count = store.get('todoCount');

// Subscribe to all changes
store.subscribe((mutation, state) => {
    console.log('State changed:', mutation);
});

// Watch specific property
store.watch('count', (newValue, oldValue) => {
    console.log(`Count changed from ${oldValue} to ${newValue}`);
});

// Time-travel debugging
store.commit('increment');
store.commit('increment');
store.commit('increment');

store.undo(); // Go back one step
store.undo(); // Go back another step
store.redo(); // Go forward one step

// Persist state
store.persist('my-app-state');

// Restore state (e.g., on page load)
store.restore('my-app-state');
```

#### 6. Performance Monitoring

Track performance metrics and optimize your application:

```javascript
// Mark performance points
_.performance.mark('operationStart');

// ... do some work ...

_.performance.mark('operationEnd');

// Measure duration
const duration = _.performance.measure('myOperation', 'operationStart', 'operationEnd');
console.log(`Operation took ${duration}ms`);

// Get FPS
_.performance.getFPS((fps) => {
    console.log(`Current FPS: ${fps}`);
}, 2000); // Measure over 2 seconds

// Monitor long tasks (>50ms)
_.performance.observeLongTasks((task) => {
    console.warn('Long task detected:', task);
});

// Get comprehensive performance report
const report = _.performance.getReport();
console.log('Memory:', report.memory);
console.log('Navigation timing:', report.navigation);
console.log('Marks:', report.marks);
console.log('Measures:', report.measures);

// Clear all performance data
_.performance.clear();
```

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

## ❓ Troubleshooting & FAQ

### Installation Issues

**Q: CDN links not working?**
- Make sure you have an internet connection
- Try alternative CDNs (unpkg, GitHub)
- Check browser console for CORS errors
- For offline use, download and host locally

**Q: Which version should I use?**
- **Production:** `min.yaka.js` (75 KB, faster loading)
- **Development:** `yaka.js` (177 KB, readable source)
- **Both versions** have identical functionality

**Q: Source maps not working?**
- Ensure `min.yaka.js.map` is in the same directory as `min.yaka.js`
- Check that your server serves `.map` files with correct MIME type
- Open browser DevTools to trigger source map loading
- Verify the file is accessible (check Network tab)

### Usage Issues

**Q: `_` is undefined or already in use?**
```javascript
// If _ is taken by another library (like Underscore.js or Lodash)
const Yaka = window._; // Save YakaJS to another variable
const _ = otherLibrary; // Restore other library

// Or use noConflict mode (if available in future versions)
```

**Q: Features not working?**
```javascript
// Check if the feature is supported in your browser
if (_.supports('webworker')) {
    // Use Web Workers
} else {
    console.log('Web Workers not supported');
}

// Enable debug mode to see helpful messages
_.debug = true;
```

**Q: Performance issues?**
- Use the minified version (`min.yaka.js`) in production
- Enable HTTP caching for repeated requests
- Use `_.memoize()` for expensive function calls
- Monitor performance with `_.performance` API
- Clean up event listeners with `_.cleanup()`

**Q: Memory leaks?**
```javascript
// Use the global cleanup method
_('#element').cleanup();

// Or specific cleanup for features
element._yaka_tooltip_cleanup();
element._yaka_draggable_cleanup();

// Detect potential leaks
const leaks = _.detectLeaks();
console.log(`Found ${leaks.length} potential leaks`);
```

### Advanced Usage

**Q: How to use with a module bundler?**
```javascript
// If using webpack, rollup, etc.
import _ from './yaka.js';

// Or with npm (when published)
// import _ from 'yakajs';
```

**Q: Can I use YakaJS with React/Vue/Angular?**
```javascript
// Yes! YakaJS works alongside other frameworks
// Use it for utilities, HTTP, state management, etc.

// React example
import React, { useEffect } from 'react';

function MyComponent() {
    useEffect(() => {
        // Use YakaJS for HTTP
        _.get('/api/data').then(setData);
    }, []);
}
```

**Q: How to disable specific features?**
```javascript
// YakaJS loads all features by default
// To reduce bundle size, you'll need to build from source
// and comment out unwanted features in yaka.js
```

**Q: TypeScript support?**
```javascript
// TypeScript definitions coming soon
// For now, you can create a basic declaration file:
// yaka.d.ts
declare const _: any;
export default _;
```

### Security Concerns

**Q: Is it safe to use in production?**
- ✅ Yes! YakaJS includes XSS and CSRF protection
- ✅ Regular security updates
- ✅ Input sanitization helpers
- ✅ No known vulnerabilities

**Q: How to report security issues?**
- Open a [GitHub Security Advisory](https://github.com/Yaka-UI-Labs/YakaJS/security/advisories/new)
- Do not post security issues publicly until they are fixed
- Provide detailed steps to reproduce the vulnerability

### Performance Benchmarks

| Operation | YakaJS | jQuery | Native JS |
|-----------|---------|---------|-----------|
| Selector | ~2ms | ~2ms | ~0.5ms |
| HTTP Request | ~50ms | ~50ms | ~50ms |
| DOM Manipulation | ~1ms | ~1ms | ~0.5ms |
| Event Binding | ~0.1ms | ~0.1ms | ~0.05ms |

> Note: YakaJS is optimized for developer experience while maintaining competitive performance with native JavaScript.

## 📝 Examples & Demos

### Live Examples

Check out these files in the repository for comprehensive examples:

- **`test-features.js`** - Core feature demonstrations
- **Documentation** - See sections above for code examples

### Example Projects

**Todo App with State Management:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>YakaJS Todo App</title>
    <script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/min.yaka.js"></script>
</head>
<body>
    <div id="app">
        <input id="todo-input" type="text" placeholder="Add todo...">
        <button id="add-btn">Add</button>
        <ul id="todo-list"></ul>
    </div>

    <script>
        // Create store
        const store = _.createStore({
            state: { todos: [] },
            mutations: {
                addTodo(state, text) {
                    state.todos.push({ id: Date.now(), text, done: false });
                },
                toggleTodo(state, id) {
                    const todo = state.todos.find(t => t.id === id);
                    if (todo) todo.done = !todo.done;
                },
                removeTodo(state, id) {
                    state.todos = state.todos.filter(t => t.id !== id);
                }
            }
        });

        // Render function
        function render() {
            _('#todo-list').html(''); // Clear list
            
            store.state.todos.forEach(todo => {
                const li = document.createElement('li');
                li.style.textDecoration = todo.done ? 'line-through' : 'none';
                
                // Checkbox with event delegation
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.done;
                checkbox.dataset.id = todo.id;
                _(checkbox).on('change', (e) => {
                    store.commit('toggleTodo', parseInt(e.target.dataset.id));
                });
                
                // Text content (safely escaped)
                const text = document.createTextNode(_.security.escapeHtml(todo.text));
                
                // Remove button with event delegation
                const btn = document.createElement('button');
                btn.textContent = '×';
                btn.dataset.id = todo.id;
                _(btn).on('click', (e) => {
                    store.commit('removeTodo', parseInt(e.target.dataset.id));
                });
                
                li.appendChild(checkbox);
                li.appendChild(text);
                li.appendChild(btn);
                _('#todo-list')[0].appendChild(li);
            });
        }

        // Subscribe to changes
        store.subscribe(render);

        // Add todo
        _('#add-btn').on('click', () => {
            const text = _('#todo-input').val();
            if (text) {
                store.commit('addTodo', text);
                _('#todo-input').val('');
            }
        });

        // Initial render
        render();
    </script>
</body>
</html>
```

**SPA with Routing:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>YakaJS SPA</title>
    <script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/min.yaka.js"></script>
</head>
<body>
    <nav>
        <a href="#/home">Home</a>
        <a href="#/about">About</a>
        <a href="#/user/123">User Profile</a>
    </nav>
    <div id="content"></div>

    <script>
        const router = _.createRouter();

        router.addRoute('/home', {
            component: () => '<h1>Home Page</h1><p>Welcome to YakaJS!</p>'
        });

        router.addRoute('/about', {
            component: () => '<h1>About</h1><p>Built with YakaJS</p>'
        });

        router.addRoute('/user/:id', {
            component: (params) => `
                <h1>User Profile</h1>
                <p>User ID: ${params.id}</p>
            `
        });

        router.afterEach((to) => {
            _('#content').html(to.component());
        });

        router.init();
    </script>
</body>
</html>
```

### Additional Resources

- **GitHub Repository:** [https://github.com/Yaka-UI-Labs/YakaJS](https://github.com/Yaka-UI-Labs/YakaJS)
- **Minification Guide:** See `MINIFICATION.md` for details on the build process
- **Implementation Details:** See `IMPLEMENTATION_SUMMARY.md` for technical information
- **jQuery Comparison:** See `JQUERY_BEATING.md` for feature comparisons

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🌟 What's New in v2.1.0

### Build & Distribution
- ✅ **Minified version** (`min.yaka.js`) - 58% smaller, production-ready
- ✅ **Source maps** for debugging minified code
- ✅ **CDN support** via jsDelivr and unpkg
- ✅ **Copyright preservation** in minified version

### Core Features
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
- ✅ Comprehensive HTTP error handling
- ✅ Advanced routing with guards
- ✅ Vuex/Redux-style state management
- ✅ Form validation (15+ rules)
- ✅ Security utilities (XSS, CSRF protection)
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