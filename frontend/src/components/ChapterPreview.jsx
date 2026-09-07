import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight, BookOpen, Mail, Lock } from "lucide-react";
import { BOOKS } from "../content/site";
import { SAMPLE_CHAPTER, SAMPLE_INTRO } from "../content/sampleChapter";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const STORAGE_KEY = "ptp_reader_unlocked";

function ReaderGate({ onUnlock }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await axios.post(`${API}/subscribers`, {
        email,
        name: name || undefined,
        source: "chapter-preview",
      });
      localStorage.setItem(STORAGE_KEY, email);
      onUnlock();
    } catch {
      setError("That email didn't look right — please check it and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div data-testid="reader-gate" className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center sm:px-12">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
        <BookOpen className="h-6 w-6" />
      </span>
      <h3 className="mt-6 font-display text-3xl uppercase tracking-[0.04em] text-[#F9F8F6] sm:text-4xl">
        Read Chapter One — <span className="text-gold">Free</span>
      </h3>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone2">
        The full Introduction and Chapter One, straight from the book. Leave your email and it's
        yours — you'll also be first to hear about new chapters, talks and the coaching cohort.
      </p>
      <form data-testid="reader-gate-form" onSubmit={submit} className="mt-8 w-full max-w-sm space-y-3">
        <input
          data-testid="reader-gate-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name (optional)"
          className="w-full rounded-md border border-white/15 bg-night px-4 py-3 text-sm text-[#F9F8F6] placeholder:text-stone2/50 transition-colors duration-300 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
        <input
          data-testid="reader-gate-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email *"
          className="w-full rounded-md border border-white/15 bg-night px-4 py-3 text-sm text-[#F9F8F6] placeholder:text-stone2/50 transition-colors duration-300 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
        {error && <p data-testid="reader-gate-error" className="text-sm text-gold">{error}</p>}
        <button
          type="submit"
          data-testid="reader-gate-submit"
          disabled={sending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight disabled:opacity-60"
        >
          {sending ? "Unlocking…" : "Unlock the Chapter"} <Mail className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-stone2/50">
        <Lock className="h-3 w-3" /> No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}

export default function ChapterPreview({ open, onClose }) {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const book = BOOKS[0];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setProgress(0);
      setUnlocked(Boolean(localStorage.getItem(STORAGE_KEY)));
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
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

            {!unlocked ? (
              <ReaderGate onUnlock={() => setUnlocked(true)} />
            ) : (
              <div ref={scrollRef} onScroll={onScroll} className="flex-1 overflow-y-auto px-6 py-10 sm:px-12">
                <div className="chapter-dropcap font-serif text-lg leading-relaxed text-[#F9F8F6]/85">
                  <h3 className="mb-6 font-display text-3xl uppercase leading-none tracking-[0.05em] text-gold sm:text-4xl">
                    {SAMPLE_INTRO.title}
                  </h3>
                  <div className="space-y-6">
                    {SAMPLE_INTRO.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <div className="my-12 flex items-center gap-5">
                    <span className="h-px flex-1 bg-white/15" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                      {SAMPLE_CHAPTER.chapterLabel}
                    </span>
                    <span className="h-px flex-1 bg-white/15" />
                  </div>
                  <h3 className="font-display text-4xl uppercase leading-none tracking-[0.04em] text-[#F9F8F6] sm:text-5xl">
                    {SAMPLE_CHAPTER.title}
                  </h3>
                  <div className="mb-8 mt-3 h-px w-14 bg-gold" />
                  {SAMPLE_CHAPTER.sections.map((section, i) => (
                    <div key={i} className={i > 0 ? "mt-10" : ""}>
                      {section.heading && (
                        <h4 className="mb-5 font-display text-2xl uppercase tracking-[0.06em] text-gold">
                          {section.heading}
                        </h4>
                      )}
                      <div className="space-y-6">
                        {section.paragraphs.map((p, j) => (
                          <p key={j}>{p}</p>
                        ))}
                      </div>
                    </div>
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
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
