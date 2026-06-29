import { Mic2, Heart, Trophy, Radio, Users } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "אודות – מכביפוד",
  description:
    "פודקאסט אוהדים על מכבי ת\"א בכדורסל. אמיר טראו, גיא קופיצ'ינסקי, יאיר זרצקי ואיתי כהן.",
};

const highlights = [
  {
    icon: Trophy,
    title: "278+ פרקים",
    description: "מאות שעות של תוכן כדורסל איכותי מאז 2021",
  },
  {
    icon: Users,
    title: "4 מגישים",
    description: "אהבה אחת",
  },
  {
    icon: Radio,
    title: "כל שבוע",
    description: "פרק חדש מדי שבוע – אל תפספסו",
  },
  {
    icon: Heart,
    title: "חיים את מכבי",
    description: "לפני המשחק, אחרי המשחק ובין לבין.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-yellow-400/10 border border-yellow-400/20 mb-6">
          <Mic2 className="w-10 h-10 text-yellow-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          אודות <span className="text-yellow-400">מכביפוד</span>
        </h1>
        <p className="text-white text-lg max-w-2xl mx-auto leading-relaxed">
          פודקאסט אוהדים על מכבי ת&quot;א בכדורסל. אמיר טראו, גיא קופיצ&apos;ינסקי,
          יאיר זרצקי ואיתי כהן עם סקירות, פרשנויות, אורחים ועוד הפתעות.
        </p>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-white font-bold text-sm mb-1">{item.title}</div>
              <div className="text-white/70 text-xs leading-snug">{item.description}</div>
            </div>
          );
        })}
      </div>

      {/* Story */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 md:p-10 mb-8">
        <h2 className="text-2xl font-bold text-white mb-5">מה זה מכביפוד?</h2>
        <div className="space-y-4 text-white leading-relaxed">
          <p>
            מכביפוד הוא פודקאסט אוהדים על מכבי תל אביב בכדורסל. מה שהתחיל
            כשיחה בין חברים הפך לפודקאסט מצליח על הקבוצה האהובה שלנו.
          </p>
          <p>
            בכל פרק אנחנו מנתחים משחקים, מביאים פרשנות ייחודית, מארחים אורחים
            מעניינים ומדברים על כל מה שקורה סביב מכבי – ביורוליג, בליגה המקומית,
            ובשוק ההעברות.
          </p>
          <p>
            אנחנו לא עיתונאים – אנחנו אוהדים שיודעים לדבר על כדורסל.
            וזה בדיוק מה שמבדיל אותנו.
          </p>
        </div>
      </div>

      {/* Hosts placeholder */}
      <div className="bg-zinc-900/50 border border-dashed border-zinc-700 rounded-2xl p-8 mb-8 text-center">
        <Users className="w-10 h-10 text-white/50 mx-auto mb-3" />
        <p className="text-white/70 text-sm">פרופילי המגישים יתווספו בקרוב</p>
        <p className="text-white/50 text-xs mt-1">
          אמיר טראו · גיא קופיצ&apos;ינסקי · יאיר זרצקי · איתי כהן
        </p>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-yellow-400/10 to-transparent border border-yellow-400/20 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-3">הצטרפו לקהילה</h2>
        <p className="text-white text-sm mb-6">
          האזינו, שתפו, ובואו לדבר איתנו ברשתות החברתיות
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/episodes"
            className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bold px-6 py-3 rounded-full transition-colors text-sm"
          >
            <Mic2 className="w-4 h-4" />
            התחילו להאזין
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-full transition-colors text-sm"
          >
            צרו קשר
          </Link>
        </div>
      </div>
    </div>
  );
}
