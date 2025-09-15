import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { BaseTableAPI, FieldFormat } from '@visactor/vtable/es/ts-types'
import { isEmpty, isNumber } from 'remeda'
import { intl } from 'src/i18n'
import { autoFormatter, createFormatter, findMeasureById } from 'src/pipeline/utils'
import type { Datum, FoldInfo, Locale, MeasureTree, SpecPipe } from 'src/types'

export const pivotIndicators: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { locale, measures, datasetReshapeInfo } = advancedVSeed
  const { foldInfo } = datasetReshapeInfo[0]

  return {
    ...spec,
    indicatorsAsCol: true,
    indicatorTitle: intl.i18n`指标名称`,
    hideIndicatorName: true,
    indicators: [
      {
        cellType: 'text',
        indicatorKey: foldInfo.measureValue,
        title: 'indicator',
        width: 'auto',
        format: fieldFormat(measures, foldInfo as FoldInfo, locale),
      },
    ] as unknown as PivotChartConstructorOptions['indicators'],
  }
}

const fieldFormat =
  (measures: MeasureTree, foldInfo: FoldInfo, locale: Locale): FieldFormat =>
  (value: number | string, col?: number, row?: number, table?: BaseTableAPI) => {
    if (!isNumber(col) || !isNumber(row) || !table) {
      return value
    }

    const datum = table.getCellOriginRecord(col, row) as Datum[]
    if (!datum[0]) {
      return value
    }
    const { measureId: foldMeasureId } = foldInfo
    const measureId = datum[0][foldMeasureId] as string
    const node = findMeasureById(measures, measureId)
    if (!node) {
      return value
    }
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
