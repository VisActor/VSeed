import type { ISpec } from '@visactor/vchart'
import type { Datum, VChartSpecPipe, XLinearAxis } from 'src/types'
import { createNumFormatter, isAreaPercent, isBarPercent, isColumnPercent, isPivotChart } from 'src/pipeline/utils'
import { createLinearFormat, createLinearPercentFormat } from './format/linearFormat'
import { defaultTitleText } from './title/defaultTitleText'
import { linearAxisStyle } from './linearAxisStyle'
import { BinEndMeasureId, BinStartMeasureId } from 'src/dataReshape/constant'
import { unique } from 'remeda'

export const histogramXLinear: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { encoding, dimensions, measures, dataset } = advancedVSeed
  const { chartType } = vseed
  const config = (advancedVSeed.config?.[chartType as 'bar']?.xAxis ?? {}) as XLinearAxis

  if (!result.axes) {
    result.axes = []
  }
  const isPivot = isPivotChart(vseed)

  const { autoFormat, numFormat = {} } = config

  const formatter = createNumFormatter(numFormat)
  const percentFormatter = createNumFormatter({
    type: 'percent',
  })

  const formatMethod = (value: string) => {
    if (isBarPercent(vseed) || isColumnPercent(vseed) || isAreaPercent(vseed)) {
      return createLinearPercentFormat(value, autoFormat, numFormat, formatter, percentFormatter)
    }
    return createLinearFormat(value, autoFormat, numFormat, formatter)
  }

  const titleText = config.title?.titleText || defaultTitleText(measures, dimensions, encoding.x as string[])

  const linearAxis = linearAxisStyle({
    ...config,
    orient: 'bottom',
    formatMethod,
    titleText,
    isPivot,
  })

  linearAxis.tick.tickMode = () => {
    const binValues: number[] = []

    dataset.forEach((entry: Datum) => {
      binValues.push((entry as any)[BinStartMeasureId] as number)
      binValues.push((entry as any)[BinEndMeasureId] as number)
    })

    return unique(binValues)
  }

  result.axes = [...result.axes, linearAxis] as ISpec['axes']

  return result
}
