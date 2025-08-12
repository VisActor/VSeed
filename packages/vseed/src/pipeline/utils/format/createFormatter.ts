import type { Formatter, NumFormat } from 'src/types'
import { createNumFormatter } from './createNumFormatter'

export const createFormatter = (format: Partial<NumFormat>): Formatter => {
  return createNumFormatter(format)
}
