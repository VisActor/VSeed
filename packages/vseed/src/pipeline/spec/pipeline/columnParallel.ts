import type { SpecPipeline } from 'src/types'
import { dataset, xBand, yLinear, initColumnParallel, backgroundColor } from '../pipes'

export const columnParallelSpecPipeline: SpecPipeline = [initColumnParallel, backgroundColor, dataset, xBand, yLinear]
