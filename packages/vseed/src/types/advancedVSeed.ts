import { z } from 'zod'
import { zChartType } from './properties/chartType'
import { zDataset } from './properties/dataset'
import { zDimensions } from './properties/dimensions'
import { zMeasures } from './properties/measures'
import { zEncoding } from './properties/encoding/encoding'
import { zDatasetReshapeInfo } from './properties/datasetReshapeInfo/datasetReshapeInfo'
import { zBaseConfig } from './properties/baseConfig/baseConfig'
import { zTheme, zCustomTheme } from './properties/theme'

export const zAdvancedVSeed = z.object({
  chartType: zChartType,
  dataset: zDataset,
  datasetReshapeInfo: zDatasetReshapeInfo,
  dimensions: zDimensions,
  measures: zMeasures,
  encoding: zEncoding,
  baseConfig: zBaseConfig,
  theme: zTheme,
  customTheme: zCustomTheme,
})

export type AdvancedVSeed = z.infer<typeof zAdvancedVSeed>
