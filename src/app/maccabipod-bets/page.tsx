import Image from "next/image";

export const metadata = {
  title: "הימורי מכביפוד – מכביפוד",
  description: "הימורי מכביפוד",
};

export default function MaccabipodBetsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-10">
        הימורי מכביפוד
      </h1>

      <div className="space-y-3 text-white text-base leading-relaxed text-center mb-12">
        <p>הימורי מכביפוד גרסת 2026.</p>
        <p>
          החל מהעונה ההימורים שלנו עוברים למערכת ממוחשבת שתעשה לכולנו את החיים
          קלים יותר ומעוצבים יותר.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Android */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center gap-4">
          <p className="text-white text-sm leading-relaxed">
            בעלי מכשירים סלולריים עם מערכת הפעלה אנדרואיד, מוזמנים להוריד את
            האפליקציה בחנות האפליקציות בלינק הבא:
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.maccabibet.app&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Image
              src="/images/google-play-logo.png"
              alt="הורידו ב-Google Play"
              width={285}
              height={64}
              unoptimized
              className="h-[64px] w-auto"
            />
          </a>
        </div>

        {/* Apple */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center gap-4">
          <p className="text-white text-sm leading-relaxed">
            בעלי מכשירי אפל, מוזמנים לבינתיים לרשום את ההימורים שלכם באתר
            הבא:
          </p>
          <a
            href="https://maccabibet.com/leagues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-maccabi-yellow hover:bg-maccabi-yellow-light text-navy-950 font-bold px-6 py-3 rounded-full transition-colors text-sm"
          >
            למעבר לאתר ההימורים
          </a>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-5 text-center">
          חוקי ההימורים
        </h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <ol className="list-none space-y-4 text-white text-sm leading-relaxed">
            <li>
              1. בכל פרק חברי הפאנל יציגו את ההימורים השבועיים שלנו. בסיום
              הפרק ההימורים יופיעו גם באתר.
            </li>
            <li>
              2. ההימורים נסגרים חצי שעה לפני פתיחת המשחק. יש להקפיד למלא את
              ההימורים עד הדדליין אחרת לא ניתן יהיה לכלול את ההימורים שלו
              בתחרות באותו השבוע.
            </li>
            <li>
              3. על מנת להיות זכאים לפרס בסיום העונה (במידה וסיימתם באחד
              המקומות שאכן מקנים פרס), עליכם להמר בלפחות 65% מההימורים במהלך
              העונה. במידה ולא הגעתם ל־65%, לא תהיו זכאים לפרס.
            </li>
          </ol>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-5 text-center">
          מדריך לאפליקציית ההימורים החדשה
        </h2>
        <p className="text-white text-sm leading-relaxed text-center mb-6">
          אנחנו מצרפים לכם סרטון הדרכה על אפליקציית ההימורים החדשה שלנו:
        </p>
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-2 ring-yellow-400/20 bg-black">
          <iframe
            src="https://www.youtube.com/embed/2NmNng8pmTg"
            title="מדריך לאפליקציית ההימורים החדשה"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
