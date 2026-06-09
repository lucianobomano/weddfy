import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Ana & Miguel — Casamento 12 de Setembro 2026",
  description:
    "Convidamos você para celebrar a união de Ana e Miguel no dia 12 de Setembro de 2026, em Luanda, Angola. Confirme a sua presença.",
  keywords: ["casamento", "wedding", "Ana e Miguel", "convite", "RSVP", "Luanda"],
  openGraph: {
    title: "Ana & Miguel — Casamento 12.09.2026",
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
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} antialiased`}
        style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), serif", background: "#faf6ee" }}
      >
        {children}
      </body>
    </html>
  );
}
