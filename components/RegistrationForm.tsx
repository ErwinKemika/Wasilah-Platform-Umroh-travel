"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { UmrohPackage } from "@/data/packages";
import { formatIDR } from "@/lib/format";

type Room = "quad" | "triple" | "double";
type Pilgrim = { fullName: string; nik: string; gender: "L" | "P" };

const roomLabels: Record<Room, string> = {
  quad: "Sekamar berempat (quad)",
  triple: "Sekamar bertiga (triple)",
  double: "Sekamar berdua (double)",
};

const steps = ["Kontak & Paket", "Data Jamaah", "Ringkasan & Pembayaran"];

export default function RegistrationForm({ pkg }: { pkg: UmrohPackage }) {
  const router = useRouter();
  const params = useSearchParams();

  const initialRoom = (params.get("room") as Room) || "quad";
  const initialPax = Math.min(
    20,
    Math.max(1, Number(params.get("pax")) || 1),
  );

  const [step, setStep] = useState(0);
  const [room, setRoom] = useState<Room>(
    ["quad", "triple", "double"].includes(initialRoom) ? initialRoom : "quad",
  );
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [pilgrims, setPilgrims] = useState<Pilgrim[]>(
    Array.from({ length: initialPax }, () => ({
      fullName: "",
      nik: "",
      gender: "L" as const,
    })),
  );
  const [payment, setPayment] = useState<"dp" | "full">("dp");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const pricePerPax = pkg.roomPricing[room];
  const total = pricePerPax * pilgrims.length;
  const dpTotal = pkg.dpIDR * pilgrims.length;
  const payNow = payment === "dp" ? dpTotal : total;

  function setPaxCount(n: number) {
    const count = Math.min(20, Math.max(1, n));
    setPilgrims((prev) => {
      const next = [...prev];
      while (next.length < count)
        next.push({ fullName: "", nik: "", gender: "L" });
      return next.slice(0, count);
    });
  }

  function updatePilgrim(i: number, patch: Partial<Pilgrim>) {
    setPilgrims((prev) =>
      prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)),
    );
  }

  function next() {
    setError("");
    if (step === 0) {
      if (!contact.name || !contact.phone || !contact.email) {
        setError("Lengkapi nama, nomor HP, dan email pemesan.");
        return;
      }
    }
    if (step === 1) {
      const incomplete = pilgrims.some((p) => !p.fullName.trim() || !p.nik.trim());
      if (incomplete) {
        setError("Lengkapi nama dan NIK untuk setiap jamaah.");
        return;
      }
    }
    setStep((s) => Math.min(steps.length - 1, s + 1));
  }

  async function submit() {
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/pendaftaran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: pkg.id,
          roomType: room,
          contactName: contact.name,
          phone: contact.phone,
          email: contact.email,
          pilgrims,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan. Coba lagi.");
        setSubmitting(false);
        return;
      }
      // Simpan hasil booking di browser supaya halaman konfirmasi tetap
      // tampil walau server (mis. serverless di Vercel) tak menyimpan state.
      try {
        sessionStorage.setItem(
          `wsl-booking-${data.booking.code}`,
          JSON.stringify(data.booking),
        );
      } catch {}
      router.push(`/konfirmasi?code=${data.booking.code}`);
    } catch {
      setError("Gagal terhubung ke server. Coba lagi.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-8">
      {/* Stepper */}
      <ol className="mb-8 flex items-center gap-2 text-sm">
        {steps.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                i <= step
                  ? "bg-primary text-primary-foreground"
                  : "bg-border text-muted-foreground"
              }`}
            >
              {i + 1}
            </span>
            <span
              className={
                i === step ? "font-semibold text-foreground" : "text-muted-foreground"
              }
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <span className="mx-1 h-px w-6 bg-border" />
            )}
          </li>
        ))}
      </ol>

      <div className="rounded-2xl border border-border bg-card p-6">
        {/* Step 1 */}
        {step === 0 && (
          <div className="space-y-4">
            <Field label="Nama pemesan (penanggung jawab)">
              <input
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
                className="input"
                placeholder="Nama lengkap"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nomor HP / WhatsApp">
                <input
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({ ...contact, phone: e.target.value })
                  }
                  className="input"
                  placeholder="08xxxxxxxxxx"
                  inputMode="tel"
                />
              </Field>
              <Field label="Email">
                <input
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                  className="input"
                  placeholder="nama@email.com"
                  inputMode="email"
                />
              </Field>
            </div>

            <Field label="Tipe kamar">
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value as Room)}
                className="input"
              >
                {(["quad", "triple", "double"] as const).map((r) => (
                  <option key={r} value={r}>
                    {roomLabels[r]} — {formatIDR(pkg.roomPricing[r])}/jamaah
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Jumlah jamaah">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPaxCount(pilgrims.length - 1)}
                  className="h-9 w-9 rounded-lg border border-border bg-white text-lg text-muted-foreground"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">
                  {pilgrims.length}
                </span>
                <button
                  type="button"
                  onClick={() => setPaxCount(pilgrims.length + 1)}
                  className="h-9 w-9 rounded-lg border border-border bg-white text-lg text-muted-foreground"
                >
                  +
                </button>
              </div>
            </Field>
          </div>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <div className="space-y-5">
            {pilgrims.map((p, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-white p-4"
              >
                <p className="mb-3 text-sm font-semibold text-foreground">
                  Jamaah {i + 1}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Nama lengkap (sesuai paspor)">
                    <input
                      value={p.fullName}
                      onChange={(e) =>
                        updatePilgrim(i, { fullName: e.target.value })
                      }
                      className="input"
                    />
                  </Field>
                  <Field label="NIK (16 digit)">
                    <input
                      value={p.nik}
                      onChange={(e) => updatePilgrim(i, { nik: e.target.value })}
                      className="input"
                      inputMode="numeric"
                      maxLength={16}
                    />
                  </Field>
                </div>
                <div className="mt-3">
                  <Field label="Jenis kelamin">
                    <div className="flex gap-2">
                      {(["L", "P"] as const).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => updatePilgrim(i, { gender: g })}
                          className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                            p.gender === g
                              ? "border-primary bg-accent text-foreground"
                              : "border-border bg-white text-muted-foreground"
                          }`}
                        >
                          {g === "L" ? "Laki-laki" : "Perempuan"}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">
              Unggah paspor & dokumen pendukung akan diminta setelah DP
              dikonfirmasi.
            </p>
          </div>
        )}

        {/* Step 3 */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="rounded-xl border border-border bg-white p-4 text-sm">
              <Row k="Paket" v={pkg.title} />
              <Row k="Travel" v={pkg.travelName} />
              <Row k="Keberangkatan" v={pkg.embarkasi} />
              <Row k="Tipe kamar" v={roomLabels[room]} />
              <Row k="Jumlah jamaah" v={`${pilgrims.length} orang`} />
              <Row
                k="Harga per jamaah"
                v={formatIDR(pricePerPax)}
              />
              <div className="my-2 border-t border-border" />
              <Row k="Estimasi total" v={formatIDR(total)} bold />
            </div>

            <Field label="Metode pembayaran pertama">
              <div className="space-y-2">
                <PayOption
                  active={payment === "dp"}
                  onClick={() => setPayment("dp")}
                  title={`Bayar DP dulu — ${formatIDR(dpTotal)}`}
                  desc="Kunci kursi sekarang, pelunasan maksimal 40 hari sebelum berangkat."
                />
                <PayOption
                  active={payment === "full"}
                  onClick={() => setPayment("full")}
                  title={`Bayar lunas — ${formatIDR(total)}`}
                  desc="Langsung lunas di awal."
                />
              </div>
            </Field>

            <div className="rounded-xl bg-accent p-4 text-sm">
              <div className="flex justify-between font-semibold text-foreground">
                <span>Total bayar sekarang</span>
                <span>{formatIDR(payNow)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Dana ditahan Wasilah (rekening bersama) hingga layanan travel
                berjalan.
              </p>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground disabled:opacity-0"
          >
            ← Kembali
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
            >
              Lanjut
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-95 disabled:opacity-60"
            >
              {submitting ? "Memproses…" : "Kirim Pendaftaran"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-muted-foreground">{k}</span>
      <span className={bold ? "font-bold text-foreground" : "text-foreground"}>
        {v}
      </span>
    </div>
  );
}

function PayOption({
  active,
  onClick,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full rounded-lg border px-4 py-3 text-left transition ${
        active
          ? "border-primary bg-accent"
          : "border-border bg-white hover:border-neutral-400"
      }`}
    >
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </button>
  );
}
