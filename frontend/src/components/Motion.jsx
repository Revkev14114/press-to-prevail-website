import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 32, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const MaskedLine = ({ children, delay = 0, className = "" }) => (
  <span className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`}>
    <motion.span
      className="block will-change-transform"
      initial={{ y: "115%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export const Eyebrow = ({ children, light = false }) => (
  <span
    className={`inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] ${
      light ? "text-[#F9F8F6]/60" : "text-terracotta"
    }`}
  >
    <span className={`h-px w-8 ${light ? "bg-[#F9F8F6]/40" : "bg-terracotta"}`} />
    {children}
  </span>
);

export const Marquee = ({ items }) => {
  const row = [...items, ...items];
  return (
    <div data-testid="press-marquee" className="relative overflow-hidden border-y border-white/10 bg-[#101013] py-6">
      <div className="marquee-track flex w-max items-center gap-14 pr-14">
        {row.map((item, i) => (
          <div key={i} className="flex items-center gap-14 whitespace-nowrap">
            <span className="font-serif text-lg italic text-[#F9F8F6]/80">“{item.quote}”</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold/70">
              — {item.source}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
          </div>
        ))}
      </div>
    </div>
  );
};
