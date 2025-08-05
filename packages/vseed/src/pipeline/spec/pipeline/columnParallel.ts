import type { SpecPipeline } from 'src/types'
import { dataset, xBand, yLinear, initColumnParallel } from '../pipes'

export const columnParallelSpecPipeline: SpecPipeline = [initColumnParallel, dataset, xBand, yLinear]
