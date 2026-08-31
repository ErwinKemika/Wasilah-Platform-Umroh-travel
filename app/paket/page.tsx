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
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Paket Umroh &amp; Haji
        </h1>
        <p className="mt-2 text-muted-foreground">
          Bandingkan harga, jadwal, hotel, dan fasilitas dari travel resmi mitra
          Wasilah.
        </p>
        <Suspense fallback={<p className="mt-8 text-muted-foreground">Memuat paket…</p>}>
          <PackageBrowser />
        </Suspense>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
