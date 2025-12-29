# 📦 הוראות פרסום ל-npm

## הכנה לפרסום

### שלב 1: יצירת חשבון npm
```bash
# אם עדיין אין לך חשבון, צור אחד כאן:
# https://www.npmjs.com/signup
```

### שלב 2: התחברות ל-npm
```bash
# התחבר לחשבון npm שלך
npm login

# הזן:
# - Username
# - Password
# - Email
# - One-Time Password (אם הפעלת 2FA)

# ודא שההתחברות הצליחה
npm whoami
# אמור להדפיס את שם המשתמש שלך
```

### שלב 3: בדיקה לפני פרסום
```bash
# ודא שהבדיקות עוברות
npm test

# בדוק את קובץ package.json
# ודא שהשדות הבאים נכונים:
# - name: find-value-duplicates
# - version: 1.0.0 (או הגרסה הרצויה)
# - description
# - author
# - repository
# - keywords
```

## פרסום הפקג'

### שיטה 1: פרסום ישיר
```bash
# פרסם את הפקג' ל-npm
npm publish

# אם זו פעם ראשונה, ייתכן שתצטרך לוודא את כתובת המייל שלך
# בדוק את המייל ולחץ על הקישור לאימות
```

### שיטה 2: עדכון גרסה ופרסום
```bash
# עדכן גרסה קטנה (bug fixes)
npm version patch  # 1.0.0 -> 1.0.1

# עדכן גרסה בינונית (new features)
npm version minor  # 1.0.0 -> 1.1.0

# עדכן גרסה גדולה (breaking changes)
npm version major  # 1.0.0 -> 2.0.0

# הפקודה למעלה תיצור גם commit ו-tag ב-git
# עכשיו פרסם:
npm publish

# ודחוף את השינויים ל-GitHub
git push && git push --tags
```

## בדיקה לפני פרסום

### יצירת חבילה מקומית
```bash
# צור קובץ .tgz של הפקג'
npm pack

# זה יצור קובץ בשם: find-value-duplicates-1.0.0.tgz
```

### התקנה ובדיקה מקומית
```bash
# התקן את הפקג' באופן גלובלי מהקובץ המקומי
npm install -g ./find-value-duplicates-1.0.0.tgz

# נסה את הפקודה
find-value-duplicates --help

# נסה לסרוק תיקייה
find-value-duplicates ./examples

# אם הכל עובד - מעולה! אפשר לפרסם
```

## לאחר הפרסום

### ודא שהפרסום הצליח
```bash
# בדוק את הפקג' ב-npm
npm view find-value-duplicates

# נסה להתקין אותו מ-npm
npm install -g find-value-duplicates

# ודא שהכל עובד
find-value-duplicates --help
```

### עדכן את ה-README ב-GitHub
```bash
# ודא שכל הקישורים ב-README עובדים
# במיוחד:
# - https://www.npmjs.com/package/find-value-duplicates
# - הבאדג'ים בראש הקובץ
```

## שגיאות נפוצות

### שגיאה: "package name already exists"
```bash
# הפקג' כבר קיים - צריך לבחור שם אחר
# ערוך את package.json ושנה את שדה "name"
```

### שגיאה: "You must verify your email"
```bash
# בדוק את המייל שלך ואמת את הכתובת
# או הפעל:
npm profile get
# ושלח שוב מייל אימות אם צריך
```

### שגיאה: "You do not have permission to publish"
```bash
# ודא שאתה מחובר:
npm whoami

# אם לא מחובר, התחבר שוב:
npm login
```

### שגיאה: "version already exists"
```bash
# הגרסה הזו כבר פורסמה
# עדכן את הגרסה:
npm version patch
npm publish
```

## טיפים

### 1. הוסף .npmignore
```bash
# צור קובץ .npmignore כדי לא לכלול קבצים מיותרים:
cat > .npmignore << EOF
test/
examples/
*.log
.git
.DS_Store
node_modules/
coverage/
.github/
EOF
```

### 2. בדוק מה יפורסם
```bash
# ראה אילו קבצים יפורסמו
npm pack --dry-run
```

### 3. הוסף scripts ל-package.json
```json
{
  "scripts": {
    "prepublishOnly": "npm test",
    "version": "git add -A",
    "postversion": "git push && git push --tags"
  }
}
```

### 4. הגדר 2FA (מומלץ)
```bash
# הפעל אימות דו-שלבי לאבטחה מוגברת
npm profile enable-2fa auth-and-writes
```

## זרימת עבודה מומלצת

```bash
# 1. עשה שינויים בקוד
git add .
git commit -m "Your changes"

# 2. הרץ בדיקות
npm test

# 3. עדכן גרסה
npm version patch

# 4. פרסם
npm publish

# 5. דחוף ל-GitHub
git push && git push --tags
```

## משוב ותמיכה

אם נתקלת בבעיות:
1. בדוק את [npm documentation](https://docs.npmjs.com/)
2. חפש ב-[npm community](https://github.com/npm/feedback)
3. פתח issue ב-[GitHub repository](https://github.com/benshabbat/find-value-duplicates/issues)

---

**בהצלחה! 🚀**
