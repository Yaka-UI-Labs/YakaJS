/**
 * YakaJS Feature Map
 * Maps features to their line ranges in yaka.js for custom builds
 */

module.exports = {
    // Feature categories with their modules
    categories: {
        core: {
            name: 'Core Features',
            description: 'Essential DOM manipulation, events, and utilities (always included)',
            required: true,
            modules: [
                'constructor',
                'basic-methods',
                'content',
                'attributes',
                'classes',
                'styles',
                'dom-manipulation',
                'traversal',
                'events',
                'utilities',
                'http-basic',
                'storage'
            ]
        },
        
        animations: {
            name: 'Animations',
            description: 'Fade, slide, animate, pulse, shake effects',
            modules: ['animations-basic', 'animations-advanced']
        },
        
        uiComponents: {
            name: 'UI Components',
            description: 'Modals, tooltips, tabs, accordion, carousel, buttons, checkboxes, menus, etc.',
            modules: [
                'modal',
                'notifications',
                'tooltips',
                'button',
                'checkboxradio',
                'controlgroup',
                'menu',
                'tabs',
                'accordion',
                'carousel',
                'color-picker',
                'date-picker',
                'slider',
                'autocomplete',
                'data-table'
            ]
        },
        
        forms: {
            name: 'Forms & Validation',
            description: 'Form handling, validation, masking, auto-save',
            modules: [
                'form-serialization',
                'form-autosave',
                'form-validation',
                'form-masking',
                'form-honeypot',
                'validator-advanced'
            ]
        },
        
        routing: {
            name: 'Routing & State',
            description: 'SPA routing, state management, signals',
            modules: [
                'router-simple',
                'router-advanced',
                'state-basic',
                'store-advanced',
                'signals'
            ]
        },
        
        effects: {
            name: 'Visual Effects',
            description: 'Parallax, tilt, ripple, magnetic, glitch, confetti',
            modules: [
                'parallax',
                'tilt',
                'magnetic',
                'ripple',
                'glitch',
                'confetti',
                'particles',
                'scramble',
                'progress-bar',
                'skeleton-loader'
            ]
        },
        
        media: {
            name: 'Media & WebRTC',
            description: 'Webcam, audio, video, screen recording',
            modules: [
                'webrtc',
                'audio-api',
                'video-controls',
                'screen-recording',
                'image-upload',
                'canvas-helper',
                'charts'
            ]
        },
        
        deviceApis: {
            name: 'Device APIs',
            description: 'Geolocation, battery, bluetooth, vibration, sensors',
            modules: [
                'geolocation',
                'battery',
                'vibration',
                'bluetooth',
                'device-detection',
                'network-status'
            ]
        },
        
        advanced: {
            name: 'Advanced Features',
            description: 'Drag & drop, resizable, droppable, selectable, sortable, gestures, position utility, web workers',
            modules: [
                'draggable',
                'resizable',
                'droppable',
                'selectable',
                'sortable',
                'gestures',
                'position-utility',
                'web-workers',
                'view-transitions',
                'indexeddb',
                'virtual-dom'
            ]
        },
        
        ai: {
            name: 'AI & ML',
            description: 'WebNN, sentiment analysis, text summarization',
            modules: ['ai-webnn']
        },
        
        devTools: {
            name: 'Developer Tools',
            description: 'Theme engine, debug mode, performance monitoring',
            modules: [
                'theme-engine',
                'debug-mode',
                'safe-mode',
                'feature-detection',
                'performance-monitoring',
                'memory-leak-detector',
                'plugin-system'
            ]
        }
    },
    
    // Module definitions with line ranges
    modules: {
        // CORE (always included)
        'constructor': { start: 1, end: 58, category: 'core' },
        'basic-methods': { start: 62, end: 85, category: 'core' },
        'content': { start: 87, end: 108, category: 'core' },
        'attributes': { start: 110, end: 133, category: 'core' },
        'classes': { start: 135, end: 160, category: 'core' },
        'styles': { start: 162, end: 182, category: 'core' },
        'dom-manipulation': { start: 262, end: 337, category: 'core' },
        'traversal': { start: 339, end: 400, category: 'core' },
        'events': { start: 402, end: 490, category: 'core' },
        'utilities': { start: 719, end: 877, category: 'core' },
        'http-basic': { start: 720, end: 769, category: 'core' },
        'storage': { start: 842, end: 877, category: 'core' },
        
        // ANIMATIONS
        'animations-basic': { start: 184, end: 226, category: 'animations' },
        'animations-advanced': { start: 228, end: 260, category: 'animations' },
        
        // UI COMPONENTS
        'modal': { start: 1861, end: 1909, category: 'uiComponents' },
        'notifications': { start: 1790, end: 1859, category: 'uiComponents' },
        'tooltips': { start: 1807, end: 1866, category: 'uiComponents' },
        'button': { start: 1868, end: 1980, category: 'uiComponents' },
        'checkboxradio': { start: 1982, end: 2063, category: 'uiComponents' },
        'controlgroup': { start: 2065, end: 2118, category: 'uiComponents' },
        'menu': { start: 2120, end: 2213, category: 'uiComponents' },
        'tabs': { start: 2534, end: 2581, category: 'uiComponents' },
        'accordion': { start: 2583, end: 2623, category: 'uiComponents' },
        'carousel': { start: 2625, end: 2679, category: 'uiComponents' },
        'color-picker': { start: 2457, end: 2493, category: 'uiComponents' },
        'date-picker': { start: 2495, end: 2528, category: 'uiComponents' },
        'slider': { start: 2530, end: 2574, category: 'uiComponents' },
        'autocomplete': { start: 2356, end: 2455, category: 'uiComponents' },
        'data-table': { start: 2271, end: 2354, category: 'uiComponents' },
        
        // FORMS
        'form-serialization': { start: 552, end: 563, category: 'forms' },
        'form-autosave': { start: 565, end: 584, category: 'forms' },
        'form-validation': { start: 586, end: 617, category: 'forms' },
        'form-masking': { start: 3146, end: 3244, category: 'forms' },
        'form-honeypot': { start: 3246, end: 3284, category: 'forms' },
        'validator-advanced': { start: 4349, end: 4537, category: 'forms' },
        
        // ROUTING & STATE
        'router-simple': { start: 1385, end: 1422, category: 'routing' },
        'router-advanced': { start: 4128, end: 4346, category: 'routing' },
        'state-basic': { start: 1009, end: 1036, category: 'routing' },
        'store-advanced': { start: 4651, end: 4829, category: 'routing' },
        'signals': { start: 3031, end: 3072, category: 'routing' },
        
        // EFFECTS
        'parallax': { start: 1951, end: 1971, category: 'effects' },
        'tilt': { start: 2660, end: 2698, category: 'effects' },
        'magnetic': { start: 2700, end: 2729, category: 'effects' },
        'ripple': { start: 2628, end: 2658, category: 'effects' },
        'glitch': { start: 2759, end: 2782, category: 'effects' },
        'confetti': { start: 679, end: 716, category: 'effects' },
        'particles': { start: 2359, end: 2386, category: 'effects' },
        'scramble': { start: 2731, end: 2757, category: 'effects' },
        'progress-bar': { start: 2784, end: 2810, category: 'effects' },
        'skeleton-loader': { start: 2840, end: 2860, category: 'effects' },
        
        // MEDIA
        'webrtc': { start: 1462, end: 1483, category: 'media' },
        'audio-api': { start: 2388, end: 2447, category: 'media' },
        'video-controls': { start: 2449, end: 2474, category: 'media' },
        'screen-recording': { start: 2160, end: 2185, category: 'media' },
        'image-upload': { start: 1177, end: 1191, category: 'media' },
        'canvas-helper': { start: 1485, end: 1530, category: 'media' },
        'charts': { start: 1532, end: 1585, category: 'media' },
        
        // DEVICE APIs
        'geolocation': { start: 1259, end: 1282, category: 'deviceApis' },
        'battery': { start: 1310, end: 1321, category: 'deviceApis' },
        'vibration': { start: 1303, end: 1308, category: 'deviceApis' },
        'bluetooth': { start: 3872, end: 3930, category: 'deviceApis' },
        'device-detection': { start: 2512, end: 2534, category: 'deviceApis' },
        'network-status': { start: 1323, end: 1328, category: 'deviceApis' },
        
        // ADVANCED
        'draggable': { start: 1204, end: 1254, category: 'advanced' },
        'sortable': { start: 1256, end: 1298, category: 'advanced' },
        'resizable': { start: 1301, end: 1435, category: 'advanced' },
        'droppable': { start: 1437, end: 1524, category: 'advanced' },
        'selectable': { start: 1525, end: 1667, category: 'advanced' },
        'gestures': { start: 1669, end: 1698, category: 'advanced' },
        'position-utility': { start: 4001, end: 4103, category: 'advanced' },
        'web-workers': { start: 3337, end: 3380, category: 'advanced' },
        'view-transitions': { start: 3111, end: 3144, category: 'advanced' },
        'indexeddb': { start: 2080, end: 2135, category: 'advanced' },
        'virtual-dom': { start: 2189, end: 2230, category: 'advanced' },
        
        // AI
        'ai-webnn': { start: 3444, end: 3507, category: 'ai' },
        
        // DEV TOOLS
        'theme-engine': { start: 3511, end: 3633, category: 'devTools' },
        'debug-mode': { start: 2895, end: 2911, category: 'devTools' },
        'safe-mode': { start: 2913, end: 2937, category: 'devTools' },
        'feature-detection': { start: 2939, end: 2988, category: 'devTools' },
        'performance-monitoring': { start: 4830, end: 4955, category: 'devTools' },
        'memory-leak-detector': { start: 3074, end: 3106, category: 'devTools' },
        'plugin-system': { start: 3635, end: 3686, category: 'devTools' }
    },
    
    // Pre-defined presets
    presets: {
        minimal: {
            name: 'Minimal',
            description: 'Just core DOM, events, and HTTP (smallest bundle)',
            categories: ['core']
        },
        
        standard: {
            name: 'Standard',
            description: 'Core + animations + basic UI components',
            categories: ['core', 'animations', 'uiComponents']
        },
        
        full: {
            name: 'Full',
            description: 'Everything included (complete library)',
            categories: 'all'
        },
        
        spa: {
            name: 'SPA Framework',
            description: 'Perfect for single-page applications',
            categories: ['core', 'animations', 'routing', 'forms', 'uiComponents']
        },
        
        media: {
            name: 'Media Rich',
            description: 'For apps with camera, audio, video features',
            categories: ['core', 'animations', 'media', 'deviceApis']
        },
        
        interactive: {
            name: 'Interactive',
            description: 'Rich interactions and visual effects',
            categories: ['core', 'animations', 'effects', 'advanced', 'uiComponents']
        },
        
        developer: {
            name: 'Developer',
            description: 'With all developer tools and debugging features',
            categories: ['core', 'animations', 'devTools', 'routing']
        }
    }
};
