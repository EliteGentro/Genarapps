export interface Email {
  to: string
  subject: string
  body: string
}

/** Builds a mailto: link. Spaces are encoded as %20 because many mail apps show "+" literally. */
export function mailtoHref({ to, subject, body }: Email): string {
  const params = [`subject=${encodeURIComponent(subject)}`]
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  return `mailto:${to}?${params.join('&')}`
}

/** Plain-text version of the email for the clipboard. */
export function emailAsText({ to, subject, body }: Email): string {
  return `To: ${to}\nSubject: ${subject}\n\n${body}`
}
