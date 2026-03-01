"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    motion,
    AnimatePresence,
    useInView,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Service {
    title: string;
    description: string;
    features: string[];
    tags: string[];
    imageUrl: string;
    imageAlt: string;
    accentColor: string;
}

interface TechLogo {
    name: string;
    bg: string;
    color: string;
    label: string;
    shape: "hex" | "circle" | "rounded";
}

// ─── Lenis Hook ───────────────────────────────────────────────────────────────
function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.25,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        } as any);

        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES: Service[] = [
    {
        title: "API Development & Integration",
        description:
            "Designing and implementing secure, scalable APIs to connect applications seamlessly.",
        features: [
            "RESTful & GraphQL API development",
            "Third-party service integrations",
            "Authentication & authorization systems",
            "Optimized data transfer for performance",
        ],
        tags: ["#API", "#DOT", "#Node.JS"],
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        imageAlt: "API Development",
        accentColor: "#7c6fcd",
    },
    {
        title: "Database Architecture",
        description:
            "Building robust, high-performance database solutions tailored to complex data requirements.",
        features: [
            "Relational & NoSQL database design",
            "Query optimization & indexing",
            "Data migration & versioning",
            "Replication & high-availability setups",
        ],
        tags: ["#PostgreSQL", "#MongoDB", "#Redis"],
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        imageAlt: "Database Architecture",
        accentColor: "#5b9e7f",
    },
    {
        title: "Cloud Infrastructure",
        description:
            "Architecting and deploying scalable cloud environments to power modern applications.",
        features: [
            "AWS / GCP / Azure deployments",
            "Container orchestration with Docker & K8s",
            "CI/CD pipeline configuration",
            "Infrastructure as code with Terraform",
        ],
        tags: ["#AWS", "#Docker", "#Terraform"],
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
        imageAlt: "Cloud Infrastructure",
        accentColor: "#d97c4a",
    },
    {
        title: "Performance Optimization",
        description:
            "Profiling and refining backend systems to achieve peak throughput and low latency.",
        features: [
            "Load testing & bottleneck analysis",
            "Caching strategies (Redis, Memcached)",
            "Async processing & message queues",
            "Microservices decomposition",
        ],
        tags: ["#Performance", "#Redis", "#RabbitMQ"],
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
        imageAlt: "Performance Optimization",
        accentColor: "#c45f87",
    },
];

const TECH_LOGOS: TechLogo[] = [
    { name: "C#", bg: "#7c3fa8", color: "#fff", label: "C#", shape: "hex" },
    { name: "Node", bg: "#0f0f0f", color: "#73b55a", label: "node", shape: "circle" },
    { name: "VS", bg: "#8661c5", color: "#fff", label: "VS", shape: "rounded" },
    { name: "Figma", bg: "#1a1a1a", color: "#f24e1e", label: "Fig", shape: "rounded" },
    { name: ".NET", bg: "#6b3fcb", color: "#fff", label: ".NET", shape: "circle" },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const featureVariants = {
    hidden: { opacity: 0, x: -16 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

const slideVariants = {
    enter: (dir: number) => ({
        x: dir > 0 ? 120 : -120,
        opacity: 0,
        scale: 0.97,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: (dir: number) => ({
        x: dir > 0 ? -120 : 120,
        opacity: 0,
        scale: 0.97,
        transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

// ─── Tech Badge ───────────────────────────────────────────────────────────────
function TechBadge({ logo, index }: { logo: TechLogo; index: number }) {
    const borderRadius =
        logo.shape === "hex"
            ? "28% 8% 28% 8% / 8% 28% 8% 28%"
            : logo.shape === "circle"
                ? "50%"
                : "20px";

    return (
        <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 32, scale: 0.82 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                delay: 0.06 * index,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as const,
            }}
        >
            <motion.div
                style={{
                    width: "clamp(68px, 10vw, 92px)",
                    height: "clamp(68px, 10vw, 92px)",
                    borderRadius,
                    background: logo.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 28px rgba(0,0,0,0.22)",
                    cursor: "default",
                    flexShrink: 0,
                }}
                whileHover={{ scale: 1.1, rotate: 4, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
            >
                <span
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 900,
                        fontSize: logo.label.length > 3 ? "0.75rem" : "1.05rem",
                        color: logo.color,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                        userSelect: "none",
                    }}
                >
                    {logo.label}
                </span>
            </motion.div>
        </motion.div>
    );
}

// ─── Parallax Image ───────────────────────────────────────────────────────────
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const rawY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
    const y = useSpring(rawY, { stiffness: 60, damping: 20 });

    return (
        <div
            ref={ref}
            style={{
                borderRadius: 18,
                overflow: "hidden",
                aspectRatio: "4/3",
                background: "#ccc",
                position: "relative",
                willChange: "transform",
            }}
        >
            <motion.img
                src={src}
                alt={alt}
                draggable={false}
                style={{
                    width: "100%",
                    height: "110%",
                    objectFit: "cover",
                    display: "block",
                    filter: "grayscale(100%) contrast(1.07)",
                    y,
                    position: "absolute",
                    top: "-5%",
                    left: 0,
                    userSelect: "none",
                }}
            />
        </div>
    );
}

// ─── Service Slide ────────────────────────────────────────────────────────────
function ServiceSlide({ service, dark }: { service: Service; dark: boolean }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "clamp(24px, 4vw, 48px)",
            }}
            className="service-slide-grid"
        >
            <style>{`
        @media (min-width: 768px) {
          .service-slide-grid {
            grid-template-columns: 1fr 1fr !important;
            align-items: start;
          }
        }
      `}</style>

            {/* Left: text */}
            <motion.div
                style={{ display: "flex", flexDirection: "column", gap: 0 }}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] as const }}
            >
                {/* Accent bar */}
                <motion.div
                    style={{
                        width: 32, height: 3,
                        borderRadius: 99,
                        background: service.accentColor,
                        marginBottom: 16,
                    }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
                />

                <h3
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(1.2rem, 2.6vw, 1.75rem)",
                        letterSpacing: "-0.025em",
                        color: dark ? "#f0efea" : "#111110",
                        lineHeight: 1.2,
                        marginBottom: 18,
                    }}
                >
                    {service.title}
                </h3>

                <p
                    style={{
                        fontSize: "clamp(0.82rem, 1.4vw, 0.9rem)",
                        color: dark ? "rgba(240,239,234,0.52)" : "rgba(0,0,0,0.52)",
                        lineHeight: 1.72,
                        marginBottom: 6,
                    }}
                >
                    {service.description}
                </p>

                <p
                    style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: dark ? "rgba(240,239,234,0.38)" : "rgba(0,0,0,0.38)",
                        marginBottom: 14,
                        fontFamily: "'Syne', sans-serif",
                    }}
                >
                    Features:
                </p>

                <motion.ul
                    style={{
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        marginBottom: 32,
                    }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {service.features.map((f) => (
                        <motion.li
                            key={f}
                            variants={featureVariants}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 10,
                                fontSize: "clamp(0.8rem, 1.3vw, 0.875rem)",
                                color: dark ? "rgba(240,239,234,0.5)" : "rgba(0,0,0,0.52)",
                                lineHeight: 1.55,
                            }}
                        >
                            <span
                                aria-hidden="true"
                                style={{
                                    marginTop: 6,
                                    width: 5, height: 5,
                                    borderRadius: "50%",
                                    background: dark ? "rgba(240,239,234,0.3)" : "rgba(0,0,0,0.28)",
                                    flexShrink: 0,
                                }}
                            />
                            {f}
                        </motion.li>
                    ))}
                </motion.ul>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {service.tags.map((tag) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                                style={{
                                fontFamily: "'Syne', sans-serif",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                letterSpacing: "0.04em",
                                color: dark ? "rgba(240,239,234,0.36)" : "rgba(0,0,0,0.38)",
                                padding: "4px 10px",
                                borderRadius: 9999,
                                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}`,
                            }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            {/* Right: image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 28 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] as const }}
                style={{ width: "100%" }}
            >
                <ParallaxImage src={service.imageUrl} alt={service.imageAlt} />
            </motion.div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Services() {
    useLenis();
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

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

    // Subtle section entrance parallax
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"],
    });
    const headerY = useTransform(scrollYProgress, [0, 1], [40, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    const prev = () => {
        setDirection(-1);
        setCurrent((c) => (c - 1 + SERVICES.length) % SERVICES.length);
    };
    const next = () => {
        setDirection(1);
        setCurrent((c) => (c + 1) % SERVICES.length);
    };

    const bg = dark ? "#0d0d0c" : "#ebebeb";
    const cardBg = dark ? "#141412" : "#ffffff";
    const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";
    const textMain = dark ? "#f0efea" : "#111110";
    const textMuted = dark ? "rgba(240,239,234,0.42)" : "rgba(0,0,0,0.35)";
    const chevBg = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
    const chevHover = dark ? "rgba(255,255,255,0.13)" : "rgba(0,0,0,0.13)";

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .chev-triple button:hover {
          background: ${chevHover} !important;
          color: ${textMain} !important;
        }

        .cta-btn:hover { opacity: 0.84; transform: translateY(-2px); }
        .cta-btn { transition: opacity 0.18s, transform 0.18s; }

        @media (max-width: 520px) {
          .tech-strip { gap: 12px !important; }
          .nav-row-services { padding: 0 !important; }
        }
      `}</style>

            <section
                ref={sectionRef}
                id="services"
                aria-label="Services"
                style={{
                    width: "100%",
                    padding: "clamp(48px, 8vw, 96px) 0 clamp(56px, 9vw, 112px)",
                    background: bg,
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "background 0.35s",
                    position: "relative",
                }}
            >

                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        padding: "0 clamp(16px, 5vw, 48px)",
                        position: "relative",
                        zIndex: 1,
                    }}
                >

                    {/* ── Section heading ── */}
                    <motion.div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 20,
                            marginBottom: "clamp(24px, 4vw, 48px)",
                            y: headerY,
                            opacity: headerOpacity,
                            position: "relative",
                        }}
                    >
                        <div style={{ flex: 1, height: 1, background: border }} aria-hidden="true" />
                        <h2
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 900,
                                fontSize: "clamp(2rem, 5.5vw, 4rem)",
                                letterSpacing: "-0.038em",
                                color: textMain,
                                lineHeight: 1,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                                transition: "color 0.35s",
                            }}
                        >
                            Services
                        </h2>
                        <div style={{ flex: 1, height: 1, background: border }} aria-hidden="true" />
                    </motion.div>

                    {/* ── Nav row ── */}
                    <motion.div
                        className="nav-row-services"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "clamp(20px, 3vw, 32px)",
                        }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.22, duration: 0.5 }}
                    >
                        {/* Left chevrons */}
                        <div className="chev-triple" style={{ display: "flex", gap: 3 }}>
                            {[0, 1, 2].map((i) => (
                                <motion.button
                                    key={i}
                                    onClick={prev}
                                    aria-label="Previous service"
                                    whileTap={{ scale: 0.82 }}
                                    style={{
                                        width: 30, height: 30,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        borderRadius: 8,
                                        background: chevBg,
                                        border: `1px solid ${border}`,
                                        color: textMuted,
                                        cursor: "pointer",
                                        outline: "none",
                                        transition: "background 0.15s, color 0.15s",
                                    }}
                                >
                                    <ChevronLeft size={13} strokeWidth={2.5} aria-hidden="true" />
                                </motion.button>
                            ))}
                        </div>

                        {/* Progress dots */}
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            {SERVICES.map((_, i) => (
                                <motion.button
                                    key={i}
                                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                                    aria-label={`Service ${i + 1}`}
                                    animate={{
                                        width: i === current ? 22 : 7,
                                        background: i === current ? textMain : textMuted,
                                    }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                                    style={{
                                        height: 7,
                                        borderRadius: 9999,
                                        border: "none",
                                        cursor: "pointer",
                                        outline: "none",
                                        padding: 0,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Right chevrons */}
                        <div className="chev-triple" style={{ display: "flex", gap: 3 }}>
                            {[0, 1, 2].map((i) => (
                                <motion.button
                                    key={i}
                                    onClick={next}
                                    aria-label="Next service"
                                    whileTap={{ scale: 0.82 }}
                                    style={{
                                        width: 30, height: 30,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        borderRadius: 8,
                                        background: chevBg,
                                        border: `1px solid ${border}`,
                                        color: textMuted,
                                        cursor: "pointer",
                                        outline: "none",
                                        transition: "background 0.15s, color 0.15s",
                                    }}
                                >
                                    <ChevronRight size={13} strokeWidth={2.5} aria-hidden="true" />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.28, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                        style={{
                            background: cardBg,
                            border: `1px solid ${border}`,
                            borderRadius: 22,
                            padding: "clamp(24px, 4vw, 44px)",
                            overflow: "hidden",
                            minHeight: 360,
                            position: "relative",
                            transition: "background 0.35s, border-color 0.35s",
                        }}
                    >
                        {/* Accent glow blob */}
                        <motion.div
                            key={current + "-blob"}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 0.12, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.9 }}
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                top: -80, right: -80,
                                width: 360, height: 360,
                                borderRadius: "50%",
                                background: SERVICES[current].accentColor,
                                filter: "blur(80px)",
                                pointerEvents: "none",
                                zIndex: 0,
                            }}
                        />

                        <div style={{ position: "relative", zIndex: 1 }}>
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={current}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                >
                                    <ServiceSlide service={SERVICES[current]} dark={dark} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* ── Divider ── */}
                    <motion.div
                        style={{
                            width: "100%",
                            height: 1,
                            background: border,
                            margin: "clamp(40px, 7vw, 72px) 0",
                        }}
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
                        aria-hidden="true"
                    />

                    {/* ── Tech logos ── */}
                    <div
                        className="tech-strip"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: "clamp(16px, 5vw, 52px)",
                        }}
                    >
                        {TECH_LOGOS.map((logo, i) => (
                            <TechBadge key={logo.name} logo={logo} index={i} />
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
}