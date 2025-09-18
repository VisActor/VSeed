import type { SpecPipeline } from 'src/types'
import {
  initTable,
  dimensionTreeToColumns,
  measureTreeToColumns,
  bodyStyle,
  headerStyle,
  frameStyle,
  selectionStyle,
} from '../pipes'

export const tableSpecPipeline: SpecPipeline = [
  initTable,
  dimensionTreeToColumns,
  measureTreeToColumns,
  bodyStyle,
  headerStyle,
  frameStyle,
  selectionStyle,
]
