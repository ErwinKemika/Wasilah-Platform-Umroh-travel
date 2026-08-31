"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PackageCard from "@/components/PackageCard";
import { packages as allPackages, embarkasiList, type UmrohPackage } from "@/data/packages";
import { monthKey, monthLabel, compactIDR } from "@/lib/format";

const priceStops = [30_000_000, 45_000_000, 100_000_000, 300_000_000];

const monthOptions = Array.from(
  new Set(allPackages.map((p) => monthKey(p.departureDate))),
)
  .sort()
  .map((key) => ({
    key,
    label: monthLabel(`${key}-01`),
  }));

export default function PackageBrowser() {
  const params = useSearchParams();

  const [type, setType] = useState(params.get("type") ?? "");
  const [month, setMonth] = useState(params.get("month") ?? "");
  const [embarkasi, setEmbarkasi] = useState(params.get("embarkasi") ?? "");
  const [maxPrice, setMaxPrice] = useState(params.get("maxPrice") ?? "");
  const [stars, setStars] = useState(params.get("stars") ?? "");
  const [q, setQ] = useState(params.get("q") ?? "");
  const [sort, setSort] = useState("recommended");

  const [results, setResults] = useState<UmrohPackage[]>(allPackages);
  const [loading, setLoading] = useState(false);

  const query = useMemo(() => {
    const sp = new URLSearchParams();
    if (type) sp.set("type", type);
    if (month) sp.set("month", month);
    if (embarkasi) sp.set("embarkasi", embarkasi);
    if (maxPrice) sp.set("maxPrice", maxPrice);
    if (stars) sp.set("stars", stars);
    if (q.trim()) sp.set("q", q.trim());
    if (sort) sp.set("sort", sort);
    return sp.toString();
  }, [type, month, embarkasi, maxPrice, stars, q, sort]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const t = setTimeout(() => {
      fetch(`/api/packages?${query}`)
        .then((r) => r.json())
        .then((data) => {
          if (active) setResults(data.packages ?? []);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 200);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [query]);

  const activeFilters = [type, month, embarkasi, maxPrice, stars, q.trim()].filter(
    Boolean,
  ).length;

  function reset() {
    setType("");
    setMonth("");
    setEmbarkasi("");
    setMaxPrice("");
    setStars("");
    setQ("");
    setSort("recommended");
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Filter panel */}
      <aside className="h-fit rounded-2xl border border-linen-border bg-linen-card p-5 lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-stone-900">Filter</h2>
          {activeFilters > 0 && (
            <button
              onClick={reset}
              className="text-xs font-medium text-wasilah-700 hover:underline"
            >
              Reset ({activeFilters})
            </button>
          )}
        </div>

        <FilterGroup label="Cari">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Nama paket / travel / kota"
            className="w-full rounded-lg border border-linen-border bg-white px-3 py-2 text-sm outline-none focus:border-wasilah-500"
          />
        </FilterGroup>

        <FilterGroup label="Jenis ibadah">
          <Segmented
            value={type}
            onChange={setType}
            options={[
              { value: "", label: "Semua" },
              { value: "Umroh", label: "Umroh" },
              { value: "Haji", label: "Haji" },
            ]}
          />
        </FilterGroup>

        <FilterGroup label="Bulan keberangkatan">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full rounded-lg border border-linen-border bg-white px-3 py-2 text-sm outline-none focus:border-wasilah-500"
          >
            <option value="">Kapan saja</option>
            {monthOptions.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </select>
        </FilterGroup>

        <FilterGroup label="Kota keberangkatan">
          <select
            value={embarkasi}
            onChange={(e) => setEmbarkasi(e.target.value)}
            className="w-full rounded-lg border border-linen-border bg-white px-3 py-2 text-sm outline-none focus:border-wasilah-500"
          >
            <option value="">Semua kota</option>
            {embarkasiList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FilterGroup>

        <FilterGroup label="Budget maksimal">
          <div className="flex flex-wrap gap-2">
            {priceStops.map((p) => (
              <button
                key={p}
                onClick={() => setMaxPrice(maxPrice === String(p) ? "" : String(p))}
                className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                  maxPrice === String(p)
                    ? "border-wasilah-600 bg-wasilah-600 text-white"
                    : "border-linen-border bg-white text-stone-600 hover:border-wasilah-400"
                }`}
              >
                ≤ {compactIDR(p)}
              </button>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label="Bintang hotel (minimal)">
          <Segmented
            value={stars}
            onChange={setStars}
            options={[
              { value: "", label: "Semua" },
              { value: "3", label: "★3" },
              { value: "4", label: "★4" },
              { value: "5", label: "★5" },
            ]}
          />
        </FilterGroup>
      </aside>

      {/* Results */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone-500">
            {loading ? "Memuat…" : `${results.length} paket ditemukan`}
          </p>
          <label className="flex items-center gap-2 text-sm text-stone-600">
            Urutkan
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-linen-border bg-white px-3 py-2 text-sm outline-none focus:border-wasilah-500"
            >
              <option value="recommended">Rekomendasi</option>
              <option value="price-asc">Harga termurah</option>
              <option value="price-desc">Harga tertinggi</option>
              <option value="rating-desc">Rating tertinggi</option>
              <option value="date-asc">Keberangkatan terdekat</option>
            </select>
          </label>
        </div>

        {results.length === 0 && !loading ? (
          <div className="rounded-2xl border border-dashed border-linen-border bg-linen-card p-10 text-center">
            <p className="font-medium text-stone-700">
              Tidak ada paket yang cocok dengan filter Anda.
            </p>
            <button
              onClick={reset}
              className="mt-3 text-sm font-semibold text-wasilah-700 hover:underline"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-3 ${
              loading ? "opacity-60" : ""
            }`}
          >
            {results.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
        {label}
      </p>
      {children}
    </div>
  );
}

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex overflow-hidden rounded-lg border border-linen-border">
      {options.map((o, i) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`flex-1 px-2 py-1.5 text-xs font-medium transition ${
            i > 0 ? "border-l border-linen-border" : ""
          } ${
            value === o.value
              ? "bg-wasilah-600 text-white"
              : "bg-white text-stone-600 hover:bg-wasilah-50"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
