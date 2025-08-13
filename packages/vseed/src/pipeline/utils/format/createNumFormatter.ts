import { intl } from '../../../i18n'
import type { Formatter, Locale, NumFormat } from 'src/types'

export const createNumFormatter = (format: NumFormat): Formatter => {
  const {
    type = 'number',
    ratio = 1,
    symbol = '',
    thousandSeparator = true,
    decimalPlaces = 2,
    round = 'round',
    prefix = '',
    suffix = '',
  } = format || {}

  return (value?: number | string) => {
    let num = Number(value)
    let typeSymbol = ''
    if (Number.isNaN(num)) {
      return num.toString()
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

    // rounding
    const multiplier = 10 ** decimalPlaces
    num = Math[round](num * multiplier) / multiplier

    let numStr = num.toFixed(decimalPlaces)

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

  const countDecimalPlaces = (num: number) => {
    if (Number.isInteger(num)) return 0

    const str = num.toString()
    if (str.indexOf('e-') > -1) {
      return parseInt(str.split('e-')[1])
    }

    const decimalPart = str.split('.')[1]
    if (!decimalPart) return 0

    const decimalPlaces = decimalPart.replace(/0+$/, '').length
    return Math.max(2, decimalPlaces)
  }

  const numFormat: NumFormat = {
    type: 'number',
    decimalPlaces: countDecimalPlaces(num),
    round: 'round',
    thousandSeparator: true,
  }

  const rules = NUMBER_FORMAT_RULES[locale] || NUMBER_FORMAT_RULES['default']

  for (const rule of rules) {
    if (num >= rule.threshold) {
      numFormat.ratio = rule.ratio
      numFormat.symbol = rule.symbol
      break // 使用第一个匹配的规则
    }
  }

  return createNumFormatter(numFormat)(value)
}

const NUMBER_FORMAT_RULES = {
  'zh-CN': [
    { threshold: 100000000, ratio: 100000000, symbol: '亿' },
    { threshold: 10000, ratio: 10000, symbol: '万' },
  ],
  'en-US': [
    { threshold: 1000000000, ratio: 1000000000, symbol: 'B' },
    { threshold: 1000000, ratio: 1000000, symbol: 'M' },
    { threshold: 1000, ratio: 1000, symbol: 'K' },
  ],
  default: [
    { threshold: 1000000000, ratio: 1000000000, symbol: 'B' },
    { threshold: 1000000, ratio: 1000000, symbol: 'M' },
    { threshold: 1000, ratio: 1000, symbol: 'K' },
  ],
}
