import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { SITE } from "../content/site";

const NAV = [
  { to: "/", label: "Home", testId: "nav-home-link" },
  { to: "/speaking", label: "Speaking", testId: "nav-speaking-link" },
  { to: "/books", label: "The Book", testId: "nav-book-link" },
  { to: "/about", label: "About", testId: "nav-about-link" },
  { to: "/consulting", label: "Consulting", testId: "nav-consulting-link" },
  { to: "/contact", label: "Contact", testId: "nav-contact-link" },
];

export const scrollToEnquire = (navigate, pathname) => {
  const go = () => document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (pathname !== "/") {
    navigate("/");
    setTimeout(go, 500);
  } else {
    go();
  }
};

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header data-testid="site-header" className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-night/85 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" data-testid="nav-logo-link" className="group flex items-center gap-3">
          <img
            src={SITE.logoUrl}
            alt={`${SITE.name} logo`}
            className="h-11 w-11 rounded-md object-cover ring-1 ring-white/15 transition-shadow duration-300 group-hover:ring-gold/60"
          />
          <span className="leading-tight">
            <span className="block font-sans text-lg font-semibold tracking-wide text-[#F9F8F6]">{SITE.name}</span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-gold/80">{SITE.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={item.testId}
              className={({ isActive }) =>
                `relative font-sans text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive ? "text-gold" : "text-stone2 hover:text-[#F9F8F6]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            data-testid="nav-lets-connect-btn"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-night transition-colors duration-300 hover:bg-goldlight"
          >
            Let's Connect
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </nav>

        <button
          data-testid="nav-mobile-menu-btn"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center border border-white/15 text-[#F9F8F6] lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            data-testid="nav-mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-night lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-3 font-display text-2xl tracking-[0.08em] text-[#F9F8F6]"
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                data-testid="nav-mobile-book-btn"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-night"
              >
                Let's Connect <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
