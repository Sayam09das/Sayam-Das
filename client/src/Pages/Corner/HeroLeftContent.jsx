import { useState, useEffect } from "react";

const WavyUnderline = () => (
  <svg
    viewBox="0 0 420 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      bottom: "-6px",
      left: 0,
      width: "100%",
      height: "12px",
      overflow: "visible",
    }}
    preserveAspectRatio="none"
  >
    <path
      d="M2 8 C30 2, 60 11, 90 6 C120 1, 150 10, 180 5 C210 0, 240 9, 270 5 C300 1, 330 10, 360 5 C385 1, 405 8, 418 6"
      stroke="#6366F1"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export default function HeroLeftContent() {
  const [visible, setVisible] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const fadeBase = {
    transition: "opacity 0.6s ease, transform 0.6s ease",
  };

  const hidden = { opacity: 0 };
  const shown = { opacity: 1 };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }

        .hero-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          padding: 0;
        }

        /* Badge */
        .badge {
          display: inline-block;
          background: #FFFFFF;
          border: 2px solid #000000;
          border-radius: 24px;
          padding: 8px 20px;
          font-size: 13px;
          font-weight: 600;
          color: #000;
          margin-bottom: 32px;
          letter-spacing: 0.5px;
          transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
        }

        /* Headline */
        .headline {
          font-size: 56px;
          font-weight: 700;
          line-height: 1.15;
          color: #000000;
          letter-spacing: -1px;
          margin: 0 0 28px 0;
          transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
        }

        .underline-wrap {
          position: relative;
          display: inline-block;
        }

        /* Subheadline */
        .subheadline {
          font-size: 18px;
          font-weight: 400;
          line-height: 1.6;
          color: #333333;
          max-width: 480px;
          margin: 0 0 36px 0;
          transition: opacity 0.6s ease 0.6s;
        }

        /* CTA Button */
        .cta-btn {
          background: transparent;
          border: 2px solid #000000;
          border-radius: 12px;
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
          color: #000000;
          cursor: pointer;
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease, opacity 0.6s ease 0.8s;
          letter-spacing: -0.2px;
        }

        .cta-btn:hover {
          background: #000000;
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        /* ─── RESPONSIVE ─── */

        /* Tablet: ≤ 1024px */
        @media (max-width: 1024px) {
          .headline { font-size: 44px; }
          .subheadline { font-size: 16px; max-width: 100%; }
        }

        /* Mobile landscape / small tablet: ≤ 768px */
        @media (max-width: 768px) {
          .hero-left { align-items: center; text-align: center; }
          .headline { font-size: 36px; letter-spacing: -0.5px; }
          .subheadline { font-size: 15px; text-align: center; }
          .badge { margin-bottom: 24px; }
        }

        /* Mobile portrait: ≤ 480px */
        @media (max-width: 480px) {
          .headline { font-size: 30px; }
          .subheadline { font-size: 14px; margin-bottom: 28px; }
          .cta-btn { padding: 14px 28px; font-size: 15px; }
          .badge { font-size: 12px; padding: 7px 16px; }
        }
      `}</style>

      <div className="hero-left">

        {/* 1. Greeting Badge */}
        <span
          className="badge"
          style={{
            ...fadeBase,
            ...(visible
              ? { opacity: 1, transform: "translateY(0)" }
              : { opacity: 0, transform: "translateY(-12px)" }),
            transitionDelay: "0.2s",
          }}
        >
          ✱ HELLO!
        </span>

        {/* 2. Main Headline */}
        <h1
          className="headline"
          style={{
            ...fadeBase,
            ...(visible
              ? { opacity: 1, transform: "translateY(0)" }
              : { opacity: 0, transform: "translateY(16px)" }),
            transitionDelay: "0.4s",
          }}
        >
          I'm Chandler Bing,
          <br />
          <span className="underline-wrap">
            a product designer.
            <WavyUnderline />
          </span>
        </h1>

        {/* 3. Subheadline */}
        <p
          className="subheadline"
          style={{
            ...fadeBase,
            ...(visible ? { opacity: 1 } : { opacity: 0 }),
            transitionDelay: "0.6s",
          }}
        >
          I'm a freelance product designer based in London. I'm very
          passionate about the work that I do.
        </p>

        {/* 4. CTA Button */}
        <button
          className="cta-btn"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            ...fadeBase,
            ...(visible
              ? { opacity: 1, transform: btnHovered ? "translateY(-2px)" : "scale(1)" }
              : { opacity: 0, transform: "scale(0.95)" }),
            transitionDelay: visible ? "0.8s" : "0s",
            background: btnHovered ? "#000000" : "transparent",
            color: btnHovered ? "#FFFFFF" : "#000000",
            transform: btnHovered ? "translateY(-2px)" : "translateY(0)",
          }}
        >
          See My Works
        </button>
      </div>
    </>
  );
}