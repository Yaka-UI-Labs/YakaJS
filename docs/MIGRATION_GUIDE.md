# YakaJS Migration Guide 🔄

**From jQuery to YakaJS**  
**Maintained by:** [@dill-lk](https://github.com/dill-lk)

> Complete guide to migrating your jQuery projects to YakaJS with minimal changes and maximum benefits.

---

## Table of Contents

1. [Why Migrate](#why-migrate)
2. [Syntax Comparison](#syntax-comparison)
3. [Step-by-Step Migration](#step-by-step-migration)
4. [Feature Mapping](#feature-mapping)
5. [Breaking Changes](#breaking-changes)
6. [Migration Checklist](#migration-checklist)

---

## Why Migrate?

### What You Gain

| Feature | jQuery | YakaJS |
|---------|--------|--------|
| **Bundle Size** | 87 KB | 151 KB (+74%) |
| **Features** | ~100 | 150+ (+50%) |
| **Routing** | ❌ | ✅ Full SPA router |
| **State Management** | ❌ | ✅ Vuex-style store |
| **Reactivity** | ❌ | ✅ Signals & effects |
| **Voice Commands** | ❌ | ✅ Unique! |
| **Performance** | Good | Better (batched DOM) |
| **Security** | Manual | Built-in XSS protection |
| **Modern APIs** | Limited | Extensive |
| **Active Development** | Slowed | Active |

### Migration Benefits

- 🚀 **Better Performance** - Batched DOM operations prevent layout thrashing
- 🎨 **More Features** - 50% more features without needing extra plugins
- 🔒 **Secure by Default** - Built-in XSS protection and CSRF handling
- ⚡ **Modern APIs** - SPA routing, state management, reactivity
- 🎤 **Unique Features** - Voice commands, command palette, virtual scroll
- 📦 **All-in-One** - No need for multiple plugins

---

## Syntax Comparison

### DOM Selection

**jQuery:**
```javascript
$('#element')
$('.class')
$('div')
$('#parent .child')
```

**YakaJS:**
```javascript
_('#element')        // Exactly the same!
_('.class')          // Exactly the same!
_('div')             // Exactly the same!
_('#parent .child')  // Exactly the same!
```

✅ **No changes needed!**

---

### DOM Manipulation

**jQuery:**
```javascript
$('#element').text('Hello');
$('#element').html('<span>Hello</span>');
$('#element').val('input value');
$('#element').attr('data-id', '123');
$('#element').addClass('active');
$('#element').removeClass('active');
$('#element').toggleClass('active');
```

**YakaJS:**
```javascript
_('#element').text('Hello');                  // Same!
_('#element').html('<span>Hello</span>');     // Same!
_('#element').html(userInput, true);          // NEW: Optional sanitization!
_('#element').val('input value');             // Same!
_('#element').attr('data-id', '123');         // Same!
_('#element').addClass('active');             // Same!
_('#element').removeClass('active');          // Same!
_('#element').toggleClass('active');          // Same!
```

✅ **Almost identical! Plus XSS protection!**

---

### Events

**jQuery:**
```javascript
$('#button').on('click', handler);
$('#button').off('click', handler);
$('#button').one('click', handler);
$('#form').on('submit', handler);

// Event delegation
$('#list').on('click', '.item', handler);
```

**YakaJS:**
```javascript
_('#button').on('click', handler);       // Exactly the same!
_('#button').off('click', handler);      // Exactly the same!
_('#button').one('click', handler);      // Exactly the same!
_('#form').on('submit', handler);        // Exactly the same!

// Event delegation
_('#list').on('click', '.item', handler); // Exactly the same!
```

✅ **100% compatible!**

---

### AJAX

**jQuery:**
```javascript
// GET
$.get('/api/users', data)
    .done((response) => console.log(response))
    .fail((error) => console.error(error));

// POST
$.post('/api/users', data)
    .done((response) => console.log(response));

// AJAX
$.ajax({
    url: '/api/data',
    method: 'GET',
    data: { id: 123 }
});
```

**YakaJS:**
```javascript
// GET (modern async/await)
try {
    const response = await _.get('/api/users', data);
    console.log(response);
} catch (error) {
    console.error(error);
}

// POST
const response = await _.post('/api/users', data);

// AJAX
await _.ajax({
    url: '/api/data',
    method: 'GET',
    data: { id: 123 },
    timeout: 5000,      // NEW: Built-in timeout
    retries: 3,         // NEW: Auto-retry
    retryDelay: 1000    // NEW: Retry delay
});
```

✅ **Similar API, but modern with async/await and better error handling!**

---

### Animations

**jQuery:**
```javascript
$('#element').fadeIn();
$('#element').fadeOut();
$('#element').slideDown();
$('#element').slideUp();
$('#element').animate({ opacity: 0.5 }, 300);
```

**YakaJS:**
```javascript
_('#element').fadeIn();           // Same!
_('#element').fadeOut();          // Same!
_('#element').slideDown();        // Same!
_('#element').slideUp();          // Same!
_('#element').slideLeft();        // NEW!
_('#element').slideRight();       // NEW!
_('#element').animate({ 
    opacity: 0.5,
    backgroundColor: 'rgba(255, 0, 0, 0.5)' // NEW: RGBA support!
}, 300);

// NEW animations
_('#element').bounce();
_('#element').shake();
_('#element').pulse();
_('#element').flip3D();
```

✅ **All jQuery animations + 10 more!**

---

## Step-by-Step Migration

### Phase 1: Preparation (1 hour)

1. **Audit jQuery usage:**
```bash
# Find all jQuery calls
grep -r "\\$(" src/
grep -r "jQuery(" src/
```

2. **Create backup:**
```bash
git checkout -b jquery-to-yakajs
```

3. **Add YakaJS:**
```html
<!-- Keep jQuery for now -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Add YakaJS -->
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js"></script>
```

---

### Phase 2: Basic Migration (2-4 hours)

1. **Replace `$` with `_` globally:**
```bash
# Be careful with regex patterns!
# Review each change manually

# Find all jQuery calls
find src/ -name "*.js" -exec sed -i 's/\$(/_(/ g' {} \;
```

2. **Test thoroughly:**
```javascript
// Run your test suite
npm test

// Manual testing
// - Click all buttons
// - Test all forms
// - Verify animations
// - Check AJAX calls
```

3. **Fix breaking changes:**
```javascript
// jQuery deferred vs YakaJS promises
// Before (jQuery):
$.get('/api/data')
    .done(data => {})
    .fail(error => {});

// After (YakaJS):
try {
    const data = await _.get('/api/data');
} catch (error) {
    // Handle error
}
```

---

### Phase 3: Leverage New Features (4-8 hours)

1. **Add XSS protection:**
```javascript
// Before
$('#content').html(userInput); // Unsafe!

// After
_('#content').html(userInput, true); // Safe!
```

2. **Use safe mode:**
```javascript
// Before
if ($('#element').length) {
    $('#element').hide();
}

// After
_('#element').safe().hide(); // Never crashes!
```

3. **Add routing (if applicable):**
```javascript
const router = _.createRouter();

router.addRoute('/', {
    component: () => '<h1>Home</h1>'
});

router.addRoute('/users/:id', {
    component: (params) => `<h1>User ${params.id}</h1>`
});

router.init();
```

4. **Add state management:**
```javascript
const store = _.createStore({
    state: { count: 0 },
    mutations: {
        increment(state) {
            state.count++;
        }
    }
});

store.commit('increment');
```

---

### Phase 4: Optimization (2-4 hours)

1. **Use batched operations:**
```javascript
// Before
for (let i = 0; i < 1000; i++) {
    $(`#item-${i}`).addClass('active');
}

// After (batched automatically!)
_('.item').addClass('active', 300);
```

2. **Add debouncing:**
```javascript
// Before
$('#search').on('input', function() {
    searchUsers($(this).val());
});

// After
const searchDebounced = _.debounce(searchUsers, 300);
_('#search').on('input', function() {
    searchDebounced(_(this).val());
});
```

3. **Remove jQuery:**
```html
<!-- Remove jQuery -->
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js"></script>
```

---

### Phase 5: Testing & Deployment (4-8 hours)

1. **Comprehensive testing:**
   - Unit tests
   - Integration tests
   - Manual QA
   - Performance testing
   - Security audit

2. **Performance comparison:**
```javascript
// Before (jQuery)
console.time('operation');
$('.items').addClass('active');
console.timeEnd('operation');

// After (YakaJS)
console.time('operation');
_('.items').addClass('active');
console.timeEnd('operation');
```

3. **Deploy:**
```bash
git add .
git commit -m "Migrated from jQuery to YakaJS"
git push origin jquery-to-yakajs
# Create PR and review
```

---

## Feature Mapping

### jQuery Plugins → YakaJS Built-in

| jQuery Plugin | YakaJS Equivalent | Savings |
|---------------|-------------------|---------|
| jQuery UI Autocomplete | `_.autocomplete()` | -45 KB |
| jQuery UI Datepicker | `_.datePicker()` | -40 KB |
| jQuery Validation | `_.validate()` | -30 KB |
| jQuery Animate | Built-in + more | -20 KB |
| jQuery Routing | `_.createRouter()` | -15 KB |
| jQuery Store | `_.createStore()` | -10 KB |
| **Total Savings** | | **-160 KB!** |

---

### Common Patterns

**Pattern 1: Form Validation**

jQuery + Plugin:
```javascript
$('#form').validate({
    rules: {
        email: { required: true, email: true }
    }
});
```

YakaJS:
```javascript
_('#form').validate({
    rules: {
        email: { required: true, email: true }
    }
});
// Same API!
```

---

**Pattern 2: Modal Dialog**

jQuery UI:
```javascript
$('#dialog').dialog({
    title: 'Confirm',
    buttons: {
        OK: function() { $(this).dialog('close'); }
    }
});
```

YakaJS:
```javascript
_.modal({
    title: 'Confirm',
    content: 'Are you sure?',
    buttons: [
        { text: 'OK', action: () => console.log('OK') }
    ]
});
```

---

**Pattern 3: Autocomplete**

jQuery UI:
```javascript
$('#search').autocomplete({
    source: '/api/search',
    minLength: 2
});
```

YakaJS:
```javascript
_('#search').autocomplete({
    source: async (query) => {
        return await _.get('/api/search', { q: query });
    },
    minLength: 2
});
```

---

## Breaking Changes

### Major Differences

1. **AJAX Returns Promises (not Deferreds)**

jQuery:
```javascript
$.get('/api/data')
    .done(data => {})
    .fail(error => {})
    .always(() => {});
```

YakaJS:
```javascript
try {
    const data = await _.get('/api/data');
} catch (error) {
    // Handle error
} finally {
    // Always runs
}
```

2. **No `.promise()` Method**

jQuery:
```javascript
$('.items').fadeIn().promise().done(() => {});
```

YakaJS:
```javascript
$('.items').fadeIn(400, () => {
    // Callback instead
});

// Or use signals for reactivity
```

3. **Different Plugin API**

jQuery:
```javascript
$.fn.myPlugin = function() {};
```

YakaJS:
```javascript
_.plugin('myPlugin', function() {});
```

---

## Migration Checklist

### Pre-Migration

- [ ] Audit all jQuery usage
- [ ] Create feature inventory
- [ ] Identify third-party plugins
- [ ] Set up test environment
- [ ] Create backup branch

### During Migration

- [ ] Add YakaJS alongside jQuery
- [ ] Replace `$` with `_` globally
- [ ] Update AJAX calls to async/await
- [ ] Convert jQuery plugins to YakaJS equivalents
- [ ] Add XSS protection where needed
- [ ] Test all features

### Post-Migration

- [ ] Remove jQuery
- [ ] Run full test suite
- [ ] Performance testing
- [ ] Security audit
- [ ] Update documentation
- [ ] Deploy to staging
- [ ] QA testing
- [ ] Deploy to production
- [ ] Monitor for issues

---

## Need Help?

- **Questions?** Open an issue on [GitHub](https://github.com/Yaka-UI-Labs/YakaJS/issues)
- **Found a bug?** Report it!
- **Want to contribute?** See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Maintained by [@dill-lk](https://github.com/dill-lk) and the Yaka UI Labs team** 🚀
