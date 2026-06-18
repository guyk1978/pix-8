import type { FaviconGeneratorLandingId } from "@/lib/favicongeneratorLandings";
import type {
  FaviconGeneratorArticleLocale,
  FaviconGeneratorLandingChrome,
  FaviconGeneratorLandingLocaleEntry,
} from "@/lib/favicongeneratorLandingTypes";

export const FAVICON_GENERATOR_CAPABILITIES_HE = [
  "טעינת תמונות מקומית מהמכשיר",
  "תצוגה מקדימה ב-16×16, 32×32 ו-48×48 לפני הייצוא",
  "ייצוא favicon.ico מרובה גדלים או PNG בגודל 32×32",
  "התאמת זום למסגור ברור באייקונים קטנים",
  "עיבוד במכשיר — התמונה לא מועלית לשרת",
] as const;

export const FAVICON_GENERATOR_LANDING_CHROME_HE: FaviconGeneratorLandingChrome =
  {
    privacyNote: "עיבוד client-side בלבד — התמונה שלך לא עוזבת את הדפדפן.",
    relatedUseCasesHeading: "שימושים קשורים",
    guidesHeading: "מדריכים",
    toolCardTitle: "מחולל Favicon",
    toolCardExcerpt:
      "פתחו את סביבת העבודה — תצוגה מקדימה של אייקוני לשונית וייצוא ICO או PNG מקומית.",
  };

export const FAVICON_GENERATOR_ARTICLE_HE: FaviconGeneratorArticleLocale = {
  href: "/articles/favicon-generator",
  title: "מיתוג הדפדפן: החשיבות של Favicon מותאם אישית",
  excerpt:
    "למדו למה favicon חיוני לזהות המותג שלכם ואיך ליצור אחד בקלות מכל תמונה.",
};

/** Add Hebrew landing entries here when new Favicon Generator landing IDs are added. */
export const FAVICON_GENERATOR_LANDINGS_HE: Record<
  FaviconGeneratorLandingId,
  FaviconGeneratorLandingLocaleEntry
> = {
  "favicon-generator-online": {
    id: "favicon-generator-online" as FaviconGeneratorLandingId,
    path: "/favicon-generator-online",
    linkTitle: "מחולל favicon אונליין",
    linkExcerpt:
      "מחולל favicon אונליין בדפדפן — ICO או PNG, תצוגה 16–48px, client-side, ללא העלאה.",
    seo: {
      title: "מחולל Favicon אונליין",
      description:
        "מחולל favicon אונליין בדפדפן. תצוגה מקדימה ב-16×16, 32×32 ו-48×48, ואז ייצוא favicon.ico או PNG במכשיר — ללא העלאה, ללא שרת. Favicon Generator פרטי client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "האם מחולל ה-favicon האונליין מעלה את הלוגו לשרת?",
        answer:
          "לא. Favicon Generator של Pix-8 רץ כולו בדפדפן. התמונה נקראת מקומית, מצוירת על קנבס client-side ומיוצאת במכשיר. היא לא נשלחת ל-Pix-8 או לשרת צד שלישי.",
      },
      {
        question: "באילו פורמטים וגדלים אפשר לייצא?",
        answer:
          "Favicon Generator מציג תצוגה מקדימה ב-16×16, 32×32 ו-48×48 פיקסלים. אפשר להוריד favicon.ico מרובה גדלים (16, 32 ו-48 משולבים) או PNG בגודל 32×32. הכלי לא מייצר Apple touch icons, web app manifests או חבילות נכסי PWA נוספות.",
      },
      {
        question: "מה ההבדל מעורך אייקונים בשולחן עבודה או שירות favicon בענן?",
        answer:
          "Pix-8 מעבד תמונת מקור אחת לכל סשן בלשונית הדפדפן, עם מחוון זום למסגור הריבוע המרכזי לפני הייצוא — ללא התקנה וללא חשבון. כלי favicon בענן בדרך כלל דורשים העלאת לוגו קודם. Favicon Generator לא ממיר תיקיות באצווה, לא עוקב וקטורים ולא משנה גודל לנכסי תמונה לא קשורים.",
      },
    ],
    eyebrow: "אונליין · client-side · ללא העלאה",
    titleMain: "מחולל favicon אונליין",
    titleAccent: "ICO או PNG, מוכן לדפדפן",
    heroSubtitle:
      "השתמשו במחולל favicon אונליין בדפדפן — ללא העלאה, ללא חשבון, ללא תור בענן. טענו לוגו מקומית, צפו איך הוא נראה ב-16×16, 32×32 ו-48×48, התאימו מסגור זום, וייצאו favicon.ico או PNG במכשיר בלי לשלוח את הקובץ לשרת.",
    primaryCta: "יצירת favicon — בחינם",
    ctaNote: "ללא העלאה · ללא שרת · תצוגת לשונית",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "ייצוא במכשיר — לא ממיר אייקונים בענן",
      body: "Favicon Generator של Pix-8 מצייר את תמונת המקור על קנבס client-side עם חיתוך ריבוע מרכזי ושליטת זום — לא שירות מרוחק ששומר את הלוגו קודם. תצוגות חיות מראות איך הסימן נקרא בלשונית דפדפן לפני הורדת favicon.ico (16, 32 ו-48 px) או PNG בגודל 32×32. הכלי לא בונה manifests ל-PWA או סטי Apple touch icon.",
    },
    benefitsHeading: "למה מחולל favicon אונליין בדפדפן?",
    benefitsIntro:
      "כלי favicon בענן לעיתים דורשים העלאת לוגו לפני שאפשר לראות גודל לשונית אחד. Pix-8 מעבד מקומית — ההתאמה הישירה כשצריך ",
    benefitsKeyword: "מחולל favicon אונליין",
    benefitsIntroAfter:
      " להשקות אתר, דומיינים בסטייג'ינג ומסירת לקוחות בלי להעביר נכסי מותג מחוץ למכשיר.",
    benefits: [
      {
        title: "תצוגה בגודל לשונית לפני ייצוא",
        body: "צפו בתצוגות 16×16, 32×32 ו-48×48 ובמוקאפ לשונית דפדפן כדי לשפוט קריאות לפני ההורדה.",
      },
      {
        title: "מסגור זום לאייקונים קטנים",
        body: "מחוון זום מצמצם את חיתוך הריבוע המרכזי כדי שסימני אותיות ולוגואים יישארו חדים בקנה מידת favicon.",
      },
      {
        title: "client-side כברירת מחדל",
        body: "התמונה מפוענחת ומיוצאת בלשונית הדפדפן. Pix-8 לא מקבל את הקובץ במהלך תצוגה מקדימה או הורדה.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את Favicon Generator",
        body: "נווטו ל-Favicon Generator של Pix-8 בדפדפן — ללא התקנה, ללא חשבון וללא דיאלוג העלאה לפני התצוגה המקדימה.",
      },
      {
        title: "טענו ומסגרו",
        body: "בחרו תמונה מהמכשיר. התאימו זום למרכז הסימן, ואז בדקו תצוגות לשונית ובגדלים 16, 32 ו-48 פיקסלים.",
      },
      {
        title: "ייצאו ICO או PNG",
        body: "בחרו favicon.ico או PNG, ואז הורידו — תמונת מקור אחת לכל סשן, כולו במכשיר.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים ליצור favicon בלי להעלות?",
      body: "פתחו את Favicon Generator, טענו לוגו מקומי, צפו בגדלי לשונית וייצאו ICO או PNG — בפרטיות, כולו במכשיר.",
      button: "פתחו את Favicon Generator",
    },
  },
  "create-favicon-from-image": {
    id: "create-favicon-from-image" as FaviconGeneratorLandingId,
    path: "/create-favicon-from-image",
    linkTitle: "יצירת favicon מתמונה",
    linkExcerpt:
      "יצירת favicon מכל תמונה בדפדפן — חיתוך ריבוע, ICO או PNG, client-side, ללא העלאה.",
    seo: {
      title: "יצירת Favicon מתמונה",
      description:
        "יצירת favicon מכל תמונה בדפדפן. טעינת לוגו או תמונה מקומית, תצוגה מקדימה ב-16×16 עד 48×48, וייצוא favicon.ico או PNG במכשיר — ללא העלאה, ללא שרת. Favicon Generator פרטי client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "האם אפשר ליצור favicon מתמונה בלי להעלות אותה?",
        answer:
          "כן. Favicon Generator של Pix-8 קורא את התמונה מקומית בדפדפן, חותך לריבוע מרכזי עם מחוון זום מתכוונן, ומייצא קבצי favicon במכשיר. תמונת המקור לא נשלחת ל-Pix-8 או לשרת צד שלישי.",
      },
      {
        question: "אילו סוגי תמונה מתאימים כמקור ל-favicon?",
        answer:
          "Favicon Generator מקבל פורמטים רסטריים שהדפדפן יודע לפענח — בדרך כלל PNG, JPEG ו-WebP. הכלי חותך לריבוע ומציג תצוגה מקדימה ב-16×16, 32×32 ו-48×48. הוא לא עוקב וקטורים ממקור SVG ולא ממיר מספר קבצים באצווה.",
      },
      {
        question: "מה מתקבל בייצוא?",
        answer:
          "אפשר להוריד favicon.ico מרובה גדלים (16, 32 ו-48 px משולבים) או PNG בגודל 32×32. תצוגת לשונית דפדפן עוזרת לשפוט קריאות לפני הייצוא. Favicon Generator לא מייצר Apple touch icons, manifests לאתר או גדלי נכסי PWA נוספים.",
      },
    ],
    eyebrow: "מתמונה · client-side · ללא העלאה",
    titleMain: "יצירת favicon מתמונה",
    titleAccent: "כל לוגו או תמונה, מקומית",
    heroSubtitle:
      "צרו favicon מכל תמונה בדפדפן — ללא העלאה, ללא חשבון, ללא תור בענן. טענו PNG, JPEG או WebP מהמכשיר, מסגרו את הריבוע המרכזי עם זום, צפו בגדלי לשונית מ-16×16 עד 48×48, וייצאו favicon.ico או PNG במכשיר בלי לשלוח את קובץ המקור לשרת.",
    primaryCta: "יצירת favicon — בחינם",
    ctaNote: "ללא העלאה · ללא שרת · תמונה ל-ICO/PNG",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "מתמונה ל-favicon במכשיר — לא ממיר מתארח",
      body: "Favicon Generator של Pix-8 הופך תמונת רסטר בודדת לקבצי אייקון מוכנים לדפדפן באמצעות קנבס client-side, חיתוך ריבוע מרכזי ושליטת זום — לא צינור מרוחק ששומר את הלוגו קודם. תצוגות לשונית וגודל מראות קריאות לפני ההורדה. הכלי לא עוקב וקטורים, לא משנה גודל לנכסים לא קשורים ולא מייצר חבילות אייקון PWA מלאות.",
    },
    benefitsHeading: "למה ליצור favicon מתמונה בדפדפן?",
    benefitsIntro:
      "ממירים מתארחים לעיתים דורשים העלאת תמונת מקור לפני ייצוא. Pix-8 מעבד מקומית — הנתיב הישיר כשצריך ",
    benefitsKeyword: "ליצור favicon מתמונה",
    benefitsIntroAfter:
      " לדומיין חדש, אתר סטייג'ינג או פרויקט לקוח בלי להעביר קבצי מותג מחוץ למכשיר.",
    benefits: [
      {
        title: "כל תמונת רסטר כמקור",
        body: "התחילו מלוגו, אייקון אפליקציה או תמונה שהדפדפן מפענח — ואז חתכו למסגרת favicon ריבועית עם שליטת זום.",
      },
      {
        title: "בדיקת קריאות בגדלים אמיתיים",
        body: "תצוגה מקדימה ב-16×16, 32×32 ו-48×48 ובמוקאפ לשונית לפני שמחליטים על favicon.ico או PNG.",
      },
      {
        title: "client-side כברירת מחדל",
        body: "פענוח, חיתוך וייצוא רצים בלשונית הדפדפן. Pix-8 לא מקבל את תמונת המקור במהלך תצוגה מקדימה או הורדה.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את Favicon Generator",
        body: "נווטו ל-Favicon Generator של Pix-8 בדפדפן — ללא התקנה, ללא חשבון וללא שלב העלאה לפני טעינת תמונה.",
      },
      {
        title: "טענו את התמונה",
        body: "בחרו קובץ מהמכשיר. התאימו זום למרכז הסימן בחיתוך הריבוע, ואז בדקו תצוגות לשונית וגודל פיקסלים.",
      },
      {
        title: "הורידו ICO או PNG",
        body: "בחרו favicon.ico או PNG ושמרו — תמונת מקור אחת לכל סשן, מיוצאת כולה במכשיר.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים להפוך תמונה ל-favicon?",
      body: "פתחו את Favicon Generator, טענו תמונה מקומית, צפו בגדלי לשונית וייצאו ICO או PNG — בפרטיות, כולו במכשיר.",
      button: "פתחו את Favicon Generator",
    },
  },
  "free-favicon-maker": {
    id: "free-favicon-maker" as FaviconGeneratorLandingId,
    path: "/free-favicon-maker",
    linkTitle: "יוצר favicon חינם",
    linkExcerpt:
      "יוצר favicon חינם בדפדפן — ללא חשבון, ייצוא ICO או PNG, client-side, ללא העלאה.",
    seo: {
      title: "יוצר Favicon חינם",
      description:
        "יוצר favicon חינם בדפדפן. ללא חשבון, ללא העלאה — טעינת תמונה מקומית, תצוגה מקדימה ב-16×16 עד 48×48, וייצוא favicon.ico או PNG במכשיר. Favicon Generator פרטי client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "האם יוצר ה-favicon באמת חינם?",
        answer:
          "כן. Favicon Generator של Pix-8 חינם לפתיחה בדפדפן — ללא חשבון, מנוי או מגבלת ייצוא. העיבוד רץ client-side במכשיר. Pix-8 לא גובה תשלום להורדה ולא חוסם ייצוא ICO ו-PNG מאחורי paywall.",
      },
      {
        question: "האם היוצר החינמי מעלה את הלוגו?",
        answer:
          "לא. התמונה נקראת מקומית, מצוירת על קנבס client-side ומיוצאת במכשיר. היא לא נשלחת ל-Pix-8 או לשרת צד שלישי. אין תור בענן ואין שלב אחסון מתארח.",
      },
      {
        question: "מה אפשר לייצא עם היוצר החינמי?",
        answer:
          "אפשר לצפות בתצוגה מקדימה ב-16×16, 32×32 ו-48×48, ואז להוריד favicon.ico מרובה גדלים או PNG בגודל 32×32. מחוון זום עוזר למסגר את הריבוע המרכזי. היוצר החינמי לא מייצר Apple touch icons, web app manifests ולא ממיר מספר קבצים באצווה.",
      },
    ],
    eyebrow: "חינם · client-side · ללא העלאה",
    titleMain: "יוצר favicon חינם",
    titleAccent: "ללא חשבון, ללא paywall",
    heroSubtitle:
      "השתמשו ביוצר favicon חינם בדפדפן — ללא מנוי, ללא העלאה, ללא קרדיטי ייצוא. טענו תמונה מקומית, צפו באייקוני לשונית ב-16×16, 32×32 ו-48×48, התאימו מסגור זום, והורידו favicon.ico או PNG במכשיר בלי לשלוח את הקובץ לשרת.",
    primaryCta: "יצירת favicon — בחינם",
    ctaNote: "ללא חשבון · ללא שרת · ייצוא חינם",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "חינם ובמכשיר — לא ממיר ענן freemium",
      body: "Favicon Generator של Pix-8 חינם לשימוש בדפדפן עם רינדור client-side, חיתוך ריבוע מרכזי ותצוגות גודל לשונית — לא יוצר מתארח שמעלה לוגו קודם או מגביל ייצוא אלא אם משדרגים. הורידו favicon.ico (16, 32 ו-48 px) או PNG ללא חשבון. הכלי לא מוכר חבילות אייקון, manifests ל-PWA או המרת תיקיות באצווה.",
    },
    benefitsHeading: "למה יוצר favicon חינם בדפדפן?",
    benefitsIntro:
      "יוצרים רבים מפרסמים חינם אבל דורשים חשבון או העלאה לפני ייצוא. Pix-8 רץ מקומית — האפשרות הישירה כשצריך ",
    benefitsKeyword: "יוצר favicon חינם",
    benefitsIntroAfter:
      " לאתר אישי, פרויקט צד או אב-טיפוס ללקוח — בלי חיכוך מנוי ובלי להעביר קבצים מחוץ למכשיר.",
    benefits: [
      {
        title: "ללא חשבון או paywall",
        body: "פתחו את הכלי, טענו תמונה וייצאו ICO או PNG — ללא הרשמה, מנוי או תשלום להורדה.",
      },
      {
        title: "תצוגה מקדימה לפני ייצוא",
        body: "בדקו גדלים 16×16, 32×32 ו-48×48 ובמוקאפ לשונית כדי לייצא פעם אחת בביטחון.",
      },
      {
        title: "client-side כברירת מחדל",
        body: "רינדור וייצוא מתבצעים בלשונית הדפדפן. Pix-8 לא מקבל את התמונה במהלך תצוגה מקדימה או הורדה.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את היוצר החינמי",
        body: "נווטו ל-Favicon Generator של Pix-8 בדפדפן — ללא התקנה, ללא חשבון וללא שלב תשלום.",
      },
      {
        title: "טענו וצפו בתצוגה",
        body: "בחרו תמונה מהמכשיר. התאימו זום, ואז בדקו תצוגות לשונית וגודל פיקסלים ב-16, 32 ו-48.",
      },
      {
        title: "ייצאו ללא עלות",
        body: "הורידו favicon.ico או PNG — תמונת מקור אחת לכל סשן, מעובדת כולה במכשיר.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים ליצור favicon בחינם?",
      body: "פתחו את Favicon Generator, טענו תמונה מקומית, צפו בגדלי לשונית וייצאו ICO או PNG — בפרטיות, כולו במכשיר, ללא עלות.",
      button: "פתחו את Favicon Generator",
    },
  },
  "convert-image-to-favicon": {
    id: "convert-image-to-favicon" as FaviconGeneratorLandingId,
    path: "/convert-image-to-favicon",
    linkTitle: "המרת תמונה ל-favicon",
    linkExcerpt:
      "המרת תמונה ל-favicon בדפדפן — פלט ICO או PNG, תצוגה 16–48px, client-side, ללא העלאה.",
    seo: {
      title: "המרת תמונה ל-Favicon",
      description:
        "המרת תמונה ל-favicon בדפדפן. טעינת PNG, JPEG או WebP מקומית, תצוגה מקדימה ב-16×16 עד 48×48, וייצוא favicon.ico או PNG במכשיר — ללא העלאה, ללא שרת. Favicon Generator פרטי client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "איך ממירים תמונה ל-favicon בלי להעלות אותה?",
        answer:
          "פתחו את Favicon Generator של Pix-8 בדפדפן, טענו תמונה מהמכשיר, והכלי חותך לריבוע מרכזי עם מחוון זום מתכוונן. תצוגות מקדימות ב-16×16, 32×32 ו-48×48 לפני הורדת favicon.ico או PNG — הכל במכשיר. הקובץ לא נשלח ל-Pix-8 או לשרת צד שלישי.",
      },
      {
        question: "אילו פורמטי פלט נותנת ההמרה?",
        answer:
          "אפשר לייצא favicon.ico מרובה גדלים עם 16, 32 ו-48 px משולבים, או PNG בגודל 32×32. תצוגת לשונית דפדפן עוזרת לבדוק קריאות אחרי ההמרה. Favicon Generator לא מייצר favicons ב-SVG, Apple touch icons או קבצי web app manifest.",
      },
      {
        question: "האם אפשר להמיר מספר תמונות או קבצי SVG בבת אחת?",
        answer:
          "לא. Favicon Generator ממיר תמונת רסטר אחת לכל סשן בדפדפן — בדרך כלל PNG, JPEG או WebP שהדפדפן מפענח. הכלי לא ממיר תיקיות באצווה, לא עוקב אחר artwork ב-SVG ל-favicon ולא משנה גודל לנכסים לא קשורים בכמות.",
      },
    ],
    eyebrow: "המרה · client-side · ללא העלאה",
    titleMain: "המרת תמונה ל-favicon",
    titleAccent: "ICO או PNG, במכשיר",
    heroSubtitle:
      "המירו תמונה ל-favicon בדפדפן — ללא העלאה, ללא חשבון, ללא תור בענן. טענו PNG, JPEG או WebP מקומית, מסגרו את הריבוע המרכזי עם זום, צפו בגדלי לשונית מ-16×16 עד 48×48, וייצאו favicon.ico או PNG במכשיר בלי לשלוח את קובץ המקור לשרת.",
    primaryCta: "המרה ל-favicon — בחינם",
    ctaNote: "ללא העלאה · ללא שרת · תמונה ל-ICO/PNG",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "המרה מתמונה ל-favicon במכשיר — לא צינור מתארח",
      body: "Favicon Generator של Pix-8 ממיר תמונת רסטר בודדת לקבצי אייקון מוכנים לדפדפן באמצעות קנבס client-side, חיתוך ריבוע מרכזי ושליטת זום — לא ממיר מרוחק ששומר את הלוגו קודם. תצוגות לשונית וגודל מאשרות קריאות לפני ייצוא. הכלי לא עוקב וקטורים, לא מייצא favicons ב-SVG ולא מייצר סטי אייקון PWA מלאים.",
    },
    benefitsHeading: "למה להמיר תמונה ל-favicon בדפדפן?",
    benefitsIntro:
      "ממירים מתארחים לעיתים מעלים את קובץ המקור לפני ייצור favicon.ico. Pix-8 מעבד מקומית — ההתאמה הישירה כשצריך ",
    benefitsKeyword: "להמיר תמונה ל-favicon",
    benefitsIntroAfter:
      " לפריסת אתר, עדכון CMS או פרויקט סטטי בלי להעביר נכסי מותג מחוץ למכשיר.",
    benefits: [
      {
        title: "רסטר נכנס, favicon יוצא",
        body: "טענו לוגו או תמונה שהדפדפן מפענח, חתכו למסגרת ריבועית וייצאו ICO או PNG בגודל מתאים ללשוניות דפדפן.",
      },
      {
        title: "תצוגות גודל לפני הורדה",
        body: "בדקו רינדורים ב-16×16, 32×32 ו-48×48 ובמוקאפ לשונית כדי שהאייקון המומר ייקרא בבירור בקנה מידת favicon אמיתי.",
      },
      {
        title: "client-side כברירת מחדל",
        body: "פענוח, חיתוך וייצוא רצים בלשונית הדפדפן. Pix-8 לא מקבל את תמונת המקור במהלך ההמרה או ההורדה.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את Favicon Generator",
        body: "נווטו ל-Favicon Generator של Pix-8 בדפדפן — ללא התקנה, ללא חשבון וללא שלב העלאה לפני ההמרה.",
      },
      {
        title: "טענו ומסגרו את התמונה",
        body: "בחרו קובץ מהמכשיר. התאימו זום על חיתוך הריבוע המרכזי, ואז בדקו תצוגות לשונית וגודל פיקסלים.",
      },
      {
        title: "ייצאו ICO או PNG",
        body: "הורידו את ה-favicon המומר — תמונת מקור אחת לכל סשן, מיוצאת כולה במכשיר.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים להמיר תמונה ל-favicon?",
      body: "פתחו את Favicon Generator, טענו תמונה מקומית, צפו בגדלי לשונית וייצאו ICO או PNG — בפרטיות, כולו במכשיר.",
      button: "פתחו את Favicon Generator",
    },
  },
  "generate-favicon-for-website": {
    id: "generate-favicon-for-website" as FaviconGeneratorLandingId,
    path: "/generate-favicon-for-website",
    linkTitle: "יצירת favicon לאתר",
    linkExcerpt:
      "יצירת favicon לאתר בדפדפן — ICO או PNG, תצוגת לשונית, client-side, ללא העלאה.",
    seo: {
      title: "יצירת Favicon לאתר",
      description:
        "יצירת favicon לאתר בדפדפן. טעינת לוגו מקומית, תצוגה מקדימה ב-16×16 עד 48×48, וייצוא favicon.ico או PNG במכשיר — ללא העלאה, ללא שרת. Favicon Generator פרטי client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "האם אפשר ליצור favicon לאתר בלי להעלות את הלוגו?",
        answer:
          "כן. Favicon Generator של Pix-8 רץ בדפדפן. התמונה נקראת מקומית, נחתכת לריבוע מרכזי עם שליטת זום, ומיוצאת כ-favicon.ico או PNG במכשיר. היא לא נשלחת ל-Pix-8 או לשרת צד שלישי.",
      },
      {
        question: "אילו קבצים להוסיף לאתר אחרי הייצוא?",
        answer:
          "רוב האתרים מניחים favicon.ico בשורש האתר או מפנים ל-PNG בתג head של HTML. Favicon Generator מייצא favicon.ico (16, 32 ו-48 px משולבים) או PNG בגודל 32×32 מוכן לשילוב בפרויקט. הכלי לא עורך HTML, לא מזריק תגי link ולא מייצר web app manifest מלא.",
      },
      {
        question: "האם זה מחליף מעצב או חבילת אייקונים לכל פלטפורמה?",
        answer:
          "Favicon Generator מייצר קבצי favicon ללשונית דפדפן ממקור רסטר אחד עם תצוגות ב-16×16, 32×32 ו-48×48. הוא לא יוצר Apple touch icons, אייקונים אדפטיביים לאנדרואיד, תמונות Open Graph או נכסים באצווה למערכת עיצוב שלמה.",
      },
    ],
    eyebrow: "אתר · client-side · ללא העלאה",
    titleMain: "יצירת favicon לאתר",
    titleAccent: "ICO או PNG מוכן ללשונית",
    heroSubtitle:
      "צרו favicon לאתר בדפדפן — ללא העלאה, ללא חשבון, ללא תור בענן. טענו לוגו מקומית, צפו איך הוא נקרא בלשונית דפדפן ב-16×16, 32×32 ו-48×48, התאימו מסגור זום, וייצאו favicon.ico או PNG במכשיר בלי לשלוח קבצי מותג לשרת.",
    primaryCta: "יצירת favicon — בחינם",
    ctaNote: "ללא העלאה · ללא שרת · ייצוא מוכן לאתר",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "ייצוא favicon לאתר במכשיר — לא ערכת מותג מתארחת",
      body: "Favicon Generator של Pix-8 הופך תמונה מקומית אחת ל-favicon.ico או PNG באמצעות רינדור client-side, חיתוך ריבוע מרכזי ותצוגות גודל לשונית — לא תהליך SaaS ששומר את הלוגו או כותב את ה-HTML. הורידו קבצים מוכנים לשורש האתר או לתג link ב-head. הכלי לא מפרסם ל-hosting, לא עורך תבניות CMS ולא מייצר Apple touch או סטי אייקון PWA.",
    },
    benefitsHeading: "למה ליצור favicon לאתר בדפדפן?",
    benefitsIntro:
      "בוני אתרים רבים מעבירים לוגואים דרך ממירים בענן לפני favicon.ico. Pix-8 מעבד מקומית — הנתיב המעשי כשצריך ",
    benefitsKeyword: "ליצור favicon לאתר",
    benefitsIntroAfter:
      " להשקות, תצוגות סטייג'ינג ואתרי לקוח בלי להעלות נכסי מותג שלא פורסמו.",
    benefits: [
      {
        title: "תצוגת לשונית לפני פריסה",
        body: "ראו איך הסימן נקרא במוקאפ לשונית דפדפן וב-16×16, 32×32 ו-48×48 לפני שמוסיפים קבצים לפרויקט.",
      },
      {
        title: "פורמטים שאתרים מצפים להם",
        body: "הורידו favicon.ico מרובה גדלים או PNG בגודל 32×32 — פלטים נפוצים לשורש האתר או לתג link ב-head.",
      },
      {
        title: "client-side כברירת מחדל",
        body: "היצירה רצה בלשונית הדפדפן. Pix-8 לא מקבל את הלוגו במהלך תצוגה מקדימה או ייצוא.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את Favicon Generator",
        body: "נווטו ל-Favicon Generator של Pix-8 בדפדפן — ללא התקנה, ללא חשבון וללא העלאה לפני היצירה.",
      },
      {
        title: "טענו את לוגו האתר",
        body: "בחרו תמונה מהמכשיר. התאימו זום על החיתוך המרכזי, ואז אשרו תצוגות לשונית וגודל פיקסלים.",
      },
      {
        title: "ייצאו לאתר",
        body: "הורידו favicon.ico או PNG והוסיפו לפרויקט — תמונת מקור אחת לכל סשן, נוצרת כולה במכשיר.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים ליצור favicon לאתר?",
      body: "פתחו את Favicon Generator, טענו לוגו מקומי, צפו בגדלי לשונית וייצאו ICO או PNG — בפרטיות, כולו במכשיר.",
      button: "פתחו את Favicon Generator",
    },
  },
  "favicon-icon-maker-for-web": {
    id: "favicon-icon-maker-for-web" as FaviconGeneratorLandingId,
    path: "/favicon-icon-maker-for-web",
    linkTitle: "יוצר favicon לרשת",
    linkExcerpt:
      "יוצר אייקון favicon לרשת בדפדפן — תצוגת לשונית, ICO או PNG, client-side, ללא העלאה.",
    seo: {
      title: "יוצר אייקון Favicon לרשת",
      description:
        "יוצר אייקון favicon לרשת בדפדפן. טעינת לוגו מקומית, תצוגה מקדימה ב-16×16 עד 48×48, וייצוא favicon.ico או PNG במכשיר — ללא העלאה, ללא שרת. Favicon Generator פרטי client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "האם יוצר אייקון ה-favicon לרשת חינם ופרטי?",
        answer:
          "כן. Favicon Generator של Pix-8 חינם לפתיחה בדפדפן — ללא חשבון. התמונה מעובדת על קנבס client-side ומיוצאת במכשיר. היא לא מועלית ל-Pix-8 או לשרת צד שלישי.",
      },
      {
        question: "באילו גדלי אייקון לרשת היוצר מייצא?",
        answer:
          "Favicon Generator מציג תצוגה מקדימה ב-16×16, 32×32 ו-48×48 פיקסלים, ואז מייצא favicon.ico מרובה גדלים או PNG בגודל 32×32. מוקאפ לשונית דפדפן מראה קריאות לפני ההורדה. הכלי לא מייצר אייקוני PWA ב-192×192, Apple touch icons או adaptive icons מסכות.",
      },
      {
        question: "מה ההבדל מעורך תמונות כללי או כלי icon font?",
        answer:
          "Favicon Generator בנוי לאייקוני לשונית דפדפן בקנה מידה קטן — חיתוך ריבוע מרכזי, מסגור זום ותצוגות מקור רסטר אחד. הוא לא מצייר אייקוני וקטור מאפס, לא מנהל ספריות icon font ולא מייצא באצווה ערכת נכסי רשת מלאה.",
      },
    ],
    eyebrow: "אייקוני רשת · client-side · ללא העלאה",
    titleMain: "יוצר אייקון favicon לרשת",
    titleAccent: "ICO או PNG ללשונית דפדפן",
    heroSubtitle:
      "השתמשו ביוצר אייקון favicon לרשת בדפדפן — ללא העלאה, ללא חשבון, ללא תור בענן. טענו לוגו מקומית, צפו באייקוני לשונית ב-16×16, 32×32 ו-48×48, התאימו מסגור זום, וייצאו favicon.ico או PNG במכשיר בלי לשלוח את קובץ המקור לשרת.",
    primaryCta: "יצירת אייקון לרשת — בחינם",
    ctaNote: "ללא העלאה · ללא שרת · ייצוא ללשונית",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "אייקוני לשונית במכשיר — לא סטודיו אייקונים בענן",
      body: "Favicon Generator של Pix-8 מתמקד בפלט favicon ללשונית דפדפן — רינדור client-side, חיתוך ריבוע מרכזי, שליטת זום ותצוגות מוקאפ לשונית — לא חבילת עיצוב אייקונים רחבה שמעלה נכסים קודם. ייצוא favicon.ico (16, 32 ו-48 px) או PNG לפרויקטי רשת. הכלי לא יוצר אייקוני SVG, לא בונה icon fonts ולא שולח רשתות אייקון PWA מלאות.",
    },
    benefitsHeading: "למה יוצר אייקון favicon לרשת בדפדפן?",
    benefitsIntro:
      "כלי עיצוב כלליים וסטודיו בענן לעיתים דורשים העלאה ותהליכים רחבים שלא קשורים לאייקון לשונית בודד. Pix-8 מעבד מקומית — ההתאמה הממוקדת כשצריך ",
    benefitsKeyword: "יוצר אייקון favicon לרשת",
    benefitsIntroAfter:
      " לפרויקטי רשת, אתרים סטטיים ומסירות פרונט-אנד בלי להעביר לוגואים מחוץ למכשיר.",
    benefits: [
      {
        title: "בנוי לאייקונים בקנה מידת לשונית",
        body: "חיתוך ריבוע מרכזי, מסגור זום ותצוגות ב-16×16, 32×32 ו-48×48 — בגודל שבו דפדפנים מציגים favicons.",
      },
      {
        title: "מוקאפ לשונית לפני ייצוא",
        body: "ראו איך האייקון נקרא בתצוגת לשונית דפדפן כדי לתפוס טשטוש וחיתוך לפני הוספת קבצים לפרויקט הרשת.",
      },
      {
        title: "client-side כברירת מחדל",
        body: "רינדור אייקון וייצוא רצים בלשונית הדפדפן. Pix-8 לא מקבל את תמונת המקור במהלך תצוגה מקדימה או הורדה.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את Favicon Generator",
        body: "נווטו ל-Favicon Generator של Pix-8 בדפדפן — ללא התקנה, ללא חשבון וללא העלאה לפני יצירת אייקון לרשת.",
      },
      {
        title: "טענו וצפו בתצוגה",
        body: "בחרו תמונה מהמכשיר. התאימו זום על החיתוך המרכזי, ואז בדקו תצוגות לשונית וגודל פיקסלים.",
      },
      {
        title: "ייצאו ICO או PNG",
        body: "הורידו קבצי favicon לפרויקט הרשת — תמונת מקור אחת לכל סשן, נוצרת כולה במכשיר.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים ליצור אייקון favicon לרשת?",
      body: "פתחו את Favicon Generator, טענו לוגו מקומי, צפו בגדלי לשונית וייצאו ICO או PNG — בפרטיות, כולו במכשיר.",
      button: "פתחו את Favicon Generator",
    },
  },
  "create-favicon-sizes-online": {
    id: "create-favicon-sizes-online" as FaviconGeneratorLandingId,
    path: "/create-favicon-sizes-online",
    linkTitle: "יצירת גדלי favicon אונליין",
    linkExcerpt:
      "יצירת גדלי favicon אונליין בדפדפן — תצוגה 16, 32, 48px, ICO או PNG, client-side, ללא העלאה.",
    seo: {
      title: "יצירת גדלי Favicon אונליין",
      description:
        "יצירת גדלי favicon אונליין בדפדפן. תצוגה מקדימה ב-16×16, 32×32 ו-48×48, ואז ייצוא favicon.ico מרובה גדלים או PNG במכשיר — ללא העלאה, ללא שרת. Favicon Generator פרטי client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "אילו גדלי favicon אפשר ליצור אונליין עם Pix-8?",
        answer:
          "Favicon Generator מציג תצוגה מקדימה ב-16×16, 32×32 ו-48×48 פיקסלים לפני הייצוא. favicon.ico מאגד את שלושת הגדלים בקובץ אחד. ייצוא PNG הוא תמונה בודדת בגודל 32×32. הכלי לא מייצר Apple touch icons ב-180×180, אריחי PWA ב-192×192 או רשתות גדלים מותאמות מעבר לפלטים אלה.",
      },
      {
        question: "האם צריך להעלות לוגו כדי ליצור גדלי favicon אונליין?",
        answer:
          "לא. התמונה נקראת מקומית בדפדפן, מצוירת על קנבס client-side ומיוצאת במכשיר. Pix-8 לא מקבל את הקובץ במהלך תצוגה מקדימה או הורדה. אין תור המרה בענן.",
      },
      {
        question: "ICO או PNG — מה לייצא לגדלים מרובים?",
        answer:
          "בחרו favicon.ico כשצריך קובץ אחד עם 16, 32 ו-48 px משולבים — דפוס נפוץ לשורש האתר. בחרו PNG כשצריך נכס בודד בגודל 32×32 לתג link ב-head. Favicon Generator לא מייצא קבצי PNG נפרדים לכל גודל תצוגה ולא כותב את ה-HTML עבורכם.",
      },
    ],
    eyebrow: "ריבוי גדלים · client-side · ללא העלאה",
    titleMain: "יצירת גדלי favicon אונליין",
    titleAccent: "תצוגה 16, 32 ו-48 px",
    heroSubtitle:
      "צרו גדלי favicon אונליין בדפדפן — ללא העלאה, ללא חשבון, ללא תור בענן. טענו תמונה מקומית, צפו ב-16×16, 32×32 ו-48×48 זה לצד זה, התאימו מסגור זום, וייצאו favicon.ico מרובה גדלים או PNG בגודל 32×32 במכשיר בלי לשלוח את קובץ המקור לשרת.",
    primaryCta: "יצירת גדלים — בחינם",
    ctaNote: "ללא העלאה · ללא שרת · תצוגה 16–48px",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "שלושה גדלי לשונית בתצוגה — לא מחולל רשת אייקונים מלא",
      body: "Favicon Generator של Pix-8 מציג תצוגות חיות ב-16×16, 32×32 ו-48×48, ואז מייצא favicon.ico עם הגדלים האלה משולבים או PNG בודד בגודל 32×32 — הכל על קנבס client-side עם שליטת זום. זה לא בונה חבילות מתארח לעשרות ממדי PWA או touch icons ספציפיים לפלטפורמה.",
    },
    benefitsHeading: "למה ליצור גדלי favicon אונליין בדפדפן?",
    benefitsIntro:
      "כלי חבילות גדלים אונליין לעיתים מעלים לוגו לפני רינדור רשת. Pix-8 מעבד מקומית — הנתיב הישיר כשצריך ",
    benefitsKeyword: "ליצור גדלי favicon אונליין",
    benefitsIntroAfter:
      " ולאשר קריאות ב-16, 32 ו-48 px לפני שמוסיפים קבצים לפרויקט.",
    benefits: [
      {
        title: "תצוגות גודל זה לצד זה",
        body: "השוו רינדורים ב-16×16, 32×32 ו-48×48 ובמוקאפ לשונית לפני הייצוא — בלי ניחושים בקנה מידת favicon.",
      },
      {
        title: "ICO מאגד שלושה גדלים",
        body: "הורידו favicon.ico אחד עם 16, 32 ו-48 px משולבים, או ייצאו PNG בגודל 32×32 כשנכס בודד מספיק.",
      },
      {
        title: "client-side כברירת מחדל",
        body: "כל גודל מרונדר בלשונית הדפדפן מתמונת מקור מקומית אחת. Pix-8 לא מקבל את הקובץ במהלך תצוגה מקדימה או ייצוא.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את Favicon Generator",
        body: "נווטו ל-Favicon Generator של Pix-8 בדפדפן — ללא התקנה, ללא חשבון וללא העלאה לפני שמופיעות תצוגות הגודל.",
      },
      {
        title: "טענו והשוו גדלים",
        body: "בחרו תמונה מהמכשיר. התאימו זום, ואז בדקו תצוגות 16×16, 32×32 ו-48×48 ואת מוקאפ הלשונית.",
      },
      {
        title: "ייצאו ICO או PNG",
        body: "הורידו favicon.ico מרובה גדלים או PNG בגודל 32×32 — תמונת מקור אחת לכל סשן, נוצרת כולה במכשיר.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים ליצור גדלי favicon בלי להעלות?",
      body: "פתחו את Favicon Generator, טענו תמונה מקומית, צפו בגדלים 16–48 px וייצאו ICO או PNG — בפרטיות, כולו במכשיר.",
      button: "פתחו את Favicon Generator",
    },
  },
  "client-side-favicon-generator": {
    id: "client-side-favicon-generator" as FaviconGeneratorLandingId,
    path: "/client-side-favicon-generator",
    linkTitle: "מחולל favicon client-side",
    linkExcerpt:
      "מחולל favicon client-side בדפדפן — ללא העלאה, ייצוא ICO או PNG, תצוגה 16–48px.",
    seo: {
      title: "מחולל Favicon ב-Client-Side",
      description:
        "מחולל favicon client-side בדפדפן. טעינת תמונה מקומית, תצוגה מקדימה ב-16×16 עד 48×48, וייצוא favicon.ico או PNG במכשיר — ללא העלאה, ללא שרת. Favicon Generator פרטי מאת Pix-8.",
    },
    faq: [
      {
        question: "מה המשמעות של client-side במחולל ה-favicon?",
        answer:
          "client-side פירושו שהתמונה מפוענחת, נחתכת, מוצגת בתצוגה מקדימה ומיוצאת כולה בלשונית הדפדפן על קנבס מקומי. Pix-8 לא מקבל את הקובץ בטעינה, בתצוגה מקדימה או בהורדה. אין תור בענן, אחסון מתארח או שלב המרה בשרת.",
      },
      {
        question: "האם מחולל favicon client-side פרטי כמו תוכנת שולחן עבודה?",
        answer:
          "עבור favicon בודד מתמונת רסטר אחת — כן. העיבוד נשאר במכשיר בסשן הדפדפן. הלוגו לא מועלה להמרה. Favicon Generator של Pix-8 לא מותקן כתוכנת שולחן עבודה מקומית, לא מסנכרן פרויקטים לחשבון ולא מעבד תיקיות באצווה לא מקוון.",
      },
      {
        question: "מה אפשר לייצא מהמחולל ב-client-side?",
        answer:
          "אפשר לצפות בתצוגה מקדימה ב-16×16, 32×32 ו-48×48, להתאים זום על חיתוך ריבוע מרכזי, ואז להוריד favicon.ico מרובה גדלים או PNG בגודל 32×32. הכלי לא מייצר רשתות אייקון PWA, Apple touch icons ולא מפרסם קבצים אוטומטית ל-hosting.",
      },
    ],
    eyebrow: "Client-side · ללא העלאה · במכשיר",
    titleMain: "מחולל favicon client-side",
    titleAccent: "ייצוא פרטי בדפדפן",
    heroSubtitle:
      "השתמשו במחולל favicon client-side בדפדפן — ללא העלאה, ללא חשבון, ללא round trip לשרת. טענו תמונה מקומית, צפו באייקוני לשונית ב-16×16, 32×32 ו-48×48, התאימו מסגור זום, וייצאו favicon.ico או PNG במכשיר בזמן שקובץ המקור נשאר בלשונית הדפדפן.",
    primaryCta: "יצירה מקומית — בחינם",
    ctaNote: "ללא העלאה · ללא שרת · קנבס בדפדפן",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "עיבוד על קנבס בדפדפן — לא API המרה בענן",
      body: "Favicon Generator של Pix-8 מפענח את התמונה על קנבס client-side, מחיל חיתוך ריבוע מרכזי עם שליטת זום, ומרנדר תצוגות גודל לשונית לפני הייצוא — לא API מרוחק שבולע את הלוגו קודם. הורידו favicon.ico (16, 32 ו-48 px) או PNG בלי לשלוח נתוני פיקסלים ל-Pix-8. הכלי לא מציע ספריות ענן לצוות, פריסת CDN או הזרקת HTML אוטומטית.",
    },
    benefitsHeading: "למה לבחור במחולל favicon client-side?",
    benefitsIntro:
      "כלי favicon בענן מנתבים לוגואים דרך שרתים מרוחקים כברירת מחדל. Pix-8 משאיר את העיבוד בדפדפן — ההתאמה לפרטיות כשצריך ",
    benefitsKeyword: "מחולל favicon client-side",
    benefitsIntroAfter:
      " למותגים שלא פורסמו, עבודת לקוח תחת NDA ותהליכי עבודה מקומיים.",
    benefits: [
      {
        title: "ללא שלב העלאה לשרת",
        body: "טעינה מהמכשיר וייצוא באותו מחשב — פענוח, חיתוך, תצוגה מקדימה והורדה בלי לשלוח את התמונה ל-Pix-8.",
      },
      {
        title: "תצוגה מקדימה לפני ייצוא",
        body: "בדקו רינדורים ב-16×16, 32×32 ו-48×48 ובמוקאפ לשונית כדי לייצא פעם אחת בביטחון.",
      },
      {
        title: "עיבוד מקומי לסשן",
        body: "תמונת מקור אחת לכל סשן בדפדפן, מעובדת בזיכרון על קנבס. ללא חשבון, ללא היסטוריית פרויקטים מתארחת, ללא אחסון בענן.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו בדפדפן",
        body: "נווטו ל-Favicon Generator של Pix-8 — העיבוד רץ בלשונית על קנבס client-side, לא על worker מרוחק.",
      },
      {
        title: "טענו וצפו מקומית",
        body: "בחרו תמונה מהמכשיר. התאימו זום, ואז בדקו תצוגות לשונית וגודל פיקסלים — הכל מרונדר במכשיר.",
      },
      {
        title: "ייצאו בלי להעלות",
        body: "הורידו favicon.ico או PNG מסשן הדפדפן. קובץ המקור לא עוזב את המכשיר דרך Pix-8.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים לתהליך favicon פרטי ב-client-side?",
      body: "פתחו את Favicon Generator, טענו תמונה מקומית, צפו בגדלי לשונית וייצאו ICO או PNG — כולו בדפדפן, ללא העלאה.",
      button: "פתחו את Favicon Generator",
    },
  },
  "no-upload-favicon-creator": {
    id: "no-upload-favicon-creator" as FaviconGeneratorLandingId,
    path: "/no-upload-favicon-creator",
    linkTitle: "יוצר favicon ללא העלאה",
    linkExcerpt:
      "יוצר favicon ללא העלאה בדפדפן — טעינה מקומית, ייצוא ICO או PNG, client-side בלבד.",
    seo: {
      title: "יוצר Favicon ללא העלאה",
      description:
        "יוצר favicon ללא העלאה בדפדפן. טעינת תמונה מהמכשיר, תצוגה מקדימה ב-16×16 עד 48×48, וייצוא favicon.ico או PNG במכשיר — ללא שרת, ללא תור בענן. Favicon Generator פרטי client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "האם יוצר ה-favicon דורש שלב העלאה?",
        answer:
          "לא. Favicon Generator של Pix-8 קורא את התמונה מקומית בדפדפן, מציג תצוגות מקדימות על קנבס client-side ומייצא קבצי favicon במכשיר. הלוגו לא נשלח ל-Pix-8 או לשרת צד שלישי להמרה או אחסון.",
      },
      {
        question: "מה ההבדל מממירי ענן בגרירה ושחרור?",
        answer:
          "ממירי ענן שולחים בדרך כלל את הקובץ לשרת מרוחק לפני ייצור favicon.ico או PNG. Pix-8 משאיר פענוח, חיתוך, תצוגה מקדימה וייצוא בלשונית הדפדפן עם מחוון זום ותצוגות גודל לשונית. הכלי לא מציע תיקיות פרויקט מתארחות, ספריות נכסים לצוות או משלוח תוצאות במייל.",
      },
      {
        question: "מה אפשר ליצור בלי להעלות?",
        answer:
          "מתמונת רסטר אחת לכל סשן אפשר לצפות ב-16×16, 32×32 ו-48×48, ואז להוריד favicon.ico מרובה גדלים או PNG בגודל 32×32. הכלי לא ממיר מספר לוגואים באצווה, לא עוקב artwork ב-SVG ולא מייצר Apple touch icons או חבילות manifest ל-PWA.",
      },
    ],
    eyebrow: "ללא העלאה · client-side · פרטי",
    titleMain: "יוצר favicon ללא העלאה",
    titleAccent: "טעינה מקומית, ייצוא במכשיר",
    heroSubtitle:
      "השתמשו ביוצר favicon ללא העלאה בדפדפן — בלי גרירה לשרת מרוחק, בלי חשבון, בלי תור בענן. בחרו תמונה מהמכשיר, צפו באייקוני לשונית ב-16×16, 32×32 ו-48×48, התאימו מסגור זום, וייצאו favicon.ico או PNG במכשיר בזמן שהקובץ נשאר מקומי לסשן הדפדפן.",
    primaryCta: "יצירת favicon — בחינם",
    ctaNote: "ללא העלאה · ללא שרת · קובץ מקומי בלבד",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "יצירה בלי העלאה — לא תיבת המרה מתארחת",
      body: "Favicon Generator של Pix-8 לא מבקש לשלוח את הלוגו לשרת קודם. התמונה נטענת מהמכשיר לקנבס client-side, שם חיתוך ריבוע מרכזי, שליטת זום ותצוגות לשונית רצים לפני הורדת favicon.ico (16, 32 ו-48 px) או PNG. זה לא תיבת ענן ששומרת העלאות, שולחת תוצאות במייל או בונה ערכות אייקון לפלטפורמות מרובות.",
    },
    benefitsHeading: "למה יוצר favicon ללא העלאה?",
    benefitsIntro:
      "כלי favicon שמתחילים בהעלאה חושפים לוגואים לתשתית צד שלישי כברירת מחדל. Pix-8 מדלג על השלב הזה — ההתאמה כשצריך ",
    benefitsKeyword: "יוצר favicon ללא העלאה",
    benefitsIntroAfter:
      " לסימני לקוח חסויים, אתרים לפני השקה ותהליכי עבודה רגישים לפרטיות.",
    benefits: [
      {
        title: "אפס העברה לשרת",
        body: "טעינה מהדיסק או מהגלריה וייצוא באותו סשן בדפדפן — Pix-8 לא מקבל את התמונה במהלך תצוגה מקדימה או הורדה.",
      },
      {
        title: "תצוגת לשונית לפני שמירה",
        body: "בדקו רינדורים ב-16×16, 32×32 ו-48×48 ובמוקאפ לשונית כדי להתחייב לייצוא בלי לשלוח קבצים מחוץ למכשיר.",
      },
      {
        title: "client-side כברירת מחדל",
        body: "פענוח, חיתוך וייצוא favicon רצים על קנבס מקומי. ללא אחסון מתארח, ללא תור המרה, ללא חסם חשבון.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את Favicon Generator",
        body: "נווטו ל-Pix-8 בדפדפן — אין דיאלוג העלאה או אזור drop בענן לפני שמתחילים.",
      },
      {
        title: "טענו מקומית",
        body: "בחרו תמונה מהמכשיר. התאימו זום, ואז בדקו תצוגות לשונית וגודל פיקסלים שמרונדרות במכשיר.",
      },
      {
        title: "ייצאו בלי להעלות",
        body: "הורידו favicon.ico או PNG — תמונת מקור אחת לכל סשן, נוצרת כולה בדפדפן.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים ליצור favicon בלי העלאה?",
      body: "פתחו את Favicon Generator, טענו תמונה מקומית, צפו בגדלי לשונית וייצאו ICO או PNG — בפרטיות, כולו במכשיר.",
      button: "פתחו את Favicon Generator",
    },
  },
  "privacy-first-favicon-tool": {
    id: "privacy-first-favicon-tool" as FaviconGeneratorLandingId,
    path: "/privacy-first-favicon-tool",
    linkTitle: "כלי favicon לפרטיות",
    linkExcerpt:
      "כלי favicon ממוקד פרטיות בדפדפן — ללא העלאה, ICO או PNG במכשיר, תצוגה 16–48px.",
    seo: {
      title: "כלי Favicon ממוקד פרטיות",
      description:
        "כלי favicon ממוקד פרטיות בדפדפן. טעינת לוגו מקומית, תצוגה מקדימה ב-16×16 עד 48×48, וייצוא favicon.ico או PNG במכשיר — ללא העלאה, ללא שרת. Favicon Generator פרטי client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "מה הופך את זה לכלי favicon ממוקד פרטיות?",
        answer:
          "Favicon Generator של Pix-8 מעבד את התמונה כולה בלשונית הדפדפן על קנבס client-side. הלוגו נקרא מהמכשיר, מוצג מקומית ומיוצא במכשיר. הוא לא מועלה ל-Pix-8 או לשרת המרה של צד שלישי, ואין שלב אחסון בענן.",
      },
      {
        question: "למי מתאים תהליך favicon ממוקד פרטיות?",
        answer:
          "צוותים שמטפלים במותגים שלא פורסמו, לוגואי לקוח תחת NDA או מוקאפים פנימיים לעיתים רוצים קבצי favicon בלי להעביר נכסים דרך ממיר מרוחק. Pix-8 מתאים לכך עבור מקור רסטר אחד לכל סשן. הכלי לא מספק SSO ארגוני, יומני ביקורת או פריסת שרת on-premise.",
      },
      {
        question: "מה הכלי מייצא תוך שמירה על קבצים מקומיים?",
        answer:
          "אפשר לצפות ב-16×16, 32×32 ו-48×48, להתאים זום על חיתוך ריבוע מרכזי, ואז להוריד favicon.ico מרובה גדלים או PNG בגודל 32×32. הכלי לא מבצע אנונימיזציה של מטא-דאטה מעבר לעיבוד מקומי, לא סורק קבצים בשרת ולא מייצר סטי PWA או Apple touch icon מלאים.",
      },
    ],
    eyebrow: "פרטיות קודמת · client-side · ללא העלאה",
    titleMain: "כלי favicon ממוקד פרטיות",
    titleAccent: "הלוגו נשאר מקומי",
    heroSubtitle:
      "השתמשו בכלי favicon ממוקד פרטיות בדפדפן — ללא העלאה, ללא חשבון, ללא תור המרה מרוחק. טענו תמונה מהמכשיר, צפו באייקוני לשונית ב-16×16, 32×32 ו-48×48, התאימו מסגור זום, וייצאו favicon.ico או PNG במכשיר בזמן שקובץ המקור לא עוזב את סשן הדפדפן.",
    primaryCta: "יצירה בפרטיות — בחינם",
    ctaNote: "ללא העלאה · ללא שרת · במכשיר בלבד",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "עיבוד מקומי by design — לא ממיר שאוסף נתונים",
      body: "Favicon Generator של Pix-8 מפענח, חותך, מציג תצוגה מקדימה ומייצא על קנבס client-side — לא צינור מתארח שבולע את הלוגו לניתוח או אחסון. הורידו favicon.ico (16, 32 ו-48 px) או PNG בלי לשלוח נתוני פיקסלים ל-Pix-8. הכלי לא מריץ סריקות וירוס בשרת, לא שומר היסטוריית העלאות ולא מסנכרן פרויקטים לחשבון ענן.",
    },
    benefitsHeading: "למה לבחור בכלי favicon ממוקד פרטיות?",
    benefitsIntro:
      "שירותי favicon מרוחקים מתייחסים ללוגו כקלט להעלאה כברירת מחדל. Pix-8 משאיר קבצים במכשיר — הבחירה המודעת כשצריך ",
    benefitsKeyword: "כלי favicon ממוקד פרטיות",
    benefitsIntroAfter:
      " לסימנים חסויים, אתרים לפני השקה ותהליכי עיצוב מקומיים בלבד.",
    benefits: [
      {
        title: "ללא ניתוב נכסים מרוחק",
        body: "טעינה מהמכשיר וייצוא באותה לשונית — Pix-8 לא מקבל את התמונה במהלך תצוגה מקדימה או הורדה.",
      },
      {
        title: "תצוגה מקדימה לפני שמשתפים משהו",
        body: "בדקו רינדורים ב-16×16, 32×32 ו-48×48 ובמוקאפ לשונית מקומית לפני הוספת קבצים ל-repo או CMS — בלי להעלות את המקור קודם.",
      },
      {
        title: "מקומי לסשן כברירת מחדל",
        body: "תמונת מקור אחת לכל סשן בדפדפן, מעובדת בזיכרון על קנבס. ללא חשבון, ללא ספריית פרויקטים מתארחת, ללא תיבת ענן.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את Favicon Generator",
        body: "נווטו ל-Pix-8 בדפדפן — העיבוד נשאר בלשונית, לא ב-worker מרוחק ששומר העלאות.",
      },
      {
        title: "טענו וצפו מקומית",
        body: "בחרו תמונה מהמכשיר. התאימו זום, ואז אשרו תצוגות לשונית וגודל פיקסלים שמרונדרות במכשיר.",
      },
      {
        title: "ייצאו בלי להעלות",
        body: "הורידו favicon.ico או PNG מסשן הדפדפן. הלוגו לא נשלח ל-Pix-8 להמרה.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים לתהליך favicon ממוקד פרטיות?",
      body: "פתחו את Favicon Generator, טענו תמונה מקומית, צפו בגדלי לשונית וייצאו ICO או PNG — בפרטיות, כולו במכשיר.",
      button: "פתחו את Favicon Generator",
    },
  },
  "browser-based-icon-generator": {
    id: "browser-based-icon-generator" as FaviconGeneratorLandingId,
    path: "/browser-based-icon-generator",
    linkTitle: "מחולל אייקונים בדפדפן",
    linkExcerpt:
      "מחולל אייקונים בדפדפן ל-favicon לשונית — טעינה מקומית, תצוגה 16–48px, ייצוא ICO או PNG בדפדפן.",
    seo: {
      title: "מחולל אייקונים מבוסס דפדפן",
      description:
        "מחולל אייקונים מבוסס דפדפן ל-favicon לשונית. טעינת תמונה מקומית, תצוגה מקדימה ב-16×16 עד 48×48 בדפדפן, וייצוא favicon.ico או PNG במכשיר — ללא התקנה, ללא העלאה. Favicon Generator client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "מה מחולל האייקונים בדפדפן יוצר?",
        answer:
          "Favicon Generator של Pix-8 בונה favicon לשונית דפדפן מתמונת רסטר אחת לכל סשן. אפשר לצפות ב-16×16, 32×32 ו-48×48, להתאים זום על חיתוך ריבוע מרכזי, ואז להוריד favicon.ico מרובה גדלים או PNG בגודל 32×32. זה לא סטודיו אייקונים כללי ל-iOS, Android או רשתות PWA מלאות.",
      },
      {
        question: "האם הכלי רץ כולו בדפדפן?",
        answer:
          "כן. פענוח, חיתוך, תצוגה מקדימה וייצוא רצים על קנבס client-side בלשונית הדפדפן. התמונה נקראת מהמכשיר ומעובדת מקומית — היא לא מועלה ל-Pix-8 או לשרת המרה מרוחק. אין צורך במתקין שולחני או בתוסף דפדפן.",
      },
      {
        question: "אילו דפדפנים יכולים להשתמש בתהליך?",
        answer:
          "כל דפדפן מודרני שתומך בבחירת קובץ מקומי וייצוא מקנבס יכול להריץ את הכלי בלשונית רגילה. העיבוד נשאר במכשיר לאותו סשן. Pix-8 לא מספק תוסף דפדפן, אפליקציית שולחן לא מקוונת או צינור CI אוטומטי ל-favicon.",
      },
    ],
    eyebrow: "בדפדפן · client-side · ללא התקנה",
    titleMain: "מחולל אייקונים מבוסס דפדפן",
    titleAccent: "favicon לשונית בדפדפן",
    heroSubtitle:
      "השתמשו במחולל אייקונים מבוסס דפדפן ל-favicon לשונית — ללא התקנה, ללא העלאה, ללא חשבון. פתחו את Pix-8 בכל דפדפן מודרני, טענו תמונה מהמכשיר, צפו באייקונים ב-16×16, 32×32 ו-48×48, התאימו מסגור זום, וייצאו favicon.ico או PNG במכשיר בזמן שהעיבוד נשאר בלשונית הדפדפן.",
    primaryCta: "יצירה בדפדפן — בחינם",
    ctaNote: "ללא התקנה · ללא העלאה · client-side בלבד",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "יצירת favicon בלשונית — לא מפעל אייקונים מתארח",
      body: "Favicon Generator של Pix-8 מפענח, חותך, מציג תצוגה מקדימה ומייצא על קנבס client-side בתוך הדפדפן. הורידו favicon.ico (16, 32 ו-48 px) או PNG בגודל 32×32 בלי לשלוח נתוני פיקסלים ל-Pix-8. הכלי לא מתקין אפליקציית שולחן, לא מפרסם סטי אייקונים לפלטפורמות מרובות ולא עוקב artwork ב-SVG לאייקוני לשונית.",
    },
    benefitsHeading: "למה מחולל אייקונים מבוסס דפדפן?",
    benefitsIntro:
      "חבילות אייקונים לשולחן העבודה וממירי ענן מוסיפים התקנה או תור העלאה כברירת מחדל. Pix-8 רץ בלשונית דפדפן — הנתיב הישיר כשצריך ",
    benefitsKeyword: "מחולל אייקונים מבוסס דפדפן",
    benefitsIntroAfter:
      " ל-favicon לשונית מהיר מתמונת לוגו מקומית, עם עיבוד client-side וללא העברה לשרת.",
    benefits: [
      {
        title: "ללא התקנה",
        body: "פתחו לשונית בדפדפן והתחילו — תצוגה מקדימה וייצוא favicon רצים client-side בלי חבילת שולחן או תוסף דפדפן.",
      },
      {
        title: "תצוגת גודל לשונית במכשיר",
        body: "בדקו רינדורים ב-16×16, 32×32 ו-48×48 ובמוקאפ לשונית בדפדפן לפני הורדת favicon.ico או PNG.",
      },
      {
        title: "קבצים מקומיים נשארים מקומיים",
        body: "טעינה מהמכשיר וייצוא באותו סשן — Pix-8 לא מקבל את התמונה במהלך תצוגה מקדימה או הורדה.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את Favicon Generator",
        body: "נווטו ל-Pix-8 בדפדפן — ללא מתקין, תוסף או שער הרשמה לפני שמתחילים.",
      },
      {
        title: "טענו ומסגרו מקומית",
        body: "בחרו תמונה מהמכשיר. התאימו זום על חיתוך ריבוע מרכזי, ואז אשרו תצוגות לשונית וגודל פיקסלים שמרונדרות בדפדפן.",
      },
      {
        title: "ייצאו מהדפדפן",
        body: "הורידו favicon.ico או PNG מסשן הלשונית. קובץ המקור לא מועלה להמרה.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים ליצור אייקוני לשונית בדפדפן?",
      body: "פתחו את Favicon Generator, טענו תמונה מקומית, צפו בגדלי לשונית וייצאו ICO או PNG — כולו בדפדפן, במכשיר.",
      button: "פתחו את Favicon Generator",
    },
  },
  "best-online-tool-to-create-favicon": {
    id: "best-online-tool-to-create-favicon" as FaviconGeneratorLandingId,
    path: "/best-online-tool-to-create-favicon",
    linkTitle: "כלי מקוון ליצירת favicon",
    linkExcerpt:
      "הכלי המקוון ליצירת favicon — טעינה מקומית, תצוגת לשונית 16–48px, ייצוא ICO או PNG ב-client-side.",
    seo: {
      title: "הכלי המקוון הטוב ליצירת Favicon",
      description:
        "הכלי המקוון ליצירת favicon בדפדפן. טעינת לוגו מקומית, תצוגה מקדימה ב-16×16 עד 48×48, וייצוא favicon.ico או PNG במכשיר — ללא העלאה, ללא חשבון. Favicon Generator client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "מה כדאי לחפש בכלי favicon מקוון?",
        answer:
          "תהליך favicon מקוון מעשי צריך לאפשר תצוגה מקדימה בגדלי לשונית לפני ייצוא, לספק את הפורמטים שהאתר דורש, ולשמור על הלוגו מקומי כשפרטיות חשובה. Favicon Generator של Pix-8 מציג 16×16, 32×32 ו-48×48, מייצא favicon.ico מרובה גדלים או PNG בגודל 32×32, ומעבד הכל client-side בדפדפן — בלי להעלות את התמונה לשרת.",
      },
      {
        question: "מה שונה ב-Pix-8 מממירים שמתחילים בהעלאה?",
        answer:
          "כלי favicon מקוונים רבים מעבירים את הקובץ דרך שרת מרוחק לפני ההורדה. Pix-8 מפענח, חותך, מציג תצוגה מקדימה ומייצא על קנבס client-side בלשונית הדפדפן. התמונה נקראת מהמכשיר ונשארת במכשיר לאותו סשן. הכלי לא מציע ספריות פרויקטים מתארחות, סנכרון נכסים לצוות או חבילות אייקון PWA אוטומטיות.",
      },
      {
        question: "מה הכלי יוצר — ומה מחוץ לתחום?",
        answer:
          "מתמונת רסטר אחת לכל סשן אפשר להתאים זום על חיתוך ריבוע מרכזי, לבדוק מוקאפי לשונית, ואז להוריד favicon.ico מרובה גדלים או PNG בגודל 32×32. הכלי לא ממיר מספר לוגואים באצווה, לא עוקב artwork ב-SVG, לא מייצר Apple touch icons ולא מפרסם רשתות אייקון לפלטפורמות מרובות.",
      },
    ],
    eyebrow: "מקוון · client-side · ללא העלאה",
    titleMain: "הכלי המקוון ליצירת favicon",
    titleAccent: "תצוגה מקדימה, ייצוא, מקומי",
    heroSubtitle:
      "מחפשים את הכלי המקוון ליצירת favicon? Favicon Generator של Pix-8 רץ בדפדפן עם עיבוד client-side — ללא העלאה, ללא חשבון. טענו תמונה מהמכשיר, צפו באייקוני לשונית ב-16×16, 32×32 ו-48×48, התאימו מסגור זום, וייצאו favicon.ico או PNG במכשיר לפני שמוסיפים קבצים לאתר.",
    primaryCta: "יצירת favicon — בחינם",
    ctaNote: "ללא העלאה · ללא חשבון · במכשיר בלבד",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "תהליך favicon מקוון ממוקד — לא חבילת אייקונים כללית",
      body: "Pix-8 בנוי ל-favicon לשונית דפדפן ממקור רסטר מקומי אחד לכל סשן. צפו בגדלי לשונית אמיתיים, כוונו זום על חיתוך ריבוע מרכזי, ואז הורידו favicon.ico (16, 32 ו-48 px) או PNG בגודל 32×32 — הכל על קנבס client-side בלי לשלוח נתוני פיקסלים ל-Pix-8. הכלי לא מדרג או משווה כלי צד שלישי, ולא מספק manifest ל-PWA או חבילות Apple touch icon.",
    },
    benefitsHeading: "למה Pix-8 מתאים לתהליך favicon מקוון",
    benefitsIntro:
      "כלי favicon מקוונים חזקים משלבים תצוגה מקדימה בגודל לשונית, פורמטי ייצוא מעשיים ועיבוד מקומי. Pix-8 מספק את השילוב הזה כשצריך ",
    benefitsKeyword: "כלי מקוון ליצירת favicon",
    benefitsIntroAfter:
      " בלי להעביר את הלוגו דרך שרת המרה מרוחק.",
    benefits: [
      {
        title: "תצוגה מקדימה לפני שמחליטים",
        body: "בדקו רינדורים ב-16×16, 32×32 ו-48×48 ובמוקאפ לשונית בדפדפן — כדי לראות בהירות באייקון קטן לפני הייצוא.",
      },
      {
        title: "פורמטי ייצוא שאתרים משתמשים בהם",
        body: "הורידו favicon.ico מרובה גדלים או PNG בגודל 32×32 מאותו סשן — בלי כלי שני לאייקוני לשונית סטנדרטיים.",
      },
      {
        title: "client-side כברירת מחדל",
        body: "טעינה מהמכשיר וייצוא בלשונית הדפדפן. Pix-8 לא מקבל את התמונה במהלך תצוגה מקדימה או הורדה.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את Favicon Generator",
        body: "התחילו בדפדפן — ללא התקנה, חומת הרשמה או תור העלאה לפני טעינת לוגו.",
      },
      {
        title: "טענו וכוונו מקומית",
        body: "בחרו תמונה מהמכשיר. התאימו זום, ואז אשרו תצוגות לשונית וגודל פיקסלים שמרונדרות במכשיר.",
      },
      {
        title: "ייצאו קבצי favicon",
        body: "הורידו favicon.ico או PNG מסשן הדפדפן. קובץ המקור לא מועלה להמרה.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים ליצור favicon מקוון?",
      body: "פתחו את Favicon Generator, טענו תמונה מקומית, צפו בגדלי לשונית וייצאו ICO או PNG — client-side, כולו בדפדפן.",
      button: "פתחו את Favicon Generator",
    },
  },
  "make-favicon-for-wordpress": {
    id: "make-favicon-for-wordpress" as FaviconGeneratorLandingId,
    path: "/make-favicon-for-wordpress",
    linkTitle: "יצירת favicon ל-WordPress",
    linkExcerpt:
      "יצירת favicon ל-WordPress בדפדפן — טעינה מקומית, תצוגה 16–48px, ייצוא ICO או PNG ב-client-side.",
    seo: {
      title: "יצירת Favicon ל-WordPress",
      description:
        "יצירת favicon ל-WordPress בדפדפן. טעינת לוגו מקומית, תצוגה מקדימה ב-16×16 עד 48×48, וייצוא favicon.ico או PNG במכשיר — ללא העלאה ל-Pix-8. Favicon Generator client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "האם Pix-8 מתקין favicon ישירות ב-WordPress?",
        answer:
          "לא. Favicon Generator של Pix-8 יוצר קבצי favicon במכשיר — הוא לא מתחבר לניהול WordPress, לא מתקין תוסף ולא דוחף קבצים לשרת. אחרי הייצוא מעלים favicon.ico או PNG דרך תהליך WordPress הרגיל, כמו מראה → התאמה אישית → זהות האתר או הגדרות התבנית.",
      },
      {
        question: "מה כדאי לייצא ל-favicon של אתר WordPress?",
        answer:
          "זהות האתר ב-WordPress מקבלת פורמטי תמונה נפוצים כולל PNG. Favicon Generator מייצא favicon.ico מרובה גדלים (16, 32 ו-48 px) או PNG בגודל 32×32 ממקור רסטר מקומי אחד לכל סשן, עם תצוגות מקדימות בגודל לשונית לפני ההורדה. הכלי לא מייצר Apple touch icons, אייקוני אפליקציה ל-Android או חבילת manifest ל-PWA מלאה.",
      },
      {
        question: "האם הלוגו מועלה כשיוצרים favicon ל-WordPress?",
        answer:
          "לא ל-Pix-8. פענוח, חיתוך, תצוגה מקדימה וייצוא רצים על קנבס client-side בלשונית הדפדפן. התמונה נקראת מהמכשיר ונשארת במכשיר לאותו סשן. רק אתם בוחרים מתי ולאן להעלות את הקובץ המוגמר ל-WordPress.",
      },
    ],
    eyebrow: "WordPress · client-side · ללא העלאה",
    titleMain: "יצירת favicon ל-WordPress",
    titleAccent: "ייצוא מקומי, העלאה ב-WP",
    heroSubtitle:
      "צריכים ליצור favicon ל-WordPress? Favicon Generator של Pix-8 רץ בדפדפן עם עיבוד client-side — ללא העלאה ל-Pix-8, ללא חשבון. טענו לוגו מהמכשיר, צפו באייקוני לשונית ב-16×16, 32×32 ו-48×48, התאימו מסגור זום, ייצאו favicon.ico או PNG במכשיר, ואז הוסיפו את הקובץ דרך זהות האתר ב-WordPress או הגדרות התבנית.",
    primaryCta: "יצירת favicon — בחינם",
    ctaNote: "ללא העלאה ל-Pix-8 · במכשיר בלבד",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "יצירת קובץ favicon — לא תוסף WordPress ולא מחבר לניהול",
      body: "Pix-8 בונה קבצי favicon לשונית דפדפן מתמונת רסטר מקומית אחת לכל סשן. צפו בגדלי לשונית אמיתיים, כוונו זום על חיתוך ריבוע מרכזי, ואז הורידו favicon.ico (16, 32 ו-48 px) או PNG בגודל 32×32 על קנבס client-side. הכלי לא מתחבר ל-wp-admin, לא עורך קבצי תבנית, לא מזריק תגי link ולא מסנכרן נכסים אוטומטית לספריית המדיה ב-WordPress.",
    },
    benefitsHeading: "למה להשתמש ב-Pix-8 ליצירת favicon ל-WordPress?",
    benefitsIntro:
      "WordPress צריך קובץ favicon מוגמר לפני שזהות האתר יכולה להציג אותו. Pix-8 מטפל בשלב הייצוא המקומי כש",
    benefitsKeyword: "יוצרים favicon ל-WordPress",
    benefitsIntroAfter:
      " — עם תצוגה מקדימה בגודל לשונית ועיבוד client-side, בלי להעביר את הלוגו דרך ממיר מרוחק קודם.",
    benefits: [
      {
        title: "תצוגה מקדימה לפני ההעלאה",
        body: "בדקו רינדורים ב-16×16, 32×32 ו-48×48 ובמוקאפ לשונית בדפדפן — כדי שהסימן ייקרא בבירור לפני הוספה ל-WordPress.",
      },
      {
        title: "ייצוא ICO או PNG לזהות האתר",
        body: "הורידו favicon.ico מרובה גדלים או PNG בגודל 32×32 מאותו סשן — פורמטים שאפשר להעלות דרך הגדרות האתר הסטנדרטיות ב-WordPress.",
      },
      {
        title: "הלוגו נשאר במכשיר",
        body: "טעינה מהמחשב וייצוא בלשונית הדפדפן. Pix-8 לא מקבל את התמונה במהלך תצוגה מקדימה או הורדה.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את Favicon Generator",
        body: "התחילו בדפדפן — עיבוד client-side, ללא תור העלאה וללא חשבון Pix-8.",
      },
      {
        title: "טענו וצפו מקומית",
        body: "בחרו את לוגו או הסימן של אתר WordPress מהמכשיר. התאימו זום, ואז אשרו תצוגות לשונית וגודל פיקסלים שמרונדרות במכשיר.",
      },
      {
        title: "ייצאו, ואז הוסיפו ב-WordPress",
        body: "הורידו favicon.ico או PNG, ואז העלו דרך מראה → התאמה אישית → זהות האתר או הגדרת favicon של התבנית.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים ליצור favicon ל-WordPress?",
      body: "פתחו את Favicon Generator, טענו תמונה מקומית, צפו בגדלי לשונית, ייצאו ICO או PNG, ואז העלו את הקובץ ב-WordPress — כל העיבוד נשאר במכשיר.",
      button: "פתחו את Favicon Generator",
    },
  },
  "professional-favicon-maker-for-business": {
    id: "professional-favicon-maker-for-business" as FaviconGeneratorLandingId,
    path: "/professional-favicon-maker-for-business",
    linkTitle: "יוצר favicon מקצועי לעסק",
    linkExcerpt:
      "יוצר favicon מקצועי לעסק — טעינה מקומית, תצוגת לשונית 16–48px, ייצוא ICO או PNG ב-client-side.",
    seo: {
      title: "יוצר Favicon מקצועי לעסק",
      description:
        "יוצר favicon מקצועי לעסק בדפדפן. טעינת לוגו חברה מקומית, תצוגה מקדימה ב-16×16 עד 48×48, וייצוא favicon.ico או PNG במכשיר — ללא העלאה, ללא חשבון. Favicon Generator client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "האם זו פלטפורמת ניהול מותג מלאה לעסקים?",
        answer:
          "לא. Favicon Generator של Pix-8 הוא כלי ממוקד לקבצי favicon לשונית דפדפן מתמונת לוגו רסטר אחת לכל סשן. הוא מציג 16×16, 32×32 ו-48×48, מייצא favicon.ico מרובה גדלים או PNG בגודל 32×32, ומעבד הכל client-side בדפדפן. הכלי לא מספק הנחיות מותג, ספריות נכסים לצוות, SSO, חשבוניות או סטי אייקון לפלטפורמות מרובות.",
      },
      {
        question: "למה להשתמש ביוצר favicon client-side ללוגו עסקי?",
        answer:
          "סימני עסק לעיתים לא צריכים לעבור דרך צינור העלאה של צד שלישי לפני השקה. Pix-8 קורא את הלוגו מהמכשיר, מרנדר תצוגות מקדימות בגודל לשונית על קנבס client-side ומייצא במכשיר — התמונה לא נשלחת ל-Pix-8 במהלך תצוגה מקדימה או הורדה. זה מתאים לעבודת לקוח חסויה, אתרים לפני השקה ומסירת עיצוב מקומית בלבד.",
      },
      {
        question: "אילו קבצים אתר עסקי יכול לייצא מהכלי?",
        answer:
          "אפשר להתאים זום על חיתוך ריבוע מרכזי, לבדוק מוקאפי לשונית, ואז להוריד favicon.ico מרובה גדלים (16, 32 ו-48 px) או PNG בגודל 32×32 לאתר החברה. הכלי לא מייצר באצווה אייקונים ל-iOS, Android, פרופילים חברתיים או חתימות דוא\"ל, ולא עורך את ה-HTML של האתר.",
      },
    ],
    eyebrow: "עסקי · client-side · ללא העלאה",
    titleMain: "יוצר favicon מקצועי לעסק",
    titleAccent: "הסימן שלכם, מוכן ללשונית",
    heroSubtitle:
      "צריכים יוצר favicon מקצועי לעסק? Favicon Generator של Pix-8 רץ בדפדפן עם עיבוד client-side — ללא העלאה, ללא חשבון. טענו לוגו חברה מהמכשיר, צפו באייקוני לשונית ב-16×16, 32×32 ו-48×48, התאימו מסגור זום, וייצאו favicon.ico או PNG במכשיר לפני שהאתר העסקי עולה לאוויר.",
    primaryCta: "יצירת favicon עסקי — בחינם",
    ctaNote: "ללא העלאה · ללא חשבון · במכשיר בלבד",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "ייצוא favicon לשונית לאתרים עסקיים — לא חבילת מותג ארגונית",
      body: "Pix-8 הופך לוגו רסטר מקומי אחד לכל סשן לקבצי favicon לשונית דפדפן. צפו בגדלי לשונית אמיתיים, כוונו זום על חיתוך ריבוע מרכזי, ואז הורידו favicon.ico (16, 32 ו-48 px) או PNG בגודל 32×32 על קנבס client-side — בלי לשלוח נתוני פיקסלים ל-Pix-8. הכלי לא מנהל פורטלי מותג, לא מקצה מושבים לצוות ולא מספק רשתות אייקון מלאות לחנויות אפליקציות.",
    },
    benefitsHeading: "למה עסקים משתמשים ביוצר favicon הזה",
    benefitsIntro:
      "אתר עסקי צריך favicon שיישאר קריא בקנה מידה של לשונית. Pix-8 נותן תצוגה מקדימה, ייצוא ועיבוד מקומי כשצריך ",
    benefitsKeyword: "יוצר favicon מקצועי לעסק",
    benefitsIntroAfter:
      " — בלי להעביר את סימן החברה דרך שרת המרה מרוחק קודם.",
    benefits: [
      {
        title: "בקרת איכות בגודל לשונית לפני השקה",
        body: "בדקו רינדורים ב-16×16, 32×32 ו-48×48 ובמוקאפ לשונית בדפדפן — כדי שהלוגו יחזיק בממשק דפדפן אמיתי.",
      },
      {
        title: "קבצי ייצוא מוכנים לאתר",
        body: "הורידו favicon.ico מרובה גדלים או PNG בגודל 32×32 מאותו סשן — פורמטים סטנדרטיים לאתרי עסק ופריסות staging.",
      },
      {
        title: "client-side לסימנים רגישים",
        body: "טעינה מהמכשיר וייצוא בלשונית הדפדפן. Pix-8 לא מקבל את הלוגו במהלך תצוגה מקדימה או הורדה.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את Favicon Generator",
        body: "התחילו בדפדפן — עיבוד client-side, ללא הרשמה ארגונית או תור העלאה.",
      },
      {
        title: "טענו את לוגו העסק",
        body: "בחרו סימן חברה מהמכשיר. התאימו זום, ואז אשרו תצוגות לשונית וגודל פיקסלים שמרונדרות במכשיר.",
      },
      {
        title: "ייצאו לאתר שלכם",
        body: "הורידו favicon.ico או PNG והוסיפו לשורש האתר העסקי, ל-CMS או לצינור הפריסה.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים לשגר favicon עסקי?",
      body: "פתחו את Favicon Generator, טענו לוגו מקומי, צפו בגדלי לשונית וייצאו ICO או PNG — client-side, כולו במכשיר.",
      button: "פתחו את Favicon Generator",
    },
  },
  "favicon-converter-for-all-browsers": {
    id: "favicon-converter-for-all-browsers" as FaviconGeneratorLandingId,
    path: "/favicon-converter-for-all-browsers",
    linkTitle: "ממיר favicon לדפדפנים",
    linkExcerpt:
      "ממיר favicon לכל הדפדפנים — ICO מרובה גדלים או PNG, תצוגה 16–48px, client-side, ללא העלאה.",
    seo: {
      title: "ממיר Favicon לכל הדפדפנים",
      description:
        "ממיר favicon לכל הדפדפנים בלשונית הדפדפן. טעינת תמונה מקומית, תצוגה מקדימה ב-16×16 עד 48×48, וייצוא favicon.ico מרובה גדלים או PNG במכשיר — ללא העלאה. Favicon Generator client-side מאת Pix-8.",
    },
    faq: [
      {
        question: "האם זה יוצר קבצי favicon נפרדים לכל דפדפן?",
        answer:
          "לא. Favicon Generator של Pix-8 מייצא favicon.ico מרובה גדלים אחד (16, 32 ו-48 px משולבים) או PNG בגודל 32×32 ממקור רסטר אחד לכל סשן. דפדפנים מודרניים בוחרים את הגודל המתאים מ-ICO או PNG סטנדרטי — Pix-8 לא בונה חבילות ייעודיות לדפדפן, מסכות SVG ללשונית נעוצה ב-Safari או פורמטים ישנים ל-Internet Explorer בלבד.",
      },
      {
        question: "אילו דפדפנים יכולים להציג את ה-favicon שיוצא?",
        answer:
          "דפדפני שולחן עבודה ומובייל מודרניים שקוראים favicon.ico או PNG ב-head של האתר או בשורש בדרך כלל תומכים בייצואים האלה — כולל Chromium, Firefox, Safari ו-Edge. Pix-8 מציג תצוגה מקדימה ב-16×16, 32×32 ו-48×48 לפני ההורדה. הכלי לא מאשר תאימות לכל גרסת דפדפן ולא מייצר רשתות אייקון PWA מלאות.",
      },
      {
        question: "האם ההמרה מתבצעת מקומית?",
        answer:
          "כן. פענוח, חיתוך, תצוגה מקדימה וייצוא רצים על קנבס client-side בלשונית הדפדפן. התמונה נקראת מהמכשיר ומעובדת מקומית — היא לא מועלה ל-Pix-8 או לשרת המרה מרוחק במהלך תצוגה מקדימה או הורדה.",
      },
    ],
    eyebrow: "חוצה-דפדפנים · client-side · ללא העלאה",
    titleMain: "ממיר favicon לכל הדפדפנים",
    titleAccent: "ICO אחד, דפדפנים עיקריים",
    heroSubtitle:
      "צריכים ממיר favicon לכל הדפדפנים? Favicon Generator של Pix-8 רץ בדפדפן עם עיבוד client-side — ללא העלאה, ללא חשבון. טענו תמונה מהמכשיר, צפו באייקוני לשונית ב-16×16, 32×32 ו-48×48, התאימו מסגור זום, וייצאו favicon.ico מרובה גדלים או PNG במכשיר לתצוגת לשונית סטנדרטית חוצת דפדפנים.",
    primaryCta: "המרת favicon — בחינם",
    ctaNote: "ללא העלאה · ICO מרובה גדלים · במכשיר בלבד",
    capabilities: FAVICON_GENERATOR_CAPABILITIES_HE,
    capabilitiesHeading: "מה הכלי עושה",
    featureCallout: {
      title: "ייצוא favicon סטנדרטי חוצה דפדפנים — לא חבילות אייקון לכל דפדפן",
      body: "Pix-8 משלב 16×16, 32×32 ו-48×48 ב-favicon.ico אחד, או מייצא PNG בגודל 32×32 — פורמטים שדפדפנים עיקריים כבר קוראים משורשי אתרים ומתגי HTML head. צפו בגדלי לשונית על קנבס client-side לפני ההורדה, בלי לשלוח נתוני פיקסלים ל-Pix-8. הכלי לא מייצר SVG ללשונית נעוצה ב-Safari, manifest ייעודי ל-Firefox או נכסים נפרדים לכל מנוע דפדפן.",
    },
    benefitsHeading: "למה להשתמש בממיר favicon חוצה דפדפנים?",
    benefitsIntro:
      "דפדפנים בוחרים גדלי favicon מקבוצה קטנה של קבצים סטנדרטיים. Pix-8 מייצא את הקבוצה הזו מקומית כשצריך ",
    benefitsKeyword: "ממיר favicon לכל הדפדפנים",
    benefitsIntroAfter:
      " — עם תצוגה מקדימה בגודל לשונית ועיבוד client-side, בלי שלב העלאה מרוחק.",
    benefits: [
      {
        title: "ICO מרובה גדלים בקובץ אחד",
        body: "הורידו favicon.ico עם 16×16, 32×32 ו-48×48 משולבים — הפורמט שרוב הדפדפנים פותרים מקובץ שורש אחד.",
      },
      {
        title: "תצוגה מקדימה בקנה מידת לשונית לפני פריסה",
        body: "בדקו רינדורים בגודל פיקסלים ובמוקאפ לשונית בדפדפן כדי שהסימן יישאר קריא בממשק לשונית נפוץ.",
      },
      {
        title: "המרה מקומית, לא בשרת",
        body: "טעינה מהמכשיר וייצוא באותה לשונית בדפדפן. Pix-8 לא מקבל את התמונה במהלך תצוגה מקדימה או הורדה.",
      },
    ],
    howItWorksHeading: "איך זה עובד",
    stepLabel: "שלב",
    howItWorks: [
      {
        title: "פתחו את Favicon Generator",
        body: "התחילו בכל לשונית דפדפן מודרנית — עיבוד client-side, ללא תור העלאה.",
      },
      {
        title: "טענו וצפו בגדלים",
        body: "בחרו תמונה מהמכשיר. התאימו זום, ואז אשרו תצוגות 16×16, 32×32 ו-48×48 שמרונדרות במכשיר.",
      },
      {
        title: "ייצאו ICO או PNG",
        body: "הורידו favicon.ico מרובה גדלים או PNG בגודל 32×32 והוסיפו לשורש האתר או ל-HTML head לצריכה בדפדפן.",
      },
    ],
    faqHeading: "שאלות נפוצות",
    closingCta: {
      heading: "מוכנים להמיר favicon חוצה דפדפנים?",
      body: "פתחו את Favicon Generator, טענו תמונה מקומית, צפו בגדלי לשונית וייצאו ICO או PNG — client-side, כולו במכשיר.",
      button: "פתחו את Favicon Generator",
    },
  },
};
