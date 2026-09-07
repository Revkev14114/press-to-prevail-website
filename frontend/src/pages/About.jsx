import { Mic2, PenLine, Compass, Sparkles, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE, TIMELINE } from "../content/site";
import { Reveal, MaskedLine } from "../components/Motion";
import EnquiryForm from "../components/EnquiryForm";

const PILLARS = [
  { icon: Compass, title: "The Job Site", body: "Forty-plus years of residential construction — where foundations, blueprints, structure and setbacks became a way of seeing lives." },
  { icon: PenLine, title: "The Page", body: "Building the Perfect Home gathers it all: trade wisdom and timeless biblical principles in one blueprint for a life that lasts." },
  { icon: Mic2, title: "The Stage & the Classroom", body: "Speaking and teaching built the same way as a good house — honest materials, solid structure, no shortcuts." },
  { icon: Sparkles, title: "The Next Chapter", body: "A coaching practice is forming — small cohorts for people ready to stop patching and start rebuilding." },
];

export default function About() {
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
                About — Kevin Johnson
              </span>
            </Reveal>
            <h1 className="mt-6 font-display uppercase leading-[0.95] tracking-[0.02em]">
              <MaskedLine delay={0.15} className="text-5xl sm:text-6xl lg:text-7xl">
                Builder. Author.
              </MaskedLine>
              <MaskedLine delay={0.3} className="text-5xl sm:text-6xl lg:text-7xl">
                <span className="text-gold">Speaker. Teacher.</span>
              </MaskedLine>
            </h1>
            <Reveal delay={0.5}>
              <p className="mt-8 max-w-lg text-base font-light leading-relaxed text-stone2 sm:text-lg">
                For more than 40 years, Kevin Johnson has been building homes — and learning
                lessons about what it takes to build something that lasts.
              </p>
              <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-stone2">
                His career in residential construction gave him a firsthand understanding of
                foundations, blueprints, structure, pressure, setbacks, and the importance of
                getting the details right. But along the way, Kevin discovered that the principles
                used to build a strong home have an even greater application: building a strong life.
              </p>
              <p className="mt-8 font-serif text-2xl italic text-gold/90">— Kevin Johnson, Founder of {SITE.name}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -right-4 -top-4 h-full w-full rounded-lg border border-gold/40" />
              <div className="relative overflow-hidden rounded-lg shadow-[0_35px_80px_-25px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                <img
                  src="/assets/kevin-johnson.jpg"
                  alt="Kevin Johnson at his desk — Builder, Author, Speaker, Teacher"
                  data-testid="about-portrait"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BIO — THE STRAIGHT STORY */}
      <section className="border-y border-white/10 bg-[#101013] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
                <span className="h-px w-8 bg-gold" />
                The Straight Story
              </span>
              <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl">
                Pressure doesn't have to defeat us. <span className="text-gold">It can develop us.</span>
              </h2>
              <figure className="mt-10 border-l-2 border-gold pl-6">
                <blockquote className="font-serif text-lg italic leading-relaxed text-[#F9F8F6]/85 sm:text-xl">
                  “Consider it pure joy, my brothers and sisters, whenever you face trials of many
                  kinds, because you know that the testing of your faith produces perseverance.”
                </blockquote>
                <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-gold/80">
                  James 1:2-3
                </figcaption>
              </figure>
            </Reveal>
            <div className="space-y-6 text-base font-light leading-relaxed text-stone2">
              <Reveal delay={0.1}>
                <p>
                  A lifelong student and teacher of God's Word, Kevin combines his experience in
                  construction with biblical principles to help people see their lives from a
                  different perspective. His message is practical, straightforward, and rooted in a
                  simple truth: pressure doesn't have to defeat us. It can develop us.
                </p>
                <p>
                  That conviction became the foundation for {SITE.name} — more than a phrase: a
                  mindset and a movement built around the belief that adversity, pressure, and
                  challenges can become part of the process that strengthens us. Rather than
                  allowing pressure to define the outcome, we can press through it, learn from it,
                  and ultimately prevail.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p>
                  Kevin is the author of <em className="font-serif italic text-[#F9F8F6]">Building the Perfect Home: God's
                  Blueprint for Building a Life That Lasts</em>, where he uses more than four decades of
                  homebuilding experience to explore what God's Word teaches about constructing a
                  life with purpose, strength, and lasting significance.
                </p>
                <p>
                  Whether speaking from a stage, teaching a class, writing a book, or simply having
                  a straight conversation, Kevin's goal is the same: to challenge people to build
                  with purpose, stand on a strong foundation, and press forward until they prevail.
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <p className="border-t border-white/10 pt-6 font-display text-2xl uppercase tracking-[0.08em] text-gold">
                  Press to Prevail. <span className="text-[#F9F8F6]">Faith. Foundation. Focus. Finish.</span>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 lg:py-32">
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
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
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

      {/* SPEAKING TEASER */}
      <section data-testid="speaking-teaser" className="border-y border-white/10 bg-[#101013] py-16 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center lg:px-10">
          <Reveal>
            <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-[0.03em] sm:text-4xl">
              Watch Kevin <span className="text-gold">in the room.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone2/90">
              Keynotes, church talks and interviews — the full reel and flagship topics now live on the Speaking page.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/speaking"
              data-testid="about-speaking-link"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight"
            >
              Visit Speaking <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <EnquiryForm />
    </div>
  );
}
