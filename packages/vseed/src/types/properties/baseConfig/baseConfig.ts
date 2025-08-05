import { z } from 'zod'
import { zBackgroundColor } from './backgroundColor'

const zVChartBaseConfig = z
  .object({
    backgroundColor: zBackgroundColor,
  })
  .optional()

const zVTableBaseConfig = z
  .object({
    backgroundColor: zBackgroundColor,
  })
  .optional()

export const zBaseConfig = z
  .object({
    vtable: zVTableBaseConfig,
    vchart: zVChartBaseConfig,
  })
  .optional()
