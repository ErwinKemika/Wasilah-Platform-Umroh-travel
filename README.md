# Wasilah

Platform booking **umroh & haji** — mempertemukan jamaah dengan travel resmi berizin Kemenag.
Polanya mengikuti OTA seperti Traveloka, tapi fokus hanya di umroh & haji.

Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS. Tema warna: **Golden Linen**.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # mode produksi
```

## Alur yang sudah jalan (prototipe)

| Halaman | Isi |
|---|---|
| `/` | Hero + pencarian cepat, paket pilihan, keunggulan, **Kalkulator Tabungan Umroh**, testimoni, FAQ |
| `/paket` | Daftar paket + filter (jenis, bulan, kota embarkasi, budget, bintang hotel) + sort — data via API |
| `/paket/[slug]` | Detail: itinerary per hari, hotel + jarak ke masjid, fasilitas, termasuk/tidak termasuk, syarat dokumen, kebijakan pembayaran, kotak booking (pilih kamar + jumlah jamaah) |
| `/paket/[slug]/daftar` | Form pendaftaran 3 langkah: kontak → data jamaah → ringkasan & metode pembayaran (DP / lunas) |
| `/konfirmasi?code=` | Halaman sukses + kode pendaftaran + langkah selanjutnya |

## API (dummy, in-memory)

- `GET /api/packages` — list + filter (`type`, `month`, `embarkasi`, `maxPrice`, `stars`, `q`, `sort`)
- `GET /api/packages/[id]` — detail satu paket (id atau slug)
- `POST /api/pendaftaran` — buat pendaftaran, balik `code`
- `GET /api/pendaftaran/[code]` — ambil pendaftaran

> Data pendaftaran disimpan di memori server (`globalThis`) — hilang saat server restart. Untuk produksi, ganti dengan database.

## Struktur

- `data/` — `packages.ts` (10 paket), `testimonials.ts`, `faq.ts`
- `components/` — `SiteHeader/Footer`, `PackageCard`, `PackageBrowser` (filter), `BookingBox`, `RegistrationForm`, `SavingsCalculator`, `HeroSearch`, `Testimonials`, `Faq`, `WhatsAppButton`, `ConfirmationView`
- `lib/` — `format.ts` (Rupiah, tanggal), `bookings.ts` (store in-memory)

## Belum dikerjakan (untuk iterasi berikutnya)

Login & "Pesanan Saya", upload dokumen jamaah, compare paket, halaman panduan/artikel, database + pembayaran nyata, dashboard travel.
