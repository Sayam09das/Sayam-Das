"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    motion,
    useInView,
    useSpring,
    useMotionValue,
    AnimatePresence,
} from "framer-motion";
import SkillsHero from "./SkillsHero";

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Skill {
    name: string;
    level: number;
    color: string;
    category: string;
    years: number;
    desc: string;
    icon: string;
}

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "Tools"];

const SKILLS: Skill[] = [
  // Core Web
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    level: 90,
    color: "#E34F26",
    category: "Frontend",
    years: 4,
    desc: "Semantic markup and modern web structure",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    level: 88,
    color: "#1572B6",
    category: "Frontend",
    years: 4,
    desc: "Responsive layouts, flexbox, grid, animations",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    level: 85,
    color: "#F7DF1E",
    category: "Frontend",
    years: 4,
    desc: "ES6+, asynchronous programming",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    level: 75,
    color: "#3178C6",
    category: "Frontend",
    years: 2,
    desc: "Typed JavaScript for scalable apps",
  },

  // Frameworks
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    level: 85,
    color: "#61DAFB",
    category: "Framework",
    years: 3,
    desc: "Component architecture and hooks",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    level: 80,
    color: "#000000",
    category: "Framework",
    years: 2,
    desc: "SSR, routing and modern React apps",
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    level: 80,
    color: "#7952B3",
    category: "Framework",
    years: 3,
    desc: "Responsive UI framework",
  },
  {
    name: "Vite",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    level: 75,
    color: "#646CFF",
    category: "Tools",
    years: 2,
    desc: "Fast frontend build tool",
  },

  // Animation
  {
    name: "Framer Motion",
    icon: "https://cdn.simpleicons.org/framer/0055FF",
    level: 80,
    color: "#0055FF",
    category: "Animation",
    years: 2,
    desc: "React animation library",
  },
  {
    name: "GSAP",
    icon: "https://cdn.simpleicons.org/greensock/88CE02",
    level: 75,
    color: "#88CE02",
    category: "Animation",
    years: 1,
    desc: "High performance animations",
  },
  {
    name: "Lenis",
    icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
    level: 70,
    color: "#F7DF1E",
    category: "Animation",
    years: 1,
    desc: "Smooth scrolling animations",
  },

  // Backend
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    level: 75,
    color: "#339933",
    category: "Backend",
    years: 3,
    desc: "Backend APIs and server logic",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    level: 78,
    color: "#3776AB",
    category: "Backend",
    years: 3,
    desc: "Automation and ML scripting",
  },

  // AI
  {
    name: "Machine Learning",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    level: 70,
    color: "#FF6F00",
    category: "AI / ML",
    years: 2,
    desc: "Model training and ML experiments",
  },

  // Database
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    level: 75,
    color: "#4479A1",
    category: "Database",
    years: 2,
    desc: "Relational database management",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    level: 72,
    color: "#47A248",
    category: "Database",
    years: 2,
    desc: "NoSQL database for modern apps",
  },

  // Tools
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    level: 85,
    color: "#F05032",
    category: "Tools",
    years: 4,
    desc: "Version control and collaboration",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    level: 65,
    color: "#2496ED",
    category: "Tools",
    years: 2,
    desc: "Containerization",
  },
  {
    name: "Excel",
    icon: "https://cdn.simpleicons.org/microsoftexcel/217346",
    level: 70,
    color: "#217346",
    category: "Tools",
    years: 3,
    desc: "Data analysis and spreadsheets",
  },
];
// ─── Magnetic cursor hook ─────────────────────────────────────────────────────
function useMagnetic(strength = 0.35) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 20 });
    const springY = useSpring(y, { stiffness: 200, damping: 20 });

    const onMove = useCallback((e: MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * strength);
        y.set((e.clientY - cy) * strength);
    }, [strength, x, y]);

    const onLeave = useCallback(() => {
        x.set(0); y.set(0);
    }, [x, y]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.addEventListener("mousemove", onMove as any);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            el.removeEventListener("mousemove", onMove as any);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, [onMove, onLeave]);

    return { ref, springX, springY };
}

// ─── Circular skill chart ─────────────────────────────────────────────────────
function CircularSkill({
    skill,
    index,
    dark,
}: {
    skill: Skill;
    index: number;
    dark: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const { ref: magRef, springX, springY } = useMagnetic(0.25);
    const [hovered, setHovered] = useState(false);

    const R = 28;
    const circ = 2 * Math.PI * R;
    const dash = (skill.level / 100) * circ;

    return (
        <motion.div
            ref={(el) => {
                (ref as any).current = el;
                (magRef as any).current = el;
            }}
            initial={{ opacity: 0, scale: 0.8, y: 24 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: index * 0.06, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: springX, y: springY }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.div
                animate={{
                    background: hovered
                        ? dark ? "#1e1e1c" : "#ffffff"
                        : dark ? "#161614" : "#f4f3f0",
                    borderColor: hovered ? skill.color + "55" : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)",
                    boxShadow: hovered
                        ? `0 12px 40px rgba(0,0,0,${dark ? 0.4 : 0.13}), 0 0 0 1px ${skill.color}33`
                        : `0 3px 12px rgba(0,0,0,${dark ? 0.2 : 0.06})`,
                }}
                transition={{ duration: 0.28 }}
                style={{
                    borderRadius: 18,
                    border: "1px solid transparent",
                    padding: "20px 18px 18px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Glow blob */}
                <motion.div
                    animate={{ opacity: hovered ? 0.14 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: "absolute", inset: 0,
                        background: `radial-gradient(circle at 50% 50%, ${skill.color}, transparent 70%)`,
                        pointerEvents: "none",
                    }}
                />

                {/* SVG ring */}
                <div style={{ position: "relative", width: 72, height: 72 }}>
                    <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
                        {/* Track */}
                        <circle
                            cx="36" cy="36" r={R}
                            fill="none"
                            stroke={dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}
                            strokeWidth="5"
                        />
                        {/* Fill */}
                        <motion.circle
                            cx="36" cy="36" r={R}
                            fill="none"
                            stroke={skill.color}
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeDasharray={`${circ}`}
                            initial={{ strokeDashoffset: circ }}
                            animate={inView ? { strokeDashoffset: circ - dash } : {}}
                            transition={{ delay: index * 0.06 + 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                            style={{ filter: `drop-shadow(0 0 5px ${skill.color}88)` }}
                        />
                    </svg>
                    {/* Center icon */}
                    <div
                        style={{
                            position: "absolute", inset: 0,
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                    >
                        <motion.img
                            src={skill.icon}
                            alt={skill.name}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: index * 0.06 + 0.3, duration: 0.4 }}
                            style={{
                                width: 36,
                                height: 36,
                                objectFit: "contain",
                                userSelect: "none",
                            }}
                        />
                    </div>
                </div>

                {/* Name */}
                <span
                    style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.76rem",
                        letterSpacing: "-0.01em",
                        color: dark ? "rgba(240,239,234,0.82)" : "rgba(0,0,0,0.78)",
                        textAlign: "center",
                        lineHeight: 1.2,
                        transition: "color 0.35s",
                    }}
                >
                    {skill.name}
                </span>

                {/* Years badge */}
                <span
                    style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.62rem",
                        letterSpacing: "0.06em",
                        color: skill.color,
                        background: skill.color + "18",
                        borderRadius: 9999,
                        padding: "2px 8px",
                        border: `1px solid ${skill.color}33`,
                    }}
                >
                    {skill.years}yr
                </span>

                {/* Hover tooltip */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.92 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: "absolute",
                                bottom: "calc(100% + 8px)",
                                left: "50%",
                                transform: "translateX(-50%)",
                                background: dark ? "#1e1e1c" : "#111110",
                                color: dark ? "#f0efea" : "#f0efea",
                                fontSize: "0.68rem",
                                fontWeight: 500,
                                lineHeight: 1.4,
                                padding: "7px 10px",
                                borderRadius: 8,
                                maxWidth: 160,
                                textAlign: "center",
                                whiteSpace: "normal",
                                zIndex: 20,
                                boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
                                pointerEvents: "none",
                            }}
                        >
                            {skill.desc}
                            {/* Arrow */}
                            <span
                                style={{
                                    position: "absolute",
                                    bottom: -5, left: "50%",
                                    transform: "translateX(-50%)",
                                    width: 0, height: 0,
                                    borderLeft: "5px solid transparent",
                                    borderRight: "5px solid transparent",
                                    borderTop: `5px solid ${dark ? "#1e1e1c" : "#111110"}`,
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

// ─── Horizontal bar skill ─────────────────────────────────────────────────────
function BarSkill({ skill, index, dark }: { skill: Skill; index: number; dark: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-30px" });
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ marginBottom: 14, cursor: "default" }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {/* Skill icon */}
                    <img
                        src={skill.icon}
                        alt={skill.name}
                        style={{
                            width: 20,
                            height: 20,
                            objectFit: "contain",
                            flexShrink: 0,
                        }}
                    />
                    <span
                        style={{
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            letterSpacing: "0.01em",
                            color: dark ? "rgba(240,239,234,0.82)" : "rgba(0,0,0,0.78)",
                            transition: "color 0.35s",
                        }}
                    >
                        {skill.name}
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                        style={{
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            color: dark ? "rgba(240,239,234,0.3)" : "rgba(0,0,0,0.3)",
                        }}
                    >
                        {skill.years}yr
                    </span>
                    <motion.span
                        animate={{ color: hovered ? skill.color : dark ? "rgba(240,239,234,0.55)" : "rgba(0,0,0,0.55)" }}
                        style={{
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            minWidth: 32,
                            textAlign: "right",
                        }}
                    >
                        {skill.level}%
                    </motion.span>
                </div>
            </div>

            {/* Track */}
            <div
                style={{
                    height: 6,
                    borderRadius: 9999,
                    background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                {/* Fill */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ delay: index * 0.07 + 0.15, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        height: "100%",
                        borderRadius: 9999,
                        background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
                        boxShadow: `0 0 10px ${skill.color}55`,
                        position: "relative",
                    }}
                >
                    {/* Shimmer */}
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2, delay: index * 0.07 + 1.2, ease: "easeInOut" }}
                        style={{
                            position: "absolute",
                            top: 0, bottom: 0,
                            width: "40%",
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                            borderRadius: 9999,
                        }}
                    />
                </motion.div>
            </div>

            {/* Hover description */}
            <AnimatePresence>
                {hovered && (
                    <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 5 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.22 }}
                        style={{
                            fontSize: "0.72rem",
                            color: dark ? "rgba(240,239,234,0.38)" : "rgba(0,0,0,0.38)",
                            lineHeight: 1.5,
                            overflow: "hidden",
                        }}
                    >
                        {skill.desc}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
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
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
                <motion.button
                    key={cat}
                    onClick={() => onChange(cat)}
                    whileTap={{ scale: 0.93 }}
                    animate={{
                        background: active === cat
                            ? dark ? "#f0efea" : "#111110"
                            : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                        color: active === cat
                            ? dark ? "#111110" : "#f0efea"
                            : dark ? "rgba(240,239,234,0.55)" : "rgba(0,0,0,0.55)",
                    }}
                    transition={{ duration: 0.22 }}
                    style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        letterSpacing: "0.04em",
                        padding: "7px 16px",
                        borderRadius: 9999,
                        border: `1px solid ${dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"}`,
                        cursor: "pointer",
                        outline: "none",
                        transition: "border-color 0.2s",
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

    const filtered = activeCategory === "All"
        ? SKILLS
        : SKILLS.filter((s) => s.category === activeCategory);

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
          font-family: 'Funnel Display', sans-serif;
          min-height: 100vh;
          transition: background 0.35s;
          overflow-x: hidden;
        }

        .skills-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 36px);
        }

        .skills-orb-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.8vw, 18px);
        }

        @media (max-width: 900px) {
          .skills-two-col  { grid-template-columns: 1fr; }
          .skills-orb-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 560px) {
          .skills-orb-grid { grid-template-columns: repeat(2, 1fr); }
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

                {/* ════════════════════════════════════════════════════
            HERO BAND — floating orbs + big title
        ════════════════════════════════════════════════════ */}
                <SkillsHero
                    dark={dark}
                    bg={bg}
                    text={text}
                    muted={muted}
                    border={border}
                    chevBg={chevBg}
                />

                {/* ════════════════════════════════════════════════════
            CONTENT AREA
        ════════════════════════════════════════════════════ */}
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        padding: "clamp(40px, 6vw, 72px) clamp(16px, 5vw, 48px) clamp(64px, 10vw, 120px)",
                        position: "relative",
                        zIndex: 1,
                    }}
                >

                    {/* ── Section divider ── */}
                    <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            height: 1,
                            background: `linear-gradient(to right, ${border}, #7c6fcd66, ${border})`,
                            marginBottom: "clamp(32px, 5vw, 56px)",
                        }}
                    />

                    {/* ── Filter + Circular grid ── */}
                    <motion.div
                        ref={headingRef}
                        initial={{ opacity: 0, y: 24 }}
                        animate={headingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Label row */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: 16,
                                marginBottom: "clamp(20px, 3vw, 32px)",
                            }}
                        >
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                                    <motion.div
                                        initial={{ scaleX: 0, originX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.45 }}
                                        style={{ width: 22, height: 3, borderRadius: 99, background: "#7c6fcd" }}
                                    />
                                    <span
                                        style={{
                                            fontFamily: "'Bricolage Grotesque', sans-serif",
                                            fontSize: "0.68rem",
                                            fontWeight: 800,
                                            letterSpacing: "0.12em",
                                            color: "#7c6fcd",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        Proficiency Overview
                                    </span>
                                </div>
                                <h2
                                    style={{
                                        fontFamily: "'Bricolage Grotesque', sans-serif",
                                        fontWeight: 900,
                                        fontSize: "clamp(1.3rem, 2.8vw, 1.85rem)",
                                        letterSpacing: "-0.03em",
                                        color: text,
                                        transition: "color 0.35s",
                                    }}
                                >
                                    {filtered.length} Technologies
                                </h2>
                            </div>

                            <CategoryFilter active={activeCategory} onChange={setActiveCategory} dark={dark} />
                        </div>

                        {/* Circular skill grid */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                className="skills-orb-grid"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {filtered.map((skill, i) => (
                                    <CircularSkill key={skill.name} skill={skill} index={i} dark={dark} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* ── Divider ── */}
                    <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            height: 1,
                            background: border,
                            margin: "clamp(40px, 7vw, 72px) 0",
                        }}
                    />

                    {/* ── Two-column bar charts ── */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(24px, 4vw, 40px)" }}>
                            <motion.div
                                initial={{ scaleX: 0, originX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45 }}
                                style={{ width: 22, height: 3, borderRadius: 99, background: "#4caf7d" }}
                            />
                            <span
                                style={{
                                    fontFamily: "'Bricolage Grotesque', sans-serif",
                                    fontSize: "0.68rem",
                                    fontWeight: 800,
                                    letterSpacing: "0.12em",
                                    color: "#4caf7d",
                                    textTransform: "uppercase",
                                }}
                            >
                                Detailed Breakdown
                            </span>
                        </div>

                        <div className="skills-two-col">
                            {(["Frontend", "Backend", "Database", "Tools"] as const).map((cat, colIdx) => {
                                const catSkills = SKILLS.filter((s) => s.category === cat);
                                return (
                                    <motion.div
                                        key={cat}
                                        initial={{ opacity: 0, y: 28 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ delay: colIdx * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                        style={{
                                            background: cardBg,
                                            border: `1px solid ${border}`,
                                            borderRadius: 20,
                                            padding: "clamp(20px, 3vw, 30px)",
                                            transition: "background 0.35s, border-color 0.35s",
                                        }}
                                    >
                                        {/* Card header */}
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                                            <span
                                                style={{
                                                    fontFamily: "'Bricolage Grotesque', sans-serif",
                                                    fontWeight: 800,
                                                    fontSize: "0.9rem",
                                                    letterSpacing: "-0.015em",
                                                    color: text,
                                                    transition: "color 0.35s",
                                                }}
                                            >
                                                {cat}
                                            </span>
                                            <span
                                                style={{
                                                    fontFamily: "'Bricolage Grotesque', sans-serif",
                                                    fontSize: "0.65rem",
                                                    fontWeight: 800,
                                                    letterSpacing: "0.08em",
                                                    color: muted,
                                                    background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                                                    borderRadius: 9999,
                                                    padding: "3px 9px",
                                                }}
                                            >
                                                {catSkills.length} skills
                                            </span>
                                        </div>

                                        {catSkills.map((skill, i) => (
                                            <BarSkill key={skill.name} skill={skill} index={i} dark={dark} />
                                        ))}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Bottom marquee strip ── */}
                    <div
                        style={{
                            marginTop: "clamp(48px, 8vw, 80px)",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                height: 1,
                                background: border,
                                marginBottom: 24,
                            }}
                        />
                        <motion.div
                            animate={{ x: [0, -1200] }}
                            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                            style={{
                                display: "flex",
                                gap: 40,
                                width: "max-content",
                                alignItems: "center",
                            }}
                        >
                            {[...SKILLS, ...SKILLS].map((skill, i) => (
                                <span
                                    key={`${skill.name}-${i}`}
                                    style={{
                                        fontFamily: "'Bricolage Grotesque', sans-serif",
                                        fontWeight: 800,
                                        fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)",
                                        letterSpacing: "0.06em",
                                        textTransform: "uppercase",
                                        color: i % 3 === 0 ? skill.color : muted,
                                        whiteSpace: "nowrap",
                                        opacity: i % 3 === 0 ? 0.8 : 0.25,
                                        transition: "color 0.35s",
                                    }}
                                >
                                    {skill.name}
                                    <span style={{ margin: "0 16px", opacity: 0.2, color: text }}>×</span>
                                </span>
                            ))}
                        </motion.div>
                        <div
                            style={{
                                height: 1,
                                background: border,
                                marginTop: 24,
                            }}
                        />
                    </div>

                </div>
            </section>
        </>
    );
}