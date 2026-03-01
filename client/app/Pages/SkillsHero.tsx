"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface TechOrb {
    name: string;
    color: string;
    size: number;
    x: number;
    y: number;
    speed: number;
    angle: number;
}

interface SkillsHeroProps {
    dark: boolean;
    bg: string;
    text: string;
    muted: string;
    border: string;
    chevBg: string;
}

const TECH_ORBS: TechOrb[] = [
    { name: "API", color: "#7c6fcd", size: 70, x: 12, y: 18, speed: 18, angle: 0 },
    { name: "SQL", color: "#336791", size: 58, x: 82, y: 12, speed: 24, angle: 60 },
    { name: "REST", color: "#73b55a", size: 50, x: 92, y: 72, speed: 20, angle: 120 },
    { name: "gRPC", color: "#e535ab", size: 44, x: 8, y: 78, speed: 16, angle: 180 },
    { name: "MQ", color: "#f5a623", size: 38, x: 50, y: 6, speed: 22, angle: 240 },
    { name: "CDN", color: "#2496ed", size: 42, x: 24, y: 52, speed: 28, angle: 300 },
    { name: "SSH", color: "#d82c20", size: 34, x: 72, y: 42, speed: 32, angle: 150 },
    { name: "ORM", color: "#47a248", size: 46, x: 58, y: 88, speed: 26, angle: 90 },
];

// ─── Floating orb ─────────────────────────────────────────────────────────────
function FloatingOrb({ orb, dark }: { orb: TechOrb; dark: boolean }) {
    const angle = useMotionValue(orb.angle);

    useAnimationFrame((t) => {
        angle.set((orb.angle + t / (orb.speed * 60)) % 360);
    });

    const floatY = useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * 12);
    const floatX = useTransform(angle, (a) => Math.cos((a * Math.PI) / 180) * 6);

    return (
        <motion.div
            style={{
                position: "absolute",
                left: `${orb.x}%`,
                top: `${orb.y}%`,
                x: floatX,
                y: floatY,
                width: orb.size,
                height: orb.size,
                borderRadius: "50%",
                background: dark
                    ? `radial-gradient(circle at 35% 35%, ${orb.color}55, ${orb.color}22)`
                    : `radial-gradient(circle at 35% 35%, ${orb.color}33, ${orb.color}11)`,
                border: `1px solid ${orb.color}${dark ? "44" : "28"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(2px)",
                cursor: "default",
                userSelect: "none",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.25, zIndex: 10 }}
        >
            <span
                style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: orb.size * 0.24,
                    color: dark ? orb.color : orb.color + "cc",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                }}
            >
                {orb.name}
            </span>
        </motion.div>
    );
}

// ─── Main Skills Hero Component ───────────────────────────────────────────────
export default function SkillsHero({ dark, bg, text, muted, border, chevBg }: SkillsHeroProps) {
    const heroRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    // Parallax on hero orbs section
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroY = useTransform(heroScroll, [0, 1], [0, 80]);
    const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

    // Dynamic imports cause a flash of content on mount
    // Using useState to track mount status
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render anything on server to avoid hydration mismatch
    if (!mounted) {
        return (
            <div
                ref={heroRef}
                style={{
                    position: "relative",
                    width: "100%",
                    height: "clamp(340px, 46vh, 520px)",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: bg,
                }}
            >
                {/* Placeholder to prevent layout shift */}
                <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 24px" }}>
                    <h1
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 900,
                            fontSize: "clamp(3rem, 8vw, 6.5rem)",
                            letterSpacing: "-0.045em",
                            color: text,
                            lineHeight: 0.95,
                        }}
                    >
                        Skills
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            ref={heroRef}
            style={{
                position: "relative",
                width: "100%",
                height: "clamp(340px, 46vh, 520px)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                y: heroY,
                opacity: heroOpacity,
            }}
        >
            {/* Grid texture */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                linear-gradient(${dark ? "rgba(255,255,255,0.022)" : "rgba(0,0,0,0.036)"} 1px, transparent 1px),
                linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.022)" : "rgba(0,0,0,0.036)"} 1px, transparent 1px)
              `,
                    backgroundSize: "80px 80px",
                    pointerEvents: "none",
                }}
            />

            {/* Floating orbs */}
            {TECH_ORBS.map((orb) => (
                <FloatingOrb key={orb.name} orb={orb} dark={dark} />
            ))}

            {/* Radial overlay to fade orbs near center */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse 55% 55% at 50% 50%, ${bg} 0%, transparent 100%)`,
                    pointerEvents: "none",
                    zIndex: 2,
                }}
            />

            {/* Centered text */}
            <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 24px" }}>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#7c6fcd",
                        marginBottom: 12,
                    }}
                >
                    Technical Proficiency
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 900,
                        fontSize: "clamp(3rem, 8vw, 6.5rem)",
                        letterSpacing: "-0.045em",
                        color: text,
                        lineHeight: 0.95,
                    }}
                >
                    Skills
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{
                        marginTop: 14,
                        fontSize: "clamp(0.84rem, 1.5vw, 1rem)",
                        color: muted,
                        maxWidth: 420,
                        margin: "14px auto 0",
                        lineHeight: 1.65,
                    }}
                >
                    Technologies I&apos;ve worked with across{" "}
                    <span style={{ color: text, fontWeight: 600 }}>4+ years</span>{" "}
                    of back-end engineering
                </motion.p>
            </div>
        </motion.div>
    );
}

