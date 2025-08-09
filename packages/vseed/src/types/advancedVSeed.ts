import { z } from 'zod'
import { zChartType } from './properties/chartType'
import { zDataset } from './properties/dataset'
import { zDimensions } from './properties/dimensions'
import { zMeasures } from './properties/measures'
import { zEncoding } from './properties/encoding/encoding'
import { zDatasetReshapeInfo } from './properties/datasetReshapeInfo/datasetReshapeInfo'
import { zBaseConfig } from './properties/baseConfig/baseConfig'
import { zTheme, zCustomTheme } from './properties/theme'
import { zConfig } from './properties/config'
import { zMarkStyle } from './properties'

export const zAdvancedVSeed = z.object({
  // chart type
  chartType: zChartType,
  // data config
  dataset: zDataset,
  datasetReshapeInfo: zDatasetReshapeInfo,
  dimensions: zDimensions,
  measures: zMeasures,
  encoding: zEncoding,
  // function config
  baseConfig: zBaseConfig,
  config: zConfig,
  theme: zTheme,
  // style config
  markStyle: zMarkStyle,
  customTheme: zCustomTheme,
})

export type AdvancedVSeed = z.infer<typeof zAdvancedVSeed>
