# Example: Minimal GPG Auto-Sign Configuration

This file shows the minimal setup required to enable GPG auto-signing in your repository.

## Required GitHub Secrets

Add these secrets to your repository: **Settings → Secrets and variables → Actions**

### GPG_PRIVATE_KEY
```
-----BEGIN PGP PRIVATE KEY BLOCK-----

[Your full GPG private key content here]

-----END PGP PRIVATE KEY BLOCK-----
```

**How to get it:**
```bash
gpg --armor --export-secret-keys YOUR_KEY_ID
```

### GPG_PASSPHRASE
```
your-secure-passphrase-here
```

**Note:** This is the passphrase you set when creating your GPG key.

### GH_PAT
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**How to create:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Copy and add to secrets

## Required GitHub Profile Setup

Add your GPG public key to your GitHub profile:

**GitHub → Settings → SSH and GPG keys → New GPG key**

**How to get public key:**
```bash
gpg --armor --export YOUR_KEY_ID
```

Output example:
```
-----BEGIN PGP PUBLIC KEY BLOCK-----

mQINBGXxxx...
[Your public key content]
...xxx=
-----END PGP PUBLIC KEY BLOCK-----
```

## Verify Setup

After configuring secrets, test with:

```bash
# Create test branch
git checkout -b test-gpg-setup

# Make a test commit
echo "Testing GPG signing" > test-gpg.txt
git add test-gpg.txt
git commit -m "Test: GPG auto-sign setup"

# Push to trigger workflow
git push origin test-gpg-setup
```

Then check:
1. Go to **Actions** tab → Should see workflow running
2. After completion, view commit on GitHub → Should show "Verified" badge
3. Verify locally: `git verify-commit HEAD`

## What the Workflows Do

### gpg-auto-sign.yml
- Triggers on push to main, develop, feature branches
- Checks if last commit is signed
- Re-signs if not signed
- Pushes signed commit back

### copilot-gpg-sign.yml
- Triggers on copilot branches and PRs
- Detects Copilot/bot commits
- Signs all unsigned commits
- Adds PR comment with details

## Troubleshooting

### ❌ "No secret key" error
**Cause:** GPG_PRIVATE_KEY not configured correctly  
**Fix:** Verify secret includes BEGIN/END lines and full key

### ❌ "Bad passphrase" error
**Cause:** GPG_PASSPHRASE is incorrect  
**Fix:** Verify passphrase matches your GPG key

### ❌ "Unverified" badge on GitHub
**Cause:** Public key not added to GitHub profile  
**Fix:** Add public key to GitHub → Settings → SSH and GPG keys

### ❌ Force push fails
**Cause:** GH_PAT lacks permissions or branch protection  
**Fix:** Ensure PAT has `repo` scope, check branch protection rules

## Files Created by This PR

```
.github/
├── workflows/
│   ├── gpg-auto-sign.yml        # Main GPG signing workflow
│   ├── copilot-gpg-sign.yml     # Copilot-specific signing
│   └── README.md                 # Quick reference for workflows
├── GPG_SETUP_GUIDE.md            # Complete setup instructions
├── WORKFLOWS_README.md           # Detailed workflow documentation
├── WORKFLOW_DIAGRAMS.md          # Visual flow diagrams
└── EXAMPLE_CONFIG.md             # This file
```

## Next Steps

1. ✅ Configure the three required secrets
2. ✅ Add public key to GitHub profile
3. ✅ Push a test commit to verify setup
4. ✅ Check commit shows "Verified" badge
5. ✅ All future commits will be automatically signed!

## Security Reminders

- ⚠️ **Never** share your private key publicly
- ⚠️ **Never** commit secrets to the repository
- ⚠️ Keep your passphrase secure and complex
- ⚠️ Rotate GPG keys periodically
- ⚠️ Revoke compromised keys immediately

## Additional Resources

- [GitHub GPG Documentation](https://docs.github.com/en/authentication/managing-commit-signature-verification)
- [GPG Best Practices](https://riseup.net/en/security/message-security/openpgp/best-practices)
- [Workflow Setup Guide](.github/GPG_SETUP_GUIDE.md)
- [Workflow Diagrams](.github/WORKFLOW_DIAGRAMS.md)
