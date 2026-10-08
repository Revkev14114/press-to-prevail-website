import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, Layers, Hammer, Shield, Flag } from "lucide-react";
import { Reveal, MaskedLine } from "../components/Motion";

const INSPECTION_AREAS = [
  {
    number: "01",
    title: "Architect",
    icon: Compass,
    question: "Who is designing your life?",
    body: "An inspector starts with the plans. Before a single board is set, someone drew the blueprint — or no one did. This area looks at vision, purpose, and design: whether your life is being built according to God's design, or whether you are improvising a structure that was never engineered to last.",
  },
  {
    number: "02",
    title: "Foundation",
    icon: Layers,
    question: "What is your life built upon?",
    body: "No house is stronger than what it sits on. This area inspects the footing beneath everything else — the strength and reliability of the foundation under the life being built. If the base is cracked, shifting, or poured on sand, the rest of the work is already at risk, no matter how fine the finish looks.",
  },
  {
    number: "03",
    title: "Structure",
    icon: Hammer,
    question: "Is your life being built according to the design?",
    body: "This is the frame: the load-bearing work that gives the house its shape. Character, habits, priorities, relationships, and obedience are the studs and joists. An inspector checks whether what is going up actually matches the plans — or whether corners have been cut where no one thought to look.",
  },
  {
    number: "04",
    title: "Protection",
    icon: Shield,
    question: "Are you protecting what you are building?",
    body: "A finished wall still needs weatherproofing. This area inspects boundaries, temptation, influences, distractions, and spiritual vigilance — whether you are covering the work already completed, or leaving it open to the elements that quietly undo a house from the outside in.",
  },
  {
    number: "05",
    title: "Finish",
    icon: Flag,
    question: "Are you going to finish what you started?",
    body: "Plenty of jobs start strong and stall in the middle mile. This area inspects perseverance, faithfulness, purpose, and legacy — whether you will stay with the work until it stands, and whether you are building something that will still be standing when you are gone.",
  },
];

const PLACEHOLDER_SLOTS = 3;

export default function BuildingThePerfectHomeInspection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = INSPECTION_AREAS[activeIndex];
  const ActiveIcon = active.icon;
  const progress = ((activeIndex + 1) / INSPECTION_AREAS.length) * 100;

  const beginInspection = () => {
    document.getElementById("inspection-assessment")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div data-testid="inspection-page" className="bg-night text-[#F9F8F6]">
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
              Personal Life Inspection
            </span>
          </Reveal>
          <h1 className="mt-6 font-display uppercase leading-[0.95] tracking-[0.02em]">
            <MaskedLine delay={0.15} className="text-5xl sm:text-7xl lg:text-8xl">
              Building the
            </MaskedLine>
            <MaskedLine delay={0.3} className="text-5xl sm:text-7xl lg:text-8xl">
              Perfect Home
            </MaskedLine>
            <MaskedLine delay={0.45} className="text-5xl sm:text-7xl lg:text-8xl">
              <span className="text-gold">Inspection</span>
            </MaskedLine>
          </h1>
          <Reveal delay={0.55}>
            <p className="mt-8 max-w-2xl font-serif text-xl italic leading-snug text-gold/90 sm:text-2xl">
              A professional inspector does not compliment the paint. He checks the plans, the
              footing, the frame, the weatherproofing, and whether the job will actually be finished.
            </p>
            <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-stone2 sm:text-lg">
              Drawn from the construction metaphor of{" "}
              <Link to="/books" className="text-gold underline-offset-4 transition-colors hover:underline">
                Building the Perfect Home
              </Link>
              , this is that same walkthrough applied to a human life. Five inspection areas. No
              score to flatter you. An honest look at what is holding, what is cracking, and what
              will not survive the next storm.
            </p>
            <button
              type="button"
              data-testid="inspection-begin-btn"
              onClick={beginInspection}
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight"
            >
              Begin the Inspection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
                <span className="h-px w-8 bg-gold" />
                What This Inspection Does
              </span>
              <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl">
                The same checklist a house has to pass.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-stone2">
                A home inspector does not guess. He walks the job in order: Who drew these plans?
                What is this sitting on? Does the structure match the design? Is the work protected?
                Will it be finished? This page uses that sequence on the life you are building.
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone2">
                It is not a personality quiz. It is not a test you pass by knowing the right
                answers. When the questions and scoring are in place, each area will press you to
                look at the actual construction — not the story you tell about it.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="rounded-lg border border-white/10 bg-[#101013] p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold/80">Inspection sequence</p>
              <ol className="mt-6 space-y-5">
                {INSPECTION_AREAS.map((area) => (
                  <li key={area.number} className="flex gap-4">
                    <span className="font-mono text-sm tracking-[0.2em] text-gold">{area.number}</span>
                    <span className="text-sm leading-relaxed text-[#F9F8F6]/85">
                      <span className="font-semibold text-[#F9F8F6]">{area.title}.</span> {area.question}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#101013] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-8 bg-gold" />
              Five Inspection Areas
            </span>
            <h2 className="mt-5 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl">
              Architect. Foundation. Structure. Protection. Finish.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {INSPECTION_AREAS.map((area, i) => {
              const Icon = area.icon;
              return (
                <Reveal key={area.number} delay={i * 0.08}>
                  <div
                    data-testid={`inspection-category-${area.title.toLowerCase()}`}
                    className="group flex h-full flex-col bg-night p-7 transition-colors duration-500 hover:bg-[#181004]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-night">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-gold/80">{area.number}</p>
                    <h3 className="mt-1 font-display text-2xl uppercase tracking-[0.06em] text-[#F9F8F6] transition-colors duration-500 group-hover:text-gold">
                      {area.title}
                    </h3>
                    <div className="mt-3 h-px w-10 bg-gold/40 transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />
                    <p className="mt-4 font-serif text-sm italic leading-snug text-gold/90">{area.question}</p>
                    <p className="mt-3 text-sm leading-relaxed text-stone2/90">{area.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="inspection-assessment" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-8 bg-gold" />
            The Inspection
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl">
            Walk the job in order.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone2">
            The clipboard is ready. Questions and scoring for each area will be added here. Until
            then, walk the five inspection areas, get a feel for the sequence, and come back when
            the full assessment is poured.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            data-testid="inspection-assessment-placeholder"
            className="mt-12 overflow-hidden rounded-lg border border-white/10 bg-[#101013]"
          >
            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold/80">Inspector&apos;s clipboard</p>
                  <p className="mt-2 font-display text-2xl uppercase tracking-[0.04em]">
                    {active.title} <span className="text-gold">Inspection</span>
                  </p>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#F9F8F6]/50">
                  Area {active.number} of {String(INSPECTION_AREAS.length).padStart(2, "0")}
                </p>
              </div>
              <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-gold transition-all duration-500"
                  style={{ width: `${progress}%` }}
                  aria-hidden
                />
              </div>
            </div>

            <div className="grid border-b border-white/10 sm:grid-cols-5">
              {INSPECTION_AREAS.map((area, i) => (
                <button
                  key={area.number}
                  type="button"
                  data-testid={`inspection-step-${area.title.toLowerCase()}`}
                  onClick={() => setActiveIndex(i)}
                  className={`border-white/10 px-3 py-4 text-left transition-colors duration-300 sm:border-r sm:last:border-r-0 ${
                    i === activeIndex ? "bg-gold/[0.08] text-gold" : "text-[#F9F8F6]/60 hover:bg-white/[0.03] hover:text-[#F9F8F6]"
                  }`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em]">{area.number}</p>
                  <p className="mt-1 font-display text-base uppercase tracking-[0.06em] lg:text-lg">{area.title}</p>
                </button>
              ))}
            </div>

            <div className="px-6 py-8 sm:px-8">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <ActiveIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-serif text-lg italic leading-snug text-gold/90">{active.question}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone2">{active.body}</p>
                </div>
              </div>

              <ul className="mt-10 space-y-4">
                {Array.from({ length: PLACEHOLDER_SLOTS }, (_, i) => (
                  <li
                    key={`${active.title}-${i}`}
                    data-testid={`inspection-question-slot-${i}`}
                    className="rounded-lg border border-dashed border-white/15 bg-night/50 p-5"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold/70">
                      Finding {String(i + 1).padStart(2, "0")} — coming soon
                    </p>
                    <p className="mt-2 text-sm text-[#F9F8F6]/45">
                      Inspection questions for {active.title} will appear here.
                    </p>
                    <div className="mt-4 flex gap-2" aria-hidden>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 font-mono text-[10px] text-[#F9F8F6]/30"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <button
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                  className="rounded-full border border-[#F9F8F6]/30 px-6 py-3 text-sm font-medium text-[#F9F8F6] transition-colors duration-300 hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#F9F8F6]/30 disabled:hover:text-[#F9F8F6]"
                >
                  Previous area
                </button>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F9F8F6]/40">Scoring system coming soon</p>
                <button
                  type="button"
                  disabled={activeIndex === INSPECTION_AREAS.length - 1}
                  onClick={() => setActiveIndex((i) => Math.min(INSPECTION_AREAS.length - 1, i + 1))}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-gold"
                >
                  Next area
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
