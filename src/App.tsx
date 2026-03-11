import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

/* ─────────────────────────────────────────
   IMAGES
───────────────────────────────────────── */
const IMG = {
  logo:      "/PrimeEdge_AI_Logo-removebg-preview.png",
  hero:      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1800&q=85&auto=format&fit=crop",
  ai:        "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80&auto=format&fit=crop",
  training:  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80&auto=format&fit=crop",
  web:       "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80&auto=format&fit=crop",
  analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
  about:     "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop",
  divider:   "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=80&auto=format&fit=crop",
};

/* ─────────────────────────────────────────
   FONT INJECTION  (Cormorant + Inter)
───────────────────────────────────────── */
if (!document.head.querySelector("[data-pe-fonts]")) {
  const l = document.createElement("link");
  l.setAttribute("data-pe-fonts", "true");
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap";
  document.head.appendChild(l);
}

/* Custom CSS injected once */
if (!document.head.querySelector("[data-pe-css]")) {
  const style = document.createElement("style");
  style.setAttribute("data-pe-css", "true");
  style.textContent = `
    :root { scroll-behavior: smooth; color-scheme: dark; }
    html, body, #root { background-color: #080810 !important; color: #F0F0F8; }
    body  { overflow-x: hidden; margin: 0; padding: 0; }
    .font-serif   { font-family: 'Cormorant Garamond', Georgia, serif !important; }
    .font-sans-pe { font-family: 'Inter', system-ui, sans-serif !important; }
    .hero-grad-l  { background: linear-gradient(105deg, rgba(8,8,16,.97) 38%, rgba(8,8,16,.5) 65%, transparent 100%); }
    .hero-grad-b  { background: linear-gradient(to top, rgba(8,8,16,1) 0%, transparent 100%); }
    .hero-glow    { background: radial-gradient(ellipse, rgba(107,140,255,.18) 0%, transparent 65%); }
    .img-dark     { filter: saturate(.4) brightness(.22); }
    .img-service  { filter: brightness(.65) saturate(.5); transition: filter .4s, transform .5s; }
    .service-card:hover .img-service { filter: brightness(.85) saturate(.75); transform: scale(1.04); }
    .img-about    { filter: brightness(.65) saturate(.5); }
    .img-divider  { filter: brightness(.2) saturate(.3); }
    .map-dark     { filter: invert(.9) hue-rotate(180deg) saturate(.25) brightness(.65); }
    .nav-link-hover:hover { color: #F0F0F8 !important; }
    .footer-link:hover    { color: #F0F0F8 !important; }
    .process-step:hover   { background: #0e0e1a !important; }
    .wa-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(37,211,102,.5); }
    .btn-accent:hover   { background: #4a6ef0 !important; box-shadow: 0 8px 32px rgba(107,140,255,.35); }
    .btn-outline:hover  { border-color: rgba(255,255,255,.4) !important; color: #F0F0F8 !important; }
    .nav-cta:hover { background: #6B8CFF !important; color: #fff !important; }
    /* Topbar slide-up when scrolled */
    .topbar-hidden { transform: translateY(-100%); }
    .topbar-transition { transition: transform 0.3s ease; }
  `;
  document.head.appendChild(style);
}

/* ─────────────────────────────────────────
   SCROLL-REVEAL HOOK
───────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis] as const;
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   KICKER  (gold line + label)
───────────────────────────────────────── */
function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="inline-block w-6 h-px bg-[#C9A84C]" />
      <span className="text-[#C9A84C] text-[0.64rem] font-medium tracking-[.2em] uppercase font-sans-pe">
        {children}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   TOPBAR
   — visible at top of page, scrolls away
───────────────────────────────────────── */
const TOPBAR_HEIGHT = 36; // px — keep in sync with the topbar's rendered height

function Topbar({ scrolled }: { scrolled: boolean }) {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[300] topbar-transition ${scrolled ? "topbar-hidden" : ""}`}
      style={{ height: TOPBAR_HEIGHT }}
    >
      <div className="bg-[#05050d] border-b border-white/[.06] px-12 h-full flex flex-wrap justify-between items-center gap-2
                      text-[.72rem] tracking-[.06em] text-white/30 font-sans-pe">
        <span className="text-[#C9A84C] font-medium tracking-[.1em] font-serif text-sm">
          Prime Edge AI
        </span>
        <span>info@primeedgeai.com &nbsp;·&nbsp; +254 706 384 510 &nbsp;·&nbsp; Nairobi, Kenya</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NAVBAR
   — sits below topbar initially, sticks to
     the very top once topbar scrolls away
───────────────────────────────────────── */
function Navbar({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const [wide, setWide] = useState(window.innerWidth >= 900);

  useEffect(() => {
    const onResize = () => setWide(window.innerWidth >= 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "About",    href: "#about" },
    { label: "Process",  href: "#process" },
    { label: "Contact",  href: "#contact" },
  ];

  // When not yet scrolled: navbar sits just below the topbar
  // When scrolled: topbar is gone, navbar is pinned at top:0
  const navTop = scrolled ? 0 : TOPBAR_HEIGHT;

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-[200] h-[72px] px-12 flex items-center justify-between"
        style={{
          top: navTop,
          transition: "top 0.3s ease, background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
          ...(scrolled
            ? {
                background: "rgba(8,8,16,.96)",
                backdropFilter: "blur(24px)",
                borderBottom: "1px solid rgba(255,255,255,.07)",
                boxShadow: "0 4px 40px rgba(0,0,0,.5)",
              }
            : {
                background: "transparent",
              }),
        }}
      >
        {/* ── Logo ── */}
        <a href="#" className="flex items-center h-full py-3">
          <img
            src={IMG.logo}
            alt="Prime Edge AI"
            className="h-20 w-auto object-contain"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.style.display = "none";
              const fallback = img.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "block";
            }}
          />
          <span
            className="font-serif text-[1.3rem] font-light text-[#F0F0F8] tracking-[.04em]"
            style={{ display: "none" }}
          >
            Prime <em className="italic text-[#6B8CFF]">Edge</em> AI
          </span>
        </a>

        {/* ── Desktop links ── */}
        {wide && (
          <ul className="flex gap-9 list-none m-0 p-0 items-center">
            {links.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="nav-link-hover text-white/55 text-[.78rem] font-sans-pe font-normal tracking-[.1em] uppercase no-underline transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* ── Desktop CTA ── */}
        {wide && (
          <a
            href="#contact"
            className="nav-cta text-[#6B8CFF] border border-[#6B8CFF] px-6 py-[9px] text-[.74rem] font-medium font-sans-pe tracking-[.1em] uppercase no-underline transition-all duration-200"
            style={{ borderRadius: "4px" }}
          >
            Get Started
          </a>
        )}

        {/* ── Hamburger ── */}
        {!wide && (
          <button
            onClick={() => setOpen(!open)}
            className="bg-transparent border-none cursor-pointer p-1"
            aria-label="Toggle menu"
          >
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
              {open
                ? <path d="M2 2L20 16M20 2L2 16" stroke="#F0F0F8" strokeWidth="1.5" strokeLinecap="round" />
                : <>
                    <line x1="2" y1="2"  x2="20" y2="2"  stroke="#F0F0F8" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="2" y1="9"  x2="20" y2="9"  stroke="#F0F0F8" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="2" y1="16" x2="20" y2="16" stroke="#F0F0F8" strokeWidth="1.5" strokeLinecap="round" />
                  </>
              }
            </svg>
          </button>
        )}
      </nav>

      {/* ── Mobile drawer ── */}
      {open && !wide && (
        <div
          className="fixed left-0 right-0 z-[199] bg-[#0e0e1a] border-b border-white/[.07] px-8 py-7 flex flex-col gap-1"
          style={{
            top: scrolled ? 72 : TOPBAR_HEIGHT + 72,
            transition: "top 0.3s ease",
            boxShadow: "0 24px 60px rgba(0,0,0,.6)",
          }}
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/60 text-[.84rem] font-sans-pe font-normal tracking-[.1em] uppercase
                         no-underline py-[13px] border-b border-white/[.07]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="nav-cta text-center mt-4 py-3 text-[.78rem] tracking-[.1em] uppercase font-medium font-sans-pe no-underline text-[#6B8CFF] border border-[#6B8CFF]"
            style={{ borderRadius: "4px" }}
          >
            Get Started
          </a>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero() {
  const stats = [
    { num: "500+", label: "Clients Served",     last: false },
    { num: "10+",  label: "Years Experience",   last: false },
    { num: "20+",  label: "AI Solutions Built", last: false },
    { num: "100%", label: "Satisfaction Rate",  last: true  },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#080810]">
      {/* Background image */}
      <img src={IMG.hero} alt="" aria-hidden className="img-dark absolute inset-0 w-full h-full object-cover object-[center_30%] z-0" />

      {/* Overlays */}
      <div className="hero-grad-l absolute inset-0 z-[1]" />
      <div className="hero-grad-b absolute bottom-0 left-0 right-0 h-[40%] z-[1]" />
      <div className="hero-glow absolute top-[-10%] right-[-5%] w-1/2 h-[70%] z-[1] pointer-events-none" />

      {/* Content — padded top to clear topbar + navbar */}
      <div className="relative z-[2] w-full max-w-[1160px] mx-auto px-20"
           style={{ paddingTop: `calc(${TOPBAR_HEIGHT}px + 72px + 48px)` }}>

        {/* Kicker */}
        <div className="flex items-center gap-4 mb-9">
          <span className="inline-block w-9 h-px bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-[.64rem] font-medium tracking-[.22em] uppercase font-sans-pe">
            AI-Powered Business Transformation
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif font-light text-[#F0F0F8] leading-[1.02] tracking-[-0.01em] mb-2"
            style={{ fontSize: "clamp(3.2rem, 7.5vw, 6.4rem)", maxWidth: 860 }}>
          Intelligence<br />
          That Drives<br />
          <em className="italic text-[#6B8CFF]">Real Results.</em>
        </h1>

        {/* Gold rule */}
        <div className="w-14 h-px bg-[#C9A84C] opacity-60 my-7" />

        {/* Subtitle */}
        <p className="font-sans-pe font-light text-white/55 leading-[1.82] mb-[52px]"
           style={{ fontSize: "1.02rem", maxWidth: 480 }}>
          Prime Edge AI equips African businesses with cutting-edge AI, automation, and data
          solutions — engineered to cut costs, accelerate growth, and outpace the competition.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-24">
          <a
            href="#contact"
            className="btn-accent bg-[#6B8CFF] text-white px-9 py-[15px] text-[.78rem] font-medium font-sans-pe
                       tracking-[.1em] uppercase no-underline transition-all duration-200"
            style={{ borderRadius: "4px" }}
          >
            Book a Free Consultation
          </a>
          <a
            href="#services"
            className="btn-outline text-white/55 border border-white/20 px-9 py-[14px] text-[.78rem] font-normal font-sans-pe
                       tracking-[.1em] uppercase no-underline transition-all duration-200"
            style={{ borderRadius: "4px" }}
          >
            Explore Services
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap border-t border-white/[.07] pt-10 pb-16">
          {stats.map(s => (
            <div
              key={s.num}
              className={`pb-2 ${s.last ? "" : "pr-12 mr-12 border-r border-white/[.07]"}`}
            >
              <span className="font-serif font-light text-[#F0F0F8] block leading-none mb-1.5"
                    style={{ fontSize: "2.6rem" }}>
                {s.num}
              </span>
              <span className="font-sans-pe font-normal text-white/28 tracking-[.14em] uppercase"
                    style={{ fontSize: ".66rem" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SERVICES
───────────────────────────────────────── */
const SERVICES = [
  { tag: "Artificial Intelligence", title: "AI & Automation",  desc: "Custom AI agents and workflow automation that eliminate repetitive tasks, reduce costs, and operate 24/7 without oversight.", img: IMG.ai },
  { tag: "Training & Upskilling",   title: "AI Training",      desc: "Practical workshops that transform your team from passive observers to confident AI operators — at every skill level.", img: IMG.training },
  { tag: "Digital Presence",        title: "Website Creation", desc: "Performance-first, visually striking web experiences built for conversion, credibility, and long-term brand authority.", img: IMG.web },
  { tag: "Business Intelligence",   title: "Data Analytics",   desc: "Transform fragmented data into unified intelligence — dashboards, forecasting models, and reports that drive decisions.", img: IMG.analytics },
];

function Services() {
  return (
    <section id="services" className="bg-[#080810] px-12 py-28">
      <div className="max-w-[1160px] mx-auto">
        <Reveal>
          <div className="flex flex-wrap justify-between items-end gap-6 mb-16">
            <div>
              <Kicker>What We Offer</Kicker>
              <h2 className="font-serif font-light text-[#F0F0F8] leading-[1.15] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
                Four disciplines.<br />
                <em className="italic">One integrated edge.</em>
              </h2>
            </div>
            <p className="font-sans-pe font-light text-white/55 leading-[1.85] text-[.93rem]" style={{ maxWidth: 340 }}>
              Built for African businesses ready to move faster, operate smarter, and compete at a global level.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[.07] border border-white/[.07]">
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 0.07}>
              <div className="service-card bg-[#0e0e1a] overflow-hidden cursor-pointer transition-colors duration-300 hover:bg-[#13131f] h-full flex flex-col">
                <div className="overflow-hidden flex-shrink-0">
                  <img src={svc.img} alt={svc.title} className="img-service w-full h-[200px] object-cover" loading="lazy" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <span className="block text-[#C9A84C] text-[.6rem] font-medium font-sans-pe tracking-[.2em] uppercase mb-2.5">
                    {svc.tag}
                  </span>
                  <div className="font-serif font-normal text-[#F0F0F8] text-[1.4rem] leading-[1.2] mb-3">
                    {svc.title}
                  </div>
                  <p className="font-sans-pe font-light text-white/50 text-[.83rem] leading-[1.78] flex-1">
                    {svc.desc}
                  </p>
                  <span className="mt-5 text-[#6B8CFF] text-[.68rem] font-medium font-sans-pe tracking-[.14em] uppercase">
                    Learn more →
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   ABOUT
───────────────────────────────────────── */
function About() {
  const points = [
    { n: "01", title: "Goals before technology",          body: "Every engagement starts with your operations — we build what you actually need, not what sounds impressive." },
    { n: "02", title: "Deliver, then transfer knowledge", body: "We train your team on every solution — so results outlast our involvement and adoption is guaranteed." },
    { n: "03", title: "Long-term partnership",            body: "We monitor, optimise, and scale alongside you. We measure success by your growth, not just project delivery." },
  ];

  return (
    <section id="about" className="bg-[#0e0e1a] px-12 py-28">
      <div className="max-w-[1160px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Image */}
          <Reveal>
            <div className="relative overflow-hidden">
              <img src={IMG.about} alt="Prime Edge AI team" className="img-about w-full object-cover block"
                   style={{ height: 560 }} loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 h-[35%]"
                   style={{ background: "linear-gradient(to top, #0e0e1a 0%, transparent 100%)" }} />
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={0.1}>
            <Kicker>Who We Are</Kicker>
            <h2 className="font-serif font-light text-[#F0F0F8] leading-[1.15] tracking-[-0.01em] mb-4"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
              Africa's premier<br />
              <em className="italic">AI transformation partner</em>
            </h2>
            <p className="font-sans-pe font-light text-white/55 text-[.93rem] leading-[1.85]" style={{ maxWidth: 480 }}>
              Prime Edge AI is a Nairobi-based technology firm helping organisations across Africa adopt AI,
              automate operations, and build digital infrastructure that creates lasting competitive advantage.
            </p>

            <div className="flex flex-col mt-11">
              {points.map(p => (
                <div key={p.n} className="flex gap-5 items-start py-7 border-b border-white/[.07] first:pt-0">
                  <span className="font-serif font-light italic text-[#C9A84C] text-[1.2rem] leading-[1.4] min-w-[28px]">
                    {p.n}
                  </span>
                  <div>
                    <span className="block font-sans-pe font-medium text-[#F0F0F8] text-[.86rem] tracking-[.02em] mb-1.5">
                      {p.title}
                    </span>
                    <span className="font-sans-pe font-light text-white/50 text-[.83rem] leading-[1.78]">
                      {p.body}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-11">
              <a href="#contact"
                 className="btn-accent bg-[#6B8CFF] text-white px-9 py-[15px] text-[.78rem] font-medium font-sans-pe
                            tracking-[.1em] uppercase no-underline transition-all duration-200 inline-block"
                 style={{ borderRadius: "4px" }}>
                Work With Us
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PROCESS
───────────────────────────────────────── */
const STEPS = [
  { n: "01", title: "Discovery", desc: "Free consultation to understand your goals and where AI creates the most leverage." },
  { n: "02", title: "Strategy",  desc: "Clear roadmap, fixed pricing, delivery timeline — no ambiguity, no hidden scope." },
  { n: "03", title: "Build",     desc: "Agile delivery with weekly check-ins so you see progress continuously." },
  { n: "04", title: "Launch",    desc: "Deployment with full team training to ensure adoption from day one." },
  { n: "05", title: "Scale",     desc: "Ongoing monitoring, optimisation, and scaling as your business evolves." },
];

function Process() {
  return (
    <section id="process" className="bg-[#080810] px-12 py-28">
      <div className="max-w-[1160px] mx-auto">
        <Reveal>
          <Kicker>How We Work</Kicker>
          <h2 className="font-serif font-light text-[#F0F0F8] leading-[1.15] tracking-[-0.01em] mb-16"
              style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
            From first call to<br />
            <em className="italic">full deployment — fast</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-white/[.07] border border-white/[.07]">
          {STEPS.map(s => (
            <div key={s.n}
                 className="process-step bg-[#080810] p-8 transition-colors duration-200 cursor-default">
              <div className="font-serif font-light text-white/[.04] leading-none mb-5 select-none"
                   style={{ fontSize: "3.5rem", letterSpacing: "-0.03em" }}>
                {s.n}
              </div>
              <div className="font-sans-pe font-medium text-[#F0F0F8] text-[.86rem] tracking-[.03em] mb-2.5">
                {s.title}
              </div>
              <p className="font-sans-pe font-light text-white/28 text-[.79rem] leading-[1.78]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   DIVIDER QUOTE
───────────────────────────────────────── */
function Divider() {
  return (
    <div className="relative overflow-hidden" style={{ height: 480 }}>
      <img src={IMG.divider} alt="" aria-hidden
           className="img-divider absolute inset-0 w-full h-full object-cover object-[center_40%] z-0" />
      <div className="absolute inset-0 z-[1]"
           style={{ background: "linear-gradient(to right, rgba(8,8,16,.97) 0%, rgba(8,8,16,.4) 55%, transparent 100%)" }} />
      <div className="absolute inset-0 z-[2] flex items-center px-20">
        <div>
          <blockquote className="font-serif font-light italic text-[#F0F0F8] leading-[1.32] tracking-[-0.01em]"
                      style={{ fontSize: "clamp(1.6rem,3.5vw,2.6rem)", maxWidth: 640 }}>
            "We don't just implement technology — we transform the way your organisation thinks, operates, and competes."
          </blockquote>
          <span className="block font-sans-pe font-medium text-[#C9A84C] text-[.66rem] tracking-[.16em] uppercase mt-6 not-italic">
            Prime Edge AI — Nairobi, Kenya
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CONTACT
───────────────────────────────────────── */
function Contact() {
  const [sent, setSent] = useState(false);

  const SVGpin = (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
  const SVGphone = (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
    </svg>
  );
  const SVGmail = (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
  const SVGclock = (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );

  const items = [
    { label: "Location", value: "Nairobi, Kenya",           icon: SVGpin   },
    { label: "Phone",    value: "+254 706 384 510",          icon: SVGphone },
    { label: "Email",    value: "info@primeedgeai.com",      icon: SVGmail  },
    { label: "Hours",    value: "Mon – Fri, 8AM – 6PM EAT", icon: SVGclock },
  ];

  const inputCls = "w-full bg-[#13131f] border border-white/[.07] text-[#F0F0F8] text-[.87rem] font-sans-pe font-light px-4 py-[13px] outline-none transition-colors duration-200 focus:border-[#6B8CFF] placeholder:text-white/25";

  return (
    <section id="contact" className="bg-[#0e0e1a] px-12 py-28">
      <div className="max-w-[1160px] mx-auto">
        <Reveal>
          <Kicker>Get In Touch</Kicker>
          <h2 className="font-serif font-light text-[#F0F0F8] leading-[1.15] tracking-[-0.01em] mb-16"
              style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
            Ready to gain<br /><em className="italic">your edge?</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-20 items-start">

          {/* Info */}
          <Reveal>
            <p className="font-sans-pe font-light text-white/50 text-[.9rem] leading-[1.88] mb-11">
              Whether you want to deploy AI, upskill your team, build a high-performance website,
              or unlock your data — Prime Edge AI is ready. Let's start with a conversation.
            </p>
            <div className="flex flex-col gap-7">
              {items.map(ci => (
                <div key={ci.label} className="flex items-start gap-[18px]">
                  <div className="w-9 h-9 border border-white/[.07] bg-[#080810] flex items-center justify-center flex-shrink-0"
                       style={{ borderRadius: "4px" }}>
                    {ci.icon}
                  </div>
                  <div>
                    <span className="block font-sans-pe font-normal text-white/28 text-[.6rem] tracking-[.14em] uppercase mb-1">
                      {ci.label}
                    </span>
                    <span className="font-sans-pe font-normal text-[#F0F0F8] text-[.85rem]">
                      {ci.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="bg-[#080810] border border-white/[.07] p-12">
              <div className="grid grid-cols-2 gap-4 mb-[22px]">
                <div>
                  <label className="block font-sans-pe font-medium text-white/28 text-[.6rem] tracking-[.16em] uppercase mb-2">First Name</label>
                  <input type="text" placeholder="John" className={inputCls} style={{ borderRadius: "4px" }} />
                </div>
                <div>
                  <label className="block font-sans-pe font-medium text-white/28 text-[.6rem] tracking-[.16em] uppercase mb-2">Last Name</label>
                  <input type="text" placeholder="Doe" className={inputCls} style={{ borderRadius: "4px" }} />
                </div>
              </div>
              <div className="mb-[22px]">
                <label className="block font-sans-pe font-medium text-white/28 text-[.6rem] tracking-[.16em] uppercase mb-2">Email Address</label>
                <input type="email" placeholder="john@company.com" className={inputCls} style={{ borderRadius: "4px" }} />
              </div>
              <div className="mb-[22px]">
                <label className="block font-sans-pe font-medium text-white/28 text-[.6rem] tracking-[.16em] uppercase mb-2">Service Interest</label>
                <select className={`${inputCls} appearance-none`} style={{ borderRadius: "4px" }}>
                  <option value="">Select a service...</option>
                  <option>AI &amp; Automation</option>
                  <option>AI Training</option>
                  <option>Website Creation</option>
                  <option>Data Analytics</option>
                  <option>Multiple Services</option>
                </select>
              </div>
              <div className="mb-[22px]">
                <label className="block font-sans-pe font-medium text-white/28 text-[.6rem] tracking-[.16em] uppercase mb-2">Message</label>
                <textarea
                  placeholder="Tell us about your project or challenge..."
                  className={inputCls}
                  style={{ borderRadius: "4px", minHeight: 120, resize: "vertical" }}
                />
              </div>
              <button
                className="w-full py-[15px] font-sans-pe font-medium text-white text-[.75rem] tracking-[.14em] uppercase cursor-pointer border-none transition-all duration-200 mt-2"
                style={{ background: sent ? "#1a7a3c" : "#6B8CFF", borderRadius: "4px" }}
                onMouseOver={e => { if (!sent) (e.currentTarget as HTMLButtonElement).style.background = "#4a6ef0"; }}
                onMouseOut={e => { if (!sent) (e.currentTarget as HTMLButtonElement).style.background = "#6B8CFF"; }}
                onClick={() => { setSent(true); setTimeout(() => setSent(false), 3000); }}
              >
                {sent ? "Message Received" : "Send Message"}
              </button>
            </div>
          </Reveal>
        </div>

        {/* Map */}
        <div className="mt-16">
          <iframe
            title="Prime Edge AI Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.853898546794!2d36.801161674879594!3d-1.259804998728201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f176ab788de03%3A0x6ce6930ee66eeb8c!2sThe%20Westwood!5e0!3m2!1sen!2ske!4v1752008415264!5m2!1sen!2ske"
            width="100%" height="260"
            className="map-dark block border border-white/[.07]"
            style={{ borderRadius: 0 }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  const cols = [
    { title: "Services", links: ["AI & Automation", "AI Training", "Website Creation", "Data Analytics"] },
    { title: "Company",  links: ["About Us", "How We Work", "Contact"] },
    { title: "Connect",  links: ["info@primeedgeai.com", "+254 706 384 510", "WhatsApp Us"] },
  ];

  return (
    <footer className="bg-[#05050d] border-t border-white/[.06] px-12 pt-16 pb-8">
      <div className="max-w-[1160px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 pb-14 mb-8 border-b border-white/[.06]">
          <div>
            <span className="block font-serif font-light text-[#F0F0F8] text-[1.5rem] tracking-[.02em] mb-4">
              Prime <em className="italic text-[#6B8CFF]">Edge</em> AI
            </span>
            <p className="font-sans-pe font-light text-white/28 text-[.82rem] leading-[1.82]" style={{ maxWidth: 260 }}>
              Equipping African businesses with intelligent technology to outperform, outscale, and outlast the competition.
            </p>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <span className="block font-sans-pe font-medium text-[#C9A84C] text-[.6rem] tracking-[.18em] uppercase mb-5">
                {col.title}
              </span>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#"
                       className="footer-link font-sans-pe font-light text-white/28 text-[.82rem] no-underline transition-colors duration-200">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3">
          <p className="font-sans-pe font-light text-white/22 text-[.71rem] tracking-[.04em]">
            © 2025 Prime Edge AI Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="footer-link font-sans-pe font-light text-white/28 text-[.71rem] no-underline transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="footer-link font-sans-pe font-light text-white/28 text-[.71rem] no-underline transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   WHATSAPP FLOAT
───────────────────────────────────────── */
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/254706384510?text=Hello%21%20I%27m%20interested%20in%20your%20services."
      target="_blank" rel="noopener noreferrer"
      className="wa-btn fixed bottom-7 right-7 z-[300] w-[50px] h-[50px] bg-[#25D366] flex items-center justify-center no-underline transition-all duration-200"
      style={{ borderRadius: "4px", boxShadow: "0 4px 24px rgba(37,211,102,.35)" }}
      aria-label="Chat on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M12.04 2.01A10 10 0 0 0 2 12.06a9.84 9.84 0 0 0 1.37 5.09L2 22l5.07-1.33a9.95 9.95 0 0 0 4.96 1.28H12A10 10 0 0 0 12.04 2zM12 20.08a8.07 8.07 0 0 1-4.1-1.13l-.3-.17-3.02.79.8-2.94-.2-.31a8.04 8.04 0 1 1 14.9-4.27 8.03 8.03 0 0 1-8.08 8.03zm4.62-6.03c-.26-.13-1.5-.74-1.73-.83s-.4-.13-.57.13-.66.83-.81 1-.3.2-.56.07a6.6 6.6 0 0 1-1.94-1.2 7.4 7.4 0 0 1-1.37-1.7c-.14-.26 0-.4.12-.53s.26-.3.4-.45c.14-.15.2-.26.3-.43a.5.5 0 0 0-.02-.48c-.07-.14-.57-1.37-.78-1.87s-.4-.42-.56-.43h-.48a.92.92 0 0 0-.67.31 2.78 2.78 0 0 0-.86 2.06c0 1.22.87 2.4 1 2.57.13.17 1.7 2.6 4.13 3.64.58.25 1.04.4 1.4.51a3.35 3.35 0 0 0 1.56.1 2.66 2.66 0 0 0 1.75-1.22c.22-.3.22-.54.16-.74s-.24-.17-.5-.3z"/>
      </svg>
    </a>
  );
}

/* ─────────────────────────────────────────
   APP ROOT
   — single scroll listener drives both
     Topbar (slides away) and Navbar (sticks)
───────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > TOPBAR_HEIGHT);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="font-sans-pe text-[#F0F0F8] antialiased overflow-x-hidden"
      style={{ backgroundColor: "#080810", color: "#F0F0F8", minHeight: "100vh" }}
    >
      <Topbar scrolled={scrolled} />
      <Navbar scrolled={scrolled} />
      <Hero />
      <Services />
      <About />
      <Process />
      <Divider />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
