import type { IScatterChartSpec } from '@visactor/vchart'
import type { SpecPipe, Spec } from 'src/types'

export const initScatter: SpecPipe<Spec> = (spec, context) => {
  const result = { ...spec } as IScatterChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo, foldInfoList } = datasetReshapeInfo[0]

  result.type = 'scatter'
  result.direction = 'vertical'
  result.xField = foldInfoList?.[0].measureValue
  if (foldInfoList?.[1]) {
    result.yField = foldInfoList[1].measureValue
  }

  result.seriesField = unfoldInfo.encodingColorId

  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]
  result.animation = true

  return result
}
