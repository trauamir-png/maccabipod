import { Mail, Send } from "lucide-react";
import { podcastMeta } from "@/lib/mockData";
import SocialIcon from "@/components/SocialIcon";

export const metadata = {
  title: "צור קשר – מכביפוד",
  description: "צרו קשר עם מכביפוד",
};

const platformLabels: Record<string, string> = {
  spotify: "האזינו ב-Spotify",
  apple: "האזינו ב-Apple Podcasts",
  facebook: "עקבו ב-Facebook",
  instagram: "עקבו ב-Instagram",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 mb-4">
          <Send className="w-7 h-7 text-yellow-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
          צור קשר
        </h1>
        <p className="text-white">יש לכם שאלה, רעיון לפרק, או סתם רוצים להגיד שלום?</p>
      </div>

      {/* Social / Listen links */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 mb-6">
        <h2 className="text-white font-bold mb-5">מצאו אותנו ברשת</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {podcastMeta.socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-yellow-500/40 rounded-xl p-4 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-yellow-400/10 flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors">
                <SocialIcon platform={link.platform} className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <div className="text-white text-sm font-medium">
                  {platformLabels[link.platform] || link.label}
                </div>
                <div className="text-white/70 text-xs">{link.label}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Email */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
        <h2 className="text-white font-bold mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-yellow-400" />
          דוא"ל
        </h2>
        <p className="text-white text-sm mb-3">
          לשאלות, הצעות לשיתוף פעולה, ורעיונות לפרקים:
        </p>
        <a
          href={`mailto:${podcastMeta.email}`}
          className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
        >
          {podcastMeta.email}
        </a>
      </div>

    </div>
  );
}
