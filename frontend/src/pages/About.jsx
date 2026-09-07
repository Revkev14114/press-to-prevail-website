import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Mic2, PenLine, Compass, Sparkles, Download } from "lucide-react";
import { SITE, TIMELINE, KEYNOTES } from "../content/site";
import { Reveal, MaskedLine } from "../components/Motion";
import VideoGallery from "../components/VideoGallery";
import EnquiryForm from "../components/EnquiryForm";

const PILLARS = [
  { icon: Compass, title: "The Job Site", body: "Forty-plus years of homebuilding — where the lessons of blueprints, footings and straight lines became a way of seeing lives." },
  { icon: PenLine, title: "The Page", body: "Building the Perfect Home gathers it all: trade wisdom and timeless biblical principles in one blueprint for a life that lasts." },
  { icon: Mic2, title: "The Stage", body: "Keynotes and church talks built the same way as a good house — honest materials, solid structure, no shortcuts." },
  { icon: Sparkles, title: "The Next Chapter", body: "A coaching practice is forming — small cohorts for people ready to stop patching and start rebuilding." },
];

export default function About() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === "#speaking") {
      setTimeout(() => document.getElementById("speaking")?.scrollIntoView({ behavior: "smooth" }), 400);
    }
  }, [hash]);

  return (
    <div data-testid="about-page" className="bg-night text-[#F9F8F6]">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-20 pt-[130px] lg:px-10 lg:pb-28 lg:pt-[170px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,162,39,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
                <span className="h-px w-8 bg-gold" />
                About — The Builder Behind the Blueprint
              </span>
            </Reveal>
            <h1 className="mt-6 font-display uppercase leading-[0.95] tracking-[0.02em]">
              <MaskedLine delay={0.15} className="text-5xl sm:text-6xl lg:text-7xl">
                Built by hand.
              </MaskedLine>
              <MaskedLine delay={0.3} className="text-5xl sm:text-6xl lg:text-7xl">
                <span className="text-gold">Led by faith.</span>
              </MaskedLine>
            </h1>
            <Reveal delay={0.5}>
              <p className="mt-8 max-w-lg text-base font-light leading-relaxed text-stone2 sm:text-lg">
                {SITE.name} didn't begin on a stage. It began on job sites — more than forty years
                of pouring foundations, squaring walls and walking families into homes built to last.
              </p>
              <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-stone2">
                Somewhere along the way, a conviction kept surfacing: the houses were never the
                point. God builds something far greater than a house — and every life, like every
                home, begins with a blueprint.
              </p>
              <p className="mt-8 font-serif text-2xl italic text-gold/90">— Founder, {SITE.name}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="relative mx-auto max-w-md">
              <div className="absolute -right-4 -top-4 h-full w-full rounded-lg border border-gold/40" />
              <div className="relative overflow-hidden rounded-lg shadow-[0_35px_80px_-25px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                <img
                  src="https://images.pexels.com/photos/27471477/pexels-photo-27471477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200"
                  alt="Founder of Press To Prevail"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#F9F8F6]/70">
                  40+ Years on the Job Site
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-y border-white/10 bg-[#101013] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-8 bg-gold" />
              Chapters
            </span>
            <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl">
              The story so far.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((chapter, i) => (
              <Reveal key={chapter.year} delay={i * 0.08}>
                <div data-testid={`timeline-${chapter.year}`} className="relative border-t-2 border-white/15 pt-6 transition-colors duration-500 hover:border-gold">
                  <span className="absolute -top-[7px] left-0 h-3 w-3 rotate-45 bg-gold" />
                  <p className="font-mono text-sm tracking-[0.2em] text-gold">{chapter.year}</p>
                  <h3 className="mt-3 font-display text-xl uppercase tracking-[0.05em] text-[#F9F8F6]">{chapter.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone2/90">{chapter.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-8 bg-gold" />
            Philosophy & Pillars
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl">
            What the work stands on.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.07}>
              <div className="group flex h-full gap-5 rounded-lg border border-white/10 bg-white/[0.03] p-7 transition-colors duration-500 hover:border-gold/50">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-night">
                  <pillar.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl uppercase tracking-[0.06em] text-[#F9F8F6] transition-colors duration-500 group-hover:text-gold">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone2/90">{pillar.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-lg border border-white/10 bg-white/[0.03] p-8 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-2xl uppercase tracking-[0.05em]">Media kit & press assets</h3>
              <p className="mt-2 text-sm text-stone2">Portraits, speaker bio and topic sheets — ready for event organizers, churches and press.</p>
            </div>
            <button
              data-testid="media-kit-btn"
              onClick={() => document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight"
            >
              <Download className="h-4 w-4" /> Request media kit
            </button>
          </div>
        </Reveal>
      </section>

      {/* SPEAKING & VIDEOS */}
      <section id="speaking" data-testid="speaking-section" className="border-y border-white/10 bg-[#101013] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-8 bg-gold" />
              Speaking & Videos
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl">
              Watch the work <span className="text-gold">in the room.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-stone2/90">
              Keynotes, church talks and interviews — a sample of recent footage.
              Click any talk to watch.
            </p>
          </Reveal>

          <div className="mt-14">
            <VideoGallery dark />
          </div>

          <div className="mt-20 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
            {KEYNOTES.map((k, i) => (
              <Reveal key={k.title} delay={i * 0.08}>
                <div data-testid={`keynote-topic-${i}`} className="flex h-full flex-col bg-night p-7">
                  <span className="font-mono text-xs tracking-[0.25em] text-gold">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-xl uppercase tracking-[0.06em]">{k.title}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-stone2/60">{k.length}</p>
                  <p className="mt-4 text-sm leading-relaxed text-stone2/85">{k.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EnquiryForm />
    </div>
  );
}
