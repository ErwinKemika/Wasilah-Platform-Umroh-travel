"use client";

import Link from "next/link";
import { MotionConfig, type Variants } from "framer-motion";
import AnimatedGroup from "@/components/AnimatedGroup";
import HeroSearch from "@/components/HeroSearch";

const reveal: { item: Variants } = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 14 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring", bounce: 0.3, duration: 1.4 },
    },
  },
};

const stats: [string, string][] = [
  ["120+", "Travel mitra"],
  ["35.000+", "Jamaah terlayani"],
  ["4.8/5", "Rating kepuasan"],
];

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-ink text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/masjidil-haram.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25" />
        {/* lelehkan bagian bawah hero ke warna latar halaman */}
        <div
          aria-hidden
          className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_82%)]"
        />
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_15%_25%,white_1.5px,transparent_1.5px)] [background-size:34px_34px]" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-28">
          <AnimatedGroup variants={reveal}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Semua travel berizin resmi Kemenag
            </p>
            <h1 className="max-w-2xl text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Booking Umroh &amp; Haji jadi mudah, transparan, dan terpercaya
            </h1>
            <p className="mt-5 max-w-xl text-balance text-base text-white/80 md:text-lg">
              Wasilah mempertemukan Anda dengan puluhan travel pilihan.
              Bandingkan harga, jadwal, hotel, dan fasilitas — lalu daftar dalam
              hitungan menit.
            </p>
          </AnimatedGroup>

          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.5 },
                },
              },
              ...reveal,
            }}
          >
            <HeroSearch />

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-8">
              {stats.map(([value, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-bold">{value}</dt>
                  <dd className="text-xs text-white/70">{label}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-sm text-white/60">
              Sudah tahu paket yang dicari?{" "}
              <Link href="/paket" className="font-semibold text-primary underline-offset-4 hover:underline">
                Lihat semua paket
              </Link>
            </p>
          </AnimatedGroup>
        </div>
      </section>
    </MotionConfig>
  );
}
