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
  title: "Luciano & Auriscidia — 14 de Novembro 2025",
  description:
    "Convidamos você para celebrar a união de Luciano e Auriscidia no dia 14 de Novembro de 2025, em Luanda, Angola.",
  keywords: ["casamento", "wedding", "Luciano e Auriscidia", "convite", "RSVP", "Luanda"],
  openGraph: {
    title: "Luciano & Auriscidia — 14.11.2025",
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
    <html lang="pt" suppressHydrationWarning>
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