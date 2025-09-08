import type { IBarChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initColumnParallel: SpecPipe = (spec, context) => {
  const result = { ...spec } as IBarChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo, dimensions } = advancedVSeed
  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  const sameDimensionsMode = dimensions.length > 1 && dimensions.every((dim) => dim.id === dimensions[0].id)

  result.type = 'bar'
  result.direction = 'vertical'
  result.xField = sameDimensionsMode ? [unfoldInfo.encodingX] : [unfoldInfo.encodingX, unfoldInfo.encodingDetail]
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
