import type { SpecPipeline } from 'src/types'
import { initColumn, dataset, xBand, yLinear } from '../pipes'

export const columnSpecPipeline: SpecPipeline = [initColumn, dataset, xBand, yLinear]
