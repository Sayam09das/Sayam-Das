"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    motion,
    useInView,
    useMotionValue,
    useSpring,
    AnimatePresence,
} from "framer-motion";
import { CldImage } from "next-cloudinary";
import { useTheme } from "../context/ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Download,
    MapPin,
    Coffee,
    Code2,
    Layers,
    Zap,
    Github,
    Linkedin,
    Mail,
    Eye,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────
const STATS = [
    { value: "3+", label: "Years Learning & Building", icon: Coffee },
    { value: "10+", label: "Projects Built", icon: Layers },
    { value: "8+", label: "Technologies Used", icon: Code2 },
    { value: "100%", label: "Learning Dedication", icon: Zap },
];

const SOCIALS = [
    { icon: Github, href: "https://github.com/Sayam09das", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sayam-das-43a703287/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:dassayam2021@gmail.com", label: "Email" },
];

// ─── Magnetic hook ────────────────────────────────────────────────────────────
function useMagnetic(strength = 0.3) {
    const ref = useRef<HTMLElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 200, damping: 20 });
    const sy = useSpring(my, { stiffness: 200, damping: 20 });

    const onMove = useCallback(
        (e: MouseEvent) => {
            if (!ref.current) return;
            const r = ref.current.getBoundingClientRect();
            mx.set((e.clientX - (r.left + r.width / 2)) * strength);
            my.set((e.clientY - (r.top + r.height / 2)) * strength);
        },
        [strength, mx, my]
    );
    const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

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

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
    stat,
    index,
    dark,
    cardBg,
    border,
    text,
    muted,
}: {
    stat: (typeof STATS)[0];
    index: number;
    dark: boolean;
    cardBg: string;
    border: string;
    text: string;
    muted: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const numRef = useRef<HTMLDivElement>(null);
    const Icon = stat.icon;
    const target = parseFloat(stat.value.replace(/[+%]/g, "")) || 0;
    const suffix = stat.value.includes("%") ? "%" : stat.value.includes("+") ? "+" : "";
    const [display, setDisplay] = useState(0);

    // GSAP: entrance stagger
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        gsap.fromTo(
            el,
            { opacity: 0, y: 32, scale: 0.9 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.7,
                delay: index * 0.1,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, [index]);

    // GSAP: number count-up on scroll into view
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obj = { val: 0 };
        ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            onEnter: () => {
                gsap.to(obj, {
                    val: target,
                    duration: 1.4,
                    delay: index * 0.1 + 0.2,
                    ease: "power2.out",
                    onUpdate: () => setDisplay(Math.floor(obj.val)),
                    onComplete: () => setDisplay(Math.floor(target)),
                });
            },
            once: true,
        });
    }, [target, index]);

    return (
        <motion.div
            ref={ref}
            whileHover={{
                y: -5,
                scale: 1.04,
                boxShadow: dark
                    ? "0 16px 40px rgba(0,0,0,0.45)"
                    : "0 16px 40px rgba(0,0,0,0.13)",
                transition: { type: "spring", stiffness: 340, damping: 22 },
            }}
            whileTap={{ scale: 0.97 }}
            className="stat-card"
            style={{
                opacity: 0, // GSAP owns entrance opacity
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: 16,
                padding: "clamp(16px, 2.5vw, 22px)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                cursor: "default",
                transition: "background 0.35s, border-color 0.35s",
                willChange: "transform",
            } as React.CSSProperties}
        >
            <div
                style={{
                    width: 36, height: 36,
                    borderRadius: 10,
                    background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <Icon size={16} color={dark ? "rgba(240,239,234,0.6)" : "rgba(0,0,0,0.5)"} strokeWidth={2} />
            </div>

            {/* Animated count */}
            <div
                ref={numRef}
                style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    letterSpacing: "-0.04em",
                    color: text,
                    lineHeight: 1,
                    transition: "color 0.35s",
                }}
            >
                {display.toLocaleString()}{suffix}
            </div>

            <div
                style={{
                    fontFamily: "'Funnel Display', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: muted,
                    lineHeight: 1.3,
                }}
            >
                {stat.label}
            </div>
        </motion.div>
    );
}

// ─── Parallax photo ──────────────────────────────────────────────────────────
function ParallaxPhoto({ dark, text, border, bg }: {
    dark: boolean;
    text: string;
    border: string;
    bg: string;
}) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const badgeBotRef = useRef<HTMLDivElement>(null);
    const badgeTopRef = useRef<HTMLDivElement>(null);
    const inView = useInView(wrapRef, { once: true, margin: "-60px" });

    // GSAP: card entrance
    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        gsap.fromTo(
            el,
            { opacity: 0, scale: 0.9, x: 36 },
            {
                opacity: 1, scale: 1, x: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, []);

    // GSAP: ring continuous rotation
    useEffect(() => {
        const el = ringRef.current;
        if (!el) return;
        gsap.to(el, {
            rotation: 360,
            duration: 30,
            ease: "none",
            repeat: -1,
            transformOrigin: "center center",
        });
    }, []);

    // GSAP: scroll parallax on inner image
    useEffect(() => {
        const img = imgRef.current;
        const wrap = wrapRef.current;
        if (!img || !wrap) return;
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrap,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
            },
        });
        tl.fromTo(img, { y: -28 }, { y: 28, ease: "none" });
        return () => { tl.kill(); };
    }, []);

    // GSAP: badge entrances
    useEffect(() => {
        const bots = badgeBotRef.current;
        const tops = badgeTopRef.current;
        if (!bots || !tops) return;

        gsap.fromTo(
            bots,
            { opacity: 0, y: 16, scale: 0.85 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.55,
                delay: 0.5,
                ease: "back.out(2)",
                scrollTrigger: { trigger: bots, start: "top 90%", toggleActions: "play none none none" },
            }
        );
        gsap.fromTo(
            tops,
            { opacity: 0, y: -16, scale: 0.85 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.55,
                delay: 0.62,
                ease: "back.out(2)",
                scrollTrigger: { trigger: tops, start: "top 90%", toggleActions: "play none none none" },
            }
        );
    }, []);

    const badgeBg = dark ? "#1e1e1c" : "#ffffff";
    const badgeShadow = dark ? "0 8px 28px rgba(0,0,0,0.4)" : "0 8px 28px rgba(0,0,0,0.12)";

    return (
        <div ref={wrapRef} style={{ position: "relative" }}>

            {/* Dashed ring — GSAP rotates it */}
            <div
                ref={ringRef}
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
                ref={cardRef}
                style={{
                    opacity: 0, // GSAP animates in
                    position: "relative",
                    borderRadius: 20,
                    overflow: "hidden",
                    aspectRatio: "4/5",
                    background: dark ? "#1a1a18" : "#dddbd7",
                    border: `1px solid ${border}`,
                    boxShadow: dark ? "0 24px 72px rgba(0,0,0,0.45)" : "0 24px 72px rgba(0,0,0,0.14)",
                    zIndex: 1,
                }}
            >
                {/* Inner image — GSAP drives vertical translate for parallax */}
                <div
                    ref={imgRef}
                    style={{
                        width: "100%",
                        height: "115%",
                        position: "absolute",
                        top: "-7.5%",
                        left: 0,
                        filter: dark ? "brightness(0.8) saturate(0.85)" : "brightness(0.95) saturate(0.9)",
                        willChange: "transform",
                    }}
                >
                    <CldImage
                        src="Sayam Das"
                        alt="Sayam Das"
                        fill
                        draggable={false}
                        style={{
                            objectFit: "cover",
                            objectPosition: "top",
                            userSelect: "none",
                        }}
                    />
                </div>

                {/* Gradient fade at bottom */}
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

            {/* Location badge — bottom-left */}
            <motion.div
                ref={badgeBotRef as React.Ref<HTMLDivElement>}
                style={{
                    opacity: 0, // GSAP animates in
                    position: "absolute",
                    bottom: -18, left: -18,
                    zIndex: 4,
                    background: badgeBg,
                    border: `1px solid ${border}`,
                    borderRadius: 14,
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: badgeShadow,
                    whiteSpace: "nowrap",
                }}
                whileHover={{ scale: 1.06, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <MapPin size={13} color="#f5a623" strokeWidth={2.5} />
                <span
                    style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: text,
                        letterSpacing: "0.02em",
                        transition: "color 0.35s",
                    }}
                >
                    Kolkata, India
                </span>
            </motion.div>

            {/* Available badge — top-right */}
            <motion.div
                ref={badgeTopRef as React.Ref<HTMLDivElement>}
                style={{
                    opacity: 0, // GSAP animates in
                    position: "absolute",
                    top: -16, right: -16,
                    zIndex: 4,
                    background: badgeBg,
                    border: `1px solid ${border}`,
                    borderRadius: 14,
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    boxShadow: badgeShadow,
                    whiteSpace: "nowrap",
                }}
                whileHover={{ scale: 1.06, y: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <span className="about-pulse-dot" />
                <span
                    style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color: text,
                        letterSpacing: "0.02em",
                        transition: "color 0.35s",
                    }}
                >
                    Open to work
                </span>
            </motion.div>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const headingLineL = useRef<HTMLDivElement>(null);
    const headingLineR = useRef<HTMLDivElement>(null);
    const headingTextRef = useRef<HTMLHeadingElement>(null);
    const bioCardRef = useRef<HTMLDivElement>(null);
    const labelBarRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    const { theme } = useTheme();
    const dark = theme === "dark";

    const bg = dark ? "#0d0d0c" : "#ececea";
    const cardBg = dark ? "#141412" : "#f8f7f4";
    const text = dark ? "#f0efea" : "#111110";
    const muted = dark ? "rgba(240,239,234,0.44)" : "rgba(0,0,0,0.44)";
    const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";

    // GSAP: heading lines draw + text word stagger
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Divider lines
            gsap.fromTo(
                [headingLineL.current, headingLineR.current],
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.06,
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );

            // Heading text fade+lift
            gsap.fromTo(
                headingTextRef.current,
                { opacity: 0, y: 20, skewX: 4 },
                {
                    opacity: 1, y: 0, skewX: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );

            // Bio card slides in
            gsap.fromTo(
                bioCardRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: bioCardRef.current,
                        start: "top 88%",
                        toggleActions: "play none none none",
                    },
                }
            );

            // Label bar inside bio
            gsap.fromTo(
                labelBarRef.current,
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1,
                    duration: 0.45,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: labelBarRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Magnetic for resume button
    const { ref: magResRef, sx: resSx, sy: resSy } = useMagnetic(0.22);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800;12..96,900&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes about-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }

        .about-pulse-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          animation: about-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        /* ── Layout grids ── */
        .about-main-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: clamp(32px, 5vw, 72px);
          align-items: start;
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.5vw, 16px);
        }

        /* ── Heading lines ── */
        .about-heading-line {
          flex: 1;
          height: 1px;
          transform-origin: left center;
        }
        .about-heading-line--right {
          transform-origin: right center;
        }

        /* ── Bio card ── */
        .about-bio-card {
          opacity: 0; /* GSAP animates in */
          background: ${cardBg};
          border: 1px solid ${border};
          border-radius: 20px;
          padding: clamp(22px, 3.5vw, 36px);
          transition: background 0.35s, border-color 0.35s;
        }

        /* ── Social pills ── */
        .about-social-pill {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"};
          border: 1px solid ${border};
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${muted};
          text-decoration: none;
          flex-shrink: 0;
          transition: background 0.18s, color 0.18s, transform 0.18s;
        }
        .about-social-pill:hover {
          background: ${dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.11)"};
          color: ${text};
          transform: scale(1.1);
        }

        /* ── Resume button ── */
        .about-resume-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          border-radius: 9999px;
          background: ${text};
          color: ${bg};
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-decoration: none;
          flex-shrink: 0;
          transition: background 0.35s, color 0.35s, opacity 0.18s;
          position: relative;
          overflow: hidden;
        }
        .about-resume-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.1);
          opacity: 0;
          border-radius: inherit;
          transition: opacity 0.18s;
        }
        .about-resume-btn:hover::after { opacity: 1; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .about-main-grid { grid-template-columns: 1fr 300px; }
        }

        @media (max-width: 820px) {
          .about-main-grid   { grid-template-columns: 1fr; }
          .about-photo-col   { order: -1; max-width: 300px; margin: 0 auto; }
          .about-stats-grid  { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .about-stats-grid  { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 420px) {
          .about-stats-grid  { grid-template-columns: 1fr 1fr; }
          .about-resume-btn  { font-size: 0.75rem; padding: 8px 14px; }
          .about-social-pill { width: 32px; height: 32px; }
        }

        @media (max-width: 360px) {
          .about-main-grid { gap: 24px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .about-bio-card,
          .about-heading-line,
          .about-pulse-dot {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }
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
                    <div
                        ref={headingRef}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 20,
                            marginBottom: "clamp(36px, 6vw, 64px)",
                        }}
                    >
                        <div
                            ref={headingLineL}
                            className="about-heading-line"
                            style={{ background: border }}
                        />
                        <h2
                            ref={headingTextRef}
                            style={{
                                opacity: 0, // GSAP
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
                            About
                        </h2>
                        <div
                            ref={headingLineR}
                            className="about-heading-line about-heading-line--right"
                            style={{ background: border }}
                        />
                    </div>

                    {/* ── Main 2-col ── */}
                    <div className="about-main-grid">

                        {/* Left: bio content */}
                        <div>
                            <div ref={bioCardRef} className="about-bio-card">

                                {/* Label row */}
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                                    <div
                                        ref={labelBarRef}
                                        style={{
                                            width: 24, height: 3,
                                            borderRadius: 99,
                                            background: "#7c6fcd",
                                            flexShrink: 0,
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontFamily: "'Bricolage Grotesque', sans-serif",
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
                                        fontFamily: "'Bricolage Grotesque', sans-serif",
                                        fontWeight: 800,
                                        fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
                                        letterSpacing: "-0.028em",
                                        color: text,
                                        lineHeight: 1.25,
                                        marginBottom: 14,
                                        transition: "color 0.35s",
                                    }}
                                >
                                    Full-Stack Developer & Machine Learning Enthusiast building modern digital experiences.
                                </h3>

                                <p
                                    style={{
                                        fontFamily: "'Funnel Display', sans-serif",
                                        fontSize: "clamp(0.84rem, 1.4vw, 0.92rem)",
                                        color: muted,
                                        lineHeight: 1.76,
                                        marginBottom: 12,
                                    }}
                                >
                                    I'm Sayam Das, a developer focused on building modern web applications
                                    using React, Next.js, and scalable backend technologies. I enjoy creating
                                    fast, responsive, and visually engaging digital experiences.
                                </p>

                                <p
                                    style={{
                                        fontFamily: "'Funnel Display', sans-serif",
                                        fontSize: "clamp(0.84rem, 1.4vw, 0.92rem)",
                                        color: muted,
                                        lineHeight: 1.76,
                                    }}
                                >
                                    Beyond web development, I explore Python and Machine Learning,
                                    experimenting with data-driven systems and intelligent applications.
                                    I'm passionate about learning new technologies and solving real-world
                                    problems through code.
                                </p>

                                {/* Social + resume row */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginTop: 24,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {/* Magnetic resume button */}
                                    <motion.a
                                        ref={magResRef as React.Ref<HTMLAnchorElement>}
                                        href="https://drive.google.com/file/d/1D0MoqDXLb0G15Av8bmx1ALyufP40apjY/view"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="about-resume-btn"
                                        style={{ x: resSx, y: resSy }}
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{ scale: 1.04 }}
                                        transition={{ type: "spring", stiffness: 340, damping: 22 }}
                                    >
                                        <Eye size={13} strokeWidth={2.5} />
                                        Resume
                                    </motion.a>

                                    {/* Social icons with spring hover */}
                                    {SOCIALS.map(({ icon: Icon, href, label }) => (
                                        <motion.a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="about-social-pill"
                                            whileHover={{ scale: 1.15, y: -2 }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 320, damping: 20 }}
                                        >
                                            <Icon size={15} strokeWidth={1.8} />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: photo */}
                        <div className="about-photo-col">
                            <ParallaxPhoto dark={dark} text={text} border={border} bg={bg} />
                        </div>

                    </div>

                    {/* ── Stats grid ── */}
                    <div
                        ref={statsRef}
                        className="about-stats-grid"
                        style={{ marginTop: "clamp(40px, 7vw, 72px)" }}
                    >
                        {STATS.map((s, i) => (
                            <StatCard
                                key={s.label}
                                stat={s}
                                index={i}
                                dark={dark}
                                cardBg={cardBg}
                                border={border}
                                text={text}
                                muted={muted}
                            />
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
}
