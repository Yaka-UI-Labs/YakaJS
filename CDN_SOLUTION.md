# YakaJS Demo Testing Solution

## The Problem

User reported: "nah i use cdn i loads but the things wont work fix write a py to test all the code works also change to cdn"

**Root Cause**: The jsDelivr CDN takes time to update after new code is pushed to GitHub. When demos use CDN URLs, they may load an old version that doesn't have the latest features.

## The Solution

We've created a comprehensive Python test suite and helper tools to manage this situation:

### 1. Test Suite (`test_demos.py`)

Automated testing for all YakaJS features:

```bash
# Test with local files (when CDN not updated yet)
python3 switch_demos.py local
python3 test_demos.py

# Test with CDN (production mode)
python3 switch_demos.py cdn
python3 test_demos.py
```

**Features tested:**
- ✅ All 12 demo pages load
- ✅ YakaJS library loads correctly
- ✅ Signal, effect, and computed reactivity
- ✅ Interactive button updates
- ✅ DOM manipulation
- ✅ AJAX methods
- ✅ Animation functions

### 2. Demo Switcher (`switch_demos.py`)

Utility to switch between CDN and local paths:

```bash
# Switch to local for testing
python3 switch_demos.py local

# Switch back to CDN for production
python3 switch_demos.py cdn

# Check current status
python3 switch_demos.py status
```

## Workflow

### For Development/Testing:
1. Make changes to `src/yaka.js`
2. Build: `npm run build`
3. Switch to local: `python3 switch_demos.py local`
4. Run tests: `python3 test_demos.py`
5. Fix any issues
6. Switch back to CDN: `python3 switch_demos.py cdn`
7. Commit changes

### For Production:
1. Ensure demos use CDN: `python3 switch_demos.py cdn`
2. Push to GitHub
3. Wait 12-24 hours for CDN to update
4. Optionally purge CDN cache:
   ```
   https://purge.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js
   ```

## Why CDN May Not Work

1. **CDN Update Delay**: jsDelivr caches files for 12-24 hours
2. **Browser Cache**: Users may have old version cached
3. **Not Pushed Yet**: Latest code not committed to GitHub

## Quick Fix for Users

If demos don't work:
1. Check browser console for errors
2. Try force refresh (Ctrl+Shift+R)
3. Clear browser cache
4. Wait for CDN to update

## Test Results

When working correctly, you should see:

```
============================================================
YakaJS Demo Test Suite
============================================================
Total Tests: 15
✅ Passed: 15
❌ Failed: 0
Success Rate: 100.0%
============================================================
```

## Files

- `test_demos.py` - Main test suite
- `switch_demos.py` - CDN/local switcher
- `requirements-test.txt` - Python dependencies
- `TEST_README.md` - Detailed test documentation
- `CDN_SOLUTION.md` - This file

## Remember

**Always use CDN in production** (GitHub Pages, web hosting):
```html
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js"></script>
```

**Use local paths only for development/testing**:
```html
<script src="../dist/min.yaka.js"></script>
```
