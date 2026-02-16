# YakaJS Test Suite

Comprehensive unit tests for all YakaJS features.

## 🧪 Running Tests

### Browser-based Tests

Open `test-runner.html` in your browser:

```bash
# From the project root
open tests/test-runner.html
# or
python3 -m http.server 8000
# Then navigate to http://localhost:8000/tests/test-runner.html
```

Tests will automatically run when the page loads.

## 📁 Test Files

- **`test-runner.html`** - Main test runner with beautiful UI
- **`dom.test.js`** - DOM manipulation and selection tests (20 tests)
- **`events.test.js`** - Event handling tests (10 tests)
- **`ajax.test.js`** - AJAX and HTTP operation tests (10 tests)
- **`animations.test.js`** - Animation and transition tests (10 tests)
- **`state.test.js`** - State management and reactivity tests (10 tests)
- **`security.test.js`** - Security features tests (10 tests)
- **`utilities.test.js`** - Utility function tests (20 tests)

**Total: 90+ comprehensive tests**

## 🎯 Test Categories

### 1. DOM Manipulation (20 tests)
- Element selection
- Element creation
- Class manipulation
- Content manipulation (text/html)
- Attribute handling
- CSS operations
- Element traversal
- Element removal

### 2. Event Handling (10 tests)
- Event attachment/removal
- Event triggering
- One-time events
- Event delegation
- Hover events
- Focus/blur events
- Keyboard events
- Form events

### 3. AJAX & HTTP (10 tests)
- HTTP methods (GET, POST, PUT, DELETE)
- Form serialization
- Query string building
- JSON parsing
- Error handling

### 4. Animations (10 tests)
- Fade effects
- Slide effects
- Custom animations
- CSS transitions
- Transform animations
- Opacity control

### 5. State Management (10 tests)
- Store creation
- State getters/setters
- State subscriptions
- Data binding
- Reactive signals
- Computed values
- Effects
- Local storage integration

### 6. Security (10 tests)
- XSS sanitization
- HTML escaping
- CSRF token generation/validation
- Input validation
- URL sanitization
- Secure storage

### 7. Utilities (20 tests)
- Type checking
- Array operations (map, filter, reduce)
- Object operations (extend, clone)
- Array utilities (unique, flatten, shuffle)
- Function utilities (debounce, throttle)
- String utilities (capitalize, truncate)
- Date formatting

## 🎨 Test Runner Features

- **Real-time Progress** - Visual progress bar and live updates
- **Interactive Filters** - Filter by all/passed/failed tests
- **Collapsible Suites** - Click suite headers to expand/collapse
- **Detailed Error Messages** - See exactly what went wrong
- **Performance Metrics** - Test duration tracking
- **Rerun Failed Tests** - Quickly rerun only failed tests
- **Beautiful UI** - Modern, responsive design
- **Auto-run** - Tests run automatically on page load

## ✅ Test Results

All tests are designed to validate:
- Core functionality works as expected
- Edge cases are handled properly
- Security features are effective
- Performance is acceptable
- APIs are consistent and reliable

## 🔧 Adding New Tests

To add new tests, create a new `.test.js` file:

```javascript
// myfeature.test.js
describe('My Feature', [
    it('should do something', () => {
        const result = Yaka.myFeature();
        expect(result).toBeTruthy();
    }),
    
    it('should handle edge cases', () => {
        const result = Yaka.myFeature(null);
        expect(result).toBe(defaultValue);
    })
]);
```

Then include it in `test-runner.html`:

```html
<script src="myfeature.test.js"></script>
```

## 📊 Test Framework

YakaJS uses a lightweight, custom test framework with these assertions:

- `expect(value).toBe(expected)` - Strict equality
- `expect(value).toEqual(expected)` - Deep equality
- `expect(value).toBeTruthy()` - Truthy value
- `expect(value).toBeFalsy()` - Falsy value
- `expect(array).toContain(item)` - Array contains item
- `expect(value).toBeGreaterThan(n)` - Greater than comparison
- `expect(fn).toThrow()` - Function throws error

## 🚀 Benefits

Having a comprehensive test suite provides:

1. **Confidence** - Know your code works correctly
2. **Documentation** - Tests serve as usage examples
3. **Regression Prevention** - Catch bugs before they reach users
4. **Refactoring Safety** - Change code with confidence
5. **Credibility** - Shows professional software development practices

## 📝 Test Coverage

Current test coverage includes:
- ✅ Core DOM operations
- ✅ Event system
- ✅ AJAX/HTTP functionality
- ✅ Animation system
- ✅ State management
- ✅ Security features
- ✅ Utility functions

Future additions:
- Voice commands
- WebSocket functionality
- Service Worker features
- Performance monitoring
- Mobile-specific features

## 🤝 Contributing

When contributing new features to YakaJS:

1. Write tests for your new features
2. Ensure all existing tests still pass
3. Add tests for edge cases
4. Update this README if adding new test files

## 📖 Learn More

- [YakaJS Documentation](../DOCUMENTATION.md)
- [API Reference](../docs/API_REFERENCE.md)
- [Contributing Guide](../docs/CONTRIBUTING.md)

---

**Remember:** Tests are not just for catching bugs - they're living documentation that shows how YakaJS is meant to be used! 🎯
