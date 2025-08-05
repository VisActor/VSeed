import type { SpecPipeline } from 'src/types'
import { initColumn, dataset, xBand, yLinear, initArea, stack } from '../pipes'

export const areaSpecPipeline: SpecPipeline = [initArea, stack, dataset, xBand, yLinear]
