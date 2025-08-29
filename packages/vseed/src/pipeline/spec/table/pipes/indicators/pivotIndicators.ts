import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { FieldFormat } from '@visactor/vtable/es/ts-types'
import { isEmpty } from 'remeda'
import { intl } from 'src/i18n'
import { autoFormatter, createFormatter, isMeasure } from 'src/pipeline/utils'
import type { Locale, Measure, Measures, SpecPipe } from 'src/types'

export const pivotIndicators: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { locale } = advancedVSeed
  const measures = (advancedVSeed as unknown as { measures: Measures }).measures

  return {
    ...spec,
    indicatorsAsCol: true,
    indicatorTitle: intl.i18n`指标名称`,
    indicators: measures.map((item) => {
      if (isMeasure(item)) {
        return {
          cellType: 'text',
          indicatorKey: item.id,
          title: item.alias || item.id,
          width: 'auto',
          format: fieldFormat(item, locale),
        }
      }
      return {}
    }) as unknown as PivotChartConstructorOptions['indicators'],
  }
}

const fieldFormat =
  (node: Measure, locale: Locale): FieldFormat =>
  (value: number | string) => {
    const { format = {}, autoFormat = true } = node
    if (!isEmpty(format)) {
      const formatter = createFormatter(format)
      return formatter(value)
    }

    if (autoFormat) {
      return autoFormatter(value, locale)
    }

    return
  }
