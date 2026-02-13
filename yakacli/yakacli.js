#!/usr/bin/env node

/**
 * YakaCLI - Command-line tool for scaffolding YakaJS projects
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const buildGenerator = require('./build-generator');
const featuresMap = buildGenerator.featuresMap;

// CLI Colors for better UX
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    white: '\x1b[37m',
    bgCyan: '\x1b[46m',
    bgGreen: '\x1b[42m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m'
};

// Project templates
const templates = {
    basic: {
        name: 'Basic Project',
        description: 'Simple HTML page with YakaJS',
        files: [
            'index.html',
            'css/style.css',
            'js/app.js',
            'README.md'
        ]
    },
    spa: {
        name: 'SPA (Single Page App)',
        description: 'Full routing and state management',
        files: [
            'index.html',
            'css/theme.css',
            'css/components.css',
            'js/router.js',
            'js/store.js',
            'js/components/navbar.js',
            'js/components/home.js',
            'js/components/404.js',
            'js/app.js',
            'README.md'
        ]
    },
    dashboard: {
        name: 'Dashboard',
        description: 'Admin dashboard with charts and tables',
        files: [
            'index.html',
            'css/dashboard.css',
            'css/responsive.css',
            'js/store.js',
            'js/components.js',
            'js/app.js',
            'README.md'
        ]
    },
    pwa: {
        name: 'PWA (Progressive Web App)',
        description: 'Offline-capable progressive web app',
        files: [
            'index.html',
            'manifest.json',
            'sw.js',
            'css/style.css',
            'js/app.js',
            'js/offline.js',
            'README.md'
        ]
    }
};

// Banner
function showBanner() {
    console.log(`${colors.cyan}${colors.bright}`);
    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║              ${colors.magenta}${colors.bright}YakaCLI${colors.cyan}  ${colors.white}v1.0.0${colors.cyan}                         ║
║        ${colors.dim}Professional Project Scaffolding${colors.cyan}${colors.bright}           ║
║                                                       ║
║     ${colors.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.cyan}      ║
║                                                       ║
║     ${colors.green}⚡ Custom Builds${colors.cyan}  ${colors.dim}•${colors.cyan}  ${colors.blue}📦 Scaffolding${colors.cyan}  ${colors.dim}•${colors.cyan}  ${colors.magenta}📊 Analysis${colors.cyan}  ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
    `);
    console.log(colors.reset);
}

// Decorative separator
function showSeparator(char = '─', color = colors.cyan) {
    console.log(`${color}${''.padStart(55, char)}${colors.reset}`);
}

// Section header with icon
function showSectionHeader(icon, title, color = colors.bright) {
    console.log();
    console.log(`${color}${icon}  ${title}${colors.reset}`);
    showSeparator('─', colors.dim);
}

// Progress indicator
function showProgress(message) {
    console.log(`${colors.blue}${colors.bright}⏳${colors.reset} ${colors.dim}${message}...${colors.reset}`);
}

// Show help
function showHelp() {
    showBanner();
    
    showSectionHeader('📖', 'USAGE', colors.cyan + colors.bright);
    console.log(`  ${colors.white}yakacli${colors.reset} ${colors.dim}<command> [options]${colors.reset}`);
    
    showSectionHeader('💾', 'INSTALLATION', colors.green + colors.bright);
    console.log(`  ${colors.green}Global Install:${colors.reset}  ${colors.cyan}npm install -g yakacli${colors.reset}`);
    console.log(`  ${colors.blue}Local Usage:${colors.reset}     ${colors.cyan}npx yakacli <command>${colors.reset}`);
    console.log(`  ${colors.yellow}From Source:${colors.reset}     ${colors.cyan}node yakacli/yakacli.js <command>${colors.reset}`);
    
    showSectionHeader('⚡', 'COMMANDS', colors.green + colors.bright);
    console.log(`  ${colors.cyan}create ${colors.dim}<project-name>${colors.reset}  ${colors.white}Create a new YakaJS project${colors.reset}`);
    console.log(`  ${colors.green}${colors.bright}build${colors.reset}${colors.green}                  ${colors.reset} ${colors.white}Generate custom YakaJS build ${colors.yellow}★ MAIN FEATURE${colors.reset}`);
    console.log(`  ${colors.cyan}analyze${colors.reset}                 ${colors.white}Analyze current codebase${colors.reset}`);
    console.log(`  ${colors.cyan}help${colors.reset}                    ${colors.white}Show this help message${colors.reset}`);
    console.log(`  ${colors.cyan}version${colors.reset}                 ${colors.white}Show version number${colors.reset}`);
    
    showSectionHeader('🎨', 'BUILD OPTIONS', colors.magenta + colors.bright);
    console.log(`  ${colors.green}⭐ Quick Build${colors.reset}     ${colors.dim}→${colors.reset} Choose from 7 optimized presets ${colors.green}(recommended)${colors.reset}`);
    console.log(`  ${colors.cyan}🎯 Custom Build${colors.reset}    ${colors.dim}→${colors.reset} Select specific feature categories`);
    console.log(`  ${colors.blue}📚 View Features${colors.reset}   ${colors.dim}→${colors.reset} Browse all available modules`);
    
    showSectionHeader('📦', 'PROJECT TEMPLATES', colors.blue + colors.bright);
    Object.keys(templates).forEach(key => {
        const template = templates[key];
        const icon = key === 'basic' ? '🌱' : key === 'spa' ? '⚡' : key === 'dashboard' ? '📊' : '📱';
        console.log(`  ${icon}  ${colors.cyan}${key.padEnd(12)}${colors.reset} ${colors.dim}•${colors.reset} ${template.name}`);
        console.log(`     ${colors.dim}${template.description}${colors.reset}`);
    });
    
    showSectionHeader('💡', 'EXAMPLES', colors.yellow + colors.bright);
    console.log(`  ${colors.cyan}yakacli build${colors.reset}         ${colors.dim}# Generate custom YakaJS build${colors.reset}`);
    console.log(`  ${colors.cyan}yakacli create my-app${colors.reset} ${colors.dim}# Scaffold new project${colors.reset}`);
    console.log(`  ${colors.cyan}yakacli analyze${colors.reset}       ${colors.dim}# Analyze codebase${colors.reset}`);
    
    showSectionHeader('🔗', 'MORE INFO', colors.magenta + colors.bright);
    console.log(`  ${colors.white}Documentation:${colors.reset}  ${colors.cyan}https://github.com/Yaka-UI-Labs/YakaJS${colors.reset}`);
    console.log(`  ${colors.white}Issues:${colors.reset}         ${colors.cyan}https://github.com/Yaka-UI-Labs/YakaJS/issues${colors.reset}`);
    
    console.log();
    showSeparator('═', colors.cyan);
    console.log();
}

// Show version
function showVersion() {
    console.log(`${colors.cyan}YakaCLI version 1.0.0${colors.reset}`);
}

// Prompt user for input
function prompt(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

// Analyze codebase
function analyzeCodebase() {
    showBanner();
    console.log(`${colors.bright}${colors.blue}📊 Analyzing YakaJS Codebase...${colors.reset}\n`);
    
    const yakaPath = path.join(process.cwd(), 'yaka.js');
    
    if (!fs.existsSync(yakaPath)) {
        console.log(`${colors.red}❌ Error: yaka.js not found in current directory${colors.reset}`);
        console.log(`${colors.yellow}💡 Tip: Run this command from the YakaJS repository root${colors.reset}`);
        return;
    }
    
    const content = fs.readFileSync(yakaPath, 'utf8');
    const lines = content.split('\n');
    
    // Analyze file
    const stats = {
        totalLines: lines.length,
        codeLines: lines.filter(l => l.trim() && !l.trim().startsWith('//')).length,
        commentLines: lines.filter(l => l.trim().startsWith('//')).length,
        functions: (content.match(/function\s+\w+\s*\(/g) || []).length,
        methods: (content.match(/\w+\s*:\s*function\s*\(/g) || []).length,
        arrowFunctions: (content.match(/=>\s*{/g) || []).length,
        classes: (content.match(/class\s+\w+/g) || []).length
    };
    
    // Feature detection
    const features = {
        'DOM Manipulation': /\.text\(|\.html\(|\.attr\(|\.css\(/g,
        'HTTP/AJAX': /\.get\(|\.post\(|\.ajax\(/g,
        'Routing': /createRouter|addRoute|navigateTo/g,
        'State Management': /createStore|mutations|actions/g,
        'Signals/Reactivity': /signal\(|effect\(|computed\(/g,
        'UI Components': /modal|tooltip|carousel|datepicker/g,
        'Security': /sanitize|escapeHtml|csrf/g,
        'Performance': /memoize|debounce|throttle/g
    };
    
    console.log(`${colors.bright}📁 File Statistics:${colors.reset}`);
    console.log(`  Total Lines:      ${colors.cyan}${stats.totalLines.toLocaleString()}${colors.reset}`);
    console.log(`  Code Lines:       ${colors.cyan}${stats.codeLines.toLocaleString()}${colors.reset}`);
    console.log(`  Comment Lines:    ${colors.cyan}${stats.commentLines.toLocaleString()}${colors.reset}`);
    console.log(`  Functions:        ${colors.cyan}${stats.functions}${colors.reset}`);
    console.log(`  Methods:          ${colors.cyan}${stats.methods}${colors.reset}`);
    console.log(`  Arrow Functions:  ${colors.cyan}${stats.arrowFunctions}${colors.reset}`);
    console.log(`  Classes:          ${colors.cyan}${stats.classes}${colors.reset}`);
    console.log();
    
    console.log(`${colors.bright}🎯 Feature Detection:${colors.reset}`);
    Object.entries(features).forEach(([name, pattern]) => {
        const matches = content.match(pattern) || [];
        const status = matches.length > 0 ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
        const count = matches.length > 0 ? `${colors.cyan}(${matches.length} references)${colors.reset}` : '';
        console.log(`  ${status} ${name.padEnd(25)} ${count}`);
    });
    console.log();
    
    // File size
    const stats_file = fs.statSync(yakaPath);
    const sizeKB = (stats_file.size / 1024).toFixed(2);
    console.log(`${colors.bright}📦 Bundle Size:${colors.reset}`);
    console.log(`  Full Source:  ${colors.cyan}${sizeKB} KB${colors.reset}`);
    
    // Check for minified version
    const minPath = path.join(process.cwd(), 'min.yaka.js');
    if (fs.existsSync(minPath)) {
        const minStats = fs.statSync(minPath);
        const minSizeKB = (minStats.size / 1024).toFixed(2);
        const reduction = (((stats_file.size - minStats.size) / stats_file.size) * 100).toFixed(1);
        console.log(`  Minified:     ${colors.cyan}${minSizeKB} KB${colors.reset} ${colors.green}(${reduction}% smaller)${colors.reset}`);
    }
    console.log();
    
    console.log(`${colors.green}✅ Analysis complete!${colors.reset}\n`);
}

// Build custom YakaJS
async function buildCustom() {
    showBanner();
    console.log(`${colors.bright}${colors.blue}🔧 Custom YakaJS Build Generator${colors.reset}\n`);
    
    const yakaPath = path.join(process.cwd(), 'yaka.js');
    
    if (!fs.existsSync(yakaPath)) {
        console.log(`${colors.red}❌ Error: yaka.js not found in current directory${colors.reset}`);
        console.log(`${colors.yellow}💡 Tip: Run this command from the YakaJS repository root${colors.reset}`);
        return;
    }
    
    showSeparator('═', colors.cyan);
    console.log(`\n${colors.bright}${colors.white}Build your custom YakaJS library:${colors.reset}\n`);
    showSeparator('─', colors.dim);
    
    console.log();
    console.log(`  ${colors.green}${colors.bright}⭐ 1${colors.reset}. ${colors.bright}Quick Build${colors.reset} ${colors.dim}━${colors.reset} Use a preset ${colors.green}${colors.bright}(RECOMMENDED)${colors.reset}`);
    console.log(`     ${colors.dim}│${colors.reset}`);
    console.log(`     ${colors.dim}└─→${colors.reset} ${colors.white}Choose from 7 optimized presets (minimal, spa, media, etc.)${colors.reset}`);
    console.log();
    console.log(`  ${colors.cyan}2${colors.reset}. ${colors.bright}Custom Build${colors.reset} ${colors.dim}━${colors.reset} Select specific feature categories`);
    console.log(`     ${colors.dim}│${colors.reset}`);
    console.log(`     ${colors.dim}└─→${colors.reset} ${colors.white}Pick exactly what you need from 10 categories${colors.reset}`);
    console.log();
    console.log(`  ${colors.blue}3${colors.reset}. ${colors.bright}View All Features${colors.reset} ${colors.dim}━${colors.reset} See what's available`);
    console.log(`     ${colors.dim}│${colors.reset}`);
    console.log(`     ${colors.dim}└─→${colors.reset} ${colors.white}Browse all modules and categories before deciding${colors.reset}`);
    
    console.log();
    showSeparator('─', colors.dim);
    console.log();
    
    const buildChoice = await prompt(`${colors.bright}${colors.yellow}▶${colors.reset}  ${colors.bright}Select option (1-3):${colors.reset} `);
    
    if (buildChoice === '1') {
        // Quick Build - Show presets
        console.log(`\n${colors.bright}${colors.green}⭐ Quick Build - Choose a Preset${colors.reset}\n`);
        console.log(`${colors.yellow}💡 Recommended for most users - optimized, tested configurations${colors.reset}\n`);
        
        const presetKeys = Object.keys(featuresMap.presets);
        presetKeys.forEach((key, index) => {
            const preset = featuresMap.presets[key];
            const tag = key === 'standard' ? ` ${colors.green}[POPULAR]${colors.reset}` : 
                       key === 'minimal' ? ` ${colors.blue}[SMALLEST]${colors.reset}` : '';
            console.log(`  ${colors.cyan}${index + 1}${colors.reset}. ${colors.bright}${preset.name}${colors.reset}${tag}`);
            console.log(`     ${preset.description}\n`);
        });
        
        const presetChoice = await prompt(`${colors.bright}Select preset (1-${presetKeys.length}): ${colors.reset}`);
        const presetIndex = parseInt(presetChoice) - 1;
        
        if (isNaN(presetIndex) || presetIndex < 0 || presetIndex >= presetKeys.length) {
            console.log(`${colors.red}❌ Invalid selection${colors.reset}`);
            return;
        }
        
        const presetKey = presetKeys[presetIndex];
        const preset = featuresMap.presets[presetKey];
        
        console.log();
        showSeparator('─', colors.green);
        console.log(`\n${colors.green}✓${colors.reset} ${colors.bright}Selected:${colors.reset} ${colors.green}${colors.bright}${preset.name}${colors.reset}`);
        console.log(`  ${colors.dim}${preset.description}${colors.reset}\n`);
        showSeparator('─', colors.green);
        
        // Generate build
        console.log();
        console.log(`${colors.bright}${colors.blue}🔨 Generating custom build...${colors.reset}`);
        console.log(`${colors.dim}Please wait while we assemble your optimized library${colors.reset}\n`);
        
        const outputName = await prompt(`${colors.bright}${colors.yellow}▶${colors.reset}  ${colors.bright}Output filename:${colors.reset} ${colors.dim}(default: custom-yaka.js)${colors.reset} `);
        const sanitizedName = (outputName || 'custom-yaka.js').replace(/[^a-zA-Z0-9._-]/g, '_');
        const outputPath = path.join(process.cwd(), sanitizedName);
        
        try {
            const result = buildGenerator.generateFromPreset(yakaPath, presetKey, outputPath);
            
            console.log();
            showSeparator('═', colors.green);
            console.log();
            console.log(`${colors.green}${colors.bright}  ✅ Build completed successfully!${colors.reset}`);
            console.log();
            showSeparator('═', colors.green);
            console.log();
            
            console.log(`${colors.bright}${colors.white}📊 Build Statistics:${colors.reset}`);
            console.log();
            console.log(`  ${colors.cyan}📁 Output file:${colors.reset}      ${colors.bright}${path.basename(result.outputPath)}${colors.reset}`);
            console.log(`  ${colors.cyan}📦 Original size:${colors.reset}    ${colors.yellow}${(result.originalSize / 1024).toFixed(2)} KB${colors.reset}`);
            console.log(`  ${colors.green}✨ Custom size:${colors.reset}      ${colors.green}${colors.bright}${(result.customSize / 1024).toFixed(2)} KB${colors.reset}`);
            console.log(`  ${colors.magenta}🎯 Size reduction:${colors.reset}   ${colors.magenta}${colors.bright}${result.reduction}%${colors.reset} ${colors.green}↓${colors.reset}`);
            console.log(`  ${colors.blue}📚 Modules included:${colors.reset} ${colors.bright}${result.modulesIncluded}${colors.reset}`);
            console.log();
            showSeparator('═', colors.green);
            console.log();
            console.log(`${colors.green}${colors.bright}🎉 Your custom build is ready to use!${colors.reset}`);
            console.log();
            
        } catch (error) {
            console.log();
            console.log(`${colors.red}${colors.bright}❌ Error generating build:${colors.reset} ${error.message}`);
            console.log();
        }
        
    } else if (buildChoice === '2') {
        // Custom Build - Select categories
        console.log();
        showSeparator('═', colors.cyan);
        console.log(`\n${colors.bright}${colors.cyan}  🎯 Custom Build - Select Feature Categories${colors.reset}\n`);
        showSeparator('═', colors.cyan);
        console.log();
        console.log(`${colors.yellow}💡 ${colors.bright}Tip:${colors.reset} ${colors.white}Core features (DOM, Events, HTTP) are always included${colors.reset}\n`);
        showSeparator('─', colors.dim);
        console.log();
        
        const categoryKeys = Object.keys(featuresMap.categories).filter(key => key !== 'core');
        categoryKeys.forEach((key, index) => {
            const category = featuresMap.categories[key];
            const icons = {
                animations: '✨', uiComponents: '🎨', forms: '📝',
                routing: '🧭', effects: '🌟', media: '📹',
                deviceApis: '📱', advanced: '⚙️', ai: '🤖', devTools: '🔧'
            };
            const icon = icons[key] || '•';
            console.log(`  ${colors.cyan}${(index + 1).toString().padStart(2)}${colors.reset}. ${icon}  ${colors.bright}${category.name}${colors.reset}`);
            console.log(`      ${colors.dim}${category.description}${colors.reset}\n`);
        });
        
        showSeparator('─', colors.dim);
        console.log();
        console.log(`${colors.bright}How to select:${colors.reset}`);
        console.log(`  ${colors.dim}•${colors.reset} Enter numbers separated by commas: ${colors.cyan}1,3,5${colors.reset}`);
        console.log(`  ${colors.dim}•${colors.reset} Enter ${colors.cyan}'all'${colors.reset} for everything`);
        console.log(`  ${colors.dim}•${colors.reset} Press ${colors.green}Enter${colors.reset} for minimal build (core only)`);
        console.log();
        showSeparator('─', colors.dim);
        console.log();
        
        const categoriesInput = await prompt(`${colors.bright}${colors.yellow}▶${colors.reset}  ${colors.bright}Your selection:${colors.reset} `);
        
        let selectedCategories = ['core']; // Always include core
        
        if (categoriesInput.toLowerCase().trim() === 'all') {
            selectedCategories = 'all';
        } else {
            const indices = categoriesInput.split(',').map(s => parseInt(s.trim()) - 1);
            indices.forEach(index => {
                if (index >= 0 && index < categoryKeys.length) {
                    selectedCategories.push(categoryKeys[index]);
                }
            });
        }
        
        if (selectedCategories.length === 1 && selectedCategories[0] === 'core') {
            console.log(`${colors.yellow}⚠️  Only core features selected. This is a minimal build.${colors.reset}\n`);
        } else {
            console.log(`\n${colors.green}✓${colors.reset} Selected ${colors.cyan}${selectedCategories === 'all' ? 'ALL' : selectedCategories.length}${colors.reset} categories\n`);
        }
        
        // Generate build
        console.log(`${colors.bright}🔨 Generating custom build...${colors.reset}\n`);
        
        const outputName = await prompt(`${colors.bright}Output filename (default: custom-yaka.js): ${colors.reset}`);
        const sanitizedName = (outputName || 'custom-yaka.js').replace(/[^a-zA-Z0-9._-]/g, '_');
        const outputPath = path.join(process.cwd(), sanitizedName);
        
        try {
            const result = buildGenerator.generateFromCategories(yakaPath, selectedCategories, outputPath);
            
            console.log(`${colors.green}${colors.bright}✅ Build completed successfully!${colors.reset}\n`);
            console.log(`${colors.bright}Build Statistics:${colors.reset}`);
            console.log(`  Output file:      ${colors.cyan}${result.outputPath}${colors.reset}`);
            console.log(`  Original size:    ${colors.cyan}${(result.originalSize / 1024).toFixed(2)} KB${colors.reset}`);
            console.log(`  Custom size:      ${colors.cyan}${(result.customSize / 1024).toFixed(2)} KB${colors.reset}`);
            console.log(`  Size reduction:   ${colors.green}${result.reduction}%${colors.reset}`);
            console.log(`  Modules included: ${colors.cyan}${result.modulesIncluded}${colors.reset}`);
            console.log();
            showSeparator('═', colors.green);
            console.log();
            console.log(`${colors.green}${colors.bright}🎉 Your custom build is ready to use!${colors.reset}`);
            console.log();
            
        } catch (error) {
            console.log();
            console.log(`${colors.red}${colors.bright}❌ Error generating build:${colors.reset} ${error.message}`);
            console.log();
        }
        
    } else if (buildChoice === '3') {
        // View All Features
        console.log();
        showSeparator('═', colors.magenta);
        console.log(`\n${colors.bright}${colors.magenta}  📚 YakaJS Features Overview${colors.reset}\n`);
        showSeparator('═', colors.magenta);
        console.log();
        
        const allCategories = Object.keys(featuresMap.categories);
        allCategories.forEach(categoryKey => {
            const category = featuresMap.categories[categoryKey];
            const isRequired = category.required ? ` ${colors.yellow}[REQUIRED]${colors.reset}` : '';
            const icons = {
                core: '⚡', animations: '✨', uiComponents: '🎨', forms: '📝',
                routing: '🧭', effects: '🌟', media: '📹',
                deviceApis: '📱', advanced: '⚙️', ai: '🤖', devTools: '🔧'
            };
            const icon = icons[categoryKey] || '•';
            
            console.log(`${icon}  ${colors.bright}${category.name}${colors.reset}${isRequired}`);
            console.log(`   ${colors.dim}${category.description}${colors.reset}`);
            console.log(`   ${colors.cyan}Modules:${colors.reset} ${colors.bright}${category.modules.length}${colors.reset}`);
            console.log();
        });
        
        showSeparator('─', colors.dim);
        console.log();
        console.log(`${colors.bright}${colors.white}🎯 Presets Available:${colors.reset}\n`);
        const presetKeys = Object.keys(featuresMap.presets);
        presetKeys.forEach(key => {
            const preset = featuresMap.presets[key];
            const presetIcons = {
                minimal: '📦', standard: '⭐', full: '🌟', spa: '⚡',
                media: '📹', interactive: '✨', developer: '🔧'
            };
            const icon = presetIcons[key] || '•';
            console.log(`  ${icon}  ${colors.bright}${preset.name}${colors.reset}`);
            console.log(`      ${colors.dim}${preset.description}${colors.reset}`);
        });
        
        console.log();
        showSeparator('═', colors.magenta);
        console.log();
        console.log(`${colors.yellow}💡 ${colors.bright}Tip:${colors.reset} ${colors.white}Run ${colors.cyan}'yakacli build'${colors.white} again to create your custom build${colors.reset}`);
        console.log();
        
    } else {
        console.log();
        console.log(`${colors.red}❌ Invalid selection${colors.reset}`);
        console.log();
    }
}

// Create project
async function createProject(projectName) {
    if (!projectName) {
        console.log(`${colors.red}❌ Error: Project name is required${colors.reset}`);
        console.log(`${colors.yellow}Usage: yakacli create <project-name>${colors.reset}`);
        return;
    }
    
    showBanner();
    
    console.log(`${colors.bright}🚀 Creating YakaJS Project: ${colors.cyan}${projectName}${colors.reset}\n`);
    
    // Show template options
    console.log(`${colors.bright}Available Templates:${colors.reset}\n`);
    const templateKeys = Object.keys(templates);
    templateKeys.forEach((key, index) => {
        const template = templates[key];
        console.log(`  ${colors.cyan}${index + 1}${colors.reset}. ${colors.bright}${template.name}${colors.reset}`);
        console.log(`     ${template.description}\n`);
    });
    
    // Get user choice
    const answer = await prompt(`${colors.bright}Select a template (1-${templateKeys.length}): ${colors.reset}`);
    const templateIndex = parseInt(answer) - 1;
    
    if (isNaN(templateIndex) || templateIndex < 0 || templateIndex >= templateKeys.length) {
        console.log(`${colors.red}❌ Invalid selection${colors.reset}`);
        return;
    }
    
    const templateType = templateKeys[templateIndex];
    const template = templates[templateType];
    
    console.log(`\n${colors.green}✓${colors.reset} Selected: ${colors.bright}${template.name}${colors.reset}\n`);
    
    // Create project directory
    const projectPath = path.join(process.cwd(), projectName);
    
    if (fs.existsSync(projectPath)) {
        console.log(`${colors.red}❌ Error: Directory '${projectName}' already exists${colors.reset}`);
        return;
    }
    
    console.log(`${colors.bright}📁 Creating project structure...${colors.reset}\n`);
    
    // Create directories
    const dirs = new Set();
    template.files.forEach(file => {
        const dir = path.dirname(file);
        if (dir !== '.') {
            dirs.add(dir);
        }
    });
    
    fs.mkdirSync(projectPath, { recursive: true });
    dirs.forEach(dir => {
        const dirPath = path.join(projectPath, dir);
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`  ${colors.cyan}+${colors.reset} ${dir}/`);
    });
    
    // Load template generator
    const templateGenerator = require('./templates/generator');
    
    // Generate files
    console.log();
    template.files.forEach(file => {
        const filePath = path.join(projectPath, file);
        const content = templateGenerator.generate(templateType, file, projectName);
        fs.writeFileSync(filePath, content);
        console.log(`  ${colors.green}+${colors.reset} ${file}`);
    });
    
    console.log();
    console.log(`${colors.green}${colors.bright}✅ Project created successfully!${colors.reset}\n`);
    console.log(`${colors.bright}Next steps:${colors.reset}`);
    console.log(`  ${colors.cyan}cd ${projectName}${colors.reset}`);
    console.log(`  ${colors.cyan}# Open index.html in your browser${colors.reset}`);
    console.log();
    console.log(`${colors.yellow}💡 Tip: Use a local server for best results:${colors.reset}`);
    console.log(`  ${colors.cyan}npx http-server${colors.reset}  ${colors.reset}(if you have Node.js)`);
    console.log(`  ${colors.cyan}python -m http.server${colors.reset}  ${colors.reset}(if you have Python)`);
    console.log();
}

// Main CLI handler
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    
    if (!command || command === 'help' || command === '--help' || command === '-h') {
        showHelp();
        return;
    }
    
    switch (command) {
        case 'version':
        case '--version':
        case '-v':
            showVersion();
            break;
            
        case 'create':
            await createProject(args[1]);
            break;
            
        case 'build':
            await buildCustom();
            break;
            
        case 'analyze':
            analyzeCodebase();
            break;
            
        default:
            console.log(`${colors.red}❌ Unknown command: ${command}${colors.reset}`);
            console.log(`${colors.yellow}Run 'yakacli help' for usage information${colors.reset}`);
    }
}

// Run CLI
main().catch(error => {
    console.error(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
    process.exit(1);
});
