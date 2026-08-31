import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wasilah — Platform Booking Umroh & Haji",
  description:
    "Wasilah membantu Anda menemukan dan memesan paket umroh & haji terpercaya dari travel resmi berizin Kemenag.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
