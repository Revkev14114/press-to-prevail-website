import { useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight, Play, ChevronDown } from "lucide-react";
import { SITE, BOOKS, MANIFESTO, KEYNOTES } from "../content/site";
import { MaskedLine, Reveal, Eyebrow, Marquee } from "../components/Motion";
import { BookCover } from "../components/BookCard";
import EnquiryForm from "../components/EnquiryForm";
import { scrollToEnquire } from "../components/Header";

const BRAND_LINES = [
  { quote: "Building Faith." },
  { quote: "Building Purpose." },
  { quote: "Building Lives That Last." },
  { quote: "Faith · Foundation · Focus · Finish" },
  { quote: "Press to Prevail" },
  { quote: "Build What Lasts." },
];

const GOLD = "#C9A227";

function Hero() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.14]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} data-testid="home-hero" className="relative flex min-h-screen flex-col overflow-hidden bg-night">
      {/* Logo backdrop */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
        <img
          src={SITE.logoFull}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-night/75 via-night/60 to-night" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(12,12,14,0.55)_78%)]" />

      {/* Banner content */}
      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-16 pt-40 lg:px-10 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-8 bg-gold" />
            Faith · Foundation · Focus · Finish
          </span>
        </motion.div>

        <h1 data-testid="hero-banner" className="mt-6 font-display uppercase leading-[0.95] tracking-[0.02em] text-[#F9F8F6]">
          <MaskedLine delay={0.3} className="text-[11vw] sm:text-6xl lg:text-7xl xl:text-[6.25rem]">
            Building <span className="text-gold">Faith,</span>
          </MaskedLine>
          <MaskedLine delay={0.45} className="text-[11vw] sm:text-6xl lg:text-7xl xl:text-[6.25rem]">
            Building <span className="text-gold">Purpose,</span>
          </MaskedLine>
          <MaskedLine delay={0.6} className="text-[11vw] sm:text-6xl lg:text-7xl xl:text-[6.25rem]">
            Building Lives That <span className="text-gold">Last.</span>
          </MaskedLine>
        </h1>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
          >
            <p className="max-w-lg text-base font-light leading-relaxed text-[#F9F8F6]/70 sm:text-lg">
              {SITE.name} is a movement of books, keynotes, and honest conversations for people
              navigating the pressures of life. We believe pressure doesn't have to break us. It can
              shape us, strengthen us, and move us forward. The press isn't the end of the story.
              It can become part of the path to becoming who we were created to be.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                data-testid="hero-book-keynote-btn"
                onClick={() => scrollToEnquire(navigate, location.pathname)}
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight"
              >
                Book a Keynote
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <Link
                to="/books"
                data-testid="hero-explore-books-btn"
                className="group inline-flex items-center gap-2 rounded-full border border-[#F9F8F6]/30 px-7 py-3.5 text-sm font-medium text-[#F9F8F6] transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                Discover the Book
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            data-testid="hero-stats"
            className="grid grid-cols-3 divide-x divide-white/15 border-y border-white/15"
          >
            {SITE.stats.map((stat) => (
              <div key={stat.label} className="px-5 py-4 first:pl-0">
                <p className="font-display text-3xl tracking-[0.05em] text-gold sm:text-4xl">{stat.value}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F9F8F6]/50">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative z-10 mx-auto pb-6"
      >
        <ChevronDown className="h-5 w-5 animate-bounce text-gold/70" />
      </motion.div>
    </section>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const featured = BOOKS[0];

  return (
    <div data-testid="home-page" className="bg-night text-[#F9F8F6]">
      <Hero />

      <Marquee items={BRAND_LINES} />

      {/* FEATURED BOOK */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-sm">
            <div className="rounded-lg bg-gradient-to-b from-gold/25 via-white/5 to-transparent p-1.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <BookCover book={featured} large />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
                <span className="h-px w-8 bg-gold" />
                Featured Book
              </span>
              <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl lg:text-6xl">
                {featured.title}
              </h2>
              <p className="mt-3 font-serif text-lg italic text-gold/90">{featured.subtitle}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic leading-snug text-[#F9F8F6]/85 sm:text-2xl">
                “{featured.quote}”
              </blockquote>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-stone2">{featured.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={featured.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="featured-amazon-buy-btn"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight"
                >
                  Buy the Book <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link
                  to="/books"
                  data-testid="featured-all-books-link"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-stone2 transition-colors duration-300 hover:text-gold"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOUR PILLARS */}
      <section className="border-y border-white/10 bg-[#101013] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-8 bg-gold" />
              The Four Pillars
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl">
              What every life that lasts is built on.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {MANIFESTO.map((pillar, i) => (
              <Reveal key={pillar.number} delay={i * 0.08}>
                <motion.div
                  data-testid={`pillar-${pillar.title.toLowerCase()}`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.35 }}
                  className="group flex h-full flex-col bg-night p-7 transition-colors duration-500 hover:bg-[#181004]"
                >
                  <h3 className="font-display text-2xl uppercase tracking-[0.06em] text-[#F9F8F6] transition-colors duration-500 group-hover:text-gold">
                    {pillar.title}
                  </h3>
                  <div className="mt-3 h-px w-10 bg-gold/40 transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />
                  <p className="mt-4 text-sm leading-relaxed text-stone2/90">{pillar.body}</p>
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
              <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
                <span className="h-px w-8 bg-gold" />
                On Stage
              </span>
              <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl">
                Keynotes that outlast the applause.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-stone2">
                Messages built from faith, experience, and the realities of life and leadership —
                designed to give people something to think about long after the room is quiet.
              </p>
            </Reveal>
            <div className="mt-9 space-y-4">
              {KEYNOTES.map((k, i) => (
                <Reveal key={k.title} delay={i * 0.07}>
                  <div className="flex items-start gap-4 border-b border-white/10 pb-4">
                    <Play className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <div>
                      <p className="font-serif text-lg font-semibold tracking-tight text-[#F9F8F6]">{k.title}</p>
                      <p className="mt-1 text-sm text-stone2/85">{k.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <Link
                to="/speaking"
                data-testid="speaking-reel-link"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-gold"
              >
                Explore speaking topics
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col items-start justify-center rounded-lg border border-dashed border-gold/40 bg-gold/[0.04] p-10">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-gold">
                Speaking Videos — Coming Soon
              </span>
              <p className="mt-5 font-serif text-xl italic leading-snug text-[#F9F8F6]/85">
                “New talks and teaching sessions are being recorded. Check back soon to hear Kevin
                speak on faith, leadership, purpose, and pressing through life's challenges.”
              </p>
              <button
                data-testid="home-invite-speaker-btn"
                onClick={() => scrollToEnquire(navigate, location.pathname)}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-night transition-colors duration-300 hover:bg-goldlight"
              >
                Invite Kevin to Speak
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <EnquiryForm />
    </div>
  );
}
