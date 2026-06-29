export interface Episode {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  publishDate: string;
  duration: string;
  durationSeconds: number;
  episodeNumber: number;
  imageUrl: string;
  audioUrl: string;
  episodeLink: string;
  tags?: string[];
  guests?: string[];
}

export interface PodcastMeta {
  title: string;
  description: string;
  author: string;
  email: string;
  imageUrl: string;
  language: string;
  categories: string[];
  rssUrl: string;
  podbeanUrl: string;
  totalEpisodes: number;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}
