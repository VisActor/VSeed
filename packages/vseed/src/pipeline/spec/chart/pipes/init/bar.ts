import type { IBarChartSpec } from '@visactor/vchart'
import type { SpecPipe, Spec } from 'src/types'

export const initBar: SpecPipe<Spec> = (spec, context) => {
  const result = { ...spec } as IBarChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  result.type = 'bar'
  result.direction = 'horizontal'
  result.yField = unfoldInfo.encodingY
  result.xField = foldInfo.measureValue
  result.seriesField = unfoldInfo.encodingColorId
  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]
  result.animation = true
  return result
}
