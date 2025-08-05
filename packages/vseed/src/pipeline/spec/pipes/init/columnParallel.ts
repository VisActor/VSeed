import type { IBarChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initColumnParallel: SpecPipe = (spec, context) => {
  const result = { ...spec } as IBarChartSpec
  const { advancedVSeed } = context
  const { encoding, datasetReshapeInfo } = advancedVSeed
  const { foldInfo } = datasetReshapeInfo
  result.type = 'bar'
  result.direction = 'vertical'
  if (encoding[0].x?.[0]) {
    result.xField = [encoding[0].x[0], foldInfo.measureName]
  }
  result.yField = encoding[0].y?.[0]
  result.seriesField = encoding[0].group?.[0]
  result.padding = 0
  return result
}
