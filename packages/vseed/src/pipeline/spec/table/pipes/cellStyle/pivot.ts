import type { IIndicator, PivotTableConstructorOptions } from '@visactor/vtable'
import { array } from '@visactor/vutils'
import { isNullish, isString } from 'remeda'
import { selector } from 'src/dataSelector/selector'
import type { BodyCellStyle, Datum, SpecPipe } from 'src/types'
import { pickBodyCellStyle } from './common'
import { FoldMeasureValue, MeasureId } from 'src/dataReshape'

export const pivotTableBodyCell: SpecPipe<PivotTableConstructorOptions> = (spec, context) => {
  const { advancedVSeed } = context
  const { cellStyle } = advancedVSeed
  const bodyCellStyle = cellStyle?.bodyCellStyle

  if (!bodyCellStyle) {
    return spec as PivotTableConstructorOptions
  }
  const bodyCellStyleList = array(bodyCellStyle) as BodyCellStyle[]
  const indicators = (spec as PivotTableConstructorOptions).indicators || []

  const newIndicators = indicators.map((ind) => {
    const newInd = isString(ind)
      ? ({
          indicatorKey: ind,
        } as IIndicator)
      : ind

    const { indicatorKey } = newInd

    newInd.style = (datum: any) => {
      const { dataValue, cellHeaderPaths } = datum
      const headerPaths = [...cellHeaderPaths.colHeaderPaths, ...cellHeaderPaths.rowHeaderPaths]

      const originalDatum: Datum = {
        [indicatorKey]: dataValue,
      }

      headerPaths.forEach((path: any) => {
        if (path.dimensionKey) {
          originalDatum[path.dimensionKey] = path.value
        }
      })

      if (!isNullish(originalDatum[MeasureId]) && !isNullish(originalDatum[FoldMeasureValue])) {
        originalDatum[originalDatum[MeasureId]] = originalDatum[FoldMeasureValue]
      }

      const mergedStyle = bodyCellStyleList.reduce<Record<string, any>>((result, style) => {
        if (selector(originalDatum, style.selector)) {
          return {
            ...result,
            ...pickBodyCellStyle(style),
          }
        }

        return result
      }, {})

      return mergedStyle
    }
    return newInd
  })
  return {
    ...spec,
    indicators: newIndicators,
  } as PivotTableConstructorOptions
}
