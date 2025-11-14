import type { IBarChartSpec } from '@visactor/vchart'
import { isDeepEqual } from 'remeda'
import { MeasureId } from 'src/dataReshape'
import type { VChartSpecPipe } from 'src/types'

export const initBarParallel: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as IBarChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo, encoding } = advancedVSeed
  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  const sameDimensionsMode = isDeepEqual(encoding.y, encoding.color)

  result.type = 'bar'
  result.direction = 'horizontal'

  result.yField = [unfoldInfo.encodingY]

  if (!sameDimensionsMode) {
    result.yField.push(unfoldInfo.encodingDetail)

    if (encoding.detail?.[0] === MeasureId && encoding.x?.length === 1) {
      result.yField.pop()
    }
  }

  result.xField = foldInfo.measureValue
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
