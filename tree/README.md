# YakaJS Tree Folder

## What is YakaJS?

**YakaJS** is the **jQuery-beating library** - a next-generation JavaScript library that surpasses jQuery in features, performance, and modern capabilities while maintaining the same elegant simplicity.

### Why YakaJS Beats jQuery

- 🎤 **Voice Commands** - Built-in voice control (jQuery doesn't have this!)
- ⚡ **234 Features** - More features than jQuery (jQuery has ~160)
- 🚀 **Modern Architecture** - ES6+, async/await, promises everywhere
- 🔒 **Security First** - Built-in XSS protection, CSRF tokens, input sanitization
- 📦 **151 KB** - Comparable size to jQuery but with 56% more features
- 🎨 **Premium UI** - 30+ built-in components (draggable, sortable, carousel, etc.)
- 💎 **Better Performance** - Batched DOM updates prevent layout thrashing
- 🛡️ **Never Crashes** - Safe-mode chaining prevents undefined errors

**Bottom line:** YakaJS does everything jQuery does, plus 74+ features jQuery doesn't have, with better performance and modern JavaScript practices.

---

## About This Folder

This folder contains the modularized version of YakaJS, where each feature is separated into individual files for easier development, maintenance, and code organization.

## Purpose

```
tree/
├── core/              # Core functionality
│   ├── basic-methods.js
│   ├── content-methods.js
│   ├── attributes.js
│   ├── classes.js
│   ├── styles.js
│   └── yaka-core.js
├── dom/               # DOM manipulation
│   ├── manipulation.js
│   └── traversal.js
├── events/            # Event handling
│   └── events.js
├── animations/        # Animation effects
│   └── animations.js
├── ui/                # UI components
│   └── advanced-features.js
├── ajax/              # HTTP and routing
│   ├── http.js
│   └── routing.js
├── utils/             # Utility functions
│   ├── array-utils.js
│   ├── object-utils.js
│   ├── string-utils.js
│   ├── date-utils.js
│   ├── math-utils.js
│   └── async-utils.js
├── validation/        # Form validation
│   └── validation.js
├── security/          # Security utilities
│   └── security.js
├── state/             # State management
│   └── store.js
└── performance/       # Performance monitoring
    └── monitoring.js
```

## Usage

### 🔌 Plugin System (NEW!)

YakaJS now features a **plugin system** that allows you to load only the features you need! Each modular file is a self-contained plugin that automatically registers with the core.

#### Method 1: Static Loading (Recommended)

Load plugins as separate script tags - they auto-register:

```html
<!-- Step 1: Load core (required) -->
<script src="tree/core/yaka-core.js"></script>

<!-- Step 2: Load plugins you need (auto-registers) -->
<script src="tree/animations/animations.js"></script>
<script src="tree/ajax/http.js"></script>
<script src="tree/events/events.js"></script>

<!-- Now use YakaJS with loaded features -->
<script>
    _('#myElement').fadeIn(500); // Animation plugin
    _('#form').on('submit', handler); // Events plugin
</script>
```

#### Method 2: Dynamic Loading

Load plugins on-demand using JavaScript:

```javascript
// Load core first
<script src="tree/core/yaka-core.js"></script>

// Load plugins dynamically when needed
function loadAnimations() {
    const script = document.createElement('script');
    script.src = 'tree/animations/animations.js';
    script.onload = () => {
        console.log('Animations loaded!');
        _('#box').fadeIn(); // Now available!
    };
    document.head.appendChild(script);
}
```

#### Method 3: Manual Registration (Advanced)

Use `Yaka.use()` for manual plugin registration:

```javascript
// Load the plugin module
import animationsPlugin from './tree/animations/animations.js';

// Register it manually
Yaka.use(animationsPlugin);
```

### Using the Full Bundle

For convenience, use the pre-built bundles from the `dist/` folder:

```html
<script src="dist/min.yaka.js"></script>
```

## Plugin Benefits

1. 🎯 **Load Only What You Need**: Start with 30KB core, add features as needed
2. ⚡ **Faster Page Load**: Smaller initial bundle size
3. 🔄 **Dynamic Loading**: Load plugins on-demand based on user interaction
4. 📦 **Better Caching**: Core and plugins cached separately
5. 🎨 **Flexibility**: Mix and match features for your specific needs

## Available Plugins

- **animations.js** - Fade, slide, and animation effects
- **ajax/http.js** - HTTP requests and AJAX
- **ajax/routing.js** - Client-side routing
- **events.js** - Advanced event handling and delegation
- **dom/manipulation.js** - DOM manipulation methods
- **dom/traversal.js** - DOM traversal methods
- **ui/advanced-features.js** - Draggable, sortable, resizable, etc.
- **validation.js** - Form validation
- **security.js** - XSS protection, sanitization
- **state/store.js** - State management
- **performance/monitoring.js** - Performance monitoring

## Build Process

The tree folder is automatically generated from `src/yaka.js` when you run:

```bash
npm run build
```

This extracts and organizes features into separate files as **self-contained plugins** with automatic registration.

## Benefits

1. **Selective Loading**: Include only the features you need (start with 30KB core!)
2. **Better Organization**: Easy to find and maintain specific features
3. **Smaller Bundle Size**: Build custom bundles with selected features
4. **Development**: Easier to work on specific features in isolation
5. **Tree Shaking**: Better support for modern bundlers
6. **Plugin System**: Auto-registration makes modular loading effortless

## Demo

Check out the plugin system in action:
- `demos/plugin-system-demo.html` - Interactive demo showing dynamic plugin loading

## Notes

- All files in this folder are auto-generated from `src/yaka.js`
- Manual changes to these files will be overwritten on the next build
- To modify features, edit `src/yaka.js` and rebuild
- **Core files** (basic-methods.js, attributes.js, etc.) are code fragments for reference only
- **Plugin files** (animations.js, ajax/*.js, etc.) are self-contained and can be loaded independently
