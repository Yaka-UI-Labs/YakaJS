/**
 * Documentation Generator for Custom YakaJS Builds
 * Generates API documentation specific to selected features
 */

const fs = require('fs');
const path = require('path');
const featuresMap = require('./features-map');

/**
 * Generate comprehensive documentation for a custom build
 */
function generateDocumentation(selectedModules, buildStats, outputPath) {
    const buildName = path.basename(outputPath, '.js');
    const docPath = outputPath.replace('.js', '-README.md');
    
    // Generate documentation content
    const doc = generateMarkdown(selectedModules, buildStats, buildName);
    
    // Write documentation file
    fs.writeFileSync(docPath, doc, 'utf8');
    
    return docPath;
}

/**
 * Generate markdown documentation content
 */
function generateMarkdown(selectedModules, buildStats, buildName) {
    const sections = [];
    
    // Header
    sections.push(generateHeader(buildName, buildStats));
    
    // Table of Contents
    sections.push(generateTableOfContents(selectedModules));
    
    // Installation
    sections.push(generateInstallation(buildName));
    
    // Quick Start
    sections.push(generateQuickStart());
    
    // API Reference by Category
    sections.push(generateAPIReference(selectedModules));
    
    // Feature List
    sections.push(generateFeatureList(selectedModules));
    
    // Size Information
    sections.push(generateSizeInfo(buildStats));
    
    // Examples
    sections.push(generateExamples(selectedModules));
    
    // Support
    sections.push(generateSupport());
    
    return sections.join('\n\n');
}

/**
 * Generate header section
 */
function generateHeader(buildName, buildStats) {
    const reduction = typeof buildStats.reduction === 'string' 
        ? parseFloat(buildStats.reduction) 
        : buildStats.reduction;
    
    return `# ${buildName} - Custom YakaJS Build

> Custom build generated with selected features

**Build Statistics:**
- 📦 **Size:** ${(buildStats.customSize / 1024).toFixed(2)} KB
- 📉 **Reduction:** ${reduction.toFixed(1)}% smaller than full build
- 📚 **Modules:** ${buildStats.moduleCount} included
- 🎯 **Optimized:** For your specific use case

---`;
}

/**
 * Generate table of contents
 */
function generateTableOfContents(selectedModules) {
    const categories = getIncludedCategories(selectedModules);
    
    let toc = `## 📖 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)`;
    
    categories.forEach(cat => {
        const name = cat.name.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase();
        toc += `\n  - [${cat.name}](#${name})`;
    });
    
    toc += `
- [Feature List](#feature-list)
- [Size Information](#size-information)
- [Examples](#examples)
- [Support](#support)`;
    
    return toc;
}

/**
 * Generate installation section
 */
function generateInstallation(buildName) {
    return `## 🚀 Installation

### Using in HTML

\`\`\`html
<!-- Include the custom build -->
<script src="${buildName}.js"></script>

<script>
  // YakaJS is now available as _ or Yaka
  _('#myElement').addClass('active');
</script>
\`\`\`

### Using with Module Bundler

\`\`\`javascript
// Import the custom build
import _ from './${buildName}';

// Use YakaJS features
_('#app').html('<h1>Hello!</h1>');
\`\`\``;
}

/**
 * Generate quick start section
 */
function generateQuickStart() {
    return `## ⚡ Quick Start

\`\`\`javascript
// Wait for DOM ready
_(() => {
  console.log('DOM is ready!');
  
  // Select elements
  const element = _('#myElement');
  
  // Manipulate DOM
  element
    .addClass('active')
    .css('color', 'blue')
    .html('Updated!');
  
  // Handle events
  _('.button').on('click', (e) => {
    console.log('Button clicked!');
  });
});
\`\`\``;
}

/**
 * Generate API reference section
 */
function generateAPIReference(selectedModules) {
    let apiRef = `## 📚 API Reference

This custom build includes the following APIs organized by category:

`;
    
    const categories = getIncludedCategories(selectedModules);
    
    categories.forEach(category => {
        apiRef += `### ${category.icon} ${category.name}\n\n`;
        
        if (category.description) {
            apiRef += `${category.description}\n\n`;
        }
        
        const categoryModules = selectedModules.filter(m => 
            category.modules && category.modules.includes(m)
        );
        
        if (categoryModules.length > 0) {
            apiRef += `**Available Features:**\n\n`;
            categoryModules.forEach(moduleName => {
                const moduleInfo = getModuleInfo(moduleName);
                if (moduleInfo) {
                    apiRef += `- **${moduleInfo.name}** (${moduleInfo.lines})\n`;
                    apiRef += `  - ${moduleInfo.features}\n`;
                }
            });
            apiRef += '\n';
        }
    });
    
    return apiRef;
}

/**
 * Generate feature list section
 */
function generateFeatureList(selectedModules) {
    let featureList = `## ✨ Feature List

### Included Features

This build includes ${selectedModules.length} modules with the following capabilities:

`;
    
    selectedModules.forEach(moduleName => {
        const moduleInfo = getModuleInfo(moduleName);
        if (moduleInfo) {
            featureList += `#### ${moduleInfo.name}\n`;
            featureList += `- **Lines:** ${moduleInfo.lines}\n`;
            featureList += `- **Features:** ${moduleInfo.features}\n\n`;
        }
    });
    
    // List excluded features
    const allModules = getAllModuleNames();
    const excludedModules = allModules.filter(m => !selectedModules.includes(m) && m !== 'core');
    
    if (excludedModules.length > 0) {
        featureList += `### Excluded Features

The following features are NOT included in this build:

`;
        excludedModules.slice(0, 10).forEach(moduleName => {
            const moduleInfo = getModuleInfo(moduleName);
            if (moduleInfo) {
                featureList += `- ${moduleInfo.name}\n`;
            }
        });
        
        if (excludedModules.length > 10) {
            featureList += `\n*...and ${excludedModules.length - 10} more*\n`;
        }
    }
    
    return featureList;
}

/**
 * Generate size information section
 */
function generateSizeInfo(buildStats) {
    const reduction = typeof buildStats.reduction === 'string' 
        ? parseFloat(buildStats.reduction) 
        : buildStats.reduction;
    
    return `## 📊 Size Information

| Metric | Value |
|--------|-------|
| **Original Size** | ${(buildStats.originalSize / 1024).toFixed(2)} KB |
| **Custom Build Size** | ${(buildStats.customSize / 1024).toFixed(2)} KB |
| **Size Reduction** | ${reduction.toFixed(1)}% |
| **Modules Included** | ${buildStats.moduleCount} |
| **File Name** | \`${buildStats.fileName}\` |

### Bundle Size Breakdown

- **Core Features:** Always included (essential functionality)
- **Selected Features:** ${buildStats.moduleCount} modules you chose
- **Compression:** Further reduction possible with gzip/brotli

### Minification

To further reduce size, you can minify this build:

\`\`\`bash
# Using Terser
npx terser ${buildStats.fileName} -o ${buildStats.fileName.replace('.js', '.min.js')} -c -m

# Using UglifyJS
npx uglifyjs ${buildStats.fileName} -o ${buildStats.fileName.replace('.js', '.min.js')} -c -m
\`\`\``;
}

/**
 * Generate examples section
 */
function generateExamples(selectedModules) {
    let examples = `## 💡 Examples

Here are some examples specific to features in your build:

`;
    
    // Add category-specific examples
    const categories = getIncludedCategories(selectedModules);
    
    categories.slice(0, 5).forEach(category => {
        const example = getCategoryExample(category.key);
        if (example) {
            examples += `### ${category.name}\n\n${example}\n\n`;
        }
    });
    
    return examples;
}

/**
 * Generate support section
 */
function generateSupport() {
    return `## 🆘 Support

### Documentation

- [YakaJS Main Documentation](https://github.com/Yaka-UI-Labs/YakaJS)
- [Custom Builds Guide](https://github.com/Yaka-UI-Labs/YakaJS/blob/main/yakacli/CUSTOM-BUILDS.md)

### Issues

If you encounter any issues with this custom build:

1. Check that you're using features included in this build
2. Refer to the Feature List above
3. Report issues: [GitHub Issues](https://github.com/Yaka-UI-Labs/YakaJS/issues)

### Need More Features?

If you need additional features not included in this build:

\`\`\`bash
# Rebuild with more features
yakacli build

# Or use the full build
# Download from: https://github.com/Yaka-UI-Labs/YakaJS
\`\`\`

---

**Generated by YakaCLI** - Custom Build Generator for YakaJS`;
}

/**
 * Helper: Get included categories
 */
function getIncludedCategories(selectedModules) {
    const categories = [];
    
    for (const [key, category] of Object.entries(featuresMap.categories)) {
        const hasModules = category.modules.some(m => selectedModules.includes(m));
        if (hasModules) {
            categories.push({
                key,
                ...category
            });
        }
    }
    
    return categories;
}

/**
 * Helper: Get module info
 */
function getModuleInfo(moduleName) {
    for (const category of Object.values(featuresMap.categories)) {
        for (const module of category.modules) {
            if (module === moduleName) {
                const moduleData = featuresMap.modules[moduleName];
                return moduleData || { name: moduleName, lines: 'N/A', features: 'Custom module' };
            }
        }
    }
    return null;
}

/**
 * Helper: Get all module names
 */
function getAllModuleNames() {
    const modules = new Set();
    for (const category of Object.values(featuresMap.categories)) {
        category.modules.forEach(m => modules.add(m));
    }
    return Array.from(modules);
}

/**
 * Helper: Get category-specific example
 */
function getCategoryExample(categoryKey) {
    const examples = {
        animations: `\`\`\`javascript
// Fade in animation
_('#element').fadeIn(1000);

// Custom animation
_('.box').animate({
  width: '200px',
  height: '200px'
}, 500);
\`\`\``,
        
        ui: `\`\`\`javascript
// Show modal
_.modal({
  title: 'Welcome!',
  content: 'This is a custom build modal'
});

// Show notification
_.notify('Success!', 'success');
\`\`\``,
        
        forms: `\`\`\`javascript
// Validate form
_('#myForm').validate({
  email: { required: true, email: true },
  password: { required: true, minLength: 8 }
});

// Serialize form data
const data = _('#myForm').serialize();
\`\`\``,
        
        routing: `\`\`\`javascript
// Create router
const router = new _.Router();

router.on('/home', () => {
  _('#app').html('<h1>Home Page</h1>');
});

router.on('/about', () => {
  _('#app').html('<h1>About Page</h1>');
});

router.start();
\`\`\``,
        
        state: `\`\`\`javascript
// Create store
const store = new _.Store({
  state: { count: 0 },
  mutations: {
    increment(state) { state.count++; }
  }
});

store.commit('increment');
console.log(store.state.count); // 1
\`\`\``,
        
        effects: `\`\`\`javascript
// Add ripple effect
_('.button').ripple('#007bff');

// Add tilt effect
_('.card').tilt({
  maxTilt: 15,
  perspective: 1000
});
\`\`\``,
        
        media: `\`\`\`javascript
// Access webcam
_.webrtc({
  video: true,
  audio: false
}).then(stream => {
  _('#video')[0].srcObject = stream;
});

// Record screen
_.screenRecord().then(recorder => {
  recorder.start();
});
\`\`\``
    };
    
    return examples[categoryKey] || null;
}

module.exports = {
    generateDocumentation
};
