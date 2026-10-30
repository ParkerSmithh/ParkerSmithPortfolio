/**
 * All seven Cloudflare Stream video slots (5 YouTube + 2 Fortnite).
 *
 * To add a video:
 *  1. Upload it in the Cloudflare dashboard → Stream → Upload.
 *  2. Copy the video's UID (32-character id) into `streamUid` below.
 *  3. Optional: put a custom thumbnail in /public/images/... and set `thumbnail`.
 *     Without one, Cloudflare's auto-generated thumbnail is used.
 *
 * A slot with an empty `streamUid` renders as a polished "coming soon" placeholder, never a broken embed.
 */

export type VideoEntry = {
  id: string;
  title: string;
  description: string;
  category: string;
  /** Path under /public, e.g. "/images/youtube/video-1.webp". Optional. */
  thumbnail?: string;
  /** Cloudflare Stream video UID. Empty = placeholder slot. */
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
    id: "yt-1",
    title: "Featured Video — Title Coming Soon",
    description: "Placeholder: add a one-line description of this video.",
    category: "Fortnite",
    streamUid: "",
    software: ["Premiere Pro", "OBS Studio", "Photoshop"],
    placeholder: true,
  },
  {
    id: "yt-2",
    title: "Video 2 — Title Coming Soon",
    description: "Placeholder: add a one-line description of this video.",
    category: "Fortnite",
    streamUid: "",
    software: ["Premiere Pro", "OBS Studio"],
    placeholder: true,
  },
  {
    id: "yt-3",
    title: "Video 3 — Title Coming Soon",
    description: "Placeholder: add a one-line description of this video.",
    category: "Minecraft",
    streamUid: "",
    software: ["Premiere Pro", "OBS Studio"],
    placeholder: true,
  },
  {
    id: "yt-4",
    title: "Video 4 — Title Coming Soon",
    description: "Placeholder: add a one-line description of this video.",
    category: "Minecraft",
    streamUid: "",
    software: ["Premiere Pro", "Photoshop"],
    placeholder: true,
  },
  {
    id: "yt-5",
    title: "Short — Title Coming Soon",
    description: "Placeholder: add a one-line description of this video.",
    category: "Short",
    streamUid: "",
    software: ["Premiere Pro"],
    placeholder: true,
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

export function thumbnailFor(video: VideoEntry): string | undefined {
  if (video.thumbnail) return video.thumbnail;
  if (video.streamUid) return streamThumbnail(video.streamUid);
  return undefined;
}
