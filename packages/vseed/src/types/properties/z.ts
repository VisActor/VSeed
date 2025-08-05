import { z } from 'zod'
import { zChartType } from './chartType'
import { zDataset } from './dataset'
import { zDimensions } from './dimensions'
import { zMeasures } from './measures'
import { zBackgroundColor } from './baseConfig'

export const zVSeed = z.object({
  chartType: zChartType,
  dataset: zDataset,
  dimensions: zDimensions,
  measures: zMeasures,
  backgroundColor: zBackgroundColor,
})

export const VSeedJSONSchema = z.toJSONSchema(zVSeed)

