import { useState } from 'react'
import { applyThemeChoice, readThemeChoice, type ThemeChoice } from '../lib/theme'

const NEXT: Record<ThemeChoice, ThemeChoice> = { system: 'light', light: 'dark', dark: 'system' }
const LABEL: Record<ThemeChoice, string> = { system: 'Auto', light: 'Light', dark: 'Dark' }

/** Cycles the color theme: Auto (follows the device) → Light → Dark. */
export function ThemeToggle() {
  const [choice, setChoice] = useState<ThemeChoice>(readThemeChoice)

  function handleClick() {
    const next = NEXT[choice]
    applyThemeChoice(next)
    setChoice(next)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Theme: ${LABEL[choice]}. Switch to ${LABEL[NEXT[choice]]}.`}
      className="surface inline-flex min-h-9 cursor-pointer items-center gap-2 border-2 border-line bg-panel px-2.5 font-mono text-[11px] font-medium tracking-[.1em] text-ink uppercase shadow-chip transition-[translate,box-shadow] duration-75 hover:-translate-x-px hover:-translate-y-px active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
    >
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
        <rect x="1" y="1" width="14" height="14" strokeWidth="2" className="fill-panel stroke-line" />
        {choice === 'system' && <rect x="1" y="1" width="7" height="14" className="fill-line" />}
        {choice === 'dark' && <rect x="1" y="1" width="14" height="14" className="fill-line" />}
      </svg>
      {LABEL[choice]}
    </button>
  )
}
