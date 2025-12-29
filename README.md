# find-value-duplicates

Find duplicate TypeScript interfaces, types, and enums with identical content but different names.

## Installation

```bash
npm install -g find-value-duplicates
```

Or use without installation:
```bash
npx find-value-duplicates
```

## Usage

```bash
# Scan default directories (src, lib, types)
find-value-duplicates

# Scan specific directories
find-value-duplicates ./src ./components

# Output as JSON
find-value-duplicates --output=json

# Show help
find-value-duplicates --help
```

## Features

-  Finds duplicate interfaces, types, and enums
-  Console and JSON output formats
-  Configurable via `config.json`
-  Provides refactoring suggestions
-  Ignores test files and declaration files

## Configuration

Create a `config.json` file:

```json
{
  "scanPaths": ["./src", "./lib", "./types"],
  "excludePaths": ["node_modules", "dist"],
  "fileExtensions": [".ts", ".tsx"],
  "excludeExtensions": [".d.ts", ".test.ts"],
  "minTypeLength": 5,
  "outputFormat": "console"
}
```

## Example Output

```
 TypeScript Value Duplicates Report
============================================================

 Statistics:
   Files scanned: 45
   Types found: 128
   Duplicate groups: 3

 Found 3 duplicate groups:

 Duplicate #1:
   Shared content: id:string;name:string;email:string

   Found in:
   1. interface UserProps (src/components/User.tsx:12)
   2. interface UserData (src/types/user.ts:8)
   3. type UserInfo (src/api/users.ts:15)

    Suggested fix:
   Create base interface and extend it
```

## npm Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "find-duplicates": "find-value-duplicates",
    "find-duplicates:json": "find-value-duplicates --output=json"
  }
}
```

## License

MIT

## Links

- [npm Package](https://www.npmjs.com/package/find-value-duplicates)
- [GitHub Repository](https://github.com/benshabbat/find-value-duplicates)
