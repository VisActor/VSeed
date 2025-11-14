import type { IRoseChartSpec } from '@visactor/vchart'
import type { SpecPipe, Spec } from 'src/types'

export const initRose: SpecPipe<Spec> = (spec, context) => {
  const result = { ...spec } as IRoseChartSpec
  const { advancedVSeed } = context
  const { dataset, datasetReshapeInfo } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]

  result.type = 'rose'

  result.angleField = unfoldInfo.encodingAngle
  result.seriesField = unfoldInfo.encodingColorId

  result.valueField = foldInfo.measureValue
  result.padding = 0
  result.outerRadius = 0.9
  result.innerRadius = 0

  const hasNegativeValue = dataset.flat().find((d) => d[foldInfo.measureValue] < 0)
  if (hasNegativeValue) {
    result.innerRadius = 0.05
  }

  result.region = [
    {
      clip: true,
    },
  ]
  result.animation = true

  return result
}
