import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight, BookOpen } from "lucide-react";
import { BOOKS } from "../content/site";
import { SAMPLE_CHAPTER } from "../content/sampleChapter";

export default function ChapterPreview({ open, onClose }) {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const book = BOOKS[0];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setProgress(0);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 1);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="chapter-preview-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-night/90 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 28 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-white/10 bg-coal shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 z-10 h-1 bg-white/10">
              <div
                data-testid="chapter-progress-bar"
                className="h-full bg-gold transition-[width] duration-150"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-gold" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">{SAMPLE_CHAPTER.eyebrow} — {SAMPLE_CHAPTER.chapterLabel}</p>
                  <p className="font-serif text-sm italic text-stone2/80">{book.title}</p>
                </div>
              </div>
              <button
                data-testid="chapter-preview-close"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-[#F9F8F6] transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-night"
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} onScroll={onScroll} className="flex-1 overflow-y-auto px-6 py-10 sm:px-12">
              <h3 className="font-display text-4xl uppercase tracking-[0.04em] text-[#F9F8F6] sm:text-5xl">
                {SAMPLE_CHAPTER.title}
              </h3>
              <div className="mt-3 h-px w-14 bg-gold" />
              <div className="chapter-dropcap mt-8 space-y-6 font-serif text-lg leading-relaxed text-[#F9F8F6]/85">
                {SAMPLE_CHAPTER.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-10 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-stone2/50">
                {SAMPLE_CHAPTER.closingNote}
              </p>

              <div className="mt-10 rounded-lg border border-gold/30 bg-gold/5 p-7 text-center">
                <p className="font-serif text-xl italic text-[#F9F8F6]">Enjoying the first chapter?</p>
                <p className="mt-2 text-sm text-stone2/85">The full blueprint is waiting — hardcover, Kindle and audio.</p>
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="chapter-continue-amazon-btn"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight"
                >
                  Continue Reading on Amazon <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
