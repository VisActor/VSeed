import type { SpecPipeline } from 'src/types'
import { initBar, dataset, xLinear, yBand, backgroundColor } from '../pipes'

export const barSpecPipeline: SpecPipeline = [initBar, backgroundColor, dataset, xLinear, yBand]
