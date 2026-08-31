import { NextResponse } from "next/server";
import { getPackage } from "@/data/packages";
import { createBooking, type Pilgrim } from "@/lib/bookings";

type Body = {
  packageId?: string;
  roomType?: "quad" | "triple" | "double";
  contactName?: string;
  phone?: string;
  email?: string;
  pilgrims?: Pilgrim[];
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Format data tidak valid" }, { status: 400 });
  }

  const { packageId, roomType, contactName, phone, email, pilgrims } = body;

  if (!packageId || !roomType || !contactName || !phone || !email) {
    return NextResponse.json(
      { error: "Lengkapi data kontak, paket, dan tipe kamar." },
      { status: 400 },
    );
  }

  const pkg = getPackage(packageId);
  if (!pkg) {
    return NextResponse.json({ error: "Paket tidak ditemukan" }, { status: 404 });
  }

  const cleanPilgrims = (pilgrims ?? []).filter(
    (p) => p.fullName?.trim() && p.nik?.trim(),
  );
  if (cleanPilgrims.length === 0) {
    return NextResponse.json(
      { error: "Tambahkan minimal satu data jamaah." },
      { status: 400 },
    );
  }

  const pricePerPax = pkg.roomPricing[roomType];
  const total = pricePerPax * cleanPilgrims.length;
  const dpTotal = pkg.dpIDR * cleanPilgrims.length;

  const booking = createBooking({
    packageId: pkg.id,
    packageTitle: pkg.title,
    travelName: pkg.travelName,
    roomType,
    contactName,
    phone,
    email,
    embarkasi: pkg.embarkasi,
    pilgrims: cleanPilgrims,
    pricePerPax,
    total,
    dpTotal,
  });

  return NextResponse.json({ booking }, { status: 201 });
}
