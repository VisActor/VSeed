import type { SpecPipeline } from 'src/types'
import { initBar, dataset, xLinear, yBand } from '../pipes'

export const barSpecPipeline: SpecPipeline = [initBar, dataset, xLinear, yBand]
