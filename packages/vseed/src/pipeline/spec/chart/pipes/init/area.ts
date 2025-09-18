import type { IAreaChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'
import { isLinearColor } from '../color/colorAdapter'

export const initArea: SpecPipe = (spec, context) => {
  const result = { ...spec } as IAreaChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  result.type = 'area'
  result.direction = 'vertical'
  result.yField = foldInfo.measureValue

  result.xField = unfoldInfo.encodingX
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
