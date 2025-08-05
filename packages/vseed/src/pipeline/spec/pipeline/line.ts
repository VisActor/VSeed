import type { SpecPipeline } from 'src/types'
import { dataset, xBand, yLinear, initLine, backgroundColor } from '../pipes'

export const lineSpecPipeline: SpecPipeline = [initLine, backgroundColor, dataset, xBand, yLinear]
