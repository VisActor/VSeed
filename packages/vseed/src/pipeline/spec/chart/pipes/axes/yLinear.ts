import type { ISpec } from '@visactor/vchart'
import { createNumFormatter, isAreaPercent, isBarPercent, isColumnPercent, isPivotChart } from 'src/pipeline/utils'
import type { VChartSpecPipe, YLinearAxis } from 'src/types'
import { createLinearFormat, createLinearPercentFormat } from './format/linearFormat'
import { defaultTitleText } from './title/defaultTitleText'
import { linearAxisStyle } from './linearAxisStyle'

export const yLinear: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { measures = [], dimensions = [], encoding } = advancedVSeed
  const config = (advancedVSeed.config?.[chartType as 'column']?.yAxis ?? {}) as YLinearAxis

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

  const titleText = config.title?.titleText || defaultTitleText(measures, dimensions, encoding.y as string[])

  const linearAxis = linearAxisStyle({
    ...config,
    orient: 'left',
    formatMethod,
    titleText,
    isPivot,
  })

  result.axes = [...result.axes, linearAxis] as ISpec['axes']

  return result
}
