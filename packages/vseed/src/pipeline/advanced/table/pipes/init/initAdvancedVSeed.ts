import type { AdvancedPipe, AdvancedVSeed } from 'src/types'

export const initAdvancedVSeed: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType } = vseed
  return {
    ...advancedVSeed,
    chartType,
  } as AdvancedVSeed
}
