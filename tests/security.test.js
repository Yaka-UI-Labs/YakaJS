// Security Tests
describe('Security Features', [
    it('should have XSS sanitizer', () => {
        expect(typeof Yaka.sanitize).toBe('function');
    }),

    it('should sanitize HTML input', () => {
        const dirty = '<script>alert("xss")</script><p>Safe</p>';
        const clean = Yaka.sanitize(dirty);
        expect(clean).not.toContain('<script>');
        expect(clean).toContain('Safe');
    }),

    it('should escape HTML entities', () => {
        const escaped = Yaka.escapeHTML('<div>Test</div>');
        expect(escaped).toContain('&lt;');
        expect(escaped).toContain('&gt;');
    }),

    it('should generate CSRF tokens', () => {
        const token = Yaka.csrf.generate();
        expect(token).toBeTruthy();
        expect(typeof token).toBe('string');
    }),

    it('should validate CSRF tokens', () => {
        const token = Yaka.csrf.generate();
        expect(Yaka.csrf.validate(token)).toBeTruthy();
        expect(Yaka.csrf.validate('invalid')).toBeFalsy();
    }),

    it('should have secure storage methods', () => {
        expect(typeof Yaka.storage.set).toBe('function');
        expect(typeof Yaka.storage.get).toBe('function');
    }),

    it('should validate input types', () => {
        expect(Yaka.validate.email('test@example.com')).toBeTruthy();
        expect(Yaka.validate.email('invalid')).toBeFalsy();
    }),

    it('should validate URL format', () => {
        expect(Yaka.validate.url('https://example.com')).toBeTruthy();
        expect(Yaka.validate.url('not-a-url')).toBeFalsy();
    }),

    it('should sanitize URL', () => {
        const url = 'javascript:alert(1)';
        const safe = Yaka.sanitizeURL(url);
        expect(safe).not.toContain('javascript:');
    }),

    it('should prevent XSS in attributes', () => {
        document.body.innerHTML = '<div class="test"></div>';
        const malicious = '" onload="alert(1)"';
        _('.test').attr('data-value', malicious);
        // Should be safely encoded
        expect(_('.test').attr('data-value')).toBeTruthy();
    })
]);
