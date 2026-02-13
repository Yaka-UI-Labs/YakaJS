# YakaJS Minification Guide

## What is Minification?

Minification is the process of removing unnecessary characters from source code without changing its functionality. The minified version (`min.yaka.js`) is optimized for production use with reduced file size.

## What the Minified Version Doesn't Have

The minified version (`min.yaka.js`) is **58% smaller** than the source file, but it's missing several things that make the source more readable:

### ❌ Removed in Minification:

1. **All Documentation Comments**
   - Inline comments explaining code logic (`//`)
   - Most block comments (`/* */`)
   - Only preserved: Copyright header (important `/*!` comments)

2. **Whitespace and Formatting**
   - Newlines (entire code is on a single line)
   - Indentation
   - Extra spaces
   - Readable code structure

3. **Human-Readable Variable Names**
   - Variables are "mangled" (renamed) to shorter names
   - `myVariableName` becomes `a`, `b`, `c`, etc.
   - Makes debugging harder without source maps

4. **Debugging Information** (without source maps)
   - Line numbers don't match the original
   - Stack traces reference minified code

### ✅ What IS Preserved:

1. **Copyright and License Header**
   - The `/*!` comment at the top is preserved
   - Ensures legal compliance

2. **All Functionality**
   - The code works exactly the same
   - All features, methods, and APIs are identical

3. **Source Maps** (in `min.yaka.js.map`)
   - Maps minified code back to original source
   - Enables debugging in browser DevTools
   - Shows original variable names and line numbers

## File Comparison

| Metric | Source (`yaka.js`) | Minified (`min.yaka.js`) | Difference |
|--------|-------------------|-------------------------|------------|
| **Size** | 177 KB | 75 KB | -58% |
| **Lines** | 5,019 | 1 | -99.98% |
| **Comments** | 357 | 1 (copyright) | -99.7% |
| **Readable** | ✅ Yes | ❌ No | Human readability lost |
| **Debuggable** | ✅ Directly | ⚠️ With source maps | Needs map file |

## When to Use Each Version

### Use `yaka.js` (Source):
- ✅ During development
- ✅ When debugging
- ✅ When learning the library
- ✅ When contributing to the project
- ✅ For local testing

### Use `min.yaka.js` (Minified):
- ✅ In production websites
- ✅ When you want faster load times
- ✅ To reduce bandwidth usage
- ✅ For better performance

## Building the Minified Version

The minified version is built using [Terser](https://terser.org/):

```bash
npm install     # Install dependencies
npm run build   # Generate min.yaka.js and min.yaka.js.map
```

### Build Configuration

The build script in `package.json` uses these Terser options:

- `-c`: **Compress** - Remove dead code, optimize expressions
- `-m`: **Mangle** - Shorten variable/function names
- `--comments /^!/`: Preserve important comments (starting with `/*!`)
- `--source-map "url=min.yaka.js.map"`: Generate source map file

## Source Maps

The source map file (`min.yaka.js.map`) enables:

- **Original line numbers** in error stack traces
- **Original variable names** in debugger
- **Stepping through original code** in DevTools
- **Breakpoints** that work with original source

Modern browsers automatically load the source map when debugging.

## Size Optimization

The minification achieves size reduction through:

1. **Comment Removal**: ~355 comments removed
2. **Whitespace Removal**: ~4,000 newlines and indentation removed  
3. **Variable Mangling**: Long names → single characters
4. **Dead Code Elimination**: Unused code paths removed
5. **Expression Optimization**: Mathematical and logical expressions simplified

## Important Notes

⚠️ **Do NOT edit `min.yaka.js` directly!**
- Always edit `yaka.js` and rebuild
- Changes to minified file will be overwritten

⚠️ **Always rebuild after changes:**
```bash
npm run build
```

⚠️ **Include source maps in production** (optional but recommended):
- Upload both `min.yaka.js` and `min.yaka.js.map`
- Helps with debugging production issues
- Most web servers serve `.map` files only to DevTools
