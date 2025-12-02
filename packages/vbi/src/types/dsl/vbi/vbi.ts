import { ChartType } from '@visactor/vseed'
import { VBIDimensionTree } from '../dimensions/dimensions'
import { VBIMeasureTree } from '../measures/measures'
import { VBIDSLTheme } from '../theme/theme'
import { VBIDSLLocale } from '../locale/locale'

export interface VBI {
  connectorId: string
  chartType: ChartType
  dimensions: VBIDimensionTree
  measures: VBIMeasureTree
  theme: VBIDSLTheme
  locale: VBIDSLLocale
}
