# Quick Start Guide

Get started with TypeScript Value Duplicates Finder in 2 minutes!

## 🚀 Installation

```bash
# Install globally
npm install -g find-value-duplicates

# Or use without installing
npx find-value-duplicates
```

## ⚡ Basic Usage

```bash
# Scan your project
find-value-duplicates

# Scan specific directories
find-value-duplicates ./src ./components

# Save results to JSON
find-value-duplicates --output=json
```

## 📖 Example Output

```
🔍 TypeScript Value Duplicates Report
============================================================
📊 Statistics:
   Files scanned: 25
   Types found: 89
   Duplicate groups: 3
   Scan duration: 0.45s

🚨 Found 3 duplicate groups:

📋 Duplicate #1 (severity: 240):
   Shared content:
   id:string;name:string;email:string

   Found in:
   1. interface UserProps
      📁 src/components/User.tsx:12
   2. interface UserData  
      📁 src/types/user.ts:8

   💡 Suggested fix:
   export interface BaseUser {
     id: string;
     name: string;
     email: string;
   }
   export interface UserProps extends BaseUser {}
   export interface UserData extends BaseUser {}
```

## ⚙️ Configuration

Create `config.json` in your project root:

```json
{
  "scanPaths": ["./src", "./lib"],
  "excludePaths": ["node_modules", "dist"],
  "outputFormat": "console"
}
```

## 🎯 What It Finds

✅ **Duplicate interfaces** with identical properties  
✅ **Duplicate type aliases** with same structure  
✅ **Duplicate enums** with identical values  
✅ **Complex nested types** with matching content  

## 💡 Common Use Cases

### 1. Before Refactoring
```typescript
interface UserProps { id: string; name: string; }
interface UserData { id: string; name: string; }
```

### 2. After Refactoring
```typescript
interface BaseUser { id: string; name: string; }
interface UserProps extends BaseUser {}
interface UserData extends BaseUser {}
```

## 🛠️ Integration

### Add to package.json
```json
{
  "scripts": {
    "check-duplicates": "find-value-duplicates",
    "build": "find-value-duplicates && tsc"
  }
}
```

### Pre-commit Hook
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "find-value-duplicates"
    }
  }
}
```

## 🔧 CLI Options

```bash
find-value-duplicates [paths...] [options]

Options:
  --config=path     Custom config file
  --output=format   Output format (console|json|both)
  --help           Show help
```

## 📚 Need More Help?

- 📖 [Full Documentation](README.md)
- 🐛 [Report Issues](https://github.com/benshabbat/find-value-duplicates/issues)
- 💬 [Ask Questions](https://github.com/benshabbat/find-value-duplicates/discussions)

---

**Ready to eliminate duplicate types?** Start scanning now! 🎉