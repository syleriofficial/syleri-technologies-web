/** Accessible FAQ built on native <details>/<summary>: keyboard and screen-reader support with zero JS. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex items-start justify-between gap-6 py-5 text-[1.0625rem] font-[600] tracking-[-0.01em] text-ink hover:text-accent">
            <span>{item.q}</span>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="faq-icon mt-1.5 size-3.5 shrink-0 text-muted">
              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </summary>
          <p className="max-w-[64ch] pb-6 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
