import type { IPieChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initDonut: SpecPipe = (spec, context) => {
  const result = { ...spec } as IPieChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo, dataset } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]

  const showStroke = dataset.length <= 30

  result.type = 'pie'
  result.outerRadius = 0.8
  result.innerRadius = result.outerRadius * 0.8
  result.valueField = foldInfo.measureValue
  result.categoryField = unfoldInfo.encodingDetail
  result.seriesField = unfoldInfo.encodingColorId
  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]

  result.pie = {
    style: {
      stroke: '#ffffff',
      lineWidth: showStroke ? 1 : 0,
    },
    state: {
      hover: {
        outerRadius: result.outerRadius * 1.1,
      },
    },
  }

  result.animation = true

  return result
}
