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
                    setTimeout(() => confetti.remove(), 5000);
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

            elem.addEventListener('mouseenter', () => {
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
            });

            elem.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                setTimeout(() => tooltip.remove(), 200);
            });
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

        ws.addEventListener('open', handlers.onOpen);
        ws.addEventListener('message', (e) => handlers.onMessage(JSON.parse(e.data)));
        ws.addEventListener('error', handlers.onError);
        ws.addEventListener('close', handlers.onClose);

        return {
            send: (data) => ws.send(JSON.stringify(data)),
            close: () => ws.close(),
            ws: ws
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

            const render = () => {
                let html = '<table style="width: 100%; border-collapse: collapse;">';

                // Header
                html += '<thead><tr>';
                options.columns.forEach(col => {
                    html += `<th style="padding: 12px; background: #f5f5f5; cursor: pointer; border-bottom: 2px solid #ddd;" data-sort="${col.key}">${col.label}</th>`;
                });
                html += '</tr></thead>';

                // Body
                html += '<tbody>';
                currentData.forEach(row => {
                    html += '<tr>';
                    options.columns.forEach(col => {
                        html += `<td style="padding: 12px; border-bottom: 1px solid #eee;">${row[col.key] || ''}</td>`;
                    });
                    html += '</tr>';
                });
                html += '</tbody></table>';

                elem.innerHTML = html;

                // Add sorting
                elem.querySelectorAll('th[data-sort]').forEach(th => {
                    th.addEventListener('click', () => {
                        const key = th.dataset.sort;
                        currentData.sort((a, b) => {
                            if (a[key] < b[key]) return -1;
                            if (a[key] > b[key]) return 1;
                            return 0;
                        });
                        render();
                    });
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

            input.addEventListener('input', () => {
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
            });

            document.addEventListener('click', (e) => {
                if (e.target !== input) {
                    dropdown.style.display = 'none';
                }
            });
        });
    };

    // NEW! Color Picker
    Yaka.prototype.colorPicker = function (callback) {
        return this.each((i, elem) => {
            const input = document.createElement('input');
            input.type = 'color';
            input.style.display = 'none';
            elem.appendChild(input);

            elem.addEventListener('click', () => input.click());
            input.addEventListener('change', () => {
                callback.call(elem, input.value);
            });
        });
    };

    // NEW! Date Picker (Simple)
    Yaka.prototype.datePicker = function (callback) {
        return this.each((i, elem) => {
            const input = document.createElement('input');
            input.type = 'date';
            input.style.cssText = 'width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 8px;';
            elem.appendChild(input);

            input.addEventListener('change', () => {
                callback.call(elem, input.value);
            });
        });
    };

    // NEW! Range Slider
    Yaka.prototype.slider = function (options = {}) {
        return this.each((i, elem) => {
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

            slider.addEventListener('input', () => {
                display.textContent = slider.value;
                if (options.onChange) options.onChange(parseInt(slider.value));
            });
        });
    };

    // NEW! Tabs System
    Yaka.prototype.tabs = function () {
        return this.each((i, container) => {
            const tabs = container.querySelectorAll('[data-tab]');
            const contents = container.querySelectorAll('[data-tab-content]');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const target = tab.dataset.tab;

                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.style.display = 'none');

                    tab.classList.add('active');
                    const contentElement = container.querySelector(`[data-tab-content="${target}"]`);
                    if (contentElement) {
                        contentElement.style.display = 'block';
                    }
                });
            });

            if (tabs[0]) tabs[0].click();
        });
    };

    // NEW! Accordion
    Yaka.prototype.accordion = function () {
        return this.each((i, container) => {
            const headers = container.querySelectorAll('[data-accordion-header]');

            headers.forEach(header => {
                header.style.cursor = 'pointer';
                const content = header.nextElementSibling;
                content.style.display = 'none';

                header.addEventListener('click', () => {
                    const isOpen = content.style.display === 'block';
                    content.style.display = isOpen ? 'none' : 'block';
                });
            });
        });
    };

    // NEW! Carousel/Slider
    Yaka.prototype.carousel = function (options = {}) {
        return this.each((i, container) => {
            if (container._carousel && container._carousel.intervalId) {
                clearInterval(container._carousel.intervalId);
            }

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
                '_yaka_scroll_cleanup',
                '_yaka_scrollspy_cleanup',
                '_yaka_tilt_cleanup',
                '_yaka_magnetic_cleanup'
            ];
            
            cleanupMethods.forEach(method => {
                if (typeof elem[method] === 'function') {
                    elem[method]();
                }
            });
        });
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
    `;
    document.head.appendChild(style);

    // Export to window
    window._ = Yaka;

})(window);