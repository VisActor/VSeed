/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ListTableConstructorOptions, ColumnDefine } from '@visactor/vtable'
import { array } from '@visactor/vutils'
import { isNullish, isNumber, isPlainObject, isString } from 'remeda'
import { selector } from 'src/dataSelector/selector'
import type { BodyCellStyle, ListTableSpecPipe } from 'src/types'
import type { MeasureSelector, Selectors } from 'src/types/dataSelector'
import { pickBodyCellStyle } from './common'
import { preorderTraverse } from 'src/pipeline/utils/tree/traverse'

export const tableBodyCell: ListTableSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { cellStyle } = advancedVSeed
  const bodyCellStyle = cellStyle?.bodyCellStyle

  if (!bodyCellStyle) {
    return spec as ListTableConstructorOptions
  }
  const bodyCellStyleList = array(bodyCellStyle) as BodyCellStyle[]
  const columns = (spec as ListTableConstructorOptions).columns || []
  const selectedPos: { col: number; row: number }[] = []
  const setStyleOfColumn = (col: ColumnDefine) => {
    const field = col.field as string
    const matchedStyles = bodyCellStyleList.filter((style) => {
      if (isNullish(style.selector)) {
        return true
      }
      const selectors = array(style.selector) as Selectors

      return selectors.some((selector) => {
        return isPlainObject(selector)
          ? isNullish(selector.field) || (selector as MeasureSelector).field === field
          : isNumber(selector) || isString(selector)
      })
    })

    if (!matchedStyles.length) {
      return false
    }

    col.style = (datum: any) => {
      const originalDatum = {
        [field]: datum.dataValue,
      }

      const mergedStyle = matchedStyles.reduce<Record<string, any>>((result, style) => {
        if (selector(originalDatum, style.selector)) {
          if (selectedPos.length && selectedPos[0].col === datum?.col && selectedPos[0].row === datum?.row) {
            // 说明重复进入了，清空历史
            selectedPos.length = 0
          }
          selectedPos.push({
            col: datum?.col,
            row: datum?.row,
          })
          return {
            ...result,
            ...pickBodyCellStyle(style),
          }
        }

        return result
      }, {})

      return mergedStyle
    }
    return false
  }

  preorderTraverse<ColumnDefine, 'columns'>(columns, setStyleOfColumn, 'columns')
  ;(spec as any).runningConfig = {
    ...((spec as any).runningConfig || {}),
    selectedPos,
  }

  return spec as ListTableConstructorOptions
}
