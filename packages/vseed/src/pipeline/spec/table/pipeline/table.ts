import type { SpecPipeline } from 'src/types'
import {
  initTable,
  dimensionTreeToColumns,
  measureTreeToColumns,
  bodyStyle,
  headerStyle,
  frameStyle,
  selectionStyle,
  tableBodyCell,
} from '../pipes'
import type { ListTableConstructorOptions } from '@visactor/vtable'

export const tableSpecPipeline: SpecPipeline<ListTableConstructorOptions> = [
  initTable,
  dimensionTreeToColumns,
  measureTreeToColumns,
  bodyStyle,
  headerStyle,
  frameStyle<ListTableConstructorOptions>,
  selectionStyle<ListTableConstructorOptions>,
  tableBodyCell,
]
