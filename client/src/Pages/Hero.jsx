export default function Hero() {
    return (
        <section
            id="home"
            style={{
                width: "100%",
                minHeight: "100vh",
                marginTop: "80px",
                background: "linear-gradient(to bottom, #E8E3FF, #F0EEFF)",
                padding: "40px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxSizing: "border-box",
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                overflow: "hidden",
            }}
        >
            {/* Container for aligned content */}
            <div
                style={{
                    maxWidth: "1200px",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    alignItems: "center",
                    gap: "60px",
                    position: "relative",
                }}
            >
                {/* Decorative sparkles — top right */}
                <div
                    style={{
                        position: "absolute",
                        top: "15%",
                        right: "12%",
                        pointerEvents: "none",
                    }}
                >
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Large sparkle — 40px, rotated 15deg */}
                        <g transform="translate(30, 10) rotate(15, 20, 20)">
                            <path
                                d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z"
                                stroke="#000000"
                                strokeWidth="1.5"
                                fill="none"
                                strokeLinejoin="round"
                            />
                        </g>
                        {/* Small sparkle — 28px, rotated -10deg */}
                        <g transform="translate(0, 45) rotate(-10, 14, 14)">
                            <path
                                d="M14 0 L16 10.5 L28 14 L16 17.5 L14 28 L12 17.5 L0 14 L12 10.5 Z"
                                stroke="#000000"
                                strokeWidth="1.5"
                                fill="none"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </div>

                {/* Decorative waves — bottom right */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "25%",
                        right: "8%",
                        pointerEvents: "none",
                    }}
                >
                    <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Three wavy lines, 8px apart */}
                        <path
                            d="M0 6 Q12.5 0 25 6 Q37.5 12 50 6 Q62.5 0 75 6 Q87.5 12 100 6"
                            stroke="#000000"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <path
                            d="M0 20 Q12.5 14 25 20 Q37.5 26 50 20 Q62.5 14 75 20 Q87.5 26 100 20"
                            stroke="#000000"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <path
                            d="M0 34 Q12.5 28 25 34 Q37.5 40 50 34 Q62.5 28 75 34 Q87.5 40 100 34"
                            stroke="#000000"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* LEFT COLUMN — Text content */}
                <div style={{ display: "flex", flexDirection: "column", gap: "28px", zIndex: 1 }}>
                    {/* Badge */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            background: "#FFFFFF",
                            border: "1px solid #E5E5E5",
                            borderRadius: "100px",
                            padding: "8px 16px",
                            width: "fit-content",
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#444",
                        }}
                    >
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366F1", display: "inline-block" }} />
                        Available for freelance work
                    </div>

                    {/* Headline */}
                    <div>
                        <h1
                            style={{
                                fontSize: "clamp(42px, 5vw, 68px)",
                                fontWeight: 800,
                                color: "#000000",
                                lineHeight: 1.05,
                                letterSpacing: "-2px",
                                margin: 0,
                            }}
                        >
                            Creative
                            <br />
                            <span style={{ color: "#6366F1" }}>Digital</span>
                            <br />
                            Designer
                        </h1>
                    </div>

                    {/* Subtext */}
                    <p
                        style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            color: "#555",
                            lineHeight: 1.7,
                            margin: 0,
                            maxWidth: "420px",
                        }}
                    >
                        I craft beautiful digital experiences — from brand identities to
                        interactive interfaces. Helping businesses stand out through
                        intentional, thoughtful design.
                    </p>

                    {/* CTA Row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                        <button
                            style={{
                                background: "#6366F1",
                                color: "#FFFFFF",
                                border: "none",
                                borderRadius: "8px",
                                padding: "14px 28px",
                                fontSize: "15px",
                                fontWeight: 600,
                                cursor: "pointer",
                                letterSpacing: "-0.2px",
                            }}
                        >
                            View Portfolio
                        </button>
                        <button
                            style={{
                                background: "transparent",
                                color: "#000000",
                                border: "2px solid #000000",
                                borderRadius: "8px",
                                padding: "14px 28px",
                                fontSize: "15px",
                                fontWeight: 600,
                                cursor: "pointer",
                                letterSpacing: "-0.2px",
                            }}
                        >
                            Get in Touch
                        </button>
                    </div>

                    {/* Stats row */}
                    <div style={{ display: "flex", gap: "40px", paddingTop: "8px" }}>
                        {[
                            { value: "120+", label: "Projects Done" },
                            { value: "8yr", label: "Experience" },
                            { value: "98%", label: "Happy Clients" },
                        ].map(({ value, label }) => (
                            <div key={label}>
                                <div style={{ fontSize: "26px", fontWeight: 800, color: "#000", letterSpacing: "-1px" }}>{value}</div>
                                <div style={{ fontSize: "13px", color: "#888", fontWeight: 500, marginTop: "2px" }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN — Portrait placeholder */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "420px",
                            aspectRatio: "3/4",
                            borderRadius: "24px",
                            background: "linear-gradient(135deg, #d4ccff 0%, #b8b0ff 100%)",
                            border: "2px solid rgba(99,102,241,0.15)",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            overflow: "hidden",
                            position: "relative",
                            boxShadow: "0 32px 80px rgba(99,102,241,0.18)",
                        }}
                    >
                        {/* Placeholder silhouette */}
                        <svg
                            viewBox="0 0 300 400"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ width: "80%", opacity: 0.25 }}
                        >
                            <ellipse cx="150" cy="110" rx="55" ry="60" fill="#6366F1" />
                            <path
                                d="M40 400 C40 280 260 280 260 400"
                                fill="#6366F1"
                            />
                        </svg>
                        <div
                            style={{
                                position: "absolute",
                                bottom: "20px",
                                left: "20px",
                                background: "rgba(255,255,255,0.85)",
                                backdropFilter: "blur(8px)",
                                borderRadius: "12px",
                                padding: "12px 16px",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#000",
                                letterSpacing: "-0.2px",
                            }}
                        >
                            ✦ Your portrait here
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
