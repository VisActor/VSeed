import type { ILineChartSpec } from '@visactor/vchart'
import type { SpecPipe, Spec } from 'src/types'
import { isLinearColor } from '../color/colorAdapter'

export const initLine: SpecPipe<Spec> = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]

  result.type = 'line'
  result.direction = 'vertical'
  result.xField = unfoldInfo.encodingX
  result.yField = foldInfo.measureValue
  result.seriesField = isLinearColor(advancedVSeed, vseed) ? unfoldInfo.encodingDetail : unfoldInfo.encodingColorId
  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]
  result.animation = true

  return result
}
