import type { IBarChartSpec } from '@visactor/vchart'
import type { SpecPipe, Spec } from 'src/types'

export const initColumn: SpecPipe<Spec> = (spec, context) => {
  const result = { ...spec } as IBarChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  result.type = 'bar'
  result.direction = 'vertical'
  result.xField = unfoldInfo.encodingX
  result.yField = foldInfo.measureValue
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
