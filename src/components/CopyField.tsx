import { useId, useRef, useState } from 'react'
import { copyText, selectContents } from '../lib/clipboard'
import { cx } from '../lib/cx'
import { Button, ExternalButton } from './Button'

interface CopyFieldProps {
  label: string
  value: string
  /** Adds an "Open in mail app" link next to the copy button. */
  mailto?: string
  className?: string
}

/** Shows a value (usually an email address) as selectable text with a copy button. */
export function CopyField({ label, value, mailto, className }: CopyFieldProps) {
  const id = useId()
  const textRef = useRef<HTMLSpanElement>(null)
  const [status, setStatus] = useState('')

  async function handleCopy() {
    if (await copyText(value)) {
      setStatus(`Copied ${value}`)
    } else if (textRef.current) {
      selectContents(textRef.current)
      setStatus('Selected. Press Cmd+C or Ctrl+C to copy.')
    }
  }

  return (
    <div className={cx('grid gap-2', className)}>
      <p id={`${id}-label`} className="font-mono text-[11px] leading-none font-medium tracking-[.1em] text-muted uppercase">
        {label}
      </p>
      <div className="flex flex-wrap items-stretch gap-2.5">
        <span
          ref={textRef}
          className="surface min-w-0 flex-[1_1_220px] border-3 border-line bg-paper px-3 py-2.5 font-mono text-[15px] leading-snug font-medium break-all text-ink select-all"
        >
          {value}
        </span>
        <Button size="sm" tone="sky" onClick={handleCopy} aria-describedby={`${id}-label`}>
          Copy
        </Button>
        {mailto && (
          <ExternalButton size="sm" tone="ghost" href={mailto}>
            Open in mail app
          </ExternalButton>
        )}
      </div>
      <span role="status" className="min-h-[1.2em] font-mono text-[12px] text-fern">
        {status}
      </span>
    </div>
  )
}
