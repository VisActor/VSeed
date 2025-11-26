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
  titleOnDimension,
  pivotTableBodyCell,
} from '../pipes'
import { dataConfig } from '../pipes/indicators/pivotDataConfig'

export const pivotTableSpecPipeline: SpecPipeline = [
  initPivotTable,
  pivotColumns,
  pivotRows,
  titleOnDimension,
  pivotIndicators,
  bodyStyle,
  headerStyle,
  rowHeaderStyle,
  cornerHeaderStyle,
  frameStyle,
  selectionStyle,
  dataConfig,
  pivotTableBodyCell,
]
