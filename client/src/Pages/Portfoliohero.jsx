import { useState } from "react";
import { motion } from "framer-motion";

/* ── Wavy underline SVG ── */
function WavyUnderline() {
    return (
        <svg
            style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%", height: "14px", overflow: "visible", pointerEvents: "none" }}
            preserveAspectRatio="none"
            viewBox="0 0 400 14"
            fill="none"
        >
            <motion.path
                d="M2 10 Q80 4, 160 8 Q240 12, 320 7 Q370 4, 398 9"
                stroke="#6366F1"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
            />
        </svg>
    );
}

/* ── Sparkle doodles ── */
function Sparkles() {
    return (
        <motion.svg
            style={{ position: "absolute", top: "15%", right: "12%", width: 72, height: 72, overflow: "visible", pointerEvents: "none", zIndex: 2 }}
            viewBox="0 0 64 64"
            fill="none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            <path d="M32 8 L34 28 L54 30 L34 32 L32 52 L30 32 L10 30 L30 28 Z"
                fill="none" stroke="black" strokeWidth="2" strokeLinejoin="round"
                transform="rotate(15 32 30)" />
            <path d="M48 12 L49 20 L57 21 L49 22 L48 30 L47 22 L39 21 L47 20 Z"
                fill="none" stroke="black" strokeWidth="2" strokeLinejoin="round"
                transform="rotate(-10 48 21)" />
        </motion.svg>
    );
}

/* ── Wavy lines doodle ── */
function WavyLines() {
    return (
        <motion.svg
            style={{ position: "absolute", bottom: "25%", right: "8%", width: 100, overflow: "visible", pointerEvents: "none", zIndex: 2 }}
            viewBox="0 0 100 40"
            fill="none"
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
            <path d="M0 8 Q25 4, 50 8 T100 8" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <path d="M0 20 Q25 16, 50 20 T100 20" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <path d="M0 32 Q25 28, 50 32 T100 32" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
    );
}

/* ── Social icons ── */
const XIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);
const DribbbleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073a45.808 45.808 0 0 0-.767-1.68c2.31-1 4.165-2.358 5.548-4.082a9.863 9.863 0 0 1 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68a45.125 45.125 0 0 0-3.142-4.695A9.955 9.955 0 0 1 12 2.087c2.275 0 4.368.779 6.043 2.072zm-9.398-.547a44.487 44.487 0 0 1 3.121 4.674C9.148 9.167 6.588 9.455 3.6 9.455c-.556 0-1.104-.024-1.647-.072a9.947 9.947 0 0 1 6.692-5.891zM2.082 12a9.98 9.98 0 0 1 .143-1.687c.617.044 1.234.067 1.848.067 3.463 0 6.432-.42 9.025-1.237a43.88 43.88 0 0 1 .67 1.612c-3.265 1.157-5.805 3.496-7.39 6.68A9.945 9.945 0 0 1 2.082 12zm3.695 8.202c1.508-3.023 3.861-5.27 6.857-6.417a44.95 44.95 0 0 1 1.931 7.143A9.948 9.948 0 0 1 12 21.913c-2.29 0-4.413-.773-6.123-2.056-.03-.072-.073-.143-.1-.655zm9.62 1.248a46.74 46.74 0 0 0-1.865-6.88c1.894-.284 3.985-.244 6.313.194a9.968 9.968 0 0 1-4.448 6.686z" />
    </svg>
);
const InstagramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
);

const navLinks = ["Home", "Services", "About", "Portfolio", "Process", "Pricing", "Contact"];
const socialIcons = [
    { Icon: XIcon, label: "X (Twitter)" },
    { Icon: DribbbleIcon, label: "Dribbble" },
    { Icon: InstagramIcon, label: "Instagram" },
];

/* ══════════════════════════════════════
   NAVIGATION
══════════════════════════════════════ */
function Nav() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
                position: "fixed", top: 0, width: "100%", height: 80,
                background: "#fff", borderBottom: "1px solid #E5E5E5",
                zIndex: 100, padding: "0 60px", display: "flex",
                alignItems: "center", justifyContent: "space-between",
                boxSizing: "border-box",
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            }}
        >
            {/* Logo */}
            <div style={{ fontSize: 28, fontWeight: 700, color: "#000", letterSpacing: "-0.5px" }}>
                Digital Designer
            </div>

            {/* Nav links */}
            <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
                {navLinks.map((link) => (
                    <motion.a
                        key={link}
                        href="#"
                        style={{
                            fontSize: 15, fontWeight: 500, textDecoration: "none",
                            color: link === "Home" ? "#6366F1" : "#000",
                        }}
                        whileHover={{ color: "#6366F1" }}
                        transition={{ duration: 0.2 }}
                    >
                        {link}
                    </motion.a>
                ))}
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 12 }}>
                {socialIcons.map(({ Icon, label }) => (
                    <motion.button
                        key={label}
                        aria-label={label}
                        style={{
                            width: 44, height: 44, border: "2px solid #000",
                            borderRadius: 8, background: "transparent",
                            color: "#000", display: "flex", alignItems: "center",
                            justifyContent: "center", cursor: "pointer", padding: 0,
                        }}
                        whileHover={{ backgroundColor: "#000", color: "#fff", scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Icon />
                    </motion.button>
                ))}
            </div>
        </motion.nav>
    );
}

/* ══════════════════════════════════════
   HERO LEFT COLUMN
══════════════════════════════════════ */
function HeroLeft() {
    return (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "flex-start",
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        }}>
            {/* 1. Greeting badge */}
            <motion.span
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                    display: "inline-block", background: "#fff",
                    border: "2px solid #000", borderRadius: 24,
                    padding: "8px 20px", fontSize: 13, fontWeight: 600,
                    color: "#000", marginBottom: 32, letterSpacing: "0.5px",
                }}
            >
                ✱ HELLO!
            </motion.span>

            {/* 2. Headline */}
            <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                style={{
                    fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 700,
                    lineHeight: 1.15, color: "#000", letterSpacing: "-1px",
                    margin: "0 0 28px 0",
                }}
            >
                I'm Chandler Bing,
                <br />
                <span style={{ position: "relative", display: "inline-block" }}>
                    a product designer.
                    <WavyUnderline />
                </span>
            </motion.h1>

            {/* 3. Subheadline */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{
                    fontSize: 18, fontWeight: 400, lineHeight: 1.6,
                    color: "#333", maxWidth: 480, margin: "0 0 36px 0",
                }}
            >
                I'm a freelance product designer based in London. I'm very passionate
                about the work that I do.
            </motion.p>

            {/* 4. CTA Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{
                    backgroundColor: "#000", color: "#fff",
                    y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                    background: "transparent", border: "2px solid #000",
                    borderRadius: 12, padding: "16px 32px", fontSize: 16,
                    fontWeight: 600, color: "#000", cursor: "pointer",
                    fontFamily: "'Inter', sans-serif", letterSpacing: "-0.2px",
                }}
            >
                See My Works
            </motion.button>
        </div>
    );
}

/* ══════════════════════════════════════
   HERO RIGHT COLUMN
══════════════════════════════════════ */
function HeroRight() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <div style={{ position: "relative", width: "min(520px, 100%)", flexShrink: 0 }}>

                {/* Circular badge */}
                <motion.div
                    initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: -8, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 }}
                    style={{
                        position: "absolute", top: "12%", left: "-8%",
                        width: 140, height: 140, borderRadius: "50%",
                        background: "#fff", border: "3px solid #000",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 10,
                    }}
                >
                    {/* Spinning text ring */}
                    <motion.svg
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                        viewBox="0 0 140 140"
                        fill="none"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    >
                        <defs>
                            <path id="cp" d="M 70,70 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0" />
                        </defs>
                        <text fontSize="10.5" fontWeight="700"
                            fontFamily="'Inter', sans-serif" fill="#000" letterSpacing="1.8">
                            <textPath href="#cp" startOffset="0%">
                                AVAILABLE FOR FREELANCE ★ AVAILABLE FOR FREELANCE ★
                            </textPath>
                        </text>
                    </motion.svg>

                    {/* Arrow icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ position: "relative", zIndex: 2 }}>
                        <path d="M7 17L17 7" /><path d="M17 7H7" /><path d="M17 7V17" />
                    </svg>
                </motion.div>

                {/* Portrait */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    style={{
                        width: "100%", aspectRatio: "520/600",
                        borderRadius: "260px 260px 12px 12px", overflow: "hidden",
                        background: "linear-gradient(135deg, #8B7DD8 0%, #9B8CE8 100%)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                        position: "relative",
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop"
                        alt="Portrait"
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                </motion.div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════
   FULL PAGE EXPORT
══════════════════════════════════════ */
export default function PortfolioHero() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; }

        .hero-section {
          width: 100%;
          height: calc(100vh - 80px);
          margin-top: 80px;
          background: linear-gradient(to bottom, #E8E3FF, #F0EEFF);
          padding: 0 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 80px;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .hero-section { gap: 40px; padding: 0 40px; }
        }
        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr;
            height: auto;
            min-height: calc(100vh - 80px);
            padding: 48px 24px;
            gap: 48px;
            text-align: center;
            align-items: start;
          }
          nav { padding: 0 24px !important; }
          nav > div:nth-child(2) { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-section { padding: 32px 20px; }
          nav { padding: 0 20px !important; }
        }
      `}</style>

            <Nav />

            <section className="hero-section">
                {/* Decorative doodles */}
                <Sparkles />
                <WavyLines />

                {/* Left */}
                <HeroLeft />

                {/* Right */}
                <HeroRight />
            </section>
        </>
    );
}