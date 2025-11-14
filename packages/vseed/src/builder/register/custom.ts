import type { AdvancedPipe, ChartType, SpecPipe, Spec } from 'src/types'
import { Builder } from '../builder'
import type {
  ListTableConstructorOptions,
  PivotChartConstructorOptions,
  PivotTableConstructorOptions,
} from '@visactor/vtable'

export const updateAdvanced = (chartType: ChartType, advancedPipe: AdvancedPipe) => {
  Builder._customAdvancedPipe[chartType] = advancedPipe
}
export const updateSpec = (
  chartType: ChartType,
  specPipe: SpecPipe<Spec | PivotChartConstructorOptions | ListTableConstructorOptions | PivotTableConstructorOptions>,
) => {
  Builder._customSpecPipe[chartType] = specPipe
}
