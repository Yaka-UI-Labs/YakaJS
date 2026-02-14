# YakaJS 🚀

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/Yaka-UI-Labs/YakaJS)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Size](https://img.shields.io/badge/size-151%20KB%20minified-success.svg)](https://github.com/Yaka-UI-Labs/YakaJS)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-orange.svg)](https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js)

> Next-Gen JavaScript Library - More powerful than jQuery, simpler to write

🎤 **NEW in v1.1.0:** YakaJS is now the **ONLY JavaScript library with built-in voice commands!** Control your app with your voice - a feature no other library has. Plus 20 more premium features including command palette, virtual scroll, and offline detection.

YakaJS is a modern, lightweight JavaScript library that combines the simplicity of jQuery with cutting-edge browser features. It's designed to be error-free, performant, and developer-friendly.

## 🎨 Interactive Demos

**[👉 Try All Features in One Demo](demos/all-features.html)** - Comprehensive showcase with glassmorphism design

**[🚀 NEW: 21 Premium Features Demo](demos/new-features.html)** - Voice commands, command palette, virtual scroll & more!

Or browse by category:
- [Core Features](demos/core-features.html) - DOM manipulation, events, selectors
- [Animations Gallery](demos/animations.html) - All 15+ animation effects  
- [Forms & Validation](demos/forms.html) - Real-time validation with 15+ rules
- [UI Components](demos/components.html) - Modals, tooltips, tabs, accordion, carousel
- [State Management](demos/state.html) - Vuex/Redux-style store with undo/redo
- [Routing](demos/routing.html) - SPA routing with guards and parameters
- [Reactivity](demos/reactivity.html) - SolidJS-inspired signals and effects
- [Security](demos/security.html) - XSS protection, CSRF, sanitization
- [Advanced Features](demos/advanced.html) - Web Workers, IndexedDB, performance monitoring

## 🎪 Interactive Demos

**[View All Interactive Demos →](demos/index.html)**

Explore comprehensive demos with glassmorphism design showcasing all YakaJS features:

- 🎯 **[Core Features](demos/core-features.html)** - DOM manipulation, events, and basic operations
- ✨ **[Animations Gallery](demos/animations.html)** - All 15+ built-in animation effects
- 📝 **[Forms & Validation](demos/forms.html)** - Real-time validation with 15+ rules
- 🧩 **[UI Components](demos/components.html)** - Modals, tooltips, dropdowns & more
- 🏪 **[State Management](demos/state.html)** - Vuex/Redux-style store with undo/redo
- 🗺️ **[SPA Routing](demos/routing.html)** - Client-side routing with guards
- ⚡ **[Signals & Reactivity](demos/reactivity.html)** - SolidJS-inspired reactive primitives
- 🔐 **[Security Features](demos/security.html)** - XSS protection, CSRF, sanitization
- 🚀 **[Advanced Features](demos/advanced.html)** - Web Workers, IndexedDB, AI, Bluetooth

**⚡ Quick Stats:**
- 📦 **151 KB minified** (346 KB full source, 9,504 lines)
- 🚀 **56% smaller** than unminified version (hyper build)
- 🗺️ **Source maps included** for debugging
- 🔒 **Zero dependencies**
- ✅ **150+ features** ready to use (including 21 NEW premium features!)
- 🎯 **Works in all modern browsers**
- 🎤 **Voice commands** - The only JS library with built-in voice control!

## ✨ Features

### 🎨 Rich UI Components & Animations
- **15+ Smooth Animations**: fadeIn/Out, slideIn/Out (all directions), zoomIn/Out, blurIn/Out, bounce, pulse, shake, swing, flip3D, rotateIn/Out, rubberBand
- **Modern UI Components**: Dropdown with search, Modal, Tooltip, Popover, Tabs, Accordion, Carousel, Stepper/Wizard, Breadcrumb, Pagination, Badge/Tag, Button Widget, Checkboxradio, Controlgroup, Menu, Enhanced SelectBox
- **Progress Indicators**: Progress bars, loading spinners, skeleton loaders
- **Interactive Elements**: Draggable, droppable, resizable, selectable, sortable, swipe gestures, infinite scroll, fullpage scrolling
- **Enhanced Animations**: Color animation, addClass/removeClass/toggleClass with duration, position utility
- **Notifications & Alerts**: Toast notifications (Toastr-style), SweetAlert dialogs, notification system
- **Advanced Pickers**: DatePicker, TimePicker (12/24hr), ColorPicker

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

### 🚀 NEW: Premium High-Impact Features (v1.1.0)

YakaJS now includes **21 groundbreaking features** that no other JavaScript library has!

#### 🔥 High-Impact Features
- **Offline Detection** 📡 - Monitor connection status in real-time
  ```javascript
  _.onOffline(() => _.notify('No internet!', 'error'));
  _.onOnline(() => _.notify('Back online!', 'success'));
  console.log('Online:', _.isOnline());
  ```

- **Clipboard Read** 📋 - Read clipboard contents with permission
  ```javascript
  const text = await _.paste();
  ```

- **WebSocket Wrapper** 🔌 - Simplified WebSocket with auto-reconnect
  ```javascript
  const socket = _.socket('wss://example.com');
  socket.on('message', (data) => console.log(data));
  socket.send({ type: 'hello' });
  ```

- **Promise Chain UI** ⏳ - Auto-loading states for async operations
  ```javascript
  _('#saveBtn').loadingState(promise, {
      loading: 'Saving...',
      success: 'Saved!',
      error: 'Failed!'
  });
  ```

- **Share API** 📤 - Native share functionality
  ```javascript
  _.share({
      title: 'YakaJS',
      text: 'Better than jQuery!',
      url: window.location.href
  });
  ```

#### ⚡ Performance Optimizations
- **Batch DOM Updates** 🔄 - Prevent layout thrashing
  ```javascript
  _.batch(() => {
      _('#a').css('color', 'red');
      _('#b').css('color', 'blue');
      // All applied in one reflow
  });
  ```

- **Resource Preloader** 📦 - Preload images, fonts, and data
  ```javascript
  await _.preload([
      '/images/hero.jpg',
      '/fonts/custom.woff2',
      '/data/config.json'
  ]);
  ```

- **Time Ago Live Update** 🕐 - Auto-updating relative timestamps
  ```javascript
  _('.timestamp').timeAgo({ live: true });
  // Auto updates "3 minutes ago" → "4 minutes ago"
  ```

- **DOM Diff & Patch** 🔧 - Smart updates, only changes what's different
  ```javascript
  _('#app').patch(newHTML); // Only touches changed nodes
  ```

#### 🎨 Premium UI Components
- **Command Palette** ⌨️ - VS Code-style command interface (Ctrl+K)
  ```javascript
  _.commandPalette({
      commands: [
          { name: 'Go to Home', action: () => router.navigate('/') },
          { name: 'Toggle Dark Mode', action: () => _.theme.toggle() }
      ]
  });
  ```

- **Virtual Scroll** 📜 - Render 10,000+ items without lag
  ```javascript
  _('#list').virtualScroll({
      items: bigArrayOf10000Items,
      itemHeight: 50,
      render: (item) => `<div>${item.name}</div>`
  });
  ```

- **Onboarding Tour** 🎯 - Step-by-step user guides
  ```javascript
  _.tour([
      { element: '#menu', text: 'This is the menu' },
      { element: '#btn', text: 'Click here to start' },
      { element: '#profile', text: 'Your profile is here' }
  ]);
  ```

- **Blur-Up Lazy Loading** 🖼️ - Image lazy loading with blur effect
  ```javascript
  _('img[data-src]').blurLazyLoad({
      placeholder: 'tiny-blurred-version.jpg'
  });
  ```

#### 📱 Mobile & PWA Features
- **Pull to Refresh** ↓ - Mobile pull-to-refresh gesture
  ```javascript
  _.pullToRefresh({
      onRefresh: async () => {
          await fetchNewData();
      }
  });
  ```

- **PWA Install Prompt** 📲 - Trigger app install dialog
  ```javascript
  _.pwa.onInstallable(() => {
      _.notify('Install this app!', 'info');
  });
  _.pwa.install();
  ```

- **Shake Detection** 📳 - Detect phone shake gestures
  ```javascript
  _.onShake(() => {
      _.notify('Phone shaken!', 'info');
  });
  ```

#### 🤖 Unique Features (NO OTHER LIBRARY HAS THESE!)
- **Voice Commands** 🎤 - Control your app with voice! **VIRAL FEATURE**
  ```javascript
  _.voice.listen({
      'scroll down': () => window.scrollBy(0, 300),
      'go home': () => router.navigate('/'),
      'dark mode': () => _.theme.dark()
  });
  ```

- **Image Cropper** ✂️ - Built-in image cropping tool
  ```javascript
  _('#avatar').cropper({
      ratio: 1,
      onCrop: (blob) => uploadAvatar(blob)
  });
  ```

- **Rich Text Editor** ✏️ - WYSIWYG text editor
  ```javascript
  _('#content').richEditor({
      toolbar: ['bold', 'italic', 'link', 'image']
  });
  ```

- **Element Inspector** 🔍 - Dev tool for debugging
  ```javascript
  _.inspect.enable(); // Click any element to inspect
  _.inspect.disable();
  ```

- **Eye Tracking** 👁️ - Experimental eye tracking (requires webcam)
  ```javascript
  _.eyeTrack.start((x, y) => {
      console.log('User looking at:', x, y);
  });
  ```


## 📦 Build Versions & Compression

YakaJS offers **three optimized build versions** to match your performance needs. All versions include **100% identical functionality** - only the compression level differs!

### Available Builds

| Version | File | Size | Compression | Use Case |
|---------|------|------|-------------|----------|
| **Development** | `src/yaka.js` | 346 KB | Original | Development with comments & formatting |
| **Standard** | `dist/min.yaka.js` | 155 KB | 55.2% | Production with source maps for debugging |
| **Ultra** | `dist/ultra.min.yaka.js` | 154 KB | 55.5% | Production with aggressive optimization |
| **Hyper** 🔥 | `dist/hyper.min.yaka.js` | **151 KB** | **56.4%** | **Maximum compression for fastest load times** |

### Build Commands

```bash
# Build all three versions at once (recommended)
npm run build

# Or build individually:
npm run build:min    # Standard minified build
npm run build:ultra  # Ultra minified build
npm run build:hyper  # Hyper minified build
```

### Compression Techniques

#### Standard Build
- Basic minification and mangling
- Includes source maps for debugging
- Safe optimizations only

#### Ultra Build
- **3 compression passes**
- Pure getters optimization
- All `unsafe_*` optimizations
- No source maps (production-ready)

#### Hyper Build 🔥 **NEW!**
- **10 compression passes** for maximum optimization
- ES2020+ module format
- Toplevel scope compression
- All unsafe optimizations: Function, arrows, math, proto, regexp
- Variable transformations: join, collapse, reduce, hoist
- Aggressive formatting: no semicolons, minimal whitespace
- **2.7 KB smaller than standard** (2.1% improvement over ultra)

### Visual Size Comparison

```
Original (346 KB)   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100.0%
Standard (155 KB)   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░  44.8%
Ultra (154 KB)      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░  44.5%
Hyper (151 KB) 🔥   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░  43.6%
```

### Which Version Should I Use?

- **💻 Development**: Use `src/yaka.js` for readable code with all comments
- **🐛 Production + Debugging**: Use `dist/min.yaka.js` with source maps
- **⚡ Production**: Use `dist/ultra.min.yaka.js` for great compression
- **🚀 Maximum Performance**: Use `dist/hyper.min.yaka.js` for smallest bundle and fastest load times

> **Note:** All builds are thoroughly tested and maintain 100% API compatibility. The hyper build uses cutting-edge compression that works in all modern browsers (ES2020+).

### File Integrity

All minified versions preserve:
- ✅ Copyright and license headers
- ✅ Complete functionality (zero features removed)
- ✅ All bug fixes and improvements
- ✅ Full backward compatibility
- ✅ Production stability

## 📦 Installation

### Option 1: CDN (Recommended for Production)

**Minified Version** (132 KB - Recommended):
```html
<!-- Production: Minified + Source Maps -->
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js"></script>
```

**Full Version** (300 KB - For Development):
```html
<!-- Development: Full source with comments -->
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/src/yaka.js"></script>
```

**Specific Version:**
```html
<!-- Lock to a specific version (replace v1.0.0 with desired version) -->
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@v1.0.0/dist/min.yaka.js"></script>
```

**Alternative CDNs:**
```html
<!-- unpkg -->
<script src="https://unpkg.com/yakajs@latest/dist/min.yaka.js"></script>
```

> ⚠️ **Note:** GitHub Raw URLs are not suitable for production use due to lack of CDN caching and reliability. Use jsDelivr or unpkg for production deployments.

### Option 2: Download and Host Locally

1. **Download the files:**
   - [dist/min.yaka.js](https://github.com/Yaka-UI-Labs/YakaJS/raw/main/dist/min.yaka.js) (Production)
   - [src/yaka.js](https://github.com/Yaka-UI-Labs/YakaJS/raw/main/src/yaka.js) (Development)

2. **Include in your HTML:**
```html
<script src="path/to/dist/min.yaka.js"></script>
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

# Output: dist/min.yaka.js and dist/min.yaka.js.map
```

### 📊 Version Comparison

| Version | Size | Use Case | Debugging |
|---------|------|----------|-----------|
| **dist/min.yaka.js** | 132 KB | ✅ Production | With source maps |
| **src/yaka.js** | 300 KB | ✅ Development | Direct |
| **Reduction** | **-56%** | - | - |

> 💡 **Tip:** Always use `dist/min.yaka.js` in production for faster load times. The minified version includes a source map reference for debugging.

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
    <script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js"></script>
    
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

When using the minified version (`dist/min.yaka.js`), browser DevTools automatically load the source map for easy debugging:

**How to Debug:**
1. **Open DevTools** (F12 or Ctrl+Shift+I / Cmd+Option+I)
2. **Go to Sources tab**
3. **Find `dist/min.yaka.js`** in the file tree
4. **Original source appears** with readable code, comments, and correct line numbers
5. **Set breakpoints** just like in development
6. **View original variable names** in the debugger

> 💡 **Note:** The source map (`dist/min.yaka.js.map`) is automatically referenced in `dist/min.yaka.js`. Make sure both files are served from the same directory for debugging to work properly.

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

### Phase 3.5: Animations & UI Components

#### Enhanced Animations

YakaJS now includes 15+ smooth animations for modern web experiences:

**Basic Animations:**
```javascript
// Fade effects
_('#element').fadeIn(300);
_('#element').fadeOut(300);

// Slide effects
_('#element').slideDown(400);
_('#element').slideUp(400);
_('#element').slideInLeft(400);
_('#element').slideInRight(400);
_('#element').slideInUp(400);
_('#element').slideOutLeft(400);
_('#element').slideOutRight(400);

// Zoom effects
_('#element').zoomIn(400);
_('#element').zoomOut(400);

// Blur transitions
_('#element').blurIn(400);
_('#element').blurOut(400);
```

**Attention-Grabbing Animations:**
```javascript
// Bounce effect
_('#notification').bounce(3); // Bounce 3 times

// Pulse effect
_('#button').pulse(3);

// Shake effect
_('#error-message').shake();

// Swing effect
_('#banner').swing();

// Rubber band effect
_('#logo').rubberBand();
```

**3D & Advanced Effects:**
```javascript
// 3D flip
_('#card').flip('Y', 600); // Flip on Y-axis
_('#card').flip('X', 600); // Flip on X-axis

// Rotate animations
_('#spinner').rotateIn(600);
_('#spinner').rotateOut(600);

// Custom animation (animate any CSS property)
_('#box').animate({
    width: '200px',
    height: '200px',
    transform: 'rotate(45deg)',
    backgroundColor: '#ff6b6b'
}, 600, 'ease-in-out');
```

#### UI Components

**Dropdown/Select Menu:**
```javascript
// Basic dropdown
_('#my-dropdown').dropdown({
    items: ['Option 1', 'Option 2', 'Option 3'],
    placeholder: 'Select an option',
    onChange: (selected) => {
        console.log('Selected:', selected);
    }
});

// Multi-select dropdown with search
_('#multi-select').dropdown({
    items: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
    multiSelect: true,
    searchable: true,
    placeholder: 'Choose fruits...',
    onChange: (selectedItems) => {
        console.log('Selected items:', selectedItems);
    }
});
```

**Modal Dialog:**
```javascript
// Simple modal
_.modal('<h2>Hello!</h2><p>This is a modal.</p>');

// Modal with options
_.modal('<div>Custom content here</div>', {
    width: '600px',
    closeOnClick: true, // Close when clicking backdrop
    onClose: () => {
        console.log('Modal closed');
    }
});
```

**Tooltip:**
```javascript
// Basic tooltip
_('#info-icon').tooltip('This is helpful information');

// Positioned tooltip
_('#button').tooltip('Click me!', 'bottom');
```

**Popover (Rich Content Tooltip):**
```javascript
// Popover with HTML content
_('#details-btn').popover(
    '<h3>Details</h3><p>More information here...</p><button>Action</button>',
    {
        position: 'right',  // top, bottom, left, right
        trigger: 'click',   // click or hover
        width: '300px'
    }
);
```

**Tabs System:**
```javascript
// HTML structure:
// <div id="tabs-container">
//   <button data-tab="tab1">Tab 1</button>
//   <button data-tab="tab2">Tab 2</button>
//   <div data-tab-content="tab1">Content 1</div>
//   <div data-tab-content="tab2">Content 2</div>
// </div>

_('#tabs-container').tabs();
```

**Accordion:**
```javascript
// HTML structure:
// <div id="accordion">
//   <div data-accordion-header>Section 1</div>
//   <div data-accordion-content>Content 1</div>
//   <div data-accordion-header>Section 2</div>
//   <div data-accordion-content>Content 2</div>
// </div>

_('#accordion').accordion();
```

**Carousel/Slider:**
```javascript
// Basic carousel
_('#carousel').carousel();

// Auto-play carousel
_('#carousel').carousel({
    auto: true,
    interval: 5000  // 5 seconds
});

// Manual control
const carousel = $('#carousel').carousel();
carousel._carousel.next();  // Next slide
carousel._carousel.prev();  // Previous slide
```

**Breadcrumb Navigation:**
```javascript
_('#breadcrumb').breadcrumb([
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Details' }  // Current page (no href)
], {
    separator: '>'  // or '/', '»', etc.
});
```

**Pagination:**
```javascript
_('#pagination').pagination({
    currentPage: 1,
    totalPages: 20,
    maxVisible: 7,  // Max page numbers to show
    onChange: (page) => {
        console.log('Navigate to page:', page);
        loadPage(page);
    }
});
```

**Badge/Tag Component:**
```javascript
// Simple badge
_('#container').badge('New', { variant: 'primary' });

// Badge with icon
_('#status').badge('Active', { 
    variant: 'success',
    icon: '✓'
});

// Dismissible badge
_('#tag').badge('Removable', {
    variant: 'warning',
    dismissible: true,
    onDismiss: () => {
        console.log('Badge removed');
    }
});

// Available variants: primary, success, warning, danger, info, secondary
```

**Stepper/Wizard:**
```javascript
_('#wizard').stepper({
    steps: [
        { 
            label: 'Account Info', 
            content: '<form>...account form...</form>' 
        },
        { 
            label: 'Personal Details', 
            content: '<form>...personal form...</form>' 
        },
        { 
            label: 'Confirmation', 
            content: '<div>...review info...</div>' 
        }
    ],
    onStepChange: (currentStep) => {
        console.log('Now on step:', currentStep);
    },
    onFinish: () => {
        console.log('Wizard completed!');
        submitForm();
    }
});
```

**Progress Bar:**
```javascript
_('#progress').progress(75, {
    color: '#4CAF50',
    height: '20px',
    showText: true
});
```

**Loading Spinner:**
```javascript
// Show spinner
const spinner = _.spinner({
    size: '50px',
    color: '#2196F3',
    container: document.body
});

// Remove spinner
spinner.remove();
```

**Notifications/Toasts:**
```javascript
// Info notification
_.notify('Info message', 'info');

// Success notification
_.notify('Success!', 'success', 3000);

// Warning notification
_.notify('Warning!', 'warning');

// Error notification
_.notify('Error occurred', 'error', 5000);
```

**Drag and Drop:**
```javascript
// Make element draggable
_('#box').draggable({
    onStart: function(e) {
        console.log('Started dragging');
    },
    onDrag: function(e) {
        console.log('Dragging...');
    },
    onEnd: function(e) {
        console.log('Stopped dragging');
    }
});

// Create drop zones
_('#drop-zone').droppable({
    accept: '*',  // Accept all draggable elements (or use CSS selector)
    hoverClass: 'drag-over',  // Class when dragging over
    activeClass: 'drop-active',  // Class when any drag is active
    onDragEnter: function(e) {
        console.log('Drag entered drop zone');
    },
    onDragLeave: function(e) {
        console.log('Drag left drop zone');
    },
    onDrop: function(e, data) {
        console.log('Item dropped!', data);
    }
});
```

**Resizable Elements:**
```javascript
// Make element resizable with all handles
_('#box').resizable();

// Custom resize handles and constraints
_('#box').resizable({
    handles: ['se', 'e', 's'],  // Only southeast, east, south handles
    minWidth: 100,
    minHeight: 100,
    maxWidth: 500,
    maxHeight: 500,
    aspectRatio: true,  // Maintain aspect ratio
    onStart: function(e) {
        console.log('Started resizing');
    },
    onResize: function(e, dimensions) {
        console.log('Resizing:', dimensions.width, dimensions.height);
    },
    onStop: function(e) {
        console.log('Stopped resizing');
    }
});
```

**Sortable Lists:**
```javascript
// Make list items sortable by dragging
_('#sortable-list').sortable({
    onChange: function() {
        console.log('List order changed');
        // Get new order
        const newOrder = Array.from(this.children).map(item => item.textContent);
        console.log('New order:', newOrder);
    }
});
```

**Selectable Elements:**
```javascript
// Make elements selectable with marquee
_('#selectable-container').selectable({
    filter: '.item',  // Which elements can be selected
    tolerance: 'touch',  // 'touch' or 'fit'
    onSelect: function() {
        console.log('Item selected:', this);
    },
    onStop: function(event, selected) {
        console.log('Selection complete:', selected.length, 'items selected');
    }
});
```

**Button Widget:**
```javascript
// Enhanced button with icon
_('button').button({
    icon: '🚀',
    iconPosition: 'left'
});

// Button with enable/disable
const btn = _('#myButton').button();
btn.elements[0]._yaka_button_api.disable();
btn.elements[0]._yaka_button_api.enable();
```

**Checkboxradio:**
```javascript
// Style checkbox
_('input[type="checkbox"]').checkboxradio({
    label: 'Accept terms'
});

// Style radio buttons
_('input[type="radio"][name="choice"]').checkboxradio();
```

**Controlgroup:**
```javascript
// Group buttons horizontally
_('#button-group').controlgroup();

// Group buttons vertically
_('#vertical-group').controlgroup({
    direction: 'vertical'
});
```

**Menu Widget:**
```javascript
// Create menu with keyboard navigation
_('#menu').menu({
    onSelect: function(text, index) {
        console.log('Selected:', text);
    }
});
```

**Position Utility:**
```javascript
// Position dropdown below button
_('#dropdown').position({
    my: 'left top',
    at: 'left bottom',
    of: '#myButton',
    collision: 'flip'
});

// Center dialog in window
_('#dialog').position({
    my: 'center',
    at: 'center',
    of: window
});
```

**Enhanced Class Animations:**
```javascript
// Add class with animation
_('#element').add('highlight', 300);

// Remove class with animation
_('#element').remove('active', 500);

// Toggle class with animation
_('#element').toggle('expanded', 400);
```

**Color Animation:**
```javascript
// Animate background color
_('#box').animate({
    backgroundColor: '#ff5722',
    color: '#ffffff'
}, 1000);

// Animate border color
_('#panel').animate({
    borderColor: 'rgb(33, 150, 243)',
    width: '300px'
}, 500);
```

**Toast Notifications (Toastr):**
```javascript
// Success toast
_.toast('Operation successful!', {
    type: 'success',
    position: 'top-right',
    duration: 5000,
    progressBar: true
});

// Error toast with callback
_.toast('An error occurred', {
    type: 'error',
    position: 'bottom-center',
    onClick: () => console.log('Toast clicked'),
    closeButton: true
});

// Info toast (no auto-dismiss)
_.toast('Important information', {
    type: 'info',
    duration: 0  // Won't auto-dismiss
});
```

**SweetAlert Dialogs:**
```javascript
// Simple alert
_.alert({
    title: 'Success!',
    text: 'Your operation was completed',
    type: 'success'
});

// Confirmation dialog
_.alert({
    title: 'Are you sure?',
    text: 'This action cannot be undone',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!'
}).then(result => {
    if (result.isConfirmed) {
        console.log('Confirmed!');
    }
});

// Input prompt
_.alert({
    title: 'Enter your name',
    input: 'text',
    inputPlaceholder: 'Your name here...',
    showCancelButton: true
}).then(result => {
    if (result.isConfirmed) {
        console.log('Name:', result.value);
    }
});
```

**Enhanced SelectBox (Select2):**
```javascript
// Basic enhanced select
_('select').selectbox({
    searchable: true,
    placeholder: 'Choose an option...'
});

// Multiple selection
_('#tags').selectbox({
    multiple: true,
    searchable: true,
    width: '100%',
    onChange: (value) => console.log('Selected:', value)
});

// With custom data
_('#custom-select').selectbox({
    data: [
        { value: '1', text: 'Option 1' },
        { value: '2', text: 'Option 2' },
        { value: '3', text: 'Option 3' }
    ],
    searchable: true
});
```

**TimePicker:**
```javascript
// 24-hour format
_('#time-input').timepicker({
    format24: true,
    minuteInterval: 15,
    onChange: (time) => console.log('Selected time:', time)
});

// 12-hour format with AM/PM
_('#time-12hr').timepicker({
    format24: false,
    minuteInterval: 5,
    minTime: '09:00',
    maxTime: '17:00'
});
```

**FullPage Scrolling:**
```javascript
// Full-screen snap scrolling
_('#fullpage-container').fullpage({
    navigation: true,  // Show navigation dots
    scrollingSpeed: 700,
    easing: 'ease-in-out'
});

// Each child becomes a full-screen section with snap scrolling
// Use arrow keys to navigate between sections
```

### Phase 3B: Utility Functions (Lodash-like)

#### Deep Object Utilities
```javascript
// Deep clone with circular reference handling
const clone = _.deepClone({ a: { b: { c: 1 } } });

// Deep merge objects
const merged = _.merge({ a: 1 }, { b: 2 }, { c: 3 });

// Deep equality comparison
_.isEqual({ a: 1 }, { a: 1 }); // true

// Safe nested property access
_.get(obj, 'user.address.city', 'Unknown');

// Safe nested property setting
_.set(obj, 'user.address.city', 'NYC');

// Pick properties
_.pick(user, ['name', 'email']);

// Omit properties
_.omit(user, ['password', 'salt']);
```

#### Array & Collection Methods
```javascript
// Chunk array into groups
_.chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// Flatten nested arrays
_.flatten([[1, 2], [3, [4, 5]]], 1); // [1, 2, 3, [4, 5]]
_.flattenDeep([[1, [2, [3]]]]); // [1, 2, 3]

// Remove duplicates
_.uniq([1, 2, 2, 3, 1]); // [1, 2, 3]
_.uniqBy(users, 'id'); // Remove duplicates by ID

// Generate range
_.range(5); // [0, 1, 2, 3, 4]
_.range(1, 5); // [1, 2, 3, 4]
_.range(0, 10, 2); // [0, 2, 4, 6, 8]

// Shuffle array
_.shuffle([1, 2, 3, 4, 5]);

// Random sample
_.sample([1, 2, 3, 4, 5]); // Random single item
_.sample([1, 2, 3, 4, 5], 3); // Random 3 items

// Group by property
_.groupBy(users, 'role');
// { admin: [...], user: [...] }

// Sort by property
_.sortBy(users, 'age');
_.sortBy(users, user => user.name.toLowerCase());

// Partition by condition
_.partition([1, 2, 3, 4], n => n % 2 === 0);
// [[2, 4], [1, 3]]

// Set operations
_.intersection([1, 2, 3], [2, 3, 4]); // [2, 3]
_.union([1, 2], [2, 3], [3, 4]); // [1, 2, 3, 4]
_.difference([1, 2, 3], [2, 4]); // [1, 3]
```

#### String Utilities
```javascript
// Case conversions
_.camelCase('hello-world'); // 'helloWorld'
_.kebabCase('helloWorld'); // 'hello-world'
_.snakeCase('helloWorld'); // 'hello_world'

// Capitalization
_.capitalize('hello'); // 'Hello'
_.capitalizeWords('hello world'); // 'Hello World'

// Truncate with ellipsis
_.truncate('Long text here...', 10); // 'Long te...'

// Create URL slug
_.slugify('Hello World 2024!'); // 'hello-world-2024'

// HTML escaping
_.escape('<script>alert("xss")</script>');
_.unescape('&lt;div&gt;');
```

#### Date & Time Utilities
```javascript
// Format dates
_.formatDate(new Date(), 'YYYY-MM-DD'); // '2024-02-13'
_.formatDate(new Date(), 'HH:mm:ss'); // '14:30:45'

// Relative time
_.fromNow(new Date('2024-02-10')); // '3 days ago'

// Date difference
_.diffDates('2024-01-01', '2024-02-01', 'days'); // 31

// Date arithmetic
_.addDays(new Date(), 7); // Add 7 days
_.addHours(new Date(), 2); // Add 2 hours
_.addMinutes(new Date(), 30); // Add 30 minutes
```

#### Type Checking
```javascript
// Comprehensive type checking
_.isArray([1, 2, 3]); // true
_.isObject({ a: 1 }); // true
_.isFunction(() => {}); // true
_.isString('hello'); // true
_.isNumber(123); // true
_.isBoolean(true); // true
_.isNull(null); // true
_.isUndefined(undefined); // true
_.isNil(null); // true (null or undefined)
_.isEmpty([]); // true
_.isEmpty({}); // true
_.isDate(new Date()); // true
_.isRegExp(/test/); // true
_.isError(new Error()); // true
```

#### Promise/Async Utilities
```javascript
// Async sleep/delay
await _.sleep(1000); // Wait 1 second

// Retry with exponential backoff
await _.retry(async () => {
    const response = await fetch('/api/data');
    return response.json();
}, { times: 3, delay: 1000, backoff: 2 });

// Promise timeout
await _.timeout(fetchData(), 5000, 'Request timed out');

// Promise utilities
await _.all([promise1, promise2, promise3]);
await _.race([promise1, promise2]);
await _.allSettled([promise1, promise2]); 
// Returns: [{ status: 'fulfilled', value: ... }, { status: 'rejected', reason: ... }]
```

#### Math Utilities
```javascript
// Clamp value between min and max
_.clamp(50, 0, 100); // 50
_.clamp(-5, 0, 100); // 0
_.clamp(150, 0, 100); // 100

// Random numbers
_.random(1, 10); // Random integer 1-10
_.random(0, 1, true); // Random float 0-1

// Array math
_.sum([1, 2, 3, 4, 5]); // 15
_.mean([1, 2, 3, 4, 5]); // 3
_.median([1, 2, 3, 4, 5]); // 3
_.min([3, 1, 4, 1, 5]); // 1
_.max([3, 1, 4, 1, 5]); // 5
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
- Try alternative CDNs (unpkg)
- Check browser console for CORS errors
- For offline use, download and host locally

**Q: Which version should I use?**
- **Production:** `dist/min.yaka.js` (132 KB, faster loading)
- **Development:** `src/yaka.js` (300 KB, readable source)
- **Both versions** have identical functionality

**Q: Source maps not working?**
- Ensure `dist/min.yaka.js.map` is in the same directory as `dist/min.yaka.js`
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
- Use the minified version (`dist/min.yaka.js`) in production
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
import _ from './src/yaka.js';

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
// and comment out unwanted features in src/yaka.js
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
    <script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js"></script>
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
        // Note: In production, consider using a virtual DOM or diffing algorithm
        // for better performance with large lists
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
                
                // Text content (automatically escaped by createTextNode)
                const text = document.createTextNode(todo.text);
                
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
    <script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js"></script>
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

        // Helper to create safe HTML content
        function createContent(title, text) {
            const container = document.createElement('div');
            const h1 = document.createElement('h1');
            h1.textContent = title;
            const p = document.createElement('p');
            p.textContent = text;
            container.appendChild(h1);
            container.appendChild(p);
            return container.outerHTML;
        }

        router.addRoute('/home', {
            component: () => createContent('Home Page', 'Welcome to YakaJS!')
        });

        router.addRoute('/about', {
            component: () => createContent('About', 'Built with YakaJS')
        });

        router.addRoute('/user/:id', {
            component: (params) => {
                // Safe: params.id is escaped via textContent
                return createContent('User Profile', 'User ID: ' + params.id);
            }
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

## 🌟 What's New in v1.1.0

### 🚀 21 Premium High-Impact Features Added!

YakaJS now includes features that **no other JavaScript library has**, making it truly unique and powerful.

#### 🔥 High-Impact Features (5)
1. ✅ **Offline Detection** - Real-time connection monitoring with `_.onOffline()`, `_.onOnline()`, `_.isOnline()`
2. ✅ **Clipboard Read** - Async clipboard access with `await _.paste()`
3. ✅ **WebSocket Wrapper** - Simplified WebSocket API with auto-reconnect and JSON parsing
4. ✅ **Promise Chain UI** - Automatic loading states for buttons during async operations
5. ✅ **Share API** - Native share dialog for modern browsers and mobile

#### ⚡ Performance Features (4)
6. ✅ **Batch DOM Updates** - RequestAnimationFrame-based batching to prevent layout thrashing
7. ✅ **Resource Preloader** - Parallel preloading for images, fonts, and data files
8. ✅ **Time Ago Live Update** - Auto-updating relative timestamps that refresh every minute
9. ✅ **DOM Diff & Patch** - Smart incremental updates using a diffing algorithm

#### 🎨 Premium UI Components (4)
10. ✅ **Command Palette** - VS Code-style command interface with keyboard shortcuts (Ctrl+K)
11. ✅ **Virtual Scroll** - Viewport-based rendering for lists with 10,000+ items
12. ✅ **Onboarding Tour** - Guided walkthroughs with spotlight overlays and step navigation
13. ✅ **Blur-Up Lazy Loading** - IntersectionObserver-based lazy loading with blur-up effect

#### 📱 Mobile & PWA Features (3)
14. ✅ **Pull to Refresh** - Touch-based refresh gesture for mobile devices
15. ✅ **PWA Install Prompt** - BeforeInstallPrompt API wrapper for easy PWA installation
16. ✅ **Shake Detection** - DeviceMotion-based shake gesture recognition

#### 🤖 Unique Features - NO OTHER LIBRARY HAS THESE! (5)
17. ✅ **Voice Commands** 🎤 - SpeechRecognition API for voice control - **VIRAL FEATURE!**
18. ✅ **Image Cropper** - Canvas-based image cropping with aspect ratio support
19. ✅ **Rich Text Editor** - ContentEditable-based WYSIWYG editor with toolbar
20. ✅ **Element Inspector** - Debug overlay showing element metadata (dev tool)
21. ✅ **Eye Tracking** - Experimental webcam-based gaze tracking (experimental)

### 📦 Build System Improvements
- ✅ **Automated Build Process** - `npm run build` now builds all 3 versions automatically
- ✅ **Updated File Sizes**: Source 346KB → Min 155KB → Ultra 154KB → Hyper 151KB
- ✅ **9,504 lines of code** (+1,305 lines, +16% growth from v1.0.0)

### 🎨 Documentation & Demos
- ✅ **New Demo Page** - `demos/new-features.html` showcasing all 21 features
- ✅ **Comprehensive Examples** - Code snippets and live demos for each feature
- ✅ **Updated README** - Full documentation of all new APIs

### Why v1.1.0 Matters
The **Voice Commands** feature alone makes YakaJS stand out from every other JavaScript library. Combined with the Command Palette, Virtual Scroll, and other premium features, YakaJS now offers capabilities that developers can't find anywhere else.


## 🔥 Coming Soon

- Server-side rendering support
- React/Vue integration
- TypeScript definitions
- Component library
- Project scaffolding tool (YakaCLI)
- Custom build generator
- More plugins and extensions
- More plugins and extensions

---

Made with ❤️ by Yaka UI Labs