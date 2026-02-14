# Distribution Files

This folder contains the production-ready build artifacts of YakaJS.

## Files

- **min.yaka.js** (132 KB) - Standard minified build with source maps
- **min.yaka.js.map** (141 KB) - Source map for debugging
- **ultra.min.yaka.js** (132 KB) - Ultra-compressed build with aggressive optimizations
- **hyper.min.yaka.js** (128 KB) - Maximum compression build (ES2020+)

## Usage

### For Production
```html
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js"></script>
```

### Local Development
```html
<script src="dist/min.yaka.js"></script>
```

## Building

All files in this directory are generated from `src/yaka.js`:

```bash
# Standard build
npm run build

# Ultra-compressed build
npm run build:ultra

# Hyper-compressed build (maximum optimization)
npm run build:hyper
```

## Which Version to Use?

- **min.yaka.js** - Best for most production use (includes source maps)(we recoommend this😉)
- **ultra.min.yaka.js** - Aggressive compression, no source maps
- **hyper.min.yaka.js** - Maximum compression for fastest load times

All versions include 100% identical functionality - only compression level differs.
