import { isNullish } from 'remeda'
import type { BarMaxWidth, VChartSpecPipe } from 'src/types'

export const barMaxWidth: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const barMaxWidth = advancedVSeed.config?.[chartType as 'column']?.barMaxWidth as BarMaxWidth

  if (!isNullish(barMaxWidth)) {
    return {
      ...spec,
      barMaxWidth,
    }
  }

  return spec
}
