import type { SpecPipeline } from 'src/types'
import { initColumn, dataset, xBand, yLinear, percent, backgroundColor } from '../pipes'

export const columnPercentSpecPipeline: SpecPipeline = [initColumn, backgroundColor, percent, dataset, xBand, yLinear]
