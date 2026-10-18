import { useEffect, useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";

const links = [
  ["Home", "#top"],
  ["Features", "#features"],
  ["Industry", "#industry"],
  ["How it Works", "#how"],
  ["Pricing", "#pricing"],
] as const;

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-3 z-50 px-4 pt-3 md:top-4">
      <div
        data-scrolled={scrolled || open}
        className="nav-glass mx-auto max-w-6xl rounded-3xl px-4 py-2.5 md:rounded-full md:px-6"
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2 text-xl font-extrabold" aria-label="Sawabot home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-primary-foreground transition-transform duration-300 hover:rotate-[-8deg]">
              <MessageCircle className="h-4 w-4" />
            </span>
            Sawabot
          </a>
          <nav className="hidden gap-8 text-sm font-medium text-foreground/75 md:flex" aria-label="Main">
            {links.map(([l, h]) => (
              <a key={l} href={h} className="link-underline">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#start" className="btn-base hidden items-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-flex">
              Get started
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-brand-soft md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div className={`grid transition-all duration-500 md:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <nav className="overflow-hidden" aria-label="Mobile">
            <div className="flex flex-col gap-1 pb-2 pt-3">
              {links.map(([l, h]) => (
                <a key={l} href={h} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-brand-soft hover:text-brand">
                  {l}
                </a>
              ))}
              <a href="#start" onClick={() => setOpen(false)} className="btn-base mt-2 inline-flex justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground">
                Get started
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
