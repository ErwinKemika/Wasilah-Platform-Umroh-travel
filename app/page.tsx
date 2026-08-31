import PackageCard from "@/components/PackageCard";
import { packages } from "@/data/packages";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-wasilah-600 text-lg font-bold text-white">
              و
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Wasilah
            </span>
          </div>
          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#paket" className="hover:text-wasilah-700">
              Paket
            </a>
            <a href="#keunggulan" className="hover:text-wasilah-700">
              Keunggulan
            </a>
            <a href="#kontak" className="hover:text-wasilah-700">
              Kontak
            </a>
          </nav>
          <button className="rounded-xl bg-wasilah-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-wasilah-700">
            Masuk
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-wasilah-900 via-wasilah-700 to-wasilah-600 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_15%_25%,white_1.5px,transparent_1.5px)] [background-size:34px_34px]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            Travel resmi berizin Kemenag
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
            Booking Umroh &amp; Haji jadi mudah, transparan, dan terpercaya
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
            Wasilah mempertemukan Anda dengan puluhan travel pilihan. Bandingkan
            harga, jadwal, hotel, dan fasilitas — lalu pesan dalam hitungan menit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#paket"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-wasilah-800 transition hover:bg-wasilah-50"
            >
              Lihat Paket
            </a>
            <a
              href="#keunggulan"
              className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Kenapa Wasilah?
            </a>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-8">
            {[
              ["120+", "Travel mitra"],
              ["35.000+", "Jamaah terlayani"],
              ["4.8/5", "Rating kepuasan"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-bold">{value}</dt>
                <dd className="text-xs text-white/70">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Paket */}
      <section id="paket" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-10 flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Paket keberangkatan terbaru
          </h2>
          <p className="text-slate-500">
            Pilihan paket dari travel mitra Wasilah. Harga sudah termasuk tiket,
            hotel, visa, dan bimbingan ibadah.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* Keunggulan */}
      <section id="keunggulan" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-2xl font-bold text-slate-900 md:text-3xl">
            Kenapa memesan lewat Wasilah?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Travel terverifikasi",
                desc: "Setiap mitra dicek izin PPIU/PIHK-nya. Tidak ada travel abal-abal.",
              },
              {
                title: "Harga apa adanya",
                desc: "Rincian biaya terbuka. Tidak ada biaya tersembunyi menjelang berangkat.",
              },
              {
                title: "Dana aman",
                desc: "Pembayaran ditahan Wasilah dan diteruskan bertahap sesuai progres layanan.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-wasilah-50 text-wasilah-600">
                  ✓
                </div>
                <h3 className="font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-slate-900 text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-wasilah-600 font-bold text-white">
                و
              </div>
              <span className="font-bold text-white">Wasilah</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-slate-400">
              Platform booking umroh &amp; haji. Menghubungkan jamaah dengan
              travel resmi di seluruh Indonesia.
            </p>
          </div>
          <div className="text-sm text-slate-400">
            <p>cs@wasilah.id</p>
            <p>+62 811 0000 000</p>
            <p className="mt-4 text-xs text-slate-500">
              © {new Date().getFullYear()} Wasilah. Data paket di halaman ini
              masih contoh.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
