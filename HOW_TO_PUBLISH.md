# 🚀 איך לפרסם את הפקג' ל-npm - הוראות פשוטות

## ⚡ הכל מוכן! הנה מה שצריך לעשות:

### שלב 1️⃣: התחבר ל-npm

פתח טרמינל בתיקיית הפרויקט והקלד:

```bash
npm login
```

יבקש ממך:
- **Username** - שם המשתמש שלך ב-npm
- **Password** - הסיסמה
- **Email** - כתובת המייל
- **OTP** - קוד חד-פעמי (אם הפעלת 2FA)

📝 **אין לך חשבון?** צור אחד ב: https://www.npmjs.com/signup

---

### שלב 2️⃣: ודא שאתה מחובר

```bash
npm whoami
```

אמור להדפיס את שם המשתמש שלך. אם לא - חזור לשלב 1.

---

### שלב 3️⃣: פרסם!

```bash
npm publish
```

זהו! הפקודה הזו תעלה את הפקג' ל-npm.

⏱ זה לוקח כ-10-30 שניות.

---

### שלב 4️⃣: ודא שהפרסום הצליח

```bash
npm view find-value-duplicates
```

אמור להציג את פרטי הפקג' שלך.

---

### שלב 5️⃣: נסה להתקין!

במחשב אחר או בתיקייה אחרת:

```bash
npm install -g find-value-duplicates
```

ואז נסה להריץ:

```bash
find-value-duplicates --help
```

---

## 🎉 זהו! הפקג' שלך כעת זמין לכולם!

כל אחד בעולם יכול עכשיו להתקין את הפקג' שלך:

```bash
npm install -g find-value-duplicates
```

---

## ❓ שאלות נפוצות

### ❌ השם "find-value-duplicates" כבר תפוס?

אם תקבל שגיאה שהשם כבר קיים:

1. חפש שם חדש: https://www.npmjs.com/search?q=find-value-duplicates
2. ערוך את `package.json` ושנה את שדה `"name"`
3. נסה שוב: `npm publish`

---

### ❌ "You must verify your email"?

1. בדוק את תיבת המייל שלך
2. לחץ על קישור האימות מ-npm
3. נסה שוב: `npm publish`

---

### ❌ "You need to auth first"?

פשוט הרץ שוב:
```bash
npm login
```

---

## 🔄 לעדכן גרסה בעתיד?

כשתרצה לפרסם עדכון:

```bash
# תיקון באג קטן (1.0.0 -> 1.0.1)
npm version patch

# פיצ'ר חדש (1.0.0 -> 1.1.0)
npm version minor

# שינוי גדול (1.0.0 -> 2.0.0)
npm version major
```

ואז:
```bash
npm publish
```

---

## 📚 קישורים שימושיים

- 📖 [README מלא](README.md)
- 🚀 [מדריך התחלה מהירה](QUICKSTART_HE.md)
- ✅ [רשימת בדיקות מלאה](PRE_PUBLISH_CHECKLIST.md)
- 📦 [הוראות פרסום מפורטות](PUBLISH_INSTRUCTIONS_HE.md)

---

<div align="center">

## ✅ סיכום - 3 פקודות בלבד!

```bash
npm login          # 1. התחבר
npm publish        # 2. פרסם
npm view find-value-duplicates  # 3. ודא
```

### **בהצלחה! 🎉🚀**

</div>

---

💡 **טיפ:** שמור את הקישור לפקג' שלך:
```
https://www.npmjs.com/package/find-value-duplicates
```

📊 **סטטיסטיקות:** תוכל לראות כמה הורדות יש לפקג' שלך באותו קישור!

---

<div align="center">

נוצר עבור **find-value-duplicates** 💙

</div>
