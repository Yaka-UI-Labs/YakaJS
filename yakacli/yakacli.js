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
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m'
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
╔═══════════════════════════════════════╗
║                                       ║
║           YakaCLI v1.0.0             ║
║    YakaJS Project Scaffolding Tool   ║
║                                       ║
╚═══════════════════════════════════════╝
    `);
    console.log(colors.reset);
}

// Show help
function showHelp() {
    showBanner();
    console.log(`${colors.bright}USAGE:${colors.reset}`);
    console.log(`  yakacli <command> [options]\n`);
    
    console.log(`${colors.bright}COMMANDS:${colors.reset}`);
    console.log(`  ${colors.cyan}create <project-name>${colors.reset}  Create a new YakaJS project`);
    console.log(`  ${colors.cyan}build${colors.reset}                   Generate custom YakaJS build with selected features`);
    console.log(`  ${colors.cyan}analyze${colors.reset}                 Analyze current codebase`);
    console.log(`  ${colors.cyan}help${colors.reset}                    Show this help message`);
    console.log(`  ${colors.cyan}version${colors.reset}                 Show version number\n`);
    
    console.log(`${colors.bright}PROJECT TEMPLATES:${colors.reset}`);
    Object.keys(templates).forEach(key => {
        const template = templates[key];
        console.log(`  ${colors.green}${key.padEnd(12)}${colors.reset} ${template.name} - ${template.description}`);
    });
    console.log();
    
    console.log(`${colors.bright}EXAMPLES:${colors.reset}`);
    console.log(`  yakacli create my-app`);
    console.log(`  yakacli build`);
    console.log(`  yakacli analyze`);
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
    
    console.log(`${colors.bright}Choose how to build:${colors.reset}\n`);
    console.log(`  ${colors.cyan}1${colors.reset}. Use a preset (minimal, standard, full, spa, media, etc.)`);
    console.log(`  ${colors.cyan}2${colors.reset}. Select custom feature categories\n`);
    
    const buildChoice = await prompt(`${colors.bright}Select option (1-2): ${colors.reset}`);
    
    if (buildChoice === '1') {
        // Show presets
        console.log(`\n${colors.bright}Available Presets:${colors.reset}\n`);
        const presetKeys = Object.keys(featuresMap.presets);
        presetKeys.forEach((key, index) => {
            const preset = featuresMap.presets[key];
            console.log(`  ${colors.cyan}${index + 1}${colors.reset}. ${colors.bright}${preset.name}${colors.reset}`);
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
        
        console.log(`\n${colors.green}✓${colors.reset} Selected: ${colors.bright}${preset.name}${colors.reset}\n`);
        
        // Generate build
        console.log(`${colors.bright}🔨 Generating custom build...${colors.reset}\n`);
        
        const outputName = await prompt(`${colors.bright}Output filename (default: custom-yaka.js): ${colors.reset}`);
        const outputPath = path.join(process.cwd(), outputName || 'custom-yaka.js');
        
        try {
            const result = buildGenerator.generateFromPreset(yakaPath, presetKey, outputPath);
            
            console.log(`${colors.green}${colors.bright}✅ Build completed successfully!${colors.reset}\n`);
            console.log(`${colors.bright}Build Statistics:${colors.reset}`);
            console.log(`  Output file:      ${colors.cyan}${result.outputPath}${colors.reset}`);
            console.log(`  Original size:    ${colors.cyan}${(result.originalSize / 1024).toFixed(2)} KB${colors.reset}`);
            console.log(`  Custom size:      ${colors.cyan}${(result.customSize / 1024).toFixed(2)} KB${colors.reset}`);
            console.log(`  Size reduction:   ${colors.green}${result.reduction}%${colors.reset}`);
            console.log(`  Modules included: ${colors.cyan}${result.modulesIncluded}${colors.reset}`);
            console.log();
            
        } catch (error) {
            console.log(`${colors.red}❌ Error generating build: ${error.message}${colors.reset}`);
        }
        
    } else if (buildChoice === '2') {
        // Show feature categories
        console.log(`\n${colors.bright}Select Feature Categories:${colors.reset}\n`);
        console.log(`${colors.yellow}Note: Core features are always included${colors.reset}\n`);
        
        const categoryKeys = Object.keys(featuresMap.categories).filter(key => key !== 'core');
        categoryKeys.forEach((key, index) => {
            const category = featuresMap.categories[key];
            console.log(`  ${colors.cyan}${index + 1}${colors.reset}. ${colors.bright}${category.name}${colors.reset}`);
            console.log(`     ${category.description}`);
            console.log(`     Modules: ${colors.cyan}${category.modules.length}${colors.reset}\n`);
        });
        
        console.log(`${colors.bright}Enter category numbers separated by commas (e.g., 1,3,5)${colors.reset}`);
        console.log(`${colors.bright}Or enter 'all' for everything:${colors.reset}\n`);
        
        const categoriesInput = await prompt(`${colors.bright}Your selection: ${colors.reset}`);
        
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
        const outputPath = path.join(process.cwd(), outputName || 'custom-yaka.js');
        
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
            
        } catch (error) {
            console.log(`${colors.red}❌ Error generating build: ${error.message}${colors.reset}`);
        }
        
    } else {
        console.log(`${colors.red}❌ Invalid selection${colors.reset}`);
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
