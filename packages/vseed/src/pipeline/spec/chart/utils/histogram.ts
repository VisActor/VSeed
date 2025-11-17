import { createNumFormatter } from 'src/pipeline/utils'
import type { AdvancedVSeed, XLinearAxis } from 'src/types'
import { createLinearFormat } from '../pipes/axes/format/linearFormat'

export const getDefaultXFormatterOfHistogram = (advancedVSeed: AdvancedVSeed) => {
  const { chartType, config } = advancedVSeed
  const xConfig = config?.[chartType as 'bar']?.xAxis as XLinearAxis
  const { autoFormat = true, numFormat = {} } = xConfig
  const formatter = createNumFormatter(numFormat)
  return (value: number) => createLinearFormat(value, autoFormat, numFormat, formatter)
}
