import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#090909" },
  ],
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

// Set kelas tema sebelum paint supaya tidak ada kedip (flash) saat load.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
