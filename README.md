<div align="center">

<img src="./client/public/logo.png" alt="Sayam Das" width="80" height="80" />

# sayam-das

**Production-grade personal portfolio — built for performance, accessibility, and scale.**

[![Live](https://img.shields.io/badge/Live-sayam--das.vercel.app-0070f3?style=flat-square&logo=vercel&logoColor=white)](https://sayam-das.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [API Reference](#api-reference)
- [Features](#features)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

`sayam-das` is a full-stack portfolio website engineered with a decoupled frontend/backend architecture. The frontend is a statically optimized Next.js application deployed on Vercel. The backend is a lightweight Express REST API responsible for contact form processing, reCAPTCHA verification, and transactional email delivery via Resend — with non-blocking background processing to ensure sub-second API response times.

```
Frontend (Vercel)  ──POST /api/contact──▶  Backend (Render)  ──▶  Resend API
                                                │
                                         Google reCAPTCHA
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Next.js)                      │
│                                                             │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌────────┐  │
│   │  Hero    │   │  About   │   │ Projects │   │Contact │  │
│   └──────────┘   └──────────┘   └──────────┘   └───┬────┘  │
│                                                     │       │
│              Axios (timeout: 30s)                   │       │
└─────────────────────────────────────────────────────┼───────┘
                                                      │ HTTPS POST
┌─────────────────────────────────────────────────────▼───────┐
│                       BACKEND (Express)                      │
│                                                             │
│   Rate Limiter ──▶ reCAPTCHA Verify ──▶ Respond 200 OK     │
│                                              │               │
│                                    Background Worker        │
│                                              │               │
│                                        Resend Email         │
└─────────────────────────────────────────────────────────────┘
```

**Key design decisions:**

- **Non-blocking email delivery** — the API responds immediately after validation; email is sent asynchronously in the background, eliminating timeout errors on cold-start hosting
- **Decoupled services** — frontend and backend are independently deployable and scalable
- **Edge-ready frontend** — Next.js SSG/SSR with full SEO metadata, Open Graph, JSON-LD structured data, sitemap, and robots.txt

---

## Tech Stack

### Frontend — `/client`

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.x | React framework — SSR, SSG, routing |
| `typescript` | 5.x | Static type safety |
| `tailwindcss` | 4.x | Utility-first CSS |
| `framer-motion` | 12.x | Declarative animations |
| `three` / `@react-three/fiber` | 0.183.x / 9.x | WebGL 3D rendering |
| `@splinetool/react-spline` | 4.x | Interactive 3D scenes |
| `axios` | 1.x | HTTP client with timeout handling |
| `@studio-freight/lenis` | 1.x | Smooth scroll engine |
| `react-google-recaptcha` | 3.x | reCAPTCHA v2 widget |
| `@vercel/analytics` | 2.x | Real-time traffic insights |

### Backend — `/backend`

| Package | Version | Purpose |
|---|---|---|
| `express` | 4.x | HTTP server and routing |
| `resend` | 4.x | Transactional email API |
| `axios` | 1.x | reCAPTCHA server-side verification |
| `cors` | 2.x | Cross-origin resource sharing |
| `dotenv` | 16.x | Environment variable management |
| `nodemon` | 3.x | Dev server with hot reload |

---

## Project Structure

```
sayam-das/
│
├── client/                         # Next.js 16 frontend
│   ├── app/
│   │   ├── Pages/                  # Route-level page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Project.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── ...
│   │   ├── components/             # Shared layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LenisProvider.tsx
│   │   ├── context/
│   │   │   └── ThemeContext.tsx    # Dark/light mode context
│   │   ├── globals.css             # Global styles & CSS variables
│   │   ├── layout.tsx              # Root layout, metadata, SEO, JSON-LD
│   │   ├── page.tsx                # Home page composition
│   │   ├── sitemap.ts              # Dynamic sitemap generation
│   │   └── robots.ts               # robots.txt generation
│   ├── components/ui/              # shadcn/ui primitives
│   ├── lib/
│   │   ├── utils.ts                # cn() utility
│   │   └── scroll-state.ts         # Scroll position helpers
│   ├── public/                     # Static assets, favicons, OG image
│   ├── global.d.ts                 # CSS module type declarations
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── .env                        # Frontend env vars (not committed)
│
├── backend/                        # Express REST API
│   ├── config/
│   │   └── resend.js               # Resend client singleton
│   ├── controllers/
│   │   └── contact.controller.js   # Request handler — validate, verify, respond
│   ├── middleware/
│   │   └── rateLimiter.js          # In-memory sliding window rate limiter
│   ├── routes/
│   │   └── contact.routes.js       # POST /api/contact
│   ├── services/
│   │   └── email.service.js        # Resend email template & delivery
│   ├── app.js                      # Express app setup, CORS, middleware
│   ├── server.js                   # HTTP server entry point
│   └── .env                        # Backend env vars (not committed)
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| Node.js | >= 18.x |
| npm | >= 9.x |
| Git | any |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Sayam09das/Sayam-Das.git
cd Sayam-Das

# 2. Install backend dependencies
cd backend && npm install

# 3. Install frontend dependencies
cd ../client && npm install
```

### Environment Variables

**Backend** — create `backend/.env`:

```env
PORT=5000
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
OWNER_EMAIL=your_email@example.com
RECAPTCHA_SECRET_KEY=6Le_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Frontend** — create `client/.env`:

```env
NEXT_PUBLIC_BACKEND_API=http://localhost:5000
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Le_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **Note:** Never commit `.env` files. Both are listed in `.gitignore`.

### Running Locally

Open two terminal sessions:

```bash
# Terminal 1 — Backend
cd backend
npm run dev
# ▶ Server running on http://localhost:5000

# Terminal 2 — Frontend
cd client
npm run dev
# ▶ App running on http://localhost:3000
```

---

## API Reference

### `POST /api/contact`

Submit a contact form message.

**Rate limit:** 5 requests per IP per 15 minutes.

**Request body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss...",
  "captchaToken": "<google-recaptcha-v2-token>"
}
```

**Responses:**

| Status | Body | Description |
|---|---|---|
| `200` | `{ "success": true, "message": "Message sent successfully!" }` | Validated and queued for delivery |
| `400` | `{ "success": false, "message": "..." }` | Validation or CAPTCHA failure |
| `429` | `{ "success": false, "message": "Too many requests." }` | Rate limit exceeded |
| `500` | `{ "success": false, "message": "Server error" }` | Internal server error |

**Flow:**

```
POST /api/contact
  │
  ├── Rate limiter check
  ├── Field validation (name, email, subject, message)
  ├── reCAPTCHA verification (Google API, 5s timeout)
  ├── ── Respond 200 OK immediately ──
  │
  └── [Background] Send email via Resend
```

---

## Features

| Feature | Details |
|---|---|
| Responsive Design | Mobile-first, tested across all breakpoints |
| Dark / Light Mode | Auto-detects time of day (19:00–07:00 = dark), persists via `localStorage` |
| Contact Form | reCAPTCHA v2, rate limiting, non-blocking email delivery |
| 3D Visuals | Three.js + React Three Fiber + Spline interactive scenes |
| Smooth Scrolling | Lenis scroll engine with RAF-based animation |
| SEO | Open Graph, Twitter cards, JSON-LD (Person + WebSite), sitemap.xml, robots.txt |
| Analytics | Vercel Analytics — zero-config, privacy-friendly |
| Performance | Static generation, font optimization, image optimization via Next.js |
| Security | reCAPTCHA v2, CORS allowlist, rate limiting, no secrets in client bundle |

---

## Deployment

### Frontend → Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel --prod
```

Set these environment variables in the Vercel dashboard:

```
NEXT_PUBLIC_BACKEND_API=https://your-backend.onrender.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
```

### Backend → Render

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repository
3. Set **Root Directory** to `backend`
4. Set **Build Command** to `npm install`
5. Set **Start Command** to `npm start`
6. Add environment variables:

```
PORT=5000
RESEND_API_KEY=your_key
OWNER_EMAIL=your_email
RECAPTCHA_SECRET_KEY=your_key
```

> **Cold start tip:** Free-tier Render instances spin down after inactivity. Use a cron job (e.g. [cron-job.org](https://cron-job.org)) to ping `GET /` every 5 minutes to keep the server warm.

---

## Contributing

This is a personal portfolio project and is not open for feature contributions. However, bug reports and suggestions are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b fix/your-fix`
3. Commit your changes: `git commit -m "fix: describe the fix"`
4. Push: `git push origin fix/your-fix`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## License

Copyright © 2025 Sayam Das. Released under the [MIT License](./LICENSE).

---

<div align="center">

Made by [Sayam Das](https://sayam-das.vercel.app) &nbsp;·&nbsp;
[GitHub](https://github.com/Sayam09das) &nbsp;·&nbsp;
[LinkedIn](https://www.linkedin.com/in/sayam-das-43a703287/)

</div>
