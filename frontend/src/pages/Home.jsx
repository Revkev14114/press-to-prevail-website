import { useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowRight, Play, Star } from "lucide-react";
import { SITE, PRESS, BOOKS, MANIFESTO, KEYNOTES } from "../content/site";
import { MaskedLine, Reveal, Eyebrow, Marquee } from "../components/Motion";
import { BookCover } from "../components/BookCard";
import VideoGallery from "../components/VideoGallery";
import EnquiryForm from "../components/EnquiryForm";
import { scrollToEnquire } from "../components/Header";

function HeroPortrait() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative [perspective:1200px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        style={{ rotateX: rx, rotateY: ry }}
        className="relative will-change-transform"
        data-testid="hero-portrait-frame"
      >
        <div className="absolute -left-4 -top-4 h-full w-full rounded-lg border border-terracotta/50" />
        <div className="relative overflow-hidden rounded-lg shadow-[0_40px_90px_-25px_rgba(18,22,26,0.45)]">
          <img
            src={SITE.portraitHero}
            alt={`${SITE.name} portrait`}
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coal/45 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ivory/80">
              Chicago — 09:41 AM
            </p>
            <span className="h-2 w-2 rotate-45 bg-terracotta" />
          </div>
        </div>
      </motion.div>
      <div className="slow-spin pointer-events-none absolute -right-10 -top-10 hidden h-28 w-28 lg:block">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <path id="circlePath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
          </defs>
          <text className="fill-ink font-mono text-[8.5px] uppercase tracking-[0.32em]">
            <textPath href="#circlePath">Speaker · Writer · Author · Speaker · Writer ·</textPath>
          </text>
        </svg>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const featured = BOOKS[0];

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative overflow-hidden pt-[72px]">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-hairline lg:left-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-hairline lg:right-10" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-10 lg:pb-28 lg:pt-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <Eyebrow>Bestselling Author — Keynote Speaker</Eyebrow>
            </motion.div>
            <h1 className="mt-7 font-serif text-4xl font-normal leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <MaskedLine delay={0.25}>Words that</MaskedLine>
              <MaskedLine delay={0.38}>
                move <span className="italic text-terracotta">rooms,</span>
              </MaskedLine>
              <MaskedLine delay={0.51}>pages that stay.</MaskedLine>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75 }}
              className="mt-8 max-w-lg text-base font-light leading-relaxed text-slate2 sm:text-lg"
            >
              {SITE.name} writes and speaks on purposeful leadership — three bestselling books,
              five hundred stages, and one conviction: attention is the last luxury worth defending.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                data-testid="hero-book-keynote-btn"
                onClick={() => scrollToEnquire(navigate, location.pathname)}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-terracotta"
              >
                Book a Keynote
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <Link
                to="/books"
                data-testid="hero-explore-books-btn"
                className="group inline-flex items-center gap-2 rounded-full border border-ink/25 px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
              >
                Explore the Books
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.15 }}
              data-testid="hero-stats"
              className="mt-14 grid max-w-md grid-cols-3 divide-x divide-hairline border-y border-hairline"
            >
              {SITE.stats.map((stat) => (
                <div key={stat.label} className="px-4 py-5 first:pl-0">
                  <p className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted2">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <HeroPortrait />
        </div>
      </section>

      <Marquee items={PRESS} />

      {/* FEATURED BOOK */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-sm">
            <div className="rounded-lg bg-gradient-to-b from-amber-100/60 via-stone-200/40 to-stone-900/10 p-1.5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.2)]">
              <BookCover book={featured} large />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>Latest Release — {featured.year}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-3 font-serif text-lg italic text-terracotta">{featured.subtitle}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="mt-8 border-l-2 border-terracotta pl-6 font-serif text-xl italic leading-snug text-ink/85 sm:text-2xl">
                “{featured.quote}”
              </blockquote>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate2">{featured.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={featured.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="featured-amazon-buy-btn"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-terracotta"
                >
                  Buy on Amazon <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link
                  to="/books"
                  data-testid="featured-all-books-link"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-slate2 transition-colors duration-300 hover:text-terracotta"
                >
                  See all three books
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="border-y border-hairline bg-surface py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Eyebrow>The Working Manifesto</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Four convictions behind every page and every stage.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {MANIFESTO.map((chapter, i) => (
              <Reveal key={chapter.number} delay={i * 0.08}>
                <motion.div
                  data-testid={`manifesto-chapter-${chapter.number}`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.35 }}
                  className="group flex h-full flex-col bg-ivory p-7 transition-colors duration-500 hover:bg-coal"
                >
                  <span className="font-mono text-xs tracking-[0.25em] text-terracotta">{chapter.number}</span>
                  <h3 className="mt-5 font-serif text-xl font-semibold leading-snug tracking-tight transition-colors duration-500 group-hover:text-ivory">
                    {chapter.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate2 transition-colors duration-500 group-hover:text-ivory/65">
                    {chapter.body}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKING PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>On Stage</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                Keynotes that outlast the applause.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate2">
                Three flagship talks, each tailored to the room. Watch recent footage below — or explore
                the full speaking reel on the About page.
              </p>
            </Reveal>
            <div className="mt-9 space-y-4">
              {KEYNOTES.map((k, i) => (
                <Reveal key={k.title} delay={i * 0.07}>
                  <div className="flex items-start gap-4 border-b border-hairline pb-4">
                    <Play className="mt-1 h-4 w-4 shrink-0 text-terracotta" />
                    <div>
                      <p className="font-serif text-lg font-semibold tracking-tight">{k.title}</p>
                      <p className="mt-1 text-sm text-slate2">{k.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <Link
                to="/about#speaking"
                data-testid="speaking-reel-link"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-terracotta"
              >
                View the full speaking reel
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <VideoGallery limit={2} />
        </div>
      </section>

      {/* PRESS QUOTES */}
      <section className="border-t border-hairline bg-ivory py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Eyebrow>Press & Endorsements</Eyebrow>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {PRESS.map((item, i) => (
              <Reveal key={item.source} delay={i * 0.07}>
                <figure data-testid={`press-quote-${i}`} className="border-l-2 border-hairline pl-6 transition-colors duration-500 hover:border-terracotta">
                  <div className="flex gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5" fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="mt-4 font-serif text-xl italic leading-snug text-ink/85 sm:text-2xl">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted2">
                    — {item.source}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EnquiryForm />
    </div>
  );
}
