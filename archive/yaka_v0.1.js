/*!
 * Yaka.js - Ultra-Simple JavaScript Library
 * Version: 1.0.0
 * Making JavaScript easier than jQuery
 * 
 * Copyright (c) 2026
 * Released under the MIT license
 */

(function (window) {
    'use strict';

    // Main Yaka constructor
    function Y(selector, context) {
        if (!(this instanceof Y)) {
            return new Y(selector, context);
        }

        // Handle function (DOM ready)
        if (typeof selector === 'function') {
            if (document.readyState !== 'loading') {
                selector();
            } else {
                document.addEventListener('DOMContentLoaded', selector);
            }
            return this;
        }

        // Handle null/undefined
        if (!selector) return this;

        // Handle HTML strings
        if (typeof selector === 'string') {
            if (selector[0] === '<') {
                const temp = document.createElement('div');
                temp.innerHTML = selector.trim();
                this.elements = Array.from(temp.children);
            } else {
                // CSS selector
                const ctx = context || document;
                this.elements = Array.from(ctx.querySelectorAll(selector));
            }
        }
        // Handle DOM elements
        else if (selector.nodeType) {
            this.elements = [selector];
        }
        // Handle arrays
        else if (Array.isArray(selector)) {
            this.elements = selector;
        }
        // Handle NodeList or HTMLCollection
        else if (selector.length !== undefined) {
            this.elements = Array.from(selector);
        }

        return this;
    }

    // Prototype methods
    Y.prototype = {
        // Iterate over elements
        each: function (callback) {
            this.elements.forEach((elem, i) => {
                callback.call(elem, i, elem);
            });
            return this;
        },

        // Get element at index
        get: function (index) {
            return index === undefined ? this.elements : this.elements[index];
        },

        // Get first element
        first: function () {
            return new Y(this.elements[0]);
        },

        // Get last element
        last: function () {
            return new Y(this.elements[this.elements.length - 1]);
        },

        // TEXT - Get/Set text content
        text: function (value) {
            if (value === undefined) {
                return this.elements[0]?.textContent || '';
            }
            return this.each((i, elem) => elem.textContent = value);
        },

        // HTML - Get/Set HTML content
        html: function (value) {
            if (value === undefined) {
                return this.elements[0]?.innerHTML || '';
            }
            return this.each((i, elem) => elem.innerHTML = value);
        },

        // VAL - Get/Set input value
        val: function (value) {
            if (value === undefined) {
                return this.elements[0]?.value || '';
            }
            return this.each((i, elem) => elem.value = value);
        },

        // ATTR - Get/Set attributes (super simple)
        attr: function (name, value) {
            if (typeof name === 'object') {
                return this.each((i, elem) => {
                    Object.keys(name).forEach(key => elem.setAttribute(key, name[key]));
                });
            }
            if (value === undefined) {
                return this.elements[0]?.getAttribute(name);
            }
            return this.each((i, elem) => elem.setAttribute(name, value));
        },

        // DATA - Get/Set data attributes (simplified)
        data: function (key, value) {
            if (value === undefined) {
                return this.elements[0]?.dataset[key];
            }
            return this.each((i, elem) => elem.dataset[key] = value);
        },

        // CSS - Get/Set styles (super easy)
        css: function (prop, value) {
            if (typeof prop === 'object') {
                return this.each((i, elem) => {
                    Object.assign(elem.style, prop);
                });
            }
            if (value === undefined) {
                return getComputedStyle(this.elements[0])?.[prop];
            }
            return this.each((i, elem) => elem.style[prop] = value);
        },

        // ADD - Add class (simpler name)
        add: function (className) {
            return this.each((i, elem) => {
                className.split(' ').forEach(cls => elem.classList.add(cls));
            });
        },

        // REMOVE - Remove class or element
        remove: function (className) {
            if (!className) {
                return this.each((i, elem) => elem.remove());
            }
            return this.each((i, elem) => {
                className.split(' ').forEach(cls => elem.classList.remove(cls));
            });
        },

        // TOGGLE - Toggle class
        toggle: function (className) {
            return this.each((i, elem) => {
                className.split(' ').forEach(cls => elem.classList.toggle(cls));
            });
        },

        // HAS - Check if has class
        has: function (className) {
            return this.elements[0]?.classList.contains(className) || false;
        },

        // SHOW - Show element
        show: function () {
            return this.each((i, elem) => elem.style.display = '');
        },

        // HIDE - Hide element
        hide: function () {
            return this.each((i, elem) => elem.style.display = 'none');
        },

        // FADE IN - Simplified fade in
        fadeIn: function (duration = 300) {
            return this.each((i, elem) => {
                elem.style.opacity = '0';
                elem.style.display = '';
                elem.style.transition = `opacity ${duration}ms`;
                setTimeout(() => elem.style.opacity = '1', 10);
            });
        },

        // FADE OUT - Simplified fade out
        fadeOut: function (duration = 300) {
            return this.each((i, elem) => {
                elem.style.transition = `opacity ${duration}ms`;
                elem.style.opacity = '0';
                setTimeout(() => elem.style.display = 'none', duration);
            });
        },

        // SLIDE DOWN - Simplified slide
        slideDown: function (duration = 300) {
            return this.each((i, elem) => {
                elem.style.overflow = 'hidden';
                elem.style.height = '0';
                elem.style.display = '';
                const height = elem.scrollHeight;
                elem.style.transition = `height ${duration}ms`;
                setTimeout(() => elem.style.height = height + 'px', 10);
                setTimeout(() => {
                    elem.style.height = '';
                    elem.style.overflow = '';
                }, duration);
            });
        },

        // SLIDE UP - Simplified slide
        slideUp: function (duration = 300) {
            return this.each((i, elem) => {
                elem.style.overflow = 'hidden';
                elem.style.height = elem.scrollHeight + 'px';
                elem.style.transition = `height ${duration}ms`;
                setTimeout(() => elem.style.height = '0', 10);
                setTimeout(() => elem.style.display = 'none', duration);
            });
        },

        // APPEND - Add content to end
        append: function (content) {
            return this.each((i, elem) => {
                if (typeof content === 'string') {
                    elem.insertAdjacentHTML('beforeend', content);
                } else if (content.elements) {
                    content.elements.forEach(child => elem.appendChild(child.cloneNode(true)));
                } else if (content.nodeType) {
                    elem.appendChild(content);
                }
            });
        },

        // PREPEND - Add content to start
        prepend: function (content) {
            return this.each((i, elem) => {
                if (typeof content === 'string') {
                    elem.insertAdjacentHTML('afterbegin', content);
                } else if (content.elements) {
                    content.elements.forEach(child => elem.insertBefore(child.cloneNode(true), elem.firstChild));
                } else if (content.nodeType) {
                    elem.insertBefore(content, elem.firstChild);
                }
            });
        },

        // EMPTY - Remove all children
        empty: function () {
            return this.each((i, elem) => elem.innerHTML = '');
        },

        // CLONE - Clone elements
        clone: function () {
            const clones = this.elements.map(elem => elem.cloneNode(true));
            return new Y(clones);
        },

        // PARENT - Get parent
        parent: function () {
            const parents = [...new Set(this.elements.map(elem => elem.parentNode))];
            return new Y(parents);
        },

        // CHILDREN - Get children
        children: function () {
            const children = [];
            this.each((i, elem) => children.push(...Array.from(elem.children)));
            return new Y(children);
        },

        // FIND - Find descendants
        find: function (selector) {
            const found = [];
            this.each((i, elem) => {
                found.push(...Array.from(elem.querySelectorAll(selector)));
            });
            return new Y(found);
        },

        // FILTER - Filter elements
        filter: function (selector) {
            const filtered = this.elements.filter(elem => elem.matches(selector));
            return new Y(filtered);
        },

        // ON - Event listener (simplified)
        on: function (event, selector, handler) {
            // Event delegation
            if (typeof selector === 'function') {
                handler = selector;
                selector = null;
            }

            return this.each((i, elem) => {
                if (selector) {
                    elem.addEventListener(event, e => {
                        const target = e.target.closest(selector);
                        if (target && elem.contains(target)) {
                            handler.call(target, e);
                        }
                    });
                } else {
                    elem.addEventListener(event, handler);
                }
            });
        },

        // OFF - Remove event
        off: function (event, handler) {
            return this.each((i, elem) => elem.removeEventListener(event, handler));
        },

        // CLICK - Click event (super simple)
        click: function (handler) {
            if (!handler) {
                this.elements[0]?.click();
                return this;
            }
            return this.on('click', handler);
        },

        // SUBMIT - Submit event
        submit: function (handler) {
            if (!handler) {
                this.elements[0]?.submit();
                return this;
            }
            return this.on('submit', handler);
        },

        // CHANGE - Change event
        change: function (handler) {
            return this.on('change', handler);
        },

        // INPUT - Input event
        input: function (handler) {
            return this.on('input', handler);
        },

        // FOCUS - Focus event/action
        focus: function (handler) {
            if (!handler) {
                this.elements[0]?.focus();
                return this;
            }
            return this.on('focus', handler);
        },

        // BLUR - Blur event
        blur: function (handler) {
            return this.on('blur', handler);
        },

        // HOVER - Hover event
        hover: function (handlerIn, handlerOut) {
            return this.on('mouseenter', handlerIn).on('mouseleave', handlerOut || handlerIn);
        }
    };

    // STATIC METHODS - Ultra simplified

    // GET - AJAX GET request
    Y.get = async function (url, data) {
        const params = data ? '?' + new URLSearchParams(data) : '';
        const response = await fetch(url + params);
        return response.json();
    };

    // POST - AJAX POST request
    Y.post = async function (url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    };

    // AJAX - Full AJAX (simplified)
    Y.ajax = async function (options) {
        const { url, method = 'GET', data, headers = {} } = options;

        const config = {
            method,
            headers: { 'Content-Type': 'application/json', ...headers }
        };

        if (method !== 'GET' && data) {
            config.body = JSON.stringify(data);
        }

        const fullUrl = method === 'GET' && data
            ? url + '?' + new URLSearchParams(data)
            : url;

        const response = await fetch(fullUrl, config);
        return response.json();
    };

    // EACH - Iterate over array/object
    Y.each = function (obj, callback) {
        if (Array.isArray(obj)) {
            obj.forEach(callback);
        } else {
            Object.keys(obj).forEach(key => callback(key, obj[key]));
        }
    };

    // MAP - Map array
    Y.map = function (array, callback) {
        return array.map(callback);
    };

    // FILTER - Filter array
    Y.filter = function (array, callback) {
        return array.filter(callback);
    };

    // READY - DOM ready
    Y.ready = function (handler) {
        if (document.readyState !== 'loading') {
            handler();
        } else {
            document.addEventListener('DOMContentLoaded', handler);
        }
    };

    // Export to window
    window.Y = Y;

    // Optional jQuery compatibility
    if (!window.$) {
        window.$ = Y;
    }

})(window);