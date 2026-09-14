import { User, Users, Church, ClipboardCheck, DraftingCompass, Hammer, BadgeCheck } from "lucide-react";
import { Reveal, MaskedLine } from "../components/Motion";
import EnquiryForm from "../components/EnquiryForm";

const OFFERS = [
  {
    icon: User,
    title: "One-on-One Coaching",
    status: "Coming Soon",
    body: "Personal coaching for people who are ready to move forward — with greater faith, clarity, focus, and purpose. Together, we'll identify what's holding you back and build a path toward where you want to go.",
  },
  {
    icon: Users,
    title: "Leadership & Team Workshops",
    status: "Now Booking",
    body: "Half-day and full-day working sessions designed to help leadership teams strengthen communication, build accountability, clarify their purpose, and work better together.",
  },
  {
    icon: Church,
    title: "Church & Ministry Consulting",
    status: "Now Booking",
    body: "Practical guidance for churches and ministries seeking to strengthen leadership, develop people, engage volunteers, and build a healthier foundation for the work ahead.",
  },
];

const PROCESS = [
  { icon: ClipboardCheck, step: "01", title: "Assess the Foundation", body: "An honest look at what's truly load-bearing — and what's been quietly cracking." },
  { icon: DraftingCompass, step: "02", title: "Draw the Blueprint", body: "A clear plan for what we're building, where we're going, and why it matters." },
  { icon: Hammer, step: "03", title: "Do the Work", body: "Turn the plan into progress through focused action, accountability, and consistent execution." },
  { icon: BadgeCheck, step: "04", title: "Inspect & Finish", body: "Measure what held, strengthen what didn't, and build something designed to last." },
];

export default function Consulting() {
  return (
    <div data-testid="consulting-page" className="bg-night text-[#F9F8F6]">
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
              Consulting & Coaching
            </span>
          </Reveal>
          <h1 className="mt-6 font-display uppercase leading-[0.95] tracking-[0.02em]">
            <MaskedLine delay={0.15} className="text-5xl sm:text-7xl lg:text-8xl">
              Build with someone
            </MaskedLine>
            <MaskedLine delay={0.3} className="text-5xl sm:text-7xl lg:text-8xl">
              <span className="text-gold">who's built before.</span>
            </MaskedLine>
          </h1>
          <Reveal delay={0.45}>
            <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-stone2 sm:text-lg">
              Forty years in homebuilding have taught me that what gets built on the inside
              determines what stands on the outside. Along the way, I have seen where things begin
              to break down, what helps make them stronger, and what it takes to build with purpose.
              Now I bring that experience to leaders, teams, and ministries.
            </p>
          </Reveal>
        </div>
      </section>

      {/* OFFERS */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
          {OFFERS.map((offer, i) => (
            <Reveal key={offer.title} delay={i * 0.08}>
              <div data-testid={`offer-${i}`} className="group flex h-full flex-col bg-night p-8 transition-colors duration-500 hover:bg-[#181004]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-night">
                  <offer.icon className="h-5 w-5" />
                </span>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-gold/80">{offer.status}</p>
                <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.05em]">{offer.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-stone2/90">{offer.body}</p>
                <button
                  data-testid={`offer-enquire-btn-${i}`}
                  onClick={() => document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" })}
                  className="mt-6 inline-flex items-center gap-2 self-start text-sm font-medium text-gold transition-colors duration-300 hover:text-goldlight"
                >
                  Start the conversation
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* THE UNDERLYING MESSAGE */}
      <section className="mx-auto max-w-4xl px-6 pb-24 lg:px-10">
        <Reveal>
          <figure data-testid="consulting-promise" className="border-l-2 border-gold pl-6 sm:pl-8">
            <blockquote className="font-serif text-xl italic leading-snug text-[#F9F8F6]/90 sm:text-2xl">
              “Building something that lasts takes more than a good plan. It takes experience,
              perspective, honest conversation, and a willingness to look at what's really
              underneath. I'm here to bring those things to the table and help you build
              something stronger.”
            </blockquote>
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-gold/80">
              — Kevin Johnson
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* PROCESS */}
      <section className="border-y border-white/10 bg-[#101013] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-8 bg-gold" />
              How It Works
            </span>
            <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] tracking-[0.03em] sm:text-5xl">
              Follow with purpose.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08}>
                <div data-testid={`process-step-${i}`} className="relative border-t-2 border-white/15 pt-6 transition-colors duration-500 hover:border-gold">
                  <span className="absolute -top-[7px] left-0 h-3 w-3 rotate-45 bg-gold" />
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm tracking-[0.2em] text-gold">{step.step}</p>
                    <step.icon className="h-5 w-5 text-gold/60" />
                  </div>
                  <h3 className="mt-3 font-display text-xl uppercase tracking-[0.05em]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone2/90">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EnquiryForm compact />
    </div>
  );
}
