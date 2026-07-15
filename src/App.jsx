import { useState, useEffect, useRef, createContext, useContext } from "react";
import { FONTS, LIGHT, DARK } from "./theme.js";
import {
  INFO, NEWS, EVENTOS, MINS, GROUPS, DAY_COLORS,
  SERMONS, TEAM, TESTIMONIOS, CHECKS,
} from "./data.js";

// ═══════════════════════════════════════════════════════════════════════════════
//  TEMA — contexto global
// ═══════════════════════════════════════════════════════════════════════════════
const ThemeCtx = createContext({ C: LIGHT, isDark: false, toggle: () => { } });
const useC = () => useContext(ThemeCtx).C;
const useTheme = () => useContext(ThemeCtx);

// ─── CSS Global ─────────────────────────────────────────────────────────────────
const GlobalStyles = ({ isDark }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@400;500;600;700;800&family=Lato:ital,wght@0,300;0,400;0,700;1,300&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    html {
      scroll-behavior: smooth;
      /* Desactiva el filtro de modo oscuro forzado del navegador/SO.
         La página maneja su propio tema con el toggle. */
      color-scheme: ${isDark ? "dark" : "light"};
    }
    body {
      margin: 0;
      overflow-x: hidden;
      background: ${isDark ? DARK.bg : LIGHT.bg};
      font-family: ${FONTS.body};
      -webkit-font-smoothing: antialiased;
      transition: background .35s ease, color .35s ease;
    }
    a { text-decoration: none; color: inherit; }
    button { cursor: pointer; font-family: inherit; }
    img { display: block; }

    @keyframes hUp    { from { opacity:0; transform:translateY(22px) } to { opacity:1; transform:translateY(0) } }
    @keyframes hIn    { from { opacity:0 } to { opacity:1 } }
    @keyframes pulse  { 0%,100% { transform:scaleY(1); opacity:.5 } 50% { transform:scaleY(1.4); opacity:1 } }
    @keyframes floatIn{ from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }

    .ham-btn   { display:none!important; background:none; border:none; flex-direction:column; gap:5px; padding:4px; }
    .desk-nav  { display:flex; align-items:center; gap:1.75rem; }
    .mob-cta   { display:none; }

    @media(max-width:900px){
      .ham-btn  { display:flex!important; }
      .desk-nav { display:none!important; }
      .mob-cta  { display:flex!important; }
    }

    ::-webkit-scrollbar       { width:5px }
    ::-webkit-scrollbar-track { background:${isDark ? DARK.bg : LIGHT.bg} }
    ::-webkit-scrollbar-thumb { background:${isDark ? DARK.teal : LIGHT.teal}; border-radius:3px }

    :focus-visible { outline:2px solid ${isDark ? DARK.tealLight : LIGHT.tealLight}; outline-offset:3px; border-radius:4px; }

    input, textarea {
      font-family: ${FONTS.body};
      transition: border-color .2s;
    }
    input::placeholder, textarea::placeholder { opacity: .5; }
  `}</style>
);

// ─── Scroll Reveal ───────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

const Reveal = ({ children, delay = 0, style = {} }) => {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(24px)",
      transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`,
      ...style
    }}>{children}</div>
  );
};

// ─── Componentes base ────────────────────────────────────────────────────────────
const SectionLabel = ({ children }) => {
  const C = useC();
  return (
    <div style={{
      fontFamily: FONTS.ui, fontWeight: 600, fontSize: ".68rem",
      letterSpacing: ".22em", textTransform: "uppercase",
      color: C.tealLight, marginBottom: ".75rem"
    }}>{children}</div>
  );
};

const SectionTitle = ({ children, style = {} }) => {
  const C = useC();
  return (
    <h2 style={{
      fontFamily: FONTS.title, fontWeight: 600,
      fontSize: "clamp(2rem,4vw,3rem)", color: C.text, margin: "0 0 .75rem", ...style
    }}>
      {children}
    </h2>
  );
};

const Logo = ({ sz = 38, variant = "nav" }) => {
  const C = useC();
  if (variant === "standalone") {
    return (
      <img src="/logo.jpeg" alt="REDIME — Comunidad de la Gracia"
        style={{ width: sz * 2.8 + "px", height: "auto", display: "block" }} />
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{
        width: sz + "px", height: sz + "px", borderRadius: "50%", overflow: "hidden",
        flexShrink: 0, background: "#fff", boxShadow: "0 0 0 1.5px rgba(29,61,86,.2)"
      }}>
        <img src="/logo.jpeg" alt="REDIME logo"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
      </div>
      <div>
        <div style={{
          fontFamily: FONTS.ui, fontWeight: 800, fontSize: sz * .42 + "px",
          letterSpacing: ".07em", lineHeight: 1.1, color: C.text
        }}>REDIME</div>
        <div style={{
          fontFamily: FONTS.ui, fontWeight: 500, fontSize: sz * .21 + "px",
          letterSpacing: ".14em", lineHeight: 1.2, color: C.dim
        }}>COMUNIDAD DE LA GRACIA</div>
      </div>
    </div>
  );
};

const BtnPrimary = ({ children, onClick, style = {} }) => {
  const C = useC();
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.orangeHot : C.orange, border: "none", color: "#fff",
        fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".75rem", letterSpacing: ".1em",
        textTransform: "uppercase", padding: "12px 26px", borderRadius: "5px",
        transition: "background .2s, transform .2s", transform: hov ? "translateY(-1px)" : "none", ...style
      }}>
      {children}
    </button>
  );
};

const BtnOutline = ({ children, onClick, style = {} }) => {
  const C = useC();
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: "transparent",
        border: `1px solid ${hov ? C.tealLight : C.border}`,
        color: hov ? C.tealLight : C.text,
        fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".75rem", letterSpacing: ".1em",
        textTransform: "uppercase", padding: "12px 26px", borderRadius: "5px",
        transition: "all .25s", ...style
      }}>
      {children}
    </button>
  );
};

// ─── Toggle oscuro/claro ──────────────────────────────────────────────────────────
const ThemeToggle = () => {
  const { C, isDark, toggle } = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span style={{ fontSize: ".8rem", lineHeight: 1, opacity: .7 }}>
        {isDark ? "🌙" : "☀️"}
      </span>
      <button
        onClick={toggle}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        title={isDark ? "Modo claro" : "Modo oscuro"}
        style={{
          width: "36px", height: "20px", borderRadius: "10px",
          background: isDark ? C.tealLight : C.s3,
          border: `1px solid ${C.border}`,
          position: "relative", transition: "background .3s",
          flexShrink: 0, padding: 0,
          boxShadow: hov ? `0 0 0 3px ${C.tealLight}30` : "none"
        }}
      >
        <div style={{
          position: "absolute", top: "2px",
          left: isDark ? "18px" : "2px",
          width: "14px", height: "14px", borderRadius: "50%",
          background: isDark ? "#fff" : C.teal,
          transition: "left .25s ease, background .3s",
          boxShadow: "0 1px 4px rgba(0,0,0,.25)"
        }} />
      </button>
    </div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Inicio", id: "inicio" },
  { label: "Nosotros", id: "nosotros" },
  { label: "Novedades", id: "novedades" },
  { label: "Ministerios", id: "ministerios" },
  { label: "Grupos", id: "grupos" },
  { label: "Predicaciones", id: "predicaciones" },
  { label: "Contacto", id: "contacto" },
];

const Navbar = () => {
  const { C, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = id => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(1.25rem,5vw,3rem)",
        height: scrolled ? "62px" : "78px",
        background: scrolled ? C.navBg : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.6)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.6)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "height .4s ease, background .4s ease, box-shadow .4s ease",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.04)" : "none"
      }}>

        <button onClick={() => go("inicio")} style={{ background: "none", border: "none", padding: 0 }}>
          <Logo sz={34} />
        </button>

        <div className="desk-nav" style={{ alignItems: "center", gap: "1.5rem" }}>
          {NAV_ITEMS.map(({ label, id }) => (
            <button key={id} onClick={() => go(id)} style={{
              background: "none", border: "none", fontFamily: FONTS.ui, fontWeight: 500,
              fontSize: ".78rem", letterSpacing: ".05em", color: C.dim, transition: "color .2s", padding: "4px 0"
            }}
              onMouseEnter={e => e.target.style.color = C.text}
              onMouseLeave={e => e.target.style.color = C.dim}
            >{label}</button>
          ))}
          <ThemeToggle />
          <BtnPrimary onClick={() => go("contacto")} style={{ padding: "9px 18px", fontSize: ".72rem" }}>
            Visitanos
          </BtnPrimary>
        </div>

        {/* Mobile: solo hamburger */}
        <button className="ham-btn" onClick={() => setOpen(o => !o)} aria-label="Abrir menú">
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: "22px", height: "2px",
              background: C.text, borderRadius: "2px", transition: "all .3s",
              transform: open ? i === 0 ? "rotate(45deg) translateY(7px)" : i === 2 ? "rotate(-45deg) translateY(-7px)" : "none" : "none",
              opacity: open && i === 1 ? 0 : 1
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 999, background: C.bg,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: "1.75rem",
        opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none", transition: "opacity .3s"
      }}>
        <Logo sz={44} />
        {NAV_ITEMS.map(({ label, id }) => (
          <button key={id} onClick={() => go(id)} style={{
            background: "none", border: "none",
            fontFamily: FONTS.title, fontWeight: 600, fontSize: "2rem", color: C.text
          }}>
            {label}
          </button>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginTop: ".25rem" }}>
          <span style={{ fontFamily: FONTS.ui, fontSize: ".72rem", color: C.dim }}>
            {isDark ? "Modo oscuro" : "Modo claro"}
          </span>
          <ThemeToggle />
        </div>
        <BtnPrimary onClick={() => go("contacto")} style={{ marginTop: ".25rem" }}>Visitanos</BtnPrimary>
      </div>
    </>
  );
};

// ─── CTA flotante móvil ───────────────────────────────────────────────────────────
const MobileCTA = () => {
  const C = useC();
  return (
    <div className="mob-cta" style={{
      position: "fixed", bottom: "1.25rem", left: "50%",
      transform: "translateX(-50%)", zIndex: 990, display: "flex", gap: ".65rem",
      animation: "floatIn .6s ease .4s both"
    }}>
      <button onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".72rem", letterSpacing: ".08em",
          textTransform: "uppercase", color: C.text,
          padding: "11px 18px", borderRadius: "30px",
          background: C.s1, border: `1px solid ${C.border}`,
          boxShadow: C.shadow, backdropFilter: "blur(12px)"
        }}>
        📍 Cómo llegar
      </button>
      {INFO.whatsapp && (
        <a href={INFO.whatsapp} target="_blank" rel="noopener"
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".72rem", letterSpacing: ".08em",
            textTransform: "uppercase", color: "#fff",
            padding: "11px 18px", borderRadius: "30px",
            background: C.orange, boxShadow: C.shadow
          }}>
          💬 WhatsApp
        </a>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  SECCIONES
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Hero ──────────────────────────────────────────────────────────────────────
// Foto: copiá tu imagen a /public/hero.jpg
const Hero = () => {
  const C = useC();
  return (
    <section id="inicio" style={{
      position: "relative", height: "100svh", minHeight: "580px",
      display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden"
    }}>

      {/* Foto de fondo */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(/hero.jpeg)",
        backgroundSize: "cover", backgroundPosition: "center 30%",
        filter: "brightness(.45) saturate(.55)"
      }} />

      {/* Overlay cinematográfico: oscuro uniforme con gradiente descendente */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(10,16,22,0.30) 0%, rgba(10,16,22,0.10) 40%, rgba(10,16,22,0.72) 100%)"
      }} />

      {/* Línea de acento izquierda */}
      <div style={{
        position: "absolute", left: 0, top: "18%", bottom: "18%", width: "2px",
        background: `linear-gradient(to bottom,transparent,${C.tealLight}70,transparent)`,
        opacity: .7
      }} />

      <div style={{
        position: "relative", zIndex: 2, textAlign: "center",
        padding: "0 clamp(1.5rem,8vw,5rem)", maxWidth: "820px"
      }}>

        {/* Eyebrow */}
        <div style={{
          fontFamily: FONTS.ui, fontWeight: 400, fontSize: ".65rem",
          letterSpacing: ".32em", textTransform: "uppercase",
          color: "rgba(180,220,228,0.85)",   // teal muy suave, no chilla
          marginBottom: "1.75rem",
          opacity: 0, animation: "hUp .8s ease .3s forwards"
        }}>
          Córdoba · Argentina
        </div>

        {/* Título — blanco ligeramente suavizado */}
        <h1 style={{
          fontFamily: FONTS.title, fontWeight: 600,
          fontSize: "clamp(2rem,5vw,4.2rem)", lineHeight: 1.22,
          color: "rgba(238,242,246,0.95)",   // blanco suave, no puro
          margin: "0 0 1.6rem",
          textShadow: "0 2px 24px rgba(0,0,0,0.3)",
          opacity: 0, animation: "hUp .9s ease .5s forwards"
        }}>
          Conocer a Cristo.<br />
          <em style={{ fontStyle: "italic", color: "rgba(110,200,215,0.90)" }}>
            Crecer en Su Palabra.
          </em><br />
          Vivir en comunidad.
        </h1>

        {/* Subtítulo */}
        <p style={{
          fontFamily: FONTS.body, fontWeight: 300,
          fontSize: "clamp(.9rem,1.7vw,1.05rem)", lineHeight: 1.8,
          color: "rgba(200,215,225,0.72)",   // muy suave, segunda jerarquía clara
          maxWidth: "480px", margin: "0 auto 3rem", letterSpacing: ".01em",
          opacity: 0, animation: "hUp .9s ease .7s forwards"
        }}>
          Una comunidad centrada en Cristo, la gracia y la enseñanza bíblica.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap",
          opacity: 0, animation: "hUp .9s ease .9s forwards"
        }}>
          <BtnPrimary onClick={() => document.getElementById("nosotros")?.scrollIntoView({ behavior: "smooth" })}>
            Ver horarios
          </BtnPrimary>
          <button
            onClick={() => document.getElementById("grupos")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "rgba(230,238,244,0.90)",
              fontFamily: FONTS.ui, fontWeight: 600, fontSize: ".75rem",
              letterSpacing: ".1em", textTransform: "uppercase", padding: "12px 26px",
              borderRadius: "5px", transition: "all .3s",
              backdropFilter: "blur(8px)"
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(110,200,215,0.55)"; e.currentTarget.style.color = "rgba(110,200,215,0.95)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "rgba(230,238,244,0.90)"; }}>
            Grupos pequeños
          </button>
          <button
            onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "rgba(230,238,244,0.90)",
              fontFamily: FONTS.ui, fontWeight: 600, fontSize: ".75rem",
              letterSpacing: ".1em", textTransform: "uppercase", padding: "12px 26px",
              borderRadius: "5px", transition: "all .3s",
              backdropFilter: "blur(8px)"
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(110,200,215,0.55)"; e.currentTarget.style.color = "rgba(110,200,215,0.95)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "rgba(230,238,244,0.90)"; }}>
            Cómo llegar
          </button>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
        opacity: 0, animation: "hIn 1s ease 1.6s forwards"
      }}>
        <div style={{
          width: "1px", height: "40px", margin: "0 auto",
          background: `linear-gradient(to bottom,transparent,rgba(110,200,215,0.6))`,
          animation: "pulse 2.5s ease infinite"
        }} />
      </div>
    </section>
  );
};

// ─── Info rápida ──────────────────────────────────────────────────────────────────
const InfoCard = ({ icon, title, children, cta, ctaHref, delay = 0 }) => {
  const C = useC();
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay} style={{ flex: "1 1 250px" }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? C.s3 : C.s2, border: `1px solid ${hov ? C.tealLight + "40" : C.border}`,
          borderRadius: "12px", padding: "1.75rem 1.5rem", height: "100%",
          transition: "all .3s", transform: hov ? "translateY(-4px)" : "none",
          boxShadow: hov ? C.shadow : "none"
        }}>
        <div style={{
          width: "42px", height: "42px", borderRadius: "9px",
          background: C.s3, border: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.2rem", marginBottom: "1.2rem"
        }}>{icon}</div>
        <h3 style={{
          fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".82rem",
          letterSpacing: ".1em", textTransform: "uppercase", color: C.tealLight, marginBottom: ".65rem"
        }}>{title}</h3>
        <div style={{
          fontFamily: FONTS.body, fontWeight: 300, fontSize: ".9rem",
          color: C.dim, lineHeight: 1.65
        }}>{children}</div>
        {cta && (
          <a href={ctaHref} target="_blank" rel="noopener" style={{
            display: "inline-block",
            marginTop: "1.1rem", fontFamily: FONTS.ui, fontWeight: 600, fontSize: ".72rem",
            letterSpacing: ".1em", textTransform: "uppercase", color: C.orange, transition: "letter-spacing .2s"
          }}
            onMouseEnter={e => e.target.style.letterSpacing = ".15em"}
            onMouseLeave={e => e.target.style.letterSpacing = ".1em"}
          >{cta} →</a>
        )}
      </div>
    </Reveal>
  );
};

const QuickInfo = () => {
  const C = useC();
  return (
    <section id="nosotros" style={{ background: C.s1, padding: "4.5rem clamp(1.5rem,8vw,5rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <InfoCard icon="📍" title="Ubicación" delay={0} cta="Ver en mapa" ctaHref={INFO.mapsUrl}>
          <strong style={{ color: C.text, fontWeight: 700 }}>{INFO.direccion}</strong><br />{INFO.ciudad}
        </InfoCard>
        <InfoCard icon="🕐" title="Horarios" delay={.12}>
          <strong style={{ color: C.text, fontWeight: 700 }}>{INFO.horario}</strong><br />
          Culto principal<br /><br />
          <strong style={{ color: C.text, fontWeight: 700 }}>Entre semana</strong><br />
          Grupos pequeños por zona
        </InfoCard>
        <InfoCard icon="✝" title="Nuestra identidad" delay={.24}>
          Somos una iglesia evangélica bautista enfocada en la enseñanza bíblica,
          la comunidad y el evangelio de Jesucristo.
        </InfoCard>
      </div>
    </section>
  );
};

// ─── Primera vez ──────────────────────────────────────────────────────────────────
const PrimeraVez = () => {
  const C = useC();
  return (
    <section style={{ background: C.bg, padding: "6rem clamp(1.5rem,8vw,5rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "3rem", alignItems: "center" }}>
          <Reveal>
            <SectionLabel>Tu primera visita</SectionLabel>
            <h2 style={{
              fontFamily: FONTS.title, fontWeight: 600,
              fontSize: "clamp(2rem,4vw,3rem)", color: C.text, lineHeight: 1.1, marginBottom: "1rem"
            }}>
              ¿Nunca viniste?<br />
              <em style={{ color: C.tealLight, fontStyle: "italic" }}>Bienvenido/a.</em>
            </h2>
            <p style={{
              fontFamily: FONTS.body, fontWeight: 300, fontSize: ".95rem",
              color: C.dim, lineHeight: 1.7, maxWidth: "380px", margin: "0 0 1.75rem"
            }}>
              Sabemos que entrar a una iglesia por primera vez puede generar dudas.
              Acá te contamos qué esperar para que llegues tranquilo/a.
            </p>
            <BtnOutline onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}>
              Cómo llegar →
            </BtnOutline>
          </Reveal>
          <Reveal delay={.15}>
            <div style={{
              background: C.s1, border: `1px solid ${C.border}`, borderRadius: "16px",
              padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem",
              boxShadow: C.shadow
            }}>
              {CHECKS.map((txt, i) => (
                <div key={i} style={{ display: "flex", gap: ".9rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                    background: C.tealLight + "20", border: `1px solid ${C.tealLight}40`,
                    display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px"
                  }}>
                    <span style={{ color: C.tealLight, fontSize: ".7rem", fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{
                    fontFamily: FONTS.body, fontWeight: 300, fontSize: ".92rem",
                    color: C.text, lineHeight: 1.55
                  }}>{txt}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ─── Misión y Visión ──────────────────────────────────────────────────────────────
const MissionVision = () => {
  const C = useC();
  return (
    <section style={{ background: C.s1, padding: "6rem clamp(1.5rem,8vw,5rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <SectionLabel>¿Quiénes somos?</SectionLabel>
          <SectionTitle>Misión &amp; Visión</SectionTitle>
        </div></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "2rem" }}>
          <Reveal delay={.1}>
            <div style={{
              position: "relative", overflow: "hidden",
              background: C.teal, border: `1px solid ${C.tealLight}30`,
              borderRadius: "16px", padding: "2.5rem", minHeight: "300px"
            }}>
              <div style={{
                position: "absolute", top: "-50px", right: "-50px", width: "180px", height: "180px",
                borderRadius: "50%", background: `radial-gradient(circle,#fff1,transparent 70%)`
              }} />
              <div style={{
                position: "absolute", bottom: "-40px", left: "-40px", width: "140px", height: "140px",
                borderRadius: "50%", background: `radial-gradient(circle,${C.orange}20,transparent 70%)`
              }} />
              <div style={{
                fontFamily: FONTS.ui, fontWeight: 600, fontSize: ".68rem",
                letterSpacing: ".22em", textTransform: "uppercase", color: C.tealLight, marginBottom: "1.2rem",
                filter: "brightness(1.8)"
              }}>Misión</div>
              <h3 style={{
                fontFamily: FONTS.title, fontWeight: 600, fontSize: "1.8rem",
                color: "#fff", marginBottom: "1.4rem", lineHeight: 1.2
              }}>¿Por qué existimos?</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".8rem" }}>
                {["Conectar a las personas con Dios y con los demás.",
                  "Crecer en el conocimiento de Su Palabra.",
                  "Compartir la buena noticia de Jesucristo viviendo en comunidad."
                ].map(t => (
                  <li key={t} style={{
                    display: "flex", gap: ".75rem", alignItems: "flex-start",
                    fontFamily: FONTS.body, fontWeight: 300, fontSize: ".92rem",
                    color: "rgba(255,255,255,.85)", lineHeight: 1.55
                  }}>
                    <span style={{ color: C.tealLight, filter: "brightness(1.6)", marginTop: "1px", flexShrink: 0, fontWeight: 700 }}>—</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={.22}>
            <div style={{
              position: "relative", overflow: "hidden",
              background: C.s2, border: `1px solid ${C.border}`,
              borderRadius: "16px", padding: "2.5rem", minHeight: "300px",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              boxShadow: C.shadow
            }}>
              <div style={{
                position: "absolute", top: "-30px", left: "50%", transform: "translateX(-50%)",
                width: "220px", height: "220px", borderRadius: "50%",
                background: `radial-gradient(circle,${C.orange}15,transparent 65%)`
              }} />
              <div>
                <div style={{
                  fontFamily: FONTS.ui, fontWeight: 600, fontSize: ".68rem",
                  letterSpacing: ".22em", textTransform: "uppercase", color: C.tealLight, marginBottom: "1.2rem"
                }}>Visión</div>
                <h3 style={{
                  fontFamily: FONTS.title, fontWeight: 600, fontSize: "1.8rem",
                  color: C.text, marginBottom: "1.5rem", lineHeight: 1.2
                }}>¿Hacia dónde vamos?</h3>
              </div>
              <blockquote style={{
                fontFamily: FONTS.title, fontStyle: "italic", fontSize: "1.35rem",
                color: C.text, lineHeight: 1.6, borderLeft: `3px solid ${C.orange}`,
                paddingLeft: "1.25rem", margin: 0
              }}>
                "Ser una iglesia unida que conoce profundamente a Cristo, crece a Su imagen y se edifica en amor."
              </blockquote>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ─── Testimonios ──────────────────────────────────────────────────────────────────
const Testimonios = () => {
  const C = useC();
  return (
    <section style={{ background: C.bg, padding: "6rem clamp(1.5rem,8vw,5rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <SectionLabel>La comunidad habla</SectionLabel>
          <SectionTitle>Testimonios</SectionTitle>
        </div></Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
          {TESTIMONIOS.map((t, i) => (
            <Reveal key={i} delay={i * .12} style={{ flex: "1 1 270px" }}>
              <div style={{
                background: C.s1, border: `1px solid ${C.border}`,
                borderRadius: "14px", padding: "2rem", position: "relative", height: "100%",
                boxShadow: C.shadow
              }}>
                <div style={{
                  fontSize: "2.8rem", lineHeight: 1, color: C.tealLight + "30",
                  fontFamily: "Georgia,serif", position: "absolute", top: "1rem", left: "1.4rem",
                  userSelect: "none"
                }}>"</div>
                <blockquote style={{
                  fontFamily: FONTS.title, fontStyle: "italic", fontSize: "1.15rem",
                  color: C.text, lineHeight: 1.65, margin: "1.5rem 0", padding: 0
                }}>
                  {t.quote}
                </blockquote>
                <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: C.tealLight + "20", border: `1px solid ${C.tealLight}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".78rem", color: C.tealLight
                  }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontFamily: FONTS.ui, fontWeight: 600, fontSize: ".8rem", color: C.text }}>{t.name}</div>
                    <div style={{ fontFamily: FONTS.body, fontSize: ".75rem", color: C.dim }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Novedades + Calendario ────────────────────────────────────────────────────────
const TAG_COLORS_NEWS = { "Evento": "#e06a36", "Anuncio": "#1a7080", "Serie": "#2d8a5e", "Retiro": "#a07830", "Comunidad": "#7050b0", default: "#4a6070" };

const NewsCard = ({ tag, date, title, desc, link, delay }) => {
  const C = useC();
  const [hov, setHov] = useState(false);
  const col = TAG_COLORS_NEWS[tag] || TAG_COLORS_NEWS.default;
  return (
    <Reveal delay={delay} style={{ flex: "1 1 290px" }}>
      <a href={link} target={link === "#" ? "_self" : "_blank"} rel="noopener" style={{ display: "block", height: "100%" }}>
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
          style={{
            background: hov ? C.s3 : C.s2, border: `1px solid ${hov ? col + "45" : C.border}`,
            borderRadius: "12px", padding: "1.65rem", height: "100%",
            transition: "all .3s", transform: hov ? "translateY(-4px)" : "none",
            boxShadow: hov ? C.shadow : "none",
            display: "flex", flexDirection: "column", gap: ".75rem"
          }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{
              fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".6rem",
              letterSpacing: ".15em", textTransform: "uppercase", color: col,
              background: col + "15", border: `1px solid ${col}30`,
              padding: "3px 9px", borderRadius: "20px"
            }}>{tag}</span>
            {date && <span style={{ fontFamily: FONTS.body, fontSize: ".8rem", color: C.dim }}>{date}</span>}
          </div>
          <h3 style={{
            fontFamily: FONTS.title, fontWeight: 600, fontSize: "1.3rem",
            color: C.text, margin: 0, lineHeight: 1.25
          }}>{title}</h3>
          <p style={{
            fontFamily: FONTS.body, fontWeight: 300, fontSize: ".88rem",
            color: C.dim, lineHeight: 1.6, margin: 0, flex: 1
          }}>{desc}</p>
          <div style={{
            fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".7rem",
            letterSpacing: ".12em", textTransform: "uppercase",
            color: hov ? col : C.dim, transition: "color .25s"
          }}>Ver más →</div>
        </div>
      </a>
    </Reveal>
  );
};

const Novedades = () => {
  const C = useC();
  return (
    <>
      <section id="novedades" style={{ background: C.s1, padding: "6rem clamp(1.5rem,8vw,5rem) 3rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem"
            }}>
              <div>
                <SectionLabel>Comunidad</SectionLabel>
                <SectionTitle>Novedades</SectionTitle>
                <p style={{
                  fontFamily: FONTS.body, fontWeight: 300, fontSize: ".95rem",
                  color: C.dim, maxWidth: "420px", margin: 0
                }}>
                  Eventos, anuncios y lo que está pasando en la comunidad.
                </p>
              </div>
              <a href={INFO.instagram} target="_blank" rel="noopener"
                style={{
                  fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".74rem",
                  letterSpacing: ".1em", textTransform: "uppercase", color: C.text,
                  padding: "9px 20px", borderRadius: "5px", border: `1px solid ${C.border}`,
                  display: "inline-flex", alignItems: "center", gap: "7px", transition: "all .25s"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#e1306c"; e.currentTarget.style.color = "#e1306c"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
              >📸 Ver Instagram</a>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.1rem" }}>
            {NEWS.map((n, i) => <NewsCard key={n.title} {...n} delay={i * .1} />)}
          </div>
        </div>
      </section>

      {/* Calendario */}
      <section style={{ background: C.s1, padding: "0 clamp(1.5rem,8vw,5rem) 5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              background: C.bg, border: `1px solid ${C.border}`,
              borderRadius: "16px", overflow: "hidden", boxShadow: C.shadow
            }}>
              <div style={{
                padding: "1.4rem 1.75rem", borderBottom: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", gap: ".75rem"
              }}>
                <span style={{ fontSize: "1.1rem" }}>📅</span>
                <div style={{
                  fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".78rem",
                  letterSpacing: ".12em", textTransform: "uppercase", color: C.tealLight
                }}>
                  Próximos Eventos
                </div>
              </div>
              {EVENTOS.map((ev, i) => (
                <div key={i}
                  style={{
                    display: "flex", alignItems: "center", gap: "1.25rem",
                    padding: "1rem 1.75rem",
                    borderBottom: i < EVENTOS.length - 1 ? `1px solid ${C.border}` : "none",
                    transition: "background .2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.s2}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ flexShrink: 0, width: "54px", textAlign: "center" }}>
                    <div style={{
                      fontFamily: FONTS.ui, fontWeight: 800, fontSize: "1.1rem",
                      color: C.text, lineHeight: 1
                    }}>{ev.fecha.split(" ")[0]}</div>
                    <div style={{
                      fontFamily: FONTS.ui, fontWeight: 500, fontSize: ".62rem",
                      letterSpacing: ".1em", textTransform: "uppercase", color: C.tealLight
                    }}>
                      {ev.fecha.split(" ")[1]}
                    </div>
                  </div>
                  <div style={{ width: "1px", height: "32px", background: C.border, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: FONTS.ui, fontWeight: 600, fontSize: ".82rem",
                      color: C.text, marginBottom: ".2rem"
                    }}>{ev.titulo}</div>
                    <div style={{ fontFamily: FONTS.body, fontSize: ".8rem", color: C.dim }}>
                      {ev.dia} · {ev.lugar}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

// ─── Ministerios ──────────────────────────────────────────────────────────────────
const MinCard = ({ icon, title, desc, delay }) => {
  const C = useC();
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay} style={{ flex: "1 1 260px" }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? C.s3 : C.s2,
          border: `1px solid ${hov ? C.orange + "40" : C.border}`,
          borderRadius: "12px", padding: "1.65rem",
          transition: "all .3s", transform: hov ? "translateY(-4px)" : "none",
          boxShadow: hov ? C.shadow : "none"
        }}>
        <div style={{ fontSize: "1.6rem", marginBottom: ".9rem" }}>{icon}</div>
        <h3 style={{
          fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".92rem",
          color: C.text, margin: "0 0 .55rem"
        }}>{title}</h3>
        <p style={{
          fontFamily: FONTS.body, fontWeight: 300, fontSize: ".88rem",
          color: C.dim, lineHeight: 1.6, margin: 0
        }}>{desc}</p>
        <div style={{
          marginTop: "1.1rem", height: "2px", borderRadius: "2px",
          width: hov ? "44px" : "18px",
          background: `linear-gradient(to right,${C.orange},${C.tealLight})`,
          transition: "width .3s"
        }} />
      </div>
    </Reveal>
  );
};

const Ministerios = () => {
  const C = useC();
  return (
    <section id="ministerios" style={{ background: C.bg, padding: "6rem clamp(1.5rem,8vw,5rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal><div style={{ marginBottom: "2.5rem" }}>
          <SectionLabel>Comunidad</SectionLabel>
          <SectionTitle>Ministerios</SectionTitle>
          <p style={{
            fontFamily: FONTS.body, fontWeight: 300, fontSize: ".95rem",
            color: C.dim, maxWidth: "460px", margin: 0
          }}>
            Espacios donde la fe se vive, se practica y se comparte.
          </p>
        </div></Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.1rem" }}>
          {MINS.map((m, i) => <MinCard key={m.title} {...m} delay={i * .07} />)}
        </div>
      </div>
    </section>
  );
};

// ─── Grupos pequeños (sin filtros) ────────────────────────────────────────────────
const GruposPequenos = () => {
  const C = useC();
  return (
    <section id="grupos" style={{ background: C.s1, padding: "6rem clamp(1.5rem,8vw,5rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal><div style={{ marginBottom: "2.5rem" }}>
          <SectionLabel>Por toda Córdoba</SectionLabel>
          <SectionTitle>Grupos Pequeños</SectionTitle>
          <p style={{
            fontFamily: FONTS.body, fontWeight: 300, fontSize: ".95rem",
            color: C.dim, maxWidth: "480px", margin: 0
          }}>
            Un grupo pequeño es una reunión en casas o espacios tranquilos donde compartimos charlas sobre la vida y la fe, leemos la Biblia, oramos y nos acompañamos mutuamente. Es un lugar cálido para conocer personas, hacer preguntas y crecer juntos, sin importar que tanto sabes.
          </p>
        </div></Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.1rem" }}>
          {GROUPS.map((g, i) => {
            const dayCol = DAY_COLORS[g.day] || C.tealLight;
            return (
              <Reveal key={g.leader} delay={i * .07}>
                <div style={{
                  background: C.bg, border: `1px solid ${C.border}`,
                  borderRadius: "12px", padding: "1.55rem", position: "relative",
                  overflow: "hidden", height: "100%", boxShadow: C.shadow
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: dayCol }} />
                  <div style={{ display: "flex", alignItems: "center", gap: ".55rem", marginBottom: ".8rem" }}>
                    <span style={{
                      fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".62rem",
                      letterSpacing: ".16em", textTransform: "uppercase", color: dayCol
                    }}>{g.day}</span>
                    <span style={{
                      width: "3px", height: "3px", borderRadius: "50%",
                      background: C.dim, display: "inline-block"
                    }} />
                    <span style={{
                      fontFamily: FONTS.ui, fontWeight: 500, fontSize: ".62rem",
                      letterSpacing: ".1em", textTransform: "uppercase", color: C.dim
                    }}>{g.tipo}</span>
                  </div>
                  <div style={{
                    fontFamily: FONTS.title, fontWeight: 600, fontSize: "1.2rem",
                    color: C.text, lineHeight: 1.2, marginBottom: ".85rem"
                  }}>{g.leader}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: ".3rem" }}>
                    <div style={{
                      display: "flex", gap: ".5rem", alignItems: "flex-start",
                      fontFamily: FONTS.body, fontSize: ".82rem", color: C.dim
                    }}>
                      <span style={{ flexShrink: 0 }}>📍</span>
                      <span>{g.address} · {g.barrio}</span>
                    </div>
                    <div style={{
                      display: "flex", gap: ".5rem", alignItems: "center",
                      fontFamily: FONTS.body, fontSize: ".82rem", color: C.dim
                    }}>
                      <span style={{ flexShrink: 0 }}>🕐</span><span>{g.time}</span>
                    </div>
                    <a href={`https://wa.me/54${g.contact.replace(/[-\s]/g, "")}`}
                      target="_blank" rel="noopener"
                      style={{
                        display: "flex", gap: ".5rem", alignItems: "center",
                        fontFamily: FONTS.body, fontSize: ".82rem", color: C.dim, transition: "color .2s"
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = "#25d366"}
                      onMouseLeave={e => e.currentTarget.style.color = C.dim}>
                      <span style={{ flexShrink: 0 }}>💬</span><span>{g.contact}</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={.46}>
          <div style={{
            marginTop: "1.75rem", padding: "1.4rem 1.75rem", borderRadius: "12px",
            background: C.bg, border: `1px solid ${C.border}`,
            display: "flex", flexWrap: "wrap", alignItems: "center",
            justifyContent: "space-between", gap: "1rem"
          }}>
            <p style={{ fontFamily: FONTS.body, fontWeight: 300, fontSize: ".9rem", color: C.dim, margin: 0 }}>
              ¿No encontrás un grupo cerca? Escribinos y te conectamos.
            </p>
            <a href={INFO.instagram} target="_blank" rel="noopener"
              style={{
                fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".72rem",
                letterSpacing: ".12em", textTransform: "uppercase", color: C.orange
              }}>
              Contactar →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ─── Predicaciones ────────────────────────────────────────────────────────────────
const TAG_SERMON_COLORS = { "Destacada": "#c85520", "Serie en curso": "#1a7080", "Culto especial": "#a07830" };

const Predicaciones = () => {
  const C = useC();
  const { isDark } = useTheme();
  const [feat, ...rest] = SERMONS;
  const [hovFeat, setHovFeat] = useState(false);
  const [hovIdx, setHovIdx] = useState(null);
  const ytUrl = id => `https://www.youtube.com/watch?v=${id}`;
  const thumb = id => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  // En modo claro los colores de tag son más oscuros para mejor contraste
  const tagColors = isDark
    ? { "Destacada": "#e06a36", "Serie en curso": "#4ab8ca", "Culto especial": "#c4a85a" }
    : TAG_SERMON_COLORS;

  return (
    <section id="predicaciones" style={{ background: C.bg, padding: "6rem clamp(1.5rem,8vw,5rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            flexWrap: "wrap", gap: "1.25rem", marginBottom: "2.5rem"
          }}>
            <div>
              <SectionLabel>La Palabra</SectionLabel>
              <SectionTitle>Predicaciones</SectionTitle>
              <p style={{
                fontFamily: FONTS.body, fontWeight: 300, fontSize: ".95rem",
                color: C.dim, maxWidth: "400px", margin: 0
              }}>
                Enseñanza fiel y accesible desde la Escritura.
              </p>
            </div>
            <a href={INFO.youtube} target="_blank" rel="noopener"
              style={{
                fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".74rem",
                letterSpacing: ".1em", textTransform: "uppercase", color: C.text,
                padding: "9px 20px", borderRadius: "5px", border: `1px solid ${C.border}`,
                display: "inline-flex", alignItems: "center", gap: "7px", transition: "all .25s"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff4040"; e.currentTarget.style.color = "#ff4040"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
            >▶ Ver canal completo</a>
          </div>
        </Reveal>

        {/* Destacada grande */}
        <Reveal delay={.08}>
          <a href={ytUrl(feat.videoId)} target="_blank" rel="noopener"
            style={{ display: "block", marginBottom: "1.25rem" }}>
            <div onMouseEnter={() => setHovFeat(true)} onMouseLeave={() => setHovFeat(false)}
              style={{
                borderRadius: "16px", overflow: "hidden",
                border: `1px solid ${hovFeat ? tagColors[feat.tag] + "45" : C.border}`,
                transition: "all .3s", boxShadow: hovFeat ? C.shadow : "none",
                display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))"
              }}>
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", minHeight: "200px" }}>
                <img src={thumb(feat.videoId)} alt={feat.title}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform .4s", transform: hovFeat ? "scale(1.04)" : "scale(1)"
                  }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: hovFeat ? "rgba(0,0,0,.3)" : "rgba(0,0,0,.48)",
                  display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s"
                }}>
                  <div style={{
                    width: "64px", height: "64px", borderRadius: "50%",
                    background: hovFeat ? C.orange : "rgba(255,255,255,.15)",
                    border: `2px solid ${hovFeat ? C.orange : "rgba(255,255,255,.3)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.5rem", color: "#fff", paddingLeft: "5px", transition: "all .3s"
                  }}>▶</div>
                </div>
                <span style={{
                  position: "absolute", top: "12px", left: "12px",
                  fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".6rem",
                  letterSpacing: ".14em", textTransform: "uppercase",
                  color: tagColors[feat.tag], background: "rgba(0,0,0,.75)",
                  border: `1px solid ${tagColors[feat.tag]}45`,
                  padding: "4px 10px", borderRadius: "20px", backdropFilter: "blur(6px)"
                }}>
                  {feat.tag}
                </span>
              </div>
              <div style={{
                background: C.s1, padding: "2rem", display: "flex",
                flexDirection: "column", justifyContent: "center", gap: ".65rem"
              }}>
                <div style={{
                  fontFamily: FONTS.ui, fontWeight: 600, fontSize: ".65rem",
                  letterSpacing: ".15em", color: C.dim, textTransform: "uppercase"
                }}>
                  {feat.speaker} · {feat.date}
                </div>
                <h3 style={{
                  fontFamily: FONTS.title, fontWeight: 600,
                  fontSize: "clamp(1.4rem,2.5vw,1.9rem)", color: C.text, margin: 0, lineHeight: 1.2
                }}>
                  {feat.title}
                </h3>
                <p style={{
                  fontFamily: FONTS.body, fontWeight: 300, fontSize: ".9rem",
                  color: C.dim, lineHeight: 1.6, margin: 0
                }}>{feat.desc}</p>
                <div style={{
                  fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".72rem",
                  letterSpacing: ".12em", textTransform: "uppercase",
                  color: hovFeat ? tagColors[feat.tag] : C.dim, transition: "color .25s", marginTop: ".25rem"
                }}>
                  Ver predicación →
                </div>
              </div>
            </div>
          </a>
        </Reveal>

        {/* Tarjetas secundarias */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.1rem" }}>
          {rest.map((s, i) => {
            const col = tagColors[s.tag] || C.tealLight;
            const hov = hovIdx === i;
            return (
              <Reveal key={s.videoId} delay={i * .1 + .15}>
                <a href={ytUrl(s.videoId)} target="_blank" rel="noopener"
                  style={{ display: "block", height: "100%" }}>
                  <div onMouseEnter={() => setHovIdx(i)} onMouseLeave={() => setHovIdx(null)}
                    style={{
                      background: C.s1, border: `1px solid ${hov ? col + "45" : C.border}`,
                      borderRadius: "12px", overflow: "hidden",
                      transition: "all .3s", transform: hov ? "translateY(-4px)" : "none",
                      boxShadow: hov ? C.shadow : "none",
                      display: "flex", flexDirection: "column", height: "100%"
                    }}>
                    <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", flexShrink: 0 }}>
                      <img src={thumb(s.videoId)} alt={s.title}
                        style={{
                          width: "100%", height: "100%", objectFit: "cover",
                          transition: "transform .4s", transform: hov ? "scale(1.04)" : "scale(1)"
                        }} />
                      <div style={{
                        position: "absolute", inset: 0,
                        background: hov ? "rgba(0,0,0,.3)" : "rgba(0,0,0,.5)",
                        display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s"
                      }}>
                        <div style={{
                          width: "42px", height: "42px", borderRadius: "50%",
                          background: hov ? C.orange : "rgba(255,255,255,.15)",
                          border: `2px solid ${hov ? C.orange : "rgba(255,255,255,.3)"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "1rem", color: "#fff", paddingLeft: "3px", transition: "all .3s"
                        }}>▶</div>
                      </div>
                      <span style={{
                        position: "absolute", top: "8px", left: "8px",
                        fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".58rem",
                        letterSpacing: ".13em", textTransform: "uppercase",
                        color: col, background: "rgba(0,0,0,.8)",
                        border: `1px solid ${col}40`, padding: "3px 8px", borderRadius: "20px"
                      }}>
                        {s.tag}
                      </span>
                    </div>
                    <div style={{ padding: "1.1rem", flex: 1, display: "flex", flexDirection: "column", gap: ".4rem" }}>
                      <div style={{
                        fontFamily: FONTS.ui, fontWeight: 600, fontSize: ".62rem",
                        letterSpacing: ".12em", color: C.dim, textTransform: "uppercase"
                      }}>
                        {s.speaker} · {s.date}
                      </div>
                      <h4 style={{
                        fontFamily: FONTS.title, fontWeight: 600, fontSize: "1.15rem",
                        color: C.text, margin: 0, lineHeight: 1.25
                      }}>{s.title}</h4>
                      <div style={{
                        fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".67rem",
                        letterSpacing: ".1em", textTransform: "uppercase",
                        color: hov ? col : C.dim, transition: "color .25s",
                        marginTop: "auto", paddingTop: ".3rem"
                      }}>
                        Ver en YouTube →
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── Equipo pastoral ──────────────────────────────────────────────────────────────
const EquipoPastoral = () => {
  const C = useC();
  return (
    <section style={{ background: C.s1, padding: "6rem clamp(1.5rem,8vw,5rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <SectionLabel>Liderazgo</SectionLabel>
          <SectionTitle>Equipo Pastoral</SectionTitle>
          <p style={{
            fontFamily: FONTS.body, fontWeight: 300, fontSize: ".95rem",
            color: C.dim, maxWidth: "400px", margin: "0 auto"
          }}>
            Personas comprometidas con servir a la iglesia y a la comunidad.
          </p>
        </div></Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", justifyContent: "center" }}>
          {TEAM.map((p, i) => (
            <Reveal key={p.name} delay={i * .14} style={{ flex: "1 1 200px", maxWidth: "240px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: "110px", height: "110px", borderRadius: "50%",
                  margin: "0 auto 1.2rem", overflow: "hidden",
                  border: `3px solid ${C.tealLight}40`, boxShadow: C.shadow
                }}>
                  <img src={p.img} alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h3 style={{
                  fontFamily: FONTS.title, fontWeight: 600, fontSize: "1.3rem",
                  color: C.text, marginBottom: ".3rem"
                }}>{p.name}</h3>
                <div style={{
                  fontFamily: FONTS.ui, fontWeight: 600, fontSize: ".65rem",
                  letterSpacing: ".15em", textTransform: "uppercase",
                  color: C.orange, marginBottom: ".7rem"
                }}>{p.role}</div>
                <p style={{
                  fontFamily: FONTS.body, fontWeight: 300, fontSize: ".88rem",
                  color: C.dim, lineHeight: 1.6, margin: 0
                }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Contacto ──────────────────────────────────────────────────────────────────────
const Contacto = () => {
  const C = useC();
  return (
    <section id="contacto" style={{ background: C.bg, padding: "6rem clamp(1.5rem,8vw,5rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <SectionLabel>Visitanos</SectionLabel>
          <SectionTitle>Encontranos</SectionTitle>
          <p style={{
            fontFamily: FONTS.body, fontWeight: 300, fontSize: ".95rem",
            color: C.dim, maxWidth: "400px", margin: "0 auto"
          }}>
            Estaremos felices de recibirte. Venís como sos.
          </p>
        </div></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "2rem" }}>
          <Reveal delay={.1}>
            <div style={{
              background: C.s1, border: `1px solid ${C.border}`,
              borderRadius: "16px", padding: "2rem", boxShadow: C.shadow
            }}>
              <div style={{
                fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".78rem",
                letterSpacing: ".12em", textTransform: "uppercase",
                color: C.tealLight, marginBottom: "1.25rem"
              }}>Seguinos</div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".85rem", marginBottom: "1.75rem" }}>
                {[
                  { label: "Instagram", handle: "@redimecomunidaddelagracia", href: INFO.instagram, icon: "📸", accent: "#e1306c" },
                  { label: "YouTube", handle: "@iglesiaredime", href: INFO.youtube, icon: "▶", accent: "#ff4040" },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener"
                    style={{
                      display: "flex", alignItems: "center", gap: "1rem",
                      padding: ".8rem 1rem", borderRadius: "8px",
                      border: `1px solid ${C.border}`, background: C.bg, transition: "all .25s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = s.accent + "55"; e.currentTarget.style.background = C.s2; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg; }}>
                    <div style={{
                      width: "34px", height: "34px", borderRadius: "7px",
                      background: s.accent + "15", border: `1px solid ${s.accent}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1rem", color: s.accent, flexShrink: 0
                    }}>{s.icon}</div>
                    <div>
                      <div style={{ fontFamily: FONTS.ui, fontWeight: 600, fontSize: ".76rem", color: C.text }}>{s.label}</div>
                      <div style={{ fontFamily: FONTS.body, fontSize: ".8rem", color: C.dim }}>{s.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.5rem" }}>
                <div style={{
                  fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".78rem",
                  letterSpacing: ".12em", textTransform: "uppercase",
                  color: C.tealLight, marginBottom: "1rem"
                }}>Dirección</div>
                <p style={{
                  fontFamily: FONTS.body, fontWeight: 300, fontSize: ".9rem",
                  color: C.dim, lineHeight: 1.75, margin: 0
                }}>
                  <strong style={{ color: C.text, fontWeight: 700 }}>{INFO.direccion}</strong><br />
                  {INFO.ciudad}<br /><br />
                  <strong style={{ color: C.text, fontWeight: 700 }}>{INFO.horario}</strong>
                </p>
                <a href={INFO.mapsUrl} target="_blank" rel="noopener"
                  style={{
                    display: "inline-block", marginTop: "1rem",
                    fontFamily: FONTS.ui, fontWeight: 600, fontSize: ".7rem",
                    letterSpacing: ".12em", textTransform: "uppercase", color: C.orange
                  }}>
                  Ver en Google Maps →
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={.2}>
            <div style={{
              borderRadius: "16px", overflow: "hidden",
              border: `1px solid ${C.border}`, minHeight: "360px"
            }}>
              <iframe title="Ubicación REDIME Córdoba"
                src="https://www.google.com/maps?q=Ibarb%C3%A1lz+1050,+C%C3%B3rdoba,+Argentina&output=embed"
                width="100%" height="100%" loading="lazy"
                style={{
                  border: "none", minHeight: "360px", display: "block",
                  filter: "brightness(.8) saturate(.5) hue-rotate(195deg)"
                }} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ─── Footer ────────────────────────────────────────────────────────────────────────
const FOOTER_COLS = [
  { title: "Iglesia", items: [{ label: "Nosotros", id: "nosotros" }, { label: "Ministerios", id: "ministerios" }, { label: "Equipo pastoral", id: "contacto" }] },
  { title: "Comunidad", items: [{ label: "Grupos pequeños", id: "grupos" }, { label: "Predicaciones", id: "predicaciones" }, { label: "Novedades", id: "novedades" }] },
];

const Footer = () => {
  const C = useC();
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={{
      background: C.darkest, borderTop: `1px solid ${C.border}`,
      padding: "4rem clamp(1.5rem,8vw,5rem) 2rem"
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
          gap: "2.5rem", marginBottom: "3rem"
        }}>
          <div style={{ gridColumn: "span 1" }}>
            <Logo sz={32} variant="standalone" />
            <p style={{
              fontFamily: FONTS.body, fontWeight: 300, fontSize: ".85rem",
              color: C.dim, marginTop: "1rem", maxWidth: "200px", lineHeight: 1.65
            }}>
              Una iglesia bíblica, cálida y centrada en Cristo en Córdoba, Argentina.
            </p>
            <div style={{ display: "flex", gap: ".55rem", marginTop: "1.1rem" }}>
              {[{ href: INFO.instagram, icon: "📸", label: "Instagram" }, { href: INFO.youtube, icon: "▶", label: "YouTube" }].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}
                  style={{
                    width: "34px", height: "34px", borderRadius: "7px",
                    border: `1px solid ${C.border}`, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: ".9rem", color: C.dim, transition: "all .25s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.tealLight; e.currentTarget.style.color = C.tealLight; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.dim; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <div style={{
                fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".63rem",
                letterSpacing: ".2em", textTransform: "uppercase",
                color: C.tealLight, marginBottom: "1.1rem"
              }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
                {col.items.map(item => (
                  <button key={item.label} onClick={() => go(item.id)}
                    style={{
                      background: "none", border: "none", textAlign: "left", padding: 0,
                      fontFamily: FONTS.body, fontWeight: 300, fontSize: ".86rem",
                      color: C.dim, cursor: "pointer", transition: "color .2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = C.text}
                    onMouseLeave={e => e.currentTarget.style.color = C.dim}>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div style={{
              fontFamily: FONTS.ui, fontWeight: 700, fontSize: ".63rem",
              letterSpacing: ".2em", textTransform: "uppercase",
              color: C.tealLight, marginBottom: "1.1rem"
            }}>Visitanos</div>
            <p style={{
              fontFamily: FONTS.body, fontWeight: 300, fontSize: ".86rem",
              color: C.dim, lineHeight: 1.85, margin: "0 0 .5rem"
            }}>
              {INFO.horario}<br />{INFO.direccion}<br />{INFO.ciudad}
            </p>
            <a href={INFO.mapsUrl} target="_blank" rel="noopener"
              style={{
                fontFamily: FONTS.ui, fontWeight: 600, fontSize: ".68rem",
                letterSpacing: ".12em", textTransform: "uppercase", color: C.orange
              }}>
              Ver mapa →
            </a>
          </div>
        </div>

        <div style={{
          borderTop: `1px solid ${C.border}`, paddingTop: "1.75rem",
          display: "flex", flexWrap: "wrap", gap: "1rem",
          justifyContent: "space-between", alignItems: "center"
        }}>
          <p style={{
            fontFamily: FONTS.title, fontStyle: "italic", fontSize: "1rem",
            color: C.dim, margin: 0
          }}>
            "La gracia y la verdad vinieron por medio de Jesucristo." — Juan 1:17
          </p>
          <p style={{ fontFamily: FONTS.body, fontSize: ".72rem", color: C.dim + "88", margin: 0 }}>
            © {new Date().getFullYear()} REDIME — Comunidad de la Gracia
          </p>
        </div>
      </div>
    </footer>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  // Preferencia guardada: por defecto MODO CLARO
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem("redime-theme") === "dark"; }
    catch { return false; }
  });

  const toggle = () => setIsDark(d => {
    const next = !d;
    try { localStorage.setItem("redime-theme", next ? "dark" : "light"); } catch { }
    return next;
  });

  const C = isDark ? DARK : LIGHT;

  useEffect(() => {
    document.title = "REDIME — Comunidad de la Gracia | Iglesia Evangélica Córdoba";
    document.body.style.background = C.bg;
  }, [isDark]);

  return (
    <ThemeCtx.Provider value={{ C, isDark, toggle }}>
      <div style={{ background: C.bg, color: C.text, minHeight: "100vh", transition: "background .35s, color .35s" }}>
        <GlobalStyles isDark={isDark} />
        <Navbar />
        <MobileCTA />
        <main>
          <Hero />
          <QuickInfo />
          <PrimeraVez />
          <MissionVision />
          <Testimonios />
          <Novedades />
          <Ministerios />
          <GruposPequenos />
          <Predicaciones />
          <EquipoPastoral />
          <Contacto />
        </main>
        <Footer />
      </div>
    </ThemeCtx.Provider>
  );
}