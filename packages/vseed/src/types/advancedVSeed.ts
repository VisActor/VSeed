import { z } from 'zod'
import { zChartType } from './properties/chartType'
import { zDataset } from './properties/dataset'
import { zDimensionTree } from './properties/dimensions'
import { zMeasures, zMeasureTree } from './properties/measures'
import { zEncoding } from './properties/encoding'
import { zDatasetReshapeInfo } from './properties/datasetReshapeInfo'
import { zTheme, zCustomThemeConfig } from './properties/theme'
import { zConfig } from './properties/config'
import { zAnalysis, zAnnotation, zRegressionLine, zMarkStyle } from './properties'
import { zLocale } from './i18n'
import { zCellStyle } from './properties/cellStyle/cellStyle'

export const zAdvancedVSeed = z.object({
  chartType: zChartType,
  dataset: zDataset,
  datasetReshapeInfo: zDatasetReshapeInfo,
  dimensions: zDimensionTree,
  measures: zMeasureTree,
  extraMeasures: zMeasures.optional(),
  encoding: zEncoding,
  config: zConfig,
  analysis: zAnalysis,
  theme: zTheme,
  markStyle: zMarkStyle,
  cellStyle: zCellStyle,
  customTheme: zCustomThemeConfig,
  annotation: zAnnotation,
  locale: zLocale,
  regressionLine: zRegressionLine,
})

export type AdvancedVSeed = z.infer<typeof zAdvancedVSeed>
