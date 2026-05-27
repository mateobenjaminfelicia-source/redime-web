// ─── REDIME — Design Tokens ────────────────────────────────────────────────────
// Dos paletas: LIGHT (default) y DARK.
// El toggle está en la Navbar. La preferencia se guarda en localStorage.

export const FONTS = {
    title: "'Cormorant Garamond', serif",
    ui: "'Montserrat', sans-serif",
    body: "'Lato', sans-serif",
};

export const LIGHT = {
    // Fondos — grises apenas fríos, no crema
    darkest: "#d8dde3",
    bg: "#f4f5f7",      // gris clarísimo, apena frío. No crema, no blanco puro
    s1: "#f9fafb",      // blanco roto muy suave — secciones alternas
    s2: "#eef0f3",      // gris suave — fondo de tarjetas
    s3: "#e5e8ec",      // hover tarjetas — un paso más oscuro

    // Acentos
    teal: "#1d3d56",
    tealLight: "#166070",      // teal más profundo para modo claro
    orange: "#bf4d1c",      // naranja levemente más sobrio
    orangeHot: "#ce5c24",

    // Texto
    text: "#0c1825",      // azul oscuro profundo — no negro puro
    dim: "#4e5e6e",      // gris azulado — legible y elegante

    // UI
    border: "rgba(15,25,45,0.07)",
    navBg: "rgba(249,250,251,0.85)",   // translúcido sobre s1
    shadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
};

export const DARK = {
    darkest: "#020b12",
    bg: "#050e16",
    s1: "#091827",
    s2: "#0d2035",
    s3: "#152d42",
    teal: "#1d3d56",
    tealLight: "#4ab8ca",
    orange: "#e06a36",
    orangeHot: "#f07848",
    text: "#ede9df",
    dim: "#94a8b8",
    border: "rgba(74,184,202,0.13)",
    navBg: "rgba(5,14,22,0.96)",
    shadow: "0 4px 24px rgba(0,0,0,0.40)",
};

export const SITE_URL = "https://redimecomunidad.vercel.app";