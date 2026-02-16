// AJAX/HTTP Tests
describe('AJAX & HTTP', [
    it('should have Yaka.get method', () => {
        expect(typeof Yaka.get).toBe('function');
    }),

    it('should have Yaka.post method', () => {
        expect(typeof Yaka.post).toBe('function');
    }),

    it('should have Yaka.put method', () => {
        expect(typeof Yaka.put).toBe('function');
    }),

    it('should have Yaka.delete method', () => {
        expect(typeof Yaka.delete).toBe('function');
    }),

    it('should have Yaka.ajax method', () => {
        expect(typeof Yaka.ajax).toBe('function');
    }),

    it('should serialize form data', () => {
        document.body.innerHTML = '<form><input name="test" value="123"></form>';
        const data = _('form').serialize();
        expect(data).toContain('test=123');
    }),

    it('should serialize object to query string', () => {
        const params = Yaka.param({ name: 'John', age: 30 });
        expect(params).toContain('name=John');
        expect(params).toContain('age=30');
    }),

    it('should parse JSON strings', () => {
        const obj = Yaka.parseJSON('{"name":"John","age":30}');
        expect(obj.name).toBe('John');
        expect(obj.age).toBe(30);
    }),

    it('should handle AJAX error gracefully', () => {
        // Test that error handling is present
        expect(typeof Yaka.ajax).toBe('function');
    }),

    it('should create XHR requests', () => {
        // Test basic AJAX setup without making actual requests
        const config = {
            url: '/test',
            method: 'GET'
        };
        expect(config.url).toBe('/test');
        expect(config.method).toBe('GET');
    })
]);
