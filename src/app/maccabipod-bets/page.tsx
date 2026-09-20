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
    </div>
  );
}
