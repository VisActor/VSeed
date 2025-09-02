import type { IBarChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initColumnParallel: SpecPipe = (spec, context) => {
  const result = { ...spec } as IBarChartSpec
  const { advancedVSeed } = context
  const { encoding, datasetReshapeInfo, dimensions } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]
  if (!encoding[0].y || !encoding[0].x || !encoding[0].group) {
    return result
  }

  const sameDimensionsMode = dimensions.length > 1 && dimensions.every((dim) => dim.id === dimensions[0].id)

  result.type = 'bar'
  result.direction = 'vertical'
  result.xField = sameDimensionsMode ? [encoding[0].x[0]] : [encoding[0].x[0], unfoldInfo.groupId]
  result.yField = encoding[0].y[0]
  result.seriesField = encoding[0].group[0]
  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]
  result.animation = true
  return result
}
