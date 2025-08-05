import type { SpecPipeline } from 'src/types'
import { dataset, xLinear, yBand, initBarParallel, backgroundColor } from '../pipes'

export const barParallelSpecPipeline: SpecPipeline = [initBarParallel, backgroundColor, dataset, xLinear, yBand]
