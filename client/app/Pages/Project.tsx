"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    accent: string;
    year: string;
    tech: string[];
    demoUrl: string;
    repoUrl: string;
}

// All projects use consistent 16:9 placeholder images from Unsplash (reliable, same ratio)
const PROJECTS: Project[] = [
    {
        id: 1,
        title: "TaskMaster Pro",
        category: "Fullstack SaaS",
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80&fit=crop&ar=16:9",
        accent: "#7c6fcd",
        year: "2024",
        tech: ["Next.js", "Node.js", "MongoDB"],
        demoUrl: "https://schedulo-app-theta.vercel.app/",
        repoUrl: "https://github.com/Sayam09das/TaskManagerProject",
    },
    {
        id: 2,
        title: "FinOps Suite",
        category: "Finance Management",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80&fit=crop&ar=16:9",
        accent: "#00c896",
        year: "2025",
        tech: ["Next.js", "TypeScript", "MongoDB", "Chart.js"],
        demoUrl: "https://fin-ops-suite.vercel.app/",
        repoUrl: "https://github.com/Sayam09das/FinOps-Suite",
    },
    {
        id: 3,
        title: "LiteSQL",
        category: "Database Engine",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80&fit=crop&ar=16:9",
        accent: "#4f8cff",
        year: "2025",
        tech: ["C++", "SQL", "File System"],
        demoUrl: "https://github.com/Sayam09das/LiteSQL",
        repoUrl: "https://github.com/Sayam09das/LiteSQL",
    },
    {
        id: 4,
        title: "Comparative ML Feature Selection",
        category: "ML Research",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80&fit=crop&ar=16:9",
        accent: "#00b894",
        year: "2025",
        tech: ["Python", "SVM", "Scikit-Learn", "Pandas"],
        demoUrl: "https://github.com/Sayam09das/Comparative_Analysis_of_Feature_Selection_Methods_for_Efficient_Machine_Learning",
        repoUrl: "https://github.com/Sayam09das/Comparative_Analysis_of_Feature_Selection_Methods_for_Efficient_Machine_Learning",
    },
    {
        id: 5,
        title: "Disease Predictor AI",
        category: "Machine Learning",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&fit=crop&ar=16:9",
        accent: "#4caf7d",
        year: "2024",
        tech: ["Python", "Scikit-Learn", "Streamlit"],
        demoUrl: "https://github.com/Sayam09das/Disease-Diagonistics-Model",
        repoUrl: "https://github.com/Sayam09das/Disease-Diagonistics-Model",
    },
    {
        id: 6,
        title: "AI Chat Assistant",
        category: "AI Application",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80&fit=crop&ar=16:9",
        accent: "#ff6b35",
        year: "2024",
        tech: ["Next.js", "Vercel AI", "OpenAI"],
        demoUrl: "https://chatify-online-chatting-app.vercel.app/",
        repoUrl: "https://github.com/Sayam09das/Chatify---Online-Chatting-App",
    },
    {
        id: 7,
        title: "MDAI Learning Platform",
        category: "AI Education",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80&fit=crop&ar=16:9",
        accent: "#e040fb",
        year: "2023",
        tech: ["React", "Chart.js", "TypeScript"],
        demoUrl: "https://mdai-self.vercel.app/",
        repoUrl: "https://github.com/Sayam09das/MDAI",
    },
    {
        id: 8,
        title: "Flappy Bird Clone",
        category: "Game Development",
        image: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?w=800&q=80&fit=crop&ar=16:9",
        accent: "#f5a623",
        year: "2024",
        tech: ["HTML5 Canvas", "CSS", "JavaScript"],
        demoUrl: "https://github.com/Sayam09das/Flappy-Bird",
        repoUrl: "https://github.com/Sayam09das/Flappy-Bird",
    },
    {
        id: 9,
        title: "BiasLens",
        category: "AI Fairness & Hiring Intelligence",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80&fit=crop&ar=16:9",
        accent: "#2563eb",
        year: "2026",
        tech: [
            "Next.js",
            "Node.js",
            "MongoDB",
            "Python",
            "FastAPI",
            "SHAP"
        ],
        demoUrl: "https://bias-lens-omega.vercel.app",
        repoUrl: "https://github.com/Sayam09das/BiasLens",
    },
    {
        id: 10,
        title: "Qwizy",
        category: "AI Learning Platform",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&fit=crop&ar=16:9",
        accent: "#9FA1FF",
        year: "2026",
        tech: [
            "Next.js",
            "Node.js",
            "PostgreSQL",
            "FastAPI",
            "RAG",
            "AI"
        ],
        demoUrl: "https://qwizy.vercel.app",
        repoUrl: "https://github.com/Sayam09das/Qwizy",
    },
    {
        id: 11,
        title: "OpenOn",
        category: "Enterprise Backend Platform",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&fit=crop&ar=16:9",
        accent: "#10b981",
        year: "2025",
        tech: [
            "Node.js",
            "Express",
            "MongoDB",
            "JWT",
            "Cloudinary",
            "REST API"
        ],
        demoUrl: "https://openon.vercel.app",
        repoUrl: "https://github.com/Sayam09das/OpenOn",
    },
];

// ─── Project Card (uniform, 16:9 image, Framer Motion hover) ─────────────────
function ProjectCard({
    project,
    index,
    dark,
}: {
    project: Project;
    index: number;
    dark: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const inView = useInView(cardRef, { once: true, margin: "-50px" });
    const [hovered, setHovered] = useState(false);

    // Framer Motion scroll-based parallax on image
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });
    const rawY = useTransform(scrollYProgress, [0, 1], [-18, 18]);
    const imgY = useSpring(rawY, { stiffness: 60, damping: 20 });

    // GSAP: magnetic tilt on hover
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);

            gsap.to(card, {
                rotateX: -dy * 5,
                rotateY: dx * 5,
                transformPerspective: 900,
                ease: "power2.out",
                duration: 0.4,
            });
        };

        const handleLeave = () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.6)",
            });
        };

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);
        return () => {
            card.removeEventListener("mousemove", handleMove);
            card.removeEventListener("mouseleave", handleLeave);
        };
    }, []);

    // GSAP: scroll-triggered stagger entrance (supplements Framer)
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        gsap.fromTo(
            card,
            { opacity: 0, y: 48, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: (index % 3) * 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, [index]);

    const hasSeparateDemo = project.demoUrl !== project.repoUrl;

    return (
        <div
            ref={cardRef}
            className="project-card"
            style={{ transformStyle: "preserve-3d" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* ── 16:9 Image container ── */}
            <div className="card-image-wrap">
                <motion.img
                    ref={imgRef}
                    src={project.image}
                    alt={project.title}
                    draggable={false}
                    className="card-img"
                    style={{ y: imgY }}
                />
                {/* Dark gradient overlay */}
                <div
                    className="card-gradient"
                    style={{
                        background: `linear-gradient(to top,
                            ${dark ? "rgba(8,8,6,0.97)" : "rgba(12,12,10,0.88)"} 0%,
                            ${dark ? "rgba(8,8,6,0.35)" : "rgba(12,12,10,0.28)"} 52%,
                            transparent 100%)`,
                    }}
                />
                {/* Accent hover tint */}
                <motion.div
                    className="card-tint"
                    animate={{ opacity: hovered ? 0.18 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: project.accent }}
                />
            </div>

            {/* ── Year badge ── */}
            <motion.div
                className="card-year"
                animate={{ opacity: hovered ? 1 : 0.5 }}
            >
                {project.year}
            </motion.div>

            {/* ── Action buttons (top-left on hover) ── */}
            <motion.div
                className="card-actions"
                animate={{
                    opacity: hovered ? 1 : 0,
                    y: hovered ? 0 : -8,
                }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
                {hasSeparateDemo && (
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-btn"
                        style={{ background: project.accent }}
                        title="Live demo"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Globe size={13} color="#fff" strokeWidth={2.5} />
                        <span>Demo</span>
                    </a>
                )}
                <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-btn"
                    style={{
                        background: hasSeparateDemo
                            ? "rgba(255,255,255,0.15)"
                            : project.accent,
                    }}
                    title="GitHub repo"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Github size={13} color="#fff" strokeWidth={2.5} />
                    <span>Code</span>
                </a>
            </motion.div>

            {/* ── Bottom info ── */}
            <div className="card-body">
                {/* Tech tags */}
                <motion.div
                    className="card-tags"
                    animate={{
                        opacity: hovered ? 1 : 0,
                        y: hovered ? 0 : 10,
                    }}
                    transition={{ duration: 0.28 }}
                >
                    {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="tag">
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="tag tag-more">
                            +{project.tech.length - 3}
                        </span>
                    )}
                </motion.div>

                <p
                    className="card-category"
                    style={{ color: project.accent }}
                >
                    {project.category}
                </p>

                <div className="card-title-row">
                    <h3 className="card-title">{project.title}</h3>
                    <motion.div
                        className="card-arrow"
                        animate={{
                            opacity: hovered ? 1 : 0,
                            x: hovered ? 0 : -6,
                        }}
                        transition={{ duration: 0.25 }}
                        style={{ color: project.accent }}
                    >
                        <ArrowUpRight size={18} strokeWidth={2.5} />
                    </motion.div>
                </div>

                {/* Accent underline */}
                <motion.div
                    className="card-underline"
                    animate={{ scaleX: hovered ? 1 : 0 }}
                    initial={{ scaleX: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    style={{ background: project.accent }}
                />
            </div>
        </div>
    );
}

// ─── Section heading with GSAP + Framer ──────────────────────────────────────
function SectionHeading({ dark }: { dark: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const leftLineRef = useRef<HTMLDivElement>(null);
    const rightLineRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);

    // GSAP: animate the divider lines
    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });
        tl.fromTo(
            leftLineRef.current,
            { scaleX: 0, transformOrigin: "right center" },
            { scaleX: 1, duration: 0.9, ease: "power3.out" }
        ).fromTo(
            rightLineRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.9, ease: "power3.out" },
            "<"
        );
    }, []);

    return (
        <motion.div
            ref={ref}
            className="section-heading"
            style={{ y, opacity }}
        >
            <div
                ref={leftLineRef}
                className="heading-line"
                style={{
                    background: dark
                        ? "rgba(255,255,255,0.12)"
                        : "rgba(0,0,0,0.15)",
                }}
            />
            <h2
                className="heading-text"
                style={{ color: dark ? "#f0efea" : "#111110" }}
            >
                Projects
            </h2>
            <div
                ref={rightLineRef}
                className="heading-line"
                style={{
                    background: dark
                        ? "rgba(255,255,255,0.12)"
                        : "rgba(0,0,0,0.15)",
                }}
            />
        </motion.div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Projects() {
    const { theme } = useTheme();
    const dark = theme === "dark";

    const bg = dark ? "#0d0d0c" : "#ececea";
    const cardBg = dark ? "#161614" : "#e2e1de";
    const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Section ── */
        #projects {
          width: 100%;
          padding: clamp(56px, 9vw, 108px) 0 clamp(72px, 11vw, 130px);
          background: ${bg};
          transition: background 0.35s;
          position: relative;
          overflow: hidden;
        }

        /* Grid texture */
        #projects::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(${dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.035)"} 1px, transparent 1px),
            linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.035)"} 1px, transparent 1px);
          background-size: 72px 72px;
          pointer-events: none;
          z-index: 0;
        }

        .projects-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 clamp(16px, 5vw, 52px);
          position: relative;
          z-index: 1;
        }

        /* ── Section heading ── */
        .section-heading {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: clamp(32px, 5vw, 56px);
        }
        .heading-line {
          flex: 1;
          height: 1px;
        }
        .heading-text {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 900;
          font-size: clamp(2.4rem, 6vw, 4.4rem);
          letter-spacing: -0.04em;
          line-height: 1;
          white-space: nowrap;
          flex-shrink: 0;
          transition: color 0.35s;
        }

        /* ── Grid: uniform 3-col ── */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(14px, 2vw, 22px);
        }

        /* ── Card: uniform, NO span overrides ── */
        .project-card {
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          background: ${cardBg};
          border: 1px solid ${cardBorder};
          transition:
            box-shadow 0.35s,
            border-color 0.35s,
            transform 0.15s;
          display: flex;
          flex-direction: column;
          will-change: transform;
        }

        /* ── 16:9 image section (always identical ratio) ── */
        .card-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          flex-shrink: 0;
        }
        .card-img {
          width: 100%;
          height: 120%;
          object-fit: cover;
          display: block;
          position: absolute;
          top: -10%;
          left: 0;
          user-select: none;
          filter: ${dark ? "brightness(0.75) saturate(0.88)" : "brightness(0.88) saturate(0.92)"};
          transition: filter 0.35s;
        }
        .card-gradient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .card-tint {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }

        /* ── Year badge (top-right inside image) ── */
        .card-year {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          border-radius: 9999px;
          padding: 3px 10px;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          color: rgba(255,255,255,0.72);
        }

        /* ── Action buttons (top-left inside image) ── */
        .card-actions {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 10;
          display: flex;
          gap: 6px;
        }
        .card-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px 4px 8px;
          border-radius: 9999px;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #fff;
          text-decoration: none;
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.18);
          transition: opacity 0.2s, transform 0.2s;
        }
        .card-btn:hover {
          opacity: 0.85;
          transform: scale(0.97);
        }

        /* ── Card body (below image) ── */
        .card-body {
          padding: clamp(14px, 2.5vw, 20px);
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          background: ${cardBg};
          transition: background 0.35s;
        }

        /* ── Tech tags ── */
        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 4px;
        }
        .tag {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: ${dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)"};
          background: ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"};
          border: 1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
          border-radius: 9999px;
          padding: 2px 8px;
        }
        .tag-more {
          opacity: 0.65;
        }

        /* ── Category ── */
        .card-category {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        /* ── Title row ── */
        .card-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }
        .card-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(0.92rem, 1.6vw, 1.15rem);
          letter-spacing: -0.022em;
          color: ${dark ? "#f0efea" : "#111110"};
          line-height: 1.25;
          transition: color 0.35s;
          flex: 1;
        }
        .card-arrow {
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* ── Accent underline ── */
        .card-underline {
          height: 2px;
          border-radius: 9999px;
          transform-origin: left center;
          margin-top: 6px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 540px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .card-title {
            font-size: 1rem;
          }
          .heading-text {
            font-size: clamp(2rem, 8vw, 2.8rem);
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .project-card,
          .card-img,
          .card-btn {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

            <section id="projects" aria-label="Projects">
                <div className="projects-inner">
                    <SectionHeading dark={dark} />

                    <div className="projects-grid">
                        {PROJECTS.map((project, i) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={i}
                                dark={dark}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}