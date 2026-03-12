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
import { ArrowUpRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    accent: string;
    span: "tall" | "wide" | "normal";
    year: string;
    tech: string[];
}

const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Task Manager App",
        category: "Web Application",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=900&q=85",
        accent: "#7c6fcd",
        span: "tall",
        year: "2025",
        tech: ["React", "Node.js", "MongoDB"],
    },
    {
        id: 2,
        title: "Disease Prediction Model",
        category: "Machine Learning",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=85",
        accent: "#4caf7d",
        span: "normal",
        year: "2025",
        tech: ["Python", "Machine Learning", "Scikit-Learn"],
    },
    {
        id: 3,
        title: "MDAI Learning Platform",
        category: "AI Education Tool",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=85",
        accent: "#ff6b35",
        span: "normal",
        year: "2026",
        tech: ["Python", "Jupyter", "Machine Learning"],
    },
    {
        id: 4,
        title: "Portfolio Website",
        category: "Developer Portfolio",
        image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=900&q=85",
        accent: "#5b9fd4",
        span: "wide",
        year: "2026",
        tech: ["Next.js", "React", "Framer Motion"],
    },
    {
        id: 5,
        title: "Finance Tracker",
        category: "Web Application",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85",
        accent: "#e040fb",
        span: "normal",
        year: "2026",
        tech: ["React", "JavaScript", "Chart.js", "Local Storage"],
    },
    {
        id: 6,
        title: "Data Analysis Dashboard",
        category: "Data Visualization",
        image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=900&q=85",
        accent: "#f5a623",
        span: "normal",
        year: "2024",
        tech: ["Python", "Pandas", "Matplotlib"],
    },
];

// ─── Animated card ────────────────────────────────────────────────────────────
function ProjectCard({
    project,
    index,
    dark,
}: {
    project: Project;
    index: number;
    dark: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const [hovered, setHovered] = useState(false);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const rawY = useTransform(scrollYProgress, [0, 1], [-14, 14]);
    const imgY = useSpring(rawY, { stiffness: 55, damping: 18 });

    // Grid span classes handled inline
    const isTall = project.span === "tall";
    const isWide = project.span === "wide";

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                delay: (index % 3) * 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                gridColumn: isWide ? "span 2" : "span 1",
                gridRow: isTall ? "span 2" : "span 1",
                borderRadius: 18,
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                background: dark ? "#1a1a18" : "#e0dfdc",
                border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
                boxShadow: hovered
                    ? `0 20px 60px rgba(0,0,0,${dark ? 0.5 : 0.18}), 0 0 0 1px ${project.accent}44`
                    : `0 4px 16px rgba(0,0,0,${dark ? 0.3 : 0.08})`,
                transition: "box-shadow 0.35s, border-color 0.35s",
                minHeight: isTall ? 480 : 240,
            }}
        >
            {/* Image with parallax */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                }}
            >
                <motion.img
                    src={project.image}
                    alt={project.title}
                    draggable={false}
                    style={{
                        width: "100%",
                        height: "115%",
                        objectFit: "cover",
                        display: "block",
                        position: "absolute",
                        top: "-7.5%",
                        left: 0,
                        y: imgY,
                        filter: dark ? "brightness(0.72) saturate(0.9)" : "brightness(0.88) saturate(0.95)",
                        transition: "filter 0.35s",
                        userSelect: "none",
                    }}
                />

                {/* Gradient overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(to top,
              ${dark ? "rgba(10,10,8,0.92)" : "rgba(15,15,12,0.82)"} 0%,
              ${dark ? "rgba(10,10,8,0.35)" : "rgba(15,15,12,0.22)"} 55%,
              transparent 100%)`,
                    }}
                />
            </div>

            {/* Hover accent overlay */}
            <motion.div
                animate={{ opacity: hovered ? 0.14 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: "absolute",
                    inset: 0,
                    background: project.accent,
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            />

            {/* Top-right: year badge */}
            <motion.div
                animate={{ opacity: hovered ? 1 : 0.55 }}
                style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    zIndex: 3,
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 9999,
                    padding: "4px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                }}
            >
                <span
                    style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.7)",
                        letterSpacing: "0.06em",
                    }}
                >
                    {project.year}
                </span>
            </motion.div>

            {/* Arrow icon */}
            <motion.div
                animate={{
                    opacity: hovered ? 1 : 0,
                    scale: hovered ? 1 : 0.7,
                    rotate: hovered ? 0 : -20,
                }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    zIndex: 3,
                    width: 36, height: 36,
                    borderRadius: "50%",
                    background: project.accent,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 4px 14px ${project.accent}66`,
                }}
            >
                <ArrowUpRight size={16} color="#fff" strokeWidth={2.5} />
            </motion.div>

            {/* Bottom info */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    zIndex: 3,
                    padding: "clamp(16px, 3vw, 24px)",
                }}
            >
                {/* Tech tags */}
                <motion.div
                    animate={{
                        opacity: hovered ? 1 : 0,
                        y: hovered ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        marginBottom: 10,
                    }}
                >
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            style={{
                                fontFamily: "'Bricolage Grotesque', sans-serif",
                                fontSize: "0.65rem",
                                fontWeight: 700,
                                letterSpacing: "0.06em",
                                color: "rgba(255,255,255,0.65)",
                                background: "rgba(255,255,255,0.1)",
                                backdropFilter: "blur(6px)",
                                borderRadius: 9999,
                                padding: "3px 8px",
                                border: "1px solid rgba(255,255,255,0.12)",
                            }}
                        >
                            {t}
                        </span>
                    ))}
                </motion.div>

                <p
                    style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: project.accent,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                    }}
                >
                    {project.category}
                </p>

                <h3
                    style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(1rem, 2vw, 1.3rem)",
                        letterSpacing: "-0.022em",
                        color: "#fff",
                        lineHeight: 1.2,
                    }}
                >
                    {project.title}
                </h3>

                {/* Accent bar */}
                <motion.div
                    animate={{ scaleX: hovered ? 1 : 0 }}
                    initial={{ scaleX: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        marginTop: 10,
                        height: 2,
                        borderRadius: 9999,
                        background: project.accent,
                        originX: 0,
                    }}
                />
            </div>
        </motion.div>
    );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ dark }: { dark: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
    const y = useTransform(scrollYProgress, [0, 1], [32, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

    const border = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)";
    const text = dark ? "#f0efea" : "#111110";

    return (
        <motion.div
            ref={ref}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginBottom: "clamp(28px, 5vw, 52px)",
                y,
                opacity,
            }}
        >
            <div style={{ flex: 1, height: 1, background: border }} />
            <h2
                style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
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
                Projects
            </h2>
            <div style={{ flex: 1, height: 1, background: border }} />
        </motion.div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Projects() {

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

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          background: ${bg};
          font-family: 'Funnel Display', sans-serif;
          min-height: 100vh;
          transition: background 0.35s;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 2vw, 20px);
        }

        @media (max-width: 960px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          /* Reset wide spans on medium screens */
          .projects-grid > *[style*="span 2"] {
            grid-column: span 1 !important;
          }
        }

        @media (max-width: 580px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .projects-grid > * {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            min-height: 260px !important;
          }
        }
      `}</style>

            <section
                id="projects"
                aria-label="Projects"
                style={{
                    width: "100%",
                    padding: "clamp(48px, 8vw, 96px) 0 clamp(64px, 10vw, 120px)",
                    background: bg,
                    transition: "background 0.35s",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Subtle grid texture */}
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `
              linear-gradient(${dark ? "rgba(255,255,255,0.022)" : "rgba(0,0,0,0.038)"} 1px, transparent 1px),
              linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.022)" : "rgba(0,0,0,0.038)"} 1px, transparent 1px)
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
                    <SectionHeading dark={dark} />

                    {/* Grid */}
                    <div className="projects-grid">
                        {PROJECTS.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} dark={dark} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}