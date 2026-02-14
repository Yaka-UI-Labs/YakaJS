# YakaJS Demo Guidelines

## CDN Usage

**IMPORTANT**: All demo HTML files MUST use the CDN for production deployments.

### Correct CDN URL
```html
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js"></script>
```

### Why CDN?
- ✅ Demos work when hosted on GitHub Pages
- ✅ Demos work on any web hosting platform
- ✅ No dependency on local file structure
- ✅ Automatic updates when @latest is pushed
- ✅ Fast global delivery via CDN

### When NOT to use CDN
- During local development when testing unreleased features
- When debugging specific issues in the source code
- When the build hasn't been pushed to GitHub yet

In these cases, temporarily use local path:
```html
<script src="../dist/min.yaka.js"></script>
```

**Remember to change back to CDN before committing!**

## Demo Structure Checklist

- [ ] Uses CDN URL for YakaJS
- [ ] Has error handling for when YakaJS doesn't load
- [ ] Follows design system (black noise background, glassmorphism)
- [ ] Mobile responsive
- [ ] Code examples are accurate and runnable

## Error Handling

All demos should check if YakaJS loaded:

```javascript
if (typeof _ === 'undefined' || !_.signal) {
    document.body.innerHTML = '<div class="error">YakaJS not loaded</div>';
} else {
    // Demo code here
}
```

## Current Status

All 12 demos are currently using CDN:
- ✅ demos/index.html
- ✅ demos/all-features.html
- ✅ demos/advanced.html
- ✅ demos/animations.html
- ✅ demos/components.html
- ✅ demos/core-features.html
- ✅ demos/forms.html
- ✅ demos/new-features.html
- ✅ demos/reactivity.html
- ✅ demos/routing.html
- ✅ demos/security.html
- ✅ demos/state.html
