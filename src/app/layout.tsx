import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WËBS // OFFICIAL SOUND VAULT — Beats, Drum Kits & Multi-Kits",
  description:
    "Official website for music producer Wëbs (@webs_certified). Underground rage, hyperpop, glitchcore, sound kits, drum multi-kits, and beat crates.",
  keywords: [
    "Wëbs",
    "webs certified",
    "HYPERP!NK",
    "underground trap",
    "rage drum kit",
    "loop kits",
    "music producer",
    "2hollis type",
    "beats",
  ],
  authors: [{ name: "Wëbs", url: "https://youtube.com/@webs_certified" }],
  openGraph: {
    title: "WËBS // OFFICIAL SOUND VAULT",
    description: "SCROLL BUILDS A BEAT — High-voltage underground sound kits and beats.",
    siteName: "Wëbs Certified",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className="font-body bg-obsidian text-text-pure antialiased selection:bg-redline selection:text-white min-h-screen"
      >
        <div className="fixed inset-0 grain-overlay z-50 pointer-events-none" />
        <div className="fixed inset-0 scanlines opacity-40 z-40 pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
