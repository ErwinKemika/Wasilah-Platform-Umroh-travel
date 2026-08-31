import { faq } from "@/data/faq";

export default function Faq() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-900 md:text-3xl">
        Pertanyaan yang sering diajukan
      </h2>
      <div className="mt-8 divide-y divide-linen-border rounded-2xl border border-linen-border bg-linen-card">
        {faq.map((item) => (
          <details key={item.q} className="group px-6 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-stone-800 marker:content-none">
              {item.q}
              <span className="ml-4 shrink-0 text-wasilah-600 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-stone-600">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
