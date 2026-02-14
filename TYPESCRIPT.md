# TypeScript Support

YakaJS now includes comprehensive TypeScript definitions! 🎉

## Installation

```bash
npm install yakajs
```

The TypeScript definitions are automatically included and will be picked up by your TypeScript compiler.

## Usage

### Basic TypeScript Usage

```typescript
import Yaka from 'yakajs';

// DOM manipulation with full type checking
Yaka('#myButton')
    .addClass('active')
    .on('click', (e: Event) => {
        console.log('Button clicked!');
    })
    .fadeIn(300);

// Chaining methods with type safety
Yaka('.items')
    .each((index: number, elem: HTMLElement) => {
        console.log(index, elem);
    })
    .addClass('highlight')
    .show();
```

### Using Static Utilities

```typescript
import Yaka from 'yakajs';

// Array operations
const chunks = Yaka.chunk([1, 2, 3, 4, 5], 2);
const unique = Yaka.uniq([1, 1, 2, 3]);
const shuffled = Yaka.shuffle([1, 2, 3]);

// String utilities
const camel = Yaka.camelCase('hello-world');
const slug = Yaka.slugify('Hello World!');

// Date utilities
const formatted = Yaka.formatDate(new Date(), 'YYYY-MM-DD');
const relative = Yaka.fromNow(new Date());

// Type checking with proper type guards
if (Yaka.isString(value)) {
    // value is narrowed to string type here
    console.log(value.toUpperCase());
}
```

### AJAX with Type Safety

```typescript
import Yaka from 'yakajs';

interface User {
    id: number;
    name: string;
    email: string;
}

// Type-safe HTTP requests
Yaka.get<User>('/api/user/1').then((user: User) => {
    console.log(user.name);
});

Yaka.post<{ success: boolean }>('/api/save', { name: 'John' })
    .then((response) => {
        if (response.success) {
            console.log('Saved!');
        }
    });
```

### Form Validation with Types

```typescript
import Yaka from 'yakajs';

const result = Yaka('#myForm').validate({
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        requiredMessage: 'Email is required',
        patternMessage: 'Invalid email format'
    },
    password: {
        required: true,
        min: 8,
        minMessage: 'Password must be at least 8 characters'
    }
});

// result has proper ValidationResult type
if (result.valid) {
    console.log('Form is valid');
} else {
    // errors is typed as Record<string, string[]>
    Object.keys(result.errors).forEach(field => {
        console.log(`${field}: ${result.errors[field].join(', ')}`);
    });
}
```

### Interactive Features

```typescript
import Yaka from 'yakajs';

// Draggable with typed options
Yaka('.draggable').draggable({
    onStart: (e: Event) => console.log('Started'),
    onDrag: (e: Event) => console.log('Dragging'),
    onEnd: (e: Event) => console.log('Ended'),
    handle: '.handle',
    axis: 'x'
});

// Resizable with proper typing
Yaka('.resizable').resizable({
    handles: ['se', 'e', 's'],
    minWidth: 100,
    minHeight: 100,
    aspectRatio: true,
    onResize: (e: Event, dims: { width: number; height: number }) => {
        console.log(`Resized to ${dims.width}x${dims.height}`);
    }
});
```

### Reactive Programming with Signals

```typescript
import Yaka from 'yakajs';

// Create a signal with type inference
const counter = Yaka.signal(0);

// Get and set with full type safety
const value: number = counter.get();
counter.set(10);
counter.update((v: number) => v + 1);
```

### Advanced Component System

```typescript
import Yaka from 'yakajs';

// Register component with typed options
Yaka.component('user-card', {
    template: '<div class="card">{{name}}</div>',
    data: () => ({
        name: 'John Doe',
        email: 'john@example.com'
    }),
    methods: {
        greet() {
            console.log(`Hello, ${this.name}!`);
        }
    },
    mounted() {
        console.log('Component mounted');
    }
});
```

## Using in Plain JavaScript

The library works perfectly in regular JavaScript files too! The type definitions are only used by TypeScript for type checking:

```javascript
// Works in .js files without any TypeScript setup
import Yaka from 'yakajs';

Yaka('#button').on('click', () => {
    Yaka.notify('Clicked!', 'success');
});
```

## Global Usage (CDN)

When using YakaJS from a CDN, the global types are available:

```html
<script src="https://cdn.jsdelivr.net/gh/Yaka-UI-Labs/YakaJS@latest/dist/min.yaka.js"></script>
<script>
    // Access via window.Yaka or window._
    _('#app').text('Hello, YakaJS!');
    Yaka.notify('App loaded!', 'success');
</script>
```

For TypeScript projects using global script tags, you can reference the types:

```typescript
/// <reference types="yakajs" />

// Now Yaka and _ are available globally with full type support
_('#app').addClass('loaded');
Yaka.ready(() => {
    console.log('Ready!');
});
```

## IDE Support

With TypeScript definitions, you get:

- ✅ **Autocomplete**: Full IntelliSense support in VS Code, WebStorm, and other IDEs
- ✅ **Type Checking**: Catch errors before runtime
- ✅ **Documentation**: Inline JSDoc comments appear as you type
- ✅ **Refactoring**: Safe renaming and code transformations
- ✅ **Go to Definition**: Jump to type definitions with F12

## Type Exports

If you need to use YakaJS types in your own code:

```typescript
import Yaka, { 
    ValidationRule,
    ValidationResult,
    DraggableOptions,
    AjaxOptions,
    ToastOptions,
    // ... and many more
} from 'yakajs';

// Use in your own types
interface MyForm {
    rules: Record<string, ValidationRule>;
    onSubmit: (result: ValidationResult) => void;
}
```

## Contributing

Found a type issue or missing definition? We welcome contributions! Please:

1. Check the `yaka.d.ts` file in the repository
2. Submit a pull request with your improvements
3. Include examples showing the usage

## License

MIT License - Same as YakaJS library
