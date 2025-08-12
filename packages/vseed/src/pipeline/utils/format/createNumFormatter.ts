import type { Formatter, NumFormat } from 'src/types'

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
