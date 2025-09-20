# 📝 Commit Message Convention

This project follows **Conventional Commits** specification for consistent and meaningful commit messages.

## 🏷️ Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### **Examples:**
```bash
feat: add user authentication endpoint
fix: resolve password validation error
docs: update API documentation
test(auth): add unit tests for login controller
refactor(database): optimize user queries
```

## 📦 Commit Types

| Type | Description | Example |
|------|-------------|----------|
| **feat** | New feature | `feat: add user profile endpoint` |
| **fix** | Bug fix | `fix: resolve login validation error` |
| **docs** | Documentation | `docs: update API endpoints guide` |
| **style** | Code style (formatting, missing semicolons) | `style: fix indentation in auth controller` |
| **refactor** | Code refactoring | `refactor: simplify user validation logic` |
| **perf** | Performance improvement | `perf: optimize database queries` |
| **test** | Adding/updating tests | `test: add integration tests for auth` |
| **build** | Build system changes | `build: update webpack configuration` |
| **ci** | CI configuration changes | `ci: add automated testing workflow` |
| **chore** | Maintenance tasks | `chore: update dependencies` |
| **revert** | Revert previous commit | `revert: revert feat: add user auth` |

## 🎯 Scopes (Optional)

Scopes provide additional context about the area of change:

| Scope | Description | Example |
|-------|-------------|----------|
| **auth** | Authentication related | `feat(auth): add JWT middleware` |
| **user** | User management | `fix(user): resolve profile update bug` |
| **api** | API endpoints | `docs(api): add rate limiting info` |
| **db** | Database related | `perf(db): optimize user queries` |
| **config** | Configuration changes | `chore(config): update environment vars` |
| **test** | Testing related | `test(auth): add login integration tests` |
| **docs** | Documentation | `docs(wiki): update deployment guide` |

## 📝 Description Guidelines

### **Do's:**
- ✅ Use **imperative mood** ("add" not "added")
- ✅ Keep **first line under 72 characters**
- ✅ **Lowercase** first letter
- ✅ **No period** at the end
- ✅ Be **specific** and **descriptive**

### **Don'ts:**
- ❌ Don't use past tense
- ❌ Don't be vague ("fix stuff", "update things")
- ❌ Don't exceed character limits
- ❌ Don't include implementation details in title

## 📄 Body and Footer

### **Body (Optional)**
Provide additional context when the title isn't self-explanatory:

```
feat(auth): add password reset functionality

Implement secure password reset flow with:
- Email verification tokens
- Token expiration (10 minutes)
- Rate limiting to prevent abuse
- Secure password update process
```

### **Footer (Optional)**
Reference issues, breaking changes, or other metadata:

```
feat(api): add user role-based access control

Implement RBAC system with admin, moderator, and user roles.
All existing endpoints now require appropriate permissions.

BREAKING CHANGE: API endpoints now require authentication
Closes #123
Reviewed-by: @username
```

## 🔄 Breaking Changes

For breaking changes, include `BREAKING CHANGE:` in the footer:

```
feat(api): update user authentication flow

BREAKING CHANGE: authentication now requires email verification
before account activation. Existing unverified accounts will
need to complete email verification.
```

## 🎨 Commit Message Examples

### **Feature Commits**
```bash
# Good
feat: add user registration endpoint
feat(auth): implement JWT token refresh
feat(api): add pagination to user listing

# Bad
Add new feature
Added user stuff
feat: implemented some new functionality
```

### **Bug Fix Commits**
```bash
# Good
fix: resolve email validation error
fix(auth): handle expired token gracefully
fix(db): prevent duplicate user creation

# Bad
Fixed bug
Bug fixes
fix: fixed the thing that was broken
```

### **Documentation Commits**
```bash
# Good
docs: update installation guide
docs(api): add authentication examples
docs(wiki): create deployment checklist

# Bad
Updated docs
Documentation changes
docs: updated some files
```

## ⚙️ Automated Validation

### **Commitlint Configuration**
This repository uses `commitlint` to validate commit messages:

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert']
    ],
    'subject-max-length': [2, 'always', 72],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never']
  }
};
```

### **Git Hooks**
Pre-commit hooks validate messages automatically:

```bash
# This commit will be rejected
git commit -m "Fixed stuff"

# This commit will be accepted
git commit -m "fix(auth): resolve login validation error"
```

## 📊 Impact on Project

### **Benefits:**
- 📈 **Clear History**: Easy to understand project evolution
- 🤖 **Automation**: Automated changelog and version generation
- 🔍 **Searchability**: Easy to find specific changes
- 📊 **Analytics**: Track feature vs fix ratio
- 🚀 **Deployment**: Automated semantic versioning

### **Tools Integration:**
- **Semantic Release**: Automated versioning
- **Conventional Changelog**: Auto-generated changelogs
- **GitHub Actions**: Automated workflows based on commit types
- **Code Review**: Better PR understanding

## 🎨 IDE Integration

### **VS Code Extension**
Install "Conventional Commits" extension for commit assistance:

1. Open VS Code
2. Go to Extensions
3. Search "Conventional Commits"
4. Install the extension
5. Use Ctrl+Shift+P → "Conventional Commits"

### **Git Template**
Set up commit message template:

```bash
# Create template file
echo "# <type>[optional scope]: <description>
# 
# [optional body]
# 
# [optional footer(s)]" > ~/.gitmessage

# Configure git to use template
git config --global commit.template ~/.gitmessage
```

## 🔧 Troubleshooting

### **Common Issues:**

1. **Commit Rejected**: Check message format against examples
2. **Type Not Recognized**: Use only specified types from the list
3. **Message Too Long**: Keep first line under 72 characters
4. **Wrong Case**: Use lowercase for type and description

### **Quick Fix Commands:**
```bash
# Amend last commit message
git commit --amend -m "fix(auth): resolve login validation error"

# Interactive rebase to fix multiple commits
git rebase -i HEAD~3
```

---

## 📚 References

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)
- [Commitlint](https://commitlint.js.org/)

**Remember**: Good commit messages are a gift to your future self and your teammates! 🎁
