import type { SpecPipeline } from 'src/types'
import { initBar, dataset, xLinear, yBand, percent, backgroundColor } from '../pipes'

export const barPercentSpecPipeline: SpecPipeline = [initBar, backgroundColor, percent, dataset, xLinear, yBand]
