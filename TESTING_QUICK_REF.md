# YakaJS Testing Quick Reference

## Quick Commands

```bash
# Setup (one time)
pip install playwright
python -m playwright install chromium

# Start test server
python3 -m http.server 8000 &

# Test with local dist (during development)
python3 switch_demos.py local
python3 test_demos.py

# Switch back to CDN (for commit)
python3 switch_demos.py cdn

# Check current status
python3 switch_demos.py status
```

## When to Use What

### Use Local Paths When:
- ✅ Testing new features before committing
- ✅ Debugging issues in the library
- ✅ CDN hasn't updated yet (12-24 hour delay)
- ✅ Working offline

### Use CDN When:
- ✅ Committing changes (ALWAYS)
- ✅ Deploying to GitHub Pages
- ✅ Production environments
- ✅ Sharing demos with others

## Test Results Interpretation

### ✅ 100% Pass Rate
Everything works! Safe to commit.

### ⚠️ Some Tests Failing
- Check if you ran `npm run build`
- Check if server is running on port 8000
- Check if demos are using correct paths

### ❌ All Tests Failing
- CDN not updated yet → Use: `python3 switch_demos.py local`
- Server not running → Start: `python3 -m http.server 8000 &`
- Missing dependencies → Install: `pip install playwright`

## Files

| File | Purpose |
|------|---------|
| `test_demos.py` | Main test suite - runs all tests |
| `switch_demos.py` | Switches demos between CDN/local |
| `TEST_README.md` | Detailed testing documentation |
| `CDN_SOLUTION.md` | Explains CDN caching issue |
| `requirements-test.txt` | Python dependencies |

## CI/CD Integration

Add to `.github/workflows/test.yml`:

```yaml
name: Test Demos
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
      - run: pip install playwright
      - run: python -m playwright install --with-deps chromium
      - run: python3 switch_demos.py local
      - run: python3 -m http.server 8000 &
      - run: python3 test_demos.py
```

## Common Issues

**Q: Tests fail with "YakaJS not loaded"**  
A: CDN not updated. Run: `python3 switch_demos.py local`

**Q: "Connection refused" error**  
A: Start server: `python3 -m http.server 8000 &`

**Q: Changed demos but forgot to switch back to CDN**  
A: Run: `python3 switch_demos.py cdn`

**Q: How long until CDN updates?**  
A: 12-24 hours, or purge manually: `https://purge.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js`

## Remember

**Golden Rule**: Always commit with CDN URLs!

```bash
# Before committing:
python3 switch_demos.py cdn
python3 switch_demos.py status  # Verify
git commit -m "Your message"
```
