// Event Handling Tests
describe('Event Handling', [
    it('should attach click event listener', () => {
        document.body.innerHTML = '<button class="btn">Click</button>';
        let clicked = false;
        _('.btn').on('click', () => { clicked = true; });
        _('.btn')[0].click();
        expect(clicked).toBeTruthy();
    }),

    it('should remove event listener', () => {
        document.body.innerHTML = '<button class="btn">Click</button>';
        let clicked = false;
        const handler = () => { clicked = true; };
        _('.btn').on('click', handler);
        _('.btn').off('click', handler);
        _('.btn')[0].click();
        expect(clicked).toBeFalsy();
    }),

    it('should trigger events', () => {
        document.body.innerHTML = '<button class="btn">Click</button>';
        let clicked = false;
        _('.btn').on('click', () => { clicked = true; });
        _('.btn').trigger('click');
        expect(clicked).toBeTruthy();
    }),

    it('should handle one-time events', () => {
        document.body.innerHTML = '<button class="btn">Click</button>';
        let count = 0;
        _('.btn').one('click', () => { count++; });
        _('.btn')[0].click();
        _('.btn')[0].click();
        expect(count).toBe(1);
    }),

    it('should handle multiple event types', () => {
        document.body.innerHTML = '<button class="btn">Click</button>';
        let events = [];
        _('.btn').on('click mouseenter', (e) => {
            events.push(e.type);
        });
        _('.btn')[0].click();
        _('.btn')[0].dispatchEvent(new Event('mouseenter'));
        expect(events).toEqual(['click', 'mouseenter']);
    }),

    it('should handle delegated events', () => {
        document.body.innerHTML = '<div class="parent"><button class="btn">Click</button></div>';
        let clicked = false;
        _('.parent').on('click', '.btn', () => { clicked = true; });
        _('.btn')[0].click();
        expect(clicked).toBeTruthy();
    }),

    it('should handle hover events', () => {
        document.body.innerHTML = '<div class="box">Hover</div>';
        let entered = false;
        let left = false;
        _('.box').hover(
            () => { entered = true; },
            () => { left = true; }
        );
        _('.box')[0].dispatchEvent(new Event('mouseenter'));
        _('.box')[0].dispatchEvent(new Event('mouseleave'));
        expect(entered).toBeTruthy();
        expect(left).toBeTruthy();
    }),

    it('should handle focus events', () => {
        document.body.innerHTML = '<input class="input" type="text">';
        let focused = false;
        _('.input').on('focus', () => { focused = true; });
        _('.input')[0].focus();
        expect(focused).toBeTruthy();
    }),

    it('should handle keyboard events', () => {
        document.body.innerHTML = '<input class="input" type="text">';
        let key = null;
        _('.input').on('keydown', (e) => { key = e.key; });
        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        _('.input')[0].dispatchEvent(event);
        expect(key).toBe('Enter');
    }),

    it('should handle change events', () => {
        document.body.innerHTML = '<input class="input" type="text">';
        let changed = false;
        _('.input').on('change', () => { changed = true; });
        _('.input')[0].value = 'test';
        _('.input')[0].dispatchEvent(new Event('change'));
        expect(changed).toBeTruthy();
    })
]);
