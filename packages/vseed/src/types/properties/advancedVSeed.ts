import { z } from 'zod'
import { zChartType } from './chartType'
import { zDataset } from './dataset'
import { zDimensions } from './dimensions'
import { zMeasures } from './measures'
import { zEncoding } from './encoding/encoding'

export const zAdvancedVSeed = z.object({
  chartType: zChartType,
  dataset: zDataset,
  dimensions: zDimensions,
  measures: zMeasures,
  encoding: zEncoding,
})

export type AdvancedVSeed = z.infer<typeof zAdvancedVSeed>
