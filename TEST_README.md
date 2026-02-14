# YakaJS Testing

This directory contains automated tests for YakaJS demos.

## Quick Start

### 1. Install Dependencies

```bash
pip install playwright
python -m playwright install chromium
```

### 2. Start Local Server

In one terminal, start a web server:

```bash
cd /path/to/YakaJS
python3 -m http.server 8000
```

### 3. Run Tests

In another terminal:

```bash
python3 test_demos.py
```

## What Gets Tested

The test suite verifies:

### Page Loading Tests
- ✅ All 12 demo pages load successfully
- ✅ YakaJS library loads from CDN
- ✅ No "YakaJS not loaded" error messages

### Reactivity Features
- ✅ `_.signal()` creates reactive values
- ✅ `_.effect()` triggers on signal changes
- ✅ `_.computed()` derives values from signals
- ✅ Signal `.set()` and `.update()` methods work
- ✅ Interactive buttons update the UI

### DOM Manipulation
- ✅ `_()` selector function works
- ✅ DOM element selection and manipulation

### AJAX Features
- ✅ `_.get()`, `_.post()`, `_.ajax()` methods available

### Animations
- ✅ `fadeIn()`, `fadeOut()`, `slideIn()`, `animate()` methods available

## Test Output

Successful run example:
```
============================================================
YakaJS Demo Test Suite
============================================================

📋 Testing All Demo Pages Load:
------------------------------------------------------------
  Testing: index.html
    ✅ Page loaded successfully
  Testing: reactivity.html
    ✅ Page loaded successfully
  ...

🧪 Testing Core YakaJS Features:
------------------------------------------------------------
  Testing Reactivity Features:
    ✅ _.signal() available
    ✅ _.effect() available
    ✅ _.computed() available
    ✅ Signal functionality works
    ✅ Effect functionality works
    ✅ Computed functionality works
    ✅ Interactive buttons work

============================================================
Test Summary:
============================================================
Total Tests: 15
✅ Passed: 15
❌ Failed: 0
Success Rate: 100.0%
============================================================
```

## Troubleshooting

### "Connection refused" error
Make sure the server is running on port 8000:
```bash
python3 -m http.server 8000
```

### Playwright not installed
Install Playwright and browsers:
```bash
pip install playwright
python -m playwright install
```

### Tests fail with CDN
If the CDN version is outdated, you may need to:
1. Push your latest changes to GitHub
2. Wait for jsDelivr CDN to update (can take 12-24 hours)
3. Or temporarily use purge: `https://purge.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js`

## CI/CD Integration

You can integrate this test suite into your CI pipeline:

```yaml
# .github/workflows/test.yml
name: Test Demos

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: '3.x'
      - name: Install dependencies
        run: |
          pip install playwright
          python -m playwright install --with-deps chromium
      - name: Start server
        run: python3 -m http.server 8000 &
      - name: Run tests
        run: python3 test_demos.py
```
