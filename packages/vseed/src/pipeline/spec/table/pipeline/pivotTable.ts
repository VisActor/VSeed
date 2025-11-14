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
import type { PivotTableConstructorOptions } from '@visactor/vtable'

export const pivotTableSpecPipeline: SpecPipeline<PivotTableConstructorOptions> = [
  initPivotTable,
  pivotColumns,
  pivotRows,
  titleOnDimension,
  pivotIndicators,
  bodyStyle<PivotTableConstructorOptions>,
  headerStyle<PivotTableConstructorOptions>,
  rowHeaderStyle,
  cornerHeaderStyle,
  frameStyle<PivotTableConstructorOptions>,
  selectionStyle<PivotTableConstructorOptions>,
  dataConfig,
  pivotTableBodyCell,
]
