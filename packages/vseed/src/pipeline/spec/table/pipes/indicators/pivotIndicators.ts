import type { PivotChartConstructorOptions } from '@visactor/vtable'
import { intl } from 'src/i18n'
import type { Measures, SpecPipe } from 'src/types'

export const pivotIndicators: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const measures = (advancedVSeed as unknown as { measures: Measures }).measures

  return {
    ...spec,
    indicatorsAsCol: true,
    indicatorTitle: intl.i18n`指标名称`,
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
