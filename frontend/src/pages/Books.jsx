import { useState } from "react";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { SITE, BOOKS, REVIEWS, ARTICLES } from "../content/site";
import { Reveal, Eyebrow, MaskedLine } from "../components/Motion";
import BookCard from "../components/BookCard";
import EnquiryForm from "../components/EnquiryForm";

export default function Books() {
  const [filter, setFilter] = useState("all");
  const reviews = filter === "all" ? REVIEWS : REVIEWS.filter((r) => r.bookId === filter);

  return (
    <div data-testid="books-page">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-20 pt-[130px] lg:px-10 lg:pb-28 lg:pt-[170px]">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow>Published Works & Essays</Eyebrow>
          </Reveal>
          <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <h1 className="font-serif text-4xl font-normal leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              <MaskedLine delay={0.15}>Three books.</MaskedLine>
              <MaskedLine delay={0.28}>
                One <span className="italic text-terracotta">million readers.</span>
              </MaskedLine>
            </h1>
            <Reveal delay={0.45}>
              <p className="max-w-md text-base font-light leading-relaxed text-slate2 sm:text-lg">
                Every title is available in hardcover, Kindle and audio — order directly through Amazon,
                or enquire below about signed and bulk copies for your team.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {BOOKS.map((book, i) => (
            <Reveal key={book.id} delay={i * 0.1}>
              <BookCard book={book} featured={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="border-y border-hairline bg-surface py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Eyebrow>Reader Reviews & Critical Acclaim</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-medium tracking-tight sm:text-4xl">What readers carry away.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-2" data-testid="review-filter-tabs">
              {[{ id: "all", title: "All Books" }, ...BOOKS].map((b) => (
                <button
                  key={b.id}
                  data-testid={`review-filter-${b.id}`}
                  onClick={() => setFilter(b.id)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-300 ${
                    filter === b.id
                      ? "border-ink bg-ink text-ivory"
                      : "border-ink/20 bg-ivory text-slate2 hover:border-terracotta hover:text-terracotta"
                  }`}
                >
                  {b.title}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {reviews.map((review, i) => (
              <Reveal key={`${review.bookId}-${i}`} delay={i * 0.06}>
                <figure className="h-full rounded-lg border border-hairline bg-ivory p-7 transition-colors duration-500 hover:border-terracotta/50">
                  <blockquote className="font-serif text-lg italic leading-snug text-ink/85 sm:text-xl">
                    “{review.quote}”
                  </blockquote>
                  <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted2">
                    — {review.source}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <Eyebrow>Articles & Essays</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-medium tracking-tight sm:text-4xl">From the writing desk.</h2>
        </Reveal>
        <div className="mt-12 divide-y divide-hairline border-y border-hairline">
          {ARTICLES.map((article, i) => (
            <Reveal key={article.title} delay={i * 0.05}>
              <a
                href={`mailto:${SITE.email}?subject=Article request: ${encodeURIComponent(article.title)}`}
                data-testid={`article-link-${i}`}
                className="group flex items-center justify-between gap-6 py-6 transition-colors duration-300"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-xs text-muted2">{article.year}</span>
                  <div>
                    <p className="font-serif text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-terracotta sm:text-2xl">
                      {article.title}
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted2">
                      {article.outlet}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted2 sm:inline-flex">
                    <Clock3 className="h-3.5 w-3.5" /> {article.readTime}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted2 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-terracotta" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <EnquiryForm compact />
    </div>
  );
}
