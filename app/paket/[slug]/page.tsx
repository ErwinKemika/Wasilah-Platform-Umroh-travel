import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingBox from "@/components/BookingBox";
import { getPackage, packages } from "@/data/packages";
import { formatDate, formatIDR } from "@/lib/format";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const pkg = getPackage(params.slug);
  return { title: pkg ? `${pkg.title} — ${pkg.travelName} | Wasilah` : "Paket" };
}

export default function PackageDetail({ params }: { params: { slug: string } }) {
  const pkg = getPackage(params.slug);
  if (!pkg) notFound();

  const facts = [
    ["Jenis", `${pkg.category}`],
    ["Durasi", `${pkg.durationDays} hari`],
    ["Keberangkatan", formatDate(pkg.departureDate)],
    ["Kota asal", pkg.embarkasi],
    ["Maskapai", pkg.airline],
    ["Sisa kursi", `${pkg.seatsLeft} dari ${pkg.quota}`],
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <nav className="text-sm text-stone-500">
          <Link href="/" className="hover:text-wasilah-700">
            Beranda
          </Link>{" "}
          /{" "}
          <Link href="/paket" className="hover:text-wasilah-700">
            Paket
          </Link>{" "}
          / <span className="text-stone-700">{pkg.title}</span>
        </nav>

        {/* Header */}
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-wasilah-100 px-2.5 py-1 text-xs font-semibold text-wasilah-800">
                {pkg.type}
              </span>
              {pkg.featured && (
                <span className="rounded-full bg-gold-500 px-2.5 py-1 text-xs font-semibold text-white">
                  Terpopuler
                </span>
              )}
              {pkg.verified && (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  ✓ Travel Terverifikasi
                </span>
              )}
            </div>
            <h1 className="mt-3 text-3xl font-bold text-stone-900">{pkg.title}</h1>
            <p className="mt-1 text-stone-600">
              oleh <span className="font-semibold">{pkg.travelName}</span> ·{" "}
              <span className="text-stone-500">{pkg.licenseNo}</span>
            </p>
            <p className="mt-1 text-sm text-stone-500">
              ★ {pkg.rating.toFixed(1)} · {pkg.reviewCount} ulasan jamaah
            </p>
          </div>
        </div>

        {/* Gallery placeholder */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Masjidil Haram", "from-wasilah-700 to-wasilah-900"],
            ["Masjid Nabawi", "from-wasilah-600 to-wasilah-800"],
            [`Hotel ★${pkg.hotelMakkahStars}`, "from-gold-500 to-wasilah-700"],
          ].map(([label, grad]) => (
            <div
              key={label}
              className={`flex h-40 items-end rounded-2xl bg-gradient-to-br ${grad} p-4 text-sm font-medium text-white/90`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Facts */}
        <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-linen-border bg-linen-card p-5 sm:grid-cols-3 md:grid-cols-6">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs text-stone-400">{k}</dt>
              <dd className="mt-0.5 text-sm font-semibold text-stone-800">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left column */}
          <div className="space-y-10">
            <Section title="Rencana Perjalanan">
              <ol className="space-y-4">
                {pkg.itinerary.map((d) => (
                  <li key={d.day} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-wasilah-100 text-sm font-bold text-wasilah-800">
                      {d.day}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800">{d.title}</p>
                      <p className="text-sm text-stone-500">{d.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>

            <Section title="Hotel & Akomodasi">
              <div className="grid gap-4 sm:grid-cols-2">
                <HotelCard
                  city="Makkah"
                  name={pkg.hotelMakkah}
                  stars={pkg.hotelMakkahStars}
                  distance={pkg.hotelMakkahDistance}
                />
                <HotelCard
                  city="Madinah"
                  name={pkg.hotelMadinah}
                  stars={pkg.hotelMadinahStars}
                  distance={pkg.hotelMadinahDistance}
                />
              </div>
            </Section>

            <Section title="Fasilitas & Perlengkapan">
              <ul className="grid gap-2 sm:grid-cols-2">
                {pkg.facilities.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-stone-600">
                    <span className="text-wasilah-600">◆</span>
                    {f}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Termasuk & Tidak Termasuk">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-semibold text-emerald-700">
                    Sudah termasuk
                  </p>
                  <ul className="space-y-1.5">
                    {pkg.included.map((i) => (
                      <li key={i} className="flex gap-2 text-sm text-stone-600">
                        <span className="text-emerald-600">✓</span>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-rose-600">
                    Belum termasuk
                  </p>
                  <ul className="space-y-1.5">
                    {pkg.excluded.map((i) => (
                      <li key={i} className="flex gap-2 text-sm text-stone-600">
                        <span className="text-rose-500">✕</span>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            <Section title="Syarat & Dokumen">
              <ul className="space-y-1.5">
                {pkg.requirements.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-stone-600">
                    <span className="text-wasilah-600">•</span>
                    {r}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Kebijakan Pembayaran">
              <div className="rounded-2xl border border-linen-border bg-linen-card p-5 text-sm text-stone-600">
                <p>
                  <span className="font-semibold text-stone-800">
                    Uang muka {formatIDR(pkg.dpIDR)}
                  </span>{" "}
                  per jamaah untuk mengunci kursi.
                </p>
                <p className="mt-2">
                  Pelunasan paling lambat 40 hari sebelum keberangkatan. Dana
                  ditahan Wasilah (rekening bersama) dan diteruskan bertahap ke
                  travel sesuai progres layanan.
                </p>
                <p className="mt-2">
                  Cicilan tersedia melewati mitra pembiayaan syariah (tenor 6–24
                  bulan).
                </p>
              </div>
            </Section>
          </div>

          {/* Right column — booking box */}
          <div>
            <BookingBox pkg={pkg} />
          </div>
        </div>
      </main>

      <SiteFooter />
      <WhatsAppButton
        message={`Assalamualaikum, saya tertarik dengan paket "${pkg.title}" dari ${pkg.travelName}. Boleh minta info lebih lanjut?`}
      />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-stone-900">{title}</h2>
      {children}
    </section>
  );
}

function HotelCard({
  city,
  name,
  stars,
  distance,
}: {
  city: string;
  name: string;
  stars: number;
  distance: string;
}) {
  return (
    <div className="rounded-2xl border border-linen-border bg-linen-card p-4">
      <p className="text-xs uppercase tracking-wide text-stone-400">{city}</p>
      <p className="mt-1 font-semibold text-stone-800">{name}</p>
      <p className="text-sm text-gold-500">{"★".repeat(stars)}</p>
      <p className="mt-1 text-sm text-stone-500">{distance}</p>
    </div>
  );
}
