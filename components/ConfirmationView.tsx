"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Booking } from "@/lib/bookings";
import { formatIDR } from "@/lib/format";

export default function ConfirmationView() {
  const code = useSearchParams().get("code");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "notfound">("loading");

  useEffect(() => {
    if (!code) {
      setStatus("notfound");
      return;
    }
    try {
      const cached = sessionStorage.getItem(`wsl-booking-${code}`);
      if (cached) {
        setBooking(JSON.parse(cached));
        setStatus("ok");
        return;
      }
    } catch {}
    fetch(`/api/pendaftaran/${code}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setBooking(data.booking);
        setStatus("ok");
      })
      .catch(() => setStatus("notfound"));
  }, [code]);

  if (status === "loading") {
    return <p className="text-muted-foreground">Memuat data pendaftaran…</p>;
  }

  if (status === "notfound" || !booking) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="font-semibold text-foreground">
          Data pendaftaran tidak ditemukan.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Kode mungkin salah atau sesi server sudah di-restart (data prototipe
          disimpan sementara).
        </p>
        <Link
          href="/paket"
          className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Lihat Paket Lain
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
          ✓
        </div>
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          Pendaftaran diterima
        </h1>
        <p className="mt-1 text-muted-foreground">
          Tim {booking.travelName} akan menghubungi Anda maksimal 1×24 jam untuk
          verifikasi.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="text-sm text-muted-foreground">Kode pendaftaran</span>
          <span className="rounded-lg bg-accent px-3 py-1 font-mono text-sm font-bold text-foreground">
            {booking.code}
          </span>
        </div>
        <dl className="mt-4 space-y-2 text-sm">
          <Row k="Paket" v={booking.packageTitle} />
          <Row k="Kota keberangkatan" v={booking.embarkasi} />
          <Row k="Jumlah jamaah" v={`${booking.pilgrims.length} orang`} />
          <Row k="Atas nama" v={booking.contactName} />
          <Row k="Kontak" v={`${booking.phone} · ${booking.email}`} />
          <div className="my-2 border-t border-border" />
          <Row k="Estimasi total" v={formatIDR(booking.total)} />
          <Row k="Bayar DP sekarang" v={formatIDR(booking.dpTotal)} bold />
        </dl>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-white p-6">
        <p className="font-semibold text-foreground">Langkah selanjutnya</p>
        <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>1. Transfer DP ke rekening bersama Wasilah (instruksi dikirim via email).</li>
          <li>2. Unggah paspor & dokumen jamaah di tautan yang dikirim tim travel.</li>
          <li>3. Ikuti jadwal manasik yang diinformasikan H-30.</li>
        </ol>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href={`https://wa.me/628110000000?text=${encodeURIComponent(
            `Assalamualaikum, saya sudah mendaftar paket "${booking.packageTitle}" dengan kode ${booking.code}.`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Hubungi via WhatsApp
        </a>
        <Link
          href="/paket"
          className="rounded-xl border border-primary px-5 py-2.5 text-sm font-semibold text-foreground"
        >
          Kembali ke Daftar Paket
        </Link>
      </div>
    </div>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{k}</dt>
      <dd
        className={`text-right ${
          bold ? "font-bold text-foreground" : "text-foreground"
        }`}
      >
        {v}
      </dd>
    </div>
  );
}
