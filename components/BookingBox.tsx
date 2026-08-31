"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { UmrohPackage } from "@/data/packages";
import { formatIDR } from "@/lib/format";

const roomLabels: Record<string, string> = {
  quad: "Sekamar berempat (quad)",
  triple: "Sekamar bertiga (triple)",
  double: "Sekamar berdua (double)",
};

export default function BookingBox({ pkg }: { pkg: UmrohPackage }) {
  const router = useRouter();
  const [room, setRoom] = useState<"quad" | "triple" | "double">("quad");
  const [pax, setPax] = useState(1);

  const pricePerPax = pkg.roomPricing[room];
  const total = pricePerPax * pax;
  const dpTotal = pkg.dpIDR * pax;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24">
      <p className="text-xs text-muted-foreground">Harga mulai dari</p>
      <p className="text-2xl font-bold text-foreground">
        {formatIDR(pkg.priceIDR)}
        <span className="text-sm font-normal text-muted-foreground"> / jamaah</span>
      </p>

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Tipe kamar
        </p>
        <div className="space-y-2">
          {(["quad", "triple", "double"] as const).map((r) => (
            <label
              key={r}
              className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
                room === r
                  ? "border-primary bg-accent"
                  : "border-border bg-white hover:border-neutral-400"
              }`}
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="room"
                  checked={room === r}
                  onChange={() => setRoom(r)}
                  className="accent-primary"
                />
                {roomLabels[r]}
              </span>
              <span className="font-semibold text-foreground">
                {formatIDR(pkg.roomPricing[r])}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-muted-foreground">Jumlah jamaah</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPax((p) => Math.max(1, p - 1))}
            className="h-8 w-8 rounded-lg border border-border bg-white text-lg leading-none text-muted-foreground hover:border-neutral-400"
            aria-label="Kurangi"
          >
            −
          </button>
          <span className="w-6 text-center font-semibold">{pax}</span>
          <button
            onClick={() => setPax((p) => Math.min(20, p + 1))}
            className="h-8 w-8 rounded-lg border border-border bg-white text-lg leading-none text-muted-foreground hover:border-neutral-400"
            aria-label="Tambah"
          >
            +
          </button>
        </div>
      </div>

      <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <dt>
            {formatIDR(pricePerPax)} × {pax}
          </dt>
          <dd>{formatIDR(total)}</dd>
        </div>
        <div className="flex justify-between font-semibold text-foreground">
          <dt>Estimasi total</dt>
          <dd>{formatIDR(total)}</dd>
        </div>
        <div className="flex justify-between text-foreground">
          <dt>Bayar sekarang (DP)</dt>
          <dd className="font-semibold">{formatIDR(dpTotal)}</dd>
        </div>
      </dl>

      <button
        onClick={() =>
          router.push(`/paket/${pkg.slug}/daftar?room=${room}&pax=${pax}`)
        }
        className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
      >
        Lanjut Daftar
      </button>
      <a
        href={`https://wa.me/628110000000?text=${encodeURIComponent(
          `Assalamualaikum, saya ingin konsultasi paket "${pkg.title}".`,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 block w-full rounded-xl border border-primary px-4 py-3 text-center text-sm font-semibold text-foreground transition hover:bg-accent"
      >
        Konsultasi via WhatsApp
      </a>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Kursi belum terpotong sampai pembayaran DP dikonfirmasi.
      </p>
    </div>
  );
}
