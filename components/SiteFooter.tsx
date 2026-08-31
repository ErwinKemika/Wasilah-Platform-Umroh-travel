import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer id="kontak" className="bg-wasilah-900 text-wasilah-100/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-wasilah-600 font-bold text-white">
              و
            </div>
            <span className="font-bold text-white">Wasilah</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-wasilah-100/70">
            Platform booking umroh &amp; haji. Menghubungkan jamaah dengan travel
            resmi berizin Kemenag di seluruh Indonesia.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Jelajahi</p>
          <ul className="mt-3 space-y-2 text-wasilah-100/70">
            <li>
              <Link href="/paket" className="hover:text-white">
                Semua Paket
              </Link>
            </li>
            <li>
              <Link href="/#kalkulator" className="hover:text-white">
                Kalkulator Tabungan
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Kontak</p>
          <ul className="mt-3 space-y-2 text-wasilah-100/70">
            <li>cs@wasilah.id</li>
            <li>+62 811 0000 000</li>
            <li>Senin–Sabtu, 08.00–20.00 WIB</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-wasilah-100/50">
          © {new Date().getFullYear()} Wasilah. Prototipe — seluruh data paket,
          harga, dan travel di halaman ini masih contoh.
        </p>
      </div>
    </footer>
  );
}
