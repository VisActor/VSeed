import type { BaseTableConstructorOptions } from '@visactor/vtable/es/ts-types'
import type { SpecPipe } from 'src/types'

export const cornerHeaderStyle: SpecPipe = (spec) => {
  const result = { ...spec } as BaseTableConstructorOptions

  const fontColor = '#1B1F23'
  const fontSize = 12
  const borderColor = 'rgb(224, 224, 224)'
  const backgroundColor = '#EEF1F5'
  const hoverCellBackgroundColor = 'rgba(0, 100, 250, 0.16)'
  const hoverInlineColumnBackgroundColor = 'rgba(0, 100, 250, 0.16)'
  const hoverInlineRowBackgroundColor = 'rgba(0, 100, 250, 0.16)'
  const headerFrameBorderColor = 'rgb(224, 224, 224)'

  if (!result.theme) result.theme = {}

  result.theme.cornerHeaderStyle = {
    borderColor: [borderColor, borderColor],
    borderLineWidth: 1,
    padding: [8, 12, 8, 12],
    textAlign: 'left',
    hover: {
      cellBgColor: hoverCellBackgroundColor,
      inlineRowBgColor: hoverInlineRowBackgroundColor,
      inlineColumnBgColor: hoverInlineColumnBackgroundColor,
    },
    frameStyle: {
      borderColor: [null, headerFrameBorderColor, headerFrameBorderColor, null],
      borderLineWidth: 1,
    },
    fontSize: fontSize,
    fontVariant: 'normal',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: fontColor,
    bgColor: backgroundColor,
    lineHeight: fontSize * 1.5,
  }

  return result
}
