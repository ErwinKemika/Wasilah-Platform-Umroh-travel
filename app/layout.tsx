import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f8f8f8",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Wasilah membantu Anda menemukan dan memesan paket umroh & haji terpercaya dari travel resmi berizin Kemenag.";

export const metadata: Metadata = {
  metadataBase: new URL("https://wasilah-umroh-app.vercel.app"),
  title: "Wasilah — Platform Booking Umroh & Haji",
  description,
  openGraph: {
    title: "Wasilah — Platform Booking Umroh & Haji",
    description,
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
