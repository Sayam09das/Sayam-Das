"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    motion,
    useInView,
    useSpring,
    useMotionValue,
    AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import SkillsHero from "./SkillsHero";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
interface Skill {
    name: string;
    level: number;
    color: string;
    category: string;
    years: number;
    desc: string;
    icon: string;
}

// All categories present in the data (used for filter + bar section)
const ALL_CATEGORIES = [
    "Frontend",
    "Framework",
    "Animation",
    "Backend",
    "AI / ML",
    "Database",
    "Tools",
] as const;

const FILTER_CATEGORIES = ["All", ...ALL_CATEGORIES];

// ─── Data — all icons from devicons (reliable CDN) ───────────────────────────
// For libs without a devicon (Framer, GSAP, Lenis, Excel) we use an SVG data URI
// so the icon always renders at a consistent 36×36 square, no external dependency.

const ICON_FRAMER =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%230055FF' d='M4 0h16v8h-8zm0 8h8l8 8H4zm0 8h8v8z'/%3E%3C/svg%3E";

const ICON_GSAP =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='%2388CE02'/%3E%3Ctext x='12' y='16' text-anchor='middle' font-size='8' font-weight='bold' fill='%23000' font-family='sans-serif'%3EGSAP%3C/text%3E%3C/svg%3E";

const ICON_LENIS =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='4' fill='%23F7DF1E'/%3E%3Cpath d='M6 17V7l2 2v6h4v2H6zm6-10h2v8l2-2 1.5 1.5L14 18l-2-1V7z' fill='%23000'/%3E%3C/svg%3E";

const ICON_EXCEL =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='3' fill='%23217346'/%3E%3Cpath d='M7 7l3 5-3 5h2l2-3.3 2 3.3h2l-3-5 3-5h-2l-2 3.3L9 7H7z' fill='white'/%3E%3C/svg%3E";

const SKILLS: Skill[] = [
    // ── Frontend ──────────────────────────────────────────────────────────────
    {
        name: "HTML5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        level: 90, color: "#E34F26", category: "Frontend", years: 4,
        desc: "Semantic markup and modern web structure",
    },
    {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        level: 88, color: "#1572B6", category: "Frontend", years: 4,
        desc: "Responsive layouts, flexbox, grid, animations",
    },
    {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        level: 85, color: "#F7DF1E", category: "Frontend", years: 4,
        desc: "ES6+, asynchronous programming",
    },
    {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        level: 75, color: "#3178C6", category: "Frontend", years: 2,
        desc: "Typed JavaScript for scalable apps",
    },

    // ── Framework ─────────────────────────────────────────────────────────────
    {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        level: 85, color: "#61DAFB", category: "Framework", years: 3,
        desc: "Component architecture and hooks",
    },
    {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        level: 80, color: "#aaaaaa", category: "Framework", years: 2,
        desc: "SSR, routing and modern React apps",
    },
    {
        name: "Bootstrap",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        level: 80, color: "#7952B3", category: "Framework", years: 3,
        desc: "Responsive UI component framework",
    },
    {
        name: "Vite",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
        level: 75, color: "#646CFF", category: "Framework", years: 2,
        desc: "Lightning-fast frontend build tool",
    },

    // ── Animation ─────────────────────────────────────────────────────────────
    {
        name: "Framer Motion",
        icon: ICON_FRAMER,
        level: 80, color: "#0055FF", category: "Animation", years: 2,
        desc: "React animation library with spring physics",
    },
    {
        name: "GSAP",
        icon: ICON_GSAP,
        level: 75, color: "#88CE02", category: "Animation", years: 1,
        desc: "High-performance JS animations",
    },
    {
        name: "Lenis",
        icon: ICON_LENIS,
        level: 70, color: "#F7DF1E", category: "Animation", years: 1,
        desc: "Buttery smooth scroll library",
    },

    // ── Backend ───────────────────────────────────────────────────────────────
    {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        level: 75, color: "#339933", category: "Backend", years: 3,
        desc: "Backend APIs and server-side logic",
    },
    {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        level: 78, color: "#3776AB", category: "Backend", years: 3,
        desc: "Automation, scripting and ML pipelines",
    },

    // ── AI / ML ───────────────────────────────────────────────────────────────
    {
        name: "Machine Learning",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
        level: 70, color: "#FF6F00", category: "AI / ML", years: 2,
        desc: "Model training and ML experiments",
    },

    // ── Database ──────────────────────────────────────────────────────────────
    {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        level: 75, color: "#4479A1", category: "Database", years: 2,
        desc: "Relational database management",
    },
    {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        level: 72, color: "#47A248", category: "Database", years: 2,
        desc: "NoSQL database for modern apps",
    },

    // ── Tools ─────────────────────────────────────────────────────────────────
    {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        level: 85, color: "#F05032", category: "Tools", years: 4,
        desc: "Version control and collaboration",
    },
    {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        level: 65, color: "#2496ED", category: "Tools", years: 2,
        desc: "Containerisation and deployment",
    },
    {
        name: "Excel",
        icon: ICON_EXCEL,
        level: 70, color: "#217346", category: "Tools", years: 3,
        desc: "Data analysis and spreadsheets",
    },
];

// ─── Magnetic cursor hook ─────────────────────────────────────────────────────
function useMagnetic(strength = 0.28) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 22 });
    const sy = useSpring(y, { stiffness: 200, damping: 22 });

    const onMove = useCallback(
        (e: MouseEvent) => {
            if (!ref.current) return;
            const r = ref.current.getBoundingClientRect();
            x.set((e.clientX - (r.left + r.width / 2)) * strength);
            y.set((e.clientY - (r.top + r.height / 2)) * strength);
        },
        [strength, x, y]
    );
    const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.addEventListener("mousemove", onMove as EventListener);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            el.removeEventListener("mousemove", onMove as EventListener);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, [onMove, onLeave]);

    return { ref, sx, sy };
}

// ─── Circular skill card ──────────────────────────────────────────────────────
// Fixed: uniform 80×80 SVG ring, 36×36 icon, consistent padding, single ref pattern
function CircularSkill({
    skill,
    index,
    dark,
}: {
    skill: Skill;
    index: number;
    dark: boolean;
}) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const inView = useInView(wrapRef, { once: true, margin: "-40px" });
    const { ref: magRef, sx, sy } = useMagnetic(0.22);
    const [hovered, setHovered] = useState(false);

    const R = 32;
    const circ = 2 * Math.PI * R;
    const dash = (skill.level / 100) * circ;

    // Sync both refs to the same element
    const setRef = useCallback(
        (el: HTMLDivElement | null) => {
            (wrapRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
            (magRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        },
        [magRef]
    );

    // GSAP: scroll-triggered pop-in (supplements Framer entrance)
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        gsap.fromTo(
            el,
            { opacity: 0, scale: 0.78, y: 28 },
            {
                opacity: 1, scale: 1, y: 0,
                duration: 0.75,
                delay: (index % 4) * 0.07,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: el,
                    start: "top 92%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, [index]);

    return (
        <motion.div
            ref={setRef}
            style={{ x: sx, y: sy }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.div
                className="orb-card"
                animate={{
                    background: hovered
                        ? dark ? "#1e1e1c" : "#ffffff"
                        : dark ? "#161614" : "#f4f3f0",
                    borderColor: hovered
                        ? `${skill.color}55`
                        : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)",
                    boxShadow: hovered
                        ? `0 14px 44px rgba(0,0,0,${dark ? 0.45 : 0.14}), 0 0 0 1px ${skill.color}33`
                        : `0 3px 14px rgba(0,0,0,${dark ? 0.22 : 0.07})`,
                }}
                transition={{ duration: 0.26 }}
            >
                {/* Radial glow */}
                <motion.div
                    className="orb-glow"
                    animate={{ opacity: hovered ? 0.16 : 0 }}
                    transition={{ duration: 0.28 }}
                    style={{ background: `radial-gradient(circle at 50% 50%, ${skill.color}, transparent 68%)` }}
                />

                {/* ── SVG ring — fixed 80×80, always same size ── */}
                <div className="orb-ring-wrap">
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 80 80"
                        style={{ transform: "rotate(-90deg)", display: "block" }}
                    >
                        {/* Track */}
                        <circle
                            cx="40" cy="40" r={R}
                            fill="none"
                            stroke={dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
                            strokeWidth="5.5"
                        />
                        {/* Animated fill */}
                        <motion.circle
                            cx="40" cy="40" r={R}
                            fill="none"
                            stroke={skill.color}
                            strokeWidth="5.5"
                            strokeLinecap="round"
                            strokeDasharray={circ}
                            initial={{ strokeDashoffset: circ }}
                            animate={inView ? { strokeDashoffset: circ - dash } : {}}
                            transition={{
                                delay: (index % 4) * 0.07 + 0.25,
                                duration: 1.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{ filter: `drop-shadow(0 0 4px ${skill.color}88)` }}
                        />
                    </svg>

                    {/* Center icon — fixed 36×36 container, object-contain keeps aspect */}
                    <div className="orb-icon-wrap">
                        <motion.img
                            src={skill.icon}
                            alt={skill.name}
                            width={36}
                            height={36}
                            initial={{ opacity: 0, scale: 0.55 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: (index % 4) * 0.07 + 0.32, duration: 0.38 }}
                            style={{
                                width: 36,
                                height: 36,
                                objectFit: "contain",
                                display: "block",
                                userSelect: "none",
                                flexShrink: 0,
                            }}
                        />
                    </div>
                </div>

                {/* Name */}
                <span className="orb-name" style={{ color: dark ? "rgba(240,239,234,0.84)" : "rgba(0,0,0,0.8)" }}>
                    {skill.name}
                </span>

                {/* Level + years row — consistent layout every card */}
                <div className="orb-meta">
                    <span className="orb-level" style={{ color: skill.color }}>
                        {skill.level}%
                    </span>
                    <span
                        className="orb-years"
                        style={{
                            color: skill.color,
                            background: `${skill.color}18`,
                            border: `1px solid ${skill.color}33`,
                        }}
                    >
                        {skill.years}yr
                    </span>
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            className="orb-tooltip"
                            initial={{ opacity: 0, y: 6, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.9 }}
                            transition={{ duration: 0.18 }}
                            style={{ background: dark ? "#1c1c1a" : "#111110" }}
                        >
                            {skill.desc}
                            <span
                                className="orb-tooltip-arrow"
                                style={{ borderTopColor: dark ? "#1c1c1a" : "#111110" }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

// ─── Bar skill row ────────────────────────────────────────────────────────────
function BarSkill({
    skill,
    index,
    dark,
}: {
    skill: Skill;
    index: number;
    dark: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-28px" });
    const [hovered, setHovered] = useState(false);

    // GSAP: slide-in from left
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        gsap.fromTo(
            el,
            { opacity: 0, x: -32 },
            {
                opacity: 1, x: 0,
                duration: 0.65,
                delay: index * 0.06,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 91%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, [index]);

    // GSAP: bar fill animation
    useEffect(() => {
        const bar = barRef.current;
        if (!bar || !inView) return;
        gsap.fromTo(
            bar,
            { width: "0%" },
            {
                width: `${skill.level}%`,
                duration: 1.1,
                delay: index * 0.06 + 0.18,
                ease: "power3.out",
            }
        );
    }, [inView, skill.level, index]);

    return (
        <div
            ref={ref}
            style={{ marginBottom: 16, cursor: "default" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="bar-row">
                <div className="bar-label-left">
                    {/* Fixed 22×22 icon container — same size for every skill */}
                    <div className="bar-icon-wrap">
                        <img
                            src={skill.icon}
                            alt={skill.name}
                            width={22}
                            height={22}
                            style={{
                                width: 22,
                                height: 22,
                                objectFit: "contain",
                                display: "block",
                                flexShrink: 0,
                            }}
                        />
                    </div>
                    <span
                        className="bar-name"
                        style={{ color: dark ? "rgba(240,239,234,0.84)" : "rgba(0,0,0,0.8)" }}
                    >
                        {skill.name}
                    </span>
                </div>
                <div className="bar-label-right">
                    <span className="bar-years" style={{ color: dark ? "rgba(240,239,234,0.3)" : "rgba(0,0,0,0.3)" }}>
                        {skill.years}yr
                    </span>
                    <motion.span
                        animate={{
                            color: hovered
                                ? skill.color
                                : dark ? "rgba(240,239,234,0.55)" : "rgba(0,0,0,0.55)",
                        }}
                        className="bar-percent"
                    >
                        {skill.level}%
                    </motion.span>
                </div>
            </div>

            {/* Track */}
            <div
                className="bar-track"
                style={{ background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)" }}
            >
                {/* Fill — driven by GSAP */}
                <div
                    ref={barRef}
                    className="bar-fill"
                    style={{
                        background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                        boxShadow: `0 0 8px ${skill.color}55`,
                        width: 0, // GSAP animates this
                    }}
                >
                    {/* Shimmer — Framer handles the repeating shine */}
                    <motion.div
                        className="bar-shimmer"
                        animate={{ x: ["-100%", "220%"] }}
                        transition={{
                            duration: 1.8,
                            delay: index * 0.06 + 1.3,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </div>

            {/* Hover description */}
            <AnimatePresence>
                {hovered && (
                    <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 5 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            fontSize: "0.7rem",
                            color: dark ? "rgba(240,239,234,0.38)" : "rgba(0,0,0,0.38)",
                            lineHeight: 1.5,
                            overflow: "hidden",
                        }}
                    >
                        {skill.desc}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Category filter ──────────────────────────────────────────────────────────
function CategoryFilter({
    active,
    onChange,
    dark,
}: {
    active: string;
    onChange: (c: string) => void;
    dark: boolean;
}) {
    return (
        <div className="filter-row">
            {FILTER_CATEGORIES.map((cat) => (
                <motion.button
                    key={cat}
                    onClick={() => onChange(cat)}
                    whileTap={{ scale: 0.92 }}
                    animate={{
                        background:
                            active === cat
                                ? dark ? "#f0efea" : "#111110"
                                : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                        color:
                            active === cat
                                ? dark ? "#111110" : "#f0efea"
                                : dark ? "rgba(240,239,234,0.55)" : "rgba(0,0,0,0.55)",
                    }}
                    transition={{ duration: 0.2 }}
                    className="filter-btn"
                    style={{
                        border: `1px solid ${dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"}`,
                    }}
                >
                    {cat}
                </motion.button>
            ))}
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Skills() {
    const [activeCategory, setActiveCategory] = useState("All");
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const dividerRef1 = useRef<HTMLDivElement>(null);
    const dividerRef2 = useRef<HTMLDivElement>(null);
    const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

    const { theme } = useTheme();
    const dark = theme === "dark";

    const bg = dark ? "#0d0d0c" : "#ececea";
    const cardBg = dark ? "#141412" : "#f8f7f4";
    const text = dark ? "#f0efea" : "#111110";
    const muted = dark ? "rgba(240,239,234,0.44)" : "rgba(0,0,0,0.44)";
    const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";
    const chevBg = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

    const filtered =
        activeCategory === "All"
            ? SKILLS
            : SKILLS.filter((s) => s.category === activeCategory);

    // GSAP: animate divider lines
    useEffect(() => {
        [dividerRef1, dividerRef2].forEach((r, i) => {
            if (!r.current) return;
            gsap.fromTo(
                r.current,
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1,
                    duration: 1.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: r.current,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Orb card — fixed dimensions, no size variation ── */
        .orb-card {
          border-radius: 18px;
          border: 1px solid transparent;
          padding: 20px 14px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: default;
          position: relative;
          overflow: hidden;
          /* Fixed card height so ALL cards are identical */
          min-height: 192px;
        }
        .orb-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* Ring wrap: always 80×80, centred */
        .orb-ring-wrap {
          position: relative;
          width: 80px;
          height: 80px;
          flex-shrink: 0;
        }

        /* Icon centred inside ring */
        .orb-icon-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Name: fixed font-size, two-line clamp so long names don't blow the layout */
        .orb-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 700;
          font-size: 0.74rem;
          letter-spacing: -0.01em;
          text-align: center;
          line-height: 1.25;
          width: 100%;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          transition: color 0.35s;
        }

        /* Level + years always in the same row at the bottom */
        .orb-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
        }
        .orb-level {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.04em;
        }
        .orb-years {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          border-radius: 9999px;
          padding: 2px 7px;
        }

        /* Tooltip */
        .orb-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          color: #f0efea;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.67rem;
          font-weight: 500;
          line-height: 1.45;
          padding: 7px 10px;
          border-radius: 8px;
          max-width: 158px;
          text-align: center;
          white-space: normal;
          z-index: 30;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          pointer-events: none;
        }
        .orb-tooltip-arrow {
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0; height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top-width: 5px;
          border-top-style: solid;
        }

        /* ── Bar skill ── */
        .bar-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 7px;
          gap: 8px;
        }
        .bar-label-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        /* Fixed 22×22 slot — icon never shifts layout */
        .bar-icon-wrap {
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bar-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.35s;
        }
        .bar-label-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .bar-years {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.67rem;
          font-weight: 700;
        }
        .bar-percent {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          min-width: 34px;
          text-align: right;
        }
        .bar-track {
          height: 6px;
          border-radius: 9999px;
          overflow: hidden;
          position: relative;
        }
        .bar-fill {
          height: 100%;
          border-radius: 9999px;
          position: relative;
          overflow: hidden;
        }
        .bar-shimmer {
          position: absolute;
          top: 0; bottom: 0;
          width: 38%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.38), transparent);
          border-radius: 9999px;
        }

        /* ── Filter ── */
        .filter-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .filter-btn {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 700;
          font-size: 0.73rem;
          letter-spacing: 0.04em;
          padding: 6px 15px;
          border-radius: 9999px;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }

        /* ── Orb grid: 4→3→2→1 col ── */
        .skills-orb-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.8vw, 18px);
        }

        /* ── Bar two-col: 2→1 ── */
        .skills-bar-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2.5vw, 28px);
        }

        /* ── Responsive ── */
        @media (max-width: 1000px) {
          .skills-orb-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .skills-orb-grid { grid-template-columns: repeat(2, 1fr); }
          .skills-bar-grid  { grid-template-columns: 1fr; }
          .filter-row       { gap: 5px; }
          .filter-btn       { font-size: 0.68rem; padding: 5px 12px; }
        }
        @media (max-width: 400px) {
          .skills-orb-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .bar-fill, .bar-shimmer, .orb-card { transition: none !important; animation: none !important; }
        }
      `}</style>

            <section
                ref={sectionRef}
                id="skills"
                aria-label="Skills"
                style={{
                    width: "100%",
                    background: bg,
                    transition: "background 0.35s",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* ── Hero band ── */}
                <SkillsHero
                    dark={dark}
                    bg={bg}
                    text={text}
                    muted={muted}
                    border={border}
                    chevBg={chevBg}
                />

                {/* ── Content ── */}
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        padding:
                            "clamp(40px, 6vw, 72px) clamp(16px, 5vw, 48px) clamp(64px, 10vw, 120px)",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {/* Divider 1 */}
                    <div
                        ref={dividerRef1}
                        style={{
                            height: 1,
                            background: `linear-gradient(to right, ${border}, #7c6fcd66, ${border})`,
                            marginBottom: "clamp(32px, 5vw, 56px)",
                        }}
                    />

                    {/* ── Filter + Orb grid ── */}
                    <motion.div
                        ref={headingRef}
                        initial={{ opacity: 0, y: 22 }}
                        animate={headingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Label row */}
                        <div className="orb-header" style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: 16,
                            marginBottom: "clamp(20px, 3vw, 32px)",
                        }}>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                                    <motion.div
                                        initial={{ scaleX: 0, originX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.45 }}
                                        style={{ width: 22, height: 3, borderRadius: 99, background: "#7c6fcd" }}
                                    />
                                    <span style={{
                                        fontFamily: "'Bricolage Grotesque', sans-serif",
                                        fontSize: "0.68rem", fontWeight: 800,
                                        letterSpacing: "0.12em", color: "#7c6fcd",
                                        textTransform: "uppercase",
                                    }}>
                                        Proficiency Overview
                                    </span>
                                </div>
                                <h2 style={{
                                    fontFamily: "'Bricolage Grotesque', sans-serif",
                                    fontWeight: 900,
                                    fontSize: "clamp(1.3rem, 2.8vw, 1.85rem)",
                                    letterSpacing: "-0.03em",
                                    color: text,
                                    transition: "color 0.35s",
                                }}>
                                    {filtered.length} Technologies
                                </h2>
                            </div>

                            <CategoryFilter
                                active={activeCategory}
                                onChange={setActiveCategory}
                                dark={dark}
                            />
                        </div>

                        {/* Orb grid — AnimatePresence for category switch */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                className="skills-orb-grid"
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {filtered.map((skill, i) => (
                                    <CircularSkill
                                        key={skill.name}
                                        skill={skill}
                                        index={i}
                                        dark={dark}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Divider 2 */}
                    <div
                        ref={dividerRef2}
                        style={{
                            height: 1,
                            background: border,
                            margin: "clamp(40px, 7vw, 72px) 0",
                        }}
                    />

                    {/* ── Bar breakdown — ALL categories ── */}
                    <div>
                        <div style={{
                            display: "flex", alignItems: "center", gap: 10,
                            marginBottom: "clamp(24px, 4vw, 40px)",
                        }}>
                            <motion.div
                                initial={{ scaleX: 0, originX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45 }}
                                style={{ width: 22, height: 3, borderRadius: 99, background: "#4caf7d" }}
                            />
                            <span style={{
                                fontFamily: "'Bricolage Grotesque', sans-serif",
                                fontSize: "0.68rem", fontWeight: 800,
                                letterSpacing: "0.12em", color: "#4caf7d",
                                textTransform: "uppercase",
                            }}>
                                Detailed Breakdown
                            </span>
                        </div>

                        {/* 2-col grid covering ALL 7 categories */}
                        <div className="skills-bar-grid">
                            {ALL_CATEGORIES.map((cat, colIdx) => {
                                const catSkills = SKILLS.filter((s) => s.category === cat);
                                if (catSkills.length === 0) return null;
                                return (
                                    <motion.div
                                        key={cat}
                                        initial={{ opacity: 0, y: 28 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{
                                            delay: (colIdx % 2) * 0.08,
                                            duration: 0.65,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        style={{
                                            background: cardBg,
                                            border: `1px solid ${border}`,
                                            borderRadius: 20,
                                            padding: "clamp(18px, 3vw, 28px)",
                                            transition: "background 0.35s, border-color 0.35s",
                                        }}
                                    >
                                        {/* Card header */}
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginBottom: 22,
                                        }}>
                                            <span style={{
                                                fontFamily: "'Bricolage Grotesque', sans-serif",
                                                fontWeight: 800, fontSize: "0.9rem",
                                                letterSpacing: "-0.015em",
                                                color: text, transition: "color 0.35s",
                                            }}>
                                                {cat}
                                            </span>
                                            <span style={{
                                                fontFamily: "'Bricolage Grotesque', sans-serif",
                                                fontSize: "0.63rem", fontWeight: 800,
                                                letterSpacing: "0.08em", color: muted,
                                                background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                                                borderRadius: 9999,
                                                padding: "3px 9px",
                                            }}>
                                                {catSkills.length} skill{catSkills.length !== 1 ? "s" : ""}
                                            </span>
                                        </div>

                                        {catSkills.map((skill, i) => (
                                            <BarSkill
                                                key={skill.name}
                                                skill={skill}
                                                index={i}
                                                dark={dark}
                                            />
                                        ))}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Marquee strip ── */}
                    <div style={{ marginTop: "clamp(48px, 8vw, 80px)", overflow: "hidden" }}>
                        <div style={{ height: 1, background: border, marginBottom: 22 }} />
                        <motion.div
                            animate={{ x: [0, -1400] }}
                            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                            style={{ display: "flex", gap: 40, width: "max-content", alignItems: "center" }}
                        >
                            {[...SKILLS, ...SKILLS].map((skill, i) => (
                                <span
                                    key={`${skill.name}-${i}`}
                                    style={{
                                        fontFamily: "'Bricolage Grotesque', sans-serif",
                                        fontWeight: 800,
                                        fontSize: "clamp(0.72rem, 1.2vw, 0.92rem)",
                                        letterSpacing: "0.06em",
                                        textTransform: "uppercase",
                                        color: i % 3 === 0 ? skill.color : muted,
                                        opacity: i % 3 === 0 ? 0.8 : 0.22,
                                        whiteSpace: "nowrap",
                                        transition: "color 0.35s",
                                    }}
                                >
                                    {skill.name}
                                    <span style={{ margin: "0 14px", opacity: 0.18, color: text }}>×</span>
                                </span>
                            ))}
                        </motion.div>
                        <div style={{ height: 1, background: border, marginTop: 22 }} />
                    </div>
                </div>
            </section>
        </>
    );
}