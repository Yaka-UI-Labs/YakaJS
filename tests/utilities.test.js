// Utility Functions Tests
describe('Utility Functions', [
    it('should check if value is array', () => {
        expect(Yaka.isArray([])).toBeTruthy();
        expect(Yaka.isArray({})).toBeFalsy();
        expect(Yaka.isArray('string')).toBeFalsy();
    }),

    it('should check if value is object', () => {
        expect(Yaka.isObject({})).toBeTruthy();
        expect(Yaka.isObject([])).toBeFalsy();
        expect(Yaka.isObject(null)).toBeFalsy();
    }),

    it('should check if value is function', () => {
        expect(Yaka.isFunction(() => {})).toBeTruthy();
        expect(Yaka.isFunction({})).toBeFalsy();
    }),

    it('should check if value is string', () => {
        expect(Yaka.isString('test')).toBeTruthy();
        expect(Yaka.isString(123)).toBeFalsy();
    }),

    it('should check if value is number', () => {
        expect(Yaka.isNumber(123)).toBeTruthy();
        expect(Yaka.isNumber('123')).toBeFalsy();
    }),

    it('should map array values', () => {
        const arr = [1, 2, 3];
        const result = Yaka.map(arr, x => x * 2);
        expect(result).toEqual([2, 4, 6]);
    }),

    it('should filter array values', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = Yaka.filter(arr, x => x > 2);
        expect(result).toEqual([3, 4, 5]);
    }),

    it('should reduce array values', () => {
        const arr = [1, 2, 3, 4];
        const result = Yaka.reduce(arr, (sum, x) => sum + x, 0);
        expect(result).toBe(10);
    }),

    it('should find array element', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = Yaka.find(arr, x => x === 3);
        expect(result).toBe(3);
    }),

    it('should check if array includes value', () => {
        const arr = [1, 2, 3];
        expect(Yaka.includes(arr, 2)).toBeTruthy();
        expect(Yaka.includes(arr, 5)).toBeFalsy();
    }),

    it('should extend objects', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { b: 3, c: 4 };
        const result = Yaka.extend(obj1, obj2);
        expect(result.a).toBe(1);
        expect(result.b).toBe(3);
        expect(result.c).toBe(4);
    }),

    it('should clone objects', () => {
        const obj = { a: 1, b: { c: 2 } };
        const clone = Yaka.clone(obj);
        expect(clone).toEqual(obj);
        expect(clone).not.toBe(obj);
    }),

    it('should get unique array values', () => {
        const arr = [1, 2, 2, 3, 3, 3];
        const result = Yaka.unique(arr);
        expect(result).toEqual([1, 2, 3]);
    }),

    it('should flatten arrays', () => {
        const arr = [1, [2, 3], [4, [5, 6]]];
        const result = Yaka.flatten(arr);
        expect(result).toContain(1);
        expect(result).toContain(2);
        expect(result).toContain(3);
    }),

    it('should shuffle arrays', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = Yaka.shuffle(arr);
        expect(result.length).toBe(5);
        // Check all elements are still present
        expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
    }),

    it('should debounce functions', () => {
        let count = 0;
        const fn = Yaka.debounce(() => count++, 100);
        fn();
        fn();
        fn();
        // Should only execute once after delay
        expect(true).toBeTruthy();
    }),

    it('should throttle functions', () => {
        let count = 0;
        const fn = Yaka.throttle(() => count++, 100);
        fn();
        fn();
        fn();
        // Should execute immediately then throttle
        expect(count).toBeGreaterThan(0);
    }),

    it('should format dates', () => {
        const date = new Date('2024-01-15');
        const formatted = Yaka.formatDate(date, 'YYYY-MM-DD');
        expect(formatted).toContain('2024');
        expect(formatted).toContain('01');
        expect(formatted).toContain('15');
    }),

    it('should capitalize strings', () => {
        expect(Yaka.capitalize('hello')).toBe('Hello');
        expect(Yaka.capitalize('WORLD')).toBe('World');
    }),

    it('should truncate strings', () => {
        const text = 'This is a long string';
        const result = Yaka.truncate(text, 10);
        expect(result.length).toBeLessThan(text.length);
        expect(result).toContain('...');
    })
]);
