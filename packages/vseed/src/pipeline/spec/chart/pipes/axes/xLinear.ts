import type { ISpec } from '@visactor/vchart'
import type { VChartSpecPipe, XLinearAxis } from 'src/types'
import { createNumFormatter, isAreaPercent, isBarPercent, isColumnPercent, isPivotChart } from 'src/pipeline/utils'
import { createLinearFormat, createLinearPercentFormat } from './format/linearFormat'
import { defaultTitleText } from './title/defaultTitleText'
import { linearAxisStyle } from './linearAxisStyle'

export const xLinear: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { encoding, dimensions = [], measures = [] } = advancedVSeed
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

  result.axes = [...result.axes, linearAxis] as ISpec['axes']

  return result
}
