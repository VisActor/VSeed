import type { SpecPipeline } from 'src/types'
import { percent, dataset, xBand, yLinear, initArea, backgroundColor } from '../pipes'

export const areaPercentSpecPipeline: SpecPipeline = [initArea, backgroundColor, percent, dataset, xBand, yLinear]
