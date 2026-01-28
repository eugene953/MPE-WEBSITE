import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MPE Digital Solutions | Transformez Votre Présence Numérique",
  description: "Nous créons des sites web, applications mobiles et expériences digitales exceptionnelles qui génèrent des résultats.",
  keywords: ["web development", "digital marketing", "design", "SEO", "applications mobiles", "sites web professionnels"],
  authors: [{ name: "MPE Digital Solutions" }],
  openGraph: {
    title: "MPE Digital Solutions",
    description: "Agence digitale de classe mondiale offrant des résultats exceptionnels",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
