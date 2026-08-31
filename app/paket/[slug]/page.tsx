import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingBox from "@/components/BookingBox";
import MobileBookingBar from "@/components/MobileBookingBar";
import { getPackage, packages } from "@/data/packages";
import { formatDate, formatIDR } from "@/lib/format";
import { packageImage, packageGallery } from "@/lib/images";

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

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 lg:pb-8">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Beranda
          </Link>{" "}
          /{" "}
          <Link href="/paket" className="hover:text-foreground">
            Paket
          </Link>{" "}
          / <span className="text-foreground">{pkg.title}</span>
        </nav>

        {/* Header */}
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-foreground">
                {pkg.type}
              </span>
              {pkg.featured && (
                <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                  Terpopuler
                </span>
              )}
              {pkg.verified && (
                <span className="rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  ✓ Travel Terverifikasi
                </span>
              )}
            </div>
            <h1 className="mt-3 text-3xl font-bold text-foreground">{pkg.title}</h1>
            <p className="mt-1 text-muted-foreground">
              oleh <span className="font-semibold">{pkg.travelName}</span> ·{" "}
              <span className="text-muted-foreground">{pkg.licenseNo}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              ★ {pkg.rating.toFixed(1)} · {pkg.reviewCount} ulasan jamaah
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: pkg.category, src: packageImage(pkg.id) },
            ...packageGallery(pkg.hotelMakkahStars).slice(1),
          ].map((g) => (
            <div
              key={g.label}
              className="relative h-44 overflow-hidden rounded-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.src}
                alt={g.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-4 text-sm font-medium text-white drop-shadow">
                {g.label}
              </span>
            </div>
          ))}
        </div>

        {/* Facts */}
        <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5 sm:grid-cols-3 md:grid-cols-6">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs text-muted-foreground">{k}</dt>
              <dd className="mt-0.5 text-sm font-semibold text-foreground">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-10">
          {/* Left column */}
          <div className="space-y-10">
            <Section title="Rencana Perjalanan">
              <ol className="space-y-4">
                {pkg.itinerary.map((d) => (
                  <li key={d.day} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-foreground">
                      {d.day}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{d.title}</p>
                      <p className="text-sm text-muted-foreground">{d.detail}</p>
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
                  <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-foreground">◆</span>
                    {f}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Termasuk & Tidak Termasuk">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    Sudah termasuk
                  </p>
                  <ul className="space-y-1.5">
                    {pkg.included.map((i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-emerald-600">✓</span>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-rose-600 dark:text-rose-400">
                    Belum termasuk
                  </p>
                  <ul className="space-y-1.5">
                    {pkg.excluded.map((i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-rose-500 dark:text-rose-400">✕</span>
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
                  <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-foreground">•</span>
                    {r}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Kebijakan Pembayaran">
              <div className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">
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

          {/* Right column — booking box (tersembunyi di mobile, diganti bar bawah) */}
          <div className="hidden lg:block">
            <BookingBox pkg={pkg} />
          </div>
        </div>
      </main>

      <SiteFooter />
      <div className="hidden lg:block">
        <WhatsAppButton
          message={`Assalamualaikum, saya tertarik dengan paket "${pkg.title}" dari ${pkg.travelName}. Boleh minta info lebih lanjut?`}
        />
      </div>
      <MobileBookingBar pkg={pkg} />
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
      <h2 className="mb-4 text-xl font-bold text-foreground">{title}</h2>
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
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{city}</p>
      <p className="mt-1 font-semibold text-foreground">{name}</p>
      <p className="text-sm text-amber-500">{"★".repeat(stars)}</p>
      <p className="mt-1 text-sm text-muted-foreground">{distance}</p>
    </div>
  );
}
