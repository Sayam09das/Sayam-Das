"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import {
    Home,
    Briefcase,
    FolderOpen,
    Mail,
    Star,
    Menu,
    X,
} from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

// ─── Lenis smooth scroll hook ────────────────────────────────────────────────
function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        } as any);

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);
}

// ─── Nav links data ───────────────────────────────────────────────────────────
const NAV_LINKS = [
    { label: "Services", icon: Briefcase, href: "/#services" },
    { label: "Projects", icon: FolderOpen, href: "/#projects" },
    { label: "Skiils", icon: Mail, href: "/#skills" },
    { label: "Contact", icon: Star, href: "/#contact" },
];

// ─── Navbar component ─────────────────────────────────────────────────────────
export default function Navbar() {
    useLenis();

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [active, setActive] = useState("Services");

    // Scroll listener for glass blur effect
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <>
            {/* ── Global styles injected via style tag ───────────────────────── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #f2f2f0;
          --surface: rgba(255,255,255,0.82);
          --surface-solid: #ffffff;
          --border: rgba(0,0,0,0.08);
          --text: #111110;
          --text-muted: #6b6b68;
          --pill-bg: rgba(0,0,0,0.06);
          --pill-hover: rgba(0,0,0,0.10);
          --active-bg: rgba(0,0,0,0.88);
          --active-text: #ffffff;
          --btn-bg: #111110;
          --btn-text: #ffffff;
          --dot: #22c55e;
          --radius: 9999px;
          --shadow: 0 4px 24px rgba(0,0,0,0.08);
          --shadow-lg: 0 8px 40px rgba(0,0,0,0.12);
          font-family: 'DM Sans', sans-serif;
        }

        .dark {
          --bg: #0e0e0d;
          --surface: rgba(20,20,18,0.86);
          --surface-solid: #1a1a18;
          --border: rgba(255,255,255,0.08);
          --text: #f0efea;
          --text-muted: #8a8a84;
          --pill-bg: rgba(255,255,255,0.06);
          --pill-hover: rgba(255,255,255,0.10);
          --active-bg: rgba(255,255,255,0.92);
          --active-text: #111110;
          --btn-bg: #f0efea;
          --btn-text: #111110;
          --shadow: 0 4px 24px rgba(0,0,0,0.32);
          --shadow-lg: 0 8px 40px rgba(0,0,0,0.48);
        }

        html { background: var(--bg); transition: background 0.3s; }

        body {
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          transition: background 0.3s, color 0.3s;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--text-muted); border-radius: 4px; }

        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          transition: background 0.35s, backdrop-filter 0.35s, box-shadow 0.35s;
        }

        .nav-root.scrolled {
          background: var(--surface);
          backdrop-filter: blur(18px) saturate(180%);
          -webkit-backdrop-filter: blur(18px) saturate(180%);
          box-shadow: var(--shadow);
          border-bottom: 1px solid var(--border);
        }

        /* ── Brand ── */
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .avatar {
          width: 42px; height: 42px;
          border-radius: 50%;
          overflow: hidden;
          background: linear-gradient(135deg, #d4d0c8 0%, #a8a49c 100%);
          border: 1.5px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .avatar img {
          width: 100%; height: 100%;
          object-fit: cover;
        }

        .avatar-fallback {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: var(--text);
          letter-spacing: -0.02em;
        }

        .brand-divider {
          width: 1px;
          height: 32px;
          background: var(--border);
        }

        .brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text);
          line-height: 1.35;
          letter-spacing: -0.01em;
        }

        /* ── Center pill nav ── */
        .nav-pill {
          display: flex;
          align-items: center;
          gap: 2px;
          background: var(--pill-bg);
          border-radius: var(--radius);
          padding: 5px;
          border: 1px solid var(--border);
        }

        .home-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--surface-solid);
          border: 1px solid var(--border);
          color: var(--text);
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s;
          flex-shrink: 0;
        }

        .home-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }

        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: var(--radius);
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.18s;
          background: none;
          border: none;
          outline: none;
          white-space: nowrap;
        }

        .nav-link:hover { color: var(--text); }

        .nav-link.active { color: var(--active-text); }

        .nav-link .link-icon {
          opacity: 0;
          width: 0;
          overflow: hidden;
          transition: opacity 0.18s, width 0.18s;
          display: flex;
          align-items: center;
        }

        .nav-link.active .link-icon,
        .nav-link:hover .link-icon {
          opacity: 1;
          width: 14px;
        }

        .nav-link-bg {
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          background: var(--active-bg);
          z-index: -1;
        }

        /* ── Open to work btn ── */
        .work-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: var(--radius);
          background: var(--btn-bg);
          color: var(--btn-text);
          font-family: 'Syne', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: -0.01em;
          cursor: pointer;
          border: none;
          outline: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
          text-decoration: none;
        }

        .work-btn:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-lg);
          opacity: 0.92;
        }

        .dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--dot);
          animation: pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50%       { box-shadow: 0 0 0 4px rgba(34,197,94,0); }
        }

        /* ── Theme toggle ── */
        .theme-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border-radius: 50%;
          background: var(--pill-bg);
          border: 1px solid var(--border);
          color: var(--text);
          cursor: pointer;
          transition: background 0.18s, transform 0.18s;
          flex-shrink: 0;
          outline: none;
        }

        .theme-btn:hover {
          background: var(--pill-hover);
          transform: rotate(20deg) scale(1.08);
        }

        /* ── Mobile menu btn ── */
        .menu-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border-radius: var(--radius);
          background: var(--pill-bg);
          border: 1px solid var(--border);
          color: var(--text);
          cursor: pointer;
          outline: none;
          flex-shrink: 0;
          transition: background 0.18s;
        }

        .menu-btn:hover { background: var(--pill-hover); }

        /* ── Mobile Drawer ── */
        .mobile-drawer {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 99;
          padding: 80px 20px 28px;
          background: var(--surface-solid);
          border-bottom: 1px solid var(--border);
          box-shadow: var(--shadow-lg);
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 16px;
          border-radius: 14px;
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          text-decoration: none;
          border: none;
          background: none;
          outline: none;
          width: 100%;
          text-align: left;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background: var(--pill-bg);
          color: var(--text);
        }

        .mobile-work-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          margin-top: 16px;
          padding: 14px 18px;
          border-radius: var(--radius);
          background: var(--btn-bg);
          color: var(--btn-text);
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          outline: none;
          text-decoration: none;
          transition: opacity 0.18s, transform 0.18s;
        }

        .mobile-work-btn:hover { opacity: 0.88; transform: scale(0.99); }

        /* ── Right cluster ── */
        .right-cluster {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .nav-pill .nav-link span { display: none; }
          .nav-pill .nav-link .link-icon { opacity: 1; width: 14px; }
          .nav-pill .nav-link { padding: 7px 10px; }
        }

        @media (max-width: 700px) {
          .nav-pill { display: none; }
          .work-btn { display: none; }
          .menu-btn { display: flex; }
        }

        @media (max-width: 380px) {
          .brand-name { font-size: 12px; }
          .brand-divider { display: none; }
        }
      `}</style>

            {/* ── Navbar ────────────────────────────────────────────────────── */}
            <motion.nav
                className={`nav-root${scrolled ? " scrolled" : ""}`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Brand */}
                <a className="brand" href="/">
                    <div className="avatar">
                        <span className="avatar-fallback">AM</span>
                    </div>
                    <div className="brand-divider" />
                    <span className="brand-name">
                        Amirreza<br />Mousavi
                    </span>
                </a>

                {/* Center pill */}
                <nav className="nav-pill" aria-label="Main navigation">
                    <button className="home-btn" aria-label="Home">
                        <Home size={16} strokeWidth={2} />
                    </button>

                    {NAV_LINKS.map(({ label, icon: Icon, href }) => (
                        <a
                            key={label}
                            href={href}
                            className={`nav-link${active === label ? " active" : ""}`}
                            onClick={() => setActive(label)}
                        >
                            {active === label && (
                                <motion.span
                                    className="nav-link-bg"
                                    layoutId="active-pill"
                                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                                />
                            )}
                            <span className="link-icon">
                                <Icon size={13} strokeWidth={2.2} />
                            </span>
                            <span>{label}</span>
                        </a>
                    ))}
                </nav>

                {/* Right cluster */}
                <div className="right-cluster">
                    {/* Theme toggle */}
                    <AnimatedThemeToggler
                        className="theme-btn"
                        aria-label="Toggle theme"
                    />

                    {/* Open to work */}
                    <motion.a
                        href="#contact"
                        className="work-btn"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span className="dot" />
                        Open to work
                    </motion.a>

                    {/* Mobile menu */}
                    <button
                        className="menu-btn"
                        onClick={() => setMobileOpen((o) => !o)}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {mobileOpen ? (
                                <motion.span
                                    key="x"
                                    initial={{ rotate: -45, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 45, opacity: 0 }}
                                    transition={{ duration: 0.18 }}
                                    style={{ display: "flex" }}
                                >
                                    <X size={18} strokeWidth={2} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="menu"
                                    initial={{ rotate: 45, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -45, opacity: 0 }}
                                    transition={{ duration: 0.18 }}
                                    style={{ display: "flex" }}
                                >
                                    <Menu size={18} strokeWidth={2} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.nav>

            {/* ── Mobile Drawer ─────────────────────────────────────────────── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="mobile-drawer"
                        initial={{ y: -24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -24, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="mobile-nav-links">
                            <a
                                href="/"
                                className="mobile-nav-link"
                                onClick={() => setMobileOpen(false)}
                            >
                                <Home size={18} strokeWidth={2} />
                                Home
                            </a>
                            {NAV_LINKS.map(({ label, icon: Icon, href }, i) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    className={`mobile-nav-link${active === label ? " active" : ""}`}
                                    onClick={() => { setActive(label); setMobileOpen(false); }}
                                    initial={{ x: -16, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.055, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Icon size={18} strokeWidth={2} />
                                    {label}
                                </motion.a>
                            ))}

                            <motion.a
                                href="#contact"
                                className="mobile-work-btn"
                                onClick={() => setMobileOpen(false)}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.22, duration: 0.28 }}
                            >
                                <span className="dot" />
                                Open to work
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}