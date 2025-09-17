import type { Formatter, Locale, NumFormat } from 'src/types'
import { autoNumFormatter, createNumFormatter } from './createNumFormatter'
import { intl } from 'src/i18n'

export const createFormatter = (format: Partial<NumFormat>, locale?: Locale): Formatter => {
  return createNumFormatter(format, locale)
}

export const autoFormatter = (value?: number | string, locale: Locale = intl.getLocale()): string => {
  return autoNumFormatter(value, locale)
}
