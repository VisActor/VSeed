import { isNullish } from 'remeda'
import type { BoxGapInGroup, VChartSpecPipe } from 'src/types'

export const boxGapInGroup: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const boxGapInGroup = advancedVSeed.config?.[chartType as 'boxPlot']?.boxGapInGroup as BoxGapInGroup

  if (!isNullish(boxGapInGroup)) {
    return {
      ...spec,
      boxGapInGroup,
    }
  }

  return spec
}
