import type { ILineChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'
import { isLinearColor } from '../color/colorAdapter'

export const initLine: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]

  result.type = 'line'
  result.direction = 'vertical'
  result.xField = unfoldInfo.encodingX
  result.yField = foldInfo.measureValue
  result.seriesField = isLinearColor(advancedVSeed) ? unfoldInfo.encodingDetail : unfoldInfo.encodingColorId
  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]
  result.animation = true

  return result
}
