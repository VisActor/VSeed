import { autoFormatter, createNumFormatter } from 'src/pipeline/utils'
import type { AdvancedVSeed, XLinearAxis } from 'src/types'
import { createLinearFormat } from '../pipes/axes/format/linearFormat'

export const getDefaultXFormatterOfHistogram = (advancedVSeed: AdvancedVSeed) => {
  const { chartType, config } = advancedVSeed
  const xConfig = config?.[chartType as 'bar']?.xAxis as XLinearAxis
  const { autoFormat = true, numFormat = {} } = xConfig
  const formatter = createNumFormatter(numFormat)
  return (value: number) => createLinearFormat(value, autoFormat, numFormat, formatter)
}

export const getDefaultValueFormatterOfHistogram = (binValueType: 'count' | 'percentage' = 'count') => {
  return binValueType === 'percentage'
    ? createNumFormatter({
        type: 'percent',
        fractionDigits: 1,
      })
    : (value: number | string) => autoFormatter(value)
}
