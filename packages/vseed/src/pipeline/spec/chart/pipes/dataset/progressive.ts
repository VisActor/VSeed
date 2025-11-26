import type { ILineSeriesSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const progressive: VChartSpecPipe = (spec) => {
  const result = { ...spec } as ILineSeriesSpec
  // const { advancedVSeed } = context
  // const { dataset = [] } = advancedVSeed
  // const size = dataset.length

  // if (size < 5000) {
  //   return result
  // }

  result.large = false
  result.largeThreshold = Infinity
  result.progressiveStep = 400
  result.progressiveThreshold = Infinity

  return result
}
