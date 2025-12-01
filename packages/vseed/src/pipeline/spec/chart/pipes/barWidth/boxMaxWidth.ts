import { isNullish } from 'remeda'
import type { BarMaxWidth, VChartSpecPipe } from 'src/types'

export const boxMaxWidth: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const boxMaxWidth = advancedVSeed.config?.[chartType as 'boxPlot']?.boxMaxWidth as BarMaxWidth

  if (!isNullish(boxMaxWidth)) {
    return {
      ...spec,
      boxMaxWidth,
    }
  }

  return spec
}
