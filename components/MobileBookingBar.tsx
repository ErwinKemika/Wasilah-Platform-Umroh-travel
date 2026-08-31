import Link from "next/link";
import type { UmrohPackage } from "@/data/packages";
import { formatIDR } from "@/lib/format";

export default function MobileBookingBar({ pkg }: { pkg: UmrohPackage }) {
  const wa = `https://wa.me/628110000000?text=${encodeURIComponent(
    `Assalamualaikum, saya ingin konsultasi paket "${pkg.title}".`,
  )}`;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card px-4 pt-3 lg:hidden"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-muted-foreground">Mulai dari</p>
          <p className="truncate text-base font-bold text-foreground">
            {formatIDR(pkg.priceIDR)}
          </p>
        </div>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Konsultasi via WhatsApp"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-emerald-600"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.05 1.6 5.78L2 22l4.42-1.68a9.9 9.9 0 0 0 5.62 1.74h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.52 12.94c-.25.7-1.44 1.32-1.98 1.36-.53.05-1.03.24-3.47-.72-2.91-1.15-4.78-4.12-4.93-4.31-.14-.19-1.19-1.58-1.19-3.02s.76-2.14 1.03-2.43c.27-.29.58-.36.78-.36l.56.01c.18.01.42-.07.66.5.25.6.84 2.07.91 2.22.07.15.12.32.02.51-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.17.29.75 1.24 1.61 2 1.11.99 2.05 1.3 2.34 1.44.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.66-.14.27.1 1.71.81 2 .96.29.15.48.22.55.34.07.12.07.72-.18 1.42Z" />
          </svg>
        </a>
        <Link
          href={`/paket/${pkg.slug}/daftar`}
          className="shrink-0 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Daftar
        </Link>
      </div>
    </div>
  );
}
