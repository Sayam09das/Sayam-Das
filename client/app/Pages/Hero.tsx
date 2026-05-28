"use client";

import { useEffect, useState } from "react";
import { Instagram, Github, Mail, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { useTheme } from "../context/ThemeContext";

const SOCIAL = [
  { icon: Instagram, href: "https://www.instagram.com/sayamdas9124/", label: "Instagram" },
  { icon: Github, href: "https://github.com/Sayam09das", label: "GitHub" },
{ icon: Mail, href: "mailto:dassayam2021@gmail.com", label: "Email" },
];

const GREETINGS = ["hello"];

export default function HeroSection() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const greetingIndex = 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── CSS Variables ── */
:root {
          --bg:           #f8f9fa;
          --bg2:          #e9ecef;
          --text:         #000000;
          --muted:        #495057;
          --border:       rgba(0,0,0,0.09);
          --line:         rgba(0,0,0,0.12);
          --btn-bg:       #181816;
          --btn-text:     #f4f3ef;
          --bubble-bg:    #ffffff;
          --dot-color:    rgba(0,0,0,0.08);
          --shadow:       0 8px 36px rgba(0,0,0,0.11);
          --img-radius:   22px;
        }

html.dark {
          --bg:           #121212;
          --bg2:          #1e1e1e;
          --text:         #ffffff;
          --muted:        #b0b0b0;
          --border:       rgba(255,255,255,0.07);
          --line:         rgba(255,255,255,0.09);
          --btn-bg:       #efede7;
          --btn-text:     #0e0e0d;
          --bubble-bg:    #232320;
          --dot-color:    rgba(255,255,255,0.045);
          --shadow:       0 8px 36px rgba(0,0,0,0.45);
        }

        /* ── Keyframes ── */
        @keyframes hero-fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-fadeLeft {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes hero-fadeRight {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes hero-scaleIn {
          from { opacity: 0; transform: scale(0.93) translateY(24px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes hero-popIn {
          0%   { opacity: 0; transform: scale(0.5) rotate(-14deg); }
          65%  { transform: scale(1.1) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes hero-blink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
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
          background-image: radial-gradient(circle, var(--dot-color) 1.3px, transparent 1.3px);
          background-size: 26px 26px;
          display: grid;
          grid-template-columns: 56px 1fr 56px;
          grid-template-rows: 1fr auto;
          overflow: hidden;
          transition: background-color 0.35s, color 0.35s;
          font-family: 'DM Sans', sans-serif;
          color: var(--text);
        }

        /* ── RAILS (left + right shared) ── */
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
        }
        .hero-rail__line--grow {
          width: 1px;
          flex: 1;
          background: var(--line);
          margin-top: 10px;
        }

        /* ── SOCIAL ICONS ── */
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
          transition: color 0.18s, background 0.18s, transform 0.2s;
        }
        .hero-social-link:hover {
          color: var(--text);
          background: var(--bg2);
          transform: scale(1.14);
        }
        .hero-social-link:nth-child(1) { animation: hero-fadeLeft 0.5s 0.20s cubic-bezier(.22,1,.36,1) both; }
        .hero-social-link:nth-child(2) { animation: hero-fadeLeft 0.5s 0.30s cubic-bezier(.22,1,.36,1) both; }
        .hero-social-link:nth-child(3) { animation: hero-fadeLeft 0.5s 0.40s cubic-bezier(.22,1,.36,1) both; }

        /* ── IMAGE AREA ── */
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
          animation: hero-scaleIn 0.85s cubic-bezier(.22,1,.36,1) both;
        }

        .hero-img-box {
          width: clamp(155px, 36vw, 310px);
          aspect-ratio: 3 / 4;
          border-radius: var(--img-radius);
          overflow: hidden;
          box-shadow: var(--shadow);
        }
        .hero-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ── BUBBLE ── */
        .hero-bubble {
          position: absolute;
          top: -28px;
          right: -18px;
          background: var(--bubble-bg);
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 10px 18px;
          animation: hero-popIn 0.55s 0.60s cubic-bezier(.22,1,.36,1) both, hero-float 3s ease-in-out infinite;
          white-space: nowrap;
          z-index: 5;
        }
        html.dark .hero-bubble {
          background: var(--bubble-bg);
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
        .hero-bubble__greeting {
          display: inline-flex;
          align-items: center;
        }
        @keyframes hero-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }

        /* ── TEXT BLOCK ── */
        .hero-text-block {
          grid-column: 2;
          grid-row: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px 18px 40px;
        }

        .hero-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(30px, 6.5vw, 72px);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.035em;
          color: var(--text);
          margin-bottom: 12px;
          animation: hero-fadeUp 0.7s 0.05s cubic-bezier(.22,1,.36,1) both;
        }

        .hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(13px, 1.55vw, 15px);
          font-weight: 400;
          color: var(--muted);
          max-width: 490px;
          line-height: 1.7;
          margin-bottom: 24px;
          animation: hero-fadeUp 0.7s 0.17s cubic-bezier(.22,1,.36,1) both;
        }

        /* ── CTA ROW ── */
        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          max-width: 430px;
          animation: hero-fadeUp 0.7s 0.29s cubic-bezier(.22,1,.36,1) both;
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
        }
        .hero-cta-btn:hover  { opacity: 0.83; transform: translateY(-2px); }
        .hero-cta-btn:active { transform: translateY(0); }

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

        /* ── PAGE DOTS ── */
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
          opacity: 0.38;
          cursor: pointer;
          user-select: none;
          transition: color 0.18s, opacity 0.18s, transform 0.18s;
        }
        .hero-dot:hover,
        .hero-dot--active {
          color: var(--text);
          opacity: 1;
          transform: scale(1.12);
        }
        .hero-dot:nth-child(1) { animation: hero-fadeRight 0.45s 0.20s cubic-bezier(.22,1,.36,1) both; }
        .hero-dot:nth-child(2) { animation: hero-fadeRight 0.45s 0.28s cubic-bezier(.22,1,.36,1) both; }
        .hero-dot:nth-child(3) { animation: hero-fadeRight 0.45s 0.36s cubic-bezier(.22,1,.36,1) both; }
        .hero-dot:nth-child(4) { animation: hero-fadeRight 0.45s 0.44s cubic-bezier(.22,1,.36,1) both; }
        .hero-dot:nth-child(5) { animation: hero-fadeRight 0.45s 0.52s cubic-bezier(.22,1,.36,1) both; }

        /* ── RESPONSIVE ── */
        @media (max-width: 640px) {
          .hero-wrapper          { grid-template-columns: 44px 1fr 44px; }
          .hero-rail             { padding-top: 28px; }
          .hero-rail__line       { height: 36px; }
          .hero-social-link      { width: 30px; height: 30px; }
          .hero-image-area       { padding-top: 28px; }
          .hero-img-box          { border-radius: 16px; }
          .hero-bubble           { right: -8px; top: -14px; padding: 7px 12px; }
          .hero-text-block       { padding: 18px 12px 28px; }
          .hero-cta-row          { max-width: 100%; }
          .hero-page-dots        { gap: 14px; }
        }

        @media (max-width: 420px) {
          .hero-wrapper          { grid-template-columns: 36px 1fr 36px; }
          .hero-social-link      { width: 26px; height: 26px; }
          .hero-cta-btn          { padding: 12px 18px; }
          .hero-chevron-btn      { width: 36px; height: 36px; }
          .hero-page-dots        { gap: 11px; }
        }

        @media (max-width: 360px) {
          .hero-wrapper          { grid-template-columns: 30px 1fr 30px; }
        }
      `}</style>

      <div className="hero-wrapper" style={{ marginTop: "80px" }}>

        {/* ── LEFT RAIL ── */}
        <div className="hero-rail hero-rail--left">
          <div className="hero-rail__line" />
          <div className="hero-social">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="hero-social-link"
              >
                <Icon size={17} strokeWidth={1.8} />
              </a>
            ))}
          </div>
          <div className="hero-rail__line--grow" />
        </div>

        {/* ── IMAGE ── */}
        <div className="hero-image-area">
          <div className="hero-image-wrap">
            <div className="hero-bubble">
              <motion.div
                className="hero-bubble__text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="hero-bubble__greeting">
                  {GREETINGS[greetingIndex]}
                </span>
              </motion.div>
            </div>
            <div className="hero-img-box">
                <CldImage
                src="Sayam Das"
                width={500}
                height={500}
                crop={{ type: "auto", source: true }}
                alt="Profile"
              />
            </div>

          </div>
        </div>

        {/* ── TEXT BLOCK ── */}
        <div className="hero-text-block">
          <h1 className="hero-name">Sayam Das</h1>
          <p className="hero-sub">
            Full-Stack Developer specializing in React, Next.js, and TypeScript,
            with experience in Python and Machine Learning. Passionate about
            building scalable web applications, AI-powered tools, and modern
            digital experiences.
          </p>
          <div className="hero-cta-row">
            <a href="#projects" className="hero-cta-btn">View Projects</a>
            <a href="#contact" className="hero-chevron-btn" aria-label="Scroll down">
              <ChevronDown size={18} strokeWidth={1.8} />
            </a>
          </div>
        </div>

        {/* ── RIGHT RAIL ── */}
        <div className="hero-rail hero-rail--right">
          <div className="hero-rail__line" />
          <div className="hero-page-dots">
            {["00", "01", "02", "03", "04"].map((n, i) => (
              <span
                key={n}
                className={`hero-dot${i === 0 ? " hero-dot--active" : ""}`}
              >
                {n}
              </span>
            ))}
          </div>
          <div className="hero-rail__line--grow" />
        </div>

      </div>
    </>
  );
}