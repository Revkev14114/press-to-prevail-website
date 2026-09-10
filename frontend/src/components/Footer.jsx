import { Link } from "react-router-dom";
import { Mail, Globe, Youtube, Linkedin, ArrowUpRight } from "lucide-react";
import { SITE } from "../content/site";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="border-t border-white/10 bg-night text-[#F9F8F6]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={SITE.logoUrl} alt={`${SITE.name} logo`} className="h-12 w-12 rounded-md object-cover ring-1 ring-white/15" />
              <div className="leading-tight">
                <p className="font-sans text-xl font-semibold tracking-wide">{SITE.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold/80">{SITE.tagline}</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#F9F8F6]/60">
              Books, keynotes and a movement — building faith, building purpose, and building lives
              that last. Coaching cohorts are coming soon.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F9F8F6]/40">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link data-testid="footer-home-link" to="/" className="text-[#F9F8F6]/70 transition-colors duration-300 hover:text-gold">Home</Link></li>
              <li><Link data-testid="footer-speaking-link" to="/speaking" className="text-[#F9F8F6]/70 transition-colors duration-300 hover:text-gold">Speaking</Link></li>
              <li><Link data-testid="footer-books-link" to="/books" className="text-[#F9F8F6]/70 transition-colors duration-300 hover:text-gold">The Book</Link></li>
              <li><Link data-testid="footer-about-link" to="/about" className="text-[#F9F8F6]/70 transition-colors duration-300 hover:text-gold">About</Link></li>
              <li><Link data-testid="footer-consulting-link" to="/consulting" className="text-[#F9F8F6]/70 transition-colors duration-300 hover:text-gold">Consulting</Link></li>
              <li><Link data-testid="footer-contact-link" to="/contact" className="text-[#F9F8F6]/70 transition-colors duration-300 hover:text-gold">Contact</Link></li>
              <li><Link data-testid="footer-admin-link" to="/admin" className="text-[#F9F8F6]/40 transition-colors duration-300 hover:text-gold">Admin</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F9F8F6]/40">Connect</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a data-testid="footer-email-link" href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 text-[#F9F8F6]/70 transition-colors duration-300 hover:text-gold">
                  <Mail className="h-4 w-4" /> {SITE.email}
                </a>
              </li>
              <li>
                <a data-testid="footer-youtube-link" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#F9F8F6]/70 transition-colors duration-300 hover:text-gold">
                  <Youtube className="h-4 w-4" /> YouTube <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a data-testid="footer-linkedin-link" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#F9F8F6]/70 transition-colors duration-300 hover:text-gold">
                  <Linkedin className="h-4 w-4" /> LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2 text-[#F9F8F6]/40"><Globe className="h-4 w-4" /> Booking worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[#F9F8F6]/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span>Building Faith · Building Purpose · Building Lives That Last</span>
        </div>
      </div>
    </footer>
  );
}
