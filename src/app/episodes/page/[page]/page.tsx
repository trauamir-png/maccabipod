import { notFound } from "next/navigation";
import { Headphones } from "lucide-react";
import { getEpisodes } from "@/lib/rss";
import EpisodeCard from "@/components/EpisodeCard";
import Pagination from "@/components/Pagination";

export const revalidate = 3600;
export const dynamicParams = true;

const EPISODES_PER_PAGE = 15;

export async function generateStaticParams() {
  const episodes = await getEpisodes();
  const totalPages = Math.ceil(episodes.length / EPISODES_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);
  return {
    title: pageNum === 1 ? "כל הפרקים – מכביפוד" : `פרקים – עמוד ${pageNum} | מכביפוד`,
    description: "ארכיון כל פרקי הפודקאסט על מכבי תל אביב בכדורסל",
  };
}

export default async function EpisodesPagePaginated({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);

  if (!pageNum || pageNum < 1) notFound();

  const allEpisodes = await getEpisodes();
  const totalEpisodes = allEpisodes.length;
  const totalPages = Math.ceil(totalEpisodes / EPISODES_PER_PAGE);

  if (pageNum > totalPages && totalPages > 0) notFound();

  const start = (pageNum - 1) * EPISODES_PER_PAGE;
  const episodes = allEpisodes.slice(start, start + EPISODES_PER_PAGE);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-maccabi-yellow/10 border border-maccabi-yellow/20 mb-4">
          <Headphones className="w-7 h-7 text-maccabi-yellow" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
          כל הפרקים
        </h1>
        <p className="text-white/70 text-sm">
          {totalEpisodes > 0
            ? `${totalEpisodes} פרקים · עמוד ${pageNum} מתוך ${totalPages}`
            : "טוען פרקים..."}
        </p>
      </div>

      {/* Episodes list */}
      {episodes.length > 0 ? (
        <>
          <div className="flex flex-col gap-4">
            {episodes.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>

          <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            basePath="/episodes/page"
          />
        </>
      ) : (
        <div className="text-center py-20 text-zinc-500">
          <Headphones className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>לא ניתן לטעון את הפרקים כרגע. נסו שוב בקרוב.</p>
        </div>
      )}
    </div>
  );
}
