import { useState, useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

/* ── Google Fonts ── */
if (!document.head.querySelector("[data-pe-fonts]")) {
  const l = document.createElement("link");
  l.setAttribute("data-pe-fonts", "true");
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap";
  document.head.appendChild(l);
}

/* ── Design tokens ── */
const T = {
  bg:          "#080810",
  surface:     "#0e0e1a",
  surface2:    "#13131f",
  border:      "rgba(255,255,255,0.07)",
  accent:      "#6B8CFF",
  accentDim:   "rgba(107,140,255,0.12)",
  accentGlow:  "rgba(107,140,255,0.25)",
  gold:        "#C9A84C",
  text:        "#F0F0F8",
  textMid:     "rgba(240,240,248,0.55)",
  textDim:     "rgba(240,240,248,0.28)",
  serif:       "'Cormorant Garamond', Georgia, serif",
  sans:        "'Inter', system-ui, sans-serif",
  radius:      "4px",
};

/* ── Images ── */
const IMG = {
  hero:      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1800&q=85&auto=format&fit=crop",
  ai:        "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80&auto=format&fit=crop",
  training:  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80&auto=format&fit=crop",
  web:       "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80&auto=format&fit=crop",
  analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
  about:     "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop",
  divider:   "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=80&auto=format&fit=crop",
};

type SM = Record<string, CSSProperties>;

const S: SM = {
  root: {
    fontFamily: T.sans,
    color: T.text,
    background: T.bg,
    WebkitFontSmoothing: "antialiased",
    overflowX: "hidden",
  },
  topbar: {
    background: "#05050d",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "9px 48px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    fontSize: "0.72rem",
    letterSpacing: "0.06em",
    color: "rgba(240,240,248,0.28)",
  },
  topbarBrand: {
    color: "#C9A84C",
    fontWeight: 500,
    letterSpacing: "0.1em",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "0.85rem",
  },
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 200,
    height: 72,
    padding: "0 48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
    background: "transparent",
    borderBottom: "1px solid transparent",
  },
  navScrolled: {
    background: "rgba(8,8,16,0.96)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "0 4px 40px rgba(0,0,0,0.5)",
  },
  navLinks: {
    display: "flex",
    gap: 36,
    listStyle: "none",
    margin: 0,
    padding: 0,
    alignItems: "center",
  },
  navLink: {
    fontSize: "0.78rem",
    fontWeight: 400,
    color: "rgba(240,240,248,0.55)",
    textDecoration: "none",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    transition: "color 0.2s",
    cursor: "pointer",
  },
  navCta: {
    background: "transparent",
    color: "#6B8CFF",
    border: "1px solid #6B8CFF",
    padding: "9px 24px",
    borderRadius: "4px",
    fontSize: "0.74rem",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
    display: "inline-block",
  },

  /* Hero */
  hero: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    background: "#080810",
  },
  heroImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 30%",
    zIndex: 0,
    filter: "saturate(0.4) brightness(0.2)",
  },
  heroGradL: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(105deg, rgba(8,8,16,0.97) 38%, rgba(8,8,16,0.5) 65%, transparent 100%)",
    zIndex: 1,
  },
  heroGradB: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    background: "linear-gradient(to top, rgba(8,8,16,1) 0%, transparent 100%)",
    zIndex: 1,
  },
  heroGlow: {
    position: "absolute",
    top: "-10%",
    right: "-5%",
    width: "50%",
    height: "70%",
    background: "radial-gradient(ellipse, rgba(107,140,255,0.18) 0%, transparent 65%)",
    zIndex: 1,
    pointerEvents: "none",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    padding: "0 80px",
    maxWidth: 1160,
    margin: "0 auto",
    width: "100%",
    paddingTop: 72,
  },
  heroKicker: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 36,
  },
  heroKickerLine: {
    width: 36,
    height: 1,
    background: "#C9A84C",
    display: "inline-block",
  },
  heroKickerText: {
    fontSize: "0.66rem",
    fontWeight: 500,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "#C9A84C",
  },
  heroH1: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(3.2rem, 7.5vw, 6.4rem)",
    fontWeight: 300,
    color: "#F0F0F8",
    lineHeight: 1.02,
    letterSpacing: "-0.01em",
    marginBottom: 8,
    maxWidth: 860,
  },
  heroH1Em: {
    fontStyle: "italic",
    fontWeight: 300,
    color: "#6B8CFF",
  },
  heroRule: {
    width: 60,
    height: 1,
    background: "#C9A84C",
    margin: "28px 0",
    opacity: 0.6,
    border: "none",
  },
  heroSub: {
    fontSize: "1.02rem",
    color: "rgba(240,240,248,0.55)",
    lineHeight: 1.82,
    maxWidth: 480,
    fontWeight: 300,
    marginBottom: 52,
    letterSpacing: "0.01em",
  },
  heroActions: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 96,
  },
  btnAccent: {
    background: "#6B8CFF",
    color: "#fff",
    padding: "15px 36px",
    borderRadius: "4px",
    fontWeight: 500,
    fontSize: "0.78rem",
    textDecoration: "none",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    transition: "background 0.2s, box-shadow 0.2s",
    display: "inline-block",
    cursor: "pointer",
    border: "none",
  },
  btnOutline: {
    background: "transparent",
    color: "rgba(240,240,248,0.55)",
    padding: "14px 36px",
    borderRadius: "4px",
    fontWeight: 400,
    fontSize: "0.78rem",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.18)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    transition: "border-color 0.2s, color 0.2s",
    display: "inline-block",
    cursor: "pointer",
  },
  heroStats: {
    display: "flex",
    gap: 0,
    borderTop: "1px solid rgba(255,255,255,0.07)",
    paddingTop: 40,
    flexWrap: "wrap",
  },
  heroStat: {
    paddingRight: 48,
    marginRight: 48,
    borderRight: "1px solid rgba(255,255,255,0.07)",
    paddingBottom: 8,
  },
  heroStatLast: {
    paddingRight: 0,
    marginRight: 0,
    borderRight: "none",
    paddingBottom: 8,
  },
  heroStatNum: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "2.6rem",
    fontWeight: 300,
    color: "#F0F0F8",
    display: "block",
    lineHeight: 1,
    marginBottom: 6,
    letterSpacing: "-0.02em",
  },
  heroStatLabel: {
    fontSize: "0.66rem",
    color: "rgba(240,240,248,0.28)",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 400,
  },

  /* Section commons */
  section: { padding: "110px 48px" },
  container: { maxWidth: 1160, margin: "0 auto" },
  kicker: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  kickerLine: { width: 24, height: 1, background: "#C9A84C", display: "inline-block" },
  kickerText: {
    fontSize: "0.66rem",
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#C9A84C",
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(2rem, 4vw, 3.2rem)",
    fontWeight: 300,
    letterSpacing: "-0.01em",
    lineHeight: 1.15,
    color: "#F0F0F8",
    marginBottom: 16,
  },
  sectionBody: {
    fontSize: "0.93rem",
    color: "rgba(240,240,248,0.55)",
    lineHeight: 1.85,
    fontWeight: 300,
    maxWidth: 480,
  },

  /* Services */
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
    gap: 1,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.07)",
    marginTop: 64,
  },
  serviceCard: {
    background: "#0e0e1a",
    overflow: "hidden",
    transition: "background 0.3s",
    cursor: "pointer",
    borderRadius: 0,
  },
  serviceCardImg: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    display: "block",
    filter: "brightness(0.65) saturate(0.5)",
    transition: "filter 0.4s, transform 0.5s",
  },
  serviceCardBody: { padding: "28px 32px 36px" },
  serviceCardTag: {
    fontSize: "0.6rem",
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#C9A84C",
    marginBottom: 10,
    display: "block",
  },
  serviceCardTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "1.4rem",
    fontWeight: 400,
    color: "#F0F0F8",
    marginBottom: 12,
    lineHeight: 1.2,
  },
  serviceCardDesc: {
    fontSize: "0.83rem",
    color: "rgba(240,240,248,0.5)",
    lineHeight: 1.78,
    fontWeight: 300,
  },
  serviceCardLink: {
    display: "inline-block",
    marginTop: 20,
    fontSize: "0.68rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#6B8CFF",
    fontWeight: 500,
  },

  /* About */
  aboutSection: { padding: "110px 48px", background: "#0e0e1a" },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
    alignItems: "center",
  },
  aboutImgWrap: { position: "relative", overflow: "hidden" },
  aboutImg: {
    width: "100%",
    height: 560,
    objectFit: "cover",
    display: "block",
    filter: "brightness(0.65) saturate(0.5)",
    borderRadius: 0,
  },
  aboutImgFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "35%",
    background: "linear-gradient(to top, #0e0e1a 0%, transparent 100%)",
  },
  aboutPoints: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    marginTop: 44,
  },
  aboutPoint: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
    paddingBottom: 28,
    paddingTop: 28,
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  pointNum: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "1.2rem",
    fontWeight: 300,
    color: "#C9A84C",
    minWidth: 28,
    lineHeight: 1.4,
    fontStyle: "italic",
  },
  pointTitle: {
    display: "block",
    fontWeight: 500,
    color: "#F0F0F8",
    marginBottom: 5,
    fontSize: "0.86rem",
    letterSpacing: "0.02em",
  },
  pointBody: {
    fontSize: "0.83rem",
    color: "rgba(240,240,248,0.5)",
    lineHeight: 1.78,
    fontWeight: 300,
  },

  /* Process */
  processGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 1,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.07)",
    marginTop: 64,
  },
  processStep: {
    padding: "44px 32px",
    background: "#080810",
    transition: "background 0.25s",
    borderRadius: 0,
  },
  processNum: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "3.5rem",
    fontWeight: 300,
    color: "rgba(255,255,255,0.04)",
    lineHeight: 1,
    marginBottom: 20,
    letterSpacing: "-0.03em",
  },
  processTitle: {
    fontSize: "0.86rem",
    fontWeight: 500,
    color: "#F0F0F8",
    marginBottom: 10,
    letterSpacing: "0.03em",
  },
  processDesc: {
    fontSize: "0.79rem",
    color: "rgba(240,240,248,0.28)",
    lineHeight: 1.78,
    fontWeight: 300,
  },

  /* Divider */
  divider: { position: "relative", overflow: "hidden", height: 480 },
  dividerBg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 40%",
    filter: "brightness(0.2) saturate(0.3)",
    zIndex: 0,
  },
  dividerVeil: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, rgba(8,8,16,0.97) 0%, rgba(8,8,16,0.4) 55%, transparent 100%)",
    zIndex: 1,
  },
  dividerInner: {
    position: "absolute",
    inset: 0,
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    padding: "0 80px",
  },
  dividerQuote: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
    fontWeight: 300,
    fontStyle: "italic",
    color: "#F0F0F8",
    lineHeight: 1.32,
    maxWidth: 640,
    letterSpacing: "-0.01em",
  },
  dividerSource: {
    fontSize: "0.66rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#C9A84C",
    marginTop: 24,
    display: "block",
    fontStyle: "normal",
    fontWeight: 500,
  },

  /* Contact */
  contactSection: { padding: "110px 48px", background: "#0e0e1a" },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: 80,
    alignItems: "start",
  },
  contactBody: {
    fontSize: "0.9rem",
    color: "rgba(240,240,248,0.5)",
    lineHeight: 1.88,
    marginBottom: 44,
    fontWeight: 300,
  },
  contactItems: { display: "flex", flexDirection: "column", gap: 28 },
  contactItem: { display: "flex", alignItems: "flex-start", gap: 18 },
  ciIconBox: {
    width: 36,
    height: 36,
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: "#080810",
  },
  ciLabel: {
    fontSize: "0.6rem",
    color: "rgba(240,240,248,0.28)",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: 4,
    display: "block",
    fontWeight: 400,
  },
  ciValue: {
    fontSize: "0.85rem",
    color: "#F0F0F8",
    fontWeight: 400,
  },
  contactForm: {
    background: "#080810",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 0,
    padding: "48px 44px",
  },
  formRow: { marginBottom: 22 },
  formLabel: {
    display: "block",
    fontSize: "0.6rem",
    fontWeight: 500,
    color: "rgba(240,240,248,0.28)",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    marginBottom: 9,
  },
  formInput: {
    width: "100%",
    background: "#13131f",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "4px",
    padding: "13px 16px",
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: "0.87rem",
    color: "#F0F0F8",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  formTextarea: {
    width: "100%",
    background: "#13131f",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "4px",
    padding: "13px 16px",
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: "0.87rem",
    color: "#F0F0F8",
    outline: "none",
    resize: "vertical",
    minHeight: 120,
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  formSelect: {
    width: "100%",
    background: "#13131f",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "4px",
    padding: "13px 16px",
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: "0.87rem",
    color: "#F0F0F8",
    outline: "none",
    appearance: "none",
    boxSizing: "border-box",
  },
  form2col: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  formSubmit: {
    background: "#6B8CFF",
    color: "#fff",
    border: "none",
    padding: "15px 36px",
    borderRadius: "4px",
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: "0.75rem",
    fontWeight: 500,
    cursor: "pointer",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    width: "100%",
    marginTop: 8,
    transition: "background 0.2s, box-shadow 0.2s",
  },

  /* WhatsApp */
  waFloat: {
    position: "fixed",
    bottom: 28,
    right: 28,
    zIndex: 300,
    width: 50,
    height: 50,
    background: "#25D366",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 24px rgba(37,211,102,0.35)",
    textDecoration: "none",
    transition: "transform 0.2s, box-shadow 0.2s",
  },

  /* Footer */
  footer: {
    background: "#05050d",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "64px 48px 32px",
  },
  footerTop: {
    display: "grid",
    gridTemplateColumns: "1.8fr 1fr 1fr 1fr",
    gap: 48,
    marginBottom: 56,
    paddingBottom: 56,
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  footerLogo: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "1.5rem",
    fontWeight: 300,
    color: "#F0F0F8",
    display: "block",
    marginBottom: 16,
    letterSpacing: "0.02em",
  },
  footerDesc: {
    fontSize: "0.82rem",
    color: "rgba(240,240,248,0.28)",
    lineHeight: 1.82,
    maxWidth: 260,
    fontWeight: 300,
  },
  footerColHead: {
    fontSize: "0.6rem",
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#C9A84C",
    marginBottom: 20,
    display: "block",
  },
  footerList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  footerLink: {
    fontSize: "0.82rem",
    color: "rgba(240,240,248,0.28)",
    textDecoration: "none",
    fontWeight: 300,
    transition: "color 0.18s",
    cursor: "pointer",
  },
  footerBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  footerCopy: {
    fontSize: "0.71rem",
    color: "rgba(240,240,248,0.22)",
    fontWeight: 300,
    letterSpacing: "0.04em",
  },
};

/* ── Reveal hook ── */
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

function Reveal({ children, delay = 0, y = 24 }: { children: ReactNode; delay?: number; y?: number }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <div style={S.kicker}>
      <span style={S.kickerLine} />
      <span style={S.kickerText}>{children}</span>
    </div>
  );
}

/* ══════════════════════════════════
   COMPONENTS
══════════════════════════════════ */

function Topbar() {
  return (
    <div style={S.topbar}>
      <span style={S.topbarBrand}>Prime Edge AI</span>
      <span>info@primeedgeai.com &nbsp;·&nbsp; +254 706 384 510 &nbsp;·&nbsp; Nairobi, Kenya</span>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [wide, setWide] = useState(window.innerWidth >= 900);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onResize = () => setWide(window.innerWidth >= 900);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navStyle: CSSProperties = { ...S.nav, ...(scrolled ? S.navScrolled : {}) };
  const links = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav style={navStyle}>
        <a href="#" style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "1.3rem",
          fontWeight: 300,
          color: "#F0F0F8",
          textDecoration: "none",
          letterSpacing: "0.04em",
        }}>
          Prime <em style={{ fontStyle: "italic", color: "#6B8CFF" }}>Edge</em> AI
        </a>

        {wide && (
          <ul style={S.navLinks}>
            {links.map(l => (
              <li key={l.label}>
                <a href={l.href} style={S.navLink}
                  onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#F0F0F8"; }}
                  onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,240,248,0.55)"; }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {wide && (
          <a href="#contact" style={S.navCta}
            onMouseOver={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#6B8CFF";
              el.style.color = "#fff";
            }}
            onMouseOut={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "transparent";
              el.style.color = "#6B8CFF";
            }}
          >
            Get Started
          </a>
        )}

        {!wide && (
          <button onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
            aria-label="Toggle menu"
          >
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
              {open
                ? <path d="M2 2L20 16M20 2L2 16" stroke="#F0F0F8" strokeWidth="1.5" strokeLinecap="round" />
                : <>
                    <line x1="2" y1="2" x2="20" y2="2" stroke="#F0F0F8" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="2" y1="9" x2="20" y2="9" stroke="#F0F0F8" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="2" y1="16" x2="20" y2="16" stroke="#F0F0F8" strokeWidth="1.5" strokeLinecap="round" />
                  </>
              }
            </svg>
          </button>
        )}
      </nav>

      {open && !wide && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, zIndex: 199,
          background: "#0e0e1a", borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "28px 32px 36px", display: "flex", flexDirection: "column", gap: 4,
          boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
              fontSize: "0.84rem", color: "rgba(240,240,248,0.6)", textDecoration: "none",
              fontWeight: 400, padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.07)",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}
            style={{ ...S.navCta, textAlign: "center", marginTop: 16, display: "block" }}
          >Get Started</a>
        </div>
      )}
    </>
  );
}

function Hero() {
  const stats: { num: string; label: string; last?: boolean }[] = [
    { num: "500+", label: "Clients Served" },
    { num: "10+",  label: "Years Experience" },
    { num: "20+",  label: "AI Solutions Built" },
    { num: "100%", label: "Satisfaction Rate", last: true },
  ];

  return (
    <section style={S.hero}>
      <img src={IMG.hero} alt="" aria-hidden="true" style={S.heroImg} />
      <div style={S.heroGradL} />
      <div style={S.heroGradB} />
      <div style={S.heroGlow} />

      <div style={S.heroContent}>
        <div style={S.heroKicker}>
          <span style={S.heroKickerLine} />
          <span style={S.heroKickerText}>AI-Powered Business Transformation</span>
        </div>

        <h1 style={S.heroH1}>
          Intelligence<br />
          That Drives<br />
          <em style={S.heroH1Em}>Real Results.</em>
        </h1>

        <hr style={S.heroRule} />

        <p style={S.heroSub}>
          Prime Edge AI equips African businesses with cutting-edge AI, automation, and data solutions — engineered to cut costs, accelerate growth, and outpace the competition.
        </p>

        <div style={S.heroActions}>
          <a href="#contact" style={S.btnAccent}
            onMouseOver={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#4a6ef0"; el.style.boxShadow = "0 8px 32px rgba(107,140,255,0.35)"; }}
            onMouseOut={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#6B8CFF"; el.style.boxShadow = "none"; }}
          >
            Book a Free Consultation
          </a>
          <a href="#services" style={S.btnOutline}
            onMouseOver={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(255,255,255,0.4)"; el.style.color = "#F0F0F8"; }}
            onMouseOut={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(255,255,255,0.18)"; el.style.color = "rgba(240,240,248,0.55)"; }}
          >
            Explore Services
          </a>
        </div>

        <div style={S.heroStats}>
          {stats.map(s => (
            <div key={s.num} style={s.last ? S.heroStatLast : S.heroStat}>
              <span style={S.heroStatNum}>{s.num}</span>
              <span style={S.heroStatLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { tag: "Artificial Intelligence", title: "AI & Automation",  desc: "Custom AI agents and workflow automation that eliminate repetitive tasks, reduce costs, and operate 24/7 without oversight.", img: IMG.ai },
  { tag: "Training & Upskilling", title: "AI Training",        desc: "Practical workshops that transform your team from passive observers to confident AI operators — at every skill level.", img: IMG.training },
  { tag: "Digital Presence",      title: "Website Creation",   desc: "Performance-first, visually striking web experiences built for conversion, credibility, and long-term brand authority.", img: IMG.web },
  { tag: "Business Intelligence", title: "Data Analytics",     desc: "Transform fragmented data into unified intelligence — dashboards, forecasting models, and reports that drive decisions.", img: IMG.analytics },
];

function Services() {
  return (
    <section id="services" style={{ ...S.section, background: T.bg }}>
      <div style={S.container}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
            <div>
              <Kicker>What We Offer</Kicker>
              <h2 style={S.sectionTitle}>Four disciplines.<br /><em style={{ fontStyle: "italic" }}>One integrated edge.</em></h2>
            </div>
            <p style={{ ...S.sectionBody, maxWidth: 340 }}>
              Built for African businesses ready to move faster, operate smarter, and compete at a global level.
            </p>
          </div>
        </Reveal>

        <div style={S.servicesGrid}>
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 0.07}>
              <div
                style={S.serviceCard}
                onMouseOver={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "#13131f";
                  const img = el.querySelector("img") as HTMLImageElement | null;
                  if (img) { img.style.filter = "brightness(0.85) saturate(0.75)"; img.style.transform = "scale(1.04)"; }
                }}
                onMouseOut={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "#0e0e1a";
                  const img = el.querySelector("img") as HTMLImageElement | null;
                  if (img) { img.style.filter = "brightness(0.65) saturate(0.5)"; img.style.transform = "scale(1)"; }
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <img src={svc.img} alt={svc.title} style={S.serviceCardImg} loading="lazy" />
                </div>
                <div style={S.serviceCardBody}>
                  <span style={S.serviceCardTag}>{svc.tag}</span>
                  <div style={S.serviceCardTitle}>{svc.title}</div>
                  <p style={S.serviceCardDesc}>{svc.desc}</p>
                  <span style={S.serviceCardLink}>Learn more →</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const points = [
    { n: "01", title: "Goals before technology", body: "Every engagement starts with your operations — we build what you actually need, not what sounds impressive." },
    { n: "02", title: "Deliver, then transfer knowledge", body: "We train your team on every solution — so results outlast our involvement and adoption is guaranteed." },
    { n: "03", title: "Long-term partnership", body: "We monitor, optimise, and scale alongside you. We measure success by your growth, not just project delivery." },
  ];

  return (
    <section id="about" style={S.aboutSection}>
      <div style={S.container}>
        <div style={S.aboutGrid}>
          <Reveal>
            <div style={S.aboutImgWrap}>
              <img src={IMG.about} alt="Prime Edge AI team" style={S.aboutImg} loading="lazy" />
              <div style={S.aboutImgFade} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Kicker>Who We Are</Kicker>
            <h2 style={S.sectionTitle}>Africa's premier<br /><em style={{ fontStyle: "italic" }}>AI transformation partner</em></h2>
            <p style={S.sectionBody}>
              Prime Edge AI is a Nairobi-based technology firm helping organisations across Africa adopt AI, automate operations, and build digital infrastructure that creates lasting competitive advantage.
            </p>
            <div style={S.aboutPoints}>
              {points.map(p => (
                <div key={p.n} style={S.aboutPoint}>
                  <span style={S.pointNum}>{p.n}</span>
                  <div>
                    <span style={S.pointTitle}>{p.title}</span>
                    <span style={S.pointBody}>{p.body}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 44 }}>
              <a href="#contact" style={S.btnAccent}
                onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#4a6ef0"; }}
                onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#6B8CFF"; }}
              >
                Work With Us
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Discovery",  desc: "Free consultation to understand your goals and where AI creates the most leverage for your business." },
  { n: "02", title: "Strategy",   desc: "Clear roadmap, fixed pricing, and a delivery timeline — no ambiguity, no hidden scope." },
  { n: "03", title: "Build",      desc: "Agile delivery with weekly check-ins so you see progress continuously, not just at launch." },
  { n: "04", title: "Launch",     desc: "Deployment with full team training to ensure adoption and results from day one." },
  { n: "05", title: "Scale",      desc: "Ongoing monitoring, optimisation, and scaling as your business evolves and grows." },
];

function Process() {
  return (
    <section id="process" style={{ ...S.section, background: T.bg }}>
      <div style={S.container}>
        <Reveal>
          <Kicker>How We Work</Kicker>
          <h2 style={S.sectionTitle}>From first call to<br /><em style={{ fontStyle: "italic" }}>full deployment — fast</em></h2>
        </Reveal>
        <div style={S.processGrid}>
          {STEPS.map(s => (
            <div key={s.n} style={S.processStep}
              onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.background = "#0e0e1a"; }}
              onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.background = "#080810"; }}
            >
              <div style={S.processNum}>{s.n}</div>
              <div style={S.processTitle}>{s.title}</div>
              <p style={S.processDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return (
    <div style={S.divider}>
      <img src={IMG.divider} alt="" aria-hidden="true" style={S.dividerBg} />
      <div style={S.dividerVeil} />
      <div style={S.dividerInner}>
        <div>
          <blockquote style={S.dividerQuote}>
            "We don't just implement technology — we transform the way your organisation thinks, operates, and competes."
          </blockquote>
          <span style={S.dividerSource}>Prime Edge AI — Nairobi, Kenya</span>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const accentColor = "#6B8CFF";

  const items = [
    { label: "Location", value: "Nairobi, Kenya",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg> },
    { label: "Phone", value: "+254 706 384 510",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" /></svg> },
    { label: "Email", value: "info@primeedgeai.com",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
    { label: "Hours", value: "Mon – Fri, 8AM – 6PM EAT",
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
  ];

  const fo = { borderColor: accentColor };
  const fb = { borderColor: "rgba(255,255,255,0.07)" };

  return (
    <section id="contact" style={S.contactSection}>
      <div style={S.container}>
        <Reveal>
          <Kicker>Get In Touch</Kicker>
          <h2 style={{ ...S.sectionTitle, marginBottom: 64 }}>
            Ready to gain<br /><em style={{ fontStyle: "italic" }}>your edge?</em>
          </h2>
        </Reveal>
        <div style={S.contactGrid}>
          <Reveal>
            <p style={S.contactBody}>
              Whether you want to deploy AI in your business, upskill your team, build a high-performance website, or unlock your data — Prime Edge AI is ready. Let's start with a conversation.
            </p>
            <div style={S.contactItems}>
              {items.map(ci => (
                <div key={ci.label} style={S.contactItem}>
                  <div style={S.ciIconBox}>{ci.icon}</div>
                  <div>
                    <span style={S.ciLabel}>{ci.label}</span>
                    <div style={S.ciValue}>{ci.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={S.contactForm}>
              <div style={S.form2col}>
                <div style={S.formRow}>
                  <label style={S.formLabel}>First Name</label>
                  <input style={S.formInput} type="text" placeholder="John"
                    onFocus={e => Object.assign((e.currentTarget as HTMLInputElement).style, fo)}
                    onBlur={e => Object.assign((e.currentTarget as HTMLInputElement).style, fb)}
                  />
                </div>
                <div style={S.formRow}>
                  <label style={S.formLabel}>Last Name</label>
                  <input style={S.formInput} type="text" placeholder="Doe"
                    onFocus={e => Object.assign((e.currentTarget as HTMLInputElement).style, fo)}
                    onBlur={e => Object.assign((e.currentTarget as HTMLInputElement).style, fb)}
                  />
                </div>
              </div>
              <div style={S.formRow}>
                <label style={S.formLabel}>Email Address</label>
                <input style={S.formInput} type="email" placeholder="john@company.com"
                  onFocus={e => Object.assign((e.currentTarget as HTMLInputElement).style, fo)}
                  onBlur={e => Object.assign((e.currentTarget as HTMLInputElement).style, fb)}
                />
              </div>
              <div style={S.formRow}>
                <label style={S.formLabel}>Service Interest</label>
                <select style={S.formSelect}>
                  <option value="">Select a service...</option>
                  <option>AI &amp; Automation</option>
                  <option>AI Training</option>
                  <option>Website Creation</option>
                  <option>Data Analytics</option>
                  <option>Multiple Services</option>
                </select>
              </div>
              <div style={S.formRow}>
                <label style={S.formLabel}>Message</label>
                <textarea style={S.formTextarea} placeholder="Tell us about your project or challenge..."
                  onFocus={e => Object.assign((e.currentTarget as HTMLTextAreaElement).style, fo)}
                  onBlur={e => Object.assign((e.currentTarget as HTMLTextAreaElement).style, fb)}
                />
              </div>
              <button
                style={{ ...S.formSubmit, background: sent ? "#1a7a3c" : accentColor }}
                onMouseOver={e => { if (!sent) (e.currentTarget as HTMLButtonElement).style.background = "#4a6ef0"; }}
                onMouseOut={e => { if (!sent) (e.currentTarget as HTMLButtonElement).style.background = accentColor; }}
                onClick={() => { setSent(true); setTimeout(() => setSent(false), 3000); }}
              >
                {sent ? "Message Received" : "Send Message"}
              </button>
            </div>
          </Reveal>
        </div>

        <div style={{ marginTop: 64 }}>
          <iframe
            title="Prime Edge AI Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.853898546794!2d36.801161674879594!3d-1.259804998728201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f176ab788de03%3A0x6ce6930ee66eeb8c!2sThe%20Westwood!5e0!3m2!1sen!2ske!4v1752008415264!5m2!1sen!2ske"
            width="100%" height="260"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 0,
              display: "block",
              filter: "invert(0.9) hue-rotate(180deg) saturate(0.25) brightness(0.65)",
            }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Services", links: ["AI & Automation", "AI Training", "Website Creation", "Data Analytics"] },
    { title: "Company",  links: ["About Us", "How We Work", "Contact"] },
    { title: "Connect",  links: ["info@primeedgeai.com", "+254 706 384 510", "WhatsApp Us"] },
  ];

  return (
    <footer style={S.footer}>
      <div style={S.container}>
        <div style={S.footerTop}>
          <div>
            <span style={S.footerLogo}>
              Prime <em style={{ fontStyle: "italic", color: "#6B8CFF" }}>Edge</em> AI
            </span>
            <p style={S.footerDesc}>
              Equipping African businesses with intelligent technology to outperform, outscale, and outlast the competition.
            </p>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <span style={S.footerColHead}>{col.title}</span>
              <ul style={S.footerList}>
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" style={S.footerLink}
                      onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#F0F0F8"; }}
                      onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,240,248,0.28)"; }}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={S.footerBottom}>
          <p style={S.footerCopy}>© 2025 Prime Edge AI Limited. All rights reserved.</p>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#" style={S.footerLink}>Privacy Policy</a>
            <a href="#" style={S.footerLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/254706384510?text=Hello%21%20I%27m%20interested%20in%20your%20services."
      target="_blank" rel="noopener noreferrer"
      style={S.waFloat}
      onMouseOver={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = "0 8px 32px rgba(37,211,102,0.5)";
      }}
      onMouseOut={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 4px 24px rgba(37,211,102,0.35)";
      }}
      aria-label="Chat on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M12.04 2.01A10 10 0 0 0 2 12.06a9.84 9.84 0 0 0 1.37 5.09L2 22l5.07-1.33a9.95 9.95 0 0 0 4.96 1.28H12A10 10 0 0 0 12.04 2zM12 20.08a8.07 8.07 0 0 1-4.1-1.13l-.3-.17-3.02.79.8-2.94-.2-.31a8.04 8.04 0 1 1 14.9-4.27 8.03 8.03 0 0 1-8.08 8.03zm4.62-6.03c-.26-.13-1.5-.74-1.73-.83s-.4-.13-.57.13-.66.83-.81 1-.3.2-.56.07a6.6 6.6 0 0 1-1.94-1.2 7.4 7.4 0 0 1-1.37-1.7c-.14-.26 0-.4.12-.53s.26-.3.4-.45c.14-.15.2-.26.3-.43a.5.5 0 0 0-.02-.48c-.07-.14-.57-1.37-.78-1.87s-.4-.42-.56-.43h-.48a.92.92 0 0 0-.67.31 2.78 2.78 0 0 0-.86 2.06c0 1.22.87 2.4 1 2.57.13.17 1.7 2.6 4.13 3.64.58.25 1.04.4 1.4.51a3.35 3.35 0 0 0 1.56.1 2.66 2.66 0 0 0 1.75-1.22c.22-.3.22-.54.16-.74s-.24-.17-.5-.3z" />
      </svg>
    </a>
  );
}

export default function App() {
  return (
    <div style={S.root}>
      <Topbar />
      <Navbar />
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
