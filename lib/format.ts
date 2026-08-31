export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function monthKey(iso: string): string {
  return iso.slice(0, 7); // "2026-10"
}

export function monthLabel(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(new Date(iso + "T00:00:00"));
}

export function compactIDR(value: number): string {
  if (value >= 1_000_000) {
    const juta = value / 1_000_000;
    return `Rp${Number.isInteger(juta) ? juta : juta.toFixed(1)} jt`;
  }
  return formatIDR(value);
}
