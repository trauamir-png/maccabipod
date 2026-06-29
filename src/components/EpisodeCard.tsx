import Link from "next/link";
import Image from "next/image";
import { Clock, Play, Calendar } from "lucide-react";
import { Episode } from "@/lib/types";

interface EpisodeCardProps {
  episode: Episode;
  featured?: boolean;
  hideEpisodeNumber?: boolean;
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

function EpisodeCover({
  imageUrl,
  title,
  size = "md",
}: {
  imageUrl: string;
  title: string;
  size?: "sm" | "md" | "lg";
}) {
  const hasImage = imageUrl && !imageUrl.startsWith("/images/");

  if (hasImage) {
    return (
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        sizes={size === "lg" ? "(max-width: 768px) 100vw, 50vw" : "120px"}
      />
    );
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-maccabi-blue/20 via-navy-800 to-navy-900 flex items-center justify-center">
      <Play className="w-8 h-8 text-maccabi-yellow/40" fill="currentColor" />
    </div>
  );
}

export default function EpisodeCard({ episode, featured = false, hideEpisodeNumber = false }: EpisodeCardProps) {
  if (featured) {
    return (
      <Link href={`/episodes/${episode.slug}`} className="group block">
        <div className="bg-navy-800 rounded-2xl overflow-hidden border border-navy-600 hover:border-maccabi-blue/60 transition-all duration-300 hover:shadow-xl hover:shadow-maccabi-blue/10">
          <div className="flex flex-col md:flex-row">

            {/* Square episode image */}
            <div className="relative w-full md:w-72 lg:w-80 flex-shrink-0 aspect-square overflow-hidden">
              <EpisodeCover imageUrl={episode.imageUrl} title={episode.title} size="lg" />
              {/* Overlay + play button */}
              <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-navy-950/40 flex items-center justify-center transition-all">
                <div className="w-14 h-14 rounded-full bg-maccabi-yellow/80 group-hover:bg-maccabi-yellow group-hover:scale-110 flex items-center justify-center transition-all shadow-lg shadow-maccabi-yellow/20">
                  <Play className="w-6 h-6 text-navy-950 mr-[-2px]" fill="currentColor" />
                </div>
              </div>
              {episode.episodeNumber > 0 && !hideEpisodeNumber && (
                <div className="absolute top-3 right-3 z-10 bg-maccabi-yellow text-navy-950 text-xs font-black px-2.5 py-1 rounded-full">
                  #{episode.episodeNumber}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-between min-w-0">
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-3 group-hover:text-maccabi-yellow transition-colors line-clamp-2">
                  {episode.title}
                </h2>
                <p className="text-white text-sm leading-relaxed line-clamp-4 mb-4">
                  {episode.description}
                </p>
                <div className="flex items-center gap-4 text-white/70 text-xs">
                  {episode.publishDate && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(episode.publishDate)}
                    </span>
                  )}
                  {episode.duration && episode.duration !== "0:00" && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {episode.duration}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <span className="inline-flex items-center gap-2 bg-maccabi-yellow group-hover:bg-maccabi-yellow-light text-navy-950 font-bold px-5 py-2.5 rounded-full text-sm transition-colors">
                  <Play className="w-4 h-4" fill="currentColor" />
                  האזנה לפרק
                </span>
              </div>
            </div>

          </div>
        </div>
      </Link>
    );
  }

  // List card (non-featured)
  return (
    <Link href={`/episodes/${episode.slug}`} className="group block">
      <div className="flex gap-5 bg-navy-900 hover:bg-navy-800 rounded-2xl p-4 sm:p-5 border border-navy-700 hover:border-navy-600 transition-all duration-200 hover:shadow-lg hover:shadow-navy-950/50">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden relative bg-navy-800">
          <EpisodeCover imageUrl={episode.imageUrl} title={episode.title} size="sm" />
          {/* Play overlay on hover */}
          <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/50 flex items-center justify-center transition-all">
            <Play
              className="w-6 h-6 text-maccabi-yellow opacity-0 group-hover:opacity-100 transition-opacity"
              fill="currentColor"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            {/* Episode number + title row */}
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="text-white font-bold text-base leading-snug group-hover:text-maccabi-yellow transition-colors line-clamp-2 flex-1">
                {episode.title}
              </h3>
              {episode.episodeNumber > 0 && !hideEpisodeNumber && (
                <span className="text-maccabi-blue-light text-xs font-bold flex-shrink-0 mt-0.5 bg-maccabi-blue/10 border border-maccabi-blue/20 px-2 py-0.5 rounded-full">
                  #{episode.episodeNumber}
                </span>
              )}
            </div>

            {/* Date & duration */}
            <div className="flex items-center gap-3 text-white/70 text-xs mb-2">
              {episode.publishDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  {formatDate(episode.publishDate)}
                </span>
              )}
              {episode.duration && episode.duration !== "0:00" && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  {episode.duration}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-zinc-200 text-sm leading-relaxed line-clamp-2">
              {episode.description}
            </p>
          </div>

          {/* Listen link */}
          <div className="flex items-center gap-1 mt-2.5 text-maccabi-yellow text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-3 h-3" fill="currentColor" />
            לפרק המלא
          </div>
        </div>
      </div>
    </Link>
  );
}
