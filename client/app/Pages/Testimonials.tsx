"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    AnimatePresence,
} from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { Quote, Star, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

// ─── Lenis ───────────────────────────────────────────────────────────────────
function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.3,
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
interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    avatar: string;
    rating: number;
    text: string;
    accent: string;
    project: string;
    date: string;
    flag: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Mitchell",
        role: "CTO",
        company: "TechVenture Co.",
        avatar: "https://i.pravatar.cc/150?img=47",
        rating: 5,
        text: "Amirreza completely transformed our backend infrastructure. He architected a microservices system that handles 2 million daily requests with zero downtime. His attention to performance optimization is extraordinary — our API latency dropped by 60% in just two sprints.",
        accent: "#7c6fcd",
        project: "Microservices Architecture",
        date: "Dec 2024",
        flag: "🇺🇸",
    },
    {
        id: 2,
        name: "David Fernández",
        role: "Lead Engineer",
        company: "Scaleway Systems",
        avatar: "https://i.pravatar.cc/150?img=12",
        rating: 5,
        text: "Working with Amirreza on our database layer was a revelation. He designed a PostgreSQL schema that scaled from 50k to 5 million records without breaking a sweat. His deep knowledge of indexing strategies and query optimization saved us months of headaches.",
        accent: "#4caf7d",
        project: "Database Scaling",
        date: "Sep 2024",
        flag: "🇪🇸",
    },
    {
        id: 3,
        name: "Yuki Tanaka",
        role: "Product Manager",
        company: "Nexus Digital",
        avatar: "https://i.pravatar.cc/150?img=32",
        rating: 5,
        text: "From API design to Docker deployment, Amirreza handled every layer of our backend with precision. He communicates complex technical decisions clearly to non-technical stakeholders, which made the whole project flow smoothly. Genuinely one of the best engineers I've worked with.",
        accent: "#f5a623",
        project: "Full-Stack API Platform",
        date: "Jul 2024",
        flag: "🇯🇵",
    },
    {
        id: 4,
        name: "Priya Sharma",
        role: "Founder & CEO",
        company: "DataBridge Inc.",
        avatar: "https://i.pravatar.cc/150?img=45",
        rating: 5,
        text: "We brought Amirreza in to rescue a failing Node.js API project. Within three weeks he had refactored the codebase, introduced proper error handling, and set up CI/CD pipelines. The system went from 40% uptime to 99.9%. I cannot recommend him highly enough.",
        accent: "#e040fb",
        project: "API Rescue & Refactor",
        date: "Apr 2024",
        flag: "🇮🇳",
    },
    {
        id: 5,
        name: "Marcus Johansson",
        role: "Engineering Director",
        company: "CloudPeak AB",
        avatar: "https://i.pravatar.cc/150?img=53",
        rating: 5,
        text: "Amirreza's expertise in AWS and Kubernetes was exactly what our team needed. He set up our entire cloud infrastructure from scratch — VPCs, EKS clusters, RDS instances — all automated with Terraform. His documentation is impeccable and the handoff was seamless.",
        accent: "#2496ed",
        project: "Cloud Infrastructure",
        date: "Feb 2024",
        flag: "🇸🇪",
    },
    {
        id: 6,
        name: "Laila Hassan",
        role: "Backend Team Lead",
        company: "Finova Labs",
        avatar: "https://i.pravatar.cc/150?img=23",
        rating: 5,
        text: "Amirreza joined our fintech team and immediately made an impact. His implementation of Redis caching reduced our database load by 70%, and his GraphQL schema design set the standard for how we build APIs now. A true craftsman who takes immense pride in his work.",
        accent: "#d82c20",
        project: "Fintech Backend",
        date: "Nov 2023",
        flag: "🇦🇪",
    },
];

const STATS = [
    { value: "38+", label: "Projects Delivered" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "4.9", label: "Average Rating" },
    { value: "6", label: "Countries" },
];

// ─── Magnetic hook ────────────────────────────────────────────────────────────
function useMagnetic(strength = 0.3) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 180, damping: 18 });
    const springY = useSpring(y, { stiffness: 180, damping: 18 });

    const onMove = useCallback((e: MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * strength);
        y.set((e.clientY - cy) * strength);
    }, [strength, x, y]);

    const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

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

// ─── 3D Tilt card hook ────────────────────────────────────────────────────────
function useTilt(strength = 12) {
    const ref = useRef<HTMLDivElement>(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springRX = useSpring(rotateX, { stiffness: 200, damping: 22 });
    const springRY = useSpring(rotateY, { stiffness: 200, damping: 22 });

    const onMove = useCallback((e: MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        rotateX.set(-y * strength);
        rotateY.set(x * strength);
    }, [strength, rotateX, rotateY]);

    const onLeave = useCallback(() => { rotateX.set(0); rotateY.set(0); }, [rotateX, rotateY]);

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

    return { ref, springRX, springRY };
}

// ─── Star rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, color, inView, delay = 0 }: { rating: number; color: string; inView: boolean; delay?: number }) {
    return (
        <div style={{ display: "flex", gap: 3 }}>
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -30 }}
                    animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ delay: delay + i * 0.07, duration: 0.4, type: "spring", stiffness: 300, damping: 15 }}
                >
                    <Star
                        size={13}
                        fill={i < rating ? color : "transparent"}
                        color={i < rating ? color : "rgba(128,128,128,0.3)"}
                        strokeWidth={2}
                    />
                </motion.div>
            ))}
        </div>
    );
}

// ─── Featured card (large, spotlight) ────────────────────────────────────────
function FeaturedCard({ t, dark }: { t: Testimonial; dark: boolean }) {
    const { ref: tiltRef, springRX, springRY } = useTilt(8);
    const cardRef = useRef<HTMLDivElement>(null);
    const inView = useInView(cardRef, { once: true, margin: "-60px" });
    const [hovered, setHovered] = useState(false);

    const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)";
    const cardBg = dark ? "#161614" : "#ffffff";
    const text = dark ? "#f0efea" : "#111110";
    const muted = dark ? "rgba(240,239,234,0.44)" : "rgba(0,0,0,0.44)";

    return (
        <div ref={cardRef} style={{ perspective: 1200 }}>
            <motion.div
                ref={(el) => { (tiltRef as any).current = el; }}
                initial={{ opacity: 0, y: 48, scale: 0.94 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    rotateX: springRX,
                    rotateY: springRY,
                    transformStyle: "preserve-3d",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <motion.div
                    animate={{
                        boxShadow: hovered
                            ? `0 32px 80px rgba(0,0,0,${dark ? 0.5 : 0.16}), 0 0 0 1px ${t.accent}55`
                            : `0 8px 32px rgba(0,0,0,${dark ? 0.28 : 0.08})`,
                        borderColor: hovered ? t.accent + "55" : border,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: cardBg,
                        border: "1px solid transparent",
                        borderRadius: 24,
                        padding: "clamp(28px, 4vw, 44px)",
                        position: "relative",
                        overflow: "hidden",
                        transition: "background 0.35s",
                    }}
                >
                    {/* Glow blob */}
                    <motion.div
                        animate={{ opacity: hovered ? 0.12 : 0.04 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: "absolute", top: -100, right: -100,
                            width: 400, height: 400,
                            borderRadius: "50%",
                            background: t.accent,
                            filter: "blur(80px)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* Accent corner strip */}
                    <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        style={{
                            position: "absolute",
                            top: 0, left: 0, right: 0,
                            height: 3,
                            background: `linear-gradient(to right, ${t.accent}, ${t.accent}44, transparent)`,
                            borderRadius: "24px 24px 0 0",
                        }}
                    />

                    <div style={{ position: "relative", zIndex: 1 }}>
                        {/* Top row */}
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 24 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                {/* Avatar */}
                                <motion.div
                                    whileHover={{ scale: 1.08 }}
                                    style={{
                                        width: 52, height: 52, borderRadius: "50%",
                                        overflow: "hidden", flexShrink: 0,
                                        border: `2px solid ${t.accent}55`,
                                        boxShadow: `0 0 0 4px ${t.accent}18`,
                                    }}
                                >
                                    <img src={t.avatar} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </motion.div>

                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                                        <span
                                            style={{
                                                fontFamily: "'Syne', sans-serif",
                                                fontWeight: 800,
                                                fontSize: "1rem",
                                                letterSpacing: "-0.018em",
                                                color: text,
                                                transition: "color 0.35s",
                                            }}
                                        >
                                            {t.name}
                                        </span>
                                        <span style={{ fontSize: "0.9rem" }}>{t.flag}</span>
                                    </div>
                                    <p style={{ fontSize: "0.78rem", color: muted, fontWeight: 500 }}>
                                        {t.role} · <span style={{ color: t.accent }}>{t.company}</span>
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                                <StarRating rating={t.rating} color={t.accent} inView={inView} delay={0.4} />
                                <span
                                    style={{
                                        fontFamily: "'Syne', sans-serif",
                                        fontSize: "0.65rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.06em",
                                        color: muted,
                                    }}
                                >
                                    {t.date}
                                </span>
                            </div>
                        </div>

                        {/* Quote icon */}
                        <motion.div
                            animate={{ color: hovered ? t.accent : dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
                            transition={{ duration: 0.3 }}
                            style={{ marginBottom: 14 }}
                        >
                            <Quote size={28} strokeWidth={1.5} />
                        </motion.div>

                        {/* Text */}
                        <p
                            style={{
                                fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
                                color: dark ? "rgba(240,239,234,0.7)" : "rgba(0,0,0,0.68)",
                                lineHeight: 1.78,
                                marginBottom: 22,
                                fontStyle: "italic",
                            }}
                        >
                            "{t.text}"
                        </p>

                        {/* Project badge */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <motion.div
                                whileHover={{ scale: 1.08, x: 2 }}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 6,
                                    background: t.accent + "18",
                                    border: `1px solid ${t.accent}33`,
                                    borderRadius: 9999,
                                    padding: "5px 12px",
                                    cursor: "default",
                                }}
                            >
                                <span
                                    style={{
                                        width: 5, height: 5, borderRadius: "50%",
                                        background: t.accent, flexShrink: 0,
                                    }}
                                />
                                <span
                                    style={{
                                        fontFamily: "'Syne', sans-serif",
                                        fontSize: "0.68rem",
                                        fontWeight: 800,
                                        letterSpacing: "0.06em",
                                        color: t.accent,
                                    }}
                                >
                                    {t.project}
                                </span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

// ─── Mini card ────────────────────────────────────────────────────────────────
function MiniCard({ t, index, dark }: { t: Testimonial; index: number; dark: boolean }) {
    const { ref: magRef, springX, springY } = useMagnetic(0.18);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [hovered, setHovered] = useState(false);

    const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";
    const cardBg = dark ? "#161614" : "#ffffff";
    const text = dark ? "#f0efea" : "#111110";
    const muted = dark ? "rgba(240,239,234,0.44)" : "rgba(0,0,0,0.44)";

    return (
        <div
            ref={(el) => {
                (ref as any).current = el;
                (magRef as any).current = el;
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: index * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{ x: springX, y: springY }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <motion.div
                    animate={{
                        borderColor: hovered ? t.accent + "55" : border,
                        boxShadow: hovered
                            ? `0 16px 48px rgba(0,0,0,${dark ? 0.38 : 0.1}), 0 0 0 1px ${t.accent}28`
                            : `0 2px 12px rgba(0,0,0,${dark ? 0.2 : 0.05})`,
                    }}
                    transition={{ duration: 0.28 }}
                    style={{
                        background: cardBg,
                        border: "1px solid transparent",
                        borderRadius: 18,
                        padding: "clamp(18px, 2.5vw, 26px)",
                        position: "relative",
                        overflow: "hidden",
                        height: "100%",
                        transition: "background 0.35s",
                        cursor: "default",
                    }}
                >
                    {/* Left accent strip */}
                    <motion.div
                        initial={{ scaleY: 0, originY: 0 }}
                        animate={inView ? { scaleY: 1 } : {}}
                        transition={{ delay: index * 0.08 + 0.2, duration: 0.5 }}
                        style={{
                            position: "absolute",
                            left: 0, top: 0, bottom: 0,
                            width: 3,
                            background: `linear-gradient(to bottom, ${t.accent}, ${t.accent}33)`,
                            borderRadius: "0 2px 2px 0",
                        }}
                    />

                    {/* Glow */}
                    <motion.div
                        animate={{ opacity: hovered ? 0.1 : 0 }}
                        style={{
                            position: "absolute", inset: 0,
                            background: `radial-gradient(circle at 20% 20%, ${t.accent}, transparent 65%)`,
                            pointerEvents: "none",
                        }}
                    />

                    <div style={{ position: "relative", zIndex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                            <img
                                src={t.avatar}
                                alt={t.name}
                                style={{
                                    width: 36, height: 36,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: `1.5px solid ${t.accent}44`,
                                    flexShrink: 0,
                                }}
                            />
                            <div style={{ minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <span
                                        style={{
                                            fontFamily: "'Syne', sans-serif",
                                            fontWeight: 800,
                                            fontSize: "0.82rem",
                                            letterSpacing: "-0.015em",
                                            color: text,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            transition: "color 0.35s",
                                        }}
                                    >
                                        {t.name}
                                    </span>
                                    <span style={{ fontSize: "0.7rem", flexShrink: 0 }}>{t.flag}</span>
                                </div>
                                <p style={{ fontSize: "0.7rem", color: t.accent, fontWeight: 600, letterSpacing: "0.02em" }}>
                                    {t.company}
                                </p>
                            </div>
                            <div style={{ marginLeft: "auto", flexShrink: 0 }}>
                                <StarRating rating={t.rating} color={t.accent} inView={inView} delay={index * 0.08 + 0.3} />
                            </div>
                        </div>

                        <motion.div style={{ color: hovered ? t.accent : dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)" }} animate={{}}>
                            <Quote size={16} strokeWidth={1.5} style={{ marginBottom: 8 }} />
                        </motion.div>

                        <p
                            style={{
                                fontSize: "0.8rem",
                                color: muted,
                                lineHeight: 1.68,
                                fontStyle: "italic",
                                display: "-webkit-box",
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            "{t.text}"
                        </p>

                        <div
                            style={{
                                marginTop: 14,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: "0.62rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.08em",
                                    color: t.accent,
                                    background: t.accent + "15",
                                    borderRadius: 9999,
                                    padding: "2px 8px",
                                    border: `1px solid ${t.accent}28`,
                                }}
                            >
                                {t.project}
                            </span>
                            <span style={{ fontSize: "0.65rem", color: muted, fontWeight: 500 }}>{t.date}</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

// ─── Stat counter card ────────────────────────────────────────────────────────
function StatPill({ stat, index, dark }: { stat: typeof STATS[0]; index: number; dark: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-30px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: index * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, scale: 1.04 }}
            style={{
                background: dark ? "#161614" : "#ffffff",
                border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
                borderRadius: 16,
                padding: "clamp(14px, 2vw, 22px) clamp(16px, 2.5vw, 28px)",
                textAlign: "center",
                transition: "background 0.35s, border-color 0.35s",
                cursor: "default",
                boxShadow: dark ? "0 4px 18px rgba(0,0,0,0.24)" : "0 4px 18px rgba(0,0,0,0.06)",
            }}
        >
            <div
                style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                    letterSpacing: "-0.045em",
                    color: dark ? "#f0efea" : "#111110",
                    lineHeight: 1,
                    transition: "color 0.35s",
                }}
            >
                {stat.value}
            </div>
            <div
                style={{
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    color: dark ? "rgba(240,239,234,0.42)" : "rgba(0,0,0,0.42)",
                    marginTop: 6,
                    lineHeight: 1.3,
                }}
            >
                {stat.label}
            </div>
        </motion.div>
    );
}

// ─── Horizontal scroll carousel ──────────────────────────────────────────────
function Carousel({ dark }: { dark: boolean }) {
    const [current, setCurrent] = useState(0);
    const [dir, setDir] = useState(1);
    const total = TESTIMONIALS.length;

    const prev = () => { setDir(-1); setCurrent((c) => (c - 1 + total) % total); };
    const next = () => { setDir(1); setCurrent((c) => (c + 1) % total); };

    const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";
    const chevBg = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
    const text = dark ? "#f0efea" : "#111110";

    return (
        <div>
            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <motion.div
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                            style={{ width: 22, height: 3, borderRadius: 99, background: "#7c6fcd" }}
                        />
                        <span
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontSize: "0.68rem", fontWeight: 800,
                                letterSpacing: "0.12em", color: "#7c6fcd",
                                textTransform: "uppercase",
                            }}
                        >
                            All Reviews
                        </span>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {/* Dots */}
                    {TESTIMONIALS.map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                            animate={{ width: i === current ? 22 : 7, background: i === current ? text : dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.18)" }}
                            transition={{ duration: 0.3 }}
                            style={{ height: 7, borderRadius: 9999, border: "none", cursor: "pointer", outline: "none", padding: 0 }}
                        />
                    ))}
                    <div style={{ width: 1, height: 20, background: border, margin: "0 4px" }} />
                    {[{ icon: ChevronLeft, fn: prev }, { icon: ChevronRight, fn: next }].map(({ icon: Icon, fn }, i) => (
                        <motion.button
                            key={i}
                            onClick={fn}
                            whileTap={{ scale: 0.88 }}
                            whileHover={{ background: dark ? "rgba(255,255,255,0.13)" : "rgba(0,0,0,0.12)" }}
                            style={{
                                width: 34, height: 34,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                borderRadius: 10,
                                background: chevBg,
                                border: `1px solid ${border}`,
                                color: text,
                                cursor: "pointer", outline: "none",
                                transition: "background 0.15s",
                            }}
                        >
                            <Icon size={15} strokeWidth={2.2} />
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Slide */}
            <div style={{ overflow: "hidden", borderRadius: 20 }}>
                <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                        key={current}
                        custom={dir}
                        initial={(d) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.97 })}
                        animate={{ x: 0, opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
                        exit={(d) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.97, transition: { duration: 0.35 } })}
                    >
                        <FeaturedCard t={TESTIMONIALS[current]} dark={dark} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

// ─── Marquee strip ────────────────────────────────────────────────────────────
function AvatarMarquee({ dark }: { dark: boolean }) {
    const items = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
    return (
        <div style={{ overflow: "hidden", position: "relative" }}>
            {/* Fade edges */}
            {["left", "right"].map((side) => (
                <div
                    key={side}
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        top: 0, bottom: 0,
                        [side]: 0,
                        width: 80,
                        background: `linear-gradient(to ${side === "left" ? "right" : "left"}, ${dark ? "#0d0d0c" : "#ececea"}, transparent)`,
                        zIndex: 2,
                        pointerEvents: "none",
                    }}
                />
            ))}
            <motion.div
                animate={{ x: [0, -((TESTIMONIALS.length * 2) * 100)] }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                style={{ display: "flex", gap: 16, width: "max-content", alignItems: "center" }}
            >
                {items.map((t, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.15, zIndex: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            background: dark ? "#1a1a18" : "#ffffff",
                            border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
                            borderRadius: 9999,
                            padding: "8px 14px 8px 8px",
                            cursor: "default",
                            flexShrink: 0,
                            boxShadow: dark ? "0 4px 16px rgba(0,0,0,0.28)" : "0 4px 16px rgba(0,0,0,0.06)",
                        }}
                    >
                        <img
                            src={t.avatar}
                            alt={t.name}
                            style={{
                                width: 28, height: 28, borderRadius: "50%",
                                objectFit: "cover", border: `1.5px solid ${t.accent}55`,
                            }}
                        />
                        <span
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                color: dark ? "rgba(240,239,234,0.7)" : "rgba(0,0,0,0.65)",
                                whiteSpace: "nowrap",
                                letterSpacing: "0.01em",
                            }}
                        >
                            {t.name}
                        </span>
                        <div style={{ display: "flex", gap: 1 }}>
                            {Array.from({ length: t.rating }).map((_, j) => (
                                <Star key={j} size={9} fill={t.accent} color={t.accent} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Testimonials() {
    useLenis();
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start start"] });
    const headerY = useTransform(scrollYProgress, [0, 1], [40, 0]);
    const headerO = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

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
    const text = dark ? "#f0efea" : "#111110";
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
          overflow-x: hidden;
        }

        .testi-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(20px, 3vw, 40px);
          align-items: start;
        }

        .mini-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 2vw, 20px);
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.5vw, 16px);
        }

        @media (max-width: 900px) {
          .testi-layout { grid-template-columns: 1fr; }
          .stats-row    { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 520px) {
          .mini-grid { grid-template-columns: 1fr; }
        }
      `}</style>

            <section
                ref={sectionRef}
                id="testimonials"
                aria-label="Testimonials"
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
                <div aria-hidden="true" style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `
            linear-gradient(${dark ? "rgba(255,255,255,0.022)" : "rgba(0,0,0,0.036)"} 1px, transparent 1px),
            linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.022)" : "rgba(0,0,0,0.036)"} 1px, transparent 1px)
          `,
                    backgroundSize: "80px 80px",
                    pointerEvents: "none",
                    zIndex: 0,
                }} />

                <div style={{
                    maxWidth: 1120,
                    margin: "0 auto",
                    padding: "0 clamp(16px, 5vw, 48px)",
                    position: "relative",
                    zIndex: 1,
                }}>

                    {/* ── Heading ── */}
                    <motion.div
                        ref={headingRef}
                        style={{ y: headerY, opacity: headerO }}
                    >
                        <div style={{
                            display: "flex", alignItems: "center", gap: 20,
                            marginBottom: "clamp(12px, 2vw, 20px)",
                            position: "relative",
                        }}>
                            <div style={{ flex: 1, height: 1, background: border }} />
                            <h2 style={{
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 900,
                                fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
                                letterSpacing: "-0.038em",
                                color: text,
                                lineHeight: 1,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                                transition: "color 0.35s",
                            }}>
                                Testimonials
                            </h2>
                            <div style={{ flex: 1, height: 1, background: border }} />
                        </div>

                        {/* Sub */}
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={headingInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.55 }}
                            style={{
                                textAlign: "center",
                                fontSize: "clamp(0.84rem, 1.5vw, 1rem)",
                                color: dark ? "rgba(240,239,234,0.44)" : "rgba(0,0,0,0.44)",
                                maxWidth: 480,
                                margin: "0 auto",
                                lineHeight: 1.65,
                                marginBottom: "clamp(32px, 5vw, 56px)",
                            }}
                        >
                            What clients say after working together on real back-end challenges
                        </motion.p>
                    </motion.div>

                    {/* ── Stats ── */}
                    <div className="stats-row" style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}>
                        {STATS.map((s, i) => <StatPill key={s.label} stat={s} index={i} dark={dark} />)}
                    </div>

                    {/* ── Avatar marquee ── */}
                    <div style={{ marginBottom: "clamp(32px, 5vw, 52px)" }}>
                        <AvatarMarquee dark={dark} />
                    </div>

                    {/* ── Divider ── */}
                    <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        style={{ height: 1, background: border, marginBottom: "clamp(32px, 5vw, 52px)" }}
                    />

                    {/* ── Main layout ── */}
                    <div className="testi-layout">
                        {/* Left — Carousel */}
                        <Carousel dark={dark} />

                        {/* Right — Mini grid */}
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(18px, 3vw, 28px)" }}>
                                <motion.div
                                    initial={{ scaleX: 0, originX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45 }}
                                    style={{ width: 22, height: 3, borderRadius: 99, background: "#4caf7d" }}
                                />
                                <span style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: "0.68rem", fontWeight: 800,
                                    letterSpacing: "0.12em", color: "#4caf7d",
                                    textTransform: "uppercase",
                                }}>
                                    All Clients
                                </span>
                            </div>
                            <div className="mini-grid">
                                {TESTIMONIALS.map((t, i) => (
                                    <MiniCard key={t.id} t={t} index={i} dark={dark} />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}