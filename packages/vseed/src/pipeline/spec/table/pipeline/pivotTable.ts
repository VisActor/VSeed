import type { SpecPipeline } from 'src/types'
import {
  initPivotTable,
  pivotColumns,
  pivotRows,
  pivotIndicators,
  bodyStyle,
  headerStyle,
  rowHeaderStyle,
  cornerHeaderStyle,
  frameStyle,
  selectionStyle,
} from '../pipes'
import { dataConfig } from '../pipes/indicators/pivotDataConfig'

export const pivotTableSpecPipeline: SpecPipeline = [
  initPivotTable,
  pivotColumns,
  pivotRows,
  pivotIndicators,
  bodyStyle,
  headerStyle,
  rowHeaderStyle,
  cornerHeaderStyle,
  frameStyle,
  selectionStyle,
  dataConfig,
]
