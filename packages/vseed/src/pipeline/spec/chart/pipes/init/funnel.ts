import type { IFunnelChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const initFunnel: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as IFunnelChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]

  result.type = 'funnel'
  result.valueField = foldInfo.measureValue
  result.categoryField = unfoldInfo.encodingColorId

  result.padding = 0
  result.isTransform = true
  result.shape = 'rect'
  result.maxSize = '75%'
  result.minSize = '10%'
  result.region = [
    {
      clip: true,
    },
  ]

  result.animation = true

  return result
}
