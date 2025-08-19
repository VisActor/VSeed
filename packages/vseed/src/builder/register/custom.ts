import type { AdvancedPipe, ChartType, SpecPipe } from 'src/types'
import { Builder } from '../builder'

export const updateAdvanced = (chartType: ChartType, advancedPipe: AdvancedPipe) => {
  Builder._customAdvancedPipe[chartType] = advancedPipe
}
export const updateSpec = (chartType: ChartType, specPipe: SpecPipe) => {
  Builder._customSpecPipe[chartType] = specPipe
}
