/**
 * TypeScript Test File for YakaJS
 * This file tests that the TypeScript definitions are working correctly
 */

import Yaka from './yaka';

// Test basic selector usage
const element = Yaka('#myElement');
const elements = Yaka('.myClass');

// Test DOM ready
Yaka.ready(() => {
    console.log('DOM is ready');
});

// Test instance methods
element
    .addClass('active')
    .text('Hello World')
    .on('click', (e: Event) => {
        console.log('Clicked');
    })
    .fadeIn(300);

// Test chaining
Yaka('#container')
    .find('.item')
    .each((index: number, elem: HTMLElement) => {
        console.log(index, elem);
    })
    .addClass('highlight')
    .show();

// Test static methods
const result = Yaka.map([1, 2, 3], (n: number) => n * 2);
const debounced = Yaka.debounce(() => console.log('Debounced'), 300);
const randomId: string = Yaka.randomId('prefix');

// Test AJAX
Yaka.get('/api/data').then((data: any) => {
    console.log(data);
});

Yaka.post('/api/save', { name: 'test' }).then((response: any) => {
    console.log(response);
});

// Test utilities
const cloned = Yaka.deepClone({ a: 1, b: { c: 2 } });
const merged = Yaka.merge({ a: 1 }, { b: 2 });
const isEq: boolean = Yaka.isEqual([1, 2], [1, 2]);

// Test array operations
const chunked: number[][] = Yaka.chunk([1, 2, 3, 4, 5], 2);
const unique: number[] = Yaka.uniq([1, 1, 2, 3]);
const shuffled: number[] = Yaka.shuffle([1, 2, 3]);

// Test string utilities
const camel: string = Yaka.camelCase('hello-world');
const kebab: string = Yaka.kebabCase('helloWorld');
const slug: string = Yaka.slugify('Hello World!');

// Test date utilities
const formatted: string = Yaka.formatDate(new Date(), 'YYYY-MM-DD');
const relative: string = Yaka.fromNow(new Date());

// Test type checking
const isStr: boolean = Yaka.isString('hello');
const isNum: boolean = Yaka.isNumber(42);
const isEmpty: boolean = Yaka.isEmpty([]);

// Test math utilities
const clamped: number = Yaka.clamp(15, 0, 10);
const sum: number = Yaka.sum([1, 2, 3, 4]);
const mean: number = Yaka.mean([1, 2, 3, 4]);

// Test async utilities
Yaka.sleep(1000).then(() => console.log('Slept'));
Yaka.timeout(Promise.resolve('done'), 5000).then((res: string) => console.log(res));

// Test storage
Yaka.cookie.set('token', 'abc123', 7);
const token = Yaka.cookie.get('token');

Yaka.storage.set('user', { id: 1, name: 'John' });
const user = Yaka.storage.get('user');

// Test animations
Yaka('#box')
    .animate({ opacity: 0.5, width: '200px' }, 500, 'ease-in-out')
    .fadeIn(300)
    .slideDown(400);

// Test interactive features
Yaka('.draggable').draggable({
    onStart: (e: Event) => console.log('Started'),
    onDrag: (e: Event) => console.log('Dragging'),
    onEnd: (e: Event) => console.log('Ended')
});

Yaka('.resizable').resizable({
    handles: ['se', 'e', 's'],
    minWidth: 100,
    minHeight: 100,
    onResize: (e: Event, dims: { width: number; height: number }) => {
        console.log('Resized', dims);
    }
});

// Test validation
const validationResult = Yaka('#myForm').validate({
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

if (validationResult.valid) {
    console.log('Form is valid');
} else {
    console.log('Errors:', validationResult.errors);
}

// Test UI components
Yaka('#tooltip').tooltip('Hover text', 'top');
Yaka('#myTabs').tabs();
Yaka('#accordion').accordion();
Yaka('#carousel').carousel({
    autoplay: true,
    interval: 3000
});

// Test advanced features
const signal = Yaka.signal(0);
signal.set(10);
const value: number = signal.get();
signal.update((v: number) => v + 1);

Yaka.component('my-component', {
    template: '<div>{{message}}</div>',
    data: () => ({ message: 'Hello' }),
    methods: {
        greet: () => console.log('Hello!')
    }
});

// Test notifications
Yaka.notify('Success!', 'success', 3000);
Yaka.toast('Info message', { type: 'info', duration: 2000 });

// Test WebSocket
const ws = Yaka.websocket('ws://localhost:8080', {
    onOpen: (e: Event) => console.log('Connected'),
    onMessage: (e: MessageEvent) => console.log('Message', e.data),
    onClose: (e: CloseEvent) => console.log('Closed')
});

// Test feature detection
const supportsWebGL: boolean = Yaka.supports('webgl');

console.log('TypeScript definitions test completed successfully!');
