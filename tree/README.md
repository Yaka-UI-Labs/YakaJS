# YakaJS Tree Folder

This folder contains the modularized version of YakaJS, where each feature is separated into individual files for easier development, maintenance, and selective usage.

## Structure

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
