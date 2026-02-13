/**
 * Build Generator for YakaCLI
 * Generates custom YakaJS builds with selected features
 */

const fs = require('fs');
const path = require('path');
const featuresMap = require('./features-map');
const docGenerator = require('./doc-generator');

/**
 * Extract lines from yaka.js file
 */
function extractLines(yakaPath, start, end) {
    const content = fs.readFileSync(yakaPath, 'utf8');
    const lines = content.split('\n');
    return lines.slice(start - 1, end).join('\n');
}

/**
 * Get all modules for selected categories
 */
function getModulesForCategories(categories) {
    const modules = [];
    const allCategories = Object.keys(featuresMap.categories);
    
    // If 'all' is selected, include everything
    if (categories === 'all' || categories.includes('all')) {
        categories = allCategories;
    }
    
    // Always include core
    if (!categories.includes('core')) {
        categories.unshift('core');
    }
    
    // Get all modules for selected categories
    categories.forEach(categoryKey => {
        const category = featuresMap.categories[categoryKey];
        if (category && category.modules) {
            modules.push(...category.modules);
        }
    });
    
    return [...new Set(modules)]; // Remove duplicates
}

/**
 * Generate custom build
 */
function generateBuild(yakaPath, selectedModules, options = {}) {
    // Sanitize output path to prevent directory traversal
    let outputPath = options.output || 'custom-yaka.js';
    const basename = path.basename(outputPath);
    const sanitizedName = basename.replace(/[^a-zA-Z0-9._-]/g, '_');
    outputPath = path.join(path.dirname(yakaPath), sanitizedName);
    
    const includeComments = options.comments !== false;
    
    // Read the full yaka.js file
    const fullContent = fs.readFileSync(yakaPath, 'utf8');
    const lines = fullContent.split('\n');
    
    // Extract copyright header (lines 1-8)
    const header = lines.slice(0, 8).join('\n');
    
    // Start building the custom file
    let customContent = header + '\n\n';
    
    // Add opening IIFE
    customContent += '(function (window) {\n';
    customContent += "    'use strict';\n\n";
    
    // Track which lines we've already included
    const includedLines = new Set();
    
    // Sort modules by start line to maintain order
    const moduleList = selectedModules.map(moduleName => {
        const module = featuresMap.modules[moduleName];
        if (!module) {
            console.warn(`Warning: Module "${moduleName}" not found`);
            return null;
        }
        return {
            name: moduleName,
            ...module
        };
    }).filter(m => m !== null).sort((a, b) => a.start - b.start);
    
    // Extract code for each module
    moduleList.forEach(module => {
        // Skip if lines already included
        let shouldInclude = false;
        for (let i = module.start; i <= module.end; i++) {
            if (!includedLines.has(i)) {
                shouldInclude = true;
                break;
            }
        }
        
        if (shouldInclude) {
            if (includeComments) {
                customContent += `\n    // ==================== ${module.name.toUpperCase().replace(/-/g, ' ')} ====================\n\n`;
            }
            
            // Extract the module code
            const moduleCode = lines.slice(module.start - 1, module.end).join('\n');
            customContent += moduleCode + '\n';
            
            // Mark lines as included
            for (let i = module.start; i <= module.end; i++) {
                includedLines.add(i);
            }
        }
    });
    
    // Add closing and export (lines 5016-5018)
    customContent += '\n    // Export\n';
    customContent += '    window.Yaka = Yaka;\n';
    customContent += '    window._ = Yaka;\n';
    customContent += '})(window);\n';
    
    // Write the custom build
    fs.writeFileSync(outputPath, customContent);
    
    // Calculate size reduction
    const originalSize = fs.statSync(yakaPath).size;
    const customSize = fs.statSync(outputPath).size;
    const reduction = ((1 - customSize / originalSize) * 100).toFixed(1);
    
    const buildStats = {
        outputPath,
        fileName: path.basename(outputPath),
        originalSize,
        customSize,
        reduction,
        moduleCount: moduleList.length
    };
    
    // Generate documentation if enabled (default: true)
    if (options.generateDocs !== false) {
        try {
            const docPath = docGenerator.generateDocumentation(
                selectedModules,
                buildStats,
                outputPath
            );
            buildStats.docPath = docPath;
        } catch (err) {
            console.warn('Warning: Could not generate documentation:', err.message);
        }
    }
    
    return {
        ...buildStats,
        modulesIncluded: moduleList.length
    };
}

/**
 * Generate build from preset
 */
function generateFromPreset(yakaPath, presetName, outputPath) {
    const preset = featuresMap.presets[presetName];
    if (!preset) {
        throw new Error(`Preset "${presetName}" not found`);
    }
    
    const modules = getModulesForCategories(
        preset.categories === 'all' ? 'all' : preset.categories
    );
    
    return generateBuild(yakaPath, modules, { output: outputPath });
}

/**
 * Generate build from selected categories
 */
function generateFromCategories(yakaPath, categories, outputPath) {
    const modules = getModulesForCategories(categories);
    return generateBuild(yakaPath, modules, { output: outputPath });
}

/**
 * Get build info without generating
 */
function getBuildInfo(selectedModules) {
    const info = {
        modules: [],
        categories: new Set(),
        estimatedLines: 0
    };
    
    selectedModules.forEach(moduleName => {
        const module = featuresMap.modules[moduleName];
        if (module) {
            info.modules.push(moduleName);
            info.categories.add(module.category);
            info.estimatedLines += (module.end - module.start + 1);
        }
    });
    
    return {
        ...info,
        categories: Array.from(info.categories),
        estimatedSize: Math.round(info.estimatedLines * 30) // Rough estimate: 30 bytes per line
    };
}

module.exports = {
    generateBuild,
    generateFromPreset,
    generateFromCategories,
    getModulesForCategories,
    getBuildInfo,
    featuresMap
};
