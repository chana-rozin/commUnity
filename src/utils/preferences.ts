import { NotificationPreference, PreferenceSection } from "../types/PreferencesPage.type";
import {Preference} from '@/types/general.type'
import { User } from "@/types/user.type";

export const sectionsData: { title: string; description: string; preferences: NotificationPreference[] }[] = [
    {
        title: "התראות",
        description: "זה המקום שבו תקבלו התראות",
        preferences: [
            {
                title: "תזכורות",
                description: "אפשר קבלת התראות על תזכורות באימייל",
                fieldName: "email_notifications",  // Should be a key of Preference
                isEnabled: false
            },
            {
                title: "מניינים",
                description: "קבל עידכונים על מניינים חדשים באזור שלך",
                fieldName: "minyan_notifications", // Should be a key of Preference
                isEnabled: false
            },
            {
                title: "אירועים",
                description: "קבל עדכונים על אירועים שמורים",
                fieldName: "event_notifications", // Should be a key of Preference
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
                fieldName: "sound_alerts", // Should be a key of Preference
                isEnabled: false
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
                fieldName: "ai_training_data", // Should be a key of Preference
                isEnabled: false
            },
            {
                title: "לאפשר לשימוש הכללי שלכם לשפר את ה-AI",
                description: "כשההגדרה במצב מופעל, CommUnity יאמנו את ה-AI בעזרת מידע על השימוש הכללי שלכם.",
                fieldName: "general_usage_data", // Should be a key of Preference
                isEnabled: false
            }
        ]
    }
];

export const getPreferencesObj = (sections: { preferences: NotificationPreference[] }[]) => {
    return sections.reduce((acc, section) => {
        section.preferences.forEach(preference => {
            acc[preference.fieldName] = preference.isEnabled;
        });
        return acc;
    }, {} as Preference);
};

export const setSectionsPreferences = (user: User, sections: PreferenceSection[]) => {
    return sections.map(section => {
        return {
            ...section,
            preferences: section.preferences.map(preference => {
                return {
                    ...preference,
                    isEnabled: user.preferences[preference.fieldName as keyof Preference] ?? preference.isEnabled
                };
            })
        };
    });
};
