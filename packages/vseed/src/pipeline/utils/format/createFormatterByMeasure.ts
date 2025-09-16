import type { Formatter, Measure } from 'src/types'
import { autoFormatter, createFormatter } from './createFormatter'
import { isEmpty, isNullish } from 'remeda'

export const createFormatterByMeasure = (measure?: Measure): Formatter => {
  if (!measure) {
    return (v) => String(v)
  }
  const { numFormat, format, autoFormat } = measure

  const formatterFormat = numFormat || format || {}

  if (autoFormat === true) {
    return autoFormatter
  }

  if (isNullish(autoFormat) && isEmpty(formatterFormat)) {
    return autoFormatter
  }

  if (!isEmpty(formatterFormat)) {
    return createFormatter(formatterFormat)
  }

  return (v) => String(v)
}
