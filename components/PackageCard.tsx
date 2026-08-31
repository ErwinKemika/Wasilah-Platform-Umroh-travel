import Link from "next/link";
import type { UmrohPackage } from "@/data/packages";
import { formatIDR, formatDate, compactIDR } from "@/lib/format";
import { packageImage } from "@/lib/images";

export default function PackageCard({ pkg }: { pkg: UmrohPackage }) {
  const almostFull = pkg.seatsLeft <= 8;

  return (
    <Link
      href={`/paket/${pkg.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      {pkg.featured && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
          Terpopuler
        </span>
      )}

      <div className="relative h-44 overflow-hidden bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={packageImage(pkg.id)}
          alt={pkg.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/80">
              {pkg.category} · {pkg.durationDays} hari
            </p>
            <h3 className="mt-1 text-lg font-bold leading-tight drop-shadow">
              {pkg.title}
            </h3>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-sm font-semibold backdrop-blur">
            ★ {pkg.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">{pkg.travelName}</p>
          {pkg.verified && (
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
              ✓ Terverifikasi
            </span>
          )}
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Keberangkatan</dt>
            <dd className="font-medium text-foreground">
              {formatDate(pkg.departureDate)}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Dari</dt>
            <dd className="font-medium text-foreground">{pkg.embarkasi}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Maskapai</dt>
            <dd className="font-medium text-foreground">{pkg.airline}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Hotel</dt>
            <dd className="font-medium text-foreground">
              ★{pkg.hotelMakkahStars} Makkah · ★{pkg.hotelMadinahStars} Madinah
            </dd>
          </div>
        </dl>

        <ul className="mt-4 flex flex-wrap gap-2">
          {pkg.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-foreground"
            >
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Mulai dari</p>
            <p className="text-xl font-bold text-foreground">
              {formatIDR(pkg.priceIDR)}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              DP {compactIDR(pkg.dpIDR)} · cicilan tersedia
            </p>
            <p
              className={`mt-1 text-xs font-medium ${
                almostFull ? "text-rose-500" : "text-muted-foreground"
              }`}
            >
              Sisa {pkg.seatsLeft} dari {pkg.quota} kursi
            </p>
          </div>
          <span className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition group-hover:brightness-95">
            Lihat Detail
          </span>
        </div>
      </div>
    </Link>
  );
}
