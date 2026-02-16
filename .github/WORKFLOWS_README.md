# GitHub Workflows Configuration

This directory contains automated workflows for the YakaJS repository.

## Required Secrets

To run the workflows successfully, you need to configure the following GitHub Secrets:

### 1. GPG_PRIVATE_KEY

**Purpose**: GPG private key for automatically signing commits in the GPG Auto-Sign workflow.

**How to set it up**:
1. Generate a GPG key if you don't have one:
   ```bash
   gpg --full-generate-key
   # Choose: RSA and RSA, 4096 bits, key doesn't expire (or set expiration)
   # Enter your name and email (should match your GitHub account)
   # Enter a passphrase
   ```

2. Export your GPG private key:
   ```bash
   gpg --list-secret-keys --keyid-format=long
   # Find your key ID (e.g., 842616E01EFEAD62F2277C66EF13362EBFF67089)
   
   gpg --armor --export-secret-keys YOUR_KEY_ID
   # Copy the entire output including -----BEGIN PGP PRIVATE KEY BLOCK-----
   ```

3. Add it to repository secrets:
   - Go to your repository → **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `GPG_PRIVATE_KEY`
   - Value: Your entire GPG private key (including BEGIN/END lines)
   - Click **Add secret**

### 2. GPG_PASSPHRASE

**Purpose**: Passphrase for the GPG private key used in auto-signing.

**How to set it up**:
1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `GPG_PASSPHRASE`
4. Value: The passphrase you used when creating your GPG key
5. Click **Add secret**

**Note**: If your GPG key doesn't have a passphrase, you can leave this empty.

### 3. GEMINI_API_KEY

**Purpose**: Authentication for Google Gemini API used by the Gemini Auto-Fix workflow.

**How to set it up**:
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GEMINI_API_KEY`
5. Value: Your Google Gemini API key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))
6. Click **Add secret**

### 4. GH_PAT (Optional - Only for Gemini workflow)

**Purpose**: GitHub Personal Access Token for creating pull requests automatically in the Gemini Auto-Fix workflow.

**Note**: The GPG auto-signing workflows use the built-in `GITHUB_TOKEN` and do **NOT** require this secret. Only configure this if you're using the Gemini Auto-Fix workflow.

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

## Workflows

### GPG Auto-Sign Commits

**File**: `gpg-auto-sign.yml`

**Purpose**: Automatically signs commits with GPG signatures when code is pushed to the repository, ensuring commit authenticity and verification.

**Trigger**:
- Automatic: On push to `main`, `develop`, or `feature/**` branches
- Manual: Via workflow_dispatch

**Requirements**:
- `GPG_PRIVATE_KEY` secret must be configured
- `GPG_PASSPHRASE` secret must be configured (if key has passphrase)
- No additional secrets needed (uses built-in `GITHUB_TOKEN`)

**What it does**:
1. Checks out the repository with full history
2. Imports your GPG private key from secrets
3. Configures Git to use GPG signing
4. Checks if the last commit is already signed
5. Re-signs the last commit if not signed or signature is invalid
6. Force pushes the signed commit back to the branch
7. Verifies the GPG signature
8. Provides a summary of the signing status

**Benefits**:
- ✅ All commits are cryptographically signed
- ✅ Commit authenticity can be verified
- ✅ Shows "Verified" badge on GitHub commits
- ✅ Meets security compliance requirements
- ✅ Automatic - no manual signing needed

**Setup Instructions**:
1. Generate a GPG key pair (see GPG_PRIVATE_KEY instructions above)
2. Add your public key to GitHub:
   - Go to GitHub → **Settings** → **SSH and GPG keys**
   - Click **New GPG key**
   - Paste your public key: `gpg --armor --export YOUR_KEY_ID`
3. Configure the required secrets in repository settings
4. The workflow will automatically sign commits on every push

### Copilot GPG Auto-Sign

**File**: `copilot-gpg-sign.yml`

**Purpose**: Specifically designed to automatically sign commits made by GitHub Copilot with GPG signatures, ensuring all AI-generated code changes are cryptographically verified.

**Trigger**:
- Automatic: On push to `copilot/**` branches
- Automatic: On pull requests to `main` or `develop` branches
- Condition: Only runs when the commit author is a GitHub bot or Copilot

**Requirements**:
- `GPG_PRIVATE_KEY` secret must be configured
- `GPG_PASSPHRASE` secret must be configured (if key has passphrase)
- No additional secrets needed (uses built-in `GITHUB_TOKEN`)

**What it does**:
1. Detects commits made by GitHub Copilot or GitHub Actions bots
2. Checks out the repository with full history
3. Imports your GPG private key from secrets
4. Configures Git to use GPG signing
5. Counts how many unsigned commits exist in the branch
6. Re-signs all unsigned commits while preserving original author info
7. Verifies all GPG signatures
8. Force pushes the signed commits back to the branch
9. Adds a comment to the PR with signing summary (if applicable)

**Benefits**:
- ✅ Automatically signs all Copilot-generated commits
- ✅ Preserves original commit author and timestamp
- ✅ Handles multiple unsigned commits in a single run
- ✅ Adds PR comments with signature verification details
- ✅ Works seamlessly with Copilot workflows
- ✅ No manual intervention required

**Setup Instructions**:
1. Follow the same GPG key setup as the main GPG Auto-Sign workflow
2. The workflow automatically detects Copilot commits
3. Works with both Copilot branches and pull requests
4. Integrates with the GitHub Copilot code review process

### Gemini Auto-Fix PR (Hardcore)

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

## Troubleshooting

### GPG Auto-Sign Workflow Issues

#### Error: "gpg: signing failed: No secret key"

This error means the GPG private key is not configured correctly.

**Solution**:
1. Verify the `GPG_PRIVATE_KEY` secret is set in repository settings
2. Make sure you exported the **private** key, not the public key
3. Include the entire key including `-----BEGIN PGP PRIVATE KEY BLOCK-----` and `-----END PGP PRIVATE KEY BLOCK-----`
4. Regenerate and re-export the key if necessary

#### Error: "gpg: signing failed: Bad passphrase"

This error means the passphrase is incorrect or doesn't match the key.

**Solution**:
1. Verify the `GPG_PASSPHRASE` secret matches the passphrase used when creating the key
2. If your key doesn't have a passphrase, you may need to create a new key with one
3. Test the passphrase locally: `echo "test" | gpg --sign --armor --local-user YOUR_KEY_ID`

#### Commits show "Unverified" on GitHub

This means GitHub doesn't recognize your GPG key.

**Solution**:
1. Add your GPG public key to GitHub:
   - Run: `gpg --armor --export YOUR_KEY_ID`
   - Go to GitHub → **Settings** → **SSH and GPG keys** → **New GPG key**
   - Paste the public key
2. Make sure the email in your GPG key matches your GitHub email
3. Verify the key is listed in your GitHub settings

#### Force push fails

This means there are conflicts or the branch is protected.

**Solution**:
1. Verify the `GH_PAT` secret has the `repo` scope
2. Check if branch protection rules allow force pushes
3. Consider temporarily disabling "Require signed commits" during setup

### Gemini Workflow Issues

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
