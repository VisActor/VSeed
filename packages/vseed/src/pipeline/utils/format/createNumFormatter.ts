import { isNumber } from 'remeda'
import { intl } from '../../../i18n'
import type { Formatter, Locale, NumFormat } from 'src/types'

export const createNumFormatter = (format?: Partial<NumFormat>, locale: Locale = intl.getLocale()): Formatter => {
  const {
    type = 'number',
    ratio = 1,
    symbol = '',
    thousandSeparator = true,
    prefix = '',
    suffix = '',

    fractionDigits = 2,
    significantDigits,
    roundingMode = 'halfExpand',
    roundingPriority = 'auto',
  } = format || {}

  const numFormatterOptions: Intl.NumberFormatOptions = {
    style: 'decimal',
    notation: type === 'scientific' ? 'scientific' : 'standard',
    // @ts-expect-error roundingMode is not in NumberFormatOptions
    roundingMode,
    roundingPriority,
  }

  if (isNumber(fractionDigits)) {
    if (fractionDigits >= 0) {
      numFormatterOptions.minimumFractionDigits = fractionDigits
      numFormatterOptions.maximumFractionDigits = fractionDigits
    }
  }
  if (isNumber(significantDigits) && significantDigits > 0) {
    if (significantDigits > 0) {
      numFormatterOptions.minimumSignificantDigits = significantDigits
      numFormatterOptions.maximumSignificantDigits = significantDigits
    }
  }

  const numFormatter = new Intl.NumberFormat(locale, { ...numFormatterOptions, useGrouping: thousandSeparator })

  return (value?: number | string) => {
    let num = Number(value)
    let typeSymbol = ''
    if (Number.isNaN(num)) {
      return String(value)
    }

    // apply ratio for percent/permille
    if (type === 'percent') {
      num *= 100
      typeSymbol = '%'
    } else if (type === 'permille') {
      num *= 1000
      typeSymbol = '‰'
    } else if (type === 'number') {
      num = num / (ratio || 1)
    }

    // format value
    let numStr = numFormatter.format(num)

    // add thousand separator
    if (thousandSeparator) {
      const parts = numStr.split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      numStr = parts.join('.')
    }

    // add symbol, typeSymbol, prefix and suffix
    return `${prefix}${numStr}${typeSymbol}${symbol}${suffix}`
  }
}

export const autoNumFormatter = (value?: number | string, locale: Locale = intl.getLocale()): string => {
  if (value === undefined || value === null) return String(value)
  const num = Number(value)
  if (Number.isNaN(num)) return String(value)

  const numFormatterOptions: Intl.NumberFormatOptions = {
    style: 'decimal',
    notation: 'compact',
    useGrouping: true,
  }
  numFormatterOptions.minimumFractionDigits = 0
  numFormatterOptions.maximumFractionDigits = 2

  const numFormatter = new Intl.NumberFormat(locale, { ...numFormatterOptions })

  return numFormatter.format(Number(value))
}
