import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "מכביפוד",
  description: "פודקאסט האוהדים על מכבי תל אביב בכדורסל",
  keywords: ["מכבי תל אביב", "פודקאסט", "כדורסל", "יורוליג"],
  openGraph: {
    title: "מכביפוד",
    description: "פודקאסט האוהדים על מכבי תל אביב בכדורסל",
    locale: "he_IL",
    type: "website",
    images: [{ url: "/logo-square.png", width: 1400, height: 1400, alt: "מכביפוד" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "מכביפוד",
    description: "פודקאסט האוהדים על מכבי תל אביב בכדורסל",
    images: ["/logo-square.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={rubik.variable}>
      <body className="bg-zinc-950 text-white antialiased font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
