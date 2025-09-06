import type { IBarChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initBarParallel: SpecPipe = (spec, context) => {
  const result = { ...spec } as IBarChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo, dimensions } = advancedVSeed
  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  const sameDimensionsMode = dimensions.length > 1 && dimensions.every((dim) => dim.id === dimensions[0].id)

  result.type = 'bar'
  result.direction = 'horizontal'

  result.yField = sameDimensionsMode
    ? [unfoldInfo.encodingY]
    : ([unfoldInfo.encodingY, unfoldInfo.encodingDetail] as string[])
  result.xField = foldInfo.measureValue
  result.seriesField = unfoldInfo.encodingColor

  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]
  result.animation = true
  return result
}
