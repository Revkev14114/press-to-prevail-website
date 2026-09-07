import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send, CheckCircle2 } from "lucide-react";
import { ENQUIRY_TYPES, KEYNOTES } from "../content/site";
import { Reveal, Eyebrow } from "./Motion";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = {
  name: "",
  email: "",
  organization: "",
  enquiry_type: "speaking",
  event_date: "",
  event_location: "",
  audience_size: "",
  topic: "",
  budget: "",
  message: "",
};

const inputCls =
  "w-full rounded-md border border-ink/15 bg-ivory px-4 py-3 text-sm text-ink placeholder:text-muted2 transition-colors duration-300 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20";

function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg || JSON.stringify(e)).join(" ");
  return String(detail);
}

export default function EnquiryForm({ compact = false }) {
  const [form, setForm] = useState(initial);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const payload = { ...form };
      Object.keys(payload).forEach((k) => payload[k] === "" && delete payload[k]);
      await axios.post(`${API}/enquiries`, payload);
      setSent(true);
      setForm(initial);
      toast.success("Enquiry received — expect a reply within two business days.");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="enquire" data-testid="enquiry-section" className="relative overflow-hidden bg-coal py-24 text-[#F9F8F6] lg:py-32">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-[#F9F8F6]/10" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full border border-[#F9F8F6]/10" />

      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:px-10">
        <Reveal>
          <Eyebrow light>Booking Enquiry</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Bring this voice to <span className="italic text-terracotta">your room.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#F9F8F6]/65">
            Keynotes, workshops, book orders, interviews — or early interest in the coaching practice.
            Tell me about your event and I will reply personally within two business days.
          </p>
          <div className="mt-10 space-y-4 font-mono text-xs uppercase tracking-[0.2em] text-[#F9F8F6]/50">
            <p>Response — within 48 hours</p>
            <p>Formats — keynote · workshop · panel · podcast</p>
            <p>Travel — worldwide, based in Chicago</p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          {sent ? (
            <div data-testid="enquiry-success" className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-lg border border-[#F9F8F6]/15 bg-[#F9F8F6]/5 p-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-terracotta" />
              <p className="mt-5 font-serif text-2xl font-medium">Thank you — enquiry received.</p>
              <p className="mt-3 max-w-sm text-sm text-[#F9F8F6]/60">
                Your message has been saved and you'll hear back shortly. Want to send another?
              </p>
              <button
                data-testid="enquiry-send-another-btn"
                onClick={() => setSent(false)}
                className="mt-7 rounded-full border border-[#F9F8F6]/30 px-6 py-2.5 text-sm transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form data-testid="enquiry-form" onSubmit={submit} className="rounded-lg border border-[#F9F8F6]/15 bg-[#F9F8F6]/5 p-6 backdrop-blur-sm sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input data-testid="enquiry-name-input" required placeholder="Full name *" value={form.name} onChange={set("name")} className={inputCls} />
                <input data-testid="enquiry-email-input" required type="email" placeholder="Email *" value={form.email} onChange={set("email")} className={inputCls} />
                <input data-testid="enquiry-organization-input" placeholder="Organization" value={form.organization} onChange={set("organization")} className={inputCls} />
                <select data-testid="enquiry-type-select" value={form.enquiry_type} onChange={set("enquiry_type")} className={inputCls}>
                  {ENQUIRY_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                {!compact && (
                  <>
                    <input data-testid="enquiry-date-input" type="date" value={form.event_date} onChange={set("event_date")} className={inputCls} aria-label="Event date" />
                    <input data-testid="enquiry-location-input" placeholder="Event location" value={form.event_location} onChange={set("event_location")} className={inputCls} />
                    <select data-testid="enquiry-audience-select" value={form.audience_size} onChange={set("audience_size")} className={inputCls}>
                      <option value="">Audience size</option>
                      <option>Under 100</option>
                      <option>100 – 500</option>
                      <option>500 – 2,000</option>
                      <option>2,000+</option>
                    </select>
                    <select data-testid="enquiry-topic-select" value={form.topic} onChange={set("topic")} className={inputCls}>
                      <option value="">Preferred topic</option>
                      {KEYNOTES.map((k) => (
                        <option key={k.title}>{k.title}</option>
                      ))}
                      <option>Custom / other</option>
                    </select>
                    <select data-testid="enquiry-budget-select" value={form.budget} onChange={set("budget")} className={`${inputCls} sm:col-span-2`}>
                      <option value="">Budget range (optional)</option>
                      <option>Under $5,000</option>
                      <option>$5,000 – $10,000</option>
                      <option>$10,000 – $25,000</option>
                      <option>$25,000+</option>
                    </select>
                  </>
                )}
                <textarea
                  data-testid="enquiry-message-input"
                  required
                  rows={4}
                  placeholder="Tell me about your event or project *"
                  value={form.message}
                  onChange={set("message")}
                  className={`${inputCls} resize-none sm:col-span-2`}
                />
              </div>
              <button
                type="submit"
                data-testid="enquiry-form-submit"
                disabled={sending}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3.5 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-ivory hover:text-ink disabled:opacity-60 sm:w-auto"
              >
                {sending ? "Sending…" : "Send Enquiry"} <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
