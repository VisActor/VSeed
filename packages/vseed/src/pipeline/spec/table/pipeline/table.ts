import type { SpecPipeline } from 'src/types'
import { initTable, dimensionTreeToColumns, measureTreeToColumns } from '../pipes'

export const tableSpecPipeline: SpecPipeline = [initTable, dimensionTreeToColumns, measureTreeToColumns]
