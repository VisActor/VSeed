import type { ListTableConstructorOptions, ColumnDefine } from '@visactor/vtable'
import { array } from '@visactor/vutils'
import { isNullish, isNumber, isPlainObject, isString } from 'remeda'
import { selector } from 'src/dataSelector/selector'
import type { BodyCellStyle, SpecPipe } from 'src/types'
import type { MeasureSelector, Selectors } from 'src/types/dataSelector'
import { pickBodyCellStyle } from './common'

export const tableBodyCell: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { cellStyle } = advancedVSeed
  const bodyCellStyle = cellStyle?.bodyCellStyle

  if (!bodyCellStyle) {
    return spec as ListTableConstructorOptions
  }
  const bodyCellStyleList = array(bodyCellStyle) as BodyCellStyle[]
  const columns = (spec as ListTableConstructorOptions).columns || []
  const setStyleOfColumn = (col: ColumnDefine) => {
    const field = col.field as string
    const matchedStyles = bodyCellStyleList.filter((style) => {
      const selectors = array(style.selector) as Selectors

      return selectors.some((selector) => {
        return isPlainObject(selector)
          ? isNullish(selector.field) || (selector as MeasureSelector).field === field
          : isNumber(selector) || isString(selector)
      })
    })

    if (!matchedStyles.length) {
      return
    }

    col.style = (datum: any) => {
      const originalDatum = {
        [field]: datum.dataValue,
      }

      const mergedStyle = matchedStyles.reduce<Record<string, any>>((result, style) => {
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
  }
  const reverseColumn = (col: ColumnDefine, callback: (col: ColumnDefine) => void) => {
    if (!col) {
      return
    }
    if (col.columns) {
      col.columns.forEach((c) => reverseColumn(c, callback))
      return
    }
    return callback(col)
  }

  columns.forEach((col: ColumnDefine) => {
    reverseColumn(col, setStyleOfColumn)
  })

  return spec as ListTableConstructorOptions
}
