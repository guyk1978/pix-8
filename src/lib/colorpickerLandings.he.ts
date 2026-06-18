import type { ColorPickerLandingId } from "@/lib/colorpickerLandings";
import type {
  ColorPickerArticleLocale,
  ColorPickerLandingChrome,
  ColorPickerLandingLocaleEntry,
} from "@/lib/colorpickerLandingTypes";

export const COLOR_PICKER_CAPABILITIES_HE = [
  "טעינת תמונות מקומית מהמכשיר",
  "דגימת כל פיקסל עם תצוגה מקדימה במעבר עכבר ונעילה בלחיצה",
  "זכוכית מגדלת עם תצוגת קואורדינטות פיקסל",
  "העתקת ערכי HEX, RGB או HSL בלחיצה אחת",
  "עיבוד במכשיר — התמונות לא מועלות לשרת",
] as const;

export const COLOR_PICKER_LANDING_CHROME_HE: ColorPickerLandingChrome = {
  privacyNote: "עיבוד client-side בלבד — התמונה שלך לא עוזבת את הדפדפן.",
  relatedUseCasesHeading: "שימושים קשורים",
  guidesHeading: "מדריכים",
  toolCardTitle: "כלי דגימת הצבע",
  toolCardExcerpt:
    "פתחו את סביבת העבודה — דגמו פיקסלים והעתיקו HEX, RGB או HSL מקומית.",
};

export const COLOR_PICKER_ARTICLE_HE: ColorPickerArticleLocale = {
  href: "/articles/precision-color-picking",
  title: "דגימת צבע מדויקת: התאמה מושלמת למותג שלכם",
  excerpt:
    "למדו איך לדגום ערכי HEX ו-RGB מדויקים מכל תמונה כדי לשמור על הרמוניה מושלמת ברכיבי העיצוב.",
};

export const COLOR_PICKER_LANDINGS_HE: Record<
  ColorPickerLandingId,
  ColorPickerLandingLocaleEntry
> = {
  "image-color-picker-online": {
    id: "image-color-picker-online" as ColorPickerLandingId,
    path: "/image-color-picker-online",
    linkTitle: "דוגם צבע לתמונה אונליין",
    linkExcerpt:
      "דוגם צבע לתמונה אונליין בדפדפן — HEX, RGB, HSL לפיקסל, client-side, ללא העלאה.",
    seo: {
      title: "דוגם צבע לתמונה אונליין",
      description:
        "דוגם צבע לתמונה אונליין בדפדפן. דגימת כל פיקסל ל-HEX, RGB ו-HSL במכשיר — ללא העלאה, ללא שרת. Color Picker פרטי client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "האם דוגם הצבע לתמונה אונליין מעלה את התמונות לשרת?",
        answer:
          "לא. Color Picker של Pix-8 רץ כולו בדפדפן. התמונה נקראת מקומית, מצוירת על קנבס client-side ונדגמת במכשיר במעבר עכבר או בלחיצה. היא לא נשלחת ל-Pix-8 או לשרת צד שלישי.",
      },
      {
        question: "באילו פורמטים אפשר להעתיק מהדוגם האונליין?",
        answer:
          "Color Picker מציג ומעתיק ערכי HEX, RGB ו-HSL לפיקסל שנדגם. מעבר עכבר לתצוגה מקדימה חיה, ואז לחיצה לנעילת הדגימה לפני ההעתקה. הכלי לא מחלץ פלטות דומיננטיות אוטומטית מהתמונה כולה — לדוגמיות מדורגות, השתמשו ב-Palette Extractor של Pix-8. הוא לא מייצא משתני CSS או טוקני JSON.",
      },
      {
        question: "מה ההבדל ממחלץ פלטות או מפיפטה ביישומי שולחן עבודה?",
        answer:
          "Color Picker דוגם פיקסל אחד בכל פעם עם זכוכית מגדלת ותצוגת קואורדינטות — מתאים להתאמת גוון לוגו או הדגשת UI בדיוק. Palette Extractor מדרג עד שישה צבעים דומיננטיים אוטומטית על פני התמונה. Color Picker מעבד תמונה אחת לכל סשן בלשונית הדפדפן ולא דוגם תיקיות באצווה ולא משתלב בקבצי עיצוב.",
      },
    ],
    eyebrow: "אונליין · client-side · ללא העלאה",
    titleMain: "דוגם צבע לתמונה אונליין",
    titleAccent: "HEX, RGB, HSL ברמת פיקסל",
    heroSubtitle:
      "השתמשו בדוגם צבע לתמונה אונליין בדפדפן — ללא העלאה, ללא חשבון, ללא תור בענן. טענו תמונה מקומית, עברו עם העכבר לתצוגה מקדימה של כל פיקסל, לחצו לנעילת דגימה, והעתיקו HEX, RGB או HSL במכשיר בלי לשלוח את הקובץ לשרת.",
    primaryCta: "דגימת צבעים — בחינם",
    ctaNote: "ללא העלאה · ללא שרת · דגימת פיקסל",
    capabilities: COLOR_PICKER_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "דגימת פיקסל במכשיר — לא מחלץ פלטות בענן",
      body: "Color Picker של Pix-8 קורא את התמונה על קנבס client-side ודוגם את הפיקסל המדויק מתחת לסמן — לא שירות מרוחק שמעלה קבצים קודם או מדרג צבעים דומיננטיים אוטומטית. זכוכית מגדלת מציגה קואורדינטות פיקסל ורשת מוגדלת לפני שנועלים דגימה ומעתיקים HEX, RGB או HSL. הכלי לא מחלץ פלטות רב-צבעיות — לכך, השתמשו ב-Palette Extractor של Pix-8.",
    },
    benefitsHeading: "למה דוגם צבע לתמונה אונליין בדפדפן?",
    benefitsIntro:
      "כלי צבע בענן לעיתים דורשים העלאת תמונת רפרנס לפני שאפשר לדגום פיקסל אחד. Pix-8 מעבד מקומית — ההתאמה הישירה כשצריך ",
    benefitsKeyword: "דוגם צבע לתמונה אונליין",
    benefitsIntroAfter:
      " להתאמת לוגו, הדגשות UI ועקביות מותג בלי להעביר קבצים מחוץ למכשיר.",
    benefits: [
      {
        title: "דיוק ברמת פיקסל",
        body: "מעבר עכבר לתצוגה מקדימה חיה, לחיצה לנעילה והעתקת ערך HEX, RGB או HSL מדויק מהפיקסל שנדגם — עם תצוגת קואורדינטות.",
      },
      {
        title: "מגדלת לפרטים עדינים",
        body: "זכוכית מגדלת מוגדלת עם רשת פיקסלים עוזרת לכוון לטקסט קטן, קצוות אייקונים וארטיפקטי דחיסה לפני שמאשרים דגימה.",
      },
      {
        title: "client-side כברירת מחדל",
        body: "התמונה מפוענחת ונדגמת בלשונית הדפדפן. Pix-8 לא מקבל את נתוני הפיקסלים במעבר עכבר, לחיצה או העתקה.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את Color Picker",
        body: "נווטו ל-Color Picker של Pix-8 בדפדפן — ללא התקנה, ללא חשבון וללא דיאלוג העלאה לפני הדגימה.",
      },
      {
        title: "טענו ועברו עם העכבר",
        body: "בחרו תמונה מהמכשיר. הזיזו את הסמן על התמונה לתצוגה מקדימה של ערכי צבע עם זכוכית המגדלת.",
      },
      {
        title: "לחצו והעתיקו",
        body: "לחצו לנעילת דגימה, ואז העתיקו HEX, RGB או HSL ללוח — תמונה אחת לכל סשן, כולו במכשיר.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים לדגום צבעים בלי להעלות?",
      body: "פתחו את Color Picker, טענו תמונה מקומית והעתיקו ערכי פיקסל מדויקים — בפרטיות, כולו במכשיר.",
      button: "פתחו את Color Picker",
    },
  },
};
