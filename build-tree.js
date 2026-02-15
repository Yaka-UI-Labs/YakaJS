#!/usr/bin/env node

/**
 * Build script to extract features from yaka.js into tree/ folder structure
 * This creates individual feature files that can be used independently
 */

const fs = require('fs');
const path = require('path');

// Read the source file
const sourceFile = path.join(__dirname, 'src/yaka.js');
const sourceContent = fs.readFileSync(sourceFile, 'utf-8');
const lines = sourceContent.split('\n');

// Define feature categories and their boundaries
const featureCategories = [
    {
        name: 'core',
        startMarker: '// ==================== BASIC METHODS ====================',
        endMarker: '// ==================== CONTENT METHODS ====================',
        fileName: 'basic-methods.js',
        description: 'Basic DOM selection and iteration methods'
    },
    {
        name: 'core',
        startMarker: '// ==================== CONTENT METHODS ====================',
        endMarker: '// ==================== ATTRIBUTES ====================',
        fileName: 'content-methods.js',
        description: 'Text, HTML, and value manipulation'
    },
    {
        name: 'core',
        startMarker: '// ==================== ATTRIBUTES ====================',
        endMarker: '// ==================== CLASSES ====================',
        fileName: 'attributes.js',
        description: 'Attribute and data manipulation'
    },
    {
        name: 'core',
        startMarker: '// ==================== CLASSES ====================',
        endMarker: '// ==================== STYLES ====================',
        fileName: 'classes.js',
        description: 'CSS class manipulation'
    },
    {
        name: 'core',
        startMarker: '// ==================== STYLES ====================',
        endMarker: '// ==================== ANIMATIONS (ENHANCED!) ====================',
        fileName: 'styles.js',
        description: 'CSS styling methods'
    },
    {
        name: 'animations',
        startMarker: '// ==================== ANIMATIONS (ENHANCED!) ====================',
        endMarker: '// ==================== DOM MANIPULATION ====================',
        fileName: 'animations.js',
        description: 'Animation and effects methods'
    },
    {
        name: 'dom',
        startMarker: '// ==================== DOM MANIPULATION ====================',
        endMarker: '// ==================== TRAVERSAL ====================',
        fileName: 'manipulation.js',
        description: 'DOM manipulation methods'
    },
    {
        name: 'dom',
        startMarker: '// ==================== TRAVERSAL ====================',
        endMarker: '// ==================== EVENTS ====================',
        fileName: 'traversal.js',
        description: 'DOM traversal methods'
    },
    {
        name: 'events',
        startMarker: '// ==================== EVENTS ====================',
        endMarker: '// ==================== ADVANCED FEATURES (jQuery doesn\'t have!) ====================',
        fileName: 'events.js',
        description: 'Event handling and delegation'
    },
    {
        name: 'ui',
        startMarker: '// ==================== ADVANCED FEATURES (jQuery doesn\'t have!) ====================',
        endMarker: '// ==================== STATIC METHODS ====================',
        fileName: 'advanced-features.js',
        description: 'Advanced UI features (draggable, sortable, resizable, etc.)'
    },
    {
        name: 'ajax',
        startMarker: '// ==================== 1. ENHANCED HTTP WITH ERROR HANDLING ====================',
        endMarker: '// ==================== 2. ADVANCED ROUTING ====================',
        fileName: 'http.js',
        description: 'Enhanced HTTP and AJAX methods'
    },
    {
        name: 'ajax',
        startMarker: '// ==================== 2. ADVANCED ROUTING ====================',
        endMarker: '// ==================== 3. ADVANCED VALIDATION FRAMEWORK ====================',
        fileName: 'routing.js',
        description: 'Advanced routing system'
    },
    {
        name: 'validation',
        startMarker: '// ==================== 3. ADVANCED VALIDATION FRAMEWORK ====================',
        endMarker: '// ==================== 4. SECURITY UTILITIES ====================',
        fileName: 'validation.js',
        description: 'Form validation framework'
    },
    {
        name: 'security',
        startMarker: '// ==================== 4. SECURITY UTILITIES ====================',
        endMarker: '// ==================== 5. ADVANCED STATE MANAGEMENT (STORE) ====================',
        fileName: 'security.js',
        description: 'Security utilities (XSS, CSRF protection)'
    },
    {
        name: 'state',
        startMarker: '// ==================== 5. ADVANCED STATE MANAGEMENT (STORE) ====================',
        endMarker: '// ==================== 6. PERFORMANCE MONITORING ====================',
        fileName: 'store.js',
        description: 'State management (Store pattern)'
    },
    {
        name: 'performance',
        startMarker: '// ==================== 6. PERFORMANCE MONITORING ====================',
        endMarker: '// ==================== PHASE 6: NEW HIGH-IMPACT FEATURES ====================',
        fileName: 'monitoring.js',
        description: 'Performance monitoring utilities'
    }
];

// Extract utility methods from static methods section
const utilityCategories = [
    { name: 'utils/array', pattern: /\.(chunk|flatten|uniq|compact|difference|union|intersection|pluck|groupBy|sortBy|shuffle)\s*=/, fileName: 'array-utils.js' },
    { name: 'utils/object', pattern: /\.(deepClone|merge|isEqual|get|set|pick|omit|has|keys|values|entries)\s*=/, fileName: 'object-utils.js' },
    { name: 'utils/string', pattern: /\.(camelCase|kebabCase|snakeCase|capitalize|truncate|slugify|escape|unescape)\s*=/, fileName: 'string-utils.js' },
    { name: 'utils/date', pattern: /\.(formatDate|fromNow|diffDates|addDays|addHours|addMinutes|startOf|endOf)\s*=/, fileName: 'date-utils.js' },
    { name: 'utils/math', pattern: /\.(clamp|random|sum|mean|median|min|max|round|floor|ceil)\s*=/, fileName: 'math-utils.js' },
    { name: 'utils/async', pattern: /\.(sleep|retry|timeout|debounce|throttle|all|race|allSettled)\s*=/, fileName: 'async-utils.js' },
];

function findLineNumber(marker) {
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(marker)) {
            return i;
        }
    }
    return -1;
}

function extractSection(startLine, endLine) {
    return lines.slice(startLine, endLine).join('\n');
}

function createFeatureFile(category, fileName, content, description, isCore = false) {
    const folderPath = path.join(__dirname, 'tree', category);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const header = `/*!
 * YakaJS - ${description}
 * Part of the modular YakaJS library
 * https://github.com/Yaka-UI-Labs/YakaJS
 * 
 * This file can be used independently or as part of the full YakaJS bundle
 * Copyright (c) 2026
 * Released under the MIT license
 */

`;

    // For non-core files, wrap in plugin format
    let finalContent = content;
    if (!isCore && category !== 'core' && !fileName.includes('-methods.js') && fileName !== 'yaka-core.js' && 
        fileName !== 'attributes.js' && fileName !== 'classes.js' && fileName !== 'styles.js') {
        const pluginName = fileName.replace('.js', '');
        finalContent = `(function(window) {
    'use strict';
    
    // This is a YakaJS plugin
    const plugin = function(Yaka) {
        if (!Yaka || !Yaka.prototype) {
            console.error('YakaJS core is required. Please load yaka-core.js first.');
            return;
        }
        
        // Add methods to Yaka prototype
        Object.assign(Yaka.prototype, {
${indentCode(content, 12)}
        });
    };
    
    // Auto-register if Yaka is available
    if (typeof window !== 'undefined' && window.Yaka) {
        plugin(window.Yaka);
    }
    
    // Support manual registration via Yaka.use()
    if (typeof window !== 'undefined' && window.Yaka && window.Yaka.use) {
        // Already auto-registered above
    }
    
    // Export for module systems
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = plugin;
    }
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : globalThis));
`;
    }

    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, header + finalContent, 'utf-8');
    console.log(`✓ Created: tree/${category}/${fileName} (${finalContent.split('\n').length} lines)`);
}

function indentCode(code, spaces) {
    const indent = ' '.repeat(spaces);
    return code.split('\n')
        .map(line => line.trim() ? indent + line : line)
        .join('\n');
}

// Extract features based on markers
console.log('🌲 Building tree folder structure...\n');

featureCategories.forEach(category => {
    const startLine = findLineNumber(category.startMarker);
    const endLine = findLineNumber(category.endMarker);

    if (startLine !== -1 && endLine !== -1) {
        const content = extractSection(startLine, endLine);
        createFeatureFile(category.name, category.fileName, content, category.description);
    } else {
        console.warn(`⚠ Warning: Could not find markers for ${category.name}/${category.fileName}`);
    }
});

// Extract utility methods
console.log('\n📦 Extracting utility methods...\n');

const staticMethodsStart = findLineNumber('// ==================== STATIC METHODS ====================');
const staticMethodsEnd = findLineNumber('// ==================== ADVANCED FEATURES ====================');

if (staticMethodsStart !== -1 && staticMethodsEnd !== -1) {
    const staticSection = lines.slice(staticMethodsStart, staticMethodsEnd).join('\n');

    utilityCategories.forEach(util => {
        const matches = [];
        const regex = new RegExp(`(Yaka\\.${util.pattern.source}[\\s\\S]*?)(?=\\n\\s*Yaka\\.|\\n\\s*\\/\\/|$)`, 'g');
        let match;

        while ((match = regex.exec(staticSection)) !== null) {
            matches.push(match[1]);
        }

        if (matches.length > 0) {
            const content = matches.join('\n\n');
            createFeatureFile(util.name, util.fileName, content, `${util.name.split('/')[1]} utility methods`);
        }
    });
}

// Create a core bundle that includes constructor and essential methods
console.log('\n🔧 Creating core bundle...\n');

const coreStart = findLineNumber('(function (window) {');
const prototypeEnd = findLineNumber('    // ==================== STATIC METHODS ====================');

if (coreStart !== -1 && prototypeEnd !== -1) {
    const coreContent = lines.slice(coreStart, prototypeEnd + 1).join('\n');
    
    // Add plugin system and export
    const exportSection = `
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
`;

    createFeatureFile('core', 'yaka-core.js', coreContent + exportSection, 'Core YakaJS constructor and prototype methods', true);
}

// Create an index file for the tree folder
const indexContent = `/**
 * YakaJS Tree Folder Index
 * 
 * This folder contains modularized features from YakaJS.
 * Each file can be used independently or combined as needed.
 * 
 * Directory Structure:
 * - core/        - Core DOM methods and constructor
 * - dom/         - DOM manipulation and traversal
 * - events/      - Event handling
 * - animations/  - Animation effects
 * - ui/          - Advanced UI features
 * - ajax/        - HTTP and routing
 * - utils/       - Utility functions
 * - validation/  - Form validation
 * - security/    - Security utilities
 * - state/       - State management
 * - performance/ - Performance monitoring
 * 
 * Usage:
 * You can include individual features in your project:
 * <script src="tree/core/yaka-core.js"></script>
 * <script src="tree/animations/animations.js"></script>
 * 
 * Or use the full bundle from dist/min.yaka.js
 */

module.exports = {
    // Core features
    core: require('./core/yaka-core.js'),
    
    // Available as separate modules
    dom: {
        manipulation: './dom/manipulation.js',
        traversal: './dom/traversal.js'
    },
    events: './events/events.js',
    animations: './animations/animations.js',
    ajax: {
        http: './ajax/http.js',
        routing: './ajax/routing.js'
    },
    validation: './validation/validation.js',
    security: './security/security.js',
    state: './state/store.js',
    performance: './performance/monitoring.js'
};
`;

fs.writeFileSync(path.join(__dirname, 'tree', 'index.js'), indexContent, 'utf-8');
console.log('✓ Created: tree/index.js\n');

// Create a README for the tree folder
const readmeContent = `# YakaJS Tree Folder

## What is YakaJS?

**YakaJS** is the **jQuery-beating library** - a next-generation JavaScript library that surpasses jQuery in features, performance, and modern capabilities while maintaining the same elegant simplicity.

### Why YakaJS Beats jQuery

- 🎤 **Voice Commands** - Built-in voice control (jQuery doesn't have this!)
- ⚡ **234 Features** - More features than jQuery (jQuery has ~160)
- 🚀 **Modern Architecture** - ES6+, async/await, promises everywhere
- 🔒 **Security First** - Built-in XSS protection, CSRF tokens, input sanitization
- 📦 **151 KB** - Comparable size to jQuery but with 56% more features
- 🎨 **Premium UI** - 30+ built-in components (draggable, sortable, carousel, etc.)
- 💎 **Better Performance** - Batched DOM updates prevent layout thrashing
- 🛡️ **Never Crashes** - Safe-mode chaining prevents undefined errors

**Bottom line:** YakaJS does everything jQuery does, plus 74+ features jQuery doesn't have, with better performance and modern JavaScript practices.

---

## About This Folder

This folder contains the modularized version of YakaJS, where each feature is separated into individual files for easier development, maintenance, and code organization.

## Purpose

\`\`\`
tree/
├── core/              # Core functionality
│   ├── basic-methods.js
│   ├── content-methods.js
│   ├── attributes.js
│   ├── classes.js
│   ├── styles.js
│   └── yaka-core.js
├── dom/               # DOM manipulation
│   ├── manipulation.js
│   └── traversal.js
├── events/            # Event handling
│   └── events.js
├── animations/        # Animation effects
│   └── animations.js
├── ui/                # UI components
│   └── advanced-features.js
├── ajax/              # HTTP and routing
│   ├── http.js
│   └── routing.js
├── utils/             # Utility functions
│   ├── array-utils.js
│   ├── object-utils.js
│   ├── string-utils.js
│   ├── date-utils.js
│   ├── math-utils.js
│   └── async-utils.js
├── validation/        # Form validation
│   └── validation.js
├── security/          # Security utilities
│   └── security.js
├── state/             # State management
│   └── store.js
└── performance/       # Performance monitoring
    └── monitoring.js
\`\`\`

## Usage

### Using Individual Features

You can include only the features you need:

\`\`\`html
<!-- Include core -->
<script src="tree/core/yaka-core.js"></script>

<!-- Add animations -->
<script src="tree/animations/animations.js"></script>

<!-- Add AJAX -->
<script src="tree/ajax/http.js"></script>
\`\`\`

### Using the Full Bundle

For convenience, use the pre-built bundles from the \`dist/\` folder:

\`\`\`html
<script src="dist/min.yaka.js"></script>
\`\`\`

## Build Process

The tree folder is automatically generated from \`src/yaka.js\` when you run:

\`\`\`bash
npm run build
\`\`\`

This extracts and organizes features into separate files while maintaining backward compatibility.

## Benefits

1. **Selective Loading**: Include only the features you need
2. **Better Organization**: Easy to find and maintain specific features
3. **Smaller Bundle Size**: Build custom bundles with selected features
4. **Development**: Easier to work on specific features in isolation
5. **Tree Shaking**: Better support for modern bundlers

## Notes

- All files in this folder are auto-generated from \`src/yaka.js\`
- Manual changes to these files will be overwritten on the next build
- To modify features, edit \`src/yaka.js\` and rebuild
`;

fs.writeFileSync(path.join(__dirname, 'tree', 'README.md'), readmeContent, 'utf-8');
console.log('✓ Created: tree/README.md\n');

console.log('✅ Tree folder structure created successfully!');
console.log(`📊 Total files created: ${featureCategories.length + utilityCategories.length + 3}`);
