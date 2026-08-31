import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RegistrationForm from "@/components/RegistrationForm";
import { getPackage, packages } from "@/data/packages";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export const metadata = { title: "Pendaftaran Jamaah — Wasilah" };

export default function DaftarPage({ params }: { params: { slug: string } }) {
  const pkg = getPackage(params.slug);
  if (!pkg) notFound();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <nav className="text-sm text-stone-500">
          <Link href={`/paket/${pkg.slug}`} className="hover:text-wasilah-700">
            ← Kembali ke detail paket
          </Link>
        </nav>
        <h1 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
          Pendaftaran Jamaah
        </h1>
        <p className="mt-1 text-stone-500">
          {pkg.title} · {pkg.travelName}
        </p>

        <Suspense fallback={<p className="mt-8 text-stone-400">Memuat formulir…</p>}>
          <RegistrationForm pkg={pkg} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
