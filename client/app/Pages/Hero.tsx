"use client";

import { useEffect, useRef, useState } from "react";
import { Instagram, Github, Mail, ChevronDown } from "lucide-react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { useTheme } from "../context/ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────
const SOCIAL = [
  { icon: Instagram, href: "https://www.instagram.com/sayamdas9124/", label: "Instagram" },
  { icon: Github, href: "https://github.com/Sayam09das", label: "GitHub" },
  { icon: Mail, href: "mailto:dassayam2021@gmail.com", label: "Email" },
];

const NAV_DOTS = ["00", "01", "02", "03", "04"];

// Split name into letters for stagger animation
const NAME = "Sayam Das";

// ─── Magnetic hook (for bubble + social icons) ────────────────────────────────
function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 18 });
  const sy = useSpring(my, { stiffness: 180, damping: 18 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - (r.left + r.width / 2)) * strength);
      my.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => { mx.set(0); my.set(0); };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength, mx, my]);

  return { ref, sx, sy };
}

export default function HeroSection() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  // Refs for GSAP
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const growLineRef1 = useRef<HTMLDivElement>(null);
  const growLineRef2 = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgBoxRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Magnetic for bubble
  const { ref: magBubbleRef, sx: bx, sy: by } = useMagnetic(0.22);

  // ── GSAP master entrance timeline ─────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setReady(true),
      });

      // 1. Rail lines draw downward
      tl.fromTo(
        [leftLineRef.current, rightLineRef.current],
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.7, stagger: 0.06 },
        0
      );

      // 2. Image box scales in
      tl.fromTo(
        imgBoxRef.current,
        { opacity: 0, scale: 0.88, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(1.4)" },
        0.15
      );

      // 3. Bubble pops in
      tl.fromTo(
        bubbleRef.current,
        { opacity: 0, scale: 0.4, rotate: -18 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.55, ease: "back.out(2)" },
        0.55
      );

      // 4. Name letters stagger up
      const letters = nameRef.current?.querySelectorAll(".hero-letter");
      if (letters) {
        tl.fromTo(
          letters,
          { opacity: 0, y: 28, skewX: 6 },
          { opacity: 1, y: 0, skewX: 0, duration: 0.6, stagger: 0.04, ease: "power3.out" },
          0.45
        );
      }

      // 5. Sub + CTA fade up
      tl.fromTo(
        [subRef.current, ctaRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
        0.75
      );

      // 6. Social icons stagger in from left
      const socialLinks = socialRef.current?.querySelectorAll(".hero-social-link");
      if (socialLinks) {
        tl.fromTo(
          socialLinks,
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, duration: 0.45, stagger: 0.09 },
          0.3
        );
      }

      // 7. Nav dots stagger in from right
      const dots = dotsRef.current?.querySelectorAll(".hero-dot");
      if (dots) {
        tl.fromTo(
          dots,
          { opacity: 0, x: 14 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.07 },
          0.3
        );
      }

      // 8. Grow lines expand
      tl.fromTo(
        [growLineRef1.current, growLineRef2.current],
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 1, ease: "power2.out" },
        0.5
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // ── GSAP scroll parallax on image ─────────────────────────────────────────
  useEffect(() => {
    if (!imgWrapRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        gsap.to(imgWrapRef.current, {
          y: self.progress * 55,
          duration: 0.1,
          overwrite: "auto",
        });
      },
    });
    return () => trigger.kill();
  }, []);

  // ── GSAP floating bubble ─────────────────────────────────────────────────
  useEffect(() => {
    if (!bubbleRef.current) return;
    gsap.to(bubbleRef.current, {
      y: -10,
      rotate: 2,
      duration: 2.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── CSS Variables ── */
        :root {
          --bg:         #f8f9fa;
          --bg2:        #e9ecef;
          --text:       #000000;
          --muted:      #495057;
          --border:     rgba(0,0,0,0.09);
          --line:       rgba(0,0,0,0.12);
          --btn-bg:     #181816;
          --btn-text:   #f4f3ef;
          --bubble-bg:  #ffffff;
          --shadow:     0 8px 36px rgba(0,0,0,0.11);
          --img-radius: 22px;
        }
        html.dark {
          --bg:         #121212;
          --bg2:        #1e1e1e;
          --text:       #ffffff;
          --muted:      #b0b0b0;
          --border:     rgba(255,255,255,0.07);
          --line:       rgba(255,255,255,0.09);
          --btn-bg:     #efede7;
          --btn-text:   #0e0e0d;
          --bubble-bg:  #232320;
          --shadow:     0 8px 36px rgba(0,0,0,0.45);
        }

        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }

        /* ── Wrapper ── */
        .hero-wrapper {
          position: relative;
          width: 100%;
          min-height: calc(100vh - 80px);
          background-color: var(--bg);
          background-image: radial-gradient(circle, ${dark ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.08)"} 1.3px, transparent 1.3px);
          background-size: 26px 26px;
          display: grid;
          grid-template-columns: 56px 1fr 56px;
          grid-template-rows: 1fr auto;
          overflow: hidden;
          transition: background-color 0.35s, color 0.35s;
          font-family: 'DM Sans', sans-serif;
          color: var(--text);
        }

        /* ── Rails ── */
        .hero-rail {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 42px;
          grid-row: 1 / 3;
        }
        .hero-rail--left  { grid-column: 1; }
        .hero-rail--right { grid-column: 3; }

        .hero-rail__line {
          width: 1px;
          height: 52px;
          background: var(--line);
          flex-shrink: 0;
          transform-origin: top center;
        }
        .hero-rail__line--grow {
          width: 1px;
          flex: 1;
          background: var(--line);
          margin-top: 10px;
          transform-origin: top center;
        }

        /* ── Social icons ── */
        .hero-social {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-top: 10px;
        }
        .hero-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: var(--muted);
          transition: color 0.18s, background 0.18s;
          opacity: 0; /* GSAP animates in */
        }
        .hero-social-link:hover {
          color: var(--text);
          background: var(--bg2);
        }

        /* ── Image area ── */
        .hero-image-area {
          grid-column: 2;
          grid-row: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-top: 52px;
        }
        .hero-image-wrap {
          position: relative;
          display: inline-block;
          will-change: transform;
        }
        .hero-img-box {
          width: clamp(155px, 36vw, 310px);
          aspect-ratio: 3 / 4;
          border-radius: var(--img-radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          opacity: 0; /* GSAP animates in */
        }
        .hero-img-box img,
        .hero-img-box > div {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          display: block;
        }

        /* ── Bubble ── */
        .hero-bubble {
          position: absolute;
          top: -28px;
          right: -18px;
          background: var(--bubble-bg);
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 10px 18px;
          white-space: nowrap;
          z-index: 5;
          opacity: 0; /* GSAP animates in */
          cursor: default;
          will-change: transform;
        }
        .hero-bubble__text {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* ── Text block ── */
        .hero-text-block {
          grid-column: 2;
          grid-row: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px 18px 40px;
        }

        /* ── Name: letters wrapped for stagger ── */
        .hero-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(30px, 6.5vw, 72px);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.035em;
          color: var(--text);
          margin-bottom: 12px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0;
          overflow: visible;
        }
        .hero-letter {
          display: inline-block;
          opacity: 0; /* GSAP stagger */
          will-change: transform;
          white-space: pre; /* preserve space char */
        }

        /* ── Sub ── */
        .hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(13px, 1.55vw, 15px);
          font-weight: 400;
          color: var(--muted);
          max-width: 490px;
          line-height: 1.7;
          margin-bottom: 24px;
          opacity: 0; /* GSAP */
        }

        /* ── CTA ── */
        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          max-width: 430px;
          opacity: 0; /* GSAP */
        }
        .hero-cta-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          border-radius: 9999px;
          background: var(--btn-bg);
          color: var(--btn-text);
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(13px, 1.6vw, 15px);
          font-weight: 700;
          letter-spacing: -0.01em;
          border: none;
          cursor: pointer;
          outline: none;
          transition: opacity 0.18s, transform 0.18s;
          position: relative;
          overflow: hidden;
        }
        .hero-cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.08);
          opacity: 0;
          transition: opacity 0.18s;
          border-radius: inherit;
        }
        .hero-cta-btn:hover::after  { opacity: 1; }
        .hero-cta-btn:hover         { transform: translateY(-2px); }
        .hero-cta-btn:active        { transform: translateY(0); }

        .hero-chevron-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--bg2);
          border: 1px solid var(--border);
          color: var(--muted);
          cursor: pointer;
          outline: none;
          flex-shrink: 0;
          transition: background 0.18s, color 0.18s, transform 0.18s;
        }
        .hero-chevron-btn:hover {
          background: var(--btn-bg);
          color: var(--btn-text);
          transform: translateY(3px);
        }

        /* ── Nav dots ── */
        .hero-page-dots {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          margin-top: 10px;
        }
        .hero-dot {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--muted);
          opacity: 0; /* GSAP */
          cursor: pointer;
          user-select: none;
          transition: color 0.18s, opacity 0.18s, transform 0.18s;
        }
        .hero-dot:hover,
        .hero-dot--active {
          color: var(--text);
          opacity: 1 !important;
          transform: scale(1.12);
        }

        /* ── Responsive ── */

        /* Tablet / large mobile */
        @media (max-width: 768px) {
          .hero-wrapper          { grid-template-columns: 48px 1fr 48px; }
          .hero-rail             { padding-top: 32px; }
          .hero-rail__line       { height: 40px; }
          .hero-image-area       { padding-top: 36px; }
          .hero-text-block       { padding: 20px 14px 36px; }
          .hero-bubble           { right: -10px; top: -18px; padding: 8px 14px; }
          .hero-bubble__text     { font-size: 18px; }
          .hero-cta-row          { max-width: 100%; }
        }

        /* Small mobile */
        @media (max-width: 540px) {
          .hero-wrapper          { grid-template-columns: 40px 1fr 40px; min-height: calc(100svh - 80px); }
          .hero-rail             { padding-top: 24px; }
          .hero-rail__line       { height: 32px; }
          .hero-social-link      { width: 30px; height: 30px; }
          .hero-img-box          { border-radius: 16px; }
          .hero-bubble           { right: -6px; top: -14px; padding: 7px 11px; border-radius: 14px; }
          .hero-bubble__text     { font-size: 15px; }
          .hero-text-block       { padding: 16px 10px 28px; }
          .hero-cta-btn          { padding: 13px 20px; }
          .hero-chevron-btn      { width: 38px; height: 38px; }
          .hero-page-dots        { gap: 13px; }
          .hero-dot              { font-size: 9px; }
        }

        /* Extra-small */
        @media (max-width: 400px) {
          .hero-wrapper          { grid-template-columns: 34px 1fr 34px; }
          .hero-social-link      { width: 26px; height: 26px; }
          .hero-cta-btn          { padding: 11px 14px; font-size: 12px; }
          .hero-chevron-btn      { width: 34px; height: 34px; }
          .hero-page-dots        { gap: 10px; }
        }

        /* Very tiny */
        @media (max-width: 320px) {
          .hero-wrapper          { grid-template-columns: 28px 1fr 28px; }
          .hero-bubble__text     { font-size: 13px; }
          .hero-bubble           { padding: 5px 9px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-letter, .hero-img-box, .hero-bubble,
          .hero-sub, .hero-cta-row, .hero-social-link, .hero-dot {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div
        ref={wrapperRef}
        className="hero-wrapper"
        style={{ marginTop: "80px" }}
      >

        {/* ── LEFT RAIL ── */}
        <div className="hero-rail hero-rail--left">
          <div ref={leftLineRef} className="hero-rail__line" />
          <div ref={socialRef} className="hero-social">
            {SOCIAL.map(({ icon: Icon, href, label }) => {
              // Framer Motion magnetic wrapper per icon
              const MagIcon = () => {
                const { ref, sx, sy } = useMagnetic(0.38);
                return (
                  <motion.a
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="hero-social-link"
                    style={{ x: sx, y: sy }}
                    whileHover={{ scale: 1.22 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  >
                    <Icon size={17} strokeWidth={1.8} />
                  </motion.a>
                );
              };
              return <MagIcon key={label} />;
            })}
          </div>
          <div ref={growLineRef1} className="hero-rail__line--grow" />
        </div>

        {/* ── IMAGE ── */}
        <div className="hero-image-area">
          <div ref={imgWrapRef} className="hero-image-wrap">

            {/* Bubble — Framer handles subtle mouse drift, GSAP handles float + entrance */}
            <motion.div
              ref={(el) => {
                (bubbleRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
                (magBubbleRef as React.MutableRefObject<HTMLElement | null>).current = el as HTMLElement;
              }}
              className="hero-bubble"
              style={{ x: bx, y: by }}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="hero-bubble__text">
                hello 👋
              </div>
            </motion.div>

            <div ref={imgBoxRef} className="hero-img-box">
              <CldImage
                src="Sayam Das"
                width={500}
                height={500}
                crop={{ type: "auto", source: true }}
                alt="Profile photo of Sayam Das"
              />
            </div>
          </div>
        </div>

        {/* ── TEXT BLOCK ── */}
        <div ref={textBlockRef} className="hero-text-block">

          {/* Name — each character wrapped for GSAP stagger */}
          <h1 ref={nameRef} className="hero-name" aria-label={NAME}>
            {NAME.split("").map((char, i) => (
              <span
                key={i}
                className="hero-letter"
                aria-hidden="true"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <p ref={subRef} className="hero-sub">
            Full-Stack Developer specializing in React, Next.js, and TypeScript,
            with experience in Python and Machine Learning. Passionate about
            building scalable web applications, AI-powered tools, and modern
            digital experiences.
          </p>

          <div ref={ctaRef} className="hero-cta-row">
            {/* Framer Motion CTA button with spring tap */}
            <motion.a
              href="#projects"
              className="hero-cta-btn"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
            >
              View Projects
            </motion.a>

            {/* Chevron with bounce on hover */}
            <motion.a
              href="#contact"
              className="hero-chevron-btn"
              aria-label="Scroll down"
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.6,
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
            >
              <ChevronDown size={18} strokeWidth={1.8} />
            </motion.a>
          </div>
        </div>

        {/* ── RIGHT RAIL ── */}
        <div className="hero-rail hero-rail--right">
          <div ref={rightLineRef} className="hero-rail__line" />
          <div ref={dotsRef} className="hero-page-dots">
            {NAV_DOTS.map((n, i) => (
              <motion.span
                key={n}
                className={`hero-dot${i === 0 ? " hero-dot--active" : ""}`}
                whileHover={{ scale: 1.18, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {n}
              </motion.span>
            ))}
          </div>
          <div ref={growLineRef2} className="hero-rail__line--grow" />
        </div>

      </div>
    </>
  );
}