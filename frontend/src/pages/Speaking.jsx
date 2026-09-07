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
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-8 bg-gold" />
              Speaking
            </span>
          </Reveal>
          <h1 className="mt-6 font-display uppercase leading-[0.95] tracking-[0.02em]">
            <MaskedLine delay={0.15} className="text-5xl sm:text-7xl lg:text-8xl">
              Keynotes that build
            </MaskedLine>
            <MaskedLine delay={0.3} className="text-5xl sm:text-7xl lg:text-8xl">
              <span className="text-gold">something that lasts.</span>
            </MaskedLine>
          </h1>
          <Reveal delay={0.45}>
            <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-stone2 sm:text-lg">
              Forty years of job sites and a lifetime in God's Word — delivered from the stage with
              the same straight talk you'd get across a kitchen table. Watch the reel, pick a topic,
              and let's build your event together.
            </p>
          </Reveal>
        </div>
      </section>

      {/* VIDEO REEL */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <Reveal>
          <h2 className="font-display text-3xl uppercase tracking-[0.04em] sm:text-4xl">The reel</h2>
        </Reveal>
        <div className="mt-10">
          <VideoGallery dark />
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
