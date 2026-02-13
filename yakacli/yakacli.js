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
    console.log(`${colors.cyan}${colors.bright}YakaCLI${colors.reset} ${colors.dim}v1.0.0${colors.reset}`);
    console.log();
}

// Decorative separator
function showSeparator(char = '-', color = colors.dim) {
    console.log(`${color}${''.padStart(60, char)}${colors.reset}`);
}

// Section header
function showSectionHeader(title, color = colors.bright) {
    console.log();
    console.log(`${color}${title}${colors.reset}`);
    showSeparator('-', colors.dim);
}

// Progress indicator
function showProgress(message) {
    console.log(`${colors.blue}${colors.bright}⏳${colors.reset} ${colors.dim}${message}...${colors.reset}`);
}

// Show help
function showHelp() {
    showBanner();
    
    showSectionHeader('USAGE');
    console.log(`  yakacli <command> [options]`);
    
    showSectionHeader('INSTALLATION');
    console.log(`  Global:      npm install -g yakacli`);
    console.log(`  Local:       npx yakacli <command>`);
    console.log(`  From source: node yakacli/yakacli.js <command>`);
    
    showSectionHeader('COMMANDS');
    console.log(`  create <name>   Create a new YakaJS project`);
    console.log(`  build           Generate custom YakaJS build`);
    console.log(`  analyze         Analyze current codebase`);
    console.log(`  help            Show this help message`);
    console.log(`  version         Show version number`);
    
    showSectionHeader('BUILD OPTIONS');
    console.log(`  Quick Build     Choose from optimized presets (recommended)`);
    console.log(`  Custom Build    Select specific feature categories`);
    console.log(`  View Features   Browse all available modules`);
    
    showSectionHeader('PROJECT TEMPLATES');
    Object.keys(templates).forEach(key => {
        const template = templates[key];
        console.log(`  ${key.padEnd(12)} ${template.name}`);
        console.log(`  ${' '.repeat(12)} ${colors.dim}${template.description}${colors.reset}`);
    });
    
    showSectionHeader('EXAMPLES');
    console.log(`  yakacli build           Generate custom YakaJS build`);
    console.log(`  yakacli create my-app   Scaffold new project`);
    console.log(`  yakacli analyze         Analyze codebase`);
    
    showSectionHeader('MORE INFO');
    console.log(`  Documentation: https://github.com/Yaka-UI-Labs/YakaJS`);
    console.log(`  Issues:        https://github.com/Yaka-UI-Labs/YakaJS/issues`);
    
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
    console.log(`Analyzing YakaJS codebase...\n`);
    
    const yakaPath = path.join(process.cwd(), 'yaka.js');
    
    if (!fs.existsSync(yakaPath)) {
        console.log(`${colors.red}Error: yaka.js not found in current directory${colors.reset}`);
        console.log(`${colors.dim}Tip: Run this command from the YakaJS repository root${colors.reset}`);
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
    
    console.log(`${colors.bright}File Statistics:${colors.reset}`);
    console.log(`  Total Lines:      ${stats.totalLines.toLocaleString()}`);
    console.log(`  Code Lines:       ${stats.codeLines.toLocaleString()}`);
    console.log(`  Comment Lines:    ${stats.commentLines.toLocaleString()}`);
    console.log(`  Functions:        ${stats.functions}`);
    console.log(`  Methods:          ${stats.methods}`);
    console.log(`  Arrow Functions:  ${stats.arrowFunctions}`);
    console.log(`  Classes:          ${stats.classes}`);
    console.log();
    
    console.log(`${colors.bright}Feature Detection:${colors.reset}`);
    Object.entries(features).forEach(([name, pattern]) => {
        const matches = content.match(pattern) || [];
        const status = matches.length > 0 ? `[${colors.green}+${colors.reset}]` : `[${colors.dim}-${colors.reset}]`;
        const count = matches.length > 0 ? `(${matches.length} references)` : '';
        console.log(`  ${status} ${name.padEnd(25)} ${colors.dim}${count}${colors.reset}`);
    });
    console.log();
    
    // File size
    const stats_file = fs.statSync(yakaPath);
    const sizeKB = (stats_file.size / 1024).toFixed(2);
    console.log(`${colors.bright}Bundle Size:${colors.reset}`);
    console.log(`  Full Source:  ${sizeKB} KB`);
    
    // Check for minified version
    const minPath = path.join(process.cwd(), 'min.yaka.js');
    if (fs.existsSync(minPath)) {
        const minStats = fs.statSync(minPath);
        const minSizeKB = (minStats.size / 1024).toFixed(2);
        const reduction = (((stats_file.size - minStats.size) / stats_file.size) * 100).toFixed(1);
        console.log(`  Minified:     ${minSizeKB} KB ${colors.dim}(${reduction}% smaller)${colors.reset}`);
    }
    console.log();
    
    console.log(`${colors.green}Analysis complete${colors.reset}\n`);
}

// Build custom YakaJS
async function buildCustom() {
    showBanner();
    console.log(`Custom YakaJS Build Generator\n`);
    
    const yakaPath = path.join(process.cwd(), 'yaka.js');
    
    if (!fs.existsSync(yakaPath)) {
        console.log(`${colors.red}Error: yaka.js not found in current directory${colors.reset}`);
        console.log(`${colors.dim}Tip: Run this command from the YakaJS repository root${colors.reset}`);
        return;
    }
    
    showSeparator();
    console.log();
    console.log(`Build Options:\n`);
    
    console.log(`  ${colors.bright}1.${colors.reset} Quick Build      ${colors.dim}Choose from optimized presets (recommended)${colors.reset}`);
    console.log(`  ${colors.bright}2.${colors.reset} Custom Build     ${colors.dim}Select specific feature categories${colors.reset}`);
    console.log(`  ${colors.bright}3.${colors.reset} View Features    ${colors.dim}Browse all available modules${colors.reset}`);
    
    console.log();
    showSeparator();
    console.log();
    
    const buildChoice = await prompt(`Select option (1-3): `);
    
    if (buildChoice === '1') {
        // Quick Build - Show presets
        console.log();
        console.log(`${colors.bright}Quick Build - Choose a Preset${colors.reset}\n`);
        
        const presetKeys = Object.keys(featuresMap.presets);
        presetKeys.forEach((key, index) => {
            const preset = featuresMap.presets[key];
            const tag = key === 'standard' ? ` ${colors.dim}(recommended)${colors.reset}` : 
                       key === 'minimal' ? ` ${colors.dim}(smallest)${colors.reset}` : '';
            console.log(`  ${index + 1}. ${preset.name}${tag}`);
            console.log(`     ${colors.dim}${preset.description}${colors.reset}\n`);
        });
        
        const presetChoice = await prompt(`Select preset (1-${presetKeys.length}): `);
        const presetIndex = parseInt(presetChoice) - 1;
        
        if (isNaN(presetIndex) || presetIndex < 0 || presetIndex >= presetKeys.length) {
            console.log(`${colors.red}Invalid selection${colors.reset}`);
            return;
        }
        
        const presetKey = presetKeys[presetIndex];
        const preset = featuresMap.presets[presetKey];
        
        console.log();
        console.log(`Selected: ${colors.bright}${preset.name}${colors.reset}`);
        console.log(`${colors.dim}${preset.description}${colors.reset}\n`);
        
        // Generate build
        console.log(`Generating build...`);
        
        const outputName = await prompt(`Output filename (default: custom-yaka.js): `);
        const sanitizedName = (outputName || 'custom-yaka.js').replace(/[^a-zA-Z0-9._-]/g, '_');
        const outputPath = path.join(process.cwd(), sanitizedName);
        
        try {
            const result = buildGenerator.generateFromPreset(yakaPath, presetKey, outputPath);
            
            console.log();
            showSeparator();
            console.log();
            console.log(`${colors.green}Build completed successfully${colors.reset}\n`);
            
            console.log(`${colors.bright}Build Statistics:${colors.reset}`);
            console.log(`  Output file:      ${path.basename(result.outputPath)}`);
            console.log(`  Original size:    ${(result.originalSize / 1024).toFixed(2)} KB`);
            console.log(`  Custom size:      ${(result.customSize / 1024).toFixed(2)} KB`);
            console.log(`  Size reduction:   ${result.reduction}%`);
            console.log(`  Modules included: ${result.modulesIncluded}`);
            
            if (result.docPath) {
                console.log(`  Documentation:    ${path.basename(result.docPath)}`);
            }
            
            console.log();
            
        } catch (error) {
            console.log();
            console.log(`${colors.red}Error generating build: ${error.message}${colors.reset}`);
            console.log();
        }
        
    } else if (buildChoice === '2') {
        // Custom Build - Select categories
        console.log();
        console.log(`${colors.bright}Custom Build - Select Feature Categories${colors.reset}\n`);
        console.log(`${colors.dim}Core features (DOM, Events, HTTP) are always included${colors.reset}\n`);
        
        const categoryKeys = Object.keys(featuresMap.categories).filter(key => key !== 'core');
        categoryKeys.forEach((key, index) => {
            const category = featuresMap.categories[key];
            console.log(`  ${(index + 1).toString().padStart(2)}. ${category.name}`);
            console.log(`      ${colors.dim}${category.description}${colors.reset}\n`);
        });
        
        showSeparator();
        console.log();
        console.log(`Selection options:`);
        console.log(`  Enter numbers separated by commas: 1,3,5`);
        console.log(`  Enter 'all' for everything`);
        console.log(`  Press Enter for minimal build (core only)`);
        console.log();
        
        const categoriesInput = await prompt(`Your selection: `);
        
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
            console.log(`\n${colors.dim}Only core features selected - minimal build${colors.reset}\n`);
        } else {
            console.log(`\nSelected ${selectedCategories === 'all' ? 'all' : selectedCategories.length} categories\n`);
        }
        
        // Generate build
        console.log(`Generating build...`);
        
        const outputName = await prompt(`Output filename (default: custom-yaka.js): `);
        const sanitizedName = (outputName || 'custom-yaka.js').replace(/[^a-zA-Z0-9._-]/g, '_');
        const outputPath = path.join(process.cwd(), sanitizedName);
        
        try {
            const result = buildGenerator.generateFromCategories(yakaPath, selectedCategories, outputPath);
            
            console.log();
            showSeparator();
            console.log();
            console.log(`${colors.green}Build completed successfully${colors.reset}\n`);
            
            console.log(`${colors.bright}Build Statistics:${colors.reset}`);
            console.log(`  Output file:      ${path.basename(result.outputPath)}`);
            console.log(`  Original size:    ${(result.originalSize / 1024).toFixed(2)} KB`);
            console.log(`  Custom size:      ${(result.customSize / 1024).toFixed(2)} KB`);
            console.log(`  Size reduction:   ${result.reduction}%`);
            console.log(`  Modules included: ${result.modulesIncluded}`);
            
            if (result.docPath) {
                console.log(`  Documentation:    ${path.basename(result.docPath)}`);
            }
            
            console.log();
            
        } catch (error) {
            console.log();
            console.log(`${colors.red}Error generating build: ${error.message}${colors.reset}`);
            console.log();
        }
        
    } else if (buildChoice === '3') {
        // View All Features
        console.log();
        console.log(`${colors.bright}YakaJS Features Overview${colors.reset}\n`);
        
        const allCategories = Object.keys(featuresMap.categories);
        allCategories.forEach(categoryKey => {
            const category = featuresMap.categories[categoryKey];
            const isRequired = category.required ? ` ${colors.dim}(required)${colors.reset}` : '';
            
            console.log(`${colors.bright}${category.name}${colors.reset}${isRequired}`);
            console.log(`  ${colors.dim}${category.description}${colors.reset}`);
            console.log(`  Modules: ${category.modules.length}`);
            console.log();
        });
        
        showSeparator();
        console.log();
        console.log(`${colors.bright}Available Presets:${colors.reset}\n`);
        const presetKeys = Object.keys(featuresMap.presets);
        presetKeys.forEach(key => {
            const preset = featuresMap.presets[key];
            console.log(`  ${preset.name}`);
            console.log(`  ${colors.dim}${preset.description}${colors.reset}`);
        });
        
        console.log();
        console.log(`${colors.dim}Run 'yakacli build' again to create your custom build${colors.reset}`);
        console.log();
        
    } else {
        console.log();
        console.log(`${colors.red}Invalid selection${colors.reset}`);
        console.log();
    }
}

// Create project
async function createProject(projectName) {
    if (!projectName) {
        console.log(`${colors.red}Error: Project name is required${colors.reset}`);
        console.log(`Usage: yakacli create <project-name>`);
        return;
    }
    
    showBanner();
    
    console.log(`Creating YakaJS project: ${colors.bright}${projectName}${colors.reset}\n`);
    
    // Show template options
    console.log(`Available Templates:\n`);
    const templateKeys = Object.keys(templates);
    templateKeys.forEach((key, index) => {
        const template = templates[key];
        console.log(`  ${index + 1}. ${template.name}`);
        console.log(`     ${colors.dim}${template.description}${colors.reset}\n`);
    });
    
    // Get user choice
    const answer = await prompt(`Select a template (1-${templateKeys.length}): `);
    const templateIndex = parseInt(answer) - 1;
    
    if (isNaN(templateIndex) || templateIndex < 0 || templateIndex >= templateKeys.length) {
        console.log(`${colors.red}Invalid selection${colors.reset}`);
        return;
    }
    
    const templateType = templateKeys[templateIndex];
    const template = templates[templateType];
    
    console.log(`\n${colors.green}✓${colors.reset} Selected: ${colors.bright}${template.name}${colors.reset}\n`);
    
    // Create project directory
    const projectPath = path.join(process.cwd(), projectName);
    
    if (fs.existsSync(projectPath)) {
        console.log(`${colors.red}Error: Directory '${projectName}' already exists${colors.reset}`);
        return;
    }
    
    console.log(`Creating project structure...\n`);
    
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
        console.log(`  + ${dir}/`);
    });
    
    // Load template generator
    const templateGenerator = require('./templates/generator');
    
    // Generate files
    console.log();
    template.files.forEach(file => {
        const filePath = path.join(projectPath, file);
        const content = templateGenerator.generate(templateType, file, projectName);
        fs.writeFileSync(filePath, content);
        console.log(`  + ${file}`);
    });
    
    console.log();
    console.log(`${colors.green}Project created successfully${colors.reset}\n`);
    console.log(`Next steps:`);
    console.log(`  cd ${projectName}`);
    console.log(`  # Open index.html in your browser`);
    console.log();
    console.log(`${colors.dim}Tip: Use a local server for best results${colors.reset}`);
    console.log(`  npx http-server`);
    console.log(`  python -m http.server`);
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
