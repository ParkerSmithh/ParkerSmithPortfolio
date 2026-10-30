import { AnimatePresence, motion } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { contact, nav, resume } from "../data/portfolio";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        // The first section (in page order) crossing the band near the top of the viewport wins.
        const current = ids.find((id) => visible.get(id));
        setActive(current ?? "");
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const ids = nav.map((n) => n.id);

export function Navigation() {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Section to scroll to once the mobile menu has collapsed — scrolling while it unmounts gets cancelled.
  const pendingTarget = useRef<string | null>(null);

  function goFromMenu(e: MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    pendingTarget.current = id;
    setOpen(false);
  }

  function scrollToPending() {
    const id = pendingTarget.current;
    pendingTarget.current = null;
    const el = id && document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-paper transition-shadow duration-200 ${
        scrolled || open ? "shadow-nav" : ""
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-button focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 rounded-button font-semibold tracking-tight">
          <span aria-hidden className="relative flex h-8 w-8 items-center justify-center rounded-[9px] bg-ink text-sm font-bold text-white">
            P
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-marigold" />
          </span>
          <span>{contact.name}</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-button px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-200 ${
                    isActive ? "text-ink" : "text-black/55 hover:text-ink"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-blue"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a href={resume.href} download={resume.downloadName} className="btn btn-ghost hidden sm:inline-flex">
            <Download className="h-4 w-4" aria-hidden />
            Resume
          </a>
          <button
            type="button"
            className="btn btn-text h-11 w-11 px-0 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence onExitComplete={scrollToPending}>
        {open && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden border-t border-hairline bg-paper lg:hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="container-page grid gap-1 py-3">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => goFromMenu(e, item.id)}
                    aria-current={active === item.id ? "true" : undefined}
                    className={`flex min-h-12 items-center justify-between rounded-button px-3 text-lg font-medium ${
                      active === item.id ? "bg-white text-ink" : "text-black/70"
                    }`}
                  >
                    {item.label}
                    {active === item.id && <span className="h-2 w-2 rounded-full bg-blue" aria-hidden />}
                  </a>
                </li>
              ))}
              <li className="pt-2 sm:hidden">
                <a href={resume.href} download={resume.downloadName} className="btn btn-ghost w-full">
                  <Download className="h-4 w-4" aria-hidden />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
