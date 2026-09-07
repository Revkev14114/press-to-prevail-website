import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { SITE } from "../content/site";

const NAV = [
  { to: "/", label: "Home", testId: "nav-home-link" },
  { to: "/about", label: "About", testId: "nav-about-link" },
  { to: "/books", label: "Books & Writing", testId: "nav-books-link" },
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
  const navigate = useNavigate();
  const location = useLocation();

  const onBook = () => {
    setOpen(false);
    scrollToEnquire(navigate, location.pathname);
  };

  return (
    <header data-testid="site-header" className="fixed inset-x-0 top-0 z-50 border-b border-hairline/80 bg-ivory/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" data-testid="nav-logo-link" className="group flex items-center gap-3">
          {SITE.logoUrl ? (
            <img src={SITE.logoUrl} alt={SITE.name} className="h-10 w-auto" />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center border border-ink font-serif text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:bg-ink group-hover:text-ivory">
              {SITE.monogram}
            </span>
          )}
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold tracking-tight">{SITE.name}</span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-muted2">{SITE.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={item.testId}
              className={({ isActive }) =>
                `relative font-sans text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive ? "text-terracotta" : "text-slate2 hover:text-ink"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={onBook}
            data-testid="nav-book-keynote-btn"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-terracotta"
          >
            Book a Keynote
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </nav>

        <button
          data-testid="nav-mobile-menu-btn"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center border border-hairline md:hidden"
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
            className="overflow-hidden border-t border-hairline bg-ivory md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-3 font-serif text-2xl font-medium tracking-tight"
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={onBook}
                data-testid="nav-mobile-book-btn"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-ivory"
              >
                Book a Keynote <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
