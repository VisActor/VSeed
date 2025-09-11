import type { IPieChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initPie: SpecPipe = (spec, context) => {
  const result = { ...spec } as IPieChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  result.type = 'pie'
  result.outerRadius = 0.8
  result.innerRadius = 0
  result.valueField = foldInfo.measureValue
  result.categoryField = unfoldInfo.encodingColorId
  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]

  result.animation = true

  return result
}
