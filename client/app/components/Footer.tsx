"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    useInView,
    AnimatePresence,
} from "framer-motion";
import Lenis from "@studio-freight/lenis";
import {
    Github,
    Linkedin,
    Send,
    ArrowUp,
    Heart,
    Coffee,
} from "lucide-react";

// ─── Lenis ───────────────────────────────────────────────────────────────────
function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.25,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        } as any);
        let id: number;
        const raf = (time: number) => { lenis.raf(time); id = requestAnimationFrame(raf); };
        id = requestAnimationFrame(raf);
        return () => { cancelAnimationFrame(id); lenis.destroy(); };
    }, []);
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const QUICK_LINKS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

const SOCIALS = [
    { icon: Github, href: "https://github.com", label: "GitHub", color: "#f0efea" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "#0077b5" },
    { icon: Send, href: "https://t.me", label: "Telegram", color: "#0088cc" },
];

const CURRENT_YEAR = new Date().getFullYear();

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Footer() {
    useLenis();
    const footerRef = useRef<HTMLElement>(null);
    const headingInView = useInView(footerRef, { once: true, margin: "-60px" });

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

    const bg = dark ? "#0a0a09" : "#e5e4e0";
    const cardBg = dark ? "#141412" : "#f8f7f4";
    const text = dark ? "#f0efea" : "#111110";
    const muted = dark ? "rgba(240,239,234,0.44)" : "rgba(0,0,0,0.44)";
    const border = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body {
          background: ${bg};
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          transition: background 0.35s;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: clamp(32px, 5vw, 56px);
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-brand {
            grid-column: auto;
          }
        }

        .footer-link:hover {
          color: #7c6fcd !important;
          padding-left: 8px;
        }
        .footer-link {
          transition: color 0.2s, padding-left 0.2s;
        }

        .social-pill:hover {
          background: ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"} !important;
          transform: translateY(-2px);
        }
        .social-pill {
          transition: background 0.18s, transform 0.18s;
        }

        .back-to-top:hover {
          background: #7c6fcd !important;
          color: #fff !important;
        }
        .back-to-top {
          transition: background 0.2s, color 0.2s;
        }
      `}</style>

            <footer
                ref={footerRef}
                id="footer"
                aria-label="Footer"
                style={{
                    width: "100%",
                    padding: "clamp(48px, 8vw, 80px) 0 clamp(24px, 5vw, 48px)",
                    background: bg,
                    transition: "background 0.35s",
                    position: "relative",
                }}
            >
                {/* Grid texture */}
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `
              linear-gradient(${dark ? "rgba(255,255,255,0.018)" : "rgba(0,0,0,0.03)"} 1px, transparent 1px),
              linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.018)" : "rgba(0,0,0,0.03)"} 1px, transparent 1px)
            `,
                        backgroundSize: "80px 80px",
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                />

                <div
                    style={{
                        maxWidth: 1120,
                        margin: "0 auto",
                        padding: "0 clamp(16px, 5vw, 48px)",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {/* ── Main footer content ── */}
                    <div className="footer-grid" style={{ marginBottom: "clamp(40px, 6vw, 64px)" }}>
                        {/* Brand section */}
                        <motion.div
                            className="footer-brand"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h3
                                style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontWeight: 900,
                                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                                    letterSpacing: "-0.02em",
                                    color: text,
                                    marginBottom: 16,
                                    transition: "color 0.35s",
                                }}
                            >
                                Let's build something amazing together.
                            </h3>
                            <p
                                style={{
                                    fontSize: "clamp(0.84rem, 1.4vw, 0.92rem)",
                                    color: muted,
                                    lineHeight: 1.7,
                                    marginBottom: 24,
                                    maxWidth: 400,
                                }}
                            >
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                            </p>
                            <div className="social-links">
                                {SOCIALS.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.a
                                            key={item.label}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={item.label}
                                            className="social-pill"
                                            initial={{ opacity: 0, y: 12 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1, duration: 0.4 }}
                                            whileHover={{ scale: 1.08 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: 12,
                                                background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                                                border: `1px solid ${border}`,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: item.color,
                                                textDecoration: "none",
                                                flexShrink: 0,
                                            }}
                                        >
                                            <Icon size={18} strokeWidth={1.8} />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Quick links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h4
                                style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontWeight: 700,
                                    fontSize: "0.85rem",
                                    letterSpacing: "0.08em",
                                    color: text,
                                    marginBottom: 20,
                                    textTransform: "uppercase",
                                    transition: "color 0.35s",
                                }}
                            >
                                Quick Links
                            </h4>
                            <nav style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {QUICK_LINKS.map((link, index) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        className="footer-link"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                        style={{
                                            fontSize: "0.9rem",
                                            color: muted,
                                            textDecoration: "none",
                                            display: "inline-block",
                                        }}
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                            </nav>
                        </motion.div>

                        {/* Contact info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h4
                                style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontWeight: 700,
                                    fontSize: "0.85rem",
                                    letterSpacing: "0.08em",
                                    color: text,
                                    marginBottom: 20,
                                    textTransform: "uppercase",
                                    transition: "color 0.35s",
                                }}
                            >
                                Get in Touch
                            </h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                <a
                                    href="mailto:hello@example.com"
                                    style={{
                                        fontSize: "0.9rem",
                                        color: muted,
                                        textDecoration: "none",
                                    }}
                                >
                                    hello@example.com
                                </a>
                                <a
                                    href="tel:+1234567890"
                                    style={{
                                        fontSize: "0.9rem",
                                        color: muted,
                                        textDecoration: "none",
                                    }}
                                >
                                    +1 234 567 890
                                </a>
                                <span
                                    style={{
                                        fontSize: "0.9rem",
                                        color: muted,
                                    }}
                                >
                                    New York, USA
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Bottom bar ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: 16,
                            paddingTop: 24,
                            borderTop: `1px solid ${border}`,
                        }}
                    >
                        {/* Copyright */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                fontSize: "0.85rem",
                                color: muted,
                            }}
                        >
                            <span>© {CURRENT_YEAR}</span>
                            <span style={{ color: "#7c6fcd" }}>•</span>
                            <span>Crafted with</span>
                            <Heart size={14} color="#7c6fcd" fill="#7c6fcd" />
                            <span>and</span>
                            <Coffee size={14} color="#f5a623" />
                        </div>

                        {/* Back to top */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <motion.button
                                onClick={scrollToTop}
                                aria-label="Back to top"
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                className="back-to-top"
                                style={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: 10,
                                    background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                                    border: `1px solid ${border}`,
                                    color: text,
                                    cursor: "pointer",
                                    outline: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <ArrowUp size={16} strokeWidth={2} />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </footer>
        </>
    );
}

