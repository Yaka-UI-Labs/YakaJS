# GPG Auto-Sign Setup Guide

This guide will help you set up automatic GPG signing for commits in the YakaJS repository using GitHub Actions.

## What is GPG Signing?

GPG (GNU Privacy Guard) signing allows you to cryptographically sign your git commits, proving that they came from you and haven't been tampered with. When properly configured, your commits will show a "Verified" badge on GitHub.

## Why Use Auto-Signing?

- **Security**: Ensures commit authenticity and prevents impersonation
- **Compliance**: Meets security requirements for many organizations
- **Trust**: Shows that commits are verified and from a trusted source
- **Automation**: No need to manually sign each commit
- **Copilot Integration**: Automatically signs AI-generated code changes

## Prerequisites

- A GitHub account with access to the YakaJS repository
- GPG installed on your local machine (see installation below)
- Admin access to repository settings (to add secrets)

## Step 1: Install GPG

### macOS
```bash
brew install gnupg
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install gnupg
```

### Windows
Download and install [Gpg4win](https://www.gpg4win.org/)

## Step 2: Generate a GPG Key

1. Generate a new GPG key:
```bash
gpg --full-generate-key
```

2. When prompted:
   - Select: `(1) RSA and RSA`
   - Key size: `4096` bits
   - Expiration: `0` (key does not expire) or set an expiration date
   - Enter your **real name** (must match your GitHub account)
   - Enter your **email** (must match your GitHub account email)
   - Enter a strong **passphrase** (you'll need this later)

3. Confirm your choices and wait for the key to be generated.

## Step 3: Find Your GPG Key ID

1. List your GPG keys:
```bash
gpg --list-secret-keys --keyid-format=long
```

2. You'll see output like:
```
sec   rsa4096/842616E01EFEAD62 2024-01-01 [SC]
      842616E01EFEAD62F2277C66EF13362EBFF67089
uid                 [ultimate] Your Name <your.email@example.com>
ssb   rsa4096/1234567890ABCDEF 2024-01-01 [E]
```

3. Your Key ID is: `842616E01EFEAD62F2277C66EF13362EBFF67089` (the long string)

## Step 4: Export Your GPG Keys

### Export Private Key (for GitHub Secrets)
```bash
gpg --armor --export-secret-keys 842616E01EFEAD62F2277C66EF13362EBFF67089
```

**Important**: This will display your private key. Copy the **entire output** including:
- `-----BEGIN PGP PRIVATE KEY BLOCK-----`
- All the content in between
- `-----END PGP PRIVATE KEY BLOCK-----`

⚠️ **Keep this private!** Never share this key publicly.

### Export Public Key (for GitHub Profile)
```bash
gpg --armor --export 842616E01EFEAD62F2277C66EF13362EBFF67089
```

Copy the entire output including:
- `-----BEGIN PGP PUBLIC KEY BLOCK-----`
- All the content in between
- `-----END PGP PUBLIC KEY BLOCK-----`

## Step 5: Add Public Key to GitHub

1. Go to GitHub.com → Click your profile → **Settings**
2. Navigate to **SSH and GPG keys**
3. Click **New GPG key**
4. Paste your **public key** (from Step 4)
5. Click **Add GPG key**

## Step 6: Configure GitHub Secrets

1. Go to your YakaJS repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:

### Secret 1: GPG_PRIVATE_KEY
- Click **New repository secret**
- Name: `GPG_PRIVATE_KEY`
- Value: Your entire private key (from Step 4)
- Click **Add secret**

### Secret 2: GPG_PASSPHRASE
- Click **New repository secret**
- Name: `GPG_PASSPHRASE`
- Value: The passphrase you used when creating the key
- Click **Add secret**

**Note**: The GPG auto-signing workflows now use the built-in `GITHUB_TOKEN` which has proper permissions automatically. You do **NOT** need to configure a separate `GH_PAT` token for GPG signing to work.

## Step 7: Test the Workflow

1. Make a test commit and push to a branch:
```bash
git checkout -b test-gpg-signing
echo "# Test" >> test-file.md
git add test-file.md
git commit -m "Test GPG auto-signing"
git push origin test-gpg-signing
```

2. Go to GitHub → **Actions** tab
3. You should see the "GPG Auto-Sign Commits" or "Copilot GPG Auto-Sign" workflow running
4. Wait for it to complete (green checkmark)
5. Check your commit on GitHub - it should show a "Verified" badge!

## Step 8: Verify Locally (Optional)

You can verify signatures locally:

```bash
# Check if a specific commit is signed
git verify-commit HEAD

# View signature information
git log --show-signature -1

# View all commits with signature status
git log --show-signature
```

## Troubleshooting

### "No secret key" error
- Make sure you exported the **private key**, not the public key
- Verify the key includes the BEGIN and END lines
- Check that the secret is named exactly `GPG_PRIVATE_KEY`

### "Bad passphrase" error
- Verify the passphrase is correct
- Make sure there are no extra spaces or characters
- Try generating a new key if the passphrase doesn't work

### Commits show "Unverified"
- Make sure you added the **public key** to your GitHub profile
- Verify the email in your GPG key matches your GitHub email
- Check GitHub → Settings → SSH and GPG keys to confirm the key is added

### Force push fails
- Check if branch protection rules prevent force pushes
- Verify the workflow has `contents: write` permission (it does by default)
- The workflow uses built-in `GITHUB_TOKEN` which should work automatically

## Workflow Files

The repository includes two GPG signing workflows:

1. **`gpg-auto-sign.yml`**: Signs commits on push to main, develop, and feature branches
2. **`copilot-gpg-sign.yml`**: Specifically handles commits from GitHub Copilot

Both workflows work automatically once secrets are configured.

## Benefits

✅ **Automatic Signing**: All commits are signed without manual intervention  
✅ **Security**: Cryptographic verification of commit authenticity  
✅ **Compliance**: Meets organizational security requirements  
✅ **Verified Badge**: Shows "Verified" on GitHub commits  
✅ **Copilot Integration**: Works seamlessly with AI-generated code  
✅ **PR Comments**: Automatically adds signing summary to pull requests  

## Next Steps

1. Configure the secrets as described above
2. Push a test commit to verify everything works
3. All future commits will be automatically signed!

## Need Help?

If you encounter issues:
1. Check the workflow logs in the Actions tab
2. Review the troubleshooting section above
3. Verify all secrets are configured correctly
4. Make sure your GPG key is properly added to GitHub

## Security Best Practices

- ⚠️ Never share your private key publicly
- ⚠️ Keep your passphrase secure
- ⚠️ Use a strong passphrase (at least 12 characters)
- ⚠️ Rotate your GPG keys periodically
- ⚠️ Set an expiration date for your keys
- ⚠️ Revoke old keys if compromised

## References

- [GitHub GPG Documentation](https://docs.github.com/en/authentication/managing-commit-signature-verification)
- [GPG Manual](https://www.gnupg.org/documentation/manuals/gnupg/)
- [Workflow Documentation](.github/WORKFLOWS_README.md)
