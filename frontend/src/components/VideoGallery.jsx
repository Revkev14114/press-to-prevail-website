import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { VIDEOS } from "../content/site";
import { Reveal } from "./Motion";

export default function VideoGallery({ limit, dark = false, compact = false }) {
  const [active, setActive] = useState(null);
  const videos = limit ? VIDEOS.slice(0, limit) : VIDEOS;

  return (
    <>
      <div className={compact ? "grid grid-cols-2 gap-4 lg:grid-cols-4" : "grid gap-8 sm:grid-cols-2"}>
        {videos.map((video, i) => (
          <Reveal key={video.id} delay={i * 0.08}>
            <button
              data-testid={`video-thumb-${video.id}`}
              onClick={() => setActive(video)}
              className="group relative block w-full overflow-hidden rounded-lg text-left"
            >
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-coal/35 transition-colors duration-500 group-hover:bg-coal/20" />
                <span className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/95 shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-night ${compact ? "h-10 w-10" : "h-16 w-16"}`}>
                  <Play className={`${compact ? "ml-0.5 h-4 w-4" : "ml-1 h-6 w-6"}`} fill="currentColor" />
                </span>
                <span className="absolute bottom-3 right-3 rounded-full bg-coal/80 px-2.5 py-1 font-mono text-[10px] tracking-widest text-ivory">
                  {video.duration}
                </span>
              </div>
              <div className={compact ? "mt-2.5" : "mt-4"}>
                <p className={`font-serif font-semibold tracking-tight ${compact ? "text-sm" : "text-lg"} ${dark ? "text-[#F9F8F6]" : "text-ink"}`}>
                  {video.title}
                </p>
                {!compact && (
                  <p className={`mt-1 font-mono text-[11px] uppercase tracking-[0.2em] ${dark ? "text-[#F9F8F6]/50" : "text-muted2"}`}>
                    {video.event}
                  </p>
                )}
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            data-testid="video-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-coal/90 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                data-testid="video-lightbox-close"
                onClick={() => setActive(null)}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-[#F9F8F6]/30 text-[#F9F8F6] transition-colors duration-300 hover:bg-terracotta hover:border-terracotta"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="aspect-video w-full overflow-hidden rounded-lg shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <p className="mt-4 font-serif text-lg italic text-[#F9F8F6]/80">{active.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
