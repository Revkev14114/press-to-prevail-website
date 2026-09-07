import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { LogOut, Inbox, RefreshCw } from "lucide-react";
import { Reveal, Eyebrow } from "../components/Motion";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const STATUSES = ["new", "contacted", "confirmed", "archived"];
const STATUS_STYLES = {
  new: "bg-terracotta/10 text-terracotta border-terracotta/30",
  contacted: "bg-gold/10 text-[#9a7d1c] border-gold/40",
  confirmed: "bg-sage/10 text-sage border-sage/40",
  archived: "bg-ink/5 text-muted2 border-ink/15",
};

const inputCls =
  "w-full rounded-md border border-ink/15 bg-ivory px-4 py-3 text-sm text-ink placeholder:text-muted2 transition-colors duration-300 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20";

function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg || JSON.stringify(e)).join(" ");
  return String(detail);
}

export default function Admin() {
  const [user, setUser] = useState(undefined); // undefined = checking
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enquiries, setEnquiries] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const [enq, subs] = await Promise.all([
        axios.get(`${API}/enquiries`, { withCredentials: true }),
        axios.get(`${API}/subscribers`, { withCredentials: true }),
      ]);
      setEnquiries(enq.data);
      setSubscribers(subs.data);
    } catch {
      toast.error("Could not load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/auth/me`, { withCredentials: true })
      .then(({ data }) => {
        setUser(data);
        loadEnquiries();
      })
      .catch(() => setUser(null));
  }, [loadEnquiries]);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post(
        `${API}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(data);
      loadEnquiries();
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail));
    }
  };

  const logout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
    setUser(null);
    setEnquiries([]);
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/enquiries/${id}/status`, { status }, { withCredentials: true });
      setEnquiries((prev) => prev.map((enq) => (enq.id === id ? { ...enq, status } : enq)));
      toast.success(`Marked as ${status}.`);
    } catch {
      toast.error("Status update failed.");
    }
  };

  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-[72px]">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted2">Checking session…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div data-testid="admin-login-page" className="flex min-h-screen items-center justify-center px-6 pt-[72px]">
        <Reveal className="w-full max-w-md">
          <Eyebrow>Admin Access</Eyebrow>
          <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Enquiry inbox.</h1>
          <p className="mt-3 text-sm text-slate2">Sign in to review booking and contact enquiries.</p>
          <form data-testid="admin-login-form" onSubmit={login} className="mt-8 space-y-4 rounded-lg border border-hairline bg-surface p-7">
            <input
              data-testid="admin-email-input"
              type="email"
              required
              placeholder="Admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
            />
            <input
              data-testid="admin-password-input"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
            />
            {error && (
              <p data-testid="admin-login-error" className="text-sm text-terracotta">{error}</p>
            )}
            <button
              type="submit"
              data-testid="admin-login-submit"
              className="w-full rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-terracotta"
            >
              Sign In
            </button>
          </form>
        </Reveal>
      </div>
    );
  }

  return (
    <div data-testid="admin-dashboard" className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-[120px] lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Eyebrow>Signed in as {user.email}</Eyebrow>
          <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Enquiry inbox</h1>
        </div>
        <div className="flex gap-3">
          <button
            data-testid="admin-refresh-btn"
            onClick={loadEnquiries}
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button
            data-testid="admin-logout-btn"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-terracotta"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="mt-10">
        {enquiries.length === 0 ? (
          <div data-testid="admin-empty-state" className="flex flex-col items-center justify-center rounded-lg border border-dashed border-ink/20 py-24 text-center">
            <Inbox className="h-10 w-10 text-muted2" />
            <p className="mt-4 font-serif text-xl">No enquiries yet.</p>
            <p className="mt-2 text-sm text-slate2">Messages from the booking form will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-hairline">
            <table data-testid="admin-enquiries-table" className="w-full min-w-[860px] text-left text-sm">
              <thead className="border-b border-hairline bg-surface font-mono text-[10px] uppercase tracking-[0.2em] text-muted2">
                <tr>
                  <th className="px-5 py-4">Contact</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Event</th>
                  <th className="px-5 py-4">Message</th>
                  <th className="px-5 py-4">Received</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {enquiries.map((enq) => (
                  <tr key={enq.id} data-testid={`admin-enquiry-row-${enq.id}`} className="align-top transition-colors duration-300 hover:bg-surface/60">
                    <td className="px-5 py-4">
                      <p className="font-medium text-ink">{enq.name}</p>
                      <p className="text-xs text-muted2">{enq.email}</p>
                      {enq.organization && <p className="text-xs text-slate2">{enq.organization}</p>}
                    </td>
                    <td className="px-5 py-4 capitalize text-slate2">{enq.enquiry_type}</td>
                    <td className="px-5 py-4 text-xs text-slate2">
                      {enq.event_date && <p>{enq.event_date}</p>}
                      {enq.event_location && <p>{enq.event_location}</p>}
                      {enq.audience_size && <p>{enq.audience_size} guests</p>}
                      {enq.topic && <p className="mt-1 italic">{enq.topic}</p>}
                      {enq.budget && <p>{enq.budget}</p>}
                    </td>
                    <td className="max-w-[280px] px-5 py-4 text-slate2">
                      <p className="line-clamp-3">{enq.message}</p>
                    </td>
                    <td className="px-5 py-4 text-xs text-muted2">
                      {new Date(enq.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        data-testid={`admin-status-select-${enq.id}`}
                        value={enq.status}
                        onChange={(e) => updateStatus(enq.id, e.target.value)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize ${STATUS_STYLES[enq.status] || STATUS_STYLES.new}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-14">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-serif text-2xl font-medium tracking-tight">Chapter readers</h2>
          <span data-testid="admin-subscriber-count" className="rounded-full border border-hairline bg-surface px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-slate2">
            {subscribers.length} on the list
          </span>
        </div>
        <p className="mt-2 text-sm text-slate2">Readers who unlocked the free chapter preview.</p>
        <div className="mt-6">
          {subscribers.length === 0 ? (
            <p data-testid="admin-subscribers-empty" className="rounded-lg border border-dashed border-ink/20 py-10 text-center text-sm text-slate2">
              No readers yet — they'll appear here when someone unlocks the chapter.
            </p>
          ) : (
            <div data-testid="admin-subscribers-table" className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
              {subscribers.map((sub) => (
                <div key={sub.id} data-testid={`admin-subscriber-${sub.id}`} className="bg-ivory px-5 py-4">
                  <p className="text-sm font-medium text-ink">{sub.name || "Reader"}</p>
                  <p className="text-xs text-slate2">{sub.email}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted2">
                    {new Date(sub.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} · {sub.source}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
