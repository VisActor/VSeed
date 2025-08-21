import type { IRoseChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initRoseParallel: SpecPipe = (spec, context) => {
  const result = { ...spec } as IRoseChartSpec
  const { advancedVSeed } = context
  const { encoding, datasetReshapeInfo, dataset } = advancedVSeed
  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  if (!encoding[0].radius || !encoding[0].angle || !encoding[0].group) {
    return result
  }

  result.type = 'rose'
  result.categoryField = [encoding[0].angle[0], unfoldInfo.groupId]
  result.valueField = encoding[0].radius[0]
  result.seriesField = encoding[0].group[0]
  result.padding = 0

  result.outerRadius = 0.9
  result.innerRadius = 0

  const hasNegativeValue = dataset.flat().find((d) => d[foldInfo.measureValue] < 0)
  if (hasNegativeValue) {
    result.innerRadius = 0.05
  }

  result.rose = {
    style: {
      stroke: '#ffffff',
      lineWidth: 1,
    },
    state: {
      hover: {
        lineWidth: 1,
        fillOpacity: 0.6,
      },
    },
  }
  result.region = [
    {
      clip: true,
    },
  ]
  result.animation = true

  return result
}
