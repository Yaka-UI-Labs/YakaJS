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

## Workflows

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
