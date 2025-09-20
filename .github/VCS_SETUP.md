# 🔄 Version Control System (VCS) Setup Guide

Comprehensive guide for setting up and using the VCS standards implemented in this repository.

## 🎯 Overview

This repository implements **professional VCS standards** including:

- 🏷️ **Conventional Commits** - Standardized commit message format
- 🔒 **Branch Protection** - Automated branch protection rules
- 🧪 **Quality Gates** - Pre-commit and CI/CD checks
- 📝 **Code Review** - Structured pull request workflow
- ⚙️ **Git Hooks** - Automated validation and formatting
- 🚀 **Semantic Versioning** - Automated release management

## 🛠️ Initial Setup

### **1. Install Dependencies**
```bash
# Install all VCS tools
npm install

# Setup Git hooks
npm run prepare
```

### **2. Configure Git (First Time Only)**
```bash
# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Optional: Set default branch
git config --global init.defaultBranch main

# Optional: Set pull strategy
git config --global pull.rebase false
```

### **3. Enable Branch Protection**
1. Go to **Actions** tab in your repository
2. Find **"Branch Protection Setup"** workflow
3. Click **"Run workflow"**
4. Configure settings and run

## 🌳 Branch Strategy

### **Branch Structure**
```
main (protected)
 │
 ├── develop (integration)
 │    │
 │    ├── feature/user-auth
 │    ├── feature/api-endpoints
 │    └── bugfix/login-error
 │
 └── hotfix/security-patch
```

### **Branch Types & Naming**

| Branch Type | Purpose | Naming | Base | Target |
|------------|---------|--------|------|--------|
| `main` | Production | `main` | - | - |
| `develop` | Integration | `develop` | `main` | `main` |
| `feature/*` | New features | `feature/feature-name` | `develop` | `develop` |
| `bugfix/*` | Bug fixes | `bugfix/issue-description` | `develop` | `develop` |
| `hotfix/*` | Critical fixes | `hotfix/urgent-fix` | `main` | `main` |
| `docs/*` | Documentation | `docs/section-name` | `develop` | `develop` |

## 📝 Commit Standards

### **Commit Message Format**
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### **Commit Types**
| Type | Description | Example |
|------|-------------|----------|
| `feat` | New feature | `feat(auth): add JWT middleware` |
| `fix` | Bug fix | `fix: resolve login validation error` |
| `docs` | Documentation | `docs: update API guide` |
| `style` | Code style | `style: fix indentation` |
| `refactor` | Refactoring | `refactor: simplify user validation` |
| `perf` | Performance | `perf: optimize database queries` |
| `test` | Testing | `test: add auth integration tests` |
| `build` | Build system | `build: update webpack config` |
| `ci` | CI changes | `ci: add automated testing` |
| `chore` | Maintenance | `chore: update dependencies` |

### **Examples**
```bash
# Good commits
feat: add user registration endpoint
fix(auth): resolve password validation error
docs: update installation guide
test(user): add profile update tests

# Bad commits
Fixed stuff
Update
WIP
More changes
```

## 🚀 Development Workflow

### **Feature Development**
```bash
# 1. Start from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/user-authentication

# 3. Work on feature with proper commits
git add .
git commit -m "feat(auth): add user registration endpoint"

# 4. Push branch
git push origin feature/user-authentication

# 5. Create PR via GitHub UI
# 6. After approval and merge, cleanup
git checkout develop
git pull origin develop
git branch -d feature/user-authentication
```

### **Hotfix Process**
```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/security-patch

# 2. Fix the critical issue
git add .
git commit -m "fix: resolve security vulnerability"

# 3. Create PR to main
git push origin hotfix/security-patch

# 4. After merge, sync develop
git checkout develop
git pull origin main
```

## 🧪 Quality Gates

### **Pre-commit Hooks**
Automatically run before each commit:

- ✅ **ESLint** - Code quality checks
- ✅ **Prettier** - Code formatting
- ✅ **Tests** - Related test execution
- ✅ **Secret Detection** - Prevent credential commits
- ✅ **File Size** - Prevent large file commits

### **Commit Message Validation**
Validates every commit message:

- ✅ **Format** - Conventional commit structure
- ✅ **Type** - Valid commit types
- ✅ **Length** - Under 72 characters
- ✅ **Case** - Proper capitalization

### **CI/CD Pipeline**
Runs on every PR and push:

- 🔍 **Code Quality** - ESLint, Prettier, Security
- 🧪 **Testing** - Unit and integration tests
- 📝 **Commit Lint** - Message validation
- 🚀 **Build** - Docker and production build
- 📁 **Coverage** - Test coverage reporting

## 📋 Pull Request Process

### **Creating a PR**
1. **Push your branch** to GitHub
2. **Create PR** using the template
3. **Fill all sections** completely
4. **Request reviewers**
5. **Wait for CI** to pass

### **PR Requirements**
- ✅ All CI checks passing
- ✅ At least 1 reviewer approval
- ✅ Branch up to date with target
- ✅ No merge conflicts
- ✅ All conversations resolved

### **Review Process**
1. **Code review** by team members
2. **Automated testing** via CI/CD
3. **Security scanning** for vulnerabilities
4. **Final approval** and merge

## ⚙️ Tools Configuration

### **Husky (Git Hooks)**
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

### **Lint-staged**
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}
```

### **Commitlint**
```json
{
  "commitlint": {
    "extends": ["@commitlint/config-conventional"]
  }
}
```

## 🚀 Release Management

### **Semantic Versioning**
Automated versioning based on commit types:

- `feat:` → **Minor** version (1.0.0 → 1.1.0)
- `fix:` → **Patch** version (1.0.0 → 1.0.1)
- `BREAKING CHANGE:` → **Major** version (1.0.0 → 2.0.0)

### **Release Commands**
```bash
# Automatic release (recommended)
npm run release

# Manual version bumps
npm run release:patch  # 1.0.0 -> 1.0.1
npm run release:minor  # 1.0.0 -> 1.1.0
npm run release:major  # 1.0.0 -> 2.0.0
```

### **Changelog Generation**
Automatically generates `CHANGELOG.md` from commits:

```markdown
## [1.1.0] - 2025-09-20

### Features
- add user authentication endpoint
- implement JWT middleware

### Bug Fixes
- resolve login validation error
- fix password hashing issue
```

## 🔧 Command Reference

### **Git Operations**
```bash
# Commit with interactive prompt
npm run commit

# Validate everything
npm run validate

# Check formatting
npm run format:check

# Fix formatting
npm run format

# Run all quality checks
npm run build
```

### **Branch Operations**
```bash
# Switch branches
git checkout develop
git checkout -b feature/new-feature

# Update branch
git pull origin develop
git rebase develop

# Clean up branches
git branch -d feature/completed-feature
git remote prune origin
```

## 🚫 Common Mistakes

### **❌ Don't Do This**
```bash
# Bad commit messages
git commit -m "fix"
git commit -m "Update stuff"
git commit -m "WIP"

# Direct commits to protected branches
git checkout main
git commit -m "Quick fix"
git push origin main

# Skipping hooks
git commit -m "fix" --no-verify

# Large files
git add large-file.zip
git commit -m "Add large file"
```

### **✅ Do This Instead**
```bash
# Proper commit messages
git commit -m "fix(auth): resolve login validation error"
git commit -m "feat: add user registration endpoint"

# Use feature branches
git checkout -b feature/quick-fix
git commit -m "fix: resolve critical bug"
# Then create PR

# Let hooks run
git commit -m "fix(auth): resolve login validation error"
# Hooks will run automatically

# Use Git LFS for large files
git lfs track "*.zip"
git add .gitattributes large-file.zip
git commit -m "feat: add deployment package"
```

## 🔍 Troubleshooting

### **Commit Rejected**
```bash
# Check commit message format
git log -1 --oneline

# Fix last commit message
git commit --amend -m "feat: add proper commit message"

# Check hook errors
npm run lint
npm run format:check
npm test
```

### **Pre-commit Fails**
```bash
# Run checks manually
npm run validate

# Fix issues one by one
npm run lint:fix
npm run format
npm test

# Retry commit
git commit -m "fix: resolve linting issues"
```

### **Branch Protection Issues**
```bash
# Ensure CI passes
# Check GitHub Actions tab

# Get required approvals
# Request review from team members

# Update branch
git fetch origin
git rebase origin/main
git push --force-with-lease
```

## 📈 Best Practices

### **✅ Commit Best Practices**
- **Atomic commits** - One logical change per commit
- **Descriptive messages** - Clear, concise descriptions
- **Present tense** - "add feature" not "added feature"
- **Imperative mood** - "fix bug" not "fixes bug"
- **Reference issues** - Include issue numbers when applicable

### **✅ Branch Best Practices**
- **Short-lived** - Keep feature branches small
- **Descriptive names** - Clear purpose in branch name
- **Regular updates** - Rebase with target branch frequently
- **Clean history** - Squash commits when appropriate
- **Delete merged** - Remove branches after merge

### **✅ PR Best Practices**
- **Complete template** - Fill all PR template sections
- **Small PRs** - Easier to review and merge
- **Clear description** - Explain what and why
- **Screenshots** - Include for UI changes
- **Link issues** - Reference related issues

## 📚 References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Commitlint](https://commitlint.js.org/)
- [Husky](https://typicode.github.io/husky/)
- [Standard Version](https://github.com/conventional-changelog/standard-version)

---

## 🎉 Next Steps

1. **Setup complete** - Run through the initial setup
2. **Test workflow** - Create a test feature branch
3. **Team training** - Share this guide with your team
4. **Customize** - Adapt rules to your project needs
5. **Monitor** - Check CI/CD pipeline results

**Remember**: These standards ensure **code quality**, **team collaboration**, and **project maintainability**! 🚀
