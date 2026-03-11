import { useState, useEffect, useRef } from "react";

/* ── Google Fonts injected once ── */
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Satoshi:wght@300;400;500;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

/* ── Unsplash image map ── */
const IMAGES = {
  hero:       "https://images.unsplash.com/photo-1677696795873-5006b3f95b44?w=1600&q=80&auto=format&fit=crop",
  ai:         "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80&auto=format&fit=crop",
  training:   "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&auto=format&fit=crop",
  web:        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format&fit=crop",
  analytics:  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
  team:       "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop",
  office:     "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80&auto=format&fit=crop",
};

/* ── Inline styles object ── */
const S = {
  root: {
    fontFamily: "'Satoshi', 'DM Sans', sans-serif",
    color: "#0d0d12",
    background: "#ffffff",
    WebkitFontSmoothing: "antialiased",
    overflowX: "hidden",
  },

  /* Topbar */
  topbar: {
    background: "#0d0d12",
    color: "rgba(255,255,255,0.55)",
    fontSize: "0.75rem",
    letterSpacing: "0.05em",
    padding: "10px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },

  /* Nav */
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(255,255,255,0.94)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    borderBottom: "1px solid rgba(13,13,18,0.08)",
    padding: "0 48px",
    height: 68,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    fontFamily: "'Instrument Serif', Georgia, serif",
    fontSize: "1.45rem",
    fontWeight: 400,
    color: "#0d0d12",
    textDecoration: "none",
    letterSpacing: "-0.01em",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  logoAccent: { color: "#1246F6" },

  navLinks: {
    display: "flex",
    gap: 36,
    listStyle: "none",
    margin: 0,
    padding: 0,
    alignItems: "center",
  },

  navLink: {
    fontSize: "0.86rem",
    fontWeight: 500,
    color: "#3a3a4a",
    textDecoration: "none",
    letterSpacing: "0.01em",
    transition: "color 0.18s",
    cursor: "pointer",
  },

  navCta: {
    background: "#0d0d12",
    color: "#fff",
    padding: "10px 24px",
    borderRadius: 9,
    fontSize: "0.84rem",
    fontWeight: 600,
    textDecoration: "none",
    transition: "background 0.2s, transform 0.15s",
    letterSpacing: "0.01em",
    cursor: "pointer",
    border: "none",
    display: "inline-block",
  },

  /* Hero */
  hero: {
    position: "relative",
    minHeight: "96vh",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },

  heroBg: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.35)",
  },

  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(120deg, rgba(13,13,18,0.92) 40%, rgba(18,70,246,0.18) 100%)",
  },

  heroContent: {
    position: "relative",
    zIndex: 2,
    padding: "0 80px",
    maxWidth: 1160,
    margin: "0 auto",
    width: "100%",
  },

  heroEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "9px 18px",
    borderRadius: 100,
    marginBottom: 32,
  },

  heroDot: {
    width: 6, height: 6,
    background: "#1246F6",
    borderRadius: "50%",
    display: "inline-block",
  },

  heroH1: {
    fontFamily: "'Instrument Serif', Georgia, serif",
    fontSize: "clamp(2.8rem, 6.5vw, 5.4rem)",
    fontWeight: 400,
    color: "#ffffff",
    lineHeight: 1.05,
    letterSpacing: "-0.025em",
    marginBottom: 28,
    maxWidth: 780,
  },

  heroH1Em: {
    fontStyle: "italic",
    color: "rgba(255,255,255,0.55)",
  },

  heroSub: {
    fontSize: "1.05rem",
    color: "rgba(255,255,255,0.55)",
    lineHeight: 1.75,
    maxWidth: 500,
    fontWeight: 300,
    marginBottom: 48,
  },

  heroActions: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 80,
  },

  btnPrimary: {
    background: "#1246F6",
    color: "#fff",
    padding: "15px 34px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: "0.88rem",
    textDecoration: "none",
    letterSpacing: "0.02em",
    transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
    display: "inline-block",
    cursor: "pointer",
    border: "none",
  },

  btnGhost: {
    background: "transparent",
    color: "rgba(255,255,255,0.75)",
    padding: "14px 32px",
    borderRadius: 10,
    fontWeight: 500,
    fontSize: "0.88rem",
    textDecoration: "none",
    border: "1.5px solid rgba(255,255,255,0.18)",
    transition: "border-color 0.2s, color 0.2s",
    display: "inline-block",
    cursor: "pointer",
  },

  heroStats: {
    display: "flex",
    gap: 48,
    flexWrap: "wrap",
  },

  heroStat: { textAlign: "left" },
  heroStatNum: {
    fontFamily: "'Instrument Serif', Georgia, serif",
    fontSize: "2.4rem",
    color: "#fff",
    display: "block",
    lineHeight: 1,
    marginBottom: 4,
    fontWeight: 400,
  },
  heroStatLabel: {
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.38)",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },

  statLine: {
    width: 1,
    background: "rgba(255,255,255,0.1)",
    alignSelf: "stretch",
  },

  /* Section commons */
  section: {
    padding: "100px 48px",
  },

  container: {
    maxWidth: 1160,
    margin: "0 auto",
  },

  label: {
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#1246F6",
    marginBottom: 14,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  labelLine: {
    width: 22, height: 2,
    background: "#1246F6",
    borderRadius: 2,
    display: "inline-block",
  },

  sectionTitle: {
    fontFamily: "'Instrument Serif', Georgia, serif",
    fontSize: "clamp(1.9rem, 3.8vw, 3rem)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    lineHeight: 1.15,
    color: "#0d0d12",
    marginBottom: 16,
  },

  sectionBody: {
    fontSize: "1rem",
    color: "#6b6b7b",
    lineHeight: 1.8,
    fontWeight: 300,
    maxWidth: 520,
  },

  /* Services */
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
    marginTop: 56,
  },

  serviceCard: {
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid rgba(13,13,18,0.08)",
    background: "#fff",
    transition: "box-shadow 0.28s, transform 0.28s",
    cursor: "pointer",
  },

  serviceImg: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    display: "block",
    background: "#f0f0f4",
  },

  serviceBody: {
    padding: "28px 28px 32px",
  },

  serviceTag: {
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#1246F6",
    marginBottom: 10,
    display: "block",
  },

  serviceTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#0d0d12",
    marginBottom: 10,
    letterSpacing: "-0.01em",
  },

  serviceDesc: {
    fontSize: "0.87rem",
    color: "#6b6b7b",
    lineHeight: 1.7,
  },

  /* About */
  aboutSection: {
    padding: "100px 48px",
    background: "#f7f7fa",
  },

  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
    alignItems: "center",
  },

  aboutImg: {
    width: "100%",
    height: 520,
    objectFit: "cover",
    borderRadius: 16,
    display: "block",
  },

  aboutPoints: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    marginTop: 40,
  },

  aboutPoint: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
  },

  pointNum: {
    fontFamily: "'Instrument Serif', Georgia, serif",
    fontSize: "1.1rem",
    color: "#1246F6",
    fontWeight: 400,
    minWidth: 28,
    lineHeight: 1.4,
  },

  pointText: {
    fontSize: "0.9rem",
    color: "#3a3a4a",
    lineHeight: 1.7,
  },

  pointTitle: {
    fontWeight: 700,
    color: "#0d0d12",
    display: "block",
    marginBottom: 4,
    fontSize: "0.92rem",
  },

  /* Process — dark section */
  processSection: {
    padding: "100px 48px",
    background: "#0d0d12",
  },

  processGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 1,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 64,
  },

  processStep: {
    padding: "44px 36px",
    background: "#0d0d12",
    transition: "background 0.2s",
  },

  processStepNum: {
    fontFamily: "'Instrument Serif', Georgia, serif",
    fontSize: "3rem",
    color: "rgba(255,255,255,0.06)",
    lineHeight: 1,
    marginBottom: 18,
    fontWeight: 400,
  },

  processStepTitle: {
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "#fff",
    marginBottom: 10,
    letterSpacing: "-0.01em",
  },

  processStepDesc: {
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.38)",
    lineHeight: 1.7,
  },

  /* Office image divider */
  dividerImg: {
    width: "100%",
    height: 420,
    objectFit: "cover",
    display: "block",
    filter: "brightness(0.7)",
  },

  dividerOverlay: {
    position: "relative",
    overflow: "hidden",
  },

  dividerText: {
    position: "absolute",
    bottom: 48,
    left: 80,
    right: 80,
    color: "#fff",
    zIndex: 2,
  },

  dividerQuote: {
    fontFamily: "'Instrument Serif', Georgia, serif",
    fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
    fontWeight: 400,
    lineHeight: 1.3,
    letterSpacing: "-0.015em",
    maxWidth: 640,
    fontStyle: "italic",
    color: "rgba(255,255,255,0.9)",
  },

  dividerCaption: {
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.45)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginTop: 16,
  },

  /* Contact */
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    gap: 80,
    alignItems: "start",
  },

  contactInfoTitle: {
    fontFamily: "'Instrument Serif', Georgia, serif",
    fontSize: "1.9rem",
    fontWeight: 400,
    color: "#0d0d12",
    letterSpacing: "-0.02em",
    marginBottom: 16,
    lineHeight: 1.2,
  },

  contactInfoBody: {
    color: "#6b6b7b",
    fontSize: "0.93rem",
    lineHeight: 1.78,
    marginBottom: 40,
    fontWeight: 300,
  },

  contactItems: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },

  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
  },

  ciIconBox: {
    width: 42, height: 42,
    background: "#f0f0f5",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  ciLabel: {
    fontSize: "0.68rem",
    color: "#9b9baa",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    marginBottom: 3,
    display: "block",
  },

  ciValue: {
    fontSize: "0.88rem",
    color: "#0d0d12",
    fontWeight: 500,
  },

  contactForm: {
    background: "#f7f7fa",
    border: "1px solid rgba(13,13,18,0.07)",
    borderRadius: 18,
    padding: "48px 44px",
  },

  formRow: { marginBottom: 20 },

  formLabel: {
    display: "block",
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#6b6b7b",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 8,
  },

  formInput: {
    width: "100%",
    background: "#fff",
    border: "1.5px solid rgba(13,13,18,0.08)",
    borderRadius: 10,
    padding: "13px 16px",
    fontFamily: "'Satoshi', sans-serif",
    fontSize: "0.92rem",
    color: "#0d0d12",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },

  formTextarea: {
    width: "100%",
    background: "#fff",
    border: "1.5px solid rgba(13,13,18,0.08)",
    borderRadius: 10,
    padding: "13px 16px",
    fontFamily: "'Satoshi', sans-serif",
    fontSize: "0.92rem",
    color: "#0d0d12",
    outline: "none",
    resize: "vertical",
    minHeight: 120,
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },

  formSelect: {
    width: "100%",
    background: "#fff",
    border: "1.5px solid rgba(13,13,18,0.08)",
    borderRadius: 10,
    padding: "13px 16px",
    fontFamily: "'Satoshi', sans-serif",
    fontSize: "0.92rem",
    color: "#0d0d12",
    outline: "none",
    appearance: "none",
    boxSizing: "border-box",
  },

  form2col: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },

  formSubmit: {
    background: "#0d0d12",
    color: "#fff",
    border: "none",
    padding: "15px 36px",
    borderRadius: 10,
    fontFamily: "'Satoshi', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.02em",
    width: "100%",
    marginTop: 8,
    transition: "background 0.2s, transform 0.15s",
  },

  /* WhatsApp */
  waFloat: {
    position: "fixed",
    bottom: 28,
    right: 28,
    zIndex: 200,
    width: 52, height: 52,
    background: "#25D366",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
    cursor: "pointer",
    textDecoration: "none",
    transition: "transform 0.2s",
  },

  /* Footer */
  footer: {
    background: "#0d0d12",
    padding: "64px 48px 32px",
  },

  footerTop: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
    gap: 48,
    marginBottom: 48,
  },

  footerLogo: {
    fontFamily: "'Instrument Serif', Georgia, serif",
    fontSize: "1.3rem",
    color: "#fff",
    display: "block",
    marginBottom: 14,
    fontWeight: 400,
    textDecoration: "none",
  },

  footerBrandText: {
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.3)",
    lineHeight: 1.75,
    maxWidth: 240,
  },

  footerColTitle: {
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.28)",
    marginBottom: 18,
  },

  footerList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  footerLink: {
    fontSize: "0.83rem",
    color: "rgba(255,255,255,0.45)",
    textDecoration: "none",
    transition: "color 0.18s",
    cursor: "pointer",
  },

  footerBottom: {
    borderTop: "1px solid rgba(255,255,255,0.06)",
    paddingTop: 24,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },

  footerCopy: {
    fontSize: "0.76rem",
    color: "rgba(255,255,255,0.22)",
  },
};

/* ── useScrollReveal hook ── */
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Reveal wrapper ── */
function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ── SectionLabel ── */
function SectionLabel({ children }) {
  return (
    <div style={S.label}>
      <span style={S.labelLine} />
      {children}
    </div>
  );
}

/* ── Topbar ── */
function Topbar() {
  return (
    <div style={S.topbar}>
      <span>info@mksolutions.co.ke</span>
      <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
      <span>+254 706 384 510</span>
      <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
      <span>Nairobi, Kenya</span>
    </div>
  );
}

/* ── Navbar ── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <>
      <nav style={S.nav}>
        <a href="#" style={S.logo}>
          MK<span style={S.logoAccent}>Solutions</span>
        </a>
        <ul style={{ ...S.navLinks, display: window.innerWidth < 900 ? "none" : "flex" }}>
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} style={S.navLink}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact"
          style={{ ...S.navCta, display: window.innerWidth < 900 ? "none" : "inline-block" }}
          onMouseOver={e => { e.target.style.background = "#1246F6"; e.target.style.transform = "translateY(-1px)"; }}
          onMouseOut={e => { e.target.style.background = "#0d0d12"; e.target.style.transform = ""; }}
        >
          Book Consultation
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{ display: window.innerWidth >= 900 ? "none" : "block", background: "none", border: "none", cursor: "pointer", padding: 4 }}
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open
              ? <path d="M4 4L18 18M18 4L4 18" stroke="#0d0d12" strokeWidth="1.8" strokeLinecap="round" />
              : <><path d="M3 6h16M3 11h16M3 16h16" stroke="#0d0d12" strokeWidth="1.8" strokeLinecap="round" /></>
            }
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0, zIndex: 99,
          background: "#fff", borderBottom: "1px solid rgba(13,13,18,0.08)",
          padding: "28px 32px 36px", display: "flex", flexDirection: "column", gap: 16,
          boxShadow: "0 24px 48px rgba(0,0,0,0.08)",
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href}
              onClick={() => setOpen(false)}
              style={{ fontSize: "1.05rem", color: "#0d0d12", textDecoration: "none", fontWeight: 500, padding: "10px 0", borderBottom: "1px solid rgba(13,13,18,0.06)" }}
            >{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}
            style={{ ...S.navCta, textAlign: "center", marginTop: 8, display: "block" }}
          >Book Consultation</a>
        </div>
      )}
    </>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section style={S.hero}>
      <div style={{ ...S.heroBg, backgroundImage: `url(${IMAGES.hero})` }} />
      <div style={S.heroOverlay} />
      <div style={S.heroContent}>
        <div style={S.heroEyebrow}>
          <span style={S.heroDot} />
          AI-First Digital Transformation
        </div>
        <h1 style={S.heroH1}>
          Build Smarter.<br />
          Automate Faster.<br />
          <em style={S.heroH1Em}>Grow Further.</em>
        </h1>
        <p style={S.heroSub}>
          MK Solutions helps African businesses harness the power of AI, automation, and data — delivering real results from day one.
        </p>
        <div style={S.heroActions}>
          <a href="#contact" style={S.btnPrimary}
            onMouseOver={e => { e.currentTarget.style.background = "#0037d0"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseOut={e => { e.currentTarget.style.background = "#1246F6"; e.currentTarget.style.transform = ""; }}
          >
            Book a Free Consultation
          </a>
          <a href="#services" style={S.btnGhost}
            onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "#fff"; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
          >
            Explore Services
          </a>
        </div>
        <div style={S.heroStats}>
          {[["500+", "Clients Served"], null, ["10+", "Years Experience"], null, ["20+", "Enterprise Solutions"], null, ["100%", "Client Satisfaction"]].map((s, i) =>
            s === null
              ? <div key={i} style={S.statLine} />
              : (
                <div key={i} style={S.heroStat}>
                  <span style={S.heroStatNum}>{s[0]}</span>
                  <span style={S.heroStatLabel}>{s[1]}</span>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Services ── */
const SERVICES = [
  {
    tag: "Artificial Intelligence",
    title: "AI & Automation",
    desc: "Deploy intelligent agents, automate repetitive workflows, and embed AI into your existing operations — saving hours every week.",
    img: IMAGES.ai,
  },
  {
    tag: "Training & Education",
    title: "AI Training",
    desc: "Hands-on workshops for teams and individuals — from AI fundamentals to advanced prompt engineering and enterprise tool adoption.",
    img: IMAGES.training,
  },
  {
    tag: "Digital Presence",
    title: "Website Creation",
    desc: "Fast, modern, conversion-focused websites and web applications — built for performance, SEO, and lasting brand credibility.",
    img: IMAGES.web,
  },
  {
    tag: "Intelligence",
    title: "Data Analytics",
    desc: "Transform raw data into clear business decisions — custom dashboards, forecasting models, and actionable reporting pipelines.",
    img: IMAGES.analytics,
  },
];

function Services() {
  return (
    <section id="services" style={{ ...S.section, background: "#f7f7fa" }}>
      <div style={S.container}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 56 }}>
            <div>
              <SectionLabel>Our Services</SectionLabel>
              <h2 style={S.sectionTitle}>Everything your business<br />needs to scale</h2>
            </div>
            <p style={{ ...S.sectionBody, maxWidth: 380, marginTop: 0 }}>
              From strategy to execution — full-stack digital solutions tailored to your goals and your market.
            </p>
          </div>
        </Reveal>

        <div style={S.servicesGrid}>
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 0.08}>
              <div
                style={S.serviceCard}
                onMouseOver={e => {
                  e.currentTarget.style.boxShadow = "0 20px 56px rgba(13,13,18,0.1)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.transform = "";
                }}
              >
                <img src={svc.img} alt={svc.title} style={S.serviceImg} loading="lazy" />
                <div style={S.serviceBody}>
                  <span style={S.serviceTag}>{svc.tag}</span>
                  <div style={S.serviceTitle}>{svc.title}</div>
                  <p style={S.serviceDesc}>{svc.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── About ── */
function About() {
  const points = [
    { n: "01", title: "We start with your business goals", desc: "Not the technology. Every engagement begins with understanding your operations and where the leverage points are." },
    { n: "02", title: "We deliver, then we train", desc: "Every solution is handed off with full team training — so adoption is guaranteed, not an afterthought." },
    { n: "03", title: "We stay as your long-term partner", desc: "No disappearing post-launch. We monitor, optimise, and scale alongside your growth." },
  ];

  return (
    <section id="about" style={S.aboutSection}>
      <div style={S.container}>
        <div style={S.aboutGrid}>
          <Reveal>
            <img src={IMAGES.team} alt="MK Solutions team" style={S.aboutImg} loading="lazy" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLabel>Who We Are</SectionLabel>
            <h2 style={S.sectionTitle}>Africa's trusted AI & digital transformation partner</h2>
            <p style={S.sectionBody}>
              MK Solutions is a Nairobi-based technology firm helping organisations across Africa adopt AI, streamline operations, and build digital infrastructure that lasts.
            </p>
            <div style={S.aboutPoints}>
              {points.map(p => (
                <div key={p.n} style={S.aboutPoint}>
                  <span style={S.pointNum}>{p.n}</span>
                  <div>
                    <span style={S.pointTitle}>{p.title}</span>
                    <span style={S.pointText}>{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 44 }}>
              <a href="#contact" style={{ ...S.btnPrimary, textDecoration: "none" }}
                onMouseOver={e => { e.currentTarget.style.background = "#0037d0"; }}
                onMouseOut={e => { e.currentTarget.style.background = "#1246F6"; }}
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

/* ── Process ── */
const STEPS = [
  { n: "01", title: "Discovery Call", desc: "We learn your business, pain points, and goals. Free consultation — no strings attached." },
  { n: "02", title: "Strategy & Scoping", desc: "Clear roadmap, deliverables, and timeline — transparent pricing, no surprises." },
  { n: "03", title: "Build & Iterate", desc: "Agile delivery with weekly check-ins. You see progress continuously, not just at the end." },
  { n: "04", title: "Launch & Train", desc: "We deploy, train your team, and ensure adoption — so results follow the rollout." },
  { n: "05", title: "Ongoing Support", desc: "Monitoring, optimisation, and scaling. We're your long-term partner, not a one-off vendor." },
];

function Process() {
  return (
    <section id="process" style={S.processSection}>
      <div style={S.container}>
        <Reveal>
          <div style={{ ...S.label, color: "rgba(255,255,255,0.35)" }}>
            <span style={{ ...S.labelLine, background: "rgba(255,255,255,0.2)" }} />
            How We Work
          </div>
          <h2 style={{ ...S.sectionTitle, color: "#fff" }}>
            From first call to full<br />deployment — fast
          </h2>
        </Reveal>

        <div style={S.processGrid}>
          {STEPS.map((s, i) => (
            <div key={s.n} style={S.processStep}
              onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
              onMouseOut={e => e.currentTarget.style.background = "#0d0d12"}
            >
              <div style={S.processStepNum}>{s.n}</div>
              <div style={S.processStepTitle}>{s.title}</div>
              <p style={S.processStepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Divider Quote ── */
function FullWidthDivider() {
  return (
    <div style={S.dividerOverlay}>
      <img src={IMAGES.office} alt="MK Solutions office" style={S.dividerImg} loading="lazy" />
      <div style={{ position: "absolute", inset: 0, background: "rgba(13,13,18,0.55)" }} />
      <div style={S.dividerText}>
        <p style={S.dividerQuote}>
          "We don't just implement technology — we transform the way your organisation thinks and operates."
        </p>
        <p style={S.dividerCaption}>MK Solutions — Nairobi, Kenya</p>
      </div>
    </div>
  );
}

/* ── Contact ── */
function Contact() {
  const [sent, setSent] = useState(false);

  const contactItems = [
    { icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1246F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ), label: "Location", value: "Nairobi, Kenya" },
    { icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1246F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
        </svg>
      ), label: "Phone / WhatsApp", value: "+254 706 384 510" },
    { icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1246F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ), label: "Email", value: "info@mksolutions.co.ke" },
    { icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1246F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ), label: "Business Hours", value: "Mon – Fri, 8AM – 6PM EAT" },
  ];

  return (
    <section id="contact" style={{ ...S.section, background: "#fff" }}>
      <div style={S.container}>
        <Reveal>
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 style={{ ...S.sectionTitle, marginBottom: 56 }}>Ready to transform<br />your business?</h2>
        </Reveal>

        <div style={S.contactGrid}>
          <Reveal>
            <p style={S.contactInfoBody}>
              Whether you want to explore AI for your team, automate your workflows, build a new website, or unlock your data — we are ready to help. Let's start with a conversation.
            </p>
            <div style={S.contactItems}>
              {contactItems.map(ci => (
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
                    onFocus={e => e.target.style.borderColor = "#1246F6"}
                    onBlur={e => e.target.style.borderColor = "rgba(13,13,18,0.08)"}
                  />
                </div>
                <div style={S.formRow}>
                  <label style={S.formLabel}>Last Name</label>
                  <input style={S.formInput} type="text" placeholder="Doe"
                    onFocus={e => e.target.style.borderColor = "#1246F6"}
                    onBlur={e => e.target.style.borderColor = "rgba(13,13,18,0.08)"}
                  />
                </div>
              </div>
              <div style={S.formRow}>
                <label style={S.formLabel}>Email Address</label>
                <input style={S.formInput} type="email" placeholder="john@company.com"
                  onFocus={e => e.target.style.borderColor = "#1246F6"}
                  onBlur={e => e.target.style.borderColor = "rgba(13,13,18,0.08)"}
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
                  onFocus={e => e.target.style.borderColor = "#1246F6"}
                  onBlur={e => e.target.style.borderColor = "rgba(13,13,18,0.08)"}
                />
              </div>
              <button
                style={{ ...S.formSubmit, background: sent ? "#16a34a" : "#0d0d12" }}
                onMouseOver={e => { if (!sent) e.currentTarget.style.background = "#1246F6"; }}
                onMouseOut={e => { if (!sent) e.currentTarget.style.background = "#0d0d12"; }}
                onClick={() => { setSent(true); setTimeout(() => setSent(false), 3000); }}
              >
                {sent ? "Message Sent" : "Send Message"}
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Map */}
      <div style={{ maxWidth: 1160, margin: "64px auto 0", padding: "0 0" }}>
        <iframe
          title="MK Solutions Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.853898546794!2d36.801161674879594!3d-1.259804998728201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f176ab788de03%3A0x6ce6930ee66eeb8c!2sThe%20Westwood!5e0!3m2!1sen!2ske!4v1752008415264!5m2!1sen!2ske"
          width="100%" height="280"
          style={{ border: "1px solid rgba(13,13,18,0.08)", borderRadius: 16, display: "block" }}
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer style={S.footer}>
      <div style={S.container}>
        <div style={S.footerTop}>
          <div>
            <span style={S.footerLogo}>MK<span style={{ color: "#1246F6" }}>Solutions</span></span>
            <p style={S.footerBrandText}>
              Helping African businesses grow through AI, automation, and intelligent digital solutions.
            </p>
          </div>
          {[
            { title: "Services", links: ["AI & Automation", "AI Training", "Website Creation", "Data Analytics"] },
            { title: "Company", links: ["About Us", "How We Work", "Contact"] },
            { title: "Connect", links: ["info@mksolutions.co.ke", "+254 706 384 510", "WhatsApp Us"] },
          ].map(col => (
            <div key={col.title}>
              <div style={S.footerColTitle}>{col.title}</div>
              <ul style={S.footerList}>
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" style={S.footerLink}
                      onMouseOver={e => e.target.style.color = "rgba(255,255,255,0.85)"}
                      onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.45)"}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={S.footerBottom}>
          <p style={S.footerCopy}>© 2025 MK Solutions Limited. All rights reserved.</p>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="#" style={S.footerLink}>Privacy Policy</a>
            <a href="#" style={S.footerLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── WhatsApp Float ── */
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/254706384510?text=Hello%21%20I%27m%20interested%20in%20your%20services."
      target="_blank" rel="noopener noreferrer"
      style={S.waFloat}
      onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
      aria-label="Chat on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M12.04 2.01A10 10 0 0 0 2 12.06a9.84 9.84 0 0 0 1.37 5.09L2 22l5.07-1.33a9.95 9.95 0 0 0 4.96 1.28H12A10 10 0 0 0 12.04 2zM12 20.08a8.07 8.07 0 0 1-4.1-1.13l-.3-.17-3.02.79.8-2.94-.2-.31a8.04 8.04 0 1 1 14.9-4.27 8.03 8.03 0 0 1-8.08 8.03zm4.62-6.03c-.26-.13-1.5-.74-1.73-.83s-.4-.13-.57.13-.66.83-.81 1-.3.2-.56.07a6.6 6.6 0 0 1-1.94-1.2 7.4 7.4 0 0 1-1.37-1.7c-.14-.26 0-.4.12-.53s.26-.3.4-.45c.14-.15.2-.26.3-.43a.5.5 0 0 0-.02-.48c-.07-.14-.57-1.37-.78-1.87s-.4-.42-.56-.43h-.48a.92.92 0 0 0-.67.31 2.78 2.78 0 0 0-.86 2.06c0 1.22.87 2.4 1 2.57.13.17 1.7 2.6 4.13 3.64.58.25 1.04.4 1.4.51a3.35 3.35 0 0 0 1.56.1 2.66 2.66 0 0 0 1.75-1.22c.22-.3.22-.54.16-.74s-.24-.17-.5-.3z"/>
      </svg>
    </a>
  );
}

/* ── App Root ── */
export default function App() {
  return (
    <div style={S.root}>
      <Topbar />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Process />
      <FullWidthDivider />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
