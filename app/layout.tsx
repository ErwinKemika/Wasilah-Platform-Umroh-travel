import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
