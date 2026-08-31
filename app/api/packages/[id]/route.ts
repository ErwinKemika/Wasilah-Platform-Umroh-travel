import { NextResponse } from "next/server";
import { getPackage } from "@/data/packages";

export function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const pkg = getPackage(params.id);
  if (!pkg) {
    return NextResponse.json({ error: "Paket tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ package: pkg });
}
