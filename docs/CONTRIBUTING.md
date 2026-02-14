# Contributing to YakaJS 🤝

**Help us build the best JavaScript library!**  
**Maintained by:** [@dill-lk](https://github.com/dill-lk) and the community

> We love contributions! Here's how you can help make YakaJS even better.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Setup](#development-setup)
3. [Coding Standards](#coding-standards)
4. [Pull Request Process](#pull-request-process)
5. [Reporting Bugs](#reporting-bugs)
6. [Suggesting Features](#suggesting-features)
7. [Documentation](#documentation)
8. [Community](#community)

---

## Getting Started

### Ways to Contribute

- 🐛 **Report bugs** - Help us squash those bugs!
- 💡 **Suggest features** - Share your ideas
- 📝 **Improve docs** - Make our docs better
- 🔧 **Submit PRs** - Fix bugs or add features
- ⭐ **Star the repo** - Show some love!
- 🗣️ **Spread the word** - Tell others about YakaJS

---

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/YakaJS.git
cd YakaJS
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Branch

```bash
git checkout -b feature/amazing-feature
# or
git checkout -b fix/bug-fix
```

### 4. Make Changes

Edit `src/yaka.js` and add your changes.

### 5. Build

```bash
npm run build
```

This creates:
- `dist/min.yaka.js` - Standard minified
- `dist/ultra.min.yaka.js` - Ultra compressed
- `dist/hyper.min.yaka.js` - Maximum compression

### 6. Test

```bash
# Open demos to test
open demos/index.html

# Test specific features
open demos/animations.html
open demos/reactivity.html
# etc.
```

### 7. Commit

```bash
git add .
git commit -m "feat: add amazing feature"
# or
git commit -m "fix: resolve bug in animation"
```

**Commit Message Format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `perf:` - Performance improvement
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build/tooling changes

### 8. Push and Create PR

```bash
git push origin feature/amazing-feature
```

Then create a Pull Request on GitHub!

---

## Coding Standards

### JavaScript Style

```javascript
// Use camelCase for variables and functions
const userName = 'John';
function getUserData() { }

// Use PascalCase for classes
class TodoList { }

// Use UPPER_CASE for constants
const MAX_RETRIES = 3;

// Use semicolons
const x = 5;

// Use single quotes for strings
const message = 'Hello';

// Use template literals for concatenation
const greeting = `Hello, ${userName}!`;

// Use arrow functions when appropriate
const double = (x) => x * 2;

// Comment complex logic
// Calculate the Fibonacci sequence
function fibonacci(n) {
    // ...
}
```

### YakaJS Patterns

```javascript
// Always return 'this' for chainable methods
myMethod: function() {
    // Do something
    return this; // Enable chaining
}

// Use signals for reactive state
const count = _.signal(0);

// Use computed for derived values
const doubled = _.computed(() => count() * 2);

// Use effects for side effects
_.effect(() => {
    _('#count').text(count());
});

// Batch DOM operations
_.batchUpdate(() => {
    // Multiple DOM updates
});

// Use safe mode for dynamic elements
_('#element').safe().method();
```

### Performance Considerations

```javascript
// Cache selectors
const $element = _('#element');
$element.addClass('active');
$element.show();

// Use event delegation
_('#list').on('click', '.item', handler);

// Debounce/throttle expensive operations
const search = _.debounce(searchAPI, 300);
const scroll = _.throttle(updateScroll, 100);

// Batch reads and writes
// Read all
const heights = elements.map(el => el.offsetHeight);
// Write all
elements.forEach((el, i) => el.style.height = heights[i] + 'px');
```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Changes are tested in demos
- [ ] Build succeeds (`npm run build`)
- [ ] Commit messages are descriptive
- [ ] Documentation is updated (if needed)

### PR Template

```markdown
## Description
Briefly describe your changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How did you test your changes?

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No console warnings/errors
- [ ] Tested in multiple browsers

## Related Issues
Closes #123
```

### Review Process

1. **Automated checks** - Build must succeed
2. **Code review** - Maintainer reviews code
3. **Testing** - Changes are tested
4. **Approval** - PR is approved
5. **Merge** - PR is merged!

---

## Reporting Bugs

### Before Reporting

- Check if bug already exists in [Issues](https://github.com/Yaka-UI-Labs/YakaJS/issues)
- Try with latest version
- Reproduce in clean environment

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug.

## To Reproduce
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen?

## Actual Behavior
What actually happens?

## Environment
- YakaJS Version: [e.g., 1.1.0]
- Browser: [e.g., Chrome 98]
- OS: [e.g., Windows 10]

## Code Example
```javascript
// Minimal code to reproduce
_('#element').method();
```

## Screenshots
If applicable, add screenshots.

## Additional Context
Any other relevant information.
```

---

## Suggesting Features

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature.

## Use Case
Why is this feature needed?

## Proposed API
How would the API look?
```javascript
// Example API
_.newFeature(options);
```

## Alternatives Considered
What alternatives did you consider?

## Additional Context
Any other relevant information.
```

### Feature Criteria

Good features are:
- **Useful** - Solves a common problem
- **Simple** - Easy to use API
- **Performant** - Doesn't slow down the library
- **Compatible** - Works with existing features
- **Documented** - Can be documented clearly

---

## Documentation

### Improving Docs

Documentation lives in:
- `README.md` - Main readme
- `docs/API_REFERENCE.md` - Complete API docs
- `docs/ADVANCED_GUIDE.md` - Advanced patterns
- `docs/MIGRATION_GUIDE.md` - jQuery migration
- `docs/BEST_PRACTICES.md` - Best practices
- `docs/EXAMPLES.md` - Code examples

### Doc Style

- Use clear, simple language
- Include code examples
- Add emojis for visual interest 🎉
- Keep it scannable
- Link related sections

### Example Format

```markdown
### `.method(param1, param2?)`
Brief description.

**Parameters:**
- `param1` (Type) - Description
- `param2` (Type, optional) - Description

**Returns:** Return type

**Example:**
```javascript
// Example code
_.method('value');
```

**See Also:** [Related Method](#related-method)
```

---

## Community

### Communication

- **GitHub Issues** - Bug reports and features
- **GitHub Discussions** - Questions and ideas
- **Pull Requests** - Code contributions

### Code of Conduct

- Be respectful and kind
- Help others learn
- Give constructive feedback
- Credit others' work
- Follow community guidelines

### Recognition

Contributors are recognized in:
- GitHub contributors page
- Release notes (major contributions)
- Documentation credits

---

## Development Tips

### Testing Your Changes

```javascript
// Enable debug mode
_.debug = true;

// Test in multiple scenarios
// - Empty elements
// - Single element
// - Multiple elements
// - Edge cases

// Test chaining
_('#element')
    .addClass('active')
    .show()
    .fadeIn();

// Test error handling
try {
    _('#element').yourMethod();
} catch (error) {
    console.error('Error:', error);
}
```

### Common Tasks

```bash
# Build all versions
npm run build

# Build specific version
npm run build:min
npm run build:ultra
npm run build:hyper

# Watch for changes (manual)
# Edit src/yaka.js
# Run npm run build
# Refresh browser
```

### File Structure

```
YakaJS/
├── src/
│   └── yaka.js          # Main source file
├── dist/
│   ├── min.yaka.js      # Minified version
│   ├── ultra.min.yaka.js
│   ├── hyper.min.yaka.js
│   └── *.map            # Source maps
├── demos/               # Interactive demos
│   ├── index.html
│   ├── animations.html
│   └── ...
├── docs/                # Documentation
│   ├── API_REFERENCE.md
│   ├── ADVANCED_GUIDE.md
│   └── ...
├── package.json
└── README.md
```

---

## Questions?

- 💬 Open a [Discussion](https://github.com/Yaka-UI-Labs/YakaJS/discussions)
- 🐛 Open an [Issue](https://github.com/Yaka-UI-Labs/YakaJS/issues)
- 📧 Email: support@yakajs.dev (coming soon!)

---

## Thank You! 🙏

Every contribution, no matter how small, makes YakaJS better. Thank you for being part of the community!

**Maintained by [@dill-lk](https://github.com/dill-lk) and the Yaka UI Labs team** 🚀
