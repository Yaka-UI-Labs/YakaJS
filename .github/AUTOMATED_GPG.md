# 🤖 Automated GPG Signing & Verification

This guide explains how the automated GPG signing and verification system works in YakaJS.

---

## Overview

The repository has **3 automated workflows**:

1. **GPG Verification** (`gpg-verify.yml`) - Verifies signatures on every push
2. **Auto GPG Sign** (`gpg-auto-sign.yml`) - Creates signed commits via bot
3. **Gemini Auto-Fix** (`geminitheanalyzer.yml`) - AI fixes with GPG support

---

## 1. Automatic GPG Verification ✅

### What It Does

**Triggers**: Every push to any branch, or when a PR is opened

**Process**:
1. Fetches last 10 commits
2. Imports trusted GPG keys (maintainer keys)
3. Verifies each commit's signature
4. Generates detailed report:
   - ✅ Verified commits (signed & trusted)
   - ⚠️ Signature issues (signed but not trusted)
   - ℹ️ Unsigned commits (no signature)
5. Posts report to PR (if applicable)
6. Uploads report as artifact (90-day retention)

### Example Output

```markdown
## GPG Signature Verification Report

### Commit: a1b2c3d
- **Author**: Jinuk Chanthusa
- **Date**: 2026-02-16 18:12:47 +0530
- **Message**: feat: add new feature
- **Status**: ✅ **VERIFIED**
- **Signed by**: Jinuk Chanthusa (A full stack dev student) <dill.ruzz.official@gmail.com>

### Commit: e4f5g6h
- **Author**: github-actions[bot]
- **Date**: 2026-02-16 12:00:00 +0000
- **Message**: chore: automated update
- **Status**: ℹ️ **NOT SIGNED**
- **Note**: This commit is not GPG signed (optional but recommended)

---

### Summary
- **Total Commits**: 10
- **✅ Verified**: 8
- **⚠️ Not Verified**: 2

ℹ️ **Note**: GPG signing is optional but recommended for security.
```

### Adding Your Key to Verification

To have your commits automatically verified:

1. **Generate and configure your GPG key** (see [GPG_SIGNING.md](../GPG_SIGNING.md))

2. **Export your public key**:
   ```bash
   gpg --armor --export YOUR_KEY_ID > my_key.asc
   ```

3. **Add to verification workflow**:
   - Edit `.github/workflows/gpg-verify.yml`
   - Find the "Import maintainer GPG key" section
   - Add your key after the existing keys:
   ```yaml
   # Your Key
   cat > your_key.asc << 'EOF'
   -----BEGIN PGP PUBLIC KEY BLOCK-----
   [Your exported public key here]
   -----END PGP PUBLIC KEY BLOCK-----
   EOF
   gpg --import your_key.asc
   rm your_key.asc
   ```

4. **Commit and push** - Your future commits will be verified automatically!

---

## 2. Automated Bot Signing 🤖

### What It Does

**Triggers**: Manual dispatch with custom inputs

**Use Cases**:
- Automated releases
- Scheduled updates
- Bot-generated documentation
- Dependency updates

### How to Use

#### Via GitHub UI

1. Go to **Actions** tab
2. Select **"Auto GPG Sign Commits (Bot)"**
3. Click **"Run workflow"**
4. Fill in:
   - Branch to commit to
   - Commit message
   - Files to add (or "." for all changes)
5. Click **"Run workflow"**

#### Via GitHub CLI

```bash
gh workflow run gpg-auto-sign.yml \
  -f commit_message="chore: automated update" \
  -f files_to_add="."
```

#### Via API

```bash
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/Yaka-UI-Labs/YakaJS/actions/workflows/gpg-auto-sign.yml/dispatches \
  -d '{"ref":"main","inputs":{"commit_message":"chore: update","files_to_add":"."}}'
```

### Setup for Bot Signing

#### Step 1: Generate Bot GPG Key

```bash
# Generate a dedicated bot key
gpg --full-generate-key

# Choose:
# - (1) RSA and RSA
# - 4096 bits
# - No expiration (or set expiration)

# User info:
# - Real name: yakajs-bot
# - Email: yakajs-bot[bot]@users.noreply.github.com
# - Comment: YakaJS automated commits bot
```

#### Step 2: Export Bot Key

```bash
# Get bot key ID
gpg --list-secret-keys --keyid-format=long

# Export private key
gpg --armor --export-secret-key BOT_KEY_ID > bot_private_key.asc

# Export public key
gpg --armor --export BOT_KEY_ID > bot_public_key.asc
```

#### Step 3: Add to GitHub

**Add to Secrets:**
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add `BOT_GPG_PRIVATE_KEY`:
   - Copy entire contents of `bot_private_key.asc`
   - Include BEGIN and END lines
3. Add `BOT_GPG_PASSPHRASE`:
   - Your bot key passphrase

**Add public key to GitHub account:**
1. Copy contents of `bot_public_key.asc`
2. Go to GitHub **Settings** → **SSH and GPG keys**
3. Click **New GPG key**
4. Paste public key

**Add to verification workflow:**
- Follow steps in "Adding Your Key to Verification" section above
- Use the bot's public key

#### Step 4: Test

```bash
# Run the workflow
gh workflow run gpg-auto-sign.yml \
  -f commit_message="test: bot GPG signing" \
  -f files_to_add="README.md"

# Check the workflow output
gh run list --workflow=gpg-auto-sign.yml

# Verify locally
git fetch
git log --show-signature -1 origin/main
# Should show: "Good signature from yakajs-bot"
```

---

## 3. Integration Examples

### Example 1: Daily Dependency Updates

```yaml
name: Daily Dependency Update

on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM daily

jobs:
  update-deps:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Update dependencies
        run: |
          npm update
          npm audit fix
      
      - name: Auto-commit with GPG
        uses: ./.github/workflows/gpg-auto-sign.yml
        with:
          commit_message: "chore: daily dependency update"
          files_to_add: "package.json,package-lock.json"
```

### Example 2: Automated Documentation

```yaml
name: Update Documentation

on:
  push:
    paths:
      - 'src/**/*.js'

jobs:
  update-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Generate docs
        run: npm run docs:generate
      
      - name: Commit docs
        run: |
          gh workflow run gpg-auto-sign.yml \
            -f commit_message="docs: auto-update from code changes" \
            -f files_to_add="docs/"
```

### Example 3: Release Automation

```yaml
name: Automated Release

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version number'
        required: true

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Bump version
        run: |
          npm version ${{ github.event.inputs.version }}
          npm run build
      
      - name: Commit release
        run: |
          gh workflow run gpg-auto-sign.yml \
            -f commit_message="chore: release v${{ github.event.inputs.version }}" \
            -f files_to_add="package.json,dist/"
      
      - name: Create release tag (GPG signed)
        run: |
          git tag -s v${{ github.event.inputs.version }} \
            -m "Release v${{ github.event.inputs.version }}"
          git push --tags
```

---

## Security Best Practices

### Key Management

✅ **Do:**
- Use separate keys for humans and bots
- Store bot keys only in GitHub Secrets
- Set key expiration dates (e.g., 1 year)
- Rotate keys periodically
- Use strong passphrases (20+ characters)

❌ **Don't:**
- Share bot private keys
- Commit private keys to repository
- Use human keys for bots
- Use weak passphrases
- Leave keys without expiration

### Workflow Security

✅ **Do:**
- Limit workflow permissions
- Use `secrets.` for sensitive data
- Verify signatures before deploying
- Audit bot commits regularly
- Keep trusted key list updated

❌ **Don't:**
- Echo secrets in logs
- Store secrets in environment files
- Trust unsigned commits in production
- Grant unnecessary permissions
- Import untrusted keys

---

## Monitoring & Auditing

### View Verification Reports

**Via GitHub UI:**
1. Go to **Actions** tab
2. Click on a workflow run
3. Check the "Summary" for verification report

**Via Artifacts:**
1. Go to **Actions** → **Workflow run**
2. Scroll to **Artifacts**
3. Download `gpg-verification-report`

**Via API:**
```bash
# Get latest verification report
gh run list --workflow=gpg-verify.yml --json databaseId,conclusion
gh run download RUN_ID -n gpg-verification-report
cat verification_report.md
```

### Audit Bot Commits

```bash
# List all bot commits
git log --all --author="yakajs-bot" --oneline

# Verify specific bot commit
git verify-commit COMMIT_HASH

# Show signature details
git log --show-signature --author="yakajs-bot" -1
```

---

## Troubleshooting

### Issue: "GPG: No public key"

**Cause**: The signing key's public key is not imported in the verification workflow.

**Solution**:
1. Export public key: `gpg --armor --export KEY_ID`
2. Add to `.github/workflows/gpg-verify.yml`
3. Commit and push

### Issue: "GPG: Bad signature"

**Cause**: The commit was tampered with after signing.

**Solution**:
- This is a **security alert**!
- Investigate the commit
- Contact the committer
- Consider reverting the commit

### Issue: Bot workflow doesn't sign

**Cause**: `BOT_GPG_PRIVATE_KEY` or `BOT_GPG_PASSPHRASE` not configured.

**Solution**:
1. Check secrets are set: Settings → Secrets and variables → Actions
2. Verify secret names exactly match:
   - `BOT_GPG_PRIVATE_KEY`
   - `BOT_GPG_PASSPHRASE`
3. Re-export and add keys if needed

### Issue: "gpg-preset-passphrase: not found"

**Cause**: System doesn't have GPG preset utilities.

**Solution**:
The workflow automatically handles this. If it fails:
1. Check workflow logs for exact error
2. Ensure GPG 2.1+ is installed
3. Verify `allow-preset-passphrase` in gpg-agent.conf

---

## FAQ

### Q: Do all commits need to be GPG signed?

**A:** No! GPG signing is **optional but recommended**. The verification workflow reports on signature status but doesn't fail if commits are unsigned.

### Q: Can I use my personal key for bot commits?

**A:** Not recommended. Use separate keys for:
- Security: Bot keys have different risk profile
- Auditing: Easy to distinguish automated vs manual commits
- Management: Can revoke bot key independently

### Q: How long are verification reports kept?

**A:** 90 days as workflow artifacts. You can download and archive them separately if needed.

### Q: Can I disable verification for specific branches?

**A:** Yes! Edit `.github/workflows/gpg-verify.yml`:
```yaml
on:
  push:
    branches:
      - main
      - 'release/**'
```

### Q: What if I lose my GPG key?

**A:** 
1. Revoke the old key: `gpg --gen-revoke KEY_ID`
2. Generate a new key
3. Update GitHub with new public key
4. Update workflow with new public key
5. Re-sign important commits if needed

---

## Summary

### Workflow Status Matrix

| Workflow | GPG Signing | GPG Verification | Manual/Auto |
|----------|-------------|------------------|-------------|
| `gpg-verify.yml` | ❌ No | ✅ Yes | Automatic |
| `gpg-auto-sign.yml` | ✅ Optional | ❌ No | Manual |
| `geminitheanalyzer.yml` | ✅ Optional | ❌ No | Scheduled |

### Setup Checklist

- [ ] Generate bot GPG key
- [ ] Add `BOT_GPG_PRIVATE_KEY` secret
- [ ] Add `BOT_GPG_PASSPHRASE` secret
- [ ] Add bot public key to GitHub account
- [ ] Add bot public key to verification workflow
- [ ] Test bot signing workflow
- [ ] Verify signatures show up on GitHub

---

**Maintained by**: [@dill-lk](https://github.com/dill-lk)  
**Repository**: [Yaka-UI-Labs/YakaJS](https://github.com/Yaka-UI-Labs/YakaJS)  
**Related Docs**: [GPG_SIGNING.md](../GPG_SIGNING.md), [WORKFLOWS_README.md](WORKFLOWS_README.md)
