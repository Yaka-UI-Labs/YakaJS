# YakaJS Tree Folder

## ⚠️ IMPORTANT: Use Minified Bundle for Production!

**We STRONGLY recommend using `dist/min.yaka.js` for production websites instead of loading individual tree modules!**

### Why?

- 🎯 **Size**: The minified bundle is only **~150KB** - that's tiny compared to images (which are often 2MB+)!
- ⚡ **Performance**: Single file = 1 HTTP request instead of multiple
- 📦 **Complete**: All features included, tested together
- 🔒 **Production-Ready**: Minified, optimized, and battle-tested

### When to Use Tree Folder?

The tree folder is primarily for:
- 📚 **Learning**: Study individual features in isolation
- 🔧 **Development**: Work on specific features
- 🎓 **Education**: Understand how YakaJS works internally
- 🧪 **Custom Builds**: Create specialized bundles (advanced users only)

### Bottom Line

```html
<!-- ✅ RECOMMENDED for production -->
<script src="dist/min.yaka.js"></script>

<!-- ❌ NOT recommended for production (multiple HTTP requests) -->
<script src="tree/core/yaka-core.js"></script>
<script src="tree/animations/animations.js"></script>
<script src="tree/events/events.js"></script>
<!-- ... -->
```

**The minified bundle is smaller than most web images - just use it!** 🚀

---

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

### Using Individual Features

You can include only the features you need:

```html
<!-- Include core -->
<script src="tree/core/yaka-core.js"></script>

<!-- Add animations -->
<script src="tree/animations/animations.js"></script>

<!-- Add AJAX -->
<script src="tree/ajax/http.js"></script>
```

### Using the Full Bundle

For convenience, use the pre-built bundles from the `dist/` folder:

```html
<script src="dist/min.yaka.js"></script>
```

## Build Process

The tree folder is automatically generated from `src/yaka.js` when you run:

```bash
npm run build
```

This extracts and organizes features into separate files while maintaining backward compatibility.

## Benefits

1. **Selective Loading**: Include only the features you need
2. **Better Organization**: Easy to find and maintain specific features
3. **Smaller Bundle Size**: Build custom bundles with selected features
4. **Development**: Easier to work on specific features in isolation
5. **Tree Shaking**: Better support for modern bundlers

## Notes

- All files in this folder are auto-generated from `src/yaka.js`
- Manual changes to these files will be overwritten on the next build
- To modify features, edit `src/yaka.js` and rebuild
