import type { SpecPipeline } from 'src/types'
import { percent, dataset, xBand, yLinear, initArea } from '../pipes'

export const areaPercentSpecPipeline: SpecPipeline = [initArea, percent, dataset, xBand, yLinear]
