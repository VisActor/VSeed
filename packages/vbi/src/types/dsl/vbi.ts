import { ChartType } from '@visactor/vseed'
import { VBIDimensionTree } from './dimensions'
import { VBIMeasureTree } from './measures'
import { VBIDSLTheme } from './theme'
import { VBIDSLLocale } from './locale'

export interface VBI {
  connectorId: string
  chartType: ChartType
  dimensions: VBIDimensionTree
  measures: VBIMeasureTree
  theme: VBIDSLTheme
  locale: VBIDSLLocale
}
