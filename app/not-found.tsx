import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <p className="text-5xl font-bold text-foreground">404</p>
        <h1 className="mt-4 text-xl font-semibold text-foreground">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-2 text-muted-foreground">
          Paket yang Anda cari mungkin sudah tidak tersedia.
        </p>
        <Link
          href="/paket"
          className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Lihat Semua Paket
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
