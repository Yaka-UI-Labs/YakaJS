# YakaJS Best Practices ✅

**Performance, Security, and Code Quality**  
**Maintained by:** [@dill-lk](https://github.com/dill-lk)

> Follow these best practices to build fast, secure, and maintainable applications with YakaJS.

---

## Performance Best Practices

### 1. Use Safe Mode for Dynamic Content

```javascript
// ❌ BAD: Can crash if element doesn't exist
_('#dynamic-element').hide();

// ✅ GOOD: Never crashes
_('#dynamic-element').safe().hide();
```

### 2. Batch DOM Operations

```javascript
// ❌ BAD: Multiple reflows
for (let i = 0; i < 100; i++) {
    _(`#item-${i}`).css('color', 'red');
}

// ✅ GOOD: Single reflow with batching
_.batchUpdate(() => {
    for (let i = 0; i < 100; i++) {
        _(`#item-${i}`).css('color', 'red');
    }
});

// ✅ BETTER: Use class animation (automatically batched!)
_('.items').addClass('highlight', 300);
```

### 3. Debounce Expensive Operations

```javascript
// ❌ BAD: Search on every keystroke
_('#search').on('input', (e) => {
    searchAPI(e.target.value); // Hammers the server!
});

// ✅ GOOD: Debounce search
const searchDebounced = _.debounce(searchAPI, 300);
_('#search').on('input', (e) => {
    searchDebounced(e.target.value);
});
```

### 4. Throttle Scroll/Resize Handlers

```javascript
// ❌ BAD: Fires hundreds of times
_(window).on('scroll', () => {
    updateScrollPosition(); // Too frequent!
});

// ✅ GOOD: Throttle to max once per 100ms
_(window).on('scroll', _.throttle(updateScrollPosition, 100));
```

### 5. Use Virtual Scrolling for Large Lists

```javascript
// ❌ BAD: Render 10,000 DOM elements
items.forEach(item => {
    _('#list').append(`<div>${item.name}</div>`);
});

// ✅ GOOD: Virtual scroll (renders only ~30 visible items)
_.virtualScroll('#list', items, {
    itemHeight: 50,
    renderItem: (item) => `<div>${item.name}</div>`
});
```

### 6. Preload Critical Resources

```javascript
// Preload images, fonts, and data in parallel
await _.preload([
    '/images/hero.jpg',
    '/fonts/main.woff2',
    '/api/initial-data'
], {
    onProgress: (loaded, total) => {
        updateProgressBar(loaded / total);
    }
});

showApp();
```

### 7. Use Signals for Reactive Updates

```javascript
// ❌ BAD: Manual DOM updates
let count = 0;
function increment() {
    count++;
    _('#count').text(count); // Manual update
}

// ✅ GOOD: Reactive with signals
const count = _.signal(0);
_.effect(() => {
    _('#count').text(count()); // Auto-updates!
});

function increment() {
    count.update(n => n + 1);
}
```

---

## Security Best Practices

### 1. Always Sanitize User Input

```javascript
// ❌ DANGEROUS: XSS vulnerability
const userComment = getUserInput();
_('#comments').html(userComment);

// ✅ SAFE: Sanitize HTML
_('#comments').html(userComment, true);

// ✅ SAFE: Use text (escapes HTML automatically)
_('#comments').text(userComment);
```

### 2. Use CSRF Tokens

```javascript
// Set CSRF token from server
const token = document.querySelector('[name=csrf-token]')?.content;
_.csrf.setToken(token);

// All POST/PUT/DELETE requests automatically include token
await _.post('/api/data', { value: 42 });
```

### 3. Validate Input

```javascript
// Use built-in validation
_('#form').validate({
    rules: {
        email: { 
            required: true, 
            email: true 
        },
        age: { 
            required: true, 
            min: 18, 
            max: 120 
        }
    }
});

// Or manual validation
function validateEmail(email) {
    const sanitized = _.security.escapeHtml(email);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized);
}
```

### 4. Use Content Security Policy

```javascript
// Set nonce for inline scripts
const nonce = document.querySelector('script[nonce]')?.nonce;
if (nonce) {
    _.security.setNonce(nonce);
}

// Don't use inline event handlers
// ❌ BAD: <button onclick="doSomething()">
// ✅ GOOD: _('#button').on('click', doSomething);
```

### 5. Sanitize URLs

```javascript
// ❌ DANGEROUS: User-controlled URL
const redirect = params.get('redirect');
window.location = redirect; // XSS via javascript: URLs

// ✅ SAFE: Validate URL
if (redirect.startsWith('/') || redirect.startsWith('https://')) {
    window.location = redirect;
}
```

---

## Code Quality Best Practices

### 1. Use Named Functions for Event Handlers

```javascript
// ❌ BAD: Can't remove later
_('#button').on('click', () => {
    console.log('Clicked');
});

// ✅ GOOD: Can remove with .off()
const handleClick = () => console.log('Clicked');
_('#button').on('click', handleClick);
_('#button').off('click', handleClick); // Works!
```

### 2. Clean Up Resources

```javascript
class Component {
    constructor() {
        this.handlers = [];
        this.effects = [];
    }
    
    on(element, event, handler) {
        _(element).on(event, handler);
        this.handlers.push({ element, event, handler });
    }
    
    addEffect(effect) {
        const dispose = _.effect(effect);
        this.effects.push(dispose);
    }
    
    destroy() {
        // Remove event listeners
        this.handlers.forEach(({ element, event, handler }) => {
            _(element).off(event, handler);
        });
        
        // Dispose effects
        this.effects.forEach(dispose => dispose());
        
        // Clear references
        this.handlers = [];
        this.effects = [];
    }
}
```

### 3. Handle Errors Gracefully

```javascript
// Always handle AJAX errors
try {
    const data = await _.get('/api/data');
    processData(data);
} catch (error) {
    console.error('Failed to load data:', error);
    _.toast('error', 'Failed to load data. Please try again.');
}

// Use onError option
await _.get('/api/data', null, {
    timeout: 5000,
    retries: 3,
    onError: (error) => {
        logError(error);
        showErrorMessage();
    }
});
```

### 4. Use Computed Values

```javascript
// ❌ BAD: Recalculates every time
const count = _.signal(5);
function getDoubled() {
    return count() * 2; // Recalculates on every call
}

// ✅ GOOD: Memoized with computed
const count = _.signal(5);
const doubled = _.computed(() => count() * 2);
console.log(doubled()); // Cached!
```

### 5. Organize Code into Components

```javascript
// Create reusable components
class TodoList {
    constructor(container) {
        this.container = _(container);
        this.todos = _.signal([]);
        this.init();
    }
    
    init() {
        this.render();
        this.attachEvents();
        
        _.effect(() => {
            this.updateView();
        });
    }
    
    render() {
        // Render initial UI
    }
    
    attachEvents() {
        // Attach event listeners
    }
    
    updateView() {
        // Update based on state
    }
    
    destroy() {
        // Clean up
    }
}
```

---

## Testing Best Practices

### 1. Test Components in Isolation

```javascript
function testComponent() {
    // Setup
    const container = _('<div id="test"></div>');
    _('body').append(container);
    
    const component = new MyComponent('#test');
    
    // Test
    console.assert(
        _('#test .element').length === 1,
        'Component should render element'
    );
    
    // Teardown
    component.destroy();
    container.remove();
}
```

### 2. Mock AJAX Requests

```javascript
// Mock _.get for testing
const originalGet = _.get;
_.get = async (url) => {
    if (url === '/api/users') {
        return [{ id: 1, name: 'Test User' }];
    }
    return originalGet(url);
};

// Run tests
await testUserList();

// Restore
_.get = originalGet;
```

---

## Deployment Best Practices

### 1. Use Minified Version in Production

```html
<!-- Development -->
<script src="/dist/min.yaka.js"></script>

<!-- Production -->
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/hyper.min.yaka.js"></script>
```

### 2. Enable Debug Mode in Development

```javascript
// Development
if (window.location.hostname === 'localhost') {
    _.debug = true; // Helpful warnings
}

// Production
_.debug = false; // Silent
```

### 3. Monitor Performance

```javascript
// Track performance metrics
_.performance.monitor('fps', (fps) => {
    if (fps < 30) {
        sendMetric('low-fps', fps);
    }
});

_.performance.monitor('memory', (metrics) => {
    if (metrics.usedJSHeapSize > 100 * 1024 * 1024) {
        sendMetric('high-memory', metrics);
    }
});
```

### 4. Handle Errors Globally

```javascript
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    
    // Send to monitoring service
    sendErrorReport({
        message: event.error.message,
        stack: event.error.stack,
        url: window.location.href,
        userAgent: navigator.userAgent
    });
});
```

---

## Common Pitfalls

### 1. Forgetting to Return `this` in Chainable Methods

```javascript
// ❌ BAD: Breaks chaining
_.plugin('myPlugin', function() {
    this.each((i, elem) => {
        // Do something
    });
    // Missing return!
});

// ✅ GOOD: Chainable
_.plugin('myPlugin', function() {
    return this.each((i, elem) => {
        // Do something
    });
});
```

### 2. Not Cleaning Up Event Listeners

```javascript
// ❌ BAD: Memory leak
function showModal() {
    const modal = _('<div class="modal"></div>');
    _('body').append(modal);
    
    modal.on('click', '.close', () => {
        modal.remove(); // Listeners not removed!
    });
}

// ✅ GOOD: Proper cleanup
function showModal() {
    const modal = _('<div class="modal"></div>');
    _('body').append(modal);
    
    const closeHandler = () => {
        modal.off('click', '.close', closeHandler);
        modal.remove();
    };
    
    modal.on('click', '.close', closeHandler);
}
```

### 3. Trusting User Input

```javascript
// ❌ DANGEROUS: Always assume user input is malicious
_('#content').html(userInput);

// ✅ SAFE: Sanitize or escape
_('#content').html(userInput, true); // Sanitize
_('#content').text(userInput); // Escape
```

---

## Checklist

### Before Deployment

- [ ] All user input is sanitized
- [ ] CSRF tokens are set up
- [ ] Error handling is in place
- [ ] Performance monitoring is enabled
- [ ] Debug mode is disabled
- [ ] Using minified/hyper version
- [ ] Event listeners are cleaned up properly
- [ ] Memory leaks are checked
- [ ] Tests are passing
- [ ] Code is reviewed

### Performance Checklist

- [ ] Using debounce/throttle where appropriate
- [ ] Batching DOM operations
- [ ] Using virtual scroll for large lists
- [ ] Preloading critical resources
- [ ] Using signals for reactivity
- [ ] Monitoring FPS and memory

### Security Checklist

- [ ] All HTML is sanitized
- [ ] CSRF protection is enabled
- [ ] Input validation is in place
- [ ] CSP is configured
- [ ] URLs are validated
- [ ] No inline event handlers

---

**Maintained by [@dill-lk](https://github.com/dill-lk) and the Yaka UI Labs team** 🚀
