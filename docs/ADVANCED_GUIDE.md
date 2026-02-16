# YakaJS Advanced Guide 🚀

**Maintained by:** [@dill-lk](https://github.com/dill-lk)

> Master YakaJS with advanced patterns, performance optimization, and real-world techniques.

---

## Table of Contents

1. [Performance Optimization](#performance-optimization)
2. [Advanced Reactivity](#advanced-reactivity)
3. [Memory Management](#memory-management)
4. [Security Best Practices](#security-best-practices)
5. [Custom Plugins](#custom-plugins)
6. [Architecture Patterns](#architecture-patterns)
7. [Testing Strategies](#testing-strategies)
8. [Production Deployment](#production-deployment)

---

## Performance Optimization

### Layout Thrashing Prevention

YakaJS automatically prevents layout thrashing in `addClass()` and `removeClass()` with animation:

**The Problem:**
```javascript
// ❌ BAD: Causes N reflows for N elements
elements.forEach(elem => {
    const before = getComputedStyle(elem); // READ
    elem.classList.add('highlight');        // WRITE
    void elem.offsetHeight;                 // FORCES REFLOW
    const after = getComputedStyle(elem);   // READ
});
// Result: N reflows = Slow!
```

**YakaJS Solution:**
```javascript
// ✅ GOOD: YakaJS batches operations automatically
_('.items').addClass('highlight', 500);

// Internal implementation:
// 1. Batch all reads (getComputedStyle for all elements)
// 2. Batch all writes (add classes to all elements)
// 3. Single reflow (one offsetHeight access)
// 4. Batch transitions
// Result: 1 reflow = Fast!
```

**Performance Impact:**
- **Before:** 100 elements = 100 reflows = ~500ms
- **After:** 100 elements = 1 reflow = ~5ms
- **Speedup:** 100x faster! 🚀

---

### Debouncing and Throttling

**Debounce** - Execute after inactivity period:

```javascript
// Search as user types
const searchDebounced = _.debounce(async (query) => {
    const results = await _.get('/api/search', { q: query });
    displayResults(results);
}, 300); // Wait 300ms after last keystroke

_('#search').on('input', (e) => searchDebounced(e.target.value));

// User types: "h" "e" "l" "l" "o"
// Searches only once after 300ms of no typing
```

**Throttle** - Execute at most once per time period:

```javascript
// Handle scroll efficiently
const handleScroll = _.throttle(() => {
    const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
    _('#progress').css('width', `${scrollPercent}%`);
}, 100); // Max once per 100ms

_(window).on('scroll', handleScroll);

// Scrolling continuously only calls handleScroll every 100ms
```

**When to Use:**
- **Debounce:** Search inputs, form validation, resize handlers
- **Throttle:** Scroll handlers, mouse move tracking, window resize

---

### Virtual Scrolling for Large Lists

Rendering 10,000+ items without lag:

```javascript
// Generate large dataset
const bigList = Array.from({ length: 50000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    description: `Description for item ${i}`
}));

// Virtual scroll only renders visible items
_.virtualScroll('#container', bigList, {
    itemHeight: 60,
    renderItem: (item) => `
        <div class="list-item" data-id="${item.id}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </div>
    `,
    buffer: 10 // Extra items above/below viewport
});

// Performance:
// - Only ~30 DOM elements (visible + buffer)
// - Smooth scrolling through 50,000 items
// - Low memory usage
```

**How It Works:**
1. Calculates visible range based on scroll position
2. Renders only visible items + buffer
3. Recycles DOM elements as you scroll
4. Updates content dynamically

---

### Batched DOM Updates

Batch multiple DOM operations to prevent unnecessary reflows:

```javascript
// Without batching (slow)
for (let i = 0; i < 1000; i++) {
    _(`#item-${i}`).css('color', 'red');     // Reflow
    _(`#item-${i}`).addClass('active');       // Reflow
}

// With batching (fast)
_.batchUpdate(() => {
    for (let i = 0; i < 1000; i++) {
        _(`#item-${i}`).css('color', 'red').addClass('active');
    }
});
// All updates happen in single frame using requestAnimationFrame
```

---

### Resource Preloading

Preload critical resources for faster page load:

```javascript
// Preload images
_.preload([
    '/images/hero.jpg',
    '/images/logo.png',
    '/images/background.jpg'
]).then(() => {
    console.log('Images loaded!');
    showGallery();
});

// Preload fonts
_.preload([
    '/fonts/custom-regular.woff2',
    '/fonts/custom-bold.woff2'
], { type: 'font' });

// Preload data
_.preload([
    '/api/user',
    '/api/settings'
], { type: 'fetch' }).then(([user, settings]) => {
    initializeApp(user, settings);
});

// Parallel loading with progress
let loaded = 0;
_.preload(urls, {
    onProgress: () => {
        loaded++;
        updateProgressBar(loaded / urls.length);
    }
});
```

---

## Advanced Reactivity

### Fine-Grained Reactivity with Signals

Signals provide fine-grained reactivity without virtual DOM:

```javascript
// Create reactive state
const count = _.signal(0);
const user = _.signal({ name: 'John', age: 30 });

// Derived state (memoized)
const doubled = _.computed(() => count() * 2);
const quadrupled = _.computed(() => doubled() * 2);

// Auto-updating DOM
_.effect(() => {
    _('#count').text(count());
    _('#doubled').text(doubled());
    _('#quadrupled').text(quadrupled());
});

// Updates trigger effects automatically
count.set(5);
// All three displays update instantly!

// Nested updates are batched
_.batchUpdate(() => {
    count.set(10);
    count.set(20);
    count.set(30);
});
// Effect runs once with final value
```

---

### Building Reactive Components

```javascript
function TodoList() {
    const todos = _.signal([]);
    const filter = _.signal('all'); // 'all', 'active', 'completed'
    
    // Computed values
    const filteredTodos = _.computed(() => {
        const f = filter();
        const t = todos();
        
        if (f === 'active') return t.filter(todo => !todo.completed);
        if (f === 'completed') return t.filter(todo => todo.completed);
        return t;
    });
    
    const todoCount = _.computed(() => filteredTodos().length);
    const activeCount = _.computed(() => 
        todos().filter(t => !t.completed).length
    );
    
    // Reactive rendering
    _.effect(() => {
        const list = filteredTodos().map(todo => `
            <li data-id="${todo.id}">
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span>${todo.text}</span>
                <button class="delete">×</button>
            </li>
        `).join('');
        
        _('#todo-list').html(list);
        _('#count').text(todoCount());
        _('#active-count').text(activeCount());
    });
    
    // Actions
    return {
        addTodo: (text) => {
            todos.update(t => [...t, {
                id: Date.now(),
                text,
                completed: false
            }]);
        },
        
        toggleTodo: (id) => {
            todos.update(t => t.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ));
        },
        
        deleteTodo: (id) => {
            todos.update(t => t.filter(todo => todo.id !== id));
        },
        
        setFilter: (f) => {
            filter.set(f);
        }
    };
}

// Initialize component
const app = TodoList();

// Wire up events
_('#add-btn').on('click', () => {
    const text = _('#todo-input').val();
    if (text) {
        app.addTodo(text);
        _('#todo-input').val('');
    }
});

_('#todo-list').on('change', 'input[type=checkbox]', function() {
    const id = +(_(this).parent().attr('data-id'));
    app.toggleTodo(id);
});

_('.filter-btn').on('click', function() {
    app.setFilter(_(this).attr('data-filter'));
});
```

---

### Cross-Component Communication

Using signals for component communication:

```javascript
// Shared state
const globalState = {
    user: _.signal(null),
    theme: _.signal('light'),
    notifications: _.signal([])
};

// Component A: User profile
function UserProfile() {
    _.effect(() => {
        const user = globalState.user();
        if (user) {
            _('#profile-name').text(user.name);
            _('#profile-email').text(user.email);
        }
    });
}

// Component B: Theme toggle
function ThemeToggle() {
    _('#theme-toggle').on('click', () => {
        const current = globalState.theme();
        globalState.theme.set(current === 'light' ? 'dark' : 'light');
    });
    
    _.effect(() => {
        document.body.className = globalState.theme();
    });
}

// Component C: Notifications
function Notifications() {
    _.effect(() => {
        const notifications = globalState.notifications();
        const html = notifications.map(n => `
            <div class="notification">${n.message}</div>
        `).join('');
        _('#notifications').html(html);
    });
}

// All components react to shared state changes
globalState.user.set({ name: 'Jane', email: 'jane@example.com' });
globalState.theme.set('dark');
globalState.notifications.update(n => [...n, { message: 'Welcome!' }]);
```

---

## Memory Management

### Preventing Memory Leaks

**Event Listener Leaks:**

```javascript
// ❌ BAD: Anonymous functions can't be removed
_('#button').on('click', () => {
    console.log('Clicked');
});
// Memory leak if button is removed from DOM but listener remains

// ✅ GOOD: Named functions can be removed
const handleClick = () => console.log('Clicked');
_('#button').on('click', handleClick);

// Later, when removing button:
_('#button').off('click', handleClick); // Properly cleaned up
_('#button').remove();
```

**Cleanup Pattern:**

```javascript
class Component {
    constructor(element) {
        this.element = element;
        this.handlers = [];
        this.effects = [];
    }
    
    on(event, handler) {
        _(this.element).on(event, handler);
        this.handlers.push({ event, handler });
    }
    
    addEffect(effect) {
        const dispose = _.effect(effect);
        this.effects.push(dispose);
    }
    
    destroy() {
        // Remove all event listeners
        this.handlers.forEach(({ event, handler }) => {
            _(this.element).off(event, handler);
        });
        
        // Dispose all effects
        this.effects.forEach(dispose => dispose());
        
        // Remove element
        _(this.element).remove();
        
        // Clear references
        this.handlers = [];
        this.effects = [];
        this.element = null;
    }
}

// Usage
const component = new Component('#my-component');
component.on('click', handleClick);
component.addEffect(() => {
    // Reactive code
});

// Cleanup when done
component.destroy();
```

---

### Memory Leak Detection

```javascript
// Enable memory monitoring
_.debug = true;

// Detect potential leaks
const leaks = _.detectLeaks();
console.log('Potential memory leaks:', leaks);

// Monitor memory usage
_.performance.monitor('memory', (metrics) => {
    if (metrics.usedJSHeapSize > 100 * 1024 * 1024) {
        console.warn('High memory usage detected:', metrics);
    }
});
```

---

## Security Best Practices

### XSS Prevention

**Always sanitize user input:**

```javascript
// ❌ DANGEROUS: Never trust user input
const userComment = getUserInput();
_('#comments').html(userComment); // XSS vulnerability!

// ✅ SAFE: Sanitize HTML
_('#comments').html(userComment, true); // Sanitizes automatically

// ✅ SAFE: Use text instead
_('#comments').text(userComment); // Escapes HTML

// ✅ SAFE: Manual sanitization
const safe = _.security.sanitizeHtml(userComment);
_('#comments').html(safe);
```

**URL Sanitization:**

```javascript
// ❌ DANGEROUS: User-controlled URLs
const url = params.get('redirect');
window.location = url; // Potential XSS via javascript: URLs

// ✅ SAFE: Validate URLs
if (url.startsWith('/') || url.startsWith('https://')) {
    window.location = url;
}

// ✅ SAFE: Use helper
const safeUrl = _.security.sanitizeUrl(url);
if (safeUrl) {
    window.location = safeUrl;
}
```

---

### CSRF Protection

```javascript
// Set CSRF token on page load
document.addEventListener('DOMContentLoaded', () => {
    const token = document.querySelector('[name=csrf-token]')?.content;
    if (token) {
        _.csrf.setToken(token);
    }
});

// All state-changing requests automatically include token
await _.post('/api/users', userData);
await _.put('/api/users/123', updateData);
await _.delete('/api/users/456');

// Verify token before sensitive operations
async function deleteAccount() {
    const token = _.csrf.getToken();
    if (!token) {
        throw new Error('CSRF token not found');
    }
    
    await _.delete('/api/account');
}
```

---

### Content Security Policy (CSP)

```javascript
// Set nonce for inline scripts
const nonce = document.querySelector('script[nonce]')?.nonce;
if (nonce) {
    _.security.setNonce(nonce);
}

// Create CSP-compliant inline handlers
_('#button').on('click', function() {
    // This works with strict CSP
    console.log('Clicked');
});

// Don't use inline event handlers
// ❌ BAD: <button onclick="alert('hi')">Click</button>
// ✅ GOOD: Use .on() method
```

---

### Input Validation

```javascript
// Validate email
function validateEmail(email) {
    const sanitized = _.security.escapeHtml(email);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(sanitized);
}

// Validate URL
function validateUrl(url) {
    try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
        return false;
    }
}

// Sanitize SQL-like inputs
function sanitizeQuery(query) {
    return query
        .replace(/'/g, "''")
        .replace(/;/g, '')
        .replace(/--/g, '');
}

// Comprehensive validation
function validateUserInput(data) {
    return {
        name: _.security.escapeHtml(data.name).slice(0, 100),
        email: validateEmail(data.email) ? data.email : null,
        url: validateUrl(data.url) ? data.url : null,
        comment: _.security.sanitizeHtml(data.comment)
    };
}
```

---

## Custom Plugins

### Creating Plugins

```javascript
// Plugin structure
_.plugin('myPlugin', function(options) {
    // Default options
    const defaults = {
        color: 'red',
        duration: 300
    };
    
    const settings = Object.assign({}, defaults, options);
    
    // Plugin code
    return this.each((i, elem) => {
        _(elem).css('color', settings.color);
        _(elem).fadeIn(settings.duration);
    });
});

// Usage
_('.items').myPlugin({ color: 'blue', duration: 500 });
```

---

### Advanced Plugin Example

```javascript
// Autocomplete plugin
_.plugin('autocomplete', function(options) {
    const settings = {
        source: [],
        minLength: 2,
        delay: 300,
        onSelect: () => {},
        ...options
    };
    
    return this.each((i, input) => {
        const $input = _(input);
        const $container = _('<div class="autocomplete"></div>');
        $input.after($container);
        
        let cache = {};
        
        const search = _.debounce(async (query) => {
            if (query.length < settings.minLength) {
                $container.empty().hide();
                return;
            }
            
            // Check cache
            if (cache[query]) {
                showResults(cache[query]);
                return;
            }
            
            // Fetch results
            const results = typeof settings.source === 'function'
                ? await settings.source(query)
                : settings.source.filter(item => 
                    item.toLowerCase().includes(query.toLowerCase())
                );
            
            cache[query] = results;
            showResults(results);
        }, settings.delay);
        
        function showResults(results) {
            const html = results.map(result => `
                <div class="autocomplete-item">${result}</div>
            `).join('');
            
            $container.html(html).show();
        }
        
        $input.on('input', (e) => search(e.target.value));
        
        $container.on('click', '.autocomplete-item', function() {
            const value = _(this).text();
            $input.val(value);
            $container.hide();
            settings.onSelect(value);
        });
        
        // Click outside to close
        _(document).on('click', (e) => {
            if (!_(e.target).closest('.autocomplete, input').length) {
                $container.hide();
            }
        });
    });
});

// Usage
_('#search').autocomplete({
    source: async (query) => {
        const data = await _.get('/api/search', { q: query });
        return data.results;
    },
    minLength: 3,
    onSelect: (value) => {
        console.log('Selected:', value);
    }
});
```

---

## Architecture Patterns

### MVC Pattern

```javascript
// Model
const TodoModel = {
    todos: _.signal([]),
    
    addTodo(text) {
        this.todos.update(t => [...t, {
            id: Date.now(),
            text,
            completed: false
        }]);
    },
    
    toggleTodo(id) {
        this.todos.update(t => t.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    },
    
    deleteTodo(id) {
        this.todos.update(t => t.filter(todo => todo.id !== id));
    }
};

// View
const TodoView = {
    render(todos) {
        const html = todos.map(todo => `
            <li data-id="${todo.id}">
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span>${todo.text}</span>
                <button class="delete">×</button>
            </li>
        `).join('');
        
        _('#todo-list').html(html);
    }
};

// Controller
const TodoController = {
    init() {
        // Reactive rendering
        _.effect(() => {
            TodoView.render(TodoModel.todos());
        });
        
        // Event handlers
        _('#add-btn').on('click', () => {
            const text = _('#todo-input').val();
            if (text) {
                TodoModel.addTodo(text);
                _('#todo-input').val('');
            }
        });
        
        _('#todo-list').on('change', 'input', function() {
            const id = +(_(this).parent().attr('data-id'));
            TodoModel.toggleTodo(id);
        });
        
        _('#todo-list').on('click', '.delete', function() {
            const id = +(_(this).parent().attr('data-id'));
            TodoModel.deleteTodo(id);
        });
    }
};

// Initialize
TodoController.init();
```

---

### Component-Based Architecture

```javascript
class Component {
    constructor(selector) {
        this.el = _(selector);
        this.state = {};
        this.init();
    }
    
    setState(updates) {
        this.state = { ...this.state, ...updates };
        this.render();
    }
    
    init() {
        // Override in subclasses
    }
    
    render() {
        // Override in subclasses
    }
    
    destroy() {
        this.el.empty().off();
    }
}

class Counter extends Component {
    init() {
        this.state = { count: 0 };
        this.render();
        
        this.el.on('click', '.increment', () => {
            this.setState({ count: this.state.count + 1 });
        });
        
        this.el.on('click', '.decrement', () => {
            this.setState({ count: this.state.count - 1 });
        });
    }
    
    render() {
        this.el.html(`
            <div class="counter">
                <button class="decrement">-</button>
                <span class="count">${this.state.count}</span>
                <button class="increment">+</button>
            </div>
        `);
    }
}

// Usage
const counter = new Counter('#app');
```

---

## Testing Strategies

### Unit Testing Components

```javascript
// Component to test
function createButton(text, onClick) {
    const btn = _('<button></button>').text(text);
    btn.on('click', onClick);
    return btn;
}

// Test
function testButton() {
    let clicked = false;
    const btn = createButton('Click me', () => {
        clicked = true;
    });
    
    // Simulate click
    btn.trigger('click');
    
    console.assert(clicked === true, 'Button should trigger click handler');
    console.assert(btn.text() === 'Click me', 'Button text should match');
}

testButton();
```

---

### Integration Testing

```javascript
async function testTodoApp() {
    // Setup
    _('#app').html(`
        <input id="todo-input">
        <button id="add-btn">Add</button>
        <ul id="todo-list"></ul>
    `);
    
    const app = TodoList();
    
    // Test: Add todo
    _('#todo-input').val('Test todo');
    _('#add-btn').trigger('click');
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.assert(
        _('#todo-list li').length === 1,
        'Should have 1 todo'
    );
    
    // Test: Toggle todo
    _('#todo-list input').trigger('click');
    
    console.assert(
        _('#todo-list input').get(0).checked === true,
        'Todo should be checked'
    );
    
    console.log('All tests passed!');
}

testTodoApp();
```

---

## Production Deployment

### Build for Production

```bash
# Install dependencies
npm install

# Build minified versions
npm run build

# Outputs:
# - dist/min.yaka.js (155 KB)
# - dist/ultra.min.yaka.js (155 KB)
# - dist/hyper.min.yaka.js (151 KB)
```

---

### CDN Deployment

```html
<!-- Use jsDelivr CDN -->
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js"></script>

<!-- Or specific version -->
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@v1.1.0/dist/min.yaka.js"></script>

<!-- With integrity hash -->
<script 
    src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js"
    integrity="sha384-..."
    crossorigin="anonymous">
</script>
```

---

### Performance Monitoring

```javascript
// Monitor FPS
_.performance.monitor('fps', (fps) => {
    if (fps < 30) {
        console.warn('Low FPS detected:', fps);
    }
});

// Monitor memory
_.performance.monitor('memory', (metrics) => {
    console.log('Memory:', {
        used: (metrics.usedJSHeapSize / 1024 / 1024).toFixed(2) + ' MB',
        total: (metrics.totalJSHeapSize / 1024 / 1024).toFixed(2) + ' MB'
    });
});

// Monitor long tasks
_.performance.monitor('longTasks', (tasks) => {
    tasks.forEach(task => {
        if (task.duration > 50) {
            console.warn('Long task detected:', task.duration + 'ms');
        }
    });
});
```

---

### Error Handling

```javascript
// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    
    // Send to monitoring service
    _.post('/api/errors', {
        message: event.error.message,
        stack: event.error.stack,
        url: window.location.href
    });
});

// Promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    _.post('/api/errors', {
        message: 'Unhandled promise rejection',
        reason: event.reason,
        url: window.location.href
    });
});

// YakaJS error handling
_.ajax({
    url: '/api/data',
    onError: (error) => {
        // Handle AJAX errors
        console.error('Request failed:', error);
        showErrorMessage('Failed to load data');
    }
});
```

---

## Next Steps

- Read [BEST_PRACTICES.md](./BEST_PRACTICES.md) for more tips
- Check [EXAMPLES.md](./EXAMPLES.md) for real-world code examples
- See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for jQuery migration
- Join our community and contribute!

---

**Maintained by [@dill-lk](https://github.com/dill-lk) and the Yaka UI Labs team** 🚀
