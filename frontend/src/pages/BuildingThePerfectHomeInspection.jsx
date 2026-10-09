import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight, Compass, Layers, Hammer, Shield, Flag } from "lucide-react";
import { Reveal, MaskedLine } from "../components/Motion";
import { INSPECTION_QUESTIONS, INSPECTION_SECTIONS } from "../content/inspectionQuestions";
import { generateInspectionReport } from "../content/inspectionReport";
import { colorSummary } from "../content/inspectionColorRules";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AREA_COPY = [
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

const TOTAL = INSPECTION_QUESTIONS.length;

function sectionForQuestion(question) {
  return INSPECTION_SECTIONS.find((section) => section.id === question.sectionId);
}

function Assessment({ answers, setAnswers, onComplete }) {
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");
  const headingRef = useRef(null);
  const question = INSPECTION_QUESTIONS[index];
  const section = sectionForQuestion(question);
  const selected = answers[question.id] ?? "";
  const progress = ((index + 1) / TOTAL) * 100;
  const isLast = index === TOTAL - 1;

  useEffect(() => {
    headingRef.current?.focus();
  }, [index]);

  const selectChoice = (choiceId) => {
    setAnswers((current) => ({ ...current, [question.id]: choiceId }));
    setError("");
  };

  const goNext = () => {
    if (!selected) {
      setError("Choose one description before continuing.");
      return;
    }
    if (isLast) {
      const draft = { ...answers, [question.id]: selected };
      const report = generateInspectionReport(draft);
      if (report.status === "incomplete") {
        setError(`Answer every item before the report can be written. Still open: ${report.missing.join(", ")}.`);
        const firstMissing = INSPECTION_QUESTIONS.findIndex((item) => report.missing.includes(item.id));
        if (firstMissing >= 0) setIndex(firstMissing);
        return;
      }
      onComplete(draft);
      return;
    }
    setIndex((current) => current + 1);
  };

  return (
    <div data-testid="inspection-assessment" className="overflow-hidden rounded-lg border border-white/10 bg-[#101013]">
      <div className="border-b border-white/10 px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold/80">Inspector&apos;s clipboard</p>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="mt-2 font-display text-2xl uppercase tracking-[0.04em] outline-none"
            >
              {section.title} <span className="text-gold">Inspection</span>
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#F9F8F6]/50" aria-live="polite">
            Question {String(index + 1).padStart(2, "0")} of {String(TOTAL).padStart(2, "0")}
          </p>
        </div>
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin={1} aria-valuemax={TOTAL} aria-valuenow={index + 1} aria-label="Inspection progress">
          <div className="h-full bg-gold transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 border-b border-white/10 sm:grid-cols-5">
        {INSPECTION_SECTIONS.map((item) => {
          const active = item.id === section.id;
          return (
            <div
              key={item.id}
              className={`border-white/10 px-3 py-3 sm:border-r sm:last:border-r-0 ${active ? "bg-gold/[0.08] text-gold" : "text-[#F9F8F6]/45"}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em]">{item.number}</p>
              <p className="mt-1 font-display text-sm uppercase tracking-[0.06em] sm:text-base">{item.title}</p>
            </div>
          );
        })}
      </div>

      <form
        className="px-6 py-8 sm:px-8"
        onSubmit={(event) => {
          event.preventDefault();
          goNext();
        }}
      >
        <fieldset>
          <legend className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold/80">
              {String(question.id).padStart(2, "0")} · {question.title}
            </span>
            <span className="mt-3 block text-base font-light leading-relaxed text-[#F9F8F6] sm:text-lg">{question.prompt}</span>
          </legend>
          <div className="mt-8 space-y-3" role="radiogroup" aria-required="true">
            {question.choices.map((choice) => {
              const checked = selected === choice.id;
              return (
                <label
                  key={choice.id}
                  data-testid={`inspection-choice-${choice.id}`}
                  className={`flex cursor-pointer gap-4 rounded-lg border px-4 py-4 transition-colors duration-300 ${
                    checked ? "border-gold bg-gold/[0.08]" : "border-white/10 bg-night/40 hover:border-gold/40"
                  }`}
                >
                  <input
                    type="radio"
                    className="mt-1 h-4 w-4 shrink-0 accent-[#C9A227]"
                    name={`question-${question.id}`}
                    value={choice.id}
                    checked={checked}
                    onChange={() => selectChoice(choice.id)}
                  />
                  <span className="text-sm leading-relaxed text-[#F9F8F6]/90 sm:text-base">{choice.text}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {error ? (
          <p role="alert" data-testid="inspection-error" className="mt-6 border-l-2 border-gold pl-4 text-sm text-gold">
            {error}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <button
            type="button"
            data-testid="inspection-back-btn"
            disabled={index === 0}
            onClick={() => {
              setError("");
              setIndex((current) => Math.max(0, current - 1));
            }}
            className="rounded-full border border-[#F9F8F6]/30 px-6 py-3 text-sm font-medium text-[#F9F8F6] transition-colors duration-300 hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#F9F8F6]/30 disabled:hover:text-[#F9F8F6]"
          >
            Back
          </button>
          <button
            type="submit"
            data-testid="inspection-next-btn"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight"
          >
            {isLast ? "Complete inspection" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

function ColorTag({ tag }) {
  const textColor = tag.text || "#FFFFFF";
  return (
    <span
      data-testid={`color-tag-${tag.sectionId}`}
      className="inline-flex max-w-full items-center justify-center rounded-md border px-3.5 py-2 text-center text-[11px] font-bold uppercase leading-snug tracking-[0.12em] sm:px-4 sm:py-2.5 sm:text-xs"
      style={{
        backgroundColor: tag.swatch,
        color: textColor,
        borderColor: "rgba(12, 18, 34, 0.55)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.22), 0 1px 0 rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.28)",
      }}
    >
      {tag.label}
    </span>
  );
}

function SummaryAndEmail({ answers, onSent }) {
  const [email, setEmail] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const tags = colorSummary(answers);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSending(true);
    try {
      const payloadAnswers = {};
      Object.keys(answers).forEach((key) => {
        payloadAnswers[String(key)] = answers[key];
      });
      const { data } = await axios.post(`${API}/inspection-reports`, {
        email,
        answers: payloadAnswers,
        marketing_opt_in: marketing,
      });
      if (!data?.ok) {
        setError("The report could not be emailed. Please try again.");
        return;
      }
      onSent(generateInspectionReport(answers));
    } catch (err) {
      const detail = err.response?.data?.detail;
      const message =
        typeof detail === "string"
          ? detail
          : "The report could not be emailed. Your answers are still here — you can try again without starting over.";
      setError(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div data-testid="inspection-summary" className="overflow-hidden rounded-lg border border-white/10 bg-[#101013]">
      <div className="border-b border-white/10 px-6 py-8 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold/80">Inspection complete</p>
        <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.04em] sm:text-4xl">
          Five findings. <span className="text-gold">No grade.</span>
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone2">
          Each area receives one tag from the combination of your answers — not from a score, and not
          as a measure of your worth or faith. The full report is sent only after you request it.
        </p>
      </div>
      <div className="divide-y divide-white/10">
        {tags.map((tag) => (
          <div key={tag.sectionId} className="px-6 py-6 sm:px-8">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-display text-xl uppercase tracking-[0.05em]">
                {INSPECTION_SECTIONS.find((section) => section.id === tag.sectionId).title}
              </h3>
              <ColorTag tag={tag} />
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone2">{tag.finding}</p>
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="border-t border-white/10 px-6 py-8 sm:px-8" data-testid="inspection-email-form">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold/80">Request the full report</p>
        <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.04em]">Send it to your inbox</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone2">
          The complete report includes what you selected, the interpretation, recommendations, next
          steps, and a link to Chapter One of Building the Perfect Home. Requesting the report does
          not sign you up for marketing.
        </p>
        <label className="mt-6 block">
          <span className="sr-only">Email address</span>
          <input
            data-testid="inspection-email-input"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email *"
            className="w-full rounded-md border border-white/15 bg-night px-4 py-3 text-sm text-[#F9F8F6] placeholder:text-stone2/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </label>
        <label className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-stone2">
          <input
            data-testid="inspection-marketing-opt-in"
            type="checkbox"
            checked={marketing}
            onChange={(event) => setMarketing(event.target.checked)}
            className="mt-1 h-4 w-4 accent-[#C9A227]"
          />
          <span>
            Also send occasional updates about the book, new chapters, and workshops. Unchecked by
            default. This is separate from delivering your report.
          </span>
        </label>
        {error ? (
          <p role="alert" data-testid="inspection-email-error" className="mt-4 border-l-2 border-gold pl-4 text-sm text-gold">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          data-testid="inspection-email-submit"
          disabled={sending}
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight disabled:opacity-60"
        >
          {sending ? "Sending the report…" : "Email my full report"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

function InspectionReport({ report, onRestart }) {
  return (
    <div data-testid="inspection-report" className="overflow-hidden rounded-lg border border-white/10 bg-[#101013]">
      <div className="border-b border-white/10 px-6 py-8 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold/80">Inspection report</p>
        <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.04em] sm:text-4xl">
          Findings from the <span className="text-gold">walkthrough</span>
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-stone2">{report.summary}</p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#F9F8F6]/55">{report.limitations}</p>
      </div>

      <div className="space-y-10 px-6 py-10 sm:px-8">
        {report.sections.map((section) => (
          <article key={section.id} data-testid={`report-section-${section.id}`} className="border-t border-white/10 pt-8 first:border-t-0 first:pt-0">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold/80">
                {section.number} · {section.title}
              </p>
              {section.colorLabel ? (
                <ColorTag
                  tag={{
                    sectionId: section.id,
                    label: section.colorLabel,
                    swatch: section.swatch,
                    text: section.textColor,
                  }}
                />
              ) : null}
            </div>
            <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.05em]">{section.title} finding</h3>
            {section.shortFinding ? (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#F9F8F6]/85">{section.shortFinding}</p>
            ) : null}

            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F9F8F6]/40">What you selected</p>
                <ul className="mt-4 list-none space-y-4">
                  {section.yourResponses.map((item) => (
                    <li key={item.id} className="text-sm leading-relaxed text-stone2">
                      <span className="font-medium text-[#F9F8F6]/80">{item.title}.</span> {item.answer}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F9F8F6]/40">Interpretation</p>
                <p className="mt-4 text-sm leading-relaxed text-[#F9F8F6]/85">{section.interpretation}</p>
              </div>
            </div>
          </article>
        ))}

        <section>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">Attention indicators</p>
          <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.05em]">Sealing and punch list</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone2">
            These notes mark places that may need a closer look. They are not automatic evidence of failure, and they do not lower a grade — this inspection does not issue grades.
          </p>
          <ul className="mt-6 space-y-4">
            {report.attentionIndicators.map((flag) => (
              <li key={flag.id} data-testid={`attention-${flag.id}`} className="rounded-lg border border-white/10 bg-night/40 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">{flag.title}</p>
                <p className="mt-3 text-sm text-[#F9F8F6]/70">
                  <span className="font-medium text-[#F9F8F6]">What you selected:</span> {flag.yourAnswer}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-stone2">
                  <span className="font-medium text-[#F9F8F6]">Interpretation:</span> {flag.interpretation}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {report.nextSteps?.length ? (
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">Three next steps</p>
            <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.05em]">Start here</h3>
            <ol className="mt-5 list-decimal space-y-4 pl-5">
              {report.nextSteps.map((step, index) => (
                <li key={`${step.sectionId}-${index}`} className="text-sm leading-relaxed text-stone2">
                  <span className="font-medium text-[#F9F8F6]">{step.title}.</span> {step.text}
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">Recommendations</p>
          <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.05em]">Practical next work</h3>
          <ul className="mt-5 space-y-4">
            {report.recommendations.map((item) => (
              <li key={item} className="border-l-2 border-gold/50 pl-4 text-sm leading-relaxed text-stone2">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">Reflection</p>
          <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.05em]">Questions to take with you</h3>
          <ul className="mt-5 space-y-3">
            {report.reflections.map((item) => (
              <li key={item} className="font-serif text-lg italic leading-snug text-gold/90">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-gold/30 bg-gold/[0.04] p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">Continue the work</p>
          <p className="mt-4 text-sm leading-relaxed text-stone2">{report.invitation}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/books"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight"
            >
              Explore the book <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/consulting"
              className="inline-flex items-center gap-2 rounded-full border border-[#F9F8F6]/30 px-6 py-3 text-sm font-medium text-[#F9F8F6] transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Workshops and consulting
            </Link>
          </div>
        </section>
      </div>

      <div className="border-t border-white/10 px-6 py-6 sm:px-8">
        <button
          type="button"
          data-testid="inspection-restart-btn"
          onClick={onRestart}
          className="text-sm font-medium text-stone2 transition-colors hover:text-gold"
        >
          Walk the inspection again
        </button>
      </div>
    </div>
  );
}

export default function BuildingThePerfectHomeInspection() {
  const [phase, setPhase] = useState("intro");
  const [answers, setAnswers] = useState({});
  const [report, setReport] = useState(null);
  const assessmentRef = useRef(null);

  const beginInspection = () => {
    setPhase("assessment");
    setTimeout(() => {
      assessmentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const completeInspection = (finalAnswers) => {
    const nextReport = generateInspectionReport(finalAnswers);
    if (nextReport.status !== "complete") return;
    setAnswers(finalAnswers);
    setReport(null);
    setPhase("summary");
    setTimeout(() => {
      assessmentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleReportSent = (fullReport) => {
    setReport(fullReport);
    setPhase("report");
    setTimeout(() => {
      assessmentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const restart = () => {
    setAnswers({});
    setReport(null);
    setPhase("assessment");
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
              , this is that same walkthrough applied to a human life. Twenty-five questions. Five
              inspection areas. No score to flatter you. An honest look at what is holding, what is
              cracking, and what will not survive the next storm.
            </p>
            {phase === "intro" ? (
              <button
                type="button"
                data-testid="inspection-begin-btn"
                onClick={beginInspection}
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight"
              >
                Begin the Inspection
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            ) : null}
          </Reveal>
        </div>
      </section>

      {phase === "intro" ? (
        <>
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
                    answers. You will answer one question at a time. The report is written only after
                    all twenty-five are complete.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.15}>
                <div className="rounded-lg border border-white/10 bg-[#101013] p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold/80">Inspection sequence</p>
                  <ol className="mt-6 list-none space-y-5">
                    {AREA_COPY.map((area) => (
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
                {AREA_COPY.map((area, i) => {
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
        </>
      ) : null}

      <section ref={assessmentRef} id="inspection-assessment" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        {phase === "assessment" ? (
          <Assessment answers={answers} setAnswers={setAnswers} onComplete={completeInspection} />
        ) : null}
        {phase === "summary" ? <SummaryAndEmail answers={answers} onSent={handleReportSent} /> : null}
        {phase === "report" && report ? <InspectionReport report={report} onRestart={restart} /> : null}
        {phase === "intro" ? (
          <div className="text-center">
            <button
              type="button"
              onClick={beginInspection}
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight"
            >
              Begin the Inspection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
