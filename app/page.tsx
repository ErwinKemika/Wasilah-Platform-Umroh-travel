import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSearch from "@/components/HeroSearch";
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-wasilah-900 via-wasilah-700 to-wasilah-600 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_15%_25%,white_1.5px,transparent_1.5px)] [background-size:34px_34px]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            Semua travel berizin resmi Kemenag
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
            Booking Umroh &amp; Haji jadi mudah, transparan, dan terpercaya
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
            Wasilah mempertemukan Anda dengan puluhan travel pilihan. Bandingkan
            harga, jadwal, hotel, dan fasilitas — lalu daftar dalam hitungan
            menit.
          </p>

          <HeroSearch />

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-8">
            {[
              ["120+", "Travel mitra"],
              ["35.000+", "Jamaah terlayani"],
              ["4.8/5", "Rating kepuasan"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-bold">{value}</dt>
                <dd className="text-xs text-white/70">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Paket */}
      <section id="paket" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 md:text-3xl">
              Paket keberangkatan pilihan
            </h2>
            <p className="mt-2 text-stone-500">
              Harga sudah termasuk tiket, hotel, visa, dan bimbingan ibadah.
            </p>
          </div>
          <Link
            href="/paket"
            className="rounded-xl border border-wasilah-600 px-4 py-2.5 text-sm font-semibold text-wasilah-700 transition hover:bg-wasilah-50"
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
      <section id="keunggulan" className="bg-linen-card py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-2xl font-bold text-stone-900 md:text-3xl">
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
                className="rounded-2xl border border-linen-border bg-linen/40 p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-wasilah-50 text-wasilah-600">
                  ✓
                </div>
                <h3 className="font-semibold text-stone-900">{f.title}</h3>
                <p className="mt-2 text-sm text-stone-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kalkulator */}
      <section id="kalkulator" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <SavingsCalculator />
      </section>

      {/* Testimoni */}
      <section id="testimoni" className="bg-linen-card py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Testimonials />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Faq />
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
