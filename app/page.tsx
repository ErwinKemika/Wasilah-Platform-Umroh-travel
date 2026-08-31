import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import Hero from "@/components/Hero";
import PackageCard from "@/components/PackageCard";
import SavingsCalculator from "@/components/SavingsCalculator";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import { packages } from "@/data/packages";

export default function Home() {
  const featured = [...packages]
    .sort(
      (a, b) =>
        Number(b.featured ?? false) - Number(a.featured ?? false) ||
        b.rating - a.rating,
    )
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <Hero />

      {/* Paket */}
      <section id="paket" className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Paket keberangkatan pilihan
            </h2>
            <p className="mt-2 text-muted-foreground">
              Harga sudah termasuk tiket, hotel, visa, dan bimbingan ibadah.
            </p>
          </div>
          <Link
            href="/paket"
            className="rounded-xl border border-primary px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent"
          >
            Lihat semua paket →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* Keunggulan */}
      <section id="keunggulan" className="bg-card py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-10 text-2xl font-bold text-foreground md:text-3xl">
            Kenapa memesan lewat Wasilah?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Travel terverifikasi",
                desc: "Setiap mitra dicek izin PPIU/PIHK-nya. Tidak ada travel abal-abal.",
              },
              {
                title: "Harga apa adanya",
                desc: "Rincian biaya terbuka. Tidak ada biaya tersembunyi menjelang berangkat.",
              },
              {
                title: "Dana aman (rekening bersama)",
                desc: "Pembayaran ditahan Wasilah dan diteruskan bertahap sesuai progres layanan.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-secondary p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-foreground">
                  ✓
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kalkulator */}
      <section id="kalkulator" className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <SavingsCalculator />
      </section>

      {/* Testimoni */}
      <section id="testimoni" className="bg-card py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Testimonials />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <Faq />
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
