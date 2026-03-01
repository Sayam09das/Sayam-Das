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
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Send,
    Clock,
    MessageCircle,
    CheckCircle,
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
const CONTACT_INFO = [
    { icon: Mail, label: "Email", value: "hello@example.com", accent: "#7c6fcd" },
    { icon: Phone, label: "Phone", value: "+1 234 567 890", accent: "#4caf7d" },
    { icon: MapPin, label: "Location", value: "New York, USA", accent: "#f5a623" },
    { icon: Clock, label: "Availability", value: "Mon-Fri, 9AM-6PM", accent: "#e535ab" },
];

const SOCIALS = [
    { icon: Github, href: "https://github.com", label: "GitHub", color: "#f0efea" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "#0077b5" },
    { icon: MessageCircle, href: "https://t.me", label: "Telegram", color: "#0088cc" },
];

const FAQS = [
    {
        question: "What's your typical project timeline?",
        answer: "Timeline varies based on scope. Small projects take 1-2 weeks, while larger ones may require 2-3 months with ongoing support.",
    },
    {
        question: "Do you offer ongoing maintenance?",
        answer: "Yes! I provide post-launch support and maintenance packages to keep your project running smoothly.",
    },
    {
        question: "What industries do you work with?",
        answer: "I work across various industries including fintech, e-commerce, healthcare, and SaaS products.",
    },
    {
        question: "How do you handle project communication?",
        answer: "I use Slack/Discord for daily updates, weekly video calls for progress reviews, and share detailed documentation via Notion.",
    },
];

// ─── Contact Form ───────────────────────────────────────────────────────────
function ContactForm({ dark }: { dark: boolean }) {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: "", email: "", subject: "", message: "" });
    };

    const inputBg = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
    const inputBorder = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    textAlign: "center",
                    padding: "48px 24px",
                    background: dark ? "#1a1a18" : "#ffffff",
                    borderRadius: 20,
                    border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    <CheckCircle size={64} color="#22c55e" strokeWidth={1.5} />
                </motion.div>
                <h3
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800,
                        fontSize: "1.5rem",
                        color: dark ? "#f0efea" : "#111110",
                        marginTop: 20,
                        marginBottom: 8,
                    }}
                >
                    Message Sent!
                </h3>
                <p
                    style={{
                        color: dark ? "rgba(240,239,234,0.5)" : "rgba(0,0,0,0.5)",
                        fontSize: "0.95rem",
                    }}
                >
                    Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => setIsSubmitted(false)}
                    style={{
                        marginTop: 24,
                        padding: "12px 24px",
                        borderRadius: 9999,
                        background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                        border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                        color: dark ? "#f0efea" : "#111110",
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    Send Another Message
                </motion.button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginBottom: 16,
                }}
            >
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: dark ? "rgba(240,239,234,0.5)" : "rgba(0,0,0,0.5)",
                            marginBottom: 8,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                        }}
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            borderRadius: 12,
                            border: `1px solid ${inputBorder}`,
                            background: inputBg,
                            color: dark ? "#f0efea" : "#111110",
                            fontSize: "0.9rem",
                            outline: "none",
                            transition: "border-color 0.2s, box-shadow 0.2s",
                        }}
                    />
                </div>
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: dark ? "rgba(240,239,234,0.5)" : "rgba(0,0,0,0.5)",
                            marginBottom: 8,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                        }}
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            borderRadius: 12,
                            border: `1px solid ${inputBorder}`,
                            background: inputBg,
                            color: dark ? "#f0efea" : "#111110",
                            fontSize: "0.9rem",
                            outline: "none",
                            transition: "border-color 0.2s, box-shadow 0.2s",
                        }}
                    />
                </div>
            </div>

            <div style={{ marginBottom: 16 }}>
                <label
                    style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: dark ? "rgba(240,239,234,0.5)" : "rgba(0,0,0,0.5)",
                        marginBottom: 8,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    }}
                >
                    Subject
                </label>
                <input
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Project Inquiry"
                    style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: 12,
                        border: `1px solid ${inputBorder}`,
                        background: inputBg,
                        color: dark ? "#f0efea" : "#111110",
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                />
            </div>

            <div style={{ marginBottom: 24 }}>
                <label
                    style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: dark ? "rgba(240,239,234,0.5)" : "rgba(0,0,0,0.5)",
                        marginBottom: 8,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    }}
                >
                    Message
                </label>
                <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: 12,
                        border: `1px solid ${inputBorder}`,
                        background: inputBg,
                        color: dark ? "#f0efea" : "#111110",
                        fontSize: "0.9rem",
                        outline: "none",
                        resize: "vertical",
                        minHeight: 120,
                        fontFamily: "inherit",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                />
            </div>

            <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                    width: "100%",
                    padding: "16px 24px",
                    borderRadius: 12,
                    background: dark ? "#f0efea" : "#111110",
                    color: dark ? "#111110" : "#f0efea",
                    border: "none",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    transition: "background 0.35s, color 0.35s",
                }}
            >
                {isSubmitting ? (
                    <>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            style={{
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                border: `2px solid transparent`,
                                borderTopColor: "currentColor",
                            }}
                        />
                        Sending...
                    </>
                ) : (
                    <>
                        <Send size={18} strokeWidth={2} />
                        Send Message
                    </>
                )}
            </motion.button>
        </form>
    );
}

// ─── FAQ Item ────────────────────────────────────────────────────────────────
function FAQItem({ item, index, dark }: { item: (typeof FAQS)[0]; index: number; dark: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
                borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
                paddingBottom: 20,
                marginBottom: 20,
            }}
        >
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 0",
                    textAlign: "left",
                }}
            >
                <span
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: dark ? "#f0efea" : "#111110",
                        transition: "color 0.35s",
                    }}
                >
                    {item.question}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        width: 24,
                        height: 24,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: dark ? "rgba(240,239,234,0.4)" : "rgba(0,0,0,0.4)",
                        flexShrink: 0,
                        marginLeft: 12,
                    }}
                >
                    +
                </motion.span>
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                    >
                        <p
                            style={{
                                paddingTop: 12,
                                fontSize: "0.88rem",
                                color: dark ? "rgba(240,239,234,0.5)" : "rgba(0,0,0,0.5)",
                                lineHeight: 1.7,
                            }}
                        >
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─── Contact Card ───────────────────────────────────────────────────────────
function ContactCard({ item, index, dark }: { item: (typeof CONTACT_INFO)[0]; index: number; dark: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-30px" });
    const Icon = item.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                delay: index * 0.08,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4, scale: 1.02 }}
            style={{
                background: dark ? "#1a1a18" : "#ffffff",
                border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
                borderRadius: 16,
                padding: "clamp(16px, 2.5vw, 22px)",
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.28)" : "0 4px 20px rgba(0,0,0,0.07)",
                cursor: "default",
                transition: "background 0.35s, border-color 0.35s",
            }}
        >
            <div
                style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: `${item.accent}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <Icon size={18} color={item.accent} strokeWidth={2} />
            </div>
            <div>
                <div
                    style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: item.accent,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 4,
                    }}
                >
                    {item.label}
                </div>
                <div
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "0.92rem",
                        fontWeight: 600,
                        color: dark ? "#f0efea" : "#111110",
                        transition: "color 0.35s",
                    }}
                >
                    {item.value}
                </div>
            </div>
        </motion.div>
    );
}

// ─── Social Link ─────────────────────────────────────────────────────────────
function SocialLink({ item, index, dark }: { item: (typeof SOCIALS)[0]; index: number; dark: boolean }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const inView = useInView(ref, { once: true, margin: "-30px" });
    const Icon = item.icon;

    return (
        <motion.a
            ref={ref}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 20px",
                background: dark ? "#1a1a18" : "#ffffff",
                border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
                borderRadius: 12,
                textDecoration: "none",
                boxShadow: dark ? "0 4px 16px rgba(0,0,0,0.24)" : "0 4px 16px rgba(0,0,0,0.06)",
                transition: "background 0.35s, border-color 0.35s",
            }}
        >
            <Icon size={20} color={item.color} strokeWidth={1.8} />
            <span
                style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: dark ? "#f0efea" : "#111110",
                    transition: "color 0.35s",
                }}
            >
                {item.label}
            </span>
        </motion.a>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Contact() {
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

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 56px);
          align-items: start;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 2vw, 16px);
        }

        .social-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .info-grid { grid-template-columns: 1fr; }
          .social-grid { grid-template-columns: 1fr; }
        }

        input:focus, textarea:focus {
          border-color: #7c6fcd !important;
          box-shadow: 0 0 0 3px rgba(124, 111, 205, 0.15) !important;
        }

        .theme-btn:hover { background: ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"} !important; }
        .theme-btn { transition: background 0.18s, transform 0.18s; }
      `}</style>

            <section
                ref={sectionRef}
                id="contact"
                aria-label="Contact"
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
                        position: "absolute",
                        inset: 0,
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
                            Contact
                        </h2>
                        <div style={{ flex: 1, height: 1, background: border }} />
                    </motion.div>

                    {/* ── Main content ── */}
                    <div className="contact-grid">
                        {/* Left: Info & Form */}
                        <div>
                            {/* Contact info cards */}
                            <div className="info-grid" style={{ marginBottom: "clamp(24px, 4vw, 32px)" }}>
                                {CONTACT_INFO.map((item, i) => (
                                    <ContactCard key={item.label} item={item} index={i} dark={dark} />
                                ))}
                            </div>

                            {/* Contact form */}
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
                                    transition: "background 0.35s, border-color 0.35s",
                                }}
                            >
                                {/* Label */}
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                                    <motion.div
                                        initial={{ scaleX: 0, originX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4 }}
                                        style={{
                                            width: 24,
                                            height: 3,
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
                                        Get in Touch
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
                                        marginBottom: 8,
                                        transition: "color 0.35s",
                                    }}
                                >
                                    Let's work together.
                                </h3>

                                <p
                                    style={{
                                        fontSize: "clamp(0.84rem, 1.4vw, 0.92rem)",
                                        color: muted,
                                        lineHeight: 1.7,
                                        marginBottom: 24,
                                    }}
                                >
                                    Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how I can help bring your ideas to life.
                                </p>

                                <ContactForm dark={dark} />
                            </motion.div>
                        </div>

                        {/* Right: FAQ & Social */}
                        <div>
                            {/* Social links */}
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
                                    marginBottom: "clamp(24px, 4vw, 32px)",
                                    transition: "background 0.35s, border-color 0.35s",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                                    <motion.div
                                        initial={{ scaleX: 0, originX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4 }}
                                        style={{
                                            width: 24,
                                            height: 3,
                                            borderRadius: 99,
                                            background: "#4caf7d",
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontFamily: "'Syne', sans-serif",
                                            fontSize: "0.7rem",
                                            fontWeight: 700,
                                            letterSpacing: "0.1em",
                                            color: "#4caf7d",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        Connect
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
                                        marginBottom: 8,
                                        transition: "color 0.35s",
                                    }}
                                >
                                    Follow me on social
                                </h3>

                                <p
                                    style={{
                                        fontSize: "clamp(0.84rem, 1.4vw, 0.92rem)",
                                        color: muted,
                                        lineHeight: 1.7,
                                        marginBottom: 20,
                                    }}
                                >
                                    Stay updated with my latest projects and thoughts.
                                </p>

                                <div className="social-grid">
                                    {SOCIALS.map((item, i) => (
                                        <SocialLink key={item.label} item={item} index={i} dark={dark} />
                                    ))}
                                </div>
                            </motion.div>

                            {/* FAQ */}
                            <motion.div
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    background: cardBg,
                                    border: `1px solid ${border}`,
                                    borderRadius: 20,
                                    padding: "clamp(22px, 3.5vw, 36px)",
                                    transition: "background 0.35s, border-color 0.35s",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                                    <motion.div
                                        initial={{ scaleX: 0, originX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4 }}
                                        style={{
                                            width: 24,
                                            height: 3,
                                            borderRadius: 99,
                                            background: "#f5a623",
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontFamily: "'Syne', sans-serif",
                                            fontSize: "0.7rem",
                                            fontWeight: 700,
                                            letterSpacing: "0.1em",
                                            color: "#f5a623",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        FAQ
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
                                        marginBottom: 20,
                                        transition: "color 0.35s",
                                    }}
                                >
                                    Common questions
                                </h3>

                                <div>
                                    {FAQS.map((item, i) => (
                                        <FAQItem key={i} item={item} index={i} dark={dark} />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

