# YakaCLI

> Professional command-line tool for scaffolding YakaJS projects and generating custom builds.

[![npm version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://www.npmjs.com/package/yakacli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D12.0.0-brightgreen.svg)](https://nodejs.org/)

## ✨ Features

- 🚀 **Project Scaffolding** - Create new projects with 4 professional templates  
- 🔧 **Custom Builds** - Generate YakaJS with only the features you need  
- 📊 **Codebase Analysis** - Inspect YakaJS structure and statistics  
- ⚡ **Size Optimization** - Reduce bundle size by 50-90%

## 📦 Installation

### Quick Start

```bash
# Install globally (recommended)
npm install -g yakacli

# Or use without installing
npx yakacli help
```

### Prerequisites

- Node.js >= 12.0.0
- npm (comes with Node.js)

### Installation Methods

**1. Global Installation (Recommended)**

```bash
npm install -g yakacli
```

After installation, use `yakacli` command anywhere:

```bash
yakacli help
yakacli build
yakacli create my-project
```

**2. NPX (No Installation)**

```bash
npx yakacli help
npx yakacli create my-project
```

**3. From Source**

```bash
git clone https://github.com/Yaka-UI-Labs/YakaJS.git
cd YakaJS/yakacli
npm link
```

**4. Direct Execution**

```bash
node yakacli/yakacli.js <command>
```

> 📖 **Need help with installation?** See [INSTALLATION.md](INSTALLATION.md) for detailed guide and troubleshooting.

## 🚀 Usage

### Create a New Project

```bash
yakacli create my-awesome-app
```

This will prompt you to select a template:

**Available Templates:**

| Template | Description | Best For |
|----------|-------------|----------|
| 🌱 **basic** | Simple HTML page with YakaJS | Learning, simple websites |
| ⚡ **spa** | Single Page App with routing & state | Web applications |
| 📊 **dashboard** | Admin dashboard with charts | Analytics, admin panels |
| 📱 **pwa** | Progressive Web App (offline-capable) | Mobile-first apps |

### Generate Custom Build 🆕

Create a custom YakaJS build with only the features you need:

```bash
yakacli build
```

**Why Custom Builds?**
- ✅ Reduce bundle size by 50-90%
- ✅ Include only features you use
- ✅ Faster page loads
- ✅ Better performance

**Example Use Cases:**
- **Minimal** (18 KB) - Simple sites without webcam/media
- **Media Rich** (36 KB) - Apps WITH webcam, audio, video
- **SPA** (73 KB) - Single-page applications
- **Standard** (41 KB) - Most common features

[📖 Read the Custom Builds Guide](CUSTOM-BUILDS.md)

### Analyze Codebase

Analyze the YakaJS codebase to see statistics and features:

```bash
yakacli analyze
```

Must be run from the YakaJS repository root directory.

### Show Help

```bash
yakacli help
```

### Show Version

```bash
yakacli version
```

## Project Templates

### 1. Basic Project

A simple starter project with:
- Single HTML page
- CSS styling
- Basic YakaJS integration
- Example button interactions

**Files generated:**
```
my-project/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── README.md
```

### 2. SPA (Single Page Application)

A full-featured single-page application with:
- Client-side routing
- State management store
- Multiple components
- Dark/Light theme support
- Navigation system

**Files generated:**
```
my-project/
├── index.html
├── css/
│   ├── theme.css
│   └── components.css
└── js/
    ├── router.js
    ├── store.js
    ├── components/
    │   ├── navbar.js
    │   ├── home.js
    │   └── 404.js
    ├── app.js
    └── README.md
```

### 3. Dashboard

An admin dashboard template with:
- Sidebar navigation
- Statistics cards
- Data tables
- Responsive design
- Mock data integration

**Files generated:**
```
my-project/
├── index.html
├── css/
│   ├── dashboard.css
│   └── responsive.css
└── js/
    ├── store.js
    ├── components.js
    ├── app.js
    └── README.md
```

### 4. PWA (Progressive Web App)

A progressive web app with:
- Service Worker for offline support
- Web App Manifest
- Install prompt
- Online/Offline detection
- Caching strategy

**Files generated:**
```
my-project/
├── index.html
├── manifest.json
├── sw.js
├── css/
│   └── style.css
└── js/
    ├── app.js
    ├── offline.js
    └── README.md
```

## Features

- 🚀 **Fast scaffolding** - Create projects in seconds
- 📦 **Multiple templates** - Choose the right starting point
- 🎨 **Beautiful UI** - Modern, responsive designs
- 📊 **Codebase analysis** - Understand YakaJS structure
- 🔧 **Zero configuration** - Works out of the box
- 💡 **Best practices** - Follow YakaJS conventions

## Usage Example

```bash
# Create a new SPA project
$ yakacli create my-awesome-app

╔═══════════════════════════════════════╗
║                                       ║
║           YakaCLI v1.0.0             ║
║    YakaJS Project Scaffolding Tool   ║
║                                       ║
╚═══════════════════════════════════════╝

🚀 Creating YakaJS Project: my-awesome-app

Available Templates:

  1. Basic Project
     Simple HTML page with YakaJS

  2. SPA (Single Page App)
     Full routing and state management

  3. Dashboard
     Admin dashboard with charts and tables

  4. PWA (Progressive Web App)
     Offline-capable progressive web app

Select a template (1-4): 2

✓ Selected: SPA (Single Page App)

📁 Creating project structure...

  + css/
  + js/
  + js/components/

  + index.html
  + css/theme.css
  + css/components.css
  + js/router.js
  + js/store.js
  + js/components/navbar.js
  + js/components/home.js
  + js/components/404.js
  + js/app.js
  + README.md

✅ Project created successfully!

Next steps:
  cd my-awesome-app
  # Open index.html in your browser

💡 Tip: Use a local server for best results:
  npx http-server  (if you have Node.js)
  python -m http.server  (if you have Python)
```

## Analyze Output Example

```bash
$ yakacli analyze

╔═══════════════════════════════════════╗
║                                       ║
║           YakaCLI v1.0.0             ║
║    YakaJS Project Scaffolding Tool   ║
║                                       ║
╚═══════════════════════════════════════╝

📊 Analyzing YakaJS Codebase...

📁 File Statistics:
  Total Lines:      5,019
  Code Lines:       3,955
  Comment Lines:    342
  Functions:        2
  Methods:          108
  Arrow Functions:  256
  Classes:          2

🎯 Feature Detection:
  ✓ DOM Manipulation          (6 references)
  ✓ HTTP/AJAX                 (7 references)
  ✓ Routing                   (5 references)
  ✓ State Management          (7 references)
  ✓ Signals/Reactivity        (4 references)
  ✓ UI Components             (49 references)
  ✓ Security                  (13 references)
  ✓ Performance               (6 references)

📦 Bundle Size:
  Full Source:  176.38 KB
  Minified:     74.44 KB (57.8% smaller)

✅ Analysis complete!
```

## Requirements

- Node.js 12.0.0 or higher
- YakaJS library (loaded from CDN in generated projects)

## Development

To work on YakaCLI:

```bash
# Clone the repository
git clone https://github.com/Yaka-UI-Labs/YakaJS.git
cd YakaJS/yakacli

# Link for local development
npm link

# Test the CLI
yakacli help
yakacli analyze
```

## License

MIT License - See [LICENSE](../LICENSE) file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

- [YakaJS Documentation](https://github.com/Yaka-UI-Labs/YakaJS)
- [Report Issues](https://github.com/Yaka-UI-Labs/YakaJS/issues)
- [Feature Requests](https://github.com/Yaka-UI-Labs/YakaJS/issues/new)

---

Made with ❤️ by the YakaJS team
