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

    .ham-btn  { display:none!important; background:none; border:none; flex-direction:column; gap:5px; padding:4px; }
    .desk-nav { display:flex; align-items:center; gap:2rem; }

    @media(max-width:820px){
      .ham-btn  { display:flex!important; }
      .desk-nav { display:none!important; }
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
const LogoMark = ({ sz = 38 }) => (
  <svg width={sz} height={sz} viewBox="0 0 100 100" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="50" cy="50" r="50" fill="#152535" />
    <defs>
      <linearGradient id="lgo" x1="25" y1="74" x2="70" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#b83e18" />
        <stop offset="55%"  stopColor="#e86030" />
        <stop offset="100%" stopColor="#f48040" />
      </linearGradient>
    </defs>
    <path d="M28 70 C36 58 50 42 67 27 C76 43 73 63 60 71 C52 76 36 74 28 70Z" fill="url(#lgo)" />
    <path d="M40 65 C46 55 56 44 66 34 C72 46 68 60 58 66 C52 70 44 68 40 65Z" fill="#152535" opacity=".5" />
    <path d="M63 27 C67 21 73 20 75 25 C72 26 68 27 63 27Z" fill="#5bcdd8" />
  </svg>
);

const Logo = ({ sz = 38 }) => (
  <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
    <LogoMark sz={sz} />
    <div>
      <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:800, fontSize:sz*.42+"px", letterSpacing:".07em", lineHeight:1.1, color:C.text }}>REDIME</div>
      <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:500, fontSize:sz*.21+"px", letterSpacing:".14em", lineHeight:1.2, color:C.dim }}>COMUNIDAD DE LA GRACIA</div>
    </div>
  </div>
);

// ─── Navbar ──────────────────────────────────────────────────────
const NAV = [
  { label:"Inicio",        id:"inicio"        },
  { label:"Nosotros",      id:"nosotros"      },
  { label:"Ministerios",   id:"ministerios"   },
  { label:"Grupos",        id:"grupos"        },
  { label:"Predicaciones", id:"predicaciones" },
  { label:"Contacto",      id:"contacto"      },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = id => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  };

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:`0 clamp(1.25rem,5vw,3rem)`,
        height: scrolled ? "62px" : "78px",
        background: scrolled ? "rgba(5,14,22,.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition:"height .3s ease, background .35s ease"
      }}>
        <Logo sz={34} />

        {/* Desktop */}
        <div className="desk-nav">
          {NAV.map(({ label, id }) => (
            <button key={id} onClick={() => go(id)} style={{
              background:"none", border:"none",
              fontFamily:"Montserrat,sans-serif", fontWeight:500, fontSize:".8rem",
              letterSpacing:".05em", color:C.dim, transition:"color .2s", padding:"4px 0"
            }}
              onMouseEnter={e => e.target.style.color = C.text}
              onMouseLeave={e => e.target.style.color = C.dim}
            >{label}</button>
          ))}
          <button onClick={() => go("contacto")} style={{
            background:C.orange, border:"none",
            fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".75rem",
            letterSpacing:".09em", textTransform:"uppercase", color:"#fff",
            padding:"9px 20px", borderRadius:"5px", marginLeft:".5rem",
            transition:"background .2s, transform .2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.orangeHot; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.orange;    e.currentTarget.style.transform = "none"; }}
          >Visitanos</button>
        </div>

        {/* Hamburger */}
        <button className="ham-btn" onClick={() => setOpen(o => !o)} aria-label="Menú">
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display:"block", width:"22px", height:"2px",
              background:C.text, borderRadius:"2px", transition:"all .3s ease",
              transform: open
                ? i === 0 ? "rotate(45deg) translateY(7px)"
                : i === 2 ? "rotate(-45deg) translateY(-7px)"
                : "none"
                : "none",
              opacity: open && i === 1 ? 0 : 1
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div style={{
        position:"fixed", inset:0, zIndex:999,
        background:C.bg, display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", gap:"1.75rem",
        opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none",
        transition:"opacity .3s ease"
      }}>
        <Logo sz={44} />
        {NAV.map(({ label, id }) => (
          <button key={id} onClick={() => go(id)} style={{
            background:"none", border:"none",
            fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"2rem",
            color:C.text, letterSpacing:".03em"
          }}>{label}</button>
        ))}
        <button onClick={() => go("contacto")} style={{
          background:C.orange, border:"none",
          fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".85rem",
          letterSpacing:".1em", textTransform:"uppercase", color:"#fff",
          padding:"13px 30px", borderRadius:"5px", marginTop:".5rem"
        }}>Visitanos</button>
      </div>
    </>
  );
};

// ─── Hero ────────────────────────────────────────────────────────
const Hero = () => (
  <section id="inicio" style={{
    position:"relative", height:"100svh", minHeight:"580px",
    display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden"
  }}>
    <div style={{
      position:"absolute", inset:0,
      backgroundImage:"url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80)",
      backgroundSize:"cover", backgroundPosition:"center 25%",
      filter:"brightness(.35) saturate(.6)"
    }} />
    <div style={{
      position:"absolute", inset:0,
      background:`linear-gradient(160deg,rgba(2,11,18,.3) 0%,rgba(5,14,22,.05) 50%,rgba(5,14,22,.88) 100%)`
    }} />
    {/* Teal accent line left */}
    <div style={{
      position:"absolute", left:0, top:"15%", bottom:"15%", width:"3px",
      background:`linear-gradient(to bottom,transparent,${C.tealLight}80,transparent)`
    }} />

    <div style={{ position:"relative", zIndex:2, textAlign:"center", padding:"0 clamp(1.5rem,8vw,5rem)", maxWidth:"900px" }}>
      <div style={{
        fontFamily:"Montserrat,sans-serif", fontWeight:500, fontSize:".68rem",
        letterSpacing:".28em", textTransform:"uppercase", color:C.tealLight,
        marginBottom:"1.5rem",
        opacity:0, animation:"hUp .8s ease .3s forwards"
      }}>Córdoba · Argentina</div>

      <h1 style={{
        fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
        fontSize:"clamp(2.4rem,6.5vw,5.5rem)", lineHeight:1.1,
        color:C.text, margin:"0 0 1.5rem",
        opacity:0, animation:"hUp .9s ease .5s forwards"
      }}>
        Conocer a Cristo.<br />
        <em style={{ fontStyle:"italic", color:C.tealLight }}>Crecer en Su Palabra.</em><br />
        Vivir en comunidad.
      </h1>

      <p style={{
        fontFamily:"Lato,sans-serif", fontWeight:300,
        fontSize:"clamp(.92rem,1.8vw,1.1rem)", lineHeight:1.75,
        color:"rgba(237,233,223,.72)", maxWidth:"520px", margin:"0 auto 2.5rem",
        opacity:0, animation:"hUp .9s ease .7s forwards"
      }}>
        Una comunidad centrada en Cristo, la gracia y la enseñanza bíblica.
      </p>

      <div style={{
        display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap",
        opacity:0, animation:"hUp .9s ease .9s forwards"
      }}>
        {[
          { label:"Ver horarios", id:"nosotros", primary:true },
          { label:"Cómo llegar",  id:"contacto", primary:false },
        ].map(({ label, id, primary }) => (
          <button key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" })}
            style={{
              background: primary ? C.orange : "transparent",
              border: primary ? "none" : `1px solid rgba(237,233,223,.32)`,
              color:"#fff", fontFamily:"Montserrat,sans-serif", fontWeight:700,
              fontSize:".78rem", letterSpacing:".1em", textTransform:"uppercase",
              padding:"13px 28px", borderRadius:"5px", transition:"all .25s"
            }}
            onMouseEnter={e => {
              if (primary) e.currentTarget.style.background = C.orangeHot;
              else { e.currentTarget.style.borderColor = C.tealLight; e.currentTarget.style.color = C.tealLight; }
            }}
            onMouseLeave={e => {
              if (primary) e.currentTarget.style.background = C.orange;
              else { e.currentTarget.style.borderColor = "rgba(237,233,223,.32)"; e.currentTarget.style.color = "#fff"; }
            }}
          >{label}</button>
        ))}
      </div>
    </div>

    {/* Scroll indicator */}
    <div style={{
      position:"absolute", bottom:"1.75rem", left:"50%", transform:"translateX(-50%)",
      opacity:0, animation:"hIn 1s ease 1.6s forwards"
    }}>
      <div style={{
        width:"1px", height:"44px", margin:"0 auto",
        background:`linear-gradient(to bottom,transparent,${C.tealLight})`,
        animation:"pulse 2s ease infinite"
      }} />
    </div>
  </section>
);

// ─── Quick Info Cards ────────────────────────────────────────────
const InfoCard = ({ icon, title, children, cta, ctaHref, delay = 0 }) => {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay} style={{ flex:"1 1 250px" }}>
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? C.s3 : C.s2,
          border:`1px solid ${hov ? C.tealLight+"38" : C.border}`,
          borderRadius:"12px", padding:"1.75rem 1.5rem", height:"100%",
          transition:"all .3s ease",
          transform: hov ? "translateY(-4px)" : "none",
          boxShadow: hov ? "0 12px 36px rgba(0,0,0,.4)" : "0 4px 16px rgba(0,0,0,.2)"
        }}
      >
        <div style={{
          width:"42px", height:"42px", borderRadius:"9px",
          background:`linear-gradient(135deg,${C.teal},${C.s3})`,
          border:`1px solid ${C.border}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:"1.2rem", marginBottom:"1.2rem"
        }}>{icon}</div>
        <h3 style={{
          fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".82rem",
          letterSpacing:".1em", textTransform:"uppercase",
          color:C.tealLight, marginBottom:".65rem"
        }}>{title}</h3>
        <div style={{
          fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".9rem",
          color:"rgba(237,233,223,.72)", lineHeight:1.65
        }}>{children}</div>
        {cta && (
          <a href={ctaHref} target="_blank" rel="noopener" style={{
            display:"inline-block", marginTop:"1.1rem",
            fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".72rem",
            letterSpacing:".1em", textTransform:"uppercase",
            color:C.orange, transition:"letter-spacing .2s"
          }}
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
        cta="Ver en mapa"
        ctaHref="https://maps.google.com/?q=Hotel+AKA+Cesar+Carman+Córdoba+Argentina">
        <strong style={{ color:C.text, fontWeight:700 }}>Hotel AKA</strong><br />
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

// ─── Mission & Vision ────────────────────────────────────────────
const MissionVision = () => (
  <section style={{ background:C.bg, padding:"6rem clamp(1.5rem,8vw,5rem)" }}>
    <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
      <Reveal>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <div style={{
            fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem",
            letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem"
          }}>¿Quiénes somos?</div>
          <h2 style={{
            fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
            fontSize:"clamp(2rem,4vw,3rem)", color:C.text, margin:0
          }}>Misión & Visión</h2>
        </div>
      </Reveal>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"2rem" }}>
        {/* Misión */}
        <Reveal delay={.1}>
          <div style={{
            position:"relative", overflow:"hidden",
            background:`linear-gradient(140deg,${C.s2} 0%,${C.teal} 100%)`,
            border:`1px solid ${C.border}`, borderRadius:"16px",
            padding:"2.5rem", minHeight:"300px"
          }}>
            <div style={{ position:"absolute", top:"-50px", right:"-50px", width:"180px", height:"180px", borderRadius:"50%", background:`radial-gradient(circle,${C.tealLight}14,transparent 70%)` }} />
            <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"140px", height:"140px", borderRadius:"50%", background:`radial-gradient(circle,${C.orange}14,transparent 70%)` }} />
            <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem", letterSpacing:".22em", textTransform:"uppercase", color:C.orange, marginBottom:"1.2rem" }}>Misión</div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"1.8rem", color:C.text, marginBottom:"1.4rem", lineHeight:1.2 }}>¿Por qué existimos?</h3>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:".8rem" }}>
              {[
                "Conectar a las personas con Dios y con los demás.",
                "Crecer en el conocimiento de Su Palabra.",
                "Compartir la buena noticia de Jesucristo viviendo en comunidad."
              ].map(t => (
                <li key={t} style={{ display:"flex", gap:".75rem", alignItems:"flex-start", fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".92rem", color:"rgba(237,233,223,.8)", lineHeight:1.55 }}>
                  <span style={{ color:C.tealLight, marginTop:"1px", flexShrink:0, fontWeight:700 }}>—</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Visión */}
        <Reveal delay={.22}>
          <div style={{
            position:"relative", overflow:"hidden",
            background:`linear-gradient(140deg,${C.s2} 0%,#1a2f42 100%)`,
            border:`1px solid ${C.border}`, borderRadius:"16px",
            padding:"2.5rem", minHeight:"300px",
            display:"flex", flexDirection:"column", justifyContent:"space-between"
          }}>
            <div style={{ position:"absolute", top:"-30px", left:"50%", transform:"translateX(-50%)", width:"220px", height:"220px", borderRadius:"50%", background:`radial-gradient(circle,${C.orange}12,transparent 65%)` }} />
            <div>
              <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem", letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:"1.2rem" }}>Visión</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"1.8rem", color:C.text, marginBottom:"1.5rem", lineHeight:1.2 }}>¿Hacia dónde vamos?</h3>
            </div>
            <blockquote style={{
              fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
              fontSize:"1.35rem", color:"rgba(237,233,223,.88)", lineHeight:1.6,
              borderLeft:`3px solid ${C.orange}`, paddingLeft:"1.25rem", margin:0
            }}>
              "Ser una iglesia unida que conoce profundamente a Cristo, crece a Su imagen y se edifica en amor."
            </blockquote>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ─── Ministries ──────────────────────────────────────────────────
const MINS = [
  { icon:"🔥", title:"Jóvenes",        desc:"Espacio de comunidad, enseñanza y crecimiento para jóvenes que buscan a Cristo." },
  { icon:"🌸", title:"Mujeres",         desc:"Un lugar de encuentro, discipulado y apoyo mutuo para las mujeres de la iglesia." },
  { icon:"⚓", title:"Hombres",         desc:"Comunidad masculina centrada en el carácter, el servicio y la Palabra de Dios." },
  { icon:"⭐", title:"Niños",           desc:"Educación bíblica creativa y segura para los más pequeños de la familia." },
  { icon:"📖", title:"Escuela Bíblica", desc:"Estudio profundo y sistemático de las Escrituras para toda la iglesia." },
  { icon:"🏠", title:"Grupos Pequeños", desc:"Comunidades por zonas donde la fe se vive y comparte en lo cotidiano." },
];

const MinCard = ({ icon, title, desc, delay }) => {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay} style={{ flex:"1 1 270px" }}>
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? C.s3 : C.s1,
          border:`1px solid ${hov ? C.orange+"45" : C.border}`,
          borderRadius:"12px", padding:"1.65rem",
          transition:"all .3s ease",
          transform: hov ? "translateY(-4px)" : "none",
          boxShadow: hov ? `0 14px 36px rgba(0,0,0,.35),0 0 0 1px ${C.orange}18` : "none"
        }}
      >
        <div style={{ fontSize:"1.6rem", marginBottom:".9rem" }}>{icon}</div>
        <h3 style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".92rem", color:C.text, marginBottom:".55rem", margin:"0 0 .55rem" }}>{title}</h3>
        <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".88rem", color:C.dim, lineHeight:1.6, margin:0 }}>{desc}</p>
        <div style={{
          marginTop:"1.1rem", height:"2px", borderRadius:"2px",
          width: hov ? "44px" : "18px",
          background:`linear-gradient(to right,${C.orange},${C.tealLight})`,
          transition:"width .3s ease"
        }} />
      </div>
    </Reveal>
  );
};

const Ministries = () => (
  <section id="ministerios" style={{ background:C.s1, padding:"6rem clamp(1.5rem,8vw,5rem)" }}>
    <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
      <Reveal>
        <div style={{ marginBottom:"2.5rem" }}>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem", letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem" }}>Comunidad</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"clamp(2rem,4vw,3rem)", color:C.text, marginBottom:".75rem" }}>Ministerios</h2>
          <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".95rem", color:C.dim, maxWidth:"460px", margin:0 }}>Espacios donde la fe se vive, se practica y se comparte.</p>
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
  { zone:"Zona Norte",    barrio:"Arguello / Urca",        leader:"[Líder por confirmar]", time:"Martes · 19:30 hs"    },
  { zone:"Zona Sur",      barrio:"Müller / Villa Cabrera", leader:"[Líder por confirmar]", time:"Miércoles · 20:00 hs" },
  { zone:"Centro",        barrio:"Centro / Alberdi",       leader:"[Líder por confirmar]", time:"Jueves · 19:00 hs"    },
  { zone:"Nueva Córdoba", barrio:"Nva. Córdoba / Güemes",  leader:"[Líder por confirmar]", time:"Viernes · 19:30 hs"   },
];

const SmallGroups = () => (
  <section id="grupos" style={{ background:C.bg, padding:"6rem clamp(1.5rem,8vw,5rem)" }}>
    <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
      <Reveal>
        <div style={{ marginBottom:"2.5rem" }}>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem", letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem" }}>Por toda Córdoba</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"clamp(2rem,4vw,3rem)", color:C.text, marginBottom:".75rem" }}>Grupos Pequeños</h2>
          <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".95rem", color:C.dim, maxWidth:"480px", margin:0 }}>La fe en comunidad, cerca de donde vivís. Encontrá tu grupo y unite.</p>
        </div>
      </Reveal>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:"1.1rem" }}>
        {GROUPS.map((g, i) => (
          <Reveal key={g.zone} delay={i * .09}>
            <div style={{ background:C.s2, border:`1px solid ${C.border}`, borderRadius:"12px", padding:"1.65rem", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"2.5px", background:`linear-gradient(to right,${C.orange},${C.tealLight})` }} />
              <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".65rem", letterSpacing:".18em", textTransform:"uppercase", color:C.tealLight, marginBottom:".65rem" }}>📍 {g.zone}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"1.35rem", color:C.text, marginBottom:".9rem", lineHeight:1.2 }}>{g.barrio}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:".35rem" }}>
                <div style={{ fontFamily:"Lato,sans-serif", fontSize:".84rem", color:C.dim }}>
                  <span style={{ color:C.text, fontWeight:700 }}>Líder</span> · {g.leader}
                </div>
                <div style={{ fontFamily:"Lato,sans-serif", fontSize:".84rem", color:C.dim }}>
                  <span style={{ color:C.text, fontWeight:700 }}>Horario</span> · {g.time}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={.38}>
        <div style={{
          marginTop:"1.75rem", padding:"1.4rem 1.75rem", borderRadius:"12px",
          background:C.s2, border:`1px solid ${C.border}`,
          display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"1rem"
        }}>
          <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".9rem", color:C.dim, margin:0 }}>
            ¿No encontrás un grupo cerca? Escribinos y te conectamos.
          </p>
          <a href="https://www.instagram.com/redimecomunidaddelagracia" target="_blank" rel="noopener"
            style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".72rem", letterSpacing:".12em", textTransform:"uppercase", color:C.orange }}
          >Contactar →</a>
        </div>
      </Reveal>
    </div>
  </section>
);

// ─── Sermons ─────────────────────────────────────────────────────
const SERMONS = [
  { title:"[Predicación destacada]", speaker:"[Pastor]", date:"[Fecha]", desc:"Ingresá al canal para acceder a la prédica más reciente de la iglesia." },
  { title:"[Serie en curso]",         speaker:"[Pastor]", date:"[Fecha]", desc:"Enseñanza bíblica fiel y accesible para toda la familia." },
  { title:"[Culto especial]",         speaker:"[Invitado]", date:"[Fecha]", desc:"Momentos especiales guardados para la edificación de la comunidad." },
];

const Sermons = () => (
  <section id="predicaciones" style={{ background:C.s1, padding:"6rem clamp(1.5rem,8vw,5rem)" }}>
    <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
      <Reveal>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1.25rem", marginBottom:"2.5rem" }}>
          <div>
            <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem", letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem" }}>La Palabra</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"clamp(2rem,4vw,3rem)", color:C.text, marginBottom:".75rem" }}>Predicaciones</h2>
            <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".95rem", color:C.dim, maxWidth:"400px", margin:0 }}>Enseñanza fiel y accesible desde la Escritura.</p>
          </div>
          <a href="https://www.youtube.com/@iglesiaredime" target="_blank" rel="noopener"
            style={{
              fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".74rem",
              letterSpacing:".1em", textTransform:"uppercase", color:C.text,
              padding:"9px 20px", borderRadius:"5px", border:`1px solid ${C.border}`,
              display:"inline-flex", alignItems:"center", gap:"7px",
              transition:"all .25s", flexShrink:0
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.orange; e.currentTarget.style.color = C.orange; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
          >▶ Ver canal completo</a>
        </div>
      </Reveal>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.1rem" }}>
        {SERMONS.map((s, i) => (
          <Reveal key={s.title} delay={i * .1}>
            <a href="https://www.youtube.com/@iglesiaredime" target="_blank" rel="noopener" style={{ display:"block" }}>
              <div
                style={{ background:C.s2, border:`1px solid ${C.border}`, borderRadius:"12px", overflow:"hidden", transition:"all .3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = C.orange+"40"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = C.border; }}
              >
                <div style={{ height:"150px", background:`linear-gradient(135deg,${C.teal} 0%,${C.s3} 100%)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ width:"50px", height:"50px", borderRadius:"50%", background:"rgba(237,233,223,.1)", border:"2px solid rgba(237,233,223,.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem", color:C.text, paddingLeft:"4px" }}>▶</div>
                </div>
                <div style={{ padding:"1.2rem" }}>
                  <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".65rem", letterSpacing:".15em", color:C.orange, textTransform:"uppercase", marginBottom:".45rem" }}>{s.speaker} · {s.date}</div>
                  <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"1.2rem", color:C.text, margin:"0 0 .45rem" }}>{s.title}</h4>
                  <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".84rem", color:C.dim, lineHeight:1.5, margin:0 }}>{s.desc}</p>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ─── Pastoral Team ───────────────────────────────────────────────
const TEAM = [
  { name:"[Pastor Principal]", role:"Pastor Principal",       desc:"Comprometido con la fidelidad a las Escrituras y el amor a la congregación.", img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name:"[Pastora / Líder]",  role:"Liderazgo y Discipulado", desc:"Acompañando el crecimiento espiritual de la comunidad con gracia y verdad.",    img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  { name:"[Líder de Jóvenes]", role:"Ministerio de Jóvenes",  desc:"Conectando a la próxima generación con Cristo y con la iglesia local.",          img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
];

const Team = () => (
  <section style={{ background:C.bg, padding:"6rem clamp(1.5rem,8vw,5rem)" }}>
    <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
      <Reveal>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem", letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem" }}>Liderazgo</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"clamp(2rem,4vw,3rem)", color:C.text, marginBottom:".75rem" }}>Equipo Pastoral</h2>
          <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".95rem", color:C.dim, maxWidth:"400px", margin:"0 auto" }}>Personas comprometidas con servir a la iglesia y a la comunidad.</p>
        </div>
      </Reveal>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"2.5rem", justifyContent:"center" }}>
        {TEAM.map((p, i) => (
          <Reveal key={p.name} delay={i * .14} style={{ flex:"1 1 220px", maxWidth:"300px" }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ width:"110px", height:"110px", borderRadius:"50%", margin:"0 auto 1.2rem", overflow:"hidden", border:`3px solid ${C.teal}`, boxShadow:`0 0 0 1px ${C.border}` }}>
                <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"1.3rem", color:C.text, marginBottom:".3rem" }}>{p.name}</h3>
              <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".65rem", letterSpacing:".15em", textTransform:"uppercase", color:C.orange, marginBottom:".7rem" }}>{p.role}</div>
              <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".88rem", color:C.dim, lineHeight:1.6, margin:0 }}>{p.desc}</p>
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
          <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".68rem", letterSpacing:".22em", textTransform:"uppercase", color:C.tealLight, marginBottom:".75rem" }}>Visitanos</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"clamp(2rem,4vw,3rem)", color:C.text, marginBottom:".75rem" }}>Encontranos</h2>
          <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".95rem", color:C.dim, maxWidth:"400px", margin:"0 auto" }}>Estaremos felices de recibirte. Venís como sos.</p>
        </div>
      </Reveal>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"2rem" }}>
        {/* Info panel */}
        <Reveal delay={.1}>
          <div style={{ background:C.s2, border:`1px solid ${C.border}`, borderRadius:"16px", padding:"2rem" }}>
            <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".78rem", letterSpacing:".12em", textTransform:"uppercase", color:C.tealLight, marginBottom:"1.25rem" }}>Seguinos</div>
            <div style={{ display:"flex", flexDirection:"column", gap:".85rem", marginBottom:"1.75rem" }}>
              {[
                { label:"Instagram", handle:"@redimecomunidaddelagracia", href:"https://www.instagram.com/redimecomunidaddelagracia", icon:"📸", accent:"#e1306c" },
                { label:"YouTube",   handle:"@iglesiaredime",              href:"https://www.youtube.com/@iglesiaredime",              icon:"▶",  accent:"#ff4040" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener"
                  style={{ display:"flex", alignItems:"center", gap:"1rem", padding:".8rem 1rem", borderRadius:"8px", border:`1px solid ${C.border}`, background:C.s1, transition:"all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.accent+"55"; e.currentTarget.style.background = C.s3; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.s1; }}
                >
                  <div style={{ width:"34px", height:"34px", borderRadius:"7px", background:`${s.accent}20`, border:`1px solid ${s.accent}35`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", color:s.accent, flexShrink:0 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".76rem", color:C.text }}>{s.label}</div>
                    <div style={{ fontFamily:"Lato,sans-serif", fontSize:".8rem", color:C.dim }}>{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>

            <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"1.5rem" }}>
              <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:700, fontSize:".78rem", letterSpacing:".12em", textTransform:"uppercase", color:C.tealLight, marginBottom:"1rem" }}>Dirección</div>
              <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".9rem", color:"rgba(237,233,223,.72)", lineHeight:1.75, margin:0 }}>
                <strong style={{ color:C.text, fontWeight:700 }}>Hotel AKA</strong><br />
                Cesar Carman · Córdoba<br />
                Argentina<br /><br />
                <strong style={{ color:C.text, fontWeight:700 }}>Domingos · 11:00 hs</strong>
              </p>
              <a href="https://maps.google.com/?q=Hotel+AKA+Cesar+Carman+Córdoba+Argentina" target="_blank" rel="noopener"
                style={{ display:"inline-block", marginTop:"1rem", fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".7rem", letterSpacing:".12em", textTransform:"uppercase", color:C.orange }}
              >Ver en Google Maps →</a>
            </div>
          </div>
        </Reveal>

        {/* Map */}
        <Reveal delay={.2}>
          <div style={{ borderRadius:"16px", overflow:"hidden", border:`1px solid ${C.border}`, minHeight:"360px" }}>
            <iframe
              title="Ubicación REDIME Córdoba"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-64.2050,-31.4250,-64.1650,-31.4000&layer=mapnik&marker=-31.4135,-64.1811"
              width="100%" height="100%"
              style={{ border:"none", minHeight:"360px", display:"block", filter:"brightness(.75) saturate(.5) hue-rotate(195deg)" }}
            />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ─── Footer ──────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background:"#020b12", borderTop:`1px solid ${C.border}`, padding:"3rem clamp(1.5rem,8vw,5rem) 1.75rem" }}>
    <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"2.5rem", justifyContent:"space-between", marginBottom:"2.5rem" }}>
        <div style={{ flex:"1 1 200px" }}>
          <Logo sz={32} />
          <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".85rem", color:C.dim, marginTop:"1rem", maxWidth:"210px", lineHeight:1.65 }}>
            Una iglesia bíblica, cálida y centrada en Cristo en Córdoba, Argentina.
          </p>
        </div>
        <div>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".65rem", letterSpacing:".2em", textTransform:"uppercase", color:C.tealLight, marginBottom:".9rem" }}>Horarios</div>
          <p style={{ fontFamily:"Lato,sans-serif", fontWeight:300, fontSize:".86rem", color:C.dim, lineHeight:1.85, margin:0 }}>
            Domingos · 11:00 hs<br />
            Hotel AKA, Cesar Carman<br />
            Córdoba, Argentina
          </p>
        </div>
        <div>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:".65rem", letterSpacing:".2em", textTransform:"uppercase", color:C.tealLight, marginBottom:".9rem" }}>Comunidad</div>
          <div style={{ display:"flex", gap:".65rem" }}>
            {[
              { href:"https://www.instagram.com/redimecomunidaddelagracia", icon:"📸" },
              { href:"https://www.youtube.com/@iglesiaredime", icon:"▶" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener"
                style={{ width:"36px", height:"36px", borderRadius:"8px", border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:".95rem", color:C.dim, transition:"all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.tealLight; e.currentTarget.style.color = C.tealLight; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.dim; }}
              >{s.icon}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"1.5rem", display:"flex", flexWrap:"wrap", gap:"1rem", justifyContent:"space-between", alignItems:"center" }}>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"1rem", color:C.dim, margin:0 }}>
          "La gracia y la verdad vinieron por medio de Jesucristo." — Juan 1:17
        </p>
        <p style={{ fontFamily:"Lato,sans-serif", fontSize:".75rem", color:"rgba(148,168,184,.5)", margin:0 }}>
          © {new Date().getFullYear()} REDIME — Comunidad de la Gracia
        </p>
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
      <main>
        <Hero />
        <QuickInfo />
        <MissionVision />
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
