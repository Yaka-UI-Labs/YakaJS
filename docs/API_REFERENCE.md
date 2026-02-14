# YakaJS Complete API Reference 📚

**Version:** 1.1.0  
**Maintained by:** [@dill-lk](https://github.com/dill-lk) and the Yaka UI Labs team

> The most comprehensive JavaScript library API documentation you'll ever read. Every method, every parameter, every example. 🚀

---

## Table of Contents

1. [Core API](#core-api)
2. [DOM Manipulation](#dom-manipulation)
3. [Events](#events)
4. [AJAX & HTTP](#ajax--http)
5. [Animations](#animations)
6. [UI Components](#ui-components)
7. [Forms & Validation](#forms--validation)
8. [State Management](#state-management)
9. [Routing](#routing)
10. [Reactivity (Signals)](#reactivity-signals)
11. [Security](#security)
12. [Storage](#storage)
13. [Performance](#performance)
14. [Premium Features](#premium-features)
15. [Utilities](#utilities)

---

## Core API

### `_(selector, context?)`
Main constructor for creating YakaJS objects.

**Parameters:**
- `selector` (String|Element|Array|Function) - CSS selector, DOM element, array of elements, or DOM ready function
- `context` (Element, optional) - Context element to search within

**Returns:** Yaka object

**Examples:**
```javascript
// CSS Selector
_('#myButton');
_('.items');
_('div[data-active="true"]');

// Multiple selectors
_('.btn, .link');

// With context
_('.item', document.getElementById('container'));

// DOM Element
_(document.getElementById('myDiv'));

// Array of elements
_([element1, element2]);

// HTML string
_('<div class="new">Content</div>');

// DOM Ready
_(() => {
    console.log('DOM is ready!');
});
```

---

### `.each(callback)`
Iterate over matched elements.

**Parameters:**
- `callback` (Function) - Function to execute for each element
  - `index` (Number) - Index of current element
  - `element` (Element) - Current DOM element
  - `this` - Bound to current element

**Returns:** Yaka object (chainable)

**Example:**
```javascript
_('.items').each((index, elem) => {
    console.log(`Item ${index}:`, elem.textContent);
    // 'this' is bound to elem
    console.log(this.className);
});
```

---

### `.get(index?)`
Get raw DOM element(s).

**Parameters:**
- `index` (Number, optional) - Index of element to get

**Returns:** 
- Array of elements (if no index)
- Single element (if index provided)

**Example:**
```javascript
const allElements = _('.items').get();
const firstElement = _('.items').get(0);
const lastElement = _('.items').get(-1);
```

---

### `.first()`
Get first element as new Yaka object.

**Returns:** Yaka object

**Example:**
```javascript
_('.items').first().addClass('highlight');
```

---

### `.last()`
Get last element as new Yaka object.

**Returns:** Yaka object

**Example:**
```javascript
_('.items').last().addClass('last-item');
```

---

### `.eq(index)`
Get element at specific index as new Yaka object.

**Parameters:**
- `index` (Number) - Zero-based index (negative indexes count from end)

**Returns:** Yaka object

**Example:**
```javascript
_('.items').eq(2).css('color', 'red');
_('.items').eq(-1).hide(); // Last item
```

---

### `.length`
Number of matched elements.

**Type:** Number (property)

**Example:**
```javascript
const count = _('.items').length;
console.log(`Found ${count} items`);
```

---

## DOM Manipulation

### `.text(value?)`
Get or set text content.

**Parameters:**
- `value` (String, optional) - Text to set

**Returns:** 
- String (getter)
- Yaka object (setter, chainable)

**Example:**
```javascript
// Get text
const text = _('#title').text();

// Set text (safely escapes HTML)
_('#title').text('Hello <script>alert("XSS")</script>');
// Renders as: Hello &lt;script&gt;alert("XSS")&lt;/script&gt;

// Chain
_('#title').text('New Title').addClass('active');
```

---

### `.html(content?, sanitize?)`
Get or set HTML content.

**Parameters:**
- `content` (String, optional) - HTML to set
- `sanitize` (Boolean, optional, default: false) - Whether to sanitize HTML

**Returns:**
- String (getter)
- Yaka object (setter, chainable)

**Example:**
```javascript
// Get HTML
const html = _('#container').html();

// Set HTML (unsafe - XSS possible)
_('#container').html('<div>Content</div>');

// Set HTML with sanitization (safe)
const userInput = '<script>alert("XSS")</script><p>Safe content</p>';
_('#container').html(userInput, true);
// Renders: &lt;script&gt;alert("XSS")&lt;/script&gt;&lt;p&gt;Safe content&lt;/p&gt;

// Chain
_('#container').html('<h1>Title</h1>').fadeIn();
```

**Security Note:** Always use `sanitize: true` with user-generated content!

---

### `.val(value?)`
Get or set form element value.

**Parameters:**
- `value` (String|Number, optional) - Value to set

**Returns:**
- String (getter)
- Yaka object (setter, chainable)

**Example:**
```javascript
// Get value
const email = _('#email').val();

// Set value
_('#email').val('user@example.com');

// Clear input
_('#search').val('');

// Chain
_('#input').val('').focus().addClass('active');
```

---

### `.attr(name, value?)`
Get or set attributes.

**Parameters:**
- `name` (String|Object) - Attribute name or object of name-value pairs
- `value` (String, optional) - Attribute value

**Returns:**
- String (getter)
- Yaka object (setter, chainable)

**Example:**
```javascript
// Get attribute
const href = _('a').attr('href');
const dataId = _('.item').attr('data-id');

// Set single attribute
_('#link').attr('href', 'https://example.com');

// Set multiple attributes (optimized - computes keys once)
_('#img').attr({
    src: 'image.jpg',
    alt: 'Description',
    width: '300',
    'data-lazy': 'true'
});

// Remove attribute
_('#element').attr('disabled', null);
```

---

### `.removeAttr(name)`
Remove attribute.

**Parameters:**
- `name` (String) - Attribute name

**Returns:** Yaka object (chainable)

**Example:**
```javascript
_('#button').removeAttr('disabled');
_('.links').removeAttr('target');
```

---

### `.addClass(className, duration?)`
Add CSS class(es).

**Parameters:**
- `className` (String) - Class name(s) (space-separated)
- `duration` (Number, optional) - Animation duration in ms

**Returns:** Yaka object (chainable)

**Performance:** Uses batched DOM operations to prevent layout thrashing!

**Example:**
```javascript
// Add single class
_('.item').addClass('active');

// Add multiple classes
_('.item').addClass('active highlight selected');

// Add with animation (batched for performance!)
_('.items').addClass('fade-in', 500);

// Chain
_('.btn').addClass('primary').text('Submit');
```

**Advanced:** When adding classes to multiple elements with animation, YakaJS batches all reads → writes → single reflow for optimal performance. This prevents the "layout thrashing" problem that occurs with traditional implementations.

---

### `.removeClass(className, duration?)`
Remove CSS class(es).

**Parameters:**
- `className` (String) - Class name(s) (space-separated)
- `duration` (Number, optional) - Animation duration in ms

**Returns:** Yaka object (chainable)

**Performance:** Uses batched DOM operations!

**Example:**
```javascript
// Remove single class
_('.item').removeClass('active');

// Remove multiple classes
_('.item').removeClass('active highlight selected');

// Remove with animation
_('.items').removeClass('fade-in', 500);

// Chain
_('.btn').removeClass('disabled').attr('disabled', null);
```

---

### `.toggleClass(className, duration?)`
Toggle CSS class(es).

**Parameters:**
- `className` (String) - Class name(s) (space-separated)
- `duration` (Number, optional) - Animation duration in ms

**Returns:** Yaka object (chainable)

**Example:**
```javascript
// Toggle class
_('.menu').toggleClass('open');

// Toggle multiple
_('.item').toggleClass('active selected');

// Toggle with animation
_('.panel').toggleClass('expanded', 300);
```

---

### `.hasClass(className)`
Check if element has class.

**Parameters:**
- `className` (String) - Class name

**Returns:** Boolean

**Example:**
```javascript
if (_('#menu').hasClass('open')) {
    console.log('Menu is open');
}

// Use in conditionals
_('.items').each((i, elem) => {
    if (_(elem).hasClass('active')) {
        // Do something
    }
});
```

---

### `.css(property, value?)`
Get or set CSS styles.

**Parameters:**
- `property` (String|Object) - CSS property or object of property-value pairs
- `value` (String|Number, optional) - CSS value

**Returns:**
- String (getter)
- Yaka object (setter, chainable)

**Example:**
```javascript
// Get style
const color = _('#element').css('color');
const width = _('#element').css('width');

// Set single style
_('#element').css('color', 'red');
_('#element').css('fontSize', '16px');
_('#element').css('width', 300); // Adds 'px' automatically

// Set multiple styles
_('#element').css({
    color: 'blue',
    fontSize: '18px',
    padding: '10px 20px',
    backgroundColor: '#f0f0f0'
});

// Chain
_('#box').css('display', 'block').fadeIn();
```

---

### `.show()`
Display elements.

**Returns:** Yaka object (chainable)

**Example:**
```javascript
_('.hidden-content').show();

// Chain
_('#message').show().text('Visible now!');
```

---

### `.hide()`
Hide elements.

**Returns:** Yaka object (chainable)

**Example:**
```javascript
_('.content').hide();

// Chain
_('#error').hide().text('').removeClass('active');
```

---

### `.toggle()`
Toggle visibility.

**Returns:** Yaka object (chainable)

**Example:**
```javascript
_('.dropdown').toggle();

// Toggle on click
_('#toggle-btn').on('click', () => {
    _('.panel').toggle();
});
```

---

### `.append(content)`
Append content inside elements.

**Parameters:**
- `content` (String|Element|Yaka) - Content to append

**Returns:** Yaka object (chainable)

**Example:**
```javascript
// Append HTML string
_('#list').append('<li>New item</li>');

// Append element
const newDiv = document.createElement('div');
_('#container').append(newDiv);

// Append Yaka object
_('#container').append(_('<div>New</div>'));

// Chain
_('#list').append('<li>Item 1</li>').append('<li>Item 2</li>');
```

---

### `.prepend(content)`
Prepend content inside elements.

**Parameters:**
- `content` (String|Element|Yaka) - Content to prepend

**Returns:** Yaka object (chainable)

**Example:**
```javascript
_('#list').prepend('<li>First item</li>');
_('#container').prepend(newElement);
```

---

### `.before(content)`
Insert content before elements.

**Parameters:**
- `content` (String|Element|Yaka) - Content to insert

**Returns:** Yaka object (chainable)

**Example:**
```javascript
_('#target').before('<div>Before target</div>');
```

---

### `.after(content)`
Insert content after elements.

**Parameters:**
- `content` (String|Element|Yaka) - Content to insert

**Returns:** Yaka object (chainable)

**Example:**
```javascript
_('#target').after('<div>After target</div>');
```

---

### `.remove()`
Remove elements from DOM.

**Returns:** Yaka object

**Example:**
```javascript
_('.old-items').remove();

// Remove conditionally
_('.items').each((i, elem) => {
    if (_(elem).attr('data-expired') === 'true') {
        _(elem).remove();
    }
});
```

---

### `.empty()`
Remove all child elements.

**Returns:** Yaka object (chainable)

**Example:**
```javascript
_('#container').empty();

// Clear and rebuild
_('#list').empty().append('<li>New item</li>');
```

---

### `.clone()`
Clone elements.

**Returns:** Yaka object

**Example:**
```javascript
const clone = _('.template').clone();
_('#container').append(clone);
```

---

## Events

### `.on(event, selector?, handler)`
Attach event handler.

**Parameters:**
- `event` (String) - Event type (e.g., 'click', 'mouseenter')
- `selector` (String, optional) - Selector for event delegation
- `handler` (Function) - Event handler function

**Returns:** Yaka object (chainable)

**Memory Management:** Use named functions (not anonymous) if you need to remove handlers later!

**Example:**
```javascript
// Simple event
_('#button').on('click', (e) => {
    console.log('Clicked!', e.target);
});

// Event delegation
_('#list').on('click', '.item', (e) => {
    console.log('Item clicked:', this.textContent);
});

// Multiple events on same handler
_('#input').on('focus blur', handleInputChange);

// Named function for later removal
const handleClick = () => console.log('Clicked');
_('#btn').on('click', handleClick);
_('#btn').off('click', handleClick); // Can remove later

// ⚠️ Anonymous functions can't be removed
_('#btn').on('click', () => {}); // Can't remove this!
```

**Event Delegation Benefits:**
- Handles dynamically added elements
- Better performance for many elements
- Single event listener instead of many

---

### `.off(event, selector?, handler?)`
Remove event handler.

**Parameters:**
- `event` (String) - Event type
- `selector` (String, optional) - Selector (if was delegated)
- `handler` (Function, optional) - Specific handler to remove

**Returns:** Yaka object (chainable)

**Example:**
```javascript
// Remove specific handler
const handler = () => console.log('Click');
_('#btn').on('click', handler);
_('#btn').off('click', handler);

// Remove all click handlers
_('#btn').off('click');

// Remove delegated handler
_('#list').off('click', '.item', itemHandler);
```

---

### `.one(event, selector?, handler)`
Attach event handler that fires once.

**Parameters:**
- `event` (String) - Event type
- `selector` (String, optional) - Selector for delegation
- `handler` (Function) - Event handler

**Returns:** Yaka object (chainable)

**Example:**
```javascript
// Fire once
_('#popup').one('click', '#close', () => {
    console.log('Closed once!');
});

// Welcome message
_('#app').one('load', () => {
    showWelcomeMessage();
});
```

---

### `.trigger(event, data?)`
Trigger event programmatically.

**Parameters:**
- `event` (String) - Event type
- `data` (Any, optional) - Data to pass to handlers

**Returns:** Yaka object (chainable)

**Example:**
```javascript
// Trigger click
_('#button').trigger('click');

// Trigger with data
_('#button').on('customEvent', (e, data) => {
    console.log('Data:', data);
});
_('#button').trigger('customEvent', { msg: 'Hello' });

// Trigger form submission
_('#form').trigger('submit');
```

---

### `.hover(handlerIn, handlerOut)`
Attach mouseenter and mouseleave handlers.

**Parameters:**
- `handlerIn` (Function) - Handler for mouseenter
- `handlerOut` (Function) - Handler for mouseleave

**Returns:** Yaka object (chainable)

**Example:**
```javascript
_('.item').hover(
    function() {
        _(this).addClass('hover');
    },
    function() {
        _(this).removeClass('hover');
    }
);

// Single handler for both
_('.item').hover(function() {
    _(this).toggleClass('hover');
});
```

---

## AJAX & HTTP

### `_.get(url, data?, options?)`
Perform GET request.

**Parameters:**
- `url` (String) - Request URL
- `data` (Object, optional) - Query parameters
- `options` (Object, optional) - Request options
  - `timeout` (Number) - Request timeout in ms
  - `retries` (Number) - Number of retry attempts
  - `retryDelay` (Number) - Delay between retries in ms
  - `headers` (Object) - Custom headers
  - `onProgress` (Function) - Progress callback
  - `onError` (Function) - Error callback

**Returns:** Promise

**Example:**
```javascript
// Simple GET
const data = await _.get('https://api.example.com/users');

// With query params
const users = await _.get('/api/users', { 
    page: 1, 
    limit: 10 
});
// Requests: /api/users?page=1&limit=10

// With options
const posts = await _.get('/api/posts', null, {
    timeout: 5000,
    retries: 3,
    retryDelay: 1000,
    headers: {
        'Authorization': 'Bearer token123'
    },
    onProgress: (loaded, total) => {
        console.log(`Progress: ${loaded}/${total}`);
    },
    onError: (error) => {
        console.error('Request failed:', error);
    }
});

// Error handling
try {
    const data = await _.get('/api/data');
    console.log(data);
} catch (error) {
    console.error('Failed:', error);
}
```

---

### `_.post(url, data?, options?)`
Perform POST request.

**Parameters:**
- `url` (String) - Request URL
- `data` (Object, optional) - Request body
- `options` (Object, optional) - Same as `.get()`

**Returns:** Promise

**Example:**
```javascript
// Simple POST
const response = await _.post('/api/users', {
    name: 'John Doe',
    email: 'john@example.com'
});

// With CSRF token (automatically included)
_.csrf.setToken('csrf-token-123');
const result = await _.post('/api/data', { value: 42 });
// Automatically adds X-CSRF-Token header

// File upload
const formData = new FormData();
formData.append('file', fileInput.files[0]);
await _.post('/api/upload', formData);

// JSON vs FormData
await _.post('/api/json', { data: 'value' }); // Sends as JSON
await _.post('/api/form', formData); // Sends as multipart/form-data
```

---

### `_.put(url, data?, options?)`
Perform PUT request.

**Parameters:** Same as `.post()`

**Returns:** Promise

**Example:**
```javascript
await _.put('/api/users/123', {
    name: 'Jane Doe',
    email: 'jane@example.com'
});
```

---

### `_.delete(url, data?, options?)`
Perform DELETE request.

**Parameters:** Same as `.get()`

**Returns:** Promise

**Example:**
```javascript
await _.delete('/api/users/123');

// With confirmation
if (confirm('Delete this item?')) {
    await _.delete(`/api/items/${id}`);
}
```

---

### `_.ajax(options)`
Low-level AJAX request.

**Parameters:**
- `options` (Object) - Request configuration
  - `url` (String, required) - Request URL
  - `method` (String) - HTTP method (default: 'GET')
  - `data` (Object) - Request data
  - `headers` (Object) - Custom headers
  - `timeout` (Number) - Timeout in ms
  - `retries` (Number) - Retry attempts
  - `responseType` (String) - Response type ('json', 'text', 'blob', etc.)

**Returns:** Promise

**Example:**
```javascript
const response = await _.ajax({
    url: '/api/data',
    method: 'PATCH',
    data: { status: 'active' },
    headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'value'
    },
    timeout: 10000,
    retries: 2,
    responseType: 'json'
});
```

---

## Animations

All animations are performant and use CSS transitions + requestAnimationFrame!

### `.fadeIn(duration?, callback?)`
Fade in elements.

**Parameters:**
- `duration` (Number, optional, default: 400) - Duration in ms
- `callback` (Function, optional) - Completion callback

**Returns:** Yaka object (chainable)

**Example:**
```javascript
_('#message').fadeIn();
_('#message').fadeIn(1000);
_('#message').fadeIn(500, () => {
    console.log('Fade complete!');
});

// Chain
_('#box').hide().fadeIn(600);
```

---

### `.fadeOut(duration?, callback?)`
Fade out elements.

**Parameters:** Same as `.fadeIn()`

**Example:**
```javascript
_('#message').fadeOut(500);
```

---

### `.slideDown(duration?, callback?)`
Slide down (reveal).

**Parameters:** Same as `.fadeIn()`

**Example:**
```javascript
_('.dropdown').slideDown(300);
```

---

### `.slideUp(duration?, callback?)`
Slide up (hide).

**Parameters:** Same as `.fadeIn()`

**Example:**
```javascript
_('.dropdown').slideUp(300);
```

---

### `.slideLeft(duration?, callback?)`
Slide left (hide to left).

**Parameters:** Same as `.fadeIn()`

**Example:**
```javascript
_('.sidebar').slideLeft(400);
```

---

### `.slideRight(duration?, callback?)`
Slide right (reveal from right).

**Parameters:** Same as `.fadeIn()`

**Example:**
```javascript
_('.panel').slideRight(400);
```

---

### `.animate(properties, duration?, easing?)`
Animate CSS properties.

**Parameters:**
- `properties` (Object) - CSS properties to animate
- `duration` (Number, optional, default: 400) - Duration in ms
- `easing` (String, optional, default: 'ease') - Easing function

**Returns:** Yaka object (chainable)

**Supports:** Colors (hex, rgb, rgba with alpha!), numeric values, transformations

**Example:**
```javascript
// Animate position and size
_('#box').animate({
    left: '100px',
    top: '50px',
    width: '200px',
    height: '200px',
    opacity: 0.5
}, 1000);

// Animate colors (including rgba with alpha!)
_('#box').animate({
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    color: '#00ff00',
    borderColor: 'rgb(0, 0, 255)'
}, 800, 'ease-in-out');

// Transform
_('#box').animate({
    transform: 'scale(1.5) rotate(45deg)'
}, 600);

// Multiple properties
_('#element').animate({
    width: 300,
    height: 200,
    opacity: 1,
    marginLeft: '50px'
}, 1000, 'cubic-bezier(0.4, 0, 0.2, 1)');
```

**Color Animation:** YakaJS uses smart color interpolation with requestAnimationFrame for smooth color transitions. Supports hex (#ff0000), rgb (rgb(255,0,0)), and rgba (rgba(255,0,0,0.5)) formats!

---

### `.bounce()`
Bounce animation.

**Returns:** Yaka object (chainable)

**Example:**
```javascript
_('#button').on('click', function() {
    _(this).bounce();
});
```

---

### `.shake()`
Shake animation.

**Example:**
```javascript
_('#error').shake(); // Draw attention to error
```

---

### `.pulse()`
Pulse animation.

**Example:**
```javascript
_('.notification').pulse();
```

---

### `.swing()`
Swing animation.

**Example:**
```javascript
_('.bell-icon').swing();
```

---

### `.flip3D()`
3D flip animation.

**Example:**
```javascript
_('.card').on('click', function() {
    _(this).flip3D();
});
```

---

### `.rubberBand()`
Rubber band animation.

**Example:**
```javascript
_('.button').rubberBand();
```

---

## State Management

### `_.createStore(config)`
Create Vuex/Redux-style store.

**Parameters:**
- `config` (Object) - Store configuration
  - `state` (Object) - Initial state
  - `mutations` (Object) - Synchronous state mutations
  - `actions` (Object) - Asynchronous actions
  - `getters` (Object, optional) - Computed state values
  - `plugins` (Array, optional) - Store plugins

**Returns:** Store object

**Example:**
```javascript
const store = _.createStore({
    state: {
        count: 0,
        user: null,
        todos: []
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        decrement(state) {
            state.count--;
        },
        setUser(state, user) {
            state.user = user;
        },
        addTodo(state, todo) {
            state.todos.push(todo);
        }
    },
    actions: {
        async fetchUser({ commit }) {
            const user = await _.get('/api/user');
            commit('setUser', user);
        },
        async incrementAsync({ commit }) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            commit('increment');
        }
    },
    getters: {
        doubleCount: state => state.count * 2,
        completedTodos: state => state.todos.filter(t => t.completed)
    }
});

// Use the store
store.commit('increment');
console.log(store.state.count); // 1

store.dispatch('incrementAsync');

console.log(store.getters.doubleCount); // 2

// Undo/Redo support
store.undo(); // Reverts last mutation
store.redo(); // Reapplies undone mutation
```

---

## Reactivity (Signals)

SolidJS-inspired reactive primitives for fine-grained reactivity!

### `_.signal(initialValue)`
Create reactive signal.

**Parameters:**
- `initialValue` (Any) - Initial value

**Returns:** Signal function with `.set()` and `.update()` methods

**Example:**
```javascript
// Create signal
const count = _.signal(0);

// Read value
console.log(count()); // 0

// Set value
count.set(5);
console.log(count()); // 5

// Update with function
count.update(n => n + 1);
console.log(count()); // 6

// Use in DOM
_.effect(() => {
    _('#count').text(count());
});

count.set(10); // Automatically updates DOM!
```

---

### `_.computed(fn)`
Create computed signal.

**Parameters:**
- `fn` (Function) - Computation function

**Returns:** Computed signal (read-only)

**Example:**
```javascript
const count = _.signal(5);
const doubled = _.computed(() => count() * 2);
const quadrupled = _.computed(() => doubled() * 2);

console.log(doubled()); // 10
console.log(quadrupled()); // 20

count.set(10);
console.log(doubled()); // 20
console.log(quadrupled()); // 40
```

---

### `_.effect(fn)`
Create reactive effect.

**Parameters:**
- `fn` (Function) - Effect function

**Returns:** Cleanup function

**Example:**
```javascript
const name = _.signal('John');
const greeting = _.signal('Hello');

// Auto-runs when dependencies change
_.effect(() => {
    console.log(`${greeting()}, ${name()}!`);
});
// Logs: Hello, John!

name.set('Jane');
// Logs: Hello, Jane!

greeting.set('Hi');
// Logs: Hi, Jane!

// With cleanup
const dispose = _.effect(() => {
    const interval = setInterval(() => {
        console.log(count());
    }, 1000);
    
    return () => clearInterval(interval); // Cleanup
});

// Stop effect
dispose();
```

---

## Security

### `_.security.sanitizeHtml(html)`
Sanitize HTML to prevent XSS.

**Parameters:**
- `html` (String) - HTML string to sanitize

**Returns:** String (sanitized HTML)

**Example:**
```javascript
const userInput = '<script>alert("XSS")</script><p>Safe content</p>';
const safe = _.security.sanitizeHtml(userInput);
// Returns: '&lt;script&gt;alert("XSS")&lt;/script&gt;&lt;p&gt;Safe content&lt;/p&gt;'

// Use with .html()
_('#content').html(userInput, true); // Automatically sanitizes
```

---

### `_.security.escapeHtml(text)`
Escape HTML entities.

**Parameters:**
- `text` (String) - Text to escape

**Returns:** String

**Example:**
```javascript
const escaped = _.security.escapeHtml('<div>Hello & "welcome"</div>');
// Returns: '&lt;div&gt;Hello &amp; &quot;welcome&quot;&lt;/div&gt;'
```

---

### `_.csrf.setToken(token)`
Set CSRF token.

**Parameters:**
- `token` (String) - CSRF token

**Example:**
```javascript
// Set token (from server)
_.csrf.setToken(document.querySelector('[name=csrf-token]').content);

// All POST/PUT/DELETE requests automatically include token
await _.post('/api/data', { value: 42 });
// Includes X-CSRF-Token: your-token header
```

---

### `_.csrf.getToken()`
Get current CSRF token.

**Returns:** String

**Example:**
```javascript
const token = _.csrf.getToken();
```

---

## Premium Features

### `_.voice.listen(commands)`
Voice command recognition. 🎤 **UNIQUE TO YAKAJS!**

**Parameters:**
- `commands` (Object) - Map of voice commands to actions

**Returns:** Recognition object

**Example:**
```javascript
// Enable voice control
_.voice.listen({
    'click button': () => _('#myButton').click(),
    'show menu': () => _('#menu').show(),
    'hide menu': () => _('#menu').hide(),
    'scroll down': () => window.scrollBy(0, 100),
    'scroll up': () => window.scrollBy(0, -100),
    'search for *': (query) => {
        _('#search').val(query).trigger('submit');
    }
});

// Say "click button" to trigger button click!
// Say "search for javascript" to search!
```

**Browser Support:** Chrome, Edge (requires HTTPS)

---

### `_.commandPalette(commands)`
VS Code-style command palette.

**Parameters:**
- `commands` (Array) - Array of command objects
  - `title` (String) - Command title
  - `action` (Function) - Command action
  - `keywords` (Array, optional) - Search keywords

**Example:**
```javascript
_.commandPalette([
    {
        title: 'Open Settings',
        action: () => window.location.href = '/settings',
        keywords: ['config', 'preferences']
    },
    {
        title: 'Toggle Dark Mode',
        action: () => document.body.classList.toggle('dark')
    },
    {
        title: 'Search',
        action: () => _('#search').focus()
    }
]);

// Press Ctrl+K (Cmd+K on Mac) to open palette
```

---

### `_.virtualScroll(container, items, options)`
Virtual scrolling for large lists.

**Parameters:**
- `container` (String|Element) - Container selector or element
- `items` (Array) - Array of items to render
- `options` (Object) - Configuration
  - `itemHeight` (Number) - Height of each item in px
  - `renderItem` (Function) - Item render function
  - `buffer` (Number, optional) - Buffer size

**Example:**
```javascript
const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`
}));

_.virtualScroll('#list', items, {
    itemHeight: 50,
    renderItem: (item) => `
        <div class="item" data-id="${item.id}">
            ${item.name}
        </div>
    `,
    buffer: 5
});

// Renders only visible items + buffer
// Handles 10,000+ items smoothly!
```

---

### `_.tour(steps, options?)`
Onboarding tour with spotlights.

**Parameters:**
- `steps` (Array) - Array of tour steps
  - `target` (String) - Selector for target element
  - `title` (String) - Step title
  - `content` (String) - Step content
  - `position` (String, optional) - Tooltip position
- `options` (Object, optional) - Tour options
  - `showProgress` (Boolean) - Show step progress
  - `keyboard` (Boolean) - Enable keyboard navigation

**Example:**
```javascript
_.tour([
    {
        target: '#welcome',
        title: 'Welcome!',
        content: 'This is your dashboard.'
    },
    {
        target: '#menu',
        title: 'Navigation',
        content: 'Use this menu to navigate.',
        position: 'right'
    },
    {
        target: '#settings',
        title: 'Settings',
        content: 'Customize your experience here.',
        position: 'bottom'
    }
], {
    showProgress: true,
    keyboard: true
});
```

---

### More Premium Features

See [ADVANCED_GUIDE.md](./ADVANCED_GUIDE.md) for complete documentation on:

- **Offline Detection** - `_.isOnline()`, `_.onOffline()`, `_.onOnline()`
- **Clipboard** - `_.copy()`, `_.paste()`
- **WebSocket** - `_.ws(url, options)`
- **Lazy Loading** - `_.lazyLoad(selector, options)`
- **Pull to Refresh** - `_.pullToRefresh(callback)`
- **PWA Install** - `_.pwaInstall()`
- **Shake Detection** - `_.onShake(callback)`
- **Image Cropper** - `_.imageCropper(image, options)`
- **Rich Editor** - `_.richEditor(selector)`
- **Element Inspector** - `_.inspectElement()`
- **Eye Tracking** - `_.eyeTracker()`

---

## Utilities

### `_.safe()`
Enable safe mode to prevent crashes.

**Returns:** Yaka object (chainable)

**Example:**
```javascript
// Without safe mode
_('#nonexistent').hide(); // Might crash

// With safe mode
_('#nonexistent').safe().hide().fadeIn(); // Never crashes!

// Perfect for dynamic content
const id = getUserId(); // Might be null
_(`#user-${id}`).safe().show(); // Safe!
```

---

### `_.debounce(fn, delay)`
Debounce function calls.

**Parameters:**
- `fn` (Function) - Function to debounce
- `delay` (Number) - Delay in ms

**Returns:** Debounced function

**Example:**
```javascript
const search = _.debounce((query) => {
    _.get('/api/search', { q: query }).then(results => {
        displayResults(results);
    });
}, 300);

_('#search').on('input', (e) => search(e.target.value));
```

---

### `_.throttle(fn, limit)`
Throttle function calls.

**Parameters:**
- `fn` (Function) - Function to throttle
- `limit` (Number) - Time limit in ms

**Returns:** Throttled function

**Example:**
```javascript
const handleScroll = _.throttle(() => {
    console.log('Scroll position:', window.scrollY);
}, 100);

_(window).on('scroll', handleScroll);
```

---

## Advanced Topics

For advanced usage, see:

- [ADVANCED_GUIDE.md](./ADVANCED_GUIDE.md) - Advanced patterns and techniques
- [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Performance and security best practices
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Migrating from jQuery
- [EXAMPLES.md](./EXAMPLES.md) - Real-world code examples

---

## Contributing

Found a bug? Want to add a feature? See [CONTRIBUTING.md](./CONTRIBUTING.md)!

Maintained with ❤️ by [@dill-lk](https://github.com/dill-lk) and the Yaka UI Labs team.

---

**[⬆ Back to Top](#yakajs-complete-api-reference-)**
