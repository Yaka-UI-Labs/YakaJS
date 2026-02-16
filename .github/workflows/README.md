# GitHub Actions Workflows

This directory contains automated workflows for the YakaJS repository.

## Available Workflows

### 🔐 GPG Auto-Sign Commits (`gpg-auto-sign.yml`)
Automatically signs commits with GPG when code is pushed to main, develop, or feature branches.

**Triggers:** Push to main/develop/feature branches, manual dispatch  
**Requires:** `GPG_PRIVATE_KEY`, `GPG_PASSPHRASE`, `GH_PAT` secrets  
**Purpose:** Ensures all commits are cryptographically signed and verified

### 🤖 Copilot GPG Auto-Sign (`copilot-gpg-sign.yml`)
Specifically designed to sign commits made by GitHub Copilot automatically.

**Triggers:** Push to copilot branches, pull requests to main/develop  
**Requires:** `GPG_PRIVATE_KEY`, `GPG_PASSPHRASE`, `GH_PAT` secrets  
**Purpose:** Signs AI-generated code changes and adds PR comments with verification details

### 🔧 Gemini Auto-Fix PR (`geminitheanalyzer.yml`)
Uses Google Gemini AI to analyze code and create PRs with automated fixes.

**Triggers:** Manual dispatch, hourly schedule  
**Requires:** `GEMINI_API_KEY`, `GH_PAT` secrets  
**Purpose:** Automated code quality improvements and fixes

## Quick Setup

### For GPG Signing (Both Workflows)

1. **Generate GPG Key:**
   ```bash
   gpg --full-generate-key
   # Choose: RSA 4096 bits, enter name/email matching GitHub
   ```

2. **Export Keys:**
   ```bash
   # Private key (for GitHub secrets)
   gpg --armor --export-secret-keys YOUR_KEY_ID
   
   # Public key (for GitHub profile)
   gpg --armor --export YOUR_KEY_ID
   ```

3. **Add to GitHub:**
   - Public key → GitHub Profile → Settings → SSH and GPG keys
   - Private key → Repository → Settings → Secrets → `GPG_PRIVATE_KEY`
   - Passphrase → Repository → Settings → Secrets → `GPG_PASSPHRASE`

4. **Create PAT:**
   - GitHub → Settings → Developer settings → Personal access tokens
   - Generate token with `repo` scope
   - Add to Repository → Settings → Secrets → `GH_PAT`

### For Gemini AI

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to Repository → Settings → Secrets → `GEMINI_API_KEY`

## Documentation

- **Full Setup Guide:** [GPG_SETUP_GUIDE.md](../GPG_SETUP_GUIDE.md)
- **Workflow Details:** [WORKFLOWS_README.md](../WORKFLOWS_README.md)

## Testing

To test GPG signing:
```bash
git checkout -b test-gpg
echo "test" > test.txt
git add test.txt
git commit -m "Test GPG signing"
git push origin test-gpg
```

Check the Actions tab to see the workflow run, then verify the commit shows "Verified" on GitHub.

## Troubleshooting

Common issues and solutions are documented in [WORKFLOWS_README.md](../WORKFLOWS_README.md#troubleshooting).

Quick checks:
- ✅ All secrets are configured in repository settings
- ✅ GPG public key is added to your GitHub profile
- ✅ Email in GPG key matches GitHub account email
- ✅ `GH_PAT` has `repo` scope permissions
