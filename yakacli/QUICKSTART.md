# YakaCLI Quick Start Guide

## What is YakaCLI?

YakaCLI is a command-line tool that helps you quickly create new YakaJS projects with pre-configured templates. It's perfect for:

- 🚀 Starting new projects quickly
- 📦 Learning YakaJS best practices
- 🎨 Getting production-ready templates
- 🔧 Scaffolding different types of applications

## Installation

### Option 1: Run from YakaJS Repository

```bash
# Clone the repository
git clone https://github.com/Yaka-UI-Labs/YakaJS.git
cd YakaJS

# Run the CLI
node yakacli/yakacli.js <command>
```

### Option 2: Link Globally (Development)

```bash
cd YakaJS/yakacli
npm link
yakacli <command>
```

### Option 3: Global Install (When Published)

```bash
npm install -g yakacli
yakacli <command>
```

## Quick Start

### Create Your First Project

```bash
# Run the create command
yakacli create my-first-app

# Select a template (1-4)
# Follow the prompts
```

### Analyze YakaJS Codebase

```bash
# Must be run from YakaJS repository root
cd YakaJS
yakacli analyze
```

## Available Templates

### 1. Basic Project 🎯

Perfect for beginners and simple projects.

**Includes:**
- Single HTML page
- Basic CSS styling
- Interactive button demo
- YakaJS CDN integration

**Use when:**
- Learning YakaJS
- Building simple landing pages
- Creating prototypes

### 2. SPA (Single Page App) 🌐

Full-featured single-page application.

**Includes:**
- Client-side routing
- State management
- Multiple components
- Dark/Light theme
- Navigation system

**Use when:**
- Building web applications
- Need routing and state management
- Want component architecture

### 3. Dashboard 📊

Admin dashboard template.

**Includes:**
- Sidebar navigation
- Statistics cards
- Data tables
- Responsive design
- Mock data integration

**Use when:**
- Building admin panels
- Creating data dashboards
- Need analytics displays

### 4. PWA (Progressive Web App) 📱

Offline-capable progressive web app.

**Includes:**
- Service Worker
- Web App Manifest
- Install prompt
- Offline support
- Caching strategy

**Use when:**
- Building mobile-first apps
- Need offline functionality
- Want installable apps

## Commands Reference

### create

Create a new YakaJS project.

```bash
yakacli create <project-name>
```

**Example:**
```bash
yakacli create my-awesome-app
```

### analyze

Analyze the YakaJS codebase and show statistics.

```bash
yakacli analyze
```

**Output:**
- Total lines of code
- Feature detection
- Bundle size information
- File statistics

### help

Show help information.

```bash
yakacli help
```

### version

Show version number.

```bash
yakacli version
```

## After Creating a Project

### Running Your Project

**Option 1: Direct File Opening**
```bash
cd my-project
# Open index.html in your browser
```

**Option 2: HTTP Server (Recommended)**
```bash
cd my-project

# Using Node.js
npx http-server

# Using Python 3
python -m http.server

# Using Python 2
python -m SimpleHTTPServer
```

### Project Structure

Each template creates a well-organized structure:

```
my-project/
├── index.html       # Main HTML file
├── css/             # Stylesheets
│   └── style.css
├── js/              # JavaScript files
│   └── app.js
└── README.md        # Project documentation
```

## Tips & Best Practices

### Development Tips

1. **Use a Local Server**
   - Better for testing AJAX/fetch requests
   - Proper MIME types
   - Service Workers (PWA) require HTTPS or localhost

2. **Enable Debug Mode**
   ```javascript
   _.debug = true;  // Already included in templates
   ```

3. **Use Browser DevTools**
   - Check console for YakaJS debug messages
   - Inspect network requests
   - Monitor performance

### Customization

After generating a project:

1. **Update Project Name**
   - Edit index.html title
   - Update README.md

2. **Modify Styles**
   - Edit CSS files in css/ directory
   - Customize colors and layouts

3. **Add Features**
   - Use YakaJS features from the documentation
   - Add new components
   - Extend functionality

## Common Issues

### "yaka.js not found" when running analyze

**Solution:** Run the analyze command from the YakaJS repository root directory.

```bash
cd /path/to/YakaJS
yakacli analyze
```

### Project already exists

**Solution:** Choose a different project name or remove the existing directory.

```bash
rm -rf existing-project
yakacli create existing-project
```

### Service Worker not working (PWA)

**Solution:** PWAs require HTTPS or localhost. Use a local development server.

```bash
npx http-server
# Then open http://localhost:8080
```

## Next Steps

After creating your project:

1. ✅ Open the project in your editor
2. ✅ Read the project's README.md
3. ✅ Explore the generated files
4. ✅ Start customizing for your needs
5. ✅ Check [YakaJS documentation](https://github.com/Yaka-UI-Labs/YakaJS) for API reference

## Learning Resources

- [YakaJS Main Documentation](../README.md)
- [YakaCLI Documentation](README.md)
- [GitHub Repository](https://github.com/Yaka-UI-Labs/YakaJS)

## Support

Need help? Here's how to get support:

- 📖 Read the documentation
- 💬 [Open an issue](https://github.com/Yaka-UI-Labs/YakaJS/issues)
- 🐛 Report bugs
- 💡 Request features

---

Happy coding with YakaJS! 🚀
