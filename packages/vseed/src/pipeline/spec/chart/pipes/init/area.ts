import type { IAreaChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'
import { isLinearColor } from '../color/colorAdapter'

export const initArea: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as IAreaChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  result.type = 'area'
  result.direction = 'vertical'
  result.yField = foldInfo.measureValue

  result.xField = unfoldInfo.encodingX
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
