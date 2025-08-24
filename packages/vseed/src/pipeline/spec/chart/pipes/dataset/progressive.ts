import type { ILineSeriesSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const progressive: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineSeriesSpec
  const { advancedVSeed } = context
  const { dataset } = advancedVSeed
  const size = dataset.length

  if (size < 5000) {
    return result
  }

  result.large = true
  result.largeThreshold = 5000
  result.progressiveStep = 400
  result.progressiveThreshold = 8000

  return result
}
