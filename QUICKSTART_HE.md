# 🚀 התחלה מהירה - Find Value Duplicates

התחל לעבוד עם הכלי תוך 2 דקות!

## 📦 התקנה

### התקנה גלובלית (מומלץ)
```bash
npm install -g find-value-duplicates
```

### שימוש ללא התקנה
```bash
npx find-value-duplicates
```

### התקנה מקומית בפרויקט
```bash
npm install --save-dev find-value-duplicates
```

## 🎯 שימוש בסיסי

### סריקה פשוטה
```bash
# סרוק את התיקיות המוגדרות כברירת מחדל (src, lib, types)
find-value-duplicates

# או עם npx
npx find-value-duplicates
```

### סריקת תיקיות ספציפיות
```bash
# סרוק תיקיות מסוימות
find-value-duplicates ./src ./components

# סרוק תיקייה אחת
find-value-duplicates ./src
```

### שמירת תוצאות ל-JSON
```bash
# שמור את התוצאות לקובץ JSON
find-value-duplicates --output=json

# הצג בקונסול וגם שמור ל-JSON
find-value-duplicates --output=both
```

## 📖 דוגמה לפלט

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
   Create base interface and extend:
   export interface BaseUser {
     id: string;
     name: string;
     email: string;
   }
   export interface UserProps extends BaseUser {}
   export interface UserData extends BaseUser {}
```

## ⚙️ התאמה אישית

### יצירת קובץ הגדרות
צור קובץ `config.json` בשורש הפרויקט:

```json
{
  "scanPaths": ["./src", "./components"],
  "excludePaths": ["node_modules", "dist", "build"],
  "fileExtensions": [".ts", ".tsx"],
  "excludeExtensions": [".d.ts", ".test.ts"],
  "minTypeLength": 5,
  "outputFormat": "console",
  "outputFile": "type-duplicates-report.json"
}
```

### שימוש בקובץ הגדרות מותאם
```bash
find-value-duplicates --config=my-config.json
```

## 🛠️ הוספה ל-npm scripts

הוסף ל-`package.json` שלך:

```json
{
  "scripts": {
    "check-duplicates": "find-value-duplicates",
    "check-duplicates:json": "find-value-duplicates --output=json",
    "check-duplicates:src": "find-value-duplicates ./src"
  }
}
```

ואז הרץ:
```bash
npm run check-duplicates
```

## 💡 דוגמאות שימוש

### דוגמה 1: בדיקת רכיבי React
```bash
find-value-duplicates ./src/components
```

### דוגמה 2: בדיקת קבצי טיפוסים
```bash
find-value-duplicates ./src/types ./src/@types
```

### דוגמה 3: בדיקה מלאה עם שמירה
```bash
find-value-duplicates ./src --output=both
```

### דוגמה 4: בדיקה עם הגדרות מותאמות
```bash
find-value-duplicates --config=strict-config.json
```

## 🚫 מה הכלי מוצא?

### ✅ מוצא:
- **Interfaces** - `export interface User { ... }`
- **Type Aliases** - `export type User = { ... }`
- **Enums** - `export enum Status { ... }`
- **Generic Types** - `interface User<T> { ... }`
- **Extended Interfaces** - `interface User extends Base { ... }`

### ❌ מתעלם מ:
- קבצי `.d.ts` (הגדרות)
- קבצי בדיקה (`.test.ts`, `.spec.ts`)
- קבצי סטורי (`.stories.ts`)
- תיקיית `node_modules`
- טיפוסים קצרים מדי

## 🔥 טיפים למתחילים

### טיפ 1: התחל עם הגדרות ברירת מחדל
```bash
# רק הרץ את הפקודה הבסיסית
find-value-duplicates
```

### טיפ 2: התמקד בתיקייה אחת בהתחלה
```bash
# התחל עם תיקייה קטנה
find-value-duplicates ./src/components
```

### טיפ 3: שמור תוצאות לניתוח מאוחר יותר
```bash
# שמור ל-JSON לניתוח
find-value-duplicates --output=json
```

### טיפ 4: הוסף לתהליך ה-CI/CD
```json
{
  "scripts": {
    "test": "npm run check-duplicates && jest"
  }
}
```

## 🐛 פתרון בעיות נפוצות

### בעיה: "No files found to scan"
**פתרון:** ציין תיקיות ספציפיות
```bash
find-value-duplicates ./src ./lib
```

### בעיה: יותר מדי תוצאות
**פתרון:** עדכן את `minTypeLength` בקובץ ההגדרות
```json
{
  "minTypeLength": 10
}
```

### בעיה: לא מוצא קבצים מסוימים
**פתרון:** בדוק את `fileExtensions` ו-`excludePaths` בהגדרות
```json
{
  "fileExtensions": [".ts", ".tsx"],
  "excludePaths": ["node_modules", "dist"]
}
```

## 📚 משאבים נוספים

- 📖 [README מלא](README.md) - תיעוד מפורט
- 🤝 [Contributing Guide](CONTRIBUTING.md) - איך לתרום לפרויקט
- 📦 [npm Package](https://www.npmjs.com/package/find-value-duplicates)
- 🐙 [GitHub Repository](https://github.com/benshabbat/find-value-duplicates)

## ❓ צריך עזרה?

```bash
# הצג עזרה
find-value-duplicates --help
```

או פתח issue ב-[GitHub](https://github.com/benshabbat/find-value-duplicates/issues)

---

**בהצלחה! 🎉**

[⬅ חזרה ל-README הראשי](README.md)
