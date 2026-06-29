import Parser from "rss-parser";
import { Episode } from "./types";

const RSS_URL = "https://feed.podbean.com/maccabi/feed.xml";

type RSSItem = {
  "itunes:duration"?: string;
  "itunes:image"?: { href?: string; $?: { href?: string } } | string;
  "itunes:episode"?: string;
  enclosure?: { url: string; type?: string; length?: string };
};


function parseDuration(raw: string | undefined): {
  formatted: string;
  seconds: number;
} {
  if (!raw) return { formatted: "0:00", seconds: 0 };

  if (raw.includes(":")) {
    const parts = raw.split(":").map(Number);
    let sec = 0;
    if (parts.length === 3) {
      sec = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else {
      sec = parts[0] * 60 + parts[1];
    }
    return { formatted: raw, seconds: sec };
  }

  const sec = parseInt(raw) || 0;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const formatted =
    h > 0
      ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      : `${m}:${String(s).padStart(2, "0")}`;
  return { formatted, seconds: sec };
}

function extractEpisodeNumber(title: string, episodeField?: string): number {
  if (episodeField) {
    const n = parseInt(episodeField);
    if (!isNaN(n)) return n;
  }
  const match = title.match(/פרק\s*(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function makeSlug(episodeNumber: number, title: string): string {
  if (episodeNumber > 0) return `ep-${episodeNumber}`;
  return `ep-${title
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .toLowerCase()
    .substring(0, 40)}`;
}

function getImageUrl(item: Parser.Item & RSSItem): string {
  const img = item["itunes:image"];
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object") return img.href || img.$?.href || "";
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFeedImage(feed: any): string {
  const img = feed["itunes:image"] as { href?: string; $?: { href?: string } } | string | undefined;
  if (!img) return feed.image?.url || "";
  if (typeof img === "string") return img;
  return img.href || img.$?.href || "";
}

export async function getEpisodes(): Promise<Episode[]> {
  const parser = new Parser<Record<string, unknown>, RSSItem>({
    customFields: {
      feed: [["itunes:image", "itunes:image"]],
      item: [
        ["itunes:duration", "itunes:duration"],
        ["itunes:image", "itunes:image"],
        ["itunes:episode", "itunes:episode"],
      ],
    } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  });

  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
    const xml = await res.text();
    const feed = await parser.parseString(xml);
    const feedImage = getFeedImage(feed);

    return feed.items.map((item, index) => {
      const title = item.title || "";
      const epNum = extractEpisodeNumber(title, item["itunes:episode"]);
      const duration = parseDuration(item["itunes:duration"]);
      const slug = makeSlug(epNum, title);
      const imageUrl = getImageUrl(item) || feedImage || "/logo-square.png";
      const rawDescription = item.contentSnippet || item.content || "";

      return {
        id: epNum > 0 ? String(epNum) : String(index),
        slug,
        title,
        description: rawDescription.slice(0, 300),
        longDescription: item.content || item.contentSnippet || "",
        publishDate: item.pubDate
          ? new Date(item.pubDate).toISOString().split("T")[0]
          : "",
        duration: duration.formatted,
        durationSeconds: duration.seconds,
        episodeNumber: epNum,
        imageUrl,
        audioUrl: item.enclosure?.url || "",
        episodeLink: item.link || "",
        tags: [],
        guests: [],
      };
    });
  } catch (err) {
    console.error("[RSS] fetch error:", err);
    return [];
  }
}

export async function getEpisodeBySlug(slug: string): Promise<Episode | null> {
  const episodes = await getEpisodes();
  return episodes.find((ep) => ep.slug === slug) ?? null;
}
