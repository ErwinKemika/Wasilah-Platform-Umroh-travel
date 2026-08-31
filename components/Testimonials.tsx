import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground md:text-3xl">
        Kata jamaah yang sudah berangkat
      </h2>
      <p className="mt-2 text-muted-foreground">
        Ulasan terverifikasi dari jamaah yang memesan lewat Wasilah.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            <div className="text-amber-500">{"★".repeat(t.rating)}</div>
            <blockquote className="mt-3 flex-1 text-foreground">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-semibold text-foreground">{t.name}</span>
              <span className="text-muted-foreground"> · {t.city}</span>
              <p className="text-xs text-muted-foreground">{t.packageTitle}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
