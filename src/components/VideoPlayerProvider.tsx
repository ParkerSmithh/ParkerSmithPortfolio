import { createContext, lazy, Suspense, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import type { VideoEntry } from "../data/videos";

// The modal (and its Stream iframe) is only downloaded the first time a video is opened.
const VideoModal = lazy(() => import("./VideoModal"));

type Ctx = { open: (video: VideoEntry) => void };
const VideoCtx = createContext<Ctx>({ open: () => {} });

export function useVideoPlayer() {
  return useContext(VideoCtx);
}

export function VideoPlayerProvider({ children }: { children: ReactNode }) {
  const [video, setVideo] = useState<VideoEntry | null>(null);
  const [loaded, setLoaded] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((v: VideoEntry) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setLoaded(true);
    setVideo(v);
  }, []);

  const close = useCallback(() => {
    setVideo(null);
  }, []);

  const handleExited = useCallback(() => {
    returnFocus.current?.focus({ preventScroll: true });
    returnFocus.current = null;
  }, []);

  return (
    <VideoCtx.Provider value={{ open }}>
      {children}
      {loaded && (
        <Suspense fallback={null}>
          <VideoModal video={video} onClose={close} onExited={handleExited} />
        </Suspense>
      )}
    </VideoCtx.Provider>
  );
}
