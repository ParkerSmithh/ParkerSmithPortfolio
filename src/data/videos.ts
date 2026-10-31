import { asset } from "../lib/asset";

/**
 * All video slots (3 YouTube + 2 Fortnite).
 *
 * A video can come from either source:
 *  - `src`: a direct link to an .mp4 file (e.g. a public Cloudflare R2 URL). Plays in the
 *    browser's own player. Keep files web-sized (1080p, ~5–8 Mbps) so they don't buffer.
 *  - `streamUid`: a Cloudflare Stream video ID. Stream adapts quality to each viewer's connection.
 *    Upload in the Cloudflare dashboard → Stream → Upload, then copy the video's UID.
 *
 * Add a `thumbnail` (path under /public) for the card image. Without one, Stream videos use
 * Cloudflare's auto-generated thumbnail and file videos use designed placeholder art.
 * A slot with neither `src` nor `streamUid` renders as a "coming soon" placeholder, never a broken player.
 */

export type VideoEntry = {
  id: string;
  title: string;
  description: string;
  category: string;
  /** Path under /public, e.g. "/images/youtube/video-1.webp". Optional. */
  thumbnail?: string;
  /** Direct video file URL (.mp4). Takes priority over `streamUid`. */
  src?: string;
  /** Cloudflare Stream video UID. */
  streamUid: string;
  /** e.g. "8:42" */
  duration?: string;
  software?: string[];
  /** True while the entry still holds placeholder copy. Shows a "Placeholder" label. */
  placeholder?: boolean;
};

/**
 * Optional: your Stream customer subdomain code (from "customer-<CODE>.cloudflarestream.com").
 * Leave empty to use the universal iframe.videodelivery.net player.
 */
export const streamCustomerCode = "";

export const youtubeVideos: VideoEntry[] = [
  {
    id: "yt-rtx-5070-ti",
    title: "Video 1",
    description: "",
    category: "PC Build",
    thumbnail: "/images/youtube/rtx-5070-ti.webp",
    src: "https://pub-f12571d75a42423aa04ef727591d8013.r2.dev/RTX%205070%20Ti%20Budget%20PC%20Build.mp4",
    streamUid: "",
    duration: "4:52",
    software: ["Premiere Pro", "Photoshop"],
  },
  {
    id: "yt-fortnite-chapter-5",
    title: "Video 2",
    description: "",
    category: "",
    thumbnail: "/images/youtube/fortnite-chapter-5.webp",
    src: "https://pub-f12571d75a42423aa04ef727591d8013.r2.dev/Fortnite%20Chapter%205.mp4",
    streamUid: "",
    duration: "2:19",
    software: ["OBS Studio", "Premiere Pro"],
  },
  {
    id: "yt-fortnite-2024",
    title: "Video 3",
    description: "",
    category: "",
    thumbnail: "/images/youtube/fortnite-2024.webp",
    src: "https://pub-f12571d75a42423aa04ef727591d8013.r2.dev/Fortnite2024.mp4",
    streamUid: "",
    duration: "3:18",
    software: ["OBS Studio", "Premiere Pro"],
  },
];

export const fortniteVideos: Record<"game-1" | "game-2", VideoEntry> = {
  "game-1": {
    id: "fn-1",
    title: "Game 1 — Gameplay Video",
    description: "Placeholder: gameplay trailer for featured Fortnite game 1.",
    category: "Fortnite UEFN",
    streamUid: "",
    software: ["UEFN", "Unreal Engine"],
    placeholder: true,
  },
  "game-2": {
    id: "fn-2",
    title: "Game 2 — Gameplay Video",
    description: "Placeholder: gameplay trailer for featured Fortnite game 2.",
    category: "Fortnite UEFN",
    streamUid: "",
    software: ["UEFN", "Unreal Engine"],
    placeholder: true,
  },
};

export function streamIframeSrc(uid: string) {
  const base = streamCustomerCode
    ? `https://customer-${streamCustomerCode}.cloudflarestream.com/${uid}/iframe`
    : `https://iframe.videodelivery.net/${uid}`;
  return `${base}?autoplay=true&preload=auto&letterboxColor=transparent`;
}

export function streamThumbnail(uid: string) {
  const base = streamCustomerCode
    ? `https://customer-${streamCustomerCode}.cloudflarestream.com/${uid}`
    : `https://videodelivery.net/${uid}`;
  return `${base}/thumbnails/thumbnail.jpg?time=2s&height=720`;
}

export function isPlayable(video: VideoEntry) {
  return Boolean(video.src || video.streamUid);
}

export function thumbnailFor(video: VideoEntry): string | undefined {
  if (video.thumbnail) return asset(video.thumbnail);
  if (video.streamUid) return streamThumbnail(video.streamUid);
  return undefined;
}
