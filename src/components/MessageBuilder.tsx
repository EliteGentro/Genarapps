import { useId, useState } from 'react'
import type { AppEntry } from '../data/types'
import { copyText } from '../lib/clipboard'
import { emailAsText, mailtoHref, type Email } from '../lib/mailto'
import { Button, ExternalButton } from './Button'

const TOPICS = ['Bug report', 'Question', 'Feature idea', 'Privacy request'] as const
type Topic = (typeof TOPICS)[number]

const GENERAL = 'general'

interface MessageBuilderProps {
  apps: AppEntry[]
  /** Where the message goes when no app is picked. */
  fallbackEmail: string
  /** Locks the builder to one app (on that app's support page). */
  fixedApp?: AppEntry
}

const fieldClasses =
  'surface w-full min-w-0 border-3 border-line bg-paper px-3 py-2.5 text-[15px] text-ink placeholder:text-muted focus-visible:outline-offset-2'
const labelClasses = 'font-mono text-[11px] leading-none font-medium tracking-[.1em] text-muted uppercase'

/** Composes a support email in the browser. This site can't send mail, so the visitor copies it or opens it in their mail app. */
export function MessageBuilder({ apps, fallbackEmail, fixedApp }: MessageBuilderProps) {
  const id = useId()
  const [slug, setSlug] = useState(fixedApp?.slug ?? GENERAL)
  const [topic, setTopic] = useState<Topic>('Bug report')
  const [device, setDevice] = useState('')
  const [osVersion, setOsVersion] = useState('')
  const [appVersion, setAppVersion] = useState(fixedApp?.version ?? '')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [showError, setShowError] = useState(false)

  const app = fixedApp ?? apps.find((candidate) => candidate.slug === slug)
  const email: Email = {
    to: app?.supportEmail ?? fallbackEmail,
    subject: `[${app?.name ?? 'GenarApps'}] ${topic}`,
    body: [
      message.trim(),
      '',
      '---',
      `App: ${app ? `${app.name}${appVersion ? ` ${appVersion}` : ''}` : 'General'}`,
      `Device: ${device.trim() || 'not given'}`,
      `System version: ${osVersion.trim() || 'not given'}`,
    ].join('\n'),
  }
  const hasMessage = message.trim().length > 0
  const errorId = `${id}-error`

  function requireMessage(): boolean {
    if (hasMessage) return true
    setShowError(true)
    document.getElementById(`${id}-message`)?.focus()
    return false
  }

  async function handleCopy() {
    if (!requireMessage()) return
    const copied = await copyText(emailAsText(email))
    setStatus(copied ? `Copied. Paste it into a new email to ${email.to}.` : 'Your browser blocked copying. Select the preview text and copy it by hand.')
  }

  function handleAppChange(value: string) {
    setSlug(value)
    setAppVersion(apps.find((candidate) => candidate.slug === value)?.version ?? '')
  }

  return (
    <form className="grid gap-5" onSubmit={(event) => event.preventDefault()} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        {!fixedApp && (
          <div className="grid gap-2">
            <label htmlFor={`${id}-app`} className={labelClasses}>
              App
            </label>
            <select id={`${id}-app`} value={slug} onChange={(event) => handleAppChange(event.target.value)} className={fieldClasses}>
              {apps.map((candidate) => (
                <option key={candidate.slug} value={candidate.slug}>
                  {candidate.name}
                </option>
              ))}
              <option value={GENERAL}>Something else</option>
            </select>
          </div>
        )}
        <div className="grid gap-2">
          <label htmlFor={`${id}-topic`} className={labelClasses}>
            Topic
          </label>
          <select id={`${id}-topic`} value={topic} onChange={(event) => setTopic(event.target.value as Topic)} className={fieldClasses}>
            {TOPICS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor={`${id}-device`} className={labelClasses}>
            Device
          </label>
          <input
            id={`${id}-device`}
            value={device}
            onChange={(event) => setDevice(event.target.value)}
            placeholder="iPhone 15"
            autoComplete="off"
            className={fieldClasses}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor={`${id}-os`} className={labelClasses}>
            System version
          </label>
          <input
            id={`${id}-os`}
            value={osVersion}
            onChange={(event) => setOsVersion(event.target.value)}
            placeholder="iOS 26.0"
            autoComplete="off"
            className={fieldClasses}
          />
        </div>
        {app && (
          <div className="grid gap-2">
            <label htmlFor={`${id}-version`} className={labelClasses}>
              App version
            </label>
            <input
              id={`${id}-version`}
              value={appVersion}
              onChange={(event) => setAppVersion(event.target.value)}
              placeholder={app.version}
              autoComplete="off"
              className={fieldClasses}
            />
          </div>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor={`${id}-message`} className={labelClasses}>
          Message
        </label>
        <textarea
          id={`${id}-message`}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value)
            if (event.target.value.trim()) setShowError(false)
          }}
          rows={6}
          required
          aria-invalid={showError || undefined}
          aria-describedby={showError ? errorId : undefined}
          placeholder="What happened, and what did you tap right before it?"
          className={`${fieldClasses} resize-y leading-relaxed`}
        />
        {showError && (
          <p id={errorId} className="text-[14px] font-semibold text-ink">
            Write a few words about the problem first.
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <p className={labelClasses} id={`${id}-preview-label`}>
          Preview
        </p>
        <pre
          aria-labelledby={`${id}-preview-label`}
          className="surface max-h-64 overflow-auto border-3 border-dashed border-line bg-panel p-3.5 font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-ink"
        >
          {emailAsText(email)}
        </pre>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleCopy}>Copy message</Button>
        <ExternalButton
          tone="ghost"
          href={mailtoHref(email)}
          onClick={(event) => {
            if (!requireMessage()) event.preventDefault()
          }}
        >
          Open in mail app
        </ExternalButton>
      </div>
      <p role="status" className="min-h-[1.2em] font-mono text-[12px] text-fern">
        {status}
      </p>
    </form>
  )
}
