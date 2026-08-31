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
  const [filtersOpen, setFiltersOpen] = useState(false);

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
    <div className="mt-6 grid gap-4 lg:mt-8 lg:grid-cols-[260px_1fr] lg:gap-8">
      {/* Filter panel */}
      <aside className="h-fit rounded-2xl border border-border bg-card p-4 sm:p-5 lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center gap-2 font-semibold text-foreground lg:pointer-events-none"
          >
            Filter
            {activeFilters > 0 && (
              <span className="rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">
                {activeFilters}
              </span>
            )}
            <span className="text-muted-foreground lg:hidden">
              {filtersOpen ? "▲" : "▼"}
            </span>
          </button>
          {activeFilters > 0 && (
            <button
              onClick={reset}
              className="text-xs font-medium text-foreground hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        <div className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
        <FilterGroup label="Cari">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Nama paket / travel / kota"
            className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-base outline-none focus:border-ring sm:text-sm"
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
            className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-base outline-none focus:border-ring sm:text-sm"
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
            className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-base outline-none focus:border-ring sm:text-sm"
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
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-white text-muted-foreground hover:border-neutral-400"
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
        </div>
      </aside>

      {/* Results */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {loading ? "Memuat…" : `${results.length} paket ditemukan`}
          </p>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            Urutkan
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-border bg-white px-3 py-2.5 text-base outline-none focus:border-ring sm:text-sm"
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
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="font-medium text-foreground">
              Tidak ada paket yang cocok dengan filter Anda.
            </p>
            <button
              onClick={reset}
              className="mt-3 text-sm font-semibold text-foreground hover:underline"
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
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
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
    <div className="flex overflow-hidden rounded-lg border border-border">
      {options.map((o, i) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`flex-1 px-2 py-1.5 text-xs font-medium transition ${
            i > 0 ? "border-l border-border" : ""
          } ${
            value === o.value
              ? "bg-primary text-primary-foreground"
              : "bg-white text-muted-foreground hover:bg-accent"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
