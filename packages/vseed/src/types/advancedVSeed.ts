import { z } from 'zod'
import { zChartType } from './properties/chartType'
import { zDataset } from './properties/dataset'
import { zDimensionTree } from './properties/dimensions'
import { zMeasureTree } from './properties/measures'
import { zEncoding } from './properties/encoding'
import { zDatasetReshapeInfo } from './properties/datasetReshapeInfo'
import { zTheme, zCustomThemeConfig } from './properties/theme'
import { zConfig } from './properties/config'
import { zAnalysis, zAnnotation, zMarkStyle } from './properties'
import { zLocale } from './i18n'

export const zAdvancedVSeed = z.object({
  chartType: zChartType,
  dataset: zDataset,
  datasetReshapeInfo: zDatasetReshapeInfo,
  dimensions: zDimensionTree,
  measures: zMeasureTree,
  encoding: zEncoding,
  config: zConfig,
  analysis: zAnalysis,
  theme: zTheme,
  markStyle: zMarkStyle,
  customTheme: zCustomThemeConfig,
  annotation: zAnnotation,
  locale: zLocale,
})

export type AdvancedVSeed = z.infer<typeof zAdvancedVSeed>
