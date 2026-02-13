/*!
 * Yaka.js - Next-Gen JavaScript Library
 * Version: 2.0.0
 * More powerful than jQuery, simpler to write
 * 
 * Copyright (c) 2026
 * Released under the MIT license
 */

(function (window) {
    'use strict';


    // ==================== CONSTRUCTOR ====================

/*!
 * Yaka.js - Next-Gen JavaScript Library
 * Version: 2.0.0
 * More powerful than jQuery, simpler to write
 * 
 * Copyright (c) 2026
 * Released under the MIT license
 */

(function (window) {
    'use strict';

    // Main @ constructor
    function Yaka(selector, context) {
        if (!(this instanceof Yaka)) {
            return new Yaka(selector, context);
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

    // ==================== BASIC METHODS ====================

        // ==================== BASIC METHODS ====================

        each: function (callback) {
            this.elements.forEach((elem, i) => {
                callback.call(elem, i, elem);
            });
            return this;
        },

        get: function (index) {
            return index === undefined ? this.elements : this.elements[index];
        },

        first: function () {
            return new Yaka(this.elements[0]);
        },

        last: function () {
            return new Yaka(this.elements[this.elements.length - 1]);
        },

        eq: function (index) {
            return new Yaka(this.elements[index]);
        },

    // ==================== CONTENT ====================

        // ==================== CONTENT METHODS ====================

        text: function (value) {
            if (value === undefined) {
                return this.elements[0]?.textContent || '';
            }
            return this.each((i, elem) => elem.textContent = value);
        },

        html: function (value) {
            if (value === undefined) {
                return this.elements[0]?.innerHTML || '';
            }
            return this.each((i, elem) => elem.innerHTML = value);
        },

        val: function (value) {
            if (value === undefined) {
                return this.elements[0]?.value || '';
            }
            return this.each((i, elem) => elem.value = value);
        },

    // ==================== ATTRIBUTES ====================

        // ==================== ATTRIBUTES ====================

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

        removeAttr: function (name) {
            return this.each((i, elem) => elem.removeAttribute(name));
        },

        data: function (key, value) {
            if (value === undefined) {
                return this.elements[0]?.dataset[key];
            }
            return this.each((i, elem) => elem.dataset[key] = value);
        },

    // ==================== CLASSES ====================

        // ==================== CLASSES ====================

        add: function (className) {
            return this.each((i, elem) => {
                className.split(' ').forEach(cls => elem.classList.add(cls));
            });
        },

        remove: function (className) {
            if (!className) {
                return this.each((i, elem) => elem.remove());
            }
            return this.each((i, elem) => {
                className.split(' ').forEach(cls => elem.classList.remove(cls));
            });
        },

        toggle: function (className) {
            return this.each((i, elem) => {
                className.split(' ').forEach(cls => elem.classList.toggle(cls));
            });
        },

        has: function (className) {
            return this.elements[0]?.classList.contains(className) || false;
        },

    // ==================== STYLES ====================

        // ==================== STYLES ====================

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

        show: function () {
            return this.each((i, elem) => elem.style.display = '');
        },

        hide: function () {
            return this.each((i, elem) => elem.style.display = 'none');
        },

    // ==================== DOM MANIPULATION ====================

        // ==================== DOM MANIPULATION ====================

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

        after: function (content) {
            return this.each((i, elem) => {
                if (typeof content === 'string') {
                    elem.insertAdjacentHTML('afterend', content);
                } else if (content.nodeType && elem.parentNode) {
                    elem.parentNode.insertBefore(content, elem.nextSibling);
                }
            });
        },

        before: function (content) {
            return this.each((i, elem) => {
                if (typeof content === 'string') {
                    elem.insertAdjacentHTML('beforebegin', content);
                } else if (content.nodeType && elem.parentNode) {
                    elem.parentNode.insertBefore(content, elem);
                }
            });
        },

        empty: function () {
            return this.each((i, elem) => elem.innerHTML = '');
        },

        clone: function () {
            const clones = this.elements.map(elem => elem.cloneNode(true));
            return new Yaka(clones);
        },

        // NEW! Replace element
        replace: function (newContent) {
            return this.each((i, elem) => {
                if (typeof newContent === 'string') {
                    elem.outerHTML = newContent;
                } else if (newContent.nodeType) {
                    elem.parentNode.replaceChild(newContent, elem);
                }
            });
        },

        // NEW! Wrap element
        wrap: function (wrapper) {
            return this.each((i, elem) => {
                const wrapElem = typeof wrapper === 'string'
                    ? document.createElement(wrapper)
                    : wrapper.cloneNode(true);
                elem.parentNode.insertBefore(wrapElem, elem);
                wrapElem.appendChild(elem);
            });
        },

    // ==================== TRAVERSAL ====================

        // ==================== TRAVERSAL ====================

        parent: function () {
            const parents = [...new Set(this.elements.map(elem => elem.parentNode))];
            return new Yaka(parents);
        },

        children: function (selector) {
            const children = [];
            this.each((i, elem) => children.push(...Array.from(elem.children)));
            const result = new Yaka(children);
            return selector ? result.filter(selector) : result;
        },

        siblings: function () {
            const siblings = [];
            this.each((i, elem) => {
                const parent = elem.parentNode;
                if (parent) {
                    Array.from(parent.children).forEach(child => {
                        if (child !== elem && !siblings.includes(child)) {
                            siblings.push(child);
                        }
                    });
                }
            });
            return new Yaka(siblings);
        },

        next: function () {
            const nexts = this.elements.map(elem => elem.nextElementSibling).filter(Boolean);
            return new Yaka(nexts);
        },

        prev: function () {
            const prevs = this.elements.map(elem => elem.previousElementSibling).filter(Boolean);
            return new Yaka(prevs);
        },

        find: function (selector) {
            const found = [];
            this.each((i, elem) => {
                found.push(...Array.from(elem.querySelectorAll(selector)));
            });
            return new Yaka(found);
        },

        filter: function (selector) {
            const filtered = this.elements.filter(elem => elem.matches(selector));
            return new Yaka(filtered);
        },

        // NEW! Closest parent matching selector
        closest: function (selector) {
            const closest = this.elements.map(elem => elem.closest(selector)).filter(Boolean);
            return new Yaka(closest);
        },

        // NEW! Check if matches selector
        is: function (selector) {
            return this.elements[0]?.matches(selector) || false;
        },

    // ==================== EVENTS ====================

        // ==================== EVENTS ====================

        on: function (event, selector, handler) {
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

        off: function (event, handler) {
            return this.each((i, elem) => elem.removeEventListener(event, handler));
        },

        // NEW! One-time event
        once: function (event, handler) {
            return this.each((i, elem) => {
                elem.addEventListener(event, handler, { once: true });
            });
        },

        trigger: function (event, data) {
            return this.each((i, elem) => {
                const evt = new CustomEvent(event, { bubbles: true, detail: data });
                elem.dispatchEvent(evt);
            });
        },

        click: function (handler) {
            if (!handler) {
                this.elements[0]?.click();
                return this;
            }
            return this.on('click', handler);
        },

        submit: function (handler) {
            if (!handler) {
                this.elements[0]?.submit();
                return this;
            }
            return this.on('submit', handler);
        },

        change: function (handler) {
            return this.on('change', handler);
        },

        input: function (handler) {
            return this.on('input', handler);
        },

        focus: function (handler) {
            if (!handler) {
                this.elements[0]?.focus();
                return this;
            }
            return this.on('focus', handler);
        },

        blur: function (handler) {
            return this.on('blur', handler);
        },

        hover: function (handlerIn, handlerOut) {
            return this.on('mouseenter', handlerIn).on('mouseleave', handlerOut || handlerIn);
        },

        // NEW! Scroll event
        scroll: function (handler) {
            return this.on('scroll', handler);
        },

        // NEW! Resize event
        resize: function (handler) {
            return this.on('resize', handler);
        },

    // ==================== UTILITIES ====================

    // ==================== STATIC METHODS ====================

    // AJAX
    Yaka.get = async function (url, data) {
        const params = data ? '?' + new URLSearchParams(data) : '';
        const response = await fetch(url + params);
        return response.json();
    };

    Yaka.post = async function (url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    };

    Yaka.put = async function (url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    };

    Yaka.delete = async function (url) {
        const response = await fetch(url, { method: 'DELETE' });
        return response.json();
    };

    Yaka.ajax = async function (options) {
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

    // Utilities
    Yaka.each = function (obj, callback) {
        if (Array.isArray(obj)) {
            obj.forEach(callback);
        } else {
            Object.keys(obj).forEach(key => callback(key, obj[key]));
        }
    };

    Yaka.map = function (array, callback) {
        return array.map(callback);
    };

    Yaka.filter = function (array, callback) {
        return array.filter(callback);
    };

    Yaka.ready = function (handler) {
        if (document.readyState !== 'loading') {
            handler();
        } else {
            document.addEventListener('DOMContentLoaded', handler);
        }
    };

    // NEW! Debounce function
    Yaka.debounce = function (func, delay = 300) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // NEW! Throttle function
    Yaka.throttle = function (func, delay = 300) {
        let lastRun = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastRun >= delay) {
                func.apply(this, args);
                lastRun = now;
            }
        };
    };

    // NEW! Generate random ID
    Yaka.randomId = function (prefix = 'id') {
        return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
    };

    // NEW! Format number
    Yaka.formatNumber = function (num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // NEW! Format currency
    Yaka.formatCurrency = function (num, symbol = '$') {
        return `${symbol}${Yaka.formatNumber(num.toFixed(2))}`;
    };

    // NEW! Parse query string
    Yaka.parseQuery = function (query = window.location.search) {
        const params = new URLSearchParams(query);
        const result = {};
        for (let [key, value] of params) {
            result[key] = value;
        }
        return result;
    };

    // NEW! Cookie helpers
    Yaka.cookie = {
        set: function (name, value, days = 7) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
        },
        get: function (name) {
            const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            return match ? match[2] : null;
        },
        remove: function (name) {
            this.set(name, '', -1);
        }
    };

    // NEW! Local storage helpers
    Yaka.storage = {
        set: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        get: function (key) {
            const item = localStorage.getItem(key);
            try {
                return JSON.parse(item);
            } catch {
                return item;
            }
        },
        remove: function (key) {
            localStorage.removeItem(key);
        },
        clear: function () {
            localStorage.clear();
        }
    };

    // Export
    window.Yaka = Yaka;
    window._ = Yaka;
})(window);
