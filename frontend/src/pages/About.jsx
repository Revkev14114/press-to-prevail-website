import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Mic2, PenLine, Compass, Sparkles, Download } from "lucide-react";
import { SITE, TIMELINE, KEYNOTES } from "../content/site";
import { Reveal, Eyebrow, MaskedLine } from "../components/Motion";
import VideoGallery from "../components/VideoGallery";
import EnquiryForm from "../components/EnquiryForm";

const PILLARS = [
  { icon: Mic2, title: "The Stage", body: "Five hundred keynotes across four continents — from TEDx red circles to arena leadership summits." },
  { icon: PenLine, title: "The Page", body: "Three books, nine translations, one million readers. The writing always comes first; the stage follows." },
  { icon: Compass, title: "The Practice", body: "Daily pages at 5 a.m., long walks without a phone, one honest conversation a week. Boring, and non-negotiable." },
  { icon: Sparkles, title: "The Next Chapter", body: "A coaching practice is forming — small cohorts, deep work, for leaders who want to write their way forward." },
];

export default function About() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === "#speaking") {
      setTimeout(() => document.getElementById("speaking")?.scrollIntoView({ behavior: "smooth" }), 400);
    }
  }, [hash]);

  return (
    <div data-testid="about-page">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-[130px] lg:px-10 lg:pb-28 lg:pt-[170px]">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>About — The Writer's Journey</Eyebrow>
            </Reveal>
            <h1 className="mt-6 font-serif text-4xl font-normal leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              <MaskedLine delay={0.15}>A life built</MaskedLine>
              <MaskedLine delay={0.28}>
                one <span className="italic text-terracotta">honest sentence</span>
              </MaskedLine>
              <MaskedLine delay={0.41}>at a time.</MaskedLine>
            </h1>
            <Reveal delay={0.5}>
              <p className="mt-8 max-w-lg text-base font-light leading-relaxed text-slate2 sm:text-lg">
                {SITE.name} spent a decade as a strategist who wrote before sunrise. The manuscripts
                became books, the books became stages, and the stages became a single body of work:
                helping people say the true thing, plainly, in rooms that matter.
              </p>
              <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-slate2">
                Today the work spans bestselling books, international keynotes — and soon, a coaching
                practice for leaders who think best with a pen in hand.
              </p>
              <p className="mt-8 font-serif text-2xl italic text-ink/80">— {SITE.name}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="relative mx-auto max-w-md">
              <div className="absolute -right-4 -top-4 h-full w-full rounded-lg border border-terracotta/50" />
              <div className="relative overflow-hidden rounded-lg shadow-[0_35px_80px_-25px_rgba(18,22,26,0.4)]">
                <img src={SITE.portraitAbout} alt={`${SITE.name} — about portrait`} className="aspect-[4/5] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-coal/40 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-y border-hairline bg-surface py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Eyebrow>Chapters</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-medium tracking-tight sm:text-4xl">The story so far.</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((chapter, i) => (
              <Reveal key={chapter.year} delay={i * 0.08}>
                <div data-testid={`timeline-${chapter.year}`} className="relative border-t-2 border-ink/15 pt-6 transition-colors duration-500 hover:border-terracotta">
                  <span className="absolute -top-[7px] left-0 h-3 w-3 rotate-45 bg-terracotta" />
                  <p className="font-mono text-sm tracking-[0.2em] text-terracotta">{chapter.year}</p>
                  <h3 className="mt-3 font-serif text-xl font-semibold tracking-tight">{chapter.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate2">{chapter.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <Eyebrow>Philosophy & Pillars</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            What the work stands on.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.07}>
              <div className="group flex h-full gap-5 rounded-lg border border-hairline bg-ivory p-7 backdrop-blur-sm transition-colors duration-500 hover:border-ink/30">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-terracotta/40 text-terracotta transition-colors duration-500 group-hover:bg-terracotta group-hover:text-ivory">
                  <pillar.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-semibold tracking-tight">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate2">{pillar.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-lg border border-hairline bg-surface p-8 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-serif text-xl font-semibold tracking-tight">Media kit & press assets</h3>
              <p className="mt-2 text-sm text-slate2">Portraits, speaker bio and topic sheets — ready for event organizers and press.</p>
            </div>
            <button
              data-testid="media-kit-btn"
              onClick={() => document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-terracotta"
            >
              <Download className="h-4 w-4" /> Request media kit
            </button>
          </div>
        </Reveal>
      </section>

      {/* SPEAKING & VIDEOS */}
      <section id="speaking" data-testid="speaking-section" className="bg-coal py-24 text-[#F9F8F6] lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Eyebrow light>Speaking & Videos</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Watch the work <span className="italic text-terracotta">in the room.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F9F8F6]/60">
              Keynotes, festival Q&As and commencement addresses — a sample of recent footage.
              Click any talk to watch.
            </p>
          </Reveal>

          <div className="mt-14">
            <VideoGallery dark />
          </div>

          <div className="mt-20 grid gap-px overflow-hidden rounded-lg border border-[#F9F8F6]/15 bg-[#F9F8F6]/10 md:grid-cols-3">
            {KEYNOTES.map((k, i) => (
              <Reveal key={k.title} delay={i * 0.08}>
                <div data-testid={`keynote-topic-${i}`} className="flex h-full flex-col bg-coal p-7">
                  <span className="font-mono text-xs tracking-[0.25em] text-terracotta">0{i + 1}</span>
                  <h3 className="mt-4 font-serif text-xl font-semibold tracking-tight">{k.title}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F9F8F6]/45">{k.length}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[#F9F8F6]/60">{k.body}</p>
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
