// Animation Tests
describe('Animations', [
    it('should have fadeIn method', () => {
        document.body.innerHTML = '<div class="test" style="display:none;"></div>';
        expect(typeof _('.test').fadeIn).toBe('function');
    }),

    it('should have fadeOut method', () => {
        document.body.innerHTML = '<div class="test"></div>';
        expect(typeof _('.test').fadeOut).toBe('function');
    }),

    it('should have slideDown method', () => {
        document.body.innerHTML = '<div class="test" style="display:none;"></div>';
        expect(typeof _('.test').slideDown).toBe('function');
    }),

    it('should have slideUp method', () => {
        document.body.innerHTML = '<div class="test"></div>';
        expect(typeof _('.test').slideUp).toBe('function');
    }),

    it('should have animate method', () => {
        document.body.innerHTML = '<div class="test"></div>';
        expect(typeof _('.test').animate).toBe('function');
    }),

    it('should apply CSS transition', () => {
        document.body.innerHTML = '<div class="test"></div>';
        _('.test').css('transition', 'all 0.3s');
        expect(_('.test').css('transition')).toContain('0.3s');
    }),

    it('should support transform animations', () => {
        document.body.innerHTML = '<div class="test"></div>';
        _('.test').css('transform', 'translateX(100px)');
        expect(_('.test').css('transform')).toContain('100px');
    }),

    it('should have toggle method', () => {
        document.body.innerHTML = '<div class="test"></div>';
        expect(typeof _('.test').toggle).toBe('function');
    }),

    it('should support opacity animations', () => {
        document.body.innerHTML = '<div class="test"></div>';
        _('.test').css('opacity', '0.5');
        expect(_('.test').css('opacity')).toBe('0.5');
    }),

    it('should chain animation methods', () => {
        document.body.innerHTML = '<div class="test"></div>';
        const result = _('.test').css('opacity', '0').css('color', 'red');
        expect(result.length).toBe(1);
    })
]);
