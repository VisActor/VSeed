import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { BaseTableAPI, FieldFormat } from '@visactor/vtable/es/ts-types'
import { isNumber } from 'remeda'
import { intl } from 'src/i18n'
import { createFormatterByMeasure, findMeasureById } from 'src/pipeline/utils'
import type { Datum, FoldInfo, MeasureTree, SpecPipe } from 'src/types'

export const pivotIndicators: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { measures, datasetReshapeInfo } = advancedVSeed
  const { foldInfo } = datasetReshapeInfo[0]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  const hasRow = ((spec as any)?.rows as any[])?.length > 0
  const foldMapValues = Object.values(foldInfo.foldMap)

  return {
    ...spec,
    indicatorTitle: intl.i18n`指标名称`,
    indicatorsAsCol: hasRow,
    hideIndicatorName: hasRow,
    indicators: [
      {
        cellType: 'text',
        indicatorKey: foldInfo.measureValue,
        title: foldMapValues.length > 1 ? '' : foldMapValues[0],
        width: 'auto',
        format: fieldFormat(measures, foldInfo as FoldInfo),
      },
    ] as unknown as PivotChartConstructorOptions['indicators'],
  }
}

const fieldFormat = (measures: MeasureTree, foldInfo: FoldInfo): FieldFormat => {
  return (value: number | string, col?: number, row?: number, table?: BaseTableAPI) => {
    if (!isNumber(col) || !isNumber(row) || !table) {
      return value
    }

    const datum = table.getCellOriginRecord(col, row) as Datum[]
    if (!datum[0]) {
      return value
    }
    const { measureId: foldMeasureId } = foldInfo
    const measureId = datum[0][foldMeasureId] as string
    const measure = findMeasureById(measures, measureId)
    const formatter = createFormatterByMeasure(measure)
    return formatter(value)
  }
}
