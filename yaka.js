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

    // Prototype methods
    Yaka.prototype = {
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

        // ==================== ANIMATIONS (ENHANCED!) ====================

        fadeIn: function (duration = 300) {
            return this.each((i, elem) => {
                elem.style.opacity = '0';
                elem.style.display = '';
                elem.style.transition = `opacity ${duration}ms`;
                setTimeout(() => elem.style.opacity = '1', 10);
            });
        },

        fadeOut: function (duration = 300) {
            return this.each((i, elem) => {
                elem.style.transition = `opacity ${duration}ms`;
                elem.style.opacity = '0';
                setTimeout(() => elem.style.display = 'none', duration);
            });
        },

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

        slideUp: function (duration = 300) {
            return this.each((i, elem) => {
                elem.style.overflow = 'hidden';
                elem.style.height = elem.scrollHeight + 'px';
                elem.style.transition = `height ${duration}ms`;
                setTimeout(() => elem.style.height = '0', 10);
                setTimeout(() => elem.style.display = 'none', duration);
            });
        },

        // NEW! Animate any CSS property
        animate: function (props, duration = 400, easing = 'ease') {
            return this.each((i, elem) => {
                const transitions = Object.keys(props).map(key => `${key} ${duration}ms ${easing}`).join(', ');
                elem.style.transition = transitions;
                Object.assign(elem.style, props);
                setTimeout(() => elem.style.transition = '', duration);
            });
        },

        // NEW! Pulse animation
        pulse: function (times = 3) {
            return this.each((i, elem) => {
                let count = 0;
                const interval = setInterval(() => {
                    elem.style.transform = count % 2 === 0 ? 'scale(1.1)' : 'scale(1)';
                    elem.style.transition = 'transform 150ms';
                    count++;
                    if (count >= times * 2) {
                        clearInterval(interval);
                        elem.style.transform = '';
                    }
                }, 150);
            });
        },

        // NEW! Shake animation
        shake: function () {
            return this.each((i, elem) => {
                elem.style.animation = 'shake 0.5s';
                setTimeout(() => elem.style.animation = '', 500);
            });
        },

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

        // ==================== ADVANCED FEATURES (jQuery doesn't have!) ====================

        // NEW! Debounced event
        debounce: function (event, handler, delay = 300) {
            return this.each((i, elem) => {
                let timeout;
                elem.addEventListener(event, (e) => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => handler.call(elem, e), delay);
                });
            });
        },

        // NEW! Throttled event
        throttle: function (event, handler, delay = 300) {
            return this.each((i, elem) => {
                let lastRun = 0;
                elem.addEventListener(event, (e) => {
                    const now = Date.now();
                    if (now - lastRun >= delay) {
                        handler.call(elem, e);
                        lastRun = now;
                    }
                });
            });
        },

        // NEW! Observe element visibility
        onVisible: function (handler, options = {}) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        handler.call(entry.target, entry);
                    }
                });
            }, options);

            this.each((i, elem) => observer.observe(elem));
            return this;
        },

        // NEW! Lazy load images
        lazyLoad: function () {
            return this.onVisible(function () {
                const img = this;
                const src = img.dataset.src;
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
            });
        },

        // NEW! Copy to clipboard
        copy: function () {
            const text = this.text();
            navigator.clipboard.writeText(text);
            return this;
        },

        // NEW! Serialize form data
        serialize: function () {
            const form = this.elements[0];
            if (!form || form.tagName !== 'FORM') return {};

            const formData = new FormData(form);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            return data;
        },

        // NEW! Auto-save form
        autoSave: function (key, delay = 1000) {
            return this.debounce('input', function () {
                const data = new Yaka(this).serialize();
                localStorage.setItem(key, JSON.stringify(data));
            }, delay);
        },

        // NEW! Restore form data
        restore: function (key) {
            const data = JSON.parse(localStorage.getItem(key) || '{}');
            return this.each((i, elem) => {
                if (elem.tagName === 'FORM') {
                    Object.keys(data).forEach(name => {
                        const input = elem.querySelector(`[name="${name}"]`);
                        if (input) input.value = data[name];
                    });
                }
            });
        },

        // NEW! Validate form
        validate: function (rules) {
            const form = this.elements[0];
            if (!form) return { valid: true, errors: {} };

            const errors = {};
            let valid = true;

            Object.keys(rules).forEach(name => {
                const input = form.querySelector(`[name="${name}"]`);
                if (!input) return;

                const rule = rules[name];
                const value = input.value;

                if (rule.required && !value) {
                    errors[name] = rule.message || 'This field is required';
                    valid = false;
                } else if (rule.pattern && !rule.pattern.test(value)) {
                    errors[name] = rule.message || 'Invalid format';
                    valid = false;
                } else if (rule.min && value.length < rule.min) {
                    errors[name] = rule.message || `Minimum ${rule.min} characters`;
                    valid = false;
                } else if (rule.max && value.length > rule.max) {
                    errors[name] = rule.message || `Maximum ${rule.max} characters`;
                    valid = false;
                }
            });

            return { valid, errors };
        },

        // NEW! Smooth scroll to element
        scrollTo: function (duration = 500) {
            if (this.elements[0]) {
                this.elements[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            return this;
        },

        // NEW! Count up animation
        countUp: function (target, duration = 2000) {
            return this.each((i, elem) => {
                // Validate target is a number
                if (typeof target !== 'number' || isNaN(target)) {
                    console.error('countUp target must be a valid number');
                    return;
                }
                
                const start = parseInt(elem.textContent) || 0;
                const end = target;
                const range = end - start;
                const increment = range / (duration / 16);
                let current = start;

                const timer = setInterval(() => {
                    current += increment;
                    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                        elem.textContent = Math.round(end);
                        clearInterval(timer);
                    } else {
                        elem.textContent = Math.round(current);
                    }
                }, 16);
            });
        },

        // NEW! Type writer effect
        typeWriter: function (text, speed = 50) {
            return this.each((i, elem) => {
                // Validate text is provided
                if (typeof text !== 'string') {
                    console.error('typeWriter requires a string');
                    return;
                }
                
                elem.textContent = '';
                let index = 0;
                const timer = setInterval(() => {
                    if (index < text.length) {
                        elem.textContent += text.charAt(index);
                        index++;
                    } else {
                        clearInterval(timer);
                    }
                }, speed);
            });
        },

        // NEW! Confetti effect
        confetti: function () {
            return this.each((i, elem) => {
                if (!elem._yaka_confetti_timeouts) {
                    elem._yaka_confetti_timeouts = [];
                }
                
                const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
                for (let i = 0; i < 50; i++) {
                    const confetti = document.createElement('div');
                    confetti.style.cssText = `
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        background: ${colors[Math.floor(Math.random() * colors.length)]};
                        left: ${Math.random() * 100}%;
                        top: -10px;
                        animation: fall ${2 + Math.random() * 3}s linear;
                    `;
                    elem.style.position = 'relative';
                    elem.appendChild(confetti);
                    
                    const timeoutId = setTimeout(() => confetti.remove(), 5000);
                    elem._yaka_confetti_timeouts.push(timeoutId);
                }
                
                // Store cleanup method
                if (!elem._yaka_confetti_cleanup) {
                    elem._yaka_confetti_cleanup = () => {
                        if (elem._yaka_confetti_timeouts) {
                            elem._yaka_confetti_timeouts.forEach(id => clearTimeout(id));
                            elem._yaka_confetti_timeouts = [];
                        }
                        delete elem._yaka_confetti_cleanup;
                    };
                }
            });
        }
    };

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

    // ==================== ADVANCED FEATURES ====================

    // NEW! Drag & Drop
    Yaka.prototype.draggable = function (options = {}) {
        return this.each((i, elem) => {
            if (elem._yaka_draggable) return;
            elem._yaka_draggable = true;

            let isDragging = false;
            let startX, startY, initialX, initialY;

            elem.style.cursor = 'move';
            elem.style.position = 'relative';

            elem.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                initialX = elem.offsetLeft;
                initialY = elem.offsetTop;
                elem.style.zIndex = 1000;
                if (options.onStart) options.onStart.call(elem, e);
            });

            const handleMouseMove = (e) => {
                if (!isDragging) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                elem.style.left = (initialX + dx) + 'px';
                elem.style.top = (initialY + dy) + 'px';
                if (options.onDrag) options.onDrag.call(elem, e);
            };

            const handleMouseUp = (e) => {
                if (isDragging) {
                    isDragging = false;
                    elem.style.zIndex = '';
                    if (options.onEnd) options.onEnd.call(elem, e);
                }
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            
            // Store handlers for cleanup
            elem._yaka_draggable_cleanup = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                delete elem._yaka_draggable;
                delete elem._yaka_draggable_cleanup;
            };
        });
    };

    // NEW! Sortable lists
    Yaka.prototype.sortable = function (options = {}) {
        return this.each((i, container) => {
            let draggedItem = null;

            Array.from(container.children).forEach(item => {
                item.draggable = true;
                item.style.cursor = 'move';

                item.addEventListener('dragstart', (e) => {
                    draggedItem = item;
                    item.style.opacity = '0.5';
                });

                item.addEventListener('dragend', () => {
                    item.style.opacity = '';
                    if (options.onChange) options.onChange.call(container);
                });

                item.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    const afterElement = getDragAfterElement(container, e.clientY);
                    if (afterElement === null) {
                        container.appendChild(draggedItem);
                    } else {
                        container.insertBefore(draggedItem, afterElement);
                    }
                });
            });

            function getDragAfterElement(container, y) {
                const draggableElements = [...container.querySelectorAll('[draggable="true"]:not(.dragging)')];
                return draggableElements.reduce((closest, child) => {
                    const box = child.getBoundingClientRect();
                    const offset = y - box.top - box.height / 2;
                    if (offset < 0 && offset > closest.offset) {
                        return { offset: offset, element: child };
                    } else {
                        return closest;
                    }
                }, { offset: Number.NEGATIVE_INFINITY }).element;
            }
        });
    };

    // NEW! Touch gestures
    Yaka.prototype.swipe = function (handlers) {
        return this.each((i, elem) => {
            let startX, startY, startTime;

            elem.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                startTime = Date.now();
            });

            elem.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const diffX = endX - startX;
                const diffY = endY - startY;
                const diffTime = Date.now() - startTime;

                if (diffTime < 300) {
                    if (Math.abs(diffX) > Math.abs(diffY)) {
                        if (diffX > 50 && handlers.right) handlers.right.call(elem, e);
                        if (diffX < -50 && handlers.left) handlers.left.call(elem, e);
                    } else {
                        if (diffY > 50 && handlers.down) handlers.down.call(elem, e);
                        if (diffY < -50 && handlers.up) handlers.up.call(elem, e);
                    }
                }
            });
        });
    };

    // NEW! State management
    Yaka.state = function (initialState = {}) {
        let state = { ...initialState };
        const listeners = [];

        return {
            get: (key) => key ? state[key] : state,
            set: (key, value) => {
                if (typeof key === 'object') {
                    state = { ...state, ...key };
                } else {
                    state[key] = value;
                }
                listeners.forEach(fn => fn(state));
            },
            subscribe: (fn) => {
                listeners.push(fn);
                return () => {
                    const index = listeners.indexOf(fn);
                    if (index > -1) listeners.splice(index, 1);
                };
            },
            reset: () => {
                state = { ...initialState };
                listeners.forEach(fn => fn(state));
            }
        };
    };

    // NEW! Notification system
    Yaka.notify = function (message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        const colors = {
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FF9800',
            error: '#F44336'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
            font-family: system-ui, -apple-system, sans-serif;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    };

    // NEW! Modal dialog
    Yaka.modal = function (content, options = {}) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: ${options.width || '500px'};
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: scaleIn 0.3s ease;
        `;
        modal.innerHTML = content;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => overlay.remove(), 300);
            }
        });

        return {
            close: () => {
                overlay.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => overlay.remove(), 300);
            }
        };
    };

    // NEW! Tooltip
    Yaka.prototype.tooltip = function (text, position = 'top') {
        return this.each((i, elem) => {
            if (elem._yaka_tooltip) return;
            elem._yaka_tooltip = true;
            
            const tooltip = document.createElement('div');
            tooltip.textContent = text;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                white-space: nowrap;
                z-index: 10000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s;
            `;

            const handleMouseEnter = () => {
                document.body.appendChild(tooltip);
                const rect = elem.getBoundingClientRect();

                if (position === 'top') {
                    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
                    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
                } else if (position === 'bottom') {
                    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
                    tooltip.style.top = rect.bottom + 8 + 'px';
                }

                tooltip.style.opacity = '1';
            };

            const handleMouseLeave = () => {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    if (tooltip.parentNode) tooltip.remove();
                }, 200);
            };

            elem.addEventListener('mouseenter', handleMouseEnter);
            elem.addEventListener('mouseleave', handleMouseLeave);
            
            // Store cleanup method
            elem._yaka_tooltip_cleanup = () => {
                elem.removeEventListener('mouseenter', handleMouseEnter);
                elem.removeEventListener('mouseleave', handleMouseLeave);
                if (tooltip.parentNode) tooltip.remove();
                delete elem._yaka_tooltip;
                delete elem._yaka_tooltip_cleanup;
            };
        });
    };

    // NEW! Image upload with preview
    Yaka.prototype.imageUpload = function (callback) {
        return this.each((i, elem) => {
            elem.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        callback.call(elem, e.target.result, file);
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    };

    // NEW! Download file
    Yaka.download = function (data, filename, type = 'text/plain') {
        const blob = new Blob([data], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    // NEW! Print element
    Yaka.prototype.print = function () {
        const content = this.elements[0]?.innerHTML;
        if (!content) return this;

        const printWindow = window.open('', '', 'width=800,height=600');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head><title>Print</title></head>
                    <body>${content}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
        return this;
    };

    // NEW! Fullscreen
    Yaka.prototype.fullscreen = function () {
        const elem = this.elements[0];
        if (!elem) return this;

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        return this;
    };

    // NEW! Exit fullscreen
    Yaka.exitFullscreen = function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };

    // NEW! Speech synthesis
    Yaka.speak = function (text, options = {}) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = options.rate || 1;
        utterance.pitch = options.pitch || 1;
        utterance.volume = options.volume || 1;
        utterance.lang = options.lang || 'en-US';
        speechSynthesis.speak(utterance);
    };

    // NEW! Geolocation
    Yaka.getLocation = function (callback, errorCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    callback({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    });
                },
                errorCallback || ((error) => {
                    console.error('Geolocation error:', error);
                })
            );
        } else {
            const error = new Error('Geolocation not supported');
            if (errorCallback) {
                errorCallback(error);
            } else {
                console.error(error);
            }
        }
    };

    // NEW! Clipboard read
    Yaka.paste = async function () {
        try {
            return await navigator.clipboard.readText();
        } catch (err) {
            console.error('Failed to read clipboard:', err);
            return null;
        }
    };

    // NEW! Share API
    Yaka.share = function (data) {
        if (navigator.share) {
            navigator.share(data).catch(err => console.error('Share failed:', err));
        } else {
            console.warn('Share API not supported');
        }
    };

    // NEW! Vibrate
    Yaka.vibrate = function (pattern = 200) {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    // NEW! Battery status
    Yaka.battery = async function (callback) {
        if (navigator.getBattery) {
            const battery = await navigator.getBattery();
            callback({
                level: battery.level * 100,
                charging: battery.charging,
                chargingTime: battery.chargingTime,
                dischargingTime: battery.dischargingTime
            });
        }
    };

    // NEW! Network status
    Yaka.onlineStatus = function (callback) {
        callback(navigator.onLine);
        window.addEventListener('online', () => callback(true));
        window.addEventListener('offline', () => callback(false));
    };

    // NEW! Page visibility
    Yaka.onVisibilityChange = function (callback) {
        document.addEventListener('visibilitychange', () => {
            callback(!document.hidden);
        });
    };

    // NEW! Measure performance
    Yaka.measure = function (name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
        return result;
    };

    // ==================== ULTRA-ADVANCED FEATURES ====================

    // NEW! Component System (Like React/Vue)
    Yaka.component = function (name, options) {
        const components = Yaka._components = Yaka._components || {};

        components[name] = {
            template: options.template || '',
            data: options.data || {},
            methods: options.methods || {},
            mounted: options.mounted || (() => { }),

            render: function (props = {}) {
                let html = this.template;
                const data = { ...this.data, ...props };

                // Simple template rendering
                Object.keys(data).forEach(key => {
                    html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), data[key]);
                });

                return html;
            }
        };

        return components[name];
    };

    // Render component
    Yaka.prototype.component = function (name, props) {
        const component = Yaka._components?.[name];
        if (!component) return this;

        return this.each((i, elem) => {
            elem.innerHTML = component.render(props);
            component.mounted.call(elem);
        });
    };

    // NEW! Simple Router
    Yaka.router = function (routes) {
        const router = {
            routes: routes,
            current: null,

            navigate: function (path) {
                const route = this.routes[path];
                if (route) {
                    this.current = path;
                    history.pushState({ path }, '', path);
                    if (route.component) {
                        _(route.target || '#app').html(route.component());
                    }
                    if (route.handler) {
                        route.handler();
                    }
                }
            },

            init: function () {
                window.addEventListener('popstate', (e) => {
                    if (e.state?.path) {
                        this.navigate(e.state.path);
                    }
                });

                // Handle initial route
                const path = window.location.pathname;
                if (this.routes[path]) {
                    this.navigate(path);
                }
            }
        };

        router.init();
        return router;
    };

    // NEW! WebSocket Helper
    Yaka.websocket = function (url, options = {}) {
        const ws = new WebSocket(url);
        const handlers = {
            onOpen: options.onOpen || (() => { }),
            onMessage: options.onMessage || (() => { }),
            onError: options.onError || (() => { }),
            onClose: options.onClose || (() => { })
        };

        const wrappedHandlers = {
            open: (e) => handlers.onOpen(e),
            message: (e) => handlers.onMessage(JSON.parse(e.data)),
            error: (e) => handlers.onError(e),
            close: (e) => handlers.onClose(e)
        };

        ws.addEventListener('open', wrappedHandlers.open);
        ws.addEventListener('message', wrappedHandlers.message);
        ws.addEventListener('error', wrappedHandlers.error);
        ws.addEventListener('close', wrappedHandlers.close);

        return {
            send: (data) => ws.send(JSON.stringify(data)),
            close: () => ws.close(),
            ws: ws,
            cleanup: () => {
                ws.removeEventListener('open', wrappedHandlers.open);
                ws.removeEventListener('message', wrappedHandlers.message);
                ws.removeEventListener('error', wrappedHandlers.error);
                ws.removeEventListener('close', wrappedHandlers.close);
                if (ws.readyState === WebSocket.OPEN) {
                    ws.close();
                }
            }
        };
    };

    // NEW! WebRTC Video Call
    Yaka.webrtc = async function (options = {}) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: options.video !== false,
                audio: options.audio !== false
            });

            return {
                stream: stream,
                attachTo: (videoElement) => {
                    videoElement.srcObject = stream;
                },
                stop: () => {
                    stream.getTracks().forEach(track => track.stop());
                }
            };
        } catch (error) {
            console.error('Error accessing media devices:', error);
            throw error;
        }
    };

    // NEW! Canvas Helper
    Yaka.prototype.canvas = function () {
        const canvas = this.elements[0];
        if (!canvas || canvas.tagName !== 'CANVAS') {
            console.warn('canvas() requires a canvas element');
            return null;
        }

        const ctx = canvas.getContext('2d');

        return {
            ctx: ctx,
            clear: () => ctx.clearRect(0, 0, canvas.width, canvas.height),

            rect: (x, y, w, h, color) => {
                ctx.fillStyle = color;
                ctx.fillRect(x, y, w, h);
            },

            circle: (x, y, r, color) => {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            },

            line: (x1, y1, x2, y2, color, width = 1) => {
                ctx.strokeStyle = color;
                ctx.lineWidth = width;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            },

            text: (text, x, y, color, size = 16) => {
                ctx.fillStyle = color;
                ctx.font = `${size}px Arial`;
                ctx.fillText(text, x, y);
            },

            image: (img, x, y, w, h) => {
                ctx.drawImage(img, x, y, w, h);
            }
        };
    };

    // NEW! Simple Chart
    Yaka.chart = function (canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const type = options.type || 'bar';

        ctx.clearRect(0, 0, width, height);

        if (type === 'bar') {
            if (data.length === 0) return this;
            const barWidth = width / data.length;
            const maxValue = Math.max(...data.map(d => d.value));
            if (maxValue <= 0) return this;

            data.forEach((item, i) => {
                const barHeight = (item.value / maxValue) * (height - 40);
                const x = i * barWidth;
                const y = height - barHeight - 20;

                ctx.fillStyle = options.color || '#667eea';
                ctx.fillRect(x + 5, y, barWidth - 10, barHeight);

                ctx.fillStyle = '#333';
                ctx.font = '12px Arial';
                ctx.fillText(item.label, x + barWidth / 2 - 10, height - 5);
            });
        } else if (type === 'line') {
            if (data.length < 2) return this;
            const stepX = width / (data.length - 1);
            const maxValue = Math.max(...data.map(d => d.value));
            if (maxValue <= 0) return this;

            ctx.strokeStyle = options.color || '#667eea';
            ctx.lineWidth = 2;
            ctx.beginPath();

            data.forEach((item, i) => {
                const x = i * stepX;
                const y = height - (item.value / maxValue) * (height - 40) - 20;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                ctx.fillStyle = options.color || '#667eea';
                ctx.fillRect(x - 3, y - 3, 6, 6);
            });

            ctx.stroke();
        }
    };

    // NEW! Data Table with sorting/filtering
    Yaka.prototype.dataTable = function (data, options = {}) {
        return this.each((i, elem) => {
            // Validate required options
            if (!options.columns || !Array.isArray(options.columns)) {
                console.error('dataTable requires options.columns array');
                return;
            }
            
            let currentData = [...data];
            let sortHandlers = []; // Track handlers for cleanup
            
            // Helper to escape HTML to prevent XSS
            const escapeHtml = (text) => {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            };

            const render = () => {
                // Remove old sort handlers before re-rendering
                sortHandlers.forEach(({ th, handler }) => {
                    th.removeEventListener('click', handler);
                });
                sortHandlers = [];
                
                let html = '<table style="width: 100%; border-collapse: collapse;">';

                // Header
                html += '<thead><tr>';
                options.columns.forEach(col => {
                    html += `<th style="padding: 12px; background: #f5f5f5; cursor: pointer; border-bottom: 2px solid #ddd;" data-sort="${col.key}">${escapeHtml(col.label)}</th>`;
                });
                html += '</tr></thead>';

                // Body
                html += '<tbody>';
                currentData.forEach(row => {
                    html += '<tr>';
                    options.columns.forEach(col => {
                        const value = row[col.key] || '';
                        html += `<td style="padding: 12px; border-bottom: 1px solid #eee;">${escapeHtml(String(value))}</td>`;
                    });
                    html += '</tr>';
                });
                html += '</tbody></table>';

                elem.innerHTML = html;

                // Add sorting listeners and store for cleanup
                elem.querySelectorAll('th[data-sort]').forEach(th => {
                    const handler = () => {
                        const key = th.dataset.sort;
                        currentData.sort((a, b) => {
                            if (a[key] < b[key]) return -1;
                            if (a[key] > b[key]) return 1;
                            return 0;
                        });
                        render();
                    };
                    th.addEventListener('click', handler);
                    sortHandlers.push({ th, handler });
                });
            };

            render();
        });
    };

    // NEW! Autocomplete
    Yaka.prototype.autocomplete = function (data, options = {}) {
        return this.each((i, input) => {
            // Validate data array
            if (!data || !Array.isArray(data)) {
                console.error('autocomplete requires a data array');
                return;
            }
            
            if (input._yaka_autocomplete) return;
            input._yaka_autocomplete = true;
            
            const dropdown = document.createElement('div');
            dropdown.style.cssText = `
                position: absolute;
                background: white;
                border: 1px solid #ddd;
                border-radius: 8px;
                max-height: 200px;
                overflow-y: auto;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                display: none;
                z-index: 1000;
            `;

            input.parentNode.style.position = 'relative';
            input.parentNode.appendChild(dropdown);

            const handleInput = () => {
                const value = input.value.toLowerCase();
                if (!value) {
                    dropdown.style.display = 'none';
                    return;
                }

                const filtered = data.filter(item =>
                    item.toLowerCase().includes(value)
                );

                if (filtered.length > 0) {
                    dropdown.innerHTML = filtered.map(item =>
                        `<div style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f0f0f0;" class="autocomplete-item">${item}</div>`
                    ).join('');
                    dropdown.style.display = 'block';

                    dropdown.querySelectorAll('.autocomplete-item').forEach(div => {
                        div.addEventListener('click', () => {
                            input.value = div.textContent;
                            dropdown.style.display = 'none';
                            if (options.onSelect) options.onSelect(div.textContent);
                        });
                    });
                } else {
                    dropdown.style.display = 'none';
                }
            };

            const handleDocumentClick = (e) => {
                if (e.target !== input && !dropdown.contains(e.target)) {
                    dropdown.style.display = 'none';
                }
            };

            input.addEventListener('input', handleInput);
            document.addEventListener('click', handleDocumentClick);
            
            // Store cleanup method
            input._yaka_autocomplete_cleanup = () => {
                input.removeEventListener('input', handleInput);
                document.removeEventListener('click', handleDocumentClick);
                dropdown.remove();
                delete input._yaka_autocomplete;
                delete input._yaka_autocomplete_cleanup;
            };
        });
    };

    // NEW! Color Picker
    Yaka.prototype.colorPicker = function (callback) {
        return this.each((i, elem) => {
            if (elem._yaka_colorpicker) return;
            elem._yaka_colorpicker = true;
            
            const input = document.createElement('input');
            input.type = 'color';
            input.style.display = 'none';
            elem.appendChild(input);

            const handleClick = () => input.click();
            const handleChange = () => {
                callback.call(elem, input.value);
            };

            elem.addEventListener('click', handleClick);
            input.addEventListener('change', handleChange);
            
            // Store cleanup method
            elem._yaka_colorpicker_cleanup = () => {
                elem.removeEventListener('click', handleClick);
                input.removeEventListener('change', handleChange);
                input.remove();
                delete elem._yaka_colorpicker;
                delete elem._yaka_colorpicker_cleanup;
            };
        });
    };

    // NEW! Date Picker (Simple)
    Yaka.prototype.datePicker = function (callback) {
        return this.each((i, elem) => {
            if (elem._yaka_datepicker) return;
            elem._yaka_datepicker = true;
            
            const input = document.createElement('input');
            input.type = 'date';
            input.style.cssText = 'width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 8px;';
            elem.appendChild(input);

            const handleChange = () => {
                callback.call(elem, input.value);
            };

            input.addEventListener('change', handleChange);
            
            // Store cleanup method
            elem._yaka_datepicker_cleanup = () => {
                input.removeEventListener('change', handleChange);
                input.remove();
                delete elem._yaka_datepicker;
                delete elem._yaka_datepicker_cleanup;
            };
        });
    };

    // NEW! Range Slider
    Yaka.prototype.slider = function (options = {}) {
        return this.each((i, elem) => {
            if (elem._yaka_slider) return;
            elem._yaka_slider = true;
            
            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = options.min || 0;
            slider.max = options.max || 100;
            slider.value = options.value || 50;
            slider.style.cssText = 'width: 100%;';

            const display = document.createElement('div');
            display.textContent = slider.value;
            display.style.cssText = 'text-align: center; margin-top: 10px; font-weight: bold;';

            elem.appendChild(slider);
            elem.appendChild(display);

            const handleInput = () => {
                display.textContent = slider.value;
                if (options.onChange) options.onChange(parseInt(slider.value));
            };

            slider.addEventListener('input', handleInput);
            
            // Store cleanup method
            elem._yaka_slider_cleanup = () => {
                slider.removeEventListener('input', handleInput);
                slider.remove();
                display.remove();
                delete elem._yaka_slider;
                delete elem._yaka_slider_cleanup;
            };
        });
    };

    // NEW! Tabs System
    Yaka.prototype.tabs = function () {
        return this.each((i, container) => {
            if (container._yaka_tabs) return;
            container._yaka_tabs = true;
            
            const tabs = container.querySelectorAll('[data-tab]');
            const contents = container.querySelectorAll('[data-tab-content]');
            const handlers = [];

            tabs.forEach(tab => {
                const handleClick = () => {
                    const target = tab.dataset.tab;

                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.style.display = 'none');

                    tab.classList.add('active');
                    const contentElement = container.querySelector(`[data-tab-content="${target}"]`);
                    if (contentElement) {
                        contentElement.style.display = 'block';
                    }
                };
                
                tab.addEventListener('click', handleClick);
                handlers.push({ tab, handleClick });
            });

            if (tabs[0]) tabs[0].click();
            
            // Store cleanup method
            container._yaka_tabs_cleanup = () => {
                handlers.forEach(({ tab, handleClick }) => {
                    tab.removeEventListener('click', handleClick);
                });
                delete container._yaka_tabs;
                delete container._yaka_tabs_cleanup;
            };
        });
    };

    // NEW! Accordion
    Yaka.prototype.accordion = function () {
        return this.each((i, container) => {
            if (container._yaka_accordion) return;
            container._yaka_accordion = true;
            
            const headers = container.querySelectorAll('[data-accordion-header]');
            const handlers = [];

            headers.forEach(header => {
                header.style.cursor = 'pointer';
                const content = header.nextElementSibling;
                content.style.display = 'none';

                const handleClick = () => {
                    const isOpen = content.style.display === 'block';
                    content.style.display = isOpen ? 'none' : 'block';
                };

                header.addEventListener('click', handleClick);
                handlers.push({ header, handleClick });
            });
            
            // Store cleanup method
            container._yaka_accordion_cleanup = () => {
                handlers.forEach(({ header, handleClick }) => {
                    header.removeEventListener('click', handleClick);
                });
                delete container._yaka_accordion;
                delete container._yaka_accordion_cleanup;
            };
        });
    };

    // NEW! Carousel/Slider
    Yaka.prototype.carousel = function (options = {}) {
        return this.each((i, container) => {
            // Clean up existing carousel if present
            if (container._yaka_carousel_cleanup) {
                container._yaka_carousel_cleanup();
            }
            
            container._yaka_carousel = true;

            const items = container.children;
            let currentIndex = 0;

            Array.from(items).forEach((item, idx) => {
                item.style.display = idx === 0 ? 'block' : 'none';
            });

            const next = () => {
                items[currentIndex].style.display = 'none';
                currentIndex = (currentIndex + 1) % items.length;
                items[currentIndex].style.display = 'block';
            };

            const prev = () => {
                items[currentIndex].style.display = 'none';
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                items[currentIndex].style.display = 'block';
            };

            let intervalId = null;
            if (options.auto) {
                intervalId = setInterval(next, options.interval || 3000);
            }

            container._carousel = { next, prev, intervalId };
            
            // Store cleanup method
            container._yaka_carousel_cleanup = () => {
                if (container._carousel && container._carousel.intervalId) {
                    clearInterval(container._carousel.intervalId);
                }
                delete container._carousel;
                delete container._yaka_carousel;
                delete container._yaka_carousel_cleanup;
            };
        });
    };

    // NEW! Parallax Scrolling
    Yaka.prototype.parallax = function (speed = 0.5) {
        return this.each((i, elem) => {
            if (elem._yaka_parallax) return;
            elem._yaka_parallax = true;
            
            const handleScroll = () => {
                const offset = window.pageYOffset;
                elem.style.transform = `translateY(${offset * speed}px)`;
            };
            
            window.addEventListener('scroll', handleScroll);
            
            // Store handler for cleanup
            elem._yaka_parallax_cleanup = () => {
                window.removeEventListener('scroll', handleScroll);
                delete elem._yaka_parallax;
                delete elem._yaka_parallax_cleanup;
            };
        });
    };

    // NEW! Infinite Scroll
    Yaka.prototype.infiniteScroll = function (callback) {
        return this.each((i, elem) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        callback.call(elem);
                    }
                });
            });

            observer.observe(elem);
            
            // Store observer for cleanup
            elem._yaka_scroll_observer = observer;
            elem._yaka_scroll_cleanup = () => {
                if (elem._yaka_scroll_observer) {
                    elem._yaka_scroll_observer.disconnect();
                    delete elem._yaka_scroll_observer;
                    delete elem._yaka_scroll_cleanup;
                }
            };
        });
    };

    // NEW! Masonry Layout
    Yaka.prototype.masonry = function (columns = 3) {
        return this.each((i, container) => {
            container.style.cssText = `
                display: grid;
                grid-template-columns: repeat(${columns}, 1fr);
                gap: 20px;
                grid-auto-rows: 20px;
            `;

            Array.from(container.children).forEach(item => {
                const height = item.offsetHeight;
                const span = Math.ceil(height / 20);
                item.style.gridRowEnd = `span ${span}`;
            });
        });
    };

    // NEW! Image Filters
    Yaka.prototype.filter = function (filterType) {
        return this.each((i, elem) => {
            const filters = {
                grayscale: 'grayscale(100%)',
                sepia: 'sepia(100%)',
                blur: 'blur(5px)',
                brightness: 'brightness(150%)',
                contrast: 'contrast(200%)',
                invert: 'invert(100%)',
                saturate: 'saturate(200%)',
                hueRotate: 'hue-rotate(90deg)'
            };

            elem.style.filter = filters[filterType] || filterType;
        });
    };

    // NEW! QR Code Generator (Simple)
    Yaka.qrcode = function (text, size = 200) {
        return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    };

    // NEW! Barcode Generator
    Yaka.barcode = function (text) {
        return `https://bwipjs-api.metafloor.com/?bcid=code128&text=${encodeURIComponent(text)}`;
    };

    // NEW! Markdown Parser (Simple)
    Yaka.markdown = function (text) {
        return text
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/\n/gim, '<br>');
    };

    // NEW! Syntax Highlighter (Simple)
    Yaka.highlight = function (code, language = 'javascript') {
        const keywords = ['const', 'let', 'var', 'function', 'if', 'else', 'return', 'for', 'while'];
        let highlighted = code;

        keywords.forEach(keyword => {
            highlighted = highlighted.replace(
                new RegExp(`\\b${keyword}\\b`, 'g'),
                `<span style="color: #569cd6;">${keyword}</span>`
            );
        });

        highlighted = highlighted.replace(
            /'([^']*)'/g,
            `<span style="color: #ce9178;">'$1'</span>`
        );

        highlighted = highlighted.replace(
            /"([^"]*)"/g,
            `<span style="color: #ce9178;">"$1"</span>`
        );

        return `<pre style="background: #1e1e1e; color: #d4d4d4; padding: 20px; border-radius: 8px; overflow-x: auto;"><code>${highlighted}</code></pre>`;
    };

    // NEW! Local Database (IndexedDB wrapper)
    Yaka.db = {
        open: async function (dbName, storeName) {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(dbName, 1);

                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);

                request.onupgradeneeded = (e) => {
                    const db = e.target.result;
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
                    }
                };
            });
        },

        add: async function (db, storeName, data) {
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            return new Promise((resolve, reject) => {
                const request = store.add(data);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        },

        get: async function (db, storeName, id) {
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            return new Promise((resolve) => {
                const request = store.get(id);
                request.onsuccess = () => resolve(request.result);
            });
        },

        getAll: async function (db, storeName) {
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            return new Promise((resolve) => {
                const request = store.getAll();
                request.onsuccess = () => resolve(request.result);
            });
        },

        delete: async function (db, storeName, id) {
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            return new Promise((resolve, reject) => {
                const request = store.delete(id);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        }
    };

    // NEW! Service Worker Registration
    Yaka.serviceWorker = async function (scriptUrl) {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register(scriptUrl);
                console.log('Service Worker registered:', registration);
                return registration;
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    };

    // NEW! Push Notifications
    Yaka.pushNotification = async function (title, options = {}) {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                new Notification(title, options);
            }
        }
    };

    // NEW! Screen Recording
    Yaka.screenRecord = async function () {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            const recorder = new MediaRecorder(stream);
            const chunks = [];

            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'recording.webm';
                a.click();
            };

            return {
                start: () => recorder.start(),
                stop: () => recorder.stop(),
                recorder: recorder
            };
        } catch (error) {
            console.error('Screen recording failed:', error);
        }
    };

    // ==================== MEGA ADVANCED FEATURES ====================

    // NEW! Virtual DOM & Diffing
    Yaka.vdom = {
        create: function (tag, props = {}, children = []) {
            return { tag, props, children };
        },

        render: function (vnode) {
            if (typeof vnode === 'string') {
                return document.createTextNode(vnode);
            }

            const el = document.createElement(vnode.tag);

            Object.keys(vnode.props || {}).forEach(key => {
                if (key.startsWith('on')) {
                    el.addEventListener(key.substring(2).toLowerCase(), vnode.props[key]);
                } else {
                    el.setAttribute(key, vnode.props[key]);
                }
            });

            (vnode.children || []).forEach(child => {
                el.appendChild(this.render(child));
            });

            return el;
        },

        diff: function (oldNode, newNode) {
            // Simple diff algorithm
            if (!oldNode) return { type: 'CREATE', newNode };
            if (!newNode) return { type: 'REMOVE' };
            if (typeof oldNode !== typeof newNode) return { type: 'REPLACE', newNode };
            if (typeof oldNode === 'string') {
                if (oldNode !== newNode) return { type: 'TEXT', newNode };
                return null;
            }
            if (oldNode.tag !== newNode.tag) return { type: 'REPLACE', newNode };

            return { type: 'UPDATE', props: newNode.props, children: newNode.children };
        }
    };

    // NEW! Template Engine
    Yaka.template = function (templateString, data) {
        let result = templateString;

        // Handle {{variable}}
        result = result.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
            const keys = key.trim().split('.');
            let value = data;
            keys.forEach(k => value = value?.[k]);
            return value !== undefined ? value : '';
        });

        // Handle {{#if condition}}...{{/if}}
        result = result.replace(/\{\{#if\s+([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, condition, content) => {
            const keys = condition.trim().split('.');
            let value = data;
            keys.forEach(k => value = value?.[k]);
            return value ? content : '';
        });

        // Handle {{#each array}}...{{/each}}
        result = result.replace(/\{\{#each\s+([^}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, arrayName, template) => {
            const array = data[arrayName.trim()];
            if (!Array.isArray(array)) return '';
            return array.map(item => {
                return template.replace(/\{\{this\.([^}]+)\}\}/g, (m, key) => item[key] || '');
            }).join('');
        });

        return result;
    };

    // NEW! HTTP Interceptors
    Yaka.http = {
        interceptors: {
            request: [],
            response: []
        },

        addRequestInterceptor: function (fn) {
            this.interceptors.request.push(fn);
        },

        addResponseInterceptor: function (fn) {
            this.interceptors.response.push(fn);
        },

        fetch: async function (url, options = {}) {
            // Apply request interceptors
            let config = { url, ...options };
            for (const interceptor of this.interceptors.request) {
                config = await interceptor(config);
            }

            // Make request
            let response = await fetch(config.url, config);

            // Apply response interceptors
            for (const interceptor of this.interceptors.response) {
                response = await interceptor(response);
            }

            return response;
        }
    };

    // NEW! Plugin System
    Yaka.plugins = {};

    Yaka.use = function (plugin, options = {}) {
        if (typeof plugin.install === 'function') {
            plugin.install(Yaka, options);
            this.plugins[plugin.name || 'anonymous'] = plugin;
        }
    };

    // NEW! Animation Timeline
    Yaka.timeline = function () {
        const timeline = {
            animations: [],

            add: function (selector, props, duration, delay = 0) {
                this.animations.push({ selector, props, duration, delay });
                return this;
            },

            play: async function () {
                for (const anim of this.animations) {
                    await new Promise(resolve => {
                        setTimeout(() => {
                            _(anim.selector).animate(anim.props, anim.duration);
                            setTimeout(resolve, anim.duration);
                        }, anim.delay);
                    });
                }
            },

            playAll: function () {
                this.animations.forEach(anim => {
                    setTimeout(() => {
                        _(anim.selector).animate(anim.props, anim.duration);
                    }, anim.delay);
                });
            }
        };

        return timeline;
    };

    // NEW! 3D Transforms
    Yaka.prototype.transform3d = function (options = {}) {
        return this.each((i, elem) => {
            const transforms = [];

            if (options.rotateX) transforms.push(`rotateX(${options.rotateX}deg)`);
            if (options.rotateY) transforms.push(`rotateY(${options.rotateY}deg)`);
            if (options.rotateZ) transforms.push(`rotateZ(${options.rotateZ}deg)`);
            if (options.translateX) transforms.push(`translateX(${options.translateX}px)`);
            if (options.translateY) transforms.push(`translateY(${options.translateY}px)`);
            if (options.translateZ) transforms.push(`translateZ(${options.translateZ}px)`);
            if (options.scale) transforms.push(`scale3d(${options.scale}, ${options.scale}, ${options.scale})`);

            elem.style.transform = transforms.join(' ');
            elem.style.transformStyle = 'preserve-3d';
        });
    };

    // NEW! Particle System
    Yaka.prototype.particles = function (options = {}) {
        return this.each((i, container) => {
            const count = options.count || 50;
            const color = options.color || '#667eea';
            const size = options.size || 5;
            const speed = options.speed || 2;

            container.style.position = 'relative';
            container.style.overflow = 'hidden';

            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    opacity: ${Math.random()};
                    animation: float ${speed + Math.random() * 3}s infinite;
                `;
                container.appendChild(particle);
            }
        });
    };

    // NEW! Audio API Helper
    Yaka.audio = {
        context: null,

        init: function () {
            if (!this.context) {
                this.context = new (window.AudioContext || window.webkitAudioContext)();
            }
            return this.context;
        },

        play: function (url) {
            const audio = new Audio(url);
            audio.play();
            return audio;
        },

        beep: function (frequency = 440, duration = 200) {
            const ctx = this.init();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + duration / 1000);
        },

        record: async function () {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);
                const chunks = [];

                recorder.ondataavailable = (e) => chunks.push(e.data);

                return {
                    start: () => recorder.start(),
                    stop: () => new Promise(resolve => {
                        recorder.onstop = () => {
                            const blob = new Blob(chunks, { type: 'audio/webm' });
                            resolve(blob);
                        };
                        recorder.stop();
                        stream.getTracks().forEach(track => track.stop());
                    })
                };
            } catch (error) {
                console.error('Error accessing microphone:', error);
                throw error;
            }
        }
    };

    // NEW! Video Controls
    Yaka.prototype.videoControls = function (options = {}) {
        return this.each((i, video) => {
            if (video.tagName !== 'VIDEO') return;

            video._controls = {
                play: () => video.play(),
                pause: () => video.pause(),
                stop: () => {
                    video.pause();
                    video.currentTime = 0;
                },
                seek: (time) => video.currentTime = time,
                volume: (level) => video.volume = level,
                speed: (rate) => video.playbackRate = rate,
                fullscreen: () => video.requestFullscreen(),
                screenshot: () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    canvas.getContext('2d').drawImage(video, 0, 0);
                    return canvas.toDataURL('image/png');
                }
            };
        });
    };

    // NEW! Crypto Helpers
    Yaka.crypto = {
        hash: async function (text, algorithm = 'SHA-256') {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await crypto.subtle.digest(algorithm, data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        },

        uuid: function () {
            return crypto.randomUUID();
        },

        random: function (min = 0, max = 100) {
            const array = new Uint32Array(1);
            crypto.getRandomValues(array);
            return min + (array[0] % (max - min + 1));
        },

        encrypt: async function (text, password) {
            // Simple encryption (for demo - use proper encryption in production)
            const encoded = btoa(text + ':' + password);
            return encoded;
        },

        decrypt: async function (encrypted, password) {
            const decoded = atob(encrypted);
            const parts = decoded.split(':');
            if (parts.length < 2) return null;
            const pass = parts.pop();
            const text = parts.join(':');
            return pass === password ? text : null;
        }
    };

    // NEW! Device Detection
    Yaka.device = {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isTablet: /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent),
        isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
        isAndroid: /Android/.test(navigator.userAgent),

        info: function () {
            return {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                cookieEnabled: navigator.cookieEnabled,
                onLine: navigator.onLine,
                screenWidth: screen.width,
                screenHeight: screen.height,
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
                devicePixelRatio: window.devicePixelRatio
            };
        }
    };

    // NEW! Storage Quota
    Yaka.storage.quota = async function () {
        if (navigator.storage && navigator.storage.estimate) {
            const estimate = await navigator.storage.estimate();
            return {
                usage: estimate.usage,
                quota: estimate.quota,
                percentage: ((estimate.usage / estimate.quota) * 100).toFixed(2),
                available: estimate.quota - estimate.usage
            };
        }
        return null;
    };

    // NEW! Lazy Image Loading with Blur
    Yaka.prototype.lazyLoadBlur = function () {
        return this.each((i, img) => {
            const src = img.dataset.src;
            if (!src) return;

            img.style.filter = 'blur(20px)';
            img.style.transition = 'filter 0.3s';

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const tempImg = new Image();
                        tempImg.onload = () => {
                            img.src = src;
                            img.style.filter = 'blur(0)';
                        };
                        tempImg.src = src;
                        observer.unobserve(img);
                    }
                });
            });

            observer.observe(img);
        });
    };

    // NEW! Scroll Spy
    Yaka.prototype.scrollSpy = function (callback) {
        return this.each((i, elem) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    callback.call(elem, entry.isIntersecting, entry.intersectionRatio);
                });
            }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

            observer.observe(elem);
            
            // Store observer for cleanup
            elem._yaka_scrollspy_observer = observer;
            elem._yaka_scrollspy_cleanup = () => {
                if (elem._yaka_scrollspy_observer) {
                    elem._yaka_scrollspy_observer.disconnect();
                    delete elem._yaka_scrollspy_observer;
                    delete elem._yaka_scrollspy_cleanup;
                }
            };
        });
    };

    // NEW! Sticky Element
    Yaka.prototype.sticky = function (offset = 0) {
        return this.each((i, elem) => {
            if (elem._yaka_sticky) return;
            elem._yaka_sticky = true;
            
            const originalPosition = elem.offsetTop;

            const handleScroll = () => {
                if (window.pageYOffset >= originalPosition - offset) {
                    elem.style.position = 'fixed';
                    elem.style.top = offset + 'px';
                } else {
                    elem.style.position = 'static';
                }
            };
            
            window.addEventListener('scroll', handleScroll);
            
            // Store handler for cleanup
            elem._yaka_sticky_cleanup = () => {
                window.removeEventListener('scroll', handleScroll);
                delete elem._yaka_sticky;
                delete elem._yaka_sticky_cleanup;
            };
        });
    };

    // NEW! Ripple Effect
    Yaka.prototype.ripple = function (color = 'rgba(255,255,255,0.6)') {
        return this.each((i, elem) => {
            elem.style.position = 'relative';
            elem.style.overflow = 'hidden';

            elem.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = elem.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: ${color};
                    left: ${x}px;
                    top: ${y}px;
                    transform: scale(0);
                    animation: ripple-effect 0.6s ease-out;
                    pointer-events: none;
                `;

                elem.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    };

    // NEW! Tilt Effect (3D)
    Yaka.prototype.tilt = function (options = {}) {
        return this.each((i, elem) => {
            if (elem._yaka_tilt) return;
            elem._yaka_tilt = true;
            
            const maxTilt = options.max || 15;

            const handleMouseMove = (e) => {
                const rect = elem.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const percentX = (x - centerX) / centerX;
                const percentY = (y - centerY) / centerY;

                const tiltX = percentY * maxTilt;
                const tiltY = -percentX * maxTilt;

                elem.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            };

            const handleMouseLeave = () => {
                elem.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            };

            elem.addEventListener('mousemove', handleMouseMove);
            elem.addEventListener('mouseleave', handleMouseLeave);
            
            // Store handlers for cleanup
            elem._yaka_tilt_cleanup = () => {
                elem.removeEventListener('mousemove', handleMouseMove);
                elem.removeEventListener('mouseleave', handleMouseLeave);
                delete elem._yaka_tilt;
                delete elem._yaka_tilt_cleanup;
            };
        });
    };

    // NEW! Magnetic Effect
    Yaka.prototype.magnetic = function (strength = 0.3) {
        return this.each((i, elem) => {
            if (elem._yaka_magnetic) return;
            elem._yaka_magnetic = true;
            
            const handleMouseMove = (e) => {
                const rect = elem.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                elem.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            };

            const handleMouseLeave = () => {
                elem.style.transform = 'translate(0, 0)';
            };

            elem.addEventListener('mousemove', handleMouseMove);
            elem.addEventListener('mouseleave', handleMouseLeave);
            
            // Store handlers for cleanup
            elem._yaka_magnetic_cleanup = () => {
                elem.removeEventListener('mousemove', handleMouseMove);
                elem.removeEventListener('mouseleave', handleMouseLeave);
                delete elem._yaka_magnetic;
                delete elem._yaka_magnetic_cleanup;
            };
        });
    };

    // NEW! Text Scramble Effect
    Yaka.prototype.scramble = function (finalText, duration = 1000) {
        return this.each((i, elem) => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
            const length = finalText.length;
            let frame = 0;
            const totalFrames = duration / 50;

            const interval = setInterval(() => {
                let scrambled = '';
                for (let i = 0; i < length; i++) {
                    if (frame / totalFrames > i / length) {
                        scrambled += finalText[i];
                    } else {
                        scrambled += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                elem.textContent = scrambled;
                frame++;

                if (frame >= totalFrames) {
                    elem.textContent = finalText;
                    clearInterval(interval);
                }
            }, 50);
        });
    };

    // NEW! Glitch Effect
    Yaka.prototype.glitch = function (duration = 2000) {
        return this.each((i, elem) => {
            const originalText = elem.textContent;
            let glitching = true;

            setTimeout(() => glitching = false, duration);

            const glitchInterval = setInterval(() => {
                if (!glitching) {
                    elem.textContent = originalText;
                    clearInterval(glitchInterval);
                    return;
                }

                const glitchChars = ['█', '▓', '▒', '░', '▀', '▄', '▌', '▐'];
                let glitched = '';
                for (let char of originalText) {
                    glitched += Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char;
                }
                elem.textContent = glitched;
            }, 50);
        });
    };

    // NEW! Progress Bar
    Yaka.prototype.progress = function (percent, options = {}) {
        return this.each((i, elem) => {
            const color = options.color || '#667eea';
            const height = options.height || '20px';
            const animated = options.animated !== false;

            elem.style.cssText = `
                width: 100%;
                height: ${height};
                background: #e0e0e0;
                border-radius: 10px;
                overflow: hidden;
            `;

            const bar = document.createElement('div');
            bar.style.cssText = `
                width: ${percent}%;
                height: 100%;
                background: ${color};
                transition: ${animated ? 'width 0.5s ease' : 'none'};
            `;

            elem.innerHTML = '';
            elem.appendChild(bar);
        });
    };

    // NEW! Loading Spinner
    Yaka.spinner = function (options = {}) {
        const size = options.size || 50;
        const color = options.color || '#667eea';
        const container = options.container || document.body;

        const spinner = document.createElement('div');
        spinner.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: ${size}px;
            height: ${size}px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid ${color};
            border-radius: 50%;
            animation: spin 1s linear infinite;
            z-index: 10000;
        `;

        container.appendChild(spinner);

        return {
            remove: () => spinner.remove()
        };
    };

    // NEW! Skeleton Loader
    Yaka.prototype.skeleton = function (options = {}) {
        return this.each((i, elem) => {
            const lines = options.lines || 3;
            const height = options.height || '20px';

            elem.innerHTML = '';
            for (let i = 0; i < lines; i++) {
                const line = document.createElement('div');
                line.style.cssText = `
                    height: ${height};
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: skeleton-loading 1.5s infinite;
                    margin-bottom: 10px;
                    border-radius: 4px;
                `;
                elem.appendChild(line);
            }
        });
    };

    // NEW! Cleanup helper - removes all Yaka event listeners and observers
    Yaka.prototype.cleanup = function () {
        return this.each((i, elem) => {
            // Call all cleanup methods if they exist
            const cleanupMethods = [
                '_yaka_parallax_cleanup',
                '_yaka_sticky_cleanup',
                '_yaka_draggable_cleanup',
                '_yaka_scroll_cleanup',        // infiniteScroll
                '_yaka_scrollspy_cleanup',
                '_yaka_tilt_cleanup',
                '_yaka_magnetic_cleanup',
                '_yaka_tooltip_cleanup',
                '_yaka_colorpicker_cleanup',
                '_yaka_datepicker_cleanup',
                '_yaka_slider_cleanup',
                '_yaka_tabs_cleanup',
                '_yaka_accordion_cleanup',
                '_yaka_carousel_cleanup',
                '_yaka_confetti_cleanup',
                '_yaka_autocomplete_cleanup'
            ];
            
            cleanupMethods.forEach(method => {
                if (typeof elem[method] === 'function') {
                    elem[method]();
                }
            });
        });
    };

    // ==================== PHASE 1: SMART AUTO-FIX & ERROR HANDLING ====================

    // Global debug flag
    Yaka.debug = false;

    // Debug logger utility
    Yaka._log = function(type, message, data) {
        if (!Yaka.debug) return;
        
        const styles = {
            info: 'color: #3498db; font-weight: bold;',
            warn: 'color: #f39c12; font-weight: bold;',
            error: 'color: #e74c3c; font-weight: bold;',
            success: 'color: #2ecc71; font-weight: bold;'
        };
        
        const prefix = `[Yaka ${type.toUpperCase()}]`;
        console.log(`%c${prefix}`, styles[type] || styles.info, message, data || '');
    };

    // Safe mode wrapper - prevents crashes on empty selectors
    Yaka.prototype.safe = function() {
        // Create a proxy that returns this for any method call on empty elements
        const self = this;
        
        if (!this.elements || this.elements.length === 0) {
            Yaka._log('warn', 'Safe mode: Operating on empty selector', { selector: this });
            
            // Return a proxy that safely handles all method calls
            return new Proxy(this, {
                get(target, prop) {
                    // If it's a function, return a no-op that returns the proxy for chaining
                    if (typeof Yaka.prototype[prop] === 'function') {
                        return function() {
                            Yaka._log('warn', `Safe mode: Skipping .${prop}() on empty elements`);
                            return target;
                        };
                    }
                    return target[prop];
                }
            });
        }
        
        return this;
    };

    // Feature detection utility
    Yaka.supports = function(feature) {
        const features = {
            'webrtc': () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
            'geolocation': () => !!navigator.geolocation,
            'bluetooth': () => !!navigator.bluetooth,
            'webworker': () => typeof Worker !== 'undefined',
            'serviceworker': () => 'serviceWorker' in navigator,
            'indexeddb': () => !!window.indexedDB,
            'websocket': () => typeof WebSocket !== 'undefined',
            'intersection-observer': () => typeof IntersectionObserver !== 'undefined',
            'mutation-observer': () => typeof MutationObserver !== 'undefined',
            'performance-observer': () => typeof PerformanceObserver !== 'undefined',
            'view-transition': () => !!document.startViewTransition,
            'webnn': () => !!(navigator.ml),
            'battery': () => !!navigator.getBattery,
            'share': () => !!navigator.share,
            'clipboard': () => !!navigator.clipboard,
            'vibrate': () => !!navigator.vibrate,
            'fullscreen': () => !!(document.fullscreenEnabled || document.webkitFullscreenEnabled),
            'webgl': () => {
                try {
                    const canvas = document.createElement('canvas');
                    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
                } catch(e) {
                    return false;
                }
            },
            'webgl2': () => {
                try {
                    return !!document.createElement('canvas').getContext('webgl2');
                } catch(e) {
                    return false;
                }
            }
        };
        
        const detector = features[feature.toLowerCase()];
        if (!detector) {
            Yaka._log('warn', `Unknown feature: ${feature}`);
            return false;
        }
        
        try {
            return detector();
        } catch(e) {
            Yaka._log('error', `Error detecting feature ${feature}:`, e);
            return false;
        }
    };

    // ==================== PHASE 2: PERFORMANCE & LIFECYCLE ====================

    // Enhanced onVisible with more options
    Yaka.prototype.observeVisibility = function(callback, options = {}) {
        const threshold = options.threshold || 0.1;
        const rootMargin = options.rootMargin || '0px';
        const once = options.once !== false; // Default true
        const unobserveOnLeave = options.unobserveOnLeave || false;
        
        return this.each((i, elem) => {
            if (!Yaka.supports('intersection-observer')) {
                Yaka._log('warn', 'IntersectionObserver not supported, calling callback immediately');
                callback.call(elem, elem, true);
                return;
            }
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const isVisible = entry.isIntersecting;
                    
                    if (isVisible && once) {
                        callback.call(entry.target, entry.target, true);
                        observer.unobserve(entry.target);
                    } else if (isVisible || !unobserveOnLeave) {
                        callback.call(entry.target, entry.target, isVisible);
                        if (!isVisible && unobserveOnLeave) {
                            observer.unobserve(entry.target);
                        }
                    }
                });
            }, { threshold, rootMargin });
            
            observer.observe(elem);
            
            // Store cleanup
            elem._yaka_visibility_cleanup = () => {
                observer.disconnect();
            };
        });
    };

    // Signals-based reactivity (inspired by SolidJS)
    Yaka.signal = function(initialValue) {
        let value = initialValue;
        const subscribers = new Set();
        
        const read = () => {
            // Track current effect if any
            if (Yaka.signal._currentEffect) {
                subscribers.add(Yaka.signal._currentEffect);
            }
            return value;
        };
        
        const write = (newValue) => {
            if (value === newValue) return;
            value = typeof newValue === 'function' ? newValue(value) : newValue;
            Yaka._log('info', 'Signal updated', { value });
            subscribers.forEach(effect => effect());
        };
        
        return [read, write];
    };

    // Effect runner for signals
    Yaka.effect = function(fn) {
        const effect = () => {
            Yaka.signal._currentEffect = effect;
            try {
                fn();
            } finally {
                Yaka.signal._currentEffect = null;
            }
        };
        effect();
    };

    // Computed signal
    Yaka.computed = function(fn) {
        const [value, setValue] = Yaka.signal(undefined);
        Yaka.effect(() => setValue(fn()));
        return value;
    };

    // Memory leak detector
    Yaka.detectLeaks = function() {
        const leaks = [];
        
        document.querySelectorAll('*').forEach(elem => {
            let listenerCount = 0;
            const yakaProps = Object.keys(elem).filter(key => key.startsWith('_yaka_'));
            
            // Check for cleanup methods
            yakaProps.forEach(prop => {
                if (prop.endsWith('_cleanup')) {
                    listenerCount++;
                }
            });
            
            if (listenerCount > 5) {
                leaks.push({
                    element: elem,
                    tagName: elem.tagName,
                    id: elem.id,
                    cleanupMethods: listenerCount
                });
            }
        });
        
        if (leaks.length > 0) {
            Yaka._log('warn', `Potential memory leaks detected: ${leaks.length} elements`, leaks);
        } else {
            Yaka._log('success', 'No memory leaks detected');
        }
        
        return leaks;
    };

    // ==================== PHASE 3: ADVANCED UI INTERACTION ====================

    // View Transitions API
    Yaka.pageTransition = function(url, options = {}) {
        if (!Yaka.supports('view-transition')) {
            Yaka._log('warn', 'View Transition API not supported, using regular navigation');
            window.location.href = url;
            return Promise.resolve();
        }
        
        const transition = document.startViewTransition(async () => {
            if (options.beforeTransition) {
                await options.beforeTransition();
            }
            
            // Fetch new content
            const response = await fetch(url);
            const html = await response.text();
            
            // Parse and update
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(html, 'text/html');
            const target = options.target || 'body';
            const targetElem = document.querySelector(target);
            const newContent = newDoc.querySelector(target);
            
            if (targetElem && newContent) {
                targetElem.innerHTML = newContent.innerHTML;
            }
            
            if (options.afterTransition) {
                await options.afterTransition();
            }
        });
        
        return transition.finished;
    };

    // Input masking
    Yaka.prototype.mask = function(type, options = {}) {
        const masks = {
            phone: {
                pattern: '(###) ###-####',
                placeholder: '_',
                filter: /[0-9]/
            },
            creditCard: {
                pattern: '#### #### #### ####',
                placeholder: '_',
                filter: /[0-9]/
            },
            date: {
                pattern: '##/##/####',
                placeholder: '_',
                filter: /[0-9]/
            },
            ssn: {
                pattern: '###-##-####',
                placeholder: '_',
                filter: /[0-9]/
            },
            zipcode: {
                pattern: '#####',
                placeholder: '_',
                filter: /[0-9]/
            }
        };
        
        const mask = typeof type === 'string' ? masks[type] : type;
        if (!mask) {
            Yaka._log('error', `Unknown mask type: ${type}`);
            return this;
        }
        
        return this.each((i, elem) => {
            if (elem.tagName !== 'INPUT') return;
            
            const format = (value) => {
                const cleaned = value.replace(/[^0-9]/g, '');
                let formatted = '';
                let valueIndex = 0;
                
                for (let i = 0; i < mask.pattern.length && valueIndex < cleaned.length; i++) {
                    if (mask.pattern[i] === '#') {
                        formatted += cleaned[valueIndex];
                        valueIndex++;
                    } else {
                        formatted += mask.pattern[i];
                    }
                }
                
                return formatted;
            };
            
            const handler = (e) => {
                const oldValue = elem.value;
                const cursorPos = elem.selectionStart;
                const formatted = format(elem.value);
                
                if (oldValue === formatted) return; // No change
                
                elem.value = formatted;
                
                // Improved cursor positioning
                // Count how many non-digit characters are before cursor in formatted value
                let adjustedPos = cursorPos;
                let digitsBeforeCursor = 0;
                
                for (let i = 0; i < Math.min(cursorPos, oldValue.length); i++) {
                    if (/[0-9]/.test(oldValue[i])) {
                        digitsBeforeCursor++;
                    }
                }
                
                // Find position in formatted string after same number of digits
                let digitsSeen = 0;
                for (let i = 0; i < formatted.length; i++) {
                    if (/[0-9]/.test(formatted[i])) {
                        digitsSeen++;
                        if (digitsSeen === digitsBeforeCursor) {
                            adjustedPos = i + 1;
                            break;
                        }
                    }
                }
                
                elem.setSelectionRange(adjustedPos, adjustedPos);
            };
            
            elem.addEventListener('input', handler);
            
            // Store cleanup
            elem._yaka_mask_cleanup = () => {
                elem.removeEventListener('input', handler);
            };
        });
    };

    // Honeypot spam prevention
    Yaka.prototype.honeypot = function(options = {}) {
        return this.each((i, form) => {
            if (form.tagName !== 'FORM') return;
            
            // Create hidden honeypot field
            const honeypot = document.createElement('input');
            honeypot.type = 'text';
            honeypot.name = options.name || 'website';
            honeypot.style.cssText = 'position: absolute; left: -9999px; width: 1px; height: 1px;';
            honeypot.tabIndex = -1;
            honeypot.autocomplete = 'off';
            honeypot.setAttribute('aria-hidden', 'true');
            
            form.appendChild(honeypot);
            
            // Check on submit
            const submitHandler = (e) => {
                if (honeypot.value) {
                    e.preventDefault();
                    Yaka._log('warn', 'Honeypot triggered - potential spam detected');
                    if (options.onSpam) {
                        options.onSpam(e);
                    }
                    return false;
                }
            };
            
            form.addEventListener('submit', submitHandler);
            
            // Store cleanup
            form._yaka_honeypot_cleanup = () => {
                form.removeEventListener('submit', submitHandler);
                if (honeypot.parentNode) {
                    honeypot.parentNode.removeChild(honeypot);
                }
            };
        });
    };

    // Keyboard shortcuts manager
    Yaka.hotkeys = {};
    Yaka.hotkey = function(combo, handler, options = {}) {
        // Normalize combo: map both ctrl and cmd to 'ctrl' for consistency
        const normalized = combo.toLowerCase()
            .replace(/\s+/g, '')
            .replace(/cmd/g, 'ctrl')
            .replace(/meta/g, 'ctrl');
        
        const hotkeyHandler = (e) => {
            const keys = [];
            // Map both Ctrl and Meta (Cmd on Mac) to 'ctrl' for consistency
            if (e.ctrlKey || e.metaKey) keys.push('ctrl');
            if (e.altKey) keys.push('alt');
            if (e.shiftKey) keys.push('shift');
            keys.push(e.key.toLowerCase());
            
            const pressed = keys.join('+');
            
            if (pressed === normalized) {
                if (options.preventDefault !== false) {
                    e.preventDefault();
                }
                handler(e);
            }
        };
        
        document.addEventListener('keydown', hotkeyHandler);
        Yaka.hotkeys[normalized] = hotkeyHandler;
        
        Yaka._log('info', `Hotkey registered: ${combo}`);
        
        return {
            remove: () => {
                document.removeEventListener('keydown', hotkeyHandler);
                delete Yaka.hotkeys[normalized];
            }
        };
    };

    // Remove specific hotkey
    Yaka.removeHotkey = function(combo) {
        const normalized = combo.toLowerCase().replace(/\s+/g, '');
        if (Yaka.hotkeys[normalized]) {
            document.removeEventListener('keydown', Yaka.hotkeys[normalized]);
            delete Yaka.hotkeys[normalized];
        }
    };

    // ==================== PHASE 4: MODERN BROWSER SUPERPOWERS ====================

    // Web Worker wrapper
    Yaka.worker = function(fn, data) {
        if (!Yaka.supports('webworker')) {
            return Promise.reject(new Error('Web Workers not supported'));
        }
        
        return new Promise((resolve, reject) => {
            try {
                // Convert function to worker code
                const code = `
                    self.onmessage = function(e) {
                        const fn = ${fn.toString()};
                        try {
                            const result = fn(e.data);
                            self.postMessage({ success: true, result });
                        } catch (error) {
                            self.postMessage({ success: false, error: error.message });
                        }
                    };
                `;
                
                const blob = new Blob([code], { type: 'application/javascript' });
                const worker = new Worker(URL.createObjectURL(blob));
                
                worker.onmessage = (e) => {
                    if (e.data.success) {
                        resolve(e.data.result);
                    } else {
                        reject(new Error(e.data.error));
                    }
                    worker.terminate();
                };
                
                worker.onerror = (error) => {
                    reject(error);
                    worker.terminate();
                };
                
                worker.postMessage(data);
            } catch (error) {
                reject(error);
            }
        });
    };

    // Enhanced IndexedDB wrapper (extends existing _.db)
    if (Yaka.db) {
        // Add batch operations
        Yaka.db.saveMany = async function(storeName, items) {
            if (!Yaka.supports('indexeddb')) {
                return Promise.reject(new Error('IndexedDB not supported'));
            }
            
            const db = await this._open();
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            
            const promises = items.map(item => {
                return new Promise((resolve, reject) => {
                    const request = store.add(item);
                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error);
                });
            });
            
            return Promise.all(promises);
        };
        
        Yaka.db.query = async function(storeName, filter) {
            if (!Yaka.supports('indexeddb')) {
                return Promise.reject(new Error('IndexedDB not supported'));
            }
            
            const db = await this._open();
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            
            return new Promise((resolve, reject) => {
                const request = store.getAll();
                request.onsuccess = () => {
                    let results = request.result;
                    if (filter) {
                        results = results.filter(filter);
                    }
                    resolve(results);
                };
                request.onerror = () => reject(request.error);
            });
        };
        
        Yaka.db.count = async function(storeName) {
            if (!Yaka.supports('indexeddb')) {
                return Promise.reject(new Error('IndexedDB not supported'));
            }
            
            const db = await this._open();
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            
            return new Promise((resolve, reject) => {
                const request = store.count();
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        };
    }

    // WebNN/AI Integration wrapper
    Yaka.ai = {
        isAvailable: () => Yaka.supports('webnn') || !!(window.ai),
        
        // Text summarization
        summarize: async function(text, options = {}) {
            if (!this.isAvailable()) {
                return Promise.reject(new Error('AI capabilities not supported in this browser'));
            }
            
            try {
                if (window.ai && window.ai.summarizer) {
                    const summarizer = await window.ai.summarizer.create(options);
                    return await summarizer.summarize(text);
                }
                throw new Error('Summarization API not available');
            } catch (error) {
                Yaka._log('error', 'AI summarization failed:', error);
                throw error;
            }
        },
        
        // Sentiment analysis
        analyzeSentiment: async function(text) {
            if (!this.isAvailable()) {
                return Promise.reject(new Error('AI capabilities not supported in this browser'));
            }
            
            try {
                // Use browser AI if available
                if (window.ai && window.ai.languageModel) {
                    const model = await window.ai.languageModel.create();
                    const prompt = `Analyze the sentiment of this text and return only "positive", "negative", or "neutral": "${text}"`;
                    const result = await model.prompt(prompt);
                    return result.toLowerCase().trim();
                }
                throw new Error('Language model API not available');
            } catch (error) {
                Yaka._log('error', 'Sentiment analysis failed:', error);
                throw error;
            }
        },
        
        // Translation
        translate: async function(text, targetLang) {
            if (!this.isAvailable()) {
                return Promise.reject(new Error('AI capabilities not supported in this browser'));
            }
            
            try {
                if (window.ai && window.ai.translator) {
                    const translator = await window.ai.translator.create({
                        sourceLanguage: 'en',
                        targetLanguage: targetLang
                    });
                    return await translator.translate(text);
                }
                throw new Error('Translation API not available');
            } catch (error) {
                Yaka._log('error', 'Translation failed:', error);
                throw error;
            }
        }
    };

    // ==================== PHASE 5: DEVELOPER EXPERIENCE ====================

    // Theme Engine
    Yaka.theme = {
        _current: null,
        _listeners: [],
        _storageAvailable: true,
        
        _initCurrent: function() {
            if (this._current !== null) return;
            
            // Try to get from localStorage
            try {
                this._current = localStorage.getItem('yaka-theme') || 'light';
            } catch (e) {
                // localStorage not available (private browsing, etc.)
                Yaka._log('warn', 'localStorage not available, theme will not persist across sessions');
                this._storageAvailable = false;
                this._current = 'light';
            }
        },
        
        get current() {
            this._initCurrent();
            return this._current;
        },
        
        set: function(theme) {
            this._initCurrent();
            
            if (theme !== 'light' && theme !== 'dark') {
                Yaka._log('error', `Invalid theme: ${theme}. Use 'light' or 'dark'`);
                return;
            }
            
            this._current = theme;
            
            // Try to save to localStorage
            if (this._storageAvailable) {
                try {
                    localStorage.setItem('yaka-theme', theme);
                } catch (e) {
                    Yaka._log('warn', 'Failed to save theme to localStorage:', e.message);
                }
            }
            
            // Update CSS variables
            document.documentElement.setAttribute('data-theme', theme);
            
            const vars = theme === 'dark' ? {
                '--bg-color': '#1a1a1a',
                '--text-color': '#ffffff',
                '--primary-color': '#667eea',
                '--secondary-color': '#764ba2',
                '--border-color': '#333333',
                '--card-bg': '#2a2a2a',
                '--shadow': '0 2px 8px rgba(0,0,0,0.5)'
            } : {
                '--bg-color': '#ffffff',
                '--text-color': '#333333',
                '--primary-color': '#667eea',
                '--secondary-color': '#764ba2',
                '--border-color': '#e0e0e0',
                '--card-bg': '#f9f9f9',
                '--shadow': '0 2px 8px rgba(0,0,0,0.1)'
            };
            
            Object.entries(vars).forEach(([key, value]) => {
                document.documentElement.style.setProperty(key, value);
            });
            
            // Notify listeners
            this._listeners.forEach(fn => fn(theme));
            
            Yaka._log('info', `Theme changed to: ${theme}`);
        },
        
        dark: function() {
            this.set('dark');
        },
        
        light: function() {
            this.set('light');
        },
        
        toggle: function() {
            this.set(this._current === 'dark' ? 'light' : 'dark');
        },
        
        onChange: function(callback) {
            this._listeners.push(callback);
        },
        
        init: function() {
            // Apply saved theme on load
            this.set(this.current);
            
            // Listen for system preference changes
            if (window.matchMedia) {
                const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
                darkModeQuery.addEventListener('change', (e) => {
                    // Check if user has set a preference
                    let hasUserPreference = false;
                    if (this._storageAvailable) {
                        try {
                            hasUserPreference = localStorage.getItem('yaka-theme') !== null;
                        } catch (err) {
                            // Ignore localStorage errors
                        }
                    }
                    
                    if (!hasUserPreference) {
                        this.set(e.matches ? 'dark' : 'light');
                    }
                });
            }
        }
    };

    // Initialize theme on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Yaka.theme.init());
    } else {
        Yaka.theme.init();
    }

    // Enhanced Plugin API
    Yaka.plugins = {};
    
    // Override existing use() method to be more standardized
    const originalUse = Yaka.use;
    Yaka.use = function(name, plugin) {
        if (typeof plugin !== 'function' && typeof plugin !== 'object') {
            Yaka._log('error', 'Plugin must be a function or object');
            return;
        }
        
        if (Yaka.plugins[name]) {
            Yaka._log('warn', `Plugin "${name}" is already registered`);
            return;
        }
        
        try {
            // If plugin is a function, call it with Yaka
            if (typeof plugin === 'function') {
                plugin(Yaka);
            } else if (plugin.install) {
                // If plugin has install method, call it
                plugin.install(Yaka);
            } else {
                // Otherwise, merge plugin methods into Yaka
                Object.assign(Yaka, plugin);
            }
            
            Yaka.plugins[name] = plugin;
            Yaka._log('success', `Plugin "${name}" registered successfully`);
        } catch (error) {
            Yaka._log('error', `Failed to register plugin "${name}":`, error);
        }
    };

    // Plugin helper to create plugins
    Yaka.createPlugin = function(name, definition) {
        return {
            name,
            install: (Yaka) => {
                if (definition.methods) {
                    Object.assign(Yaka.prototype, definition.methods);
                }
                if (definition.statics) {
                    Object.assign(Yaka, definition.statics);
                }
                if (definition.init) {
                    definition.init(Yaka);
                }
            }
        };
    };

    // Development utilities
    Yaka.dev = {
        // Performance profiler
        profile: function(name, fn) {
            const start = performance.now();
            const result = fn();
            const end = performance.now();
            
            console.log(`%c[Yaka Profile] ${name}`, 'color: #9b59b6; font-weight: bold;', `${(end - start).toFixed(2)}ms`);
            
            return result;
        },
        
        // Memory usage
        memory: function() {
            if (performance.memory) {
                const used = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
                const total = (performance.memory.totalJSHeapSize / 1048576).toFixed(2);
                console.log(`%c[Yaka Memory]`, 'color: #e67e22; font-weight: bold;', `${used}MB / ${total}MB`);
                return { used, total };
            }
            console.warn('Performance.memory not available');
            return null;
        },
        
        // Element inspector
        inspect: function(selector) {
            const elem = document.querySelector(selector);
            if (!elem) {
                console.warn(`Element not found: ${selector}`);
                return;
            }
            
            const info = {
                tagName: elem.tagName,
                id: elem.id,
                classes: Array.from(elem.classList),
                attributes: {},
                styles: {},
                listeners: [],
                yakaFeatures: []
            };
            
            // Get attributes
            Array.from(elem.attributes).forEach(attr => {
                info.attributes[attr.name] = attr.value;
            });
            
            // Get computed styles
            const computed = window.getComputedStyle(elem);
            ['display', 'position', 'width', 'height', 'margin', 'padding'].forEach(prop => {
                info.styles[prop] = computed[prop];
            });
            
            // Check for Yaka features
            Object.keys(elem).forEach(key => {
                if (key.startsWith('_yaka_')) {
                    info.yakaFeatures.push(key);
                }
            });
            
            console.log(`%c[Yaka Inspector]`, 'color: #3498db; font-weight: bold;', selector, info);
            return info;
        },
        
        // List all registered plugins
        plugins: function() {
            console.log(`%c[Yaka Plugins]`, 'color: #2ecc71; font-weight: bold;', Object.keys(Yaka.plugins));
            return Yaka.plugins;
        },
        
        // List all hotkeys
        hotkeys: function() {
            console.log(`%c[Yaka Hotkeys]`, 'color: #f39c12; font-weight: bold;', Object.keys(Yaka.hotkeys));
            return Yaka.hotkeys;
        }
    };

    // Memoization utility for expensive function results
    Yaka.memoize = function(fn, options = {}) {
        const cache = new Map();
        const keyFn = options.keyFn || ((args) => {
            // Simple serialization for primitive values
            try {
                // Check if all args are primitives
                const allPrimitives = args.every(arg => {
                    const type = typeof arg;
                    return arg === null || 
                           type === 'undefined' || 
                           type === 'boolean' || 
                           type === 'number' || 
                           type === 'string' || 
                           type === 'bigint';
                });
                
                if (allPrimitives) {
                    return JSON.stringify(args);
                }
                
                // For complex objects, use a simple hash based on length and first element
                if (args.length === 0) {
                    return 'complex_0_empty';
                }
                const firstType = typeof args[0];
                try {
                    const firstValue = args[0] !== undefined ? JSON.stringify(args[0]) : 'undefined';
                    return `complex_${args.length}_${firstValue}`;
                } catch (e) {
                    return `complex_${args.length}_${firstType}`;
                }
            } catch (e) {
                // If JSON.stringify fails (circular refs, etc), use a fallback
                const firstType = args.length > 0 ? typeof args[0] : 'empty';
                return `fallback_${args.length}_${firstType}`;
            }
        });
        
        return function(...args) {
            const key = keyFn(args);
            
            if (cache.has(key)) {
                Yaka._log('info', 'Memoize: Cache hit', { key });
                return cache.get(key);
            }
            
            const result = fn.apply(this, args);
            cache.set(key, result);
            Yaka._log('info', 'Memoize: Cache miss, storing result', { key });
            
            return result;
        };
    };

    // Router middleware support
    if (Yaka.router) {
        const originalRouter = Yaka.router;
        
        Yaka.router = function(routes, options = {}) {
            const middleware = options.middleware || [];
            const router = originalRouter(routes);
            
            // Wrap navigate to support middleware
            const originalNavigate = router.navigate;
            router.navigate = async function(path) {
                // Run middleware
                for (const fn of middleware) {
                    const result = await fn(path, router);
                    if (result === false) {
                        Yaka._log('info', `Navigation to ${path} blocked by middleware`);
                        return;
                    }
                }
                
                originalNavigate.call(router, path);
            };
            
            return router;
        };
    }

    // Lottie animation support (basic wrapper)
    Yaka.prototype.lottie = function(options = {}) {
        return this.each((i, elem) => {
            if (typeof lottie === 'undefined') {
                Yaka._log('error', 'Lottie library not loaded. Include it from: https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js');
                return;
            }
            
            const animation = lottie.loadAnimation({
                container: elem,
                renderer: options.renderer || 'svg',
                loop: options.loop !== false,
                autoplay: options.autoplay !== false,
                path: options.path || options.animationData
            });
            
            elem._yaka_lottie = animation;
            elem._yaka_lottie_cleanup = () => {
                animation.destroy();
            };
        });
    };

    // Bluetooth API wrapper
    Yaka.bluetooth = {
        isAvailable: () => Yaka.supports('bluetooth'),
        
        connect: async function(options = {}) {
            if (!this.isAvailable()) {
                return Promise.reject(new Error('Bluetooth not supported'));
            }
            
            try {
                const device = await navigator.bluetooth.requestDevice({
                    filters: options.filters || [{ services: ['heart_rate'] }],
                    optionalServices: options.optionalServices || []
                });
                
                Yaka._log('info', 'Bluetooth device connected:', device.name);
                
                const server = await device.gatt.connect();
                
                return {
                    device,
                    server,
                    getService: async (serviceUuid) => {
                        return await server.getPrimaryService(serviceUuid);
                    },
                    disconnect: () => {
                        server.disconnect();
                        Yaka._log('info', 'Bluetooth device disconnected');
                    }
                };
            } catch (error) {
                Yaka._log('error', 'Bluetooth connection failed:', error);
                throw error;
            }
        },
        
        // Heart rate monitor helper
        heartRateMonitor: async function(callback) {
            try {
                const connection = await this.connect({
                    filters: [{ services: ['heart_rate'] }]
                });
                
                const service = await connection.getService('heart_rate');
                const characteristic = await service.getCharacteristic('heart_rate_measurement');
                
                characteristic.addEventListener('characteristicvaluechanged', (event) => {
                    const value = event.target.value.getUint8(1);
                    callback(value);
                });
                
                await characteristic.startNotifications();
                
                return connection;
            } catch (error) {
                Yaka._log('error', 'Heart rate monitor failed:', error);
                throw error;
            }
        }
    };

    // ==================== JQUERY-BEATING FEATURES ====================

    // ==================== 1. ENHANCED HTTP WITH ERROR HANDLING ====================

    // Override existing HTTP methods with comprehensive error handling
    const originalGet = Yaka.get;
    const originalPost = Yaka.post;
    const originalPut = Yaka.put;
    const originalDelete = Yaka.delete;
    const originalAjax = Yaka.ajax;

    // HTTP Error class
    class YakaHttpError extends Error {
        constructor(message, status, response) {
            super(message);
            this.name = 'YakaHttpError';
            this.status = status;
            this.response = response;
        }
    }

    // Enhanced HTTP with error handling, timeout, retry
    const enhancedHttp = async function(method, url, data, options = {}) {
        const {
            timeout = 30000,
            retries = 0,
            retryDelay = 1000,
            onError = null,
            validateStatus = (status) => status >= 200 && status < 300,
            parseResponse = true
        } = options;

        let lastError;
        const maxAttempts = retries + 1;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                // Create abort controller for timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeout);

                const config = {
                    method,
                    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
                    signal: controller.signal
                };

                if (method !== 'GET' && method !== 'DELETE' && data) {
                    config.body = JSON.stringify(data);
                }

                const fullUrl = method === 'GET' && data
                    ? url + '?' + new URLSearchParams(data)
                    : url;

                const response = await fetch(fullUrl, config);
                clearTimeout(timeoutId);

                // Validate response status
                if (!validateStatus(response.status)) {
                    const errorText = await response.text();
                    throw new YakaHttpError(
                        `HTTP ${response.status}: ${response.statusText}`,
                        response.status,
                        errorText
                    );
                }

                // Parse response based on content type
                let result;
                if (parseResponse) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        result = await response.json();
                    } else {
                        result = await response.text();
                    }
                } else {
                    result = response;
                }

                Yaka._log('info', `HTTP ${method} ${url} succeeded`, { attempt: attempt + 1 });
                return result;

            } catch (error) {
                lastError = error;
                
                if (error.name === 'AbortError') {
                    lastError = new YakaHttpError(`Request timeout after ${timeout}ms`, 0, null);
                }

                Yaka._log('warn', `HTTP ${method} ${url} failed (attempt ${attempt + 1}/${maxAttempts})`, error.message);

                // Don't retry on last attempt
                if (attempt < maxAttempts - 1) {
                    // Exponential backoff
                    const delay = retryDelay * Math.pow(2, attempt);
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    // Last attempt failed, call error handler if provided
                    if (onError) {
                        onError(lastError);
                    }
                }
            }
        }

        // All attempts failed
        throw lastError;
    };

    // Replace HTTP methods with enhanced versions
    Yaka.get = async function(url, data, options) {
        return enhancedHttp('GET', url, data, options);
    };

    Yaka.post = async function(url, data, options) {
        return enhancedHttp('POST', url, data, options);
    };

    Yaka.put = async function(url, data, options) {
        return enhancedHttp('PUT', url, data, options);
    };

    Yaka.delete = async function(url, data, options) {
        return enhancedHttp('DELETE', url, data, options);
    };

    Yaka.ajax = async function(options) {
        const { url, method = 'GET', data, ...rest } = options;
        return enhancedHttp(method, url, data, rest);
    };

    // HTTP Cache
    Yaka.cache = {
        _store: new Map(),
        _ttl: new Map(),

        set: function(key, value, ttl = 300000) { // 5 minutes default
            this._store.set(key, value);
            this._ttl.set(key, Date.now() + ttl);
            Yaka._log('info', `Cache set: ${key}`, { ttl: `${ttl}ms` });
        },

        get: function(key) {
            if (this.has(key)) {
                return this._store.get(key);
            }
            return null;
        },

        has: function(key) {
            if (!this._store.has(key)) return false;
            
            const expiry = this._ttl.get(key);
            if (Date.now() > expiry) {
                this.delete(key);
                return false;
            }
            return true;
        },

        delete: function(key) {
            this._store.delete(key);
            this._ttl.delete(key);
            Yaka._log('info', `Cache deleted: ${key}`);
        },

        clear: function() {
            this._store.clear();
            this._ttl.clear();
            Yaka._log('info', 'Cache cleared');
        },

        // Cached HTTP request
        request: async function(url, options = {}) {
            const cacheKey = `${options.method || 'GET'}:${url}:${JSON.stringify(options.data || {})}`;
            
            if (options.cache !== false && this.has(cacheKey)) {
                Yaka._log('info', `Cache hit: ${url}`);
                return this.get(cacheKey);
            }

            const result = await Yaka.ajax({ url, ...options });
            
            if (options.cache !== false) {
                this.set(cacheKey, result, options.cacheTTL);
            }

            return result;
        }
    };

    // ==================== 2. ADVANCED ROUTING ====================

    // Enhanced router with nested routes, params, guards
    Yaka.Router = class {
        constructor(options = {}) {
            this.routes = [];
            this.guards = {
                before: [],
                after: []
            };
            this.current = null;
            this.params = {};
            this.query = {};
            this.notFoundHandler = options.notFoundHandler || (() => console.warn('404: Route not found'));
            this.baseUrl = options.baseUrl || '';
        }

        // Add route with pattern matching
        addRoute(path, config) {
            const { component, handler, children, beforeEnter, name, redirect } = config;
            
            // Convert path to regex pattern
            const paramNames = [];
            const pattern = path
                .replace(/\//g, '\\/')
                .replace(/:(\w+)/g, (_, name) => {
                    paramNames.push(name);
                    return '([^\\/]+)';
                })
                .replace(/\*/g, '.*');

            this.routes.push({
                path,
                pattern: new RegExp(`^${pattern}$`),
                paramNames,
                component,
                handler,
                children: children || [],
                beforeEnter,
                name,
                redirect
            });

            return this;
        }

        // Batch add routes
        addRoutes(routes) {
            Object.entries(routes).forEach(([path, config]) => {
                this.addRoute(path, config);
            });
            return this;
        }

        // Add global guards
        beforeEach(fn) {
            this.guards.before.push(fn);
            return this;
        }

        afterEach(fn) {
            this.guards.after.push(fn);
            return this;
        }

        // Match route
        match(pathname) {
            for (const route of this.routes) {
                const match = pathname.match(route.pattern);
                if (match) {
                    const params = {};
                    route.paramNames.forEach((name, i) => {
                        params[name] = match[i + 1];
                    });
                    return { route, params };
                }
            }
            return null;
        }

        // Parse query string
        parseQuery(search) {
            const query = {};
            const params = new URLSearchParams(search);
            params.forEach((value, key) => {
                query[key] = value;
            });
            return query;
        }

        // Navigate to path
        async navigate(path, options = {}) {
            const { replace = false, state = {} } = options;
            const url = new URL(path, window.location.origin);
            const pathname = url.pathname.replace(this.baseUrl, '');
            
            // Parse query
            this.query = this.parseQuery(url.search);

            // Match route
            const matched = this.match(pathname);
            
            if (!matched) {
                Yaka._log('warn', `Route not found: ${pathname}`);
                this.notFoundHandler(pathname);
                return false;
            }

            const { route, params } = matched;
            this.params = params;

            // Handle redirect
            if (route.redirect) {
                const redirectPath = typeof route.redirect === 'function'
                    ? route.redirect(params)
                    : route.redirect;
                return this.navigate(redirectPath, options);
            }

            // Run global before guards
            for (const guard of this.guards.before) {
                const result = await guard(route, this.current);
                if (result === false) {
                    Yaka._log('info', 'Navigation cancelled by guard');
                    return false;
                }
            }

            // Run route-specific guard
            if (route.beforeEnter) {
                const result = await route.beforeEnter(route, this.current);
                if (result === false) {
                    Yaka._log('info', 'Navigation cancelled by route guard');
                    return false;
                }
            }

            // Update history
            const fullPath = this.baseUrl + path;
            if (replace) {
                history.replaceState({ ...state, path: fullPath }, '', fullPath);
            } else {
                history.pushState({ ...state, path: fullPath }, '', fullPath);
            }

            // Render component
            if (route.component) {
                const target = route.target || '#app';
                const html = typeof route.component === 'function'
                    ? route.component(params, this.query)
                    : route.component;
                _(target).html(html);
            }

            // Call handler
            if (route.handler) {
                route.handler(params, this.query);
            }

            const previousRoute = this.current;
            this.current = route;

            // Run after guards
            for (const guard of this.guards.after) {
                guard(route, previousRoute);
            }

            Yaka._log('info', `Navigated to: ${pathname}`, { params, query: this.query });
            return true;
        }

        // Navigate by route name
        navigateTo(name, params = {}, query = {}) {
            const route = this.routes.find(r => r.name === name);
            if (!route) {
                Yaka._log('error', `Route name not found: ${name}`);
                return false;
            }

            let path = route.path;
            Object.entries(params).forEach(([key, value]) => {
                path = path.replace(`:${key}`, value);
            });

            const queryString = new URLSearchParams(query).toString();
            const fullPath = queryString ? `${path}?${queryString}` : path;

            return this.navigate(fullPath);
        }

        // Go back
        back() {
            history.back();
        }

        // Go forward
        forward() {
            history.forward();
        }

        // Initialize router
        init() {
            // Handle popstate (back/forward buttons)
            window.addEventListener('popstate', (e) => {
                if (e.state?.path) {
                    this.navigate(e.state.path, { replace: true });
                } else {
                    this.navigate(window.location.pathname + window.location.search, { replace: true });
                }
            });

            // Handle initial load
            this.navigate(window.location.pathname + window.location.search, { replace: true });

            return this;
        }
    };

    // Shorthand for creating router
    Yaka.createRouter = (options) => new Yaka.Router(options);

    // ==================== 3. ADVANCED VALIDATION FRAMEWORK ====================

    Yaka.validator = {
        rules: {
            required: (value) => value !== null && value !== undefined && value !== '',
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            url: (value) => {
                try {
                    new URL(value);
                    return true;
                } catch {
                    return false;
                }
            },
            number: (value) => !isNaN(parseFloat(value)) && isFinite(value),
            integer: (value) => Number.isInteger(Number(value)),
            min: (value, min) => Number(value) >= min,
            max: (value, max) => Number(value) <= max,
            minLength: (value, length) => String(value).length >= length,
            maxLength: (value, length) => String(value).length <= length,
            pattern: (value, regex) => regex.test(value),
            match: (value, field, formData) => value === formData[field],
            alpha: (value) => /^[a-zA-Z]+$/.test(value),
            alphanumeric: (value) => /^[a-zA-Z0-9]+$/.test(value),
            phone: (value) => /^[\d\s\-\+\(\)]+$/.test(value),
            creditCard: (value) => {
                // Luhn algorithm
                const cleaned = value.replace(/\D/g, '');
                if (cleaned.length < 13 || cleaned.length > 19) return false;
                
                let sum = 0;
                let isEven = false;
                for (let i = cleaned.length - 1; i >= 0; i--) {
                    let digit = parseInt(cleaned[i]);
                    if (isEven) {
                        digit *= 2;
                        if (digit > 9) digit -= 9;
                    }
                    sum += digit;
                    isEven = !isEven;
                }
                return sum % 10 === 0;
            }
        },

        messages: {
            required: 'This field is required',
            email: 'Please enter a valid email address',
            url: 'Please enter a valid URL',
            number: 'Please enter a valid number',
            integer: 'Please enter a valid integer',
            min: 'Value must be at least {min}',
            max: 'Value must be at most {max}',
            minLength: 'Minimum length is {minLength} characters',
            maxLength: 'Maximum length is {maxLength} characters',
            pattern: 'Invalid format',
            match: 'Fields do not match',
            alpha: 'Only letters are allowed',
            alphanumeric: 'Only letters and numbers are allowed',
            phone: 'Please enter a valid phone number',
            creditCard: 'Please enter a valid credit card number'
        },

        // Add custom rule
        addRule(name, validator, message) {
            this.rules[name] = validator;
            this.messages[name] = message;
        },

        // Validate single value
        validate(value, rules, formData = {}) {
            const errors = [];

            for (const [ruleName, ruleValue] of Object.entries(rules)) {
                const validator = this.rules[ruleName];
                
                if (!validator) {
                    Yaka._log('warn', `Unknown validation rule: ${ruleName}`);
                    continue;
                }

                let isValid;
                if (typeof ruleValue === 'boolean' && ruleValue) {
                    isValid = validator(value);
                } else if (ruleName === 'match') {
                    isValid = validator(value, ruleValue, formData);
                } else {
                    isValid = validator(value, ruleValue);
                }

                if (!isValid) {
                    let message = rules.message || this.messages[ruleName] || 'Invalid value';
                    // Replace placeholders
                    message = message.replace(`{${ruleName}}`, ruleValue);
                    errors.push(message);
                }
            }

            return errors;
        },

        // Async validation
        async validateAsync(value, asyncValidator) {
            try {
                const result = await asyncValidator(value);
                return result === true ? [] : [result || 'Validation failed'];
            } catch (error) {
                return [error.message || 'Validation error'];
            }
        }
    };

    // Enhanced form validation
    Yaka.prototype.validateForm = function(schema, options = {}) {
        const { realTime = false, showErrors = true } = options;
        const form = this.elements[0];
        if (!form) return { valid: true, errors: {} };

        const errors = {};
        let valid = true;

        // Get all form data
        const formData = {};
        form.querySelectorAll('[name]').forEach(input => {
            formData[input.name] = input.value;
        });

        // Validate each field
        Object.entries(schema).forEach(([fieldName, fieldRules]) => {
            const input = form.querySelector(`[name="${fieldName}"]`);
            if (!input) return;

            const value = input.value;
            const fieldErrors = Yaka.validator.validate(value, fieldRules, formData);

            if (fieldErrors.length > 0) {
                errors[fieldName] = fieldErrors;
                valid = false;

                if (showErrors) {
                    // Add error class
                    input.classList.add('yaka-error');
                    
                    // Show error message
                    let errorElement = input.parentElement.querySelector('.yaka-error-message');
                    if (!errorElement) {
                        errorElement = document.createElement('div');
                        errorElement.className = 'yaka-error-message';
                        input.parentElement.appendChild(errorElement);
                    }
                    errorElement.textContent = fieldErrors[0];
                }
            } else if (showErrors) {
                // Remove error state
                input.classList.remove('yaka-error');
                const errorElement = input.parentElement.querySelector('.yaka-error-message');
                if (errorElement) {
                    errorElement.remove();
                }
            }

            // Real-time validation
            if (realTime && !input._yakaValidationBound) {
                input.addEventListener('blur', () => {
                    const currentValue = input.value;
                    const currentErrors = Yaka.validator.validate(currentValue, fieldRules, formData);
                    
                    if (currentErrors.length > 0 && showErrors) {
                        input.classList.add('yaka-error');
                        let errorElement = input.parentElement.querySelector('.yaka-error-message');
                        if (!errorElement) {
                            errorElement = document.createElement('div');
                            errorElement.className = 'yaka-error-message';
                            input.parentElement.appendChild(errorElement);
                        }
                        errorElement.textContent = currentErrors[0];
                    } else if (showErrors) {
                        input.classList.remove('yaka-error');
                        const errorElement = input.parentElement.querySelector('.yaka-error-message');
                        if (errorElement) {
                            errorElement.remove();
                        }
                    }
                });
                input._yakaValidationBound = true;
            }
        });

        return { valid, errors };
    };

    // ==================== 4. SECURITY UTILITIES ====================

    Yaka.security = {
        // XSS sanitization
        sanitizeHtml(html) {
            const div = document.createElement('div');
            div.textContent = html;
            return div.innerHTML;
        },

        // Escape HTML entities
        escapeHtml(text) {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '/': '&#x2F;'
            };
            return String(text).replace(/[&<>"'/]/g, (char) => map[char]);
        },

        // CSRF token management
        csrf: {
            _token: null,
            _headerName: 'X-CSRF-Token',

            setToken(token) {
                this._token = token;
                // Store in meta tag
                let meta = document.querySelector('meta[name="csrf-token"]');
                if (!meta) {
                    meta = document.createElement('meta');
                    meta.name = 'csrf-token';
                    document.head.appendChild(meta);
                }
                meta.content = token;
                Yaka._log('info', 'CSRF token set');
            },

            getToken() {
                if (this._token) return this._token;
                
                // Try to get from meta tag
                const meta = document.querySelector('meta[name="csrf-token"]');
                if (meta) {
                    this._token = meta.content;
                }
                return this._token;
            },

            // Add CSRF token to request
            addToRequest(config) {
                const token = this.getToken();
                if (token) {
                    config.headers = config.headers || {};
                    config.headers[this._headerName] = token;
                }
                return config;
            }
        },

        // Content Security Policy helper
        csp: {
            nonce: null,

            setNonce(nonce) {
                this.nonce = nonce;
            },

            getNonce() {
                if (this.nonce) return this.nonce;
                
                // Try to get from script tag
                const script = document.querySelector('script[nonce]');
                if (script) {
                    this.nonce = script.getAttribute('nonce');
                }
                return this.nonce;
            }
        },

        // Sanitize input for SQL-like operations
        sanitizeInput(input) {
            return String(input)
                .replace(/['";\\]/g, '')
                .trim();
        },

        // Validate and sanitize URL
        sanitizeUrl(url) {
            try {
                const parsed = new URL(url, window.location.origin);
                // Only allow http and https
                if (!['http:', 'https:'].includes(parsed.protocol)) {
                    return '';
                }
                return parsed.href;
            } catch {
                return '';
            }
        }
    };

    // Auto-add CSRF token to all HTTP requests
    Yaka.http.addRequestInterceptor((config) => {
        return Yaka.security.csrf.addToRequest(config);
    });

    // ==================== 5. ADVANCED STATE MANAGEMENT (STORE) ====================

    Yaka.Store = class {
        constructor(options = {}) {
            this._state = options.state || {};
            this._getters = options.getters || {};
            this._mutations = options.mutations || {};
            this._actions = options.actions || {};
            this._subscribers = [];
            this._history = [];
            this._historyIndex = -1;
            this._maxHistory = options.maxHistory || 50;
            this._plugins = options.plugins || [];
            
            // Make state reactive
            this._makeReactive();
            
            // Run plugins
            this._plugins.forEach(plugin => plugin(this));
            
            // Save initial state
            this._saveHistory();
        }

        _makeReactive() {
            const self = this;
            this.state = new Proxy(this._state, {
                set(target, key, value) {
                    const oldValue = target[key];
                    target[key] = value;
                    self._notify({ type: 'state', key, value, oldValue });
                    return true;
                },
                get(target, key) {
                    return target[key];
                }
            });
        }

        _notify(mutation) {
            this._subscribers.forEach(fn => fn(mutation, this.state));
        }

        _saveHistory() {
            // Remove future history if we've time-traveled
            if (this._historyIndex < this._history.length - 1) {
                this._history = this._history.slice(0, this._historyIndex + 1);
            }

            // Add current state to history
            this._history.push(JSON.parse(JSON.stringify(this._state)));
            
            // Limit history size
            if (this._history.length > this._maxHistory) {
                this._history.shift();
            } else {
                this._historyIndex++;
            }
        }

        // Getters
        get(name) {
            const getter = this._getters[name];
            if (!getter) {
                Yaka._log('warn', `Getter not found: ${name}`);
                return undefined;
            }
            return getter(this.state, this._getters);
        }

        // Mutations (synchronous state changes)
        commit(type, payload) {
            const mutation = this._mutations[type];
            if (!mutation) {
                Yaka._log('error', `Mutation not found: ${type}`);
                return;
            }

            Yaka._log('info', `Mutation: ${type}`, payload);
            mutation(this._state, payload);
            this._notify({ type: 'mutation', mutation: type, payload });
            this._saveHistory();
        }

        // Actions (can be asynchronous)
        async dispatch(type, payload) {
            const action = this._actions[type];
            if (!action) {
                Yaka._log('error', `Action not found: ${type}`);
                return;
            }

            Yaka._log('info', `Action: ${type}`, payload);
            const context = {
                state: this.state,
                commit: this.commit.bind(this),
                dispatch: this.dispatch.bind(this),
                getters: this._getters
            };

            return action(context, payload);
        }

        // Subscribe to state changes
        subscribe(fn) {
            this._subscribers.push(fn);
            return () => {
                const index = this._subscribers.indexOf(fn);
                if (index > -1) {
                    this._subscribers.splice(index, 1);
                }
            };
        }

        // Watch specific state property
        watch(key, callback) {
            return this.subscribe((mutation, state) => {
                if (mutation.key === key) {
                    callback(state[key], mutation.oldValue);
                }
            });
        }

        // Time travel debugging
        timeTravel(index) {
            if (index < 0 || index >= this._history.length) {
                Yaka._log('warn', 'Invalid history index');
                return;
            }

            this._historyIndex = index;
            this._state = JSON.parse(JSON.stringify(this._history[index]));
            this._makeReactive();
            this._notify({ type: 'timeTravel', index });
            Yaka._log('info', `Time traveled to state #${index}`);
        }

        // Undo last mutation
        undo() {
            if (this._historyIndex > 0) {
                this.timeTravel(this._historyIndex - 1);
            }
        }

        // Redo mutation
        redo() {
            if (this._historyIndex < this._history.length - 1) {
                this.timeTravel(this._historyIndex + 1);
            }
        }

        // Persist state to storage
        persist(key = 'yaka-store') {
            try {
                localStorage.setItem(key, JSON.stringify(this._state));
                Yaka._log('info', 'State persisted');
            } catch (error) {
                Yaka._log('error', 'Failed to persist state:', error);
            }
        }

        // Restore state from storage
        restore(key = 'yaka-store') {
            try {
                const saved = localStorage.getItem(key);
                if (saved) {
                    this._state = JSON.parse(saved);
                    this._makeReactive();
                    this._saveHistory();
                    Yaka._log('info', 'State restored');
                }
            } catch (error) {
                Yaka._log('error', 'Failed to restore state:', error);
            }
        }
    };

    // Create store helper
    Yaka.createStore = (options) => new Yaka.Store(options);

    // ==================== 6. PERFORMANCE MONITORING ====================

    Yaka.performance = {
        marks: {},
        measures: {},
        _observers: [],

        // Start performance mark
        mark(name) {
            this.marks[name] = performance.now();
            if (performance.mark) {
                performance.mark(name);
            }
        },

        // Measure performance between marks
        measure(name, startMark, endMark) {
            const start = this.marks[startMark];
            const end = endMark ? this.marks[endMark] : performance.now();
            
            if (start === undefined) {
                Yaka._log('warn', `Start mark not found: ${startMark}`);
                return null;
            }

            const duration = end - start;
            this.measures[name] = duration;

            if (performance.measure) {
                try {
                    performance.measure(name, startMark, endMark);
                } catch (e) {
                    // Ignore if marks don't exist in Performance API
                }
            }

            Yaka._log('info', `Performance: ${name}`, `${duration.toFixed(2)}ms`);
            return duration;
        },

        // Get FPS
        getFPS(callback, duration = 1000) {
            let frames = 0;
            let lastTime = performance.now();
            const startTime = lastTime;

            const countFrame = (currentTime) => {
                frames++;
                
                if (currentTime - startTime < duration) {
                    requestAnimationFrame(countFrame);
                } else {
                    const fps = Math.round(frames / (duration / 1000));
                    callback(fps);
                }
            };

            requestAnimationFrame(countFrame);
        },

        // Monitor long tasks
        observeLongTasks(callback) {
            if ('PerformanceObserver' in window) {
                try {
                    const observer = new PerformanceObserver((list) => {
                        list.getEntries().forEach(entry => {
                            callback({
                                name: entry.name,
                                duration: entry.duration,
                                startTime: entry.startTime
                            });
                        });
                    });
                    observer.observe({ entryTypes: ['longtask'] });
                    this._observers.push(observer);
                } catch (e) {
                    Yaka._log('warn', 'Long task monitoring not supported');
                }
            }
        },

        // Get performance report
        getReport() {
            const report = {
                marks: this.marks,
                measures: this.measures,
                memory: null,
                navigation: null
            };

            if (performance.memory) {
                report.memory = {
                    usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
                    totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
                    limit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
                };
            }

            if (performance.getEntriesByType) {
                const navEntries = performance.getEntriesByType('navigation');
                if (navEntries.length > 0) {
                    const nav = navEntries[0];
                    report.navigation = {
                        domContentLoaded: nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart,
                        loadComplete: nav.loadEventEnd - nav.loadEventStart,
                        domInteractive: nav.domInteractive,
                        totalTime: nav.loadEventEnd - nav.fetchStart
                    };
                }
            }

            return report;
        },

        // Clear all performance data
        clear() {
            this.marks = {};
            this.measures = {};
            if (performance.clearMarks) {
                performance.clearMarks();
            }
            if (performance.clearMeasures) {
                performance.clearMeasures();
            }
        }
    };

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        @keyframes fall {
            to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.7); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes ripple-effect {
            to { transform: scale(2); opacity: 0; }
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        @keyframes skeleton-loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        
        /* Validation styles */
        .yaka-error {
            border-color: #e74c3c !important;
            box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
        }
        .yaka-error-message {
            color: #e74c3c;
            font-size: 0.875em;
            margin-top: 0.25rem;
        }
    `;
    document.head.appendChild(style);

    // Export to window
    window._ = Yaka;

})(window);