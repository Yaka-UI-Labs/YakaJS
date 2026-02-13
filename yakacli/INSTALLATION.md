# YakaCLI Installation Guide

Complete guide for installing and using YakaCLI.

> 📢 **Important Note:** YakaCLI is currently in development and not yet published to npm.  
> Use the "From Source" method below for installation.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Current Installation Method](#current-installation-method)
- [Future Installation Methods](#future-installation-methods)
- [Verification](#verification)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Uninstallation](#uninstallation)

## Prerequisites

Before installing YakaCLI, ensure you have:

- **Node.js** version 12.0.0 or higher
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

Check your versions:

```bash
node --version
npm --version
git --version
```

If you need to install Node.js, visit [nodejs.org](https://nodejs.org/)

## Current Installation Method

### From Source (Recommended for Now)

Since YakaCLI is not yet on npm, install from the GitHub repository:

**Step 1: Clone the repository**

```bash
git clone https://github.com/Yaka-UI-Labs/YakaJS.git
cd YakaJS/yakacli
```

**Step 2: Link globally**

```bash
npm link
```

This creates a global symlink to the package.

**Step 3: Verify installation**

```bash
yakacli help
```

You should see the YakaCLI banner and help information!

### Alternative: Direct Execution

If you don't want to link globally:

```bash
# Clone repository (if not already)
git clone https://github.com/Yaka-UI-Labs/YakaJS.git
cd YakaJS

# Run directly
node yakacli/yakacli.js help
node yakacli/yakacli.js build
node yakacli/yakacli.js create my-project
```

## Future Installation Methods

### Method 1: Global Installation

> ⏳ **Coming Soon** - This method will be available once YakaCLI is published to npm.

Install YakaCLI globally to use it from anywhere on your system:

```bash
npm install -g yakacli
```

**Advantages:**
- ✅ Available system-wide
- ✅ Use `yakacli` command directly
- ✅ No need to specify paths

**Usage after installation:**
```bash
yakacli help
yakacli build
yakacli create my-project
```

### Method 2: NPX

> ⏳ **Coming Soon** - This method will be available once YakaCLI is published to npm.

Use YakaCLI without installing it:

```bash
npx yakacli help
npx yakacli build
npx yakacli create my-project
```

**Advantages:**
- ✅ No installation needed
- ✅ Always uses latest version
- ✅ No system pollution

### Method 3: Local Installation in Project

> ⏳ **Coming Soon** - This method will be available once YakaCLI is published to npm.

Install YakaCLI as a dev dependency in your project:

```bash
# In your project directory
npm install --save-dev yakacli
```

**Usage:**
```bash
# Via npm scripts in package.json
npm run yakacli

# Or via npx
npx yakacli help
```

For contributing or testing:

```bash
# Clone the repository
git clone https://github.com/Yaka-UI-Labs/YakaJS.git
cd YakaJS/yakacli

# Link globally
npm link

# Or run directly
node yakacli.js help
```

## Verification

After installation, verify YakaCLI is working:

```bash
# Check version
yakacli version

# Show help
yakacli help
```

You should see the YakaCLI banner and help information.

## Usage

### Create a New Project

```bash
# Interactive prompt
yakacli create my-awesome-app

# Available templates:
# - basic: Simple HTML page
# - spa: Single Page App with routing
# - dashboard: Admin dashboard
# - pwa: Progressive Web App
```

### Generate Custom Build

```bash
# Navigate to YakaJS repository
cd YakaJS

# Run build command
yakacli build

# Choose from:
# 1. Quick Build - Use preset (recommended)
# 2. Custom Build - Select categories
# 3. View Features - Browse modules
```

### Analyze Codebase

```bash
# Navigate to YakaJS repository
cd YakaJS

# Run analysis
yakacli analyze
```

## Troubleshooting

### Issue: "yakacli: command not found"

**Solution 1: Check npm global bin path**

```bash
npm config get prefix
```

Add this path to your PATH environment variable.

For Linux/Mac:
```bash
export PATH="$(npm config get prefix)/bin:$PATH"
```

For Windows:
```cmd
set PATH=%APPDATA%\npm;%PATH%
```

**Solution 2: Use full path**

```bash
$(npm config get prefix)/bin/yakacli help
```

**Solution 3: Use npx instead**

```bash
npx yakacli help
```

### Issue: "Permission denied" (EACCES)

**On Linux/Mac:**

```bash
# Option 1: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Then reinstall
npm install -g yakacli

# Option 2: Use sudo (not recommended)
sudo npm install -g yakacli
```

**On Windows:**

Run Command Prompt or PowerShell as Administrator, then:

```cmd
npm install -g yakacli
```

### Issue: "Cannot find module"

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm uninstall -g yakacli
npm install -g yakacli
```

### Issue: "Node version too old"

YakaCLI requires Node.js 12.0.0 or higher.

**Solution:**

Update Node.js from [nodejs.org](https://nodejs.org/)

Or use nvm (Node Version Manager):

```bash
# Install nvm (Linux/Mac)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install latest Node.js
nvm install node
nvm use node
```

### Issue: npm is slow or timing out

**Solution:**

```bash
# Try different npm registry
npm config set registry https://registry.npmjs.org/

# Or use a mirror (China)
npm config set registry https://registry.npmmirror.com
```

### Issue: Package not found on npm

**Note:** If yakacli is not yet published to npm, you can:

1. **Use from source:**
   ```bash
   git clone https://github.com/Yaka-UI-Labs/YakaJS.git
   cd YakaJS/yakacli
   npm link
   ```

2. **Wait for official release:**
   The package will be published to npm soon.

3. **Use npx with GitHub:**
   ```bash
   npx github:Yaka-UI-Labs/YakaJS#main
   ```

## Uninstallation

### Remove Global Installation

```bash
npm uninstall -g yakacli
```

### Remove from Project

```bash
npm uninstall yakacli
```

### Unlink (if linked from source)

```bash
cd YakaJS/yakacli
npm unlink
```

## Environment-Specific Notes

### Windows

- Use Command Prompt or PowerShell as Administrator for global installs
- Path separators are backslashes (`\`) instead of forward slashes (`/`)
- May need to adjust execution policy for scripts:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

### Linux/Mac

- May need to use `sudo` for global installs (not recommended)
- Better: Configure npm to install packages in your home directory (see Permission denied section)
- Use bash/zsh for best terminal experience

### Docker/Container

```dockerfile
FROM node:18-alpine
RUN npm install -g yakacli
```

## Getting Help

If you encounter any issues:

1. **Check version compatibility:**
   ```bash
   node --version  # Should be >= 12.0.0
   npm --version
   ```

2. **Check GitHub Issues:**
   https://github.com/Yaka-UI-Labs/YakaJS/issues

3. **Ask for help:**
   - Create a new issue on GitHub
   - Include your Node.js and npm versions
   - Include the exact error message
   - Include your operating system

## Next Steps

After installation:

1. ✅ Run `yakacli help` to see all commands
2. ✅ Try `yakacli create my-first-project` to scaffold a project
3. ✅ Explore custom builds with `yakacli build`
4. ✅ Read the [README.md](README.md) for more information
5. ✅ Check [CUSTOM-BUILDS.md](CUSTOM-BUILDS.md) for build options

---

**Happy Coding! 🚀**

For more information, visit: https://github.com/Yaka-UI-Labs/YakaJS
