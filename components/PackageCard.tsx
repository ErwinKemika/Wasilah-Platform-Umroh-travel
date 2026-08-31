import type { UmrohPackage } from "@/data/packages";
import { formatIDR, formatDate } from "@/lib/format";

export default function PackageCard({ pkg }: { pkg: UmrohPackage }) {
  const almostFull = pkg.seatsLeft <= 8;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
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
              {pkg.type} · {pkg.durationDays} hari
            </p>
            <h3 className="mt-1 text-lg font-bold leading-tight">{pkg.title}</h3>
          </div>
          <span className="flex items-center gap-1 rounded-lg bg-white/15 px-2 py-1 text-sm font-semibold backdrop-blur">
            ★ {pkg.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-medium text-wasilah-700">{pkg.travelName}</p>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-slate-400">Keberangkatan</dt>
            <dd className="font-medium text-slate-700">
              {formatDate(pkg.departureDate)}
            </dd>
          </div>
          <div>
            <dt className="text-slate-400">Maskapai</dt>
            <dd className="font-medium text-slate-700">{pkg.airline}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Hotel Makkah</dt>
            <dd className="font-medium text-slate-700">{pkg.hotelMakkah}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Hotel Madinah</dt>
            <dd className="font-medium text-slate-700">{pkg.hotelMadinah}</dd>
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

        <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-400">Mulai dari</p>
            <p className="text-xl font-bold text-slate-900">
              {formatIDR(pkg.priceIDR)}
            </p>
            <p
              className={`mt-1 text-xs font-medium ${
                almostFull ? "text-rose-500" : "text-slate-400"
              }`}
            >
              Sisa {pkg.seatsLeft} dari {pkg.quota} kursi
            </p>
          </div>
          <button className="rounded-xl bg-wasilah-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-wasilah-700">
            Pesan Sekarang
          </button>
        </div>
      </div>
    </article>
  );
}
