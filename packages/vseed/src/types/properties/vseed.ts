import z from 'zod'
import type { ChartType } from './chartType'
import { zChartType } from './chartType'
import type { Dataset } from './dataset'
import { zDataset } from './dataset'
import type { Dimensions } from './dimensions'
import { zDimensions } from './dimensions'
import type { Measures } from './measures'
import { zMeasures } from './measures'

export const zVSeed = z.object({
  chartType: zChartType,
  dataset: zDataset,
  dimensions: zDimensions,
  measures: zMeasures,
})

export type VSeed = {
  chartType: ChartType
  dataset: Dataset
  dimensions: Dimensions
  measures: Measures
}

export const VSeedJSONSchema = z.toJSONSchema(zVSeed)
