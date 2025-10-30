import { isNullish } from 'remeda'
import type { BarGapInGroup, SpecPipe } from 'src/types'

export const barGapInGroup: SpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const barGapInGroup = advancedVSeed.config?.[chartType as 'columnParallel']?.barGapInGroup as BarGapInGroup

  if (!isNullish(barGapInGroup)) {
    return {
      ...spec,
      barGapInGroup,
    }
  }

  return spec
}
