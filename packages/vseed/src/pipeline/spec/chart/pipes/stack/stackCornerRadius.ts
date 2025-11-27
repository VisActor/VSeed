import type { IBarChartSpec } from '@visactor/vchart'
import { FoldMeasureId } from 'src/dataReshape/constant'
import type { Datum, VChartSpecPipe, StackCornerRadius } from 'src/types'

export const stackCornerRadius: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const stackCornerRadius = advancedVSeed.config?.[chartType as 'column']?.stackCornerRadius as StackCornerRadius

  if (chartType === 'dualAxis' && (spec as any).type !== 'bar') {
    return spec
  }

  return {
    ...spec,
    stackCornerRadius: (_: unknown, datum: Datum) => {
      if (datum && datum[datum[FoldMeasureId]] > 0) {
        return stackCornerRadius
      }

      return 0
    },
  } as IBarChartSpec
}
