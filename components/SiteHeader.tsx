import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-linen-border bg-linen/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-wasilah-600 text-lg font-bold text-white">
            و
          </div>
          <span className="text-lg font-bold tracking-tight text-stone-900">
            Wasilah
          </span>
        </Link>
        <nav className="hidden gap-8 text-sm font-medium text-stone-600 md:flex">
          <Link href="/paket" className="hover:text-wasilah-700">
            Paket
          </Link>
          <Link href="/#kalkulator" className="hover:text-wasilah-700">
            Kalkulator Tabungan
          </Link>
          <Link href="/#testimoni" className="hover:text-wasilah-700">
            Testimoni
          </Link>
          <Link href="/#faq" className="hover:text-wasilah-700">
            FAQ
          </Link>
        </nav>
        <Link
          href="/paket"
          className="rounded-xl bg-wasilah-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-wasilah-700"
        >
          Cari Paket
        </Link>
      </div>
    </header>
  );
}
