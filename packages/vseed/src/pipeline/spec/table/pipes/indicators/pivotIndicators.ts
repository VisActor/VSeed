import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { Measures, SpecPipe } from 'src/types'

export const pivotIndicators: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const measures = (advancedVSeed as unknown as { measures: Measures }).measures

  return {
    ...spec,
    indicatorsAsCol: true,
    indicators: measures.map((item) => {
      return {
        cellType: 'text',
        indicatorKey: item.id,
        title: item.alias || item.id,
        width: 'auto',
      }
    }) as unknown as PivotChartConstructorOptions['indicators'],
  }
}
