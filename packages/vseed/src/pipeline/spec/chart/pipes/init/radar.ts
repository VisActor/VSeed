import type { IRadarChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'
import { isLinearColor } from '../color/colorAdapter'

export const initRadar: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as IRadarChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo } = advancedVSeed

  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  result.type = 'radar'
  result.angleField = unfoldInfo.encodingAngle
  result.radiusField = foldInfo.measureValue
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
