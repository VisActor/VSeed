import type { IBarSeriesSpec, ILineSeriesSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initDualAxisPrimary: SpecPipe = (spec, context) => {
  const result = { ...spec } as IBarSeriesSpec
  const { advancedVSeed } = context
  const { encoding, datasetReshapeInfo } = advancedVSeed

  if (!encoding[0].y || !encoding[0].x || !encoding[0].group) {
    return result
  }

  result.id = `${datasetReshapeInfo[0].id}-primary-series`
  result.type = 'bar'
  result.direction = 'vertical'
  result.xField = encoding[0].x[0]
  result.yField = encoding[0].y[0]
  result.seriesField = encoding[0].group[0]
  result.animation = true

  return result
}

export const initDualAxisSecondary: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineSeriesSpec
  const { advancedVSeed } = context
  const { encoding, datasetReshapeInfo } = advancedVSeed

  if (!encoding[0].y || !encoding[0].x || !encoding[0].group) {
    return result
  }

  result.id = `${datasetReshapeInfo[0].id}-secondary-series`
  result.type = 'line'
  result.direction = 'vertical'
  result.xField = encoding[0].x[0]
  result.yField = encoding[0].y[1]
  result.seriesField = encoding[0].group[0]

  result.animation = true

  return result
}
