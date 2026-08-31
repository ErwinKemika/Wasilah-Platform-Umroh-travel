import { faq } from "@/data/faq";

export default function Faq() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground md:text-3xl">
        Pertanyaan yang sering diajukan
      </h2>
      <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
        {faq.map((item) => (
          <details key={item.q} className="group px-6 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground marker:content-none">
              {item.q}
              <span className="ml-4 shrink-0 text-foreground transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
