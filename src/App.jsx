import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  REDIME — Comunidad de la Gracia  |  Sitio Web
// ═══════════════════════════════════════════════════════════════

const C = {
  darkest:   "#020b12",
  bg:        "#050e16",
  s1:        "#091827",
  s2:        "#0d2035",
  s3:        "#152d42",
  teal:      "#1d3d56",
  tealLight: "#4ab8ca",
  orange:    "#e06a36",
  orangeHot: "#f07848",
  text:      "#ede9df",
  dim:       "#94a8b8",
  border:    "rgba(74,184,202,0.13)",
};

// ─── Fonts & Global CSS ─────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@400;500;600;700;800&family=Lato:ital,wght@0,300;0,400;0,700;1,300&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin:0; overflow-x:hidden; background:${C.bg}; font-family:'Lato',sans-serif; }
    a { text-decoration:none; }
    button { cursor:pointer; }

    @keyframes hUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
    @keyframes hIn   { from{opacity:0} to{opacity:1} }
    @keyframes pulse { 0%,100%{transform:scaleY(1);opacity:.5} 50%{transform:scaleY(1.4);opacity:1} }
    @keyframes floatIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

    .ham-btn  { display:none!important; background:none; border:none; flex-direction:column; gap:5px; padding:4px; }
    .desk-nav { display:flex; align-items:center; gap:2rem; }
    .mobile-cta { display:none; }

    @media(max-width:820px){
      .ham-btn  { display:flex!important; }
      .desk-nav { display:none!important; }
      .mobile-cta { display:flex!important; }
    }

    ::-webkit-scrollbar{ width:5px }
    ::-webkit-scrollbar-track{ background:${C.bg} }
    ::-webkit-scrollbar-thumb{ background:${C.teal}; border-radius:3px }
    ::-webkit-scrollbar-thumb:hover{ background:${C.tealLight} }
  `}</style>
);

// ─── Scroll Reveal ───────────────────────────────────────────────
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

// ─── Logo ────────────────────────────────────────────────────────
// Coloca el archivo del logo en /public/logo.png de tu proyecto React
const Logo = ({ sz = 38, variant = "nav" }) => {
  if (variant === "standalone") {
    return (
      <img src="/logo.png" alt="REDIME — Comunidad de la Gracia"
        style={{ width: sz * 2.8 + "px", height: "auto", display:"block" }} />
    );
  }
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
      <div style={{ width:sz+"px", height:sz+"px", borderRadius:"50%", overflow:"hidden",
        flexShrink:0, background:"#fff", boxShadow:"0 0 0 1.5px rgba(74,184,202,.25)" }}>
        <img src="/logo.png" alt="REDIME logo"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 20%" }} />
      </div>
      <div>
        <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:800, fontSize:sz*.42+"px",
          letterSpacing:".07em", lineHeight:1.1, color:C.text }}>REDIME</div>
        <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:500, fontSize:sz*.21+"px",
          letterSpacing:".14em", lineHeight:1.2, color:C.dim }}>COMUNIDAD DE LA GRACIA</div>
      </div>
    </div>
  );
};

// ─── Navbar ──────────────────────────────────────────────────────
const NAV = [
  { label:"Inicio",        id:"inicio"        },
  { label:"Nosotros",      id:"nosotros"      },
  { label:"Novedades",     id:"novedades"     },
  { label:"Ministerios",   id:"ministerios"   },
  { label:"Grupos",        id:"grupos"        },
  { label:"Predicaciones", id:"predicaciones" },
  { label:"Contacto",      id:"contacto"      },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = id => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); };

  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:`0 clamp(1.25rem,5vw,3rem)`,
        height: scrolled ? "62px" : "78px",
        background: scrolled ? "rgba(5,14,22,.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition:"height .3s ease, background .35s ease" }}>
        <Logo sz={34} />
        <div className="desk-nav">
          {NAV.map(({ label, id }) => (
            <button key={id} onClick={() => go(id)} style={{ background:"none", border:"none",
              fontFamily:"Montserrat,sans-serif", fontWeight:500, fontSize:".8rem",
              letterSpacing:".05em", color:C.dim, transition:"color .2s", padding:"4px 0" }}
              onMouseEnter={e => e.target.style.color = C.text}
              onMouseLeave={e => e.target.style.color = C.dim}
            >{label}</button>
          ))}
          <button onClick={() => go("contacto")} style={{ background:C.orange, border:"none",
            fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".75rem",
            letterSpacing:".09em", textTransform:"uppercase", color:"#fff",
            padding:"9px 20px", borderRadius:"5px", marginLeft:".5rem",
            transition:"background .2s, transform .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.orangeHot; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.orange;    e.currentTarget.style.transform = "none"; }}
          >Visitanos</button>
        </div>
        <button className="ham-btn" onClick={() => setOpen(o => !o)} aria-label="Menú">
          {[0,1,2].map(i => (
            <span key={i} style={{ display:"block", width:"22px", height:"2px",
              background:C.text, borderRadius:"2px", transition:"all .3s ease",
              transform: open ? i===0 ? "rotate(45deg) translateY(7px)" : i===2 ? "rotate(-45deg) translateY(-7px)" : "none" : "none",
              opacity: open && i===1 ? 0 : 1 }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div style={{ position:"fixed", inset:0, zIndex:999, background:C.bg,
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1.75rem",
        opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none", transition:"opacity .3s ease" }}>
        <Logo sz={44} />
        {NAV.map(({ label, id }) => (
          <button key={id} onClick={() => go(id)} style={{ background:"none", border:"none",
            fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"2rem",
            color:C.text, letterSpacing:".03em" }}>{label}</button>
        ))}
        <button onClick={() => go("contacto")} style={{ background:C.orange, border:"none",
          fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".85rem",
          letterSpacing:".1em", textTransform:"uppercase", color:"#fff",
          padding:"13px 30px", borderRadius:"5px", marginTop:".5rem" }}>Visitanos</button>
      </div>
    </>
  );
};

// ─── Mobile Floating CTA ─────────────────────────────────────────
const MobileCTA = () => (
  <div className="mobile-cta" style={{
    position:"fixed", bottom:"1.25rem", left:"50%", transform:"translateX(-50%)",
    zIndex:990, display:"flex", gap:".65rem",
    animation:"floatIn .6s ease .4s both"
  }}>
    {[
      { icon:"📍", label:"Cómo llegar", id:"contacto",     bg:C.s3,     border:C.border   },
      { icon:"💬", label:"WhatsApp",    href:"https://wa.me/5493510000000", bg:C.orange, border:"transparent" },
    ].map((b) => {
      const shared = {
        display:"flex", alignItems:"center", gap:"6px",
        fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".72rem",
        letterSpacing:".08em", textTransform:"uppercase", color:"#fff",
        padding:"11px 18px", borderRadius:"30px",
        background:b.bg, border:`1px solid ${b.border}`,
        boxShadow:"0 4px 20px rgba(0,0,0,.5)",
        backdropFilter:"blur(12px)", whiteSpace:"nowrap"
      };
      return b.href
        ? <a key={b.label} href={b.href} target="_blank" rel="noopener" style={shared}>
            <span>{b.icon}</span>{b.label}
          </a>
        : <button key={b.label} onClick={() => document.getElementById(b.id)?.scrollIntoView({ behavior:"smooth" })} style={shared}>
            <span>{b.icon}</span>{b.label}
          </button>;
    })}
  </div>
);

// ─── Hero ────────────────────────────────────────────────────────
const Hero = () => (
  <section id="inicio" style={{ position:"relative", height:"100svh", minHeight:"580px",
    display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
    <div style={{ position:"absolute", inset:0,
      backgroundImage:"url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80)",
      backgroundSize:"cover", backgroundPosition:"center 25%", filter:"brightness(.35) saturate(.6)" }} />
    <div style={{ position:"absolute", inset:0,
      background:`linear-gradient(160deg,rgba(2,11,18,.3) 0%,rgba(5,14,22,.05) 50%,rgba(5,14,22,.88) 100%)` }} />
    <div style={{ position:"absolute", left:0, top:"15%", bottom:"15%", width:"3px",
      background:`linear-gradient(to bottom,transparent,${C.tealLight}80,transparent)` }} />

    <div style={{ position:"relative", zIndex:2, textAlign:"center",
      padding:"0 clamp(1.5rem,8vw,5rem)", maxWidth:"900px" }}>
      <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:500, fontSize:".68rem",
        letterSpacing:".28em", textTransform:"uppercase", color:C.tealLight, marginBottom:"1.5rem",
        opacity:0, animation:"hUp .8s ease .3s forwards" }}>Córdoba · Argentina</div>
      <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
        fontSize:"clamp(2.4rem,6.5vw,5.5rem)", lineHeight:1.1, color:C.text, margin:"0 0 1.5rem",
        opacity:0, animation:"hUp .9s ease .5s forwards" }}>
        Conocer a Cristo.<br />
        <em style={{ fontStyle:"italic", color:C.tealLight }}>Crecer en Su Palabra.</em><br />
        Vivir en comunidad.
      </h1>
      <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300,
        fontSize:"clamp(.92rem,1.8vw,1.1rem)", lineHeight:1.75,
        color:"rgba(237,233,223,.72)", maxWidth:"520px", margin:"0 auto 2.5rem",
        opacity:0, animation:"hUp .9s ease .7s forwards" }}>
        Una comunidad centrada en Cristo, la gracia y la enseñanza bíblica.
      </p>
      <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap",
        opacity:0, animation:"hUp .9s ease .9s forwards" }}>
        {[
          { label:"Ver horarios",    id:"nosotros", primary:true  },
          { label:"Grupos pequeños", id:"grupos",   primary:false },
          { label:"Cómo llegar",     id:"contacto", primary:false },
        ].map(({ label, id, primary }) => (
          <button key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" })}
            style={{ background: primary ? C.orange : "transparent",
              border: primary ? "none" : `1px solid rgba(237,233,223,.32)`,
              color:"#fff", fontFamily:"Montserrat,sans-serif", fontWeight:700,
              fontSize:".78rem", letterSpacing:".1em", textTransform:"uppercase",
              padding:"13px 28px", borderRadius:"5px", transition:"all .25s" }}
            onMouseEnter={e => { if (primary) e.currentTarget.style.background = C.orangeHot;
              else { e.currentTarget.style.borderColor = C.tealLight; e.currentTarget.style.color = C.tealLight; } }}
            onMouseLeave={e => { if (primary) e.currentTarget.style.background = C.orange;
              else { e.currentTarget.style.borderColor = "rgba(237,233,223,.32)"; e.currentTarget.style.color = "#fff"; } }}
          >{label}</button>
        ))}
      </div>
    </div>
    <div style={{ position:"absolute", bottom:"1.75rem", left:"50%", transform:"translateX(-50%)",
      opacity:0, animation:"hIn 1s ease 1.6s forwards" }}>
      <div style={{ width:"1px", height:"44px", margin:"0 auto",
        background:`linear-gradient(to bottom,transparent,${C.tealLight})`,
        animation:"pulse 2s ease infinite" }} />
    </div>
  </section>
);

// ─── Quick Info Cards ────────────────────────────────────────────
const InfoCard = ({ icon, title, children, cta, ctaHref, delay = 0 }) => {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay} style={{ flex:"1 1 250px" }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ background: hov ? C.s3 : C.s2, border:`1px solid ${hov ? C.tealLight+"38" : C.border}`,
          borderRadius:"12px", padding:"1.75rem 1.5rem", height:"100%",
          transition:"all .3s ease", transform: hov ? "translateY(-4px)" : "none",
          boxShadow: hov ? "0 12px 36px rgba(0,0,0,.4)" : "0 4px 16px rgba(0,0,0,.2)" }}>
        <div style={{ width:"42px", height:"42px", borderRadius:"9px",
          background:`linear-gradient(135deg,${C.teal},${C.s3})`, border:`1px solid ${C.border}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:"1.2rem", marginBottom:"1.2rem" }}>{icon}</div>
        <h3 style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".82rem",
          letterSpacing:".1em", textTransform:"uppercase", color:C.tealLight, marginBottom:".65rem" }}>{title}</h3>
        <div style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".9rem",
          color:"rgba(237,233,223,.72)", lineHeight:1.65 }}>{children}</div>
        {cta && (
          <a href={ctaHref} target="_blank" rel="noopener" style={{ display:"inline-block", marginTop:"1.1rem",
            fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".72rem",
            letterSpacing:".1em", textTransform:"uppercase", color:C.orange, transition:"letter-spacing .2s" }}
            onMouseEnter={e => e.target.style.letterSpacing = ".15em"}
            onMouseLeave={e => e.target.style.letterSpacing = ".1em"}
          >{cta} →</a>
        )}
      </div>
    </Reveal>
  );
};

const QuickInfo = () => (
  <section id="nosotros" style={{ background:C.s1, padding:"4.5rem clamp(1.5rem,8vw,5rem)" }}>
    <div style={{ maxWidth:"1100px", margin:"0 auto", display:"flex", gap:"1.5rem", flexWrap:"wrap" }}>
      <InfoCard icon="📍" title="Ubicación" delay={0}
        cta="Ver en mapa" ctaHref="https://maps.google.com/?q=Hotel+ACA+Cesar+Carman+Córdoba+Argentina">
        <strong style={{ color:C.text, fontWeight:700 }}>Hotel ACA</strong><br />
        Cesar Carman · Córdoba<br />Argentina
      </InfoCard>
      <InfoCard icon="🕐" title="Horarios" delay={.12}>
        <strong style={{ color:C.text, fontWeight:700 }}>Domingos · 11:00 hs</strong><br />
        Culto principal<br /><br />
        <strong style={{ color:C.text, fontWeight:700 }}>Entre semana</strong><br />
        Grupos pequeños por zona
      </InfoCard>
      <InfoCard icon="✝" title="Nuestra Identidad" delay={.24}>
        Somos una iglesia evangélica bautista enfocada en la enseñanza bíblica,
        la comunidad y el evangelio de Jesucristo.
      </InfoCard>
    </div>
  </section>
);

// ─── Primera Vez ─────────────────────────────────────────────────
const CHECKS = [
  "No hace falta vestimenta especial — venís como sos.",
  "Duración aproximada: 1 hora 30 minutos.",
  "Hay espacio para niños durante el culto.",
  "Café y tiempo de comunidad después del culto.",
  "Podés venir solo/a, te vamos a recibir con alegría.",
  "No se pide dinero ni datos personales.",
];

const PrimeraVez = () => (
  <section style={{ background:C.bg, padding:"6rem clamp(1.5rem,8vw,5rem)" }}>
    <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"3rem", alignItems:"center" }}>
        <Reveal>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem",
            letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem" }}>
            Tu primera visita
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
            fontSize:"clamp(2rem,4vw,3rem)", color:C.text, lineHeight:1.1, marginBottom:"1rem" }}>
            ¿Nunca viniste?<br />
            <em style={{ color:C.tealLight, fontStyle:"italic" }}>Bienvenido/a.</em>
          </h2>
          <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".95rem",
            color:C.dim, lineHeight:1.7, maxWidth:"380px" }}>
            Sabemos que entrar a una iglesia por primera vez puede generar dudas.
            Acá te contamos qué esperar para que llegues tranquilo/a.
          </p>
          <button onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior:"smooth" })}
            style={{ marginTop:"1.75rem", background:"transparent",
              border:`1px solid ${C.border}`, color:C.text,
              fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".73rem",
              letterSpacing:".1em", textTransform:"uppercase",
              padding:"12px 24px", borderRadius:"5px", transition:"all .25s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.tealLight; e.currentTarget.style.color = C.tealLight; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
          >Cómo llegar →</button>
        </Reveal>

        <Reveal delay={.15}>
          <div style={{ background:C.s2, border:`1px solid ${C.border}`, borderRadius:"16px",
            padding:"2rem", display:"flex", flexDirection:"column", gap:"1rem" }}>
            {CHECKS.map((txt, i) => (
              <div key={i} style={{ display:"flex", gap:".9rem", alignItems:"flex-start" }}>
                <div style={{ width:"22px", height:"22px", borderRadius:"50%", flexShrink:0,
                  background:`linear-gradient(135deg,${C.teal},${C.tealLight}55)`,
                  border:`1px solid ${C.tealLight}55`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  marginTop:"1px" }}>
                  <span style={{ color:C.tealLight, fontSize:".7rem", fontWeight:700 }}>✓</span>
                </div>
                <span style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".92rem",
                  color:"rgba(237,233,223,.82)", lineHeight:1.55 }}>{txt}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ─── Mission & Vision ────────────────────────────────────────────
const MissionVision = () => (
  <section style={{ background:C.s1, padding:"6rem clamp(1.5rem,8vw,5rem)" }}>
    <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
      <Reveal>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem",
            letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem" }}>¿Quiénes somos?</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
            fontSize:"clamp(2rem,4vw,3rem)", color:C.text, margin:0 }}>Misión & Visión</h2>
        </div>
      </Reveal>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"2rem" }}>
        <Reveal delay={.1}>
          <div style={{ position:"relative", overflow:"hidden",
            background:`linear-gradient(140deg,${C.s2} 0%,${C.teal} 100%)`,
            border:`1px solid ${C.border}`, borderRadius:"16px", padding:"2.5rem", minHeight:"300px" }}>
            <div style={{ position:"absolute", top:"-50px", right:"-50px", width:"180px", height:"180px",
              borderRadius:"50%", background:`radial-gradient(circle,${C.tealLight}14,transparent 70%)` }} />
            <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"140px", height:"140px",
              borderRadius:"50%", background:`radial-gradient(circle,${C.orange}14,transparent 70%)` }} />
            <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem",
              letterSpacing:".22em", textTransform:"uppercase", color:C.orange, marginBottom:"1.2rem" }}>Misión</div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"1.8rem",
              color:C.text, marginBottom:"1.4rem", lineHeight:1.2 }}>¿Por qué existimos?</h3>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:".8rem" }}>
              {["Conectar a las personas con Dios y con los demás.",
                "Crecer en el conocimiento de Su Palabra.",
                "Compartir la buena noticia de Jesucristo viviendo en comunidad."
              ].map(t => (
                <li key={t} style={{ display:"flex", gap:".75rem", alignItems:"flex-start",
                  fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".92rem",
                  color:"rgba(237,233,223,.8)", lineHeight:1.55 }}>
                  <span style={{ color:C.tealLight, marginTop:"1px", flexShrink:0, fontWeight:700 }}>—</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={.22}>
          <div style={{ position:"relative", overflow:"hidden",
            background:`linear-gradient(140deg,${C.s2} 0%,#1a2f42 100%)`,
            border:`1px solid ${C.border}`, borderRadius:"16px", padding:"2.5rem", minHeight:"300px",
            display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
            <div style={{ position:"absolute", top:"-30px", left:"50%", transform:"translateX(-50%)",
              width:"220px", height:"220px", borderRadius:"50%",
              background:`radial-gradient(circle,${C.orange}12,transparent 65%)` }} />
            <div>
              <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem",
                letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:"1.2rem" }}>Visión</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"1.8rem",
                color:C.text, marginBottom:"1.5rem", lineHeight:1.2 }}>¿Hacia dónde vamos?</h3>
            </div>
            <blockquote style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
              fontSize:"1.35rem", color:"rgba(237,233,223,.88)", lineHeight:1.6,
              borderLeft:`3px solid ${C.orange}`, paddingLeft:"1.25rem", margin:0 }}>
              "Ser una iglesia unida que conoce profundamente a Cristo, crece a Su imagen y se edifica en amor."
            </blockquote>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ─── Testimonios ─────────────────────────────────────────────────
const TESTIMONIOS = [
  { quote:"Encontré comunidad cuando estaba completamente solo. Esta iglesia se convirtió en mi familia.", name:"Rodrigo M.", role:"Miembro desde 2022" },
  { quote:"Lo que más me sorprendió fue la calidez. Vine una vez y no pude dejar de volver.", name:"Valentina G.", role:"Primera visita en 2023" },
  { quote:"La enseñanza bíblica acá es seria y accesible al mismo tiempo. Crecí mucho en mi fe.", name:"Sebastián R.", role:"Grupo pequeño Zona Norte" },
];

const Testimonios = () => (
  <section style={{ background:C.bg, padding:"6rem clamp(1.5rem,8vw,5rem)" }}>
    <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
      <Reveal>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem",
            letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem" }}>La comunidad habla</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
            fontSize:"clamp(2rem,4vw,3rem)", color:C.text }}>Testimonios</h2>
        </div>
      </Reveal>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"1.25rem" }}>
        {TESTIMONIOS.map((t, i) => (
          <Reveal key={i} delay={i * .12} style={{ flex:"1 1 270px" }}>
            <div style={{ background:C.s2, border:`1px solid ${C.border}`, borderRadius:"14px",
              padding:"2rem", position:"relative", height:"100%" }}>
              <div style={{ fontSize:"2.8rem", lineHeight:1, color:C.tealLight+"40",
                fontFamily:"Georgia,serif", position:"absolute", top:"1rem", left:"1.4rem",
                userSelect:"none" }}>"</div>
              <blockquote style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
                fontSize:"1.15rem", color:"rgba(237,233,223,.88)", lineHeight:1.65,
                margin:"1.5rem 0 1.5rem", padding:0 }}>
                {t.quote}
              </blockquote>
              <div style={{ display:"flex", alignItems:"center", gap:".75rem" }}>
                <div style={{ width:"36px", height:"36px", borderRadius:"50%",
                  background:`linear-gradient(135deg,${C.teal},${C.tealLight}55)`,
                  border:`1px solid ${C.border}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".78rem", color:C.tealLight }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".8rem", color:C.text }}>{t.name}</div>
                  <div style={{ fontFamily:"Lato,sans-serif", fontSize:".75rem", color:C.dim }}>{t.role}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ─── Versículo del Mes ────────────────────────────────────────────
// Cambiá el versículo y la referencia cada mes
const VERSICULO = {
  texto: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree no se pierda, mas tenga vida eterna.",
  ref:   "Juan 3:16"
};

const VersiculoMes = () => (
  <Reveal>
    <div style={{ background:`linear-gradient(120deg,${C.s2} 0%,${C.teal} 100%)`,
      borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`,
      padding:"2.25rem clamp(1.5rem,8vw,5rem)", textAlign:"center" }}>
      <div style={{ maxWidth:"700px", margin:"0 auto" }}>
        <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".62rem",
          letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".9rem" }}>
          📖 Versículo del mes
        </div>
        <blockquote style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
          fontSize:"clamp(1.1rem,2.2vw,1.4rem)", color:"rgba(237,233,223,.9)", lineHeight:1.7,
          margin:"0 0 .75rem", padding:0 }}>
          "{VERSICULO.texto}"
        </blockquote>
        <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".72rem",
          letterSpacing:".18em", color:C.orange }}>— {VERSICULO.ref}</div>
      </div>
    </div>
  </Reveal>
);

// ─── Novedades ────────────────────────────────────────────────────
const NEWS = [
  { tag:"Retiro",  date:"14 y 15 de noviembre",   title:"Retiro de la iglesia",
    desc:"Nos vamos juntos a Posada La Campiña. Dos días para descansar, compartir y crecer en comunidad. ¡Anotate y no te lo perdas!", link:"#" },
  { tag:"Serie",   date:"Domingos · 11:00 hs",    title:"La misión de la iglesia",
    desc:"Estamos explorando juntos qué significa ser iglesia en el mundo. Una serie para entender el llamado que tenemos como comunidad.", link:"https://www.youtube.com/@iglesiaredime" },
  { tag:"Anuncio", date:"[Fecha]",                title:"[Próximo anuncio]",
    desc:"Este espacio está disponible para el siguiente anuncio de la comunidad. Actualizalo desde el array NEWS en el código.", link:"#" },
];
const TAG_COLORS = { "Evento":"#e06a36","Anuncio":"#4ab8ca","Serie":"#7ec8a0","Retiro":"#c4a85a","Comunidad":"#b07dd4",default:"#94a8b8" };

const NewsCard = ({ tag, date, title, desc, link, delay }) => {
  const [hov, setHov] = useState(false);
  const col = TAG_COLORS[tag] || TAG_COLORS.default;
  return (
    <Reveal delay={delay} style={{ flex:"1 1 290px" }}>
      <a href={link} target={link==="#"?"_self":"_blank"} rel="noopener" style={{ display:"block", height:"100%" }}>
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
          style={{ background: hov ? C.s3 : C.s2, border:`1px solid ${hov ? col+"40" : C.border}`,
            borderRadius:"12px", padding:"1.65rem", height:"100%",
            transition:"all .3s ease", transform: hov ? "translateY(-4px)" : "none",
            boxShadow: hov ? "0 14px 36px rgba(0,0,0,.35)" : "none",
            display:"flex", flexDirection:"column", gap:".75rem" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".6rem",
              letterSpacing:".15em", textTransform:"uppercase", color:col,
              background:`${col}18`, border:`1px solid ${col}30`, padding:"3px 9px", borderRadius:"20px" }}>{tag}</span>
            <span style={{ fontFamily:"Lato,sans-serif", fontSize:".8rem", color:C.dim }}>{date}</span>
          </div>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
            fontSize:"1.3rem", color:C.text, margin:0, lineHeight:1.25 }}>{title}</h3>
          <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".88rem",
            color:C.dim, lineHeight:1.6, margin:0, flex:1 }}>{desc}</p>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".7rem",
            letterSpacing:".12em", textTransform:"uppercase", color: hov ? col : C.dim, transition:"color .25s" }}>
            Ver más →
          </div>
        </div>
      </a>
    </Reveal>
  );
};

// ─── Calendario ──────────────────────────────────────────────────
// Actualizá los eventos acá. Formato de fecha: "DD Mes"
const EVENTOS = [
  { fecha:"31 Mayo",   dia:"Sábado",   titulo:"Cena de jóvenes",           lugar:"Por confirmar"        },
  { fecha:"7 Junio",   dia:"Domingo",  titulo:"Bautismos",                 lugar:"Hotel ACA, 11:00 hs"  },
  { fecha:"14 Junio",  dia:"Sábado",   titulo:"Reunión de líderes",        lugar:"Por confirmar"        },
  { fecha:"14 Nov",    dia:"Viernes",  titulo:"Retiro — ida",              lugar:"Posada La Campiña"    },
  { fecha:"15 Nov",    dia:"Sábado",   titulo:"Retiro — vuelta",           lugar:"Posada La Campiña"    },
];

const Novedades = () => (
  <>
    <section id="novedades" style={{ background:C.s1, padding:"6rem clamp(1.5rem,8vw,5rem) 3rem" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <Reveal>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end",
            flexWrap:"wrap", gap:"1rem", marginBottom:"2.5rem" }}>
            <div>
              <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem",
                letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem" }}>Comunidad</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
                fontSize:"clamp(2rem,4vw,3rem)", color:C.text, marginBottom:".75rem" }}>Novedades</h2>
              <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".95rem", color:C.dim, maxWidth:"420px", margin:0 }}>
                Eventos, anuncios y lo que está pasando en la comunidad.
              </p>
            </div>
            <a href="https://www.instagram.com/redimecomunidaddelagracia" target="_blank" rel="noopener"
              style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".74rem",
                letterSpacing:".1em", textTransform:"uppercase", color:C.text,
                padding:"9px 20px", borderRadius:"5px", border:`1px solid ${C.border}`,
                display:"inline-flex", alignItems:"center", gap:"7px", flexShrink:0, transition:"all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#e1306c"; e.currentTarget.style.color = "#e1306c"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
            >📸 Ver Instagram</a>
          </div>
        </Reveal>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"1.1rem" }}>
          {NEWS.map((n, i) => <NewsCard key={n.title} {...n} delay={i * .1} />)}
        </div>
      </div>
    </section>

    {/* Calendario */}
    <section style={{ background:C.s1, padding:"0 clamp(1.5rem,8vw,5rem) 5rem" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <Reveal>
          <div style={{ background:C.s2, border:`1px solid ${C.border}`, borderRadius:"16px", overflow:"hidden" }}>
            <div style={{ padding:"1.4rem 1.75rem", borderBottom:`1px solid ${C.border}`,
              display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:".75rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:".75rem" }}>
                <span style={{ fontSize:"1.1rem" }}>📅</span>
                <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".78rem",
                  letterSpacing:".12em", textTransform:"uppercase", color:C.tealLight }}>Próximos Eventos</div>
              </div>
              <div style={{ fontFamily:"Lato,sans-serif", fontSize:".8rem", color:C.dim }}>
                Actualizá el array EVENTOS en el código para mantenerlo al día
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column" }}>
              {EVENTOS.map((ev, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"1.25rem",
                  padding:"1rem 1.75rem",
                  borderBottom: i < EVENTOS.length-1 ? `1px solid ${C.border}` : "none",
                  transition:"background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.s3}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{ flexShrink:0, width:"54px", textAlign:"center" }}>
                    <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:800, fontSize:"1.1rem",
                      color:C.text, lineHeight:1 }}>{ev.fecha.split(" ")[0]}</div>
                    <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:500, fontSize:".62rem",
                      letterSpacing:".1em", textTransform:"uppercase", color:C.tealLight }}>
                      {ev.fecha.split(" ")[1]}
                    </div>
                  </div>
                  <div style={{ width:"1px", height:"32px", background:C.border, flexShrink:0 }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".82rem",
                      color:C.text, marginBottom:".2rem" }}>{ev.titulo}</div>
                    <div style={{ fontFamily:"Lato,sans-serif", fontSize:".8rem", color:C.dim }}>{ev.dia} · {ev.lugar}</div>
                  </div>
                  <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".65rem",
                    letterSpacing:".1em", color:C.dim, flexShrink:0 }}>→</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </>
);

// ─── Ministries ──────────────────────────────────────────────────
const MINS = [
  { icon:"🔥", title:"Jóvenes",            desc:"Espacio de comunidad, enseñanza y crecimiento para jóvenes que buscan a Cristo." },
  { icon:"🌸", title:"Mujeres",             desc:"Un lugar de encuentro, discipulado y apoyo mutuo para las mujeres de la iglesia." },
  { icon:"⚓", title:"Hombres",             desc:"Comunidad masculina centrada en el carácter, el servicio y la Palabra de Dios." },
  { icon:"⭐", title:"Niños",               desc:"Educación bíblica creativa y segura para los más pequeños de la familia." },
  { icon:"📖", title:"Escuela Bíblica",     desc:"Estudio profundo y sistemático de las Escrituras para toda la iglesia." },
  { icon:"🏠", title:"Grupos Pequeños",     desc:"Comunidades por zonas donde la fe se vive y comparte en lo cotidiano." },
  { icon:"🕊️", title:"Ministerio de Rahab", desc:"Un espacio de gracia, restauración y esperanza para mujeres en situación de vulnerabilidad." },
];

const MinCard = ({ icon, title, desc, delay }) => {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay} style={{ flex:"1 1 270px" }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ background: hov ? C.s3 : C.s1,
          border:`1px solid ${hov ? C.orange+"45" : C.border}`, borderRadius:"12px", padding:"1.65rem",
          transition:"all .3s ease", transform: hov ? "translateY(-4px)" : "none",
          boxShadow: hov ? `0 14px 36px rgba(0,0,0,.35),0 0 0 1px ${C.orange}18` : "none" }}>
        <div style={{ fontSize:"1.6rem", marginBottom:".9rem" }}>{icon}</div>
        <h3 style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".92rem",
          color:C.text, margin:"0 0 .55rem" }}>{title}</h3>
        <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".88rem",
          color:C.dim, lineHeight:1.6, margin:0 }}>{desc}</p>
        <div style={{ marginTop:"1.1rem", height:"2px", borderRadius:"2px",
          width: hov ? "44px" : "18px",
          background:`linear-gradient(to right,${C.orange},${C.tealLight})`,
          transition:"width .3s ease" }} />
      </div>
    </Reveal>
  );
};

const Ministries = () => (
  <section id="ministerios" style={{ background:C.s1, padding:"6rem clamp(1.5rem,8vw,5rem)" }}>
    <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
      <Reveal>
        <div style={{ marginBottom:"2.5rem" }}>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem",
            letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem" }}>Comunidad</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
            fontSize:"clamp(2rem,4vw,3rem)", color:C.text, marginBottom:".75rem" }}>Ministerios</h2>
          <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".95rem",
            color:C.dim, maxWidth:"460px", margin:0 }}>Espacios donde la fe se vive, se practica y se comparte.</p>
        </div>
      </Reveal>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"1.1rem" }}>
        {MINS.map((m, i) => <MinCard key={m.title} {...m} delay={i * .07} />)}
      </div>
    </div>
  </section>
);

// ─── Small Groups ────────────────────────────────────────────────
const GROUPS = [
  { day:"Martes",    tipo:"Mujeres",  leader:"Marcela Messa Kardahi",     barrio:"Bº Palmas de Claret",     address:"Cruz Chica 4685",           time:"8:30 hs",         contact:"351-3664230" },
  { day:"Miércoles", tipo:"Mixto",    leader:"Cristian Gansslen",         barrio:"Bº Altos de Manantiales", address:"Lote 4 Mna 29",             time:"19:00 a 20:30 hs",contact:"351-6171229" },
  { day:"Jueves",    tipo:"Mixto",    leader:"Ezequiel Grimi",            barrio:"Bº San Vicente",           address:"Entre Ríos 2116",           time:"20:00 hs",        contact:"11-78997206" },
  { day:"Jueves",    tipo:"Mixto",    leader:"Sebastián Cabral",          barrio:"Bº Centro América",        address:"Sofía Bozan 2833",          time:"20:15 hs",        contact:"351-2089981" },
  { day:"Jueves",    tipo:"Jóvenes", leader:"Marcelo y Verónica Michell", barrio:"Bº San Fernando",         address:"Pje. Carlos del Signo 360", time:"19:00 hs",        contact:"351-8170687" },
  { day:"Viernes",   tipo:"Mixto",    leader:"Manuel Carbonell",          barrio:"Bº Urca",                  address:"Gines García 3884",         time:"20:00 hs",        contact:"351-3571689" },
];
const DAY_COLOR = { "Martes":"#4ab8ca","Miércoles":"#e06a36","Jueves":"#7ec8a0","Viernes":"#c4a85a" };
const ALL_DAYS  = ["Todos", ...new Set(GROUPS.map(g => g.day))];
const ALL_TIPOS = ["Todos", ...new Set(GROUPS.map(g => g.tipo))];

const SmallGroups = () => {
  const [filterDay,  setFilterDay]  = useState("Todos");
  const [filterTipo, setFilterTipo] = useState("Todos");
  const filtered = GROUPS.filter(g =>
    (filterDay  === "Todos" || g.day  === filterDay)  &&
    (filterTipo === "Todos" || g.tipo === filterTipo)
  );

  const Chip = ({ label, active, onClick }) => (
    <button onClick={onClick} style={{ background: active ? C.tealLight : C.s2,
      border:`1px solid ${active ? C.tealLight : C.border}`,
      color: active ? C.bg : C.dim,
      fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".65rem",
      letterSpacing:".1em", textTransform:"uppercase",
      padding:"6px 14px", borderRadius:"20px", transition:"all .2s",
      whiteSpace:"nowrap" }}>{label}</button>
  );

  return (
    <section id="grupos" style={{ background:C.bg, padding:"6rem clamp(1.5rem,8vw,5rem)" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <Reveal>
          <div style={{ marginBottom:"2rem" }}>
            <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem",
              letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem" }}>Por toda Córdoba</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
              fontSize:"clamp(2rem,4vw,3rem)", color:C.text, marginBottom:".75rem" }}>Grupos Pequeños</h2>
            <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".95rem",
              color:C.dim, maxWidth:"480px", margin:0 }}>La fe en comunidad, cerca de donde vivís. Encontrá tu grupo y unite.</p>
          </div>
        </Reveal>

        {/* Filtros */}
        <Reveal delay={.08}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"1.5rem", marginBottom:"1.75rem", alignItems:"center" }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:".45rem", alignItems:"center" }}>
              <span style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".62rem",
                letterSpacing:".15em", textTransform:"uppercase", color:C.dim, marginRight:".25rem" }}>Día</span>
              {ALL_DAYS.map(d => <Chip key={d} label={d} active={filterDay===d} onClick={() => setFilterDay(d)} />)}
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:".45rem", alignItems:"center" }}>
              <span style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".62rem",
                letterSpacing:".15em", textTransform:"uppercase", color:C.dim, marginRight:".25rem" }}>Tipo</span>
              {ALL_TIPOS.map(t => <Chip key={t} label={t} active={filterTipo===t} onClick={() => setFilterTipo(t)} />)}
            </div>
          </div>
        </Reveal>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"1.1rem" }}>
          {filtered.map((g, i) => {
            const dayCol = DAY_COLOR[g.day] || C.tealLight;
            return (
              <Reveal key={g.leader} delay={i * .07}>
                <div style={{ background:C.s2, border:`1px solid ${C.border}`, borderRadius:"12px",
                  padding:"1.55rem", position:"relative", overflow:"hidden", height:"100%" }}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:dayCol }} />
                  <div style={{ display:"flex", alignItems:"center", gap:".55rem", marginBottom:".8rem" }}>
                    <span style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".62rem",
                      letterSpacing:".16em", textTransform:"uppercase", color:dayCol }}>{g.day}</span>
                    <span style={{ width:"3px", height:"3px", borderRadius:"50%", background:C.dim, display:"inline-block" }} />
                    <span style={{ fontFamily:"Montserrat,sans-serif", fontWeight:500, fontSize:".62rem",
                      letterSpacing:".1em", textTransform:"uppercase", color:C.dim }}>{g.tipo}</span>
                  </div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"1.2rem",
                    color:C.text, lineHeight:1.2, marginBottom:".85rem" }}>{g.leader}</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:".3rem" }}>
                    <div style={{ display:"flex", gap:".5rem", alignItems:"flex-start",
                      fontFamily:"Lato,sans-serif", fontSize:".82rem", color:C.dim }}>
                      <span style={{ flexShrink:0 }}>📍</span><span>{g.address} · {g.barrio}</span>
                    </div>
                    <div style={{ display:"flex", gap:".5rem", alignItems:"center",
                      fontFamily:"Lato,sans-serif", fontSize:".82rem", color:C.dim }}>
                      <span style={{ flexShrink:0 }}>🕐</span><span>{g.time}</span>
                    </div>
                    <a href={`https://wa.me/54${g.contact.replace(/[-\s]/g,"")}`} target="_blank" rel="noopener"
                      style={{ display:"flex", gap:".5rem", alignItems:"center",
                        fontFamily:"Lato,sans-serif", fontSize:".82rem", color:C.dim, transition:"color .2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#25d366"}
                      onMouseLeave={e => e.currentTarget.style.color = C.dim}>
                      <span style={{ flexShrink:0 }}>💬</span><span>{g.contact}</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"3rem",
              fontFamily:"Lato,sans-serif", color:C.dim }}>
              No hay grupos con ese filtro. Probá otra combinación.
            </div>
          )}
        </div>

        <Reveal delay={.46}>
          <div style={{ marginTop:"1.75rem", padding:"1.4rem 1.75rem", borderRadius:"12px",
            background:C.s2, border:`1px solid ${C.border}`,
            display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"1rem" }}>
            <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".9rem", color:C.dim, margin:0 }}>
              ¿No encontrás un grupo cerca? Escribinos y te conectamos.
            </p>
            <a href="https://www.instagram.com/redimecomunidaddelagracia" target="_blank" rel="noopener"
              style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".72rem",
                letterSpacing:".12em", textTransform:"uppercase", color:C.orange }}>Contactar →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ─── Sermons ─────────────────────────────────────────────────────
const SERMONS = [
  { tag:"Destacada",      videoId:"FjZefjyjKqI", title:"[Título de la predicación]",  speaker:"[Pastor]",         date:"[Fecha]", desc:"Ingresá al canal para acceder a la prédica más reciente de la iglesia."          },
  { tag:"Serie en curso", videoId:"frPh7FerSpM", title:"[Título de la serie]",        speaker:"[Pastor]",         date:"[Fecha]", desc:"Enseñanza bíblica fiel y accesible para toda la familia."                         },
  { tag:"Culto especial", videoId:"LK88sH6KBcs", title:"[Culto especial]",            speaker:"[Invitado/Pastor]",date:"[Fecha]", desc:"Momentos especiales guardados para la edificación de la comunidad."               },
];
const TAG_SERMON_COLORS = { "Destacada":"#e06a36","Serie en curso":"#4ab8ca","Culto especial":"#c4a85a" };

const Sermons = () => {
  const [feat, ...rest] = SERMONS;
  const [hovFeat, setHovFeat] = useState(false);
  const [hovIdx,  setHovIdx]  = useState(null);

  const ytUrl   = id => `https://www.youtube.com/watch?v=${id}`;
  const thumb   = (id, q="maxresdefault") => `https://img.youtube.com/vi/${id}/${q}.jpg`;

  return (
    <section id="predicaciones" style={{ background:C.s1, padding:"6rem clamp(1.5rem,8vw,5rem)" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <Reveal>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end",
            flexWrap:"wrap", gap:"1.25rem", marginBottom:"2.5rem" }}>
            <div>
              <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem",
                letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem" }}>La Palabra</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
                fontSize:"clamp(2rem,4vw,3rem)", color:C.text, marginBottom:".75rem" }}>Predicaciones</h2>
              <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".95rem",
                color:C.dim, maxWidth:"400px", margin:0 }}>Enseñanza fiel y accesible desde la Escritura.</p>
            </div>
            <a href="https://www.youtube.com/@iglesiaredime" target="_blank" rel="noopener"
              style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".74rem",
                letterSpacing:".1em", textTransform:"uppercase", color:C.text,
                padding:"9px 20px", borderRadius:"5px", border:`1px solid ${C.border}`,
                display:"inline-flex", alignItems:"center", gap:"7px", flexShrink:0, transition:"all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff4040"; e.currentTarget.style.color = "#ff4040"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
            >▶ Ver canal completo</a>
          </div>
        </Reveal>

        {/* Featured sermon — grande */}
        <Reveal delay={.08}>
          <a href={ytUrl(feat.videoId)} target="_blank" rel="noopener"
            style={{ display:"block", marginBottom:"1.25rem" }}>
            <div onMouseEnter={() => setHovFeat(true)} onMouseLeave={() => setHovFeat(false)}
              style={{ borderRadius:"16px", overflow:"hidden",
                border:`1px solid ${hovFeat ? TAG_SERMON_COLORS[feat.tag]+"45" : C.border}`,
                transition:"all .3s ease",
                boxShadow: hovFeat ? "0 20px 50px rgba(0,0,0,.5)" : "none",
                display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))" }}>
              {/* Thumb */}
              <div style={{ position:"relative", aspectRatio:"16/9", overflow:"hidden", minHeight:"200px" }}>
                <img src={thumb(feat.videoId)} onError={e => { e.target.src = thumb(feat.videoId,"hqdefault"); }}
                  alt={feat.title}
                  style={{ width:"100%", height:"100%", objectFit:"cover",
                    transition:"transform .4s ease", transform: hovFeat ? "scale(1.04)" : "scale(1)" }} />
                <div style={{ position:"absolute", inset:0,
                  background: hovFeat ? "rgba(0,0,0,.3)" : "rgba(0,0,0,.45)",
                  display:"flex", alignItems:"center", justifyContent:"center", transition:"background .3s" }}>
                  <div style={{ width:"64px", height:"64px", borderRadius:"50%",
                    background: hovFeat ? C.orange : "rgba(237,233,223,.12)",
                    border:`2px solid ${hovFeat ? C.orange : "rgba(237,233,223,.3)"}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:"1.5rem", color:"#fff", paddingLeft:"5px",
                    transition:"all .3s", boxShadow: hovFeat ? `0 0 28px ${C.orange}55` : "none" }}>▶</div>
                </div>
                <span style={{ position:"absolute", top:"12px", left:"12px",
                  fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".6rem",
                  letterSpacing:".14em", textTransform:"uppercase",
                  color:TAG_SERMON_COLORS[feat.tag], background:"rgba(5,14,22,.85)",
                  border:`1px solid ${TAG_SERMON_COLORS[feat.tag]}45`,
                  padding:"4px 10px", borderRadius:"20px", backdropFilter:"blur(6px)" }}>{feat.tag}</span>
              </div>
              {/* Info */}
              <div style={{ background:C.s2, padding:"2rem 2rem", display:"flex", flexDirection:"column", justifyContent:"center", gap:".65rem" }}>
                <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".65rem",
                  letterSpacing:".15em", color:C.dim, textTransform:"uppercase" }}>
                  {feat.speaker} · {feat.date}
                </div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
                  fontSize:"clamp(1.4rem,2.5vw,1.9rem)", color:C.text, margin:0, lineHeight:1.2 }}>{feat.title}</h3>
                <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".9rem",
                  color:C.dim, lineHeight:1.6, margin:0 }}>{feat.desc}</p>
                <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".72rem",
                  letterSpacing:".12em", textTransform:"uppercase",
                  color: hovFeat ? TAG_SERMON_COLORS[feat.tag] : C.dim, transition:"color .25s", marginTop:".25rem" }}>
                  Ver predicación →
                </div>
              </div>
            </div>
          </a>
        </Reveal>

        {/* Smaller cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1.1rem" }}>
          {rest.map((s, i) => {
            const col = TAG_SERMON_COLORS[s.tag] || C.tealLight;
            const hov = hovIdx === i;
            return (
              <Reveal key={s.videoId} delay={i * .1 + .15}>
                <a href={ytUrl(s.videoId)} target="_blank" rel="noopener" style={{ display:"block", height:"100%" }}>
                  <div onMouseEnter={() => setHovIdx(i)} onMouseLeave={() => setHovIdx(null)}
                    style={{ background:C.s2, border:`1px solid ${hov ? col+"45" : C.border}`,
                      borderRadius:"12px", overflow:"hidden", transition:"all .3s ease",
                      transform: hov ? "translateY(-4px)" : "none",
                      boxShadow: hov ? "0 14px 36px rgba(0,0,0,.4)" : "none",
                      display:"flex", flexDirection:"column", height:"100%" }}>
                    <div style={{ position:"relative", aspectRatio:"16/9", overflow:"hidden", flexShrink:0 }}>
                      <img src={thumb(s.videoId,"hqdefault")} alt={s.title}
                        style={{ width:"100%", height:"100%", objectFit:"cover",
                          transition:"transform .4s ease", transform: hov ? "scale(1.04)" : "scale(1)" }} />
                      <div style={{ position:"absolute", inset:0,
                        background: hov ? "rgba(0,0,0,.3)" : "rgba(0,0,0,.5)",
                        display:"flex", alignItems:"center", justifyContent:"center", transition:"background .3s" }}>
                        <div style={{ width:"42px", height:"42px", borderRadius:"50%",
                          background: hov ? C.orange : "rgba(237,233,223,.12)",
                          border:`2px solid ${hov ? C.orange : "rgba(237,233,223,.3)"}`,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:"1rem", color:"#fff", paddingLeft:"3px", transition:"all .3s" }}>▶</div>
                      </div>
                      <span style={{ position:"absolute", top:"8px", left:"8px",
                        fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".58rem",
                        letterSpacing:".13em", textTransform:"uppercase",
                        color:col, background:"rgba(5,14,22,.85)",
                        border:`1px solid ${col}40`, padding:"3px 8px", borderRadius:"20px" }}>{s.tag}</span>
                    </div>
                    <div style={{ padding:"1.1rem", flex:1, display:"flex", flexDirection:"column", gap:".4rem" }}>
                      <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".62rem",
                        letterSpacing:".12em", color:C.dim, textTransform:"uppercase" }}>{s.speaker} · {s.date}</div>
                      <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
                        fontSize:"1.15rem", color:C.text, margin:0, lineHeight:1.25 }}>{s.title}</h4>
                      <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".67rem",
                        letterSpacing:".1em", textTransform:"uppercase",
                        color: hov ? col : C.dim, transition:"color .25s", marginTop:"auto", paddingTop:".3rem" }}>
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

// ─── Pastoral Team ───────────────────────────────────────────────
const TEAM = [
  { name:"Manuel Carbonell",  role:"Anciano", desc:"Comprometido con la fidelidad a las Escrituras y el amor a la congregación.", img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name:"Cristian Gansslen", role:"Anciano", desc:"Comprometido con la fidelidad a las Escrituras y el amor a la congregación.", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name:"Eduardo Kardahi",   role:"Anciano", desc:"Comprometido con la fidelidad a las Escrituras y el amor a la congregación.", img:"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
  { name:"Marcelo Michell",   role:"Anciano", desc:"Comprometido con la fidelidad a las Escrituras y el amor a la congregación.", img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
];

const Team = () => (
  <section style={{ background:C.bg, padding:"6rem clamp(1.5rem,8vw,5rem)" }}>
    <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
      <Reveal>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem",
            letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem" }}>Liderazgo</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
            fontSize:"clamp(2rem,4vw,3rem)", color:C.text, marginBottom:".75rem" }}>Equipo Pastoral</h2>
          <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".95rem",
            color:C.dim, maxWidth:"400px", margin:"0 auto" }}>Personas comprometidas con servir a la iglesia y a la comunidad.</p>
        </div>
      </Reveal>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"2.5rem", justifyContent:"center" }}>
        {TEAM.map((p, i) => (
          <Reveal key={p.name} delay={i * .14} style={{ flex:"1 1 220px", maxWidth:"260px" }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ width:"110px", height:"110px", borderRadius:"50%", margin:"0 auto 1.2rem",
                overflow:"hidden", border:`3px solid ${C.teal}`, boxShadow:`0 0 0 1px ${C.border}` }}>
                <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
                fontSize:"1.3rem", color:C.text, marginBottom:".3rem" }}>{p.name}</h3>
              <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".65rem",
                letterSpacing:".15em", textTransform:"uppercase", color:C.orange, marginBottom:".7rem" }}>{p.role}</div>
              <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".88rem",
                color:C.dim, lineHeight:1.6, margin:0 }}>{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ─── Contact ─────────────────────────────────────────────────────
const Contact = () => (
  <section id="contacto" style={{ background:C.s1, padding:"6rem clamp(1.5rem,8vw,5rem)" }}>
    <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
      <Reveal>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem",
            letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem" }}>Visitanos</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
            fontSize:"clamp(2rem,4vw,3rem)", color:C.text, marginBottom:".75rem" }}>Encontranos</h2>
          <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".95rem",
            color:C.dim, maxWidth:"400px", margin:"0 auto" }}>Estaremos felices de recibirte. Venís como sos.</p>
        </div>
      </Reveal>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"2rem" }}>
        <Reveal delay={.1}>
          <div style={{ background:C.s2, border:`1px solid ${C.border}`, borderRadius:"16px", padding:"2rem" }}>
            <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".78rem",
              letterSpacing:".12em", textTransform:"uppercase", color:C.tealLight, marginBottom:"1.25rem" }}>Seguinos</div>
            <div style={{ display:"flex", flexDirection:"column", gap:".85rem", marginBottom:"1.75rem" }}>
              {[
                { label:"Instagram", handle:"@redimecomunidaddelagracia", href:"https://www.instagram.com/redimecomunidaddelagracia", icon:"📸", accent:"#e1306c" },
                { label:"YouTube",   handle:"@iglesiaredime",              href:"https://www.youtube.com/@iglesiaredime",              icon:"▶",  accent:"#ff4040" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener"
                  style={{ display:"flex", alignItems:"center", gap:"1rem", padding:".8rem 1rem",
                    borderRadius:"8px", border:`1px solid ${C.border}`, background:C.s1, transition:"all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.accent+"55"; e.currentTarget.style.background = C.s3; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.s1; }}>
                  <div style={{ width:"34px", height:"34px", borderRadius:"7px",
                    background:`${s.accent}20`, border:`1px solid ${s.accent}35`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:"1rem", color:s.accent, flexShrink:0 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".76rem", color:C.text }}>{s.label}</div>
                    <div style={{ fontFamily:"Lato,sans-serif", fontSize:".8rem", color:C.dim }}>{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"1.5rem" }}>
              <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".78rem",
                letterSpacing:".12em", textTransform:"uppercase", color:C.tealLight, marginBottom:"1rem" }}>Dirección</div>
              <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".9rem",
                color:"rgba(237,233,223,.72)", lineHeight:1.75, margin:0 }}>
                <strong style={{ color:C.text, fontWeight:700 }}>Hotel ACA</strong><br />
                Cesar Carman · Córdoba · Argentina<br /><br />
                <strong style={{ color:C.text, fontWeight:700 }}>Domingos · 11:00 hs</strong>
              </p>
              <a href="https://maps.google.com/?q=Hotel+ACA+Cesar+Carman+Córdoba+Argentina" target="_blank" rel="noopener"
                style={{ display:"inline-block", marginTop:"1rem",
                  fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".7rem",
                  letterSpacing:".12em", textTransform:"uppercase", color:C.orange }}>
                Ver en Google Maps →
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={.2}>
          <div style={{ borderRadius:"16px", overflow:"hidden", border:`1px solid ${C.border}`, minHeight:"360px" }}>
            <iframe title="Ubicación REDIME Córdoba"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-64.2050,-31.4250,-64.1650,-31.4000&layer=mapnik&marker=-31.4135,-64.1811"
              width="100%" height="100%"
              style={{ border:"none", minHeight:"360px", display:"block",
                filter:"brightness(.75) saturate(.5) hue-rotate(195deg)" }} />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ─── Footer ──────────────────────────────────────────────────────
const FOOTER_LINKS = [
  { title:"Iglesia",    items:[
    { label:"Nosotros",       id:"nosotros"    },
    { label:"Ministerios",    id:"ministerios" },
    { label:"Equipo pastoral",id:"contacto"    },
  ]},
  { title:"Comunidad",  items:[
    { label:"Grupos pequeños", id:"grupos"        },
    { label:"Predicaciones",   id:"predicaciones" },
    { label:"Novedades",       id:"novedades"     },
  ]},
  { title:"Creencias",  items:[
    { label:"La Biblia como Palabra de Dios",  href:"#" },
    { label:"Salvación solo por gracia",        href:"#" },
    { label:"La iglesia local como familia",    href:"#" },
  ]},
];

const Footer = () => (
  <footer style={{ background:C.darkest, borderTop:`1px solid ${C.border}`,
    padding:"4rem clamp(1.5rem,8vw,5rem) 2rem" }}>
    <div style={{ maxWidth:"1100px", margin:"0 auto" }}>

      {/* Top grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",
        gap:"2.5rem", marginBottom:"3rem" }}>
        {/* Brand */}
        <div style={{ gridColumn:"span 1" }}>
          <Logo sz={32} variant="standalone" />
          <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".85rem",
            color:C.dim, marginTop:"1rem", maxWidth:"200px", lineHeight:1.65 }}>
            Una iglesia bíblica, cálida y centrada en Cristo en Córdoba, Argentina.
          </p>
          <div style={{ display:"flex", gap:".55rem", marginTop:"1.1rem" }}>
            {[
              { href:"https://www.instagram.com/redimecomunidaddelagracia", icon:"📸" },
              { href:"https://www.youtube.com/@iglesiaredime", icon:"▶" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener"
                style={{ width:"34px", height:"34px", borderRadius:"7px",
                  border:`1px solid ${C.border}`, display:"flex", alignItems:"center",
                  justifyContent:"center", fontSize:".9rem", color:C.dim, transition:"all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.tealLight; e.currentTarget.style.color = C.tealLight; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.dim; }}
              >{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_LINKS.map(col => (
          <div key={col.title}>
            <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".63rem",
              letterSpacing:".2em", textTransform:"uppercase", color:C.tealLight, marginBottom:"1.1rem" }}>{col.title}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:".6rem" }}>
              {col.items.map(item => {
                const style0 = { fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".86rem",
                  color:C.dim, background:"none", border:"none", textAlign:"left",
                  padding:0, cursor:"pointer", transition:"color .2s" };
                return item.id
                  ? <button key={item.label} style={style0}
                      onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior:"smooth" })}
                      onMouseEnter={e => e.currentTarget.style.color = C.text}
                      onMouseLeave={e => e.currentTarget.style.color = C.dim}
                    >{item.label}</button>
                  : <a key={item.label} href={item.href} style={{ ...style0, cursor:"default", color:C.dim+"88", pointerEvents:"none" }}>{item.label}</a>;
              })}
            </div>
          </div>
        ))}

        {/* Info */}
        <div>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".63rem",
            letterSpacing:".2em", textTransform:"uppercase", color:C.tealLight, marginBottom:"1.1rem" }}>Visitanos</div>
          <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".86rem",
            color:C.dim, lineHeight:1.85, margin:"0 0 .5rem" }}>
            Domingos · 11:00 hs<br />
            Hotel ACA, Cesar Carman<br />
            Córdoba, Argentina
          </p>
          <a href="https://maps.google.com/?q=Hotel+ACA+Cesar+Carman+Córdoba+Argentina"
            target="_blank" rel="noopener"
            style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem",
              letterSpacing:".12em", textTransform:"uppercase", color:C.orange }}>
            Ver mapa →
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"1.75rem",
        display:"flex", flexWrap:"wrap", gap:"1rem",
        justifyContent:"space-between", alignItems:"center" }}>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
          fontSize:"1rem", color:C.dim, margin:0 }}>
          "La gracia y la verdad vinieron por medio de Jesucristo." — Juan 1:17
        </p>
        <div style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap" }}>
          <p style={{ fontFamily:"Lato,sans-serif", fontSize:".72rem", color:C.dim+"66", margin:0 }}>Política de privacidad</p>
          <p style={{ fontFamily:"Lato,sans-serif", fontSize:".72rem", color:C.dim+"66", margin:0 }}>
            © {new Date().getFullYear()} REDIME — Comunidad de la Gracia
          </p>
        </div>
      </div>
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => { document.title = "REDIME — Comunidad de la Gracia"; }, []);
  return (
    <div style={{ background:C.bg, color:C.text, minHeight:"100vh" }}>
      <GlobalStyles />
      <Navbar />
      <MobileCTA />
      <main>
        <Hero />
        <QuickInfo />
        <PrimeraVez />
        <MissionVision />
        <Testimonios />
        <VersiculoMes />
        <Novedades />
        <Ministries />
        <SmallGroups />
        <Sermons />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
