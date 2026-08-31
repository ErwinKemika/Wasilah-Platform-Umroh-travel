import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
            و
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Wasilah
          </span>
        </Link>
        <nav className="hidden gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link href="/paket" className="hover:text-foreground">
            Paket
          </Link>
          <Link href="/#kalkulator" className="hover:text-foreground">
            Kalkulator Tabungan
          </Link>
          <Link href="/#testimoni" className="hover:text-foreground">
            Testimoni
          </Link>
          <Link href="/#faq" className="hover:text-foreground">
            FAQ
          </Link>
        </nav>
        <Link
          href="/paket"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
        >
          Cari Paket
        </Link>
      </div>
    </header>
  );
}
