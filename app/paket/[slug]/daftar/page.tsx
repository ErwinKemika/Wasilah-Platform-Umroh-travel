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
        <nav className="text-sm text-muted-foreground">
          <Link href={`/paket/${pkg.slug}`} className="hover:text-foreground">
            ← Kembali ke detail paket
          </Link>
        </nav>
        <h1 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">
          Pendaftaran Jamaah
        </h1>
        <p className="mt-1 text-muted-foreground">
          {pkg.title} · {pkg.travelName}
        </p>

        <Suspense fallback={<p className="mt-8 text-muted-foreground">Memuat formulir…</p>}>
          <RegistrationForm pkg={pkg} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
