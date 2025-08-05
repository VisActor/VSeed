import type { AdvancedPipe } from 'src/types'

export const initAdvancedVSeed: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType = 'table' } = vseed
  return {
    ...advancedVSeed,
    chartType,
  }
}
