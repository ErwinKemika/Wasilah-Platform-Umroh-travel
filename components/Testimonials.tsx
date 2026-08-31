import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-900 md:text-3xl">
        Kata jamaah yang sudah berangkat
      </h2>
      <p className="mt-2 text-stone-500">
        Ulasan terverifikasi dari jamaah yang memesan lewat Wasilah.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl border border-linen-border bg-linen-card p-6"
          >
            <div className="text-gold-500">{"★".repeat(t.rating)}</div>
            <blockquote className="mt-3 flex-1 text-stone-700">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-semibold text-stone-900">{t.name}</span>
              <span className="text-stone-400"> · {t.city}</span>
              <p className="text-xs text-stone-400">{t.packageTitle}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
