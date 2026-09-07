import { motion } from "framer-motion";
import { ShoppingCart, Headphones, BookOpen, Award } from "lucide-react";
import { SITE } from "../content/site";

export function BookCover({ book, large = false }) {
  if (book.coverUrl) {
    return (
      <img
        src={book.coverUrl}
        alt={`${book.title} cover`}
        className="aspect-[3/4] w-full rounded-[3px] object-cover"
      />
    );
  }
  return (
    <div className="flex aspect-[3/4] w-full flex-col justify-between rounded-[3px] bg-coal p-6 text-[#F9F8F6]">
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F9F8F6]/50">{book.year}</span>
        <span className="h-1.5 w-1.5 rotate-45 bg-terracotta" />
      </div>
      <div>
        <p className={`font-serif font-semibold leading-[1.08] tracking-tight ${large ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          {book.title}
        </p>
        <div className="mt-3 h-px w-12 bg-terracotta" />
        <p className="mt-3 font-serif text-sm italic text-[#F9F8F6]/70">{book.subtitle}</p>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F9F8F6]/50">{SITE.name}</p>
    </div>
  );
}

export default function BookCard({ book, featured = false }) {
  return (
    <motion.article
      data-testid={`book-card-${book.id}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="rounded-lg bg-gradient-to-b from-amber-100/60 via-stone-200/40 to-stone-900/10 p-1 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] transition-shadow duration-500 group-hover:shadow-[0_35px_80px_-20px_rgba(200,90,50,0.25)]">
        <BookCover book={book} large={featured} />
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-xl font-semibold tracking-tight sm:text-2xl">{book.title}</h3>
          <span className="font-mono text-xs text-muted2">{book.year}</span>
        </div>
        <p className="mt-1 font-serif text-sm italic text-terracotta">{book.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate2">{book.description}</p>

        {book.awards?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {book.awards.map((award) => (
              <span
                key={award}
                className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-slate2"
              >
                <Award className="h-3 w-3 text-gold" /> {award}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`amazon-buy-button-${book.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-terracotta"
          >
            <ShoppingCart className="h-4 w-4" /> Buy on Amazon
          </a>
          <a
            href={book.kindleUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`kindle-buy-button-${book.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
          >
            <BookOpen className="h-4 w-4" /> Kindle
          </a>
          <a
            href={book.audibleUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`audible-buy-button-${book.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
          >
            <Headphones className="h-4 w-4" /> Audible
          </a>
        </div>
      </div>
    </motion.article>
  );
}
