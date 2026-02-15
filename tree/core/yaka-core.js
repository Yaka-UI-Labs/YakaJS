/*!
 * YakaJS - Core YakaJS constructor and prototype methods
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
            // jQuery UI compatible: addClass with animation
            if (duration) {
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
            }
            return this.each((i, elem) => {
                className.split(' ').forEach(cls => elem.classList.add(cls));
            });
        },

        removeClass: function (className, duration) {
            if (!className) {
                // When called with no arguments, this is now a deprecated behavior
                // Use detach() instead
                console.warn('removeClass() with no arguments is deprecated. Use detach() to remove element from DOM.');
                return this.each((i, elem) => elem.remove());
            }
            
            // jQuery UI compatible: removeClass with animation
            if (duration) {
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
            }
            
            return this.each((i, elem) => {
                className.split(' ').forEach(cls => elem.classList.remove(cls));
            });
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

        // NEW! Animate any CSS property (with color support)
        animate: function (props, duration = 400, easing = 'ease') {
            return this.each((i, elem) => {
                // Helper to parse color (supports hex, rgb, and rgba)
                const parseColor = (color) => {
                    if (!color) return null;
                    if (color.startsWith('#')) {
                        const hex = color.substring(1);
                        if (hex.length === 3) {
                            return {
                                r: parseInt(hex[0] + hex[0], 16),
                                g: parseInt(hex[1] + hex[1], 16),
                                b: parseInt(hex[2] + hex[2], 16),
                                a: 1
                            };
                        }
                        return {
                            r: parseInt(hex.substring(0, 2), 16),
                            g: parseInt(hex.substring(2, 4), 16),
                            b: parseInt(hex.substring(4, 6), 16),
                            a: 1
                        };
                    }
                    if (color.startsWith('rgb')) {
                        // Parse rgb() or rgba() format - RGB values must be integers, alpha can be decimal
                        const match = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d+(?:\.\d+)?))?\s*\)/);
                        if (!match) return null;
                        return {
                            r: +match[1],
                            g: +match[2],
                            b: +match[3],
                            a: match[4] !== undefined ? +match[4] : 1
                        };
                    }
                    return null;
                };

                // Check for color properties
                const colorProps = ['color', 'backgroundColor', 'borderColor'];
                const hasColorAnimation = Object.keys(props).some(key => colorProps.includes(key));
                
                if (hasColorAnimation) {
                    // Animate colors using keyframes
                    const startColors = {};
                    const endColors = {};
                    
                    Object.keys(props).forEach(key => {
                        if (colorProps.includes(key)) {
                            const currentColor = getComputedStyle(elem)[key];
                            startColors[key] = parseColor(currentColor);
                            endColors[key] = parseColor(props[key]);
                        }
                    });
                    
                    const startTime = Date.now();
                    const animateColors = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        Object.keys(startColors).forEach(key => {
                            if (startColors[key] && endColors[key]) {
                                const r = Math.round(startColors[key].r + (endColors[key].r - startColors[key].r) * progress);
                                const g = Math.round(startColors[key].g + (endColors[key].g - startColors[key].g) * progress);
                                const b = Math.round(startColors[key].b + (endColors[key].b - startColors[key].b) * progress);
                                const a = startColors[key].a + (endColors[key].a - startColors[key].a) * progress;
                                elem.style[key] = a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
                            }
                        });
                        
                        if (progress < 1) {
                            requestAnimationFrame(animateColors);
                        }
                    };
                    
                    animateColors();
                    
                    // Animate non-color properties normally
                    const nonColorProps = {};
                    Object.keys(props).forEach(key => {
                        if (!colorProps.includes(key)) {
                            nonColorProps[key] = props[key];
                        }
                    });
                    
                    if (Object.keys(nonColorProps).length > 0) {
                        const transitions = Object.keys(nonColorProps).map(key => `${key} ${duration}ms ${easing}`).join(', ');
                        elem.style.transition = transitions;
                        Object.assign(elem.style, nonColorProps);
                        setTimeout(() => elem.style.transition = '', duration);
                    }
                } else {
                    // No color animation, proceed normally
                    const transitions = Object.keys(props).map(key => `${key} ${duration}ms ${easing}`).join(', ');
                    elem.style.transition = transitions;
                    Object.assign(elem.style, props);
                    setTimeout(() => elem.style.transition = '', duration);
                }
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

        // NEW! Bounce animation
        bounce: function (times = 3) {
            return this.each((i, elem) => {
                elem.style.animation = `bounce 0.5s ${times}`;
                setTimeout(() => elem.style.animation = '', 500 * times);
            });
        },

        // NEW! Flip 3D animation
        flip: function (axis = 'Y', duration = 600) {
            return this.each((i, elem) => {
                elem.style.transition = `transform ${duration}ms`;
                elem.style.transformStyle = 'preserve-3d';
                const rotation = axis.toUpperCase() === 'Y' ? 'rotateY(180deg)' : 'rotateX(180deg)';
                elem.style.transform = rotation;
                setTimeout(() => elem.style.transform = '', duration);
            });
        },

        // NEW! Zoom in animation
        zoomIn: function (duration = 400) {
            return this.each((i, elem) => {
                elem.style.transform = 'scale(0)';
                elem.style.opacity = '0';
                elem.style.display = '';
                elem.style.transition = `transform ${duration}ms, opacity ${duration}ms`;
                setTimeout(() => {
                    elem.style.transform = 'scale(1)';
                    elem.style.opacity = '1';
                }, 10);
            });
        },

        // NEW! Zoom out animation
        zoomOut: function (duration = 400) {
            return this.each((i, elem) => {
                elem.style.transition = `transform ${duration}ms, opacity ${duration}ms`;
                elem.style.transform = 'scale(0)';
                elem.style.opacity = '0';
                setTimeout(() => elem.style.display = 'none', duration);
            });
        },

        // NEW! Swing animation
        swing: function () {
            return this.each((i, elem) => {
                elem.style.animation = 'swing 0.8s';
                elem.style.transformOrigin = 'top center';
                setTimeout(() => elem.style.animation = '', 800);
            });
        },

        // NEW! Rotate in animation
        rotateIn: function (duration = 600) {
            return this.each((i, elem) => {
                elem.style.transform = 'rotate(-360deg) scale(0)';
                elem.style.opacity = '0';
                elem.style.display = '';
                elem.style.transition = `transform ${duration}ms, opacity ${duration}ms`;
                setTimeout(() => {
                    elem.style.transform = 'rotate(0deg) scale(1)';
                    elem.style.opacity = '1';
                }, 10);
            });
        },

        // NEW! Rotate out animation
        rotateOut: function (duration = 600) {
            return this.each((i, elem) => {
                elem.style.transition = `transform ${duration}ms, opacity ${duration}ms`;
                elem.style.transform = 'rotate(360deg) scale(0)';
                elem.style.opacity = '0';
                setTimeout(() => elem.style.display = 'none', duration);
            });
        },

        // NEW! Blur transition animation
        blurIn: function (duration = 400) {
            return this.each((i, elem) => {
                elem.style.filter = 'blur(20px)';
                elem.style.opacity = '0';
                elem.style.display = '';
                elem.style.transition = `filter ${duration}ms, opacity ${duration}ms`;
                setTimeout(() => {
                    elem.style.filter = 'blur(0px)';
                    elem.style.opacity = '1';
                }, 10);
            });
        },

        // NEW! Blur out animation
        blurOut: function (duration = 400) {
            return this.each((i, elem) => {
                elem.style.transition = `filter ${duration}ms, opacity ${duration}ms`;
                elem.style.filter = 'blur(20px)';
                elem.style.opacity = '0';
                setTimeout(() => elem.style.display = 'none', duration);
            });
        },

        // NEW! Slide in from directions
        slideInLeft: function (duration = 400) {
            return this.each((i, elem) => {
                elem.style.transform = 'translateX(-100%)';
                elem.style.opacity = '0';
                elem.style.display = '';
                elem.style.transition = `transform ${duration}ms, opacity ${duration}ms`;
                setTimeout(() => {
                    elem.style.transform = 'translateX(0)';
                    elem.style.opacity = '1';
                }, 10);
            });
        },

        slideInRight: function (duration = 400) {
            return this.each((i, elem) => {
                elem.style.transform = 'translateX(100%)';
                elem.style.opacity = '0';
                elem.style.display = '';
                elem.style.transition = `transform ${duration}ms, opacity ${duration}ms`;
                setTimeout(() => {
                    elem.style.transform = 'translateX(0)';
                    elem.style.opacity = '1';
                }, 10);
            });
        },

        slideInUp: function (duration = 400) {
            return this.each((i, elem) => {
                elem.style.transform = 'translateY(100%)';
                elem.style.opacity = '0';
                elem.style.display = '';
                elem.style.transition = `transform ${duration}ms, opacity ${duration}ms`;
                setTimeout(() => {
                    elem.style.transform = 'translateY(0)';
                    elem.style.opacity = '1';
                }, 10);
            });
        },

        slideOutLeft: function (duration = 400) {
            return this.each((i, elem) => {
                elem.style.transition = `transform ${duration}ms, opacity ${duration}ms`;
                elem.style.transform = 'translateX(-100%)';
                elem.style.opacity = '0';
                setTimeout(() => elem.style.display = 'none', duration);
            });
        },

        slideOutRight: function (duration = 400) {
            return this.each((i, elem) => {
                elem.style.transition = `transform ${duration}ms, opacity ${duration}ms`;
                elem.style.transform = 'translateX(100%)';
                elem.style.opacity = '0';
                setTimeout(() => elem.style.display = 'none', duration);
            });
        },

        // NEW! Rubber band animation
        rubberBand: function () {
            return this.each((i, elem) => {
                elem.style.animation = 'rubberBand 0.8s';
                setTimeout(() => elem.style.animation = '', 800);
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
                if (!elem.parentNode) {
                    console.warn('Yaka.replace: Cannot replace element without parent');
                    return;
                }
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
                if (!elem.parentNode) {
                    console.warn('Yaka.wrap: Cannot wrap element without parent');
                    return;
                }
                const wrapElem = typeof wrapper === 'string'
                    ? document.createElement(wrapper)
                    : wrapper.cloneNode(true);
                elem.parentNode.insertBefore(wrapElem, elem);
                wrapElem.appendChild(elem);
            });
        },

        // ==================== TRAVERSAL ====================

        parent: function () {
            // Filter out null values when parent doesn't exist
            const parents = [...new Set(this.elements.map(elem => elem.parentNode).filter(Boolean))];
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

        /**
         * Attach an event handler to elements
         * @param {string} event - Event type (e.g., 'click', 'mouseenter')
         * @param {string|function} selector - Optional selector for event delegation, or handler function
         * @param {function} handler - Event handler function
         * @returns {Yaka} - Returns this for chaining
         * 
         * @warning For proper memory management and the ability to remove listeners with .off(),
         * use named functions or store references to your handler functions.
         * Anonymous functions (e.g., .on('click', () => {...})) cannot be removed later
         * because .off() needs a reference to the exact same function object.
         * 
         * @example
         * // Good - can be removed later
         * const handleClick = () => console.log('clicked');
         * _('.btn').on('click', handleClick);
         * _('.btn').off('click', handleClick); // Works!
         * 
         * @example
         * // Bad - cannot be removed
         * _('.btn').on('click', () => console.log('clicked'));
         * _('.btn').off('click', () => console.log('clicked')); // Won't work - different function
         */
        on: function (event, selector, handler) {
            if (typeof selector === 'function') {
                handler = selector;
                selector = null;
            }

            return this.each((i, elem) => {
                if (selector) {
                    // Create wrapper function
                    const wrapper = function(e) {
                        const target = e.target.closest(selector);
                        if (target && elem.contains(target)) {
                            handler.call(target, e);
                        }
                    };
                    
                    // Store wrapper in nested WeakMap structure for proper cleanup
                    // Structure: handler -> element -> event:selector -> wrapper
                    if (!eventWrappers.has(handler)) {
                        eventWrappers.set(handler, new WeakMap());
                    }
                    const elementMap = eventWrappers.get(handler);
                    if (!elementMap.has(elem)) {
                        elementMap.set(elem, new Map());
                    }
                    const eventMap = elementMap.get(elem);
                    const key = `${event}:${selector}`;
                    eventMap.set(key, wrapper);
                    
                    elem.addEventListener(event, wrapper);
                } else {
                    elem.addEventListener(event, handler);
                }
            });
        },

        off: function (event, selector, handler) {
            // Support both 2 and 3 argument forms for backward compatibility
            if (typeof selector === 'function') {
                handler = selector;
                selector = null;
            }
            
            return this.each((i, elem) => {
                if (selector && eventWrappers.has(handler)) {
                    // Remove delegated event listener
                    const elementMap = eventWrappers.get(handler);
                    if (elementMap.has(elem)) {
                        const eventMap = elementMap.get(elem);
                        const key = `${event}:${selector}`;
                        const wrapper = eventMap.get(key);
                        if (wrapper) {
                            elem.removeEventListener(event, wrapper);
                            eventMap.delete(key);
                        }
                    }
                } else {
                    // Remove direct event listener
                    elem.removeEventListener(event, handler);
                }
            });
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
            // Handle promise internally to maintain chaining API
            navigator.clipboard.writeText(text)
                .catch(err => console.warn('Yaka copy: clipboard write failed', err));
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
                try {
                    const data = new Yaka(this).serialize();
                    localStorage.setItem(key, JSON.stringify(data));
                } catch (e) {
                    console.warn('Yaka autoSave: localStorage unavailable', e);
                }
            }, delay);
        },

        // NEW! Restore form data
        restore: function (key) {
            try {
                const data = JSON.parse(localStorage.getItem(key) || '{}');
                return this.each((i, elem) => {
                    if (elem.tagName === 'FORM') {
                        Object.keys(data).forEach(name => {
                            const input = elem.querySelector(`[name="${name}"]`);
                            if (input) input.value = data[name];
                        });
                    }
                });
            } catch (e) {
                console.warn('Yaka restore: localStorage unavailable', e);
                return this;
            }
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
                const fieldErrors = [];

                // Check all rules independently
                // Support both old 'message' and new specific message properties for backward compatibility
                if (rule.required && !value) {
                    fieldErrors.push(rule.requiredMessage || rule.message || 'This field is required');
                }
                if (value && rule.pattern && !rule.pattern.test(value)) {
                    fieldErrors.push(rule.patternMessage || rule.message || 'Invalid format');
                }
                if (value && rule.min && value.length < rule.min) {
                    fieldErrors.push(rule.minMessage || rule.message || `Minimum ${rule.min} characters`);
                }
                if (value && rule.max && value.length > rule.max) {
                    fieldErrors.push(rule.maxMessage || rule.message || `Maximum ${rule.max} characters`);
                }

                if (fieldErrors.length > 0) {
                    // Backward compatibility: Return format depends on usage pattern
                    // - Old API (single 'message' property): returns string
                    // - New API (specific message properties): returns array
                    // This ensures existing code continues to work while new code can collect multiple errors
                    if (fieldErrors.length === 1 && rule.message && 
                        !rule.requiredMessage && !rule.patternMessage && !rule.minMessage && !rule.maxMessage) {
                        errors[name] = fieldErrors[0]; // Single string for old API
                    } else {
                        errors[name] = fieldErrors; // Array for new API
                    }
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
                const range = target - start;
                const startTime = performance.now();

                const tick = (now) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    elem.textContent = Math.round(start + range * progress);
                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    }
                };

                requestAnimationFrame(tick);
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
