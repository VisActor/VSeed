import type { IRoseChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initRoseParallel: SpecPipe = (spec, context) => {
  const result = { ...spec } as IRoseChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo, dataset, dimensions } = advancedVSeed
  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  const sameDimensionsMode = dimensions.length > 1 && dimensions.every((dim) => dim.id === dimensions[0].id)

  result.type = 'rose'
  result.angleField = sameDimensionsMode
    ? [unfoldInfo.encodingAngle]
    : [unfoldInfo.encodingAngle, unfoldInfo.encodingDetail]
  result.valueField = foldInfo.measureValue
  result.seriesField = unfoldInfo.encodingColorId
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
