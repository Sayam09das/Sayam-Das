"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { Instagram, Github, Send, ChevronDown } from "lucide-react";

// ─── Lenis smooth scroll ──────────────────────────────────────────────────────
function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);
}

const SOCIAL = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Send, href: "https://t.me", label: "Telegram" },
];

// Stagger variants
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.11, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    }),
};

const fadeLeft = {
    hidden: { opacity: 0, x: -20 },
    show: (i = 0) => ({
        opacity: 1, x: 0,
        transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function HeroSection() {
    useLenis();

    // Read dark mode from document class (set by Navbar)
    const [dark, setDark] = useState(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.classList.contains("dark");
        }
        return false;
    });

    // Listen for dark mode changes from Navbar
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
        return () => observer.disconnect();
    }, []);

    // Sync body class for CSS
    useEffect(() => {
        document.body.classList.toggle("dark", dark);
    }, [dark]);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                :root {
                  --bg:           #f0efec;
                  --bg2:          #e8e7e3;
                  --text:         #111110;
                  --text-muted:   #8a8a84;
                  --border:       rgba(0,0,0,0.10);
                  --grid:         rgba(0,0,0,0.055);
                  --btn-bg:       #111110;
                  --btn-text:     #f0efec;
                  --bubble-bg:    #ffffff;
                  --bubble-border:#111110;
                  --surface:      rgba(240,239,236,0.82);
                }

                html.dark, body.dark {
                  --bg:           #0d0d0c;
                  --bg2:          #161614;
                  --text:         #f0efea;
                  --text-muted:   #6a6a64;
                  --border:       rgba(255,255,255,0.08);
                  --grid:         rgba(255,255,255,0.04);
                  --btn-bg:       #f0efea;
                  --btn-text:     #0d0d0c;
                  --bubble-bg:    #1e1e1c;
                  --bubble-border:#f0efea;
                  --surface:      rgba(13,13,12,0.88);
                }

                html.dark, body.dark {
                  background: #0d0d0c;
                  color: #f0efea;
                }

                html, body {
                  background: #f0efec;
                  color: #111110;
                  font-family: 'DM Sans', sans-serif;
                  min-height: 100vh;
                  transition: background 0.35s, color 0.35s;
                  overflow-x: hidden;
                }

                /* ── Grid background ── */
                .hero-wrapper {
                  position: relative;
                  width: 100%;
                  min-height: 100vh;
                  display: flex;
                  flex-direction: column;
                  overflow: hidden;
                }

                .grid-bg {
                  position: absolute;
                  inset: 0;
                  pointer-events: none;
                  background-image:
                    linear-gradient(var(--grid) 1px, transparent 1px),
                    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
                  background-size: 72px 72px;
                  z-index: 0;
                }

                /* ── Top bar ── */
                .topbar {
                  position: relative;
                  z-index: 10;
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  padding: 20px 32px;
                }

                .theme-btn {
                  width: 40px; height: 40px;
                  display: flex; align-items: center; justify-content: center;
                  border-radius: 50%;
                  background: var(--border);
                  border: 1px solid var(--border);
                  color: var(--text);
                  cursor: pointer;
                  outline: none;
                  transition: transform 0.2s, background 0.2s;
                }
                .theme-btn:hover { transform: rotate(18deg) scale(1.1); background: var(--bg2); }

                /* ── Main hero ── */
                .hero-main {
                  position: relative;
                  z-index: 2;
                  flex: 1;
                  display: grid;
                  grid-template-columns: 56px 1fr 56px;
                  grid-template-rows: 1fr auto;
                  align-items: stretch;
                  min-height: calc(100vh - 80px);
                }

                /* ── Left social rail ── */
                .social-rail {
                  grid-column: 1;
                  grid-row: 1 / 3;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  padding: 24px 0;
                  gap: 4px;
                }

                .rail-line {
                  width: 1px;
                  height: 60px;
                  background: var(--border);
                  margin-bottom: 8px;
                }

                .social-link {
                  display: flex; align-items: center; justify-content: center;
                  width: 36px; height: 36px;
                  border-radius: 50%;
                  color: var(--text-muted);
                  text-decoration: none;
                  transition: color 0.18s, transform 0.18s, background 0.18s;
                }
                .social-link:hover {
                  color: var(--text);
                  background: var(--bg2);
                  transform: scale(1.12);
                }

                .rail-line-bottom {
                  width: 1px;
                  flex: 1;
                  background: var(--border);
                  margin-top: 8px;
                }

                /* ── Center stage ── */
                .hero-center {
                  grid-column: 2;
                  grid-row: 1;
                  position: relative;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: flex-end;
                  padding-bottom: 0;
                  overflow: visible;
                }

                /* Image container */
                .image-wrap {
                  position: relative;
                  width: min(394px, 68vw);
                  display: flex;
                  align-items: flex-end;
                  justify-content: center;
                  z-index: 2;
                }

                .hero-img {
                  width: 100%;
                  height: auto;
                  object-fit: cover;
                  display: block;
                  border-radius: 0;
                  filter: grayscale(8%);
                  transition: filter 0.4s;
                }
                html.dark .hero-img { filter: grayscale(20%) brightness(0.92); }

                /* Speech bubble */
                .bubble {
                  position: absolute;
                  top: -10px;
                  right: -10px;
                  background: var(--bubble-bg);
                  border: 2.5px solid var(--bubble-border);
                  border-radius: 50% 50% 50% 8px;
                  padding: 14px 20px;
                  display: flex; align-items: center; justify-content: center;
                  box-shadow: 3px 3px 0 var(--bubble-border);
                }

                .bubble-text {
                  font-family: 'Syne', sans-serif;
                  font-size: clamp(18px, 3.5vw, 26px);
                  font-weight: 800;
                  color: var(--text);
                  font-style: italic;
                  letter-spacing: -0.02em;
                }

                /* ── Text block ── */
                .hero-text-block {
                  grid-column: 2;
                  grid-row: 2;
                  text-align: center;
                  padding: 0 24px 28px;
                  position: relative;
                  z-index: 3;
                }

                .hero-title {
                  font-family: 'Syne', sans-serif;
                  font-size: clamp(28px, 5vw, 72px);
                  font-weight: 800;
                  line-height: 1.0;
                  letter-spacing: -0.03em;
                  color: var(--text);
                  margin-bottom: 14px;
                }

                .hero-sub {
                  font-family: 'DM Sans', sans-serif;
                  font-size: clamp(13px, 1.6vw, 16px);
                  font-weight: 400;
                  color: var(--text-muted);
                  max-width: 580px;
                  margin: 0 auto 24px;
                  line-height: 1.65;
                }

                /* CTA row */
                .cta-row {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 20px;
                }

                .chevron-btn {
                  display: flex; align-items: center; justify-content: center;
                  width: 40px; height: 40px;
                  border-radius: 50%;
                  background: var(--bg2);
                  border: 1px solid var(--border);
                  color: var(--text-muted);
                  cursor: pointer;
                  outline: none;
                  transition: background 0.18s, color 0.18s, transform 0.18s;
                  flex-shrink: 0;
                }
                .chevron-btn:hover { background: var(--btn-bg); color: var(--btn-text); transform: translateY(2px); }

                .cta-btn {
                  display: flex; align-items: center; justify-content: center;
                  flex: 1;
                  max-width: 520px;
                  padding: 16px 32px;
                  border-radius: 9999px;
                  background: var(--btn-bg);
                  color: var(--btn-text);
                  font-family: 'Syne', sans-serif;
                  font-size: clamp(14px, 1.8vw, 17px);
                  font-weight: 600;
                  letter-spacing: -0.01em;
                  text-decoration: none;
                  border: none;
                  cursor: pointer;
                  outline: none;
                  transition: opacity 0.18s, transform 0.18s;
                }
                .cta-btn:hover { opacity: 0.88; transform: translateY(-2px); }

                /* ── Right page dots ── */
                .page-dots {
                  grid-column: 3;
                  grid-row: 1 / 3;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  gap: 28px;
                  padding: 24px 0;
                }

                .page-dot-item {
                  font-family: 'Syne', sans-serif;
                  font-size: 11px;
                  font-weight: 700;
                  color: var(--text-muted);
                  letter-spacing: 0.04em;
                  cursor: pointer;
                  transition: color 0.18s, transform 0.18s;
                  writing-mode: horizontal-tb;
                }
                .page-dot-item:hover, .page-dot-item.active { color: var(--text); transform: scale(1.1); }
                .page-dot-item.active { color: var(--text); }

                /* ── Responsive ── */
                @media (max-width: 1024px) {
                  .image-wrap {
                    width: min(320px, 60vw);
                  }
                }

                @media (max-width: 768px) {
                  .hero-main {
                    grid-template-columns: 44px 1fr 44px;
                  }
                  .topbar { padding: 16px 20px; }
                  .hero-text-block { padding: 0 12px 24px; }
                  .cta-btn { padding: 14px 20px; }
                  .page-dots { gap: 20px; }
                }

                @media (max-width: 520px) {
                  .hero-main {
                    grid-template-columns: 36px 1fr 36px;
                  }
                  .bubble { padding: 10px 14px; top: -4px; right: -8px; }
                  .rail-line { height: 36px; }
                  .social-link { width: 30px; height: 30px; }
                  .page-dots { gap: 16px; }
                  .page-dot-item { font-size: 10px; }
                }

                @media (max-width: 380px) {
                  .hero-main { grid-template-columns: 28px 1fr 28px; }
                  .chevron-btn { width: 34px; height: 34px; }
                }

                /* ── Fade-in for image placeholder ── */
                .img-placeholder {
                  width: 100%;
                  aspect-ratio: 3/4;
                  background: linear-gradient(160deg, var(--bg2) 0%, var(--border) 100%);
                  border-radius: 12px 12px 0 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: var(--text-muted);
                  font-family: 'Syne', sans-serif;
                  font-size: 13px;
                  font-weight: 600;
                  letter-spacing: 0.04em;
                }
            ` }} />

            <div className="hero-wrapper" style={{ marginTop: "80px" }}>
                {/* Grid bg */}
                <div className="grid-bg" />

                {/* Main 3-col grid */}
                <div className="hero-main">

                    {/* ── Left social rail ── */}
                    <div className="social-rail">
                        <div className="rail-line" />
                        {SOCIAL.map(({ icon: Icon, href, label }, i) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="social-link"
                                custom={i}
                                variants={fadeLeft}
                                initial="hidden"
                                animate="show"
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.92 }}
                            >
                                <Icon size={18} strokeWidth={1.8} />
                            </motion.a>
                        ))}
                        <div className="rail-line-bottom" />
                    </div>

                    {/* ── Center: image ── */}
                    <div className="hero-center">
                        <motion.div
                            className="image-wrap"
                            initial={{ opacity: 0, y: 40, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Speech bubble */}
                            <motion.div
                                className="bubble"
                                initial={{ scale: 0, rotate: -12, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                transition={{ delay: 0.55, duration: 0.5, type: "spring", stiffness: 300, damping: 18 }}
                            >
                                <span className="bubble-text">hello!</span>
                            </motion.div>

                            {/* Image — swap src for real photo */}
                            <div className="img-placeholder">
                                Your Photo Here
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Text block ── */}
                    <motion.div
                        className="hero-text-block"
                        initial="hidden"
                        animate="show"
                    >
                        <motion.h1
                            className="hero-title"
                            variants={fadeUp}
                            custom={0}
                        >
                            Back-End Developer
                        </motion.h1>

                        <motion.p
                            className="hero-sub"
                            variants={fadeUp}
                            custom={1}
                        >
                            focused on building scalable and efficient architectures that empower
                            businesses to run reliable systems. My expertise lies in databases, APIs,
                            and performance optimization to deliver smooth user experiences.
                        </motion.p>

                        <motion.div
                            className="cta-row"
                            variants={fadeUp}
                            custom={2}
                        >
                            <motion.button
                                className="chevron-btn"
                                whileHover={{ y: 3 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Scroll left"
                            >
                                <ChevronDown size={18} strokeWidth={2} style={{ transform: "rotate(90deg)" }} />
                            </motion.button>

                            <motion.a
                                href="#contact"
                                className="cta-btn"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Get in touch
                            </motion.a>

                           <motion.button
                                className="chevron-btn"
                                whileHover={{ y: 3 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Scroll right"
                            >
                                <ChevronDown size={18} strokeWidth={2} style={{ transform: "rotate(-90deg)" }} />
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* ── Right page dots ── */}
                    <div className="page-dots">
                        {["00", "01", "02", "03", "04"].map((n, i) => (
                            <motion.span
                                key={n}
                                className={`page-dot-item${i === 0 ? " active" : ""}`}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: i === 0 ? 1 : 0.35, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                                whileHover={{ opacity: 1 }}
                            >
                                {n}
                            </motion.span>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}