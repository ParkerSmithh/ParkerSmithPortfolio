import { Clock, Play } from "lucide-react";
import { useState } from "react";
import { isPlayable, thumbnailFor, type VideoEntry } from "../data/videos";
import { useVideoPlayer } from "./VideoPlayerProvider";

/**
 * 16:9 video tile. Clickable when a Stream UID exists; otherwise a labelled placeholder.
 * `compact` lays the thumbnail beside the text, for a stacked list next to the featured video.
 */
export function VideoCard({
  video,
  featured = false,
  compact = false,
  bare = false,
  index,
}: {
  video: VideoEntry;
  featured?: boolean;
  compact?: boolean;
  /** Thumbnail only — no title, description or tags. The title stays as the accessible name. */
  bare?: boolean;
  index: number;
}) {
  const { open } = useVideoPlayer();
  const [thumbFailed, setThumbFailed] = useState(false);
  const thumb = thumbFailed ? undefined : thumbnailFor(video);
  const playable = isPlayable(video);

  const media = (
    <div className={`relative aspect-video overflow-hidden rounded-card bg-midnight ${compact ? "w-[44%] shrink-0" : ""}`}>
      {thumb ? (
        <img
          src={thumb}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setThumbFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <VideoPlaceholderArt index={index} />
      )}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`flex items-center justify-center rounded-full transition-all duration-300 ${
            featured ? "h-20 w-20" : compact ? "h-10 w-10" : "h-14 w-14"
          } ${
            playable
              ? "bg-white text-ink shadow-mockup group-hover:scale-110 group-hover:bg-blue group-hover:text-white"
              : "bg-white/15 text-white/80"
          }`}
        >
          <Play className={featured ? "ml-1 h-8 w-8" : compact ? "ml-0.5 h-4 w-4" : "ml-0.5 h-6 w-6"} fill="currentColor" aria-hidden />
        </span>
      </div>

      <div className={`absolute flex gap-1.5 ${compact ? "left-2 top-2" : "left-3 top-3"}`}>
        {!compact && !bare && video.category && <span className="pill bg-white/95 text-xs text-ink">{video.category}</span>}
        {!playable && (
          <span className={`pill bg-marigold text-ink ${compact ? "px-2 py-0.5 text-[0.6875rem]" : "text-xs"}`}>
            Awaiting upload
          </span>
        )}
      </div>
      {video.duration && (
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-small bg-black/75 px-1.5 py-0.5 text-xs font-medium text-white">
          <Clock className="h-3 w-3" aria-hidden />
          {video.duration}
        </span>
      )}
    </div>
  );

  const body = bare ? null : (
    <div className={compact ? "min-w-0 flex-1" : "mt-4"}>
      {compact && video.category && <p className="t-eyebrow text-stone">{video.category}</p>}
      <h4 className={`${featured ? "t-heading-sm" : "text-base font-semibold tracking-tight"} ${compact ? "mt-1 leading-snug" : ""} text-ink`}>
        {video.title}
      </h4>
      {video.description && <p className={`mt-1 text-graphite ${featured ? "text-base" : "text-sm"}`}>{video.description}</p>}
      {video.software && !compact && (
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Software used">
          {video.software.map((s) => (
            <li key={s} className="pill border border-hairline bg-white px-2.5 py-0.5 text-xs text-graphite">
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  if (!playable) {
    return (
      <article
        className={`group h-full ${compact ? "flex items-center gap-4" : ""}`}
        aria-label={`${video.title} (video coming soon)`}
      >
        {media}
        {body}
      </article>
    );
  }

  return (
    <article className="h-full">
      <button
        type="button"
        onClick={() => open(video)}
        className={`group w-full rounded-card text-left ${compact ? "flex items-center gap-4" : "block"}`}
        aria-label={`Play video: ${video.title}`}
      >
        {media}
        {body}
      </button>
    </article>
  );
}

const PALETTES = [
  { bg: "#02093a", a: "#ffb110", b: "#62aef0" },
  { bg: "#f64932", a: "#ffffff", b: "#ffb110" },
  { bg: "#0075de", a: "#ffb110", b: "#e6f3fe" },
  { bg: "#ffb110", a: "#02093a", b: "#f64932" },
  { bg: "#62aef0", a: "#02093a", b: "#ffffff" },
];

/** Designed stand-in when there's no thumbnail yet: stacked "frames" in the accent palette. */
export function VideoPlaceholderArt({ index }: { index: number }) {
  const p = PALETTES[index % PALETTES.length];
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
    >
      <rect width="320" height="180" fill={p.bg} />
      <rect x="196" y="-20" width="150" height="150" rx="75" fill={p.a} opacity="0.9" />
      <rect x="-30" y="110" width="140" height="100" rx="12" fill={p.b} opacity="0.85" transform="rotate(-8 40 160)" />
      <g opacity="0.35" stroke="#fff" strokeWidth="1.5" fill="none">
        <rect x="24" y="22" width="84" height="48" rx="6" />
        <rect x="34" y="30" width="84" height="48" rx="6" />
      </g>
      <text x="24" y="166" fill="#fff" opacity="0.8" fontFamily="Inter, system-ui" fontSize="10" fontWeight="600" letterSpacing="1.2">
        {`SLOT ${String(index + 1).padStart(2, "0")}`}
      </text>
    </svg>
  );
}
