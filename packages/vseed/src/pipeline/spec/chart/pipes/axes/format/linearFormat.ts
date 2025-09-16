import { isEmpty, isNullish } from 'remeda'
import { autoFormatter } from 'src/pipeline/utils'
import type { Formatter, NumFormat } from 'src/types'

export const createLinearFormat = (
  value: string | number,
  autoFormat: boolean | undefined,
  numFormat: NumFormat,
  formatter: Formatter,
) => {
  if (isNullish(autoFormat) && isEmpty(numFormat)) {
    return autoFormatter(value)
  }

  if (autoFormat === true) {
    return autoFormatter(value)
  }

  if (!isEmpty(numFormat)) {
    return formatter(value)
  }

  return String(value)
}
