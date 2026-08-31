"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { packages } from "@/data/packages";
import { formatIDR } from "@/lib/format";

export default function SavingsCalculator() {
  const cheapest = Math.min(...packages.map((p) => p.priceIDR));

  const [target, setTarget] = useState(String(28_000_000));
  const [saved, setSaved] = useState("5000000");
  const [months, setMonths] = useState(18);

  const result = useMemo(() => {
    const goal = Number(target) || 0;
    const now = Number(saved) || 0;
    const remaining = Math.max(0, goal - now);
    const perMonth = months > 0 ? Math.ceil(remaining / months / 50000) * 50000 : 0;
    return { remaining, perMonth };
  }, [target, saved, months]);

  const matches = packages
    .filter((p) => p.priceIDR <= Number(target))
    .sort((a, b) => b.priceIDR - a.priceIDR)
    .slice(0, 3);

  return (
    <div className="grid gap-8 rounded-3xl border border-border bg-card p-6 md:grid-cols-2 md:p-10">
      <div>
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
          Kalkulator Tabungan Umroh
        </h2>
        <p className="mt-2 text-muted-foreground">
          Tentukan target biaya dan waktu, kami hitung berapa yang perlu Anda
          sisihkan tiap bulan.
        </p>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Target biaya paket
            </span>
            <input
              type="range"
              min={cheapest}
              max={60_000_000}
              step={500_000}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full accent-primary"
            />
            <span className="mt-1 block text-lg font-bold text-foreground">
              {formatIDR(Number(target))}
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Tabungan saat ini
            </span>
            <input
              value={saved}
              onChange={(e) => setSaved(e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              className="input"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Rencana menabung: {months} bulan
            </span>
            <input
              type="range"
              min={3}
              max={48}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-ink to-ink-2 p-6 text-white">
        <div>
          <p className="text-sm text-white/70">Perlu ditabung per bulan</p>
          <p className="mt-1 text-4xl font-bold text-primary">
            {formatIDR(result.perMonth)}
          </p>
          <p className="mt-2 text-sm text-white/70">
            Sisa kebutuhan dana {formatIDR(result.remaining)} selama {months}{" "}
            bulan.
          </p>
        </div>

        <div className="mt-6 border-t border-white/15 pt-4">
          <p className="text-sm text-white/70">
            Paket yang masuk anggaran Anda:
          </p>
          <ul className="mt-2 space-y-1.5">
            {matches.length === 0 && (
              <li className="text-sm text-white/60">
                Naikkan target untuk melihat pilihan paket.
              </li>
            )}
            {matches.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/paket/${p.slug}`}
                  className="flex justify-between gap-3 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
                >
                  <span className="truncate">{p.title}</span>
                  <span className="shrink-0 font-semibold">
                    {formatIDR(p.priceIDR)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
