import type { SpecPipeline } from 'src/types'
import { initColumn, dataset, xBand, yLinear, percent } from '../pipes'

export const columnPercentSpecPipeline: SpecPipeline = [initColumn, percent, dataset, xBand, yLinear]
