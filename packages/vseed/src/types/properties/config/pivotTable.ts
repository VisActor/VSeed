import type { z } from 'zod'
import { zTableConfig } from './table'

export const zPivotTableConfig = zTableConfig
export type PivotTableConfig = z.infer<typeof zPivotTableConfig>
