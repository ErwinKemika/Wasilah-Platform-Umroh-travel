"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { packages, embarkasiList } from "@/data/packages";
import { monthKey, monthLabel } from "@/lib/format";

const monthOptions = Array.from(
  new Set(packages.map((p) => monthKey(p.departureDate))),
)
  .sort()
  .map((key) => ({ key, label: monthLabel(`${key}-01`) }));

export default function HeroSearch() {
  const router = useRouter();
  const [type, setType] = useState("");
  const [month, setMonth] = useState("");
  const [embarkasi, setEmbarkasi] = useState("");

  function search() {
    const sp = new URLSearchParams();
    if (type) sp.set("type", type);
    if (month) sp.set("month", month);
    if (embarkasi) sp.set("embarkasi", embarkasi);
    router.push(`/paket${sp.toString() ? `?${sp}` : ""}`);
  }

  return (
    <div className="mt-10 grid gap-3 rounded-2xl bg-white/95 p-4 text-foreground shadow-xl sm:grid-cols-2 lg:grid-cols-4">
      <Select
        label="Jenis"
        value={type}
        onChange={setType}
        options={[
          { value: "", label: "Umroh & Haji" },
          { value: "Umroh", label: "Umroh" },
          { value: "Haji", label: "Haji" },
        ]}
      />
      <Select
        label="Bulan"
        value={month}
        onChange={setMonth}
        options={[
          { value: "", label: "Kapan saja" },
          ...monthOptions.map((m) => ({ value: m.key, label: m.label })),
        ]}
      />
      <Select
        label="Kota berangkat"
        value={embarkasi}
        onChange={setEmbarkasi}
        options={[
          { value: "", label: "Semua kota" },
          ...embarkasiList.map((c) => ({ value: c, label: c })),
        ]}
      />
      <button
        onClick={search}
        className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
      >
        Cari Paket
      </button>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block text-left">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-base outline-none focus:border-ring sm:text-sm"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
