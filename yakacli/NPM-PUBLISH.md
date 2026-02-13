# Publishing YakaCLI to npm

## Status

🚧 **Work in Progress** - YakaCLI is not yet published to npm registry.

## Current Installation Methods

While the package is not on npm, you can use it via:

### Method 1: From Source (Recommended for now)

```bash
# Clone the repository
git clone https://github.com/Yaka-UI-Labs/YakaJS.git
cd YakaJS/yakacli

# Link globally
npm link

# Now you can use yakacli anywhere
yakacli help
```

### Method 2: Direct Execution

```bash
# Clone the repository
git clone https://github.com/Yaka-UI-Labs/YakaJS.git
cd YakaJS

# Run directly
node yakacli/yakacli.js help
```

## Publishing Checklist

Before publishing to npm, complete these steps:

### 1. Pre-publish Preparation

- [ ] Update version in package.json
- [ ] Ensure README.md is complete
- [ ] Add .npmignore file
- [ ] Test installation locally
- [ ] Test all commands
- [ ] Run security audit

### 2. npm Account Setup

```bash
# Create npm account (if not exists)
npm adduser

# Or login to existing account
npm login
```

### 3. Package Validation

```bash
# Validate package.json
npm pack --dry-run

# Check what will be published
npm publish --dry-run
```

### 4. Publishing Steps

```bash
# Navigate to yakacli directory
cd yakacli

# Publish to npm
npm publish

# Or for scoped package
npm publish --access public
```

### 5. Post-publish Verification

```bash
# Check npm page
npm view yakacli

# Test installation
npm install -g yakacli
yakacli help
```

## .npmignore File

Create `.npmignore` to exclude unnecessary files:

```
# Test files
test/
tests/
*.test.js

# Build artifacts
*.log
.DS_Store

# Documentation (optional)
docs/
*.md
!README.md

# Git
.git/
.gitignore
```

## Package.json Updates

Ensure package.json has:

```json
{
  "name": "yakacli",
  "version": "1.0.0",
  "description": "Professional command-line tool for scaffolding YakaJS projects",
  "main": "yakacli.js",
  "bin": {
    "yakacli": "./bin/yakacli"
  },
  "keywords": [
    "yakajs",
    "cli",
    "scaffolding",
    "generator",
    "templates",
    "build-tool"
  ],
  "author": "Yaka-UI-Labs",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/Yaka-UI-Labs/YakaJS"
  },
  "bugs": {
    "url": "https://github.com/Yaka-UI-Labs/YakaJS/issues"
  },
  "homepage": "https://github.com/Yaka-UI-Labs/YakaJS#readme",
  "engines": {
    "node": ">=12.0.0"
  }
}
```

## Version Management

Follow semantic versioning:

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (1.1.0): New features, backward compatible
- **PATCH** (1.0.1): Bug fixes

```bash
# Update version
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# Then publish
npm publish
```

## Scoped Package (Optional)

If publishing as scoped package:

```json
{
  "name": "@yaka-ui-labs/yakacli"
}
```

```bash
npm publish --access public
```

## Unpublishing (If Needed)

```bash
# Unpublish specific version (within 72 hours)
npm unpublish yakacli@1.0.0

# Deprecate instead (preferred)
npm deprecate yakacli@1.0.0 "Use version 1.0.1 instead"
```

## Continuous Deployment

For automated publishing via GitHub Actions:

```yaml
# .github/workflows/publish.yml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: cd yakacli && npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## Security

```bash
# Run security audit before publishing
npm audit

# Fix vulnerabilities
npm audit fix
```

## Testing Before Publish

```bash
# Local installation test
cd yakacli
npm pack
npm install -g yakacli-1.0.0.tgz

# Test commands
yakacli help
yakacli version
```

## Post-Publish Tasks

1. Update GitHub README with npm install instructions
2. Create GitHub release with changelog
3. Update documentation
4. Announce on social media/forums
5. Monitor GitHub issues for problems

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm CLI Documentation](https://docs.npmjs.com/cli/)

---

**Note:** Once published to npm, update INSTALLATION.md to reflect that the package is available.
