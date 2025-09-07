import type { IBarSeriesSpec, ILineSeriesSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const initDualAxisPrimary: SpecPipe = (spec, context) => {
  const result = { ...spec } as IBarSeriesSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo, foldInfoList, id } = datasetReshapeInfo[0]

  result.id = `${id}-primary-series`
  result.type = 'bar'
  result.direction = 'vertical'
  result.xField = unfoldInfo.encodingX
  result.seriesField = unfoldInfo.encodingColor

  result.yField = foldInfoList?.[0].measureValue
  result.animation = true

  return result
}

export const initDualAxisSecondary: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineSeriesSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo, foldInfoList, id } = datasetReshapeInfo[0]

  result.id = `${id}-secondary-series`
  result.type = 'line'
  result.direction = 'vertical'
  result.xField = unfoldInfo.encodingX
  if (foldInfoList?.[1]) {
    result.yField = foldInfoList[1].measureValue
  }

  result.seriesField = unfoldInfo.encodingColorId

  result.animation = true

  return result
}
