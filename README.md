# Wasilah

Landing page platform booking umroh & haji "Wasilah". Dibangun dengan Next.js 14 (App Router), TypeScript, dan Tailwind CSS.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Struktur

- `app/page.tsx` — halaman utama (hero, daftar paket, keunggulan, footer)
- `components/PackageCard.tsx` — kartu paket travel
- `data/packages.ts` — data paket (dummy, 4 contoh)
- `lib/format.ts` — helper format Rupiah & tanggal

## Catatan

Data paket masih dummy. Untuk produksi, ganti `data/packages.ts` dengan sumber data nyata (API / database).
