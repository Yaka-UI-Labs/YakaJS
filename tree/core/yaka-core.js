/*!
 * YakaJS - Core YakaJS constructor and basic prototype methods
 * Part of the modular YakaJS library
 * https://github.com/Yaka-UI-Labs/YakaJS
 * 
 * This file can be used independently or as part of the full YakaJS bundle
 * Copyright (c) 2026
 * Released under the MIT license
 */

(function (window) {
    'use strict';

    // WeakMap to store event wrappers for proper cleanup
    const eventWrappers = new WeakMap();

    // Main @ constructor
    function Yaka(selector, context) {
        if (!(this instanceof Yaka)) {
            return new Yaka(selector, context);
        }

        // Initialize elements array to prevent crashes
        this.elements = [];

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
                temp.innerHTML = selector;
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
        constructor: Yaka, // Preserve constructor reference
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
            return new Yaka(this.elements[0] ?? []);
        },

        last: function () {
            const lastElem = this.elements[this.elements.length - 1];
            return new Yaka(lastElem ?? []);
        },

        eq: function (index) {
            const elem = this.elements[index];
            return new Yaka(elem !== undefined ? elem : []);
        },

        // ==================== CONTENT METHODS ====================

        text: function (value) {
            if (value === undefined) {
                return this.elements[0]?.textContent || '';
            }
            return this.each((i, elem) => elem.textContent = value);
        },

        html: function (value, sanitize = false) {
            if (value === undefined) {
                return this.elements[0]?.innerHTML || '';
            }
            return this.each((i, elem) => {
                // Use sanitizer if requested and available
                if (sanitize && Yaka.security && typeof Yaka.security.sanitizeHtml === 'function') {
                    elem.innerHTML = Yaka.security.sanitizeHtml(value);
                } else if (sanitize) {
                    // Fallback: render as plain text (no HTML) to prevent XSS
                    elem.textContent = value;
                } else {
                    elem.innerHTML = value;
                }
            });
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
                // Compute keys once outside the loop for better performance
                const keys = Object.keys(name);
                return this.each((i, elem) => {
                    keys.forEach(key => elem.setAttribute(key, name[key]));
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

        addClass: function (className, duration) {
            // Fast path: no animation
            if (!duration) {
                return this.each((i, elem) => {
                    className.split(' ').forEach(cls => elem.classList.add(cls));
                });
            }
            
            // jQuery UI compatible: addClass with animation
            // Batch all reads first, then all writes to avoid layout thrashing
            const elementsData = [];
            
            this.elements.forEach((elem) => {
                const classes = className.split(' ');
                const before = {};
                const computed = getComputedStyle(elem);
                ['opacity', 'height', 'width', 'margin', 'padding'].forEach(prop => {
                    before[prop] = computed[prop];
                });
                elementsData.push({ elem, classes, before });
            });
            
            // Now perform all writes (adding classes)
            elementsData.forEach(({ elem, classes }) => {
                classes.forEach(cls => elem.classList.add(cls));
            });
            
            // Force a single reflow for all elements instead of one per element
            // This significantly improves performance when animating multiple elements
            if (elementsData.length > 0) {
                void elementsData[0].elem.offsetHeight;
            }
            
            // Read new styles and apply transitions
            elementsData.forEach(({ elem, before }) => {
                const after = getComputedStyle(elem);
                const transitions = [];
                
                Object.keys(before).forEach(prop => {
                    if (before[prop] !== after[prop]) {
                        transitions.push(`${prop} ${duration}ms ease`);
                    }
                });
                
                if (transitions.length > 0) {
                    elem.style.transition = transitions.join(', ');
                    setTimeout(() => elem.style.transition = '', duration);
                }
            });
            
            return this;
        },

        removeClass: function (className, duration) {
            if (!className) {
                // When called with no arguments, this is now a deprecated behavior
                // Use detach() instead
                console.warn('removeClass() with no arguments is deprecated. Use detach() to remove element from DOM.');
                return this.each((i, elem) => elem.remove());
            }
            
            // Fast path: no animation
            if (!duration) {
                return this.each((i, elem) => {
                    className.split(' ').forEach(cls => elem.classList.remove(cls));
                });
            }
            
            // jQuery UI compatible: removeClass with animation
            // Batch all reads first, then all writes to avoid layout thrashing
            const elementsData = [];
            
            this.elements.forEach((elem) => {
                const classes = className.split(' ');
                const before = {};
                const computed = getComputedStyle(elem);
                ['opacity', 'height', 'width', 'margin', 'padding'].forEach(prop => {
                    before[prop] = computed[prop];
                });
                elementsData.push({ elem, classes, before });
            });
            
            // Now perform all writes (removing classes)
            elementsData.forEach(({ elem, classes }) => {
                classes.forEach(cls => elem.classList.remove(cls));
            });
            
            // Force a single reflow for all elements instead of one per element
            // This significantly improves performance when animating multiple elements
            if (elementsData.length > 0) {
                void elementsData[0].elem.offsetHeight;
            }
            
            // Read new styles and apply transitions
            elementsData.forEach(({ elem, before }) => {
                const after = getComputedStyle(elem);
                const transitions = [];
                
                Object.keys(before).forEach(prop => {
                    if (before[prop] !== after[prop]) {
                        transitions.push(`${prop} ${duration}ms ease`);
                    }
                });
                
                if (transitions.length > 0) {
                    elem.style.transition = transitions.join(', ');
                    setTimeout(() => elem.style.transition = '', duration);
                }
            });
            
            return this;
        },

        toggleClass: function (className, duration) {
            // jQuery UI compatible: toggleClass with animation
            if (duration) {
                return this.each((index, elem) => {
                    const hasClass = elem.classList.contains(className);
                    const yakaElem = new Yaka(elem);
                    if (hasClass) {
                        yakaElem.removeClass(className, duration);
                    } else {
                        yakaElem.addClass(className, duration);
                    }
                });
            }
            
            return this.each((index, elem) => {
                className.split(' ').forEach(cls => elem.classList.toggle(cls));
            });
        },

        hasClass: function (className) {
            return this.elements[0]?.classList.contains(className) || false;
        },

        // New separate method for removing elements from DOM
        detach: function () {
            return this.each((i, elem) => elem.remove());
        },

        // ==================== STYLES ====================

        css: function (prop, value) {
            if (typeof prop === 'object') {
                // Fast path: use Object.assign for batch updates
                return this.each((i, elem) => {
                    Object.assign(elem.style, prop);
                });
            }
            if (value === undefined) {
                // Fast path for read
                const elem = this.elements[0];
                return elem ? getComputedStyle(elem)[prop] : '';
            }
            // Fast path for single property write
            return this.each((i, elem) => elem.style[prop] = value);
        },

        show: function () {
            return this.each((i, elem) => elem.style.display = '');
        },

        hide: function () {
            return this.each((i, elem) => elem.style.display = 'none');
        },

    };

    // ==================== PLUGIN SYSTEM ====================
    
    /**
     * Plugin registration system for modular YakaJS
     * Allows loading individual feature modules
     * @param {Function} plugin - Plugin function that receives Yaka constructor
     */
    Yaka.use = function(plugin) {
        if (typeof plugin === 'function') {
            plugin(Yaka);
        } else {
            console.warn('Plugin must be a function that receives the Yaka constructor');
        }
        return Yaka;
    };
    
    // Export
    const _ = Yaka;
    
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = _;
    } else if (typeof define === 'function' && define.amd) {
        define([], () => _);
    } else {
        window._ = _;
        window.Yaka = Yaka;
    }
})(typeof window !== 'undefined' ? window : global);
