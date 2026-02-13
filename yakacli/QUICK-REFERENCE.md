# YakaCLI Quick Reference Card

## 🚀 Installation (Current Method)

**YakaCLI is not yet on npm. Use this method:**

```bash
# Clone repository
git clone https://github.com/Yaka-UI-Labs/YakaJS.git

# Navigate to yakacli
cd YakaJS/yakacli

# Link globally
npm link

# Verify installation
yakacli help
```

## 📦 After Installation

### Create a Project
```bash
yakacli create my-project
```

Choose from 4 templates:
- 🌱 **basic** - Simple HTML page
- ⚡ **spa** - Single Page App
- 📊 **dashboard** - Admin panel
- 📱 **pwa** - Progressive Web App

### Generate Custom Build
```bash
# Navigate to YakaJS repo
cd /path/to/YakaJS

# Run build command
yakacli build
```

Choose from 3 options:
1. **Quick Build** ⭐ - Use preset (recommended)
2. **Custom Build** - Select categories
3. **View Features** - Browse modules

### Analyze Codebase
```bash
# Navigate to YakaJS repo
cd /path/to/YakaJS

# Run analysis
yakacli analyze
```

## 🔧 Troubleshooting

### "yakacli: command not found"

**Solution 1: Check npm path**
```bash
npm config get prefix
export PATH="$(npm config get prefix)/bin:$PATH"
```

**Solution 2: Use npx**
```bash
npx yakacli help
```

**Solution 3: Run directly**
```bash
node /path/to/YakaJS/yakacli/yakacli.js help
```

### Permission Denied (Linux/Mac)

```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Reinstall
npm link
```

### Module Not Found

```bash
# Clear npm cache
npm cache clean --force

# Relink
cd YakaJS/yakacli
npm link
```

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Main documentation |
| [INSTALLATION.md](INSTALLATION.md) | Detailed installation guide |
| [CUSTOM-BUILDS.md](CUSTOM-BUILDS.md) | Build customization |
| [QUICKSTART.md](QUICKSTART.md) | Quick start guide |
| [NPM-PUBLISH.md](NPM-PUBLISH.md) | Publishing guide |

## ❓ FAQ

**Q: Why can't I use `npm install -g yakacli`?**
A: Package not yet published to npm. Use source installation (see above).

**Q: When will it be on npm?**
A: Soon! See NPM-PUBLISH.md for publishing roadmap.

**Q: Can I use it without npm link?**
A: Yes! Run directly: `node yakacli/yakacli.js <command>`

**Q: Do I need to be in YakaJS repo to use it?**
A: Only for `build` and `analyze` commands. `create` works anywhere.

## 🎯 Quick Commands

```bash
# Show help
yakacli help

# Show version
yakacli version

# Create project (interactive)
yakacli create my-app

# Build custom YakaJS (from YakaJS repo)
cd YakaJS && yakacli build

# Analyze codebase (from YakaJS repo)
cd YakaJS && yakacli analyze
```

## 🔗 Links

- **Repository:** https://github.com/Yaka-UI-Labs/YakaJS
- **Issues:** https://github.com/Yaka-UI-Labs/YakaJS/issues
- **Documentation:** See README.md in yakacli folder

## 💡 Tips

1. Run `yakacli help` first to see all options
2. Read INSTALLATION.md for detailed setup
3. Use `yakacli build` to create optimized builds
4. Check CUSTOM-BUILDS.md for build examples
5. Report issues on GitHub

---

**Need more help?** Read [INSTALLATION.md](INSTALLATION.md) for comprehensive guide.
