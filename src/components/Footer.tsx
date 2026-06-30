import Link from "next/link";
import Image from "next/image";
import { podcastMeta } from "@/lib/mockData";
import SocialIcon from "./SocialIcon";

const LISTEN_PLATFORMS = ["spotify", "apple"];
const FOLLOW_PLATFORMS = ["facebook", "instagram", "whatsapp", "twitter"];

export default function Footer() {
  const listen = podcastMeta.socialLinks.filter((l) => LISTEN_PLATFORMS.includes(l.platform));
  const follow = podcastMeta.socialLinks.filter((l) => FOLLOW_PLATFORMS.includes(l.platform));

  return (
    <footer className="bg-navy-950 border-t border-navy-700 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-x-6 gap-y-8">

          {/* Brand — first child = RIGHT column in RTL */}
          <div className="text-center md:text-right">
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/logo.png"
                alt="מכביפוד"
                width={3000}
                height={495}
                className="h-10 w-auto max-w-[200px] object-contain"
              />
            </Link>
            <p className="text-white text-sm leading-relaxed">
              פודקאסט האוהדים של מכבי תל אביב בכדורסל.
              סקירות, פרשנויות, אורחים ועוד הפתעות – כל שבוע.
            </p>
          </div>

          {/* ניווט */}
          <div className="text-center md:text-right">
            <h3 className="text-maccabi-yellow font-semibold mb-3 text-xs uppercase tracking-wider">
              ניווט
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "בית" },
                { href: "/episodes", label: "כל הפרקים" },
                { href: "/about", label: "אודות" },
                { href: "/contact", label: "צור קשר" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-maccabi-yellow transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* האזנה */}
          <div className="text-center md:text-right">
            <h3 className="text-maccabi-yellow font-semibold mb-3 text-xs uppercase tracking-wider">
              האזנה
            </h3>
            <div className="flex flex-col gap-2 w-full max-w-[260px] mx-auto md:max-w-none md:mx-0">
              {listen.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-2 w-full bg-navy-800 hover:bg-navy-700 border border-navy-600 hover:border-maccabi-blue/50 text-white px-3 py-2 rounded-lg text-xs transition-all"
                >
                  <SocialIcon platform={link.platform} className="w-4 h-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* עקבו אחרינו — col 5 (leftmost), col 4 left as spacer */}
          <div className="text-center md:text-right md:col-start-5">
            <h3 className="text-maccabi-yellow font-semibold mb-3 text-xs uppercase tracking-wider">
              עקבו אחרינו
            </h3>
            <div className="flex flex-col gap-2 w-full max-w-[260px] mx-auto md:max-w-none md:mx-0">
              {follow.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-2 w-full bg-navy-800 hover:bg-navy-700 border border-navy-600 hover:border-maccabi-blue/50 text-white px-3 py-2 rounded-lg text-xs transition-all"
                >
                  <SocialIcon platform={link.platform} className="w-4 h-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="border-t border-navy-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white text-xs">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://amirtrau.co.il"
              target="_blank"
              rel="noopener noreferrer"
              className="text-maccabi-blue-light hover:text-maccabi-yellow transition-colors"
            >
              אמיר טראו
            </a>
            {" "}· כל הזכויות שמורות
          </p>
          <p className="text-white text-xs">
            יאללה מכבי!
          </p>
        </div>
      </div>
    </footer>
  );
}
