# GitHub Workflows Configuration

This directory contains automated workflows for the YakaJS repository.

## Required Secrets

To run the workflows successfully, you need to configure the following GitHub Secrets:

### 1. GEMINI_API_KEY

**Purpose**: Authentication for Google Gemini API used by the Gemini Auto-Fix workflow.

**How to set it up**:
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GEMINI_API_KEY`
5. Value: Your Google Gemini API key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))
6. Click **Add secret**

### 2. GH_PAT

**Purpose**: GitHub Personal Access Token for creating pull requests automatically.

**How to set it up**:
1. Generate a Personal Access Token:
   - Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
   - Click **Generate new token (classic)**
   - Give it a descriptive name (e.g., "YakaJS Auto-Fix Workflow")
   - Select scopes: `repo` (Full control of private repositories)
   - Click **Generate token** and copy the token
2. Add it to repository secrets:
   - Go to your repository → **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `GH_PAT`
   - Value: Your GitHub Personal Access Token
   - Click **Add secret**

### 3. GPG_PRIVATE_KEY (Optional) 🔐

**Purpose**: GPG private key for signing commits automatically in workflows.

**How to set it up**:
1. Generate or export your GPG key:
   ```bash
   # Generate new key (if needed)
   gpg --full-generate-key
   
   # Export private key
   gpg --armor --export-secret-key YOUR_KEY_ID
   ```
2. Add it to repository secrets:
   - Go to your repository → **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `GPG_PRIVATE_KEY`
   - Value: Your entire GPG private key (including BEGIN and END lines)
   - Click **Add secret**

### 4. GPG_PASSPHRASE (Optional) 🔐

**Purpose**: Passphrase for the GPG private key.

**How to set it up**:
1. Add it to repository secrets:
   - Go to your repository → **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `GPG_PASSPHRASE`
   - Value: Your GPG key passphrase
   - Click **Add secret**

**Note**: GPG signing is optional but recommended. If `GPG_PRIVATE_KEY` and `GPG_PASSPHRASE` are not configured, commits will be made without GPG signatures. See [GPG_SIGNING.md](../GPG_SIGNING.md) for more details.

### 5. BOT_GPG_PRIVATE_KEY (Optional) 🤖🔐

**Purpose**: GPG private key specifically for bot/automated commits (separate from human commits).

**Why separate keys?**
- Security: Bot keys have different permissions
- Auditing: Easy to distinguish bot commits from human commits
- Management: Can revoke bot key without affecting human signatures

**How to set it up**:
1. Generate a dedicated bot GPG key:
   ```bash
   gpg --full-generate-key
   # Name: yakajs-bot
   # Email: yakajs-bot[bot]@users.noreply.github.com
   ```
2. Export the private key:
   ```bash
   gpg --armor --export-secret-key BOT_KEY_ID
   ```
3. Add to repository secrets:
   - Name: `BOT_GPG_PRIVATE_KEY`
   - Value: Entire private key output

### 6. BOT_GPG_PASSPHRASE (Optional) 🤖🔐

**Purpose**: Passphrase for the bot's GPG key.

**How to set it up**:
1. Add to repository secrets:
   - Name: `BOT_GPG_PASSPHRASE`
   - Value: Bot GPG key passphrase

**Note**: The bot workflows (`gpg-auto-sign.yml`) will work without these secrets but commits won't be GPG signed.

## Workflows

### 1. Gemini Auto-Fix PR (Hardcore)

**File**: `geminitheanalyzer.yml`

**Purpose**: Automatically analyzes the YakaJS library using Google Gemini AI and creates pull requests with suggested fixes and improvements.

**Trigger**:
- Manual: Via workflow_dispatch
- Scheduled: Every hour (cron: "0 * * * *")

**Requirements**:
- `GEMINI_API_KEY` secret must be configured
- `GH_PAT` secret must be configured

**What it does**:
1. Checks out the repository
2. Installs Gemini CLI
3. Runs Gemini AI analysis with auto-approval mode
4. Commits any changes to a new branch `gemini-auto-fixes`
5. Creates a pull request with the fixes

### 2. Auto GPG Sign and Verify 🔐

**File**: `gpg-verify.yml`

**Purpose**: Automatically verifies GPG signatures on commits when code is pushed or PRs are opened.

**Trigger**:
- On push to any branch
- On pull request to main/master

**What it does**:
1. Fetches last 10 commits
2. Imports trusted GPG keys (maintainer keys)
3. Verifies each commit's GPG signature
4. Generates verification report with:
   - ✅ Verified commits
   - ⚠️ Unverified/unsigned commits
   - Summary statistics
5. Posts report as PR comment (if applicable)
6. Uploads report as artifact

**No secrets required** - This workflow only verifies existing signatures.

### 3. Auto GPG Sign Commits (Bot) 🤖

**File**: `gpg-auto-sign.yml`

**Purpose**: Creates GPG-signed commits automatically via bot account.

**Trigger**:
- Manual: Via workflow_dispatch with custom inputs

**Inputs**:
- `commit_message`: Message for the commit
- `files_to_add`: Files to stage (comma-separated or "." for all)

**Requirements** (Optional):
- `BOT_GPG_PRIVATE_KEY` secret (for signing)
- `BOT_GPG_PASSPHRASE` secret (for signing)
- `GH_PAT` secret (for pushing)

**What it does**:
1. Imports bot's GPG key (if configured)
2. Configures Git with bot identity
3. Stages specified files
4. Creates GPG-signed commit (if keys available)
5. Pushes to current branch
6. Verifies the signature

**Note**: Works with or without GPG - if keys not configured, creates regular commits.

## Troubleshooting

### Error: "Please set an Auth method... GEMINI_API_KEY"

This error means the `GEMINI_API_KEY` secret is not configured or is invalid.

**Solution**:
1. Verify the secret is set in repository settings
2. Make sure the API key is valid and not expired
3. Check that you're using a valid Google Gemini API key

### Pull Request creation fails

This usually means the `GH_PAT` secret is not configured or lacks proper permissions.

**Solution**:
1. Verify the secret is set in repository settings
2. Make sure the token has `repo` scope permissions
3. Generate a new token if the old one expired

### Commits are not GPG signed

This means the `GPG_PRIVATE_KEY` or `GPG_PASSPHRASE` secrets are not configured.

**Solution**:
1. This is optional - commits will work without GPG signing
2. To enable GPG signing, configure both `GPG_PRIVATE_KEY` and `GPG_PASSPHRASE` secrets
3. For bot commits, configure `BOT_GPG_PRIVATE_KEY` and `BOT_GPG_PASSPHRASE`
4. See [GPG_SIGNING.md](../GPG_SIGNING.md) for detailed instructions
5. Verify your GPG key is properly formatted when adding to secrets

### GPG verification workflow fails

The verification workflow imports trusted keys and checks signatures.

**Common issues**:
1. **Unverified commits**: Normal - GPG signing is optional
2. **Signature verification fails**: Check if the public key is imported in the workflow
3. **Key not trusted**: Add the public key to `gpg-verify.yml` workflow

**To add a new trusted key**:
1. Export your public key: `gpg --armor --export YOUR_KEY_ID`
2. Add it to `.github/workflows/gpg-verify.yml` in the "Import maintainer GPG key" step
3. Commit and push the changes
