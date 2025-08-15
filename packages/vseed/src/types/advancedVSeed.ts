import { z } from 'zod'
import { zChartType } from './properties/chartType'
import { zDataset } from './properties/dataset'
import { zDimensions } from './properties/dimensions'
import { zMeasures } from './properties/measures'
import { zEncoding } from './properties/encoding/encoding'
import { zDatasetReshapeInfo } from './properties/datasetReshapeInfo/datasetReshapeInfo'
import { zTheme, zCustomTheme } from './properties/theme'
import { zConfig } from './properties/config'
import { zAnnotation, zMarkStyle } from './properties'
import { zLocale } from './i18n'

export const zAdvancedVSeed = z.object({
  chartType: zChartType,
  dataset: zDataset,
  datasetReshapeInfo: zDatasetReshapeInfo,
  dimensions: zDimensions,
  measures: zMeasures,
  encoding: zEncoding,
  config: zConfig,
  theme: zTheme,
  markStyle: zMarkStyle,
  customTheme: zCustomTheme,
  annotation: zAnnotation,
  locale: zLocale,
})

export type AdvancedVSeed = z.infer<typeof zAdvancedVSeed>
