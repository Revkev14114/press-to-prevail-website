import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, Clock3, Mic2, Youtube, Linkedin } from "lucide-react";
import { SITE } from "../content/site";
import { Reveal, MaskedLine } from "../components/Motion";
import EnquiryForm from "../components/EnquiryForm";

const FAQS = [
  {
    q: "How far ahead should we book?",
    a: "Keynotes are typically booked 60–90 days out, but reach out anyway — if the date is open, we'll make it work. Church weekends and multi-session events can be planned further ahead.",
  },
  {
    q: "Does Kevin speak at churches as well as conferences?",
    a: "Yes — stages, sanctuaries, classrooms and boardrooms. The message is tailored to the room: leadership-focused for conferences, scripture-anchored for congregations.",
  },
  {
    q: "Can we order books in bulk for our team or group?",
    a: "Absolutely. Bulk and signed copies of Building the Perfect Home are available — choose 'Books / Bulk Order' in the form and include your quantity and timeline.",
  },
  {
    q: "When does the coaching practice open?",
    a: "The first small cohort is forming now. Choose 'Coaching (waitlist)' in the form and you'll be first to hear when seats open.",
  },
];

const INFO = [
  { icon: Clock3, label: "Response Time", value: "Within 48 hours, personally" },
  { icon: Mic2, label: "Formats", value: "Keynote · Workshop · Church · Podcast · Classroom" },
];

export default function Contact() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div data-testid="contact-page" className="bg-night text-[#F9F8F6]">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-16 pt-[130px] lg:px-10 lg:pb-20 lg:pt-[170px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,162,39,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
                  <span className="h-px w-8 bg-gold" />
                  Contact
                </span>
              </Reveal>
              <h1 className="mt-6 font-display uppercase leading-[0.95] tracking-[0.02em]">
                <MaskedLine delay={0.15} className="text-5xl sm:text-7xl lg:text-8xl">
                  Let's <span className="text-gold">connect.</span>
                </MaskedLine>
              </h1>
            </div>
            <Reveal delay={0.35}>
              <p className="max-w-md text-base font-light leading-relaxed text-stone2 sm:text-lg">
                Speaking dates, book orders, interviews, coaching — or just a straight
                conversation. Every message is read and answered personally.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  data-testid="contact-email-link"
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors duration-300 hover:text-goldlight"
                >
                  <Mail className="h-4 w-4" /> {SITE.email}
                </a>
                <div className="flex gap-5">
                  <a data-testid="contact-youtube-link" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-stone2 transition-colors duration-300 hover:text-gold">
                    <Youtube className="h-4 w-4" /> YouTube
                  </a>
                  <a data-testid="contact-linkedin-link" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-stone2 transition-colors duration-300 hover:text-gold">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
            {INFO.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className="flex items-center gap-4 bg-night p-6">
                  <item.icon className="h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone2/60">{item.label}</p>
                    <p className="mt-1 text-sm font-medium text-[#F9F8F6]">{item.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EnquiryForm />

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-8 bg-gold" />
            Before You Ask
          </span>
          <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl">
            Straight answers.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 border-t border-white/10">
            {FAQS.map((faq, i) => (
              <div key={faq.q} className="border-b border-white/10">
                <button
                  data-testid={`faq-toggle-${i}`}
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="font-serif text-lg font-semibold tracking-tight text-[#F9F8F6] sm:text-xl">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm leading-relaxed text-stone2/90">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
