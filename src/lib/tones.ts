export type Tone = 'panel' | 'paper' | 'mint' | 'sky'

/**
 * Background plus surface class for each tone. "surface-fill" switches text,
 * links and halftone dots to Ink so they stay readable on Mint and Sky in both themes.
 */
export const TONE_CLASSES: Record<Tone, string> = {
  panel: 'surface bg-panel text-ink',
  paper: 'surface bg-paper text-ink',
  mint: 'surface-fill bg-mint text-ink',
  sky: 'surface-fill bg-sky text-ink',
}
