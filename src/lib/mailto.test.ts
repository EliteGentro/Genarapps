import { describe, expect, it } from 'vitest'
import { emailAsText, mailtoHref } from './mailto'

describe('mailtoHref', () => {
  it('encodes spaces as %20 and line breaks as %0A', () => {
    expect(mailtoHref({ to: 'a@b.co', subject: '[Frible] Bug report', body: 'Line one\nLine two' })).toBe(
      'mailto:a@b.co?subject=%5BFrible%5D%20Bug%20report&body=Line%20one%0ALine%20two',
    )
  })

  it('leaves out an empty body', () => {
    expect(mailtoHref({ to: 'a@b.co', subject: 'Hi', body: '' })).toBe('mailto:a@b.co?subject=Hi')
  })
})

describe('emailAsText', () => {
  it('puts the address and subject above the body', () => {
    expect(emailAsText({ to: 'a@b.co', subject: 'Hi', body: 'Hello' })).toBe('To: a@b.co\nSubject: Hi\n\nHello')
  })
})
