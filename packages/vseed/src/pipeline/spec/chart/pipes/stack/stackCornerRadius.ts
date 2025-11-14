import type { IBarChartSpec } from '@visactor/vchart'
import type { Datum, VChartSpecPipe, StackCornerRadius } from 'src/types'

export const stackCornerRadius: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const stackCornerRadius = advancedVSeed.config?.[chartType as 'column']?.stackCornerRadius as StackCornerRadius
  const { datasetReshapeInfo } = advancedVSeed
  const { foldInfo } = datasetReshapeInfo[0]

  if (chartType === 'dualAxis' && (spec as any).type !== 'bar') {
    return spec
  }

  return {
    ...spec,
    stackCornerRadius: (_: unknown, datum: Datum) => {
      if (datum[foldInfo.measureValue] > 0) {
        return stackCornerRadius
      }

      return 0
    },
  } as IBarChartSpec
}
