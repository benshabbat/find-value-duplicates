# Contributing to TypeScript Value Duplicates Finder

Thank you for your interest in contributing to this project! We welcome contributions from everyone.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/find-value-duplicates.git
   cd find-value-duplicates
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Run tests** to make sure everything works:
   ```bash
   npm test
   ```

## Development Workflow

### Making Changes

1. **Create a branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding guidelines below

3. **Test your changes**:
   ```bash
   npm test
   npm run scan  # Test the tool itself
   ```

4. **Commit your changes**:
   ```bash
   git commit -m "Add: your descriptive commit message"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## Coding Guidelines

### Code Style
- Use **camelCase** for variables and functions
- Use **PascalCase** for classes
- Use **UPPER_SNAKE_CASE** for constants
- Add **JSDoc comments** for all public methods
- Keep functions **small and focused**

### Example:
```javascript
/**
 * Finds duplicate type definitions in TypeScript files
 * @param {string} content - File content to analyze
 * @param {string} filePath - Path to the file being analyzed
 * @returns {Array} Array of duplicate findings
 */
findDuplicates(content, filePath) {
  // Implementation here
}
```

### Testing
- **Write tests** for new features
- **Update existing tests** when modifying functionality
- Ensure **all tests pass** before submitting PR
- Add **test cases** for edge cases

### Documentation
- Update **README.md** if adding new features
- Add **examples** for new functionality
- Update **CHANGELOG.md** for notable changes
- Keep **code comments** up to date

## Types of Contributions

### 🐛 Bug Reports
- Use the **GitHub Issues** template
- Include **reproduction steps**
- Provide **expected vs actual behavior**
- Include **error messages** and **stack traces**

### 💡 Feature Requests
- Use the **GitHub Issues** template
- Explain the **use case** and **benefit**
- Provide **examples** of how it would work
- Discuss **implementation approach**

### 🔧 Code Contributions
- **Bug fixes** are always welcome
- **Performance improvements**
- **New features** (discuss in issues first)
- **Documentation improvements**
- **Test coverage improvements**

## Project Structure

```
find-value-duplicates/
├── index.js              # Main tool implementation
├── package.json          # Package configuration
├── config.json           # Default configuration
├── examples/             # Example TypeScript files
│   ├── duplicate-types.ts
│   └── unique-types.ts
├── test/                 # Test files
│   └── test.js
└── docs/                 # Documentation
```

## Release Process

1. **Update version** in `package.json`
2. **Update CHANGELOG.md** with new changes
3. **Create release tag**: `git tag v1.x.x`
4. **Push tag**: `git push origin v1.x.x`
5. **Create GitHub release** with release notes

## Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Email**: For private matters

## Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
Examples of behavior that contributes to creating a positive environment include:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.

## Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **CHANGELOG.md** for significant contributions
- **GitHub releases** notes

Thank you for contributing! 🎉