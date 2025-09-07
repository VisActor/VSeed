import type { IRadarChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initRadar: SpecPipe = (spec, context) => {
  const result = { ...spec } as IRadarChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed

  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  result.type = 'radar'
  result.angleField = unfoldInfo.encodingAngle
  result.radiusField = foldInfo.measureValue
  result.seriesField = unfoldInfo.encodingColor

  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]
  result.animation = true
  return result
}
