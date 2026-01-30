import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";

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
    <html lang="fr">
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
