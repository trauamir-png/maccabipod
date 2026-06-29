import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Tag, Share2 } from "lucide-react";
import { podcastMeta } from "@/lib/mockData";
import { getEpisodes, getEpisodeBySlug } from "@/lib/rss";
import AudioPlayer from "@/components/AudioPlayer";
import SocialIcon from "@/components/SocialIcon";
import EpisodeCard from "@/components/EpisodeCard";

export const revalidate = 1200;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const episodes = await getEpisodes();
  return episodes.slice(0, 50).map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);
  if (!episode) return {};
  return {
    title: `${episode.title} – מכביפוד`,
    description: episode.description,
  };
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

export default async function EpisodePage({ params }: Props) {
  const { slug } = await params;
  const [episode, allEpisodes] = await Promise.all([
    getEpisodeBySlug(slug),
    getEpisodes(),
  ]);

  if (!episode) notFound();

  const relatedEpisodes = allEpisodes
    .filter((ep) => ep.slug !== slug)
    .slice(0, 3);

  const cleanDescription = episode.longDescription
    ? stripHtml(episode.longDescription)
    : episode.description;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          בית
        </Link>
        <span>/</span>
        <Link href="/episodes" className="hover:text-yellow-400 transition-colors">
          פרקים
        </Link>
        <span>/</span>
        <span className="text-white truncate max-w-[200px]">{episode.title}</span>
      </nav>

      {/* Episode number badge */}
      {episode.episodeNumber > 0 && (
        <div className="inline-block bg-yellow-400 text-zinc-950 text-xs font-black px-3 py-1 rounded-full mb-4">
          פרק #{episode.episodeNumber}
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-black text-white mb-4 leading-snug">
        {episode.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-white text-sm mb-8">
        {episode.publishDate && (
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(episode.publishDate)}
          </span>
        )}
        {episode.duration && episode.duration !== "0:00" && (
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {episode.duration}
          </span>
        )}
      </div>

      {/* Episode image */}
      {episode.imageUrl && (
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl ring-2 ring-yellow-400/20 mb-7">
          <Image
            src={episode.imageUrl}
            alt={episode.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Central audio player */}
      {episode.audioUrl && (
        <div className="mb-6">
          <AudioPlayer
            audioUrl={episode.audioUrl}
            episodeTitle={episode.title}
            episodeNumber={episode.episodeNumber}
          />
        </div>
      )}

      {/* Platform buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        {podcastMeta.socialLinks
          .filter((l) => l.platform === "spotify" || l.platform === "apple")
          .map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm py-3.5 px-5 rounded-xl transition-colors border border-zinc-700 hover:border-yellow-400/50"
            >
              <SocialIcon platform={link.platform} className="w-6 h-6" />
              האזנה ב-{link.label}
            </a>
          ))}
        {episode.episodeLink && (
          <a
            href={episode.episodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm py-3.5 px-5 rounded-xl transition-colors border border-zinc-700 hover:border-yellow-400/50"
          >
            <Share2 className="w-6 h-6" />
            האזנה ב-Podbean
          </a>
        )}
      </div>

      {/* Description */}
      <div className="text-white leading-relaxed text-base whitespace-pre-line mb-8">
        {cleanDescription}
      </div>

      {/* Tags */}
      {episode.tags && episode.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {episode.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-zinc-800 text-white text-xs px-3 py-1 rounded-full"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Guests */}
      {episode.guests && episode.guests.length > 0 && (
        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 mb-8">
          <p className="text-white text-xs font-medium mb-2">אורחים בפרק</p>
          <div className="flex flex-wrap gap-2">
            {episode.guests.map((guest) => (
              <span
                key={guest}
                className="bg-zinc-800 text-white text-sm px-3 py-1 rounded-full"
              >
                {guest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Back */}
      <Link
        href="/episodes"
        className="flex items-center gap-2 text-white hover:text-yellow-400 text-sm transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        חזרה לכל הפרקים
      </Link>

      {/* More episodes */}
      {relatedEpisodes.length > 0 && (
        <div className="mt-16 pt-10 border-t border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-6">פרקים נוספים</h2>
          <div className="flex flex-col gap-3">
            {relatedEpisodes.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
