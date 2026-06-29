import Link from "next/link";
import Image from "next/image";
import { Play, Headphones, ArrowLeft, Users } from "lucide-react";
import { getEpisodes } from "@/lib/rss";
import EpisodeCard from "@/components/EpisodeCard";

export const revalidate = 1200;

const stats = [
  { label: "פרקים", value: "278+", color: "text-maccabi-yellow" },
  { label: "הורדות", value: "191K+", color: "text-maccabi-blue-light" },
  { label: "מגישים", value: "4", color: "text-maccabi-yellow" },
  { label: "שנים", value: "7+", color: "text-maccabi-blue-light" },
];

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function HomePage() {
  const episodes = await getEpisodes();
  const latestEpisode = episodes[0];
  const recentEpisodes = episodes.slice(1, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background gradients — yellow left, blue right */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-maccabi-yellow/5 rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-maccabi-blue/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-maccabi-blue/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 pt-16 pb-20 md:pt-24 relative">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text */}
            <div className="flex-1 text-center md:text-right order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-maccabi-blue/10 border border-maccabi-blue/30 text-maccabi-blue-light text-xs font-medium px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-maccabi-blue-light animate-pulse" />
                פרק חדש זמין עכשיו
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                הפודקאסט על{" "}
                <span className="text-maccabi-yellow">מכבי תל אביב</span>
              </h1>

              <p className="text-white text-lg md:text-xl leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
                סיכומי משחקים, ניתוחים, דעות וסיפורים מהיציע — כל שבוע עם הפאנל של מכביפוד ואורחים.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link
                  href="/episodes"
                  className="inline-flex items-center justify-center gap-2 bg-maccabi-yellow hover:bg-maccabi-yellow-light text-navy-950 font-bold px-6 py-3 rounded-full transition-colors"
                >
                  <Play className="w-4 h-4" fill="currentColor" />
                  כל הפרקים
                </Link>
                {latestEpisode && (
                  <Link
                    href={`/episodes/${latestEpisode.slug}`}
                    className="inline-flex items-center justify-center gap-2 bg-maccabi-blue/20 hover:bg-maccabi-blue/30 border border-maccabi-blue/40 text-white font-medium px-6 py-3 rounded-full transition-colors"
                  >
                    <Headphones className="w-4 h-4" />
                    הפרק האחרון
                  </Link>
                )}
              </div>
            </div>

            {/* Latest episode card */}
            {latestEpisode && (
              <div className="flex-shrink-0 order-1 md:order-2">
                <Link href={`/episodes/${latestEpisode.slug}`} className="group block w-72 md:w-80">
                  <div className="rounded-2xl overflow-hidden border border-navy-600 hover:border-maccabi-yellow/40 transition-all shadow-2xl shadow-navy-950/50 bg-navy-800">
                    {/* Square image */}
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={latestEpisode.imageUrl || "/logo-square.png"}
                        alt={latestEpisode.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-navy-950/40 flex items-center justify-center transition-all">
                        <div className="w-12 h-12 rounded-full bg-maccabi-yellow/80 group-hover:bg-maccabi-yellow group-hover:scale-110 flex items-center justify-center shadow-lg transition-all">
                          <Play className="w-5 h-5 text-navy-950 mr-[-2px]" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    {/* Episode info */}
                    <div className="p-4">
                      <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 mb-2 group-hover:text-maccabi-yellow transition-colors">
                        {latestEpisode.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/70 text-xs">
                        {latestEpisode.publishDate && (
                          <span>{formatDate(latestEpisode.publishDate)}</span>
                        )}
                        {latestEpisode.duration && latestEpisode.duration !== "0:00" && (
                          <>
                            <span>·</span>
                            <span>{latestEpisode.duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-navy-700 bg-navy-900/40">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                <div className="text-white text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent episodes */}
      {recentEpisodes.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-white mb-6">פרקים אחרונים</h2>
          <div className="flex flex-col gap-3">
            {recentEpisodes.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} hideEpisodeNumber />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/episodes"
              className="inline-flex items-center gap-2 border border-maccabi-yellow/30 hover:border-maccabi-yellow text-maccabi-yellow px-6 py-3 rounded-full text-sm font-medium transition-colors"
            >
              הצג את כל הפרקים
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* About teaser */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-maccabi-blue/10 via-navy-800/50 to-maccabi-yellow/5 border border-navy-600 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
          <Users className="w-12 h-12 text-maccabi-blue-light flex-shrink-0" />
          <div className="flex-1 text-center md:text-right">
            <h2 className="text-xl font-bold text-white mb-2">מי אנחנו?</h2>
            <p className="text-white text-sm leading-relaxed">
              אמיר טראו, גיא קופיצ&apos;ינסקי, יאיר זרצקי ואיתי כהן – ארבעה
              אוהדים שיודעים לדבר על כדורסל. 278+ פרקים, 191K+ הורדות,
              ותשוקה אמיתית למכבי תל אביב.
            </p>
          </div>
          <Link
            href="/about"
            className="bg-maccabi-yellow hover:bg-maccabi-yellow-light text-navy-950 font-bold px-5 py-2.5 rounded-full text-sm transition-colors flex-shrink-0"
          >
            קרא עוד
          </Link>
        </div>
      </section>
    </>
  );
}
