import type { SpecPipeline } from 'src/types'
import { initBar, dataset, xLinear, yBand, percent } from '../pipes'

export const barPercentSpecPipeline: SpecPipeline = [initBar, percent, dataset, xLinear, yBand]
