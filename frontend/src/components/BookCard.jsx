import { motion } from "framer-motion";
import { ShoppingCart, Headphones, BookOpen, Award, Bell } from "lucide-react";
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
    <div className="flex aspect-[3/4] w-full flex-col justify-between rounded-[3px] bg-coal p-6 text-[#F9F8F6] ring-1 ring-white/10">
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F9F8F6]/50">{book.year}</span>
        <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      </div>
      <div>
        <p className={`font-display uppercase leading-[1.02] tracking-[0.04em] ${large ? "text-4xl sm:text-5xl" : "text-3xl"}`}>
          {book.title}
        </p>
        <div className="mt-3 h-px w-12 bg-gold" />
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
      <div className="rounded-lg bg-gradient-to-b from-gold/25 via-white/5 to-transparent p-1 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] transition-shadow duration-500 group-hover:shadow-[0_35px_80px_-20px_rgba(201,162,39,0.3)]">
        <BookCover book={book} large={featured} />
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-[#F9F8F6]">{book.title}</h3>
          <span className="font-mono text-xs text-stone2/70">{book.year}</span>
        </div>
        <p className="mt-1 font-serif text-sm italic text-gold/90">{book.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-stone2/90">{book.description}</p>

        {book.awards?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {book.awards.map((award) => (
              <span
                key={award}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-stone2"
              >
                <Award className="h-3 w-3 text-gold" /> {award}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {book.upcoming ? (
            <button
              data-testid={`notify-button-${book.id}`}
              onClick={() => document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 text-sm font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-night"
            >
              <Bell className="h-4 w-4" /> Notify me at launch
            </button>
          ) : (
            <>
              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`amazon-buy-button-${book.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight"
              >
                <ShoppingCart className="h-4 w-4" /> Buy on Amazon
              </a>
              <a
                href={book.kindleUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`kindle-buy-button-${book.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm font-medium text-[#F9F8F6] transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <BookOpen className="h-4 w-4" /> Kindle
              </a>
              {book.audibleUrl && (
                <a
                  href={book.audibleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`audible-buy-button-${book.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm font-medium text-[#F9F8F6] transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <Headphones className="h-4 w-4" /> Audible
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}
