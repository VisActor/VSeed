import type { Formatter, Measure } from 'src/types'
import { autoFormatter, createFormatter } from './createFormatter'
import { isEmpty } from 'remeda'

export const createFormatterByMeasure = (measure?: Measure): Formatter => {
  if (!measure) {
    return (v) => String(v)
  }
  const { numFormat, format, autoFormat = true } = measure

  const formatterFormat = numFormat || format || {}

  if (!isEmpty(formatterFormat)) {
    return createFormatter(formatterFormat)
  }

  if (autoFormat) {
    return autoFormatter
  }
  return (v) => String(v)
}
