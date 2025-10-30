import type { IBoxPlotChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'
import { isDeepEqual } from 'remeda'
import { MeasureName } from 'src/dataReshape/constant'

export const initBoxplot: SpecPipe = (spec, context) => {
  const result = { ...spec } as IBoxPlotChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo, encoding } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]

  result.type = 'boxPlot'
  result.minField = 'lowerWhisker'
  result.q1Field = 'q1'
  result.medianField = 'median'
  result.maxField = 'upperWhisker'
  result.q3Field = 'q3'
  result.outliersField = 'outliers'
  result.xField = [unfoldInfo.encodingX]
  result.seriesField = unfoldInfo.encodingColorId

  const sameDimensionsMode = isDeepEqual(encoding.x, encoding.color)

  if (!sameDimensionsMode) {
    result.xField.push(unfoldInfo.encodingColor)

    if (encoding.color?.[0] === MeasureName && encoding.value?.length === 1) {
      result.xField.pop()
    }
  }

  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]
  result.animation = true
  return result
}
