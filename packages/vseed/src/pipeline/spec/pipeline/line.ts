import type { SpecPipeline } from 'src/types'
import { initColumn, dataset, xBand, yLinear, initLine } from '../pipes'

export const lineSpecPipeline: SpecPipeline = [initLine, dataset, xBand, yLinear]
