import type { IBarChartSpec } from '@visactor/vchart'
import { isDeepEqual } from 'remeda'
import { MeasureName } from 'src/dataReshape'
import type { SpecPipe } from 'src/types'

export const initColumnParallel: SpecPipe = (spec, context) => {
  const result = { ...spec } as IBarChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo, encoding } = advancedVSeed
  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  const sameDimensionsMode = isDeepEqual(encoding.x, encoding.color)

  result.type = 'bar'
  result.direction = 'vertical'
  result.xField = [unfoldInfo.encodingX]

  if (!sameDimensionsMode) {
    result.xField.push(unfoldInfo.encodingDetail)

    if (encoding.detail?.[0] === MeasureName && encoding.y?.length === 1) {
      result.xField.pop()
    }
  }

  result.yField = foldInfo.measureValue
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
