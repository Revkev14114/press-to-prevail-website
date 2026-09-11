import { useState } from "react";
import { ArrowUpRight, Compass, Layers, Home as HomeIcon, Flag, BookOpen } from "lucide-react";
import { BOOKS } from "../content/site";
import { Reveal, MaskedLine } from "../components/Motion";
import BookCard from "../components/BookCard";
import ChapterPreview from "../components/ChapterPreview";
import EnquiryForm from "../components/EnquiryForm";

const flagship = BOOKS[0];
const upcoming = BOOKS.slice(1);

const BLUEPRINT_THEMES = [
  { icon: Compass, title: "The Blueprint", body: "Every home begins with a blueprint — and every life does too. Discover the design God drew for yours before a single stone was laid." },
  { icon: Layers, title: "The Foundation", body: "Timeless biblical principles poured like footings — the unseen work that decides what survives the storm." },
  { icon: HomeIcon, title: "The Frame", body: "More than 40 years of homebuilding experience, translated board by board into wisdom for marriage, family and calling." },
  { icon: Flag, title: "The Finish", body: "Because the goal was never a house. It's a life that lasts — built to shelter generations." },
];

export default function Books() {
  const [chapterOpen, setChapterOpen] = useState(false);

  return (
    <div data-testid="books-page" className="bg-night text-[#F9F8F6]">
      <ChapterPreview open={chapterOpen} onClose={() => setChapterOpen(false)} />
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-20 pt-[130px] lg:px-10 lg:pb-28 lg:pt-[170px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,162,39,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-8 bg-gold" />
              The Book
            </span>
          </Reveal>
          <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <h1 className="font-display uppercase leading-[0.95] tracking-[0.02em]">
              <MaskedLine delay={0.15} className="text-5xl sm:text-7xl lg:text-8xl">
                Building the
              </MaskedLine>
              <MaskedLine delay={0.3} className="text-5xl sm:text-7xl lg:text-8xl">
                <span className="text-gold">Perfect Home</span>
              </MaskedLine>
            </h1>
            <Reveal delay={0.45}>
              <p className="max-w-md font-serif text-xl italic leading-snug text-gold/90 sm:text-2xl">
                Explore the blueprint. Discover your foundation. Build a life that lasts.
              </p>
              <p className="mt-5 max-w-md text-base font-light leading-relaxed text-stone2">
                {flagship.description}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FLAGSHIP SHOWCASE */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-md lg:sticky lg:top-28">
            <div className="rounded-lg bg-gradient-to-b from-gold/30 via-white/5 to-transparent p-1.5 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.8)]">
              <img
                src={flagship.coverUrl}
                alt="Building the Perfect Home — book cover"
                data-testid="flagship-cover"
                className="w-full rounded-[4px]"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
                <span className="h-px w-8 bg-gold" />
                {flagship.year} Release
              </span>
              <blockquote className="mt-6 border-l-2 border-gold pl-6 font-serif text-xl italic leading-snug text-[#F9F8F6]/85 sm:text-2xl">
                “{flagship.quote}”
              </blockquote>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={flagship.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="featured-amazon-buy-btn"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight"
                >
                  Buy on Amazon <ArrowUpRight className="h-4 w-4" />
                </a>
                <button
                  data-testid="read-sample-chapter-btn"
                  onClick={() => setChapterOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-night transition-colors duration-300 hover:bg-goldlight"
                >
                  <BookOpen className="h-4 w-4" /> Start the Journey
                </button>
                <button
                  data-testid="signed-copy-btn"
                  onClick={() => document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 rounded-full border border-[#F9F8F6]/30 px-7 py-3.5 text-sm font-medium text-[#F9F8F6] transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  Request a signed copy
                </button>
              </div>
            </Reveal>

            {/* Inside the blueprint */}
            <div className="mt-16">
              <Reveal>
                <h2 className="font-display text-3xl uppercase tracking-[0.04em] sm:text-4xl">Inside the blueprint</h2>
              </Reveal>
              <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
                {BLUEPRINT_THEMES.map((theme, i) => (
                  <Reveal key={theme.title} delay={i * 0.07}>
                    <div data-testid={`blueprint-theme-${i}`} className="group flex h-full flex-col bg-night p-7 transition-colors duration-500 hover:bg-[#181004]">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-night">
                        <theme.icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 font-display text-xl uppercase tracking-[0.06em] text-[#F9F8F6] group-hover:text-gold transition-colors duration-500">
                        {theme.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-stone2/90">{theme.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING TITLES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-8 bg-gold" />
            The Series Continues
          </span>
          <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl">
            In the works.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-12 md:grid-cols-2 lg:gap-16">
          {upcoming.map((book, i) => (
            <Reveal key={book.id} delay={i * 0.1}>
              <BookCard book={book} />
            </Reveal>
          ))}
        </div>
      </section>

      <EnquiryForm compact />
    </div>
  );
}
