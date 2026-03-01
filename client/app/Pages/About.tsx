"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
    useSpring,
    AnimatePresence,
} from "framer-motion";
import Lenis from "@studio-freight/lenis";
import {
    Download,
    MapPin,
    Coffee,
    Code2,
    Layers,
    Zap,
    Github,
    Linkedin,
    Send,
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
const STATS = [
    { value: "4+", label: "Years Experience", icon: Coffee },
    { value: "38", label: "Projects Shipped", icon: Layers },
    { value: "12", label: "Technologies", icon: Code2 },
    { value: "99%", label: "Client Satisfaction", icon: Zap },
];

const SKILLS = [
    { name: "Node.js", level: 94, color: "#73b55a" },
    { name: "PostgreSQL", level: 88, color: "#336791" },
    { name: "C# / .NET", level: 85, color: "#9b4fc4" },
    { name: "Docker / K8s", level: 80, color: "#2496ed" },
    { name: "GraphQL", level: 78, color: "#e535ab" },
    { name: "Redis", level: 82, color: "#d82c20" },
];

const TIMELINE = [
    {
        year: "2024",
        role: "Senior Back-End Engineer",
        company: "TechVenture Co.",
        desc: "Architected microservices handling 2M+ daily requests, reduced API latency by 60%.",
        accent: "#7c6fcd",
    },
    {
        year: "2022",
        role: "Back-End Developer",
        company: "Scaleway Systems",
        desc: "Built RESTful and GraphQL APIs for fintech products, led DB optimization initiatives.",
        accent: "#4caf7d",
    },
    {
        year: "2020",
        role: "Junior Developer",
        company: "DevStudio Agency",
        desc: "Developed CMS integrations, third-party API connections, and internal tooling.",
        accent: "#f5a623",
    },
];

const SOCIALS = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Send, href: "https://t.me", label: "Telegram" },
];

// ─── Skill bar ────────────────────────────────────────────────────────────────
function SkillBar({
    skill,
    index,
    dark,
}: {
    skill: (typeof SKILLS)[0];
    index: number;
    dark: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <div ref={ref} style={{ marginBottom: 16 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 7,
                    alignItems: "baseline",
                }}
            >
                <span
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: dark ? "rgba(240,239,234,0.8)" : "rgba(0,0,0,0.72)",
                        letterSpacing: "0.01em",
                    }}
                >
                    {skill.name}
                </span>
                <span
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: skill.color,
                    }}
                >
                    {skill.level}%
                </span>
            </div>

            {/* Track */}
            <div
                style={{
                    height: 5,
                    borderRadius: 9999,
                    background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
                    overflow: "hidden",
                }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{
                        delay: 0.15 + index * 0.07,
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                        height: "100%",
                        borderRadius: 9999,
                        background: `linear-gradient(90deg, ${skill.color}cc, ${skill.color})`,
                        boxShadow: `0 0 12px ${skill.color}66`,
                    }}
                />
            </div>
        </div>
    );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
    stat,
    index,
    dark,
}: {
    stat: (typeof STATS)[0];
    index: number;
    dark: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-30px" });
    const Icon = stat.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24, scale: 0.93 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                delay: index * 0.09,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4, scale: 1.03 }}
            style={{
                background: dark ? "#1a1a18" : "#ffffff",
                border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
                borderRadius: 16,
                padding: "clamp(16px, 2.5vw, 22px)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                boxShadow: dark
                    ? "0 4px 20px rgba(0,0,0,0.28)"
                    : "0 4px 20px rgba(0,0,0,0.07)",
                cursor: "default",
                transition: "background 0.35s, border-color 0.35s, box-shadow 0.2s",
            }}
        >
            <div
                style={{
                    width: 36, height: 36,
                    borderRadius: 10,
                    background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}
            >
                <Icon size={16} color={dark ? "rgba(240,239,234,0.6)" : "rgba(0,0,0,0.5)"} strokeWidth={2} />
            </div>
            <div
                style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    letterSpacing: "-0.04em",
                    color: dark ? "#f0efea" : "#111110",
                    lineHeight: 1,
                    transition: "color 0.35s",
                }}
            >
                {stat.value}
            </div>
            <div
                style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: dark ? "rgba(240,239,234,0.42)" : "rgba(0,0,0,0.42)",
                    lineHeight: 1.3,
                }}
            >
                {stat.label}
            </div>
        </motion.div>
    );
}

// ─── Timeline item ────────────────────────────────────────────────────────────
function TimelineItem({
    item,
    index,
    dark,
    isLast,
}: {
    item: (typeof TIMELINE)[0];
    index: number;
    dark: boolean;
    isLast: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
                delay: index * 0.12,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }}
            style={{
                display: "flex",
                gap: 18,
                paddingBottom: isLast ? 0 : 28,
                position: "relative",
            }}
        >
            {/* Line + dot */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.12 + 0.1, duration: 0.4, type: "spring", stiffness: 300 }}
                    style={{
                        width: 12, height: 12,
                        borderRadius: "50%",
                        background: item.accent,
                        boxShadow: `0 0 10px ${item.accent}88`,
                        flexShrink: 0,
                        marginTop: 4,
                    }}
                />
                {!isLast && (
                    <motion.div
                        initial={{ scaleY: 0, originY: 0 }}
                        animate={inView ? { scaleY: 1 } : {}}
                        transition={{ delay: index * 0.12 + 0.2, duration: 0.5 }}
                        style={{
                            flex: 1,
                            width: 1,
                            background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
                            marginTop: 6,
                        }}
                    />
                )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, paddingBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 3 }}>
                    <span
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            color: item.accent,
                            textTransform: "uppercase",
                        }}
                    >
                        {item.year}
                    </span>
                    <span
                        style={{
                            fontSize: "0.7rem",
                            color: dark ? "rgba(240,239,234,0.3)" : "rgba(0,0,0,0.3)",
                        }}
                    >
                        {item.company}
                    </span>
                </div>
                <h4
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.92rem",
                        letterSpacing: "-0.015em",
                        color: dark ? "#f0efea" : "#111110",
                        marginBottom: 5,
                        transition: "color 0.35s",
                    }}
                >
                    {item.role}
                </h4>
                <p
                    style={{
                        fontSize: "0.8rem",
                        color: dark ? "rgba(240,239,234,0.44)" : "rgba(0,0,0,0.48)",
                        lineHeight: 1.65,
                    }}
                >
                    {item.desc}
                </p>
            </div>
        </motion.div>
    );
}

// ─── Parallax image ───────────────────────────────────────────────────────────
function ParallaxPhoto({ dark }: { dark: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const rawY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
    const y = useSpring(rawY, { stiffness: 55, damping: 18 });
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.93, x: 40 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative" }}
        >
            {/* Decorative accent ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute",
                    top: -16, right: -16,
                    width: "calc(100% + 32px)",
                    height: "calc(100% + 32px)",
                    borderRadius: 24,
                    border: `1.5px dashed ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* Photo card */}
            <div
                style={{
                    position: "relative",
                    borderRadius: 20,
                    overflow: "hidden",
                    aspectRatio: "4/5",
                    background: dark ? "#1a1a18" : "#dddbd7",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
                    boxShadow: dark ? "0 24px 72px rgba(0,0,0,0.45)" : "0 24px 72px rgba(0,0,0,0.14)",
                    zIndex: 1,
                }}
            >
                <motion.img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85"
                    alt="Amirreza Mousavi"
                    draggable={false}
                    style={{
                        width: "100%",
                        height: "115%",
                        objectFit: "cover",
                        objectPosition: "top",
                        display: "block",
                        position: "absolute",
                        top: "-7.5%",
                        left: 0,
                        y,
                        filter: dark ? "brightness(0.8) saturate(0.85)" : "brightness(0.95) saturate(0.9)",
                        userSelect: "none",
                    }}
                />

                {/* Bottom gradient */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0, left: 0, right: 0,
                        height: "35%",
                        background: `linear-gradient(to top, ${dark ? "#0d0d0c" : "#ececea"} 0%, transparent 100%)`,
                        zIndex: 2,
                    }}
                />
            </div>

            {/* Floating badge — location */}
            <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{
                    position: "absolute",
                    bottom: -18,
                    left: -18,
                    zIndex: 4,
                    background: dark ? "#1e1e1c" : "#ffffff",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"}`,
                    borderRadius: 14,
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: dark ? "0 8px 28px rgba(0,0,0,0.4)" : "0 8px 28px rgba(0,0,0,0.12)",
                }}
            >
                <MapPin size={13} color="#f5a623" strokeWidth={2.5} />
                <span
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: dark ? "#f0efea" : "#111110",
                        letterSpacing: "0.02em",
                        whiteSpace: "nowrap",
                    }}
                >
                    Tehran, Iran
                </span>
            </motion.div>

            {/* Available badge */}
            <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{
                    position: "absolute",
                    top: -16,
                    right: -16,
                    zIndex: 4,
                    background: dark ? "#1e1e1c" : "#ffffff",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"}`,
                    borderRadius: 14,
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    boxShadow: dark ? "0 8px 28px rgba(0,0,0,0.4)" : "0 8px 28px rgba(0,0,0,0.12)",
                }}
            >
                <span
                    style={{
                        width: 7, height: 7,
                        borderRadius: "50%",
                        background: "#22c55e",
                        animation: "pulse-dot 2s ease-in-out infinite",
                        flexShrink: 0,
                    }}
                />
                <span
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color: dark ? "#f0efea" : "#111110",
                        whiteSpace: "nowrap",
                        letterSpacing: "0.02em",
                    }}
                >
                    Open to work
                </span>
            </motion.div>
        </motion.div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function About() {
    useLenis();
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

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

    const bg = dark ? "#0d0d0c" : "#ececea";
    const cardBg = dark ? "#141412" : "#f8f7f4";
    const text = dark ? "#f0efea" : "#111110";
    const muted = dark ? "rgba(240,239,234,0.44)" : "rgba(0,0,0,0.44)";
    const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";
    const chevBg = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

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

        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50%       { box-shadow: 0 0 0 4px rgba(34,197,94,0); }
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: clamp(32px, 5vw, 72px);
          align-items: start;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.5vw, 16px);
        }

        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(16px, 2.5vw, 28px);
          margin-top: clamp(32px, 5vw, 56px);
        }

        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr 300px;
          }
        }

        @media (max-width: 820px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          .photo-col { order: -1; max-width: 320px; margin: 0 auto; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .bottom-grid { grid-template-columns: 1fr; }
          .stats-grid  { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 420px) {
          .stats-grid { grid-template-columns: 1fr 1fr; }
        }

        .resume-btn:hover { opacity: 0.88; transform: translateY(-2px); }
        .resume-btn { transition: opacity 0.18s, transform 0.18s; }
        .social-pill:hover { background: ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"} !important; transform: scale(1.08); }
        .social-pill { transition: background 0.18s, transform 0.18s; }
      `}</style>

            <section
                ref={sectionRef}
                id="about"
                aria-label="About"
                style={{
                    width: "100%",
                    padding: "clamp(48px, 8vw, 96px) 0 clamp(64px, 10vw, 120px)",
                    background: bg,
                    transition: "background 0.35s",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Grid texture */}
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute", inset: 0,
                        backgroundImage: `
              linear-gradient(${dark ? "rgba(255,255,255,0.022)" : "rgba(0,0,0,0.036)"} 1px, transparent 1px),
              linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.022)" : "rgba(0,0,0,0.036)"} 1px, transparent 1px)
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

                    {/* ── Section heading ── */}
                    <motion.div
                        ref={headingRef}
                        initial={{ opacity: 0, y: 24 }}
                        animate={headingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 20,
                            marginBottom: "clamp(36px, 6vw, 64px)",
                            position: "relative",
                        }}
                    >
                        <div style={{ flex: 1, height: 1, background: border }} />
                        <h2
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 900,
                                fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
                                letterSpacing: "-0.038em",
                                color: text,
                                lineHeight: 1,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                                transition: "color 0.35s",
                            }}
                        >
                            About
                        </h2>
                        <div style={{ flex: 1, height: 1, background: border }} />
                    </motion.div>

                    {/* ── Stats row ── */}
                    <div className="stats-grid" style={{ marginBottom: "clamp(36px, 6vw, 64px)" }}>
                        {STATS.map((s, i) => (
                            <StatCard key={s.label} stat={s} index={i} dark={dark} />
                        ))}
                    </div>

                    {/* ── Main 2-col grid ── */}
                    <div className="about-grid">

                        {/* Left: text content */}
                        <div>
                            {/* Bio */}
                            <motion.div
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    background: cardBg,
                                    border: `1px solid ${border}`,
                                    borderRadius: 20,
                                    padding: "clamp(22px, 3.5vw, 36px)",
                                    marginBottom: "clamp(16px, 2.5vw, 24px)",
                                    transition: "background 0.35s, border-color 0.35s",
                                }}
                            >
                                {/* Label */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        marginBottom: 16,
                                    }}
                                >
                                    <motion.div
                                        initial={{ scaleX: 0, originX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4 }}
                                        style={{
                                            width: 24, height: 3,
                                            borderRadius: 99,
                                            background: "#7c6fcd",
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontFamily: "'Syne', sans-serif",
                                            fontSize: "0.7rem",
                                            fontWeight: 700,
                                            letterSpacing: "0.1em",
                                            color: "#7c6fcd",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        Who I Am
                                    </span>
                                </div>

                                <h3
                                    style={{
                                        fontFamily: "'Syne', sans-serif",
                                        fontWeight: 800,
                                        fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
                                        letterSpacing: "-0.028em",
                                        color: text,
                                        lineHeight: 1.25,
                                        marginBottom: 14,
                                        transition: "color 0.35s",
                                    }}
                                >
                                    Back-End Developer focused on building things that last.
                                </h3>

                                <p
                                    style={{
                                        fontSize: "clamp(0.84rem, 1.4vw, 0.92rem)",
                                        color: muted,
                                        lineHeight: 1.76,
                                        marginBottom: 12,
                                    }}
                                >
                                    I'm Amirreza Mousavi, a back-end engineer with 4+ years of experience
                                    designing scalable server-side systems. I specialize in RESTful & GraphQL APIs,
                                    relational and document databases, and cloud-native infrastructure.
                                </p>
                                <p
                                    style={{
                                        fontSize: "clamp(0.84rem, 1.4vw, 0.92rem)",
                                        color: muted,
                                        lineHeight: 1.76,
                                    }}
                                >
                                    When I'm not architecting APIs, I'm exploring distributed systems, contributing
                                    to open-source, or mentoring junior developers. I believe good software is
                                    invisible — it just works.
                                </p>

                                {/* Social + resume */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginTop: 24,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <motion.a
                                        href="#"
                                        className="resume-btn"
                                        whileTap={{ scale: 0.96 }}
                                        style={{
                                            display: "flex", alignItems: "center", gap: 7,
                                            padding: "9px 18px",
                                            borderRadius: 9999,
                                            background: text,
                                            color: bg,
                                            fontFamily: "'Syne', sans-serif",
                                            fontSize: "0.8rem",
                                            fontWeight: 700,
                                            letterSpacing: "0.02em",
                                            textDecoration: "none",
                                            flexShrink: 0,
                                            transition: "background 0.35s, color 0.35s",
                                        }}
                                    >
                                        <Download size={13} strokeWidth={2.5} />
                                        Resume
                                    </motion.a>

                                    {SOCIALS.map(({ icon: Icon, href, label }) => (
                                        <motion.a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="social-pill"
                                            whileTap={{ scale: 0.9 }}
                                            style={{
                                                width: 36, height: 36,
                                                borderRadius: "50%",
                                                background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                                                border: `1px solid ${border}`,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: muted,
                                                textDecoration: "none",
                                                flexShrink: 0,
                                            }}
                                        >
                                            <Icon size={15} strokeWidth={1.8} />
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Bottom: skills + timeline */}
                            <div className="bottom-grid">

                                {/* Skills */}
                                <motion.div
                                    initial={{ opacity: 0, y: 28 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                    style={{
                                        background: cardBg,
                                        border: `1px solid ${border}`,
                                        borderRadius: 20,
                                        padding: "clamp(20px, 3vw, 30px)",
                                        transition: "background 0.35s, border-color 0.35s",
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
                                        <motion.div
                                            initial={{ scaleX: 0, originX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4 }}
                                            style={{ width: 20, height: 3, borderRadius: 99, background: "#4caf7d" }}
                                        />
                                        <span
                                            style={{
                                                fontFamily: "'Syne', sans-serif", fontSize: "0.7rem", fontWeight: 700,
                                                letterSpacing: "0.1em", color: "#4caf7d", textTransform: "uppercase",
                                            }}
                                        >
                                            Tech Stack
                                        </span>
                                    </div>

                                    {SKILLS.map((skill, i) => (
                                        <SkillBar key={skill.name} skill={skill} index={i} dark={dark} />
                                    ))}
                                </motion.div>

                                {/* Timeline */}
                                <motion.div
                                    initial={{ opacity: 0, y: 28 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ delay: 0.18, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                    style={{
                                        background: cardBg,
                                        border: `1px solid ${border}`,
                                        borderRadius: 20,
                                        padding: "clamp(20px, 3vw, 30px)",
                                        transition: "background 0.35s, border-color 0.35s",
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                                        <motion.div
                                            initial={{ scaleX: 0, originX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4 }}
                                            style={{ width: 20, height: 3, borderRadius: 99, background: "#f5a623" }}
                                        />
                                        <span
                                            style={{
                                                fontFamily: "'Syne', sans-serif", fontSize: "0.7rem", fontWeight: 700,
                                                letterSpacing: "0.1em", color: "#f5a623", textTransform: "uppercase",
                                            }}
                                        >
                                            Experience
                                        </span>
                                    </div>

                                    {TIMELINE.map((item, i) => (
                                        <TimelineItem
                                            key={item.year}
                                            item={item}
                                            index={i}
                                            dark={dark}
                                            isLast={i === TIMELINE.length - 1}
                                        />
                                    ))}
                                </motion.div>

                            </div>
                        </div>

                        {/* Right: photo */}
                        <div className="photo-col">
                            <ParallaxPhoto dark={dark} />
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}