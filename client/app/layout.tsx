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
    default: "Sayam Das | Full Stack Developer & AI Engineer",
    template: "%s | Sayam Das",
  },

  description:
    "Portfolio of Sayam Das – Full Stack Developer specializing in Next.js, AI-powered applications, SaaS platforms, and modern web architecture.",

  keywords: [
    "Sayam Das",
    "Full Stack Developer",
    "Next.js Developer",
    "AI Developer",
    "Machine Learning Projects",
    "Portfolio",
    "Web Developer India",
  ],

  authors: [{ name: "Sayam Das", url: "https://sayam-das.vercel.app" }],
  creator: "Sayam Das",

  openGraph: {
    title: "Sayam Das | Full Stack Developer & AI Engineer",
    description:
      "Building AI-powered SaaS platforms, Web3 systems, and scalable full-stack applications.",
    url: "https://yourdomain.com",
    siteName: "Sayam Portfolio",
    images: [
      {
        url: "/og-image.png", // add this image in public folder
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
      "Full Stack Developer building AI & SaaS applications.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      "/favicon.ico",
      "/favicon-16x16.png",
      "/favicon-32x32.png"
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </LenisProvider>
        {typeof window !== 'undefined' && (
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
        )}
        <Analytics />
      </body>
    </html>
  );
}
