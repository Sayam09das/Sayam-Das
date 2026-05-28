import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./context/ThemeContext";
import LenisProvider from "./components/LenisProvider";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sayam-das.vercel.app"),

  title: {
    default: "Sayam Das | Full Stack Developer",
    template: "%s | Sayam Das",
  },

  description:
    "Portfolio of Sayam Das – Full Stack Developer building modern web applications with Next.js, scalable backend systems, and beautiful UI.",

  applicationName: "Sayam Das",

  keywords: [
    "Sayam Das",
    "Full Stack Developer",
    "Next.js Developer",
    "Portfolio",
    "Web Developer India",
    "JavaScript Developer",
  ],

  authors: [{ name: "Sayam Das", url: "https://sayam-das.vercel.app" }],
  creator: "Sayam Das",

  verification: {
    google: "o1jKI6-J714LGmYzyktVCFoJcbvMPvmrxL8RZ66FpI4",
  },

  alternates: {
    canonical: "https://sayam-das.vercel.app",
  },

  openGraph: {
    title: "Sayam Das | Full Stack Developer",
    description:
      "Portfolio of Sayam Das – Full Stack Developer building modern web applications using Next.js and scalable backend systems.",
    url: "https://sayam-das.vercel.app",
    siteName: "Sayam Das",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sayam Das Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sayam Das | Full Stack Developer",
    description:
      "Full Stack Developer building modern web applications and scalable backend systems.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon-16x16.png",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sayam Das",
    url: "https://sayam-das.vercel.app",
    image: "https://sayam-das.vercel.app/og-image.png",
    sameAs: [
      "https://github.com/yourgithub",
      "https://linkedin.com/in/yourlinkedin",
      "https://twitter.com/yourtwitter"
    ],
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sayam Das",
    alternateName: "Sayam Das Portfolio",
    url: "https://sayam-das.vercel.app"
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LenisProvider>

        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Theme Auto Mode */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const saved = localStorage.getItem('theme-preference');
                if (saved === 'dark' || (saved !== 'light' && (new Date().getHours() >= 19 || new Date().getHours() < 7))) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />

        <Analytics />
      </body>
    </html>
  );
}