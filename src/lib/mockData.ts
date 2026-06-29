import { Episode, PodcastMeta } from "./types";

// Mock episodes based on real recent episodes from the RSS feed
export const mockEpisodes: Episode[] = [
  {
    id: "278",
    slug: "ep-278-yesh-alipoot-lemaccabi",
    title: "פרק 278: יש אליפות למכבי!",
    description:
      "חוגגים את האליפות ה-58 של מכבי תל אביב אחרי ניצחון בסדרת הגמר נגד הפועל תל אביב. ניתוח סגנון המשחק, השחקנים, וחידושים לעונה הבאה.",
    longDescription: `חוגגים! מכבי תל אביב זכתה באליפות ה-58 אחרי ניצחון בסדרת הגמר נגד הפועל תל אביב.

בפרק הזה אנחנו מסכמים את הסדרה, מדברים על גיבורי הגמר, ומנסים להבין מה צפוי לנו בעונה הבאה – מה נשאר ומה צריך להשתנות.`,
    publishDate: "2026-06-29",
    duration: "1:19:19",
    durationSeconds: 4759,
    episodeNumber: 278,
    imageUrl: "/images/ep-placeholder.jpg",
    audioUrl: "https://mcdn.podbean.com/mf/web/b28uncmza8ink9im/S25_26-E278.mp3",
    episodeLink: "https://maccabi.podbean.com/e/פרק-278-יש-אליפות-למכבי/",
    tags: ["אליפות", "גמר", "הפועל תל אביב"],
    guests: [],
  },
  {
    id: "277",
    slug: "ep-277-hakrav-al-hatoanr",
    title: "פרק 277: הקרב על התואר",
    description:
      "חזרה לאחר הפסקה. ניתוח סדרה נגד חולון, דיון על שמועות שחקנים, והתכוננות לגמר מול הפועל תל אביב.",
    longDescription: `חזרנו! אחרי הפסקה – ניתוח מקיף של הסדרה מול חולון, מה הצליח ומה פחות, ומבט קדימה לגמר הגדול.

מדברים גם על שמועות שוק ההעברות ועל הצפי לעונה הבאה.`,
    publishDate: "2026-06-16",
    duration: "1:26:07",
    durationSeconds: 5167,
    episodeNumber: 277,
    imageUrl: "/images/ep-placeholder.jpg",
    audioUrl: "https://mcdn.podbean.com/mf/web/jxef42xuft3yajcm/S25_26-E277.mp3",
    episodeLink: "https://maccabi.podbean.com/e/פרק-277/",
    tags: ["פלייאוף", "גמר", "חולון"],
    guests: [],
  },
  {
    id: "276",
    slug: "ep-276-al-haritzpa",
    title: "פרק 276: על הרצפה",
    description:
      "סיכום הפסדים ביורוליג בבאסקוניה, פריז והפועל תל אביב. ניתוח ירידת היכולת של הקבוצה ושאלות על המשך.",
    longDescription: `שבוע קשה. שלושה הפסדים ברצף – ביורוליג ובליגה. מה קורה למכבי? מנסים להבין יחד.

ניתוח מעמיק של ירידת הכושר ושאלות על מה צריך להשתנות.`,
    publishDate: "2026-04-16",
    duration: "57:24",
    durationSeconds: 3444,
    episodeNumber: 276,
    imageUrl: "/images/ep-placeholder.jpg",
    audioUrl: "https://mcdn.podbean.com/mf/web/z282t4p5uckiiycn/S25_26-E276.mp3",
    episodeLink: "https://maccabi.podbean.com/e/פרק-276-על-הרצפה/",
    tags: ["יורוליג", "משבר", "ניתוח"],
    guests: [],
  },
  {
    id: "275",
    slug: "ep-275-shlosha-nitzachonot-layaad",
    title: "פרק 275: שלושה נצחונות ליעד",
    description:
      "אורח: רום גפן. ניתוח הנצחונות, ביצועי השחקנים, ודיון על עודד קטש והחוזה שלו.",
    longDescription: `רצף נצחונות חיובי! אורחנו הפרק הוא רום גפן, שמביא פרספקטיבה מעניינת.

מדברים על ביצועי השחקנים, על עודד קטש ועתידו, ועל מה שצריך לקרות כדי לשמור על המומנטום.`,
    publishDate: "2026-04-06",
    duration: "1:04:56",
    durationSeconds: 3896,
    episodeNumber: 275,
    imageUrl: "/images/ep-placeholder.jpg",
    audioUrl: "https://mcdn.podbean.com/mf/web/j3yxtavzjca972rk/S25_26-E275.mp3",
    episodeLink: "https://maccabi.podbean.com/e/פרק-275-שלושה-נצחונות-ליעד/",
    tags: ["נצחונות", "יורוליג", "ליגה"],
    guests: ["רום גפן"],
  },
  {
    id: "272",
    slug: "ep-272-gvia-gadol-betzahov-uvakhol",
    title: "פרק 272: גביע גדול בצהוב ובכחול",
    description:
      "סיכום זכיית גביע המדינה ה-47. ניתוח משחק הגמר, גיבורי הלילה, ומה זה אומר לעונה.",
    longDescription: `גביע המדינה ה-47 שייך למכבי! פרק חגיגי שמסכם את המסע לגביע ואת ניצחון הגמר.

הפרק מוקדש לזיכרון לי נוף שאיבדה את אביה.`,
    publishDate: "2026-02-23",
    duration: "54:25",
    durationSeconds: 3265,
    episodeNumber: 272,
    imageUrl: "/images/ep-placeholder.jpg",
    audioUrl: "https://mcdn.podbean.com/mf/web/btadtb33z8hq9s4b/S25_26-E272.mp3",
    episodeLink: "https://maccabi.podbean.com/e/גביע-גדול-בצהוב-ובכחול/",
    tags: ["גביע המדינה", "אליפות", "גמר"],
    guests: [],
  },
  {
    id: "265",
    slug: "ep-265-december-tzahov-kakhol",
    title: "פרק 265: דצמבר צהוב-כחול",
    description:
      "סיכום חודש דצמבר מבחינת מכבי, ניצחון בפרטיזן בלגרד, ודיון על קבוצת ההגנה של מכבי.",
    longDescription: `סיכום חודש דצמבר – ניצחונות, הפסדים, וניתוח לאן הקבוצה הולכת.

הנקודה המרכזית: מה קורה להגנה של מכבי? ואיך מנצחים בבלגרד?`,
    publishDate: "2025-12-30",
    duration: "1:14:15",
    durationSeconds: 4455,
    episodeNumber: 265,
    imageUrl: "/images/ep-placeholder.jpg",
    audioUrl: "https://mcdn.podbean.com/mf/web/9yh998bi4x7vvd88/S25_26-E265.mp3",
    episodeLink: "https://maccabi.podbean.com/e/פרק-265-דצמבר-צהוב-כחול/",
    tags: ["יורוליג", "פרטיזן", "סיכום חודשי"],
    guests: [],
  },
];

export const podcastMeta: PodcastMeta = {
  title: "מכביפוד",
  description:
    "פודקאסט אוהדים על מכבי ת\"א בכדורסל. אמיר טראו, גיא קופיצ'ינסקי, יאיר זרצקי ואיתי כהן עם סקירות, פרשנויות, אורחים ועוד הפתעות.",
  author: "אמיר טראו, גיא קופיצ'ינסקי, יאיר זרצקי ואיתי כהן",
  email: "maccabipod@gmail.com",
  imageUrl: "/images/podcast-cover.jpg",
  language: "he",
  categories: ["Sports", "Basketball"],
  rssUrl: "https://feed.podbean.com/maccabi/feed.xml",
  podbeanUrl: "https://maccabi.podbean.com",
  totalEpisodes: 278,
  socialLinks: [
    {
      platform: "spotify",
      url: "https://open.spotify.com/show/2PyinLvzmJzjtY3Banvyuo",
      label: "Spotify",
    },
    {
      platform: "apple",
      url: "https://podcasts.apple.com/us/podcast/maccabipod-%D7%9E%D7%9B%D7%91%D7%99%D7%A4%D7%95%D7%93/id1577595973",
      label: "Apple Podcasts",
    },
    {
      platform: "facebook",
      url: "https://www.facebook.com/maccabipod/?locale=he_IL",
      label: "Facebook",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/MACCABIPOD/",
      label: "Instagram",
    },
    {
      platform: "whatsapp",
      url: "https://whatsapp.com/channel/0029VaFNH3y7tkj3wPZ5qh3N",
      label: "WhatsApp",
    },
    {
      platform: "twitter",
      url: "https://x.com/Maccabipod",
      label: "Twitter / X",
    },
  ],
};
