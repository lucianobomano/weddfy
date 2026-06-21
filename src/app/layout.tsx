import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Fernanda & Gustavo — 14 de Noviembre 2025",
  description:
    "Convidamos você para celebrar a união de Fernanda e Gustavo no dia 14 de Noviembre de 2025.",
  keywords: ["casamento", "wedding", "Fernanda e Gustavo", "convite", "RSVP"],
  openGraph: {
    title: "Fernanda & Gustavo — 14.11.2025",
    description: "Convidamos você para celebrar o nosso dia especial.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${greatVibes.variable} ${playfair.variable} ${inter.variable} antialiased`}
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          background: "#f5f2ed",
          color: "#333333",
        }}
      >
        {children}
      </body>
    </html>
  );
}