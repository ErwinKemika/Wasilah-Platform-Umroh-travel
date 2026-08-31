import { NextResponse } from "next/server";
import { getBooking } from "@/lib/bookings";

export function GET(
  _request: Request,
  { params }: { params: { code: string } },
) {
  const booking = getBooking(params.code);
  if (!booking) {
    return NextResponse.json(
      { error: "Kode pendaftaran tidak ditemukan" },
      { status: 404 },
    );
  }
  return NextResponse.json({ booking });
}
