import { NextResponse } from "next/server";
import { packages } from "@/data/packages";
import { monthKey } from "@/lib/format";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type"); // "Umroh" | "Haji"
  const month = searchParams.get("month"); // "2026-10"
  const embarkasi = searchParams.get("embarkasi");
  const maxPrice = Number(searchParams.get("maxPrice")) || 0;
  const minStars = Number(searchParams.get("stars")) || 0;
  const q = (searchParams.get("q") || "").toLowerCase().trim();
  const sort = searchParams.get("sort") || "recommended";

  let result = packages.filter((p) => {
    if (type && p.type !== type) return false;
    if (month && monthKey(p.departureDate) !== month) return false;
    if (embarkasi && p.embarkasi !== embarkasi) return false;
    if (maxPrice && p.priceIDR > maxPrice) return false;
    if (minStars && Math.min(p.hotelMakkahStars, p.hotelMadinahStars) < minStars)
      return false;
    if (
      q &&
      !`${p.title} ${p.travelName} ${p.category} ${p.airline}`
        .toLowerCase()
        .includes(q)
    )
      return false;
    return true;
  });

  result = [...result].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.priceIDR - b.priceIDR;
      case "price-desc":
        return b.priceIDR - a.priceIDR;
      case "rating-desc":
        return b.rating - a.rating;
      case "date-asc":
        return a.departureDate.localeCompare(b.departureDate);
      default:
        return (
          Number(b.featured ?? false) - Number(a.featured ?? false) ||
          b.rating - a.rating
        );
    }
  });

  return NextResponse.json({ count: result.length, packages: result });
}
