import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PackageBrowser from "@/components/PackageBrowser";

export const metadata = {
  title: "Daftar Paket Umroh & Haji — Wasilah",
};

export default function PaketPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-bold text-stone-900 md:text-3xl">
          Paket Umroh &amp; Haji
        </h1>
        <p className="mt-2 text-stone-500">
          Bandingkan harga, jadwal, hotel, dan fasilitas dari travel resmi mitra
          Wasilah.
        </p>
        <Suspense fallback={<p className="mt-8 text-stone-400">Memuat paket…</p>}>
          <PackageBrowser />
        </Suspense>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
