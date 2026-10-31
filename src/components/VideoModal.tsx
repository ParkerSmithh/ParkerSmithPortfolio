import { AnimatePresence, motion } from "motion/react";
import { Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { streamIframeSrc, thumbnailFor, type VideoEntry } from "../data/videos";

const FOCUSABLE = 'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

export default function VideoModal({
  video,
  onClose,
  onExited,
}: {
  video: VideoEntry | null;
  onClose: () => void;
  onExited: () => void;
}) {
  return createPortal(
    <AnimatePresence>
      {video && <Dialog key={video.id} video={video} onClose={onClose} onExited={onExited} />}
    </AnimatePresence>,
    document.body,
  );
}

function Dialog({ video, onClose, onExited }: { video: VideoEntry; onClose: () => void; onExited: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const titleId = `${video.id}-title`;

  // Lock page scroll, focus the close button, trap Tab, close on Escape.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // The dialog is portaled outside #root, so making #root inert keeps Tab from
    // escaping to the page — even when focus starts inside the Stream iframe.
    const root = document.getElementById("root");
    root?.setAttribute("inert", "");
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      root?.removeAttribute("inert");
      document.removeEventListener("keydown", onKey);
      // Runs after the exit animation, once the page is interactive again.
      onExited();
    };
  }, [onClose, onExited]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-midnight/80" onClick={onClose} aria-hidden />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-5xl overflow-hidden rounded-card bg-white shadow-mockup"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-hairline px-4 py-3 sm:px-5">
          <div className="min-w-0">
            {video.category && <p className="t-eyebrow text-stone">{video.category}</p>}
            <h2 id={titleId} className="truncate text-base font-semibold sm:text-lg">
              {video.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="btn btn-text -mr-2 h-11 w-11 shrink-0 px-0"
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative aspect-video bg-black">
          {video.src ? (
            <>
              {!ready && !failed && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/70" role="status">
                  <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
                  <span className="sr-only">Loading video</span>
                </div>
              )}
              {failed ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center text-white/80">
                  <p className="text-lg font-semibold text-white">This video couldn't load</p>
                  <p className="text-sm">Check your connection and try again.</p>
                </div>
              ) : (
                <video
                  src={video.src}
                  poster={thumbnailFor(video)}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  aria-label={video.title}
                  className="absolute inset-0 h-full w-full object-contain"
                  onCanPlay={() => setReady(true)}
                  onError={() => setFailed(true)}
                />
              )}
            </>
          ) : video.streamUid ? (
            <>
              {!ready && (
                <div className="absolute inset-0 flex items-center justify-center text-white/70" role="status">
                  <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
                  <span className="sr-only">Loading video player</span>
                </div>
              )}
              <iframe
                src={streamIframeSrc(video.streamUid)}
                title={`Video player: ${video.title}`}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                onLoad={() => setReady(true)}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center text-white/80">
              <p className="text-lg font-semibold text-white">Video coming soon</p>
              <p className="text-sm">This video hasn't been added yet.</p>
            </div>
          )}
        </div>

        {(video.description || video.software?.length) && (
          <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            {video.description && <p className="text-sm text-graphite">{video.description}</p>}
            {video.software && (
              <ul className="flex flex-wrap gap-1.5" aria-label="Software used">
                {video.software.map((s) => (
                  <li key={s} className="pill bg-paper text-xs text-graphite">
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
