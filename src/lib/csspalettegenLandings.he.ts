import type { CssPaletteGenLandingId } from "@/lib/csspalettegenLandings";
import type {
  CssPaletteGenArticleLocale,
  CssPaletteGenLandingChrome,
  CssPaletteGenLandingLocaleEntry,
} from "@/lib/csspalettegenLandingTypes";

export const CSS_PALETTE_GEN_CAPABILITIES_HE = [
  "טעינת תמונות מקומית מהמכשיר",
  "חילוץ עד חמישה צבעים דומיננטיים עם תוויות תפקיד",
  "ייצוא CSS variables, SCSS, JSON או Tailwind config",
  "העתקת פלטה מוכנה לקוד בלחיצה אחת",
  "עיבוד במכשיר — התמונה לא מועלית לשרת",
] as const;

export const CSS_PALETTE_GEN_LANDING_CHROME_HE: CssPaletteGenLandingChrome = {
  privacyNote:
    "התמונה נשארת במכשיר שלכם. חילוץ הצבעים והפקת קוד CSS מתבצעים בדפדפן — ללא העלאה לשרת.",
  relatedUseCasesHeading: "מקרי שימוש נוספים",
  guidesHeading: "מדריכים",
  toolCardTitle: "מחולל פלטות CSS",
  toolCardExcerpt:
    "העלו תמונה, קבלו עד חמישה צבעים דומיננטיים עם תוויות תפקיד, והעתיקו CSS variables, SCSS, JSON או Tailwind — בדפדפן.",
};

export const CSS_PALETTE_GEN_ARTICLE_HE: CssPaletteGenArticleLocale = {
  href: "/articles/image-to-css-palette",
  title: "מפיקסל לקוד: יצירת פלטות CSS מתמונות",
  excerpt:
    "הפסיקו לנחש קודי hex. למדו איך לחלץ פלטות CSS מקצועיות מכל תמונה מיד לפרויקטי הרשת שלכם.",
};

export const CSS_PALETTE_GEN_LANDINGS_HE: Record<
  CssPaletteGenLandingId,
  CssPaletteGenLandingLocaleEntry
> = {
  "css-color-palette-from-photo": {
    id: "css-color-palette-from-photo" as CssPaletteGenLandingId,
    path: "/css-color-palette-from-photo",
    linkTitle: "פלטת CSS מתמונה",
    linkExcerpt:
      "פלטת צבעי CSS מתמונה בדפדפן — variables, SCSS, JSON, Tailwind, מקומי.",
    seo: {
      title: "פלטת צבעי CSS מתמונה",
      description:
        "פלטת צבעי CSS מתמונה בדפדפן. הפיקו CSS variables, SCSS, JSON או Tailwind מחמישה צבעים דומיננטיים במכשיר — ללא העלאה, ללא שרת. מחולל פלטות CSS מקומי של Pix-8.",
    },
    faq: [
      {
        question:
          "האם אפשר ליצור פלטת צבעי CSS מתמונה בלי להעלות אותה לשרת?",
        answer:
          "כן. מחולל פלטות CSS של Pix-8 פועל לחלוטין בדפדפן. התמונה נקראת מקומית, מנותחת על canvas בצד הלקוח, ומומרת לעד חמישה צבעים דומיננטיים עם תוויות תפקיד במכשיר. היא לא נשלחת ל-Pix-8 או לשרת צד שלישי.",
      },
      {
        question: "אילו פורמטי קוד מייצא מחולל הפלטות?",
        answer:
          "מחולל פלטות CSS מייצא snippets מוכנים להעתקה כ-CSS custom properties (:root variables), משתני SCSS, אובייקט JSON של פלטה, או בלוק Tailwind theme.extend colors. כל דוגמה מתויגת בתפקיד סמנטי — dominant, secondary, accent, muted או surface. הכלי לא מייצא טוקנים של Figma, תיעוד design system, או תיקיות באצ'ים.",
      },
      {
        question:
          "מה ההבדל בין זה ל-Palette Extractor או Color Picker?",
        answer:
          "מחולל פלטות CSS הופך תמונה לטוקני פלטה מוכנים לקוד — CSS, SCSS, JSON או Tailwind — עם תוויות תפקיד סמנטיות. Palette Extractor מציג עד שישה HEX דומיננטיים ללא ייצוא קוד. Color Picker דוגם פיקסלים בודדים עם זכוכית מגדלת. מחולל פלטות CSS מעבד תמונה אחת לכל סשן בטאב הדפדפן.",
      },
    ],
    eyebrow: "אונליין · מקומי · ללא העלאה",
    titleMain: "פלטת צבעי CSS מתמונה",
    titleAccent: "CSS variables, SCSS, JSON, Tailwind",
    heroSubtitle:
      "צרו פלטת צבעי CSS מתמונה בדפדפן — ללא העלאה, ללא חשבון, ללא תור בענן. העלו תמונה מקומית, קבלו עד חמישה צבעים דומיננטיים עם תוויות תפקיד, והעתיקו snippet מוכן ל-CSS variables, SCSS, JSON או Tailwind — הכל במכשיר.",
    primaryCta: "צרו פלטת CSS — בחינם",
    ctaNote: "ללא העלאה · ללא שרת · קוד מוכן",
    capabilities: [...CSS_PALETTE_GEN_CAPABILITIES_HE],
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "מתמונה לקוד — לא מחלץ HEX בלבד",
      body: "Pix-8 CSS Palette Generator קורא את התמונה על canvas מקומי וממפה את הצבעים הבולטים לתפקידים סמנטיים — dominant, secondary, accent ועוד — ואז מייצא snippet מוכן להדבקה. זה לא שירות ענן שמעלה קבצים, ולא מחלץ שמציג HEX בלבד. לדגימת פיקסל בודד השתמשו ב-Color Picker; לשישה HEX ללא קוד — ב-Palette Extractor.",
    },
    benefitsHeading: "למה ליצור פלטת צבעי CSS מתמונה בדפדפן?",
    benefitsIntro:
      "כלי ענן רבים דורשים העלאת התמונה לפני שמקבלים קוד. Pix-8 מעבד מקומית — הפתרון הישיר כשצריך ",
    benefitsKeyword: "פלטת צבעי CSS מתמונה",
    benefitsIntroAfter:
      " לפרויקט UI, design tokens, או Tailwind theme — בלי לשלוח קבצים מהמכשיר.",
    benefits: [
      {
        title: "קוד מוכן להדבקה",
        body: "העתיקו CSS variables, SCSS, JSON או Tailwind config — לא רק רשימת HEX.",
      },
      {
        title: "תפקידים סמנטיים",
        body: "כל צבע מתויג dominant, secondary, accent, muted או surface — מבנה ברור לעיצוב.",
      },
      {
        title: "מקומי כברירת מחדל",
        body: "התמונה מפוענחת ומנותחת בטאב הדפדפן. Pix-8 לא מקבל את הנתונים במהלך חילוץ או העתקה.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו מחולל פלטות CSS",
        body: "עברו ל-CSS Palette Generator בדפדפן — ללא התקנה, ללא חשבון, וללא דיאלוג העלאה לפני החילוץ.",
      },
      {
        title: "העלו תמונה",
        body: "בחרו תמונה מהמכשיר. הכלי מזהה עד חמישה צבעים דומיננטיים ומתייג אותם בתפקידים סמנטיים.",
      },
      {
        title: "בחרו פורמט והעתיקו",
        body: "בחרו CSS, SCSS, JSON או Tailwind והעתיקו את ה-snippet ללוח — תמונה אחת לכל סשן, לחלוטין במכשיר.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים לפלטת CSS מהתמונה?",
      body: "פתחו את מחולל פלטות CSS, העלו תמונה, והעתיקו קוד מוכן — בפרטיות, לחלוטין במכשיר.",
      button: "פתחו מחולל פלטות CSS",
    },
  },
};
