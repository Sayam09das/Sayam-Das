"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
} from "framer-motion";
import {
    GraduationCap,
    BookOpen,
    Award,
    Star,
    ExternalLink,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
interface EducationItem {
    id: number;
    period: string;
    degree: string;
    field: string;
    institution: string;
    location: string;
    gpa?: string;
    description: string;
    highlights: string[];
    accent: string;
    icon: React.ElementType;
    type: "degree" | "course" | "cert";
    link?: string;
}

const EDUCATION: EducationItem[] = [
    {
        id: 1,
        period: "2023 — Present",
        degree: "Bachelor of Computer Applications",
        field: "Computer Applications",
        institution: "Adamas University",
        location: "West Bengal, India",
        description:
            "Currently pursuing BCA with focus on programming, data structures, web development, and software engineering fundamentals.",
        highlights: [
            "Focused on Full-Stack Web Development",
            "Working with React, Next.js, Node.js",
            "Exploring Python and Machine Learning",
            "Building modern development projects",
        ],
        accent: "#7c6fcd",
        icon: GraduationCap,
        type: "degree",
    },
    {
        id: 2,
        period: "2025 — 2025",
        degree: "Online Course",
        field: "Data Structures & Algorithms",
        institution: "Algo University",
        location: "Online",
        description:
            "Studying core data structures and algorithms including problem solving, complexity analysis, and algorithmic thinking.",
        highlights: [
            "Arrays, Linked Lists, Trees, Graphs",
            "Sorting and searching algorithms",
            "Time and space complexity analysis",
            "Problem solving and coding practice",
        ],
        accent: "#f5a623",
        icon: Award,
        type: "course",
    },
    {
        id: 3,
        period: "2020 — 2022",
        degree: "Higher Secondary Education",
        field: "Science Stream",
        institution: "Kuikota Shankari Vidyaniketan U. Pry",
        location: "West Bengal, India",
        description:
            "Completed higher secondary education with focus on mathematics and science subjects, building analytical and logical thinking.",
        highlights: [
            "Strong foundation in Mathematics",
            "Science and analytical studies",
            "Introduction to computer fundamentals",
        ],
        accent: "#4caf7d",
        icon: BookOpen,
        type: "degree",
    },
    {
        id: 4,
        period: "2018 — 2020",
        degree: "Secondary Education",
        field: "General Education",
        institution: "Keshiary High School (H.S.)",
        location: "West Bengal, India",
        description:
            "Completed secondary education and developed early interest in technology and computers.",
        highlights: [
            "Academic foundation",
            "Interest in technology and computing",
            "Early exposure to programming",
        ],
        accent: "#e040fb",
        icon: BookOpen,
        type: "degree",
    },
];

const TYPE_LABELS: Record<string, string> = {
    degree: "Degree",
    course: "Course",
    cert: "Certificate",
};

// ─── Card component ───────────────────────────────────────────────────────────
function EducationCard({
    item,
    index,
    isLeft,
    dark,
}: {
    item: EducationItem;
    index: number;
    isLeft: boolean;
    dark: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const [hovered, setHovered] = useState(false);
    const Icon = item.icon;

    const cardBg = dark ? "#161614" : "#ffffff";
    const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";
    const text = dark ? "#f0efea" : "#111110";
    const muted = dark ? "rgba(240,239,234,0.44)" : "rgba(0,0,0,0.44)";
    const tagBg = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";

    const xFrom = isLeft ? -40 : 40;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: xFrom, y: 16 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{
                delay: index * 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: cardBg,
                border: `1px solid ${hovered ? item.accent + "55" : border}`,
                borderRadius: 20,
                padding: "clamp(20px, 3vw, 32px)",
                position: "relative",
                overflow: "hidden",
                boxShadow: hovered
                    ? `0 16px 48px rgba(0,0,0,${dark ? 0.4 : 0.12}), 0 0 0 1px ${item.accent}33`
                    : `0 4px 16px rgba(0,0,0,${dark ? 0.25 : 0.06})`,
                transition: "border-color 0.3s, box-shadow 0.3s, background 0.35s",
                cursor: "default",
            }}
        >
            {/* Accent glow */}
            <motion.div
                animate={{ opacity: hovered ? 0.1 : 0 }}
                transition={{ duration: 0.35 }}
                style={{
                    position: "absolute",
                    top: -60, right: -60,
                    width: 220, height: 220,
                    borderRadius: "50%",
                    background: item.accent,
                    filter: "blur(60px)",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* Left accent strip */}
            <motion.div
                initial={{ scaleY: 0, originY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: "absolute",
                    left: 0, top: 0, bottom: 0,
                    width: 3,
                    background: `linear-gradient(to bottom, ${item.accent}, ${item.accent}44)`,
                    borderRadius: "0 2px 2px 0",
                }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {/* Icon badge */}
                        <motion.div
                            whileHover={{ rotate: 8, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                            style={{
                                width: 42, height: 42,
                                borderRadius: 12,
                                background: item.accent + "20",
                                border: `1px solid ${item.accent}44`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            <Icon size={18} color={item.accent} strokeWidth={2} />
                        </motion.div>

                        <div>
                            <span
                                style={{
                                    fontFamily: "'Bricolage Grotesque', sans-serif",
                                    fontSize: "0.62rem",
                                    fontWeight: 800,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: item.accent,
                                    display: "block",
                                    marginBottom: 1,
                                }}
                            >
                                {TYPE_LABELS[item.type]}
                            </span>
                            <span
                                style={{
                                    fontFamily: "'Funnel Display', sans-serif",
                                    fontSize: "0.75rem",
                                    color: muted,
                                    fontWeight: 500,
                                }}
                            >
                                {item.period}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        {item.gpa && (
                            <div
                                style={{
                                    display: "flex", alignItems: "center", gap: 4,
                                    background: item.accent + "18",
                                    border: `1px solid ${item.accent}33`,
                                    borderRadius: 9999,
                                    padding: "3px 10px",
                                }}
                            >
                                <Star size={10} color={item.accent} strokeWidth={2.5} />
                                <span
                                    style={{
                                        fontFamily: "'Bricolage Grotesque', sans-serif",
                                        fontSize: "0.68rem",
                                        fontWeight: 800,
                                        color: item.accent,
                                        letterSpacing: "0.04em",
                                    }}
                                >
                                    {item.gpa}
                                </span>
                            </div>
                        )}
                        {item.link && (
                            <motion.a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View credential"
                                animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
                                transition={{ duration: 0.22 }}
                                style={{
                                    width: 28, height: 28,
                                    borderRadius: "50%",
                                    background: tagBg,
                                    border: `1px solid ${border}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: muted,
                                    textDecoration: "none",
                                }}
                            >
                                <ExternalLink size={12} strokeWidth={2} />
                            </motion.a>
                        )}
                    </div>
                </div>

                {/* Degree & field */}
                <h3
                    style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(1rem, 1.9vw, 1.22rem)",
                        letterSpacing: "-0.022em",
                        color: text,
                        lineHeight: 1.25,
                        marginBottom: 2,
                        transition: "color 0.35s",
                    }}
                >
                    {item.degree}
                    <span style={{ color: item.accent }}> — </span>
                    {item.field}
                </h3>

                {/* Institution + location */}
                <p
                    style={{
                        fontSize: "0.8rem",
                        color: muted,
                        fontWeight: 500,
                        marginBottom: 12,
                    }}
                >
                    {item.institution}
                    <span
                        style={{
                            display: "inline-block",
                            width: 3, height: 3,
                            borderRadius: "50%",
                            background: muted,
                            margin: "0 6px 2px",
                            verticalAlign: "middle",
                        }}
                    />
                    {item.location}
                </p>

                {/* Description */}
                <p
                    style={{
                        fontSize: "clamp(0.8rem, 1.3vw, 0.875rem)",
                        color: muted,
                        lineHeight: 1.72,
                        marginBottom: 18,
                    }}
                >
                    {item.description}
                </p>

                {/* Highlights */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px 12px",
                    }}
                    className="highlights-grid"
                >
                    {item.highlights.map((h, i) => (
                        <motion.div
                            key={h}
                            initial={{ opacity: 0, x: -10 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.1 + 0.25 + i * 0.06, duration: 0.38 }}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 7,
                                fontSize: "0.76rem",
                                color: dark ? "rgba(240,239,234,0.5)" : "rgba(0,0,0,0.5)",
                                lineHeight: 1.45,
                            }}
                        >
                            <span
                                style={{
                                    width: 5, height: 5,
                                    borderRadius: "50%",
                                    background: item.accent,
                                    marginTop: 5,
                                    flexShrink: 0,
                                }}
                            />
                            {h}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// ─── Timeline dot ─────────────────────────────────────────────────────────────
function TimelineDot({
    accent,
    index,
    inView,
}: {
    accent: string;
    index: number;
    inView: boolean;
}) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{
                delay: index * 0.1 + 0.05,
                duration: 0.45,
                type: "spring",
                stiffness: 320,
                damping: 18,
            }}
            style={{
                width: 14, height: 14,
                borderRadius: "50%",
                background: accent,
                boxShadow: `0 0 14px ${accent}88`,
                border: `2px solid ${accent}`,
                position: "relative",
                zIndex: 2,
                flexShrink: 0,
            }}
        >
            {/* Pulse ring */}
            <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    inset: -4,
                    borderRadius: "50%",
                    background: accent,
                }}
            />
        </motion.div>
    );
}

// ─── Desktop Timeline Row (zigzag) ────────────────────────────────────────────
function DesktopTimelineRow({
    item,
    index,
    isLeft,
    dark,
}: {
    item: EducationItem;
    index: number;
    isLeft: boolean;
    dark: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <div
            ref={ref}
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 60px 1fr",
                alignItems: "start",
                marginBottom: 40,
                position: "relative",
            }}
        >
            {isLeft ? (
                <>
                    <div style={{ paddingRight: 32 }}>
                        <EducationCard item={item} index={index} isLeft={true} dark={dark} />
                    </div>
                    <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                        <div style={{ position: "absolute", top: "clamp(28px,4vw,36px)", zIndex: 10 }}>
                            <TimelineDot accent={item.accent} index={index} inView={inView} />
                        </div>
                    </div>
                    <div />
                </>
            ) : (
                <>
                    <div />
                    <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                        <div style={{ position: "absolute", top: "clamp(28px,4vw,36px)", zIndex: 10 }}>
                            <TimelineDot accent={item.accent} index={index} inView={inView} />
                        </div>
                    </div>
                    <div style={{ paddingLeft: 32 }}>
                        <EducationCard item={item} index={index} isLeft={false} dark={dark} />
                    </div>
                </>
            )}
        </div>
    );
}

// ─── Mobile Timeline Row (left-aligned) ───────────────────────────────────────
function MobileTimelineRow({
    item,
    index,
    dark,
    isLast,
    lineColor,
}: {
    item: EducationItem;
    index: number;
    dark: boolean;
    isLast: boolean;
    lineColor: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <div
            ref={ref}
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 0,
                position: "relative",
                marginBottom: isLast ? 0 : 32,
            }}
        >
            {/* Left column: dot + vertical line */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexShrink: 0,
                    width: 28,
                    paddingTop: 20,
                }}
            >
                <TimelineDot accent={item.accent} index={index} inView={inView} />
                {/* Connecting line to next dot */}
                {!isLast && (
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={inView ? { scaleY: 1 } : {}}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            width: 2,
                            flex: 1,
                            minHeight: 32,
                            background: lineColor,
                            originY: 0,
                            marginTop: 6,
                            opacity: 0.5,
                        }}
                    />
                )}
            </div>

            {/* Card */}
            <div style={{ flex: 1, paddingLeft: 16, paddingTop: 13 }}>
                <EducationCard item={item} index={index} isLeft={true} dark={dark} />
            </div>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Education() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
    const [isMobile, setIsMobile] = useState(false);

    // Central line progress (desktop only)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 80%", "end 20%"],
    });
    const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const [dark, setDark] = useState(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.classList.contains("dark");
        }
        return false;
    });

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const bg = dark ? "#0d0d0c" : "#ececea";
    const text = dark ? "#f0efea" : "#111110";
    const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";
    const lineBg = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";

    // Gradient line color for mobile connector
    const mobileLineGradient = `linear-gradient(to bottom, #7c6fcd, #4caf7d, #f5a623, #e040fb)`;

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
        }
        .highlights-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 460px) {
          .highlights-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

            <section
                ref={sectionRef}
                id="education"
                aria-label="Education"
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
                        maxWidth: 1100,
                        margin: "0 auto",
                        padding: "0 clamp(16px, 5vw, 48px)",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {/* ── Heading ── */}
                    <motion.div
                        ref={headingRef}
                        initial={{ opacity: 0, y: 24 }}
                        animate={headingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 20,
                            marginBottom: "clamp(48px, 7vw, 80px)",
                            position: "relative",
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
                            Education
                        </h2>
                        <div style={{ flex: 1, height: 1, background: border }} />
                    </motion.div>

                    {/* ── Timeline ── */}
                    {isMobile ? (
                        /* ── MOBILE / TABLET: left-rail timeline ── */
                        <div style={{ position: "relative" }}>
                            {/* Continuous background rail line */}
                            <div
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    left: 13,
                                    top: 20,
                                    bottom: 20,
                                    width: 2,
                                    background: lineBg,
                                    zIndex: 0,
                                }}
                            >
                                <motion.div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        background: mobileLineGradient,
                                        scaleY: lineScaleY,
                                        originY: 0,
                                        opacity: 0.55,
                                    }}
                                />
                            </div>

                            {EDUCATION.map((item, i) => (
                                <MobileTimelineRow
                                    key={item.id}
                                    item={item}
                                    index={i}
                                    dark={dark}
                                    isLast={i === EDUCATION.length - 1}
                                    lineColor={item.accent + "88"}
                                />
                            ))}
                        </div>
                    ) : (
                        /* ── DESKTOP: zigzag center timeline ── */
                        <div style={{ position: "relative" }}>
                            {/* Central scroll-driven line */}
                            <div
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: 0, bottom: 0,
                                    width: 1,
                                    background: lineBg,
                                    transform: "translateX(-50%)",
                                    zIndex: 1,
                                }}
                            >
                                <motion.div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        background: `linear-gradient(to bottom, #7c6fcd, #4caf7d, #f5a623, #e040fb)`,
                                        scaleY: lineScaleY,
                                        originY: 0,
                                        opacity: 0.55,
                                    }}
                                />
                            </div>

                            {EDUCATION.map((item, i) => (
                                <DesktopTimelineRow
                                    key={item.id}
                                    item={item}
                                    index={i}
                                    isLeft={i % 2 === 0}
                                    dark={dark}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}