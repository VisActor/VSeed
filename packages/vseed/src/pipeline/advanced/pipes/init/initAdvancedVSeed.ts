import type { AdvancedPipe } from 'src/types'

export const initAdvancedVSeed: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context

  return {
    ...advancedVSeed,
    chartType: vseed.chartType,
  }
}
