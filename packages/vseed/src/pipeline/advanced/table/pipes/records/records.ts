import type { AdvancedPipe } from 'src/types'

export const records: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { dataset } = vseed
  return {
    ...advancedVSeed,
    dataset,
  }
}
