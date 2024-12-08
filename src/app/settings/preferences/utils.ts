
export const sectionsData = [
    {
        title: "התראות",
        description: "זה המקום שבו תקבלו התראות",
        preferences: [
            {
                title: "תזכורות",
                description: "אפשר קבלת התראות על תזכורות באימייל",
                isEnabled: false
            },
            {
                title: "מניניים",
                description: "קבל עידכונים על מניניים חדשים באזור שלך",
                isEnabled: true
            },
            {
                title: "אירועים",
                description: "קבל עדכונים על אירועים שמורים",
                isEnabled: false
            }
        ]
    },
    {
        title: "שמע",
        description: "פה תוכלו לשלוט בהגדרות השמע והקול",
        preferences: [
            {
                title: "שמע",
                description: "השמע קול בעת התראה",
                isEnabled: true
            }
        ]
    },
    {
        title: "הגדרת הפרטיות",
        description: "בחירת אופן השימוש שלנו בנתונים שלכם",
        preferences: [
            {
                title: "לאפשר לנתונים שלכם לשפר את ה-AI",
                description: "כשההגדרה במצב מופעל, CommUnity יאמנו את ה-AI בעזרת הנתונים שלכם",
                isEnabled: true
            },
            {
                title: "לאפשר לשימוש הכללי שלכם לשפר את ה-AI",
                description: "כשההגדרה במצב מופעל, CommUnity יאמנו את ה-AI בעזרת מידע על השימוש הכללי שלכם.",
                isEnabled: true
            }
        ]
    }
];