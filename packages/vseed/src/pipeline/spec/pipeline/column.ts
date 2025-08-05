import type { SpecPipeline } from 'src/types'
import { initColumn, dataset, xBand, yLinear, backgroundColor } from '../pipes'

export const columnSpecPipeline: SpecPipeline = [initColumn, backgroundColor, dataset, xBand, yLinear]
