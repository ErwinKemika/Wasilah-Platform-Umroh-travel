import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ConfirmationView from "@/components/ConfirmationView";

export const metadata = { title: "Pendaftaran Diterima — Wasilah" };

export default function KonfirmasiPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <Suspense fallback={<p className="text-muted-foreground">Memuat…</p>}>
          <ConfirmationView />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
