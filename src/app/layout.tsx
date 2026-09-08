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
  title: "Weddfy",
  description:
    "Convidamos você para celebrar a união de Osvaldo e Mirian no dia 16 de Outubro de 2026, em Luanda, Angola.",
  keywords: ["casamento", "wedding", "Osvaldo e Mirian", "convite", "RSVP", "Luanda"],
  openGraph: {
    title: "Weddfy",
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
          background: "#FAFAF9",
          color: "#810100",
        }}
      >
        {children}
      </body>
    </html>
  );
}