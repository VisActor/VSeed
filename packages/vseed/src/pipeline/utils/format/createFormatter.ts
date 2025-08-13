import type { Formatter, Locale, NumFormat } from 'src/types'
import { autoNumFormatter, createNumFormatter } from './createNumFormatter'

export const createFormatter = (format: Partial<NumFormat>): Formatter => {
  return createNumFormatter(format)
}

export const autoFormatter = (value?: number | string, locale?: Locale): string => {
  return autoNumFormatter(value, locale)
}
