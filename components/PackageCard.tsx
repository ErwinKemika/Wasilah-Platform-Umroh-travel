import Link from "next/link";
import type { UmrohPackage } from "@/data/packages";
import { formatIDR, formatDate, compactIDR } from "@/lib/format";

export default function PackageCard({ pkg }: { pkg: UmrohPackage }) {
  const almostFull = pkg.seatsLeft <= 8;

  return (
    <Link
      href={`/paket/${pkg.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-linen-border bg-linen-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      {pkg.featured && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-white shadow">
          Terpopuler
        </span>
      )}

      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-wasilah-600 to-wasilah-900">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/70">
              {pkg.category} · {pkg.durationDays} hari
            </p>
            <h3 className="mt-1 text-lg font-bold leading-tight">{pkg.title}</h3>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-lg bg-white/15 px-2 py-1 text-sm font-semibold backdrop-blur">
            ★ {pkg.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-wasilah-700">{pkg.travelName}</p>
          {pkg.verified && (
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
              ✓ Terverifikasi
            </span>
          )}
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-stone-400">Keberangkatan</dt>
            <dd className="font-medium text-stone-700">
              {formatDate(pkg.departureDate)}
            </dd>
          </div>
          <div>
            <dt className="text-stone-400">Dari</dt>
            <dd className="font-medium text-stone-700">{pkg.embarkasi}</dd>
          </div>
          <div>
            <dt className="text-stone-400">Maskapai</dt>
            <dd className="font-medium text-stone-700">{pkg.airline}</dd>
          </div>
          <div>
            <dt className="text-stone-400">Hotel</dt>
            <dd className="font-medium text-stone-700">
              ★{pkg.hotelMakkahStars} Makkah · ★{pkg.hotelMadinahStars} Madinah
            </dd>
          </div>
        </dl>

        <ul className="mt-4 flex flex-wrap gap-2">
          {pkg.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full bg-wasilah-50 px-2.5 py-1 text-xs font-medium text-wasilah-700"
            >
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between border-t border-linen-border pt-4">
          <div>
            <p className="text-xs text-stone-400">Mulai dari</p>
            <p className="text-xl font-bold text-stone-900">
              {formatIDR(pkg.priceIDR)}
            </p>
            <p className="mt-0.5 text-xs text-stone-500">
              DP {compactIDR(pkg.dpIDR)} · cicilan tersedia
            </p>
            <p
              className={`mt-1 text-xs font-medium ${
                almostFull ? "text-rose-500" : "text-stone-400"
              }`}
            >
              Sisa {pkg.seatsLeft} dari {pkg.quota} kursi
            </p>
          </div>
          <span className="rounded-xl bg-wasilah-600 px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-wasilah-700">
            Lihat Detail
          </span>
        </div>
      </div>
    </Link>
  );
}
