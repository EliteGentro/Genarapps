import type { FaqEntry } from '../data/types'

/** Questions as native <details> disclosures: keyboard and screen-reader friendly without extra script. */
export function Faq({ entries }: { entries: FaqEntry[] }) {
  return (
    <div className="grid">
      {entries.map((entry) => (
        <details key={entry.question} className="group border-b-2 border-line py-3 first:pt-0 last:border-b-0 last:pb-0">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-bold [&::-webkit-details-marker]:hidden">
            <span>{entry.question}</span>
            <span
              aria-hidden="true"
              className="surface-fill mt-0.5 grid size-6 shrink-0 place-items-center border-2 border-line bg-mint font-mono text-[14px] leading-none text-ink group-open:bg-sky"
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </summary>
          <p className="pt-2 text-[15px] leading-relaxed text-muted">{entry.answer}</p>
        </details>
      ))}
    </div>
  )
}
