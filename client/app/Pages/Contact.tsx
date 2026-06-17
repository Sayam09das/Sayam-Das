"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    motion,
    useInView,
    useMotionValue,
    useSpring,
    AnimatePresence,
} from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Send,
    Clock,
    CheckCircle,
} from "lucide-react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ──────────────────────────────────────────────────────────────────────
const CONTACT_INFO = [
    { icon: Mail, label: "Email", value: "dassayam2021@gmail.com", accent: "#7c6fcd" },
    { icon: Phone, label: "Phone", value: "+91 9635825787", accent: "#4caf7d" },
    { icon: MapPin, label: "Location", value: "Kolkata, India", accent: "#f5a623" },
    { icon: Clock, label: "Availability", value: "Open to Internship / Freelance", accent: "#e535ab" },
];

const SOCIALS = [
    { icon: Github, href: "https://github.com/Sayam09das", label: "GitHub", color: dark => dark ? "#f0efea" : "#111110" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sayam-das-43a703287/", label: "LinkedIn", color: () => "#0077b5" },
    { icon: Mail, href: "mailto:dassayam2021@gmail.com", label: "Email", color: () => "#7c6fcd" },
];

const FAQS = [
    {
        question: "What technologies do you work with?",
        answer: "I primarily work with React, Next.js, TypeScript, Node.js, and MongoDB for full-stack development. I also use Python for machine learning and data-related projects.",
    },
    {
        question: "What type of projects do you build?",
        answer: "I build modern web applications, developer tools, and machine learning projects. My focus is on fast, scalable, and visually engaging applications.",
    },
    {
        question: "Are you open to internships or collaborations?",
        answer: "Yes! I'm currently open to internships, research collaborations, and freelance opportunities where I can contribute to real-world products and learn from experienced teams.",
    },
    {
        question: "How can someone contact you?",
        answer: "You can reach me through email or connect with me on GitHub and LinkedIn. I usually respond within 24 hours.",
    },
];

// ─── Magnetic hook ─────────────────────────────────────────────────────────────
function useMagnetic(strength = 0.28) {
    const ref = useRef<HTMLElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 200, damping: 20 });
    const sy = useSpring(my, { stiffness: 200, damping: 20 });

    const onMove = useCallback((e: MouseEvent) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - (r.left + r.width / 2)) * strength);
        my.set((e.clientY - (r.top + r.height / 2)) * strength);
    }, [strength, mx, my]);

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

// ─── Animated input field ──────────────────────────────────────────────────────
function AnimatedInput({
    tag = "input",
    dark,
    label,
    ...props
}: {
    tag?: "input" | "textarea";
    dark: boolean;
    label: string;
    [key: string]: any;
}) {
    const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const [focused, setFocused] = useState(false);

    // GSAP: focus glow ring
    useEffect(() => {
        const el = glowRef.current;
        if (!el) return;
        gsap.to(el, {
            opacity: focused ? 1 : 0,
            duration: 0.22,
            ease: "power2.out",
        });
    }, [focused]);

    const Tag = tag as any;

    return (
        <div style={{ position: "relative" }}>
            <label
                style={{
                    display: "block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: focused
                        ? "#7c6fcd"
                        : dark ? "rgba(240,239,234,0.48)" : "rgba(0,0,0,0.48)",
                    marginBottom: 7,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    transition: "color 0.2s",
                }}
            >
                {label}
            </label>

            {/* Glow ring — GSAP animates opacity */}
            <div
                ref={glowRef}
                style={{
                    position: "absolute",
                    inset: -2,
                    borderRadius: 14,
                    border: "2px solid #7c6fcd55",
                    boxShadow: "0 0 0 3px rgba(124,111,205,0.14)",
                    pointerEvents: "none",
                    zIndex: 1,
                    opacity: 0,
                    top: "26px", // offset for label height
                }}
            />

            <Tag
                ref={inputRef}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    width: "100%",
                    padding: "13px 15px",
                    borderRadius: 12,
                    border: `1px solid ${focused
                        ? "#7c6fcd66"
                        : dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                    background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                    color: dark ? "#f0efea" : "#111110",
                    fontSize: "0.9rem",
                    outline: "none",
                    resize: tag === "textarea" ? "vertical" : undefined,
                    minHeight: tag === "textarea" ? 120 : undefined,
                    fontFamily: "inherit",
                    transition: "border-color 0.2s, background 0.35s",
                    position: "relative",
                    zIndex: 0,
                }}
                {...props}
            />
        </div>
    );
}

// ─── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm({ dark, cardBg, border, text, muted }: {
    dark: boolean;
    cardBg: string;
    border: string;
    text: string;
    muted: string;
}) {
    const formRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);

    const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    // GSAP: form card entrance
    useEffect(() => {
        const el = formRef.current;
        if (!el) return;
        gsap.fromTo(el,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
            }
        );
    }, []);

    // GSAP: label bar
    useEffect(() => {
        const el = labelRef.current;
        if (!el) return;
        gsap.fromTo(el,
            { scaleX: 0, transformOrigin: "left center" },
            {
                scaleX: 1,
                duration: 0.45,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
            }
        );
    }, []);

    // GSAP: shimmer on submit button hover
    useEffect(() => {
        const btn = btnRef.current;
        if (!btn) return;
        const shimmer = btn.querySelector(".contact-btn-shimmer") as HTMLElement;
        if (!shimmer) return;

        const onEnter = () => {
            gsap.fromTo(shimmer,
                { x: "-110%", opacity: 1 },
                { x: "110%", opacity: 1, duration: 0.55, ease: "power2.inOut" }
            );
        };
        btn.addEventListener("mouseenter", onEnter);
        return () => btn.removeEventListener("mouseenter", onEnter);
    }, [isSubmitting, isSubmitted]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!captchaToken) { alert("Please verify you are not a robot."); return; }
        setIsSubmitting(true);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API}/api/contact`,
                { ...formState, captchaToken },
                { timeout: 30000, headers: { "Content-Type": "application/json" } }
            );
            if (response.data.success) {
                setIsSubmitted(true);
                setFormState({ name: "", email: "", subject: "", message: "" });
            } else {
                alert(response.data.message || "Failed to send message.");
            }
        } catch (error: any) {
            const msg = error.code === "ECONNABORTED"
                ? "Request timed out. Please try again."
                : error.response?.data?.message || "Network error. Please try again.";
            alert(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                style={{
                    textAlign: "center",
                    padding: "48px 24px",
                    background: cardBg,
                    borderRadius: 20,
                    border: `1px solid ${border}`,
                }}
            >
                <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                >
                    <CheckCircle size={64} color="#22c55e" strokeWidth={1.5} />
                </motion.div>
                <motion.h3
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 800,
                        fontSize: "1.5rem",
                        color: text,
                        marginTop: 20,
                        marginBottom: 8,
                        transition: "color 0.35s",
                    }}
                >
                    Message Sent!
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    style={{ color: muted, fontSize: "0.92rem", lineHeight: 1.6 }}
                >
                    Thank you for reaching out. I'll get back to you within 24 hours.
                </motion.p>
                <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setIsSubmitted(false)}
                    style={{
                        marginTop: 24,
                        padding: "11px 24px",
                        borderRadius: 9999,
                        background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                        border: `1px solid ${border}`,
                        color: text,
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "color 0.35s, background 0.35s",
                    }}
                >
                    Send Another Message
                </motion.button>
            </motion.div>
        );
    }

    return (
        <div ref={formRef} style={{ opacity: 0 }}>
            {/* Card */}
            <div
                style={{
                    background: cardBg,
                    border: `1px solid ${border}`,
                    borderRadius: 20,
                    padding: "clamp(22px, 3.5vw, 36px)",
                    transition: "background 0.35s, border-color 0.35s",
                }}
            >
                {/* Label row */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                    <div
                        ref={labelRef}
                        style={{ width: 24, height: 3, borderRadius: 99, background: "#7c6fcd", flexShrink: 0 }}
                    />
                    <span style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: "0.7rem", fontWeight: 700,
                        letterSpacing: "0.1em", color: "#7c6fcd",
                        textTransform: "uppercase",
                    }}>
                        Get in Touch
                    </span>
                </div>

                <h3 style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
                    letterSpacing: "-0.028em", color: text,
                    lineHeight: 1.25, marginBottom: 8,
                    transition: "color 0.35s",
                }}>
                    Let's work together.
                </h3>
                <p style={{
                    fontSize: "clamp(0.84rem, 1.4vw, 0.9rem)",
                    color: muted, lineHeight: 1.72, marginBottom: 24,
                }}>
                    Have a project in mind? Send me a message and let's discuss how I can help bring your ideas to life.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Name + Email row */}
                    <div className="contact-form-row" style={{ marginBottom: 16 }}>
                        <AnimatedInput
                            dark={dark} label="Name"
                            type="text" required placeholder="John Doe"
                            value={formState.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormState({ ...formState, name: e.target.value })}
                        />
                        <AnimatedInput
                            dark={dark} label="Email"
                            type="email" required placeholder="john@example.com"
                            value={formState.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormState({ ...formState, email: e.target.value })}
                        />
                    </div>

                    {/* Subject */}
                    <div style={{ marginBottom: 16 }}>
                        <AnimatedInput
                            dark={dark} label="Subject"
                            type="text" required placeholder="Project Inquiry"
                            value={formState.subject}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormState({ ...formState, subject: e.target.value })}
                        />
                    </div>

                    {/* Message */}
                    <div style={{ marginBottom: 20 }}>
                        <AnimatedInput
                            tag="textarea"
                            dark={dark} label="Message"
                            required rows={5} placeholder="Tell me about your project..."
                            value={formState.message}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                setFormState({ ...formState, message: e.target.value })}
                        />
                    </div>

                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={(token: string | null) => setCaptchaToken(token)}
                        style={{ marginBottom: 20 }}
                    />

                    {/* Submit */}
                    <motion.button
                        ref={btnRef}
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.02, y: -1 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                        transition={{ type: "spring", stiffness: 340, damping: 22 }}
                        style={{
                            width: "100%",
                            padding: "15px 24px",
                            borderRadius: 12,
                            background: dark ? "#f0efea" : "#111110",
                            color: dark ? "#111110" : "#f0efea",
                            border: "none",
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            letterSpacing: "0.02em",
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                            opacity: isSubmitting ? 0.72 : 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 9,
                            position: "relative",
                            overflow: "hidden",
                            transition: "background 0.35s, color 0.35s, opacity 0.2s",
                        }}
                    >
                        {/* GSAP shimmer */}
                        <span
                            className="contact-btn-shimmer"
                            style={{
                                position: "absolute",
                                top: 0, bottom: 0,
                                width: "40%",
                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                                pointerEvents: "none",
                                transform: "translateX(-110%)",
                                zIndex: 1,
                            }}
                        />
                        {isSubmitting ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        width: 18, height: 18,
                                        borderRadius: "50%",
                                        border: "2.5px solid transparent",
                                        borderTopColor: "currentColor",
                                    }}
                                />
                                Sending…
                            </>
                        ) : (
                            <>
                                <Send size={17} strokeWidth={2.2} />
                                Send Message
                            </>
                        )}
                    </motion.button>
                </form>
            </div>
        </div>
    );
}

// ─── Contact info card ─────────────────────────────────────────────────────────
function ContactCard({ item, index, dark, border }: {
    item: (typeof CONTACT_INFO)[0];
    index: number;
    dark: boolean;
    border: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const Icon = item.icon;

    // GSAP: staggered entrance
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        gsap.fromTo(el,
            { opacity: 0, y: 24, scale: 0.94 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.65,
                delay: index * 0.09,
                ease: "back.out(1.4)",
                scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
            }
        );
    }, [index]);

    return (
        <motion.div
            ref={ref}
            style={{
                opacity: 0, // GSAP owns entrance
                background: dark ? "#1a1a18" : "#ffffff",
                border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
                borderRadius: 16,
                padding: "clamp(15px, 2.5vw, 22px)",
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                cursor: "default",
                transition: "background 0.35s, border-color 0.35s",
                willChange: "transform",
            }}
            whileHover={{
                y: -5,
                scale: 1.03,
                boxShadow: dark
                    ? `0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px ${item.accent}44`
                    : `0 16px 40px rgba(0,0,0,0.1), 0 0 0 1px ${item.accent}44`,
                transition: { type: "spring", stiffness: 320, damping: 22 },
            }}
        >
            <motion.div
                style={{
                    width: 42, height: 42,
                    borderRadius: 12,
                    background: `${item.accent}18`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                }}
                whileHover={{ scale: 1.12, rotate: 6 }}
                transition={{ type: "spring", stiffness: 340, damping: 20 }}
            >
                <Icon size={18} color={item.accent} strokeWidth={2} />
            </motion.div>
            <div style={{ minWidth: 0 }}>
                <div style={{
                    fontSize: "0.68rem", fontWeight: 700,
                    color: item.accent, textTransform: "uppercase",
                    letterSpacing: "0.07em", marginBottom: 4,
                }}>
                    {item.label}
                </div>
                <div style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "0.88rem", fontWeight: 600,
                    color: dark ? "#f0efea" : "#111110",
                    transition: "color 0.35s",
                    wordBreak: "break-word",
                }}>
                    {item.value}
                </div>
            </div>
        </motion.div>
    );
}

// ─── Social link ───────────────────────────────────────────────────────────────
function SocialLink({ item, index, dark, border }: {
    item: typeof SOCIALS[0];
    index: number;
    dark: boolean;
    border: string;
}) {
    const { ref: magRef, sx, sy } = useMagnetic(0.3);
    const inView = useInView(magRef as React.RefObject<HTMLElement>, { once: true, margin: "-30px" });
    const Icon = item.icon;
    const color = item.color(dark);

    return (
        <motion.a
            ref={magRef as React.Ref<HTMLAnchorElement>}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            style={{
                x: sx, y: sy,
                display: "flex", alignItems: "center", gap: 10,
                padding: "13px 18px",
                background: dark ? "#1a1a18" : "#ffffff",
                border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"}`,
                borderRadius: 12,
                textDecoration: "none",
                boxShadow: dark ? "0 4px 16px rgba(0,0,0,0.24)" : "0 4px 16px rgba(0,0,0,0.06)",
                transition: "background 0.35s, border-color 0.35s",
                opacity: 0, // GSAP entrance
                cursor: "pointer",
            } as React.CSSProperties}
            initial={false}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
            <motion.div
                whileHover={{ rotate: 8, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
                <Icon size={20} color={color} strokeWidth={1.8} />
            </motion.div>
            <span style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "0.85rem", fontWeight: 600,
                color: dark ? "#f0efea" : "#111110",
                transition: "color 0.35s",
            }}>
                {item.label}
            </span>
        </motion.a>
    );
}

// ─── FAQ item ──────────────────────────────────────────────────────────────────
function FAQItem({ item, index, dark, border, text, muted }: {
    item: typeof FAQS[0];
    index: number;
    dark: boolean;
    border: string;
    text: string;
    muted: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // GSAP: staggered entrance
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        gsap.fromTo(el,
            { opacity: 0, x: -20 },
            {
                opacity: 1, x: 0,
                duration: 0.55,
                delay: index * 0.07,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
            }
        );
    }, [index]);

    return (
        <div
            ref={ref}
            style={{
                opacity: 0, // GSAP
                borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
                paddingBottom: 18,
                marginBottom: 18,
            }}
        >
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{
                    width: "100%",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "none", border: "none", cursor: "pointer",
                    padding: "6px 0", textAlign: "left",
                }}
            >
                <span style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "0.93rem", fontWeight: 600,
                    color: text, transition: "color 0.35s",
                    paddingRight: 12, lineHeight: 1.4,
                }}>
                    {item.question}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 26, height: 26,
                        borderRadius: "50%",
                        background: isOpen
                            ? "#7c6fcd22"
                            : dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                        color: isOpen ? "#7c6fcd" : dark ? "rgba(240,239,234,0.4)" : "rgba(0,0,0,0.4)",
                        flexShrink: 0,
                        fontSize: "1.1rem",
                        lineHeight: 1,
                        fontWeight: 400,
                        transition: "background 0.2s, color 0.2s",
                    }}
                >
                    +
                </motion.span>
            </motion.button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                    >
                        <p style={{
                            paddingTop: 11,
                            fontSize: "0.87rem",
                            color: muted,
                            lineHeight: 1.72,
                        }}>
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const headingLineL = useRef<HTMLDivElement>(null);
    const headingLineR = useRef<HTMLDivElement>(null);
    const headingTextRef = useRef<HTMLHeadingElement>(null);
    const socialCardRef = useRef<HTMLDivElement>(null);
    const faqCardRef = useRef<HTMLDivElement>(null);
    const socialLinksRef = useRef<HTMLDivElement>(null);

    const { theme } = useTheme();
    const dark = theme === "dark";

    const bg = dark ? "#0d0d0c" : "#ececea";
    const cardBg = dark ? "#141412" : "#f8f7f4";
    const text = dark ? "#f0efea" : "#111110";
    const muted = dark ? "rgba(240,239,234,0.44)" : "rgba(0,0,0,0.44)";
    const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";

    // GSAP: heading lines + text
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Left line
            gsap.fromTo(headingLineL.current,
                { scaleX: 0, transformOrigin: "right center" },
                {
                    scaleX: 1, duration: 0.85, ease: "power3.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" },
                }
            );
            // Right line
            gsap.fromTo(headingLineR.current,
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1, duration: 0.85, ease: "power3.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" },
                }
            );
            // Heading text
            gsap.fromTo(headingTextRef.current,
                { opacity: 0, y: 20, skewX: 4 },
                {
                    opacity: 1, y: 0, skewX: 0, duration: 0.65, ease: "power3.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" },
                }
            );
            // Right col cards
            gsap.fromTo(socialCardRef.current,
                { opacity: 0, y: 36 },
                {
                    opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
                    scrollTrigger: { trigger: socialCardRef.current, start: "top 88%", toggleActions: "play none none none" },
                }
            );
            gsap.fromTo(faqCardRef.current,
                { opacity: 0, y: 36 },
                {
                    opacity: 1, y: 0, duration: 0.75, delay: 0.1, ease: "power3.out",
                    scrollTrigger: { trigger: faqCardRef.current, start: "top 88%", toggleActions: "play none none none" },
                }
            );
            // Social links stagger
            const links = socialLinksRef.current?.querySelectorAll(".contact-social-link");
            if (links) {
                gsap.fromTo(links,
                    { opacity: 0, y: 18 },
                    {
                        opacity: 1, y: 0, stagger: 0.09, duration: 0.5, ease: "power3.out",
                        scrollTrigger: { trigger: socialLinksRef.current, start: "top 90%", toggleActions: "play none none none" },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800;12..96,900&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Layout ── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 4.5vw, 52px);
          align-items: start;
        }
        .contact-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(10px, 1.8vw, 16px);
          margin-bottom: clamp(20px, 3.5vw, 30px);
        }
        .contact-social-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        /* ── Heading lines ── */
        .contact-heading-line { flex: 1; height: 1px; }

        /* ── Social link opacity reset (GSAP sets it) ── */
        .contact-social-link { opacity: 0; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 820px) {
          .contact-social-grid { grid-template-columns: 1fr 1fr; }
          .contact-info-grid   { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 640px) {
          .contact-form-row    { grid-template-columns: 1fr; }
          .contact-social-grid { grid-template-columns: 1fr; }
          .contact-info-grid   { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .contact-info-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 360px) {
          .contact-grid { gap: 20px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .contact-heading-line,
          .contact-social-link {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
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
                            display: "flex", alignItems: "center", gap: 20,
                            marginBottom: "clamp(36px, 6vw, 64px)",
                        }}
                    >
                        <div
                            ref={headingLineL}
                            className="contact-heading-line"
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
                            Contact
                        </h2>
                        <div
                            ref={headingLineR}
                            className="contact-heading-line"
                            style={{ background: border }}
                        />
                    </div>

                    {/* ── Main grid ── */}
                    <div className="contact-grid">

                        {/* LEFT: contact cards + form */}
                        <div>
                            <div className="contact-info-grid">
                                {CONTACT_INFO.map((item, i) => (
                                    <ContactCard
                                        key={item.label}
                                        item={item} index={i}
                                        dark={dark} border={border}
                                    />
                                ))}
                            </div>

                            <ContactForm
                                dark={dark}
                                cardBg={cardBg} border={border}
                                text={text} muted={muted}
                            />
                        </div>

                        {/* RIGHT: social + FAQ */}
                        <div>
                            {/* Social card */}
                            <div
                                ref={socialCardRef}
                                style={{
                                    opacity: 0, // GSAP
                                    background: cardBg,
                                    border: `1px solid ${border}`,
                                    borderRadius: 20,
                                    padding: "clamp(22px, 3.5vw, 36px)",
                                    marginBottom: "clamp(20px, 3.5vw, 28px)",
                                    transition: "background 0.35s, border-color 0.35s",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                                    <motion.div
                                        initial={{ scaleX: 0, transformOrigin: "left center" }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4 }}
                                        style={{ width: 24, height: 3, borderRadius: 99, background: "#4caf7d" }}
                                    />
                                    <span style={{
                                        fontFamily: "'Bricolage Grotesque', sans-serif",
                                        fontSize: "0.7rem", fontWeight: 700,
                                        letterSpacing: "0.1em", color: "#4caf7d",
                                        textTransform: "uppercase",
                                    }}>
                                        Connect
                                    </span>
                                </div>
                                <h3 style={{
                                    fontFamily: "'Bricolage Grotesque', sans-serif",
                                    fontWeight: 800,
                                    fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)",
                                    letterSpacing: "-0.028em", color: text,
                                    lineHeight: 1.25, marginBottom: 8,
                                    transition: "color 0.35s",
                                }}>
                                    Follow me on social
                                </h3>
                                <p style={{
                                    fontSize: "clamp(0.84rem, 1.4vw, 0.9rem)",
                                    color: muted, lineHeight: 1.7, marginBottom: 20,
                                }}>
                                    Stay updated with my latest projects and thoughts.
                                </p>
                                <div ref={socialLinksRef} className="contact-social-grid">
                                    {SOCIALS.map((item, i) => (
                                        <div key={item.label} className="contact-social-link">
                                            <SocialLink
                                                item={item} index={i}
                                                dark={dark} border={border}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ card */}
                            <div
                                ref={faqCardRef}
                                style={{
                                    opacity: 0, // GSAP
                                    background: cardBg,
                                    border: `1px solid ${border}`,
                                    borderRadius: 20,
                                    padding: "clamp(22px, 3.5vw, 36px)",
                                    transition: "background 0.35s, border-color 0.35s",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                                    <motion.div
                                        initial={{ scaleX: 0, transformOrigin: "left center" }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4 }}
                                        style={{ width: 24, height: 3, borderRadius: 99, background: "#f5a623" }}
                                    />
                                    <span style={{
                                        fontFamily: "'Bricolage Grotesque', sans-serif",
                                        fontSize: "0.7rem", fontWeight: 700,
                                        letterSpacing: "0.1em", color: "#f5a623",
                                        textTransform: "uppercase",
                                    }}>
                                        FAQ
                                    </span>
                                </div>
                                <h3 style={{
                                    fontFamily: "'Bricolage Grotesque', sans-serif",
                                    fontWeight: 800,
                                    fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)",
                                    letterSpacing: "-0.028em", color: text,
                                    lineHeight: 1.25, marginBottom: 20,
                                    transition: "color 0.35s",
                                }}>
                                    Common questions
                                </h3>
                                <div>
                                    {FAQS.map((item, i) => (
                                        <FAQItem
                                            key={i}
                                            item={item} index={i}
                                            dark={dark} border={border}
                                            text={text} muted={muted}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}