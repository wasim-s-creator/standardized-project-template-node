# Contributing to Standardized Project Template

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)
- [Issue and PR Guidelines](#issue-and-pr-guidelines)

## Code of Conduct
This project follows a standard code of conduct. Please be respectful and inclusive in all interactions.

## Getting Started
1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature/bugfix
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Setup
```bash
# Clone the repository
git clone https://github.com/wasim-s-creator/standardized-project-template.git
cd standardized-project-template

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev
```

## Making Changes

### Branch Naming Convention
- `feature/description` - for new features
- `bugfix/description` - for bug fixes
- `hotfix/description` - for urgent fixes
- `docs/description` - for documentation updates

### Commit Message Format
Use conventional commit format:
```
type(scope): description

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(api): add user authentication endpoint

Implement JWT-based authentication with login/logout functionality

Closes #123
```

## Submitting Changes

1. **Create an Issue First**: For significant changes, create an issue to discuss the approach
2. **Follow the PR Template**: Use the provided pull request template
3. **Write Tests**: Ensure your changes are covered by tests
4. **Update Documentation**: Update relevant documentation
5. **Keep PRs Small**: Submit focused, atomic changes

## Style Guidelines

### JavaScript/Node.js
- Use ES6+ features where appropriate
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for functions
- Maintain consistent indentation (2 spaces)

### File Organization
```
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── tests/
├── docs/
└── config/
```

### Testing
- Write unit tests for all new functionality
- Ensure all tests pass before submitting PR
- Maintain test coverage above 80%
- Use descriptive test names

## Issue and PR Guidelines

### Creating Issues
- Use appropriate issue templates
- Provide clear reproduction steps for bugs
- Include environment details
- Add relevant labels

### Pull Request Process
1. Update the README.md with details of changes if applicable
2. Update documentation
3. Ensure all tests pass
4. Request review from maintainers
5. Address review feedback promptly

### Review Process
- All PRs require at least one approval
- Address all review comments
- Keep discussions constructive and professional
- Update your PR based on feedback

## Documentation
- Keep README.md updated
- Document API changes
- Update inline code comments
- Maintain Wiki pages for complex topics

## Questions?
If you have questions about contributing, please:
1. Check existing issues and discussions
2. Create a new issue with the 'question' label
3. Reach out to maintainers

Thank you for contributing! 🚀
