import type { SpecPipeline } from 'src/types'
import { initPivotTable } from '../pipes'

export const pivotTableSpecPipeline: SpecPipeline = [initPivotTable]
