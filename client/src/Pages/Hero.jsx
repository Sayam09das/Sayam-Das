import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "motion/react";

const words = ["Hi!", "Hey!", "Hello!", "👋", "Hola!", "Ciao!"];

// Mouse-following purple dot component
function MouseFollower() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    const springConfig = { damping: 12, stiffness: 80 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX - 10);
            mouseY.set(e.clientY - 10);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#5e67e5",
                pointerEvents: "none",
                zIndex: 9999,
                translateX: cursorX,
                translateY: cursorY,
            }}
        />
    );
}

function WordRotate({ words, interval = 2000, className = "" }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [words, interval]);

    return (
        <div className={`relative overflow-hidden ${className}`} style={{ height: "1.2em" }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    style={{ display: "block", lineHeight: "1.2" }}
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

export default function Hero() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
    const leftTextY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const rightTextY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <>
            <MouseFollower />
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500&display=swap');

        .hero-root {
          font-family: 'Barlow', sans-serif;
        }

        .hero-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          line-height: 0.88;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #1a1a1a;
        }

        .hero-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1a1a1a;
        }

        @media (max-width: 767px) {
          .hero-layout {
            flex-direction: column !important;
            gap: 2rem !important;
            padding-top: 6rem !important;
            padding-bottom: 4rem !important;
          }
          .hero-heading {
            font-size: clamp(2.5rem, 12vw, 4rem) !important;
          }
          .hero-left, .hero-right {
            text-align: center !important;
          }
          .hero-right {
            text-align: center !important;
          }
          .hero-image-wrap img {
            width: clamp(180px, 50vw, 220px) !important;
          }
          .hi-bubble {
            width: 60px !important;
            height: 60px !important;
            bottom: -20px !important;
            left: -16px !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-heading {
            font-size: clamp(2.5rem, 8vw, 4rem) !important;
          }
          .hero-image-wrap img {
            width: 200px !important;
          }
        }
      `}</style>

            <section
                id="home"
                ref={sectionRef}
                className="hero-root relative min-h-screen bg-white flex items-center justify-center overflow-hidden"
                style={{ paddingInline: "clamp(1rem, 4vw, 3rem)" }}
            >
                {/* Subtle background blobs */}
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                    <div style={{
                        position: "absolute", top: "-10%", right: "-5%",
                        width: "40vw", height: "40vw",
                        background: "radial-gradient(circle, rgba(94,103,229,0.07) 0%, transparent 70%)",
                        borderRadius: "50%"
                    }} />
                    <div style={{
                        position: "absolute", bottom: "-10%", left: "-5%",
                        width: "35vw", height: "35vw",
                        background: "radial-gradient(circle, rgba(130,80,200,0.05) 0%, transparent 70%)",
                        borderRadius: "50%"
                    }} />
                </div>

                <div
                    className="hero-layout"
                    style={{
                        zIndex: 1,
                        flexFlow: "row",
                        flex: "none",
                        placeContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                        height: "100vh",
                        padding: 0,
                        display: "flex",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* LEFT — Name + "DIGITAL" */}
                    <motion.div
                        className="hero-left"
                        style={{ 
                            y: leftTextY, 
                            flex: "1 0 0", 
                            maxWidth: "50%", 
                            height: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            position: "relative"
                        }}
                    >
                        {/* Heading Wrap */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            width: "min-content",
                            height: "min-content",
                            paddingRight: "10px"
                        }}>
                            {/* Text Wrap - positioned absolutely */}
                            <div style={{
                                position: "absolute",
                                top: "-45px",
                                left: "5px",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 0,
                                width: "293px",
                                overflow: "hidden",
                                zIndex: 1
                            }}>
                                {/* RichTextContainer wrapper */}
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    outline: "none",
                                    flexShrink: 0,
                                    width: "auto",
                                    height: "auto"
                                }}>
                                    <motion.p
                                        className="hero-name"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        style={{ 
                                            fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)", 
                                            marginBottom: 0,
                                            whiteSpace: "pre",
                                            flex: "none",
                                            width: "auto",
                                            height: "auto"
                                        }}
                                    >
                                        Sayam Das
                                    </motion.p>
                                </div>
                            </div>
                            
                            {/* Empty container with negative margin */}
                            <div style={{ marginLeft: "-10px", marginTop: "-10px", flex: "none", width: "auto", height: "auto" }}></div>
                            
                            {/* RichTextContainer for Digital */}
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                outline: "none",
                                flexShrink: 0,
                                width: "auto",
                                height: "auto"
                            }}>
                                <motion.h1
                                    className="hero-heading"
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.3 }}
                                    style={{ 
                                        fontSize: "clamp(3rem, 7vw, 6rem)", 
                                        margin: 0, 
                                        whiteSpace: "pre",
                                        flex: "none",
                                        width: "auto",
                                        height: "auto"
                                    }}
                                >
                                    Digital
                                </motion.h1>
                            </div>
                        </div>
                    </motion.div>

                    {/* CENTER — Image */}
                    <motion.div
                        style={{ scale: imageScale, position: "relative" }}
                        className="hero-image-wrap"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.88 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{ position: "relative" }}
                        >
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEYb9H0sEj8UGOgVL9rlEZg6isF4rezzYKVA&s"
                                alt="Sayam Das"
                                style={{
                                    width: "clamp(180px, 18vw, 280px)",
                                    aspectRatio: "3/4",
                                    objectFit: "cover",
                                    borderRadius: "24px",
                                    display: "block",
                                    boxShadow: "0 32px 80px rgba(0,0,0,0.15)",
                                }}
                            />

                            {/* Word Rotate Bubble */}
                            <motion.div
                                className="hi-bubble"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.9, type: "spring", stiffness: 220, damping: 14 }}
                                style={{
                                    position: "absolute",
                                    bottom: "-28px",
                                    left: "-24px",
                                    width: "68px",
                                    height: "68px",
                                    background: "#5e67e5",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 8px 32px rgba(94,103,229,0.45)",
                                    cursor: "pointer",
                                    overflow: "hidden",
                                }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <div style={{
                                    color: "white",
                                    fontSize: "1.25rem",
                                    fontWeight: 800,
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    letterSpacing: "0.02em",
                                    textAlign: "center",
                                    width: "100%",
                                    paddingInline: "4px",
                                }}>
                                    <WordRotate words={words} interval={2000} />
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT — "DESIGNER" + subtitle */}
                    <motion.div
                        className="hero-right"
                        style={{ 
                            y: rightTextY, 
                            flex: "1 0 0", 
                            maxWidth: "50%", 
                            height: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            position: "relative",
                            marginTop: "4px"
                        }}
                    >
                        {/* Heading Wrap - column layout with subtitle below */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            gap: 0,
                            width: "100%",
                            height: "min-content",
                            position: "relative"
                        }}>
                            {/* RichTextContainer for "designer" */}
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                outline: "none",
                                flexShrink: 0,
                                width: "auto",
                                height: "auto"
                            }}>
                                <motion.h1
                                    className="hero-heading"
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.35 }}
                                    style={{ 
                                        fontSize: "clamp(3rem, 7vw, 6rem)", 
                                        margin: 0,
                                        whiteSpace: "pre",
                                        flex: "none",
                                        width: "auto",
                                        height: "auto",
                                        textAlign: "left",
                                        textTransform: "uppercase"
                                    }}
                                >
                                    designer
                                </motion.h1>
                            </div>

                            {/* Text Wrap - for subtitle below with flex */}
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                gap: 0,
                                width: "100%",
                                height: "auto",
                                marginTop: "4px"
                            }}>
                                {/* RichTextContainer for subtitle - right aligned with flex */}
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    outline: "none",
                                    flexShrink: 0,
                                    flex: "1 0 0",
                                    width: "1px",
                                    height: "auto",
                                    zIndex: 1,
                                    position: "relative"
                                }}>
                                    <motion.p
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.55 }}
                                        style={{
                                            color: "#888",
                                            fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)",
                                            lineHeight: 1.6,
                                            maxWidth: "220px",
                                            textAlign: "right",
                                            margin: 0
                                        }}
                                    >
                                        I'm a US-based digital designer<br />and Framer developer
                                    </motion.p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    style={{
                        position: "absolute",
                        bottom: "2rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                    className="hidden md:flex"
                >
                    <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(26,26,26,0.35)", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: "uppercase" }}>
                        Scroll
                    </p>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, #5e67e5, transparent)" }}
                    />
                </motion.div>
            </section>
        </>
    );
}

