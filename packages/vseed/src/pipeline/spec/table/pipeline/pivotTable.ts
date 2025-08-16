import type { SpecPipeline } from 'src/types'
import { initPivotTable, pivotColumns, pivotRows, pivotIndicators } from '../pipes'

export const pivotTableSpecPipeline: SpecPipeline = [initPivotTable, pivotColumns, pivotRows, pivotIndicators]
