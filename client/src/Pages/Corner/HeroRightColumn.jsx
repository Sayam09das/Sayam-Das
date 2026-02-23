import { useState, useEffect } from "react";

const BADGE_TEXT = "AVAILABLE FOR FREELANCE • ";
const RADIUS = 44;
const FONT_SIZE = 10.5;

function CircularText() {
  const chars = BADGE_TEXT.repeat(2).split("");
  const total = chars.length;

  return (
    <>
      <style>{`
        @keyframes spin-anticlockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .circular-text {
          transform-origin: 70px 70px;
          animation: spin-anticlockwise 12s linear infinite;
        }
      `}</style>
      <svg
        viewBox="0 0 140 140"
        width="140"
        height="140"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <path
            id="circlePath"
            d={`M 70,70 m -${RADIUS},0 a ${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a ${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
          />
        </defs>
        <text
          className="circular-text"
          style={{
            fontSize: `${FONT_SIZE}px`,
            fontWeight: 700,
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            fill: "#000000",
            letterSpacing: "1.5px",
          }}
        >
          <textPath href="#circlePath" startOffset="0%">
            {BADGE_TEXT.repeat(2)}
          </textPath>
        </text>
      </svg>
    </>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: "relative", zIndex: 2 }}
    >
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

export default function HeroRightColumn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        * { box-sizing: border-box; }

        .right-col {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        .portrait-wrapper {
          position: relative;
          width: 520px;
          height: 600px;
          flex-shrink: 0;
          transition: opacity 1s ease 0.3s, transform 1s ease 0.3s;
        }

        .portrait-wrapper.hidden {
          opacity: 0;
          transform: scale(0.95);
        }

        .portrait-wrapper.shown {
          opacity: 1;
          transform: scale(1);
        }

        /* Arch-top portrait card */
        .portrait-card {
          width: 100%;
          height: 100%;
          border-radius: 260px 260px 12px 12px;
          overflow: hidden;
          background: linear-gradient(135deg, #8B7DD8 0%, #9B8CE8 100%);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          position: relative;
        }

        .portrait-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        /* Fallback gradient overlay when no image */
        .portrait-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          background: linear-gradient(160deg, #8B7DD8 0%, #7C6BC8 40%, #9B8CE8 100%);
        }

        .fallback-silhouette {
          width: 70%;
          opacity: 0.3;
          margin-bottom: -4px;
        }

        /* Circular badge */
        .badge {
          position: absolute;
          top: 12%;
          left: -8%;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 3px solid #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          transform: rotate(-8deg);
          z-index: 10;
          transition:
            opacity 0.8s ease 0.8s,
            transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s;
        }

        .badge.hidden {
          opacity: 0;
          transform: rotate(-8deg) scale(0.6);
        }

        .badge.shown {
          opacity: 1;
          transform: rotate(-8deg) scale(1);
        }

        .badge-inner {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ─── RESPONSIVE ─── */

        @media (max-width: 1280px) {
          .portrait-wrapper {
            width: 440px;
            height: 520px;
          }
        }

        @media (max-width: 1024px) {
          .portrait-wrapper {
            width: 380px;
            height: 460px;
          }
          .badge {
            width: 120px;
            height: 120px;
            left: -6%;
          }
        }

        @media (max-width: 768px) {
          .right-col {
            justify-content: center;
            padding-top: 24px;
          }
          .portrait-wrapper {
            width: 300px;
            height: 380px;
          }
          .portrait-card {
            border-radius: 150px 150px 12px 12px;
          }
          .badge {
            width: 110px;
            height: 110px;
            top: 8%;
            left: -5%;
          }
        }

        @media (max-width: 480px) {
          .portrait-wrapper {
            width: 240px;
            height: 310px;
          }
          .portrait-card {
            border-radius: 120px 120px 10px 10px;
          }
          .badge {
            width: 90px;
            height: 90px;
            top: 6%;
            left: -4%;
          }
        }
      `}</style>

      <div className="right-col">
        <div className={`portrait-wrapper ${visible ? "shown" : "hidden"}`}>

          {/* ── Floating Circular Badge ── */}
          <div className={`badge ${visible ? "shown" : "hidden"}`}>
            <div className="badge-inner">
              <CircularText />
              <ArrowIcon />
            </div>
          </div>

          {/* ── Portrait Card ── */}
          <div className="portrait-card">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop"
              alt="Friendly professional portrait"
              className="portrait-img"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling.style.display = "flex";
              }}
            />
            {/* Fallback if image fails */}
            <div className="portrait-fallback" style={{ display: "none" }}>
              <svg
                className="fallback-silhouette"
                viewBox="0 0 300 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="150" cy="110" rx="60" ry="65" fill="#6366F1" />
                <path d="M30 400 C30 270 270 270 270 400" fill="#6366F1" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}