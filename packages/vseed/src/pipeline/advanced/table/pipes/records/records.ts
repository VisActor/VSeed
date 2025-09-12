import type { AdvancedPipe } from 'src/types'

export const records: AdvancedPipe = (advancedVSeed) => {
  const { dataset } = advancedVSeed
  return {
    ...advancedVSeed,
    dataset,
  }
}
