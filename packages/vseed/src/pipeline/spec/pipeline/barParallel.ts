import type { SpecPipeline } from 'src/types'
import { dataset, xLinear, yBand, initBarParallel } from '../pipes'

export const barParallelSpecPipeline: SpecPipeline = [initBarParallel, dataset, xLinear, yBand]
