// DOM Manipulation Tests
describe('DOM Manipulation', [
    it('should select elements with _() selector', () => {
        document.body.innerHTML = '<div class="test">Test</div>';
        const elements = _('.test');
        expect(elements.length).toBe(1);
    }),

    it('should create elements from HTML string', () => {
        const el = _('<div>Hello</div>');
        expect(el.length).toBe(1);
        expect(el[0].textContent).toBe('Hello');
    }),

    it('should add class to elements', () => {
        document.body.innerHTML = '<div class="test"></div>';
        _('.test').addClass('newclass');
        expect(_('.test')[0].classList.contains('newclass')).toBeTruthy();
    }),

    it('should remove class from elements', () => {
        document.body.innerHTML = '<div class="test oldclass"></div>';
        _('.test').removeClass('oldclass');
        expect(_('.test')[0].classList.contains('oldclass')).toBeFalsy();
    }),

    it('should toggle class on elements', () => {
        document.body.innerHTML = '<div class="test"></div>';
        const el = _('.test');
        el.toggleClass('active');
        expect(el[0].classList.contains('active')).toBeTruthy();
        el.toggleClass('active');
        expect(el[0].classList.contains('active')).toBeFalsy();
    }),

    it('should set and get text content', () => {
        document.body.innerHTML = '<div class="test"></div>';
        _('.test').text('Hello World');
        expect(_('.test').text()).toBe('Hello World');
    }),

    it('should set and get HTML content', () => {
        document.body.innerHTML = '<div class="test"></div>';
        _('.test').html('<span>Test</span>');
        expect(_('.test').html()).toContain('<span>Test</span>');
    }),

    it('should append elements', () => {
        document.body.innerHTML = '<div class="parent"></div>';
        _('.parent').append('<div class="child">Child</div>');
        expect(_('.parent .child').length).toBe(1);
    }),

    it('should prepend elements', () => {
        document.body.innerHTML = '<div class="parent"><div>Original</div></div>';
        _('.parent').prepend('<div class="first">First</div>');
        expect(_('.parent')[0].firstElementChild.className).toBe('first');
    }),

    it('should remove elements', () => {
        document.body.innerHTML = '<div class="test">Test</div>';
        _('.test').remove();
        expect(_('.test').length).toBe(0);
    }),

    it('should get and set attributes', () => {
        document.body.innerHTML = '<div class="test"></div>';
        _('.test').attr('data-value', '123');
        expect(_('.test').attr('data-value')).toBe('123');
    }),

    it('should remove attributes', () => {
        document.body.innerHTML = '<div class="test" data-value="123"></div>';
        _('.test').removeAttr('data-value');
        expect(_('.test')[0].hasAttribute('data-value')).toBeFalsy();
    }),

    it('should get and set CSS properties', () => {
        document.body.innerHTML = '<div class="test"></div>';
        _('.test').css('color', 'red');
        expect(_('.test').css('color')).toBe('red');
    }),

    it('should show and hide elements', () => {
        document.body.innerHTML = '<div class="test">Test</div>';
        const el = _('.test');
        el.hide();
        expect(el[0].style.display).toBe('none');
        el.show();
        expect(el[0].style.display).not.toBe('none');
    }),

    it('should find child elements', () => {
        document.body.innerHTML = '<div class="parent"><span class="child">Child</span></div>';
        const child = _('.parent').find('.child');
        expect(child.length).toBe(1);
    }),

    it('should get parent element', () => {
        document.body.innerHTML = '<div class="parent"><span class="child">Child</span></div>';
        const parent = _('.child').parent();
        expect(parent[0].className).toBe('parent');
    }),

    it('should get siblings', () => {
        document.body.innerHTML = '<div><span class="first"></span><span class="second"></span></div>';
        const siblings = _('.first').siblings();
        expect(siblings.length).toBe(1);
    }),

    it('should check if element has class', () => {
        document.body.innerHTML = '<div class="test active"></div>';
        expect(_('.test').hasClass('active')).toBeTruthy();
        expect(_('.test').hasClass('inactive')).toBeFalsy();
    }),

    it('should get element by index', () => {
        document.body.innerHTML = '<div class="test">1</div><div class="test">2</div>';
        const el = _('.test').eq(1);
        expect(el[0].textContent).toBe('2');
    }),

    it('should iterate over elements with each', () => {
        document.body.innerHTML = '<div class="test">1</div><div class="test">2</div>';
        let count = 0;
        _('.test').each(function() {
            count++;
        });
        expect(count).toBe(2);
    })
]);
