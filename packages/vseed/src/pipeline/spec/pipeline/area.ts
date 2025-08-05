import type { SpecPipeline } from 'src/types'
import { dataset, xBand, yLinear, initArea, stack, backgroundColor } from '../pipes'

export const areaSpecPipeline: SpecPipeline = [initArea, backgroundColor, stack, dataset, xBand, yLinear]
