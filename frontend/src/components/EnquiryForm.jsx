import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ENQUIRY_TYPES } from "../content/site";
import { Reveal, Eyebrow } from "./Motion";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = {
  name: "",
  email: "",
  organization: "",
  enquiry_type: "keynote",
  event_date: "",
  event_location: "",
  message: "",
};

const inputCls =
  "w-full rounded-md border border-ink/15 bg-ivory px-4 py-3 text-sm text-ink placeholder:text-muted2 transition-colors duration-300 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";

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
      toast.success("Message received — Kevin will personally reply within two business days.");
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
          <Eyebrow light>Start the Conversation</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Bring this voice to <span className="italic text-gold">your room.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#F9F8F6]/65">
            Whether you're planning a keynote, workshop, interview, or simply want to start a
            conversation, I'd love to hear from you. Tell me a little about your event,
            organization, or idea, and I'll personally get back to you within two business days.
          </p>
          <div className="mt-10 space-y-4 font-mono text-xs uppercase tracking-[0.2em] text-[#F9F8F6]/50">
            <p>Response — within 2 business days</p>
            <p>Formats — keynote · workshop · panel · podcast</p>
            <p>Travel — available nationwide</p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          {sent ? (
            <div data-testid="enquiry-success" className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-lg border border-[#F9F8F6]/15 bg-[#F9F8F6]/5 p-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-gold" />
              <p className="mt-5 font-serif text-2xl font-medium">Thank you — message received.</p>
              <p className="mt-3 max-w-sm text-sm text-[#F9F8F6]/60">
                Kevin will personally get back to you within two business days. Want to send another?
              </p>
              <button
                data-testid="enquiry-send-another-btn"
                onClick={() => setSent(false)}
                className="mt-7 rounded-full border border-[#F9F8F6]/30 px-6 py-2.5 text-sm transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form data-testid="enquiry-form" onSubmit={submit} className="rounded-lg border border-[#F9F8F6]/15 bg-[#F9F8F6]/5 p-6 backdrop-blur-sm sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input data-testid="enquiry-name-input" required placeholder="Full name *" value={form.name} onChange={set("name")} className={inputCls} />
                <input data-testid="enquiry-email-input" required type="email" placeholder="Email *" value={form.email} onChange={set("email")} className={inputCls} />
                <input data-testid="enquiry-organization-input" placeholder="Organization" value={form.organization} onChange={set("organization")} className={inputCls} />
                <select data-testid="enquiry-type-select" value={form.enquiry_type} onChange={set("enquiry_type")} className={inputCls} aria-label="What are you interested in?">
                  {ENQUIRY_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                {!compact && (
                  <>
                    <input data-testid="enquiry-date-input" type="date" value={form.event_date} onChange={set("event_date")} className={inputCls} aria-label="Event date" />
                    <input data-testid="enquiry-location-input" placeholder="Location" value={form.event_location} onChange={set("event_location")} className={inputCls} />
                  </>
                )}
                <textarea
                  data-testid="enquiry-message-input"
                  required
                  rows={4}
                  placeholder="Tell me a little about what you're planning. *"
                  value={form.message}
                  onChange={set("message")}
                  className={`${inputCls} resize-none sm:col-span-2`}
                />
              </div>
              <button
                type="submit"
                data-testid="enquiry-form-submit"
                disabled={sending}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-night transition-colors duration-300 hover:bg-goldlight disabled:opacity-60 sm:w-auto"
              >
                {sending ? "Sending…" : "Start the Conversation"}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
