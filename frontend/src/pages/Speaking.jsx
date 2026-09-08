import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock3, MapPin, MonitorPlay, FileBadge } from "lucide-react";
import { KEYNOTES } from "../content/site";
import { Reveal, MaskedLine } from "../components/Motion";
import VideoGallery from "../components/VideoGallery";
import EnquiryForm from "../components/EnquiryForm";

const LOGISTICS = [
  {
    icon: MapPin,
    title: "Travel & Booking",
    body: "Based in the U.S. Midwest and booking worldwide. Keynotes are typically booked 60–90 days out; church weekends and multi-session events welcome. Travel and lodging are arranged simply — one flat buyout or actuals, your choice.",
  },
  {
    icon: MonitorPlay,
    title: "AV & Stage Requirements",
    body: "Wireless lavalier or headset mic, confidence monitor, and a 16:9 screen. Kevin speaks with minimal slides — the room and the message do the work. A full one-page rider is included with every media kit.",
  },
  {
    icon: FileBadge,
    title: "Recording & Reprint Rights",
    body: "Internal recording for your team or congregation is welcome with credit. Broadcast and commercial reuse is arranged case by case — just note it in your enquiry.",
  },
  {
    icon: Clock3,
    title: "Formats & Lengths",
    body: "Keynotes run 30–60 minutes. Workshops run half-day or full-day. Q&A sessions, panels, podcasts and classroom teaching are all available — every talk is tailored to your room.",
  },
];

function LogisticsItem({ item, open, onToggle, index }) {
  return (
    <div className="border-b border-white/10">
      <button
        data-testid={`logistics-toggle-${index}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <span className="flex items-center gap-4">
          <item.icon className="h-5 w-5 shrink-0 text-gold" />
          <span className="font-display text-xl uppercase tracking-[0.05em] text-[#F9F8F6]">{item.title}</span>
        </span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-9 text-sm leading-relaxed text-stone2/90">{item.body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Speaking() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div data-testid="speaking-page" className="bg-night text-[#F9F8F6]">
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
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
                <span className="h-px w-8 bg-gold" />
                Speaking
              </span>
            </Reveal>
            <h1 className="mt-6 font-display uppercase leading-[0.95] tracking-[0.02em]">
              <MaskedLine delay={0.15} className="text-5xl sm:text-6xl lg:text-7xl">
                Keynotes that build
              </MaskedLine>
              <MaskedLine delay={0.3} className="text-5xl sm:text-6xl lg:text-7xl">
                <span className="text-gold">something that lasts.</span>
              </MaskedLine>
            </h1>
            <Reveal delay={0.45}>
              <p className="mt-8 max-w-xl font-serif text-xl italic leading-snug text-gold/90 sm:text-2xl">
                “His approach is simple. To take timeless truths and make them practical,
                understandable, and impossible to ignore.”
              </p>
              <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-stone2">
                Watch a sample below, explore the flagship talks, and let's build your event together.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="relative">
              <div className="absolute -right-4 -top-4 h-full w-full rounded-lg border border-gold/40" />
              <div className="relative overflow-hidden rounded-lg shadow-[0_35px_80px_-25px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                <img
                  src="/assets/kevin-speaking.jpg"
                  alt="Kevin Johnson speaking at the podium — Building the Perfect Home"
                  data-testid="speaking-hero-photo"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VIDEO REEL — compact */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-4">
            <h2 className="font-display text-2xl uppercase tracking-[0.04em] sm:text-3xl">The reel</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone2/60">Click any talk to watch</span>
          </div>
        </Reveal>
        <div className="mt-8">
          <VideoGallery dark compact />
        </div>
      </section>

      {/* KEYNOTE TOPICS */}
      <section className="border-y border-white/10 bg-[#101013] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-8 bg-gold" />
              Flagship Talks
            </span>
            <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl">
              Three keynotes. One foundation.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
            {KEYNOTES.map((k, i) => (
              <Reveal key={k.title} delay={i * 0.08}>
                <div data-testid={`keynote-topic-${i}`} className="group flex h-full flex-col bg-night p-8 transition-colors duration-500 hover:bg-[#181004]">
                  <span className="font-mono text-xs tracking-[0.25em] text-gold">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.05em] transition-colors duration-500 group-hover:text-gold">{k.title}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-stone2/60">{k.length}</p>
                  <p className="mt-4 text-sm leading-relaxed text-stone2/90">{k.body}</p>
                  <button
                    data-testid={`keynote-enquire-btn-${i}`}
                    onClick={() => document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" })}
                    className="mt-6 inline-flex items-center gap-2 self-start text-sm font-medium text-gold transition-colors duration-300 hover:text-goldlight"
                  >
                    Enquire about this talk
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOGISTICS */}
      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-8 bg-gold" />
            Event Logistics
          </span>
          <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl">
            The practical details.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 border-t border-white/10">
            {LOGISTICS.map((item, i) => (
              <LogisticsItem
                key={item.title}
                item={item}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </Reveal>
      </section>

      <EnquiryForm />
    </div>
  );
}
